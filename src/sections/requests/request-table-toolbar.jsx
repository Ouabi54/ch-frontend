import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import ToggleButton from '@mui/material/ToggleButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { RequestType, RequestStatus } from 'src/constants';

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
        <ToggleButton value={RequestStatus.ALL}>All</ToggleButton>
        <ToggleButton value={RequestStatus.PENDING}>Pending</ToggleButton>
        <ToggleButton value={RequestStatus.CANCELED}>Canceled</ToggleButton>
        <ToggleButton value={RequestStatus.ACCEPTED}>Accepted</ToggleButton>
        <ToggleButton value={RequestStatus.REJECTED}>Rejected</ToggleButton>
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
        <ToggleButton value={RequestType.ALL}>All</ToggleButton>
        <ToggleButton value={RequestType.SENT}>Sent</ToggleButton>
        <ToggleButton value={RequestType.RECEIVED}>Received</ToggleButton>
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
