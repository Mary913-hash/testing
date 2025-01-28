from app import db

# Association Table for the many-to-many relationship between User and Flight
user_flight = db.Table('user_flight',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('flight_id', db.Integer, db.ForeignKey('flights.id'), primary_key=True)
)

# User Model
class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Increased size to 255 for hashed passwords

    # Many-to-many relationship with Flight through the association table
    flights = db.relationship('Flight', secondary=user_flight, back_populates="users")

    # One-to-many relationship with Booking (since one user can have multiple bookings)
    bookings = db.relationship('Booking', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.name}, Email: {self.email}>"

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

class Flight(db.Model):
    __tablename__ = 'flights'
    
    id = db.Column(db.Integer, primary_key=True)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    # Relationship with Booking model
    bookings = db.relationship('Booking', back_populates='flight', cascade="all, delete-orphan")

    # Many-to-many relationship with User through the association table
    users = db.relationship('User', secondary=user_flight, back_populates="flights")
    
    def __repr__(self):
        return f"<Flight {self.id} from {self.origin} to {self.destination}>"

    def __init__(self, origin, destination, departure_time, arrival_time, price):
        self.origin = origin
        self.destination = destination
        self.departure_time = departure_time
        self.arrival_time = arrival_time
        self.price = price

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    passenger_name = db.Column(db.String(100), nullable=False)
    passenger_email = db.Column(db.String(100), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    
    # Foreign key linking to Flight model
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), nullable=False)
    
    # Relationship with Flight model
    flight = db.relationship('Flight', back_populates='bookings')

    # Foreign key linking to User model
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationship with User model
    user = db.relationship('User', back_populates='bookings')
    
    def __repr__(self):
        return f"<Booking {self.id} for {self.passenger_name}>"

    def __init__(self, passenger_name, passenger_email, booking_date, flight_id, user_id):
        self.passenger_name = passenger_name
        self.passenger_email = passenger_email
        self.booking_date = booking_date
        self.flight_id = flight_id
        self.user_id = user_id
