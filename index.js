const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000

app.use(express.json({limit: '1mb'}))

const dataFromDataBase = fs.readFileSync('./database.json');
const usersFromDataBase = JSON.parse(dataFromDataBase)
const users = usersFromDataBase

function checkDuplicateUser(newUser){
    if (users.length === 0) return true
    if (users.some(user => user.name === newUser.name && user.lastname === newUser.lastname)) return false
    return true
}

function addUserDataBase(newUser) {
    if (checkDuplicateUser(newUser)){
        users.push(newUser)
        fs.writeFileSync('./database.json', JSON.stringify(users))
        console.log(users)
    }
    else {
        console.log('duplicate item')
    }
}

//That code alow you to make request from localhost
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);
// end here

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})

app.post('/api', (request, response) => {
    const newUser = request.body
    addUserDataBase(newUser)

    response.end();
})