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
				console.log(process.env.BACKEND_URL); // Agrega esto para verificar la URL
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

					const data = await response.json();
					setStore({ categories: [...getStore().categories, data] }); // Actualizar la lista de categorías
				} catch (error) {
					console.error("Error saving category:", error);
				}
			},

			// Editar una categoría existente
			editCategory: async (id, category) => {
				const apiUrl = `${process.env.BACKEND_URL}/api/category/${id}`;

				try {
					const response = await fetch(apiUrl, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(category),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Error editing category."}`);
					}

					await getActions().loadCategories(); // Recargar categorías después de editar
				} catch (error) {
					console.error("Error editing category:", error);
				}
			},

			// Eliminar una categoría
			deleteCategory: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/category/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Failed to delete category");

					await getActions().loadCategories(); // Recargar categorías después de eliminar
				} catch (error) {
					console.error("Failed to delete category:", error);
				}
			}
		}
	};
};

export default getState;
