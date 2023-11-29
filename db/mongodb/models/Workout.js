import mongoose from "mongoose";
import validator from "validator";
// import Product from "./product.mjs";
const snakeCaseStamps = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }};

    const ExerciseSchema = new mongoose.Schema({
        exerciseName: {
          type: String,
          required: true
        },
        sets: {
          type: String,
          required: true
        },
        reps: {
          type: String,
          required: true
        },
        weight: {
          type: String,
          required: true
        },
        notes: {
          type: String
        }
        // Add more fields as needed for each exercise
      });

export const WorkoutSchema = mongoose.model("Workout", new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        required: true,    
    },
    date: {
        type: String,
        required: true
    },
    length:{
        type: Number
    },
    cals_burned:{
        type: Number
    },
    mood:{
        type: String
    },
    intensity:{
        type:String
    },
    exhaustion:{
        type:String
    },
    sleep:{
        type: String
    },
    exercise_data: [ExerciseSchema],
    // workout_data: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Workout
    // }],
}, snakeCaseStamps
))

