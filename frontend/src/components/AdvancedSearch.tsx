import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SearchParams } from '../types';
import './AdvancedSearch.css';

interface AdvancedSearchProps {
  open: boolean;
  onClose: () => void;
  onSearch: (params: SearchParams) => void;
  initialParams: SearchParams;
}

export default function AdvancedSearch({
  open,
  onClose,
  onSearch,
  initialParams,
}: AdvancedSearchProps) {
  const [params, setParams] = useState<SearchParams>(initialParams);

  const handleSearch = () => {
    if (params.query.trim()) {
      onSearch(params);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Advanced Search</DialogTitle>
      <DialogContent className="advanced-dialog-content">
        <Stack className="advanced-dialog-fields">
          <TextField
            fullWidth
            label="Search Query"
            variant="outlined"
            value={params.query}
            onChange={(e) =>
              setParams({ ...params, query: e.target.value })
            }
          />
          <TextField
            fullWidth
            select
            label="Document Type"
            value={params.documentType}
            onChange={(e) =>
              setParams({ ...params, documentType: e.target.value })
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
            value={params.dateFrom}
            onChange={(e) =>
              setParams({ ...params, dateFrom: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Date To"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={params.dateTo}
            onChange={(e) =>
              setParams({ ...params, dateTo: e.target.value })
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}
