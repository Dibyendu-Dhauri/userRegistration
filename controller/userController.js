const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userRegistration } = require("../models/userSchema");
const { createError } = require("../utils/error");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await new userRegistration({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).json({ message: "user has been created" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userRegistration.findOne({
      email: req.body.email,
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong Password"));

      const token = jwt.sign({ id: user._id }, process.env.JWT);
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
          
        })
        .status(200)
        .json({ message: "Login successful" });
    

  } catch (error) {
    next(error);
  }
};

const dashboard = async (req, res, next) => {
  // console.log(res.locals.user)
  // const token = req.cookies.access_token;
  // const { id } = jwt.verify(token, process.env.JWT);
  const {id} = res.locals.user;
  try {
    const user = await userRegistration.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
  // res.status(200).json({msg: "success"})
};
module.exports = {
  register,
  login,
  dashboard,
};
