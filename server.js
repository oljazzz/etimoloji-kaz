let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;

let word = require('./app/routes/word');
let config = require('config');
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({ message: "Welcome to Kacgari API" }));

app.route("/word")
    .get(word.getWords)
    .post(word.postWord);
app.route("/word/:id")
    .get(word.getWord)
    .delete(word.deleteWord)
    .put(word.updateWord);
app.listen(port);
console.log("Listening on port " + port);
module.exports = app;
