import { Router, Request, Response } from "express";
const router = Router();

import { getCpuUsage, getRamUsage } from "../functions";
import { Usage, ServerStats, DB } from "../interfaces";

router.get("/", (req: Request, res: Response) => {
    res.render("index");
});

import axios from "axios";
import config from "../config";

import moment from "moment";
moment.locale("it");

const savedData = require(config.LAST_REQUEST_PATH);
const db: DB = { lastRequest: null, latestData: null };
try {
    // Try to parse last request data
    db.lastRequest = moment((<any>savedData).lastRequest);
} catch (err) {
    // If it fails, set last request to null
    db.lastRequest = null;
}
db.latestData = (<any>savedData).latestData || null;

import { writeFileSync } from "fs";
import sanitizeHtml from "sanitize-html";

router.get("/get-usage", async (req: Request, res: Response) => {
    try {
        const usage: Usage = {
            cpuUsage: await getCpuUsage(),
            ramUsage: getRamUsage()
        };

        // Check if server already made a request within the last 10 minutes
        // If so, print saved version
        const minutesAgo = moment().subtract(
            config.MINUTES_BETWEEN_API_CALLS,
            "minutes"
        );

        if (
            // Unknown last request date
            !db.lastRequest ||
            // No latest data
            !db.latestData ||
            // Object is empty
            (typeof db.latestData === "object" &&
                !Object.keys(db.latestData).length) ||
            // Last request was made over set minutes ago
            minutesAgo.isSameOrAfter(db.lastRequest)
        ) {
            // DEBUG
            // console.log("Nuova richiesta inviata");

            // Immediately set last request as current date
            db.lastRequest = moment();

            const { data }: { data: ServerStats } = await axios.get(
                config.API_URL
            );
            // Sanitize HTML
            data.motd.html.map(e => sanitizeHtml(e));

            db.latestData = data;

            const stringified = JSON.stringify(db, null, 4);
            writeFileSync(config.LAST_REQUEST_PATH, stringified);
        }

        const fromNow = moment.isMoment(db.lastRequest)
            ? db.lastRequest.fromNow()
            : "mai";

        // Clone date since .add modifies the original variable too
        const tempLastRequest = moment.isMoment(db.lastRequest)
            ? db.lastRequest.clone()
            : null;
        const nextUpdate = moment.isMoment(tempLastRequest)
            ? tempLastRequest
                  .add(config.MINUTES_BETWEEN_API_CALLS, "minutes")
                  .fromNow()
            : "in una data sconosciuta";

        res.json({ ...usage, ...db.latestData, fromNow, nextUpdate });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Redirect to homepage
router.get("*", (req: Request, res: Response) => res.redirect("/"));

export default router;
