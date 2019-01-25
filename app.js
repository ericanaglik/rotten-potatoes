const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" },
    { title: "Erica is awesome!", movieTitle: "Erica's World" }
]

// INDEX
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
