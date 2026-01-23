import { useState } from 'react';

export function useViagemFilterSheet() {
  const [visible, setVisible] = useState(true);

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
