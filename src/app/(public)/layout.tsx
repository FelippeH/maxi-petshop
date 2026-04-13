import Footer from "@/components/Footer";
import NavBar from "@/components/navigation/NavBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="pt-22 md:pt-28">{children}</div>
      <Footer />
    </>
  );
}
