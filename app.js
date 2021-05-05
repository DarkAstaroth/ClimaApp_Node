const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");


const main = async () => {
    let opt;

    do {
        
        opt = await inquirerMenu();
        await pausa();

    } while (opt !== 0 );
}

main();