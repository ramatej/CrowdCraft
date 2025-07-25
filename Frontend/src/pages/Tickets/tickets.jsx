import React, { useEffect, useState } from "react";
import "./tickets.css";
import Navbar from "../../components/navbar/Navbar";
import { getAllTickets } from "../../Api/booking";
import { toast } from "react-toastify";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await getAllTickets();
        console.log({ result });
        if ((result.status = 200)) {
          setTickets(result.data.data);
        } else {
          toast.error("Error in fetching tickets data");
        }
      } catch (error) {
        toast.error(error.message ?? "Error in fetching tickets!");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="tickets-page">
        <div className="tickets-container">
          <h2 className="page-title">🎫 Your Tickets</h2>

          {tickets.length === 0 ? (
            <p className="no-tickets">No tickets booked yet.</p>
          ) : (
            <div className="tickets-list">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-card">
                  <img
                    src={ticket.qrCode}
                    alt={`QR for ${ticket.event.title}`}
                    className="qr-image"
                  />
                  <div className="ticket-info">
                    <h3 className="event-title">{ticket.event.title}</h3>
                    <p className="event-date">
                      📅 {new Date(ticket.event.date).toLocaleDateString()}
                    </p>
                    <p className="ticket-id">Ticket ID: #{ticket._id}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketsPage;