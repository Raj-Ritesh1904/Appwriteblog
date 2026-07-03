import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-12 animate-fade-in'>
        <Container>
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
                    Create New Article
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Compose a new post, upload a cover image, and publish it to Scribe.
                </p>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost