import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicializa el contexto
export const Context = React.createContext(null);

// Función para inyectar el contexto global a cualquier componente
const injectContext = (PassedComponent) => {
	const StoreWrapper = (props) => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: (updatedStore) =>
					setState({
						store: { ...state.store, ...updatedStore }, // Asegúrate de no mutar directamente el estado
						actions: { ...state.actions },
					}),
			})
		);

		useEffect(() => {
			// Carga las categorías al iniciar la aplicación
			// state.actions.loadCategories();
		}, []);

		// Proporciona el contexto con el estado actual
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
