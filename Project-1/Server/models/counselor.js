const moongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const counselorSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'counselor'
    },
    Booking:{
        type: Array,
        default: []
    },
    Meeting:{
        type: Array,
        default: []
    }
});

counselorSchema.pre('save', async function (next){
  if(this.isModified('password')){
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
const Counselor = moongoose.model('Counselor', counselorSchema);

module.exports = Counselor;
    