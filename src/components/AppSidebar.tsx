"use client";

import React, { useState } from "react";
import {
  Home,
  
  BookOpen,
  
  FileText,
  
  BarChart,
  Users,
  Book,
  Bell,
  Settings,
  
  ChevronDown,
  ChevronRight,
  Notebook,
  Car,
  Medal,
  Warehouse,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
const items = [
 
  {
    title: "Home",
    icon: Home,
     link: "/",
  },

    {
    title: "Departments",
    icon: Notebook,
    link: "/Department",
  },
    {
    title: "Staff",
    icon: Users,
    subItems: [
      { label: "Staff Directory", link: "/staff" },
     
    ],
  },


  {
    title: "Courses",
    icon: BookOpen,
    subItems: [
      { label: "Course List", link: "/courses" },
      
      
    ],
  },

  {
    title: "Exams",
    icon: FileText,
    subItems: [
      
      { label: "Exam", link: "/exams/give" },
    ],
  },

  {
    title: "Results",
    icon: BarChart,
    link: "/results",
  },

  {
    title: "Library",
    icon: Book,
    link: "/library",
  },
    {
    title: "Holiday",
    icon:Car ,
    link: "/holiday",
  },
  {
    title: "All notice",
    icon: Bell,
    link: "/notifications",
  },
      {
    title: "Event",
    icon:Medal ,
    link: "/events",
  },
    {
    title: "Hostell",
    icon: Warehouse,
    link: "/#",
  },
  {
    title: "Dashboard",
    icon: Settings,
        subItems: [
      { label: "Admin", link: "/Dashbord" },
      { label: "staff", link: "/Staff_Dashbord" },
      { label: "Student", link: "/students" },
      
      
    ],
  }
];

const AppSidebar = () => {



  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Sidebar className=" w-full max-w-xs sm:w-[8.5rem] md:w-[15rem] lg:w-[16rem] xl:w-[17rem] 2xl:w-[18rem] mr-[.5rem]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={19} height={19} />
                <span >ABC College</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="w-[3rem]" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <React.Fragment key={item.title}>
                  <SidebarMenuItem>
                    {item.subItems ? (
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                        {openMenus[item.title] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link href={item.link} className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>

                  {item.subItems &&
                    openMenus[item.title] &&
                    item.subItems.map((sub, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={sub.link}
                            className="pl-8 text-sm text-gray-400 block"
                          >
                            • {sub.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* You can add SidebarFooter or user menu here */}
      <SidebarFooter>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarTrigger/>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </SidebarFooter>

    </Sidebar>
  );
};

export default AppSidebar;
