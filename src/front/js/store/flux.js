// flux.js
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			categories: [] // Mantiene las categorías en el estado
		},
		actions: {
			// Cargar categorías desde la API
			loadCategories: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category`);
					if (!response.ok) throw new Error("Failed to load categories");
					const data = await response.json();
					setStore({ categories: data });
				} catch (error) {
					console.error("Error loading categories:", error);
				}
			},

			// Crear una nueva categoría
			newCategory: async (category) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(category),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}

					// Recargar categorías después de crear una nueva
					await getActions().loadCategories();
				} catch (error) {
					console.error("Error saving category:", error);
				}
			},

			// Editar una categoría existente
			updateCategory: async (id, updatedData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category/${id}`, { // Cambié el endpoint a "category"
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedData),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}

					// Recargar categorías después de editar
					await getActions().loadCategories();
				} catch (error) {
					console.error("Error updating category:", error);
				}
			},

			// Eliminar una categoría
			deleteCategory: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Failed to delete category");

					// Recargar categorías después de eliminar
					await getActions().loadCategories();
				} catch (error) {
					console.error("Failed to delete category:", error);
				}
			},
		}
	};
};

export default getState;
