const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb")

const app = express()

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://puzzleUser:6wlXskW1pYbPqmRh@cluster0.kifadyv.mongodb.net/?appName=Cluster0"

const client = new MongoClient(uri)

let scoresCollection

async function start(){

await client.connect()

const db = client.db("puzzleDB")
scoresCollection = db.collection("scores")

app.listen(3000, () => {
console.log("Server running on http://localhost:3000")
})

}

start()

app.post("/score", async (req,res)=>{

const score = req.body

await scoresCollection.insertOne(score)

res.send({status:"saved"})

})