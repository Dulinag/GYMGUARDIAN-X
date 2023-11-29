
// let client = new MongoClient(URI, options)
// let clientPromise

// if(process.env.NODE_ENV !== 'production'){
//     if(!global._mongoClientPromise){
//         global._mongoClientPromise = client.connect()
//     }

//     clientPromise = global._mongoClientPromise
// }else {
//     clientPromise = client.connect()
// }
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
// import User from './models/User';
// import { WorkoutSchema } from './models/Workout';

const uri = process.env.MONGODB_URI
if(!uri) throw new Error('Please add your Mongo DB URI to .nv.local')
// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   }
  
  let client
  let clientPromise
  
  if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
  }
  
  if (process.env.NODE_ENV === 'development') {

    if (!global._mongoClientPromise) {
      client = new MongoClient(uri)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri)
    clientPromise = client.connect()
  }

  // Define and initialize the User model\

  // let UserModel;
  // if (mongoose.models.User) {
  //   UserModel = mongoose.models.User;
  // } else {
  //   UserModel = mongoose.model('User', User);
  // }
  
  // console.log(mongoose.models.User);
  
  // // Define and initialize the Workout model
  // let WorkoutModel;
  // if (mongoose.models.Workout) {
  //   WorkoutModel = mongoose.models.Workout;
  // } else {
  //   WorkoutModel = mongoose.model('Workout', WorkoutSchema);
  // }
  // console.log(mongoose.models.Workout);

export { clientPromise };