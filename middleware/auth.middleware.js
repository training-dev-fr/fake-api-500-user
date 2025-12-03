const jwt = require('jsonwebtoken');

const auth = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        try {
            req.payload = jwt.verify(token, "vpiruebgierubvpierbvie84e8gr4g69rt4g89rt");
            if(role && !req.payload.roles.some(r => r.name === role)){
                return res.status(401).json({ error: "You must be " + role + " to do this action" });
            }
            next();
        } catch (e) {
            return res.status(401).json({ error: "You must be authentified to do this action" });
        }
    }
}

module.exports = auth;