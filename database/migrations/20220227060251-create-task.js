const table = 'tasks';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(table, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id : {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' }
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('open', 'in progress', 'on hold', 'done'),
                defaultValue: 'open'
            },
            categories: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.STRING)
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