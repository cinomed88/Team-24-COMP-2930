
module.exports = function(sequelize, Sequelize) {
   const matchParticipants = sequelize.define('MATCHES', {
       user_id: {
           primaryKey: true,
           type: Sequelize.STRING(50),
       },
       match_id: {
           primaryKey: true,
           type: Sequelize.INTEGER,
       },
   });

   return matchParticipants;
}
