exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email').unique().notNull();
        table.string('password').notNull();
        table.string('first_name').notNull();
        table.string('last_name').notNull();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').nullable().defaultTo(null);
    })
        .then(function () {
            return knex.insert(
                [
                    {
                        //id          : 1,
                        email: 'john@example.com',
                        password: '202cb962ac59075b964b07152d234b70',
                        first_name: 'John',
                        last_name: 'Doe',

                    },
                    {
                        //id          : 2,
                        email: 'gordon@example.com',
                        password: '202cb962ac59075b964b07152d234b70',
                        first_name: 'Gordon',
                        last_name: 'Freeman',

                    },
                    {
                        //id          : 3,
                        email: 'harold@example.com',
                        password: '202cb962ac59075b964b07152d234b70',
                        first_name: 'Harold',
                        last_name: 'Finch',

                    }
                ], 'id').into('users');
        });
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
