
'use strict';

// require("dotenv").config();

import 'dotenv/config'


 const config = {
    jwtSecret: process.env.JW_SECRET,
    port: process.env.PORT  || 5001,
   
 };

 export default config;