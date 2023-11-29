import {clientPromise} from "@/lib/mongodb";
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
          // If a muscle_group parameter is provided, filter exercises by muscle_group
          const exercises = await db.collection("Workouts").find({ id }).toArray();
          console.log(exercises)
          res.json({ status: 200, data: exercises });
        } else {
          // If no muscle_group parameter is provided, retrieve all exercises
          const exercises = await db.collection("Workouts").find({}).toArray();
          res.json({ status: 200, data: exercises });
        }
        break;
  
case "POST":
    let workoutData = req.body
    if(!workoutData.date){
      res.status(404).send({ message: 'User must fill out the date' });
    } else {
      // Process the status update
      const id = new ObjectId()
      workoutData.status = "Edit"
      workoutData._id = id

    await db.collection("Workouts").insertOne(workoutData);

      res.json({status:200, data: workoutData, message: "Workout successfully created!"})

    }
    break;

case "PUT": 
    let data = req.body
    const {workoutId, exercises} = data

    let workoutEntry = await db.collection("Workouts").find({ id }).toArray();

    // await db.collection("Workouts").insertOne(userFields);


    break;
       
    }
  }