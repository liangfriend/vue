export function extractText(input: string): string {
    // 去掉所有 HTML/XML 标签，如 <think>、</think>
    return input.replace(/<[^>]+>/g, '').trim();
}