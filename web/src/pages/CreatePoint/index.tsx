import React from 'react'; 
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

const CreatePoint = () => {
    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt='Ecoleta' />

                <Link to='/'>
                    <FiArrowLeft />
                    Back to Home
                </Link>
            </header>

            <form>
                <h1>Collection Point<br/> Registration</h1>

                <fieldset>
                    <legend>
                        <h2>Information</h2>
                    </legend>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Adress</h2>
                    </legend>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Items</h2>
                    </legend>
                </fieldset>
            </form>
        </div>
    );
}

export default CreatePoint;