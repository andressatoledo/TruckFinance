import { useState } from 'react';

export function useFilterSheet() {
  const [visible, setVisible] = useState(false);

  function abrir() {
    setVisible(true);
  }

  function fechar() {
    setVisible(false);
  }

  return {
    visible,
    abrir,
    fechar,
  };
}
