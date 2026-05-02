export const priorityMap: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export const getPriority = (type: string): number => {
  return priorityMap[type] || 0;
};
