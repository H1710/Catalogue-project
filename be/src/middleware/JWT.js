const jwt = require('jsonwebtoken');

class token {
    static createToken() {
        let token = jwt.sign({ name: "noto" }, process.env.JWT_SECRET);
        console.log(token);
        return token;
    }

    static vertifyToken(token) {
        let key = process.env.JWT_SECRET;
        let data = null;
        jwt.verify(token, key, function (err, decode) {
            if (err) {
                console.log(err)
                return data;
            }
            console.log(decode)
            return decode
        })
    }
}
module.exports = token;

