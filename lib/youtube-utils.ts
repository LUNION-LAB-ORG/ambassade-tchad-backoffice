/**
 * Utilitaires pour gérer les vidéos YouTube
 */

/**
 * Extrait l'ID d'une vidéo YouTube à partir de différents formats d'URL
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Génère l'URL du thumbnail YouTube
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string {
  const qualityMap = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg',
    high: 'hqdefault.jpg',
    standard: 'sddefault.jpg',
    maxres: 'maxresdefault.jpg'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

/**
 * Génère l'URL d'embed YouTube
 */
export function getYouTubeEmbedUrl(videoId: string, options?: {
  autoplay?: boolean;
  controls?: boolean;
  mute?: boolean;
  loop?: boolean;
  start?: number;
}): string {
  const params = new URLSearchParams();
  
  if (options?.autoplay) params.append('autoplay', '1');
  if (options?.controls === false) params.append('controls', '0');
  if (options?.mute) params.append('mute', '1');
  if (options?.loop) params.append('loop', '1');
  if (options?.start) params.append('start', options.start.toString());

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Vérifie si une URL est une URL YouTube valide
 */
export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}

/**
 * Génère un titre court à partir de l'URL YouTube (utilise l'ID comme fallback)
 */
export function getYouTubeTitle(url: string): string {
  const videoId = extractYouTubeVideoId(url);
  return videoId ? `Vidéo YouTube ${videoId}` : 'Vidéo YouTube';
}
