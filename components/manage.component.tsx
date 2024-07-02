import { Popover, PopoverContent } from '../../platejs/components/plate-ui/popover'
import { PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import ButtonsComponent from './buttons.component'
import DeleteComponent from './delete.component'
import EditComponent from './edit.component'
import CreateComponent from './create.component'
import ManageService from '../services/manage.service'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ItemComponent from './item.component'
import SearchComponent from './search.component'

interface ManageComponentProps {
	folders: []
}

export default function ManageComponent({ folders }: ManageComponentProps) {
	const manageService = ManageService(folders)

	const getDraggable = (item: { name: string; id: number; manage: boolean } | undefined, index: number) => {
		return (
			<Draggable key={item.id} draggableId={item.id} index={index}>
				{(provided, snapshot) => (
					<>
					<div
						ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
							 style={{ ...provided.draggableProps.style}}>
						<ItemComponent data={item} />
					</div>
						{snapshot.isDragging && (<ItemComponent data={item}  />)}
					</>
				)}
			</Draggable>
		)
	}

	return (
		<div
			className="my-2 block rounded px-4 pb-2 pt-2 text-xs font-medium  leading-tight bg-zinc-100 text-blue-800  m-1">
			<div className="flex items-center justify-between">
				<Popover modal={false} open={manageService.isManage() || manageService.isManage()}>
					<PopoverTrigger onClick={() => manageService.setManage(true)} ref={manageService.buttonRef()}>
						<div className="text-md h-0.5-px">
							<strong>...</strong>
						</div>
					</PopoverTrigger>
					<PopoverPortal>
						<PopoverContent className="PopoverContent bg-white" sideOffset={5} style={{
							width: manageService.getConfig().width,
							marginRight: manageService.getConfig().marginRight
						}}>
							<div style={{ display: manageService.isCreate() || manageService.isEdit() || manageService.isDelete() ? 'none' : 'block' }}>
								<div className="flex justify-between mb-5">
									<div className="pb-3"> Manage Folders</div>
									<div className="flex-initial w-64 ...">
										<SearchComponent folders={manageService.getFolders()} />
									</div>
								</div>

								<DragDropContext onDragEnd={manageService.onDragEnd}>
									<Droppable droppableId="droppable">
										{(provided) => (
											<div className="grid grid-cols-3 gap-1 " {...provided.droppableProps} ref={provided.innerRef}>
												{manageService.getFolders().map((item, index) => (getDraggable(item, index)))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>

								<hr className="mt-4 mb-2" />
								<ButtonsComponent setManage={manageService.setManage}></ButtonsComponent>
							</div>
							<DeleteComponent isShow={manageService.isDelete()}></DeleteComponent>
							<EditComponent isShow={manageService.isEdit()}></EditComponent>
							<CreateComponent isShow={manageService.isCreate()}></CreateComponent>
						</PopoverContent>
					</PopoverPortal>
				</Popover>
			</div>
		</div>
	)
}