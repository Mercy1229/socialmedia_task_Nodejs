import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        index: { unique: true },
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        required: true,
        
    }
}, { strict: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userSchema);

export default User;
