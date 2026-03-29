"use client";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "./ds/CommandMenu";
import { tools } from "./utils/tools-list";
import { Input } from "./ds/InputComponent";
import { useEffect, useState } from "react";
import { GitFork, Home, RocketIcon, UserPlus } from "lucide-react";
export function CMDKTrigger({ onOpen, className }) {
    return (<div className={`relative max-w-[320px] w-full ${className ?? ""}`}>
      <Input placeholder="Search" onFocus={onOpen}/>
      <div className="flex absolute top-[50%] right-[12px] text-sm text-muted-foreground translate-y-[-50%]">
        <div className="pointer-events-none inline-flex h-5 select-none items-center gap-1 border bg-background text-foreground px-1.5 py-1 text-xs rounded-md">
          CMD + K
        </div>
      </div>
    </div>);
}
export function CMDK(props) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const showSearch = props.showSearch ?? false;
    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        const openPalette = () => setOpen(true);
        document.addEventListener("keydown", down);
        window.addEventListener("devsuite-open-cmdk", openPalette);
        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("devsuite-open-cmdk", openPalette);
        };
    }, []);
    return (<section className="flex justify-center">
      {showSearch && <CMDKTrigger onOpen={() => setOpen(true)}/>}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {tools.map((tool) => (<CommandItem key={tool.title} onSelect={() => {
                router.push(tool.link);
            }}>
                <span>{tool.title}</span>
              </CommandItem>))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            <CommandItem onSelect={() => {
            window.open("https://chromewebstore.google.com/detail/jam/iohjgamcilhbgmhbnllfolmkmmekfmci?hl=en", "_blank");
        }}>
              <RocketIcon className="mr-2 h-4 w-4"/>
              <span>Get DevSuite Chrome extension</span>
            </CommandItem>
            <CommandItem onSelect={() => {
            window.open("https://github.com/jamdotdev/jam-dev-utilities", "_blank");
        }}>
              <GitFork className="mr-2 h-4 w-4"/>
              <span>Contribute on GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => {
            window.open("https://x.com/jamdotdev", "_blank");
        }}>
              <UserPlus className="mr-2 h-4 w-4"/>
              <span>Follow us @jamdotdev</span>
            </CommandItem>
            <CommandItem onSelect={() => {
            router.push("/utilities");
        }}>
              <Home className="mr-2 h-4 w-4"/>
              <span>Home</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </section>);
}
