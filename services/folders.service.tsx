import { useEffect, useState } from 'react'
import ItemComponent from '../components/item.component'
import FoldersApi from '../api/folders.api'
import { useAppSelector } from 'app/hooks'
import { useObserver } from '../hooks/use.observer'
import type { FoldersInterface } from '../interface/folders.interface'

export default function FoldersService() {
	const { event } = useObserver()
	const latest: JSX.Element[] = []
	let [folders, setFolders] = useState([])
	const { data } = useAppSelector(state => state.company)

	useEffect(() => {
		const foldersApi = FoldersApi()
		foldersApi.fetch(data).then((results) => {
			const snapshot = results.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setFolders(snapshot)
		})
	}, [])

	const getEditedData = (): FoldersInterface[] => {
		return folders.map((item: FoldersInterface) => item.id === event.data.id ? {
			...item,
			name: event.data.name
		} : item)
	}
	const getDeletedData = (): FoldersInterface[] => folders.filter((item) => item['id'] !== event.data.id)
	const getCreatedData = (): FoldersInterface[] => [event.data as never, ...folders]

	useEffect(() => {
		const process = { CREATE: getCreatedData, EDIT: getEditedData, DELETE: getDeletedData }
		if (event.data !== undefined && Object.keys(event.data).length > 0) {
			folders = process[event.action]()
			setFolders(folders)
		}
	}, [event])

	return {
		getLatestFolders: () => {
			for (const folder of folders) {
				latest.push(<ItemComponent data={folder} />)
			}
			return latest.splice(0, 2)
		},
		getFolders: () => folders,
		getState: () => setFolders
	}
}

