import React, {useEffect, useState} from 'react'
import Container from '../Components/Container/Container'
import service from '../appwrite/database_service';
import { useNavigate,  useParams } from 'react-router-dom';
import PostForm from '../Components/Postform/Postform';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost