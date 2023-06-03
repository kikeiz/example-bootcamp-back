const DataTypes = require('sequelize');

reportModel= {
    create: async (sequelize) => {
        const Reports = sequelize.define('reports', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            description_: {
                type: DataTypes.STRING,
                allowNull: true
            },
            date_: {
                type: DataTypes.DATE,
                allowNull: true
            },
            status_: {
                type: DataTypes.STRING,
                allowNull: true
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

        return Reports;

    }
}

module.exports = reportModel;