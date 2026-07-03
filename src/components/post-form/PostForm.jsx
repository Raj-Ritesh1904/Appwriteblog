import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const handleImageError = (e) => {
        console.error("Failed to load post image from Appwrite. URL was:", e.target.src);
        e.target.onerror = null;
        e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
    };

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-6 bg-slate-800/20 backdrop-blur-sm border border-slate-700/40 p-6 rounded-2xl">
                <Input
                    label="Title"
                    placeholder="Enter post title"
                    className="mb-2"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug (URL identifier)"
                    placeholder="url-identifier"
                    className="mb-2"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    disabled={!!post}
                />
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-300 pl-1">
                        Content
                    </label>
                    <RTE name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            <div className="space-y-6 bg-slate-800/20 backdrop-blur-sm border border-slate-700/40 p-6 rounded-2xl h-fit">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-2"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full">
                        <p className="text-xs font-semibold text-slate-400 mb-2 pl-1">Current Featured Image</p>
                        <div className="relative rounded-xl overflow-hidden border border-slate-700/50 aspect-video bg-slate-900 flex items-center justify-center">
                            <img
                                src={appwriteService.getFileView(post.featuredImage || post.featuredimage) || appwriteService.getFilePreview(post.featuredImage || post.featuredimage) || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"}
                                alt={post.title}
                                onError={handleImageError}
                                className="w-full h-full object-contain bg-slate-950"
                            />
                        </div>
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-2"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-emerald-600 hover:shadow-emerald-500/10" : "bg-indigo-600 hover:shadow-indigo-500/10"} 
                    className="w-full py-3 mt-2"
                >
                    {post ? "Update Post" : "Publish Post"}
                </Button>
            </div>
        </form>
    );
}