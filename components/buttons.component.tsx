import Button from 'components/Buttons/Button'
import { CreateEnum } from '../services/create.service'
import { useObservableStore } from '../hooks/observable.store'

interface ButtonsComponentProps {
	setManage?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function ButtonsComponent({ setManage }: ButtonsComponentProps) {
	const { setEvent } = useObservableStore()
	const params = { command: CreateEnum.SHOW_CREATE }

	return (
		<div className="mt-10 flex w-full justify-end gap-3">
			<Button
				onClick={() => setManage ? setManage(false) : {}}
				variant="danger">Close
			</Button>
			<Button
				onClick={() => setEvent(params)}>
				Create Folder
			</Button>
		</div>
	)
}