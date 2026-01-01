import { Auth } from "../modules/Auth.js";
import { Student } from "../modules/Student.js";
import { Classes } from "../modules/Classes.js";
import { Teacher } from "../modules/Teacher.js";


document.addEventListener("DOMContentLoaded", function () {
	// Code to run when the DOM is ready
	const auth = new Auth();
	auth.checkSession();
});



/*********************Student Actions*****************/

document.getElementById("saveNewStudent").addEventListener("click", saveNewStudent);
function saveNewStudent() {
	const studentInfo = {};
	const idsList = CONFIG.addStudentsFieldIds;
	let validation = true;
	for (let i = 0; i < idsList.length; i++) {
		const id_name = idsList[i];
		studentInfo[id_name] = document.getElementById(id_name).value;
		if (studentInfo[id_name] == '') {
			alert(`${id_name} cannot be blanked`);
			validation = false;
			break;
		}
	}

	if (validation) {
		const s = new Student();
		s.addNewStudent(studentInfo);
	}
}

document.getElementById("viewStudents").addEventListener("click", function () {
	const s = new Student();
	const resultBody = document.querySelector('#view-student table tbody');
	s.viewStudent(resultBody);
});



/*****************Teacher Action**************/
//Save teacher data code with validation

document.getElementById("saveTeacher").addEventListener("click", function () {

	const name = document.getElementById("teacherName").value;
	const expertise = document.getElementById("teacherExpertise").value;

	if (name === "" || expertise === "") {
		alert("All fields required");
		return;
	}

	const t = new Teacher();
	t.addTeacher({ name, expertise });
});



/***************Class Actions****************/

//Add class code
document.getElementById("add-new-class").addEventListener("click", function () {
	const className = document.getElementById("class_name").value;
	if (className) {
		const c = new Classes();
		c.addNewClass(className, 'class_name');
	} else {
		alert("Add Class Name");
	}
});

//Load teacher name in dropdown
document.getElementById('Add-Subject-Menu').addEventListener("click", function () {

	const existingClasses = localStorage.getItem("classes") || "[]";
	const classes = JSON.parse(existingClasses);
	const classDropdown = document.getElementById("class-dropdown");
	classDropdown.innerHTML = "<option value=''>Select Class</option>";

	classes.forEach(c => {
		const option = document.createElement("option");
		option.value = c;
		option.textContent = "Class " + c;
		classDropdown.appendChild(option);
	});

	loadTeachersInDropdown();
});

//Code for showing teacher name in teacher dropdown
function loadTeachersInDropdown() {

	const teacherDropdown = document.getElementById("teacher-dropdown");
	const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
	teacherDropdown.innerHTML = "<option value=''>Select Teacher</option>";

	teachers.forEach(t => {
		const option = document.createElement("option");
		option.value = t.name;
		option.textContent = t.name;
		teacherDropdown.appendChild(option);
	});
};