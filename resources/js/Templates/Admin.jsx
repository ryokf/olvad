import React from "react";

import AdminSidebarComp from "../Components/AdminSidebar";
import AdminHeaderComp from "../Components/AdminHeader";
import AdminFooterComp from "../Components/AdminFooter";
import BannerComp from "../Components/Banner";

export default function Admin({ children, title, photo, subtitle, bannerMessage = false }) {
    return (
        <div className="bg-gray-50 ">
            <AdminSidebarComp></AdminSidebarComp>
            <div className="ml-72 pt-4 min-h-screen flex flex-col justify-between">
            {
                bannerMessage.message != null &&
                <BannerComp message={bannerMessage.message}></BannerComp>
            }
                <div className="container mx-auto mb-6 ">
                    <AdminHeaderComp title={title} photo={photo} subtitle={subtitle} />
                    <div className="space-x-4">
                        {children}
                    </div>
                </div>
                <AdminFooterComp></AdminFooterComp>
            </div>
        </div>
    )
}
