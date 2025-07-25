// const jwt = require ("jsonwebtoken");
// const Users = require("../model/users");
// const verifyToken = async(token) => {
//     try {
//         console.log(token)
//         const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);        
//         console.log({decoded})

//         return decoded;
//     } catch (error) {
//         throw new Error ("Invalid Token")
//     }
// }

// const isAuthorized = async(req, res, next) => {
//     try {
//         const cookie = res.cookie();
//         console.log({cookie});
//         const userData =await verifyToken(cookie["jwt_token"])
//         console.log(userData);

//         if (!userData || !userData.userId){
//             return res.status(401).json({
//                 error: true,
//                 message: "Your are not authorized",
//             });
//         }

//         const user = await Users.findById(userData.userId, "name email role");

//         if (!user) {
//             return res.status(404).json({
//                 error: true,
//                 message: "User not found!",
//             });
//         }

//         req.user= user;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({
//             error: true,
//             message:"you are not authorized",
//         })
//     }
// }

// const isAdmin=(req,res,next)=>{
//     if(req.user.role === "admin"){
//         next()
//         }else{
//             return res.status(403).json({
//                 error: true,
//                 message: "You are not authorized to access this route",
//                 });
//             }
// }

// module.exports = {
//     isAuthorized,
//     isAdmin,
// }


const jwt = require("jsonwebtoken");
const Users = require("../model/users");

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // { userId }
    return decoded;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

const isAuthorized = async (req, res, next) => {
  try {
    const cookie = req.cookies;

    const userData = await verifyToken(cookie["ev_jwt_token"]);

    // check if the user has loggedIn
    if (!userData || !userData.userId) {
      // return res.status(401).json({
      //   error: true,
      //   message: "You are not authorized",
      // });
      res.user = null;
      next();
    }

    // get the user data from database
    const user = await Users.findById(userData.userId, "name email role");

    if (!user) {
      // return res.status(404).json({
      //   error: true,
      //   message: "User not loggedIn",
      // });
      res.user = null;
    }

    req.user = user;

    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      error: true,
      message: "You are not authorized",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      error: true,
      message: "Only admin access allowed!",
    });
  }
};

module.exports = {
  isAuthorized,
  isAdmin,
};