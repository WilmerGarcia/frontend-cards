"use client";
import ProtectedView from "../components/ProtectedView/protectedview";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CardList from "../components/cards/CardList";

export default function HomePage() {

  return (
    <ProtectedView>
      <div className="flex flex-col min-h-screen bg-white text-black">
        <Navbar />
        <main className="flex-1 px-4 py-10">
          <CardList/>
        </main>
        <Footer />
      </div>
    </ProtectedView>
  );
}
