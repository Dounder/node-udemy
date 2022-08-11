require('dotenv').config()
const express = require('express')
const hbs = require('hbs')

const app = express()

// Handlebars view engine
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

// Static files
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('home', {
		name: 'John Doe',
		title: 'Node Express HBS',
	})
})

app.get('/generic', (req, res) => {
	res.render('generic', {
		name: 'John Doe',
		title: 'Node Express HBS',
	})
})

app.get('/elements', (req, res) => {
	res.render('elements', {
		name: 'John Doe',
		title: 'Node Express HBS',
	})
})

app.get('*', (req, res) => {
	res.render('not-found')
})

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
