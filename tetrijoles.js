const n_rows = 12
const n_columns = 8

// Creates a row with n_columns of 0
let row = [];
for (let i = 0; i < n_columns; i++) row.push(0);

// Creates grid with n_rows of rows
let grid = [];
for (let i = 0; i < n_rows; i++) grid.push(row);

function llamaralgitano() {alert("gitanooo")}

const gitano = document.getElementById("gitano");

const frijoles = document.getElementById("frijoles_negros");

frijoles.addEventListener("click", function() {
    console.log("gitano tiene hambre")
    gitano.src = "images/gitano.png"});

gitano.addEventListener("click", llamaralgitano)