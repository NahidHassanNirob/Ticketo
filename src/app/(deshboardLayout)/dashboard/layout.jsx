
import Logo from "@/components/Logo";
import OrganizerSidebar from "@/components/organizerDasboard/organizerSidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";


const dashboardLayout = ({ children }) => {
  
  return (
    <div className="flex min-h-screen ">
      <aside className="w-64 border-r bg-[#18181B] ">
        
        <OrganizerSidebar></OrganizerSidebar>
      </aside>

      <aside className="bg-[#060607">{children}</aside>
    </div>
  );
};

export default dashboardLayout;
