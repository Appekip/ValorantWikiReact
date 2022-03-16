import React from "react";
const url = 'https://valorant-api.com/v1/';
let uuid = "";
let search ="weapons";
let happened = false;

function Weapons() {

    fullData();
    return <div id="Weapons">
        <img src={"https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/largeart.png"} className="App-logo" alt="logo" id="b"/>
        <select id="select">
        </select>
        <button className="outline" type="button" onClick={change} id="button">
            <div className="label">
                <span className="hover-effect"></span>
                <span className="label-text">Change weapon</span>
            </div>
        </button>
        <select id="selectSkin">
        </select>
        <button className="outline" type="button" onClick={changeSkin} id="button">
            <div className="label">
                <span className="hover-effect"></span>
                <span className="label-text">Change skin</span>
            </div>
        </button>
    </div>
}
function change(){
    uuid = (document.getElementById("select").value);
    find();
    dbSave();
}

async function find() {

    const response = await fetch(url +search + "/"+ uuid);
    const data = await response.json();

        document.getElementById('b').src = data.data.displayIcon;

        document.getElementById("selectSkin").innerHTML = "";

        let df = document.createDocumentFragment();
        for (let j = 0; j < data.data.skins.length; j++) {
            let option = document.createElement("option");
            option.value = data.data.skins[j].uuid;
            option.appendChild(document.createTextNode(data.data.skins[j].displayName));
            df.appendChild(option);
        }
        document.getElementById("selectSkin").appendChild(df);
        changeSkin();
}

async function fullData() {
    const response = await fetch(url + search);
    const data = await response.json();
    if (!happened) {
    let df = document.createDocumentFragment();

    for (let i = 0; i < data.data.length; i++){
        let option = document.createElement("option");
        option.value = data.data[i].uuid;
        option.appendChild(document.createTextNode(data.data[i].displayName));
        df.appendChild(option);
    }
        document.getElementById("select").appendChild(df);
        change();
        happened = true;
    }
    else {
        happened = false;
    }
}

async function dbSave() {
    const response = await fetch("https://geolocation-db.com/json/");
    const data = await response.json();

    let ip = data.IPv4;
    let country = data.country_code;
    let date = new Date();
    let search = document.getElementById("select").value;

    const entry = {
        ip,
        country,
        search,
        date
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    };
    fetch('localhost:4000/Data', options);
    console.log("Fetch " + JSON.stringify(entry));
}

async function changeSkin() {
    uuid = (document.getElementById("selectSkin").value);
    const response = await fetch(url +search + "/skins/"+ uuid);
    const data = await response.json();
    document.getElementById('b').src=data.data.displayIcon;
}

export default Weapons;