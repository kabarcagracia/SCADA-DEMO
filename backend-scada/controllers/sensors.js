const express = require('express');
const Machine = require('../models/machines');
const mongoose = require('mongoose');
const Device = require('../models/devices');
const { isValidObjectId } = require('mongoose');

exports.findSensors = async (req, res) => {
    const { idDevice, idMachine } = req.body;
    console.log(idDevice, idMachine);
    Machine.findOne({
        "_id": mongoose.Types.ObjectId(idMachine)
      },
      {
        devices: {
          "$elemMatch": {
            "_id": mongoose.Types.ObjectId(idDevice)
          }
        }
      }).then((response) =>{
        res.json(response);
    }).catch((error) =>{
        res.status(404).json(error);
    });
};
exports.findGps = async (req, res) => {
  const { idMachine } = req.body;
  console.log(idMachine);
  Machine.findOne({
      "_id": mongoose.Types.ObjectId(idMachine)
  }).then((response) =>{
      res.json(response);
  }).catch((error) =>{
      res.status(404).json(error);
  });
};

exports.findLastData = async (req, res) => {
    const { nameDevice } = req.body;
    console.log(req.body);
    Device.findOne({
        nameDevice: nameDevice
    },{
        data: {
            $slice: -30
        }
    }).then((response) => {
        res.json(response);
    
    }).catch((err) => res.status(404).json(err));
};  

exports.createSensors = async (req, res) => {
  const { idMachine, idDevice, data } = req.body;
  console.log(req.body);
  Machine.updateOne(
    { 
      _id: mongoose.Types.ObjectId(idMachine),
      devices: {  "$elemMatch": { "_id": mongoose.Types.ObjectId(idDevice) }}
    },
    { $push: { "devices.$.sensors": data }}
  ).then((response) => {
    res.json(response);
  }).catch((err) =>{
    res.status(404).json(err);
  });
};