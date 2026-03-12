// useComboOptions.ts
import {  ComboSource } from '../../../shared/types/Outros/comboOptions';



// useComboOptions.ts

import { comboConfig } from './comboConfig';
import { comboAdapter } from './comboAdapter';

export function useComboOptions(source?: ComboSource) {
  console.log('source no comboOptions',source)
  const config = source ? comboConfig[source] : undefined;
  
  console.log('config',config)
  if (!config) {
    return { options: [], loading: false };
  }

  const result = config.hook();

  return comboAdapter(result, {
    optionsKey: config.optionsKey,
  });
}