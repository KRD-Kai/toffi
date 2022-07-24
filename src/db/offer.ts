import { OrderComponents } from "@opensea/seaport-js/lib/types";

export interface Offer {
    parameters: OrderComponents;
    signature: string;
    type: "bid" | "list";
    market: "seaport";
    networkId: number;
}

export interface KeyedOffers {
    key: string;
    offers: [Offer];
}
