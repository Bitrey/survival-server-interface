// Usage
const cpuUsageElem = document.getElementById("cpu-usage");
const ramUsageElem = document.getElementById("ram-usage");

// Time passed since last update
const fromNowElem = document.getElementById("from-now");

// Server
const addressElem = document.getElementById("address");
const playersElem = document.getElementById("players");
const motdElem = document.getElementById("motd");
const versionElem = document.getElementById("version");

const elements = [
    addressElem,
    cpuUsageElem,
    ramUsageElem,
    playersElem,
    motdElem,
    versionElem
];

let isUsageShown = false;

const updateData = async () => {
    try {
        const { data } = await axios.get("/get-usage");

        const {
            cpuUsage,
            ramUsage,
            hostname,
            players,
            motd,
            version,
            fromNow,
            nextUpdate
        } = data;

        const ramUsageDiff = `(${ramUsage.used}/${ramUsage.total})`;

        // Usage
        cpuUsageElem.textContent = cpuUsage + "%";
        ramUsageElem.textContent = ramUsage.percentage + "%\n" + ramUsageDiff;

        // Time since last update
        fromNowElem.innerHTML =
            `I dati del server sono stati aggiornati <strong>${fromNow}</strong>` +
            ` (prossimo aggiornamento <strong>${nextUpdate}</strong>)`;

        // Server
        addressElem.textContent = hostname;
        playersElem.textContent = `${players.online}/${players.max}`;
        motdElem.textContent = motd.html;
        versionElem.textContent = version;

        if (players.list) {
            playersElem.innerHTML +=
                "\n<small><strong>" +
                players.list.join(", ") +
                "</strong></small>";
        }

        isUsageShown = true;
    } catch (err) {
        console.log(err);
        if (!isUsageShown) {
            for (const element of elements) {
                element.textContent = "Errore nel caricamento";
            }
        }
    }
};

updateData();

// Update data every second
setInterval(updateData, 1000);
