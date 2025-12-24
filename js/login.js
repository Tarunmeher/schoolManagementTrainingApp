import {Auth} from '../modules/Auth.js';


const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', ()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email==''){
        alert("Username is blanked");
        return;
    }

    if(password==''){
        alert("Password is blanked");
        return;
    }

    const auth = new Auth();
    auth.validate(email, password);

});