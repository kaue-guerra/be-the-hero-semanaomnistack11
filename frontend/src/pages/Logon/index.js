import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'
import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'

export default function Logon() {

  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const res = await api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', res.data.name)
      history.push('/profile')
      
    } catch (error) {
      console.log("Falha no login")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input 
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID" 
          />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="backlink">
            <FiLogIn size={16} color="#E02041" /> 
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}