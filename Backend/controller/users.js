// const Users = require("../model/users");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const saltRounds = 10;

// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
//     expiresIn: "7d", // expires in 7 days
//   });
// };

// const signupUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     console.log(userData);
//     const plainPass = userData.password;

//     // find the user with email
//     // if user exists, send error that eamil in use
//     // else create the user

//     // generate salt for hashing
//     const salt = bcrypt.genSaltSync(10);

//     const hashedPass = bcrypt.hashSync(plainPass, salt);

//     const result = await Users.create({
//       ...userData,
//       password: hashedPass,
//     });

//     if (result) {
//       res.status(201).json({
//         error: false,
//         message: "User signup successful!",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         message: "Error in signup!",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       error: true,
//       message: error.message ? error.message : "Error in signup",
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     // req.body --> email and passwrd
//     const { email, password } = req.body;
//     // find method on user db
//     const user = await Users.findOne({ email });

//     if (user) {
//       // check for correct password
//       const isPasswordMatchd =await user.matchPassword(password);

//       if (isPasswordMatchd) {
//         //generate the token
//         const token = generateToken(user._id.toString());

//         // send the token in cookies
//         res.cookie("jwt_token", token, {
//           httpOnly: true,
//           secure : false,
//           sameSite : "lax",
//           // sameSite: "strict",
//           maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         });

//         // return success
//         return res.status(200).json({
//           error: false,
//           message: "Login successful",
//           data: {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//           },
//         });
//       } else {
//         // retur password did not match
//         return res.status(400).json({
//           error: true,
//           message: "Invalid email or password",
//         });
//       }
//     } else {
//       // else return error
//       return res.status(400).json({
//         error: true,
//         message: "Error in login!",
//       });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .send({ error: true, message: error.message ?? "Server error" });
//   }
// };

// module.exports = {
//   signupUser,
//   loginUser,
// };

const Users = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "7d", // expires in 7 days
  });
};

const signupUser = async (req, res) => {
  try {
    const userData = req.body;
    const plainPass = userData.password;

    // find the user with email
    // if user exists, send error that eamil in use
    // else create the user

    // generate salt for hashing
    const salt = bcrypt.genSaltSync(10);

    const hashedPass = bcrypt.hashSync(plainPass, salt);

    const result = await Users.create({
      ...userData,
      password: hashedPass,
    });

    if (result) {
      res.status(201).json({
        error: false,
        message: "User signup successful!",
      });
    } else {
      res.status(400).json({
        error: true,
        message: "Error in signup!",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message ? error.message : "Error in signup",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // req.body --> email and passwrd
    const { email, password } = req.body;
    // find method on user db
    const user = await Users.findOne({ email });

    if (user) {
      // check for correct password
      const isPasswordMatchd = await user.matchPassword(password);

      if (isPasswordMatchd) {
        //generate the token
        const token = generateToken(user._id.toString());

        // send the token in cookies
        res.cookie("ev_jwt_token", token, {
          httpOnly: true,
          secure: false, // true for HTTPS (set to false for localhost)
          sameSite: "lax", // allow cookies across origins for POST
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // return success
        return res.status(200).json({
          error: false,
          message: "Login successful",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        // retur password did not match
        return res.status(400).json({
          error: true,
          message: "Invalid email or password",
        });
      }
    } else {
      // else return error
      return res.status(400).json({
        error: true,
        message: "Error in login!",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: true, message: error.message ?? "Server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
};