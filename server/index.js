require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// const authorizationMiddleware = require('./authorization-middleware');

// brought in socket.io & socket.io-client
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:2222'
  }
});

io.on('connection', socket => {
  console.log('made socket connection');
  console.log('this is the socket.id:', socket.id);
  // io.emit()

  socket.on('messageFromClient', entry => {
    // console.log('entry:', entry);
    socket.broadcast.emit('tellsEveryone', entry); // relays to everyone, except the sender
    // io.emit('tellsEveryone', entry); replays to literally every socket
  });

  // socket.join('lobby');

  socket.on('disconnect', () => {
    console.log('User d/c', socket.id);
  });
});

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

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

app.get('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields.');
  }

  const sql = `
  select "userId", "hashedPassword"
  from "users"
  where "userName" = $1
  `;
  const params = [username];

  db.query(sql, params)
    .then(response => {
      if (response.rowCount < 1) {
        throw new ClientError(401, 'invalid login');
      }

      argon2.verify(response.rows[0].hashedPassword, password)
        .then(matchTest => {
          // console.log('this is the response:', response);
          if (!matchTest) {
            throw new ClientError(401, 'invalid login');
          } else {
            const payload = { userId: response.rows[0].userId, username: username };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            const wholeResponse = { token: token, user: username };
            res.status(200).json(wholeResponse);
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/api/openGames', (req, res, next) => {
  const sql = `
  select "userId" as "player1", "userName" as "hostName", "gameId", "isActive"
  from "users"
  inner join "games" on "users"."userId" = "games"."player1"
  where "isActive" = $1
  `;
  const params = [true];
  db.query(sql, params)
    .then(result => {
      // console.log(result);
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/createGame', (req, res, next) => {
  const { userId } = req.body;
  // userId = parseInt(userId);
  // console.log('********req:******', req);
  // console.log('userId as num:', userId);
  if (!userId) {
    throw new ClientError(401, 'userId required');
  }
  const sql = `
  insert into "games"("createdAt", "isActive", "player1")
    values(now(), 'true', $1)
    returning "gameId", "player1", "gameTime"
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      io.to('lobby').emit(result.rows[0]);
      // console.log('**********NEW GAME result:*****************', result.rows[0]);
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

// app.use(authorizationMiddleware);
// code post-authorization

// ************** sql query for creating a game and returning the necessary information:

// insert into "games"("createdAt", "isActive", "player1", "player2")
// values(now(), 'true', 1, 2)
// returning "gameId", "player1", "player2", "gameTime"

// games table may need more columns for customizable point settings **************

// generates n amount of coordinates and inserts them into coordinate table
// insert into "osuCoordinates"("gameId", "xAxis", "yAxis")
// select 5, random() * 100, random() * 100
// from generate_series(1, 150)

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

// assigned the app.listen method into a variable so that we can use it below for socket.io
// const server = app.listen(process.env.PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`express server listening on port ${process.env.PORT}`);
// });

// // Socket setup
// const io = socket(server);

// io.on('connection', socket => {
//   console.log('made socket connection');
//   console.log('this is the socket.id:', socket.id);
//   // io.emit()
// });
