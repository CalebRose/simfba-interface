var mysql      = require('mysql');

var connection = mysql.createConnection({
              host     : '127.0.0.1',
              user     : 'root',
              password : '',
              database : 'hobby-dev'
            });

const getUsers = (request, response) => {
  pool.query('SELECT * FROM Users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}