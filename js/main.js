import { Auth } from "../modules/Auth.js";
import { Student } from "../modules/Student.js";
import { Classes } from "../modules/Classes.js";
import { Teacher } from "../modules/Teacher.js";


document.addEventListener("DOMContentLoaded", function () {
	// Code to run when the DOM is ready
	const auth = new Auth();
	auth.checkSession();
});


/**Student Actions */
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



/*****Teacher Action******/
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





/**Class Actions */
document.getElementById("add-new-class").addEventListener("click", function () {
	const className = document.getElementById("class_name").value;
	if (className) {
		const c = new Classes();
		c.addNewClass(className, 'class_name');
	} else {
		alert("Add Class Name");
	}
});
document.getElementById("addNewSubject").addEventListener("click", function () {
	const className = document.getElementById("class-dropdown").value;
	const subName = document.getElementById("subName").value;
	if (className && subName) {
		const c = new Classes();
		c.addNewSubjectToClass(className, subName);
	} else {
		alert("Please Enter Subject and Class Name");
	}
});

document.getElementById('Add-Subject-Menu').addEventListener("click", function () {
	const existingClasses = localStorage.getItem("classes") || "[]";
	const classes = JSON.parse(existingClasses);
	if (classes.length) {
		document.getElementById("class-dropdown").innerHTML = "";
		const options = [];
		options.push(`<option value=''>Select Class</option>`);
		classes.forEach(element => {
			options.push(`<option value='${element}'>Class ${element}</option>`);
		});
		document.getElementById("class-dropdown").innerHTML = options.join("");
	}
});
document.getElementById('View-Class-Wise-Subject').addEventListener("click", function () {
	const existingSubjects = localStorage.getItem("subjects") || "[]";
	const subjects = JSON.parse(existingSubjects);
	if (subjects.length) {
		const rows = [];
		document.getElementById('class-wise-subject-table-body').innerHTML = "";
		subjects.forEach((subject, index) => {
			const row = `<tr>
					<td class="p-3 border font-semibold text-blue-600">Class ${subject.class}</td>
					<td class="p-3 border">${subject.subject}</td>
					<td class="p-3 border">Mr. Tarun Meher</td>
					<td class="p-3 border">
						<button class="text-blue-600 mr-2 hover:underline"><i class="fas fa-edit"></i>
							Edit</button>
						<button class="text-red-600 hover:underline"><i class="fas fa-trash"></i>
							Delete</button>
					</td>
				</tr>`
			rows.push(row);
		});

		document.getElementById('class-wise-subject-table-body').innerHTML = rows.join("");

	}
});
