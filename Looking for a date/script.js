// variables defined
let usernames = []
let passwords = []
let secretQ = []
let secretA = []
let Username;
let check = true;
let pass_regex1 = /[A-Za-z]/;
let pass_regex2 = /^\d+$/;
let entered_code = '';
let validatePass;

//fetching usernames
fetch('login.json')
  .then(response => response.json())
  .then(data => {
    usernames = data.map(user => user.username);
    
  })
  .catch(error => console.error('Error fetching data:', error));

//fetching passwords
fetch('login.json')
  .then(response => response.json())
  .then(data => {
    passwords = data.map(user => user.password);
    check = true;
    for(let i=0; i<passwords.length; i++){
      if (pass_regex1.test(passwords[i])){
        check = false;
      }
    }
  })
  .catch(error => console.error('Error fetching data:', error));

//fetching secret questions
fetch('login.json')
  .then(response => response.json())
  .then(data => {
    secretQ = data.map(user => user.secret_question);
    
  })
  .catch(error => console.error('Error fetching data:', error));

//fetching secret answers
fetch('login.json')
  .then(response => response.json())
  .then(data => {
    secretA = data.map(user => user.secret_answer);
    
  })
  .catch(error => console.error('Error fetching data:', error));

//displaying keypad or password box
document.addEventListener("DOMContentLoaded", function() {
  fetch('login.json')
  .then(response => response.json())
  .then(data => {
    passwords = data.map(user => user.password);
    check = true;
    for(let i=0; i<passwords.length; i++){
      if (pass_regex1.test(passwords[i])){
        check = false;
      }
    }

//creating keypad
if(check){
  let keypad = document.getElementById('keypad');
  let num1 = document.createElement('div');
  num1.setAttribute("data-value","1");
  num1.className = "key";
  let p1 = document.createElement('p');
  p1.className = "key-p";
  p1.textContent = "1";
  num1.appendChild(p1);
  keypad.appendChild(num1);
  let num2 = document.createElement('div');
  num2.setAttribute("data-value","2");
  num2.className = "key";
  let p2 = document.createElement('p');
  p2.className = "key-p";
  p2.textContent = "2";
  num2.appendChild(p2);
  keypad.appendChild(num2);
  let num3 = document.createElement('div');
  num3.setAttribute("data-value","3");
  num3.className = "key";
  let p3 = document.createElement('p');
  p3.className = "key-p";
  p3.textContent = "3";
  num3.appendChild(p3);
  keypad.appendChild(num3);
  let num4 = document.createElement('div');
  num4.setAttribute("data-value","4");
  num4.className = "key";
  let p4 = document.createElement('p');
  p4.className = "key-p";
  p4.textContent = "4";
  num4.appendChild(p4);
  keypad.appendChild(num4);
  let num5 = document.createElement('div');
  num5.setAttribute("data-value","5");
  num5.className = "key";
  let p5 = document.createElement('p');
  p5.className = "key-p";
  p5.textContent = "5";
  num5.appendChild(p5);
  keypad.appendChild(num5);
  let num6 = document.createElement('div');
  num6.setAttribute("data-value","6");
  num6.className = "key";
  let p6 = document.createElement('p');
  p6.className = "key-p";
  p6.textContent = "6";
  num6.appendChild(p6);
  keypad.appendChild(num6);
  let num7 = document.createElement('div');
  num7.setAttribute("data-value","7");
  num7.className = "key";
  let p7 = document.createElement('p');
  p7.className = "key-p";
  p7.textContent = "7";
  num7.appendChild(p7);
  keypad.appendChild(num7);
  let num8 = document.createElement('div');
  num8.setAttribute("data-value","8");
  num8.className = "key";
  let p8 = document.createElement('p');
  p8.className = "key-p";
  p8.textContent = "8";
  num8.appendChild(p8);
  keypad.appendChild(num8);
  let num9 = document.createElement('div');
  num9.setAttribute("data-value","9");
  num9.className = "key";
  let p9 = document.createElement('p');
  p9.className = "key-p";
  p9.textContent = "9";
  num9.appendChild(p9);
  keypad.appendChild(num9);
  let num0 = document.createElement('div');
  num0.setAttribute("data-value","0");
  num0.className = "key";
  let p0 = document.createElement('p');
  p0.className = "key-p";
  p0.textContent = "0";
  num0.appendChild(p0);
  keypad.appendChild(num0);
  let cross = document.createElement('div');
  cross.className = "key";
  cross.id = "cross";
  let pi = document.createElement('i');
  pi.className = "fa-solid fa-delete-left";
  pi.id = "cross-key";
  cross.appendChild(pi);
  keypad.appendChild(cross);

  //creating display box
  let input_display = document.getElementById('pass-div');
  let codeInput = document.createElement('input');
  codeInput.type = "text";
  codeInput.id = "codeInput";
  codeInput.readOnly = true;
  input_display.appendChild(codeInput);

  //taking password input from keys on keypad
  const keys = document.querySelectorAll('.key');
  let password = document.getElementById("codeInput");
  keys.forEach(key => {
    key.addEventListener('click', () => {
      if (key.id == "cross"){
        let temp = entered_code.slice(0,-1);
        entered_code = temp;
        password.value = entered_code;
      }
      else{
        const value = key.getAttribute('data-value');
        entered_code += value;
        password.value = entered_code;
      }
    });
  });
}

//creating text password box
else{
  let box = document.getElementById('box');
  let keypad = document.getElementById('keypad');
  box.removeChild(keypad);
  let display = document.getElementById('pass-div');
  box.removeChild(display);
  box.style.height = "60vh";
  let pass_location = document.getElementById('pass-loc');
  let password = document.createElement('input');
  password.type = "text";
  password.placeholder = "Password";
  password.id = "password";
  pass_location.appendChild(password);
}

  })
  .catch(error => console.error('Error fetching data:', error));
});

