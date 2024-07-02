import { PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '../../platejs/components/plate-ui/popover'
import ItemService from '../services/item.service'

interface FolderComponentProps {
	data?: { name: string; id: number; manage: boolean }
}

export default function ItemComponent({ data }: FolderComponentProps) {
	const itemService = ItemService(data)

	const menu = () => {
		const popover = <Popover modal={false}>
			<PopoverTrigger><a className="dots" ref={itemService.getItemReference()}></a></PopoverTrigger>
			<PopoverPortal>
				<PopoverContent className="PopoverContent bg-white" style={{ width: 100 }} sideOffset={5}>
					<div>
						<div className="pb-3 text-xs">
							<div className="pb-2">
								<a onClick={() => itemService.onClickEdit()} href="#"
									 className="flex justify-start align-middle align-center text-center">
									<svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
											 fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
										<path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
										<line x1="16" y1="5" x2="19" y2="8" />
									</svg>
									Edit
								</a>
							</div>
							<hr />
							<div className="pt-2">
								<a onClick={() => itemService.onClickDelete()} href="#"
									 className="flex justify-start align-middle align-center text-center">
									<svg className="h-5 w-5 text-gray-500 mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
											 stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" />
										<line x1="4" y1="7" x2="20" y2="7" />
										<line x1="10" y1="11" x2="10" y2="17" />
										<line x1="14" y1="11" x2="14" y2="17" />
										<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
									</svg>
									Delete
								</a>
							</div>
						</div>
					</div>
				</PopoverContent>
			</PopoverPortal>
		</Popover>
		return data?.manage ? popover : (<div />)
	}

	return (
		<div
			className="flex items-center justify-between my-2 rounded p-2 pl-4 pr-4 text-xs font-medium  leading-tight bg-zinc-100 text-blue-800 m-1 w-full">
			<div className="w-fit">
				<svg className="h-4 w-4 text-blue-800 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"
						 strokeWidth="2"
						 strokeLinecap="round" strokeLinejoin="round">
					<path
						d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
				</svg>
			</div>
			<div className="w-full pl-2 text-center">
				<strong>{data?.name}</strong>
			</div>
			<div className="w-0 pl-2">{menu()}
			</div>
		</div>
	)
}	