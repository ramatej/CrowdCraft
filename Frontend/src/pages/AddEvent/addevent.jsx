import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./AddEvent.css";
import { toast } from "react-toastify";
import { addEvent } from "../../api/events";
import axios from "axios";
import { useSelector } from "react-redux";

function AddEvent() {
  const auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidData = () => {
    if (title === "") {
      toast.warning("Invalid title");
      return false;
    } else if (description === "") {
      toast.warning("Invalid description");
      return false;
    } else if (date === "" || time === "") {
      toast.warning("Invalid date or time");
      return false;
    } else if (capacity === "" || capacity < 10) {
      toast.warning("Invalid capacity");
      return false;
    } else if (image === null) {
      toast.warning("Please add an image");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!isValidData) {
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("capacity", capacity);
      formData.append("createdBy", auth.user._id);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3001/api/v1/events/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Event added");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="add-event-container">
        <h2>Add New Event</h2>

        <form className="add-event-form">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Time</label>
          <input
            type={"time"}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <label>Capicity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            min={"10"}
          />

          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;