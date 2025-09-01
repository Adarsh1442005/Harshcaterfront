import express from 'express';
import cors from "cors";
import { transporter } from './email.js';
import mongoose from 'mongoose';
import { booked } from './databseschema.js';
import { contactbook } from './contactschema.js';

const app = express();
const PORT =process.env.PORT|| 3000;
const hashmap=new Map();
const hashmapmember=new Map();
const mogodburi="mongodb+srv://aadi:Adarsh1442005@cluster0.nc0yl.mongodb.net/harshecatering?retryWrites=true&w=majority&appName=Cluster0"

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://your-frontend-domain.com', // or use '*' for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Harsh eCatering Server!');
});

const contact= async (req,res)=>{
const{name,email,message}=req.body;
if(contactbook.findOne({email})){
  res.json({code:-1,text:"Your credential we have alredy contact us for booking..."});
  return;
}
const otp = Math.floor(100000 + Math.random() * 900000).toString();
hashmap.set(email,otp);
hashmapmember.set(email,{name,message});

const otpsend={from:"ap4866017@gmail.com",
        to:email,
        subject:"Email verification from harsh e-catering services ",
        text:`your verification code will be expire in 10 minutes${otp}`
  }
  try{
  await transporter.sendMail(otpsend);
  res.json({code:1,text:"verification code send successfully to your email"});
  
  }
  catch(error){
    res.json({text:"error in crearing account"});

  }


console.log(name);



}
app.post('/contact',contact);




const otpverify=async (req,res)=>{
    const{otp,email}=req.body;
   if( hashmap.get(email)===otp){
    const bookingdata= hashmapmember.get(email);
    if(Object.keys(bookingdata).length===2){
      const cont=new contactbook({...bookingdata,email});
      cont.save();
      hashmapmember.delete(email);
    }
    else{
    const newbooking=new booked(bookingdata);
    await newbooking.save();
    hashmapmember.delete(email);
    }
    console.log("user registered successfully");
    res.json({msg:"registered successfuly",code:1});
    hashmap.delete(email);
   }
  else {
    res.json({ msg: "Invalid OTP", code: 0 });
  }






}
app.post('/verify',otpverify);

const book=async(req,res)=>{
const {  name,email, phone,address, pincode, date, guests, message}=req.body;
if(booked.findOne({email})){
  res.json({code:-1,text:"your credential we have we will deliver on time if you want some other order then contact owner directly"});
  return;
}
const otp = Math.floor(100000 + Math.random() * 900000).toString();
hashmap.set(email,otp);
hashmapmember.set(email,{name,email,phone,address,pincode,date,guests,message});
const otpsend={from:"ap4866017@gmail.com",
        to:email,
        subject:"Email verification from harsh e-catering services ",
        text:`your verification code will be expire in 10 minutes${otp}`
  }
  try{
  await transporter.sendMail(otpsend);
  res.json({code:1,text:"verification code send successfully to your email"});
  
  }
  catch(error){
    res.json({text:"error in crearing account"});

  }

}
app.post('/bookings',book);


async function serv(){
  await mongoose.connect(mogodburi);
  console.log("mongodbconnected");
}

await serv();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
