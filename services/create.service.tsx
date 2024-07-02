import type { FoldersInterface } from '../interface/folders.interface'
import { useObservableStore } from '../hooks/observable.store'
import useSaveFolder from '../hooks/use.save'

export enum CreateEnum {
	SHOW_CREATE = 'SHOW_CREATE',
	HIDE_CREATE = 'HIDE_CREATE',
}

export default function CreateService() {
	const action = 'CREATE'
	const { setEvent } = useObservableStore()
	let params = { command: CreateEnum.HIDE_CREATE, data: {} }
	const { formik } = useSaveFolder({
		action,
		onSuccess: (folder: FoldersInterface) => {
			params = { ...params, data: folder, action: action }
			setEvent(params)
		}
	})

	return {
		formik: () => formik,
		setEvent: () => setEvent(params),
		isProcessing: () => formik.isSubmitting || !formik.isValid
	}
}

