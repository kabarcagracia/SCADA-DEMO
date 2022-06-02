const { Schema, model} = require('mongoose');

const devicesSchema = new Schema({
    nameDevice: {
        type: String
    },
    data: {
        type: Array
    }
});
module.exports = model('Device', devicesSchema);