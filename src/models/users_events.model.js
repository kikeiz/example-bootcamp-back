const DataTypes = require('sequelize');

users_eventsModel= {
    create: async (sequelize) => {
        const UserEvents = sequelize.define('users_events', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            fk_id_events: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return UserEvents;

    }
}

module.exports = users_eventsModel;