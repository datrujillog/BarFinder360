class GeneralError extends Error {
    constructor(message, code) {
        super();
        this.message = message;
        this.code = code;
    }

    getCode() { // si se necesita crear un nuevo error va aca 
        if (this instanceof BadRequest) {
            return 400;
        }
        if (this instanceof NotFound) {
            return 404;
        }
        if (this instanceof Unauthorized) {
            return 401;
        }
        return 500;

    }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}

module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    Unauthorized
};