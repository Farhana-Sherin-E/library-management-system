const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

router.post("/", async (req, res) => {
    try {
        const newBook = new Book(req.body);

        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;