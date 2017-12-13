const path = require('path');

const { runSolution } = require('./shared/runhelpers');

runSolution(path.resolve(`./${process.argv[2]}`));
