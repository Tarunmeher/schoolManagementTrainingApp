import Credential from '../config/credential.json' with {type:'json'};
export class Auth{
    constructor(){

    }

    validate(username, password){
        if(username == Credential.username && password == Credential.password){
            alert("Authentication Successfull");
            window.location.href = 'index.html';
            sessionStorage.setItem('sessionStatus', true);
        }else{
            alert("Authentication Failed");
        }
    }

    checkSession(){
        const isActive = sessionStorage.getItem('sessionStatus') || false;
        if(!isActive){
            window.location.href = 'login.html';
        }
    }
}