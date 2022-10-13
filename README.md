# ValorantWikiReact

My vision for the project was to make a wiki site for the video game Valorant, my main concern was future proofing so I avoided hard coding as much as possible. 
None of the displayed data is hardcoded, so the application needs a connection to the api to work. The application pulls data from the api and then generates the website's html
around the data it received from the api. Most of the site's html is created in a for loop based on the amount of data the api was able to give. 

Application was made using React, Node.js and Mysql. I also used two different API's for the data.

Api's used:
Valorant-API, https://valorant-api.com/
Geolocation, https://geolocation-db.com/json/

How it works:
When the application is launched and the user chooses what type of content they want to see (this example uses Agents, but most of the components work in a similar way) the
application loads the Agents.js component and runs the fullData() function and creates the template for the site. It creates and empty dropdown menu (select element) and a submit button.

    fullData(){

    First the function does a fetch request to the api (https://valorant-api.com/v1/agents) which has all of the data of the games many characters. The only data that intrests the 
    application is the name of the agent (displayName) and it's id in the api's database (uuid). All of this data is saved in a variable called data and then the app runs a for loop 
    data.data.lenth times. Each run of the loop creates an option for the select element, and sets the options value to the current data.data[i].uuid and it's text to
    data.data[i].displayName. 

    After the select element is populated the agents.js component runs the function createTemplateRole(){

      This function creates a div that holds the selected agents role's data. The game has multiple different roles of characters, for example a Duelist character is meant to be on the frontlines
      while a Controller is mainly played from the backline. 

    }

    Next in line is the change() function.

      change(){

       change runs the functions find() and dbSave() and also gets the selected agents uuid with document.getElementById("select").value);

        find(){

          Makes a new fetch request to the api with the currently selected agent's uuid (https://valorant-api.com/v1/agents/uuid), this returns more specific data on the selected 
          character and sets all of the websites content to the api's data. Data from the api is again saved into a variable data. Now with the data the app changes the pictures,
          role descriptions and abblities to be the selected agent's. There is a createTemplateAbbi() function, that works similarly to the createTemplateRole function.
          Since some of the Agents have 5 abilities, while most only have 4, this createTemplateAbbi() is repeated in a for loop data.abilities.leght times. 

        }

        dbSave(){

          First thing that happens is a feth request to  the geolocation api (https://geolocation-db.com/json/) and the data is saved to an variable called data.

          DISCLAIMER
          This geolocation API might get blocked by your browser security settings, to insure it works use Firefox. However this doesn't crash the app, it just doesn't save 
          anything to the db. 

          After this it gathers all of the data that will be saved and puts it into an variable called entry.

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

        This entry is then saved to the database, that runs with node.js.  
        }       
      }
    }

Now the app is up and runnig and the user can choose which agent's data they want to view, by selecting the agent's name from the dropdown menu. 

When the change button is pressed the change() funtion runs and the old agent's data gets replaced with the currently selected one's and the search is saved to the db. 

Most of the components work the same way, although they do have some differences. 
