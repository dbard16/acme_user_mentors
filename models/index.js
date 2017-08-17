const Sequelize = require('sequelize');
const faker = require('faker');

const db = new Sequelize('postgres://localhost/acme_user_mentor', {
  logging: false
});

const Award = db.define('award', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  }

});

const User = db.define('user',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

Award.belongsTo(User);
User.hasMany(Award);
User.belongsTo(User, {as: 'mentor'});
User.hasMany(User, {as: 'mentees', foreignKey: 'mentorId'});

User.findUsersViewModel = function(){
  return User.findAll({
    include: [
    {model: Award}
    ]
  });

}
User.destroyById = function(id){
  return User.destroy({
    where :{
      id:id
    }
  })
}

User.removeAward = function(user, award){
  return Award.destroy({
    where :{
      id: award,
      userId: user
    }
  })
}

User.generateAward = function(user){
  var newAward = faker.company.catchPhrase();
  return Award.create({name: newAward, userId: user})

}



module.exports = {
  Award,
  User,
  db
}
