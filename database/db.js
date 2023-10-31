const { connection } = require('../config');

function query(query, params) {
    return new Promise(async (resolve, reject) => {
        try {
            // query database
            const db = await connection();
            const [results,] = await db.execute(query, params);
    
            resolve(results);
        } catch {
            console.log('QUERY ERROR');
            reject();
        }
    })
}

module.exports = { query };