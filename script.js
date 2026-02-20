const data = {
"PRIMER AÑO": {
"I SEMESTRE": [
"ÁLGEBRA LINEAL",
"CÁLCULO EN UNA VARIABLE",
"QUÍMICA GENERAL",
"DIBUJO EN INGENIERÍA",
"METODOLOGÍA DEL TRABAJO ACADÉMICO",
"INTRODUCCIÓN A LA INGENIERÍA",
"ANÁLISIS SITUACIONAL Y PROSPECTIVA DIGITAL"
],
"II SEMESTRE": [
"REALIDAD NACIONAL",
"CÁLCULO EN VARIAS VARIABLES",
"FÍSICA I",
"QUÍMICA ORGÁNICA",
"GEOMETRÍA DESCRIPTIVA",
"LINGÜÍSTICA, COMPRENSIÓN Y REDACCIÓN ACADÉMICA",
"FUNDAMENTOS DE LA CIENCIA DE DATOS"
]
},
"SEGUNDO AÑO": {
"III SEMESTRE": [
"CIUDADANÍA E INTERCULTURALIDAD",
"ECONOMÍA EN INGENIERÍA",
"FISICOQUÍMICA",
"FÍSICA II",
"ECUACIONES DIFERENCIALES",
"ESTÁTICA Y RESISTENCIA DE MATERIALES",
"DESARROLLO EMOCIONAL, GESTIÓN DE CONFLICTOS Y LIDERAZGO"
],
"IV SEMESTRE": [
"ALGORITMOS Y PROGRAMACIÓN",
"ECOLOGÍA Y CONSERVACIÓN AMBIENTAL",
"ANÁLISIS DE DATOS I",
"TERMODINÁMICA",
"ELECTRICIDAD Y SISTEMAS DE ALIMENTACIÓN Y PROTECCIÓN",
"INGENIERÍA FINANCIERA I"
]
}
};

const prerequisites = {
"CÁLCULO EN VARIAS VARIABLES": ["CÁLCULO EN UNA VARIABLE"],
"QUÍMICA ORGÁNICA": ["QUÍMICA GENERAL"],
"GEOMETRÍA DESCRIPTIVA": ["DIBUJO EN INGENIERÍA"],
"ECONOMÍA EN INGENIERÍA": ["INTRODUCCIÓN A LA INGENIERÍA"],
"FISICOQUÍMICA": ["QUÍMICA ORGÁNICA"],
"FÍSICA II": ["FÍSICA I"],
"ECUACIONES DIFERENCIALES": ["CÁLCULO EN VARIAS VARIABLES"],
"ESTÁTICA Y RESISTENCIA DE MATERIALES": ["FÍSICA I"],
"ALGORITMOS Y PROGRAMACIÓN": ["CÁLCULO EN VARIAS VARIABLES"],
"ANÁLISIS DE DATOS I": ["ECONOMÍA EN INGENIERÍA"],
"TERMODINÁMICA": ["FISICOQUÍMICA"],
"INGENIERÍA FINANCIERA I": ["ECONOMÍA EN INGENIERÍA"]
};

const approved = new Set(JSON.parse(localStorage.getItem("approvedCourses")) || []);

function saveProgress(){
localStorage.setItem("approvedCourses", JSON.stringify([...approved]));
}

function canUnlock(course){
if(!prerequisites[course]) return true;
return prerequisites[course].every(req => approved.has(req));
}

function toggleCourse(course, element){
if(!canUnlock(course)) return;

if(approved.has(course)){
approved.delete(course);
element.classList.remove("approved");
}else{
approved.add(course);
element.classList.add("approved");
}

saveProgress();
updateLocks();
}

function updateLocks(){
document.querySelectorAll(".course").forEach(div=>{
const name = div.dataset.name;

if(canUnlock(name)){
div.classList.remove("locked");
}else{
div.classList.add("locked");
div.classList.remove("approved");
approved.delete(name);
}
});
saveProgress();
}

function createMalla(){
const container = document.getElementById("malla");

for(const year in data){
const yearDiv = document.createElement("div");
yearDiv.className="year";

const title = document.createElement("h2");
title.textContent = year;
yearDiv.appendChild(title);

const semestersDiv = document.createElement("div");
semestersDiv.className="semesters";

for(const sem in data[year]){
const semDiv = document.createElement("div");
semDiv.className="semester";

const semTitle = document.createElement("h3");
semTitle.textContent = sem;
semDiv.appendChild(semTitle);

data[year][sem].forEach(course=>{
const c = document.createElement("div");
c.className="course";
c.textContent=course;
c.dataset.name=course;

if(approved.has(course)){
c.classList.add("approved");
}

c.addEventListener("click", ()=>toggleCourse(course,c));
semDiv.appendChild(c);
});

semestersDiv.appendChild(semDiv);
}

yearDiv.appendChild(semestersDiv);
container.appendChild(yearDiv);
}

updateLocks();
}

createMalla();
