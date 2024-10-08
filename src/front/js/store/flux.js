// flux.js
const getState = ({ getStore, getActions, setStore }) => {
	let url_author = process.env.BACKEND_URL + "api/author/";
	let url_newspaper = process.env.BACKEND_URL + "api/newspaper/";
	let url_article = process.env.BACKEND_URL + "api/article/";

	return {
		store: {
			message: null,
			categories: [],
			Authors: [],
			Articles: [],
			temp: [],
			Auth: false,
			token: null,
			homepageMessage: null,
			Newspapers: [],
		},
		actions: {
			getHomepage: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/homePage`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}` // Usa el token del local storage
						}
					});
					if (!response.ok) throw new Error("Failed to load homepage content");

					const data = await response.json();
					setStore({ homepageMessage: data.message }); // Asegúrate de que data.message sea la propiedad correcta
					console.log(data)
				} catch (error) {
					console.error("Error fetching homepage content:", error);
					setStore({ homepageMessage: "Error fetching content" }); // Establece un mensaje de error en el store
				}
			},
			// Cargar categorías desde la API
			loadCategories: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/category`);
					if (!response.ok) throw new Error("Failed to load categories");
					const data = await response.json();
					setStore({ categories: data });
				} catch (error) {
					console.error("Error loading categories:", error);
				}
			},

			// Obtener autores
			getData: async () => {
				try {
					const response = await fetch(url_author);
					if (!response.ok) throw new Error("Error fetching Authors");
					const data = await response.json();
					setStore({ Authors: data });
					console.log("Data de autores:", data);
				} catch (error) {
					console.error("Error fetching Authors:", error);
				}
			},

			// Crear un nuevo autor
			addAuthor: async (props) => {
				const actions = getActions();
				if (getStore().temp.length === 0) {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(props),
					};
					try {
						const response = await fetch(url_author, requestOptions);
						if (!response.ok) throw new Error("Error al agregar autor");
						await actions.getData(); // Actualiza la lista de autores
					} catch (error) {
						console.error("Error al agregar autor:", error);
					}
				} else {
					actions.changeAuthor(props);
				}
			},

			// Eliminar un autor
			deleteAuthor: async (id) => {
				const actions = getActions();
				try {
					const response = await fetch(url_author + id, { method: 'DELETE' });
					if (!response.ok) throw new Error("Error al eliminar autor");
					await actions.getData(); // Actualiza la lista de autores
				} catch (error) {
					console.error("Error al eliminar autor:", error);
				}
			},

			// Actualizar un autor
			changeAuthor: async (props) => {
				const actions = getActions();
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(props),
				};
				try {
					const response = await fetch(url_author + props.id, requestOptions);
					if (!response.ok) throw new Error("Error al actualizar autor");
					await actions.getData(); // Actualiza la lista de autores
				} catch (error) {
					console.error("Error al actualizar autor:", error);
				}
			},

			// Obtener periódicos
			getNewspaper: () => {
				fetch(url_newspaper)
					.then(response => response.json())
					.then(data => {
						console.log("Data de periódicos: ", data); // Verifica aquí los datos
						setStore({ Newspapers: data });
					})
					.catch(error => console.log("Error al cargar los periódicos:", error));
			},

			// Agregar un periódico
			addNewspaper: async (props) => {
				const actions = getActions();
				if (getStore().temp.length === 0) {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(props),
					};
					try {
						const response = await fetch(url_newspaper, requestOptions);
						if (!response.ok) throw new Error("Error al agregar periódico");
						await actions.getNewspaper(); // Actualiza la lista de periódicos
					} catch (error) {
						console.error("Error al agregar periódico:", error);
					}
				} else {
					actions.changeNewspaper(props);
				}
			},

			// Eliminar un periódico
			deleteNewspaper: async (id) => {
				const actions = getActions();
				try {
					const response = await fetch(url_newspaper + id, { method: 'DELETE' });
					if (!response.ok) throw new Error("Error al eliminar periódico");
					await actions.getNewspaper(); // Actualiza la lista de periódicos
				} catch (error) {
					console.error("Error al eliminar periódico:", error);
				}
			},

			// Actualizar un periódico
			changeNewspaper: async (props) => {
				const actions = getActions();
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(props),
				};
				try {
					const response = await fetch(url_newspaper + props.id, requestOptions);
					if (!response.ok) throw new Error("Error al actualizar periódico");
					await actions.getNewspaper(); // Actualiza la lista de periódicos
				} catch (error) {
					console.error("Error al actualizar periódico:", error);
				}
			},

			// Obtener artículos
			getDataArticle: async () => {
				try {
					const response = await fetch(url_article);
					if (!response.ok) throw new Error("Error fetching Articles");
					const data = await response.json();
					setStore({ Articles: data });
					console.log("Data de artículos:", data);
				} catch (error) {
					console.error("Error fetching Articles:", error);
				}
			},

			// Agregar un artículo
			addArticle: async (props) => {
				const actions = getActions();
				if (getStore().temp.length === 0) {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(props),
					};
					try {
						const response = await fetch(url_article, requestOptions);
						if (!response.ok) throw new Error("Error al agregar artículo");
						await actions.getDataArticle(); // Actualiza la lista de artículos
					} catch (error) {
						console.error("Error al agregar artículo:", error);
					}
				} else {
					actions.changeArticle(props);
				}
			},

			// Eliminar un artículo
			deleteArticle: async (id) => {
				const actions = getActions();
				try {
					const response = await fetch(url_article + id, { method: 'DELETE' });
					if (!response.ok) throw new Error("Error al eliminar artículo");
					await actions.getDataArticle(); // Actualiza la lista de artículos
				} catch (error) {
					console.error("Error al eliminar artículo:", error);
				}
			},

			// Actualizar un artículo
			changeArticle: async (props) => {
				const actions = getActions();
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(props),
				};
				try {
					const response = await fetch(url_article + props.id, requestOptions);
					if (!response.ok) throw new Error("Error al actualizar artículo");
					await actions.getDataArticle(); // Actualiza la lista de artículos
				} catch (error) {
					console.error("Error al actualizar artículo:", error);
				}
			},

			// Función para registro de usuario
			signup: async (userData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}

					const data = await response.json();
					console.log(data.msg); // Mensaje de éxito

				} catch (error) {
					console.error("Error signing up:", error);
				}
			},

			// Función para inicio de sesión
			login: async (credentials) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(credentials),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
					}

					const data = await response.json();
					setStore({ token: data.access_token });
					localStorage.setItem("token", data.access_token);
					console.log("Inicio de sesión exitoso, token:", data.access_token);

				} catch (error) {
					console.error("Error logging in:", error);
				}
			},

			// Función para cerrar sesión
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				console.log("Sesión cerrada");
			}

		}
	};
};

export default getState;
