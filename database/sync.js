const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const basename = 'index.js';
const db = {};





async function sync() {
    let sequelize;
    sequelize = new Sequelize(config.sequelize);

    const filesPath = __dirname + '/../models/'

    fs
        .readdirSync(filesPath)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = sequelize['import'](path.join(filesPath, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    await sequelize.sync({ force: true, alter: true })
}

sync().then(() => process.exit())