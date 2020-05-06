const db = require('../db/db')
const Battery = db.Battery

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Battery.find();
}

async function getById(id) {
    return await Battery.findById(id);
}

async function create(batteryParam) {
    // validate
    if (await Battery.findOne({ name: batteryParam.name })) {
        throw 'Batería "' + batteryParam.name + '" is already taken';
    }

    const battery = new Battery(batteryParam);

    // save battery
    await battery.save();
}

async function update(id, batteryParam) {
    const battery = await Battery.findById(id);

    // validate
    if (!battery) throw 'Battery not found';
    if (battery.name !== batteryParam.name && await Battery.findOne({ name: batteryParam.name })) {
        throw 'Batería "' + batteryParam.name + '" is already taken';
    }

    // copy batteryParam properties to user
    Object.assign(battery, batteryParam);

    await battery.save();
}

async function _delete(id) {
    await Battery.findByIdAndRemove(id);
}