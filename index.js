const MaxHeap = require('./src/max-heap');
const Node = require('./src/node');
const Queue = require('./src/queue');

let q = new Queue();

const nodes = [
				{ priority: 10, data: 1 },
				{ priority: 20, data: 2 },
				{ priority:  5, data: 3 },
				{ priority:  0, data: 4 },
				{ priority:  8, data: 5 },
				{ priority: 12, data: 6 },
				{ priority: 17, data: 7 },
				{ priority: 15, data: 8 },
			];

const expectedData = [2, 7, 8, 6, 1, 5, 3, 4]

nodes.forEach(node => q.push(node.data, node.priority));

let e1 = q.shift();
let e2 = q.shift();
let e3 = q.shift();
let e4 = q.shift();
let e5 = q.shift();
let e6 = q.shift();
let e7 = q.shift();
let e8 = q.shift();



window.h = h;
