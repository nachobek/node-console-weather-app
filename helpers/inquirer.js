const inquirer = require('inquirer');
const colors = require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Search for a city or location`
            },
            {
                value: 2,
                name: `${ '2.'.green } Search hitory`
            },
            {
                value: 0,
                name: `${ '0.'.green } Exit`
            }
        ]
    }
];



const continueOption = [
    {
        type: 'input',
        name: 'option',
        message: `Press ${'ENTER'.green} to continue.`
    }
];



const inquirerMenu = async () => {
    
    console.clear();
    console.log('=============================='.green);
    console.log('       Select an option'.white)
    console.log('==============================\n'.green);

    // option here is the name given in the menuOptions array. So we are destructuring the object being returned and grabbing option only.
    const { option } = await inquirer.prompt(menuOptions);

    return option
}



const inquirerPause = async () => {

    console.log('\n');
    return await inquirer.prompt(continueOption);
}



const readInput = async (input) => {
    const inputQuestion = [
        {
            type: 'input',
            name: 'taskDescription',
            message: input,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value.';
                }
                return true;
            }
        }
    ];

    const { taskDescription } = await inquirer.prompt(inputQuestion);

    return taskDescription;
}


const listLocations = async ( locations = [] ) => {
    const choices = locations.map((location, i) => {
        // Raturn a new array of objects {task.Id and task.Name}
        return {
            value: location.id,
            name: `${ colors.green(i+1) + '.'.green } ${location.name}.`
        }
    });

    // Appending a new option at the start of the array previously defined.
    choices.unshift({
        value: 0,
        name: `${'0.'.green} Cancelar.`
    });

    const options = [
        {
            type: 'list',
            name: 'id',
            message: 'Select location:',
            choices: choices
        }
    ];

    const { id } = await inquirer.prompt(options);

    return id;
}


const confirm = async (message) => {
    const conrifmOption = [
        {
            type: 'confirm',
            name: 'ok',
            message // same as --> message: message
        }
    ];

    const { ok } = await inquirer.prompt(conrifmOption);

    return ok;
}


const listTasksCheck = async ( tasks = [] ) => {
    const taskChoices = tasks.map((task, i) => {
        // Raturn a new array of objects {task.Id and task.Name}
        return {
            value: task.id,
            name: `${ colors.green(i+1) + '.'.green } ${task.description}.`,
            checked: (task.completedOn) ? true : false // Using ternary operator, if completedOn is NOT null, then checked is true else, false.
        }
    });

    
    const checkOption = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Check task',
            choices: taskChoices
        }
    ];

    const { id } = await inquirer.prompt(checkOption);

    return id;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    listLocations,
    confirm,
    listTasksCheck
}