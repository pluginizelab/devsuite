import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ds/ButtonComponent";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
export default function Header() {
    const router = useRouter();
    const isUtilitiesRoute = router.pathname === "/" || router.pathname.startsWith("/utilities");
    const [hasSidebar, setHasSidebar] = useState(isUtilitiesRoute);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    useEffect(() => {
        setHasSidebar(isUtilitiesRoute);
        if (!isUtilitiesRoute) {
            setSidebarCollapsed(false);
        }
    }, [isUtilitiesRoute]);
    useEffect(() => {
        const handleSidebarState = (event) => {
            const detail = event?.detail ?? {};
            setHasSidebar(Boolean(detail.hasSidebar));
            setSidebarCollapsed(Boolean(detail.collapsed));
        };
        window.addEventListener("devsuite-sidebar-state", handleSidebarState);
        window.dispatchEvent(new Event("devsuite-sidebar-state-request"));
        return () => window.removeEventListener("devsuite-sidebar-state", handleSidebarState);
    }, []);
    const showHeaderLogo = !hasSidebar || sidebarCollapsed;
    return (<header className="flex justify-between px-6 py-4 items-center">
      <div className="flex items-center gap-4">
        <div className={`overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-out motion-reduce:transition-none ${showHeaderLogo ? "max-w-[140px] opacity-100 translate-x-0" : "max-w-0 opacity-0 -translate-x-2 pointer-events-none"}`}>
          <Link href="/" className="inline-flex">
            <Image src="/dev-suite-logo.png" alt="Dev Suite logo" width={140} height={53} className="h-9 w-auto" priority/>
          </Link>
        </div>
      </div>

      <div className="flex gap-3">
        <ThemeToggle />
        <Button className="min-h-10 flex px-2 sm:px-4 min-w-10 sm:min-w-auto" variant="outline" onClick={() => window.open("https://github.com/pluginizelab/dev-toolkits", "_blank")}>
          <span className="mr-2 hidden sm:inline">Contribute</span>
          <GitHubLogoIcon />
        </Button>
      </div>
    </header>);
}
