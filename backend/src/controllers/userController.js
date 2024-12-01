const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ResponseAPI = require("../utils/response");
const { jwtSecret, jwtExpiresIn } = require("../config/env");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const env = require("../config/env");

const generateToken = (user) => {
  const jwtPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    type: user.type,
  };

  return jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtExpiresIn });
};

const userController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return ResponseAPI.error(res, "Invalid email or password", 401);
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return ResponseAPI.error(res, "Invalid email or password", 401);
      }

      const token = generateToken(user);

      ResponseAPI.success(res, {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id).select(
        "-password -password_salt"
      );
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await User.findById(req.user._id).select(
        "-password -password_salt"
      );

      if (req.file) {
        const formData = new FormData();
        const imageFile = fs.createReadStream(req.file.path);
        formData.append("image", imageFile);

        const url = `${env.imgbbBaseUrl}?key=${env.imgbbSecretKey}`;

        const response = await axios.post(url, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });
        if (response.data.success) {
          user.photo = response.data.data.url.replace(
            "i.ibb.co/",
            "i.ibb.co.com/"
          );
          fs.unlinkSync(req.file.path);
        }
      }

      if (password) {
        user.password = password;
      }
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }

      await user.save();

      ResponseAPI.success(res, user);
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      next(error);
    }
  },

  async register(req, res, next) {
    try {
      const salt = bcrypt.genSaltSync();

      const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        password_salt: salt,
        email: req.body.email,
        role: req.body.role,
      });

      const userResponse = await User.findById(user._id).select(
        "-password -password_salt"
      );

      ResponseAPI.success(res, userResponse);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
