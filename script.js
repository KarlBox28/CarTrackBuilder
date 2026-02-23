//pole ŘÁDKŮ a v řádcích prvky
let mrizka = [];
let selectedTexture = "grass";

IncializujPaletu();
PripravMrizku();
console.log(mrizka);
VykresliPolicka();

function PripravMrizku() {
    mrizka = [];
    for (let index = 0; index < 20; index++) {
        mrizka[index] = [];
    }

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            let newEl = document.createElement("div");
            let terrainEl = document.createElement("div");
            terrainEl.classList.add("terrain");
            terrainEl.classList.add("grass");
            let trackEl = document.createElement("div");
            trackEl.classList.add("track");
            newEl.append(terrainEl);
            newEl.append(trackEl);
            newEl.classList.add("cell");
            /*
            let txt = document.createElement("span");
            txt.innerHTML = `I'm on line ${i+1}, column ${j+1}`
            newEl.append(txt); */
            mrizka[i][j] = {
                element: newEl,
                texture: "grass",
                texture_variant: "none",
                row: i+1,
                column: j+1
            };

            newEl.addEventListener("click", () => {
                cellClick(mrizka[i][j]);
            })
        } 
    }
}

function VykresliPolicka() {
    let mainGrid = document.getElementById("main-grid");
    let cell;
    for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 20; c++) {
            cell = mrizka[r][c].element;
            cell.style.gridRow = `${r+1} / ${r+2}`;
            cell.style.gridColumn = `${c+1} / ${c+2}`;
            mainGrid.append(cell);
        } 
    }
}

function IncializujPaletu() {
    let paleta = document.querySelectorAll("#main-header ul li button");
    paleta.forEach(element => {
        element.addEventListener("click", () => {
            selectedTexture = element.dataset.texture;
            console.log("Vybráno: " + selectedTexture);
        });
    });
}

function cellClick(cellObj) {
    //console.log(`Clicked on line ${cellObj.row}, column ${cellObj.column}`);

    

    /*
    switch (cellObj.texture) {
        case "grass":
            cellObj.element.classList.remove("grass");
            cellObj.element.classList.add("road");
            cellObj.texture = "road";
            break;
        case "road":
            cellObj.element.classList.remove("road");
            cellObj.element.classList.add("water");
            cellObj.texture = "water";
            break;
        case "water":
            cellObj.element.classList.remove("water");
            cellObj.element.classList.add("grass");
            cellObj.texture = "grass";
            break;
    }*/

} 