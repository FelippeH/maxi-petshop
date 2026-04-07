import Header from "@/components/home/Header";
import Shortcuts from "@/components/ui/Shortcuts";
import Body from "@/components/home/Body";
import Info from "@/components/home/Info";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Header />
        <div className="relative top-0 left-0 w-full h-50 md:h-0 bg-(--primary-bg) z-10 flex items-center justify-center">
          <Shortcuts />
        </div>
        <div className="flex flex-col gap-18 py-60 bg-(--primary-bg) z-10">
          <Info />
          <Body />
        </div>
      </div>
    </>
  );
}
