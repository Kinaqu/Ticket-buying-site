const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session')
const AdminPassport = require('./routes/POST/Auth/adminconfig')
const UserPassport = require('./routes/POST/Auth/config')


const app = express();
const port = 3001;

app.use(cors());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  keys: ['gefwekfwkmojnjnjNNJN'],
  resave: false,
  saveUninitialized: false
}));



const mongoose = require('./db/db');
const bodyParser = require('body-parser');
const insertAdminData = require('./db/data/AdminData');
const CityData = require('./db/data/CityData')


// Инициализация и настройка Passport для админа
app.use('/admin', AdminPassport.initialize());
app.use('/admin', AdminPassport.session());

// Инициализация и настройка Passport для пользователя
app.use('/', UserPassport.initialize());
app.use('/', UserPassport.session());





app.use(express.json());


insertAdminData();
CityData();


app.use(bodyParser.json());

const adminLogin = require('./routes/POST/Auth/AdminLogin'); 
const userLogin = require('./routes/POST/Auth/UserLogin');
const userSignUp = require('./routes/POST/Auth/UserSignUp');

app.use('/admin',adminLogin);
app.use('/api', userSignUp);
app.use('/api', userLogin);



const Planes = require('./routes/GET/Planes')
app.use('/api/admin', Planes);

const planes = require('./routes/PUT/Planes')
app.use('/api/admin', planes);


const Trains = require('./routes/GET/Trains')
app.use('/api/admin', Trains);

const trains = require('./routes/PUT/Trains')
app.use('/api/admin', trains);


const flighttickets = require('./routes/POST/FlightTicket')
app.use('/api/admin', flighttickets);

const flightTicket = require('./routes/GET/FlightTicket')
app.use('/api/admin', flightTicket);

const FlightTicket = require('./routes/PUT/FlightTickets')
app.use('/api/admin', FlightTicket);

const Flighttickets = require('./routes/DELETE/FlightTicket')
app.use('/api/admin', Flighttickets)


const traintickets = require('./routes/POST/TrainTicket')
app.use('/api/admin', traintickets);

const trainTicket = require('./routes/GET/TrainTicket')
app.use('/api/admin', trainTicket);

const TrainTicket = require('./routes/PUT/TrainTickets')
app.use('/api/admin', TrainTicket);

const Traintickets = require('./routes/DELETE/TrainTicket')
app.use('/api/admin', Traintickets)


const Cities = require('./routes/GET/City')
app.use('/api', Cities);

const Countries = require('./routes/GET/Country')
app.use('/api', Countries);

const UserFTickets = require('./routes/GET/FlightTicketUser')
app.use('/api', UserFTickets);

const UserfTickets = require('./routes/POST/FlightTicketUser')
app.use('/api', UserfTickets);


const UserTTickets = require('./routes/GET/TrainTicketUser')
app.use('/api', UserTTickets);

const UsertTickets = require('./routes/POST/TrainTicketUser')
app.use('/api', UsertTickets);


const ProfiletTickets = require('./routes/GET/Profile')
app.use('/api', ProfiletTickets)

// Другие маршруты, если необходимо

app.use((req, res) => res.status(404).send('Not Found'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));

