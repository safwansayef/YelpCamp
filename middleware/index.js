var Camp = require("../models/campgrounds");
var Comment = require("../models/Comment");
var User = require("../models/user");
var middleWareObj = {}

middleWareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        return next();
    }else{
        req.flash("error","Please Login First!");
        res.redirect("/login");
    }
}

middleWareObj.isAuthor = function (req,res,next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id,function(err,Camp){
        if(err){
            req.flash("error","Campground not found");
            res.redirect("/campgrounds");
        }else{
            if(Camp.author.id.equals(req.user._id)){
               next();
            }else{
                res.redirect("back");
            }
            
        }
    });
        
    }else{
        req.flash("error","Please login first!");
        res.redirect("back");
    }
    
    
}

middleWareObj.isCommentOwner = function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            req.flash("error","Campground not found");
            res.redirect("back");
        }else{
            if(comment.author.id.equals(req.user._id)){
               next();
            }else{
                req.flash("error","You don't have permission to do that!");
                res.redirect("back");
            }
            
        }
    });
        
    }else{
        res.redirect("back");
        req.flash("error","Please login first!");
    }
}
module.exports = middleWareObj