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
			userPreferredCategories: [], 
			ArticlesApi: [],
		},
		actions: {
			getHomepage: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/homePage`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`
						}
					});
					if (!response.ok) throw new Error("Failed to load homepage content");					
					const data = await response.json();
					setStore({ homepageMessage: data.message }); 
					console.log(data)
				} catch (error) {
					console.error("Error fetching homepage content:", error);
					setStore({ homepageMessage: "Error fetching content" }); 
				}
			},

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

			newCategory: async (category) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/category`, {
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
					await getActions().loadCategories();
				} catch (error) {
					console.error("Error saving category:", error);
				}
			},

			updateCategory: async (id, updatedData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/category/${id}`, {
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
					await getActions().loadCategories();
				} catch (error) {
					console.error("Error updating category:", error);
				}
			},

			deleteCategory: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/category/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Failed to delete category");

					await getActions().loadCategories();
				} catch (error) {
					console.error("Failed to delete category:", error);
				}
			},
			
			getUserCategories: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/user-category`);
					if (!response.ok) throw new Error("Failed to load user categories");
			
					const data = await response.json();
					setStore({ userCategories: data }); 
				} catch (error) {
					console.error("Error loading user categories:", error);
				}
			},

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
						await actions.getData();
					} catch (error) {
						console.error("Error al agregar autor:", error);
					}
				} else {
					actions.changeAuthor(props);
				}
			},

			deleteAuthor: async (id) => {
				const actions = getActions();
				try {
					const response = await fetch(url_author + id, { method: 'DELETE' });
					if (!response.ok) throw new Error("Error al eliminar autor");
					await actions.getData();
				} catch (error) {
					console.error("Error al eliminar autor:", error);
				}
			},

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
					await actions.getData();
				} catch (error) {
					console.error("Error al actualizar autor:", error);
				}
			},

			getNewspaper: () => {
				fetch(url_newspaper)
					.then(response => response.json())
					.then(data => {
						console.log("Data de periódicos: ", data); 
						setStore({ Newspapers: data });
					})
					.catch(error => console.log("Error al cargar los periódicos:", error));
			},

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
						await actions.getNewspaper();
					} catch (error) {
						console.error("Error al agregar periódico:", error);
					}
				} else {
					actions.changeNewspaper(props);
				}
			},

			deleteNewspaper: async (id) => {
				const actions = getActions();
				try {
					const response = await fetch(url_newspaper + id, { method: 'DELETE' });
					if (!response.ok) throw new Error("Error al eliminar periódico");
					await actions.getNewspaper();
				} catch (error) {
					console.error("Error al eliminar periódico:", error);
				}
			},

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
					await actions.getNewspaper();
				} catch (error) {
					console.error("Error al actualizar periódico:", error);
				}
			},

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
						await actions.getDataArticle();
					} catch (error) {
						console.error("Error al agregar artículo:", error);
					}
				} else {
					actions.changeArticle(props);
				}
			},

			deleteArticle: async (id) => {
				const actions = getActions();
				try {
					const response = await fetch(url_article + id, { method: 'DELETE' });
					if (!response.ok) throw new Error("Error al eliminar artículo");
					await actions.getDataArticle();
				} catch (error) {
					console.error("Error al eliminar artículo:", error);
				}
			},

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
					await actions.getDataArticle();
				} catch (error) {
					console.error("Error al actualizar artículo:", error);
				}
			},

			signup: async (userData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
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
					console.log(data.msg);

				} catch (error) {
					console.error("Error signing up:", error);
				}
			},
		
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

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				console.log("Sesión cerrada");
			},

			setid: (props) => {
				setStore({ temp: props });
				console.log("ID para editar:", props); 
			},
			administratorSignup: async (userData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/administratorSignup`, {
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
					console.log(data.msg);

				} catch (error) {
					console.error("Error signing up:", error);
				}
			},
		
			administratorLogin: async (credentials) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/administratorLogin`, {
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
			getAdministratorHomepage: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/homePage`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}` // Corrige la interpolación de cadena
						}
					});
			
					if (!response.ok) {
						const errorData = await response.json(); // Intenta obtener datos de error
						throw new Error(`Error ${response.status}: ${errorData.message || "Failed to load homepage content"}`);
					}
			
					const data = await response.json();
					setStore({ homepageMessage: data.message });
					console.log(data);
				} catch (error) {
					console.error("Error fetching homepage content:", error);
					setStore({ homepageMessage: "Error fetching content" });
				}
			},
			
			getUserPreferredCategories: async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/user-category`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    if (!response.ok) throw new Error("Failed to load user preferred categories");
                    const data = await response.json();
                    setStore({ userPreferredCategories: data });
                } catch (error) {
                    console.error("Error loading user preferred categories:", error);
                }
            },

			saveUserPreferredCategories: async (selectedCategories) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/user-category`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ selectedCategories })
					});
					if (!response.ok) throw new Error("Failed to save preferred categories");
					await getActions().getUserPreferredCategories(); // Refrescar después de guardar
				} catch (error) {
					console.error("Error saving preferred categories:", error);
				}
			},
			getArticleApiData: async () => {
				try {
					// Realiza la solicitud al backend usando la URL definida en las variables de entorno
					const response = await fetch(`${process.env.BACKEND_URL}api/getApiArticle`);
			
					// Verifica si la respuesta es exitosa (status 200-299)
					if (!response.ok) {
						throw new Error("Error en la solicitud: " + response.statusText);
					}
			
					// Llama a otra función para obtener los datos de los artículos
					getActions().getDataArticle();
				} catch (error) {
					console.error("Error al obtener artículos de la API:", error);
				}
			},
			
			updateArticleCategory: async (id, categoryId) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}api/article/${id}/category`, {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({ category_id: categoryId }), // Envía la ID de la nueva categoría
				  });
				  if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`Error ${response.status}: ${errorData.message || "Unknown error"}`);
				  }
				  await	getActions().getDataArticle();// Vuelve a cargar los artículos después de la actualización
				} catch (error) {
				  console.error("Error updating article category:", error);
				}
			  },
			  
			
			
		}
	};
};

export default getState;
