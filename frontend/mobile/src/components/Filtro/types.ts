export type FilterType =
  | 'text'
  | 'select'
  | 'range'
  | 'number'
  | 'async-select'
  | 'combo'
  | 'date';

// export interface FilterOption {
//   label: string;
//   value: string | number;
// }

type Option<T extends string> = {
  label: string;
  value: T;
};



export interface FilterFieldConfig {
  key: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  icon?: string;

  options?: Option<string>[];

  asyncLoad?: () => Promise<Option<string>[]>;

  min?: number;
  max?: number;
}
