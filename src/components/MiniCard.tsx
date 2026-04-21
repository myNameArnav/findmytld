import { useRef, useEffect, useState } from 'react';
import { useDomainStatus } from '../hooks/useDomainStatus';

interface MiniCardProps {
	domain: string;
	tld: string;
}

export function MiniCard({ domain, tld }: MiniCardProps) {
	const url = `${domain.toLowerCase()}.${tld.toLowerCase()}`;
	const { data: status, isLoading, isError, refetch } = useDomainStatus(url);
	const urlElementRef = useRef<HTMLDivElement>(null);
	const [innerWidth, setInnerWidth] = useState(1080);
	const [maxDomainLen, setMaxDomainLen] = useState(8);

	useEffect(() => {
		setInnerWidth(window.innerWidth);
		const handleResize = () => setInnerWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (urlElementRef.current) {
			const cardWidth = urlElementRef.current.offsetWidth;
			const tldWidthEstimate = tld.length * 8;
			const availableWidth = cardWidth - tldWidthEstimate - 20;
			const maxDomainChars = Math.floor(availableWidth / 7);
			setMaxDomainLen(Math.max(0, maxDomainChars));
		}
	}, [tld]);

	const statusIndicator = (() => {
		if (isError) {
			return (
				<button
					onClick={() => refetch()}
					className="flex h-6 w-6 items-center justify-center rounded-full bg-failure text-xs text-white"
					aria-label="Error - click to retry"
				>
					↻
				</button>
			);
		}
		if (isLoading || status === undefined) {
			return (
				<span className="inline-block h-6 w-6 rounded-full bg-loading" role="status">
					<span className="sr-only">Loading</span>
				</span>
			);
		}
		if (status === 0) {
			return (
				<span className="inline-block h-6 w-6 rounded-full bg-failure" role="status">
					<span className="sr-only">Not Available</span>
				</span>
			);
		}
		if (status === 2 || status === 5) {
			return (
				<span className="inline-block h-6 w-6 rounded-full bg-warning" role="status">
					<span className="sr-only">Server Error</span>
				</span>
			);
		}
		return (
			<span className="inline-block h-6 w-6 rounded-full bg-success" role="status">
				<span className="sr-only">Available</span>
			</span>
		);
	})();

	return (
		<div className="font-grotesk">
			<div className="flex w-60 items-center justify-between rounded-[10px] border-2 border-[#ddd] bg-white p-[25px] text-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 max-[480px]:w-[70vw] max-[480px]:flex-col max-[480px]:items-start max-[480px]:p-[15px] max-[480px]:text-base max-[480px]:text-left">
				<div
					ref={urlElementRef}
					className="flex-grow whitespace-nowrap overflow-hidden text-ellipsis max-[480px]:mb-[10px] max-[480px]:whitespace-normal"
				>
					{domain.length >= maxDomainLen && innerWidth > 480 ? (
						<span title={url}>
							<strong className="max-[480px]:block">.{tld.toLowerCase()}</strong>
						</span>
					) : (
						<span title={url}>
							{domain.toLowerCase().substring(0, maxDomainLen)}
							<strong className="max-[480px]:block">.{tld.toLowerCase()}</strong>
						</span>
					)}
				</div>
				<div className="flex items-center justify-center max-[480px]:self-end">{statusIndicator}</div>
			</div>
		</div>
	);
}