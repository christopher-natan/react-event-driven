import ManageComponent from '../components/manage.component'
import FoldersService from '../services/folders.service'

export default function FoldersView() {
	const foldersService = FoldersService()

	return (
			<div className="flex items-center justify-between px-3 p-2">
				{foldersService.getLatestFolders()}
				<ManageComponent folders={foldersService.getFolders()}></ManageComponent>
			</div>
	)
}
