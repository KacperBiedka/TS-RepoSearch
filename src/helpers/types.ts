export type filterFieldType = string | number | Date;

interface IFilterParam {
    [name: string]: any
}

export type compareValuesType = (a: IFilterParam, b: IFilterParam) => number; 

export type sortByFieldType = (array: any[], field: string, order: string) => any[];

export type getCacheValueType = (name: string, callback: (value: any) => void) => void;

export type updateCacheValueType = (name: string, value: any) => void;