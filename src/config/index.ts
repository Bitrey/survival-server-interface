import { join } from "path";

// Import environment variables
import dotenv from "dotenv";
dotenv.config({ path: join(process.cwd() + "/env" + "/.env") });

export default {
    API_URL: "https://api.mcsrvstat.us/2/michelinodibologna.bitrey.it",
    LAST_REQUEST_PATH: join(process.cwd(), "db", "data.json"),
    MINUTES_BETWEEN_API_CALLS: 5
};
