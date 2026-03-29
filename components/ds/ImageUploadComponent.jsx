"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import UploadIcon from "@/components/icons/UploadIcon";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ImageUploadComponent = ({ onFileSelect, maxFileSize = MAX_FILE_SIZE, }) => {
    const [status, setStatus] = useState("idle");
    const inputRef = useRef(null);
    const formattedMaxSize = useMemo(() => {
        const sizeInMB = maxFileSize / (1024 * 1024);
        return Number.isInteger(sizeInMB)
            ? `${sizeInMB}MB`
            : `${sizeInMB.toFixed(2)}MB`;
    }, [maxFileSize]);
    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (!file || !file.type.startsWith("image/")) {
            setStatus("unsupported");
            return;
        }
        if (file.size > maxFileSize) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        onFileSelect(file);
        setStatus("idle");
    }, [onFileSelect, maxFileSize]);
    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setStatus("hover");
    }, []);
    const handleDragLeave = useCallback(() => {
        setStatus("idle");
    }, []);
    const handleClick = () => {
        inputRef.current?.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setStatus("unsupported");
                return;
            }
            if (file.size > maxFileSize) {
                setStatus("error");
                return;
            }
            setStatus("loading");
            onFileSelect(file);
            setStatus("idle");
        }
    };
    return (<div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleClick} className="flex flex-col border border-dashed border-border p-6 text-center text-muted-foreground rounded-lg min-h-40 items-center justify-center bg-muted cursor-pointer mb-2">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange}/>
      <UploadIcon />
      {statusComponents[status](formattedMaxSize)}
    </div>);
};
const StatusComponent = ({ title, message, }) => (<div>
    <p>{title}</p>
    <p>{message || "\u00A0"}</p>
  </div>);
const statusComponents = {
    idle: (maxSize) => (<StatusComponent title="Drag and drop your image here, or click to select" message={`Max size ${maxSize}`}/>),
    loading: () => <StatusComponent title="Loading..."/>,
    error: (maxSize) => (<StatusComponent title="Image is too big!" message={`${maxSize} max`}/>),
    unsupported: () => <StatusComponent title="Please provide a valid image"/>,
    hover: () => <StatusComponent title="Drop it like it's hot! 🔥"/>,
};
export { ImageUploadComponent };
