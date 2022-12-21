import { Schema, model, Model } from "mongoose";

type UserInput = {
  firstName?: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  password?: string;
};

interface LoginInput{
  email: string;
  phone: string;
}

interface verifyOtpInput{
  email?: string;
  phone?: string;
  otp?: number;
}

interface IUser extends UserInput {
  _id: string;
  status?: number;
  type?: string;
  image?: String;
  loginOtp?: number;
  otpExpireAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    fistName: {
      type: String
    },
    lastName: {
      type: String
    },
    image: {
      type: String,
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    phone: {
      type: String
    },
    status: {
      type: Number,
      default: 1,
    },
    type: {
      type: String
    },
    loginOtp : {
      type:Number
    },
    otpExpireAt : {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);
const User: Model<IUser> = model<IUser>("user", UserSchema);
export { User, IUser, UserInput, LoginInput, verifyOtpInput };
