const Joi = require('joi');
const db = require('./connection');

// requirements:
// username: alphanumeric
// message: max length 500 characters
// imageURL: needs to be an https link, and is NOT required

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }).optional().allow('')
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    if (!message.username) message.username = 'Anonymous';
    
    const result = schema.validate(message);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    getAll,
    create
};