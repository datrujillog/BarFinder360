import app from "../app.js"
import config from "../configs/config.js"


const startServer = async () => {
    app.listen(config.port, () => {
        console.log("")
        console.log(`Server is running on port ${config.port} `);
        console.log("")
        console.log(`http://localhost:${config.port}`);
    });
}

startServer();