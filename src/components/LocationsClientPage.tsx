'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Globe,
  ArrowRight,
  Clock,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';

interface LocationItem {
  slug: string;
  city: string | null;
  type: string;
  state: string | null;
  country: string;
  country_code: string;
  is_home_base?: boolean;
  nearby_areas: string[];
  lat: number;
  lng: number;
}

interface BrandInfo {
  name: string;
  phone_india: string;
  phone_intl: string;
  email: string;
  address_india: string;
  founded_year: number;
  projects_delivered: string;
  countries_served: string;
}

interface LocationsClientPageProps {
  locations: LocationItem[];
  brand: BrandInfo;
}

const HQ_LAT = 28.5355;
const HQ_LNG = 77.3910;

// Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Local time helper
function getLocalTime(lng: number) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const offsetHours = lng / 15;
  const localDate = new Date(utc + (3600000 * offsetHours));
  return localDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

// Isolated Sub-component for ticking clock to prevent parent re-renders
function LocalTimeClock({ lng }: { lng: number }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => setTime(getLocalTime(lng));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lng]);

  return (
    <span className="text-gray-700 flex items-center gap-1.5 font-mono">
      <Clock className="w-3 h-3 text-gray-400 shrink-0" />
      {time || '--:--:--'}
    </span>
  );
}

