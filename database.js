const mongoose = require('mongoose');

exports.connectMongoose = () => {
    mongoose
        .connect('mongodb://localhost:27017/passport', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB!'))
        .catch((error) => console.error('Error connecting to MongoDB:', error));
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
});

exports.User = mongoose.model("User", userSchema);