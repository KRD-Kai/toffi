// @ts-nocheck
import { Offer, KeyedOffer } from "./offer";

class Database {
    ipfs: any;
    orbitdb: any;
    offerStore: any;
    OfferKey: string;
    Offer: Offer;
    readonly: boolean;

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
        this.offerStore = await this.orbitdb.keyvalue("Offer", {
            accessController: {
                write: ["*"],
            },
        });
        await this.offerStore.load();

        // Update the value following replication
        this.offerStore.events.on(
            "replicated",
            () => (this.Offer = this.offerStore.get(this.OfferKey))
        );
        console.log(this);
    }

    getKeyedOfferes(): KeyedOffer[] {
        return Object.entries(this.offerStore.all).map((e) => ({
            key: e[0],
            Offer: e[1] as Offer,
        }));
    }

    getOffer(key: string): Offer {
        this.OfferKey = key;
        this.Offer = this.offerStore.get(this.OfferKey);
        return this.Offer;
    }

    setOffer(Offer: Partial<Offer>) {
        this.Offer = { ...this.Offer, ...Offer };
        this.offerStore.put("key", this.Offer);
    }
}

export const db = new Database();
