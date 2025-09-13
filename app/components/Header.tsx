import Link from "next/link";

const Header = () => {
	return (
		<header className="border-b border-gray-200 bg-white sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4">
				<Link href="/" className="text-3xl font-bold text-blue-500">
					FindMyTLD
				</Link>
			</div>
		</header>
	);
};

export default Header;
