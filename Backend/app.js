// const express = require("express");
// const connectDb = require("./db");
// const usersRouter = require("./routes/users");
// const eventsRouter = require("./routes/events");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// require("dotenv").config();

// const app = express();
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }))

// connectDb();

// app.use(express.json());
// app.use(cookieParser());

// // users routes
// app.use("/api/v1/users", usersRouter);

// // events routes
// app.use("/api/v1/events", eventsRouter);

// const PORT = process.env.PORT ?? 3001;

// // liste on the port
// app.listen(PORT, () => console.log(`Running app on PORT ${PORT}`));


const express = require("express");
const connectDb = require("./db");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const bookingRouter = require("./routes/bookings");
const authRoutes = require('./routes/logout');

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// users routes
app.use("/api/v1/users", usersRouter);

// events routes
app.use("/api/v1/events", eventsRouter);

app.use("/api/v1/bookings", bookingRouter);

app.use("/api/v1", authRoutes);

const PORT = process.env.PORT ?? 3001;

// liste on the port
app.listen(PORT, () => console.log(`Running app on PORT ${PORT}`));