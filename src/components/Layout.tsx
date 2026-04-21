import { Outlet, Link } from 'react-router-dom';

export function Layout() {
	return (
		<div className="flex min-h-screen flex-col bg-[#f9f9f9] font-grotesk text-[#333]">
			<header className="bg-white py-4 text-center shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
				<Link to="/" className="text-inherit no-underline">
					<p className="mb-2 font-playwrite text-4xl text-primary">Find my TLD</p>
				</Link>
			</header>
			<main className="flex flex-1 flex-col items-center p-8">
				<Outlet />
			</main>
			<footer className="border-t border-[#eee] bg-white py-4 text-center text-sm">
				<p className="m-0">
					Made with &lt;3 by{' '}
					<a
						href="https://x.com/myNameArnav"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary no-underline hover:underline"
					>
						me
					</a>
				</p>
			</footer>
		</div>
	);
}