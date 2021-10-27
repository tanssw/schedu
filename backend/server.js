const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Successful!")
});

app.listen(3000, () => console.log("Schedu app is listen on port 3000"))