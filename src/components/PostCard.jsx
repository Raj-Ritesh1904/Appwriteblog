import { useState } from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage, featuredimage}) {
  const imageId = featuredImage || featuredimage;
  const imageSrc = imageId ? appwriteService.getFileView(imageId) || appwriteService.getFilePreview(imageId) : "";
  const [imageError, setImageError] = useState(false);
  const [failedUrl, setFailedUrl] = useState("");
  
  const handleImageError = (e) => {
    setImageError(true);
    setFailedUrl(e.target.src);
    console.error("Failed to load post image from Appwrite. URL was:", e.target.src);
    e.target.onerror = null; // Prevent infinite loop if fallback fails
    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"; // Premium fallback abstract placeholder
  };

  const handleBannerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (failedUrl) {
      window.open(failedUrl, "_blank");
    }
  };

  return (
    <Link to={`/post/${$id}`} className="block h-full">
        <div className='w-full h-full bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 hover:border-indigo-500/30 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/20 group flex flex-col'>
            <div
                className='w-full aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900 flex items-center justify-center relative bg-center bg-cover'
                style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
            >
                <img 
                  src={imageSrc || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"} 
                  alt={title}
                  onError={handleImageError}
                  className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl bg-slate-950' 
                />
                {imageError && (
                  <button
                    onClick={handleBannerClick}
                    className="absolute inset-x-0 bottom-0 bg-red-950/90 text-[10px] text-red-300 py-1.5 px-2 text-center break-all font-mono hover:bg-red-900 transition-colors z-10"
                  >
                    Click to view load error detail
                  </button>
                )}
            </div>
            <h2 className='text-lg font-bold text-slate-200 group-hover:text-indigo-400 transition-colors duration-250 line-clamp-2 flex-grow'>
                {title}
            </h2>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-indigo-400 group-hover:underline">
              <span>Read article</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
        </div>
    </Link>
  )
}

export default PostCard