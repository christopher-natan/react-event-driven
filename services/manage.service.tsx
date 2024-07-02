import { useEffect, useRef, useState } from 'react'
import type { FoldersInterface } from '../interface/folders.interface'
import { EditEnum } from './edit.service'
import { DeleteEnum } from './delete.service'
import { CreateEnum } from './create.service'
import { useObserver } from '../hooks/use.observer'
import '../css/folders.css'

export enum ManageEnum {
	SHOW_MANAGE = 'SHOW_MANAGE'
}

export default function ManageService(folders: never[]) {
	const { event } = useObserver()
	const [isShowManage, setIsShowManage] = useState(false)
	const [allFolders, setAllFolders] = useState(folders)
	const buttonRef = useRef(null)
	const showManage = () => {
		if (buttonRef.current) { buttonRef.current.click() }
	}
	const getEditedData = (): FoldersInterface[] => {
		return allFolders.map((item: FoldersInterface) => {
				return item.id === event.data.id ? { ...item, name: event.data.name } : item
			}
		)
	}
	const getDeletedData = (): FoldersInterface[] => allFolders.filter((item) => item.id !== event.data.id)
	const getCreatedData = (): FoldersInterface[] => [event.data as never, ...allFolders]

	useEffect(() => {
		let list: FoldersInterface[] = allFolders
		if (event.data !== undefined && Object.keys(event.data).length > 0) {
			const process = { CREATE: getCreatedData, EDIT: getEditedData, DELETE: getDeletedData }
			list = process[event.action]()
			setAllFolders(list)
		}

		if (event.command === 'SHOW_EDIT' || event.command === 'SHOW_DELETE') { showManage() }
		if (event.command === 'SEARCH') {
			setAllFolders(event.results)
		}
	}, [event])

	const setManage = (isUseState: boolean) => {
		setIsShowManage(isUseState)
		setAllFolders(folders)
	}

	const divideIntoColumns = (numColumns: number): FoldersInterface[][] => {
		const columns: FoldersInterface[][] = Array.from({ length: numColumns }, () => []);
		allFolders.forEach((item, index) => {
			columns[index % numColumns].push(item);
		});
		return columns;
	};

	const setOnDragEnd = (result: { destination: { index: number }; source: { index: number } }) => {
		if (!result.destination) return
		const reorderedItems = Array.from(allFolders)
		const [removed] = reorderedItems.splice(result.source.index, 1)
		reorderedItems.splice(result.destination.index, 0, removed)
		setAllFolders(reorderedItems)
	}

	return {
		getConfig: () => {
			return { width: '38em', marginRight: '20px' }
		},
		isCreate: (): boolean => event.command === CreateEnum.SHOW_CREATE,
		isEdit: (): boolean => event.command === EditEnum.SHOW_EDIT,
		isDelete: (): boolean => event.command === DeleteEnum.SHOW_DELETE,
		isManage: (): boolean => event.command === ManageEnum.SHOW_MANAGE || isShowManage,
		setManage: (isUseState: boolean) => setManage(isUseState),
		getFolders: () => allFolders,
		buttonRef: () => buttonRef,
		getColumns: () => divideIntoColumns(3),
		onDragEnd: setOnDragEnd
	}
}

