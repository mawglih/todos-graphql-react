import React, { Fragment } from 'react';

export default ({ error}) => (
  <Fragment>
    {error.message}
  </Fragment>
);
