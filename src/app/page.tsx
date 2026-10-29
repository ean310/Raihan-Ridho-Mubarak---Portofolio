import { LeftSidebar } from "@/components/LeftSidebar";
import { CenterColumn } from "@/components/CenterColumn";
import { RightSidebar } from "@/components/RightSidebar";

export default function HomePage() {
  return (
    <main className="min-h-screen lg:grid lg:h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] lg:overflow-hidden">
      <LeftSidebar />
      <CenterColumn />
      <RightSidebar />
    </main>
  );
}
