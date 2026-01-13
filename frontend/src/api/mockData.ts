import type { SearchResult } from '../types';

/**
 * Mock document data for development and testing
 * This simulates documents that would come from a real backend API
 */
export const mockDocuments: SearchResult[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    preview: 'Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed...',
    documentUrl: '/documents/ml-intro.pdf',
    documentType: 'PDF',
  },
  {
    id: '2',
    title: 'Annual Report 2025',
    preview: 'This comprehensive annual report provides detailed insights into our company\'s performance throughout 2025, including financial statements, strategic initiatives, and future outlook...',
    documentUrl: '/documents/annual-report-2025.docx',
    documentType: 'DOCX',
  },
  {
    id: '3',
    title: 'Project Requirements Document',
    preview: 'The purpose of this document is to outline the functional and non-functional requirements for the new customer portal system. This includes user authentication, data management...',
    documentUrl: '/documents/requirements.pdf',
    documentType: 'PDF',
  },
  {
    id: '4',
    title: 'Technical Architecture Guide',
    preview: 'This guide describes the overall technical architecture of our platform, including microservices design, API gateway patterns, database schema, and deployment strategies...',
    documentUrl: '/documents/architecture.pdf',
    documentType: 'PDF',
  },
  {
    id: '5',
    title: 'Marketing Strategy Q1 2026',
    preview: 'Our marketing strategy for Q1 2026 focuses on digital transformation, customer engagement through social media, content marketing, and strategic partnerships to increase brand awareness...',
    documentUrl: '/documents/marketing-q1.pptx',
    documentType: 'PPTX',
  },
  {
    id: '6',
    title: 'Employee Handbook',
    preview: 'Welcome to our company! This handbook provides essential information about company policies, benefits, workplace culture, code of conduct, and resources available to all employees...',
    documentUrl: '/documents/employee-handbook.pdf',
    documentType: 'PDF',
  },
  {
    id: '7',
    title: 'API Integration Documentation',
    preview: 'This document provides comprehensive guidance on integrating with our REST API, including authentication methods, endpoint descriptions, request/response formats, and example code...',
    documentUrl: '/documents/api-docs.pdf',
    documentType: 'PDF',
  },
  {
    id: '8',
    title: 'Data Privacy and Security Policy',
    preview: 'Our commitment to data privacy and security is paramount. This policy outlines how we collect, store, process, and protect personal information in compliance with GDPR and other regulations...',
    documentUrl: '/documents/privacy-policy.pdf',
    documentType: 'PDF',
  },
  {
    id: '9',
    title: 'Product Roadmap 2026',
    preview: 'This roadmap outlines our product development plans for 2026, including new features, enhancements, platform improvements, and strategic initiatives to enhance user experience...',
    documentUrl: '/documents/roadmap-2026.xlsx',
    documentType: 'XLSX',
  },
  {
    id: '10',
    title: 'Meeting Minutes - Board of Directors',
    preview: 'Minutes from the quarterly board meeting held on January 10, 2026. Topics discussed include financial performance, strategic initiatives, risk management, and approval of key decisions...',
    documentUrl: '/documents/board-minutes.docx',
    documentType: 'DOCX',
  },
];
