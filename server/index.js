const express = require("express")
const collection = require("./mongo")
const conDB = require("./conDB")
const Service = require('./services');
const SOS = require('./sos');
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(cors());
const mongoose = require("mongoose")
try {
  mongoose.connect('mongodb://localhost:27017/Login');
} catch (error) {
  console.error("Error connecting to the database:", error);
}



port = 3000;
app.get('/sendMessage', (req, res) => {
  res.send({ message: 'Working!' });
});

app.post('/sendMessage', (req, res) => {
    const receivedObject = req.body;

    console.log('Received Object:', receivedObject);

    res.json({ message: 'Message received' }); 
});

app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        res.json("Login successful");
      } else {
        res.json("Incorrect password");
      }
    } else {
    
      res.json("User does not exist");
    }
  } catch (e) {
    console.error("Error occurred during login:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post('/Signup', async (req, res) => {
  const data = req.body;

  try {
      const check = await collection.findOne({ email: data.email });
      if (check) {
          res.json("exist");
      } else {
          const user = new collection(data);
          await user.save();
          console.log("User Saved:", user);
          res.json("User registered successfully");
      }
  } catch (e) {
      console.error("Error occurred during signup:", e);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/UserProfile', async (req, res) => {
  const {Gemail}= req.query;
  try {
      const user = await collection.findOne({ email: Gemail });
    if (user) {
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error("Error occurred while fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/Contact', async (req, res) => {
  const data = req.body;
  try {
      const message = new conDB(data);
      await message.save();
      console.log(data)
      res.json("Message Received");
  } catch (e) {
      console.error("Error occurred during saving message:", e);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/Contact', async (req, res) => {
  try {
    // Fetch contact messages from your database
    const contactMessages = await conDB.find({});
    res.json(contactMessages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/Service', async (req, res) => {
  try {
    const { type, latitude, longitude } = req.body;
    console.log(type)
    const service = new Service({
      serviceType: type,
      latitude: latitude,
      longitude: longitude,
    });

    await service.save();

    res.json({ message: 'Service request received and saved successfully' });
  } catch (error) {
    console.error('Error handling service request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/Service', async (req, res) => {
  try {
    const requests = await Service.find({});

    res.json(requests); // Send the array of requests with _id included
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/Service/:id', async (req, res) => {
  const requestId = req.params.id;
  try {
    // Delete the request from the database
    await Service.findByIdAndDelete(requestId);
    res.json({ message: 'Service request deleted successfully' });
  } catch (error) {
    console.error('Error deleting service request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


mongoose.connect('mongodb://localhost:27017/Login', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
  
app.post('/SOS', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const sosRequest = new SOS({
      latitude: latitude,
      longitude: longitude,
    });
    await sosRequest.save();
    res.json({ message: 'SOS request received and saved successfully' });
  } catch (error) {
    console.error('Error handling SOS request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/SOS', async (req, res) => {
  try {
    const sosRequests = await SOS.find({});
    res.json(sosRequests);
  } catch (error) {
    console.error('Error fetching SOS requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/SOS/:id', async (req, res) => {
  const sosRequestId = req.params.id;
  try {
    await SOS.findByIdAndDelete(sosRequestId);
    res.json({ message: 'SOS request deleted successfully' });
  } catch (error) {
    console.error('Error deleting SOS request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/RequestUsers', async (req, res) => {
  try {
    // Fetch request users data from your database
    const requestUsersData = await collection.find({});
    res.json(requestUsersData);
  } catch (error) {
    console.error('Error fetching request users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
