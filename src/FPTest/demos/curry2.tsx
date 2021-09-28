import { map, split } from 'ramda';
import React from 'react';

const wordList = ['Hallo World', 'Hallo JavaScript'];
const words = split(' ');
const sentences = map(words);

export default () => {
  return (
    <div>
      <pre>
        const wordList = ['Hallo World', 'Hallo JavaScript'];
        <br />
        const sentences = map(words);
      </pre>
      {sentences(wordList).map((text, i) => (
        <div key={i}>{text.join('_')}</div>
      ))}
    </div>
  );
};
