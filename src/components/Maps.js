import React from "react";
const url = 'https://valorant-api.com/v1/';
let search ="maps";

function Maps() {
    fullData();
    return <div id="maps">
    </div>
}

async function fullData() {
        const response = await fetch(url + search);
        const data = await response.json();
        let a = data.data.length / 2;
        let x = 0;
        let y = Math.round(a);
        let z = 0;
        for (let k = 0; k < Math.ceil(a); k++){
            x++;
            createMapRow(x);
            for (let i = 0; i < y; i++){
                createMap(z, x);
                document.getElementById("map" + z + "Title").textContent = data.data[z].displayName;
                document.getElementById("map" + z + "Img").src= data.data[z].splash;
                document.getElementById("map" + z + "Img").width = 256;
                document.getElementById("map" + z + "Img").height = 144;
                document.getElementById("map" + z + "schema").width = 256;
                document.getElementById("map" + z + "schema").height = 256;
                document.getElementById("map" + z + "schema").src=data.data[z].displayIcon;
                z++;
            }
        }
}

function createMap(a, k) {
    let map = document.createElement("div");
    map.id = "map" + a;
    let mapTitle = document.createElement("h2");
    mapTitle.id = "map" + a + "Title";
    let mapImg = document.createElement("img");
    mapImg.id="map" + a + "Img";
    let mapSchema = document.createElement("img");
    mapSchema.id="map" + a + "schema";
    map.appendChild(mapTitle);
    map.appendChild(mapImg);
    map.appendChild(mapSchema);
    document.getElementById("mapRow" + k).appendChild(map);
}
function createMapRow(k){
    let mr = document.createElement("div");
    mr.id = "mapRow" + k;
    mr.className = "mRow";
    document.getElementById("maps").appendChild(mr);
}

export default Maps;