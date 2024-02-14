import { get, type Writable } from 'svelte/store';
import { LoggerBuilder, type ILogger } from './Logger';

export class StoreManager<T> {
	public static readonly PREFIX = 'growth-mapping_store_';

	public readonly key: string;
	private log: ILogger;
	private ready = false;

	constructor(
		public readonly store: Writable<T>,
		public readonly name: string
	) {
		this.key = StoreManager.PREFIX + name;
		this.log = LoggerBuilder.build('StoreManager-' + name);

		this.load();
		this.store.subscribe(($value) => this.save($value));
		this.ready = true;
	}

	public save(value?: T) {
		if (!this.ready) return;
		value = value ?? get(this.store);
		this.log('Saving', value);
		localStorage.setItem(this.key, JSON.stringify(value));
	}

	public load() {
		const value = localStorage.getItem(this.key);
		if (value == null) return;

		try {
			const parsed = JSON.parse(value);
			this.store.set(parsed as T);
			this.log('Loaded', parsed);
		} catch (err) {
			this.log.warn('Unable to load from store', err);
		}
	}
}
