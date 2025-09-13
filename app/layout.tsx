import "./globals.css";
import Header from "./components/Header";

export const metadata = {
	title: "Find My TLD",
	description: "Helps you find TLD for your domain",
};

const Footer = () => {
	return (
		<footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200 mt-auto">
			Made with ❤️ by{" "}
			<a
				href="https://x.com/myNameArnav"
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-600 hover:underline"
			>
				me
			</a>
		</footer>
	);
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-gray-50 min-h-screen flex flex-col">
				<Header />
				<main className="flex-grow container mx-auto px-4 py-8">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
