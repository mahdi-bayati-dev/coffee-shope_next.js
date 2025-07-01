import "./globals.css";
import AosInit from "@/utils/aos";
import ScrollToTop from "@/utils/SctollToTop";
export const metadata = {
  title: "صفحه اصلی - SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "Sabzlearn coffee project with next.js v13",

  icons: {
    icon: "../images/image_processing20200424-22029-1h6r14k.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      <body >
        <AosInit/>
        <ScrollToTop/>
        {children}
      </body>
    </html>
  );
}
