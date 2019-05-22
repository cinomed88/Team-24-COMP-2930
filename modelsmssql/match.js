
module.exports = function(sequelize, Sequelize) {
   const match = sequelize.define('MATCH', {
       match_id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER,
       },
       lat: {
           type: Sequelize.FLOAT,
           notEmpty: true
       },
       lng: {
           type: Sequelize.FLOAT,
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
       score: {
           type: Sequelize.STRING(50),
           notEmpty: true,
       }
   });

   return match;
}
