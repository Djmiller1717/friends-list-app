const express = require('express')
const morgan = require('morgan')
const path = require('path')
const {db} = require('./db')
const {Friend} = require('./db')
const {syncAndSeed} = require('./db')
const {createFriend} = require('./db')

const bodyParser = require('body-parser')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extedned: false}))
app.use(require('body-parser').json())

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// syncAndSeed()

app.get('/api/friends', async(req, res, next) => {
    try {
        let friends = await Friend.findAll()
        res.send(friends)
    } catch(err) {
        next(err)
    }
})

app.put('/api/friends/:id', async(req, res, next) => {
    try {
        const friend = await Friend.findByPk(req.params.id)
        const updatedFriend = await friend.update(req.body, {returning: true})
        // const updatedFriend = await friend.increment(req.body, {returning: true})
        //console.log(updatedFriend)
        console.log(friend)
        console.log(req.body)
        res.send(updatedFriend)
    } catch(err){
        next(err)
    }
})

// app.use((req, res, next) => {
//     let err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

// app.use((err, req, res, next) => {
//     console.error(err, req, res, next)
//     res.status(err.status || 500)
//     res.send('Something went wrong: ' + err.message)
// })

const PORT = 3000

const init = async function(){
    await syncAndSeed()
    app.listen(PORT, function(){
        console.log(`Server is listening on port ${PORT}!`)
    })
}

init()