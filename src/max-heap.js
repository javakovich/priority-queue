"use strict"
const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.currentNode = null;
		this.nodesCount= 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.nodesCount++;
	}

	pop() {
		if (this.root != null){
			let prevRoot = this.detachRoot()
			let valueToReturn = prevRoot.data;

			this.restoreRootFromLastInsertedNode(prevRoot);
			this.shiftNodeDown(this.root);
			
			this.nodesCount--;
			return valueToReturn;
		}
		
	}

	detachRoot() {
		if (this.root == this.parentNodes[0]) {
			this.parentNodes.shift();
		}
		let rootToReturn = this.root;
		this.root = null;
		return rootToReturn;
		
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length == 0){
			return;
		}
		
		let lastInsertedNode = this.parentNodes.pop();
		this.root = lastInsertedNode;
		
		if (lastInsertedNode.parent != null && lastInsertedNode.parent.left == lastInsertedNode){
			lastInsertedNode.parent.left = null;
		} else if (lastInsertedNode.parent != null && lastInsertedNode.parent.right == lastInsertedNode){
			lastInsertedNode.parent.right = null;
		}
		
		if (detached.left == lastInsertedNode || detached.left == null){
			this.root.left = null;
		} else {
			this.root.appendChild(detached.left);
		}
		
		if (detached.right == lastInsertedNode || detached.right == null){
			this.root.right = null;
		} else {
			this.root.appendChild(detached.right);
		}
		
		if (this.root.parent != null && this.root.parent != detached && this.parentNodes.indexOf(this.root.parent) == -1 ){
			this.parentNodes.unshift(this.root.parent);
		}
		this.root.parent = null;
		
		if (this.root.left == null || this.root.right == null){
			this.parentNodes.unshift(this.root);
		}
		
		
	}

	size() {
		return this.nodesCount;
	}

	isEmpty() {
		return this.nodesCount== 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.nodesCount= 0;
		
	}

	insertNode(node) {
		if (this.parentNodes.length == 0){
			this.root = node;
			this.parentNodes.push(node);
		} else {
			let parentNode = this.parentNodes[0];
			if (parentNode.left == null){
				parentNode.appendChild(node);
				this.parentNodes.push(node);
			} else if (parentNode.right == null){
				parentNode.appendChild(node);
				this.parentNodes.shift();
				this.parentNodes.push(node);
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent != null && (node.parent.priority < node.priority)){
			
			let indexOfNode = this.parentNodes.indexOf(node);
			let indexOfNodeParent = this.parentNodes.indexOf(node.parent);
			if (indexOfNode != -1){
				this.parentNodes[indexOfNode] = node.parent;
				if (indexOfNodeParent != -1){
					this.parentNodes[indexOfNodeParent] = node;
				}
			}
			
			node.swapWithParent();
			if (node.parent == null){
				this.root = node;
			}
			this.shiftNodeUp(node);
		}
		
	}

	shiftNodeDown(node) {
		if (node == null){
			return;
		}
		let childNode = null;
		
		if (node.left != null && (node.right == null || node.left.priority > node.right.priority) && node.left.priority > node.priority){
			childNode = node.left;
		} else if (node.right != null && (node.left == null || node.right.priority > node.left.priority) && node.right.priority > node.priority){
			childNode = node.right;
		}
		
		if (childNode != null){
			
			let indexOfChildNode = this.parentNodes.indexOf(childNode);
			let indexOfNode = this.parentNodes.indexOf(childNode.parent);
			if (indexOfChildNode != -1){
				this.parentNodes[indexOfChildNode] = childNode.parent;
				if (indexOfNode != -1){
					this.parentNodes[indexOfNode] = childNode;
				}
			}
			
			childNode.swapWithParent();
			if (childNode.parent == null){
				this.root = childNode;
			}
			this.shiftNodeDown(node);
		}
		
	}
}

module.exports = MaxHeap;
