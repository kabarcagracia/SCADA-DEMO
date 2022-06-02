const { Schema, model} = require('mongoose');
const sensorSchema = new Schema({
    typeSensor: {
        type: String,
        enum: ['ai', 'do', 'di']
    },
    idSensor: {
        type: String
    },
    nameSensor: {
        type: String
    },
    color: {
        type: String
    },
    variable: {
        type: String
    }
});
const deviceSchema = new Schema({
    nameDevice: {
        type: String
    },
    idDevice: {
        type: String
    },
    description: {
        type: String
    },
    sensors: {
        type: [sensorSchema]
    },
    location: {
        lat: {
            type: String,
            required: true
        },
        lng: {
            type: String,
            required: true
        }
    }
});
const machinesSchema = new Schema({
    nameMachine: {
        type: String,
        required: true,
        unique:true,
        lowercase: true
    },
    description: {
        type: String,
        maxlength: 50,
        required: false
    },
    tracker: {
        type: Boolean,
        required: true,
        default: false
    },
    location: {
        lat: {
            type: Number,
            default: null
        },
        lng: {
            type: Number,
            default: null
        }
    },
    trackerData: {
        idDevice: {
            type: String
        },
        nameDevice: {
            type: String
        },
        description: {
            type: String
        }
    },
    urlImageMachine: {
        type: String,
        default: 'this is default'
    },
    devices: {
        type: [deviceSchema]
    },
    createUser: {
        type: Date,
        default: Date.now(),
        required: false
    }
});

module.exports = model('Machine', machinesSchema);