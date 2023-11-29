import {clientPromise} from "../../lib/mongodb";
import _ from "lodash"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("GYM-GUARDIAN");
  // console.log(db.collection("users"))
  switch (req.method) {
   
    case "GET":
      const { muscle_group } = req.query; // Retrieve the muscle_group query parameter
      if (muscle_group) {
        // If a muscle_group parameter is provided, filter exercises by muscle_group
        const exercises = await db.collection("Exercises").find({ muscle_group }).toArray();
        console.log(exercises)
        res.json({ status: 200, data: exercises });
      } else {
        // If no muscle_group parameter is provided, retrieve all exercises
        const exercises = await db.collection("Exercises").find({}).toArray();
        res.json({ status: 200, data: exercises });
      }
      break;

     
  }
}