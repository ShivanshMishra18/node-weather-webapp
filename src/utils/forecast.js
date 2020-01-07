const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/401cb6c5bcd526df85ec1a436d12e27b/'+latitude+','+longitude+'?units=si';
    
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Error: Unable to fetch data.',undefined);
        } else if (body.error) {
            callback('Unable to find location.',undefined);
        } else {
            callback(undefined, {
                location: body.timezone,
                temperature: body.currently.apparentTemperature,
                precipProb: body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;