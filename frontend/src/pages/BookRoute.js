import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookRoute.css';

const BookRoute = () => {
  const [bookings, setBookings] = useState([]);
  const [flightId, setFlightId] = useState('');
  const [userId, setUserId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [status, setStatus] = useState('Pending');
  const [editingBookingId, setEditingBookingId] = useState(null); // For handling updates

  const API_URL = 'http://localhost:5000/bookings';

  // Fetch all bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(API_URL);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Create a new booking
  const handleCreateBooking = async (e) => {
    e.preventDefault();

    if (!flightId || !userId || !bookingDate || !seatNumber) {
      alert('Please fill in all fields.');
      return;
    }

    const newBooking = {
      flight_id: flightId,
      user_id: userId,
      booking_date: bookingDate,
      seat_number: seatNumber,
      status,
    };

    try {
      await axios.post(API_URL, newBooking);
      alert('Booking created successfully!');
      fetchBookings();
      resetForm();
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  // Update an existing booking
  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    if (!flightId || !userId || !bookingDate || !seatNumber) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedBooking = {
      flight_id: flightId,
      user_id: userId,
      booking_date: bookingDate,
      seat_number: seatNumber,
      status,
    };

    try {
      await axios.put(`${API_URL}/${editingBookingId}`, updatedBooking);
      alert('Booking updated successfully!');
      fetchBookings();
      resetForm();
      setEditingBookingId(null); // Clear editing mode
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  // Delete a booking
  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Booking deleted successfully!');
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  // Edit a booking (sets form for update)
  const handleEditBooking = (booking) => {
    setFlightId(booking.flight_id);
    setUserId(booking.user_id);
    setBookingDate(booking.booking_date);
    setSeatNumber(booking.seat_number);
    setStatus(booking.status);
    setEditingBookingId(booking.id); // Set the booking ID to update
  };

  // Reset form after submission
  const resetForm = () => {
    setFlightId('');
    setUserId('');
    setBookingDate('');
    setSeatNumber('');
    setStatus('Pending');
  };

  return (
    <div className="book-route-container">
      <h2>{editingBookingId ? 'Edit Booking' : 'Create Booking'}</h2>

      {/* New container for the form elements */}
      <div className="booking-container">
        <div className="create-booking">
          <div className="form-container">
            <form
              onSubmit={editingBookingId ? handleUpdateBooking : handleCreateBooking}
              className="booking-form"
            >
              <div className="form-group">
                <label>Flight ID</label>
                <input
                  type="text"
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Booking Date</label>
                <input
                  type="datetime-local"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Seat Number</label>
                <input
                  type="text"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button type="submit" className="submit-button">
                {editingBookingId ? 'Update Booking' : 'Create Booking'}
              </button>
            </form>
          </div>
        </div>

        <div className="existing-booking">
          <h3>Existing Bookings</h3>
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-item">
                <div className="booking-details">
                  <p>Flight ID: {booking.flight_id}</p>
                  <p>User ID: {booking.user_id}</p>
                  <p>Booking Date: {new Date(booking.booking_date).toLocaleString()}</p>
                  <p>Seat Number: {booking.seat_number || 'N/A'}</p>
                  <p>Status: {booking.status}</p>
                </div>
                <div className="booking-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditBooking(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookRoute;
