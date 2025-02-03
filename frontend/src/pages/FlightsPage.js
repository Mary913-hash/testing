import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightsPage.css';

const API_URL = 'http://127.0.0.1:5000/flights/';  // Constant for API URL

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    origin: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
    price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);

  // Fetch flights from the backend when the component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(API_URL);
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  // Handle create new flight
  const handleCreateFlight = async () => {
    try {
      const response = await axios.post(API_URL, newFlight);
      setFlights([...flights, response.data]);
      setNewFlight({
        flight_number: '',
        origin: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        price: '',
      });
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  // Handle delete flight
  const handleDeleteFlight = async (id) => {
    console.log('Deleting flight with id:', id);  // Log the id for debugging
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFlights(flights.filter(flight => flight.id !== id));
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  // Handle edit flight
  const handleEditFlight = (flight) => {
    setIsEditing(true);
    setEditingFlight(flight);
    setNewFlight({
      flight_number: flight.flight_number,
      origin: flight.origin,
      destination: flight.destination,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      price: flight.price,
    });
  };

  // Handle update flight
  const handleUpdateFlight = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editingFlight.id}`, newFlight);
      setFlights(flights.map(flight =>
        flight.id === response.data.id ? response.data : flight
      ));
      setIsEditing(false);
      setNewFlight({
        flight_number: '',
        origin: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        price: '',
      });
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  };

  return (
    <div className="flights-page-container">
      <h2>Available Flights</h2>

      {/* Flight List */}
      <div className="flight-list">
        {flights.map(flight => (
          <div key={flight.id} className="flight-card">
            <h4>{flight.origin} → {flight.destination}</h4>
            <div className="flight-info-row">
              <p><strong>Flight Duration:</strong> {/* Add flight duration here if available */}</p>
              <p><strong>Next Flight:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
              <p><strong>Fare:</strong> ${flight.price}</p>
            </div>
            <button onClick={() => handleEditFlight(flight)} className="edit-button">Edit</button>
            <button onClick={() => handleDeleteFlight(flight.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>

      {/* Add New Flight Form */}
      <div className="flight-form">
        <h3>{isEditing ? 'Edit Flight' : 'Add New Flight'}</h3>
        <input
          type="text"
          placeholder="Flight Number"
          value={newFlight.flight_number}
          onChange={(e) => setNewFlight({ ...newFlight, flight_number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Origin"
          value={newFlight.origin}
          onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destination"
          value={newFlight.destination}
          onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newFlight.departure_time}
          onChange={(e) => setNewFlight({ ...newFlight, departure_time: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newFlight.arrival_time}
          onChange={(e) => setNewFlight({ ...newFlight, arrival_time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newFlight.price}
          onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
        />
        <button onClick={isEditing ? handleUpdateFlight : handleCreateFlight}>
          {isEditing ? 'Update Flight' : 'Add Flight'}
        </button>
      </div>
    </div>
  );
};

export default FlightsPage;
