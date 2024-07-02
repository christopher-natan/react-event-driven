import { useEffect, useState } from 'react';
import { useObservableStore } from './observable.store'

export const useObserver = () => {
	const { state, subscribe } = useObservableStore();
	const [,setUpdate] = useState('');

	useEffect(() => {
		const forceUpdate = () => setUpdate(update => update);
		const unsubscribe = subscribe(forceUpdate);
		return () => unsubscribe();
	}, [subscribe]);

	return state;
};
