const axios = require('axios');


class Busquedas {
    historial = ['La Paz', 'Cochabamba', 'Santa Cruz'];
    constructor() {

    }

    async ciudad(lugar = '') {

        try {

            // peticion http
            // console.log('ciudad', lugar);
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return [];

        } catch (error) {

            return [];

        }
    }
}

module.exports = Busquedas;