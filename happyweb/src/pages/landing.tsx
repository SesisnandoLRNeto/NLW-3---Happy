import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoimg from '../images/logo.svg'

import '../styles/pages/landing.css'

function Landing(){
    return(
        <div id="page-landing">
          <div className="content-wrapper">
            <img src={logoimg} alt='logo happy'/>
            <main>
              <h1>Leve Felicidade para o mundo</h1>
              <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>
            <div className="location">
              <strong>Manaus</strong>
              <span>Amazonas</span>
            </div>
            <Link to='/app' className='enter-app'>
                <FiArrowRight size={26} color='rgb(0, 0, 0, 0.6)'/>
            </Link>
          </div>
        </div>
    )
}
export default Landing