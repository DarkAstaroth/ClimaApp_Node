require('dotenv').config();
const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busqueda');

const main = async () => {
    
    const busquedas = new Busquedas();
    
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                //Buscar los lugares 
                const lugares = await busquedas.ciudad(termino);
                
                //Seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === idSeleccionado);
                

                //Clima

                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ',lugarSel.nombre);
                console.log('Lat: ',lugarSel.lat);
                console.log('Lng: ',lugarSel.lat);
                console.log('Tempertaura: ');
                console.log('Minima: ');
                console.log('Maxima: ')
                break;
         }
        
        
        if (opt !==0 ) await pausa();

    } while (opt !== 0 );
}

main();