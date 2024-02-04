import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { RateLimiter } from 'limiter';

// https://developers.google.com/maps/documentation/geocoding/requests-geocoding#StatusCodes
enum GoogleMapsGeocoderStatusCode {
	Ok = 'OK',
	ZeroResults = 'ZERO_RESULTS',
	OverDailyLimit = 'OVER_DAILY_LIMIT',
	OverQueryLimit = 'OVER_QUERY_LIMIT',
	RequestDenied = 'REQUEST_DENIED',
	InvalidRequest = 'INVALID_REQUEST',
	Unknown = 'UNKNOWN_ERROR'
}

type GoogleMapsGeocodeResponse = google.maps.GeocoderResponse & {
	status: GoogleMapsGeocoderStatusCode;
};

export interface IGeoAddress {
	key: string;
	address: string;
	coords: google.maps.LatLngLiteral;
	raw?: google.maps.GeocoderResult;
}

type GeocodeCacheResult = { ok: true; value: IGeoAddress[] } | { ok: false; error: Error };

class GeocoderClass {
	private readonly API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
	private readonly cache: Record<string, GeocodeCacheResult> = {};
	private readonly limiter = new RateLimiter({
		tokensPerInterval: 500,
		interval: 'minute'
	});

	public async geocode(input: string): Promise<IGeoAddress[]> {
		const address = this.sanitizeAddress(input);
		const cacheCheck = this.cache[address];
		if (cacheCheck) {
			if (cacheCheck.ok) return cacheCheck.value;
			throw cacheCheck.error;
		}

		try {
			const value = await this.googleMapsRequest(address);
			this.cache[address] = { ok: true, value };
			return value;
		} catch (error) {
			this.cache[address] = { ok: false, error: error as Error };
			throw error;
		}
	}

	public sanitizeAddress(input: string): string {
		return input.trim().replace(/\r?\n|\r/g, '');
	}

	private async googleMapsRequest(input: string): Promise<IGeoAddress[]> {
		await this.limiter.removeTokens(1);

		const url =
			this.API_URL +
			new URLSearchParams({
				key: PUBLIC_GOOGLE_MAPS_API_KEY,
				address: input
			}).toString();

		const response = await fetch(url);
		const json = await response.json();
		if (
			json.status === GoogleMapsGeocoderStatusCode.Ok ||
			json.status === GoogleMapsGeocoderStatusCode.ZeroResults
		) {
			const jsonResponse = json as GoogleMapsGeocodeResponse;
			return jsonResponse.results.map((result) => ({
				key: input,
				address: result.formatted_address,
				coords: result.geometry.location.toJSON(),
				raw: result
			}));
		}

		throw new Error('Geocoder error: ' + json.status, { cause: json });
	}
}

export const Geocoder = new GeocoderClass();
