var express = require("express");
var router  = express.Router({mergeParams: true});
var Camp    = require("../models/campgrounds");
var Comment = require("../models/Comment")
var middleware = require("../middleware")
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    Camp.findById(req.params.id, function(err, Camp){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {Camp: Camp});
        }
    })
});

router.post("",middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Camp.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save()
               campground.comments.push(comment);
               campground.save();
               console.log(comment)
               req.flash("success","You have sucessfully created a new comment")
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

router.get("/:comment_id/edit",middleware.isCommentOwner,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit",{camp_id:req.params.id,comment:comment});
        }
    });
});

//UPDATE

router.put("/:comment_id",middleware.isCommentOwner,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err){
            console.log(err);
        }else{
            req.flash("success","You have sucessfully updated the comment!")
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    
});

//Delete

router.delete("/:comment_id",middleware.isCommentOwner,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","You have sucessfully deleted the comment!")
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports = router;