import React from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import "./SingleEvent.css";
import { useEffect } from "react";
import { getSingleEvent } from "../../api/events";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bookTicket } from "../../Api/booking";


const SingleEventPage = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams(); // get the id from url

  const [event, setEvent] = useState(null);
  const [isUserBooked, setUserBooked] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  // const seatsLeft = event.capacity - event.bookingCount;

  const handleBooking =async () => {
    try{
      if (!auth.user){
        toast.warning("Please login to book Ticets!");
        return;
      }
      if(isUserBooked){
        toast.warning("Ticket already booked!");
        return;
      }

      const result = await bookTicket({
        eventId : id,
      });

      if (result.status === 201){
        toast.success("Booking successful!");
        navigation("/tickets");
      }else{
        toast.error(Response.data.message);
        return;
      }
    }catch (error){
      console.log(error)
      toast.error(
        error.message ?? "Something went wrong"
      );
    }
  };

  useEffect(() => {
    console.log(id);
    const getData = async () => {
      try {
        setLoading(true);
        const res = await getSingleEvent(id);
      if (res.status === 200) {
        setEvent(res.data.data.event);
        const totalCapacity = res.data.data.event.capacity;
        const bookedCount = res.data.data.bookingCount ?? 0;
        setSeatsLeft(totalCapacity - bookedCount);
        setUserBooked(res.data.data.isUserBooked);
      } else {
        // navigation("/not-found");
      }
      } catch (error) {
        toast.error("Error in fetching event");
        // navigation("/not-found");
      } finally{
        setLoading(false);
      }
      
      // const response = await axios.get(`http://localhost:3001/api/v1/events/${eventId}`);
    };
    

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="single-event-container">
        <div className="single-event-card">
          {loading ? ( <p>Losding...</p>) : 
            event ? ( 
            <> 
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />

              <div className="event-details">
                <h1 className="event-title">{event.title}</h1>
                <p className="event-description">{event.description}</p>

                <div className="seats-info">
                  <span
                    className={`seats-left ${
                      seatsLeft > 0 ? "available" : "sold-out"
                    }`}
                  >
                    {seatsLeft > 0
                      ? `🎟️ Seats Left: ${seatsLeft}`
                      : "❌ Fully Booked"}
                  </span>
                  <span className="total-seats">
                    Total Seats: {event.capacity}
                  </span>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={seatsLeft === 0}
                  className={`book-button ${seatsLeft === 0 ? "disabled" : ""}`}
                >
                  {seatsLeft > 0 ? "Book Now" : "Sold Out"}
                </button>
              </div>
              </> ) : ( 
                <p>Event does not exits, please contact </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleEventPage;