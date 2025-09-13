import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchFormProps {
	initialValue?: string;
	onSubmit?: (value: string) => void;
}

const SearchForm = ({ initialValue = "", onSubmit }: SearchFormProps) => {
	const [inputValue, setInputValue] = useState(initialValue);
	const [isSearchable, setIsSearchable] = useState(!!inputValue);

	const validateDomain = (value: string): boolean => {
		const domainRegex =
			/^(?!\-)([a-zA-Z0-9\-]{1,63})(?<!\-)(\.[a-zA-Z0-9\-]{1,63})*$/;
		return domainRegex.test(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue) {
			setIsSearchable(false);
			return;
		}
		if (validateDomain(inputValue) && onSubmit) {
			onSubmit(inputValue);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
			<div className="relative flex items-center">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter a domain name without TLD"
					className="w-full px-4 py-3 border border-gray-300 rounded-l-lg h-12 focus:ring-0 focus:outline-0"
					autoFocus
				/>
				<button
					type="submit"
					className={cn(
						"px-4 py-3 bg-blue-600 text-white rounded-r-lg font-medium transition-all h-12",
						!isSearchable && "hover:bg-blue-700",
					)}
				>
					<Search />
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
