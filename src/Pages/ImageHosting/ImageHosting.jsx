import { useState } from "react";

const ImageHosting = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [copied, setCopied] = useState(false); // New state for copy feedback

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setLoading(true);
        setCopied(false); // Reset copy status on new upload

        const data = new FormData();
        data.append('file', file);
        data.append("upload_preset", "first-time-using-cloudinary");
        data.append("cloud_name", "dyqjzfdwi");

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dyqjzfdwi/image/upload', {
                method: "POST",
                body: data
            });

            const uploadedImage = await res.json();
            setImageUrl(uploadedImage.url);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(imageUrl)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    return (
        <div className="pt-32 min-h-[500px] text-center">
            <div>
                <input
                    type="file"
                    className="border p-3 rounded-lg"
                    onChange={handleUpload}
                />
            </div>

            <div className="pt-10 text-2xl font-bold">
                {loading ? "Uploading..." : "Upload Complete!"}
            </div>

            {imageUrl && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
                    <p className="font-semibold mb-2">Image URL:</p>
                    <div
                        onClick={copyToClipboard}
                        className="relative cursor-pointer group"
                    >
                        <code className="break-all text-sm hover:text-blue-600 transition-colors">
                            {imageUrl}
                        </code>
                        {/* Show "Click to copy" only when NOT copied */}
                        {!copied && (
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to copy
                            </span>
                        )}
                        {/* Show "Copied!" only when copied */}
                        {copied && (
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                Copied!
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageHosting;