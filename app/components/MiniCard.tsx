import * as React from "react";

interface StatusIndicatorProps {
	status: number | null;
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
	if (status === undefined) {
		return (
			<div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse"></div>
		);
	}

	switch (status) {
		case 0:
			return <div className="w-6 h-6 rounded-full bg-red-500"></div>;
		case 2:
		case 5:
			return <div className="w-6 h-6 rounded-full bg-yellow-500"></div>;
		default:
			return <div className="w-6 h-6 rounded-full bg-green-500"></div>;
	}
};

interface MiniCardProps {
	domain: string;
	tld: string;
}

const MiniCard = ({ domain, tld }: MiniCardProps) => {
	const [status, setStatus] = React.useState<number | null>(null);
	const [innerWidth, setInnerWidth] = React.useState(
		typeof window !== "undefined" ? window.innerWidth : 1080,
	);

	React.useEffect(() => {
		const handleResize = () => setInnerWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const updateMaxDomainLen = () => {
		if (!document.getElementById("url")) return 8;
		const cardWidth = document.getElementById("url")!.offsetWidth;
		const tldWidthEstimate = tld.length * 8;
		const availableWidth = cardWidth - tldWidthEstimate - 20;
		return Math.max(0, Math.floor(availableWidth / 7));
	};

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

	React.useEffect(() => {
		const url = `${domain.toLowerCase()}.${tld.toLowerCase()}`;
		checkDomainStatus(url);
	}, [domain, tld]);

	const maxDomainLen = updateMaxDomainLen();

	const displayedDomain =
		domain.length >= maxDomainLen && innerWidth > 480
			? ""
			: domain.substring(0, maxDomainLen);

	return (
		<div className="bg-white p-4 rounded-lg shadow-md w-full mb-4 flex justify-between items-center border border-gray-200">
			<div id="url" className="flex-grow">
				{displayedDomain}
				<strong>.{tld.toLowerCase()}</strong>
			</div>
			<div className="ml-4">
				<StatusIndicator status={status} />
			</div>
		</div>
	);
};

export default MiniCard;
