import {clientPromise} from "../../db/mongodb";
import _ from "lodash"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("GYM-GUARDIAN");
    // console.log(db.collection("users"))
switch (req.method) {
     
case "GET":
        const exercises = await db.collection("Workouts").findOne({ status: "Edit" });
        console.log(exercises)
        if(exercises){
            res.json({ status: 200, data: exercises });
        }else if(!exercises){
            res.json({status: 404, message: "There is currently no workout being Edited"})
        }
        
        break;
  
// case "POST":
//     // let workoutData = req.body
   
//     break;

// case "PUT": 
  
//     break;
       
    }
  }


