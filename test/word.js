process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Word = require('../app/models/word');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Words', () => {
    beforeEach((done) => {
        Word.remove({}, (err) => {
            done();
        });
    });
    
    describe('/GET word', () => {
        it('it should GET all words', (done) => {
            chai.request(server)
                .get('/word')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST word', () => {
        it('it should not POST a word without title field', (done) => {
            let word = {
                description: "The word without title"
            }
            chai.request(server)
                .post('/word')
                .send(word)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('title');
                    res.body.errors.title.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a word', (done) => {
            let word = {
                title: "Абжылан",
                description: "Үлкен жылан"
            }
            chai.request(server)
                .post('/word')
                .send(word)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Word added!');
                    res.body.word.should.have.property('title');
                    res.body.word.should.have.property('description');
                    done();
                });
        });
    });

    describe('/GET/:id word', () => {
        it('it should GET a word by given id', (done) => {
            let word = new Word({
                title: "Ағайын",
                description: "Туыстық қарым қатынастағы ер адамдар"
            });
            word.save((err, word) => {
                chai.request(server)
                    .get('/word/' + word.id)
                    .send(word)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('_id').eql(word.id);
                        done();
                    });
            });
        });
    });
    describe('/PUT/:id word', () => {
        it('it should UPDATE a word given the id', (done) => {
            let word = new Word({
                title: "Аға",
                description: "Desc of current word"
            });
            word.save((err, word) => {
                chai.request(server)
                    .put('/word/' + word.id)
                    .send(
                    {
                        title: "Аға",
                        description: "Modified Desc of current word"
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Word updated!');
                        res.body.word.should.have.property('description').eql("Modified Desc of current word");
                        done();
                    });
            });
        });
    });
    describe('/DELETE/:id word', () => {
        it('it should DELETE a word given the id', (done) => {
            let word = new Word({
                title: "Азық-түлік",
                description: "Қажетті тағам"
            });
            word.save((err, word) => {
                chai.request(server)
                    .delete('/word/' + word.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Word deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    })
            });
        });
    });



});

