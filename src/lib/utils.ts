export function getAssetPath(path: string): string {
    const basePath = '/gonsdores';
    // If the path already has the base path or is an external URL, return it
    if (path.startsWith('http') || path.startsWith(basePath)) {
        return path;
    }
    // Ensure we don't have double slashes
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${cleanPath}`;
}
