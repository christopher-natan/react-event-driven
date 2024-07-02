import Button from 'components/Buttons/Button'
import DeleteService from '../services/delete.service'

interface DeleteComponentProps {
	isShow?: boolean
}

export default function DeleteComponent({ isShow }: DeleteComponentProps) {
	const deleteService = DeleteService()

	return (
		<div style={{ display: isShow ? 'block' : 'none' }}>
			<div className="pb-5">
				<strong>Delete</strong>
			</div>
			<div>Are you sure you want to delete this {deleteService.getFolderName()}?</div>
			<div className="mt-10 flex w-full justify-end gap-3">
				<Button
					disabled={deleteService.isProcessing()}
					onClick={() => deleteService.setEvent()}
					variant="danger">Cancel
				</Button>
				<Button
					disabled={deleteService.isProcessing()}
					onClick={() => deleteService.formik().handleSubmit()}>
					Yes
				</Button>
			</div>
		</div>
	)
}