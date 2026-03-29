import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Binary,
  Braces,
  Boxes,
  Clock3,
  CodeXml,
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileJson,
  FileSearch,
  FileSpreadsheet,
  Globe,
  Hash,
  Home,
  Hammer,
  ImageIcon,
  ImagePlus,
  KeyRound,
  Link2,
  ListChecks,
  Menu,
  Palette,
  Regex,
  Ruler,
  ScanSearch,
  Search,
  Shuffle,
  SquareFunction,
  Star,
  TextAlignStart,
  Timer,
  Type,
  Upload,
  WandSparkles,
  Wifi,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ds/ButtonComponent";
import { tools } from "@/components/utils/tools-list";
import { CMDKTrigger } from "@/components/CMDK";

const sidebarGroups = [
  {
    title: "Development Tools",
    links: [
      "/utilities/har-file-viewer",
      "/utilities/regex-tester",
      "/utilities/jwt-parser",
      "/utilities/internet-speed-test",
      "/utilities/csv-file-viewer",
    ],
  },
  {
    title: "Generators",
    links: [
      "/utilities/uuid-generator",
      "/utilities/random-string-generator",
      "/utilities/hash-generator",
      "/utilities/lorem-ipsum-generator",
    ],
  },
  {
    title: "Converters",
    links: [
      "/utilities/csv-to-json",
      "/utilities/tsv-to-json",
      "/utilities/json-to-csv",
      "/utilities/json-to-tsv",
      "/utilities/yaml-to-json",
      "/utilities/json-to-yaml",
      "/utilities/xml-to-json",
      "/utilities/base-64-encoder",
      "/utilities/base64-to-image",
      "/utilities/image-to-base64",
      "/utilities/env-to-netlify-toml",
      "/utilities/curl-to-javascript-fetch",
      "/utilities/unserializer",
    ],
  },
  {
    title: "Time & Date",
    links: ["/utilities/timestamp-to-date"],
  },
  {
    title: "Media",
    links: [
      "/utilities/image-resizer",
      "/utilities/webp-converter",
      "/utilities/svg-viewer",
      "/utilities/wcag-color-contrast-checker",
    ],
  },
  {
    title: "Text Tools",
    links: [
      "/utilities/css-inliner-for-email",
      "/utilities/css-units-converter",
      "/utilities/url-encoder",
      "/utilities/query-params-to-json",
      "/utilities/sql-minifier",
    ],
  },
  {
    title: "Utilities",
    links: [
      "/utilities/json-formatter",
      "/utilities/jsonl-validator",
      "/utilities/number-base-changer",
      "/utilities/hex-to-rgb",
      "/utilities/cam",
    ],
  },
];

const sectionIcons = {
  "Development Tools": Hammer,
  "Generators": WandSparkles,
  "Converters": Boxes,
  "Time & Date": Clock3,
  "Media": ImageIcon,
  "Text Tools": Type,
  "Utilities": Wrench,
};

const toolIcons = {
  "/utilities/har-file-viewer": FileSearch,
  "/utilities/regex-tester": Regex,
  "/utilities/jwt-parser": KeyRound,
  "/utilities/internet-speed-test": Wifi,
  "/utilities/csv-file-viewer": FileSpreadsheet,
  "/utilities/uuid-generator": Shuffle,
  "/utilities/random-string-generator": WandSparkles,
  "/utilities/hash-generator": Hash,
  "/utilities/lorem-ipsum-generator": Type,
  "/utilities/csv-to-json": FileJson,
  "/utilities/tsv-to-json": FileJson,
  "/utilities/json-to-csv": FileSpreadsheet,
  "/utilities/json-to-tsv": FileSpreadsheet,
  "/utilities/yaml-to-json": Braces,
  "/utilities/json-to-yaml": Braces,
  "/utilities/xml-to-json": CodeXml,
  "/utilities/base-64-encoder": Binary,
  "/utilities/base64-to-image": ImageIcon,
  "/utilities/image-to-base64": ImagePlus,
  "/utilities/env-to-netlify-toml": FileCode2,
  "/utilities/curl-to-javascript-fetch": Globe,
  "/utilities/unserializer": ListChecks,
  "/utilities/timestamp-to-date": Clock3,
  "/utilities/image-resizer": ImageIcon,
  "/utilities/webp-converter": Upload,
  "/utilities/svg-viewer": ScanSearch,
  "/utilities/wcag-color-contrast-checker": Palette,
  "/utilities/css-inliner-for-email": Link2,
  "/utilities/css-units-converter": Ruler,
  "/utilities/url-encoder": Link2,
  "/utilities/query-params-to-json": Braces,
  "/utilities/sql-minifier": FileCode2,
  "/utilities/json-formatter": FileJson,
  "/utilities/jsonl-validator": FileJson,
  "/utilities/number-base-changer": SquareFunction,
  "/utilities/hex-to-rgb": Palette,
  "/utilities/cam": Timer,
};
const FAVORITES_STORAGE_KEY = "devsuite.favorite-tools";
const SIDEBAR_COLLAPSED_STORAGE_KEY = "devsuite.sidebar-collapsed";
function getGroupTitleForPath(pathname) {
  const group = sidebarGroups.find((item) => item.links.includes(pathname));
  return group ? group.title : null;
}

