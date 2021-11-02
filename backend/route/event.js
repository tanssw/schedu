const express = require('express');
const eventMongoDB = require('../config/eventMongoDB')
const router = express();

router.get('/all', async(req, res) =>{
    const test = await eventMongoDB.find({})
    res.json(test)
})


module.exports = router