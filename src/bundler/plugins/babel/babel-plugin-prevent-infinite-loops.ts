// @ts-nocheck
/* eslint-disable */

const MAX_ITERATIONS = 10001;

export default ({ types: t, template }: any) => {
  const buildGuard = template(`
    if (!window.allowInfiniteLoops && ITERATOR++ > MAX_ITERATIONS) {
      if (!window.infiniteLoopError) {
        window.infiniteLoopError = new RangeError(
          'Potential infinite loop found!'
        );
      }
      throw window.infiniteLoopError;
    }
  `);

  return {
    visitor: {
      'WhileStatement|ForStatement|DoWhileStatement': (
        path: any,
        file: any
      ) => {
        const iterator = path.scope.parent.generateUidIdentifier('loopIt');
        const iteratorInit = t.numericLiteral(0);
        path.scope.parent.push({
          id: iterator,
          init: iteratorInit,
        });

        const guard = buildGuard({
          ITERATOR: iterator,
          MAX_ITERATIONS: t.numericLiteral(MAX_ITERATIONS),
        });
        if (!path.get('body').isBlockStatement()) {
          const statement = path.get('body').node;
          path.get('body').replaceWith(t.blockStatement([guard, statement]));
        } else {
          path.get('body').unshiftContainer('body', guard);
        }
      },
    },
  };
};
