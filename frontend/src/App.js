/*Diego Murguía Rosaldo - 220300724
  Luis Alejandro Pérez Martínez - 240300726} */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { obtenerUsuarios, eliminarUsuario } from './componentes/usuarios';
import FormularioUsuario from './componentes/FormularioUsuario';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      await eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  return (
    // 1. EL ROUTER SIEMPRE DEBE SER EL PADRE DE TODO EL CONTENIDO
    <Router>
      <div className="main-container">
        
        <nav className="navbar">
          <Link to="/" className="nav-link">Lista de Registros</Link>
          <Link to="/nuevo" className="nav-link btn-nav">Nuevo Usuario +</Link>
        </nav>

        <header className="app-header">
          <h1>Gestión de Usuarios</h1>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Roll</th>
                    <th>Lugar de nacimiento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u._id}>
                      <td><span className="badge-id">{u.IdUsuario}</span></td>
                      <td className="user-name">{u.Nombre}</td>
                      <td>{u.Roll}</td>
                      <td>{u.Direccion}</td>
                      <td className="actions">
                        <Link to={`/editar/${u.IdUsuario}`} className="btn-edit">Editar</Link>
                        <button className="btn-delete" onClick={() => handleEliminar(u.IdUsuario)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          } />

          {/* RUTA PARA CREAR */}
          <Route path="/nuevo" element={
            <FormularioUsuario alGuardar={cargarUsuarios} />
          } />

          {/* RUTA PARA EDITAR */}
          <Route path="/editar/:id" element={
            <FormularioUsuario alGuardar={cargarUsuarios} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;