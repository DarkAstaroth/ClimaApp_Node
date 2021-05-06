const fs = require('fs');
const axios = require('axios');
require('dotenv').config();


class Busquedas {
    historial = [];
    dbPath = './db/datatable.json';

    constructor() {
        this.leerDb();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metrics',
            lang:'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => (
                p[0].toUpperCase() + p.substring(1)
            ));
            
            return palabras.join(' ');
        });
    }

    async ciudad(lugar = '') {

        try {

            // peticion http

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat:lugar.center[1]
            }));
            return [];

        } catch (error) {
            console.log(error);
            return [];

        }
    }

    async climaLugar(lat, lng) {
        try {

            // intance axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsWeather,
                    lat:lat,
                    lon:lng,
                }
            });
            
            //resp.data

            const resp = await instance.get();
            const { weather, main }=  resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp:main.temp
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        };

        // Restringe a 5 datos en el historial
        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar la Db
        this.guardarDB();

    }
    
    guardarDB() {
        const payload = {
            historial : this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    leerDb() {

        // debe de Existir...
        if (!fs.existsSync(this.dbPath)) return;
        
        // Cargar la informacion
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;
        
    }

}

module.exports = Busquedas;