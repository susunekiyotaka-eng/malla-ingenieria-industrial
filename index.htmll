<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Malla Interactiva - Ingeniería Industrial</title>

<style>
body{
    font-family:'Segoe UI',sans-serif;
    background:linear-gradient(135deg,#ffd6e8,#ffc2e2);
    margin:0;
    padding:20px;
    text-align:center;
}
h1{color:#ad1457;}

#malla{
    display:flex;
    flex-direction:column;
    gap:40px;
    margin-top:30px;
}

.year{
    background:white;
    padding:20px;
    border-radius:20px;
    box-shadow:0 6px 20px rgba(0,0,0,0.1);
}

.year h2{color:#c2185b;}

.semesters{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px;
    margin-top:15px;
}

.semester{
    background:#fce4ec;
    padding:15px;
    border-radius:15px;
}

.semester h3{
    margin-top:0;
    color:#880e4f;
}

.course{
    padding:8px;
    margin:5px 0;
    border-radius:10px;
    background:#f8bbd0;
    cursor:pointer;
    transition:0.2s;
    font-size:13px;
}

.course.locked{
    background:#eee;
    color:#999;
    cursor:not-allowed;
}

.course.approved{
    background:#ec407a;
    color:white;
    transform:scale(1.05);
}
</style>
</head>

<body>

<h1>🌸 Malla Interactiva - Ingeniería Industrial 🌸</h1>
<p>Haz clic en un curso para aprobarlo.</p>

<div id="malla"></div>

<script>
const data = {
"PRIMER AÑO":{
"I SEMESTRE":[
"ÁLGEBRA LINEAL",
"CÁLCULO EN UNA VARIABLE",
"QUÍMICA GENERAL",
"DIBUJO EN INGENIERÍA",
"METODOLOGÍA DEL TRABAJO ACADÉMICO",
"INTRODUCCIÓN A LA INGENIERÍA",
"ANÁLISIS SITUACIONAL Y PROSPECTIVA DIGITAL"
],
"II SEMESTRE":[
"REALIDAD NACIONAL",
"CÁLCULO EN VARIAS VARIABLES",
"FÍSICA I",
"QUÍMICA ORGÁNICA",
"GEOMETRÍA DESCRIPTIVA",
"LINGÜÍSTICA, COMPRENSIÓN Y REDACCIÓN ACADÉMICA",
"FUNDAMENTOS DE LA CIENCIA DE DATOS"
]
},
"SEGUNDO AÑO":{
"III SEMESTRE":[
"CIUDADANÍA E INTERCULTURALIDAD",
"ECONOMÍA EN INGENIERÍA",
"FISICOQUÍMICA",
"FÍSICA II",
"ECUACIONES DIFERENCIALES",
"ESTÁTICA Y RESISTENCIA DE MATERIALES",
"DESARROLLO EMOCIONAL, GESTIÓN DE CONFLICTOS Y LIDERAZGO"
],
"IV SEMESTRE":[
"ALGORITMOS Y PROGRAMACIÓN",
"ECOLOGÍA Y CONSERVACIÓN AMBIENTAL",
"ANÁLISIS DE DATOS I",
"TERMODINÁMICA",
"ELECTRICIDAD Y SISTEMAS DE ALIMENTACIÓN Y PROTECCIÓN",
"INGENIERÍA FINANCIERA I"
]
},
"TERCER AÑO":{
"V SEMESTRE":[
"INTRODUCCIÓN A LA METODOLOGÍA DE LA INVESTIGACIÓN CIENTÍFICA",
"ANÁLISIS DE DATOS II",
"INGENIERÍA DE MÉTODOS I",
"CONTROL DE PROCESOS",
"INGENIERÍA DE COSTOS Y PRESUPUESTOS",
"PROCESOS Y OPERACIONES UNITARIAS"
],
"VI SEMESTRE":[
"INVESTIGACIÓN OPERATIVA I",
"INGENIERÍA DE MÉTODOS II",
"PROCESOS DE MANUFACTURA",
"INGENIERÍA DE SEGURIDAD",
"INGENIERÍA DE PRODUCCIÓN",
"INGENIERÍA FINANCIERA II",
"DISEÑO DE PLANTAS INDUSTRIALES",
"POLÍTICAS PÚBLICAS Y ANTICORRUPCIÓN"
]
},
"CUARTO AÑO":{
"VII SEMESTRE":[
"GESTIÓN DEL TALENTO HUMANO",
"ANÁLISIS E INVESTIGACIÓN DE MERCADO",
"INVESTIGACIÓN OPERATIVA II",
"SISTEMAS DE INFORMACIÓN",
"INGENIERÍA ERGONÓMICA (E)",
"INGLÉS",
"ÉTICA GENERAL Y DEONTOLOGÍA"
],
"VIII SEMESTRE":[
"FORMULACIÓN Y EVALUACIÓN DE PROYECTOS",
"AUTOMATIZACIÓN INDUSTRIAL",
"GERENCIA DE MARKETING",
"INGENIERÍA DE MANTENIMIENTO",
"TALLER DE INNOVACIÓN",
"SISTEMAS DE GESTIÓN DE LA CALIDAD (E)"
]
},
"QUINTO AÑO":{
"IX SEMESTRE":[
"ADMINISTRACIÓN ESTRATÉGICA",
"INGENIERÍA DEL PRODUCTO",
"LOGÍSTICA INDUSTRIAL",
"SIMULACIÓN DE SISTEMAS",
"GESTIÓN DE PROYECTOS (E)",
"INTELIGENCIA ARTIFICIAL (E)",
"GESTIÓN AMBIENTAL (E)"
],
"X SEMESTRE":[
"TRABAJO DE INVESTIGACIÓN",
"PRÁCTICAS PRE PROFESIONALES",
"INDUSTRIA TEXTIL Y CONFECCIONES (E)",
"COMERCIO INTERNACIONAL (E)",
"PROYECTOS DE INVERSIÓN PUBLICA (E)",
"AGRONEGOCIOS (E)",
"PROCESOS MINEROS Y METALÚRGICOS (E)",
"GESTIÓN DE LA ENERGÍA (E)",
"GESTIÓN DE OPERACIONES (E)"
]
}
};

const prerequisites = {
"CÁLCULO EN VARIAS VARIABLES":["CÁLCULO EN UNA VARIABLE"],
"QUÍMICA ORGÁNICA":["QUÍMICA GENERAL"],
"GEOMETRÍA DESCRIPTIVA":["DIBUJO EN INGENIERÍA"],
"ECONOMÍA EN INGENIERÍA":["INTRODUCCIÓN A LA INGENIERÍA"],
"FISICOQUÍMICA":["QUÍMICA ORGÁNICA"],
"FÍSICA II":["FÍSICA I"],
"ECUACIONES DIFERENCIALES":["CÁLCULO EN VARIAS VARIABLES"],
"ESTÁTICA Y RESISTENCIA DE MATERIALES":["FÍSICA I"],
"ALGORITMOS Y PROGRAMACIÓN":["CÁLCULO EN VARIAS VARIABLES"],
"ANÁLISIS DE DATOS I":["ECONOMÍA EN INGENIERÍA"],
"TERMODINÁMICA":["FISICOQUÍMICA"],
"ANÁLISIS DE DATOS II":["ANÁLISIS DE DATOS I"],
"INGENIERÍA DE MÉTODOS I":["ANÁLISIS DE DATOS I"],
"INGENIERÍA FINANCIERA I":["ECONOMÍA EN INGENIERÍA"],
"INGENIERÍA DE COSTOS Y PRESUPUESTOS":["INGENIERÍA FINANCIERA I"],
"PROCESOS Y OPERACIONES UNITARIAS":["TERMODINÁMICA"],
"INVESTIGACIÓN OPERATIVA I":["ALGORITMOS Y PROGRAMACIÓN"],
"INVESTIGACIÓN OPERATIVA II":["INVESTIGACIÓN OPERATIVA I"],
"FORMULACIÓN Y EVALUACIÓN DE PROYECTOS":["ANÁLISIS E INVESTIGACIÓN DE MERCADO"],
"ANÁLISIS E INVESTIGACIÓN DE MERCADO":["ANÁLISIS DE DATOS II"],
"AUTOMATIZACIÓN INDUSTRIAL":["ELECTRICIDAD Y SISTEMAS DE ALIMENTACIÓN Y PROTECCIÓN"],
"INTELIGENCIA ARTIFICIAL (E)":["AUTOMATIZACIÓN INDUSTRIAL"]
};

const approved=new Set(JSON.parse(localStorage.getItem("approvedCourses"))||[]);

function save(){localStorage.setItem("approvedCourses",JSON.stringify([...approved]));}

function canUnlock(c){
if(!prerequisites[c])return true;
return prerequisites[c].every(r=>approved.has(r));
}

function toggle(c,el){
if(!canUnlock(c))return;
if(approved.has(c)){approved.delete(c);el.classList.remove("approved");}
else{approved.add(c);el.classList.add("approved");}
save();update();
}

function update(){
document.querySelectorAll(".course").forEach(div=>{
const name=div.dataset.name;
if(canUnlock(name))div.classList.remove("locked");
else{div.classList.add("locked");div.classList.remove("approved");approved.delete(name);}
});
save();
}

function create(){
const container=document.getElementById("malla");
for(const year in data){
const y=document.createElement("div");
y.className="year";
y.innerHTML="<h2>"+year+"</h2>";
const sems=document.createElement("div");
sems.className="semesters";

for(const s in data[year]){
const sd=document.createElement("div");
sd.className="semester";
sd.innerHTML="<h3>"+s+"</h3>";
data[year][s].forEach(c=>{
const div=document.createElement("div");
div.className="course";
div.textContent=c;
div.dataset.name=c;
if(approved.has(c))div.classList.add("approved");
div.onclick=()=>toggle(c,div);
sd.appendChild(div);
});
sems.appendChild(sd);
}
y.appendChild(sems);
container.appendChild(y);
}
update();
}

create();
</script>

</body>
</html>
