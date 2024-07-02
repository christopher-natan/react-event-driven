import type { FoldersInterface } from '../interface/folders.interface'
import { useEffect, useState } from 'react'
import { useObserver } from '../hooks/use.observer'
import { useObservableStore } from '../hooks/observable.store'
import useSaveFolder from '../hooks/use.save'

export enum DeleteEnum {
	SHOW_DELETE = 'SHOW_DELETE',
	HIDE_DELETE = 'HIDE_DELETE'
}

export default function DeleteService() {
	const action = 'DELETE';
	const { event } = useObserver()
	const { setEvent } = useObservableStore()
	let params = { command: DeleteEnum.HIDE_DELETE, data: {}}
	const [id, setId] = useState(0)
	const [name, setName] = useState("")

	const { formik } = useSaveFolder({
		action,
		onSuccess: (folder: FoldersInterface) => {
			params = { ...params, data: folder, action: action }
			setEvent(params)
		}
	})

	useEffect(() => {
		if(event.deleteData !== undefined && Object.keys(event.deleteData).length > 0) {
			setId(event.deleteData.id);
			setName(event.deleteData.name);
			formik.setFieldValue('id', event.deleteData.id)
		}
	}, [event]);
	const getFolderName =  (): string => name

	return {
		formik: () => formik,
		setEvent: () => setEvent(params),
		getFolderName: () => getFolderName(),
		isProcessing: () => formik.isSubmitting || !formik.isValid
	}
}

