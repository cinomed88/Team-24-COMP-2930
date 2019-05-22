
module.exports = function(sequelize, Sequelize) {
   const matchParticipants = sequelize.define('MATCH_PARTICIPANTS', {
       user_id: {
           primaryKey: true,
           type: Sequelize.STRING(50),
       },
       match_id: {
           primaryKey: true,
           autoIncrement: true,
           type: Sequelize.INTEGER,
       },
       is_host: {
           type: Sequelize.INTEGER,
       },
       does_win: {
           type: Sequelize.INTEGER,
       }
   });

   return matchParticipants;
}
