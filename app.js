const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
});

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message);
    })
})

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});

// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Erica is awesome!", movieTitle: "Erica's World" }
// ]

// INDEX
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
            console.log(err);
        })
});

// NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// app.get('/', (req,res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
