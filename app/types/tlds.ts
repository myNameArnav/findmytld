interface DomainCategory {
  description: string;
  domains: string[];
}

interface DomainSubcategories {
  [key: string]: DomainCategory;
}

interface InternationalizedTLD {
  description: string;
  arabic: string[];
  chinese: string[];
  cyrillic: string[];
  other_scripts: string[];
}

export interface TopLevelDomainCategorization {
  country_code_tlds: DomainCategory;
  
  generic_tlds: {
    original: DomainCategory;
    infrastructure: DomainCategory;
  };
  
  sponsored_tlds: DomainCategory;
  
  brand_tlds: {
    technology: DomainCategory;
    automotive: DomainCategory;
    financial: DomainCategory;
    fashion_luxury: DomainCategory;
    retail: DomainCategory;
  };
  
  geographic_tlds: {
    cities: DomainCategory;
    regions: DomainCategory;
  };
  
  industry_category_tlds: {
    business_professional: DomainCategory;
    lifestyle_entertainment: DomainCategory;
    real_estate: DomainCategory;
    health_medical: DomainCategory;
    education: DomainCategory;
  };
  
  internationalized_tlds: InternationalizedTLD;
  
  miscellaneous: {
    new_generics: DomainCategory;
    novelty: DomainCategory;
  };
}
