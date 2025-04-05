const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


// Get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

module.exports = router;
