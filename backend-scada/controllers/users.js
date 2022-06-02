const express = require('express');
const User = require('../models/users');

exports.createUser = async (req, res) => {
    const user = new User(req.body);

    user.save()
    .then( response => {
        res.json({newUser: response.email});
    }).catch((error) =>{
        res.status(404).json(error);
    });
};

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
};

exports.findUser = async (req, res) => {
    await User.find()
    .select("-password") //retorna todo menos el campo password
    .then((response) =>{
        res.json(response);
    }).catch((error) =>{
        res.status(404).json(error);
    });
};
exports.findOneUser = async (req, res) => {
    await User.findOne({_id: req.body.id})
    .select("-password") //retorna todo menos el campo password
    .then((response) =>{
        res.json(response);
    }).catch((error) =>{
        res.status(404).json(error);
    });
};