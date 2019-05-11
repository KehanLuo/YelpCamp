var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144494f4c07ca6e4b5_340.jpg",
//         description: "This is a huge granite hill, no bathrooms, no water, beautiful granite"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     });


// var campgrounds = [
//         {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f1c271a3e8b1ba_340.jpg"},
//         {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144494f4c07ca6e4b5_340.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
//         {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f1c271a3e8b1ba_340.jpg"},
//         {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144494f4c07ca6e4b5_340.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
//         {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f1c271a3e8b1ba_340.jpg"},
//         {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144494f4c07ca6e4b5_340.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
// ];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   //redirect back to campgrounds page
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   //create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else{
         //redirect back to campgrounds page
          res.redirect("/campgrounds");
      }
   });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Has Started!");
});