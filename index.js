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


server.get('/api/cohorts/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first();
        res.status(200).json(cohort);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
    try {

    } catch (error) {

    }
});

server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .update(req.body);
        
        if(count) {
            const cohort = await db('cohorts')
                .where({ id: req.params.id })
                .first();
            res.status(200).json(cohort);
        } else {
            res.status(404).json({ message: "Could not find cohort." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

server.delete('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .del()
        
        if(count) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: "Could not delete cohort." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});




const port = 3000;
server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`);
});