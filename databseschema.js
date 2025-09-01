import mongoose from "mongoose";
const bookschem={
name:{
    type:String,
    required:true,
    trim:true,
},
email:{
    type:String,
    required:true,
    trim:true,
},
phone:{
    type:String,
    required:true,
    trim:true,
},
address:{
    type:String,
    required:true,
    trim:true,

},
pincode:{
    type:String,
    required:true,
    trim:true,
},
date:{
    type:String,
    required:true,
    trim:true,
},
guests:{
    type:Number,
    required:true,
    trim:true,


},
message:{
    type:String,
    
    trim:true,
}




};
const booking=new mongoose.Schema(bookschem);
export const booked=mongoose.model("Booking",booking);