function SidebarContent({
  pathname,
  onNavigate,
  onOpenPalette,
  onToggleSidebar,
  collapsed = false,
}) {
  const toolMap = useMemo(() => {
    return new Map(tools.map((tool) => [tool.link, tool.title]));
  }, []);
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries([
      ...sidebarGroups.map((group) => [group.title, false]),
      ["Favorites", false],
    ])
  );
  const [favoriteLinks, setFavoriteLinks] = useState([]);

  useEffect(() => {
    const groupTitle = getGroupTitleForPath(pathname);
    if (!groupTitle) {
      return;
    }
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: true,
    }));
  }, [pathname]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setFavoriteLinks(parsed.filter((item) => typeof item === "string"));
      }
    } catch {
      setFavoriteLinks([]);
    }
  }, []);

  const toggleGroup = (groupTitle) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };
  const persistFavorites = (nextFavorites) => {
    setFavoriteLinks(nextFavorites);
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(nextFavorites)
      );
    } catch {
      // ignore storage write failures
    }
  };
  const toggleFavorite = (link) => {
    const isFav = favoriteLinks.includes(link);
    const next = isFav
      ? favoriteLinks.filter((item) => item !== link)
      : [...favoriteLinks, link];
    persistFavorites(next);
  };
  const favoriteItems = favoriteLinks.filter((link) => toolMap.has(link));
  const renderToolLink = (link, { compact = false } = {}) => {
    const active = pathname === link;
    const isFav = favoriteLinks.includes(link);
    const Icon = toolIcons[link] ?? Wrench;

    return (
      <Link
        key={link}
        href={link}
        onClick={onNavigate}
        className={`group relative block rounded-md ${compact ? "px-3" : "pl-[28px]"} pr-10 py-1.5 text-sm leading-5 ${
          active
            ? "bg-secondary text-foreground font-medium"
            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0" />
          <span>{toolMap.get(link)}</span>
        </span>
        <button
          type="button"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 transition ${
            isFav
              ? "opacity-100 text-amber-500"
              : "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
          }`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(link);
          }}
        >
          <Star
            className={`h-3.5 w-3.5 ${isFav ? "fill-amber-400" : ""}`}
          />
        </button>
      </Link>
    );
  };

  return (
    <>
      <div className={`${collapsed ? "px-2 py-3" : "px-4 py-4"} border-b border-border`}>
        {collapsed ? (
          <Button
            variant="outline"
            size="icon"
            className="mx-auto flex h-9 w-9 min-h-9 min-w-9"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <TextAlignStart className="h-5 w-5" />
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="inline-flex items-center" onClick={onNavigate}>
              <Image
                src="/dev-suite-logo.png"
                alt="DevSuite logo"
                width={120}
                height={46}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 min-h-9 min-w-9"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <TextAlignStart className="h-5 w-5" />
            </Button>
          </div>
        )}

        {collapsed ? (
          <Button
            variant="outline"
            size="icon"
            className="mt-3 mx-auto flex h-9 w-9"
            onClick={onOpenPalette}
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" />
          </Button>
        ) : (
          <CMDKTrigger className="mt-3 max-w-none" onOpen={onOpenPalette}/>
        )}
      </div>

      <nav
        className={`flex-1 ${collapsed ? "overflow-visible px-2 py-2 space-y-1" : "overflow-y-auto px-3 py-3 space-y-1"}`}
      >
        {collapsed ? (<>
            <div className="relative group">
              <Link
                href="/"
                onClick={onNavigate}
                className={`flex h-10 w-10 items-center justify-center rounded-md ${
                  pathname === "/"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
                aria-label="Home"
              >
                <Home className="h-5 w-5"/>
              </Link>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition absolute left-full top-0 ml-2 z-[90] w-56 rounded-lg border border-border bg-popover p-2 shadow-lg before:absolute before:right-full before:top-0 before:h-full before:w-2 before:content-['']">
                <Link href="/" onClick={onNavigate} className="block rounded-md px-3 py-2 text-sm hover:bg-secondary/60">
                  Home
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                aria-label="Favorites"
              >
                <Star className="h-5 w-5"/>
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition absolute left-full top-0 ml-2 z-[90] w-72 rounded-lg border border-border bg-popover p-2 shadow-lg before:absolute before:right-full before:top-0 before:h-full before:w-2 before:content-['']">
                <div className="px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">My Favorites</div>
                {favoriteItems.length ? (favoriteItems.map((link) => renderToolLink(link, { compact: true }))) : (<div className="px-3 py-2 text-xs text-muted-foreground">No favorites yet</div>)}
              </div>
            </div>

            {sidebarGroups.map((group) => {
              const items = group.links.filter((link) => toolMap.has(link));
              if (!items.length) {
                return null;
              }
              const SectionIcon = sectionIcons[group.title] ?? Wrench;
              return (
                <div key={group.title} className="relative group">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    aria-label={group.title}
                  >
                    <SectionIcon className="h-5 w-5"/>
                  </button>
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition absolute left-full top-0 ml-2 z-[90] w-72 rounded-lg border border-border bg-popover p-2 shadow-lg before:absolute before:right-full before:top-0 before:h-full before:w-2 before:content-['']">
                    <div className="px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {group.title}
                    </div>
                    {items.map((link) => renderToolLink(link, { compact: true }))}
                  </div>
                </div>
              );
            })}
          </>) : (<>
        <section className="pb-2 mb-1 border-b border-border/60">
          <div className="px-1">
            <Link
              href="/"
              onClick={onNavigate}
              className={`block rounded-md pl-2.5 pr-3 py-2 text-sm ${
                pathname === "/"
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Home className="h-4 w-4 shrink-0" />
                Home
              </span>
            </Link>
          </div>

          <div className="mt-1 py-0.5">
            <button
              type="button"
              onClick={() => toggleGroup("Favorites")}
              className="w-full flex items-center justify-between px-3 py-1.5 text-left rounded-md hover:bg-secondary/40 transition-colors"
              aria-expanded={Boolean(openGroups["Favorites"])}
            >
              <h3 className="text-sm text-muted-foreground inline-flex items-center gap-2">
                <Star className="h-4 w-4 shrink-0" />
                My Favorites
              </h3>
              {openGroups["Favorites"] ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <div
              className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
              style={{
                gridTemplateRows: openGroups["Favorites"] ? "1fr" : "0fr",
                opacity: openGroups["Favorites"] ? 1 : 0.65,
              }}
            >
              <div className="overflow-hidden px-1 pt-0.5 space-y-0.5">
                {favoriteItems.length ? (
                  favoriteItems.map((link) => renderToolLink(link))
                ) : (
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    No favorites yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {sidebarGroups.map((group) => {
          const items = group.links.filter((link) => toolMap.has(link));
          if (!items.length) {
            return null;
          }
          const isOpen = openGroups[group.title];
          const SectionIcon = sectionIcons[group.title] ?? Wrench;

          return (
            <section key={group.title} className="py-0.5">
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-left rounded-md hover:bg-secondary/40 transition-colors"
                aria-expanded={isOpen}
              >
                <h3 className="text-[11px] uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1.5">
                  <SectionIcon className="h-3.5 w-3.5" />
                  {group.title}
                </h3>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0.65 }}
              >
                <div className="overflow-hidden px-1 pt-0.5 space-y-0.5">
                  {items.map((link) => renderToolLink(link))}
                </div>
              </div>
            </section>
          );
        })}
        </>)}
      </nav>
    </>
  );
}

export default function UtilitiesSidebar({ children }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [isSidebarPreferenceLoaded, setIsSidebarPreferenceLoaded] =
    useState(false);

  const openPalette = () => {
    setMobileOpen(false);
    window.dispatchEvent(new Event("devsuite-open-cmdk"));
  };
  const toggleDesktop = () => {
    setDesktopCollapsed((prev) => !prev);
  };

  const closeMobile = () => setMobileOpen(false);
  useEffect(() => {
    let isMounted = true;
    let timeoutId = 0;
    let shouldStartCollapsed = false;
    try {
      const stored = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      shouldStartCollapsed = stored === "true";
    } catch {
      // ignore localStorage read failures
    }

    const applyInitialSidebarState = () => {
      if (!isMounted) {
        return;
      }
      if (shouldStartCollapsed) {
        setDesktopCollapsed(true);
      }
      setIsSidebarPreferenceLoaded(true);
    };

    if (document.readyState === "complete") {
      // Use a tiny time-based delay after full load for smoother collapse animation.
      timeoutId = window.setTimeout(() => {
        applyInitialSidebarState();
      }, 120);
    } else {
      window.addEventListener("load", applyInitialSidebarState, { once: true });
    }

    return () => {
      isMounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("load", applyInitialSidebarState);
    };
  }, []);
  useEffect(() => {
    if (!isSidebarPreferenceLoaded) {
      return;
    }
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_STORAGE_KEY,
        String(desktopCollapsed)
      );
    } catch {
      // ignore localStorage write failures
    }
  }, [desktopCollapsed, isSidebarPreferenceLoaded]);
  const emitSidebarState = (collapsed) => {
    window.dispatchEvent(
      new CustomEvent("devsuite-sidebar-state", {
        detail: { hasSidebar: true, collapsed },
      })
    );
  };
  useEffect(() => {
    emitSidebarState(desktopCollapsed);
    return () => {
      window.dispatchEvent(
        new CustomEvent("devsuite-sidebar-state", {
          detail: { hasSidebar: false, collapsed: false },
        })
      );
    };
  }, [desktopCollapsed]);
  useEffect(() => {
    const handleSidebarStateRequest = () => {
      emitSidebarState(desktopCollapsed);
    };
    window.addEventListener(
      "devsuite-sidebar-state-request",
      handleSidebarStateRequest
    );
    return () => {
      window.removeEventListener(
        "devsuite-sidebar-state-request",
        handleSidebarStateRequest
      );
    };
  }, [desktopCollapsed]);

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`hidden md:flex h-screen border-r border-border bg-secondary/30 flex-col sticky top-0 transition-[width] duration-300 ${desktopCollapsed ? "w-[72px]" : "w-60"}`}>
        <SidebarContent
          pathname={router.pathname}
          onNavigate={closeMobile}
          onOpenPalette={openPalette}
          onToggleSidebar={toggleDesktop}
          collapsed={desktopCollapsed}
        />
      </aside>

      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-60 border-r border-border bg-background transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2 border-b border-border">
          <Button variant="ghost" size="icon" onClick={closeMobile} aria-label="Close sidebar">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <SidebarContent
          pathname={router.pathname}
          onNavigate={closeMobile}
          onOpenPalette={openPalette}
          onToggleSidebar={closeMobile}
          collapsed={false}
        />
      </aside>

      {mobileOpen && (
        <button
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={closeMobile}
          aria-label="Close sidebar overlay"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between border-b border-border px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/dev-suite-logo.png"
              alt="DevSuite logo"
              width={100}
              height={38}
              className="h-7 w-auto"
            />
          </Link>
          <div className="w-9" />
        </div>
        {children}
      </div>
    </div>
  );
}
