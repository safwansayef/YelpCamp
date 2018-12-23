var mongoose = require("mongoose");
var Camp = require("./models/campgrounds")
var Comment = require("./models/Comment")

var data = [
    {
        name: "Camp 1",
        image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
        description: "Cupcake ipsum dolor sit amet fruitcake. Brownie tootsie roll caramels. Cake chocolate cake sugar plum chocolate caramels jujubes candy canes. Macaroon tart cheesecake cake chupa chups jujubes"
    },
    {
        name: "Camp 2",
        image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg",
        description: "Cupcake ipsum dolor sit amet caramels pudding powder pudding. Croissant tart dessert sweet roll. Croissant gingerbread lemon drops. Danish brownie wafer muffin pastry."
    },
    {
        name: "Camp 3",
        image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142__340.jpg",
        description: "Cupcake ipsum dolor sit amet. Jujubes cake soufflé. Gummi bears wafer soufflé donut chocolate bar. Tootsie roll dessert icing topping tart lollipop tootsie roll gummi bears powder.h"
    }
    
    ]




function seedDB(){
  //Remove all campgrounds
  Camp.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Camp.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            comment : "D'OH!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}


module.exports = seedDB;


