import {withAuth} from "next-auth/middleware";

export {default} from 'next-auth/middleware'

export default withAuth(
    function middlewaree(req) {
    },
        {
            callback: {
                authorized : ({token}) => token?.role === "ADMIN",
            }
        }
)
export const config = {matcher: ["/dashboard"]};