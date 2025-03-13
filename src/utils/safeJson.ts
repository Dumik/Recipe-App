export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export const safeJsonParse = <T>(
  json: string, 
  validator: (data: unknown) => data is T,
  defaultValue: T
): T => {
  try {
    const parsed = JSON.parse(json);
    return validator(parsed) ? parsed : defaultValue;
  } catch (error) {
    console.error('JSON parse error:', error);
    return defaultValue;
  }
};

export const isStringArray = (data: unknown): data is string[] => {
  return Array.isArray(data) && data.every(item => typeof item === 'string');
};

export const isCheckedItems = (data: unknown): data is Record<string, boolean> => {
  return (
    typeof data === 'object' &&
    data !== null &&
    Object.entries(data).every(
      ([key, value]) => typeof key === 'string' && typeof value === 'boolean'
    )
  );
}; 