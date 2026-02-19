import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
     email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }, 
    password:{
        type:String,
        required:true,
        trim:true,
        
    },
    RefreshToken: {
        type: String,
        required: true
    },

     AccessToken: {
        type: String,
        required: true
    }


},{timestamps: true}

)


export  const userschema = mongoose.userSchema;
