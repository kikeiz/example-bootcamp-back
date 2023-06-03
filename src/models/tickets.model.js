const DataTypes = require('sequelize');

ticketModel= {
    create: async (sequelize) => {
        const Tickets = sequelize.define('tickets', {
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
            fk_id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return Tickets;

    }
}

module.exports = ticketModel;