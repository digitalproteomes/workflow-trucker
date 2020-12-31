export abstract class TypeMapConverter<T> {
    protected keyMap: Map<string, keyof T> = new Map();

    protected constructor() {}

    public tryGet(key: string): { value: keyof T | undefined; found: boolean } {
        const found = this.keyMap.has(key);
        const value = this.keyMap.get(key);

        return { found: found, value: value };
    }

    protected assignValuesTo(convertedValue: T, data: any): T {
        this.keyMap.forEach((value: keyof T) => {
            convertedValue[value] = data[value];
        });

        return convertedValue;
    }

    public abstract convert(data: any): T;
}
