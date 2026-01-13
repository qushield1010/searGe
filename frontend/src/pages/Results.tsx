import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Pagination,
  CircularProgress,
  Stack,
  Chip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { SearchResult, SearchParams } from '../types';
import { searchAPI } from '../api/mockApi';

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const pageSize = 5;

  const currentQuery = searchParams.get('q') || '';
  const documentType = searchParams.get('type') || undefined;
  const dateFrom = searchParams.get('from') || undefined;
  const dateTo = searchParams.get('to') || undefined;

  useEffect(() => {
    performSearch();
  }, [currentQuery, documentType, dateFrom, dateTo, page]);

  const performSearch = async () => {
    if (!currentQuery) return;

    setLoading(true);
    try {
      const params: SearchParams = {
        query: currentQuery,
        documentType,
        dateFrom,
        dateTo,
      };

      const response = await searchAPI.search(params, page, pageSize);
      setResults(response.results);
      setTotalResults(response.total);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
      setPage(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header with Search */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <IconButton onClick={() => navigate('/')} size="large">
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              searGe
            </Typography>
          </Stack>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Results Info */}
        {!loading && totalResults > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            About {totalResults} results for "{currentQuery}"
            {documentType && ` (${documentType.toUpperCase()} files)`}
          </Typography>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* No Results */}
        {!loading && totalResults === 0 && currentQuery && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No results found for "{currentQuery}"
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try different keywords or check your spelling
            </Typography>
          </Box>
        )}

        {/* Results List */}
        {!loading && results.length > 0 && (
          <Stack spacing={2}>
            {results.map((result) => (
              <Card key={result.id} elevation={1}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <DescriptionIcon color="action" fontSize="small" />
                    <Chip label={result.documentType} size="small" color="primary" />
                  </Stack>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      mb: 1,
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.preview}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<OpenInNewIcon />}
                    onClick={() => window.open(result.documentUrl, '_blank')}
                  >
                    Open Document
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
