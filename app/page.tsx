"use client";

import SearchForm from "./components/SearchForm";
import MiniCard from "./components/MiniCard";
import tlds from "./utils/tlds.json";
import React from "react";
import { TopLevelDomainCategorization } from "./types/tlds";

export default function Home() {
	const [domain, setDomain] = React.useState("");
	const [tldList, setTldList] = React.useState<TopLevelDomainCategorization>(
		tlds.data,
	);

	const allTLDs = [
		...tldList.country_code_tlds.domains,
		...tldList.generic_tlds.original.domains,
		...tldList.generic_tlds.infrastructure.domains,
		...tldList.sponsored_tlds.domains,
		...tldList.brand_tlds.technology.domains,
		...tldList.brand_tlds.automotive.domains,
		...tldList.brand_tlds.financial.domains,
		...tldList.brand_tlds.fashion_luxury.domains,
		...tldList.brand_tlds.retail.domains,
		...tldList.geographic_tlds.cities.domains,
		...tldList.geographic_tlds.regions.domains,
		...tldList.industry_category_tlds.business_professional.domains,
		...tldList.industry_category_tlds.lifestyle_entertainment.domains,
		...tldList.industry_category_tlds.real_estate.domains,
		...tldList.industry_category_tlds.health_medical.domains,
		...tldList.industry_category_tlds.education.domains,
		...tldList.internationalized_tlds.arabic,
		...tldList.internationalized_tlds.chinese,
		...tldList.internationalized_tlds.cyrillic,
		...tldList.internationalized_tlds.other_scripts,
		...tldList.miscellaneous.new_generics.domains,
		...tldList.miscellaneous.novelty.domains,
	];

	const handleSearchSubmit = (value: string) => {
		setDomain(value);
	};

	return (
		<div className="container mx-auto px-4 py-8 text-center">
			<SearchForm initialValue={domain} onSubmit={handleSearchSubmit} />

			<div className="mt-12">
				<ol className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{allTLDs.map((tld) => (
						<li key={tld} className="list-none">
							<MiniCard domain={domain} tld={tld} />
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
