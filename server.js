'use strict'

require('dotenv').config()

const express = require('express')
const line = require('@line/bot-sdk')

const PORT = process.env .PORT || 3000

const config = {
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
}

const app = express()

app.post('/webhook', line.middleware(config), (req,res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
})

const client = new line.Client(config)

let handleEvent = (event) => {
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null)
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })
}

app.listen(PORT, () => {
    console.log('server at '+PORT)
})
