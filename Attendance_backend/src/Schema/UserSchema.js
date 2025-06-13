import { model, Schema } from "mongoose";

const userSchema = Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: { type: String, required: [true, "password is required"] }, // hashed
    role: { type: String, enum: ["user", "admin"], default: "user" },
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

const User = model("User", userSchema);

export default User;
