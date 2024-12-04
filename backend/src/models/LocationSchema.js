import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  photo: { 
    type: String, 
    required: true 
  },
  location: {
    latitude: { 
      type: Number, 
      required: true 
    },
    longitude: { 
      type: Number, 
      required: true 
    }
  }
}, {
  timestamps: true 
});

export default mongoose.model("Location", LocationSchema);