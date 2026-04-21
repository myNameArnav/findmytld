import { useParams } from 'react-router-dom';
import { Search } from '../components/Search';
import { MiniCard } from '../components/MiniCard';
import tlds from '../data/tlds.json';

const tldList: string[] = tlds.top150;

export function Results() {
	const { slug } = useParams();
	const domain = slug || '';

	return (
		<div className="flex flex-col items-center font-grotesk">
			<div className="mb-4 flex w-full justify-center">
				<Search key={domain} initialValue={domain} />
			</div>
			<ol className="m-0 flex w-[80vw] flex-wrap list-none justify-center gap-4 p-0">
				{tldList.map((tld) => (
					<li key={tld}>
						<MiniCard domain={domain} tld={tld} />
					</li>
				))}
			</ol>
		</div>
	);
}