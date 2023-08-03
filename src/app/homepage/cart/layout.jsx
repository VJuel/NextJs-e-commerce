export default function Layout({children}) {
    return (
        <>
            <section className="flex flex-col justify-center items-start py-10 w-full max-w-4xl bg-white m-auto">
                {children}
            </section>
        </>
    )
}