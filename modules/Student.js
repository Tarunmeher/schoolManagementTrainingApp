import Credential from '../config/credential.json' with {type: 'json'};
export class Student {
    constructor() {

    }

    addNewStudent(studentInfo) {
        const existingStudents = localStorage.getItem("students") || "[]";
        const students = JSON.parse(existingStudents);
        students.push(studentInfo);
        localStorage.setItem("students", JSON.stringify(students));
        alert("Student Added Successfully");
        for (let keyname in studentInfo) {
            document.getElementById(keyname).value = "";
        }
    }

    viewStudent(resultBodyElement) {
        const existingStudents = localStorage.getItem("students") || "[]";
        const students = JSON.parse(existingStudents);
        if (students.length) {
            let resultArray = [];
            students.forEach((element, index) => {
                resultArray.push(`<tr><td class="p-3 border">#${index + 1}</td><td class="p-3 border">${element.name}</td><td class="p-border"> 
                                <button class="edit-btn text-blue-600 mr-2" data-index="${index}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="delete-btn text-red-600" data-index="${index}"><i class="fas fa-trash"></i> Delete</button>
                                </td></tr>`);
            });
            resultBodyElement.innerHTML = resultArray.join("");
        } else {
            resultBodyElement.innerHTML = "<tr><td colspan='3' class='text-center'>No Record Found !</td></tr>";
        }
    }
}



let currentEditIndex = null;

// Table click handler (event delegation)
document.addEventListener("click", function (e) {

    // EDIT button
    if (e.target.closest(".edit-btn")) {
        const btn = e.target.closest(".edit-btn");
        currentEditIndex = btn.dataset.index;
        const students = JSON.parse(localStorage.getItem("students"));
        document.getElementById("editName").value = students[currentEditIndex].name;
        document.getElementById("editEmail").value = students[currentEditIndex].stud_email;
        document.getElementById("editStudentPopup").classList.remove("hidden");
    }

    // DELETE button
    if (e.target.closest(".delete-btn")) {
        const btn = e.target.closest(".delete-btn");
        const index = btn.dataset.index;
        const students = JSON.parse(localStorage.getItem("students"));
        if (!confirm("Delete this student?")) return;
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        location.reload();
    }
});

document.getElementById("saveEdit").addEventListener("click", function () {
    const students = JSON.parse(localStorage.getItem("students"));
    students[currentEditIndex].name =
        document.getElementById("editName").value;
    students[currentEditIndex].stud_email =
        document.getElementById("editEmail").value;
    localStorage.setItem("students", JSON.stringify(students));
    closePopup();
    location.reload();
});

document.getElementById("cancelEdit").addEventListener("click", closePopup);
function closePopup() {
    document.getElementById("editStudentPopup").classList.add("hidden");
}
