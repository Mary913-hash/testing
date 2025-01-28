from marshmallow import fields, Schema
from app import ma
from app.models import User, Flight, Booking

# User Schema to serialize User data
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        fields = ("id", "name", "email", "password")  

# Flight Schema with proper date formatting
class FlightSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Flight
        load_instance = True
        fields = ("id", "origin", "destination", "price", "departure_time", "arrival_time")

    departure_time = fields.DateTime(format="%Y-%m-%d %H:%M:%S")
    arrival_time = fields.DateTime(format="%Y-%m-%d %H:%M:%S")

# Booking Schema to serialize Booking data
class BookingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
        fields = ("id", "passenger_name", "passenger_email", "booking_date", "user", "flight")

    user = fields.Nested(UserSchema)  # Embed user details
    flight = fields.Nested(FlightSchema)  # Embed flight details
    booking_date = fields.DateTime(format="%Y-%m-%d %H:%M:%S")
