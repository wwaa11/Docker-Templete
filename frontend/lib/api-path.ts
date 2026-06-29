export function getBasePath(): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  if (!basePath || basePath === '/') {
    return '';
  }

  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

export function buildApiPath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBasePath()}${normalizedPath}`;
}
