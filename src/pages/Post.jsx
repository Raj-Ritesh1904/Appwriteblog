import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const imageId = post ? (post.featuredImage || post.featuredimage) : "";
    const imageSrc = imageId ? appwriteService.getFileView(imageId) || appwriteService.getFilePreview(imageId) : "";
    const [imageError, setImageError] = useState(false);
    const [failedUrl, setFailedUrl] = useState("");

    const handleImageError = (e) => {
        setImageError(true);
        setFailedUrl(e.target.src);
        console.error("Failed to load post image from Appwrite. URL was:", e.target.src);
        e.target.onerror = null;
        e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
    };

    const handleBannerClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (failedUrl) {
            window.open(failedUrl, "_blank");
        }
    };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(imageId);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 animate-fade-in">
            <Container>
                {/* Back Link */}
                <div className="mb-6">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
                    >
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to articles
                    </Link>
                </div>

                {/* Cover Image Container */}
                <div
                    className="w-full relative rounded-3xl overflow-hidden border border-slate-700/50 mb-8 aspect-video max-h-[460px] bg-slate-900 flex items-center justify-center shadow-2xl bg-center bg-cover"
                    style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
                >
                    <img
                        src={imageSrc || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"}
                        alt={post.title}
                        onError={handleImageError}
                        className="w-full h-full object-contain bg-slate-950"
                    />

                    {imageError && (
                        <button
                            onClick={handleBannerClick}
                            className="absolute inset-x-0 bottom-0 bg-red-950/90 text-xs text-red-300 py-2 px-4 text-center break-all font-mono hover:bg-red-900 transition-colors z-10"
                        >
                            Click to view load error details
                        </button>
                    )}

                    {isAuthor && (
                        <div className="absolute right-4 top-4 sm:right-6 sm:top-6 flex gap-3 bg-slate-900/60 backdrop-blur-md p-2 rounded-xl border border-slate-700/40">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600 hover:shadow-emerald-500/10" className="px-4 py-2 text-sm">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:shadow-red-500/10" className="px-4 py-2 text-sm" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Article Header */}
                <div className="w-full mb-8 max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-heading">
                        {post.title}
                    </h1>
                </div>

                {/* Article Content */}
                <div className="w-full max-w-4xl mx-auto border-t border-slate-800/80 pt-8 browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 border-4 border-t-indigo-500 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
        </div>
    );
}