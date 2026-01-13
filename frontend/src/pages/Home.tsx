import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import type { SearchParams } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedParams, setAdvancedParams] = useState<SearchParams>({
    query: '',
    documentType: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const handleAdvancedSearch = () => {
    if (advancedParams.query.trim()) {
      const params = new URLSearchParams({
        q: advancedParams.query,
      });
      
      if (advancedParams.documentType && advancedParams.documentType !== 'all') {
        params.append('type', advancedParams.documentType);
      }
      if (advancedParams.dateFrom) {
        params.append('from', advancedParams.dateFrom);
      }
      if (advancedParams.dateTo) {
        params.append('to', advancedParams.dateTo);
      }

      navigate(`/results?${params.toString()}`);
      setAdvancedOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* Logo/Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              textAlign: 'center',
            }}
          >
            searGe
          </Typography>

        {/* Search Box */}
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              sx: {
                borderRadius: 50,
                paddingRight: 1,
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            size="large"
            sx={{ borderRadius: 2 }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={() => setAdvancedOpen(true)}
            size="large"
            sx={{ borderRadius: 2 }}
          >
            Advanced Search
          </Button>
        </Stack>
      </Box>
      </Container>

      {/* Advanced Search Dialog */}
      <Dialog
        open={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Advanced Search</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Search Query"
              variant="outlined"
              value={advancedParams.query}
              onChange={(e) =>
                setAdvancedParams({ ...advancedParams, query: e.target.value })
              }
            />
            <TextField
              fullWidth
              select
              label="Document Type"
              value={advancedParams.documentType}
              onChange={(e) =>
                setAdvancedParams({ ...advancedParams, documentType: e.target.value })
              }
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="docx">DOCX</MenuItem>
              <MenuItem value="xlsx">XLSX</MenuItem>
              <MenuItem value="pptx">PPTX</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Date From"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={advancedParams.dateFrom}
              onChange={(e) =>
                setAdvancedParams({ ...advancedParams, dateFrom: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Date To"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={advancedParams.dateTo}
              onChange={(e) =>
                setAdvancedParams({ ...advancedParams, dateTo: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdvancedOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdvancedSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
