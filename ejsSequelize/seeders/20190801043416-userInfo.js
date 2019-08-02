'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        firstName:"Lindsay",
        lastName:"Chapin",
        email:"lnchapin@gmail.com",
        password: "$2a$13$mAT8npHSwnQi5aDAZOt/TuLGqVA7O9TA0t4Vb9vUnPK6BtrypNYQS"
      },
      {
        firstName:"Test",
        lastName:"Testing",
        email:"test@test.com",
        password: "$2a$13$mAT8npHSwnQi5aDAZOt/TuLGqVA7O9TA0t4Vb9vUnPK6BtrypNYQS"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
