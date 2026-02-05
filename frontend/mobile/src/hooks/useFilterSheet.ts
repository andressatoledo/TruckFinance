import { useState } from 'react';

export function useFilterSheet() {
  const [visible, setVisible] = useState(false);

  function abrir() {
    setVisible(true);
    console.log('abrir filtro');
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
