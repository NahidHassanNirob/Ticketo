import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    
       <div>
         <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
       
       </div>
     
  );
}
