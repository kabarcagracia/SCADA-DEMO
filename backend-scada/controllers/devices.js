const express = require('express');
const Machine = require('../models/machines');
const Device = require('../models/devices');
const iot = require('@google-cloud/iot');

exports.createDevice = async (req, res) => {
    const { idMachine, data } = req.body;
    const device = new Device({nameDevice: req.body.data.nameDevice});

    device.save()
    .then( response => {
        Machine.findOneAndUpdate({ 
            _id: idMachine
        },{     
            $push: {
              "devices": data
            }
        })
        .then((response) => {
            res.json(response);
    
    
    
        }).catch((err) =>{
            res.status(404).json(err);
        });
    }).catch((error) =>{
        res.status(404).json(error);
    });
    
    
    /**/
};
exports.findDevices = async (req, res) => {
    const { idMachine } = req.body;

    Machine.findOne({ _id: idMachine})
    .select("devices")
    .then((response) =>{
        res.json(response);
    }).catch((error) =>{
        res.status(404).json(error);
    });
};
exports.msgDevice = async (req, res) =>{
    const { status, idDevice } = req.body;
    let msg = "rel0";

    if(status){
        msg = "rel1";
    }

    const cloudRegion = 'us-central1';
    const projectId = 'testmqtt-325807';
    const registryId = 'testMqtt';
    const deviceId = idDevice;
    const iotClient = new iot.v1.DeviceManagerClient({
      // optional auth parameters.
    });

    const formattedName = iotClient.devicePath(
        projectId,
        cloudRegion,
        registryId,
        deviceId
    );

    const binaryData = Buffer.from(msg);
    
    const request = {
        name: formattedName,
        binaryData: binaryData,
    };

    try {
        
        const responses = await iotClient.sendCommandToDevice(request);

        console.log('Sent command: ', responses[0]);
        res.json(responses[0]);
    } catch (err) {

        console.error('Could not send command:', err);
        res.json(err);
    }
};