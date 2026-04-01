import { Listing, ListingSearchFilters } from '@/types/listings';

const API_KEY = process.env.SIMPLYRETS_API_KEY || 'simplyrets';
const API_SECRET = process.env.SIMPLYRETS_API_SECRET || 'simplyrets';
const BASE_URL = 'https://api.simplyrets.com';

// Create auth header for SimplyRETS API
function getAuthHeader(): HeadersInit {
  const credentials = `${API_KEY}:${API_SECRET}`;
  const encoded = typeof Buffer !== 'undefined' 
    ? Buffer.from(credentials).toString('base64')
    : btoa(credentials);
  
  return {
    'Authorization': `Basic ${encoded}`,
    'Accept': 'application/json',
  };
}

// Mock data for fallback when API fails
const mockListings: Listing[] = [
  {
    id: '1',
    mlId: 'MLS-001',
    address: {
      line: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'USA',
      lat: 34.0522,
      lon: -118.2437,
    },
    price: 850000,
    listDate: '2024-01-15',
    status: 'Active',
    propertyType: 'Residential',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    lotSize: 5000,
    yearBuilt: 2015,
    description: 'Beautiful modern home with open floor plan and updated kitchen.',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    ],
    office: {
      name: 'Premier Realty',
      phones: [{ number: '3105551234', type: 'Office' }],
    },
    agents: [{
      firstName: 'John',
      lastName: 'Doe',
      phones: [{ number: '3105555678', type: 'Mobile' }],
    }],
  },
  {
    id: '2',
    mlId: 'MLS-002',
    address: {
      line: '456 Oak Avenue',
      city: 'Beverly Hills',
      state: 'CA',
      postalCode: '90210',
      country: 'USA',
      lat: 34.0736,
      lon: -118.4004,
    },
    price: 2500000,
    listDate: '2024-01-10',
    status: 'Active',
    propertyType: 'Residential',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3500,
    lotSize: 8000,
    yearBuilt: 2020,
    description: 'Luxury estate with pool, spa, and stunning city views.',
    photos: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400',
    ],
    office: {
      name: 'Luxury Homes Realty',
      phones: [{ number: '3105559999', type: 'Office' }],
    },
    agents: [{
      firstName: 'Jane',
      lastName: 'Smith',
      phones: [{ number: '3105558888', type: 'Mobile' }],
    }],
  },
  {
    id: '3',
    mlId: 'MLS-003',
    address: {
      line: '789 Pine Boulevard',
      city: 'Santa Monica',
      state: 'CA',
      postalCode: '90401',
      country: 'USA',
      lat: 34.0195,
      lon: -118.4912,
    },
    price: 1200000,
    listDate: '2024-01-20',
    status: 'Active',
    propertyType: 'Condo',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    yearBuilt: 2018,
    description: 'Modern condo near the beach with ocean views and amenities.',
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    ],
    office: {
      name: 'Coastal Realty',
      phones: [{ number: '3105557777', type: 'Office' }],
    },
    agents: [{
      firstName: 'Bob',
      lastName: 'Wilson',
      phones: [{ number: '3105556666', type: 'Mobile' }],
    }],
  },
  {
    id: '4',
    mlId: 'MLS-004',
    address: {
      line: '321 Elm Street',
      city: 'Pasadena',
      state: 'CA',
      postalCode: '91101',
      country: 'USA',
      lat: 34.1478,
      lon: -118.1445,
    },
    price: 950000,
    listDate: '2024-01-05',
    status: 'Active',
    propertyType: 'Residential',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    lotSize: 6000,
    yearBuilt: 2010,
    description: 'Charming family home with large backyard and updated interiors.',
    photos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
    ],
    office: {
      name: 'Family Homes Realty',
      phones: [{ number: '6265551234', type: 'Office' }],
    },
    agents: [{
      firstName: 'Alice',
      lastName: 'Brown',
      phones: [{ number: '6265555678', type: 'Mobile' }],
    }],
  },
  {
    id: '5',
    mlId: 'MLS-005',
    address: {
      line: '555 Market Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'USA',
      lat: 37.7749,
      lon: -122.4194,
    },
    price: 1800000,
    listDate: '2024-01-12',
    status: 'Active',
    propertyType: 'Condo',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    yearBuilt: 2019,
    description: 'Urban living at its finest with city views and modern finishes.',
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    ],
    office: {
      name: 'Bay Area Realty',
      phones: [{ number: '4155551234', type: 'Office' }],
    },
    agents: [{
      firstName: 'Charlie',
      lastName: 'Davis',
      phones: [{ number: '4155555678', type: 'Mobile' }],
    }],
  },
];

/**
 * Fetch listings from SimplyRETS API
 * Falls back to mock data if API fails
 */
export async function fetchListings(filters: ListingSearchFilters = {}): Promise<Listing[]> {
  try {
    // Build query params
    const params = new URLSearchParams();
    
    // SimplyRETS uses different param names
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    if (filters.zip) params.append('postalCode', filters.zip);
    if (filters.priceMin) params.append('minprice', filters.priceMin.toString());
    if (filters.priceMax) params.append('maxprice', filters.priceMax.toString());
    if (filters.bedroomsMin) params.append('minbeds', filters.bedroomsMin.toString());
    if (filters.propertyType) params.append('type', filters.propertyType);
    
    // Exclude sold listings by default
    if (!filters.status) {
      params.append('status', 'Active');
    } else {
      params.append('status', filters.status);
    }

    const url = `${BASE_URL}/api/properties?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter out sold listings (status should not be "Sold")
    const activeListings = data.filter((listing: Listing) => 
      listing.status !== 'Sold' && listing.status !== 'Closed'
    );
    
    return activeListings;
  } catch (error) {
    console.error('SimplyRETS API failed, using mock data:', error);
    
    // Filter mock data based on filters
    let filtered = mockListings.filter(listing => listing.status !== 'Sold');
    
    if (filters.city) {
      filtered = filtered.filter(l => 
        l.address.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    if (filters.state) {
      filtered = filtered.filter(l => 
        l.address.state.toLowerCase().includes(filters.state!.toLowerCase())
      );
    }
    if (filters.zip) {
      filtered = filtered.filter(l => 
        l.address.postalCode.includes(filters.zip!)
      );
    }
    if (filters.priceMin) {
      filtered = filtered.filter(l => l.price >= filters.priceMin!);
    }
    if (filters.priceMax) {
      filtered = filtered.filter(l => l.price <= filters.priceMax!);
    }
    if (filters.bedroomsMin) {
      filtered = filtered.filter(l => l.bedrooms >= filters.bedroomsMin!);
    }
    
    return filtered;
  }
}

/**
 * Search listings by ZIP code
 */
export async function searchByZip(zipCode: string): Promise<Listing[]> {
  return fetchListings({ zip: zipCode });
}

/**
 * Get a single listing by ID
 */
export async function getListingById(id: string): Promise<Listing | null> {
  try {
    const url = `${BASE_URL}/api/properties/${id}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch listing:', error);
    return mockListings.find(l => l.id === id) || null;
  }
}
