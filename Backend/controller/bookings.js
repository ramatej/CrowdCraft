const Bookings = require("../model/booking");
const Events = require("../model/events");
const QRCode = require("qrcode");

const bookTicket = async (req, res) => {
  try {
    // get the bookng data
    const { eventId } = req.body;

    if(!req.user){
      return res.status(403).json({
        error: true,
        message: "Ypu are not authorized",
      })
    }

    //   get the event details
    const event = await Events.findById(eventId);

    if (!event) {
      return res.status(404).json({
        error: true,
        message: "event not found",
      });
    }

    // get total bookings
    const bookingsCount = await Bookings.countDocuments({ eventId: eventId });

    // check if seets are available
    if (bookingsCount >= event.capacity) {
      return res.status(400).json({
        error: true,
        message: "All seets are booked",
      });
    }

    // create booking
    const booking = new Bookings({ userId: req.user._id, eventId, qrCode: "" });

    // Save to get _id
    await booking.save();

    const qrPayload = JSON.stringify({
      bookingId: booking._id,
      eventId,
      userId: req.user._id ,
    });

    // Generate QR code as base64
    const qrCodeDataUrl = await QRCode.toDataURL(qrPayload);

    booking.qrCode = qrCodeDataUrl;

    await booking.save();

    res.status(201).json({
      error: true,
      message: "Booking Successful",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server Error" });
  }
};

const getAllTickets = async (req, res) => {
  try{
    if(!req.user){
      return res.status(403).json({
        error: true, message: "Not authorized"
      })
    }

    const userId = req.user._id;

    const bookingData = await Bookings.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        }
      },
      {
        $unwind: {
          path: "$event",
        },
      },
      {
        $project: {
          _id: 1,
          event: 1,
          qrCode: 1,
        }
      }
    ]);

    return res.status(200).json({
      error: false,
      data: bookingData,
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: true, message: " Server Error" });
  }
};

module.exports = {
  bookTicket,
  getAllTickets,
};