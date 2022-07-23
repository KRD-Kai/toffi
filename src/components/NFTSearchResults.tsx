import NFTCard from "./NFTCard";

export default function NFTSearchResults({ res }: any) {
    if (res.error) {
        return <> {res.error.message}</>;
    }
    return (
        <>
            {res.search_results.map((nftData: any, index: number) => (
                <NFTCard key={index} NFTData={nftData} />
            ))}
        </>
    );
}
