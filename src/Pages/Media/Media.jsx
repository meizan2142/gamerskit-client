import React from "react";

const videos = [
  // Google Drive video (fixed with /preview)
  "https://drive.google.com/file/d/1gAUQPH8m0tP7odYPAgeFf2RW4YBlh2_M/preview",
  
];

const Media = () => {
  return (
    <div className="bg-black min-h-screen text-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10">
          🎮 GamersKit Media
        </h2>

        {/* Grid of videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative w-full overflow-hidden rounded-xl shadow-lg aspect-video"
            >
              <iframe
                src={video}
                width="100%"
                height="100%"
                style={{ border: "none", overflow: "hidden" }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
