const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users');
const machineControllers = require('../controllers/machines');
const deviceControllers = require('../controllers/devices');
const sensorsControllers = require('../controllers/sensors');

//USERS
router.post('/createUser', usersControllers.createUser);
router.get('/readUser', usersControllers.findUser);
router.post('/readOneUser', usersControllers.findOneUser);
router.put('/updateUser', usersControllers.editUser);
router.delete('/deleteUser', usersControllers.deleteUser);

//MACHINES
router.post('/createMachine', machineControllers.createMachine);
router.get('/readMachine', machineControllers.findMachine);
router.get('/getInfo', machineControllers.getInfo);


//DEVICES
router.post('/createDevice', deviceControllers.createDevice);
router.post('/readDevice', deviceControllers.findDevices);
router.post('/msgDevice', deviceControllers.msgDevice);

//SENSORS
router.post('/findSensor', sensorsControllers.findSensors);
router.post('/findLastData', sensorsControllers.findLastData);
router.post('/createSensor', sensorsControllers.createSensors);
router.post('/findGps', sensorsControllers.findGps);


module.exports = router;