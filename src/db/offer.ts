import { OrderParameters } from "@opensea/seaport-js/lib/types";

export interface Offer {
    parameters: OrderParameters;
    signature: string;
    type: "bid" | "list";
    market: "seaport";
    networkId: number;
}

export interface KeyedOffers {
    key: string;
    offers: [Offer];
}
