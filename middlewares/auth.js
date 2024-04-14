const { validtoken } = require("../Services/auth");

function checkforauthenticationofcookie(cookieName) {
    return (req, res, next) => {
        const tokenCookievalue = req.cookies[cookieName];
        if(!tokenCookievalue) {
          return next();
        }
       
        try {
            const userPayload = validtoken(tokenCookievalue);
            req.user = userPayload;
        } catch (error) {  }
        return next();
    }
}

module.exports = {
    checkforauthenticationofcookie,
}