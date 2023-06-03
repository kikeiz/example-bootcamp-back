const DataTypes = require('sequelize');

volunteer_eventsModel= {
    create: async (sequelize) => {
        const Volunteer_events = sequelize.define('volunteer_events', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_volunteer: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            fk_id_event: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return Volunteer_events;

    }
}

module.exports = volunteer_eventsModel;