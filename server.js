const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors')
const passport = require('passport');

const PORT = process.env.PORT || 4000;
const corsURLs = ['http://localhost:3000' , 'https://buynowor.herokuapp.com'];

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('trust proxy', 1);

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie : {
        sameSite: 'none',
        secure: true
      }
    })
  );

app.use(cors({
    origin: 'https://buynowor.herokuapp.com',
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport)

const router = require('./router/routes');
app.use(router)

const db = require('./db/db');
db.connect(); 

const job = require('./services/cronJob')

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})



