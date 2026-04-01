'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ListingsSearchBar from '@/components/ListingsSearchBar';
import ListingsGrid from '@/components/ListingsGrid';
import { Listing, ListingSearchFilters } from '@/types/listings';
import { fetchListings } from '@/lib/simplyRets';

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchListings = async (filters: ListingSearchFilters = { status: 'Active' }) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await fetchListings(filters);
      setListings(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load listings');
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial listings on mount
  useEffect(() => {
    searchListings({ status: 'Active' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Agents
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Property Listings</h1>
            </div>
            <div className="text-sm text-gray-600">
              {listings.length} listing{listings.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <ListingsSearchBar onSearch={searchListings} isLoading={isLoading} />

        {/* Results Info */}
        {hasSearched && !isLoading && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {listings.length} active listing{listings.length !== 1 ? 's' : ''}
            {listings.length > 0 && (
              <span className="ml-2 text-green-600 flex items-center gap-1 inline-flex">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sold listings hidden
              </span>
            )}
          </div>
        )}

        {/* Listings Grid */}
        <ListingsGrid 
          listings={listings} 
          isLoading={isLoading} 
          error={error} 
        />
      </main>
    </div>
  );
}
