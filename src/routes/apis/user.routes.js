const db = require('../../database/models');
const { verifyJWT } = require('../../lib/formats.js');

/* Imports */
const express = require("express");
const router = express.Router();

router
    .get("/api/user/detail", verifyJWT, )

module.exports=router;