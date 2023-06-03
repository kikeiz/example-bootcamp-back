const DataTypes = require('sequelize');

eventModel= {
    create: async (sequelize) => {
        const Events = sequelize.define('_events', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name_: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description_: {
                type: DataTypes.STRING,
                allowNull: true
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true
            },
            postal_code: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            date_: {
                type: DataTypes.DATE,
                allowNull: true
            },
            theme: {
                type: DataTypes.STRING,
                allowNull: true
            },

        }, {
            timestamps: false
        });

        return Events;

    }
}

module.exports = eventModel;