let empty = /^ *$/

//function to validate login credentials
function validateForm() {
    var username = document.getElementById('username').value;

    // Regular expression for username
    var usernameRegex = /^[a-zA-Z0-9_]+$/;

    // Check if username is empty
    if (empty.test(username)){
        alert('Username cannot be empty');
        return false;
    }

    //check if username is valid
    if (!usernameRegex.test(username)) {
      alert('Username should only contain alphanumeric characters and underscore without any space.');
      return false;
    }

    //check if user present in login.json
    if (!usernames.includes(username)){
        alert('Username not found');
        return false;
    }
    let pass_index = usernames.indexOf(username);
    
    // based on bool variable check, checking for valid password
    if(check){

      // if password is empty
      if(empty.test(entered_code)){
        alert('Please Enter Password');
        return false;
      }

      // checking password corresponding to the username
      else if(entered_code != passwords[pass_index]){
        alert('Incorrect Password');
        return false;
      }
    }
    else{
      let pass = document.getElementById('password').value;

      // if password is empty
      if(empty.test(pass)){
        alert('Please Enter Password');
        return false;
      }

      // checking password corresponding to the username
      else if(pass != passwords[pass_index]){
        alert('Incorrect Password');
        return false;
      }
    }
    // If both username and password are valid, redirect to dating.html
    window.location.href = 'dating.html';
    return true; 
}

// script for forget.html
function forgetUserEnter(){
    Username = document.getElementById('Username').value;
    var usernameRegex = /^[a-zA-Z0-9_]+$/;

    // checking if username is empty
    if (empty.test(Username)){
      alert('Username cannot be empty');
      return false;
    }

    //checking if username is valid
    if (!usernameRegex.test(Username)) {
      alert('Username should only contain alphanumeric characters and underscore without any space.');
      return false;
    }

    // checking for username in login.json
    if (!usernames.includes(Username)){
        alert('Username not found');
        return false;
    }

    //elongating the forget-box
    document.getElementById("forget-box").style.height = '50vh';
    let submitButton = document.getElementById('submitButton');

    //hiding first submit button
    submitButton.classList.add('hidden')
    let index = usernames.lastIndexOf(Username)

    //getting secret question corresponding to the user
    let question = secretQ[index];
    let sqElements = document.getElementsByClassName('secretQ');
    for(let i=0; i<sqElements.length;i++){
      sqElements[i].classList.remove("secretQ");
    }
    hiddenInput = document.querySelector("input.secretQ");
    hiddenInput.style.display = "";
    hiddenInput.classList.remove("secretQ");

    //displaying secret question
    document.getElementById('Question').innerHTML = question;
    return true;
}

//validating secret answer
function validateAnswer(){

  //taking secret answer input
  let secretAn = document.getElementById('secretA').value;
  let index = usernames.indexOf(Username);
  let answer = secretA[index];

  //validating input answer
  if (answer == secretAn){
    document.getElementById('submitButton2').classList.add('hidden');
    saElements = document.getElementsByClassName('secretA');
    for(let i=0; i<saElements.length;i++){
      element = saElements[i];
      element.classList.remove('secretA');
    }

    //dsiplaying "correct answer"
    let para1 = document.createElement("p");
    para1.classList.add('pin');

    //elongating the forget-box
    document.getElementById("forget-box").style.height = '60vh';

    //displaying password
    para1.textContent = "Password : " + passwords[index];
    document.getElementById("forget-box").appendChild(para1);
    return true;
  }

  //alert to display wrong answer
  else{
    alert("Your answer is wrong !!");
    return false;
  }
}