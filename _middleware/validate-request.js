module.exports = valdiateRequest;

function valdiateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unkown props
        stripUnknown: true // remove unkown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }else {
        req.body = value;
        next();
    }
}