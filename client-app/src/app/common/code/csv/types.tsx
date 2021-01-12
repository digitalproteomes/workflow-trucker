export type Header<T> = {
    label: string;
    key: keyof T;
};

export type ButtonExportProps<T extends object> = {
    title: string;
    headers?: Header<T>[];

    filename?: string;
};
