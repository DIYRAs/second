import { useEffect, useState } from 'react'
import Input_Comment from './input'
import Display_Comment from './display'

const Comment = () => {
    const [post, setPost] = useState([])

    const handleRead = async () => {
        try {
            const response = await fetch('http://localhost/PHP/backend/post/views.php')
            const data = await response.json()
            setPost(data)
            console.log(data);
        } catch (err) {
            console.error(err);

        }
    }
    useEffect(() => {
        handleRead()
    }, [])

    return (
        <>
            <div className='flex items-center gap-16 flex-col justify-between pt-24 h-screen w-full sm:w-[95%] py-4'>
                <Display_Comment post={post} reload={handleRead} />
                <Input_Comment reload={handleRead} />
            </div>
        </>
    )
}

export default Comment