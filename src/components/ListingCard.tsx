'use client';

import Image from 'next/image';
import { Listing } from '@/types/listings';
import { formatCurrency } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const photoUrl = listing.photos?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400';
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contingent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Photo */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={photoUrl}
          alt={`${listing.address.line} - ${listing.address.city}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(listing.status)}`}>
            {listing.status}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg font-bold text-gray-900 shadow-sm">
            {formatCurrency(listing.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Address */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {listing.address.line}
          </h3>
          <p className="text-sm text-gray-600">
            {listing.address.city}, {listing.address.state} {listing.address.postalCode}
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium text-gray-700">{listing.bedrooms}</span>
            <span className="text-gray-500">bd</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="font-medium text-gray-700">{listing.bathrooms}</span>
            <span className="text-gray-500">ba</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="font-medium text-gray-700">{listing.squareFeet.toLocaleString()}</span>
            <span className="text-gray-500">sqft</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {listing.propertyType}
          </span>
          {listing.yearBuilt && (
            <span className="text-xs text-gray-500">Built {listing.yearBuilt}</span>
          )}
        </div>

        {/* Description Preview */}
        {listing.description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Agent Info */}
        {listing.agents && listing.agents.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>
                {listing.agents[0].firstName} {listing.agents[0].lastName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
