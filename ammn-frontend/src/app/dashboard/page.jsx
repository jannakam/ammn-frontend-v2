"use client";

import { Dock } from "@/components/Dock";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Wallet } from "@/components/Wallet";
import { Friends } from "@/components/Friends";
import { Salifny } from "@/components/Salifny";
import { Gatiya } from "@/components/Gatiya";
import { Logo } from "@/components/Logo";
import { Logout } from "@/components/Logout";
import { Toaster } from "@/components/ui/toaster";
import { DashboardButton } from "@/components/DashboardButton";

export default function Dashboard() {
  return (
    <main className="relative w-full overflow-auto z-10">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-1 animate-gradient-bg"
        aria-hidden="true"
      ></div>

      <DashboardButton />
      <Logout />

      {/* GRID STARTS */}
      <div className="grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-md:h-auto max-md:max-h-none max-md:grid-rows-none max-md:gap-y-10 max-md:py-6">
        <div className="col-span-full row-span-1">
          <div className="box border size-full overflow-hidden">
            <div className="flex size-full items-start justify-center gap-3 max-md:flex-col md:items-center">
              <ThemeSwitcher />
              <Logo />
            </div>
          </div>
        </div>

        {/* WALLET CELL */}
        
        <div className="col-span-6 row-span-8 grid grid-cols-subgrid grid-rows-subgrid max-md:col-span-full max-md:grid-rows-none max-md:gap-4">
          <div className="col-span-6 row-span-8 max-md:col-span-full">
            <div className="box border size-full overflow-hidden rounded-none">
              <div className="relative flex size-full flex-col justify-center gap-2 overflow-hidden">
                <Wallet/>
              </div>
            </div>
          </div>
        </div>

        {/* GATIYA CELL */}
        <div className="col-span-6 row-span-8 grid grid-cols-subgrid grid-rows-subgrid max-md:col-span-full max-md:grid-rows-none max-md:gap-4">
          <div className="col-span-6 row-span-4 max-md:col-span-full">
            <div className="box border size-full overflow-hidden rounded-none">
              <div className="relative flex size-full flex-col justify-center gap-2 overflow-hidden">
                <Gatiya />
              </div>
            </div>
          </div>

          {/* FRIENDS CELL */}
          <div className="col-span-3 row-span-4 max-md:col-span-full">
            <div className="box border size-full overflow-hidden rounded-none">
              <div className="relative flex size-full flex-col justify-center gap-2 overflow-hidden">
                <Friends />
              </div>
            </div>
          </div>

          {/* SALIFNY CELL */}
          <div className="col-span-3 row-span-4 max-md:col-span-full">
            <div className="box border size-full overflow-hidden rounded-none">
              <div className="relative flex size-full flex-col justify-center gap-2 overflow-hidden">
                <Salifny />
              </div>
            </div>
          </div>
        </div>

        {/* EXTRA ROW FOR DOCK AND SPACE */}
        <div className="col-span-full row-span-1">
          <div className="box border size-full overflow-hidden">
            <div className="flex size-full items-start justify-between gap-3 max-md:flex-col md:items-center">
              <Dock />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
