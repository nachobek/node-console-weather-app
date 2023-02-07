// Third party packages.
require('dotenv').config();
require('colors');

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

                // If cancel is selected, go back to the main menu.
                if (location_id_selected === 0) {
                    continue;
                }

                // Get info for the selected location.
                const selected_location = await location_result.find(location => location.id === location_id_selected);

                // Store selected location in DB.
                search.addHistory(selected_location);

                //Get weather info.
                const selected_location_weather = await search.weatherByLocation(selected_location.latitude, selected_location.longitude);

                //Show weather.
                console.clear();
                console.log('\n=============================='.green);
                console.log('     Location Information'.white);
                console.log('==============================\n'.green);
                console.log('Location:'.green, selected_location.name.white);
                // console.log('Latitude:', selected_location.latitude);
                // console.log('Longitude', selected_location.longitude);
                console.log('Weather Conditions:'.green, selected_location_weather.description.white);
                console.log('Current Temperature:'.green, selected_location_weather.currentTemp);
                console.log('Min Temperature:'.green, selected_location_weather.minTemp);
                console.log('Max Temperature:'.green, selected_location_weather.maxTemp);

                break;

            case 2:
                //Show search history.
                console.clear();
                console.log('\n=============================='.green);
                console.log('        Search History'.white);
                console.log('==============================\n'.green);

                search.readDb();

                search.history.forEach((location, i) => {
                    console.log(`${(i+1 + '.').green} ${location.name.white}`);
                });
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