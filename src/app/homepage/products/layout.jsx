export const revalidate = 'force-cache'

export function Layout({children}) {
    return (
        <section className="layout">
            {children}
        </section>
    );
}

export default Layout;