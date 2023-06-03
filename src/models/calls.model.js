const DataTypes = require('sequelize');
calls_model= {
    create: async (sequelize) => {
        const Calls = sequelize.define('calls', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_id_from: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            fk_id_to: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            time_start: {
                type: DataTypes.DATE,
                allowNull: true
            },            
            time_finish: {
                type: DataTypes.DATE,
                allowNull: true
            },            
            answer: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return Calls;

    }
}

module.exports = calls_model; 