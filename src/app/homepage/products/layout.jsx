export const revalidate = 'force-cache'

export function Layout({children}) {
    return (
        <section className="layout bg-gray-100 min-h-[90vh]">
            {children}
        </section>
    );
}

export default Layout;