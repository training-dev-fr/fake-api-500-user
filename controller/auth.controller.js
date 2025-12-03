const jwt = require('jsonwebtoken');
let data = require('./../data/users.json');

const login = async (req, res) => {
    let member = data.find(user => user.email === req.body.email);
    if (!member) {
        return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    return res.status(200).json({
        id: member.id,
        email: member.email,
        token: jwt.sign({
            id: member.id,
        }, "vpiruebgierubvpierbvie84e8gr4g69rt4g89rt")
    });
}

module.exports = {  login }