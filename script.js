document.querySelectorAll(".curso").forEach(curso => {

  curso.addEventListener("click", function(){

    if(this.classList.contains("bloqueado")) return;
    if(this.classList.contains("aprobado")) return;

    this.classList.add("aprobado");
    actualizar();
  });

});

function actualizar(){

  document.querySelectorAll(".curso.bloqueado").forEach(curso => {

    const prereq = curso.getAttribute("data-prereq");
    if(!prereq) return;

    const requisitos = prereq.split(",");

    const listo = requisitos.every(req =>
      document.querySelector(`[data-id='${req.trim()}']`)
      ?.classList.contains("aprobado")
    );

    if(listo){
      curso.classList.remove("bloqueado");
    }

  });

}
