const express = require('express');

const User = require('../models/User');

module.exports = {
    async auth(req, res) {
        const { email, password } = req.body;

    }
}