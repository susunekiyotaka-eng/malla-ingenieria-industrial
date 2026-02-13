document.querySelectorAll(".curso").forEach(curso => {

  curso.addEventListener("click", function(){

    if(this.classList.contains("bloqueado")){
      alert("Debes aprobar su requisito primero 💗");
      return;
    }

    this.classList.add("aprobado");

    desbloquearCursos();
  });

});

function desbloquearCursos(){

  document.querySelectorAll(".curso.bloqueado").forEach(curso => {

    let prereqs = curso.getAttribute("data-prereq");

    if(!prereqs) return;

    let requisitos = prereqs.split(",");

    let todosAprobados = requisitos.every(req =>
      document.querySelector(`[data-id='${req.trim()}']`)
      ?.classList.contains("aprobado")
    );

    if(todosAprobados){
      curso.classList.remove("bloqueado");
    }

  });

}
