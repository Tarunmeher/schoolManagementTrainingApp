import Credential from '../config/credential.json' with {type:'json'};
export class Student{
    constructor(){

    }

    addNewStudent(studentInfo){
        const existingStudents = localStorage.getItem("students") || "[]";
        const students = JSON.parse(existingStudents);
        students.push(studentInfo);
        localStorage.setItem("students", JSON.stringify(students));
        alert("Student Added Successfully");
        for(let keyname in studentInfo){
            document.getElementById(keyname).value = "";
        }
    }

    viewStudent(resultBodyElement){
        const existingStudents = localStorage.getItem("students") || "[]";
        const students = JSON.parse(existingStudents);
        if(students.length){
            let resultArray = [];
            students.forEach((element, index) => {
                resultArray.push(`<tr><td class="p-3 border">#${index+1}</td><td class="p-3 border">${element.name}</td><td class="p-3 border"> 
                                <button class="text-blue-600 mr-2"><i class="fas fa-edit"></i> Edit</button>
                                <button class="text-red-600"><i class="fas fa-trash"></i> Delete</button>
                                </td></tr>`);
            });
            resultBodyElement.innerHTML= resultArray.join("");
        }else{
            resultBodyElement.innerHTML = "<tr><td colspan='3' class='text-center'>No Record Found !</td></tr>";
        }
    }

}