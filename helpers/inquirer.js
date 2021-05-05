const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
require('colors');

const preguntas = [
    {
  
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opcion'.white);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async (mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const confirmar = async (mensaje) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = { inquirerMenu, pausa, leerInput, confirmar}