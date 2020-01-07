const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpdmFuc2htMTgiLCJhIjoiY2s0d2lpMWVkMWJtejNlbXphNThlZjNxdiJ9.Q8jXB1ZzCAkzfbXhq9YPtQ&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name  
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;