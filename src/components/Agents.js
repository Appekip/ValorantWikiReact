import React from "react";
let uuid = "";
const url = 'https://valorant-api.com/v1/';
let search ="agents";
let happened = false;

function Agents() {
    fullData();

    return <div id="Agents">

        <img src={"https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/largeart.png"} id="b"/>
        <select id="select">
        </select>

        <button className="outline" type="button" onClick={change} id="button">
            <div className="label">
                <span className="hover-effect"></span>
                <span className="label-text">Change</span>
            </div>
        </button>


        <div id="info">
            <div id="agentClass">

            </div>
            <div id="abilities">

            </div>
        </div>
    </div>
}

async function fullData() {

    const response = await fetch(url + search + "?isPlayableCharacter=true");
    const data = await response.json();
    if (!happened){
        let df = document.createDocumentFragment();
        for (let i = 0; i < data.data.length; i++){
            let option = document.createElement("option");
            option.value = data.data[i].uuid;
            option.appendChild(document.createTextNode(data.data[i].displayName));
            df.appendChild(option);
        }
        document.getElementById("select").appendChild(df);

        createTemplateRole();
        happened = true;

        change();
    }

    else {
        happened = false;
    }



}

async function find() {
        const response = await fetch(url +search + "/"+ uuid);
        const data = await response.json();
        document.getElementById('b').src=data.data.displayIcon;
        document.getElementById('b').height = 256;
        document.getElementById('b').width = 256;

        document.getElementById("roleName").textContent = data.data.role.displayName;
        document.getElementById("roleImg").src= data.data.role.displayIcon;
        document.getElementById("roleDesc").textContent = data.data.role.description;

        document.getElementById("abilities").innerHTML = "";

    for (let i = 0; i < data.data.abilities.length; i++){
        createTemplateAbbi(i);
        document.getElementById("abb" + i + "Title").textContent = data.data.abilities[i].displayName;
        document.getElementById("abb" + i + "Img").src= data.data.abilities[i].displayIcon;
        document.getElementById("abb" + i + "Img").width = 128;
        document.getElementById("abb" + i + "Img").height = 128;
        document.getElementById("abb" + i + "Desc").textContent = data.data.abilities[i].description;
    }


}

function change(){
    uuid = (document.getElementById("select").value);
    find();
    dbSave();
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
    console.log(JSON.stringify(entry));
    fetch('http://localhost:3001/searches', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(entry)
    })
}

function createTemplateRole(){
    let role = document.createElement("div");
    role.id = "role";

    let title = document.createElement("h2");
    title.id = "roleName";

    let roleImg = document.createElement("img");
    roleImg.id="roleImg";
    roleImg.width = 128;
    roleImg.height = 128;

    let roleDesc = document.createElement("h3");
    roleDesc.id="roleDesc";

    role.appendChild(title);
    role.appendChild(roleImg);
    role.appendChild(roleDesc);
    document.getElementById("agentClass").appendChild(role);
}

function createTemplateAbbi(a) {
    let abb = document.createElement("div");
    abb.id = "abb" + a;

    let abbTitle = document.createElement("h2");
    abbTitle.id = "abb" + a + "Title";

    let abbImg = document.createElement("img");
    abbImg.id="abb" + a + "Img";

    let abbDesc = document.createElement("h3");
    abbDesc.id="abb" + a + "Desc";

    abb.appendChild(abbTitle);
    abb.appendChild(abbImg);
    abb.appendChild(abbDesc);
    document.getElementById("abilities").appendChild(abb);
}

export default Agents;