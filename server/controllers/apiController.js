const request = require('request');

// Middleware for Stock GET and POST requests - Added on April 19th 
const apiController = {
    // redirected from GET '/api/:symbol' endpoint
    getStockValue(req, res, next) {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            qs: {symbol: req.params.symbol, function: "GLOBAL_QUOTE"},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': 'O5XCY5QIU450IZMX'
            }
        };
        request(options, (err, res, body) => {
            if (err) return next(err)
            console.log(body)
            next()
        })
    },
    // redirected from POST '/api/buy' endpoint
    buyStock(req, res, next) {

    },
    // redirected from POST '/api/sell' endpoint
    sellStock(req, res, next) {

    }
}

module.exports = apiController;