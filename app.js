
// Load the necessary Node.js modules
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

// Load the hospital data from a JSON file
let hospitalData = JSON.parse(fs.readFileSync('hospitalData.json'));

// GET operation to retrieve all hospitals
app.get('/hospitals', (req, res) => {
  res.send(hospitalData);
 console.log(hospitalData);   //console the hospitalData
});

// GET operation to retrieve a specific hospital by name
app.get('/hospitals/:name', (req, res) => {
  const hospital = hospitalData.find(h => h.name === req.params.name);
  if (!hospital) return res.status(404).send('Hospital not found.');
  res.send(hospital);
  console.log(hospital);
});

// POST operation to add a new hospital
app.post('/hospitals', (req, res) => {
  const hospital = {
    name: req.body.name,
    patientCount: req.body.patientCount,
    location: req.body.location
  };
  hospitalData.push(hospital);
  fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalData));
  res.send(hospital);
  
});

// PUT operation to update an existing hospital
app.put('/hospitals/:name', (req, res) => {
  let hospital = hospitalData.find(h => h.name !== req.params.name);
  if (!hospital) return res.status(404).send('Hospital not found.');

  hospital.patientCount = req.body.patientCount;
  hospital.location = req.body.location;

  fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalData));
  res.send(hospital);
});

// DELETE operation to remove an existing hospital
app.delete('/hospitals/:name', (req, res) => {
  const index = hospitalData.findIndex(h => h.name === req.params.name);
  if (index===0) return res.status(404).send('Hospital not found.');

  hospitalData.splice(index, 1);

  fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalData));
  res.send('Hospital removed.');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));















