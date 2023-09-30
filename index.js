const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://kavya:9945994323@cluster0.ki4h0zv.mongodb.net/schoolmanagement",{ useNewUrlParser: true}, {useUnifiedTopology: true });

// Create a MongoDB schema and model for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  emailaddress: String,
  cityyoulivein: String, 
  chooseyourcourse: String,
  courseinterstedin: String,
  Phonenumber: String,
  // Changed from Number to String
});

const FormData = mongoose.model('FormData', formDataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the entire project directory as static files
app.use(express.static(path.join(__dirname, '/')));

app.post('/', function (req, res) {
  // Create a new instance of the FormData model
  let formData = new FormData({
    name: req.body.name,
    emailaddress: req.body.emailaddress,
    cityyoulivein: req.body.cityyoulivein, 
    chooseyourcourse: req.body.chooseyourcourse,
    courseinterstedin: req.body.courseinterstedin,
    Phonenumber: req.body.Phonenumber,// Corrected from contactno
  });

  formData.save()
    .then(() => {
      res.redirect("./Contact/Thankyou/thankyou.html");
    })
    .catch((error) => {
      res.status(500).send('Error saving form data.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function showThankYouMessage() {
  alert("Thank you for your response! We will reach out to you soon.");
}