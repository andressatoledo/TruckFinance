
  export function criarDataUTC(data: string, fimDoDia = false): Date | null {
    if (!data) return null;

    const [ano, mes, dia] = data.split('-').map(Number);
    if (!ano || !mes || !dia) return null;

    return fimDoDia
      ? new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999))
      : new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0, 0));
  }

  export function criarRangeNumerico(min?: string, max?: string) {
    const range: any = {};

    if (min && !isNaN(Number(min))) {
      range.$gte = Number(min);
    }

    if (max && !isNaN(Number(max))) {
      range.$lte = Number(max);
    }

    return Object.keys(range).length > 0 ? range : null;
  }