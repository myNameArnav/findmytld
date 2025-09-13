import { useState, useEffect } from "react";

interface SearchFormProps {
	initialValue?: string;
	onSubmit?: (value: string) => void;
}

const SearchForm = ({ initialValue = "", onSubmit }: SearchFormProps) => {
	const [inputValue, setInputValue] = useState(initialValue);
	const [isDisabled, setIsDisabled] = useState(true);

	const validateDomain = (value: string): boolean => {
		const domainRegex =
			/^(?!\-)([a-zA-Z0-9\-]{1,63})(?<!\-)(\.[a-zA-Z0-9\-]{1,63})*$/;
		return domainRegex.test(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateDomain(inputValue) && onSubmit) {
			onSubmit(inputValue);
		}
	};

	useEffect(() => {
		setIsDisabled(!validateDomain(inputValue));
	}, [inputValue]);

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
			<div className="relative flex items-center">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter a domain name without TLD"
					className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				<button
					type="submit"
					disabled={isDisabled}
					className={`px-6 py-3 bg-blue-600 text-white rounded-r-lg font-medium transition-all ${
						isDisabled
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-blue-700"
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" y1="3" x2="12" y2="15" />
					</svg>
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
