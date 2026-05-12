const URL = "http://localhost:3000/api";

// OBTENER TODOS
export async function obtenerUsuarios() {
   const res = await fetch(`${URL}/listar`);
   // Se mantiene .json() porque el backend devuelve un Array []
   return await res.json();
}

// OBTENER UNO
export async function obtenerUsuario(id) {
   const res = await fetch(`${URL}/obtener/${id}`);
   // Se mantiene .json() porque el backend devuelve un objeto {}
   return await res.json();
}

// GUARDAR
export async function guardarUsuario(usuario) {
   const res = await fetch(`${URL}/guardar`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
   });

   // Cambiamos a .text() para evitar el error de "Unexpected token D"
   return await res.text();
}

// ACTUALIZAR
export async function actualizarUsuario(id, usuario) {
   const res = await fetch(`${URL}/actualizar/${id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
   });

   // Cambiamos a .text() porque el backend responde con texto plano
   return await res.text();
}

// ELIMINAR
export async function eliminarUsuario(id) {
   const res = await fetch(`${URL}/eliminar/${id}`, {
      method: "DELETE"
   });

   // Cambiamos a .text() porque el backend responde "Eliminado"
   return await res.text();
}