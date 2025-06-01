import React from 'react'
import { Link } from 'react-router-dom'

const Drawer = () => {
    return (
        <>
            <div className="fixed top-0 right-0 p-10 w-max drawer drawer-end place-items-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Profile</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="min-h-full p-4 space-y-3 menu bg-base-200 place-items-center text-base-content w-80">
                        {/* Sidebar content here */}
                        <li className='w-full py-3 mb-5 border-b place-items-center'>
                            <div className="avatar">
                                <div className="w-24 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </div>
                            </div>
                        </li>

                        <li><Link to={'/signup'}>Sign Up</Link></li>
                        <li><Link to={'/signin'}>Sign In</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Drawer