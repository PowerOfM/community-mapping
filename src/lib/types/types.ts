export interface IRecord {
	[key: string]: string | number;
}

export enum RecordDataType {
	Label,
	Address,
	Other
}

export interface ITableColumn {
	id: string;
	label: string;
	type: RecordDataType;
}

export interface ITable {
	columns: ITableColumn[];
}

export interface ICollection {
	id: string;
	label: string;
}

export interface IManagedCollection extends ICollection {
	isNew?: boolean;
}
