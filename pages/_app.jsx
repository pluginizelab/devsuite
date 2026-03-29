import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RecordVideoFeedback } from "@/components/RecordVideoFeedback";
import { useRouter } from "next/router";
import UtilitiesSidebar from "@/components/UtilitiesSidebar";
export default function App({ Component, pageProps }) {
    const router = useRouter();
    const query = router.asPath.includes("?") ? router.asPath.split("?")[1] : "";
    const params = new URLSearchParams(query);
    const showButton = Boolean(params.get("report-a-bug"));
    const isUtilitiesRoute = router.pathname === "/" || router.pathname.startsWith("/utilities");
    return (<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {isUtilitiesRoute ? (<UtilitiesSidebar>
          <Component {...pageProps}/>
        </UtilitiesSidebar>) : (<Component {...pageProps}/>)}
      {showButton && <RecordVideoFeedback />}
    </ThemeProvider>);
}
