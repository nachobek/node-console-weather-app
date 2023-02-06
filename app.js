// Third party packages.
require('dotenv').config();


// Own modules.
const { inquirerMenu, inquirerPause, readInput } = require("./helpers/inquirer");
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
                const location = await readInput('Enter city or location name: ');


                await search.city(location);


                // Search all matching locations.

                // Select desired location.

                //Get weather

                //Show weather.

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