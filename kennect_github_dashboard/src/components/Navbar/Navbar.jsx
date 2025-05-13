import React,{ useState } from 'react'
import './Navbar.css'

const Navbar = ({value, onChange, onClick}) => {

    return (
        <>
            <nav className='navbar'>
                <h2>Github Issues Metrics</h2>
                <div className="search">
                    <input type="text" value={value} onChange={onChange} />
                    <button type="submit" onClick={onClick}>Search</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar