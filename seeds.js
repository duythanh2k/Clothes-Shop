var mongoose    = require("mongoose"),
    Cloth       = require("./models/cloth"),
    Comment     = require("./models/comment")


var data = [
    {
        name: "Nike Court Cargo Joggers",
        image: "https://images.asos-media.com/products/nike-court-cargo-joggers-in-white/22561662-1-white?$n_480w$&wid=476&fit=constrain",
        price: 144.99,
        brand: "Nike",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        size: 188
    },
    {
        name: "Low Lace Dress US",
        image: "https://images.jdmagicbox.com/quickquotes/images_main/b07n7vbjgp-sttech1-women-clothes-women-s-double-v-neck-strapless-slim-cocktail-high-low-lace-dress-us-size-xs-tag-s-pink-165890576-el6z6.jpg",
        price: 322.99,
        brand: "Maxi",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        size: 212
    },
    {
        name: "Goose Bumb Crop Top",
        image: "https://i.pinimg.com/originals/7b/19/97/7b199733a7cc2408eac52e955129763b.jpg",
        price: 120.99,
        brand: "Goose Bumb",
        description: "After Service: Customer's 100% satisfaction,If you have any questions or problems,please feel free to contact us via amazon email,we will try our best to help you.",
        size: 143
    }
];

function seedDB() {
    Cloth.deleteMany({}, function(err){
        // if (err) {
        //     console.log(err);
        // }
        // console.log("clothes were removed!");

        // //Create a few clothes
        // data.forEach(function(seed){
        //     Cloth.create(seed, function(err, cloth){
        //         if (err) {
        //             console.log(err);
        //         }
        //         else {
        //             console.log("added a new cloth");
        //             //create a comment
        //             // Comment.create(
        //             //     {
        //             //         text: "I think this is greate but the price is a bit expensive.",
        //             //         author: "Customer"
        //             //     }, function(err, newComment){
        //             //         if (err) {
        //             //             console.log(err);
        //             //         }
        //             //         else {
        //             //             cloth.comments.push(newComment);
        //             //             cloth.save();
        //             //             console.log("added new comment");
        //             //         }
        //             //     });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;