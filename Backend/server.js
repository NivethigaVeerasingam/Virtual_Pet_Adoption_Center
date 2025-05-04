const app = require('./app')
const mongoose = require('mongoose');  // Mongoose import

// Database connect
mongoose.connect("mongodb+srv://VirtualPetAdoptionCenter:VirtualPetAdoptionCenter12345@cluster0.ifcdwhp.mongodb.net/petList?retryWrites=true&w=majority&appName=Cluster0")

  .then(() => {
    console.log("Connected to database!");

    app.listen(5000, () => {                   // Server start
      console.log("Server is running on port 5000");
    });

  })

  .catch((error) => {                            // Error catch
    throw new Error(error);
    console.log("Connection failed!");
  })
