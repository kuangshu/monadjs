import React from 'react';
import {
  concat,
  element,
  harvest,
  mapTree,
  repeat,
} from '../../utils/generator';

interface TreeData {
  value: number;
  children?: TreeData[];
}
const treeData: TreeData[] = [
  {
    value: 1,
    children: [
      { value: 2 },
      { value: 3, children: [{ value: 7 }, { value: 8 }] },
    ],
  },
  { value: 4, children: [{ value: 5 }, { value: 6 }] },
];

// const arr = harvest(
//   mapTree(treeData, (val) => (val.children ? val.children : [])),
// );

// console.log(arr  );

export default () => {
  return (
    <div>
      <button
        onClick={() => {
          const arr = harvest(
            concat(element([1, 2, 3]), element([]), element([4, 5, 6])),
          );
          console.log(arr);
        }}
      >
        collect arr
      </button>
      <button
        onClick={() => {
          const arr = mapTree(
            treeData,
            (data) => data.value + 10,
            (data) => (data.children ? data.children : []),
          );
          console.log('arr: ', arr);
        }}
      >
        log map tree result
      </button>
      <button
        onClick={() => {
          console.log(treeData);
        }}
      >
        log tree data
      </button>
    </div>
  );
};
