
const { Types } = require("mongoose");
const cloudinary = require("../helper/cloudinary");
const booking = require("../model/booking");
const Event = require("../model/events");
const Bookings = require("../model/booking");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "events" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

async function addEvent(req, res) {
  try {
    const { title, description, date, time, capacity, createdBy } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "Event image is required!",
      });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const result = await Event.create({
      title,
      description,
      date,
      time,
      capacity,
      createdBy,
      image: imageUrl,
    });

    if (result) {
      return res.status(200).json({
        error: false,
        message: "Added event!",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Error in adding event!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
  // get all the data from req body
}

async function getAllEvents(req, res) {
  try {
    // get query parameters
    const { sort } = req.query;

    let sortCommand = {};

    if (sort === "newest") {
      sortCommand = { date: -1 };
    } else {
      sortCommand = { date: 1 };
    }

    const data = await Event.aggregate([
      {
        $match: {
          date: { $gt: new Date() },
        },
      },
      { $sort: sortCommand },
    ]);

    return res.status(200).json({
      error: false,
      data: data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
}

async function getSingleEvent(req, res) {
  try {
    // get query parameters
    const { id } = req.query;

    // get event data
    const data = await Event.findById(id);

    if (!data) {
      return res.status(404).json({
        error: true,
        message: "Event not found!",
      });
    }

    // get if user has booking
    let userBooking = false;
    if (req.user) {
      userBooking = await booking.findOne({
        userId: new Types.ObjectId(req.user._id.toString()),
        eventId: new Types.ObjectId(id),
      });
    }

    const bookingCount = await Bookings.countDocuments({
      eventId: new Types.ObjectId(id),
    });

    return res.status(200).json({
      error: false,
      data: {
        event: data,
        isUserBooked: userBooking ? true : false,
        bookingCount: bookingCount,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
}

module.exports = {
  addEvent,
  getAllEvents,
  getSingleEvent,
};
