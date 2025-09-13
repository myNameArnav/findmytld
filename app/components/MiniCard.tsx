import { useState, useEffect } from "react";
import { Ban, CircleAlert, CircleCheck, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatusIndicatorProps {
	status: number | null;
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
	if (status === undefined || status === null) {
		return (
			<div className="w-6 h-6 rounded-full animate-spin">
				<Loader />
			</div>
		);
	}

	switch (status) {
		case 0:
			return (
				<div className="w-6 h-6 rounded-full">
					<Ban />
				</div>
			);
		case 2:
		case 5:
			return (
				<div className="w-6 h-6 rounded-full">
					<CircleAlert />
				</div>
			);
		default:
			return (
				<div className="w-6 h-6 rounded-full">
					<CircleCheck />
				</div>
			);
	}
};

interface MiniCardProps {
	domain: string;
	tld: string;
}

const MiniCard = ({ domain, tld }: MiniCardProps) => {
	const [status, setStatus] = useState<number | null>(null);
	const [innerWidth, setInnerWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1080,
	);

	useEffect(() => {
		const handleResize = () => setInnerWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const checkDomainStatus = async (url: string) => {
		try {
			const response = await fetch(
				`https://cloudflare-dns.com/dns-query?name=${url}`,
				{
					headers: {
						accept: "application/dns-json",
					},
				},
			);
			const data = await response.json();
			setStatus(data.Status);
		} catch (error) {
			console.error(error);
			setStatus(-1);
		}
	};

	useEffect(() => {
		const url = `${domain.toLowerCase()}.${tld.toLowerCase()}`;
		checkDomainStatus(url);
	}, [domain, tld]);

	const maxDomainLen = 480;

	const displayedDomain =
		domain.length >= maxDomainLen && innerWidth > 480
			? ""
			: domain.substring(0, maxDomainLen);

	return (
		<Link
			href={`https://${domain.toLowerCase()}.${tld.toLowerCase()}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div
				className={cn(
					"bg-green-200 p-4 rounded-lg shadow-md w-full mb-4 flex justify-between items-center border border-gray-200",
					status === 0 && "opacity-50 bg-red-200",
					status === 2 || status === 5 ? "bg-yellow-200" : "",
				)}
			>
				<div id="url" className="flex-grow">
					{displayedDomain}
					<strong>.{tld.toLowerCase()}</strong>
				</div>
				<div className="ml-4">
					<StatusIndicator status={status} />
				</div>
			</div>
		</Link>
	);
};

export default MiniCard;
