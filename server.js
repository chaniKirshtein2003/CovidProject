const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

  
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/Patients', async (req, res) => {
  console.log(process.env.DB_HOST);
  try {
    const connection = await sql.connect({
      user: "dbo",
      database: "CoronaDB",
      server: "localhost",
      trustServerCertificate:true
    });

    const [rows] = await connection.execute('SELECT * FROM Patients');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/Patients', async (req, res) => {
  const { ID, FirstName,LastName, Address,StreetNumber,City, CellPhone,Phone , BirthDay } = req.body;

  try {
    const connection = await sql.connect({
      user: "dbo",
      database: "CoronaDB",
      server: "localhost",
      trustServerCertificate:true
    });
    const user=await connection.execute('select * from Patients where ID=?',ID);
    if(user)
    {
      res.status(400).json({Error:"The user is already exist"});
    }
    const [result] = await connection.execute(
      'INSERT INTO patients (ID, FirstName,LastName, Address,StreetNumber,City, CellPhone,Phone , BirthDay) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [ID, FirstName,LastName, Address,StreetNumber,City, CellPhone,Phone , BirthDay],
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/Disease', async (req, res) => {
  console.log(process.env.DB_HOST);
  try {
    const connection = await sql.connect({
      user: "dbo",
      database: "CoronaDB",
      server: "localhost",
      trustServerCertificate:true
    });

    const [rows] = await connection.execute('SELECT * FROM Disease');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/Disease', async (req, res) => {
  const { idD, ID, PositiveDate, RecoveryDate} = req.body;

  try {
    const connection = await sql.connect({
      user: "dbo",
      database: "CoronaDB",
      server: "localhost",
      trustServerCertificate:true
    });
    const user=await connection.execute('select * from Disease where idD=?',idD);
    if(user)
    {
      res.status(400).json({Error:"The patient was already sick"});
    }
    const [result] = await connection.execute(
      'INSERT INTO Disease (idD, ID, PositiveDate,RecoveryDate) VALUES (?, ?, ?, ?)',
      [idD, ID, PositiveDate, RecoveryDate],
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/Vaccination', async (req, res) => {
  console.log(process.env.DB_HOST);
  try {
    const connection = await sql.connect({
      user: "dbo",
      database: "CoronaDB",
      server: "localhost",
      trustServerCertificate:true
    });

    const [rows] = await connection.execute('SELECT * FROM Vaccination');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/Vaccination', async (req, res) => {
  const { idV, ID, VaccinationDate, Manufacturer} = req.body;

  try {
    const connection = await sql.connect({
      user: "dbo",
      database: "CoronaDB",
      server: "localhost",
      trustServerCertificate:true
    });
    const numVaccination = await connection.execute('select count(*) from Vaccination where idV=?',idV);
    if(numVaccination > 3)
    {
      res.status(400).json({Error:"You can't get more than 4 vaccination"});
    }
    const [result] = await connection.execute(
      'INSERT INTO Vaccination (idV, ID, VaccinationDate, Manufacturer) VALUES (?, ?, ?, ?)',
      [idV, ID, VaccinationDate, Manufacturer],
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
