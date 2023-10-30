const { connection } = require('../config');

async function query(query, params) {
    try {
        // query database
        const db = await connection();
        const [results,] = await db.execute(query, params);

        return results;
    } catch {
        console.log('QUERY ERROR')
    }
}

module.exports = { query };