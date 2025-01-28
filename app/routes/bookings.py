from flask import Blueprint, jsonify, request
from app.models import Booking, User, Flight
from app import db
from app.schemas import BookingSchema
from datetime import datetime

bookings_bp = Blueprint("bookings", __name__)
booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)

# Create a new booking
@bookings_bp.route("/", methods=["POST"])
def create_booking():
    data = request.json
    user = User.query.get(data["user_id"])
    flight = Flight.query.get(data["flight_id"])

    if not user:
        return jsonify({"error": "User not found"}), 404
    if not flight:
        return jsonify({"error": "Flight not found"}), 404

    try:
        booking_date = datetime.strptime(data["booking_date"], "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return jsonify({"error": "Invalid date format. Expected: YYYY-MM-DD HH:MM:SS"}), 400

    booking = Booking(
        passenger_name=data["passenger_name"],
        passenger_email=data["passenger_email"],
        booking_date=booking_date,
        flight_id=flight.id,
        user_id=user.id,
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify(booking_schema.dump(booking)), 201

# Retrieve all bookings
@bookings_bp.route("/", methods=["GET"])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify(bookings_schema.dump(bookings)), 200

# Retrieve a booking by ID
@bookings_bp.route("/<int:id>", methods=["GET"])
def get_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404
    return jsonify(booking_schema.dump(booking)), 200

# Update a booking
@bookings_bp.route("/<int:id>", methods=["PUT"])
def update_booking(id):
    data = request.json
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    booking.passenger_name = data.get("passenger_name", booking.passenger_name)
    booking.passenger_email = data.get("passenger_email", booking.passenger_email)
    db.session.commit()
    return jsonify(booking_schema.dump(booking)), 200

# Delete a booking
@bookings_bp.route("/<int:id>", methods=["DELETE"])
def delete_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"message": "Booking deleted successfully"}), 200
