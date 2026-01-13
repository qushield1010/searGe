import type { SearchParams, SearchResponse } from '../types';
import { mockDocuments } from './mockData';

/**
 * Mock API for development
 * Simulates backend search functionality with artificial delay
 */

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchAPI = {
  /**
   * Search documents by query and filters
   * @param params - Search parameters (query, documentType, dateFrom, dateTo)
   * @param page - Current page number (1-indexed)
   * @param pageSize - Number of results per page
   * @returns Promise with search results
   */
  search: async (
    params: SearchParams,
    page: number = 1,
    pageSize: number = 5
  ): Promise<SearchResponse> => {
    // Simulate network delay
    await delay(500);

    // Filter by search query (search in title and preview)
    let filteredResults = mockDocuments.filter(result =>
      result.title.toLowerCase().includes(params.query.toLowerCase()) ||
      result.preview.toLowerCase().includes(params.query.toLowerCase())
    );

    // Apply document type filter if specified
    if (params.documentType && params.documentType !== 'all') {
      filteredResults = filteredResults.filter(result =>
        result.documentType.toLowerCase() === params.documentType?.toLowerCase()
      );
    }

    // Calculate pagination
    const total = filteredResults.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedResults = filteredResults.slice(start, end);

    return {
      results: paginatedResults,
      total,
      page,
      pageSize,
    };
  },
};
