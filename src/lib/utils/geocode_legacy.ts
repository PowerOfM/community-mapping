import { GOOGLE_MAPS_REGION } from './constants';
import { getGoogleMapsAPI } from './googleAPIs';

const CACHE_LSKEY = 'mapping::geoCoordsCache';
const cache = (function () {
	const ls = localStorage.getItem(CACHE_LSKEY);
	if (ls) return JSON.parse(ls);
	return {};
})();
window.onunload = () => localStorage.setItem(CACHE_LSKEY, JSON.stringify(cache));

let _geocoder;
let GeocoderStatus;
async function getGeocoder() {
	if (!_geocoder) {
		const google = await getGoogleMapsAPI();
		_geocoder = new google.maps.Geocoder();
		GeocoderStatus = google.maps.GeocoderStatus;
	}
	return _geocoder;
}

export async function geocode(address) {
	if (!address) return null;
	const cachedValue = cache[address];
	if (cachedValue) return cachedValue;

	const geocoder = await getGeocoder();
	const [geocodeResult] = await new Promise((resolve, reject) => {
		geocoder.geocode(
			{
				address,
				region: GOOGLE_MAPS_REGION
			},
			(result, status) => {
				if (
					GeocoderStatus &&
					(status === GeocoderStatus.OK || status === GeocoderStatus.ZERO_RESULTS)
				) {
					return resolve(result);
				}
				return reject(result);
			}
		);
	});

	let result = null;
	if (geocodeResult) {
		result = {
			geoAddress: geocodeResult.formatted_address,
			geoCoords: geocodeResult.geometry?.location.toJSON()
		};
	}

	cache[address] = result;
	return result;
}

export function batchGeocode({
	rows,
	addressField,
	onProgress,
	onGeocodeFail,
	onComplete,
	threads = 1
}) {
	let cancelled = false;
	let pending = threads;

	async function process(rows, i, length) {
		for (; i < length && i < rows.length; i++) {
			if (cancelled) return;
			const row = rows[i];
			console.log('processing', row);
			try {
				if (!row.geoCoords) {
					const result = await geocode(row[addressField]);
					if (!result) {
						onGeocodeFail(row);
					} else {
						row.geoAddress = result.geoAddress;
						row.geoCoords = result.geoCoords;
					}
				}
			} catch (err) {
				console.log('Geocode error', err);
				onGeocodeFail(row);
			}
			onProgress();
		}
		pending--;
		if (pending === 0) onComplete();
	}

	// if (rows.length < 5 * threads)
	const batchSize = Math.round(rows.length / threads);
	for (let i = 0; i < threads; i++) {
		process(rows, batchSize * i, batchSize);
	}

	return {
		cancel: () => (cancelled = true)
	};
}
