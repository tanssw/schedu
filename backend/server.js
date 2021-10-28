const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Successful!")
});



app.listen(3000, () => console.log("Schedu app is listening on port 3000"))