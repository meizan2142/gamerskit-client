import React from "react";

// Example video links (replace with your actual Facebook video links)
const videos = [
  "https://www.facebook.com/plugins/video.php?height=800&href=https%3A%2F%2Fwww.facebook.com%2F61574253842852%2Fvideos%2F3283402501811120%2F&show_text=false&width=800&t=0",
  "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/yourpage/videos/9876543210",
  "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/yourpage/videos/1122334455",
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
              className="relative w-full h-88 overflow-hidden rounded-xl shadow-lg aspect-video"
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
