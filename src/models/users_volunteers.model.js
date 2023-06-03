const DataTypes = require('sequelize');

users_volunteersModel= {
    create: async (sequelize) => {
        const UserVolunteers = sequelize.define('users_volunteers', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_volunteer: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            fk_id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return UserVolunteers;

    }
}

module.exports = users_volunteersModel;