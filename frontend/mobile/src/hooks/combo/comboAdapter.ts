// comboAdapter.ts

interface ComboAdapterConfig {
  optionsKey: string;
}

export function comboAdapter(
  result: Record<string, any>,
  config: ComboAdapterConfig
) {
  const { optionsKey } = config;

  return {
    options: result?.[optionsKey] ?? [],
    loading: result?.loading ?? false,
  };
}