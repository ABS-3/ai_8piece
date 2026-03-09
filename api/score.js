const { MongoClient } = require("mongodb");

let client;
let clientPromise;

const uri = process.env.MONGO_URI;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { moves, time } = req.body;

    const client = await clientPromise;
    const db = client.db("puzzleDB");
    const collection = db.collection("scores");

    await collection.insertOne({
      moves,
      time,
      date: new Date()
    });

    res.status(200).json({ status: "saved" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }

};