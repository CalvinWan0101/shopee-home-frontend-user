import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'

function PageTemplate() {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default PageTemplate