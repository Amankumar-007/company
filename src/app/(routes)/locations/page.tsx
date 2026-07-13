import { Metadata } from 'next';
import locationsData from '@/data/locations-data.json';
import LocationsClientPage from '@/components/LocationsClientPage';

const { locations, brand } = locationsData;

export const metadata: Metadata = {
  title: { absolute: 'Locations We Serve | Twofloww Digital Agency' },
  description: 'Twofloww provides premium web development, mobile app development, UI/UX design, and SEO services globally. View all our service locations.',
  alternates: {
    canonical: 'https://www.twofloww.in/locations',
  },
  openGraph: {
    title: 'Global Service Locations | Twofloww',
    description: 'We deliver world-class digital solutions to clients in India, USA, UK, UAE, Australia, and beyond.',
    url: 'https://www.twofloww.in/locations',
    siteName: 'Twofloww',
    type: 'website',
  }
};

export default function LocationsPage() {
  return <LocationsClientPage locations={locations} brand={brand} />;
}
