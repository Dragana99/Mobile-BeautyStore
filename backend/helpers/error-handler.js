//na osnovu tipa errora se dislay-uje error message
function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({message: "Korisnik nije autorizovan"})
    }

    if (err.name === 'ValidationError') {
        return res.status(401).json({message: "Error validacije"})
    }

    // default to 500 server error
    return res.status(500).json(err);
}

module.exports = errorHandler;