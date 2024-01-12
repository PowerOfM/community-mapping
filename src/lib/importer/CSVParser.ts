import Papa from 'papaparse';

export interface ICSVParserConfig {
	delimiter: string;
	newLine: string;
	quoteChar: string;
	escapeChar: string;
	header: boolean;
	dynamicTyping: boolean;
	worker: boolean;
}

const DEFAULT_PARSE_CONFIG: ICSVParserConfig = {
	delimiter: '', // auto-detect
	newLine: '', // auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: true, // the first row of parsed data will be interpreted as field names
	dynamicTyping: true, // numeric and boolean data will be converted to their type instead of remaining strings
	worker: false
};

export class CSVParser {
	public static parse(file: File, config: Partial<ICSVParserConfig> = {}) {
		Papa.parse(file, {
			...DEFAULT_PARSE_CONFIG,
			...config,
			step(results) {
				console.log('STEP', results);
			},
			complete(results) {
				console.log('COMPLETE', results);
			},
			error(error) {
				console.error('ERROR', error);
			}
		});
	}
}
