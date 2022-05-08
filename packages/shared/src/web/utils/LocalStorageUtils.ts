export class LocalStorageUtilsInternal<TStorageKeys extends {[key: string]: string}> {
	private _StorageKeys;

	public get StorageKeys() { return this._StorageKeys };
	
	constructor(storageKeys: TStorageKeys) {
		this._StorageKeys = storageKeys;
	}

	public getItem = (key: TStorageKeys[keyof TStorageKeys], defaultValue?: string) => {
		return localStorage.getItem(key) ?? defaultValue ?? null;
	}

	public setItem = (key: TStorageKeys[keyof TStorageKeys], value: string) => {
		return localStorage.setItem(key, value);
	}
}