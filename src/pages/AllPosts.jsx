import {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-12 animate-fade-in'>
        <Container>
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
                    All Published Articles
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Explore all the content available on our platform.
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

export default AllPosts