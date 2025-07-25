// import React from 'react';
// import Navbar from "../../components/Navbar/navbar";
// import "./event.css";

// const CampusEvents = () => {
//   // Sample event data
//   const events = [
//     {
//       title: "Tech Innovators Meetup",
//       date: "2025-08-10",
//       image: "https://nigatsystems.com/uploads/img/service/1714181221-Event-Tech-Support-Nigat-Systems.jpg",
//       tag: "Tech",
//     },
//     {
//       title: "Classical Music Night",
//       date: "2025-09-05",
//       image: "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?semt=ais_hybrid&w=740",
//       tag: "Music",
//     },
//     {
//       title: "AI & Robotics Expo",
//       date: "2025-07-30",
//       image: "https://media.licdn.com/dms/image/v2/C4D12AQF1MDORJSI0zg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1573551014437?e=2147483647&v=beta&t=vu-0sBXzFVMQXgzaPoH-rDPoKZrakjqyfhxjhQLBL5M",
//       tag: "Tech",
//     },
//     {
//       title: "Open Mic & Talent Show",
//       date: "2025-08-20",
//       image: "https://w0.peakpx.com/wallpaper/786/351/HD-wallpaper-music-concert-passionate-live-party.jpg",
//       tag: "Music",
//     }
//   ];

//   return (
//     <>
//       <Navbar />
//       <div>
//         <h1 className="title">All Campus Events</h1>
        

//         <div className="controls">
//           <div className="control">
//             <label htmlFor="sort">Sort by:</label>
//             <select id="sort">
//               <option>Newest</option>
//               <option>Oldest</option>
//             </select>
//           </div>

//           <div className="control">
//             <label htmlFor="tag">Filter by Tag:</label>
//             <select id="tag">
//               <option>All</option>
//               <option>Tech</option>
//               <option>Music</option>
//             </select>
//           </div>
//         </div>

//         <div className="event-grid">
//           {events.map((event, index) => (
//             <div className="event-card" key={index}>
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="event-img"
//               />
//               <div className="event-content">
//                 <h3 className="event-title">{event.title}</h3>
//                 <p className="event-date">{event.date}</p>
//                 <span className="tag">{event.tag}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CampusEvents;


import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import EventCard from "../../components/Eventcard/eventcard";
import FilterBar from "../../components/Filters/filterbar";
import "./event.css";
import { getEvents } from "../../api/events";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Events() {
  const [events, SetEvents] = useState([]);
  const [sort, setSort] = useState("newwst");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getEvents(sort);
        console.log({ result });
        if (result.status === 200) {
          SetEvents(result.data.data);
        }
      } catch (err) {
        toast.error("Error fetching events")
        console.error("Error fetching events: ", err);
      }
    };
    fetchEvents();
  }, [sort]);

  return (
    <>
      <Navbar />
      <div className="events-page">
       
        <div className="events-page__header">
  <div className="spacer" />
  <h1 className="events-page__title">All Events</h1>
  <button
    className="add-event-button"
    onClick={() => navigate("/addevent")}
  >
    Add Event
  </button>
</div>

        <FilterBar sort={sort} setSort={setSort} />
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Events;
