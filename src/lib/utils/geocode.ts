import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

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

class GoogleMapsGeocoder {
	private readonly API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

	public async geocode(
		address: string
	): Promise<google.maps.GeocoderResponse & { status: GoogleMapsGeocoderStatusCode }> {
		// TODO: Rate limit

		const url =
			this.API_URL +
			new URLSearchParams({
				key: GOOGLE_MAPS_API_KEY,
				address
			}).toString();

		const response = await fetch(url);
		const json = await response.json();
		if (
			json.status === GoogleMapsGeocoderStatusCode.Ok ||
			json.status === GoogleMapsGeocoderStatusCode.ZeroResults
		) {
			return json;
		}

		throw new Error('Geocoder error: ' + json.status, { cause: json });
	}
}

export interface IGeoAddress {
	address: string;
	coords: google.maps.LatLngLiteral;
}

export const geocode = async (address: string): Promise<IGeoAddress> => {
	// TODO: caching
	const geocoder = new GoogleMapsGeocoder();
	const result = await geocoder.geocode(address);

	const record = result.results[0];
	return {
		address: record.formatted_address,
		coords: record.geometry.location.toJSON()
	};
};
