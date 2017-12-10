let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let WordSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
},
    {
        versionKey: false
    });

    WordSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
module.exports = mongoose.model('word', WordSchema);