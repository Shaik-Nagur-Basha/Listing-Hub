const Listing = require("../models/listing.js");

// const newAndUpdateListing = async (listing) => {
//   let locationQuery = listing.location;
//   let queryUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${locationQuery}&apiKey=${process.env.MAP_TOKEN}`;
//   let resultUrl = await fetch(queryUrl);
//   let coords = await resultUrl.json();
//   return (listing.locationCoordinates = [
//     coords.items[0].position.lat,
//     coords.items[0].position.lng,
//   ]);
// };

module.exports.index = async (req, res) => {
  let { titleQuery } = req.query;
  if (titleQuery && titleQuery !== "undefined" && titleQuery !== "") {
    let allListingsTitles = await Listing.find();
    let titleArray = [];
    let titleSearch = [];
    let listingIds = [];
    for (listing of allListingsTitles) {
      titleArray.push([[listing.title.toLowerCase().split(" ")], listing._id]);
    }
    titleSearch.push(titleQuery.toLowerCase().split(" "));

    // titleArray[0.....All][0][0]       --->>     Array of DB Title Strings Array
    // titleArray[0.....All][1]           --->>     Array of DB Title Id's Array
    // titleArray[0]                     --->>     Array of Strings of Title Query

    for (title of titleArray) {
      for (str of titleSearch[0]) {
        if (title[0][0].some((el) => el === str)) {
          listingIds.push(title[1]);
        }
      }
    }

    // res.send(listingIds);
    // let allListings = await Listing.find({ title: `${titleQuery}` });

    let allListings = await Listing.find({ _id: { $in: listingIds } });
    // console.log(allListings.length)

    if (!allListings.length) {
      req.flash("error", "Listing doesn't exist");
      return res.redirect("/listings");
    }
    return res.render("listings/index.ejs", { allListings });
  }

  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
  let locationQuery = req.body.listing.location;
  let queryUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${locationQuery}&apiKey=${process.env.MAP_TOKEN}`;
  let resultUrl = await fetch(queryUrl);
  let coords = await resultUrl.json();
  // console.log(coords.items[0].position.lat);
  // console.log(coords.items[0].position.lng);
  // res.send(resultUrl.items[0].position.lat, resultUrl.items[0].position.lng)

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url,".....",filename);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.locationCoordinates = [
    coords.items[0].position.lat,
    coords.items[0].position.lng,
  ];
  // await newAndUpdateListing(newListing);
  await newListing.save();
  // console.log(resultListing);
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  // await newAndUpdateListing(listing);

  let locationQuery = req.body.listing.location;
  let queryUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${locationQuery}&apiKey=${process.env.MAP_TOKEN}`;
  let resultUrl = await fetch(queryUrl);
  let coords = await resultUrl.json();
  listing.locationCoordinates = [
    coords.items[0].position.lat,
    coords.items[0].position.lng,
  ];

  await listing.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
