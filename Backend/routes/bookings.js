const express = require("express");
const router = express.Router();
const { bookTicket, getAllTickets } = require("../controller/bookings");
const { isAuthorized } = require("../middleware/auth");

router.post("/book", isAuthorized, bookTicket);
router.get("/all", isAuthorized, getAllTickets);

module.exports = router;