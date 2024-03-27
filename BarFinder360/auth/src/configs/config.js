
'use strict';

// require("dotenv").config();

import 'dotenv/config'


 const config = {
    jwtSecret: process.env.JW_SECRET || 'secret',
    port: process.env.PORT  || 5002,
    usersUrl: process.env.USERS_URL || 'http://localhost:5000',
   
 };

 export default config;