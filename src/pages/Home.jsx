import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import {useSelector} from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                {authStatus ? "No posts found. Create the first post!" : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12 animate-fade-in'>
            <Container>
                <div className="mb-12 text-center md:text-left max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight font-heading mb-4">
                        Discover Stories & Ideas<span className="text-indigo-500">.</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Welcome to Scribe. Read, publish, and share your technical articles with our growing community.
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='h-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home