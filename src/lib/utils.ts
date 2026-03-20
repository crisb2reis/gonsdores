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

export function formatDate(dateString: string): string {
    if (!dateString) return "";
    
    // Tratamento para o formato YYYY-MM-DD (comum do input type="date")
    // Se usarmos new Date(dateString), o JS interpreta como UTC 00:00:00
    // O que causa deslocamento de um dia para trás em fusos horários negativos (Brasil)
    const parts = dateString.split('T')[0].split('-');
    if (parts.length !== 3) return dateString;
    
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}
