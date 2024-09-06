const fs = require('fs');

const express = require('express');
const { default: axios } = require('axios');

const apps = express();

apps.use(express.json());
app.use(axios());

apps.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the server side',
    developer: 'Michael Ayor',
  });
});

// Handling GET request practice by me

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

apps.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    tours,
  });
});

// Responding to URL parameters by me
apps.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

// Handling POST request
apps.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    name: 'FUT Tour',
    duration: 12,
    difficulty: 'Hard',
    ...req.body,
  };

  tours.push(newTour);

  fs.readFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    },
  );
  res.send(newTour);
});

apps.patch('/api/v1/tours/:id', (req, res) => {
  if (id > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

const port = 3000;
apps.listen(port, () => {
  console.log(`App running on port ${port}`);
});
