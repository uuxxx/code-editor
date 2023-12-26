// @ts-nocheck

const MAX_ITERATIONS = 10001;

export default ({ types: t, template }: any) => {
  // We set a global so that we can later fail the test
  // even if the error ends up being caught by the code.
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
        file: any,
      ) => {
        // An iterator that is incremented with each iteration
        const iterator = path.scope.parent.generateUidIdentifier('loopIt');
        const iteratorInit = t.numericLiteral(0);
        path.scope.parent.push({
          id: iterator,
          init: iteratorInit,
        });
        // If statement and throw error if it matches our criteria
        const guard = buildGuard({
          ITERATOR: iterator,
          MAX_ITERATIONS: t.numericLiteral(MAX_ITERATIONS),
        });
        // No block statment e.g. `while (1) 1;`
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
