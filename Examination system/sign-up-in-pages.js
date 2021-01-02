//////////////////////*first part*////////////////////////////

const form = document.getElementById('form');
const firstname = document.getElementById('first name');
const lastname = document.getElementById('last name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    Validate();
});

function Validate() {

    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    forsubmission = 0;

    ////////////////////////////////////////////////////////////

    pattname = /^[A-z]+$/i;
    resultfirstname = pattname.test(firstnameValue);
    if (firstnameValue === '') {
        setErrorFor(firstname, 'first name cannot be blank ');
        console.log("firstname false");

    } else if (resultfirstname == false) {
        setErrorFor(firstname, 'first name must be series of alphapetical ');
        console.log("firstname false condition 2");
    } else {
        console.log("firstname true");
        setSuccessFor(firstname);
        setCookie("firstname", firstnameValue);
        forsubmission++;

    }
    ////////////////////////////////////////////////////////////

    resultlastname = pattname.test(lastnameValue);
    if (lastnameValue === '') {
        setErrorFor(lastname, 'last name cannot be blank ');
        console.log("lastname false");

    } else if (resultlastname == false) {
        setErrorFor(lastname, 'last name must be series of alphapetical ');
        console.log("lastname false2");
    } else {
        console.log("lastname true");
        setSuccessFor(lastname);
        setCookie("lastname", lastnameValue);
        forsubmission++;
    }

    //////////////////////////////////////////////////////////////

    var pattemail = /\w+@\w+\.\w/;
    var resultemail = pattemail.test(emailValue);
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        console.log("emailfalse");
    } else if (resultemail == false) {
        console.log("email false 2");
        setErrorFor(email, 'Not a valid email');
    } else {
        console.log("emailtrue");
        setSuccessFor(email);
        setCookie("email", emailValue);
        forsubmission++;
    }

    /////////////////////////////////////////////////////////

    if (passwordValue === '') {
        console.log("password false");
        setErrorFor(password, 'Password cannot be blank');
    } else if (passwordValue.length < 8) {
        console.log("password length false");
        setErrorFor(password, 'Password length must be 8 or more');
    } else {
        console.log("password true");
        setSuccessFor(password);
        forsubmission++;
    }

    ////////////////////////////////////////////////////////////

    if (password2Value === '') {
        console.log("password2 false ");
        setErrorFor(password2, 'Password2 cannot be blank');
    } else if (password2Value.length < 8) {
        console.log("password2 length false");
        setErrorFor(password2, 'Password length must be 8 or more');
    } else if (passwordValue !== password2Value) {
        console.log("password2 not match");
        setErrorFor(password2, 'Passwords does not match');
    } else {
        console.log("matching true");
        setSuccessFor(password2);
        setCookie("password2", password2Value);
        forsubmission++;
    }

    //////////////////////////////

    grade = 0;
    console.log("grade seted");
    setCookie("grade", 0);

    //////////////////////////////////

    if (forsubmission == 5)
    // return true;
        location.replace("sign_in_page.html")

}

///////////////////////////////////////////////////////

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

//////////////////////////////////////////////////

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/////////////////////////////////////////////////////

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/////////////////////////////////////////////////////

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

///////////////////////////////////*second part *//////////////////////////////

const form2 = document.getElementById('sign-in-form');
const registeredEmail = document.getElementById('email2');
const registeredPassword = document.getElementById('registered-password');

form2.addEventListener('submit', e => {
    e.preventDefault();

    Validate2();
});

function Validate2() {
    const form2 = document.getElementById('sign-in-form');
    const registeredEmail = document.getElementById('email2');
    const registeredPassword = document.getElementById('registered-password');
    submissionform2 = 0;
    emailvalue = getCookie("email");
    passwordvalue = getCookie("password2");

    if (registeredEmail.value == "") {
        setErrorFor2(registeredEmail, 'E-mail cannot be blank ');
        console.log("emailregistered false");
    } else if (registeredEmail.value != emailvalue) {
        setErrorFor2(registeredEmail, 'E-mail doesnt match ');
        console.log("emailregistered false2");
    } else {
        console.log("matching email true");
        setSuccessFor2(registeredEmail);
        submissionform2++;
    }
    if (registeredPassword.value == "") {
        setErrorFor2(registeredPassword, 'Password cannot be blank ');
        console.log("emailregistered false");
    } else if (registeredPassword.value != passwordvalue) {
        setErrorFor2(registeredPassword, 'password doesnt match ');
        console.log("emailregistered false2");
    } else {
        console.log("matching password true");
        setSuccessFor2(registeredPassword);
        submissionform2++;
    }

    if (submissionform2 == 2)
    // return true;
        location.replace("project.html")

}

//////////////////////////////////////////

function setErrorFor2(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control2 error';
    small.innerText = message;
}

//////////////////////////////////////////////////

function setSuccessFor2(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control2 success';
}
////////////////////////////////////////////////////////