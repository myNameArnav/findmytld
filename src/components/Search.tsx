import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function isValidDomain(domain: string): boolean {
	const domainRegex = /^(?!\-)([a-zA-Z0-9\-]{1,63})(?<!\-)(\.[a-zA-Z0-9\-]{1,63})*$/;
	return domainRegex.test(domain);
}

interface SearchProps {
	initialValue?: string;
}

export function Search({ initialValue = '' }: SearchProps) {
	const [value, setValue] = useState(initialValue);
	const navigate = useNavigate();

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isValidDomain(value)) {
		navigate(`/${value}`);
		}
	};

	return (
		<div className="mb-8 flex items-center justify-center font-grotesk">
			<form
				onSubmit={handleSubmit}
				className="mx-auto flex w-full max-w-[60vw] flex-col items-center justify-center gap-4 md:flex-row"
				autoComplete="off"
			>
				<input
					className="w-full rounded-[10px] border-2 border-[#ddd] bg-white p-5 text-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 md:w-[30rem]"
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					id="domain"
					placeholder="Enter a domain name without TLD"
				/>
				<button
					className="flex w-full cursor-pointer items-center justify-center rounded-[10px] border-none bg-primary px-6 py-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-colors duration-300 hover:bg-primary-dark focus:outline-none focus:shadow-[0_4px_6px_rgba(0,123,255,0.2)] disabled:cursor-not-allowed disabled:bg-gray-500 md:w-auto"
					type="submit"
					disabled={!isValidDomain(value)}
					aria-label="Search domain availability"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path
							fill="white"
							d="M19 18H6c-2.8 0-5-2.2-5-5 0-2.2 1.4-4 3.5-4.7.7-3.2 3.4-5.3 6.5-5.3 3.5 0 6.4 2.6 6.9 6 2.1.3 3.6 2.1 3.6 4.3 0 2.5-2 4.7-4.5 4.7z"
						/>
					</svg>
				</button>
			</form>
		</div>
	);
}