var express = require("express");
var router  = express.Router();
var Camp    = require("../models/campgrounds");
var middleware = require("../middleware")
router.get("/", function(req, res){
    
    Camp.find({},function(err,camps){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/Index",{camps:camps});
        }
    });
});


router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name: name, image: image, description: description,author:author}
    Camp.create(newCampground,function(err,Camp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
            console.log(newCampground)
        }
    })
    
});

router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {Camp: foundCamp});
        }
    });
});

//EDIT CAMPGROUND ROUTE

router.get("/:id/edit",middleware.isAuthor,function(req,res){
        Camp.findById(req.params.id,function(err,Camp){
                res.render("campgrounds/edit",{Camp:Camp});
    });
});

        

//UPDATE CAMPGROUND ROUTE

router.put("/:id",middleware.isAuthor,function(req,res){
    
   Camp.findByIdAndUpdate(req.params.id,req.body.camp,function(err,UpdatedCamp){
       if(err){
           console.log(err)
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//DELETE A CAMPGROUNDS

router.delete("/:id",middleware.isAuthor,function(req,res){
    Camp.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds");
        }
    });
});


    

module.exports = router;