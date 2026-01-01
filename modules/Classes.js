export class Classes {
    constructor() {
        this.info = null;
    }


    addNewClass(className, idname) {
        const existingClasses = localStorage.getItem("classes") || "[]";
        const classes = JSON.parse(existingClasses);
        const isClassExists = classes.some((element) => element == className);
        if (!isClassExists) {
            classes.push(className);
            localStorage.setItem("classes", JSON.stringify(classes));
            alert("Class Added Successfully");
            document.getElementById(idname).value = '';
        } else {
            alert("Class " + className + " Already Exists");
            document.getElementById(idname).value = '';
        }

    };

    //Add subject and teacher to class code
    addNewSubjectToClass(className, subjectName, teacherName = "") {

        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        const subjectData = {
            class: className,
            subject: subjectName
        };

        //Add teacher only if selected
        if (teacherName !== "") {
            subjectData.teacher = teacherName;
        }

        subjects.push(subjectData);
        localStorage.setItem("subjects", JSON.stringify(subjects));

        alert("Subject Assigned Successfully");

        document.getElementById("class-dropdown").value = "";
        document.getElementById("subName").value = "";
        document.getElementById("teacher-dropdown").value = "";
    }
};

//Save button code
document.getElementById("addNewSubject").addEventListener("click", function () {

    const className = document.getElementById("class-dropdown").value;
    const subjectName = document.getElementById("subName").value;
    const teacherName = document.getElementById("teacher-dropdown").value;

    if (!className || !subjectName || !teacherName) {
        alert("Please fill all fields");
        return;
    }

    const c = new Classes();
    c.addNewSubjectToClass(className, subjectName, teacherName);
});


//View class wise subject code
document.getElementById('View-Class-Wise-Subject').addEventListener("click", function () {
    const existingSubjects = localStorage.getItem("subjects") || "[]";
    const subjects = JSON.parse(existingSubjects);
    if (subjects.length) {
        const rows = [];
        document.getElementById('class-wise-subject-table-body').innerHTML = "";
        subjects.forEach((subject, index) => {
            const row =
                `<tr>
					<td class="p-3 border font-semibold text-blue-600">Class ${subject.class}</td>
					<td class="p-3 border">${subject.subject}</td>
                    <td class="p-3 border">${subject.teacher || "Not Assigned"}</td>
					<td class="p-3 border">
						<button class="text-blue-600 mr-2 hover:underline"><i class="fas fa-edit"></i> Edit </button>
						<button class="text-red-600 hover:underline"><i class="fas fa-trash"></i> Delete </button>
					</td>
				</tr>`
            rows.push(row);
        });

        document.getElementById('class-wise-subject-table-body').innerHTML = rows.join("");

    }
});


