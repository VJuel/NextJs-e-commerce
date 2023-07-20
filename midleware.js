import {withAuth} from "next-auth/middleware";

export {default} from 'next-auth/middleware'

export default withAuth(
    function middlewaree(req) {
        console.log(req.nexthauth.token)
    },
        {
            callback: {
                authorized : ({token}) => token?.role === "ADMIN",
            }
        }
)
export const config = {matcher: ["/dashboard"]};