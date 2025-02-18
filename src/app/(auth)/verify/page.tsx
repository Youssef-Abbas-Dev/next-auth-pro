
interface VerifyPageProps {
    searchParams: Promise<{ token: string }>
}

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
    const currentSearchParams = await searchParams;

    console.log(currentSearchParams);

    return (
        <div className="text-3xl">
            Your email has been verified
        </div>
    )
}

export default VerifyPage