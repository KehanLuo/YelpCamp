var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60",
        description: "Bacon ipsum dolor amet andouille chicken pork belly, swine spare ribs turkey strip steak ham tail brisket alcatra pastrami pig drumstick prosciutto. Meatball tenderloin kielbasa, brisket pork chop sausage pork rump andouille filet mignon strip steak swine. Cow boudin filet mignon leberkas buffalo tenderloin pork belly bacon turkey. Pork loin salami ground round cupim, meatball cow sausage jowl boudin. Boudin swine jowl, pork belly shank beef venison buffalo cow meatball alcatra. Leberkas turducken tri-tip, tongue alcatra fatback strip steak prosciutto."
    },
    {
        name: "Milkyway Camp",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60",
        description: "Bacon ipsum dolor amet andouille chicken pork belly, swine spare ribs turkey strip steak ham tail brisket alcatra pastrami pig drumstick prosciutto. Meatball tenderloin kielbasa, brisket pork chop sausage pork rump andouille filet mignon strip steak swine. Cow boudin filet mignon leberkas buffalo tenderloin pork belly bacon turkey. Pork loin salami ground round cupim, meatball cow sausage jowl boudin. Boudin swine jowl, pork belly shank beef venison buffalo cow meatball alcatra. Leberkas turducken tri-tip, tongue alcatra fatback strip steak prosciutto."
    },
    {
        name: "Lake Laky",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60",
        description: "Bacon ipsum dolor amet andouille chicken pork belly, swine spare ribs turkey strip steak ham tail brisket alcatra pastrami pig drumstick prosciutto. Meatball tenderloin kielbasa, brisket pork chop sausage pork rump andouille filet mignon strip steak swine. Cow boudin filet mignon leberkas buffalo tenderloin pork belly bacon turkey. Pork loin salami ground round cupim, meatball cow sausage jowl boudin. Boudin swine jowl, pork belly shank beef venison buffalo cow meatball alcatra. Leberkas turducken tri-tip, tongue alcatra fatback strip steak prosciutto."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounddatas
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            }); 
        });
    });
}

module.exports = seedDB;