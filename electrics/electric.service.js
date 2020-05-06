const db = require('../db/db')
const Electric = db.Electric

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Electric.find();
}

async function getById(id) {
    return await Electric.findById(id);
}

async function create(electricParam) {
    // validate
    if (await Electric.findOne({ name: electricParam.name })) {
        throw 'Línea "' + electricParam.name + '" is already taken';
    }

    const electric = new Electric(electricParam);

    // save electric
    await electric.save();
}

async function update(id, electricParam) {
    const electric = await Electric.findById(id);

    // validate
    if (!electric) throw 'Battery not found';
    if (electric.name !== electricParam.name && await Electric.findOne({ name: electricParam.name })) {
        throw 'Línea "' + electricParam.name + '" is already taken';
    }

    // copy electricParam properties to user
    Object.assign(electric, electricParam);

    await electric.save();
}

async function _delete(id) {
    await Electric.findByIdAndRemove(id);
}