// Third party packages.
require('dotenv').config();


// Own modules.
const { inquirerMenu, inquirerPause, readInput, listLocations } = require("./helpers/inquirer");
const Search = require("./models/search");


//Application.

const main = async () => {
    let option = '';

    const search = new Search();

    console.clear();

    do {
        option = await inquirerMenu();
        switch (option) {
            case 1:
                console.clear();

                // Search for a location.
                const location_search = await readInput('Enter city or location name: ');

                // Show all matching locations.
                const location_result = await search.city(location_search);

                // Select desired location from the list shown.
                const location_id_selected = await listLocations(location_result);

                // Get info for the selected location.
                const selected_location = await location_result.find(location => location.id === location_id_selected);

                //Get weather info.
                const selected_location_weather = await search.weatherByLocation(selected_location.latitude, selected_location.longitude);

                //Show weather.
                console.log('\nLocation Information\n');
                console.log('Location:', selected_location.name);
                console.log('Latitude:', selected_location.latitude);
                console.log('Longitude', selected_location.longitude);
                console.log('Weather Conditions:', selected_location_weather.description);
                console.log('Current Temperature:', selected_location_weather.currentTemp);
                console.log('Min Temperature:', selected_location_weather.minTemp);
                console.log('Max Temperature:', selected_location_weather.maxTemp);

                break;

            case 2:
                //Show search history.
                
                break;
        
            default:
                break;
        }

        if (option !==0) {
            await inquirerPause();
        }
    } while (option !== 0);
}

main();