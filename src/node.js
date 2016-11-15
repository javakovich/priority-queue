"use strict";
class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null){
			node.parent = this;
			this.left = node;
		} else if (this.right == null){
			node.parent = this;
			this.right = node;
		}
	}

	removeChild(node) {
		if (node === this.left){
			node.parent = null;
			this.left = null;
		}  else if (node === this.right){
			node.parent = null;
			this.right = null;
		} else {
			throw "Not a child node";
		}
	}

	remove() {
		if (this.parent != null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null){
			let child = this;
			let childOfChildLeft = this.left;
			let childOfChildRight = this.right;
			let parent = this.parent;
			let parentOfParent = this.parent.parent;
			
			parent.parent = child;
			child.parent = parentOfParent;
			if (parent.left == child && parent.right != null){
				parent.right.parent = this;
			} 
			if (parent.right == child && parent.left != null){
				parent.left.parent = this;
			}
			
			if (parent.left == child){
				child.left = parent;
				child.right = parent.right;
			}
			
			if (parent.right == child){
				child.right = parent;
				child.left = parent.left;
			}
			
			parent.right = childOfChildRight;
			parent.left = childOfChildLeft;
			
		 	if (parentOfParent != null && parentOfParent.left == parent){
				parentOfParent.left = child;
			}
			if (parentOfParent != null && parentOfParent.right == parent){
				parentOfParent.right = child;
			} 
			
			if (childOfChildLeft != null){
				childOfChildLeft.parent = parent;
			}
			
			if (childOfChildRight != null){
				childOfChildRight.parent = parent;
			}
			
		}
	}
}

module.exports = Node;
