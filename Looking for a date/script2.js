//defining some variables
let students = []; 
let error_msg = ""
let empty = /^ *$/;
let findMatch;
let matched_student;

//script for dating.html
if(window.location.pathname.includes('dating.html')){

//fetching students.json
fetch('students.json') 
  .then(response => response.json())
  .then(data => {
    students = data;
    
    // Creating filtering funcitons

    // filtering profiles based on age
    function ageFilter(valid_indices,flags){
        let temp = [];
        for(let i=0; i<valid_indices.length; i++){
            if(flags[valid_indices[i]].age_flag == true){
                temp.push(valid_indices[i]);
            }
        }
        if (temp.length != 0){
            return temp;
        }
        else{
            return valid_indices;
        }
    }
    
    // filtering profiles based on year of study
    function yosFilter(valid_indices,flags){
        let temp = [];
        for(let i=0; i<valid_indices.length; i++){
            if(flags[valid_indices[i]].yos_flag == true){
                temp.push(valid_indices[i]);
            }
        }
        if (temp.length != 0){
            return temp;
        }
        else{
            return valid_indices;
        }
    }
    
    // filtering profiles based on max interests intersection
    function interestFilter(valid_indices,flags){
        let temp = [];
        let max = -1;
        for(let i=0; i<valid_indices.length; i++){
            if(flags[valid_indices[i]].interest_flag > max){
                max = flags[valid_indices[i]].interest_flag;
            }
        }
        for(let i=0; i<valid_indices.length; i++){
            if(flags[valid_indices[i]].interest_flag == max){
                temp.push(valid_indices[i]);
            }
        }
        if(temp.length != valid_indices.length){
            return temp;
        }
        else{
            return valid_indices;
        }
    }
    
    // filtering profiles based on max hobbies intersection
    function hobbyFilter(valid_indices,flags){
        let temp = [];
        let max = -1;
        for(let i=0; i<valid_indices.length; i++){
            if(flags[valid_indices[i]].hobby_flag > max){
                max = flags[valid_indices[i]].hobby_flag;
            }
        }
        for(let i=0; i<valid_indices.length; i++){
            if(flags[valid_indices[i]].hobby_flag == max){
                temp.push(valid_indices[i]);
            }
        }
        if(temp.length != valid_indices.length){
            return temp;
        }
        else{
            return valid_indices;
        }
    }
    
    // Defining findMatch    
    findMatch = function(student){
        let final_index;

        // valid indices based on filters applied sequentially
        let valid_indices = [];
        let female_indices = [];
        let male_indices = [];
        
        // filtering based on gender
        if(student.Gender == "Male"){
            for(let i=0; i<students.length; i++){
                if(students[i].Gender == "Female"){
                    female_indices.push(i);
                }
            }
            if(female_indices.length == 0){
                for(let i=0; i<students.length; i++){
                    if(students[i].Gender == "Other"){
                        valid_indices.push(i);
                    }
                }
            }
            else{
                valid_indices = female_indices;
            }
        }
        else if(student.Gender == "Female"){
            for(let i=0; i<students.length; i++){
                if(students[i].Gender == "Male"){
                    male_indices.push(i);
                }
            }
            if(male_indices.length == 0){
                for(let i=0; i<students.length; i++){
                    if(students[i].Gender == "Other"){
                        valid_indices.push(i);
                    }
                }
            }
            else{
                valid_indices = male_indices;
            }
        }
        else{
            for(let i=0; i<students.length; i++){
                valid_indices.push(i);
            }
        }
        
        // storing information about green flags in profiles
        let flags = [];
        for(let i=0; i<students.length; i++){
            let dict = {
                'index' : i,
                'age_flag' : false,
                'yos_flag' : false,
                'interest_flag' : 0,
                'hobby_flag' : 0
            };
            flags.push(dict);
        }
        
        for(let i=0; i<flags.length; i++){
            let Student = students[flags[i].index];

            // green flag based on age
            let diff = Math.abs(student.Age - Student.Age);
            if(diff <= 2){
                flags[i].age_flag = true;
            }
            // green flag based on yos
            if(student["Year of Study"] == Student["Year of Study"]){
                flags[i].yos_flag = true;
            }

            // green flag based on interests
            for(let j=0; j<student.Interests.length; j++){
                if(Student.Interests.includes(student.Interests[j])){
                    flags[i].interest_flag += 1;
                }
            }

            // green flag based on hobbies
            for(let j=0; j<student.Hobbies.length; j++){
                if(Student.Hobbies.includes(student.Hobbies[j])){
                    flags[i].hobby_flag += 1;
                }
            }
        }
        // if valid indices already not finding single profile then applying filters 

        //applying age filter
        if(valid_indices.length !=1){
            valid_indices = ageFilter(valid_indices,flags);
        }

        //applying year of study filter
        if(valid_indices.length !=1){
            valid_indices = yosFilter(valid_indices,flags);
        }

        //applying interests filter
        if(valid_indices.length !=1){
            valid_indices = interestFilter(valid_indices,flags);
        }

        //applying hobbies filter
        if(valid_indices.length !=1){
            valid_indices = hobbyFilter(valid_indices,flags);
        }

        // if multiple matches then random function gives final index
        if(valid_indices.length > 1){
            final_index = valid_indices[Math.floor(Math.random() * valid_indices.length)];
        }
        else if (valid_indices.length == 1){
            final_index = valid_indices[0];
        }

        //matched student
        matched_student = students[final_index];
    };

  })
  .catch(error => {
    console.error('Error fetching data:', error);
});

// validating form
function validateForm(){
    let roll_no = document.getElementById('roll_no').value;
    let name = document.getElementById('name').value;
    let yos = document.getElementById('Year').value;
    let age = document.getElementById('age').value;

    // checking for empty roll number
    if (empty.test(roll_no)){
        error_msg += 'Roll number is required';
        return false;
    }

    // roll number valid for 2 regex
    valid_roll1 = /^(23[Bb][0-2]{1}[0-9]{1,3}|2023\d{3})$/;
    if (!valid_roll1.test(roll_no)){
        error_msg += 'Roll number is invalid.';
        return false;
    }

    // checking for empty name
    if (empty.test(name)){
        error_msg += 'Name is required';
        return false;
    }

    // checking for valid name
    valid_name = /^[a-zA-Z][a-zA-Z .]*$/;
    if (!valid_name.test(name)){
        error_msg += 'Name is Invalid. Name must start with alphabet and can only contain alphabets,spaces and dot.';
        return false;
    }

    // checking for empty year of study
    if (empty.test(yos)){
        error_msg += 'Year of study is required';
        return false;
    }

    // Regex for Year of Study
    valid_year = /^(1st|2nd|3rd|4th)$/;
    if (!valid_year.test(yos)){
        error_msg += 'Year of study is invalid. Year of study can only be 1st, 2nd, 3rd or 4th.';
        return false;
    }

    // checking for empty age input
    if (empty.test(age)){
        error_msg += 'Age is required';
        return false;
    }

    // Regex for age and age for dating
    valid_age = /^(?:[1-9]|[1-9][0-9])$/;
    valid_aged = /^(1[7-9]|2[0-4])$/;
    if (valid_age.test(age)){
        if(!valid_aged.test(age)){
        error_msg += 'Sorry your age should be between 17 and 24.';
            return false;
        }
    }
    else{
        error_msg += 'Invalid age';
        return false;
    }

    // checking if gender entered
    let gender_checked = false;
    let gender_radios = document.getElementsByName('gender');
    for (let i=0; i<gender_radios.length; i++){
        if (gender_radios[i].checked){
            gender_checked = true;
            break;
        }
    }
    if (!gender_checked){
        error_msg += 'Please select your gender';
        return false;
    }

    // checking if interests entered
    let interests_checked = false;
    let interests_checkboxes = document.getElementsByName('interests');
    for(let i=0; i<interests_checkboxes.length; i++){
        if (interests_checkboxes[i].checked){
            interests_checked = true;
            break;
        }
    }
    if (!interests_checked){
        error_msg += 'Please select atleast one interest';
        return false;
    }

    // checking if hobbies entered
    let hobby_checked = false;
    let hobby_checkboxes = document.getElementsByName('hobbies');
    for(let i=0; i<hobby_checkboxes.length; i++){
        if(hobby_checkboxes[i].checked){
            hobby_checked = true;
            break;
        }
    }
    if (!hobby_checked){
        error_msg += 'Please select atleast one hobby';
        return false;
    }
    return true;
}

let student;

// matching function
function match(){

    // storing input student info
    let roll_no = document.getElementById('roll_no').value;
    let name = document.getElementById('name').value;
    let yos = document.getElementById('Year').value;
    let age = parseInt(document.getElementById('age').value);
    let gender_radios = document.getElementsByName('gender');
    let gender;
    for(let i=0; i<gender_radios.length; i++){
        if(gender_radios[i].checked){
            gender = gender_radios[i].value;
            break;
        }
    }
    
    let interests_checkboxes = document.getElementsByName('interests');
    let interests = []
    for(let i=0; i<interests_checkboxes.length; i++){
        if(interests_checkboxes[i].checked){
            interests.push(interests_checkboxes[i].value);
        }
    }

    let hobbies_checkboxes = document.getElementsByName('hobbies');
    let hobbies = []
    for(let i=0; i<hobbies_checkboxes.length; i++){
        if(hobbies_checkboxes[i].checked){
            hobbies.push(hobbies_checkboxes[i].value);
        }
    }

    // creating student object to match with data in students.json
    student = {
        "IITB Roll Number": roll_no,
        "Name": name,
        "Year of Study": yos,
        "Age": age,
        "Gender": gender,
        "Interests": interests,
        "Hobbies": hobbies
    };

    // finds match only if form is validated
    if(validateForm()){

        // matching student object
        findMatch(student);

        //encoding student object to pass to match.html
        let encoded_student  = encodeURIComponent(JSON.stringify(matched_student));
        window.location.href = 'match.html?object=' + encoded_student;
    }
    else{
        console.log(error_msg);
        document.getElementById('error-p').innerHTML = error_msg;
        error_msg = "";
    }
}
}

