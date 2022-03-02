const table = 'subtasks';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(table, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            task_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'tasks', key: 'id' }
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.ENUM('open', 'in progress', 'on hold', 'done'),
                defaultValue: 'open'
            },
            due: {
                allowNull: false,
                type: Sequelize.DATE
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(table);
    }
};