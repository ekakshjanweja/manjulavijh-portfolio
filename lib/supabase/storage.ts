export function extractStoragePath(publicUrl: string) {
  const marker = "/storage/v1/object/public/portfolio-images/";
  const index = publicUrl.indexOf(marker);
  if (index === -1) {
    return null;
  }
  return decodeURIComponent(publicUrl.slice(index + marker.length));
}
