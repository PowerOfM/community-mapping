export interface IRecord {
	[key: string]: string | number;
}

export enum RecordDataType {
	Name
}

export interface ITableColumn {
	id: string;
	label: string;
	type: RecordDataType;
}

export interface ITable {
	columns: ITableColumn[];
}
