import Header from "@/components/home/Header";
import Shortcuts from "@/components/ui/Shortcuts";
import Body from "@/components/home/Body";
import Info from "@/components/home/Info";
import Newsletter from "@/components/Newsletter";
import { LastArticles } from "@/components/home/LastArticles";

export default function Home() {
  return (
    <>
      <div className="relative w-full min-h-screen">
        <Header />
        <div className="relative top-0 left-0 w-full h-50 md:h-0 bg-(--primary-bg) z-10 flex items-center justify-center">
          <Shortcuts />
        </div>
        <div className="flex flex-col gap-18 pt-60 bg-(--primary-bg) z-10">
          <Info />
          <Body />
          <div className="w-full flex justify-center items-center mt-10">
            <LastArticles />
          </div>
          <Newsletter />
        </div>
      </div>
    </>
  );
}
