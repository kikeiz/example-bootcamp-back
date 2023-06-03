const DataTypes = require('sequelize');

volunteerModel = {
    create: async (sequelize) => {
        const Volunteers = sequelize.define('volunteers', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            pass: {
                type: DataTypes.STRING,
                allowNull: false
            },
            availability: {
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
            studies: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rol: {
                type: DataTypes.STRING,
                allowNull: true
            },
            car: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            volunteer_since: {
                type: DataTypes.DATE,
                allowNull: true
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            comments:{
                type: DataTypes.STRING,
                allowNull: true
            }

        }, {
            timestamps: false
        });

        return Volunteers;

    }
}

module.exports = volunteerModel;