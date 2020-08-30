import { cpuUsage, freememPercentage } from "os-utils";
import prettyBytes from "pretty-bytes";
import { totalmem, freemem } from "os";

export const getCpuUsage = (): Promise<number | null> =>
    new Promise(async resolve => {
        try {
            cpuUsage(usage => resolve(Number((usage * 100).toFixed(2))));
        } catch (err) {
            console.error(err);
            resolve(null);
        }
    });

export const getRamUsage = (): {
    percentage: number;
    total: string;
    used: string;
} => {
    const percentage = Number(((1 - freememPercentage()) * 100).toFixed(2));
    const total = prettyBytes(totalmem());
    const used = prettyBytes(totalmem() - freemem());
    return { percentage, total, used };
};
