import api from "./api";

export const addEvent = async (eventData) => {
  const response = await api.post("/v1/events/add", eventData);
  return response;
};

export const getEvents = async (sortBy) => {
  const response = await api.get(`/v1/events/all?sort=${sortBy}`);
  return response;
};

export const getSingleEvent = async (id) => {
  const response = await api.get(`/v1/events/single?id=${id}`);
  return response;
};