import React from 'react'
import { useState } from 'react'

const Input_Comment = ({ reload }) => {
    const [comment, setComment] = useState('')

    const handleComment = (e) => {
        const comment = e.target.value
        setComment(comment)
    }

    const handlePost = async () => {
        try {
            const response = await fetch('http://localhost/PHP/backend/post/views.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: "anonim",
                    comment: comment
                })
            })
            if (response.ok) {
                reload()
                setComment('')
                const data = await response.json()
                console.log(data.message);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <fieldset className="p-4 border fieldset bg-[#393E46] w-full sm:w-[90%] border-base-300 rounded-box">
                <legend className="text-sm fieldset-legend">Type your comment</legend>

                <div className="flex items-center justify-center space-x-4 join">
                    <textarea className="resize-none w-[80%] rounded-xl textarea textarea-primary join-item"
                        placeholder="wow amazing..."
                        onChange={handleComment}
                        value={comment}>
                    </textarea>
                    <button className="btn w-[20%] h-[80%] rounded-xl sm:w-[10%] join-item"
                        onClick={handlePost}>post</button>
                </div>

            </fieldset>
        </>
    )
}

export default Input_Comment