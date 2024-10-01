const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js")
const { isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");

//Server Side Validation
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}

//REVIEW MODEL
router.post("/",
    isLoggedIn,
    wrapAsync(async(req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = await Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        console.log(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "New Review Added!");
        res.redirect(`/listings/${listing.id}`)
    }));
//REVIEW MODEL 

//DELETE REVIEW ROUTE
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,

    wrapAsync(async(req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    }));
//DELETE REVIEW ROUTE

module.exports = router;