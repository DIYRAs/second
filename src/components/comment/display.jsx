import React from 'react'
import { useState } from 'react'
import EditDelete from './actions/edit_delete'
import { Modal } from './actions/modal'

const Display_Comment = ({ post, reload }) => {
    const [render, setRender] = useState(false)
    const [initial, setInitial] = useState('')
    const [id, setId] = useState()

    return (
        // CONTAINER
        <div className='relative w-full sm:w-[90%] max-w-full overflow-y-scroll border rounded-xl pl-5'>

            {/* MODAL */}
            <Modal render={render} setRender={setRender} msg={initial} id={id} reload={reload} />
            {/* COMMENTS DISPLAY */}
            {post.map((item, i) => (
                <div key={i} className="w-full pl-4 mb-6 chat chat-start h-max">

                    {/* AVATAR */}
                    <div className="chat-image avatar">
                        <div className="w-12 rounded-full sm:w-16">
                            <img
                                alt="user's avatar"
                                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                            />
                        </div>
                    </div>

                    {/* COMMENT */}
                    <div className="sm:text-[14px] chat-header">
                        {item.name}
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="flex items-center justify-center sm:text-lg chat-bubble max-w-[500px]">
                        {item.comment}

                        {/* DROPDOWN EDIT DELETE ACTION */}
                        <EditDelete setRender={setRender}
                            setInitial={setInitial}
                            setId={setId}
                            id={item.id}
                            reload={reload}
                            item={item.comment} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Display_Comment