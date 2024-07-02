import { useObservableStore } from '../hooks/observable.store'
import { EditEnum } from './edit.service'
import { DeleteEnum } from './delete.service'
import { useRef } from 'react'

export default function ItemService(data: { name: string; id: number; manage: boolean } | undefined) {
	const { setEvent } = useObservableStore()
	const paramsDelete = { command: DeleteEnum.SHOW_DELETE, deleteData: { id: data?.id, name: data?.name } }
	const paramsEdit = { command: EditEnum.SHOW_EDIT, editData: { id: data?.id, name: data?.name } }
	const itemReference  = useRef(null);
	const onClickEdit = async () => {
		setEvent(paramsEdit)
		await hidePopup()
	}
	const onClickDelete = async () => {
		setEvent(paramsDelete)
		await hidePopup()
	}

	const hidePopup = async () => {
		if (itemReference.current) itemReference.current.click();
	};

	return {
		onClickDelete: () => onClickDelete(),
		onClickEdit: () => onClickEdit(),
		getItemReference: () => itemReference,
	}
}

