import Button from 'components/Buttons/Button'
import { Input } from 'components/ui/input'
import CreateService from '../services/create.service'

interface CreateComponentProps {
	isShow?: boolean
}

export default function CreateComponent({ isShow }: CreateComponentProps) {
	const createService = CreateService()

	return (
		<div className="gap-1 w-full" style={{ display: isShow ? 'block' : 'none' }}>
			<div className="p-2">
				<div className="pb-3 pl-1 mb-3">Create Folder</div>
				<div>
					<Input
						error={createService.formik().errors.name}
						value={createService.formik().values.name}
						onChange={async e =>
							createService.formik().setFieldValue('name', e.target.value)
						}
						autofocus
						size="lg"
						name="column-name"
						placeholder="Enter folder name"
						maxlength="20"
						className="mt-0"
					/>
				</div>
				<div className="mt-10 flex w-full justify-end gap-3">
					<Button
						disabled={createService.isProcessing()}
						onClick={() => createService.setEvent()}
						variant="danger">Back
					</Button>
					<Button
						disabled={createService.isProcessing()}
						onClick={() => createService.formik().handleSubmit()}>
						Create
					</Button>
				</div>
			</div>
		</div>
	)
}