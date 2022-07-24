import { OrderParameters } from "@opensea/seaport-js/lib/types";

export interface Offer {
    parameters: OrderParameters;
    signature: string;
    type: "bid" | "list";
    market: "opensea";
    networkId: number;
}

export interface KeyedOffer {
    key: string;
    offer: Offer;
}
