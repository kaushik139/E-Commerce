const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'database',
    port: 5432,
    database: 'ecommerce'
})

module.exports = client 