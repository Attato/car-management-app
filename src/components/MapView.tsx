import { useEffect, useRef } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { DEFAULT_COORDINATES } from '../utils/_constants';
import type { Car } from '../utils/_types';

export default function MapView({ cars }: { cars: Car[] }) {
	const mapRef = useRef<L.Map | null>(null);

	useEffect(() => {
		if (!mapRef.current) {
			mapRef.current = L.map('map').setView(
				[DEFAULT_COORDINATES.latitude, DEFAULT_COORDINATES.longitude],
				11
			);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '© OpenStreetMap',
			}).addTo(mapRef.current);
		}

		const map = mapRef.current;

		map.eachLayer((layer) => {
			if (layer instanceof L.Marker) {
				map.removeLayer(layer);
			}
		});

		cars.forEach((car) => {
			L.marker([car.latitude, car.longitude])
				.addTo(map)
				.bindPopup(`${car.name} ${car.model}`);
		});
	}, [cars]);

	return <div id="map" className="flex-1 h-full" />;
}
