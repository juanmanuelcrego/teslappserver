const express = require('express')
const router = express.Router()
const electricService = require('./electric.service')

// routes
router.post('/newelectric', newelectric);
router.get('/', getAllElectrics);
router.get('/electrics', getElectrics);
router.get('/:id', getElectricById);
router.put('/:id', updateElectric);
router.delete('/:id', _deleteElectric);

module.exports = router;

// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function newelectric(req, res, next) {
    electricService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllElectrics(req, res, next) {
    electricService.getAll()
        .then(electrics => res.json(electrics))
        .catch(err => next(err));
}

function getElectrics(req, res, next) {
    electricService.getById(req.battery.sub)
        .then(electric => electric ? res.json(electric) : res.sendStatus(404))
        .catch(err => next(err));
}

function getElectricById(req, res, next) {
    electricService.getById(req.params.id)
        .then(electric => electric ? res.json(electric) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateElectric(req, res, next) {
    electricService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteElectric(req, res, next) {
    electricService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}