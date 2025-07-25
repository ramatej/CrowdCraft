
// // const express = require("express");
// // const router = express.Router();
// // const upload = require("../middleware/multer");

// // // add event
// // router.post("/add", upload.single("image"), addEvent);

// // update event

// // get events

// // delete event --> you all will do

// const express = require("express")
// const router = express.Router();
// const upload = require("../middleware/multer");
// const {addEvent}=require("../controller/events")
// const {isAuthorized, isAdmin} = require("../middleware/auth");

// // add event
// router.post("/add", isAuthorized, isAdmin ,upload.single("image"), addEvent);
// //update event
// // outer.put("/update/:id", updateEvent);

// // //delette event --> you all will do
// // router.delete("/delete/:id", deleteEvent);

// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addEvent,
  getAllEvents,
  getSingleEvent,
} = require("../controller/events");
const { isAuthorized, isAdmin } = require("../middleware/auth");

// router.use((req, res, next) => {
//   console.log("h1");
//   next();
// });

// add event
router.post("/add", isAuthorized, isAdmin, upload.single("image"), addEvent);

// get all events
router.get("/all", getAllEvents);

router.get("/single",isAuthorized, getSingleEvent);

// router.get("/single/:id", getSingleEvent);

// router.post("/add", isAuthorized, isAdmin, upload.single("image"), addEvent);

// update event

// create api to get the events

// get events

// delete event --> you all will do

module.exports = router;