import Link from "next/link";
import React from "react";

export default function NavBarAdminSkeleton({children}) {

    return (
        <div className="bg-primary w-full min-h-screen">
            <div className="md:hidden flex header items-center justify-center p-4">
                <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>

            </div>
            <div className="flex bg-Gray relative">
                <div
                    className={`text-gray-500 px-2 py-6 bg-Gray md:px-4 md:py-4 fixed animate-pulse md:left-auto md:h-screen md:relative md:block bg-gray-200 w-1/2 transition-all duration-600`}>
                    <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>
                    <div className="flex flex-col gap-2">
                        <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>


                        <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>


                        <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>


                        <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>


                        <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>


                        <div className={`h-5 bg-grey-400 animate-pulse w-full`}></div>

                    </div>
                </div>
                <div
                    className="w-full lg:w-1/2 lg:flex-grow-0 bg-Gray flex-grow p-4 rounded-l-xl rounded-r-xl bg-white mt-2 mr-2">
                    {children}
                </div>
            </div>
        </div>
    );


}



