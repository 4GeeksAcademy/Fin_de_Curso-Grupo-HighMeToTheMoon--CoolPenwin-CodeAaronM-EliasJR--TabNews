// flux.js
const getState = ({ getStore, getActions, setStore }) => {
	let url_author = process.env.BACKEND_URL + "api/author/"
	return {
		store: {
			message: null,
			categories: [],
			Authors: [],
			temp: []
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
			getData: () => {
				console.log("getData");
				console.log(url_author);
				
				fetch(url_author)
					.then(response => response.json())
					.then(data => {
						setStore({ Authors: data });
						console.log("data de dev");
						console.log(data);
					})
					.catch(error => console.error("Error fetching Authors:", error));
			},
			addAuthor: (props) => {
				const actions = getActions()
				const store = getStore();
				if (store.temp.length === 0) {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							'name': props.name,
							'description': props.description,
							'photo': props.photo
						})
					}
					fetch(url_author, requestOptions)
						.then((Response) => Response.json())
						.then(() => actions.getData())
						.catch((error) => {
							console.error("Error fetching the data:", error);
						});
				} else {
					actions.changeAuthor(props)
				}
			},
			deleteAuthor: (props) => {
				const actions = getActions()
				console.log("you are going to delete " + props)
				fetch(url_author+props, { method: 'DELETE' })
					.then(() => { actions.getData() });

			},
			changeAuthor: (props) => {
				const store = getStore();
				const actions = getActions()
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						'name': props.name,
						'description': props.description,
						'photo': props.photo,
						'id': props.id
					}),
					redirect: "follow"
				};
				fetch(url_author+props.id, requestOptions)
					.then(response => response.json())
					.then(data => {
						actions.getData()
						console.log(props.id)
						setStore({ temp: [] })
					});

			},
			setid: (props) => {
				setStore({ temp: props });
				console.log("ID para editar:", props); // Asegúrate de que el ID correcto se está almacenando
			}

		}
	};
};

export default getState;
