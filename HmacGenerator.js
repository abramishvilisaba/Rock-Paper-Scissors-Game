const crypto = require("crypto");

class HmacGenerator {
    constructor() {}
    generateKey() {
        return crypto.randomBytes(32).toString("hex");
    }

    generateHmac(randomKey, message) {
        const hmac = crypto.createHmac("sha256", randomKey);
        hmac.update(message);
        return hmac.digest("hex");
    }
}
module.exports = HmacGenerator;
