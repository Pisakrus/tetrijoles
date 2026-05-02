window.N_ROWS = 14
window.N_COLUMNS = 10


// ---Frijoles and gitano---

const gitano = document.getElementById("gitano");
const frijoles = document.getElementById("frijoles");

let gitanocomiendo = false
frijoles.addEventListener("click", function() {

    if (gitanocomiendo) {
        console.log("gitano tiene hambre")
        gitano.src = "images/gitano.png"
       gitanocomiendo = false
    }
    else {
        console.log("gitano comió")
        gitano.src = ""
        gitanocomiendo = true
    }
});    
          
gitano.addEventListener("click", function() {
    alert("gitanoo");
});



