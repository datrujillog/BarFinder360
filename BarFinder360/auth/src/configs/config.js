
'use strict';

// require("dotenv").config();

import 'dotenv/config'


 const config = {
    jwtSecret: process.env.JW_SECRET || 'secret',
    port: process.env.PORT  || 5002,
    usersUrl: process.env.USERS_URL || 'http://localhost:5000',
    urlByEmail: process.env.URL_BY_EMAIL || 'http://localhost:5001/api/users/ByEmail',
    urlSignup: process.env.URL_SIGNUP || 'http://localhost:5001/api/users/business/create',
   
 };

 export default config;