// script for match.html
else if(window.location.pathname.includes('match.html')){
    // Retrieving query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const encoded_student = urlParams.get('object');

    // Create new object after decoding
    let final_student = JSON.parse(decodeURIComponent(encoded_student));
    let photo_loc = final_student.Photo;

    // displaying profile of matched student
    document.getElementById('match-photo').style.backgroundImage = `url(${photo_loc})`;
    document.getElementById('match-photo').style.backgroundSize = "cover";
    document.getElementById('name-info').innerHTML = "Name : " + final_student.Name;
    document.getElementById('roll_no-info').innerHTML = "IITB Roll Number : " + final_student["IITB Roll Number"];
    document.getElementById('age-info').innerHTML = "Age : " + final_student.Age;
    document.getElementById('yos-info').innerHTML = "Year of Study : " + final_student["Year of Study"];
    let interest_string = final_student.Interests.join(',');
    document.getElementById('interests-info').innerHTML = "Interests : " + interest_string;
    let hobbies_string = final_student.Hobbies.join(',');
    document.getElementById('hobbies-info').innerHTML = "Hobbies : " + hobbies_string;
}

// script for scroll.html
else if(window.location.pathname.includes('scroll.html')){

    // fetching students.json
    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            students = data;
            let container = document.getElementById('container');
            
            // creating container elements i.e profiles
            for(let i=0; i<students.length; i++){
                let profile = document.createElement('div');
                container.appendChild(profile);
                profile.classList.add('profile');
                let profile_photo = document.createElement('div');
                profile.appendChild(profile_photo);
                let profile_info = document.createElement('div');
                profile.appendChild(profile_info);
                profile_photo.classList.add('profile-photo');
                profile_info.classList.add('profile-info');
            
                // adding profile photo
                let student = students[i];
                let photo = student.Photo;
                profile_photo.style.backgroundImage = `url(${photo})`;
                profile_photo.style.backgroundSize = "cover";
            
                // filling profile info
                let pName = document.createElement('p');
                pName.textContent = "Name : " + student.Name;
                pName.classList.add('container-p');
                profile_info.appendChild(pName);

                let pRoll = document.createElement('p');
                pRoll.textContent = "IITB Roll Number : " + student["IITB Roll Number"];
                pRoll.classList.add('container-p');
                profile_info.appendChild(pRoll);

                let pAge = document.createElement('p');
                pAge.textContent = "Age : " + student.Age;
                pAge.classList.add('container-p');
                profile_info.appendChild(pAge);

                let pYos = document.createElement('p');
                pYos.textContent = "Year of Study : " + student["Year of Study"];
                pYos.classList.add('container-p');
                profile_info.appendChild(pYos);

                let pInterests = document.createElement('p');
                pInterests.textContent = "Interests : " + student.Interests;
                pInterests.classList.add('container-p');
                profile_info.appendChild(pInterests);

                let pHobbies = document.createElement('p');
                pHobbies.textContent = "Hobbies : " + student.Hobbies;
                pHobbies.classList.add('container-p');
                profile_info.appendChild(pHobbies);
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
    });

    // showFilter function to display the filter box
    function showFilter(){
        let filter_symbol = document.getElementById('filter-symbol');
        filter_symbol.style.position = "static";
        let filter_box = document.getElementById('filters');
        filter_box.classList.remove('hidden');
        filter_box.style.display = "flex";
    }
    let applyFilters2;
    let students = [];
    fetch('students.json') 
      .then(response => response.json())
      .then(data => {
        
        // function to give valid indices based on gender
        function genderFilter(gender,students){
            let temp = [];
            for(let i=0; i<students.length; i++){
                if(students[i].Gender == gender){
                    temp.push(i);
                }
            }
            return temp;
        }
        applyFilters2 = function(){

            // valid indices based on filters applied
            let valid_indices = [];
            for(let i=0; i<students.length; i++){
                valid_indices.push(i);
            }

            // reading gender filter
            let gender_radios = document.getElementsByName('gender');
            let gender;
            for(let i=0; i<gender_radios.length; i++){
                if(gender_radios[i].checked){
                    gender = gender_radios[i].value;
                    break;
                }
            }

            // applying gender filter
            if(gender){
                valid_indices = genderFilter(gender,students);
            }

            // reading year of study filter
            let yos_checks = document.getElementsByName('yos');
            let years = [];
            for(let i=0; i<yos_checks.length; i++){
                if(yos_checks[i].checked){
                    years.push(yos_checks[i].value);
                }
            }
            
            // applying year of study filter
            if(years.length != 0){
                let temp = [];
                for(let i=0; i<valid_indices.length; i++){
                    for(let j=0; j<years.length; j++){
                        if(students[valid_indices[i]]["Year of Study"] == years[j]){
                            temp.push(valid_indices[i]);
                        }
                    }
                }
                valid_indices = temp;
            }
            let container = document.getElementById('container');

            // clearing container box
            container.innerHTML = '';

            //displaying profiles of only valid indices
            for(let i=0; i<valid_indices.length; i++){
                let profile = document.createElement('div');
                container.appendChild(profile);
                profile.classList.add('profile');
                let profile_photo = document.createElement('div');
                profile.appendChild(profile_photo);
                let profile_info = document.createElement('div');
                profile.appendChild(profile_info);
                profile_photo.classList.add('profile-photo');
                profile_info.classList.add('profile-info');
            
                let student = students[valid_indices[i]];
                let photo = student.Photo;
                profile_photo.style.backgroundImage = `url(${photo})`;
                profile_photo.style.backgroundSize = "cover";
            
                let pName = document.createElement('p');
                pName.textContent = "Name : " + student.Name;
                pName.classList.add('container-p');
                profile_info.appendChild(pName);

                let pRoll = document.createElement('p');
                pRoll.textContent = "IITB Roll Number : " + student["IITB Roll Number"];
                pRoll.classList.add('container-p');
                profile_info.appendChild(pRoll);

                let pAge = document.createElement('p');
                pAge.textContent = "Age : " + student.Age;
                pAge.classList.add('container-p');
                profile_info.appendChild(pAge);

                let pYos = document.createElement('p');
                pYos.textContent = "Year of Study : " + student["Year of Study"];
                pYos.classList.add('container-p');
                profile_info.appendChild(pYos);

                let pInterests = document.createElement('p');
                pInterests.textContent = "Interests : " + student.Interests;
                pInterests.classList.add('container-p');
                profile_info.appendChild(pInterests);

                let pHobbies = document.createElement('p');
                pHobbies.textContent = "Hobbies : " + student.Hobbies;
                pHobbies.classList.add('container-p');
                profile_info.appendChild(pHobbies);
            }
        };
        })
      .catch(error => {
      console.error('Error fetching data:', error);
    });

    // applying filters
    function applyFilters(){
        applyFilters2();
    }
}