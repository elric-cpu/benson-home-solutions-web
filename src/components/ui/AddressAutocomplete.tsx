'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Form';

interface Suggestion {
  formatted: string;
  place_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postcode: string;
  county: string;
  lat: number;
  lon: number;
}

interface Props {
  onSelect: (suggestion: Suggestion) => void;
  placeholder?: string;
  className?: string;
}

interface GeoapifyFeature {
  properties: {
    formatted: string;
    place_id: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postcode: string;
    county: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

interface GeoapifyResponse {
  features: GeoapifyFeature[];
}

export function AddressAutocomplete({ onSelect, placeholder, className }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (!API_KEY || API_KEY === 'FREE_KEY') {
      console.warn('[AddressAutocomplete] Geoapify API key is missing. Autocomplete is disabled.');
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        if (API_KEY && API_KEY !== 'FREE_KEY') {
          // Primary: Geoapify
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
              query
            )}&apiKey=${API_KEY}&filter=countrycode:us&limit=5`
          );
          
          if (response.ok) {
            const data = (await response.json()) as GeoapifyResponse;
            setSuggestions(
              data.features?.map((f) => ({
                formatted: f.properties.formatted,
                place_id: f.properties.place_id,
                address_line1: f.properties.address_line1,
                address_line2: f.properties.address_line2,
                city: f.properties.city,
                state: f.properties.state,
                postcode: f.properties.postcode,
                county: f.properties.county,
                lat: f.geometry.coordinates[1],
                lon: f.geometry.coordinates[0],
              })) || []
            );
            setIsOpen(true);
            return;
          }
        }

        // Fallback: Nominatim (OpenStreetMap) - No key required
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&addressdetails=1&limit=5&countrycodes=us`
        );

        if (!response.ok) throw new Error('Geocoding service unavailable');

        const data = await response.json();
        const osmSuggestions = data.map((item: any) => ({
          formatted: item.display_name,
          place_id: `osm-${item.place_id}`,
          address_line1: item.address.road || item.display_name.split(',')[0],
          address_line2: item.address.city || item.address.town || '',
          city: item.address.city || item.address.town || '',
          state: item.address.state || '',
          postcode: item.address.postcode || '',
          county: item.address.county || '',
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        }));

        if (osmSuggestions.length > 0) {
          setSuggestions(osmSuggestions);
          setIsOpen(true);
          return;
        }

        // Tertiary Fallback: US Census Geocoder (Direct Search)
        // Only trigger if string is long (likely a full address attempt)
        if (query.length > 10) {
          const censusUrl = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(query)}&benchmark=Public_AR_Current&format=json`;
          const cRes = await fetch(censusUrl);
          const cData = await cRes.json();

          if (cData.result?.addressMatches?.[0]) {
            setSuggestions(cData.result.addressMatches.map((m: any, i: number) => ({
              formatted: m.matchedAddress,
              place_id: `census-${i}`,
              address_line1: m.addressComponents.number + ' ' + m.addressComponents.streetName,
              address_line2: m.addressComponents.city + ', ' + m.addressComponents.state,
              city: m.addressComponents.city,
              state: m.addressComponents.state,
              postcode: m.addressComponents.zip,
              county: m.addressComponents.county,
              lat: m.coordinates.y,
              lon: m.coordinates.x,
            })));
            setIsOpen(true);
          }
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query, API_KEY]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 3 && setIsOpen(true)}
        placeholder={placeholder || 'Enter your US address...'}
        className="h-14 text-lg pr-10"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-oxblood/20 border-t-oxblood rounded-full animate-spin" />
        </div>
      )}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-slate/10 rounded-xl shadow-elevated overflow-hidden">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => {
                setQuery(s.formatted);
                setIsOpen(false);
                onSelect(s);
              }}
              className="px-4 py-3 hover:bg-cream cursor-pointer text-slate border-b border-slate/5 last:border-0 transition-colors"
            >
              <div className="font-semibold text-charcoal">{s.address_line1}</div>
              <div className="text-sm opacity-70">{s.address_line2 || s.formatted.split(',').slice(1).join(',')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
