import React from "react";

import AdminSidebarComp from "../Components/AdminSidebar";
import AdminHeaderComp from "../Components/AdminHeader";
import AdminFooterComp from "../Components/AdminFooter";

export default function Admin({ children, title, photo, subtitle }) {
    return (
        <div className="bg-gray-50">
            <AdminSidebarComp></AdminSidebarComp>
            <div className="ml-72 pt-4">
                <div className="container mx-auto mb-[1000px]">
                <AdminHeaderComp title={title} photo={photo} subtitle={subtitle}/>
                </div>
                <AdminFooterComp></AdminFooterComp>
            </div>
            {children}
        </div>
    )
}
