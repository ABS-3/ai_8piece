import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI   // must match your Vercel env variable

let client
let clientPromise

if (!clientPromise) {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { moves, time, name } = req.body
      const client = await clientPromise
      const db = client.db("puzzleDB")

      await db.collection("scores").insertOne({
        moves,
        time,
        name,
        date: new Date()
      })

      res.status(200).json({ status: "saved" })
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
