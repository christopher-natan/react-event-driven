import type { FoldersInterface } from '../interface/folders.interface'
import { useEffect, useRef, useState } from 'react'
import { useObserver } from '../hooks/use.observer'
import { useObservableStore } from '../hooks/observable.store'
import useSaveFolder from '../hooks/use.save'

export enum EditEnum {
	SHOW_EDIT = 'SHOW_EDIT',
	HIDE_EDIT = 'HIDE_EDIT'
}

export default function EditService() {
	const action = 'EDIT';
	const { event } = useObserver()
	const { setEvent } = useObservableStore()
	let params = { command: EditEnum.HIDE_EDIT, data: {}}
	const inputReference  = useRef(null);
	const [data, setData] = useState<FoldersInterface>({ manage: false, name: '', id: 0})

	const { formik } = useSaveFolder({action,
		onSuccess: (folder: FoldersInterface) => {
			params = { ...params, data: folder, action: action }
			setEvent(params)
		}
	})

	useEffect(() => {
		if(event.editData !== undefined && Object.keys(event.editData).length > 0) {
			setData(event.editData);
			formik.setFieldValue('id', event.editData.id)
			formik.setFieldValue('name', event.editData.name)
		}
	}, [event]);

	return {
		formik: () => formik,
		setEvent: () => setEvent(params),
		isProcessing: () => formik.isSubmitting || !formik.isValid,
		getInputReference: () => inputReference
	}
}

