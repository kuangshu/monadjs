import React from 'react';
import { split } from 'ramda';

const str = 'Hallo World';

const words = split(' ');

export default () => {
  return (
    <div>
      <div>const words = split(' ');</div>
      {words(str)}
    </div>
  );
};
