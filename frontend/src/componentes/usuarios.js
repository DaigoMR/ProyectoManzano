const URL = "/api";
// ==========================================
// SERVICIOS DE LA API (CRUD)
// ==========================================

// 1. OBTENER TODOS LOS USUARIOS (READ ALL)
export async function obtenerUsuarios() {
    try {
        const res = await fetch(`${URL}/listar`);
        if (!res.ok) throw new Error(`Error en el servidor: ${res.status}`);
        
        // El backend devuelve un Array [] con los usuarios
        return await res.json();
    } catch (error) {
        console.error("Error en obtenerUsuarios:", error);
        throw error;
    }
}

// 2. OBTENER UN SOLO USUARIO POR ID (READ ONE)
export async function obtenerUsuario(id) {
    try {
        const res = await fetch(`${URL}/obtener/${id}`);
        if (!res.ok) throw new Error(`Error en el servidor: ${res.status}`);
        
        // El backend devuelve un objeto {} con los datos del usuario
        return await res.json();
    } catch (error) {
        console.error(`Error en obtenerUsuario con ID ${id}:`, error);
        throw error;
    }
}

// 3. GUARDAR UN NUEVO USUARIO (CREATE)
export async function guardarUsuario(usuario) {
    try {
        const res = await fetch(`${URL}/guardar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        if (!res.ok) throw new Error(`Error en el servidor: ${res.status}`);
        
        // El backend devuelve: { mensaje: "Datos insertados correctamente", id: ... }
        return await res.json();
    } catch (error) {
        console.error("Error en guardarUsuario:", error);
        throw error;
    }
}

// 4. ACTUALIZAR UN USUARIO EXISTENTE (UPDATE)
export async function actualizarUsuario(id, usuario) {
    try {
        const res = await fetch(`${URL}/actualizar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        if (!res.ok) throw new Error(`Error en el servidor: ${res.status}`);
        
        // El backend devuelve: { mensaje: "Actualizado correctamente", usuario: [...] }
        return await res.json();
    } catch (error) {
        console.error(`Error en actualizarUsuario con ID ${id}:`, error);
        throw error;
    }
}

// 5. ELIMINAR UN USUARIO (DELETE)
export async function eliminarUsuario(id) {
    try {
        const res = await fetch(`${URL}/eliminar/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`Error en el servidor: ${res.status}`);
        
        // El backend devuelve: { mensaje: "Eliminado correctamente" }
        return await res.json();
    } catch (error) {
        console.error(`Error en eliminarUsuario con ID ${id}:`, error);
        throw error;
    }
}