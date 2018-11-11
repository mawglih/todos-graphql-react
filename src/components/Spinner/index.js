import React from "react";
import { DotLoader } from 'react-spinners';
import './Spinner.css';

export default () => (
  <div className="spinner">
    <DotLoader
      color={'lightblue'}
      size={100}
      margin="4px"
    />
  </div>
);
