import mongoose from "mongoose";

const educatorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    headline: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    expertise: [{ type: String, trim: true }],
    website: { type: String, trim: true, default: "" },
    avatarUrl: { type: String, trim: true, default: "" },
    teachingSince: { type: Date },
    socialLinks: {
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      youtube: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true },
);

const Educator = mongoose.model("Educator", educatorSchema);

export default Educator;
