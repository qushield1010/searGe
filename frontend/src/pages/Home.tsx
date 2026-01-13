import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import type { SearchParams } from '../types';
import AdvancedSearch from '../components/AdvancedSearch';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const advancedParams: SearchParams = {
    query: '',
    documentType: 'all',
    dateFrom: '',
    dateTo: '',
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleAdvancedSearch = (params: SearchParams) => {
    if (params.query.trim()) {
      const urlParams = new URLSearchParams({
        q: params.query,
      });
      
      if (params.documentType && params.documentType !== 'all') {
        urlParams.append('type', params.documentType);
      }
      if (params.dateFrom) {
        urlParams.append('from', params.dateFrom);
      }
      if (params.dateTo) {
        urlParams.append('to', params.dateTo);
      }

      navigate(`/results?${urlParams.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box className="home-container">
      <Container maxWidth="md">
        <Box className="home-content">
          {/* Logo/Title */}
          <Typography
            variant="h1"
            className="home-title"
            color="primary"
          >
            searGe
          </Typography>

        {/* Search Box */}
        <Box className="home-search-box">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="home-search-input"
          />
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" className="home-buttons">
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            size="large"
            className="home-button"
          >
            Search
          </Button>
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={() => setAdvancedOpen(true)}
            size="large"
            className="home-button"
          >
            Advanced Search
          </Button>
        </Stack>
      </Box>
      </Container>

      {/* Advanced Search Dialog */}
      <AdvancedSearch
        open={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
        onSearch={handleAdvancedSearch}
        initialParams={advancedParams}
      />
    </Box>
  );
}
