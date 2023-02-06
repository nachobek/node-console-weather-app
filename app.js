const { inquirerMenu, inquirerPause, readInput } = require("./helpers/inquirer");


const main = async () => {
    let option = '';

    do {
        option = await inquirerMenu();
        await inquirerPause();
    } while (option !== 0);
}

main();