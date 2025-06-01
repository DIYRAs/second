import { useEffect, useCallback, useState } from 'react'

export const Modal = ({ render, setRender, msg, id, reload }) => {
    const [msgEdit, setMsgEdit] = useState(msg)
    useEffect(() => {
        setMsgEdit(msg)
    }, [msg])

    const handleInput = (e) => {
        setMsgEdit(e.target.value)
    }

    const handleClick = useCallback(() => {
        setRender(false)
    }, [setRender])

    useEffect(() => {
        const handleKeyDown = (e) => {
            e.key == 'Escape' && handleClick()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleClick])

    const handlePropagation = (e) => {
        e.stopPropagation()
    }

    const handleEdit = async () => {
        try {
            const response = await fetch('http://localhost/PHP/backend/post/views.php', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    comment: msgEdit
                })
            })
            if (response.ok) {
                reload()
                handleClick()
                const data = await response.json()
                console.log(data);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {render && (
                <div onClick={handleClick} className='fixed top-0 left-0 z-10 grid w-screen h-screen place-items-center bg-white/5'>
                    <div onClick={handlePropagation} className='top-0 left-0 w-[90%] gap-2 max-w-[50%] z-20 flex p-2 h-44 flex-col items-center justify-center bg-[#393E46] rounded-lg'>
                        <textarea className="w-full border-0 resize-none textarea textarea-ghost focus:outline-0" placeholder="Edit"
                            value={msgEdit} onChange={handleInput} ></textarea>
                        <button onClick={handleEdit} className='btn btn-soft hover:text-green-400 hover:ring-green-400 hover:ring'>Save</button>
                    </div>
                </div>
            )}
        </>
    )
}
