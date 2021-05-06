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
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);

                // Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ',lugarSel.nombre.green);
                console.log('Lat: ',lugarSel.lat);
                console.log('Lng: ',lugarSel.lng);
                console.log('Tempertaura: ',clima.temp);
                console.log('Minima: ',clima.min);
                console.log('Maxima: ',clima.max);
                console.log('Como esta el clima: ',clima.desc.green)
                break;
         }
        
        
        if (opt !==0 ) await pausa();

    } while (opt !== 0 );
}

main();