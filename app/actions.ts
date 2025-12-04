"use server";

// @ts-ignore
const cronParser = require("cron-parser");

export async function getNextRuns(cronString: string): Promise<string[]> {
    try {
        const interval = cronParser.parseExpression(cronString);
        const runs = [];
        for (let i = 0; i < 5; i++) {
            runs.push(interval.next().toString());
        }
        return runs;
    } catch (err) {
        return [];
    }
}
