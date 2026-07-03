import {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-12 animate-fade-in'>
        <Container>
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
                    Edit Article
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Update the content, status, or cover image of your article.
                </p>
            </div>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-t-indigo-500 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
    </div>
  )
}

export default EditPost