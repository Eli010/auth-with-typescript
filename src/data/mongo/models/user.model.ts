import mongoose from "mongoose";

//reglas
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Name is required'],
        unique:true,    
    },
    emailValidated:{
        type:Boolean,
        default:false, 
    },
    password:{
        type:String,
        required:[true,'Name is required']
    },
    img:{
        type:String,
    },
    role:{
        type:[String],
        default:['USER_ROLE'],
        enum:['ADMIN_ROLE','USER_ROLE','DELIVERY_ROLE']
    }

});

export const UserModel = mongoose.model('User',userSchema);