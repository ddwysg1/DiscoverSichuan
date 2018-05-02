var express = require("express");
var router  = express.Router();
var Attraction= require("../models/attraction");
var middleware = require("../middleware");


//INDEX - show all attractions
router.get("/", function(req, res){
    // Get all attractions from DB
    Attraction.find({}, function(err, allAttractions){
       if(err){
           console.log(err);
       } else {
          res.render("attractions/index",{attractions:allAttractions});
       }
    });
});

//CREATE - add new attraction to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to attractions array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newAttraction = {name: name, image: image, description: desc, author:author}
    // Create a new attraction and save to DB
    Attraction.create(newAttraction, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to attractions page
            console.log(newlyCreated);
            res.redirect("/attractions");
        }
    });
});

//NEW - show form to create new attraction
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("attractions/new"); 
});

// SHOW - shows more info about one attraction
router.get("/:id", function(req, res){
    //find the attraction with provided ID
    Attraction.findById(req.params.id).populate("comments").exec(function(err, foundAttraction){
        if(err){
            console.log(err);
        } else {
            console.log(foundAttraction)
            //render show template with that attraction
            res.render("attractions/show", {attraction: foundAttraction});
        }
    });
});

// EDIT ATTRACTION ROUTE
router.get("/:id/edit", middleware.checkAttractionOwnership, function(req, res){
    Attraction.findById(req.params.id, function(err, foundAttraction){
        res.render("attractions/edit", {attraction: foundAttraction});
    });
});

// UPDATE ATTRACTION ROUTE
router.put("/:id",middleware.checkAttractionOwnership, function(req, res){
    // find and update the correct attraction
    Attraction.findByIdAndUpdate(req.params.id, req.body.attraction, function(err, updatedAttraction){
       if(err){
           res.redirect("/attractions");
       } else {
           //redirect somewhere(show page)
           res.redirect("/attractions/" + req.params.id);
       }
    });
});

// DESTROY ATTRACTION ROUTE
router.delete("/:id",middleware.checkAttractionOwnership, function(req, res){
   Attraction.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/attractions");
      } else {
          res.redirect("/attractions");
      }
   });
});


module.exports = router;

