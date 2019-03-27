const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3',
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/api/cohorts', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.post('/api/cohorts', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);
        const updatedCohort = await db('cohorts')
            .where({ id: id })
            .first();
            
        res.status(200).json(updatedCohort);
    } catch (error) {

    }
});


const port = 3000;
server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`);
});