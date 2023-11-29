
// Create a global client variable
import {clientPromise} from "../../db/mongodb";
import mongoose from "mongoose";
// Create a global UserModel variable


export default async function handler(req, res) {
  console.log("here")
   // Reuse the client and UserModel variables
   const client = await clientPromise;
   const db = client.db("GYM-GUARDIAN");
   // Use the User model to interact with the database
   // Switch on the HTTP method
  switch (req.method) {
    case "POST":
      // Create a new user
      const userFields = {
        username: req.body.username,
        password: req.body.password,
        _id: new mongoose.Types.ObjectId(),
      };

      let data = await db.collection("User").insertOne(userFields);

      // const allUsers = await db.collection("User").find({}).toArray();
      // Save the user to the database
      // await user.save();

      // Respond with the created user
      res.json(userFields);
      break;

    case "GET":
      try {
        const usersCursor = await db.collection("User").find({});
        const users = await usersCursor.toArray();
        console.log(users);
        res.json({ status: 200, data: users });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
  }
}