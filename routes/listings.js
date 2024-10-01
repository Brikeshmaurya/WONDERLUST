const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const multer = require('multer');
const storage = require("../cloudConfig.js")
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' })

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};


/* ================================================List items start */
// router.get("/", async(req, res) => {
//     const listing = await Listing.find({});
//     res.render("index.ejs", { listing });
// }); /* ================================================= List items end */
router.get('/', async(req, res) => {
    let { category } = req.query; // Retrieve category from query parameters
    let filter = {};
    if (category) {
        filter.category = category; // Apply filter if category is present
    }

    const listings = await Listing.find(filter);
    res.render('index.ejs', { listing: listings });
});



//**************************************************Add List Start
router.get("/new", isLoggedIn, (req, res) => {
    res.render("new.ejs")
});
router.post("/",
    isLoggedIn,
    upload.single('listing[image]'),
    wrapAsync(async(req, res, next) => {
        if (!req.body.listing) {
            throw new ExpressError(404, "Enter a valid data for Listing")
        }
        let url = req.file.path;
        let filename = req.file.filename;
        let newList = new Listing(req.body.listing);
        newList.owner = req.user._id;
        newList.image = { url, filename };
        await newList.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    })); //**********************************************ADD new List End




//Show Route
router.get("/:id", wrapAsync(async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author", } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "You are not the owner!");
        res.redirect(`/listings`);
    }

    res.render("show.ejs", { listing });
}));
//Show Route


//**********************************************EDIT  List Start
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    async(req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing does not Exist!");
            res.redirect(`/listings`);
        }
        let originalImageUrl = listing.image.url;
        let originalUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300")
        res.render("edit.ejs", { listing, originalUrl });
    });
//update route
router.put("/:id",
    isLoggedIn,
    upload.single('listing[image]'),
    wrapAsync(async(req, res) => {
        let { id } = req.params;
        if (!req.body.listing) {
            throw new ExpressError(400, "Enter a valid data for Listing")
        }
        if (typeof(req.file) !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            let newList = await Listing.findByIdAndUpdate(id, {...req.body.listing });
            newList.image = { url, filename };
            await newList.save();
        }
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    }));
//**********************************************EDIT  List End



//**********************************************DELETE  List Start
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async(req, res) => {
        let { id } = req.params;
        let deletedList = await Listing.findByIdAndDelete(id);
        console.log(deletedList);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    }));

//*******************************************DELETE  List End
module.exports = router;