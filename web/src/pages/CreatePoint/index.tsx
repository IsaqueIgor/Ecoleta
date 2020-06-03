import React, {useEffect, useState, ChangeEvent} from 'react'; 
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import axios from 'axios';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

//#region Interfaces
interface Item {
    id: number,
    title: string,
    image_url: string;
}

interface IBGEUFResponde {
    sigla: string,
}

interface IBGECityResponde {
    nome: string,
}
//#endregion

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [InitialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const [Selecteduf, setSelecteduf] = useState('0');
    const [SelectedCity, setSelectedCity] = useState('0');
    const [SelectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude , longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponde[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if(Selecteduf === '0')
            return
        
        axios.get<IBGECityResponde[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${Selecteduf}/distritos?orderBy=nome`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        });
        
    }, [Selecteduf]);

    function HandleSelectUF(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelecteduf(uf);
    }

    function HandleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

    function HandleMapClick(event:LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

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

                    <div className="field">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-Mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select the adress in the Map</span>
                    </legend>

                    <Map center={InitialPosition} zoom={15} onClick={HandleMapClick}>
                        <TileLayer 
                            attribution ='&amp;copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={SelectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">State</label>
                            <select 
                                name="uf"
                                id="uf" 
                                value={Selecteduf}
                                onChange={HandleSelectUF}
                            >
                                <option value="0">Select a Federal State</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select 
                                name="city" 
                                id="city" 
                                value={SelectedCity} 
                                onChange={HandleSelectCity}
                            >
                                <option value='0'>Select a City</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Items</h2>
                        <span>Select one or more items</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                        
                    </ul>
                </fieldset>

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;