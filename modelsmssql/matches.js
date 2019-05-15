
module.exports = function(sequelize, Sequelize) {
   const matches = sequelize.define('MATCHES', {
       match_id: {
           primaryKey: true,
           type: Sequelize.INTEGER,
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
   });

   return users;
}
