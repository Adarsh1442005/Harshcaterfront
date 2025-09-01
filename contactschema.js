import mongoose from "mongoose";
const contactschem={
name:{
type:String,
required:true,
trim:true,

},
email:{
    type:String,
    required:true,
    trim:true
},
message:{
    type:String,
    required:true,
    trim:true
}



}
const cont=new mongoose.Schema(contactschem);
export const contactbook=mongoose.model('Contact',cont);