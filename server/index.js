require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

// login code
app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields.');
  }

  argon2.hash(password)
    .then(hash => {
      const sql = `
      insert into
        "users" ("userName", "hashedPassword")
        values ($1, $2)
        on conflict ("userName")
        do nothing
        returning "userId", "userName"
    `;
      const params = [username, hash];
      db.query(sql, params)
        .then(result => {
          if (result.rows[0]) {
            res.status(201).json(result.rows[0]);
          } else {
            throw new ClientError(409, 'This user name is already taken.');
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);
// code post-authorization

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
