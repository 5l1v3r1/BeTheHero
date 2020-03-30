import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import './styles.css'

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ong_id = localStorage.getItem('ongId');
    const ong_name = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: ong_id,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ong_id]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    authorization: ong_id,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert('Erro ao deletar caso tente novamente!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, {ong_name}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} className="trash"/>
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    );
}