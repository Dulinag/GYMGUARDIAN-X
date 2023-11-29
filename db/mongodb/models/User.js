import mongoose from "mongoose";
import validator from "validator";
import { WorkoutSchema } from "./Workout";
// import Product from "./product.mjs";
const snakeCaseStamps = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }};

const User = mongoose.model("User", new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        validate: [ validator.isAlphanumeric, "Username can only contain letters and numbers" ]
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
    },
    workout_data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }],
    // items_saved: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Workout
    // }],
    // cart: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Product
    // }]
}, snakeCaseStamps
))

export default User