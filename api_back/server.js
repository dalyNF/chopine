const express = require('express');
const app = express();
const mysql = require('promise-mysql');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(fileUpload({createParentPath: true}));

require('dotenv').config()

//parse les url
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));

//test de middleware
// const myModule = require('./testModule');
// myModule();

//on check si il l'api est en ligne ou non et on décide quelle bdd on récupère
if(!process.env.HOST_DB) {
    console.log("hors-ligne")
	var config = require('./config-locale')
} else {
    console.log("en ligne")
	var config = require('./config')
}

// toutes mes routes
const beerRoutes = require('./routes/beerRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// connexion BDD
const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT || config.db.port; //si vous êtes sur mac le port 8889

// console.log("host:", host,"database:" , database,"user:", user, "password:",password, port)


mysql
	.createConnection({
		host:host,
		database:database,
		user:user,
		password:password,
		port:port
		})
	.then((db) => {
		// console.log('raa',db);
		console.log(`Bien connecté à : ${db.config.database}`);
		setInterval(async () => {
			let res = await db.query("SELECT 1");
		}, 10000);

		app.get("/", (req, res) => {
			res.json({ status: 200, msg: "Welcome to my Beer Shop API !!!", DB: db.config.host });
		});

		// appel de nos routes
		authRoutes(app, db);
		beerRoutes(app, db);
		userRoutes(app, db);
		orderRoutes(app, db);
	})

	.catch((err) => {
		console.log(`Pas connecté :'( -> ${err}`);
		console.log(`${err.status}`);
	});


app.listen(PORT, () => {
	console.log(`Listening on port ---> ${PORT} `);
});