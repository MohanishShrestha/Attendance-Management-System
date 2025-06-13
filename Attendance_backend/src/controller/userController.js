import expressAsyncHandler from "express-async-handler";
import User from "../Schema/UserSchema.js";
import bcrypt from "bcryptjs";
import { secretkey } from "../constant.js";
import jwt from "jsonwebtoken";

export const createUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    data = {
      ...data,
      password: hash,
    };

    let result = await User.create(data);

    res.status(201).json({
      success: true,
      message: "User registered",
      result: result,
    });
  }
);

export const loginUserController = expressAsyncHandler(
  async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });
    if (user) {
      let isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        let info = {
          id: user._id,
        };

        let expireInfo = { expiresIn: "20d" };
        let token = jwt.sign(info, secretkey, expireInfo);

        res.status(200).json({
          success: true,
          message: "user login successfull",
          data: user,
          token: token,
        });
      } else {
        let error = new Error("Crenditial do not match p");
        throw error;
      }
    } else {
      let error = new Error("Crenditial not found u");
      throw error;
    }
  }
);


export const realAllUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.find({});
    res.status(200).json({
      sucess: true,
      message: "all user read successfully",
      result: result,
    });
  }
);

export const readSpecificUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.findById(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "read successfully",
      result: result,
    });
  }
);

export const updateSpecificUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
   
    delete data.password;

    let result = await User.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
      sucess: true,
      message: "read successfully",
      result: result,
    });
  }
);

export const deleteSpecificUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "delete successfully",
      result: result,
    });
  }
);
