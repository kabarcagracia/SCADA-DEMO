const { Schema, model} = require('mongoose');

const devicesSchema = new Schema({
    nameDevice: {
        type: String,
        unique: true,
        required: true
    },
    data: {
        type: Array
    }
});
module.exports = model('Device', devicesSchema);