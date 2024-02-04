export type Coordinates = { lat: number; lng: number };
export type FieldDefinition = (string | number)[];

export interface IGeoAddress {
	address: string;
	coords: Coordinates;
}

export interface ILocation extends IGeoAddress {
	id: string;
	input: string;
	options?: IGeoAddress[];
}

export interface IRecord {
	id: string;
	locationId: string;
	label: string;
	data: string[];
}

export interface ITableError {
	index: number;
	error: Error | string;
	input?: string;
}

export interface ITable {
	id: string;
	records: IRecord[];
	locations: Record<string, ILocation>;

	headers: string[];
	addressField: FieldDefinition;
	labelField: FieldDefinition;

	errors?: ITableError[];
}

export interface ICollection {
	id: string;
	label: string;
	tables: ITable[];
}

export interface IManagedCollection extends ICollection {
	isNew?: boolean;
}
