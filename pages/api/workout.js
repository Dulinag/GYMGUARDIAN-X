import {clientPromise} from "../../db/mongodb";
import _ from "lodash"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("GYM-GUARDIAN");
    // console.log(db.collection("users"))
switch (req.method) {
     
case "GET":
        const { id } = req.query; // Retrieve the muscle_group query parameter
        if (id) {
          console.log("by id", id)
          console.log(db.collection('Workouts'))
          // If a muscle_group parameter is provided, filter exercises by muscle_group
          const exercises = await db.collection("Workouts").findOne({ _id: String(id) });
          console.log(exercises)
          res.json({ status: 200, data: exercises });
        }
        else {
          // If no muscle_group parameter is provided, retrieve all exercises
          const exercises = await db.collection("Workouts").find({}).toArray();
          res.json({ status: 200, data: exercises });
        }
        break;
  
case "POST":
    // let workoutData = req.body
    console.log("Handling POST request");
    const existingWorkout = await db.collection('Workouts').findOne({ _id: req.body._id });

    if (existingWorkout) {
      res.status(409).json({ status: 409, error: 'Workout with the same ID already exists' });
    } else {
      // Process the status update
      const id = new ObjectId();
      const workoutData = {
        _id: String(id),
        status: 'Edit',
        date: new Date(),
        length: req.body.length || '',
        cals_burned: req.body.cals_burned || '',
        mood: req.body.mood || '',
        intensity: req.body.intensity || '',
        exhaustion: req.body.exhaustion || '',
        sleep: req.body.sleep || '',
        user: req.body.user || '',
        exercise_data: [],
      };

      await db.collection('Workouts').insertOne(workoutData);
      res.json({ status: 200, data: workoutData, message: 'Workout successfully created!' });
    }
    break;

case "PUT": 
    let data = req.body
    console.log(data)
    let workoutEntry = await db.collection('Workouts').findOne({ _id: data.id });

    if (!workoutEntry) {
      return res.status(404).json({ status: 404, message: 'Workout not found!' });
    }
    
    data.data.map((entry, i)=> {
      console.log(entry)
      console.log(data.data)
      if(entry)
      workoutEntry.exercise_data.push(entry)
    })
    // const result = await db.collection('Workouts').updateOne({ _id: data.id }, { $set: { exercise_data: workoutEntry.exercise_data } });
    // console.log(result)
    // await db.collection("Workouts").insertOne(userFields);
    res.json({ status: 200, data: workoutEntry, message: 'Exercise Information successfully created!' });
    break;
       
    }
  }