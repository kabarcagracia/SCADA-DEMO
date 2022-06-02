const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
    createUser: {
        type: Boolean,
        required: false,
        default: false
    },
    editUser: {
        type: Boolean,
        required: false,
        default: false
    },
    deleteUser: {
        type: Boolean,
        required: false,
        default: false
    },
    users: {
        type: Boolean,
        required: false,
        default: false
    }
});
const roleSchema = new Schema({
    users: {
        type: [usersSchema],
        required: true
    }
});
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    lastnames: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    urlImage: {
        type: String,
        default: 'this is default'
    },
    phone: {
        type: Number,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    /*roles: {
        type: roleSchema,
        required: true
    },*/
    createUser: {
        type: Date,
        default: Date.now(),
        required: false
    }
});

/*userSchema.pre('save', async (next) =>{
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async (password) => {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};*/

module.exports = model('User', userSchema);









