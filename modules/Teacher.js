export class Teacher {

    constructor() {

    }


    //Add new teacher code
    addTeacher(teacher) {
        const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
        teachers.push(teacher);
        localStorage.setItem("teachers", JSON.stringify(teachers));
        alert("Teacher Added Successfully");
        document.getElementById("teacherName").value = "";
        document.getElementById("teacherExpertise").value = "";
    };


    //View techer data code
    viewTeachers(tResultBody) {
        const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        if (teachers.length === 0) {
            tResultBody.innerHTML = "<tr><td colspan='3' class='text-center'>No Teachers Found !</td></tr>";
            return;
        };

        let rows = "";
        teachers.forEach((t, index) => {
            rows += `<tr>
                <td class="p-3 border">${t.name}</td>
                <td class="p-3 border">${t.expertise}</td>
                <td class="p-3 border">
                    <button class="text-blue-600 mr-2 hover:underline edit-teacher" data-index="${index}"><i class="fas fa-edit"></i> Edit </button>  
                    <button class="text-red-600 hover:underline delete-teacher" data-index="${index}"><i class="fas fa-trash"></i> Delete </button>
                </td>
            </tr>`;
        });

        tResultBody.innerHTML = rows;
    }
};


//View teacher data code
document.querySelector("[onclick=\"showSection('view-teacher')\"]").addEventListener("click", function () {

    const tbody = document.querySelector("#view-teacher tbody");
    const t = new Teacher();
    t.viewTeachers(tbody);
});


//Edit & delete teacher data code
let editTeacherIndex = null;

document.addEventListener("click", function (e) {

    //Edit teacher data code
    if (e.target.classList.contains("edit-teacher")) {
        editTeacherIndex = e.target.dataset.index;
        const teachers = JSON.parse(localStorage.getItem("teachers"));
        document.getElementById("editTeacherName").value = teachers[editTeacherIndex].name;
        document.getElementById("editTeacherExpertise").value = teachers[editTeacherIndex].expertise;
        document.getElementById("editTeacherPopup").classList.remove("hidden");
    }

    //Delete teacher data code
    if (e.target.classList.contains("delete-teacher")) {

        const index = e.target.dataset.index;
        const teachers = JSON.parse(localStorage.getItem("teachers"));

        if (!confirm("Delete this teacher?"))
            return;
        teachers.splice(index, 1);
        localStorage.setItem("teachers", JSON.stringify(teachers));
        location.reload();
    }
});


//Save and cancel button code
document.getElementById("saveTeacherEdit").addEventListener("click", function () {

    const teachers = JSON.parse(localStorage.getItem("teachers"));
    teachers[editTeacherIndex].name = document.getElementById("editTeacherName").value;
    teachers[editTeacherIndex].expertise = document.getElementById("editTeacherExpertise").value;
    localStorage.setItem("teachers", JSON.stringify(teachers));

    closeTeacherPopup();
    location.reload();
});

document.getElementById("cancelTeacherEdit").addEventListener("click", closeTeacherPopup);

function closeTeacherPopup() {
    document.getElementById("editTeacherPopup").classList.add("hidden");
}