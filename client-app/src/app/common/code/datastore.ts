import React from 'react';

export const StoreContext = React.createContext<StoreDetails>({ name: 'empty name here. something is fishy.' });

export class StoreDetails {
    name: string = '';
}

export class Store {
    private static map: Map<string, any> = new Map<string, any>();

    public static addStore<T>(globalUniqueIdentifier: string, store: ListDataContext<T>): ListDataContext<T> {
        Store.map.set(globalUniqueIdentifier, store);

        return store;
    }

    public static getStore<T>(globalUniqueIdentifier: string): ListDataContext<T> {
        if (!Store.map.has(globalUniqueIdentifier)) {
            console.exception(`requested store does not exist - ${globalUniqueIdentifier}`);
            // todo - this check should exist only in development mode
            return new ListDataContext<T>();
        }

        return Store.map.get(globalUniqueIdentifier) as ListDataContext<T>;
    }
}

export class ListDataContext<T> {
    activeData: T[] = [];
    selectedData: T[] = [];

    setActiveData = (data: T[]) => {
        this.activeData = data;
    };

    setSelectedData = (data: T[]) => {
        this.selectedData = data;
    };
}
