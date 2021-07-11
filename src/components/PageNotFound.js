import React from 'react'
import './css/PageNotFound.css'
import pageNotFound from './img/404.jpg'

function PageNotFound() {
    return (
        <main className='notfound'>
            <div className='w3-container w3-center' >
                <img className='w3-image s4 m9 l3 main__img'src={pageNotFound} alt="" />
                
            </div>
        </main>
    )
}

export default PageNotFound
