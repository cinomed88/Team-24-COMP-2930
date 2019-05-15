
module.exports = function(sequelize, Sequelize) {
   const matches = sequelize.define('MATCHES', {
       match_id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER,
       },
       lat: {
           type: Sequelize.DECIMAL(18, 0),
           notEmpty: true
       },
       lng: {
           type: Sequelize.DECIMAL(18, 0),
           notEmpty: true
       },
       time: {
           type: Sequelize.TIME(7),
           notEmpty: true,
       },
       date: {
           type: Sequelize.DATE,
           notEmpty: true,
       },
       sport: {
           type: Sequelize.STRING(50),
           notEmpty: true,
       },
   });

   return matches;
}
