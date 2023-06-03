const DataTypes = require('sequelize');

userModel = {
    create: async (sequelize) => {
        const Users = sequelize.define('users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
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
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: true
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: true
            },
            strikes: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            interests: {
                type: DataTypes.STRING,
                allowNull: true
            },
            health_issues: {
                type: DataTypes.STRING,
                allowNull: true
            },
            car: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            comments:{
                type: DataTypes.STRING,
                allowNull: true
            },
            last_contact: {
                type: DataTypes.DATE,
                allowNull: true
            },
            priority: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        }, {
            timestamps: false
        });

        return Users;

    }
}

module.exports = userModel;