import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(plainText: string) {
        const salt = randomBytes(8).toString("hex");
        const buf = (await scryptAsync(plainText, salt, 64)) as Buffer;

        return `${buf.toString("hex")}.${salt}`;
    }

    static async compare(dbHash: string, plainText: string) {
        const [hashedPassword, salt] = dbHash.split(".");
        const buf = (await scryptAsync(plainText, salt, 64)) as Buffer;

        return buf.toString("hex") === hashedPassword;
    }
}
