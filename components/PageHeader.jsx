import { useRouter } from "next/router";
import {
    Binary,
    Braces,
    Clock3,
    CodeXml,
    FileCode2,
    FileJson,
    FileSearch,
    FileSpreadsheet,
    Globe,
    Hash,
    ImageIcon,
    ImagePlus,
    KeyRound,
    Link2,
    ListChecks,
    Palette,
    Regex,
    Ruler,
    ScanSearch,
    Shuffle,
    SquareFunction,
    Timer,
    Type,
    Upload,
    WandSparkles,
    Wifi,
    Wrench,
} from "lucide-react";

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

export default function PageHeader({ title, description }) {
    const router = useRouter();
    const ToolIcon = toolIcons[router.pathname] ?? Wrench;
    return (<div className="container text-center">
      <div className="flex justify-center items-center mb-6">
        <div className="rounded-xl overflow-hidden ring-1 ring-gray-300/30 shadow-[0_8px_24px_rgba(15,23,42,0.08)] w-14 h-14 bg-white flex items-center justify-center">
          <ToolIcon className="h-7 w-7"/>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-lg text-muted-foreground mb-2 leading-6 font-light">
        {description}
      </p>
    </div>);
}
