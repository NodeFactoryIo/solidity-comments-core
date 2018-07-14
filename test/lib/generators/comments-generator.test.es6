import test from 'tape';
import CommentsGenerator from '../../../src/lib/generators/comments-generator';
import ContractParts from '../../../src/lib/contract-parts.es6.js';

let generator = new CommentsGenerator();

test('Assert contract comment is generated with author', (t) => {
  t.plan(1);
  let comment = generator.generate({
    type: ContractParts.CONTRACT,
    contractName: 'TestContract',
    author: 'Marin',
  });
  t.equal(comment,
    '/// @title TestContract\n' +
    '/// @author Marin\n' +
    '/// @notice\n' +
    '/// @dev');
});

test('Assert contract comment is generated with empty author', (t) => {
  t.plan(1);
  let comment = generator.generate({
    type: ContractParts.CONTRACT,
    contractName: 'TestContract',
    author: '',
  });
  t.equal(comment,
    '/// @title TestContract\n' +
    '/// @notice\n' +
    '/// @dev');
});

test('Assert contract comment is generated without author', (t) => {
  t.plan(1);
  let comment = generator.generate({
    type: ContractParts.CONTRACT,
    contractName: 'TestContract',
  });
  t.equal(comment,
    '/// @title TestContract\n' +
    '/// @notice\n' +
    '/// @dev');
});

test('Assert global variable comment is generated', (t) => {
  t.plan(1);
  let comment = generator.generate({
    type: ContractParts.GLOBAL_VARIABLE,
  });
  t.equal(comment, '/// @notice');
});

test('Assert modifier comment is generated with author and params', (t) => {
  t.plan(1);
  let comment = generator.generate({
    type: ContractParts.MODIFIER,
    author: 'Marin',
    params: [
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
    ],
  });
  t.equal(comment,
    '/// @author Marin\n' +
    '/// @dev\n' +
    '/// @param test1\n' +
    '/// @param test2\n'
  );
});

test('Assert modifier comment is generated without author and params', (t) => {
  t.plan(1);
  let comment = generator.generate({
    type: ContractParts.MODIFIER,
  });
  t.equal(comment, '/// @dev\n');
});

test('Assert private function comment is generated with author and params',
  (t) => {
    t.plan(1);
    let comment = generator.generate({
      type: ContractParts.PRIVATE_FUNCTION,
      author: 'Marin',
      params: [
        {
          name: 'test1',
        },
        {
          name: 'test2',
        },
      ],
    });
    t.equal(comment,
      '/// @author Marin\n' +
    '/// @dev\n' +
    '/// @param test1\n' +
    '/// @param test2\n' +
    '/// @return'
    );
  });

test('Assert public function comment is generated with author and params',
  (t) => {
    t.plan(1);
    let comment = generator.generate({
      type: ContractParts.PUBLIC_FUNCTION,
      author: 'Marin',
      params: [
        {
          name: 'test1',
        },
        {
          name: 'test2',
        },
      ],
    });
    t.equal(comment,
      '/// @author Marin\n' +
      '/// @notice\n' +
      '/// @dev\n' +
      '/// @param test1\n' +
      '/// @param test2\n' +
      '/// @return'
    );
  });
