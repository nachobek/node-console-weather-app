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
            'types': ['place', 'poi'],
            'limit': 6,
            'language': 'en'
        }
    }

    getParamsWeatherMap(latitude, longitude) {
        return {
            'lat': latitude,
            'lon': longitude,
            'units': 'metric',
            'appid': process.env.OPENWEATHER_KEY
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
            
            // Using map arrow function we return a new array of objects, the object is defined as an object literal in within the curly braces.
            return response.data.features.map( (location) => ({
                id: location.id,
                name: location.place_name,
                longitude: location.center[0],
                latitude: location.center[1]
            }));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    

    async weatherByLocation(latitude, longitude) {
        try {
            const params = this.getParamsWeatherMap(latitude, longitude);

            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: params
            });

            const response = await instance.get();

            return {
                description: response.data.weather[0].description,
                currentTemp: response.data.main.temp,
                minTemp: response.data.main.temp_min,
                maxTemp: response.data.main.temp_max
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Search;