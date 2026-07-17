"use client";
import React from "react";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import {
  FaBuilding,
  FaCalendarAlt,
  FaHistory,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const OrganizerSidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };
  const { data: session } = useSession();
  const role = session?.user?.role;
  const user = session?.user;
  const organizerMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUsers,
      href: "/dashboard/organizer",
    },
    {
      key: "organization",
      label: "Organization",
      icon: FaBuilding,
      href: "/dashboard/organizer/organization",
    },
    {
      key: "add-event",
      label: "Add Event",
      icon: FaPlus,
      href: "/dashboard/organizer/add-event",
    },
    {
      key: "manage-events",
      label: "Manage Events",
      icon: FaCalendarAlt,
      href: "/dashboard/organizer/manage-events",
    },
    {
      key: "attendees",
      label: "Attendees",
      icon: FaUsers,
      href: "/dashboard/organizer/attendee",
    },
  ];
  const attendeeMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUserCircle,
      href: "/dashboard/attendee",
    },
    {
      key: "tickets",
      label: "My Tickets",
      icon: FaTicketAlt,
      href: "/dashboard/tickets",
    },
    {
      key: "payments",
      label: "Payments",
      icon: FaHistory,
      href: "/dashboard/payments",
    },
  ];
  const adminMenu = [
    {
      key: "users",
      label: "Users",
      icon: FaUserShield,
      href: "/dashboard/users",
    },
    {
      key: "events",
      label: "Approve Events",
      icon: FaCalendarAlt,
      href: "/dashboard/events",
    },
    {
      key: "transactions",
      label: "Transaction Logs",
      icon: FaHistory,
      href: "/dashboard/transactions",
    },
  ];
  return (
    <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
      {/* Brand / Logo */}
      <div className="px-6 py-4 border-b border-white/5">
        <Logo />
      </div>

      {/* User Profile */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
            <Image
              width={40}
              height={40}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent("Jane Doe")}&background=7c3aed&color=fff&bold=true`}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate leading-tight">
              {user?.name}
            </p>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "organizer" ? "text-indigo-400" : "text-pink-400"}`}
            >
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
          Navigation
        </p>

        {/* {organizerMenu.map(({ key, label, icon: Icon }) => {
          const targetPath = getPath(key);
          const isActive = pathname === targetPath || (role === "admin" && pathname === "/dashboard/admin" && key === "users");
          return (
            <Link
              key={key}
              href={targetPath}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer ${isActive
                ? "bg-gradient-to-r from-pink-500/20 to-indigo-600/20 text-white border border-pink-500/20 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-gradient-to-br from-pink-500 to-indigo-600 text-white shadow-md shadow-pink-500/20" : "bg-white/5 text-slate-400"}`}>
                <Icon size={14} />
              </span>
              <span>{label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />}
            </Link>
          );
        })} */}

        <div className="flex flex-col">
          {(role === "attendee"
            ? attendeeMenu
            : role === "organizer"
              ? organizerMenu
              : adminMenu
          ).map(({ href, key, label, icon: Icon }) => (
            <Link
              href={href}
              key={key}
              className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold cursor-pointer text-left hover:bg-[#27272A] transition-colors duration-200 ease-in-out"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon size={16} className="transition-colors duration-200" />
              </span>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Links */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaHome size={13} />
          </span>
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaSignOutAlt size={13} />
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default OrganizerSidebar;
