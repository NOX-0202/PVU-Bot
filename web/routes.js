const express = require('express')
const routes = express.Router()

routes.get('/get-link/:link', (req, res) => {  
    return res.json({ ok: `${req.params.link}` });
});

module.exports = routes; 