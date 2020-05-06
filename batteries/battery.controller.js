const express = require('express')
const router = express.Router()
const batteryService = require('./battery.service')

// routes
router.post('/newbattery', newbattery);
router.get('/', getAllBatteries);
router.get('/batteries', getBatteries);
router.get('/:id', getBatteryById);
router.put('/:id', updateBattery);
router.delete('/:id', _deleteBattery);

module.exports = router;

function newbattery(req, res, next) {
    batteryService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllBatteries(req, res, next) {
    batteryService.getAll()
        .then(betteries => res.json(batteries))
        .catch(err => next(err));
}

function getBatteries(req, res, next) {
    batteryService.getById(req.battery.sub)
        .then(battery => battery ? res.json(battery) : res.sendStatus(404))
        .catch(err => next(err));
}

function getBatteryById(req, res, next) {
    batteryService.getById(req.params.id)
        .then(battery => battery ? res.json(battery) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateBattery(req, res, next) {
    batteryService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteBattery(req, res, next) {
    batteryService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}