const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    passenger: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    source: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    destination: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    fare: Number,
    distance: Number,
    status: {type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending'},
    feedback: String,
    rating: Number,
})


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;