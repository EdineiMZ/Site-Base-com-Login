'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0 // 0 = usuario, 4 = admin
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        // Campo para armazenar imagem de perfil (BLOB)
        profileImage: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
    }, {
        tableName: 'Users',
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });

    return User;
};
