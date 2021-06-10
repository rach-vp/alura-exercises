'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Levels', [
			{
				descrip_lvl: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				descrip_lvl: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				descrip_lvl: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			}
	], {})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Levels', null, {})
  }
}

