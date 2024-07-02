import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import type { FoldersInterface } from '../interface/folders.interface'
import { firestore } from 'lib/firebase'
import type { ICompany } from 'interfaces'

export default function FoldersApi() {
	const collectionReference = collection(firestore, 'folders')
	const items = 'items';

	const save = async (companyId: string | undefined, folder: FoldersInterface) => {
		const documentReference = doc(collectionReference, companyId)
		const subCollection = collection(documentReference, items)
		const subCollectionReference = doc(subCollection, folder.id)
		await setDoc(subCollectionReference, folder, { merge: true })
	}

	const createEditFolder = async (companyId: string | undefined, folder: FoldersInterface) => {
			await save(companyId, folder);
	}

	const fetch = async (companyData:   ICompany | null ) => {
		const documentReference = doc(collectionReference, companyData?.id)
		const subCollection = collection(documentReference, items)
		return getDocs(subCollection);
	}

	const deleteFolder = async (companyId:  string, folderId: string) => {
		const documentReference = doc(collectionReference, companyId)
		const subCollection = collection(documentReference, items)
		const documentRef = doc(subCollection, folderId.trim())
		await deleteDoc(documentRef)
	}

	return {
		fetch: (companyData:  ICompany | null) => fetch(companyData),
		delete: (companyId:  ICompany | null, folderId: string) => deleteFolder(companyId, folderId),
		createEdit: (companyId: string | undefined, data: FoldersInterface) => createEditFolder(companyId, data),
	}
}