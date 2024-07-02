import { useEffect, useState } from 'react'
import { useObserver } from '../hooks/use.observer'
import type { FoldersInterface } from '../interface/folders.interface'
import { useObservableStore } from '../hooks/observable.store'

export enum SearchEnum {
	SEARCH = 'SEARCH'
}

export default function SearchService(folders: FoldersInterface[]) {
	const { event } = useObserver()
	const [allFolders, setAllFolders] = useState(folders)
	const { setEvent } = useObservableStore()

	const getEditedData = (): FoldersInterface[] => allFolders.map((item: FoldersInterface) => {
		return item.id === event.data.id ? { ...item, name: event.data.name } : item
	})
	const getDeletedData = (): FoldersInterface[] => allFolders.filter((item) => item.id !== event.data.id)
	const getCreatedData = (): FoldersInterface[] => [event.data as never, ...allFolders]

	useEffect(() => {
		if (event.data !== undefined && Object.keys(event.data).length > 0) {
			let list: FoldersInterface[] = allFolders
			const process = { CREATE: getCreatedData, EDIT: getEditedData, DELETE: getDeletedData }
			list = process[event.action]()
			setAllFolders(list)
		}
	}, [event])


	const searchFolder = (query: string) => {
		const text = query.toLowerCase().trim()
		return allFolders.filter((item) =>
			item.name.toLowerCase().includes(text)
		)
	}

	return {
		search: (value: string) => {
			const results = searchFolder(value);
			const params = { command: SearchEnum.SEARCH, results}
			setEvent(params)
		}
	}
}

