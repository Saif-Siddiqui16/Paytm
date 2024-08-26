import { Sidebar } from "@/components/Sidebar";
import "../globals.css";
import Logout from "@/components/Logout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-[100vw] bg-slate-300 min-h-screen">
      <div className="flex flex-col gap-2 mt-10 items-center w-[20vw]">
        <Sidebar title="Dashboard" href={"/dashboard"} />
        <Sidebar title="Transactions" href={"/transactions"} />
        <Sidebar title="Transfer" href={"/transfer"} />
        <Sidebar title="P2P Transfer" href={"/p2p"} />
        <Logout/>
      </div>
      <div className="flex border"></div>
      <div className="flex w-[80vw]">{children}</div>
    </div>
  );
}
