export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
	  return text;
	}
  
	// biome-ignore lint/style/useTemplate: <explanation>
	return text.slice(0, maxLength) + '...';
}