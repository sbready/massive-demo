const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString = 'postgres://fvgmjvmdxlxbxj:1a8311779f70e8b3391012c62e9fa0993e7df8469db8db02428491d77faab629@ec2-50-16-204-127.compute-1.amazonaws.com:5432/d4g0jnkdg2vjho?ssl=true';


const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  console.log(state);
  if (state) {
    db.getIncidentsByState([state]).then(incidents => {
      res.send(incidents);
    })
  } else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents);
  })
}
});

app.post('/incidents', (req, res) => {
  const db = req.app.get('db');
  const incident = req.body;
  db.createIncident([
    incident.state,
    incident.injuryId,
    incident.causeId
  ]).then(result => {
    res.send(result[0]);
  })
});

massive(connectionString).then(db => {
  app.set('db', db);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});


