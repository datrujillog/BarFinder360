import { PrismaClient } from "@prisma/client";

let client;

function connect() {
  if (client) {
    return client;
  }
    client = new PrismaClient();    
    return client;
}


export default connect;