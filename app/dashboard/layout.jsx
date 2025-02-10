"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";

function DashboardLayout({ children }) {
    const [videoData, setVideoData] = useState([]);
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Track loading state
    const router = useRouter();
    const { isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn === false) {
            setLoading(true); // Show loading indicator when signing out
            setTimeout(() => {
                router.push("/sign-in");
            }, 1000); // Add a delay for the loading effect
        }
    }, [isSignedIn, router]);

    const toggleSideNav = () => {
        setIsSideNavVisible(!isSideNavVisible);
    };

    return (
        <VideoDataContext.Provider value={{ videoData, setVideoData }}>
            <div>
                {loading ? (
                    // Show loading spinner while redirecting
                    <div className="flex justify-center items-center h-screen">
                        <img
                            src="/loading.gif"
                            alt="Loading..."
                            className="h-16 animate-pulse"
                        />
                    </div>
                ) : (
                    <>
                        <div className="hidden lg:block h-screen bg-white fixed mt-[140px] w-64">
                            <SideNav />
                        </div>
                        {isSideNavVisible && (
                            <>
                                <div
                                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                                    onClick={() => setIsSideNavVisible(false)}
                                ></div>
                                <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                                    <SideNav />
                                </div>
                            </>
                        )}
                        <Header toggleSideNav={toggleSideNav} isSideNavVisible={isSideNavVisible} />
                        {/* Main Content */}
                        <div
                            className={`p-10 transition-all ${
                                isSideNavVisible ? "opacity-50" : ""
                            } ${!isSideNavVisible && "ml-0 lg:ml-64"}`}
                        >
                            {children}
                        </div>
                    </>
                )}
            </div>
        </VideoDataContext.Provider>
    );
}

export default DashboardLayout;
