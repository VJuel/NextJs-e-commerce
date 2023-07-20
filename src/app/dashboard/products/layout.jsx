export const revalidate = 10

export function Layout({children}) {
    return (
        <section className="layout">
            {children}
        </section>
    );
}

export default Layout;