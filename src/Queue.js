let a = [];
let size = 0;
export default class Stack {
  constructor() {
  }

  add(ele) {
    a.push(ele);
    size++;
  }

  remove() {
    let cb = a[0];
    a.splice(0, 1);
    size--;
    return cb;
  }

  size() {
    return size;
  }

}
