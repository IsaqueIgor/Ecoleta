import React from 'react';
import {FiLogIn} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>

                <main>
                    <h1>Your waste collection marketplace</h1>

                    <Link to='/create-point'>
                        <span> <FiLogIn/> </span>
                        <strong>Create a new collection point</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home;