const express = require('express')
const router = express.Router()

const route01 = require('./01_buyClaimRouter');
const route02 = require('./02_ownerUtilRouter');
const route03 = require('./03_saleRouter');


router.use('/01', route01);

router.use('/02', route02);

router.use('/03', route03);

module.exports = router;