const axios = require('axios');


class Busquedas {
    historial = ['La Paz', 'Cochabamba', 'Santa Cruz'];
    constructor() {

    }

    async ciudad(lugar = '') {

        try {

            // peticion http
            // console.log('ciudad', lugar);
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/la%20paz.json?access_token=pk.eyJ1IjoiZGFya2FzdGFyb3RoIiwiYSI6ImNrb2NidnVuMjA1czYydW4xcmZqNTY1dnkifQ.TqrBba76H4a2icWzbW0QUw&autocomplete=true&limit=5&language=es');
            console.log(resp.data);
            return [];

        } catch (error) {

            return [];

        }
    }
}

module.exports = Busquedas;