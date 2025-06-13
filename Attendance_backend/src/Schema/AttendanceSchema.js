import mongoose, { model, Schema } from "mongoose";

const attendanceSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
    checkIn: String,
    checkOut: String,
    status: { type: String, enum: ["Present", "Leave"], default: "Present" },
  },
  {
    timeStamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
        delete ret.__v; // Remove version key
      },
    },
  }
);

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
