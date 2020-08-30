export interface Usage {
    cpuUsage: number | null;
    ramUsage: {
        percentage: number | null;
        used: string | null;
        total: string | null;
    };
}

export interface ServerStats {
    ip: string;
    port: number;
    debug: {
        ping: boolean;
        query: boolean;
        srv: boolean;
        querymismatch: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
        animatedmotd: boolean;
        cachetime: number;
        apiversion: number;
    };
    motd: {
        raw: string[];
        clean: string[];
        html: string[];
    };
    players: { online: number; max: number; list?: string[] };
    version: string;
    online: boolean;
    protocol?: number;
    hostname?: string;
    icon?: string;
    software?: string;
    map?: string;
    plugins?: { names: string[]; raw: string[] };
    mods?: { names: string[]; raw: string[] };
    info?: {
        raw: string[];
        clean: string[];
        html: string[];
    };
}

export interface DB {
    lastRequest: moment.MomentInput | null;
    latestData: ServerStats | null;
}
