import { useState } from 'react';

export type ScreenMode = 'create' | 'edit' | 'view';

export function useScreenMode(mode: ScreenMode) {
  const [loading, setLoading] = useState(false);

  const isCreate = mode === 'create';
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  return {
    loading,
    setLoading,

    isCreate,
    isEdit,
    isView,
    readOnly: isView,
  };
}
