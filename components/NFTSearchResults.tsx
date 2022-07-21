export default function NFTSearchResults({ res }: any) {
    if (res.error) {
        return <> {res.error.message}</>;
    }
    return <> {JSON.stringify(res)}</>;
}
