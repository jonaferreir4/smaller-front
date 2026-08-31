export interface ShortenUrlRequest {
  url: string;
}

export interface ShortenUrlResponse {
  shortUrl: string;
}

export interface UrlInsightsResponse {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdOnUtc: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
