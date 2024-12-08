const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ResponseAPI = require("../utils/response");
const { jwtSecret, jwtExpiresIn } = require("../config/env");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const env = require("../config/env");
const { imageUpload } = require("../utils/imageUtil");
const ROLES = require("../constant/roles");

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
        return ResponseAPI.error(res, "User not found", 404);
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return ResponseAPI.error(res, "Invalid email or password", 401);
      }

      if (!user.isActive) {
        return ResponseAPI.error(
          res,
          "Please wait for admin to activate your account!",
          401
        );
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

  async getAccount(req, res, next) {
    try {
      let query = {};
      if (req.query.role) {
        query.role = req.query.role;
        query.isActive = true;
      } else {
        query.role = { $in: [ROLES.STUDENT, ROLES.HANDLER] };
      }

      const users = await User.find(query).select("-password -password_salt");
      ResponseAPI.success(res, users);
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
        const urlUploadResult = await imageUpload(req.file, user.photo);

        user.photo = urlUploadResult;
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
    ``;
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
  async changeStatus(req, res, next) {
    try {
      const id = req.body.id;

      const user = await User.findById(id);

      if (!user) {
        return ResponseAPI.error(res, "User not found", 404);
      }

      if (user.role === ROLES.ADMIN) {
        return ResponseAPI.error(
          res,
          "You can't activate or deactivate an admin",
          403
        );
      }

      const userIsActive = user.isActive;
      user.isActive = !userIsActive;
      await user.save();

      return ResponseAPI.success(
        res,
        user,
        `User ${userIsActive ? "de" : ""}activated successfully`
      );
    } catch (error) {
      console.error("Error activate User:", error);
      return next(error);
    }
  },
};

module.exports = userController;
