import db from "../db/connection.js";
import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  let collection = await db.collection("lists");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Create new list
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      code: req.body.code,
    };
    let collection = await db.collection("lists");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Delete by _id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("lists");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
