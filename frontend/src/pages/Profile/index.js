import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './style.css'
import logo from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Profile() {

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  const history = useHistory()

  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(res => {
      setIncidents(res.data)
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar caso. Tente novamente!')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incident/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout} >
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      
      <ul>
        { incidents.map(incident => (
          <li key={incident.id} >
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)} >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        )) }
      </ul>
    </div>
  )
}