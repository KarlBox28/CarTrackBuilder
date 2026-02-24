//pole ŘÁDKŮ a v řádcích prvky
let mrizka = [];
let selectedTexture = "grass";
let selectedTextureType = "terrain"

RozjedemTo();

function RozjedemTo() {
    const mainMenu = document.getElementById("main-menu");
    const editor = document.getElementById("main-grid");
    const editorHeader = document.getElementById("main-header");
    const loadPanel = document.getElementById("load-panel");
    const saveList = document.getElementById("save-list");

    document.getElementById("btn-new").addEventListener("click", () => {
        mainMenu.classList.add("hidden");
        editor.classList.remove("hidden");
        editorHeader.classList.remove("hidden")
        IncializujPaletu();
        PripravMrizku();
        console.log(mrizka);
        VykresliPolicka();
    });

    document.getElementById("btn-load").addEventListener("click", () => {
        loadPanel.classList.remove("hidden");
        vypisUlozeneMapy();
    });

    document.getElementById("btn-back").addEventListener("click", () => {
        loadPanel.classList.add("hidden");
    });

    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("Aplikace ukončena 🙂");
    });
}

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
            selectedTextureType = element.dataset.texture_type;
            console.log("Vybráno: " + selectedTexture+ " " + selectedTextureType);
        });
    });
}

function cellClick(cellObj) {
    //console.log(`Clicked on line ${cellObj.row}, column ${cellObj.column}`);
    const terrainEl = cellObj.element.querySelector(".terrain");
    const trackEl = cellObj.element.querySelector(".track");
    
    if(selectedTextureType === "terrain") {
        terrainEl.className = "terrain";
        terrainEl.classList.add(selectedTexture);
        cellObj.texture = selectedTexture;
    }
    else {
        if(selectedTexture != cellObj.texture){
            //zmenit
            trackEl.className = "track";
            if(selectedTexture === "none") {return;}
            trackEl.classList.add(addDefaultOrientation(selectedTexture));
            cellObj.texture = selectedTexture;
            cellObj.texture_variant = addDefaultOrientation(selectedTexture);
        } else {
            //stejna - otocit
            trackEl.className = "track"
            trackEl.classList.add(rotateTexture(cellObj.texture_variant))
            cellObj.texture = selectedTexture;
            cellObj.texture_variant = rotateTexture(cellObj.texture_variant);
        }
    }
    

}

function addDefaultOrientation(texture) {
    switch(texture) {
        case "straight":
            return "straight-LR"
        case "turn":
            return "turn-RD"
        case "junction-3":
            return "junction-3-U"
        case "junction-4":
            return "junction-4"
    }
}

function rotateTexture(texture) {
    switch(texture) {
        case "straight-LR":
            return "straight-UD";
        case "straight-UD":
            return "straight-LR";
        case "turn-RD":
            return "turn-LD";
        case "turn-LD":
            return "turn-LU";
        case "turn-LU":
            return "turn-RU";
        case "turn-RU":
            return "turn-RD";
        case "junction-3-U":
            return "junction-3-R";
        case "junction-3-R":
            return "junction-3-D";
        case "junction-3-D":
            return "junction-3-L";
        case "junction-3-L":
            return "junction-3-U";
        case "junction-4":
            return "junction-4";
    }
}