export default function LocationsClientPage({ locations, brand }: LocationsClientPageProps) {
  const [activeTab, setActiveTab] = useState<'IN' | 'INTL'>('IN');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlug, setActiveSlug] = useState<string>('');

  // Split locations
  const indianLocations = useMemo(() => locations.filter(l => l.country_code === 'IN'), [locations]);
  const internationalLocations = useMemo(() => locations.filter(l => l.country_code !== 'IN'), [locations]);

  // Filtered list
  const filteredLocations = useMemo(() => {
    const list = activeTab === 'IN' ? indianLocations : internationalLocations;
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(l =>
      (l.city && l.city.toLowerCase().includes(query)) ||
      (l.country && l.country.toLowerCase().includes(query)) ||
      (l.state && l.state.toLowerCase().includes(query))
    );
  }, [activeTab, indianLocations, internationalLocations, searchQuery]);

  // Sync activeSlug when tabs or search updates
  useEffect(() => {
    if (filteredLocations.length > 0) {
      const exists = filteredLocations.some(l => l.slug === activeSlug);
      if (!exists) {
        setActiveSlug(filteredLocations[0].slug);
      }
    } else {
      setActiveSlug('');
    }
  }, [filteredLocations, activeSlug]);

  // Normalize map coordinates
  const coordinatesMap = useMemo(() => {
    const list = activeTab === 'IN' ? indianLocations : internationalLocations;
    if (list.length === 0) return [];

    const lats = list.map(l => l.lat);
    const lngs = list.map(l => l.lng);

    let minLat = Math.min(...lats);
    let maxLat = Math.max(...lats);
    let minLng = Math.min(...lngs);
    let maxLng = Math.max(...lngs);

    if (minLat === maxLat) { minLat -= 1; maxLat += 1; }
    if (minLng === maxLng) { minLng -= 1; maxLng += 1; }

    return list.map(l => {
      // Map to 15% to 85% range for nice padding on SVG
      const x = ((l.lng - minLng) / (maxLng - minLng)) * 70 + 15;
      const y = (1 - (l.lat - minLat) / (maxLat - minLat)) * 70 + 15;
      return { ...l, x, y };
    });
  }, [activeTab, indianLocations, internationalLocations]);

  // Selected node
  const selectedNode = useMemo(() => {
    return coordinatesMap.find(c => c.slug === activeSlug) || coordinatesMap[0];
  }, [coordinatesMap, activeSlug]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0B0D17] selection:bg-[#DE5D26]/20 selection:text-[#DE5D26] overflow-x-hidden pt-16 pb-24 relative font-sans">
      {/* Soft background lighting */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-100/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#DE5D26]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-5">
            <Globe className="w-3.5 h-3.5 text-[#DE5D26]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
              Global Presence
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-[#0B0D17] tracking-tight leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Where We <span className="text-[#DE5D26]">Operate</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
            From our primary headquarters, we build and support premium digital products for partners in India and around the globe.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-12 pb-6 border-b border-gray-200/60">
          <div className="flex bg-white/80 backdrop-blur p-1 rounded-xl border border-gray-200/50 w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('IN'); setSearchQuery(''); }}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'IN'
                  ? 'bg-[#0B0D17] text-white'
                  : 'text-gray-500 hover:text-[#0B0D17]'
                }`}
            >
              India
            </button>
            <button
              onClick={() => { setActiveTab('INTL'); setSearchQuery(''); }}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'INTL'
                  ? 'bg-[#0B0D17] text-white'
                  : 'text-gray-500 hover:text-[#0B0D17]'
                }`}
            >
              International
            </button>
          </div>

          <div className="relative w-full sm:w-[260px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs text-[#0B0D17] placeholder:text-gray-400 outline-none focus:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left panel: List items */}
          <div className="lg:col-span-7 flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc, idx) => {
                  const isActive = loc.slug === activeSlug;
                  const isHq = loc.is_home_base;
                  const dist = calculateDistance(HQ_LAT, HQ_LNG, loc.lat, loc.lng);

                  return (
                    <div
                      key={loc.slug}
                      onClick={() => setActiveSlug(loc.slug)}
                      className={`group p-6 rounded-2xl border transition-colors duration-200 cursor-pointer ${isActive
                          ? 'bg-white border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
                          : 'bg-transparent border-transparent hover:bg-white/40 hover:border-gray-200/50'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-baseline gap-4">
                          <span className="text-[10px] font-mono text-gray-400">
                            0{(idx + 1).toString().slice(-2)}
                          </span>
                          <h3
                            className="text-lg md:text-xl font-bold tracking-tight text-[#0B0D17]"
                            style={{ fontFamily: 'var(--font-space-grotesk)' }}
                          >
                            {loc.city ?? loc.country}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {isHq ? (
                            <span className="text-[8px] font-black uppercase tracking-wider text-[#DE5D26] bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                              HQ
                            </span>
                          ) : (
                            <span className="text-[8px] font-bold text-gray-400 uppercase">
                              {loc.country_code}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expandable Info Drawer */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-t border-gray-100 pt-4"
                          >
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-5">
                              <div>
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Region</span>
                                <span className="text-gray-700">{loc.state ? `${loc.state}, ` : ''}{loc.country}</span>
                              </div>
                              <div>
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Local Time</span>
                                <LocalTimeClock lng={loc.lng} />
                              </div>
                              <div>
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">HQ Offset</span>
                                <span className="text-gray-700">
                                  {isHq ? 'Central Hub' : `${dist.toLocaleString()} km distance`}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Coverage</span>
                                <span className="text-gray-700 truncate block max-w-[200px]">
                                  {loc.nearby_areas?.length > 0 ? loc.nearby_areas.join(', ') : 'Regional'}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <Link
                                href={`/web-development-company-${loc.slug}`}
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#0B0D17] hover:text-[#DE5D26] transition-colors cursor-pointer"
                              >
                                View Location page
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={openConsultModal}
                                className="text-xs font-bold text-gray-400 hover:text-[#0B0D17] transition-colors cursor-pointer"
                              >
                                Consult Here
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center border border-dashed border-gray-200 rounded-2xl bg-white/40">
                  <Globe className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">No locations found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel: Static SVG Constellation View */}
          <div className="lg:col-span-5 order-first lg:order-last lg:sticky lg:top-32">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.02)] overflow-hidden">

              <div className="flex justify-between items-center border-b border-gray-100 pb-3.5 mb-5">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Connection mesh
                </span>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* Minimal SVG mesh box */}
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#FAFAFA] border border-gray-100 overflow-hidden flex items-center justify-center">

                {/* SVG Connections (Pure CSS Transitioned for performance) */}
                <svg className="absolute inset-0 w-full h-full">
                  {coordinatesMap.map((point) => {
                    const isHqPoint = point.slug === 'noida';

                    if (activeTab === 'IN') {
                      const hqNode = coordinatesMap.find(c => c.slug === 'noida');
                      if (hqNode && !isHqPoint) {
                        const isActive = point.slug === activeSlug;
                        return (
                          <line
                            key={`map-line-${point.slug}`}
                            x1={`${hqNode.x}%`}
                            y1={`${hqNode.y}%`}
                            x2={`${point.x}%`}
                            y2={`${point.y}%`}
                            stroke={isActive ? '#DE5D26' : '#E5E7EB'}
                            strokeWidth={isActive ? 1.5 : 0.8}
                            strokeDasharray={isActive ? 'none' : '3,3'}
                            opacity={isActive ? 1 : 0.4}
                            className="transition-all duration-300"
                          />
                        );
                      }
                    } else {
                      // International loop
                      const idx = coordinatesMap.findIndex(c => c.slug === point.slug);
                      const nextPoint = coordinatesMap[(idx + 1) % coordinatesMap.length];
                      if (nextPoint) {
                        const isLinkActive = point.slug === activeSlug || nextPoint.slug === activeSlug;
                        return (
                          <line
                            key={`map-line-intl-${point.slug}`}
                            x1={`${point.x}%`}
                            y1={`${point.y}%`}
                            x2={`${nextPoint.x}%`}
                            y2={`${nextPoint.y}%`}
                            stroke={isLinkActive ? '#DE5D26' : '#E5E7EB'}
                            strokeWidth={isLinkActive ? 1.2 : 0.8}
                            strokeDasharray="2,2"
                            opacity={isLinkActive ? 1 : 0.3}
                            className="transition-all duration-300"
                          />
                        );
                      }
                    }
                    return null;
                  })}
                </svg>

                {/* Nodes */}
                {coordinatesMap.map((point) => {
                  const isActive = point.slug === activeSlug;
                  const isHq = point.is_home_base;

                  return (
                    <div
                      key={`map-node-${point.slug}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      onClick={() => setActiveSlug(point.slug)}
                    >
                      <div className="relative flex items-center justify-center w-6 h-6">
                        {/* Dot */}
                        <div className={`rounded-full transition-all duration-200 ${isActive
                            ? 'w-2.5 h-2.5 bg-[#DE5D26] shadow-[0_0_8px_#DE5D26]'
                            : isHq
                              ? 'w-2.5 h-2.5 bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.3)]'
                              : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                          }`} />

                        {/* Pulsing ring */}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full border border-[#DE5D26]/30 animate-ping" />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Micro Details Widget */}
                {selectedNode && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-gray-100 flex justify-between items-center shadow-[0_8px_20px_rgba(0,0,0,0.02)]">
                    <div>
                      <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider">Coordinates</span>
                      <span className="text-[10px] font-mono text-gray-600">
                        {selectedNode.lat.toFixed(4)}°N, {selectedNode.lng.toFixed(4)}°E
                      </span>
                    </div>
                    <span className="text-[9.5px] font-bold text-[#DE5D26] uppercase font-mono">
                      {selectedNode.city ?? selectedNode.country}
                    </span>
                  </div>
                )}

              </div>

              <div className="mt-4 text-[10px] text-gray-400 text-center leading-relaxed">
                Click locations or nodes to explore connections
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
