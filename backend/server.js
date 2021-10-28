const express = require('express');
const app = express();

app.get('/scheduDB/:id', (req, res) => {
    res.send("Successful!")
});
app.get('/')

app.listen(3000, () => console.log("Schedu app is listening on port 3000"))