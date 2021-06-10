const connection = require('./connection');

const runQuery = (query, params = '') => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports = runQuery;
