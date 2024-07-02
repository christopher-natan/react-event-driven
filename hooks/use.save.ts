import { AuthContext } from 'context/AuthContext'
import { useFormik } from 'formik'
import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { toast } from 'sonner'
import type { FoldersInterface } from '../interface/folders.interface'
import * as Yup from 'yup'
import FoldersApi from '../api/folders.api'
import { useAppSelector } from 'app/hooks'

export default function useSaveFolder({ action, onSuccess, close }: {action: string, onSuccess?: (folder: FoldersInterface) => void, close?: () => void }) {
	const foldersApi = FoldersApi();
	const { authUser } = useContext(AuthContext)
	const isCreate: boolean = action === 'CREATE';
	const isDelete: boolean = action === 'DELETE';
	const messages = {CREATE: 'New Folder Created', EDIT: 'Folder Saved', DELETE: 'Folder Deleted'}
	const {data} = useAppSelector(state => state.company)

	const validation = () => {
		return {
			name: Yup.string().required('Folder is required').test('unique', 'Folder already exists', async (value: string) => {
				return true;
			})
		}
	}
	const validationSchema = Yup.object(isDelete ? {} : validation())
	const saveProcess = async (folder: FoldersInterface) => {
		await foldersApi.createEdit(data?.id, folder);
	}

	const deleteProcess = async (folder: FoldersInterface) => {
		await foldersApi.delete(data?.id, folder.id);
	}

	const formik = useFormik({
		initialValues: { id: '', name: '', manage: true },
		validationSchema,
		onSubmit: async (values: FoldersInterface) => {
			if (!authUser) return
			try {
				const id = isCreate ? nanoid() : values.id;
				const folder: FoldersInterface = { id, name: values.name, manage: true }
				formik.setSubmitting(true)
				close?.()
				action === 'DELETE' ? await deleteProcess(folder) : await saveProcess(folder);
				toast.success(messages[action], { description: '' })
				onSuccess?.(folder)
			} catch (error: {message: string}) {
				toast.error(error.message)
			} finally {
				formik.setSubmitting(false)
				formik.resetForm()
			}
		}
	})

	return { formik }
}
