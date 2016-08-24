module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://postgres@localhost:5432/calypso_test?sslmode=disable',
    migrations: {
      tableName: 'calypso_test'
    }
  },

  development: {
    client: 'pg',
    connection: 'postgres://postgres@localhost:5432/calypso_dev?sslmode=disable',
    migrations: {
      tableName: 'calypso_dev'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://tech:<password>@calypso-db.c64rgxgts5ki.us-west-2.rds.amazonaws.com:5432/calypso',
    migrations: {
      tableName: 'calypso-db'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
