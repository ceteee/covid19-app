const request = require('postman-request')

const dataChart  = (address, callback) => {
    const url = 'https://api.covid19api.com/total/dayone/country/' +  encodeURIComponent(address) + ''

    request({ url : url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.length === 0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, body)
        }
    })
}



module.exports = dataChart