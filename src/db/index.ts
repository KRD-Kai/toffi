// @ts-nocheck
import EventEmitter from "events";
import { Offer, KeyedOffers } from "./offer";

class Database extends EventEmitter {
    ipfs: any;
    orbitdb: any;
    offerStore: any;
    OffersKey: string;
    Offers: [Offer];

    async init() {
        // Create IPFS instance
        this.ipfs = window["ipfs"];
        if (!this.ipfs) {
            const Ipfs = window["Ipfs"];
            console.log(Ipfs);
            if (!Ipfs) return;
            this.ipfs = await Ipfs.create({
                preload: { enabled: false },
                EXPERIMENTAL: { pubsub: true },
                config: {
                    Addresses: {
                        Swarm: [
                            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
                        ],
                    },
                },
            });
            window["ipfs"] = this.ipfs;
        }

        // Create OrbitDB instance
        const OrbitDB = window["OrbitDB"];
        this.orbitdb = await OrbitDB.createInstance(this.ipfs);
        // Create/open a key-value store called 'Offer' and load its data
        this.offerStore = await this.orbitdb.keyvalue("offers", {
            accessController: {
                write: ["*"],
            },
        });
        await this.offerStore.load();
        this.emit("ready");
        // Update the value following replication
        this.offerStore.events.on("replicated", (e) => {
            this.Offers = this.offerStore.get(this.OffersKey);
            console.log(this.Offers);
            console.log("test", e);
        });
    }

    getKeyedOffers(): KeyedOffer[] {
        return Object.entries(this.offerStore.all).map((e) => ({
            key: e[0],
            Offers: e[1] as KeyedOffers,
        }));
    }

    getOffers(key: string): Offer {
        this.OffersKey = key;
        this.Offers = this.offerStore.get(this.OffersKey);
        return this.Offers;
    }

    setOffer(key: string, Offer: Partial<Offer>) {
        const offers = this.getOffers(key);
        this.Offers = [...offers, Offer];
        this.offerStore.put(key, this.Offers);
    }
}

export const db = new Database();
