import { ComboSource } from '../../../shared/types/Outros/comboOptions';

export type FilterType =
  | 'text'
  | 'select'
  | 'range'
  | 'number'
  | 'async-select'
  | 'combo'
  | 'boolean'
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
  source?: ComboSource;
  asyncLoad?: () => Promise<Option<string>[]>;

  min?: number;
  max?: number;
}
