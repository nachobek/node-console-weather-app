// Third party packages.
const axios = require('axios');

// Own modules.


//Class definition.
class Search {

    history = ['Madrid', 'Stevensville'];

    constructor() {
        // TODO: read from DB if exists.
    }

    // Creating a property so the API parameters can be easily reused.
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 6,
            'language': 'en'
        }
    }

    async city(location = ''){
        
        try {
            //http request
            // const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/stevensv.json?proximity=ip&types=place%2Cpostcode%2Caddress&language=en&access_token=pk.eyJ1IjoibmFjaGJlY2VycmEiLCJhIjoiY2xkdDFkYXZ0MDI3ODN2bDhjdDFpNjV4dyJ9.d2YOzhv2ExlqLoG4YyXkgA');
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
                params: this.paramsMapbox
            });
            
            const response = await instance.get();
            
            
            console.log(response.data);
    
            return []; //return cities found
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = Search;