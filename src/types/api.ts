export interface ShortenUrlRequest {
  url: string;
  customCode?: string;
  expiresAtUtc?: string;
  maxClicks?: number;
}

export interface ShortenedUrlResponse {
  shortUrl: string;
  originalUrl: string;
  code: string;
  clicks: number;
  isActive: boolean;
  expiresAtUtc?: string;
  maxClicks?: number;
  isCustom: boolean;
  qrCodeUrl: string;
  createdOnUtc: string;
}

export interface UrlAnalyticsResponse {
  code: string;
  shortUrl: string;
  originalUrl: string;
  totalClicks: number;
  clicksByDate: Record<string, number>;
  topBrowsers: Record<string, number>;
  topOperatingSystems: Record<string, number>;
  topDeviceTypes: Record<string, number>;
}

export interface ApiError {
  message: string;
  status?: number;
}
