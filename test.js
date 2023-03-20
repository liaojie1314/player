const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '15.tcp.cpolar.top',
  user: 'root',
  password: '1024',
  database: 'player',
  port: '13590'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }

  console.log('Connected to database successfully!');

  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return;
    }

    console.log('Query results: ', results);
    connection.end();
  });
});
