


module.exports = function(sequelize, Sequelize) {
   const users = sequelize.define('USERS', {
       user_id: {
           primaryKey: true,
           type: Sequelize.STRING(50),
       },
       user_name: {
           type: Sequelize.STRING(50),
           notEmpty: true
       },
       honor_point: {
           type: Sequelize.INTEGER,
           notEmpty: true
       },
       rank_point: {
           type: Sequelize.INTEGER,
           notEmpty: true,
       },
       rank_point2: {
           type: Sequelize.INTEGER,
           notEmpty: true,
       },
       rank_point3: {
           type: Sequelize.INTEGER,
           notEmpty: true,
       }
   });

   return users;
}
