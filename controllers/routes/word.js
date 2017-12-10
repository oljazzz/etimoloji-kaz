let mongoose = require('mongoose');
let Word = require('../models/word');
/*
 * GET /word маршрут для получения списка всех word.
 */
function getWords(req, res) {
    let query = Word.find({});
    query.exec((err, words) => {
        if (err) res.send(err);
        res.json(words);
    });
}

/*
 * POST /word для создания новой word.
 */
function postWord(req, res) {
    var newWord = new Word(req.body);
    newWord.save((err, word) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: "Word added!", word });
        }
    });
}

/*
 * GET /word/:id маршрут для получения word по ID.
 */
function getWord(req, res) {
    Word.findById(req.params.id, (err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
}

/*
 * DELETE /word/:id маршрут для удаления word по ID.
 */
function deleteWord(req, res) {
    Word.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Word deleted!", result });
    });
}

/*
 * PUT /word/:id маршрут для редактирования word по ID
 */
function updateWord(req, res) {
    Word.findById({ _id: req.params.id }, (err, word) => {
        if (err) res.send(err);
        Object.assign(word, req.body).save((err, word) => {
            if (err) res.send(err);
            res.json({ message: 'Word updated!', word });
        });
    });
}

module.exports = { getWords, postWord, getWord, deleteWord, updateWord };