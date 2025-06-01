import React from 'react'

const EditDelete = ({ setRender, setInitial, item, setId, id, reload }) => {
    const setComment = () => {
        setInitial(item)
        setId(id)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost/PHP/backend/post/views.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
            if (response.ok) {
                reload()
                const data = await response.json()
                console.log(data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="ml-3 dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="p-3 m-1 font-bold btn">:</div>
            <ul tabIndex={0} className="p-2 font-bold shadow-sm dropdown-content menu bg-slate-900 rounded-box z-1 w-52">
                <li><a onClick={() => { setRender(true), setComment() }} className='text-green-400'>Edit</a></li>
                <li><a onClick={handleDelete} className='text-red-400'>Delete</a></li>
            </ul>
        </div>
    )
}

export default EditDelete