import React from "react";
let uuid = "6c56e968-4b9c-c9d6-068a-109a03b13866";
const url = 'https://valorant-api.com/v1/';
let search ="playercards";

function Agents() {
    fullData();
    find();
    function change(){
        uuid = (document.getElementById("Agents").value);
        find();
    }

    async function find() {

        const response = await fetch(url +search + "/"+ uuid);
        const data = await response.json();
        console.log(data);
        document.getElementById('a').textContent =data.data.displayName ;
        document.getElementById('b').src=data.data.largeArt;
    }

    async function fullData() {
        const data = [];
        const response = await fetch(url + search)
            .then((res) => res.json());
        data.push(response);
        console.log(data)
    }

    return <div id="Agents">
        <img src={"https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/largeart.png"} className="App-logo" alt="logo" id="b"/>
        <h2 id={"a"}></h2>

        <select id="Agents">
            <option value="6c56e968-4b9c-c9d6-068a-109a03b13866">Jett</option>
            <option value="1a42dc71-40aa-9873-4729-b788b043a644">Reyna</option>
            <option value="a89bd44e-4b47-7ce1-27a6-0189c1ad8c2f">Cypher</option>
            <option value="42cc3d8c-4e77-ee86-56bb-30a6025a89c0">Killjoy</option>
            <option value="9df9aa67-4ff7-988d-cf72-599a7d5fe2bf">Sage</option>
        </select>
        <button id="button" onClick={change}>Change</button>
    </div>

}

export default Agents;