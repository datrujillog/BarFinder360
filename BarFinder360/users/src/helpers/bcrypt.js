
import bcrypt from "bcrypt";


async function encryptPassword(string) {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(string, salt);

        return hash;
    } catch (error) {
        console.log(error);
    }
}

async function comparePassword(string, hash) {
    try {
        const match = await bcrypt.compare(string, hash);
        if (!match) {
            throw new Error("Invalid password");
          }
          return match;
    } catch (error) {
        console.log(error);
    }
}


export { encryptPassword, comparePassword };
