import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importamos hooks de navegación
import { guardarUsuario, actualizarUsuario, obtenerUsuario } from "./usuarios";

const estadoInicial = { Nombre: "", Roll: "", Cumpleaños: "", Direccion: "" };

function FormularioUsuario({ alGuardar }) {
   const { id } = useParams(); // Captura el IdUsuario desde la URL (ej: /editar/5)
   const navigate = useNavigate(); // Para redirigir al usuario
   const [form, setForm] = useState(estadoInicial);

   // Efecto para cargar datos si estamos en modo "Editar"
   useEffect(() => {
      if (id) {
         obtenerUsuario(id)
            .then((data) => {
               setForm({
                  Nombre: data.Nombre || "",
                  Roll: data.Roll || "",
                  Cumpleaños: data.Cumpleaños ? data.Cumpleaños.split("T")[0] : "",
                  Direccion: data.Direccion || "",
               });
            })
            .catch(() => alert("No se pudo cargar el usuario"));
      } else {
         setForm(estadoInicial);
      }
   }, [id]);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      const datosParaEnviar = {
         ...form,
         Roll: Number(form.Roll) 
      };

      try {
         if (id) {
            // Enviamos el ID capturado de la URL para actualizar
            await actualizarUsuario(id, datosParaEnviar);
         } else {
            // El backend generará el IdUsuario automáticamente
            await guardarUsuario(datosParaEnviar);
         }
         
         await alGuardar(); // Refrescamos la lista global
         navigate("/");     // Redirigimos a la tabla principal
      } catch (error) {
         alert("Error al procesar la solicitud");
      }
   };

   return (
      <div className="form-container">
         <form onSubmit={handleSubmit} className={`form-card ${id ? 'edit-mode' : ''}`}>
            <div className="form-header">
               <h3>{id ? "Editar Usuario" : "Nuevo Registro"}</h3>
            </div>
            
            <div className="form-body">
               <div className="input-group">
                  <label>Nombre Completo</label>
                  <input name="Nombre" value={form.Nombre} onChange={handleChange} placeholder="Ej: Luis Pérez" required />
               </div>

               <div className="row">
                  <div className="input-group">
                     <label>Roll (Número)</label>
                     <input name="Roll" type="number" value={form.Roll} onChange={handleChange} placeholder="0" />
                  </div>
                  <div className="input-group">
                     <label>Fecha de Nacimiento</label>
                     <input name="Cumpleaños" type="date" value={form.Cumpleaños} onChange={handleChange} />
                  </div>
               </div>

               <div className="input-group">
                  <label>Lugar de nacimiento</label>
                  <input name="Direccion" value={form.Direccion} onChange={handleChange} placeholder="Ciudad" />
               </div>
            </div>

            <div className="form-footer">
               <button type="submit" className="btn-primary">
                  {id ? "Actualizar Datos" : "Guardar Usuario"}
               </button>
               {/* El botón cancelar ahora simplemente te regresa a la tabla */}
               <button type="button" onClick={() => navigate("/")} className="btn-secondary">
                  {id ? "Cancelar" : "Volver"}
               </button>
            </div>
         </form>
      </div>
   );
}

export default FormularioUsuario;