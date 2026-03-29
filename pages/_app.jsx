import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RecordVideoFeedback } from "@/components/RecordVideoFeedback";
import { useSearchParams } from "next/navigation";
export default function App({ Component, pageProps }) {
    const params = useSearchParams();
    const showButton = Boolean(params?.get("report-a-bug"));
    return (<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Component {...pageProps}/>
      {showButton && <RecordVideoFeedback />}
    </ThemeProvider>);
}
