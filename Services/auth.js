const JWT = require("jsonwebtoken");
const secret = "terimaaki";

function createTokenforuser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validtoken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenforuser,
    validtoken,
};