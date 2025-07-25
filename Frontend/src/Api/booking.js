import api from "./api";

export const bookTicket = async (data) => {
    const response = await api.post(`/v1/bookings/book`, data);
    return response;
}

export const getAllTickets = async () => {
    const response = await api.get(`/v1/bookings/all`);
    return response;
}