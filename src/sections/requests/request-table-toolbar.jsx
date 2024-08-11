import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import ToggleButton from '@mui/material/ToggleButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RequestTableToolbar({ filterName, filterType, onFilterName, onFilterType, filterStatus, onFilterStatus }) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder="Search sender or target..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="status"
        value={filterStatus}
        onChange={(event, newType) => {  
          onFilterStatus(newType) 
        }}
      >
        <ToggleButton value="ALL">All</ToggleButton>
        <ToggleButton value="PENDING">Pending</ToggleButton>
        <ToggleButton value="CANCELED">Canceled</ToggleButton>
        <ToggleButton value="ACCEPTED">Accepted</ToggleButton>
        <ToggleButton value="REJECTED">Rejected</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="type"
        value={filterType}
        onChange={(event, newType) => {  
          onFilterType(newType) 
        }}
      >
        <ToggleButton value="ALL">All</ToggleButton>
        <ToggleButton value="SENT">Sent</ToggleButton>
        <ToggleButton value="RECEIVED">Received</ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

RequestTableToolbar.propTypes = {
  filterName: PropTypes.string,
  filterType: PropTypes.string,
  filterStatus: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterType: PropTypes.func,
  onFilterStatus: PropTypes.func,
};
