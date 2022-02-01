var bcrypt = require('bcryptjs');
module.exports = (sequelize, Sequelize) => {


  const User = sequelize.define("user", {
    id: {
      // type: Sequelize.UUID,
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "email invalid"
        }
      }
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tel: {
      type: Sequelize.STRING(8),
      validate: {
        is: /^\d+$/,
        len: {
          args: 10,
          msg: "invalid tel number"
        }
      }
    },

  }, {

    hooks: {
      beforeValidate: hashPassword
    },
  });



  // Compare passwords
  User.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
      if (error) {
        return callback(error);
      }

      return callback(null, isMatch);
    });
  }

  // Hash the password
  function hashPassword(user) {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(function (password) {
        user.password = password;
      });
    }
  }



  return User;
};