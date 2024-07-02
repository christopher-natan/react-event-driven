import SearchService from '../services/search.service'
import type { FoldersInterface } from '../interface/folders.interface'

interface SearchComponentProps {
	folders?: FoldersInterface[]
}

export default function SearchComponent({ folders }: SearchComponentProps) {
	const searchService = SearchService(folders)

	return (
		<div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm h-8">
			<svg
				className="h-4 w-4 text-gray-500 mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
				></path>
			</svg>
			<input
				onChange={async e =>
					searchService.search(e.target.value)
				}
				type="text"
				placeholder="Search"
				className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:ring-0"
			/>
		</div>
	)
}