/* eslint-disable @typescript-eslint/no-explicit-any */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
	  return text;
	}
  
	// biome-ignore lint/style/useTemplate: <explanation>
	return text.slice(0, maxLength) + '...';
}

interface Item { 
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
  }
  
export function groupBy<T extends Item>(
	data: T[],
	groupKey: keyof T
): {
	[key: string]: T[];
  } {
	const groupedData = data.reduce((groups, item) => {
	  const key = item[groupKey];
  
	  groups[key] = groups[key] || [];
  
	  groups[key].push(item);
  
	  return groups;
	}, {} as { [key: string]: T[] });
  
	return groupedData;
}

export function getTypeAndIdFromString(str: string): { type: string; id: string } | null {
	const match = str.match(/^([a-zA-Z]+)_(\d+)$/);
  
	if (match) {
	  const [, type, id] = match;
	  return { type, id };
	}
	
	return null; // Or throw an error if no match is expected
}