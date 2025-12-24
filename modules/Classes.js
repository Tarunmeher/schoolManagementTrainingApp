export class Classes{
    constructor(){
        this.info = null;
    }
    addNewClass(className, idname){
        const existingClasses = localStorage.getItem("classes") || "[]";
        const classes = JSON.parse(existingClasses);
        const isClassExists = classes.some((element) => element == className);
        if(!isClassExists){
            classes.push(className);
            localStorage.setItem("classes", JSON.stringify(classes));
            alert("Class Added Successfully");
            document.getElementById(idname).value='';
        }else{
             alert("Class "+className +" Already Exists");
             document.getElementById(idname).value='';
        }
        
    }
    addNewSubjectToClass(className, subName){
        const existingSubjects = localStorage.getItem("subjects") || "[]";
        const subjects = JSON.parse(existingSubjects);
        subjects.push({class: className, subject:subName});
        localStorage.setItem("subjects", JSON.stringify(subjects));
        alert("New Subject Added Successfully");
        document.getElementById("class-dropdown").value='';
        document.getElementById("subName").value='';
    }
}