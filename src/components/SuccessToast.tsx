import * as React from 'react';
import Alert from '@mui/material/Alert';

const SuccessToast = ({ text = 'Success!' }) => {
  return (
    <Alert severity="success" color="success" className="success-toast">
      {text}
    </Alert>
  );
};
export default SuccessToast;
