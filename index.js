const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const { ObjectId } = require('mongodb');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@plant-care-server.40p6k3h.mongodb.net/?retryWrites=true&w=majority&appName=plant-care-server`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    const plantCollection = client.db("plantCare").collection("plants");
    app.patch("/plants/:id", async (req, res) => {
      const { id } = req.params;
      const updatedPlant = req.body;
      try {
        const result = await plantCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedPlant }
        );
        res.send(result);
      }
      catch (error) {
        console.error("Error updating plant:", error);
        return res.status(500).send({ error: "Failed to update plant" });
      }
    })
    app.get("/myplants", async (req, res) => {

      const email = req.query.email;

      if (!email) {
        return res.status(400).send({ error: "Email query parameter is required" });
      }
      const result = await plantCollection.find({ email }).toArray();
      res.send(result);
    });

    app.delete("/plants/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const result = await plantCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      }
      catch (error) {
        console.error("Error deleting plant:", error);
        return res.status(500).send({ error: "Failed to delete plant" });
      }
    })

    app.get("/plants", async (req, res) => {
      const result = await plantCollection.find().toArray();
      res.send(result);
    });
    app.get("/plants/newplants", async (req, res) => {

      const result = await plantCollection.find().sort({ nextWateringDate: 1 }).limit(6).toArray();
      res.send(result);
    });


    function isValidObjectId(id) {
      return ObjectId.isValid(id);
    }

    app.get("/plants/:id", async (req, res) => {
      const id = req.params.id;

      if (!isValidObjectId(id)) {
        return res.status(400).send({ error: "Invalid plant ID" });
      }

      try {
        const query = { _id: new ObjectId(id) };
        const plant = await plantCollection.findOne(query);
        if (!plant) {
          return res.status(404).send({ error: "Plant not found" });
        }
        res.send(plant);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch plant" });
      }
    });




    app.post("/plants", async (req, res) => {
      const newPlant = req.body;
     

      const result = await plantCollection.insertOne(newPlant);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello from plant care server')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});