class Tables {
  init(connection) {
    console.log('Tables were called');
    this.connection = connection;
    this.createAppointments();
    this.createPets();
  }

  createAppointments() {
    const sql = 'CREATE TABLE IF NOT EXISTS Appointments (id int NOT NULL AUTO_INCREMENT, client varchar(11) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, data datetime NOT NULL, dataCreation datetime NOT NULL, status varchar(20) NOT NULL, notes text, PRIMARY KEY (id))';

    this.connection.query(sql, error => error ? console.log(error) : console.log('Table Appointments successfully created/found'));
  }

  createPets() {
    const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), picture varchar(200), PRIMARY KEY (id))';

    this.connection.query(sql, error => error ? console.log(error) : console.log('Table Pets successfully created/found'));
  }
}

module.exports = new Tables;