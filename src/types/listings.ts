export interface Listing {
  id: string;
  mlId: string;
  address: {
    line: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    lat?: number;
    lon?: number;
  };
  price: number;
  listDate: string;
  status: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt?: number;
  description: string;
  photos: string[];
  office?: {
    name: string;
    phones?: Array<{ number: string; type: string }>;
  };
  agents?: Array<{
    firstName: string;
    lastName: string;
    phones?: Array<{ number: string; type: string }>;
  }>;
  features?: {
    text?: string[];
  };
}

export interface ListingSearchFilters {
  city?: string;
  state?: string;
  zip?: string;
  priceMin?: number;
  priceMax?: number;
  bedroomsMin?: number;
  propertyType?: string;
  status?: string;
}
