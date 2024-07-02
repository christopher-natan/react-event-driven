import type React from 'react'
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react'

interface State { event: any; }
interface StoreContext {
	state: State;
	setEvent: (params: {}) => void;
	subscribe: (callback: () => void) => () => void;
}

const ObservableStoreContext = createContext<StoreContext | undefined>(undefined)
export const ObservableStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, setState] = useState<State>({ event: '' })
	const subscribers = new Set<() => void>()
	const subscribe = (callback: () => void) => {
		/* subscribers.add(callback) */
		return () => subscribers.delete(callback)
	}

	const notify = () => { for (const callback of subscribers) callback()}
	const setEvent = (params: {}) => {
		setState((prevState) => {
			const newState = { ...prevState, event: params}
			notify()
			return newState
		})
	}

	return (
		<ObservableStoreContext.Provider value={{ state, setEvent, subscribe }}>
			{children}
		</ObservableStoreContext.Provider>
	)
}

export const useObservableStore = (): StoreContext => {
	const context = useContext(ObservableStoreContext)
	if (!context) { throw new Error('useObservableStore must be used within a ObservableStoreProvider')}
	return context
}
