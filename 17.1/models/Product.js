//*17.1
import validator from "validator";
import { model, Schema, set } from "mongoose";
set("strictQuery", true);
const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    isActive: { type: Boolean },
    details: {
      description: {
        type: String,
        required: true,
        validate(value) {
          if (value.length < 10) {
            throw new Error(
              "Description length is too short. Must be at least 10 characters."
            );
          }
        },
      },
      price: {
        type: Number,
        required: true,
        validate(value) {
          if (value <= 0) {
            throw new Error("Price must be positive number");
          }
        },
      },
      discount: { type: Number, default: 0 },
      imageURLs: {
        type: [String],
        minLength: 2,
        validate(arr) {
          if (arr.some(!validator.isURL)) {
            throw new Error("Invalid image url path!");
          }
        },
      },
      phoneNumber: {
        type: String,
        required: true,
        validate(val) {
          if (!validator.isMobilePhone(val, ["he-IL"])) {
            throw new Error("Invalid phone number!");
          }
        },
      },
      DateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { versionKey: false }
);
export const Product = model("Product", productSchema);
