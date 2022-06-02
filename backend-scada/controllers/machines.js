const { response } = require('express');
const express = require('express');
const Machine = require('../models/machines');
const User = require('../models/users');

exports.getInfo = async (req, res) => {
    Machine.find()
    .select("tracker devices")
    .then(response => {
        let usuarios = 0;
        User.find()
        .then(response2 => {
            usuarios = response2.length;

            let maquinas = response.length;
        let dispositivos = 0;
        let sensores = 0;
        for(let i=0; i < response.length; i++){
            dispositivos += response[i].devices.length;
            if(response[i].tracker) {
                dispositivos +=1;
            }
            for(let j = 0; j < response[i].devices.length; j ++){
                sensores += response[i].devices[j].sensors.length;
            }
        }
        res.json({res: response, machines: maquinas, devices: dispositivos, sensors: sensores, users: usuarios});
        })
        .catch(error => {
            res.status(404).json(error);
        });
    }).catch(error => {
        res.status(404).json(error);
    });
};
exports.createMachine = async (req, res) => {
    const machine = new Machine(req.body);

    machine.save()
    .then( response => {
        res.json({newUser: response.email});
    }).catch((error) =>{
        res.status(404).json(error);
    });
};
/*
exports.editUser = async (req, res) => {
    const { id, update } = req.body;
    User.findOneAndUpdate({ 
        _id: id
    }, 
    update)
    .select("-password")
    .then((response) => {
        res.json(response);
    }).catch((error) => {
        res.status(404).json(error);
    }); 
};

exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    console.log("id es :", id);
    User.deleteOne({_id: id})
    .then((response) => {
        res.json({response});
    })
    .catch((error) => {
        res.status(404).json(error);
    });
};*/

exports.findMachine = async (req, res) => {
    await Machine.find()
    .then((response) =>{
        res.json(response);
    }).catch((error) =>{
        res.status(404).json(error);
    });
};
/*exports.findOneUser = async (req, res) => {
    await User.findOne({_id: req.body.id})
    .select("-password") //retorna todo menos el campo password
    .then((response) =>{
        res.json(response);
    }).catch((error) =>{
        res.status(404).json(error);
    });
};*/