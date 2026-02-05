export type FilterType =
  | 'text'
  | 'select'
  | 'range'
  | 'number'
  | 'async-select';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterFieldConfig {
  key: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  icon?: string;

  options?: FilterOption[];

  asyncLoad?: () => Promise<FilterOption[]>;

  min?: number;
  max?: number;
}
