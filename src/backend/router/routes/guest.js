const express = require('express')

module.exports = function guest(req, res) {
    res.send("Guest Page")
}