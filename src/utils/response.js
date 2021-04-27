

export const s = (res, statusCode = 200, status, data, message) => {
    return res.status(statusCode).send({
        status,
        data,
        message
    })
}


export class F {
    static notfound(res, data) {
        return res.status(404).send({
            status: false,
            message: data ? data : "not found",
        });
    }
    static serverError(res, data) {
        return res.status(400).send({
            status: false,
            message: data ? data : "internal server error",
        });
    }
    static unprocessedEntity(res, data) {
        return res.status(422).send({
            status: false,
            message: data ? data : "unprocessed entity",
        });
    }
    static clientError(res, data) {
        return res.status(400).send({
            status: false,
            message: data ? data : "Bad Request",
        });
    }
    static unauthenticated(res, data) {
        return res.status(401).send({
            status: false,
            message: data ? data : "user is unauthenticated",
        });
    }
    static alreadyExists(res, data) {
        return res.status(403).send({
            status: false,
            message: data ? data : "resource already exists",
        });
    }
}


export class InS {
    static failed(message) {
        return {
            status: false,
            message
        }
    }

    static success(data, message) {
        return {
            status: true,
            data,
            message
        }
    }
}
