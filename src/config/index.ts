import { join } from "path";

// Import environment variables
import dotenv from "dotenv";
import { existsSync } from "fs";
dotenv.config({ path: join(process.cwd() + "/env" + "/.env") });

const distOrSrc: "dist" | "src" =
    process.env.NODE_ENV === "production"
        ? "dist"
        : process.env.NODE_ENV === "development"
        ? "src"
        : existsSync(join(process.cwd(), "dist", "db", "data.json"))
        ? "dist"
        : "src";

export default {
    API_URL: "https://api.mcsrvstat.us/2/michelinodibologna.bitrey.it",
    LAST_REQUEST_PATH: join(process.cwd(), distOrSrc, "db", "data.json"),
    MINUTES_BETWEEN_API_CALLS: 5
};
