const mockAPIResponse = require('./mockAPI.js')
// TODO: Configure the environment variables
require('dotenv').config()

const fetch = require('node-fetch')

const PORT = 8081
const express = require('express')
// TODO: Create an instance for the server
const app = express()
// TODO: Configure cors to avoid cors-origin issue
var cors = require('cors')
app.use(cors())
// TODO: Configure express to use body-parser as middle-ware.

app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies

app.use(express.json())
// TODO: Configure express static directory.
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// a route that handling post request for new URL that coming from the frontend
/* TODO:
    1. GET the url from the request body
    2. Build the URL it should be something like `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${req.body.url}&lang=en`
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const sample = {
       text: '',
       score_tag : '',
       agreement : '',
       subjectivity : '',
       confidence : '',
       irony : ''
     }
*/

app.post('/all', async (req, res) => {
    const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
    const { url } = req.body
    // console.log(url)
    const apiResponse = await fetch(`${BASE_API_URL}?key=${process.env.API_KEY}&url=${url}&lang=en`)
    try {
        const responseData = await apiResponse.json()
        // console.log(responseData)
        const data = {
            text: responseData.sentence_list[0].text,
            score_tag: responseData.score_tag,
            agreement: responseData.agreement,
            subjectivity: responseData.subjectivity,
            confidence: responseData.confidence,
            irony: responseData.irony
        }
        console.log(data)
        res.send(data)
        console.log('data sent')
    } catch (error) {
        console.log('error getting data from meaning API', error)
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing
module.exports = app
