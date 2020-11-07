export type filterFieldType = string | number | Date;

interface IFilterParam {
    [name: string]: filterFieldType
}

export type compareValuesType = (a: IFilterParam, b: IFilterParam) => number; 

export type sortByFieldType = (array: IFilterParam[], field: string, order: string) => {}[];

export type getCacheValueType = (name: string, callback: (value: any) => void) => void;

export type updateCacheValueType = (name: string, value: any) => void;