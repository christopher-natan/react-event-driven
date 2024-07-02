import Button from 'components/Buttons/Button'
import { Input } from 'components/ui/input'
import EditService from '../services/edit.service'

interface EditComponentProps {
	isShow?: boolean
}

export default function EditComponent({ isShow }: EditComponentProps) {
	const editService = EditService()

	return (
		<div className="gap-1 w-full" style={{ display: isShow ? 'block' : 'none' }}>
			<div className={'p-2'}>
				<div className="pb-3 pl-1 mb-3">Edit Folder</div>
				<div>
					<Input
						error={editService.formik().errors.name}
						value={editService.formik().values.name}
						onChange={async e =>
							editService.formik().setFieldValue('name', e.target.value)
						}
						autofocus
						size="lg"
						name="column-name"
						maxlength="20"
						placeholder="Enter folder name"
						className="mt-0"
					/>
				</div>
				<div className="mt-10 flex w-full justify-end gap-3">
					<Button
						disabled={editService.isProcessing()}
						onClick={() => editService.setEvent()}
						variant="danger">Cancel
					</Button>
					<Button
						disabled={editService.isProcessing()}
						onClick={() => editService.formik().handleSubmit()}>
						Save
					</Button>
				</div>
			</div>
		</div>
	)
}