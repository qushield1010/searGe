export interface SearchResult {
  id: string;
  title: string;
  preview: string;
  documentUrl: string;
  documentType: string;
}

export interface SearchParams {
  query: string;
  documentType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
}
