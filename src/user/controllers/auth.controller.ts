import { Controller, Get, Path, Route, Tags, Post, Body } from "tsoa";
import moment from 'moment'
import jwt, { Secret } from 'jsonwebtoken';


import { DataResponse, MessageResponse, LoginUser, LoginResponse } from './../../interfaces';

import { User,IUser, UserInput, LoginInput , verifyOtpInput} from "../../models/user.model";
import { ResourceNotFoundError, CustomError } from "../../models/error.model";

const userSelectAttribute = {fistName:1,lastName:1, image:1, phone:1, email:1, otpExpireAt:1};
export const SECRET_KEY: Secret = process.env.SECRET_KEY || '';

@Route("/api")
@Tags("Auth")
export class AuthController extends Controller {
  // @Post("/register")
  // public async register(@Body() user: UserInput): Promise<IUser> {
  //   const {
  //     firstName,
  //     lastName,
  //     email, 
  //     phone,
  //     password
  //    } = user;
 
  //   const userInput: UserInput = {
  //       password,
  //       firstName,
  //       lastName,
  //       email, 
  //       phone
  //   }  

  //   try{
  //     const user = await User.findOne({email:email});
  //     if(user){
  //       throw new CustomError('Email Id is already registered');
  //     }
  //     return User.create(userInput);
  //   }catch(error){
  //     console.log('Error while registering user')
  //     throw error;
  //   }
  // }

  @Post("/verifyOtp")
  public async verifyOtp(@Body() loginInput: verifyOtpInput): Promise<LoginResponse> {
    const {email,phone, otp} = loginInput;
    const user = await User.findOne({$or:[{"email": email}, {"phone": phone}],  loginOtp:otp}).select(userSelectAttribute);

    if(!user){
      throw new ResourceNotFoundError("Invalid username/OTP");
    }

    const otpExpireAt = new Date(user.otpExpireAt || '').getTime();
    const timeNow = new Date().getTime();

    if(!otpExpireAt || otpExpireAt < timeNow){
      throw new ResourceNotFoundError("OTP has been Expired");
    }


    let token = jwt.sign({firstName: user.firstName, userId: user._id, type:user.type, phone: user.phone, email: user.email},
      SECRET_KEY,
      { expiresIn: '2 days' // expires in 2 days
      }
    );

    return { 
      token: token,
      user: user as LoginUser, 
      status: 'SUCCESS', 
      message:'Success'
     };
  }

  @Post("/login")
  public async login(@Body() body: LoginInput): Promise<MessageResponse> {
    const { phone, email } = body;

    let user = await User.findOne({$or:[{"email": email}, {"phone": phone}]}, userSelectAttribute);
    if(!user){
      const userInput: UserInput = {
         email, 
         phone
      }  
      user = await User.create(userInput);
    }

    // const otp = Math.floor(Math.random() * 9000 + 1000);
    const otp = 1234;
    const otpExpireAt = moment(new Date()).add(30, 'm').toDate().toISOString();
    await User.updateOne({'_id':user?.id}, {$set: {loginOtp : otp, otpExpireAt: otpExpireAt}});
    user = await User.findOne({'_id':user?.id}, userSelectAttribute);
    return { status:'SUCCESS', message : 'Otp has been sent successfully'};
  }
}
