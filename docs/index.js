/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/jstat/dist/jstat.js":
/*!******************************************!*\
  !*** ./node_modules/jstat/dist/jstat.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (window, factory) {
    if (true) {
        module.exports = factory();
    } else {}
})(this, function () {
var jStat = (function(Math, undefined) {

// For quick reference.
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

// Calculate correction for IEEE error
// TODO: This calculation can be improved.
function calcRdx(n, m) {
  var val = n > m ? n : m;
  return Math.pow(10,
                  17 - ~~(Math.log(((val > 0) ? val : -val)) * Math.LOG10E));
}


var isArray = Array.isArray || function isArray(arg) {
  return toString.call(arg) === '[object Array]';
};


function isFunction(arg) {
  return toString.call(arg) === '[object Function]';
}


function isNumber(num) {
  return (typeof num === 'number') ? num - num === 0 : false;
}


// Converts the jStat matrix to vector.
function toVector(arr) {
  return concat.apply([], arr);
}


// The one and only jStat constructor.
function jStat() {
  return new jStat._init(arguments);
}


// TODO: Remove after all references in src files have been removed.
jStat.fn = jStat.prototype;


// By separating the initializer from the constructor it's easier to handle
// always returning a new instance whether "new" was used or not.
jStat._init = function _init(args) {
  // If first argument is an array, must be vector or matrix.
  if (isArray(args[0])) {
    // Check if matrix.
    if (isArray(args[0][0])) {
      // See if a mapping function was also passed.
      if (isFunction(args[1]))
        args[0] = jStat.map(args[0], args[1]);
      // Iterate over each is faster than this.push.apply(this, args[0].
      for (var i = 0; i < args[0].length; i++)
        this[i] = args[0][i];
      this.length = args[0].length;

    // Otherwise must be a vector.
    } else {
      this[0] = isFunction(args[1]) ? jStat.map(args[0], args[1]) : args[0];
      this.length = 1;
    }

  // If first argument is number, assume creation of sequence.
  } else if (isNumber(args[0])) {
    this[0] = jStat.seq.apply(null, args);
    this.length = 1;

  // Handle case when jStat object is passed to jStat.
  } else if (args[0] instanceof jStat) {
    // Duplicate the object and pass it back.
    return jStat(args[0].toArray());

  // Unexpected argument value, return empty jStat object.
  // TODO: This is strange behavior. Shouldn't this throw or some such to let
  // the user know they had bad arguments?
  } else {
    this[0] = [];
    this.length = 1;
  }

  return this;
};
jStat._init.prototype = jStat.prototype;
jStat._init.constructor = jStat;


// Utility functions.
// TODO: for internal use only?
jStat.utils = {
  calcRdx: calcRdx,
  isArray: isArray,
  isFunction: isFunction,
  isNumber: isNumber,
  toVector: toVector
};


jStat._random_fn = Math.random;
jStat.setRandom = function setRandom(fn) {
  if (typeof fn !== 'function')
    throw new TypeError('fn is not a function');
  jStat._random_fn = fn;
};


// Easily extend the jStat object.
// TODO: is this seriously necessary?
jStat.extend = function extend(obj) {
  var i, j;

  if (arguments.length === 1) {
    for (j in obj)
      jStat[j] = obj[j];
    return this;
  }

  for (i = 1; i < arguments.length; i++) {
    for (j in arguments[i])
      obj[j] = arguments[i][j];
  }

  return obj;
};


// Returns the number of rows in the matrix.
jStat.rows = function rows(arr) {
  return arr.length || 1;
};


// Returns the number of columns in the matrix.
jStat.cols = function cols(arr) {
  return arr[0].length || 1;
};


// Returns the dimensions of the object { rows: i, cols: j }
jStat.dimensions = function dimensions(arr) {
  return {
    rows: jStat.rows(arr),
    cols: jStat.cols(arr)
  };
};


// Returns a specified row as a vector or return a sub matrix by pick some rows
jStat.row = function row(arr, index) {
  if (isArray(index)) {
    return index.map(function(i) {
      return jStat.row(arr, i);
    })
  }
  return arr[index];
};


// return row as array
// rowa([[1,2],[3,4]],0) -> [1,2]
jStat.rowa = function rowa(arr, i) {
  return jStat.row(arr, i);
};


// Returns the specified column as a vector or return a sub matrix by pick some
// columns
jStat.col = function col(arr, index) {
  if (isArray(index)) {
    var submat = jStat.arange(arr.length).map(function() {
      return new Array(index.length);
    });
    index.forEach(function(ind, i){
      jStat.arange(arr.length).forEach(function(j) {
        submat[j][i] = arr[j][ind];
      });
    });
    return submat;
  }
  var column = new Array(arr.length);
  for (var i = 0; i < arr.length; i++)
    column[i] = [arr[i][index]];
  return column;
};


// return column as array
// cola([[1,2],[3,4]],0) -> [1,3]
jStat.cola = function cola(arr, i) {
  return jStat.col(arr, i).map(function(a){ return a[0] });
};


// Returns the diagonal of the matrix
jStat.diag = function diag(arr) {
  var nrow = jStat.rows(arr);
  var res = new Array(nrow);
  for (var row = 0; row < nrow; row++)
    res[row] = [arr[row][row]];
  return res;
};


// Returns the anti-diagonal of the matrix
jStat.antidiag = function antidiag(arr) {
  var nrow = jStat.rows(arr) - 1;
  var res = new Array(nrow);
  for (var i = 0; nrow >= 0; nrow--, i++)
    res[i] = [arr[i][nrow]];
  return res;
};

// Transpose a matrix or array.
jStat.transpose = function transpose(arr) {
  var obj = [];
  var objArr, rows, cols, j, i;

  // Make sure arr is in matrix format.
  if (!isArray(arr[0]))
    arr = [arr];

  rows = arr.length;
  cols = arr[0].length;

  for (i = 0; i < cols; i++) {
    objArr = new Array(rows);
    for (j = 0; j < rows; j++)
      objArr[j] = arr[j][i];
    obj.push(objArr);
  }

  // If obj is vector, return only single array.
  return obj.length === 1 ? obj[0] : obj;
};


// Map a function to an array or array of arrays.
// "toAlter" is an internal variable.
jStat.map = function map(arr, func, toAlter) {
  var row, nrow, ncol, res, col;

  if (!isArray(arr[0]))
    arr = [arr];

  nrow = arr.length;
  ncol = arr[0].length;
  res = toAlter ? arr : new Array(nrow);

  for (row = 0; row < nrow; row++) {
    // if the row doesn't exist, create it
    if (!res[row])
      res[row] = new Array(ncol);
    for (col = 0; col < ncol; col++)
      res[row][col] = func(arr[row][col], row, col);
  }

  return res.length === 1 ? res[0] : res;
};


// Cumulatively combine the elements of an array or array of arrays using a function.
jStat.cumreduce = function cumreduce(arr, func, toAlter) {
  var row, nrow, ncol, res, col;

  if (!isArray(arr[0]))
    arr = [arr];

  nrow = arr.length;
  ncol = arr[0].length;
  res = toAlter ? arr : new Array(nrow);

  for (row = 0; row < nrow; row++) {
    // if the row doesn't exist, create it
    if (!res[row])
      res[row] = new Array(ncol);
    if (ncol > 0)
      res[row][0] = arr[row][0];
    for (col = 1; col < ncol; col++)
      res[row][col] = func(res[row][col-1], arr[row][col]);
  }
  return res.length === 1 ? res[0] : res;
};


// Destructively alter an array.
jStat.alter = function alter(arr, func) {
  return jStat.map(arr, func, true);
};


// Generate a rows x cols matrix according to the supplied function.
jStat.create = function  create(rows, cols, func) {
  var res = new Array(rows);
  var i, j;

  if (isFunction(cols)) {
    func = cols;
    cols = rows;
  }

  for (i = 0; i < rows; i++) {
    res[i] = new Array(cols);
    for (j = 0; j < cols; j++)
      res[i][j] = func(i, j);
  }

  return res;
};


function retZero() { return 0; }


// Generate a rows x cols matrix of zeros.
jStat.zeros = function zeros(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, retZero);
};


function retOne() { return 1; }


// Generate a rows x cols matrix of ones.
jStat.ones = function ones(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, retOne);
};


// Generate a rows x cols matrix of uniformly random numbers.
jStat.rand = function rand(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, jStat._random_fn);
};


function retIdent(i, j) { return i === j ? 1 : 0; }


// Generate an identity matrix of size row x cols.
jStat.identity = function identity(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, retIdent);
};


// Tests whether a matrix is symmetric
jStat.symmetric = function symmetric(arr) {
  var size = arr.length;
  var row, col;

  if (arr.length !== arr[0].length)
    return false;

  for (row = 0; row < size; row++) {
    for (col = 0; col < size; col++)
      if (arr[col][row] !== arr[row][col])
        return false;
  }

  return true;
};


// Set all values to zero.
jStat.clear = function clear(arr) {
  return jStat.alter(arr, retZero);
};


// Generate sequence.
jStat.seq = function seq(min, max, length, func) {
  if (!isFunction(func))
    func = false;

  var arr = [];
  var hival = calcRdx(min, max);
  var step = (max * hival - min * hival) / ((length - 1) * hival);
  var current = min;
  var cnt;

  // Current is assigned using a technique to compensate for IEEE error.
  // TODO: Needs better implementation.
  for (cnt = 0;
       current <= max && cnt < length;
       cnt++, current = (min * hival + step * hival * cnt) / hival) {
    arr.push((func ? func(current, cnt) : current));
  }

  return arr;
};


// arange(5) -> [0,1,2,3,4]
// arange(1,5) -> [1,2,3,4]
// arange(5,1,-1) -> [5,4,3,2]
jStat.arange = function arange(start, end, step) {
  var rl = [];
  var i;
  step = step || 1;
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (start === end || step === 0) {
    return [];
  }
  if (start < end && step < 0) {
    return [];
  }
  if (start > end && step > 0) {
    return [];
  }
  if (step > 0) {
    for (i = start; i < end; i += step) {
      rl.push(i);
    }
  } else {
    for (i = start; i > end; i += step) {
      rl.push(i);
    }
  }
  return rl;
};


// A=[[1,2,3],[4,5,6],[7,8,9]]
// slice(A,{row:{end:2},col:{start:1}}) -> [[2,3],[5,6]]
// slice(A,1,{start:1}) -> [5,6]
// as numpy code A[:2,1:]
jStat.slice = (function(){
  function _slice(list, start, end, step) {
    // note it's not equal to range.map mode it's a bug
    var i;
    var rl = [];
    var length = list.length;
    if (start === undefined && end === undefined && step === undefined) {
      return jStat.copy(list);
    }

    start = start || 0;
    end = end || list.length;
    start = start >= 0 ? start : length + start;
    end = end >= 0 ? end : length + end;
    step = step || 1;
    if (start === end || step === 0) {
      return [];
    }
    if (start < end && step < 0) {
      return [];
    }
    if (start > end && step > 0) {
      return [];
    }
    if (step > 0) {
      for (i = start; i < end; i += step) {
        rl.push(list[i]);
      }
    } else {
      for (i = start; i > end;i += step) {
        rl.push(list[i]);
      }
    }
    return rl;
  }

  function slice(list, rcSlice) {
    var colSlice, rowSlice;
    rcSlice = rcSlice || {};
    if (isNumber(rcSlice.row)) {
      if (isNumber(rcSlice.col))
        return list[rcSlice.row][rcSlice.col];
      var row = jStat.rowa(list, rcSlice.row);
      colSlice = rcSlice.col || {};
      return _slice(row, colSlice.start, colSlice.end, colSlice.step);
    }

    if (isNumber(rcSlice.col)) {
      var col = jStat.cola(list, rcSlice.col);
      rowSlice = rcSlice.row || {};
      return _slice(col, rowSlice.start, rowSlice.end, rowSlice.step);
    }

    rowSlice = rcSlice.row || {};
    colSlice = rcSlice.col || {};
    var rows = _slice(list, rowSlice.start, rowSlice.end, rowSlice.step);
    return rows.map(function(row) {
      return _slice(row, colSlice.start, colSlice.end, colSlice.step);
    });
  }

  return slice;
}());


// A=[[1,2,3],[4,5,6],[7,8,9]]
// sliceAssign(A,{row:{start:1},col:{start:1}},[[0,0],[0,0]])
// A=[[1,2,3],[4,0,0],[7,0,0]]
jStat.sliceAssign = function sliceAssign(A, rcSlice, B) {
  var nl, ml;
  if (isNumber(rcSlice.row)) {
    if (isNumber(rcSlice.col))
      return A[rcSlice.row][rcSlice.col] = B;
    rcSlice.col = rcSlice.col || {};
    rcSlice.col.start = rcSlice.col.start || 0;
    rcSlice.col.end = rcSlice.col.end || A[0].length;
    rcSlice.col.step = rcSlice.col.step || 1;
    nl = jStat.arange(rcSlice.col.start,
                          Math.min(A.length, rcSlice.col.end),
                          rcSlice.col.step);
    var m = rcSlice.row;
    nl.forEach(function(n, i) {
      A[m][n] = B[i];
    });
    return A;
  }

  if (isNumber(rcSlice.col)) {
    rcSlice.row = rcSlice.row || {};
    rcSlice.row.start = rcSlice.row.start || 0;
    rcSlice.row.end = rcSlice.row.end || A.length;
    rcSlice.row.step = rcSlice.row.step || 1;
    ml = jStat.arange(rcSlice.row.start,
                          Math.min(A[0].length, rcSlice.row.end),
                          rcSlice.row.step);
    var n = rcSlice.col;
    ml.forEach(function(m, j) {
      A[m][n] = B[j];
    });
    return A;
  }

  if (B[0].length === undefined) {
    B = [B];
  }
  rcSlice.row.start = rcSlice.row.start || 0;
  rcSlice.row.end = rcSlice.row.end || A.length;
  rcSlice.row.step = rcSlice.row.step || 1;
  rcSlice.col.start = rcSlice.col.start || 0;
  rcSlice.col.end = rcSlice.col.end || A[0].length;
  rcSlice.col.step = rcSlice.col.step || 1;
  ml = jStat.arange(rcSlice.row.start,
                        Math.min(A.length, rcSlice.row.end),
                        rcSlice.row.step);
  nl = jStat.arange(rcSlice.col.start,
                        Math.min(A[0].length, rcSlice.col.end),
                        rcSlice.col.step);
  ml.forEach(function(m, i) {
    nl.forEach(function(n, j) {
      A[m][n] = B[i][j];
    });
  });
  return A;
};


// [1,2,3] ->
// [[1,0,0],[0,2,0],[0,0,3]]
jStat.diagonal = function diagonal(diagArray) {
  var mat = jStat.zeros(diagArray.length, diagArray.length);
  diagArray.forEach(function(t, i) {
    mat[i][i] = t;
  });
  return mat;
};


// return copy of A
jStat.copy = function copy(A) {
  return A.map(function(row) {
    if (isNumber(row))
      return row;
    return row.map(function(t) {
      return t;
    });
  });
};


// TODO: Go over this entire implementation. Seems a tragic waste of resources
// doing all this work. Instead, and while ugly, use new Function() to generate
// a custom function for each static method.

// Quick reference.
var jProto = jStat.prototype;

// Default length.
jProto.length = 0;

// For internal use only.
// TODO: Check if they're actually used, and if they are then rename them
// to _*
jProto.push = Array.prototype.push;
jProto.sort = Array.prototype.sort;
jProto.splice = Array.prototype.splice;
jProto.slice = Array.prototype.slice;


// Return a clean array.
jProto.toArray = function toArray() {
  return this.length > 1 ? slice.call(this) : slice.call(this)[0];
};


// Map a function to a matrix or vector.
jProto.map = function map(func, toAlter) {
  return jStat(jStat.map(this, func, toAlter));
};


// Cumulatively combine the elements of a matrix or vector using a function.
jProto.cumreduce = function cumreduce(func, toAlter) {
  return jStat(jStat.cumreduce(this, func, toAlter));
};


// Destructively alter an array.
jProto.alter = function alter(func) {
  jStat.alter(this, func);
  return this;
};


// Extend prototype with methods that have no argument.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function(func) {
      var self = this,
      results;
      // Check for callback.
      if (func) {
        setTimeout(function() {
          func.call(self, jProto[passfunc].call(self));
        });
        return this;
      }
      results = jStat[passfunc](this);
      return isArray(results) ? jStat(results) : results;
    };
  })(funcs[i]);
})('transpose clear symmetric rows cols dimensions diag antidiag'.split(' '));


// Extend prototype with methods that have one argument.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function(index, func) {
      var self = this;
      // check for callback
      if (func) {
        setTimeout(function() {
          func.call(self, jProto[passfunc].call(self, index));
        });
        return this;
      }
      return jStat(jStat[passfunc](this, index));
    };
  })(funcs[i]);
})('row col'.split(' '));


// Extend prototype with simple shortcut methods.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function() {
      return jStat(jStat[passfunc].apply(null, arguments));
    };
  })(funcs[i]);
})('create zeros ones rand identity'.split(' '));


// Exposing jStat.
return jStat;

}(Math));
(function(jStat, Math) {

var isFunction = jStat.utils.isFunction;

// Ascending functions for sort
function ascNum(a, b) { return a - b; }

function clip(arg, min, max) {
  return Math.max(min, Math.min(arg, max));
}


// sum of an array
jStat.sum = function sum(arr) {
  var sum = 0;
  var i = arr.length;
  while (--i >= 0)
    sum += arr[i];
  return sum;
};


// sum squared
jStat.sumsqrd = function sumsqrd(arr) {
  var sum = 0;
  var i = arr.length;
  while (--i >= 0)
    sum += arr[i] * arr[i];
  return sum;
};


// sum of squared errors of prediction (SSE)
jStat.sumsqerr = function sumsqerr(arr) {
  var mean = jStat.mean(arr);
  var sum = 0;
  var i = arr.length;
  var tmp;
  while (--i >= 0) {
    tmp = arr[i] - mean;
    sum += tmp * tmp;
  }
  return sum;
};

// sum of an array in each row
jStat.sumrow = function sumrow(arr) {
  var sum = 0;
  var i = arr.length;
  while (--i >= 0)
    sum += arr[i];
  return sum;
};

// product of an array
jStat.product = function product(arr) {
  var prod = 1;
  var i = arr.length;
  while (--i >= 0)
    prod *= arr[i];
  return prod;
};


// minimum value of an array
jStat.min = function min(arr) {
  var low = arr[0];
  var i = 0;
  while (++i < arr.length)
    if (arr[i] < low)
      low = arr[i];
  return low;
};


// maximum value of an array
jStat.max = function max(arr) {
  var high = arr[0];
  var i = 0;
  while (++i < arr.length)
    if (arr[i] > high)
      high = arr[i];
  return high;
};


// unique values of an array
jStat.unique = function unique(arr) {
  var hash = {}, _arr = [];
  for(var i = 0; i < arr.length; i++) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      _arr.push(arr[i]);
    }
  }
  return _arr;
};


// mean value of an array
jStat.mean = function mean(arr) {
  return jStat.sum(arr) / arr.length;
};


// mean squared error (MSE)
jStat.meansqerr = function meansqerr(arr) {
  return jStat.sumsqerr(arr) / arr.length;
};


// geometric mean of an array
jStat.geomean = function geomean(arr) {
  return Math.pow(jStat.product(arr), 1 / arr.length);
};


// median of an array
jStat.median = function median(arr) {
  var arrlen = arr.length;
  var _arr = arr.slice().sort(ascNum);
  // check if array is even or odd, then return the appropriate
  return !(arrlen & 1)
    ? (_arr[(arrlen / 2) - 1 ] + _arr[(arrlen / 2)]) / 2
    : _arr[(arrlen / 2) | 0 ];
};


// cumulative sum of an array
jStat.cumsum = function cumsum(arr) {
  return jStat.cumreduce(arr, function (a, b) { return a + b; });
};


// cumulative product of an array
jStat.cumprod = function cumprod(arr) {
  return jStat.cumreduce(arr, function (a, b) { return a * b; });
};


// successive differences of a sequence
jStat.diff = function diff(arr) {
  var diffs = [];
  var arrLen = arr.length;
  var i;
  for (i = 1; i < arrLen; i++)
    diffs.push(arr[i] - arr[i - 1]);
  return diffs;
};


// ranks of an array
jStat.rank = function (arr) {
  var i;
  var distinctNumbers = [];
  var numberCounts = {};
  for (i = 0; i < arr.length; i++) {
    var number = arr[i];
    if (numberCounts[number]) {
      numberCounts[number]++;
    } else {
      numberCounts[number] = 1;
      distinctNumbers.push(number);
    }
  }

  var sortedDistinctNumbers = distinctNumbers.sort(ascNum);
  var numberRanks = {};
  var currentRank = 1;
  for (i = 0; i < sortedDistinctNumbers.length; i++) {
    var number = sortedDistinctNumbers[i];
    var count = numberCounts[number];
    var first = currentRank;
    var last = currentRank + count - 1;
    var rank = (first + last) / 2;
    numberRanks[number] = rank;
    currentRank += count;
  }

  return arr.map(function (number) {
    return numberRanks[number];
  });
};


// mode of an array
// if there are multiple modes of an array, return all of them
// is this the appropriate way of handling it?
jStat.mode = function mode(arr) {
  var arrLen = arr.length;
  var _arr = arr.slice().sort(ascNum);
  var count = 1;
  var maxCount = 0;
  var numMaxCount = 0;
  var mode_arr = [];
  var i;

  for (i = 0; i < arrLen; i++) {
    if (_arr[i] === _arr[i + 1]) {
      count++;
    } else {
      if (count > maxCount) {
        mode_arr = [_arr[i]];
        maxCount = count;
        numMaxCount = 0;
      }
      // are there multiple max counts
      else if (count === maxCount) {
        mode_arr.push(_arr[i]);
        numMaxCount++;
      }
      // resetting count for new value in array
      count = 1;
    }
  }

  return numMaxCount === 0 ? mode_arr[0] : mode_arr;
};


// range of an array
jStat.range = function range(arr) {
  return jStat.max(arr) - jStat.min(arr);
};

// variance of an array
// flag = true indicates sample instead of population
jStat.variance = function variance(arr, flag) {
  return jStat.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
};

// pooled variance of an array of arrays
jStat.pooledvariance = function pooledvariance(arr) {
  var sumsqerr = arr.reduce(function (a, samples) {return a + jStat.sumsqerr(samples);}, 0);
  var count = arr.reduce(function (a, samples) {return a + samples.length;}, 0);
  return sumsqerr / (count - arr.length);
};

// deviation of an array
jStat.deviation = function (arr) {
  var mean = jStat.mean(arr);
  var arrlen = arr.length;
  var dev = new Array(arrlen);
  for (var i = 0; i < arrlen; i++) {
    dev[i] = arr[i] - mean;
  }
  return dev;
};

// standard deviation of an array
// flag = true indicates sample instead of population
jStat.stdev = function stdev(arr, flag) {
  return Math.sqrt(jStat.variance(arr, flag));
};

// pooled standard deviation of an array of arrays
jStat.pooledstdev = function pooledstdev(arr) {
  return Math.sqrt(jStat.pooledvariance(arr));
};

// mean deviation (mean absolute deviation) of an array
jStat.meandev = function meandev(arr) {
  var mean = jStat.mean(arr);
  var a = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    a.push(Math.abs(arr[i] - mean));
  }
  return jStat.mean(a);
};


// median deviation (median absolute deviation) of an array
jStat.meddev = function meddev(arr) {
  var median = jStat.median(arr);
  var a = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    a.push(Math.abs(arr[i] - median));
  }
  return jStat.median(a);
};


// coefficient of variation
jStat.coeffvar = function coeffvar(arr) {
  return jStat.stdev(arr) / jStat.mean(arr);
};


// quartiles of an array
jStat.quartiles = function quartiles(arr) {
  var arrlen = arr.length;
  var _arr = arr.slice().sort(ascNum);
  return [
    _arr[ Math.round((arrlen) / 4) - 1 ],
    _arr[ Math.round((arrlen) / 2) - 1 ],
    _arr[ Math.round((arrlen) * 3 / 4) - 1 ]
  ];
};


// Arbitary quantiles of an array. Direct port of the scipy.stats
// implementation by Pierre GF Gerard-Marchant.
jStat.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
  var sortedArray = arr.slice().sort(ascNum);
  var quantileVals = [quantilesArray.length];
  var n = arr.length;
  var i, p, m, aleph, k, gamma;

  if (typeof alphap === 'undefined')
    alphap = 3 / 8;
  if (typeof betap === 'undefined')
    betap = 3 / 8;

  for (i = 0; i < quantilesArray.length; i++) {
    p = quantilesArray[i];
    m = alphap + p * (1 - alphap - betap);
    aleph = n * p + m;
    k = Math.floor(clip(aleph, 1, n - 1));
    gamma = clip(aleph - k, 0, 1);
    quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
  }

  return quantileVals;
};

// Return the k-th percentile of values in a range, where k is in the range 0..1, inclusive.
// Passing true for the exclusive parameter excludes both endpoints of the range.
jStat.percentile = function percentile(arr, k, exclusive) {
  var _arr = arr.slice().sort(ascNum);
  var realIndex = k * (_arr.length + (exclusive ? 1 : -1)) + (exclusive ? 0 : 1);
  var index = parseInt(realIndex);
  var frac = realIndex - index;
  if (index + 1 < _arr.length) {
    return _arr[index - 1] + frac * (_arr[index] - _arr[index - 1]);
  } else {
    return _arr[index - 1];
  }
}

// The percentile rank of score in a given array. Returns the percentage
// of all values in the input array that are less than (kind='strict') or
// less or equal than (kind='weak') score. Default is weak.
jStat.percentileOfScore = function percentileOfScore(arr, score, kind) {
  var counter = 0;
  var len = arr.length;
  var strict = false;
  var value, i;

  if (kind === 'strict')
    strict = true;

  for (i = 0; i < len; i++) {
    value = arr[i];
    if ((strict && value < score) ||
        (!strict && value <= score)) {
      counter++;
    }
  }

  return counter / len;
};


// Histogram (bin count) data
jStat.histogram = function histogram(arr, binCnt) {
  binCnt = binCnt || 4;
  var first = jStat.min(arr);
  var binWidth = (jStat.max(arr) - first) / binCnt;
  var len = arr.length;
  var bins = [];
  var i;

  for (i = 0; i < binCnt; i++)
    bins[i] = 0;
  for (i = 0; i < len; i++)
    bins[Math.min(Math.floor(((arr[i] - first) / binWidth)), binCnt - 1)] += 1;

  return bins;
};


// covariance of two arrays
jStat.covariance = function covariance(arr1, arr2) {
  var u = jStat.mean(arr1);
  var v = jStat.mean(arr2);
  var arr1Len = arr1.length;
  var sq_dev = new Array(arr1Len);
  var i;

  for (i = 0; i < arr1Len; i++)
    sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);

  return jStat.sum(sq_dev) / (arr1Len - 1);
};


// (pearson's) population correlation coefficient, rho
jStat.corrcoeff = function corrcoeff(arr1, arr2) {
  return jStat.covariance(arr1, arr2) /
      jStat.stdev(arr1, 1) /
      jStat.stdev(arr2, 1);
};

  // (spearman's) rank correlation coefficient, sp
jStat.spearmancoeff =  function (arr1, arr2) {
  arr1 = jStat.rank(arr1);
  arr2 = jStat.rank(arr2);
  //return pearson's correlation of the ranks:
  return jStat.corrcoeff(arr1, arr2);
}


// statistical standardized moments (general form of skew/kurt)
jStat.stanMoment = function stanMoment(arr, n) {
  var mu = jStat.mean(arr);
  var sigma = jStat.stdev(arr);
  var len = arr.length;
  var skewSum = 0;

  for (var i = 0; i < len; i++)
    skewSum += Math.pow((arr[i] - mu) / sigma, n);

  return skewSum / arr.length;
};

// (pearson's) moment coefficient of skewness
jStat.skewness = function skewness(arr) {
  return jStat.stanMoment(arr, 3);
};

// (pearson's) (excess) kurtosis
jStat.kurtosis = function kurtosis(arr) {
  return jStat.stanMoment(arr, 4) - 3;
};


var jProto = jStat.prototype;


// Extend jProto with method for calculating cumulative sums and products.
// This differs from the similar extension below as cumsum and cumprod should
// not be run again in the case fullbool === true.
// If a matrix is passed, automatically assume operation should be done on the
// columns.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    // If a matrix is passed, automatically assume operation should be done on
    // the columns.
    jProto[passfunc] = function(fullbool, func) {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      // Assignment reassignation depending on how parameters were passed in.
      if (isFunction(fullbool)) {
        func = fullbool;
        fullbool = false;
      }
      // Check if a callback was passed with the function.
      if (func) {
        setTimeout(function() {
          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
        });
        return this;
      }
      // Check if matrix and run calculations.
      if (this.length > 1) {
        tmpthis = fullbool === true ? this : this.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = jStat[passfunc](tmpthis[i]);
        return arr;
      }
      // Pass fullbool if only vector, not a matrix. for variance and stdev.
      return jStat[passfunc](this[0], fullbool);
    };
  })(funcs[i]);
})(('cumsum cumprod').split(' '));


// Extend jProto with methods which don't require arguments and work on columns.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    // If a matrix is passed, automatically assume operation should be done on
    // the columns.
    jProto[passfunc] = function(fullbool, func) {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      // Assignment reassignation depending on how parameters were passed in.
      if (isFunction(fullbool)) {
        func = fullbool;
        fullbool = false;
      }
      // Check if a callback was passed with the function.
      if (func) {
        setTimeout(function() {
          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
        });
        return this;
      }
      // Check if matrix and run calculations.
      if (this.length > 1) {
        if (passfunc !== 'sumrow')
          tmpthis = fullbool === true ? this : this.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = jStat[passfunc](tmpthis[i]);
        return fullbool === true
            ? jStat[passfunc](jStat.utils.toVector(arr))
            : arr;
      }
      // Pass fullbool if only vector, not a matrix. for variance and stdev.
      return jStat[passfunc](this[0], fullbool);
    };
  })(funcs[i]);
})(('sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr ' +
    'geomean median diff rank mode range variance deviation stdev meandev ' +
    'meddev coeffvar quartiles histogram skewness kurtosis').split(' '));


// Extend jProto with functions that take arguments. Operations on matrices are
// done on columns.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function() {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      var args = Array.prototype.slice.call(arguments);
      var callbackFunction;

      // If the last argument is a function, we assume it's a callback; we
      // strip the callback out and call the function again.
      if (isFunction(args[args.length - 1])) {
        callbackFunction = args[args.length - 1];
        var argsToPass = args.slice(0, args.length - 1);

        setTimeout(function() {
          callbackFunction.call(tmpthis,
                                jProto[passfunc].apply(tmpthis, argsToPass));
        });
        return this;

      // Otherwise we curry the function args and call normally.
      } else {
        callbackFunction = undefined;
        var curriedFunction = function curriedFunction(vector) {
          return jStat[passfunc].apply(tmpthis, [vector].concat(args));
        }
      }

      // If this is a matrix, run column-by-column.
      if (this.length > 1) {
        tmpthis = tmpthis.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = curriedFunction(tmpthis[i]);
        return arr;
      }

      // Otherwise run on the vector.
      return curriedFunction(this[0]);
    };
  })(funcs[i]);
})('quantiles percentileOfScore'.split(' '));

}(jStat, Math));
// Special functions //
(function(jStat, Math) {

// Log-gamma function
jStat.gammaln = function gammaln(x) {
  var j = 0;
  var cof = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
  ];
  var ser = 1.000000000190015;
  var xx, y, tmp;
  tmp = (y = xx = x) + 5.5;
  tmp -= (xx + 0.5) * Math.log(tmp);
  for (; j < 6; j++)
    ser += cof[j] / ++y;
  return Math.log(2.5066282746310005 * ser / xx) - tmp;
};

/*
 * log-gamma function to support poisson distribution sampling. The
 * algorithm comes from SPECFUN by Shanjie Zhang and Jianming Jin and their
 * book "Computation of Special Functions", 1996, John Wiley & Sons, Inc.
 */
jStat.loggam = function loggam(x) {
  var x0, x2, xp, gl, gl0;
  var k, n;

  var a = [8.333333333333333e-02, -2.777777777777778e-03,
          7.936507936507937e-04, -5.952380952380952e-04,
          8.417508417508418e-04, -1.917526917526918e-03,
          6.410256410256410e-03, -2.955065359477124e-02,
          1.796443723688307e-01, -1.39243221690590e+00];
  x0 = x;
  n = 0;
  if ((x == 1.0) || (x == 2.0)) {
      return 0.0;
  }
  if (x <= 7.0) {
      n = Math.floor(7 - x);
      x0 = x + n;
  }
  x2 = 1.0 / (x0 * x0);
  xp = 2 * Math.PI;
  gl0 = a[9];
  for (k = 8; k >= 0; k--) {
      gl0 *= x2;
      gl0 += a[k];
  }
  gl = gl0 / x0 + 0.5 * Math.log(xp) + (x0 - 0.5) * Math.log(x0) - x0;
  if (x <= 7.0) {
      for (k = 1; k <= n; k++) {
          gl -= Math.log(x0 - 1.0);
          x0 -= 1.0;
      }
  }
  return gl;
}

// gamma of x
jStat.gammafn = function gammafn(x) {
  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
           629.3311553128184, 866.9662027904133, -31451.272968848367,
           -36144.413418691176, 66456.14382024054
  ];
  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
           -3107.771671572311, 22538.118420980151, 4755.8462775278811,
           -134659.9598649693, -115132.2596755535];
  var fact = false;
  var n = 0;
  var xden = 0;
  var xnum = 0;
  var y = x;
  var i, z, yi, res;
  if (x > 171.6243769536076) {
    return Infinity;
  }
  if (y <= 0) {
    res = y % 1 + 3.6e-16;
    if (res) {
      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
      y = 1 - y;
    } else {
      return Infinity;
    }
  }
  yi = y;
  if (y < 1) {
    z = y++;
  } else {
    z = (y -= n = (y | 0) - 1) - 1;
  }
  for (i = 0; i < 8; ++i) {
    xnum = (xnum + p[i]) * z;
    xden = xden * z + q[i];
  }
  res = xnum / xden + 1;
  if (yi < y) {
    res /= yi;
  } else if (yi > y) {
    for (i = 0; i < n; ++i) {
      res *= y;
      y++;
    }
  }
  if (fact) {
    res = fact / res;
  }
  return res;
};


// lower incomplete gamma function, which is usually typeset with a
// lower-case greek gamma as the function symbol
jStat.gammap = function gammap(a, x) {
  return jStat.lowRegGamma(a, x) * jStat.gammafn(a);
};


// The lower regularized incomplete gamma function, usually written P(a,x)
jStat.lowRegGamma = function lowRegGamma(a, x) {
  var aln = jStat.gammaln(a);
  var ap = a;
  var sum = 1 / a;
  var del = sum;
  var b = x + 1 - a;
  var c = 1 / 1.0e-30;
  var d = 1 / b;
  var h = d;
  var i = 1;
  // calculate maximum number of itterations required for a
  var ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
  var an;

  if (x < 0 || a <= 0) {
    return NaN;
  } else if (x < a + 1) {
    for (; i <= ITMAX; i++) {
      sum += del *= x / ++ap;
    }
    return (sum * Math.exp(-x + a * Math.log(x) - (aln)));
  }

  for (; i <= ITMAX; i++) {
    an = -i * (i - a);
    b += 2;
    d = an * d + b;
    c = b + an / c;
    d = 1 / d;
    h *= d * c;
  }

  return (1 - h * Math.exp(-x + a * Math.log(x) - (aln)));
};

// natural log factorial of n
jStat.factorialln = function factorialln(n) {
  return n < 0 ? NaN : jStat.gammaln(n + 1);
};

// factorial of n
jStat.factorial = function factorial(n) {
  return n < 0 ? NaN : jStat.gammafn(n + 1);
};

// combinations of n, m
jStat.combination = function combination(n, m) {
  // make sure n or m don't exceed the upper limit of usable values
  return (n > 170 || m > 170)
      ? Math.exp(jStat.combinationln(n, m))
      : (jStat.factorial(n) / jStat.factorial(m)) / jStat.factorial(n - m);
};


jStat.combinationln = function combinationln(n, m){
  return jStat.factorialln(n) - jStat.factorialln(m) - jStat.factorialln(n - m);
};


// permutations of n, m
jStat.permutation = function permutation(n, m) {
  return jStat.factorial(n) / jStat.factorial(n - m);
};


// beta function
jStat.betafn = function betafn(x, y) {
  // ensure arguments are positive
  if (x <= 0 || y <= 0)
    return undefined;
  // make sure x + y doesn't exceed the upper limit of usable values
  return (x + y > 170)
      ? Math.exp(jStat.betaln(x, y))
      : jStat.gammafn(x) * jStat.gammafn(y) / jStat.gammafn(x + y);
};


// natural logarithm of beta function
jStat.betaln = function betaln(x, y) {
  return jStat.gammaln(x) + jStat.gammaln(y) - jStat.gammaln(x + y);
};


// Evaluates the continued fraction for incomplete beta function by modified
// Lentz's method.
jStat.betacf = function betacf(x, a, b) {
  var fpmin = 1e-30;
  var m = 1;
  var qab = a + b;
  var qap = a + 1;
  var qam = a - 1;
  var c = 1;
  var d = 1 - qab * x / qap;
  var m2, aa, del, h;

  // These q's will be used in factors that occur in the coefficients
  if (Math.abs(d) < fpmin)
    d = fpmin;
  d = 1 / d;
  h = d;

  for (; m <= 100; m++) {
    m2 = 2 * m;
    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    // One step (the even one) of the recurrence
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin)
      d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin)
      c = fpmin;
    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    // Next step of the recurrence (the odd one)
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin)
      d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin)
      c = fpmin;
    d = 1 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < 3e-7)
      break;
  }

  return h;
};


// Returns the inverse of the lower regularized inomplete gamma function
jStat.gammapinv = function gammapinv(p, a) {
  var j = 0;
  var a1 = a - 1;
  var EPS = 1e-8;
  var gln = jStat.gammaln(a);
  var x, err, t, u, pp, lna1, afac;

  if (p >= 1)
    return Math.max(100, a + 100 * Math.sqrt(a));
  if (p <= 0)
    return 0;
  if (a > 1) {
    lna1 = Math.log(a1);
    afac = Math.exp(a1 * (lna1 - 1) - gln);
    pp = (p < 0.5) ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
    if (p < 0.5)
      x = -x;
    x = Math.max(1e-3,
                 a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3));
  } else {
    t = 1 - a * (0.253 + a * 0.12);
    if (p < t)
      x = Math.pow(p / t, 1 / a);
    else
      x = 1 - Math.log(1 - (p - t) / (1 - t));
  }

  for(; j < 12; j++) {
    if (x <= 0)
      return 0;
    err = jStat.lowRegGamma(a, x) - p;
    if (a > 1)
      t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));
    else
      t = Math.exp(-x + a1 * Math.log(x) - gln);
    u = err / t;
    x -= (t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1))));
    if (x <= 0)
      x = 0.5 * (x + t);
    if (Math.abs(t) < EPS * x)
      break;
  }

  return x;
};


// Returns the error function erf(x)
jStat.erf = function erf(x) {
  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
             -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
             4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
             1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
             6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
             -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
             -6.886027e-12, 8.94487e-13, 3.13092e-13,
             -1.12708e-13, 3.81e-16, 7.106e-15,
             -1.523e-15, -9.4e-17, 1.21e-16,
             -2.8e-17];
  var j = cof.length - 1;
  var isneg = false;
  var d = 0;
  var dd = 0;
  var t, ty, tmp, res;

  if (x < 0) {
    x = -x;
    isneg = true;
  }

  t = 2 / (2 + x);
  ty = 4 * t - 2;

  for(; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }

  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
};


// Returns the complmentary error function erfc(x)
jStat.erfc = function erfc(x) {
  return 1 - jStat.erf(x);
};


// Returns the inverse of the complementary error function
jStat.erfcinv = function erfcinv(p) {
  var j = 0;
  var x, err, t, pp;
  if (p >= 2)
    return -100;
  if (p <= 0)
    return 100;
  pp = (p < 1) ? p : 2 - p;
  t = Math.sqrt(-2 * Math.log(pp / 2));
  x = -0.70711 * ((2.30753 + t * 0.27061) /
                  (1 + t * (0.99229 + t * 0.04481)) - t);
  for (; j < 2; j++) {
    err = jStat.erfc(x) - pp;
    x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
  }
  return (p < 1) ? x : -x;
};


// Returns the inverse of the incomplete beta function
jStat.ibetainv = function ibetainv(p, a, b) {
  var EPS = 1e-8;
  var a1 = a - 1;
  var b1 = b - 1;
  var j = 0;
  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
  if (p <= 0)
    return 0;
  if (p >= 1)
    return 1;
  if (a >= 1 && b >= 1) {
    pp = (p < 0.5) ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
    if (p < 0.5)
      x = -x;
    al = (x * x - 3) / 6;
    h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
    w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
        (al + 5 / 6 - 2 / (3 * h));
    x = a / (a + b * Math.exp(2 * w));
  } else {
    lna = Math.log(a / (a + b));
    lnb = Math.log(b / (a + b));
    t = Math.exp(a * lna) / a;
    u = Math.exp(b * lnb) / b;
    w = t + u;
    if (p < t / w)
      x = Math.pow(a * w * p, 1 / a);
    else
      x = 1 - Math.pow(b * w * (1 - p), 1 / b);
  }
  afac = -jStat.gammaln(a) - jStat.gammaln(b) + jStat.gammaln(a + b);
  for(; j < 10; j++) {
    if (x === 0 || x === 1)
      return x;
    err = jStat.ibeta(x, a, b) - p;
    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
    u = err / t;
    x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
    if (x <= 0)
      x = 0.5 * (x + t);
    if (x >= 1)
      x = 0.5 * (x + t + 1);
    if (Math.abs(t) < EPS * x && j > 0)
      break;
  }
  return x;
};


// Returns the incomplete beta function I_x(a,b)
jStat.ibeta = function ibeta(x, a, b) {
  // Factors in front of the continued fraction.
  var bt = (x === 0 || x === 1) ?  0 :
    Math.exp(jStat.gammaln(a + b) - jStat.gammaln(a) -
             jStat.gammaln(b) + a * Math.log(x) + b *
             Math.log(1 - x));
  if (x < 0 || x > 1)
    return false;
  if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
    return bt * jStat.betacf(x, a, b) / a;
  // else use continued fraction after making the symmetry transformation.
  return 1 - bt * jStat.betacf(1 - x, b, a) / b;
};


// Returns a normal deviate (mu=0, sigma=1).
// If n and m are specified it returns a object of normal deviates.
jStat.randn = function randn(n, m) {
  var u, v, x, y, q;
  if (!m)
    m = n;
  if (n)
    return jStat.create(n, m, function() { return jStat.randn(); });
  do {
    u = jStat._random_fn();
    v = 1.7156 * (jStat._random_fn() - 0.5);
    x = u - 0.449871;
    y = Math.abs(v) + 0.386595;
    q = x * x + y * (0.19600 * y - 0.25472 * x);
  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
  return v / u;
};


// Returns a gamma deviate by the method of Marsaglia and Tsang.
jStat.randg = function randg(shape, n, m) {
  var oalph = shape;
  var a1, a2, u, v, x, mat;
  if (!m)
    m = n;
  if (!shape)
    shape = 1;
  if (n) {
    mat = jStat.zeros(n,m);
    mat.alter(function() { return jStat.randg(shape); });
    return mat;
  }
  if (shape < 1)
    shape += 1;
  a1 = shape - 1 / 3;
  a2 = 1 / Math.sqrt(9 * a1);
  do {
    do {
      x = jStat.randn();
      v = 1 + a2 * x;
    } while(v <= 0);
    v = v * v * v;
    u = jStat._random_fn();
  } while(u > 1 - 0.331 * Math.pow(x, 4) &&
          Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));
  // alpha > 1
  if (shape == oalph)
    return a1 * v;
  // alpha < 1
  do {
    u = jStat._random_fn();
  } while(u === 0);
  return Math.pow(u, 1 / oalph) * a1 * v;
};


// making use of static methods on the instance
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jStat.fn[passfunc] = function() {
      return jStat(
          jStat.map(this, function(value) { return jStat[passfunc](value); }));
    }
  })(funcs[i]);
})('gammaln gammafn factorial factorialln'.split(' '));


(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jStat.fn[passfunc] = function() {
      return jStat(jStat[passfunc].apply(null, arguments));
    };
  })(funcs[i]);
})('randn'.split(' '));

}(jStat, Math));
(function(jStat, Math) {

// generate all distribution instance methods
(function(list) {
  for (var i = 0; i < list.length; i++) (function(func) {
    // distribution instance method
    jStat[func] = function(a, b, c) {
      if (!(this instanceof arguments.callee))
        return new arguments.callee(a, b, c);
      this._a = a;
      this._b = b;
      this._c = c;
      return this;
    };
    // distribution method to be used on a jStat instance
    jStat.fn[func] = function(a, b, c) {
      var newthis = jStat[func](a, b, c);
      newthis.data = this;
      return newthis;
    };
    // sample instance method
    jStat[func].prototype.sample = function(arr) {
      var a = this._a;
      var b = this._b;
      var c = this._c;
      if (arr)
        return jStat.alter(arr, function() {
          return jStat[func].sample(a, b, c);
        });
      else
        return jStat[func].sample(a, b, c);
    };
    // generate the pdf, cdf and inv instance methods
    (function(vals) {
      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
        jStat[func].prototype[fnfunc] = function(x) {
          var a = this._a;
          var b = this._b;
          var c = this._c;
          if (!x && x !== 0)
            x = this.data;
          if (typeof x !== 'number') {
            return jStat.fn.map.call(x, function(x) {
              return jStat[func][fnfunc](x, a, b, c);
            });
          }
          return jStat[func][fnfunc](x, a, b, c);
        };
      })(vals[i]);
    })('pdf cdf inv'.split(' '));
    // generate the mean, median, mode and variance instance methods
    (function(vals) {
      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
        jStat[func].prototype[fnfunc] = function() {
          return jStat[func][fnfunc](this._a, this._b, this._c);
        };
      })(vals[i]);
    })('mean median mode variance'.split(' '));
  })(list[i]);
})((
  'beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy ' +
  'laplace lognormal noncentralt normal pareto studentt weibull uniform ' +
  'binomial negbin hypgeom poisson triangular tukey arcsine'
).split(' '));



// extend beta function with static methods
jStat.extend(jStat.beta, {
  pdf: function pdf(x, alpha, beta) {
    // PDF is zero outside the support
    if (x > 1 || x < 0)
      return 0;
    // PDF is one for the uniform case
    if (alpha == 1 && beta == 1)
      return 1;

    if (alpha < 512 && beta < 512) {
      return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) /
          jStat.betafn(alpha, beta);
    } else {
      return Math.exp((alpha - 1) * Math.log(x) +
                      (beta - 1) * Math.log(1 - x) -
                      jStat.betaln(alpha, beta));
    }
  },

  cdf: function cdf(x, alpha, beta) {
    return (x > 1 || x < 0) ? (x > 1) * 1 : jStat.ibeta(x, alpha, beta);
  },

  inv: function inv(x, alpha, beta) {
    return jStat.ibetainv(x, alpha, beta);
  },

  mean: function mean(alpha, beta) {
    return alpha / (alpha + beta);
  },

  median: function median(alpha, beta) {
    return jStat.ibetainv(0.5, alpha, beta);
  },

  mode: function mode(alpha, beta) {
    return (alpha - 1 ) / ( alpha + beta - 2);
  },

  // return a random sample
  sample: function sample(alpha, beta) {
    var u = jStat.randg(alpha);
    return u / (u + jStat.randg(beta));
  },

  variance: function variance(alpha, beta) {
    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
  }
});

// extend F function with static methods
jStat.extend(jStat.centralF, {
  // This implementation of the pdf function avoids float overflow
  // See the way that R calculates this value:
  // https://svn.r-project.org/R/trunk/src/nmath/df.c
  pdf: function pdf(x, df1, df2) {
    var p, q, f;

    if (x < 0)
      return 0;

    if (df1 <= 2) {
      if (x === 0 && df1 < 2) {
        return Infinity;
      }
      if (x === 0 && df1 === 2) {
        return 1;
      }
      return (1 / jStat.betafn(df1 / 2, df2 / 2)) *
              Math.pow(df1 / df2, df1 / 2) *
              Math.pow(x, (df1/2) - 1) *
              Math.pow((1 + (df1 / df2) * x), -(df1 + df2) / 2);
    }

    p = (df1 * x) / (df2 + x * df1);
    q = df2 / (df2 + x * df1);
    f = df1 * q / 2.0;
    return f * jStat.binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p);
  },

  cdf: function cdf(x, df1, df2) {
    if (x < 0)
      return 0;
    return jStat.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
  },

  inv: function inv(x, df1, df2) {
    return df2 / (df1 * (1 / jStat.ibetainv(x, df1 / 2, df2 / 2) - 1));
  },

  mean: function mean(df1, df2) {
    return (df2 > 2) ? df2 / (df2 - 2) : undefined;
  },

  mode: function mode(df1, df2) {
    return (df1 > 2) ? (df2 * (df1 - 2)) / (df1 * (df2 + 2)) : undefined;
  },

  // return a random sample
  sample: function sample(df1, df2) {
    var x1 = jStat.randg(df1 / 2) * 2;
    var x2 = jStat.randg(df2 / 2) * 2;
    return (x1 / df1) / (x2 / df2);
  },

  variance: function variance(df1, df2) {
    if (df2 <= 4)
      return undefined;
    return 2 * df2 * df2 * (df1 + df2 - 2) /
        (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
  }
});


// extend cauchy function with static methods
jStat.extend(jStat.cauchy, {
  pdf: function pdf(x, local, scale) {
    if (scale < 0) { return 0; }

    return (scale / (Math.pow(x - local, 2) + Math.pow(scale, 2))) / Math.PI;
  },

  cdf: function cdf(x, local, scale) {
    return Math.atan((x - local) / scale) / Math.PI + 0.5;
  },

  inv: function(p, local, scale) {
    return local + scale * Math.tan(Math.PI * (p - 0.5));
  },

  median: function median(local/*, scale*/) {
    return local;
  },

  mode: function mode(local/*, scale*/) {
    return local;
  },

  sample: function sample(local, scale) {
    return jStat.randn() *
        Math.sqrt(1 / (2 * jStat.randg(0.5))) * scale + local;
  }
});



// extend chisquare function with static methods
jStat.extend(jStat.chisquare, {
  pdf: function pdf(x, dof) {
    if (x < 0)
      return 0;
    return (x === 0 && dof === 2) ? 0.5 :
        Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - (dof / 2) *
                 Math.log(2) - jStat.gammaln(dof / 2));
  },

  cdf: function cdf(x, dof) {
    if (x < 0)
      return 0;
    return jStat.lowRegGamma(dof / 2, x / 2);
  },

  inv: function(p, dof) {
    return 2 * jStat.gammapinv(p, 0.5 * dof);
  },

  mean : function(dof) {
    return dof;
  },

  // TODO: this is an approximation (is there a better way?)
  median: function median(dof) {
    return dof * Math.pow(1 - (2 / (9 * dof)), 3);
  },

  mode: function mode(dof) {
    return (dof - 2 > 0) ? dof - 2 : 0;
  },

  sample: function sample(dof) {
    return jStat.randg(dof / 2) * 2;
  },

  variance: function variance(dof) {
    return 2 * dof;
  }
});



// extend exponential function with static methods
jStat.extend(jStat.exponential, {
  pdf: function pdf(x, rate) {
    return x < 0 ? 0 : rate * Math.exp(-rate * x);
  },

  cdf: function cdf(x, rate) {
    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
  },

  inv: function(p, rate) {
    return -Math.log(1 - p) / rate;
  },

  mean : function(rate) {
    return 1 / rate;
  },

  median: function (rate) {
    return (1 / rate) * Math.log(2);
  },

  mode: function mode(/*rate*/) {
    return 0;
  },

  sample: function sample(rate) {
    return -1 / rate * Math.log(jStat._random_fn());
  },

  variance : function(rate) {
    return Math.pow(rate, -2);
  }
});



// extend gamma function with static methods
jStat.extend(jStat.gamma, {
  pdf: function pdf(x, shape, scale) {
    if (x < 0)
      return 0;
    return (x === 0 && shape === 1) ? 1 / scale :
            Math.exp((shape - 1) * Math.log(x) - x / scale -
                    jStat.gammaln(shape) - shape * Math.log(scale));
  },

  cdf: function cdf(x, shape, scale) {
    if (x < 0)
      return 0;
    return jStat.lowRegGamma(shape, x / scale);
  },

  inv: function(p, shape, scale) {
    return jStat.gammapinv(p, shape) * scale;
  },

  mean : function(shape, scale) {
    return shape * scale;
  },

  mode: function mode(shape, scale) {
    if(shape > 1) return (shape - 1) * scale;
    return undefined;
  },

  sample: function sample(shape, scale) {
    return jStat.randg(shape) * scale;
  },

  variance: function variance(shape, scale) {
    return shape * scale * scale;
  }
});

// extend inverse gamma function with static methods
jStat.extend(jStat.invgamma, {
  pdf: function pdf(x, shape, scale) {
    if (x <= 0)
      return 0;
    return Math.exp(-(shape + 1) * Math.log(x) - scale / x -
                    jStat.gammaln(shape) + shape * Math.log(scale));
  },

  cdf: function cdf(x, shape, scale) {
    if (x <= 0)
      return 0;
    return 1 - jStat.lowRegGamma(shape, scale / x);
  },

  inv: function(p, shape, scale) {
    return scale / jStat.gammapinv(1 - p, shape);
  },

  mean : function(shape, scale) {
    return (shape > 1) ? scale / (shape - 1) : undefined;
  },

  mode: function mode(shape, scale) {
    return scale / (shape + 1);
  },

  sample: function sample(shape, scale) {
    return scale / jStat.randg(shape);
  },

  variance: function variance(shape, scale) {
    if (shape <= 2)
      return undefined;
    return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
  }
});


// extend kumaraswamy function with static methods
jStat.extend(jStat.kumaraswamy, {
  pdf: function pdf(x, alpha, beta) {
    if (x === 0 && alpha === 1)
      return beta;
    else if (x === 1 && beta === 1)
      return alpha;
    return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) *
                    Math.log(x) + (beta - 1) *
                    Math.log(1 - Math.pow(x, alpha)));
  },

  cdf: function cdf(x, alpha, beta) {
    if (x < 0)
      return 0;
    else if (x > 1)
      return 1;
    return (1 - Math.pow(1 - Math.pow(x, alpha), beta));
  },

  inv: function inv(p, alpha, beta) {
    return Math.pow(1 - Math.pow(1 - p, 1 / beta), 1 / alpha);
  },

  mean : function(alpha, beta) {
    return (beta * jStat.gammafn(1 + 1 / alpha) *
            jStat.gammafn(beta)) / (jStat.gammafn(1 + 1 / alpha + beta));
  },

  median: function median(alpha, beta) {
    return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
  },

  mode: function mode(alpha, beta) {
    if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
      return undefined;
    return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
  },

  variance: function variance(/*alpha, beta*/) {
    throw new Error('variance not yet implemented');
    // TODO: complete this
  }
});



// extend lognormal function with static methods
jStat.extend(jStat.lognormal, {
  pdf: function pdf(x, mu, sigma) {
    if (x <= 0)
      return 0;
    return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) -
                    Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) /
                    (2 * sigma * sigma));
  },

  cdf: function cdf(x, mu, sigma) {
    if (x < 0)
      return 0;
    return 0.5 +
        (0.5 * jStat.erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)));
  },

  inv: function(p, mu, sigma) {
    return Math.exp(-1.41421356237309505 * sigma * jStat.erfcinv(2 * p) + mu);
  },

  mean: function mean(mu, sigma) {
    return Math.exp(mu + sigma * sigma / 2);
  },

  median: function median(mu/*, sigma*/) {
    return Math.exp(mu);
  },

  mode: function mode(mu, sigma) {
    return Math.exp(mu - sigma * sigma);
  },

  sample: function sample(mu, sigma) {
    return Math.exp(jStat.randn() * sigma + mu);
  },

  variance: function variance(mu, sigma) {
    return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
  }
});



// extend noncentralt function with static methods
jStat.extend(jStat.noncentralt, {
  pdf: function pdf(x, dof, ncp) {
    var tol = 1e-14;
    if (Math.abs(ncp) < tol)  // ncp approx 0; use student-t
      return jStat.studentt.pdf(x, dof)

    if (Math.abs(x) < tol) {  // different formula for x == 0
      return Math.exp(jStat.gammaln((dof + 1) / 2) - ncp * ncp / 2 -
                      0.5 * Math.log(Math.PI * dof) - jStat.gammaln(dof / 2));
    }

    // formula for x != 0
    return dof / x *
        (jStat.noncentralt.cdf(x * Math.sqrt(1 + 2 / dof), dof+2, ncp) -
         jStat.noncentralt.cdf(x, dof, ncp));
  },

  cdf: function cdf(x, dof, ncp) {
    var tol = 1e-14;
    var min_iterations = 200;

    if (Math.abs(ncp) < tol)  // ncp approx 0; use student-t
      return jStat.studentt.cdf(x, dof);

    // turn negative x into positive and flip result afterwards
    var flip = false;
    if (x < 0) {
      flip = true;
      ncp = -ncp;
    }

    var prob = jStat.normal.cdf(-ncp, 0, 1);
    var value = tol + 1;
    // use value at last two steps to determine convergence
    var lastvalue = value;
    var y = x * x / (x * x + dof);
    var j = 0;
    var p = Math.exp(-ncp * ncp / 2);
    var q = Math.exp(-ncp * ncp / 2 - 0.5 * Math.log(2) -
                     jStat.gammaln(3 / 2)) * ncp;
    while (j < min_iterations || lastvalue > tol || value > tol) {
      lastvalue = value;
      if (j > 0) {
        p *= (ncp * ncp) / (2 * j);
        q *= (ncp * ncp) / (2 * (j + 1 / 2));
      }
      value = p * jStat.beta.cdf(y, j + 0.5, dof / 2) +
          q * jStat.beta.cdf(y, j+1, dof/2);
      prob += 0.5 * value;
      j++;
    }

    return flip ? (1 - prob) : prob;
  }
});


// extend normal function with static methods
jStat.extend(jStat.normal, {
  pdf: function pdf(x, mean, std) {
    return Math.exp(-0.5 * Math.log(2 * Math.PI) -
                    Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
  },

  cdf: function cdf(x, mean, std) {
    return 0.5 * (1 + jStat.erf((x - mean) / Math.sqrt(2 * std * std)));
  },

  inv: function(p, mean, std) {
    return -1.41421356237309505 * std * jStat.erfcinv(2 * p) + mean;
  },

  mean : function(mean/*, std*/) {
    return mean;
  },

  median: function median(mean/*, std*/) {
    return mean;
  },

  mode: function (mean/*, std*/) {
    return mean;
  },

  sample: function sample(mean, std) {
    return jStat.randn() * std + mean;
  },

  variance : function(mean, std) {
    return std * std;
  }
});



// extend pareto function with static methods
jStat.extend(jStat.pareto, {
  pdf: function pdf(x, scale, shape) {
    if (x < scale)
      return 0;
    return (shape * Math.pow(scale, shape)) / Math.pow(x, shape + 1);
  },

  cdf: function cdf(x, scale, shape) {
    if (x < scale)
      return 0;
    return 1 - Math.pow(scale / x, shape);
  },

  inv: function inv(p, scale, shape) {
    return scale / Math.pow(1 - p, 1 / shape);
  },

  mean: function mean(scale, shape) {
    if (shape <= 1)
      return undefined;
    return (shape * Math.pow(scale, shape)) / (shape - 1);
  },

  median: function median(scale, shape) {
    return scale * (shape * Math.SQRT2);
  },

  mode: function mode(scale/*, shape*/) {
    return scale;
  },

  variance : function(scale, shape) {
    if (shape <= 2)
      return undefined;
    return (scale*scale * shape) / (Math.pow(shape - 1, 2) * (shape - 2));
  }
});



// extend studentt function with static methods
jStat.extend(jStat.studentt, {
  pdf: function pdf(x, dof) {
    dof = dof > 1e100 ? 1e100 : dof;
    return (1/(Math.sqrt(dof) * jStat.betafn(0.5, dof/2))) *
        Math.pow(1 + ((x * x) / dof), -((dof + 1) / 2));
  },

  cdf: function cdf(x, dof) {
    var dof2 = dof / 2;
    return jStat.ibeta((x + Math.sqrt(x * x + dof)) /
                       (2 * Math.sqrt(x * x + dof)), dof2, dof2);
  },

  inv: function(p, dof) {
    var x = jStat.ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
    x = Math.sqrt(dof * (1 - x) / x);
    return (p > 0.5) ? x : -x;
  },

  mean: function mean(dof) {
    return (dof > 1) ? 0 : undefined;
  },

  median: function median(/*dof*/) {
    return 0;
  },

  mode: function mode(/*dof*/) {
    return 0;
  },

  sample: function sample(dof) {
    return jStat.randn() * Math.sqrt(dof / (2 * jStat.randg(dof / 2)));
  },

  variance: function variance(dof) {
    return (dof  > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined;
  }
});



// extend weibull function with static methods
jStat.extend(jStat.weibull, {
  pdf: function pdf(x, scale, shape) {
    if (x < 0 || scale < 0 || shape < 0)
      return 0;
    return (shape / scale) * Math.pow((x / scale), (shape - 1)) *
        Math.exp(-(Math.pow((x / scale), shape)));
  },

  cdf: function cdf(x, scale, shape) {
    return x < 0 ? 0 : 1 - Math.exp(-Math.pow((x / scale), shape));
  },

  inv: function(p, scale, shape) {
    return scale * Math.pow(-Math.log(1 - p), 1 / shape);
  },

  mean : function(scale, shape) {
    return scale * jStat.gammafn(1 + 1 / shape);
  },

  median: function median(scale, shape) {
    return scale * Math.pow(Math.log(2), 1 / shape);
  },

  mode: function mode(scale, shape) {
    if (shape <= 1)
      return 0;
    return scale * Math.pow((shape - 1) / shape, 1 / shape);
  },

  sample: function sample(scale, shape) {
    return scale * Math.pow(-Math.log(jStat._random_fn()), 1 / shape);
  },

  variance: function variance(scale, shape) {
    return scale * scale * jStat.gammafn(1 + 2 / shape) -
        Math.pow(jStat.weibull.mean(scale, shape), 2);
  }
});



// extend uniform function with static methods
jStat.extend(jStat.uniform, {
  pdf: function pdf(x, a, b) {
    return (x < a || x > b) ? 0 : 1 / (b - a);
  },

  cdf: function cdf(x, a, b) {
    if (x < a)
      return 0;
    else if (x < b)
      return (x - a) / (b - a);
    return 1;
  },

  inv: function(p, a, b) {
    return a + (p * (b - a));
  },

  mean: function mean(a, b) {
    return 0.5 * (a + b);
  },

  median: function median(a, b) {
    return jStat.mean(a, b);
  },

  mode: function mode(/*a, b*/) {
    throw new Error('mode is not yet implemented');
  },

  sample: function sample(a, b) {
    return (a / 2 + b / 2) + (b / 2 - a / 2) * (2 * jStat._random_fn() - 1);
  },

  variance: function variance(a, b) {
    return Math.pow(b - a, 2) / 12;
  }
});


// Got this from http://www.math.ucla.edu/~tom/distributions/binomial.html
function betinc(x, a, b, eps) {
  var a0 = 0;
  var b0 = 1;
  var a1 = 1;
  var b1 = 1;
  var m9 = 0;
  var a2 = 0;
  var c9;

  while (Math.abs((a1 - a2) / a1) > eps) {
    a2 = a1;
    c9 = -(a + m9) * (a + b + m9) * x / (a + 2 * m9) / (a + 2 * m9 + 1);
    a0 = a1 + c9 * a0;
    b0 = b1 + c9 * b0;
    m9 = m9 + 1;
    c9 = m9 * (b - m9) * x / (a + 2 * m9 - 1) / (a + 2 * m9);
    a1 = a0 + c9 * a1;
    b1 = b0 + c9 * b1;
    a0 = a0 / b1;
    b0 = b0 / b1;
    a1 = a1 / b1;
    b1 = 1;
  }

  return a1 / a;
}


// extend uniform function with static methods
jStat.extend(jStat.binomial, {
  pdf: function pdf(k, n, p) {
    return (p === 0 || p === 1) ?
      ((n * p) === k ? 1 : 0) :
      jStat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  },

  cdf: function cdf(x, n, p) {
    var betacdf;
    var eps = 1e-10;

    if (x < 0)
      return 0;
    if (x >= n)
      return 1;
    if (p < 0 || p > 1 || n <= 0)
      return NaN;

    x = Math.floor(x);
    var z = p;
    var a = x + 1;
    var b = n - x;
    var s = a + b;
    var bt = Math.exp(jStat.gammaln(s) - jStat.gammaln(b) -
                      jStat.gammaln(a) + a * Math.log(z) + b * Math.log(1 - z));

    if (z < (a + 1) / (s + 2))
      betacdf = bt * betinc(z, a, b, eps);
    else
      betacdf = 1 - bt * betinc(1 - z, b, a, eps);

    return Math.round((1 - betacdf) * (1 / eps)) / (1 / eps);
  }
});



// extend uniform function with static methods
jStat.extend(jStat.negbin, {
  pdf: function pdf(k, r, p) {
    if (k !== k >>> 0)
      return false;
    if (k < 0)
      return 0;
    return jStat.combination(k + r - 1, r - 1) *
        Math.pow(1 - p, k) * Math.pow(p, r);
  },

  cdf: function cdf(x, r, p) {
    var sum = 0,
    k = 0;
    if (x < 0) return 0;
    for (; k <= x; k++) {
      sum += jStat.negbin.pdf(k, r, p);
    }
    return sum;
  }
});



// extend uniform function with static methods
jStat.extend(jStat.hypgeom, {
  pdf: function pdf(k, N, m, n) {
    // Hypergeometric PDF.

    // A simplification of the CDF algorithm below.

    // k = number of successes drawn
    // N = population size
    // m = number of successes in population
    // n = number of items drawn from population

    if(k !== k | 0) {
      return false;
    } else if(k < 0 || k < m - (N - n)) {
      // It's impossible to have this few successes drawn.
      return 0;
    } else if(k > n || k > m) {
      // It's impossible to have this many successes drawn.
      return 0;
    } else if (m * 2 > N) {
      // More than half the population is successes.

      if(n * 2 > N) {
        // More than half the population is sampled.

        return jStat.hypgeom.pdf(N - m - n + k, N, N - m, N - n)
      } else {
        // Half or less of the population is sampled.

        return jStat.hypgeom.pdf(n - k, N, N - m, n);
      }

    } else if(n * 2 > N) {
      // Half or less is successes.

      return jStat.hypgeom.pdf(m - k, N, m, N - n);

    } else if(m < n) {
      // We want to have the number of things sampled to be less than the
      // successes available. So swap the definitions of successful and sampled.
      return jStat.hypgeom.pdf(k, N, n, m);
    } else {
      // If we get here, half or less of the population was sampled, half or
      // less of it was successes, and we had fewer sampled things than
      // successes. Now we can do this complicated iterative algorithm in an
      // efficient way.

      // The basic premise of the algorithm is that we partially normalize our
      // intermediate product to keep it in a numerically good region, and then
      // finish the normalization at the end.

      // This variable holds the scaled probability of the current number of
      // successes.
      var scaledPDF = 1;

      // This keeps track of how much we have normalized.
      var samplesDone = 0;

      for(var i = 0; i < k; i++) {
        // For every possible number of successes up to that observed...

        while(scaledPDF > 1 && samplesDone < n) {
          // Intermediate result is growing too big. Apply some of the
          // normalization to shrink everything.

          scaledPDF *= 1 - (m / (N - samplesDone));

          // Say we've normalized by this sample already.
          samplesDone++;
        }

        // Work out the partially-normalized hypergeometric PDF for the next
        // number of successes
        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
      }

      for(; samplesDone < n; samplesDone++) {
        // Apply all the rest of the normalization
        scaledPDF *= 1 - (m / (N - samplesDone));
      }

      // Bound answer sanely before returning.
      return Math.min(1, Math.max(0, scaledPDF));
    }
  },

  cdf: function cdf(x, N, m, n) {
    // Hypergeometric CDF.

    // This algorithm is due to Prof. Thomas S. Ferguson, <tom@math.ucla.edu>,
    // and comes from his hypergeometric test calculator at
    // <http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html>.

    // x = number of successes drawn
    // N = population size
    // m = number of successes in population
    // n = number of items drawn from population

    if(x < 0 || x < m - (N - n)) {
      // It's impossible to have this few successes drawn or fewer.
      return 0;
    } else if(x >= n || x >= m) {
      // We will always have this many successes or fewer.
      return 1;
    } else if (m * 2 > N) {
      // More than half the population is successes.

      if(n * 2 > N) {
        // More than half the population is sampled.

        return jStat.hypgeom.cdf(N - m - n + x, N, N - m, N - n)
      } else {
        // Half or less of the population is sampled.

        return 1 - jStat.hypgeom.cdf(n - x - 1, N, N - m, n);
      }

    } else if(n * 2 > N) {
      // Half or less is successes.

      return 1 - jStat.hypgeom.cdf(m - x - 1, N, m, N - n);

    } else if(m < n) {
      // We want to have the number of things sampled to be less than the
      // successes available. So swap the definitions of successful and sampled.
      return jStat.hypgeom.cdf(x, N, n, m);
    } else {
      // If we get here, half or less of the population was sampled, half or
      // less of it was successes, and we had fewer sampled things than
      // successes. Now we can do this complicated iterative algorithm in an
      // efficient way.

      // The basic premise of the algorithm is that we partially normalize our
      // intermediate sum to keep it in a numerically good region, and then
      // finish the normalization at the end.

      // Holds the intermediate, scaled total CDF.
      var scaledCDF = 1;

      // This variable holds the scaled probability of the current number of
      // successes.
      var scaledPDF = 1;

      // This keeps track of how much we have normalized.
      var samplesDone = 0;

      for(var i = 0; i < x; i++) {
        // For every possible number of successes up to that observed...

        while(scaledCDF > 1 && samplesDone < n) {
          // Intermediate result is growing too big. Apply some of the
          // normalization to shrink everything.

          var factor = 1 - (m / (N - samplesDone));

          scaledPDF *= factor;
          scaledCDF *= factor;

          // Say we've normalized by this sample already.
          samplesDone++;
        }

        // Work out the partially-normalized hypergeometric PDF for the next
        // number of successes
        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));

        // Add to the CDF answer.
        scaledCDF += scaledPDF;
      }

      for(; samplesDone < n; samplesDone++) {
        // Apply all the rest of the normalization
        scaledCDF *= 1 - (m / (N - samplesDone));
      }

      // Bound answer sanely before returning.
      return Math.min(1, Math.max(0, scaledCDF));
    }
  }
});



// extend uniform function with static methods
jStat.extend(jStat.poisson, {
  pdf: function pdf(k, l) {
    if (l < 0 || (k % 1) !== 0 || k < 0) {
      return 0;
    }

    return Math.pow(l, k) * Math.exp(-l) / jStat.factorial(k);
  },

  cdf: function cdf(x, l) {
    var sumarr = [],
    k = 0;
    if (x < 0) return 0;
    for (; k <= x; k++) {
      sumarr.push(jStat.poisson.pdf(k, l));
    }
    return jStat.sum(sumarr);
  },

  mean : function(l) {
    return l;
  },

  variance : function(l) {
    return l;
  },

  sampleSmall: function sampleSmall(l) {
    var p = 1, k = 0, L = Math.exp(-l);
    do {
      k++;
      p *= jStat._random_fn();
    } while (p > L);
    return k - 1;
  },

  sampleLarge: function sampleLarge(l) {
    var lam = l;
    var k;
    var U, V, slam, loglam, a, b, invalpha, vr, us;

    slam = Math.sqrt(lam);
    loglam = Math.log(lam);
    b = 0.931 + 2.53 * slam;
    a = -0.059 + 0.02483 * b;
    invalpha = 1.1239 + 1.1328 / (b - 3.4);
    vr = 0.9277 - 3.6224 / (b - 2);

    while (1) {
      U = Math.random() - 0.5;
      V = Math.random();
      us = 0.5 - Math.abs(U);
      k = Math.floor((2 * a / us + b) * U + lam + 0.43);
      if ((us >= 0.07) && (V <= vr)) {
          return k;
      }
      if ((k < 0) || ((us < 0.013) && (V > us))) {
          continue;
      }
      /* log(V) == log(0.0) ok here */
      /* if U==0.0 so that us==0.0, log is ok since always returns */
      if ((Math.log(V) + Math.log(invalpha) - Math.log(a / (us * us) + b)) <= (-lam + k * loglam - jStat.loggam(k + 1))) {
          return k;
      }
    }
  },

  sample: function sample(l) {
    if (l < 10)
      return this.sampleSmall(l);
    else
      return this.sampleLarge(l);
  }
});

// extend triangular function with static methods
jStat.extend(jStat.triangular, {
  pdf: function pdf(x, a, b, c) {
    if (b <= a || c < a || c > b) {
      return NaN;
    } else {
      if (x < a || x > b) {
        return 0;
      } else if (x < c) {
          return (2 * (x - a)) / ((b - a) * (c - a));
      } else if (x === c) {
          return (2 / (b - a));
      } else { // x > c
          return (2 * (b - x)) / ((b - a) * (b - c));
      }
    }
  },

  cdf: function cdf(x, a, b, c) {
    if (b <= a || c < a || c > b)
      return NaN;
    if (x <= a)
      return 0;
    else if (x >= b)
      return 1;
    if (x <= c)
      return Math.pow(x - a, 2) / ((b - a) * (c - a));
    else // x > c
      return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c));
  },

  inv: function inv(p, a, b, c) {
    if (b <= a || c < a || c > b) {
      return NaN;
    } else {
      if (p <= ((c - a) / (b - a))) {
        return a + (b - a) * Math.sqrt(p * ((c - a) / (b - a)));
      } else { // p > ((c - a) / (b - a))
        return a + (b - a) * (1 - Math.sqrt((1 - p) * (1 - ((c - a) / (b - a)))));
      }
    }
  },

  mean: function mean(a, b, c) {
    return (a + b + c) / 3;
  },

  median: function median(a, b, c) {
    if (c <= (a + b) / 2) {
      return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
    } else if (c > (a + b) / 2) {
      return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
    }
  },

  mode: function mode(a, b, c) {
    return c;
  },

  sample: function sample(a, b, c) {
    var u = jStat._random_fn();
    if (u < ((c - a) / (b - a)))
      return a + Math.sqrt(u * (b - a) * (c - a))
    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
  },

  variance: function variance(a, b, c) {
    return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
  }
});


// extend arcsine function with static methods
jStat.extend(jStat.arcsine, {
  pdf: function pdf(x, a, b) {
    if (b <= a) return NaN;

    return (x <= a || x >= b) ? 0 :
      (2 / Math.PI) *
        Math.pow(Math.pow(b - a, 2) -
                  Math.pow(2 * x - a - b, 2), -0.5);
  },

  cdf: function cdf(x, a, b) {
    if (x < a)
      return 0;
    else if (x < b)
      return (2 / Math.PI) * Math.asin(Math.sqrt((x - a)/(b - a)));
    return 1;
  },

  inv: function(p, a, b) {
    return a + (0.5 - 0.5 * Math.cos(Math.PI * p)) * (b - a);
  },

  mean: function mean(a, b) {
    if (b <= a) return NaN;
    return (a + b) / 2;
  },

  median: function median(a, b) {
    if (b <= a) return NaN;
    return (a + b) / 2;
  },

  mode: function mode(/*a, b*/) {
    throw new Error('mode is not yet implemented');
  },

  sample: function sample(a, b) {
    return ((a + b) / 2) + ((b - a) / 2) *
      Math.sin(2 * Math.PI * jStat.uniform.sample(0, 1));
  },

  variance: function variance(a, b) {
    if (b <= a) return NaN;
    return Math.pow(b - a, 2) / 8;
  }
});


function laplaceSign(x) { return x / Math.abs(x); }

jStat.extend(jStat.laplace, {
  pdf: function pdf(x, mu, b) {
    return (b <= 0) ? 0 : (Math.exp(-Math.abs(x - mu) / b)) / (2 * b);
  },

  cdf: function cdf(x, mu, b) {
    if (b <= 0) { return 0; }

    if(x < mu) {
      return 0.5 * Math.exp((x - mu) / b);
    } else {
      return 1 - 0.5 * Math.exp(- (x - mu) / b);
    }
  },

  mean: function(mu/*, b*/) {
    return mu;
  },

  median: function(mu/*, b*/) {
    return mu;
  },

  mode: function(mu/*, b*/) {
    return mu;
  },

  variance: function(mu, b) {
    return 2 * b * b;
  },

  sample: function sample(mu, b) {
    var u = jStat._random_fn() - 0.5;

    return mu - (b * laplaceSign(u) * Math.log(1 - (2 * Math.abs(u))));
  }
});

function tukeyWprob(w, rr, cc) {
  var nleg = 12;
  var ihalf = 6;

  var C1 = -30;
  var C2 = -50;
  var C3 = 60;
  var bb   = 8;
  var wlar = 3;
  var wincr1 = 2;
  var wincr2 = 3;
  var xleg = [
    0.981560634246719250690549090149,
    0.904117256370474856678465866119,
    0.769902674194304687036893833213,
    0.587317954286617447296702418941,
    0.367831498998180193752691536644,
    0.125233408511468915472441369464
  ];
  var aleg = [
    0.047175336386511827194615961485,
    0.106939325995318430960254718194,
    0.160078328543346226334652529543,
    0.203167426723065921749064455810,
    0.233492536538354808760849898925,
    0.249147045813402785000562436043
  ];

  var qsqz = w * 0.5;

  // if w >= 16 then the integral lower bound (occurs for c=20)
  // is 0.99999999999995 so return a value of 1.

  if (qsqz >= bb)
    return 1.0;

  // find (f(w/2) - 1) ^ cc
  // (first term in integral of hartley's form).

  var pr_w = 2 * jStat.normal.cdf(qsqz, 0, 1, 1, 0) - 1; // erf(qsqz / M_SQRT2)
  // if pr_w ^ cc < 2e-22 then set pr_w = 0
  if (pr_w >= Math.exp(C2 / cc))
    pr_w = Math.pow(pr_w, cc);
  else
    pr_w = 0.0;

  // if w is large then the second component of the
  // integral is small, so fewer intervals are needed.

  var wincr;
  if (w > wlar)
    wincr = wincr1;
  else
    wincr = wincr2;

  // find the integral of second term of hartley's form
  // for the integral of the range for equal-length
  // intervals using legendre quadrature.  limits of
  // integration are from (w/2, 8).  two or three
  // equal-length intervals are used.

  // blb and bub are lower and upper limits of integration.

  var blb = qsqz;
  var binc = (bb - qsqz) / wincr;
  var bub = blb + binc;
  var einsum = 0.0;

  // integrate over each interval

  var cc1 = cc - 1.0;
  for (var wi = 1; wi <= wincr; wi++) {
    var elsum = 0.0;
    var a = 0.5 * (bub + blb);

    // legendre quadrature with order = nleg

    var b = 0.5 * (bub - blb);

    for (var jj = 1; jj <= nleg; jj++) {
      var j, xx;
      if (ihalf < jj) {
        j = (nleg - jj) + 1;
        xx = xleg[j-1];
      } else {
        j = jj;
        xx = -xleg[j-1];
      }
      var c = b * xx;
      var ac = a + c;

      // if exp(-qexpo/2) < 9e-14,
      // then doesn't contribute to integral

      var qexpo = ac * ac;
      if (qexpo > C3)
        break;

      var pplus = 2 * jStat.normal.cdf(ac, 0, 1, 1, 0);
      var pminus= 2 * jStat.normal.cdf(ac, w, 1, 1, 0);

      // if rinsum ^ (cc-1) < 9e-14,
      // then doesn't contribute to integral

      var rinsum = (pplus * 0.5) - (pminus * 0.5);
      if (rinsum >= Math.exp(C1 / cc1)) {
        rinsum = (aleg[j-1] * Math.exp(-(0.5 * qexpo))) * Math.pow(rinsum, cc1);
        elsum += rinsum;
      }
    }
    elsum *= (((2.0 * b) * cc) / Math.sqrt(2 * Math.PI));
    einsum += elsum;
    blb = bub;
    bub += binc;
  }

  // if pr_w ^ rr < 9e-14, then return 0
  pr_w += einsum;
  if (pr_w <= Math.exp(C1 / rr))
    return 0;

  pr_w = Math.pow(pr_w, rr);
  if (pr_w >= 1) // 1 was iMax was eps
    return 1;
  return pr_w;
}

function tukeyQinv(p, c, v) {
  var p0 = 0.322232421088;
  var q0 = 0.993484626060e-01;
  var p1 = -1.0;
  var q1 = 0.588581570495;
  var p2 = -0.342242088547;
  var q2 = 0.531103462366;
  var p3 = -0.204231210125;
  var q3 = 0.103537752850;
  var p4 = -0.453642210148e-04;
  var q4 = 0.38560700634e-02;
  var c1 = 0.8832;
  var c2 = 0.2368;
  var c3 = 1.214;
  var c4 = 1.208;
  var c5 = 1.4142;
  var vmax = 120.0;

  var ps = 0.5 - 0.5 * p;
  var yi = Math.sqrt(Math.log(1.0 / (ps * ps)));
  var t = yi + (((( yi * p4 + p3) * yi + p2) * yi + p1) * yi + p0)
     / (((( yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0);
  if (v < vmax) t += (t * t * t + t) / v / 4.0;
  var q = c1 - c2 * t;
  if (v < vmax) q += -c3 / v + c4 * t / v;
  return t * (q * Math.log(c - 1.0) + c5);
}

jStat.extend(jStat.tukey, {
  cdf: function cdf(q, nmeans, df) {
    // Identical implementation as the R ptukey() function as of commit 68947
    var rr = 1;
    var cc = nmeans;

    var nlegq = 16;
    var ihalfq = 8;

    var eps1 = -30.0;
    var eps2 = 1.0e-14;
    var dhaf  = 100.0;
    var dquar = 800.0;
    var deigh = 5000.0;
    var dlarg = 25000.0;
    var ulen1 = 1.0;
    var ulen2 = 0.5;
    var ulen3 = 0.25;
    var ulen4 = 0.125;
    var xlegq = [
      0.989400934991649932596154173450,
      0.944575023073232576077988415535,
      0.865631202387831743880467897712,
      0.755404408355003033895101194847,
      0.617876244402643748446671764049,
      0.458016777657227386342419442984,
      0.281603550779258913230460501460,
      0.950125098376374401853193354250e-1
    ];
    var alegq = [
      0.271524594117540948517805724560e-1,
      0.622535239386478928628438369944e-1,
      0.951585116824927848099251076022e-1,
      0.124628971255533872052476282192,
      0.149595988816576732081501730547,
      0.169156519395002538189312079030,
      0.182603415044923588866763667969,
      0.189450610455068496285396723208
    ];

    if (q <= 0)
      return 0;

    // df must be > 1
    // there must be at least two values

    if (df < 2 || rr < 1 || cc < 2) return NaN;

    if (!Number.isFinite(q))
      return 1;

    if (df > dlarg)
      return tukeyWprob(q, rr, cc);

    // calculate leading constant

    var f2 = df * 0.5;
    var f2lf = ((f2 * Math.log(df)) - (df * Math.log(2))) - jStat.gammaln(f2);
    var f21 = f2 - 1.0;

    // integral is divided into unit, half-unit, quarter-unit, or
    // eighth-unit length intervals depending on the value of the
    // degrees of freedom.

    var ff4 = df * 0.25;
    var ulen;
    if      (df <= dhaf)  ulen = ulen1;
    else if (df <= dquar) ulen = ulen2;
    else if (df <= deigh) ulen = ulen3;
    else                  ulen = ulen4;

    f2lf += Math.log(ulen);

    // integrate over each subinterval

    var ans = 0.0;

    for (var i = 1; i <= 50; i++) {
      var otsum = 0.0;

      // legendre quadrature with order = nlegq
      // nodes (stored in xlegq) are symmetric around zero.

      var twa1 = (2 * i - 1) * ulen;

      for (var jj = 1; jj <= nlegq; jj++) {
        var j, t1;
        if (ihalfq < jj) {
          j = jj - ihalfq - 1;
          t1 = (f2lf + (f21 * Math.log(twa1 + (xlegq[j] * ulen))))
              - (((xlegq[j] * ulen) + twa1) * ff4);
        } else {
          j = jj - 1;
          t1 = (f2lf + (f21 * Math.log(twa1 - (xlegq[j] * ulen))))
              + (((xlegq[j] * ulen) - twa1) * ff4);
        }

        // if exp(t1) < 9e-14, then doesn't contribute to integral
        var qsqz;
        if (t1 >= eps1) {
          if (ihalfq < jj) {
            qsqz = q * Math.sqrt(((xlegq[j] * ulen) + twa1) * 0.5);
          } else {
            qsqz = q * Math.sqrt(((-(xlegq[j] * ulen)) + twa1) * 0.5);
          }

          // call wprob to find integral of range portion

          var wprb = tukeyWprob(qsqz, rr, cc);
          var rotsum = (wprb * alegq[j]) * Math.exp(t1);
          otsum += rotsum;
        }
        // end legendre integral for interval i
        // L200:
      }

      // if integral for interval i < 1e-14, then stop.
      // However, in order to avoid small area under left tail,
      // at least  1 / ulen  intervals are calculated.
      if (i * ulen >= 1.0 && otsum <= eps2)
        break;

      // end of interval i
      // L330:

      ans += otsum;
    }

    if (otsum > eps2) { // not converged
      throw new Error('tukey.cdf failed to converge');
    }
    if (ans > 1)
      ans = 1;
    return ans;
  },

  inv: function(p, nmeans, df) {
    // Identical implementation as the R qtukey() function as of commit 68947
    var rr = 1;
    var cc = nmeans;

    var eps = 0.0001;
    var maxiter = 50;

    // df must be > 1 ; there must be at least two values
    if (df < 2 || rr < 1 || cc < 2) return NaN;

    if (p < 0 || p > 1) return NaN;
    if (p === 0) return 0;
    if (p === 1) return Infinity;

    // Initial value

    var x0 = tukeyQinv(p, cc, df);

    // Find prob(value < x0)

    var valx0 = jStat.tukey.cdf(x0, nmeans, df) - p;

    // Find the second iterate and prob(value < x1).
    // If the first iterate has probability value
    // exceeding p then second iterate is 1 less than
    // first iterate; otherwise it is 1 greater.

    var x1;
    if (valx0 > 0.0)
      x1 = Math.max(0.0, x0 - 1.0);
    else
      x1 = x0 + 1.0;
    var valx1 = jStat.tukey.cdf(x1, nmeans, df) - p;

    // Find new iterate

    var ans;
    for(var iter = 1; iter < maxiter; iter++) {
      ans = x1 - ((valx1 * (x1 - x0)) / (valx1 - valx0));
      valx0 = valx1;

      // New iterate must be >= 0

      x0 = x1;
      if (ans < 0.0) {
        ans = 0.0;
        valx1 = -p;
      }
      // Find prob(value < new iterate)

      valx1 = jStat.tukey.cdf(ans, nmeans, df) - p;
      x1 = ans;

      // If the difference between two successive
      // iterates is less than eps, stop

      var xabs = Math.abs(x1 - x0);
      if (xabs < eps)
        return ans;
    }

    throw new Error('tukey.inv failed to converge');
  }
});

}(jStat, Math));
/* Provides functions for the solution of linear system of equations, integration, extrapolation,
 * interpolation, eigenvalue problems, differential equations and PCA analysis. */

(function(jStat, Math) {

var push = Array.prototype.push;
var isArray = jStat.utils.isArray;

function isUsable(arg) {
  return isArray(arg) || arg instanceof jStat;
}

jStat.extend({

  // add a vector/matrix to a vector/matrix or scalar
  add: function add(arr, arg) {
    // check if arg is a vector or scalar
    if (isUsable(arg)) {
      if (!isUsable(arg[0])) arg = [ arg ];
      return jStat.map(arr, function(value, row, col) {
        return value + arg[row][col];
      });
    }
    return jStat.map(arr, function(value) { return value + arg; });
  },

  // subtract a vector or scalar from the vector
  subtract: function subtract(arr, arg) {
    // check if arg is a vector or scalar
    if (isUsable(arg)) {
      if (!isUsable(arg[0])) arg = [ arg ];
      return jStat.map(arr, function(value, row, col) {
        return value - arg[row][col] || 0;
      });
    }
    return jStat.map(arr, function(value) { return value - arg; });
  },

  // matrix division
  divide: function divide(arr, arg) {
    if (isUsable(arg)) {
      if (!isUsable(arg[0])) arg = [ arg ];
      return jStat.multiply(arr, jStat.inv(arg));
    }
    return jStat.map(arr, function(value) { return value / arg; });
  },

  // matrix multiplication
  multiply: function multiply(arr, arg) {
    var row, col, nrescols, sum, nrow, ncol, res, rescols;
    // eg: arr = 2 arg = 3 -> 6 for res[0][0] statement closure
    if (arr.length === undefined && arg.length === undefined) {
      return arr * arg;
    }
    nrow = arr.length,
    ncol = arr[0].length,
    res = jStat.zeros(nrow, nrescols = (isUsable(arg)) ? arg[0].length : ncol),
    rescols = 0;
    if (isUsable(arg)) {
      for (; rescols < nrescols; rescols++) {
        for (row = 0; row < nrow; row++) {
          sum = 0;
          for (col = 0; col < ncol; col++)
          sum += arr[row][col] * arg[col][rescols];
          res[row][rescols] = sum;
        }
      }
      return (nrow === 1 && rescols === 1) ? res[0][0] : res;
    }
    return jStat.map(arr, function(value) { return value * arg; });
  },

  // outer([1,2,3],[4,5,6])
  // ===
  // [[1],[2],[3]] times [[4,5,6]]
  // ->
  // [[4,5,6],[8,10,12],[12,15,18]]
  outer:function outer(A, B) {
    return jStat.multiply(A.map(function(t){ return [t] }), [B]);
  },


  // Returns the dot product of two matricies
  dot: function dot(arr, arg) {
    if (!isUsable(arr[0])) arr = [ arr ];
    if (!isUsable(arg[0])) arg = [ arg ];
    // convert column to row vector
    var left = (arr[0].length === 1 && arr.length !== 1) ? jStat.transpose(arr) : arr,
    right = (arg[0].length === 1 && arg.length !== 1) ? jStat.transpose(arg) : arg,
    res = [],
    row = 0,
    nrow = left.length,
    ncol = left[0].length,
    sum, col;
    for (; row < nrow; row++) {
      res[row] = [];
      sum = 0;
      for (col = 0; col < ncol; col++)
      sum += left[row][col] * right[row][col];
      res[row] = sum;
    }
    return (res.length === 1) ? res[0] : res;
  },

  // raise every element by a scalar
  pow: function pow(arr, arg) {
    return jStat.map(arr, function(value) { return Math.pow(value, arg); });
  },

  // exponentiate every element
  exp: function exp(arr) {
    return jStat.map(arr, function(value) { return Math.exp(value); });
  },

  // generate the natural log of every element
  log: function exp(arr) {
    return jStat.map(arr, function(value) { return Math.log(value); });
  },

  // generate the absolute values of the vector
  abs: function abs(arr) {
    return jStat.map(arr, function(value) { return Math.abs(value); });
  },

  // computes the p-norm of the vector
  // In the case that a matrix is passed, uses the first row as the vector
  norm: function norm(arr, p) {
    var nnorm = 0,
    i = 0;
    // check the p-value of the norm, and set for most common case
    if (isNaN(p)) p = 2;
    // check if multi-dimensional array, and make vector correction
    if (isUsable(arr[0])) arr = arr[0];
    // vector norm
    for (; i < arr.length; i++) {
      nnorm += Math.pow(Math.abs(arr[i]), p);
    }
    return Math.pow(nnorm, 1 / p);
  },

  // computes the angle between two vectors in rads
  // In case a matrix is passed, this uses the first row as the vector
  angle: function angle(arr, arg) {
    return Math.acos(jStat.dot(arr, arg) / (jStat.norm(arr) * jStat.norm(arg)));
  },

  // augment one matrix by another
  // Note: this function returns a matrix, not a jStat object
  aug: function aug(a, b) {
    var newarr = [];
    var i;
    for (i = 0; i < a.length; i++) {
      newarr.push(a[i].slice());
    }
    for (i = 0; i < newarr.length; i++) {
      push.apply(newarr[i], b[i]);
    }
    return newarr;
  },

  // The inv() function calculates the inverse of a matrix
  // Create the inverse by augmenting the matrix by the identity matrix of the
  // appropriate size, and then use G-J elimination on the augmented matrix.
  inv: function inv(a) {
    var rows = a.length;
    var cols = a[0].length;
    var b = jStat.identity(rows, cols);
    var c = jStat.gauss_jordan(a, b);
    var result = [];
    var i = 0;
    var j;

    //We need to copy the inverse portion to a new matrix to rid G-J artifacts
    for (; i < rows; i++) {
      result[i] = [];
      for (j = cols; j < c[0].length; j++)
        result[i][j - cols] = c[i][j];
    }
    return result;
  },

  // calculate the determinant of a matrix
  det: function det(a) {
    var alen = a.length,
    alend = alen * 2,
    vals = new Array(alend),
    rowshift = alen - 1,
    colshift = alend - 1,
    mrow = rowshift - alen + 1,
    mcol = colshift,
    i = 0,
    result = 0,
    j;
    // check for special 2x2 case
    if (alen === 2) {
      return a[0][0] * a[1][1] - a[0][1] * a[1][0];
    }
    for (; i < alend; i++) {
      vals[i] = 1;
    }
    for (i = 0; i < alen; i++) {
      for (j = 0; j < alen; j++) {
        vals[(mrow < 0) ? mrow + alen : mrow ] *= a[i][j];
        vals[(mcol < alen) ? mcol + alen : mcol ] *= a[i][j];
        mrow++;
        mcol--;
      }
      mrow = --rowshift - alen + 1;
      mcol = --colshift;
    }
    for (i = 0; i < alen; i++) {
      result += vals[i];
    }
    for (; i < alend; i++) {
      result -= vals[i];
    }
    return result;
  },

  gauss_elimination: function gauss_elimination(a, b) {
    var i = 0,
    j = 0,
    n = a.length,
    m = a[0].length,
    factor = 1,
    sum = 0,
    x = [],
    maug, pivot, temp, k;
    a = jStat.aug(a, b);
    maug = a[0].length;
    for(i = 0; i < n; i++) {
      pivot = a[i][i];
      j = i;
      for (k = i + 1; k < m; k++) {
        if (pivot < Math.abs(a[k][i])) {
          pivot = a[k][i];
          j = k;
        }
      }
      if (j != i) {
        for(k = 0; k < maug; k++) {
          temp = a[i][k];
          a[i][k] = a[j][k];
          a[j][k] = temp;
        }
      }
      for (j = i + 1; j < n; j++) {
        factor = a[j][i] / a[i][i];
        for(k = i; k < maug; k++) {
          a[j][k] = a[j][k] - factor * a[i][k];
        }
      }
    }
    for (i = n - 1; i >= 0; i--) {
      sum = 0;
      for (j = i + 1; j<= n - 1; j++) {
        sum = sum + x[j] * a[i][j];
      }
      x[i] =(a[i][maug - 1] - sum) / a[i][i];
    }
    return x;
  },

  gauss_jordan: function gauss_jordan(a, b) {
    var m = jStat.aug(a, b);
    var h = m.length;
    var w = m[0].length;
    var c = 0;
    var x, y, y2;
    // find max pivot
    for (y = 0; y < h; y++) {
      var maxrow = y;
      for (y2 = y+1; y2 < h; y2++) {
        if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
          maxrow = y2;
      }
      var tmp = m[y];
      m[y] = m[maxrow];
      m[maxrow] = tmp
      for (y2 = y+1; y2 < h; y2++) {
        c = m[y2][y] / m[y][y];
        for (x = y; x < w; x++) {
          m[y2][x] -= m[y][x] * c;
        }
      }
    }
    // backsubstitute
    for (y = h-1; y >= 0; y--) {
      c = m[y][y];
      for (y2 = 0; y2 < y; y2++) {
        for (x = w-1; x > y-1; x--) {
          m[y2][x] -= m[y][x] * m[y2][y] / c;
        }
      }
      m[y][y] /= c;
      for (x = h; x < w; x++) {
        m[y][x] /= c;
      }
    }
    return m;
  },

  // solve equation
  // Ax=b
  // A is upper triangular matrix
  // A=[[1,2,3],[0,4,5],[0,6,7]]
  // b=[1,2,3]
  // triaUpSolve(A,b) // -> [2.666,0.1666,1.666]
  // if you use matrix style
  // A=[[1,2,3],[0,4,5],[0,6,7]]
  // b=[[1],[2],[3]]
  // will return [[2.666],[0.1666],[1.666]]
  triaUpSolve: function triaUpSolve(A, b) {
    var size = A[0].length;
    var x = jStat.zeros(1, size)[0];
    var parts;
    var matrix_mode = false;

    if (b[0].length != undefined) {
      b = b.map(function(i){ return i[0] });
      matrix_mode = true;
    }

    jStat.arange(size - 1, -1, -1).forEach(function(i) {
      parts = jStat.arange(i + 1, size).map(function(j) {
        return x[j] * A[i][j];
      });
      x[i] = (b[i] - jStat.sum(parts)) / A[i][i];
    });

    if (matrix_mode)
      return x.map(function(i){ return [i] });
    return x;
  },

  triaLowSolve: function triaLowSolve(A, b) {
    // like to triaUpSolve but A is lower triangular matrix
    var size = A[0].length;
    var x = jStat.zeros(1, size)[0];
    var parts;

    var matrix_mode=false;
    if (b[0].length != undefined) {
      b = b.map(function(i){ return i[0] });
      matrix_mode = true;
    }

    jStat.arange(size).forEach(function(i) {
      parts = jStat.arange(i).map(function(j) {
        return A[i][j] * x[j];
      });
      x[i] = (b[i] - jStat.sum(parts)) / A[i][i];
    })

    if (matrix_mode)
      return x.map(function(i){ return [i] });
    return x;
  },


  // A -> [L,U]
  // A=LU
  // L is lower triangular matrix
  // U is upper triangular matrix
  lu: function lu(A) {
    var size = A.length;
    //var L=jStat.diagonal(jStat.ones(1,size)[0]);
    var L = jStat.identity(size);
    var R = jStat.zeros(A.length, A[0].length);
    var parts;
    jStat.arange(size).forEach(function(t) {
      R[0][t] = A[0][t];
    });
    jStat.arange(1, size).forEach(function(l) {
      jStat.arange(l).forEach(function(i) {
        parts = jStat.arange(i).map(function(jj) {
          return L[l][jj] * R[jj][i];
        });
        L[l][i] = (A[l][i] - jStat.sum(parts)) / R[i][i];
      });
      jStat.arange(l, size).forEach(function(j) {
        parts = jStat.arange(l).map(function(jj) {
          return L[l][jj] * R[jj][j];
        });
        R[l][j] = A[parts.length][j] - jStat.sum(parts);
      });
    });
    return [L, R];
  },

  // A -> T
  // A=TT'
  // T is lower triangular matrix
  cholesky: function cholesky(A) {
    var size = A.length;
    var T = jStat.zeros(A.length, A[0].length);
    var parts;
    jStat.arange(size).forEach(function(i) {
      parts = jStat.arange(i).map(function(t) {
        return Math.pow(T[i][t],2);
      });
      T[i][i] = Math.sqrt(A[i][i] - jStat.sum(parts));
      jStat.arange(i + 1, size).forEach(function(j) {
        parts = jStat.arange(i).map(function(t) {
          return T[i][t] * T[j][t];
        });
        T[j][i] = (A[i][j] - jStat.sum(parts)) / T[i][i];
      });
    });
    return T;
  },


  gauss_jacobi: function gauss_jacobi(a, b, x, r) {
    var i = 0;
    var j = 0;
    var n = a.length;
    var l = [];
    var u = [];
    var d = [];
    var xv, c, h, xk;
    for (; i < n; i++) {
      l[i] = [];
      u[i] = [];
      d[i] = [];
      for (j = 0; j < n; j++) {
        if (i > j) {
          l[i][j] = a[i][j];
          u[i][j] = d[i][j] = 0;
        } else if (i < j) {
          u[i][j] = a[i][j];
          l[i][j] = d[i][j] = 0;
        } else {
          d[i][j] = a[i][j];
          l[i][j] = u[i][j] = 0;
        }
      }
    }
    h = jStat.multiply(jStat.multiply(jStat.inv(d), jStat.add(l, u)), -1);
    c = jStat.multiply(jStat.inv(d), b);
    xv = x;
    xk = jStat.add(jStat.multiply(h, x), c);
    i = 2;
    while (Math.abs(jStat.norm(jStat.subtract(xk,xv))) > r) {
      xv = xk;
      xk = jStat.add(jStat.multiply(h, xv), c);
      i++;
    }
    return xk;
  },

  gauss_seidel: function gauss_seidel(a, b, x, r) {
    var i = 0;
    var n = a.length;
    var l = [];
    var u = [];
    var d = [];
    var j, xv, c, h, xk;
    for (; i < n; i++) {
      l[i] = [];
      u[i] = [];
      d[i] = [];
      for (j = 0; j < n; j++) {
        if (i > j) {
          l[i][j] = a[i][j];
          u[i][j] = d[i][j] = 0;
        } else if (i < j) {
          u[i][j] = a[i][j];
          l[i][j] = d[i][j] = 0;
        } else {
          d[i][j] = a[i][j];
          l[i][j] = u[i][j] = 0;
        }
      }
    }
    h = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, l)), u), -1);
    c = jStat.multiply(jStat.inv(jStat.add(d, l)), b);
    xv = x;
    xk = jStat.add(jStat.multiply(h, x), c);
    i = 2;
    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
      xv = xk;
      xk = jStat.add(jStat.multiply(h, xv), c);
      i = i + 1;
    }
    return xk;
  },

  SOR: function SOR(a, b, x, r, w) {
    var i = 0;
    var n = a.length;
    var l = [];
    var u = [];
    var d = [];
    var j, xv, c, h, xk;
    for (; i < n; i++) {
      l[i] = [];
      u[i] = [];
      d[i] = [];
      for (j = 0; j < n; j++) {
        if (i > j) {
          l[i][j] = a[i][j];
          u[i][j] = d[i][j] = 0;
        } else if (i < j) {
          u[i][j] = a[i][j];
          l[i][j] = d[i][j] = 0;
        } else {
          d[i][j] = a[i][j];
          l[i][j] = u[i][j] = 0;
        }
      }
    }
    h = jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))),
                       jStat.subtract(jStat.multiply(d, 1 - w),
                                      jStat.multiply(u, w)));
    c = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d,
        jStat.multiply(l, w))), b), w);
    xv = x;
    xk = jStat.add(jStat.multiply(h, x), c);
    i = 2;
    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
      xv = xk;
      xk = jStat.add(jStat.multiply(h, xv), c);
      i++;
    }
    return xk;
  },

  householder: function householder(a) {
    var m = a.length;
    var n = a[0].length;
    var i = 0;
    var w = [];
    var p = [];
    var alpha, r, k, j, factor;
    for (; i < m - 1; i++) {
      alpha = 0;
      for (j = i + 1; j < n; j++)
      alpha += (a[j][i] * a[j][i]);
      factor = (a[i + 1][i] > 0) ? -1 : 1;
      alpha = factor * Math.sqrt(alpha);
      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
      w = jStat.zeros(m, 1);
      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
      for (k = i + 2; k < m; k++) w[k][0] = a[k][i] / (2 * r);
      p = jStat.subtract(jStat.identity(m, n),
          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
      a = jStat.multiply(p, jStat.multiply(a, p));
    }
    return a;
  },

  // A -> [Q,R]
  // Q is orthogonal matrix
  // R is upper triangular
  QR: (function() {
    // x -> Q
    // find a orthogonal matrix Q st.
    // Qx=y
    // y is [||x||,0,0,...]

    // quick ref
    var sum   = jStat.sum;
    var range = jStat.arange;

    function qr2(x) {
      // quick impletation
      // https://www.stat.wisc.edu/~larget/math496/qr.html

      var n = x.length;
      var p = x[0].length;

      var r = jStat.zeros(p, p);
      x = jStat.copy(x);

      var i,j,k;
      for(j = 0; j < p; j++){
        r[j][j] = Math.sqrt(sum(range(n).map(function(i){
          return x[i][j] * x[i][j];
        })));
        for(i = 0; i < n; i++){
          x[i][j] = x[i][j] / r[j][j];
        }
        for(k = j+1; k < p; k++){
          r[j][k] = sum(range(n).map(function(i){
            return x[i][j] * x[i][k];
          }));
          for(i = 0; i < n; i++){
            x[i][k] = x[i][k] - x[i][j]*r[j][k];
          }
        }
      }
      return [x, r];
    }

    return qr2;
  }()),

  lstsq: (function() {
    // solve least squard problem for Ax=b as QR decomposition way if b is
    // [[b1],[b2],[b3]] form will return [[x1],[x2],[x3]] array form solution
    // else b is [b1,b2,b3] form will return [x1,x2,x3] array form solution
    function R_I(A) {
      A = jStat.copy(A);
      var size = A.length;
      var I = jStat.identity(size);
      jStat.arange(size - 1, -1, -1).forEach(function(i) {
        jStat.sliceAssign(
            I, { row: i }, jStat.divide(jStat.slice(I, { row: i }), A[i][i]));
        jStat.sliceAssign(
            A, { row: i }, jStat.divide(jStat.slice(A, { row: i }), A[i][i]));
        jStat.arange(i).forEach(function(j) {
          var c = jStat.multiply(A[j][i], -1);
          var Aj = jStat.slice(A, { row: j });
          var cAi = jStat.multiply(jStat.slice(A, { row: i }), c);
          jStat.sliceAssign(A, { row: j }, jStat.add(Aj, cAi));
          var Ij = jStat.slice(I, { row: j });
          var cIi = jStat.multiply(jStat.slice(I, { row: i }), c);
          jStat.sliceAssign(I, { row: j }, jStat.add(Ij, cIi));
        })
      });
      return I;
    }

    function qr_solve(A, b){
      var array_mode = false;
      if (b[0].length === undefined) {
        // [c1,c2,c3] mode
        b = b.map(function(x){ return [x] });
        array_mode = true;
      }
      var QR = jStat.QR(A);
      var Q = QR[0];
      var R = QR[1];
      var attrs = A[0].length;
      var Q1 = jStat.slice(Q,{col:{end:attrs}});
      var R1 = jStat.slice(R,{row:{end:attrs}});
      var RI = R_I(R1);
      var Q2 = jStat.transpose(Q1);

      if(Q2[0].length === undefined){
        Q2 = [Q2]; // The confusing jStat.multifly implementation threat nature process again.
      }

      var x = jStat.multiply(jStat.multiply(RI, Q2), b);

      if(x.length === undefined){
        x = [[x]]; // The confusing jStat.multifly implementation threat nature process again.
      }


      if (array_mode)
        return x.map(function(i){ return i[0] });
      return x;
    }

    return qr_solve;
  }()),

  jacobi: function jacobi(a) {
    var condition = 1;
    var n = a.length;
    var e = jStat.identity(n, n);
    var ev = [];
    var b, i, j, p, q, maxim, theta, s;
    // condition === 1 only if tolerance is not reached
    while (condition === 1) {
      maxim = a[0][1];
      p = 0;
      q = 1;
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (i != j) {
            if (maxim < Math.abs(a[i][j])) {
              maxim = Math.abs(a[i][j]);
              p = i;
              q = j;
            }
          }
        }
      }
      if (a[p][p] === a[q][q])
        theta = (a[p][q] > 0) ? Math.PI / 4 : -Math.PI / 4;
      else
        theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
      s = jStat.identity(n, n);
      s[p][p] = Math.cos(theta);
      s[p][q] = -Math.sin(theta);
      s[q][p] = Math.sin(theta);
      s[q][q] = Math.cos(theta);
      // eigen vector matrix
      e = jStat.multiply(e, s);
      b = jStat.multiply(jStat.multiply(jStat.inv(s), a), s);
      a = b;
      condition = 0;
      for (i = 1; i < n; i++) {
        for (j = 1; j < n; j++) {
          if (i != j && Math.abs(a[i][j]) > 0.001) {
            condition = 1;
          }
        }
      }
    }
    for (i = 0; i < n; i++) ev.push(a[i][i]);
    //returns both the eigenvalue and eigenmatrix
    return [e, ev];
  },

  rungekutta: function rungekutta(f, h, p, t_j, u_j, order) {
    var k1, k2, u_j1, k3, k4;
    if (order === 2) {
      while (t_j <= p) {
        k1 = h * f(t_j, u_j);
        k2 = h * f(t_j + h, u_j + k1);
        u_j1 = u_j + (k1 + k2) / 2;
        u_j = u_j1;
        t_j = t_j + h;
      }
    }
    if (order === 4) {
      while (t_j <= p) {
        k1 = h * f(t_j, u_j);
        k2 = h * f(t_j + h / 2, u_j + k1 / 2);
        k3 = h * f(t_j + h / 2, u_j + k2 / 2);
        k4 = h * f(t_j +h, u_j + k3);
        u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        u_j = u_j1;
        t_j = t_j + h;
      }
    }
    return u_j;
  },

  romberg: function romberg(f, a, b, order) {
    var i = 0;
    var h = (b - a) / 2;
    var x = [];
    var h1 = [];
    var g = [];
    var m, a1, j, k, I;
    while (i < order / 2) {
      I = f(a);
      for (j = a, k = 0; j <= b; j = j + h, k++) x[k] = j;
      m = x.length;
      for (j = 1; j < m - 1; j++) {
        I += (((j % 2) !== 0) ? 4 : 2) * f(x[j]);
      }
      I = (h / 3) * (I + f(b));
      g[i] = I;
      h /= 2;
      i++;
    }
    a1 = g.length;
    m = 1;
    while (a1 !== 1) {
      for (j = 0; j < a1 - 1; j++)
      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
      a1 = h1.length;
      g = h1;
      h1 = [];
      m++;
    }
    return g;
  },

  richardson: function richardson(X, f, x, h) {
    function pos(X, x) {
      var i = 0;
      var n = X.length;
      var p;
      for (; i < n; i++)
        if (X[i] === x) p = i;
      return p;
    }
    var h_min = Math.abs(x - X[pos(X, x) + 1]);
    var i = 0;
    var g = [];
    var h1 = [];
    var y1, y2, m, a, j;
    while (h >= h_min) {
      y1 = pos(X, x + h);
      y2 = pos(X, x);
      g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
      h /= 2;
      i++;
    }
    a = g.length;
    m = 1;
    while (a != 1) {
      for (j = 0; j < a - 1; j++)
        h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
      a = h1.length;
      g = h1;
      h1 = [];
      m++;
    }
    return g;
  },

  simpson: function simpson(f, a, b, n) {
    var h = (b - a) / n;
    var I = f(a);
    var x = [];
    var j = a;
    var k = 0;
    var i = 1;
    var m;
    for (; j <= b; j = j + h, k++)
      x[k] = j;
    m = x.length;
    for (; i < m - 1; i++) {
      I += ((i % 2 !== 0) ? 4 : 2) * f(x[i]);
    }
    return (h / 3) * (I + f(b));
  },

  hermite: function hermite(X, F, dF, value) {
    var n = X.length;
    var p = 0;
    var i = 0;
    var l = [];
    var dl = [];
    var A = [];
    var B = [];
    var j;
    for (; i < n; i++) {
      l[i] = 1;
      for (j = 0; j < n; j++) {
        if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
      }
      dl[i] = 0;
      for (j = 0; j < n; j++) {
        if (i != j) dl[i] += 1 / (X [i] - X[j]);
      }
      A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
      B[i] = (value - X[i]) * (l[i] * l[i]);
      p += (A[i] * F[i] + B[i] * dF[i]);
    }
    return p;
  },

  lagrange: function lagrange(X, F, value) {
    var p = 0;
    var i = 0;
    var j, l;
    var n = X.length;
    for (; i < n; i++) {
      l = F[i];
      for (j = 0; j < n; j++) {
        // calculating the lagrange polynomial L_i
        if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
      }
      // adding the lagrange polynomials found above
      p += l;
    }
    return p;
  },

  cubic_spline: function cubic_spline(X, F, value) {
    var n = X.length;
    var i = 0, j;
    var A = [];
    var B = [];
    var alpha = [];
    var c = [];
    var h = [];
    var b = [];
    var d = [];
    for (; i < n - 1; i++)
      h[i] = X[i + 1] - X[i];
    alpha[0] = 0;
    for (i = 1; i < n - 1; i++) {
      alpha[i] = (3 / h[i]) * (F[i + 1] - F[i]) -
          (3 / h[i-1]) * (F[i] - F[i-1]);
    }
    for (i = 1; i < n - 1; i++) {
      A[i] = [];
      B[i] = [];
      A[i][i-1] = h[i-1];
      A[i][i] = 2 * (h[i - 1] + h[i]);
      A[i][i+1] = h[i];
      B[i][0] = alpha[i];
    }
    c = jStat.multiply(jStat.inv(A), B);
    for (j = 0; j < n - 1; j++) {
      b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
      d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
    }
    for (j = 0; j < n; j++) {
      if (X[j] > value) break;
    }
    j -= 1;
    return F[j] + (value - X[j]) * b[j] + jStat.sq(value-X[j]) *
        c[j] + (value - X[j]) * jStat.sq(value - X[j]) * d[j];
  },

  gauss_quadrature: function gauss_quadrature() {
    throw new Error('gauss_quadrature not yet implemented');
  },

  PCA: function PCA(X) {
    var m = X.length;
    var n = X[0].length;
    var i = 0;
    var j, temp1;
    var u = [];
    var D = [];
    var result = [];
    var temp2 = [];
    var Y = [];
    var Bt = [];
    var B = [];
    var C = [];
    var V = [];
    var Vt = [];
    for (i = 0; i < m; i++) {
      u[i] = jStat.sum(X[i]) / n;
    }
    for (i = 0; i < n; i++) {
      B[i] = [];
      for(j = 0; j < m; j++) {
        B[i][j] = X[j][i] - u[j];
      }
    }
    B = jStat.transpose(B);
    for (i = 0; i < m; i++) {
      C[i] = [];
      for (j = 0; j < m; j++) {
        C[i][j] = (jStat.dot([B[i]], [B[j]])) / (n - 1);
      }
    }
    result = jStat.jacobi(C);
    V = result[0];
    D = result[1];
    Vt = jStat.transpose(V);
    for (i = 0; i < D.length; i++) {
      for (j = i; j < D.length; j++) {
        if(D[i] < D[j])  {
          temp1 = D[i];
          D[i] = D[j];
          D[j] = temp1;
          temp2 = Vt[i];
          Vt[i] = Vt[j];
          Vt[j] = temp2;
        }
      }
    }
    Bt = jStat.transpose(B);
    for (i = 0; i < m; i++) {
      Y[i] = [];
      for (j = 0; j < Bt.length; j++) {
        Y[i][j] = jStat.dot([Vt[i]], [Bt[j]]);
      }
    }
    return [X, D, Vt, Y];
  }
});

// extend jStat.fn with methods that require one argument
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jStat.fn[passfunc] = function(arg, func) {
      var tmpthis = this;
      // check for callback
      if (func) {
        setTimeout(function() {
          func.call(tmpthis, jStat.fn[passfunc].call(tmpthis, arg));
        }, 15);
        return this;
      }
      if (typeof jStat[passfunc](this, arg) === 'number')
        return jStat[passfunc](this, arg);
      else
        return jStat(jStat[passfunc](this, arg));
    };
  }(funcs[i]));
}('add divide multiply subtract dot pow exp log abs norm angle'.split(' ')));

}(jStat, Math));
(function(jStat, Math) {

var slice = [].slice;
var isNumber = jStat.utils.isNumber;
var isArray = jStat.utils.isArray;

// flag==true denotes use of sample standard deviation
// Z Statistics
jStat.extend({
  // 2 different parameter lists:
  // (value, mean, sd)
  // (value, array, flag)
  zscore: function zscore() {
    var args = slice.call(arguments);
    if (isNumber(args[1])) {
      return (args[0] - args[1]) / args[2];
    }
    return (args[0] - jStat.mean(args[1])) / jStat.stdev(args[1], args[2]);
  },

  // 3 different paramter lists:
  // (value, mean, sd, sides)
  // (zscore, sides)
  // (value, array, sides, flag)
  ztest: function ztest() {
    var args = slice.call(arguments);
    var z;
    if (isArray(args[1])) {
      // (value, array, sides, flag)
      z = jStat.zscore(args[0],args[1],args[3]);
      return (args[2] === 1) ?
        (jStat.normal.cdf(-Math.abs(z), 0, 1)) :
        (jStat.normal.cdf(-Math.abs(z), 0, 1)*2);
    } else {
      if (args.length > 2) {
        // (value, mean, sd, sides)
        z = jStat.zscore(args[0],args[1],args[2]);
        return (args[3] === 1) ?
          (jStat.normal.cdf(-Math.abs(z),0,1)) :
          (jStat.normal.cdf(-Math.abs(z),0,1)* 2);
      } else {
        // (zscore, sides)
        z = args[0];
        return (args[1] === 1) ?
          (jStat.normal.cdf(-Math.abs(z),0,1)) :
          (jStat.normal.cdf(-Math.abs(z),0,1)*2);
      }
    }
  }
});

jStat.extend(jStat.fn, {
  zscore: function zscore(value, flag) {
    return (value - this.mean()) / this.stdev(flag);
  },

  ztest: function ztest(value, sides, flag) {
    var zscore = Math.abs(this.zscore(value, flag));
    return (sides === 1) ?
      (jStat.normal.cdf(-zscore, 0, 1)) :
      (jStat.normal.cdf(-zscore, 0, 1) * 2);
  }
});

// T Statistics
jStat.extend({
  // 2 parameter lists
  // (value, mean, sd, n)
  // (value, array)
  tscore: function tscore() {
    var args = slice.call(arguments);
    return (args.length === 4) ?
      ((args[0] - args[1]) / (args[2] / Math.sqrt(args[3]))) :
      ((args[0] - jStat.mean(args[1])) /
       (jStat.stdev(args[1], true) / Math.sqrt(args[1].length)));
  },

  // 3 different paramter lists:
  // (value, mean, sd, n, sides)
  // (tscore, n, sides)
  // (value, array, sides)
  ttest: function ttest() {
    var args = slice.call(arguments);
    var tscore;
    if (args.length === 5) {
      tscore = Math.abs(jStat.tscore(args[0], args[1], args[2], args[3]));
      return (args[4] === 1) ?
        (jStat.studentt.cdf(-tscore, args[3]-1)) :
        (jStat.studentt.cdf(-tscore, args[3]-1)*2);
    }
    if (isNumber(args[1])) {
      tscore = Math.abs(args[0])
      return (args[2] == 1) ?
        (jStat.studentt.cdf(-tscore, args[1]-1)) :
        (jStat.studentt.cdf(-tscore, args[1]-1) * 2);
    }
    tscore = Math.abs(jStat.tscore(args[0], args[1]))
    return (args[2] == 1) ?
      (jStat.studentt.cdf(-tscore, args[1].length-1)) :
      (jStat.studentt.cdf(-tscore, args[1].length-1) * 2);
  }
});

jStat.extend(jStat.fn, {
  tscore: function tscore(value) {
    return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
  },

  ttest: function ttest(value, sides) {
    return (sides === 1) ?
      (1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols()-1)) :
      (jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols()-1)*2);
  }
});

// F Statistics
jStat.extend({
  // Paramter list is as follows:
  // (array1, array2, array3, ...)
  // or it is an array of arrays
  // array of arrays conversion
  anovafscore: function anovafscore() {
    var args = slice.call(arguments),
    expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
    if (args.length === 1) {
      tmpargs = new Array(args[0].length);
      for (i = 0; i < args[0].length; i++) {
        tmpargs[i] = args[0][i];
      }
      args = tmpargs;
    }
    // Builds sample array
    sample = new Array();
    for (i = 0; i < args.length; i++) {
      sample = sample.concat(args[i]);
    }
    sampMean = jStat.mean(sample);
    // Computes the explained variance
    expVar = 0;
    for (i = 0; i < args.length; i++) {
      expVar = expVar + args[i].length * Math.pow(jStat.mean(args[i]) - sampMean, 2);
    }
    expVar /= (args.length - 1);
    // Computes unexplained variance
    unexpVar = 0;
    for (i = 0; i < args.length; i++) {
      sampSampMean = jStat.mean(args[i]);
      for (j = 0; j < args[i].length; j++) {
        unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
      }
    }
    unexpVar /= (sample.length - args.length);
    return expVar / unexpVar;
  },

  // 2 different paramter setups
  // (array1, array2, array3, ...)
  // (anovafscore, df1, df2)
  anovaftest: function anovaftest() {
    var args = slice.call(arguments),
    df1, df2, n, i;
    if (isNumber(args[0])) {
      return 1 - jStat.centralF.cdf(args[0], args[1], args[2]);
    }
    var anovafscore = jStat.anovafscore(args);
    df1 = args.length - 1;
    n = 0;
    for (i = 0; i < args.length; i++) {
      n = n + args[i].length;
    }
    df2 = n - df1 - 1;
    return 1 - jStat.centralF.cdf(anovafscore, df1, df2);
  },

  ftest: function ftest(fscore, df1, df2) {
    return 1 - jStat.centralF.cdf(fscore, df1, df2);
  }
});

jStat.extend(jStat.fn, {
  anovafscore: function anovafscore() {
    return jStat.anovafscore(this.toArray());
  },

  anovaftes: function anovaftes() {
    var n = 0;
    var i;
    for (i = 0; i < this.length; i++) {
      n = n + this[i].length;
    }
    return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
  }
});

// Tukey's range test
jStat.extend({
  // 2 parameter lists
  // (mean1, mean2, n1, n2, sd)
  // (array1, array2, sd)
  qscore: function qscore() {
    var args = slice.call(arguments);
    var mean1, mean2, n1, n2, sd;
    if (isNumber(args[0])) {
        mean1 = args[0];
        mean2 = args[1];
        n1 = args[2];
        n2 = args[3];
        sd = args[4];
    } else {
        mean1 = jStat.mean(args[0]);
        mean2 = jStat.mean(args[1]);
        n1 = args[0].length;
        n2 = args[1].length;
        sd = args[2];
    }
    return Math.abs(mean1 - mean2) / (sd * Math.sqrt((1 / n1 + 1 / n2) / 2));
  },

  // 3 different parameter lists:
  // (qscore, n, k)
  // (mean1, mean2, n1, n2, sd, n, k)
  // (array1, array2, sd, n, k)
  qtest: function qtest() {
    var args = slice.call(arguments);

    var qscore;
    if (args.length === 3) {
      qscore = args[0];
      args = args.slice(1);
    } else if (args.length === 7) {
      qscore = jStat.qscore(args[0], args[1], args[2], args[3], args[4]);
      args = args.slice(5);
    } else {
      qscore = jStat.qscore(args[0], args[1], args[2]);
      args = args.slice(3);
    }

    var n = args[0];
    var k = args[1];

    return 1 - jStat.tukey.cdf(qscore, k, n - k);
  },

  tukeyhsd: function tukeyhsd(arrays) {
    var sd = jStat.pooledstdev(arrays);
    var means = arrays.map(function (arr) {return jStat.mean(arr);});
    var n = arrays.reduce(function (n, arr) {return n + arr.length;}, 0);

    var results = [];
    for (var i = 0; i < arrays.length; ++i) {
        for (var j = i + 1; j < arrays.length; ++j) {
            var p = jStat.qtest(means[i], means[j], arrays[i].length, arrays[j].length, sd, n, arrays.length);
            results.push([[i, j], p]);
        }
    }

    return results;
  }
});

// Error Bounds
jStat.extend({
  // 2 different parameter setups
  // (value, alpha, sd, n)
  // (value, alpha, array)
  normalci: function normalci() {
    var args = slice.call(arguments),
    ans = new Array(2),
    change;
    if (args.length === 4) {
      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
                        args[2] / Math.sqrt(args[3]));
    } else {
      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
                        jStat.stdev(args[2]) / Math.sqrt(args[2].length));
    }
    ans[0] = args[0] - change;
    ans[1] = args[0] + change;
    return ans;
  },

  // 2 different parameter setups
  // (value, alpha, sd, n)
  // (value, alpha, array)
  tci: function tci() {
    var args = slice.call(arguments),
    ans = new Array(2),
    change;
    if (args.length === 4) {
      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[3] - 1) *
                        args[2] / Math.sqrt(args[3]));
    } else {
      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[2].length - 1) *
                        jStat.stdev(args[2], true) / Math.sqrt(args[2].length));
    }
    ans[0] = args[0] - change;
    ans[1] = args[0] + change;
    return ans;
  },

  significant: function significant(pvalue, alpha) {
    return pvalue < alpha;
  }
});

jStat.extend(jStat.fn, {
  normalci: function normalci(value, alpha) {
    return jStat.normalci(value, alpha, this.toArray());
  },

  tci: function tci(value, alpha) {
    return jStat.tci(value, alpha, this.toArray());
  }
});

// internal method for calculating the z-score for a difference of proportions test
function differenceOfProportions(p1, n1, p2, n2) {
  if (p1 > 1 || p2 > 1 || p1 <= 0 || p2 <= 0) {
    throw new Error("Proportions should be greater than 0 and less than 1")
  }
  var pooled = (p1 * n1 + p2 * n2) / (n1 + n2);
  var se = Math.sqrt(pooled * (1 - pooled) * ((1/n1) + (1/n2)));
  return (p1 - p2) / se;
}

// Difference of Proportions
jStat.extend(jStat.fn, {
  oneSidedDifferenceOfProportions: function oneSidedDifferenceOfProportions(p1, n1, p2, n2) {
    var z = differenceOfProportions(p1, n1, p2, n2);
    return jStat.ztest(z, 1);
  },

  twoSidedDifferenceOfProportions: function twoSidedDifferenceOfProportions(p1, n1, p2, n2) {
    var z = differenceOfProportions(p1, n1, p2, n2);
    return jStat.ztest(z, 2);
  }
});

}(jStat, Math));
jStat.models = (function(){
  function sub_regress(exog) {
    var var_count = exog[0].length;
    var modelList = jStat.arange(var_count).map(function(endog_index) {
      var exog_index =
          jStat.arange(var_count).filter(function(i){return i!==endog_index});
      return ols(jStat.col(exog, endog_index).map(function(x){ return x[0] }),
                 jStat.col(exog, exog_index))
    });
    return modelList;
  }

  // do OLS model regress
  // exog have include const columns ,it will not generate it .In fact, exog is
  // "design matrix" look at
  //https://en.wikipedia.org/wiki/Design_matrix
  function ols(endog, exog) {
    var nobs = endog.length;
    var df_model = exog[0].length - 1;
    var df_resid = nobs-df_model - 1;
    var coef = jStat.lstsq(exog, endog);
    var predict =
        jStat.multiply(exog, coef.map(function(x) { return [x] }))
            .map(function(p) { return p[0] });
    var resid = jStat.subtract(endog, predict);
    var ybar = jStat.mean(endog);
    // constant cause problem
    // var SST = jStat.sum(endog.map(function(y) {
    //   return Math.pow(y-ybar,2);
    // }));
    var SSE = jStat.sum(predict.map(function(f) {
      return Math.pow(f - ybar, 2);
    }));
    var SSR = jStat.sum(endog.map(function(y, i) {
      return Math.pow(y - predict[i], 2);
    }));
    var SST = SSE + SSR;
    var R2 = (SSE / SST);
    return {
        exog:exog,
        endog:endog,
        nobs:nobs,
        df_model:df_model,
        df_resid:df_resid,
        coef:coef,
        predict:predict,
        resid:resid,
        ybar:ybar,
        SST:SST,
        SSE:SSE,
        SSR:SSR,
        R2:R2
    };
  }

  // H0: b_I=0
  // H1: b_I!=0
  function t_test(model) {
    var subModelList = sub_regress(model.exog);
    //var sigmaHat=jStat.stdev(model.resid);
    var sigmaHat = Math.sqrt(model.SSR / (model.df_resid));
    var seBetaHat = subModelList.map(function(mod) {
      var SST = mod.SST;
      var R2 = mod.R2;
      return sigmaHat / Math.sqrt(SST * (1 - R2));
    });
    var tStatistic = model.coef.map(function(coef, i) {
      return (coef - 0) / seBetaHat[i];
    });
    var pValue = tStatistic.map(function(t) {
      var leftppf = jStat.studentt.cdf(t, model.df_resid);
      return (leftppf > 0.5 ? 1 - leftppf : leftppf) * 2;
    });
    var c = jStat.studentt.inv(0.975, model.df_resid);
    var interval95 = model.coef.map(function(coef, i) {
      var d = c * seBetaHat[i];
      return [coef - d, coef + d];
    })
    return {
        se: seBetaHat,
        t: tStatistic,
        p: pValue,
        sigmaHat: sigmaHat,
        interval95: interval95
    };
  }

  function F_test(model) {
    var F_statistic =
        (model.R2 / model.df_model) / ((1 - model.R2) / model.df_resid);
    var fcdf = function(x, n1, n2) {
      return jStat.beta.cdf(x / (n2 / n1 + x), n1 / 2, n2 / 2)
    }
    var pvalue = 1 - fcdf(F_statistic, model.df_model, model.df_resid);
    return { F_statistic: F_statistic, pvalue: pvalue };
  }

  function ols_wrap(endog, exog) {
    var model = ols(endog,exog);
    var ttest = t_test(model);
    var ftest = F_test(model);
    // Provide the Wherry / Ezekiel / McNemar / Cohen Adjusted R^2
    // Which matches the 'adjusted R^2' provided by R's lm package
    var adjust_R2 =
        1 - (1 - model.R2) * ((model.nobs - 1) / (model.df_resid));
    model.t = ttest;
    model.f = ftest;
    model.adjust_R2 = adjust_R2;
    return model;
  }

  return { ols: ols_wrap };
})();
//To regress, simply build X matrix
//(append column of 1's) using
//buildxmatrix and build the Y
//matrix using buildymatrix
//(simply the transpose)
//and run regress.



//Regressions

jStat.extend({
  buildxmatrix: function buildxmatrix(){
    //Parameters will be passed in as such
    //(array1,array2,array3,...)
    //as (x1,x2,x3,...)
    //needs to be (1,x1,x2,x3,...)
    var matrixRows = new Array(arguments.length);
    for(var i=0;i<arguments.length;i++){
      var array = [1];
      matrixRows[i]= array.concat(arguments[i]);
    }
    return jStat(matrixRows);

  },

  builddxmatrix: function builddxmatrix() {
    //Paramters will be passed in as such
    //([array1,array2,...]
    var matrixRows = new Array(arguments[0].length);
    for(var i=0;i<arguments[0].length;i++){
      var array = [1]
      matrixRows[i]= array.concat(arguments[0][i]);
    }
    return jStat(matrixRows);

  },

  buildjxmatrix: function buildjxmatrix(jMat) {
    //Builds from jStat Matrix
    var pass = new Array(jMat.length)
    for(var i=0;i<jMat.length;i++){
      pass[i] = jMat[i];
    }
    return jStat.builddxmatrix(pass);

  },

  buildymatrix: function buildymatrix(array){
    return jStat(array).transpose();
  },

  buildjymatrix: function buildjymatrix(jMat){
    return jMat.transpose();
  },

  matrixmult: function matrixmult(A,B){
    var i, j, k, result, sum;
    if (A.cols() == B.rows()) {
      if(B.rows()>1){
        result = [];
        for (i = 0; i < A.rows(); i++) {
          result[i] = [];
          for (j = 0; j < B.cols(); j++) {
            sum = 0;
            for (k = 0; k < A.cols(); k++) {
              sum += A.toArray()[i][k] * B.toArray()[k][j];
            }
            result[i][j] = sum;
          }
        }
        return jStat(result);
      }
      result = [];
      for (i = 0; i < A.rows(); i++) {
        result[i] = [];
        for (j = 0; j < B.cols(); j++) {
          sum = 0;
          for (k = 0; k < A.cols(); k++) {
            sum += A.toArray()[i][k] * B.toArray()[j];
          }
          result[i][j] = sum;
        }
      }
      return jStat(result);
    }
  },

  //regress and regresst to be fixed

  regress: function regress(jMatX,jMatY){
    //print("regressin!");
    //print(jMatX.toArray());
    var innerinv = jStat.xtranspxinv(jMatX);
    //print(innerinv);
    var xtransp = jMatX.transpose();
    var next = jStat.matrixmult(jStat(innerinv),xtransp);
    return jStat.matrixmult(next,jMatY);

  },

  regresst: function regresst(jMatX,jMatY,sides){
    var beta = jStat.regress(jMatX,jMatY);

    var compile = {};
    compile.anova = {};
    var jMatYBar = jStat.jMatYBar(jMatX, beta);
    compile.yBar = jMatYBar;
    var yAverage = jMatY.mean();
    compile.anova.residuals = jStat.residuals(jMatY, jMatYBar);

    compile.anova.ssr = jStat.ssr(jMatYBar, yAverage);
    compile.anova.msr = compile.anova.ssr / (jMatX[0].length - 1);

    compile.anova.sse = jStat.sse(jMatY, jMatYBar);
    compile.anova.mse =
        compile.anova.sse / (jMatY.length - (jMatX[0].length - 1) - 1);

    compile.anova.sst = jStat.sst(jMatY, yAverage);
    compile.anova.mst = compile.anova.sst / (jMatY.length - 1);

    compile.anova.r2 = 1 - (compile.anova.sse / compile.anova.sst);
    if (compile.anova.r2 < 0) compile.anova.r2 = 0;

    compile.anova.fratio = compile.anova.msr / compile.anova.mse;
    compile.anova.pvalue =
        jStat.anovaftest(compile.anova.fratio,
                         jMatX[0].length - 1,
                         jMatY.length - (jMatX[0].length - 1) - 1);

    compile.anova.rmse = Math.sqrt(compile.anova.mse);

    compile.anova.r2adj = 1 - (compile.anova.mse / compile.anova.mst);
    if (compile.anova.r2adj < 0) compile.anova.r2adj = 0;

    compile.stats = new Array(jMatX[0].length);
    var covar = jStat.xtranspxinv(jMatX);
    var sds, ts, ps;

    for(var i=0; i<beta.length;i++){
      sds=Math.sqrt(compile.anova.mse * Math.abs(covar[i][i]));
      ts= Math.abs(beta[i] / sds);
      ps= jStat.ttest(ts, jMatY.length - jMatX[0].length - 1, sides);

      compile.stats[i]=[beta[i], sds, ts, ps];
    }

    compile.regress = beta;
    return compile;
  },

  xtranspx: function xtranspx(jMatX){
    return jStat.matrixmult(jMatX.transpose(),jMatX);
  },


  xtranspxinv: function xtranspxinv(jMatX){
    var inner = jStat.matrixmult(jMatX.transpose(),jMatX);
    var innerinv = jStat.inv(inner);
    return innerinv;
  },

  jMatYBar: function jMatYBar(jMatX, beta) {
    var yBar = jStat.matrixmult(jMatX, beta);
    return new jStat(yBar);
  },

  residuals: function residuals(jMatY, jMatYBar) {
    return jStat.matrixsubtract(jMatY, jMatYBar);
  },

  ssr: function ssr(jMatYBar, yAverage) {
    var ssr = 0;
    for(var i = 0; i < jMatYBar.length; i++) {
      ssr += Math.pow(jMatYBar[i] - yAverage, 2);
    }
    return ssr;
  },

  sse: function sse(jMatY, jMatYBar) {
    var sse = 0;
    for(var i = 0; i < jMatY.length; i++) {
      sse += Math.pow(jMatY[i] - jMatYBar[i], 2);
    }
    return sse;
  },

  sst: function sst(jMatY, yAverage) {
    var sst = 0;
    for(var i = 0; i < jMatY.length; i++) {
      sst += Math.pow(jMatY[i] - yAverage, 2);
    }
    return sst;
  },

  matrixsubtract: function matrixsubtract(A,B){
    var ans = new Array(A.length);
    for(var i=0;i<A.length;i++){
      ans[i] = new Array(A[i].length);
      for(var j=0;j<A[i].length;j++){
        ans[i][j]=A[i][j]-B[i][j];
      }
    }
    return jStat(ans);
  }
});
  // Make it compatible with previous version.
  jStat.jStat = jStat;

  return jStat;
});


/***/ }),

/***/ "./src/CanvasHelper.ts":
/*!*****************************!*\
  !*** ./src/CanvasHelper.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CanvasHelper {
    static DrawCircle(position, radious, color = "white", context = CanvasHelper.sharedContext) {
        let originalFillStyle = context.fillStyle;
        context.fillStyle = color;
        context.beginPath();
        context.arc(position.x, position.y, radious, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.fillStyle = originalFillStyle;
    }
    static DrawLine(from, to, thickness, context = CanvasHelper.sharedContext) {
        let originalLineWidth = context.lineWidth;
        context.lineWidth = thickness;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
        context.lineWidth = originalLineWidth;
    }
    static DrawText(text, position, size, textAlign = "left", font = "sans-serif", color = "black", mod = "", context = CanvasHelper.sharedContext) {
        const originalFillStyle = context.fillStyle;
        const originalFont = context.font;
        const originalTextAlign = context.textAlign;
        context.fillStyle = color;
        context.font = (mod === "" ? "" : mod + ' ') + size.toString() + "px " + font;
        context.textAlign = textAlign;
        context.fillText(text, position.x, position.y);
        context.fillStyle = originalFillStyle;
        context.font = originalFont;
        context.textAlign = originalTextAlign;
    }
}
exports.CanvasHelper = CanvasHelper;


/***/ }),

/***/ "./src/Matrix.ts":
/*!***********************!*\
  !*** ./src/Matrix.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __webpack_require__(/*! ./Vector2 */ "./src/Vector2.ts");
const CanvasHelper_1 = __webpack_require__(/*! ./CanvasHelper */ "./src/CanvasHelper.ts");
exports.MatrixRows = class extends Array {
};
var Side;
(function (Side) {
    Side[Side["above"] = 0] = "above";
    Side[Side["under"] = 1] = "under";
    Side[Side["left"] = 2] = "left";
    Side[Side["right"] = 3] = "right";
})(Side = exports.Side || (exports.Side = {}));
class Matrix {
    constructor(rows) {
        this._lastDrawPosition = null;
        const columnNumber = rows[0].length;
        const rowsCopy = new exports.MatrixRows(rows.length);
        for (let row = 0; row < rows.length; row++) {
            rowsCopy[row] = new Array(columnNumber);
            if (rows[row].length != columnNumber)
                throw Error("Inconsistent column number between rows in a matrix");
            for (let col = 0; col < columnNumber; col++) {
                rowsCopy[row][col] = rows[row][col];
                if (rows[row][col] == undefined || rows[row][col] == null)
                    throw new Error("Cell content in matrix can't be null/undefined");
            }
        }
        this.numbers = rowsCopy;
    }
    get RowNumber() { return this.numbers.length; }
    get ColumnNumber() { return this.numbers[0].length; }
    get IsSquare() { return this.RowNumber == this.ColumnNumber; }
    get PixelWidth() { return this.ColumnNumber * Matrix.cellPixelSize; }
    get PixelHeight() { return (this.RowNumber * Matrix.cellPixelSize) + Matrix.labelPixelMargin; }
    get LastDrawPosition() { return this._lastDrawPosition; }
    Draw(position, label = "", context = CanvasHelper_1.CanvasHelper.sharedContext) {
        const originalTextAlign = context.textAlign;
        const originalFont = context.font;
        context.textAlign = "center";
        context.font = Matrix.cellContentFont;
        for (let rowNum = 0; rowNum < this.numbers.length; rowNum++) {
            const row = this.numbers[rowNum];
            for (let colNum = 0; colNum < row.length; colNum++) {
                const cell = row[colNum];
                const cellPosition = new Vector2_1.Vector2(position.x + (Matrix.cellPixelSize * colNum), position.y + (Matrix.cellPixelSize * rowNum));
                context.beginPath();
                context.rect(cellPosition.x, cellPosition.y, Matrix.cellPixelSize, Matrix.cellPixelSize);
                context.stroke();
                context.fillText(parseFloat(cell.toFixed(3)).toString(), cellPosition.x + (Matrix.cellPixelSize / 2), cellPosition.y + (Matrix.cellPixelSize / 2));
            }
        }
        if (label !== "") {
            context.textAlign = "left";
            context.font = Matrix.labelFont;
            context.fillText(label, position.x, position.y - Matrix.labelPixelMargin);
        }
        context.textAlign = originalTextAlign;
        context.font = originalFont;
        this._lastDrawPosition = position;
    }
    DrawNextTo(matrix, side, label = "", context = CanvasHelper_1.CanvasHelper.sharedContext) {
        if (matrix.LastDrawPosition == null)
            throw Error("Can't draw next to matrix that wasn't drawn yet");
        let position;
        switch (side) {
            case Side.above:
                position = new Vector2_1.Vector2(matrix.LastDrawPosition.x, matrix.LastDrawPosition.y - this.PixelHeight - (Matrix.matrixPixelMargin * 1.5));
                break;
            case Side.under:
                position = new Vector2_1.Vector2(matrix.LastDrawPosition.x, matrix.LastDrawPosition.y + matrix.PixelHeight + (Matrix.matrixPixelMargin * 1.5));
                break;
            case Side.left:
                position = new Vector2_1.Vector2(matrix.LastDrawPosition.x - this.PixelWidth - Matrix.matrixPixelMargin, matrix.LastDrawPosition.y);
                break;
            case Side.right:
                position = new Vector2_1.Vector2(matrix.LastDrawPosition.x + matrix.PixelWidth + Matrix.matrixPixelMargin, matrix.LastDrawPosition.y);
                break;
            default:
                throw new Error("Unexpected side value");
                break;
        }
        this.Draw(position, label, context);
    }
    toString() {
        let result = "";
        for (let i = 0; i < this.RowNumber; i++) {
            result += '[';
            for (let j = 0; j < this.ColumnNumber; j++) {
                result += this.numbers[i][j] + ((j + 1 < this.ColumnNumber) ? ';' : '');
            }
            result += ']';
        }
        return result;
    }
    static FromString(input) {
        if (input.length <= 0)
            return null;
        const rows = new exports.MatrixRows();
        const offset = { value: 0 };
        while (offset.value < input.length) {
            rows.push(this.ReadRow(input, offset));
        }
        let isValid = true;
        const columnNumber = rows[0].length;
        if (columnNumber <= 0)
            isValid = false;
        else {
            rows.forEach(row => {
                if (row.length != columnNumber)
                    isValid = false;
                row.forEach(value => { if (isNaN(value))
                    isValid = false; });
            });
        }
        return isValid ? new Matrix(rows) : null;
    }
    static ReadRow(input, offset) {
        const row = new Array();
        if (input[offset.value] == '[')
            offset.value++;
        while (offset.value < input.length) {
            const currentChar = input[offset.value];
            if (currentChar == ']') {
                offset.value++;
                break;
            }
            else {
                row.push(this.ReadNumber(input, offset));
            }
        }
        return row;
    }
    static ReadNumber(input, offset) {
        let value = '';
        while (offset.value < input.length) {
            const currentChar = input[offset.value];
            if (currentChar == ']')
                break;
            offset.value++;
            if (currentChar == ' ' || currentChar == ';')
                break;
            else
                value += currentChar == ',' ? '.' : currentChar;
        }
        return Number(value);
    }
    Transpose() {
        const newNumbers = new exports.MatrixRows(this.numbers[0].length);
        for (let i = 0; i < newNumbers.length; i++) {
            newNumbers[i] = new Array(this.numbers.length);
        }
        for (let row = 0; row < this.numbers.length; row++) {
            for (let column = 0; column < this.numbers[0].length; column++) {
                newNumbers[column][row] = this.numbers[row][column];
            }
        }
        return new Matrix(newNumbers);
    }
    MultiplyMatrix(matrix) {
        if (matrix.RowNumber != this.ColumnNumber)
            throw new Error("To multiply matrices first matrix must have number of columns equal to number of rows in second matrix");
        const rows = new exports.MatrixRows(this.RowNumber);
        for (let i = 0; i < this.RowNumber; i++) {
            rows[i] = new Array(matrix.ColumnNumber);
            for (let j = 0; j < matrix.ColumnNumber; j++) {
                let result = 0;
                for (let k = 0; k < this.ColumnNumber; k++) {
                    result += this.numbers[i][k] * matrix.numbers[k][j];
                }
                rows[i][j] = result;
            }
        }
        return new Matrix(rows);
    }
    MultiplyScalar(num) {
        const rows = new exports.MatrixRows(this.RowNumber);
        for (let i = 0; i < this.RowNumber; i++) {
            rows[i] = new Array(this.ColumnNumber);
            for (let j = 0; j < this.ColumnNumber; j++) {
                rows[i][j] = this.numbers[i][j] * num;
            }
        }
        return new Matrix(rows);
    }
    Add(matrix) {
        if (this.RowNumber != matrix.RowNumber || this.ColumnNumber != matrix.ColumnNumber)
            throw new Error("Only matrices of the same size can be added");
        const rows = new exports.MatrixRows(this.RowNumber);
        for (let rowNum = 0; rowNum < this.RowNumber; rowNum++) {
            rows[rowNum] = new Array(this.ColumnNumber);
            for (let colNum = 0; colNum < this.ColumnNumber; colNum++) {
                rows[rowNum][colNum] = this.numbers[rowNum][colNum] + matrix.numbers[rowNum][colNum];
            }
        }
        return new Matrix(rows);
    }
    get Determinant() {
        if (!this.IsSquare)
            throw new Error("Only square matrices have determinant");
        if (this.ColumnNumber == 1) {
            return this.numbers[0][0];
        }
        else if (this.ColumnNumber == 2) {
            return (this.numbers[0][0] * this.numbers[1][1]) - (this.numbers[1][0] * this.numbers[0][1]);
        }
        else {
            let result = 0;
            let negate = false;
            for (let colNum = 0; colNum < this.ColumnNumber; colNum++) {
                const matrix = this.GetPart(0, colNum);
                result += (negate ? -matrix.Determinant : matrix.Determinant) * this.numbers[0][colNum];
                negate = !negate;
            }
            return result;
        }
    }
    GetPart(rowNum, colNum) {
        const rows = new exports.MatrixRows(this.RowNumber - 1);
        let copyRow = 0;
        for (let newRow = 0; newRow < rows.length; newRow++) {
            if (copyRow == rowNum)
                copyRow++;
            rows[newRow] = new Array(this.ColumnNumber - 1);
            let copyCol = 0;
            for (let newCol = 0; newCol < rows[newRow].length; newCol++) {
                if (copyCol == colNum)
                    copyCol++;
                rows[newRow][newCol] = this.numbers[copyRow][copyCol];
                copyCol++;
            }
            copyRow++;
        }
        return new Matrix(rows);
    }
    Invert() {
        if (!this.IsSquare)
            return null;
        else if (this.Determinant == 0)
            return null;
        else if (this.ColumnNumber == 1)
            return new Matrix([[1 / this.numbers[0][0]]]);
        else if (this.ColumnNumber == 2)
            return new Matrix([[this.numbers[1][1], -this.numbers[0][1]], [-this.numbers[1][0], this.numbers[0][0]]]).MultiplyScalar(1 / this.Determinant);
        else {
            const cofactorsRows = new exports.MatrixRows(this.RowNumber);
            {
                let negate = false;
                for (let rowNum = 0; rowNum < cofactorsRows.length; rowNum++) {
                    cofactorsRows[rowNum] = new Array(this.ColumnNumber);
                    for (let colNum = 0; colNum < cofactorsRows[rowNum].length; colNum++) {
                        const determiant = this.GetPart(rowNum, colNum).Determinant;
                        cofactorsRows[rowNum][colNum] = negate ? -determiant : determiant;
                        negate = !negate;
                    }
                }
            }
            const adjugate = new Matrix(cofactorsRows).Transpose();
            return adjugate.MultiplyScalar(1 / this.Determinant);
        }
    }
    get Average() {
        const elementNumber = this.ColumnNumber * this.RowNumber;
        let elementSum = 0;
        for (let row = 0; row < this.RowNumber; row++) {
            for (let col = 0; col < this.ColumnNumber; col++) {
                elementSum += this.numbers[row][col];
            }
        }
        return elementSum / elementNumber;
    }
}
exports.Matrix = Matrix;
Matrix.cellPixelSize = 40;
Matrix.labelPixelMargin = 6;
Matrix.matrixPixelMargin = 12;
Matrix.cellContentFont = "11px sans-serif";
Matrix.labelFont = "bold 14px sans-serif";


/***/ }),

/***/ "./src/Solvers/CatalysisEffectSolver.ts":
/*!**********************************************!*\
  !*** ./src/Solvers/CatalysisEffectSolver.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Solver_1 = __webpack_require__(/*! ./Solver */ "./src/Solvers/Solver.ts");
const Matrix_1 = __webpack_require__(/*! ../Matrix */ "./src/Matrix.ts");
const Vector2_1 = __webpack_require__(/*! ../Vector2 */ "./src/Vector2.ts");
const Utils_1 = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");
const CanvasHelper_1 = __webpack_require__(/*! ../CanvasHelper */ "./src/CanvasHelper.ts");
class CatalysisEffectSolver extends Solver_1.Solver {
    constructor() {
        super(["R", "R0"]);
    }
    HandleInput(inputEvent) {
        this.ClearInputErrors();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        let R = Matrix_1.Matrix.FromString(this.GetInputValue("R"));
        let R0 = Matrix_1.Matrix.FromString(this.GetInputValue("R0"));
        if (R === null) {
            this.DisplayInputError("R", CatalysisEffectSolver.notMatrixError);
            return;
        }
        else if (!R.IsSquare) {
            this.DisplayInputError("R", CatalysisEffectSolver.matrixNotSquareError);
            return;
        }
        else if (R.ColumnNumber < 2) {
            this.DisplayInputError("R", CatalysisEffectSolver.matrixNotSquareError);
            return;
        }
        else {
            for (let i = 0; i < R.ColumnNumber; i++) {
                if (R.numbers[i][i] != 1) {
                    this.DisplayInputError("R", `R musi mieć same 1 po przekątnej. W rzędzie ${i} kolumnie ${i} jest ${R.numbers[i][i]} zamiast 1`);
                    return;
                }
            }
            let fixR = false;
            const newRows = new Matrix_1.MatrixRows(R.RowNumber);
            for (let row = 0; row < R.RowNumber; row++)
                newRows[row] = new Array(R.ColumnNumber);
            for (let row = 0; row < R.RowNumber; row++) {
                for (let col = row; col < R.ColumnNumber; col++) {
                    newRows[row][col] = R.numbers[row][col];
                    newRows[col][row] = R.numbers[row][col];
                    if (R.numbers[row][col] != R.numbers[col][row]) {
                        if (R.numbers[col][row] == 0) {
                            fixR = true;
                        }
                        else {
                            this.DisplayInputError("R", `R musi być symetryczne względnem przekątnej z 1. ` +
                                `Liczby w komórkach [${row}][${col}] i [${col}][${row}], czyli ${R.numbers[row][col]} i ${R.numbers[col][row]} nie są równe`);
                            return;
                        }
                    }
                }
            }
            if (fixR)
                R = new Matrix_1.Matrix(newRows);
        }
        if (R0 === null) {
            this.DisplayInputError("R0", CatalysisEffectSolver.notMatrixError);
            return;
        }
        else if (R0.RowNumber > 1) {
            if (R0.ColumnNumber == 1)
                R0 = R0.Transpose();
            else {
                this.DisplayInputError("R0", Solver_1.Solver.notVectorError);
                return;
            }
        }
        if (R.ColumnNumber != R0.ColumnNumber) {
            this.DisplayInputError("R", "R ma inną ilość kolumn niż R0");
            this.DisplayInputError("R0", "R0 ma inną ilość kolumn niż R");
            return;
        }
        const tmpR0_reg_out = this.CalculateR0_reg(R0);
        const R0_reg = tmpR0_reg_out[0];
        const xOrderInR0_reg = tmpR0_reg_out[1];
        const R_reg = this.CalculateR_reg(R, R0, R0_reg, xOrderInR0_reg);
        const tmpCatPar_out = this.FindCatalysisPairs(R_reg, R0_reg, xOrderInR0_reg);
        const catalysisPairs = tmpCatPar_out[0];
        const Rij = tmpCatPar_out[1];
        const Ri_Rj = tmpCatPar_out[2];
        const combinations = this.CalculateCombinations(R.RowNumber);
        const H_sj = this.CalculateH_sj(R, R0, combinations);
        const H_s = this.CalculateH_s(H_sj);
        const bestH = CatalysisEffectSolver.GetGreatestNumberIndex(H_s);
        R.Draw(Solver_1.Solver.drawStartPos, "R");
        const R0T = R0.Transpose();
        R0T.DrawNextTo(R, Matrix_1.Side.right, "R0");
        R0_reg.Transpose().DrawNextTo(R0T, Matrix_1.Side.under, "R0_reg");
        R_reg.DrawNextTo(R, Matrix_1.Side.under, "R_reg");
        const topMargin = 50;
        const lineMargin = 25;
        const RijDrawX = R0T.LastDrawPosition.x + R0T.PixelWidth + 50;
        const RijCommentDrawX = RijDrawX + 100;
        const Ri_RjDrawX = RijCommentDrawX + 80;
        const Ri_RjCommentDrawX = Ri_RjDrawX + 110;
        {
            let iterations = 0;
            for (let row = 0; row < R.RowNumber; row++) {
                for (let col = row + 1; col < R.ColumnNumber; col++) {
                    const RijValue = Rij[row][col];
                    const RijText = `R${Utils_1.Utils.NumberToSubscript(row + 1)} ${Utils_1.Utils.NumberToSubscript(col + 1)}`;
                    const drawY = topMargin + (iterations * lineMargin);
                    CanvasHelper_1.CanvasHelper.DrawText(`${RijText}= ${RijValue}`, new Vector2_1.Vector2(RijDrawX, drawY), 18, "left");
                    if (RijValue < 0) {
                        const text = `${RijText} < 0   W parze x${Utils_1.Utils.NumberToSubscript(row)} x${Utils_1.Utils.NumberToSubscript(col)} występuje efekt katalizy`;
                        CanvasHelper_1.CanvasHelper.DrawText(text, new Vector2_1.Vector2(RijCommentDrawX, drawY), 18, "left");
                    }
                    else {
                        CanvasHelper_1.CanvasHelper.DrawText(`${RijText} > 0`, new Vector2_1.Vector2(RijCommentDrawX, drawY), 18, "left");
                        const Ri_RjValue = Ri_Rj[row][col];
                        const Ri_RjText = `R${Utils_1.Utils.NumberToSubscript(col + 1)}/R${Utils_1.Utils.NumberToSubscript(row + 1)}`;
                        const text = `${Ri_RjText}= ${Number(Ri_RjValue.toFixed(2))}`;
                        CanvasHelper_1.CanvasHelper.DrawText(text, new Vector2_1.Vector2(Ri_RjDrawX, drawY), 18, "left");
                        const hasCatalysis = RijValue < Ri_RjValue;
                        let commentText = `${RijText} ${hasCatalysis ? '<' : '>'} ${Ri_RjText}     W parze x${Utils_1.Utils.NumberToSubscript(row)} `
                            + `x${Utils_1.Utils.NumberToSubscript(col)} ${hasCatalysis ? "" : "nie "}występuje efekt katalizy`;
                        CanvasHelper_1.CanvasHelper.DrawText(commentText, new Vector2_1.Vector2(Ri_RjCommentDrawX, drawY), 18, "left");
                    }
                    iterations++;
                }
            }
            for (let i = 0; i < catalysisPairs.length; i++) {
                const drawY = (topMargin * 2) + ((iterations + i) * lineMargin);
                const catPair = catalysisPairs[i];
                const subI = Utils_1.Utils.NumberToSubscript(catPair.i + 1);
                const subJ = Utils_1.Utils.NumberToSubscript(catPair.j + 1);
                const text = `Katalizatorem w parze x${subI} x${subJ} jest x${catPair.isICatalyst ? subI : subJ}`;
                CanvasHelper_1.CanvasHelper.DrawText(text, new Vector2_1.Vector2(RijDrawX, drawY), 18, "left");
            }
        }
        const hellwigLineY = R_reg.LastDrawPosition.y + R_reg.PixelHeight + 25;
        const hellwigStartPos = new Vector2_1.Vector2(0, hellwigLineY);
        CanvasHelper_1.CanvasHelper.DrawLine(hellwigStartPos, new Vector2_1.Vector2(CanvasHelper_1.CanvasHelper.sharedContext.canvas.width, hellwigLineY), Solver_1.Solver.separatingLineThickness);
        H_sj.Draw(Vector2_1.Vector2.Add(hellwigStartPos, Solver_1.Solver.drawStartPos), "Hₛⱼ");
        let hellwigAnswerDraw = Vector2_1.Vector2.Add(hellwigStartPos, new Vector2_1.Vector2(H_sj.PixelWidth + Matrix_1.Matrix.matrixPixelMargin + 10, 0));
        hellwigAnswerDraw = Vector2_1.Vector2.Add(hellwigAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText("Integralna pojemność informacyjna podzbiorów:", hellwigAnswerDraw, 18, "left");
        for (let i = 0; i < H_s.length; i++) {
            hellwigAnswerDraw = Vector2_1.Vector2.Add(hellwigAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
            const Hi = this.Round(H_s[i]);
            const Ci = combinations[i];
            const iSubscript = Utils_1.Utils.NumberToSubscript(i + 1);
            let CiText = "{";
            for (let j = 0; j < Ci.length; j++) {
                CiText += 'X' + Utils_1.Utils.NumberToSubscript(Ci[j] + 1) + (j + 1 < Ci.length ? ',' : '}');
            }
            CanvasHelper_1.CanvasHelper.DrawText(`C${iSubscript}=${CiText} H${iSubscript}=${Hi}`, hellwigAnswerDraw, 18, "left");
        }
        let hellwigAnswerText = "Najlepszym w sensie Hellwiga podzbiorem zmiennych objaśniających jest {";
        for (let i = 0; i < H_sj.ColumnNumber - 1; i++) {
            hellwigAnswerText += ('X' + Utils_1.Utils.NumberToSubscript(combinations[bestH][i] + 1) + ((i + 1 < H_sj.ColumnNumber - 1) ? ", " : '}'));
        }
        hellwigAnswerDraw = Vector2_1.Vector2.Add(hellwigAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin * 2));
        CanvasHelper_1.CanvasHelper.DrawText(hellwigAnswerText, hellwigAnswerDraw, 18, "left");
    }
    CalculateR0_reg(R0) {
        const absR0 = new Array(R0.ColumnNumber);
        const sortedR0 = new Array(R0.ColumnNumber);
        const R0ids = new Array(R0.ColumnNumber);
        for (let i = 0; i < R0.ColumnNumber; i++) {
            absR0[i] = Math.abs(R0.numbers[0][i]);
        }
        const iterations = absR0.length;
        for (let i = 0; i < iterations; i++) {
            let index = CatalysisEffectSolver.GetGreatestNumberIndex(absR0);
            R0ids[i] = index;
            sortedR0[i] = absR0[index];
            absR0[index] = -1;
        }
        return [new Matrix_1.Matrix([sortedR0]), R0ids];
    }
    CalculateR_reg(R, R0, R0_reg, xOrderInR0_reg) {
        const rows = new Matrix_1.MatrixRows(R.RowNumber);
        for (let row = 0; row < R.RowNumber; row++) {
            rows[row] = new Array(R.ColumnNumber);
        }
        for (let row = 0; row < R.RowNumber; row++) {
            for (let col = row; col < R.ColumnNumber; col++) {
                if (col == row) {
                    rows[row][col] = 1;
                }
                else {
                    let value = R.numbers[xOrderInR0_reg[row]][xOrderInR0_reg[col]];
                    if (R0.numbers[0][xOrderInR0_reg[row]] < 0)
                        value = -value;
                    if (R0.numbers[0][xOrderInR0_reg[col]] < 0)
                        value = -value;
                    rows[row][col] = value;
                    rows[col][row] = value;
                }
            }
        }
        return new Matrix_1.Matrix(rows);
    }
    static GetGreatestNumberIndex(array) {
        let index = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[index])
                index = i;
        }
        return index;
    }
    FindCatalysisPairs(R_reg, R0_reg, xOrderInR0_reg) {
        const catalysisPairs = new Array();
        const Rij_arr = new Matrix_1.MatrixRows(R_reg.RowNumber);
        const Ri_Rj = new Matrix_1.MatrixRows(R_reg.RowNumber);
        for (let i = 0; i < R_reg.RowNumber; i++) {
            Rij_arr[i] = new Array(R_reg.ColumnNumber);
            Ri_Rj[i] = new Array(R_reg.ColumnNumber);
            for (let j = i + 1; j < R_reg.ColumnNumber; j++) {
                const i_reg = Utils_1.Utils.GetElementIndex(xOrderInR0_reg, i);
                const j_reg = Utils_1.Utils.GetElementIndex(xOrderInR0_reg, j);
                const Rij = R_reg.numbers[i_reg][j_reg];
                const Ri = R0_reg.numbers[0][i_reg];
                const Rj = R0_reg.numbers[0][j_reg];
                Rij_arr[i][j] = Rij;
                Ri_Rj[i][j] = null;
                if (Rij < 0) {
                    catalysisPairs.push(new CatalysisPair(i, j, (Ri > Rj)));
                }
                else {
                    let testValue;
                    testValue = (Ri < Rj) ? Ri / Rj : Rj / Ri;
                    Ri_Rj[i][j] = testValue;
                    if (Rij > testValue)
                        catalysisPairs.push(new CatalysisPair(i, j, (Ri < Rj)));
                }
            }
        }
        return [catalysisPairs, Rij_arr, Ri_Rj];
    }
    CalculateH_sj(R, R0, combinations) {
        const rows = new Matrix_1.MatrixRows(R.RowNumber);
        for (let i = 0; i < rows.length; i++)
            rows[i] = new Array(R.ColumnNumber - 1);
        for (let col = 0; col < R.ColumnNumber; col++) {
            for (let row = 0; row < R.RowNumber; row++) {
                const j = row;
                if (!Utils_1.Utils.IsElementInArray(combinations[col], row)) {
                    rows[row][col] = 0;
                }
                else {
                    let Rij_sum = 0;
                    for (let i = 0; i < R.ColumnNumber; i++) {
                        if (Utils_1.Utils.IsElementInArray(combinations[col], i)) {
                            Rij_sum += Math.abs(R.numbers[j][i]);
                        }
                    }
                    rows[row][col] = (R0.numbers[0][j] * R0.numbers[0][j]) / Rij_sum;
                }
            }
        }
        return new Matrix_1.Matrix(rows);
    }
    CalculateCombinations(numberOfXs) {
        const combinations = new Matrix_1.MatrixRows(numberOfXs);
        const first = new Array(numberOfXs - 1);
        for (let i = 0; i < numberOfXs - 1; i++) {
            first[i] = i;
        }
        combinations[0] = first;
        for (let i = 1; i < numberOfXs; i++) {
            const next = Utils_1.Utils.CopyArray(combinations[i - 1]);
            next[next.length - i] += 1;
            combinations[i] = next;
        }
        return combinations;
    }
    CalculateH_s(H_sj) {
        const result = new Array(H_sj.ColumnNumber);
        for (let col = 0; col < H_sj.ColumnNumber; col++) {
            let H = 0;
            for (let row = 0; row < H_sj.RowNumber; row++) {
                H += H_sj.numbers[row][col];
            }
            result[col] = H;
        }
        return result;
    }
}
exports.CatalysisEffectSolver = CatalysisEffectSolver;
class CatalysisPair {
    constructor(i, j, isICatalyst) {
        this.i = i;
        this.j = j;
        this.isICatalyst = isICatalyst;
    }
}


/***/ }),

/***/ "./src/Solvers/MNKSolver.ts":
/*!**********************************!*\
  !*** ./src/Solvers/MNKSolver.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Solver_1 = __webpack_require__(/*! ./Solver */ "./src/Solvers/Solver.ts");
const Matrix_1 = __webpack_require__(/*! ../Matrix */ "./src/Matrix.ts");
const Utils_1 = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");
const CanvasHelper_1 = __webpack_require__(/*! ../CanvasHelper */ "./src/CanvasHelper.ts");
const Vector2_1 = __webpack_require__(/*! ../Vector2 */ "./src/Vector2.ts");
var { jStat } = __webpack_require__(/*! jstat */ "./node_modules/jstat/dist/jstat.js");
class MNKSolver extends Solver_1.Solver {
    constructor() {
        super(["alpha", "matrixYXX", "probability"]);
    }
    HandleInput(inputEvent) {
        this.ClearInputErrors();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        let alpha = Matrix_1.Matrix.FromString(this.GetInputValue("alpha"));
        const YXX = Matrix_1.Matrix.FromString(this.GetInputValue("matrixYXX"));
        let probabilityPercent = this.GetInputValueAsNumber("probability");
        if (alpha == null) {
            this.DisplayInputError("matrixYXX", Solver_1.Solver.notMatrixError);
            return;
        }
        else if (alpha.RowNumber > 1) {
            if (alpha.ColumnNumber == 1) {
                alpha = alpha.Transpose();
            }
            else {
                this.DisplayInputError("alpha", Solver_1.Solver.notVectorError);
                return;
            }
        }
        if (YXX == null) {
            this.DisplayInputError("matrixYXX", Solver_1.Solver.notMatrixError);
            return;
        }
        else if (YXX.RowNumber != alpha.ColumnNumber) {
            this.DisplayInputError("alpha", "ilość rzędów nie zgada się z ilością liczb stojących przed α");
            return;
        }
        if (probabilityPercent == null || isNaN(probabilityPercent)) {
            this.DisplayInputError("probability", Solver_1.Solver.notNumberError);
            return;
        }
        const Y = new Matrix_1.Matrix([Utils_1.Utils.CopyArray(YXX.numbers[0])]).Transpose();
        const X = this.CalculateX(YXX, alpha.numbers[0][0]);
        const Xt = X.Transpose();
        const XtX = Xt.MultiplyMatrix(X);
        const XtY = Xt.MultiplyMatrix(Y);
        const XtXinv = XtX.Invert();
        if (XtXinv == null) {
            this.DisplayInputError("matrixYXX", "Macierzy XᵀX nie można odwrócić, pewnie błąd w przepisywaniu danych");
            return;
        }
        const a = XtXinv.MultiplyMatrix(XtY);
        const y_hat = this.CalculateY_hat(a, X);
        const e = this.Calculate_e(Y, y_hat);
        const eTe = e.Transpose().MultiplyMatrix(e);
        const n = X.RowNumber;
        const k = X.ColumnNumber - 1;
        const df = n - (k + 1);
        const S_sqr = eTe.numbers[0][0] / df;
        const D_sqr = XtXinv.MultiplyScalar(S_sqr);
        const S_sqrForA = this.CalculateSsqrForA(D_sqr);
        const S_forA = this.CalcuakteSForA(S_sqrForA);
        const V_forA = this.CalculateVForA(S_forA, a);
        const probability = probabilityPercent / 100;
        const t_forA = this.CalculateTForA(S_forA, a);
        const t_stud = jStat.studentt.inv(1 - (probability / 2), df);
        const Yt = Y.Transpose();
        const YtY = Yt.MultiplyMatrix(Y);
        const y_avg = Y.Average;
        const R_sqr = this.CalculateR_sqr(eTe, YtY, y_avg, n);
        const F = this.CalculateF(R_sqr, n, k);
        const F_dist = jStat.centralF.inv(1 - probability, k, df);
        X.Draw(Solver_1.Solver.drawStartPos, "X");
        Y.DrawNextTo(X, Matrix_1.Side.right, "Y");
        y_hat.DrawNextTo(Y, Matrix_1.Side.right, "ŷ");
        e.DrawNextTo(y_hat, Matrix_1.Side.right, "e");
        Xt.DrawNextTo(e, Matrix_1.Side.right, "Xᵀ");
        XtX.DrawNextTo(Xt, Matrix_1.Side.right, "XᵀX");
        XtY.DrawNextTo(X, Matrix_1.Side.under, "XᵀY");
        XtXinv.DrawNextTo(XtY, Matrix_1.Side.right, "(XᵀX)⁻¹");
        a.DrawNextTo(XtXinv, Matrix_1.Side.right, "a");
        eTe.DrawNextTo(a, Matrix_1.Side.right, "eᵀe");
        const S_sqrDrawPos = Vector2_1.Vector2.Add(eTe.LastDrawPosition, new Vector2_1.Vector2(Matrix_1.Matrix.cellPixelSize + Matrix_1.Matrix.matrixPixelMargin, Matrix_1.Matrix.labelPixelMargin));
        CanvasHelper_1.CanvasHelper.DrawText(`S²=(eᵀe)/(n-k-1)=${this.Round(S_sqr)}`, S_sqrDrawPos, 16, "left", "sans-serif", "black", "bold");
        D_sqr.DrawNextTo(XtY, Matrix_1.Side.under, "D²(a)");
        const bDrawStartPos = this.DrawSeparatingVerticalLine(XtX);
        S_sqrForA.Draw(bDrawStartPos, "S²(a)");
        S_forA.DrawNextTo(S_sqrForA, Matrix_1.Side.under, "S(a) (śr bł)");
        V_forA.DrawNextTo(S_forA, Matrix_1.Side.under, "V(a) (śr wzg bł %)");
        {
            let drawPos = Vector2_1.Vector2.Add(V_forA.LastDrawPosition, new Vector2_1.Vector2(0, V_forA.PixelHeight + Matrix_1.Matrix.matrixPixelMargin));
            for (let i = 0; i < V_forA.ColumnNumber; i++) {
                if (!isFinite(V_forA.numbers[0][i]) || isNaN(V_forA.numbers[0][i])) {
                    CanvasHelper_1.CanvasHelper.DrawText(`nie ma V(a) dla a${Utils_1.Utils.NumberToSubscript(i)}`, drawPos, 16, "left");
                    drawPos = Vector2_1.Vector2.Add(drawPos, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
                }
            }
        }
        const bbDrawStartPos = this.DrawSeparatingVerticalLine(S_sqrForA);
        S_sqrForA.Draw(bbDrawStartPos, "S²(a)");
        S_forA.DrawNextTo(S_sqrForA, Matrix_1.Side.under, "S(a) (śr bł)");
        t_forA.DrawNextTo(S_forA, Matrix_1.Side.under, "t(a)");
        const t_studDrawPos = Vector2_1.Vector2.Add(t_forA.LastDrawPosition, new Vector2_1.Vector2(0, (Matrix_1.Matrix.cellPixelSize * 2)));
        CanvasHelper_1.CanvasHelper.DrawText(`t*=${this.Round(t_stud)}`, t_studDrawPos, 16, "left", "sans-serif", "black", "bold");
        let bbAnswerDraw = Vector2_1.Vector2.Add(S_sqrForA.LastDrawPosition, new Vector2_1.Vector2(S_sqrForA.PixelWidth + Matrix_1.Matrix.matrixPixelMargin, 0));
        CanvasHelper_1.CanvasHelper.DrawText("H0: zmienna Xi jest nieistotna", bbAnswerDraw, 18, "left");
        bbAnswerDraw = Vector2_1.Vector2.Add(bbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText("H1: zmienna Xi ma statystycznie istotny wpływ na zmienną objaśnianą", bbAnswerDraw, 18, "left");
        for (let i = 0; i < t_forA.ColumnNumber; i++) {
            const acceptH0 = t_forA.numbers[0][i] < t_stud;
            const text = `t${Utils_1.Utils.NumberToSubscript(i)} ${acceptH0 ? '<' : '>'} t* `
                + `Z prawdopodobieństwem ${probabilityPercent}% ${acceptH0 ? "brak podstaw by odrzucić H0" : "należy odrzucić H0 na rzecz H1"}`;
            bbAnswerDraw = Vector2_1.Vector2.Add(bbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
            CanvasHelper_1.CanvasHelper.DrawText(text, bbAnswerDraw, 18, "left");
        }
        const bbbLineY = t_studDrawPos.y + 25;
        const bbbLineStart = new Vector2_1.Vector2(bbDrawStartPos.x - Matrix_1.Matrix.matrixPixelMargin, bbbLineY);
        CanvasHelper_1.CanvasHelper.DrawLine(bbbLineStart, new Vector2_1.Vector2(CanvasHelper_1.CanvasHelper.sharedContext.canvas.width, bbbLineY), Solver_1.Solver.separatingLineThickness);
        let bbbAnswerDraw = Vector2_1.Vector2.Add(bbbLineStart, Solver_1.Solver.drawStartPos);
        CanvasHelper_1.CanvasHelper.DrawText("H0: nie ma takiej zmiennej Xi, któa ma statystycznie istotny wpływ na Y", bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText("H1: jest taka zmienna Xi, któa ma statystycznie istotny wpływ na Y", bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText(`ȳ=${this.Round(y_avg)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText(`R²=1-((eᵀe/yᵀy)-(n*ȳ²))=${this.Round(R_sqr)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText(`F=(R²/(1-R²))*((n-k-1)/k)=${this.Round(F)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText(`F*=${this.Round(F_dist)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        Yt.Draw(bbbAnswerDraw, "Yᵀ");
        YtY.DrawNextTo(Yt, Matrix_1.Side.right, "YᵀY");
        bbbAnswerDraw = Vector2_1.Vector2.Add(Yt.LastDrawPosition, new Vector2_1.Vector2(0, YtY.PixelHeight + (Matrix_1.Matrix.matrixPixelMargin * 2)));
        const acceptH0 = F < F_dist;
        const bbbAnswerText = `Z prawdopodobieństwem ${probabilityPercent}% ${acceptH0 ? "brak podstaw by odrzucić H0" : "należy odrzucić H0 na rzecz H1"}`;
        CanvasHelper_1.CanvasHelper.DrawText(bbbAnswerText, bbbAnswerDraw, 18, "left");
        const bbbbLineY = bbbAnswerDraw.y + 25;
        const bbbbLineStart = new Vector2_1.Vector2(bbDrawStartPos.x - Matrix_1.Matrix.matrixPixelMargin, bbbbLineY);
        CanvasHelper_1.CanvasHelper.DrawLine(bbbbLineStart, new Vector2_1.Vector2(CanvasHelper_1.CanvasHelper.sharedContext.canvas.width, bbbbLineY), Solver_1.Solver.separatingLineThickness);
        let bbbbAnswerDraw = Vector2_1.Vector2.Add(bbbbLineStart, Solver_1.Solver.drawStartPos);
        CanvasHelper_1.CanvasHelper.DrawText("Wpółczynnik determinancji", bbbbAnswerDraw, 18, "left");
        bbbbAnswerDraw = Vector2_1.Vector2.Add(bbbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        const roundR_sqr = this.Round(R_sqr);
        CanvasHelper_1.CanvasHelper.DrawText(`R²=1-((eᵀe/yᵀy)-(n*ȳ²))=${roundR_sqr}   ${roundR_sqr * 100}% zmienności y jest objaśniane przez model`, bbbbAnswerDraw, 18, "left");
        const cLineY = bbbbAnswerDraw.y + 25;
        const cLineStart = new Vector2_1.Vector2(bbbbLineStart.x, cLineY);
        CanvasHelper_1.CanvasHelper.DrawLine(cLineStart, new Vector2_1.Vector2(CanvasHelper_1.CanvasHelper.sharedContext.canvas.width, cLineY), Solver_1.Solver.separatingLineThickness);
        let cAnswerDraw = Vector2_1.Vector2.Add(cLineStart, Solver_1.Solver.drawStartPos);
        CanvasHelper_1.CanvasHelper.DrawText("Interpretacja parametrów i reszty modelu", cAnswerDraw, 18, "left");
        for (let i = 0; i < a.RowNumber; i++) {
            cAnswerDraw = Vector2_1.Vector2.Add(cAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
            const ai = this.Round(a.numbers[i][0]);
            let change;
            if (ai === 0)
                change = "nie zmieni wartości";
            else
                change = `${ai < 0 ? "zmaleje" : "wzrośnie"} o ${Math.abs(ai)}`;
            const text = `Jeżeli zmienna X${Utils_1.Utils.NumberToSubscript(i + 1)} wzrośnie o 1 to zmienna Y ${change} (ceteris paribus)`;
            CanvasHelper_1.CanvasHelper.DrawText(text, cAnswerDraw, 18, "left");
        }
        cAnswerDraw = Vector2_1.Vector2.Add(cAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText("Reszty modelu:", cAnswerDraw, 18, "left");
        cAnswerDraw = Vector2_1.Vector2.Add(cAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        e.Transpose().Draw(cAnswerDraw, "e");
    }
    CalculateX(YXX, a0mult) {
        const YXX_T = YXX.Transpose();
        const rows = new Matrix_1.MatrixRows(YXX_T.RowNumber);
        for (let row = 0; row < YXX_T.RowNumber; row++) {
            rows[row] = new Array(YXX_T.ColumnNumber);
            for (let col = 0; col < YXX_T.ColumnNumber; col++) {
                rows[row][col] = col == 0 ? a0mult : YXX_T.numbers[row][col];
            }
        }
        return new Matrix_1.Matrix(rows);
    }
    CalculateY_hat(a, X) {
        const rows = new Matrix_1.MatrixRows(X.RowNumber);
        for (let row = 0; row < X.RowNumber; row++) {
            rows[row] = new Array(1);
            let y_hat = a.numbers[0][0];
            for (let col = 1; col < X.ColumnNumber; col++) {
                y_hat += a.numbers[col][0] * X.numbers[row][col];
            }
            rows[row][0] = y_hat;
        }
        return new Matrix_1.Matrix(rows);
    }
    Calculate_e(Y, Y_hat) {
        const rows = new Matrix_1.MatrixRows(Y.RowNumber);
        for (let row = 0; row < Y.RowNumber; row++) {
            rows[row] = [Y.numbers[row][0] - Y_hat.numbers[row][0]];
        }
        return new Matrix_1.Matrix(rows);
    }
    CalculateSsqrForA(D_sqr) {
        const rows = new Matrix_1.MatrixRows(1);
        rows[0] = new Array(D_sqr.ColumnNumber);
        for (let i = 0; i < D_sqr.ColumnNumber; i++) {
            rows[0][i] = D_sqr.numbers[i][i];
        }
        return new Matrix_1.Matrix(rows);
    }
    CalcuakteSForA(S_sqrForA) {
        const rows = new Matrix_1.MatrixRows(1);
        rows[0] = new Array(S_sqrForA.ColumnNumber);
        for (let i = 0; i < S_sqrForA.ColumnNumber; i++) {
            rows[0][i] = Math.sqrt(S_sqrForA.numbers[0][i]);
        }
        return new Matrix_1.Matrix(rows);
    }
    CalculateVForA(S_forA, a) {
        const rows = new Matrix_1.MatrixRows(1);
        rows[0] = new Array(S_forA.ColumnNumber);
        for (let i = 0; i < S_forA.ColumnNumber; i++) {
            rows[0][i] = Math.abs(S_forA.numbers[0][i] / a.numbers[i][0]) * 100;
        }
        return new Matrix_1.Matrix(rows);
    }
    CalculateTForA(S_forA, a) {
        const rows = new Matrix_1.MatrixRows(0);
        rows[0] = new Array(S_forA.ColumnNumber);
        for (let i = 0; i < S_forA.ColumnNumber; i++) {
            rows[0][i] = Math.abs(a.numbers[i][0]) / S_forA.numbers[0][i];
        }
        return new Matrix_1.Matrix(rows);
    }
    CalculateR_sqr(eTe, YtY, y_avg, n) {
        return 1 - (eTe.numbers[0][0] / (YtY.numbers[0][0] - (n * (y_avg * y_avg))));
    }
    CalculateF(R_sqr, n, k) {
        return ((R_sqr / (1 - R_sqr)) * ((n - k - 1) / k));
    }
}
exports.MNKSolver = MNKSolver;


/***/ }),

/***/ "./src/Solvers/Solver.ts":
/*!*******************************!*\
  !*** ./src/Solvers/Solver.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CanvasHelper_1 = __webpack_require__(/*! ../CanvasHelper */ "./src/CanvasHelper.ts");
const Vector2_1 = __webpack_require__(/*! ../Vector2 */ "./src/Vector2.ts");
const Matrix_1 = __webpack_require__(/*! ../Matrix */ "./src/Matrix.ts");
const Utils_1 = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");
class Solver {
    constructor(inputs) {
        this.inputs = new Map();
        this.errorLabels = new Map();
        this.context = document.getElementById("myCanvas").getContext("2d");
        CanvasHelper_1.CanvasHelper.sharedContext = this.context;
        inputs.forEach(inputId => {
            const inputElement = document.getElementById(inputId);
            inputElement.oninput = this.HandleInput.bind(this);
            this.inputs.set(inputId, inputElement);
            this.errorLabels.set(inputId, document.getElementById(inputId + "_error"));
        });
    }
    DisplayInputError(inputId, message) {
        this.errorLabels.get(inputId).innerHTML = message;
    }
    ClearInputErrors() {
        this.errorLabels.forEach((label, id) => label.innerHTML = "");
    }
    GetInputValue(inputId) {
        return this.inputs.get(inputId).value;
    }
    GetInputValueAsNumber(inputId) {
        const stringValue = this.GetInputValue(inputId);
        if (stringValue == null || stringValue == "")
            return NaN;
        let value = Number(stringValue);
        if (isNaN(value))
            value = Number(stringValue.replace(',', '.'));
        return value;
    }
    DrawSeparatingVerticalLine(rightmostMatrix) {
        const lineX = rightmostMatrix.LastDrawPosition.x + rightmostMatrix.PixelWidth + Matrix_1.Matrix.matrixPixelMargin;
        CanvasHelper_1.CanvasHelper.DrawLine(new Vector2_1.Vector2(lineX, 0), new Vector2_1.Vector2(lineX, CanvasHelper_1.CanvasHelper.sharedContext.canvas.height), Solver.separatingLineThickness);
        return new Vector2_1.Vector2(lineX + Matrix_1.Matrix.matrixPixelMargin, Solver.drawStartPos.y);
    }
    Round(value) {
        return Utils_1.Utils.RoundNumber(value, Solver.rounding);
    }
}
exports.Solver = Solver;
Solver.notMatrixError = "podana wartość nie jest macierzą";
Solver.matrixNotSquareError = "podana macierz nie jest kwadratowa (tyle wierszy co kolumn)";
Solver.notNumberError = "podana wartość nie jest liczbą";
Solver.notVectorError = "podana macierz nie jest wektorem (jeden wiersz albo jedna kolumna)";
Solver.drawStartPos = new Vector2_1.Vector2(10, 30);
Solver.separatingLineThickness = 5;
Solver.lineMargin = 25;
Solver.rounding = 3;


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils;
(function (Utils) {
    function TryRemoveFromArray(array, element) {
        let foundElement = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === element) {
                foundElement = true;
                array.splice(i, 1);
                break;
            }
        }
        return foundElement;
    }
    Utils.TryRemoveFromArray = TryRemoveFromArray;
    function RemoveFromArray(array, element) {
        if (!TryRemoveFromArray(array, element))
            throw Error("Couldn't find specified element in the provided array");
    }
    Utils.RemoveFromArray = RemoveFromArray;
    function IsElementInArray(array, element) {
        let foundElement = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === element) {
                foundElement = true;
                break;
            }
        }
        return foundElement;
    }
    Utils.IsElementInArray = IsElementInArray;
    function RemoveFromArrayAtIndex(array, index) {
        array.splice(index, 1);
    }
    Utils.RemoveFromArrayAtIndex = RemoveFromArrayAtIndex;
    function GetElementIndex(array, element) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == element)
                return i;
        }
        return -1;
    }
    Utils.GetElementIndex = GetElementIndex;
    function NumberToSubscript(value) {
        if (value > 9 || value < 0 || !Number.isInteger(value))
            throw new Error("Value must be integral number from range <0;9>");
        else
            return ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][value];
    }
    Utils.NumberToSubscript = NumberToSubscript;
    function CopyArray(array) {
        const copy = new Array(array.length);
        for (let i = 0; i < array.length; i++)
            copy[i] = array[i];
        return copy;
    }
    Utils.CopyArray = CopyArray;
    function RoundNumber(value, decimalPlaces) {
        return Number(value.toFixed(decimalPlaces));
    }
    Utils.RoundNumber = RoundNumber;
})(Utils = exports.Utils || (exports.Utils = {}));


/***/ }),

/***/ "./src/Vector2.ts":
/*!************************!*\
  !*** ./src/Vector2.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static Add(vectorA, vectorB) {
        return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }
    static Substract(vectorA, vectorB) {
        return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    }
    static Multiply(vector, multipiler) {
        return new Vector2(vector.x * multipiler, vector.y * multipiler);
    }
    static Distance(vectorA, vectorB) {
        let a = vectorA.x - vectorB.x;
        let b = vectorA.y - vectorB.y;
        a *= a;
        b *= b;
        return Math.sqrt(a + b);
    }
    static Equals(vectorA, vectorB) {
        return vectorA.x === vectorB.x && vectorA.y === vectorB.y;
    }
}
exports.Vector2 = Vector2;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CatalysisEffectSolver_1 = __webpack_require__(/*! ./Solvers/CatalysisEffectSolver */ "./src/Solvers/CatalysisEffectSolver.ts");
const MNKSolver_1 = __webpack_require__(/*! ./Solvers/MNKSolver */ "./src/Solvers/MNKSolver.ts");
let program;
switch (document.title) {
    case "Strona główna":
        break;
    case "Efekt katalizy":
        program = new CatalysisEffectSolver_1.CatalysisEffectSolver();
        break;
    case "MNK":
        program = new MNKSolver_1.MNKSolver();
        break;
    default:
        console.log("document title " + document.title + " doesn't match any case!");
        break;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzdGF0L2Rpc3QvanN0YXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbnZhc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9Tb2x2ZXJzL0NhdGFseXNpc0VmZmVjdFNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU29sdmVycy9NTktTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NvbHZlcnMvU29sdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVmVjdG9yMi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFVBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyxRQUFRO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVOztBQUU5QjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7O0FBRUEsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLGlCQUFpQjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUEsS0FBSztBQUNMOztBQUVBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPLE9BQU87QUFDZDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCx5QkFBeUIsd0JBQXdCOztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsaUJBQWlCLFVBQVU7O0FBRTNCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7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QztRQUVyRCxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFDMUM7WUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxLQUFLLEdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFDN0M7Z0JBQ0ksS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwRDtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDeEI7UUFFRCxPQUFPLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTyxXQUFXLENBQUMsQ0FBUyxFQUFFLEtBQWE7UUFFeEMsTUFBTSxJQUFJLEdBQWUsSUFBSSxtQkFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRCxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFDMUM7WUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUVELE9BQU8sSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FB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QUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNKO0FBOUNELDBCQThDQzs7Ozs7Ozs7Ozs7Ozs7O0FDOUNELHFJQUF3RTtBQUN4RSxpR0FBZ0Q7QUFFaEQsSUFBSSxPQUFPLENBQUM7QUFFWixRQUFRLFFBQVEsQ0FBQyxLQUFLLEVBQ3RCO0lBQ0ksS0FBSyxlQUFlO1FBRWhCLE1BQU07SUFDVixLQUFLLGdCQUFnQjtRQUNqQixPQUFPLEdBQUcsSUFBSSw2Q0FBcUIsRUFBRSxDQUFDO1FBQ3RDLE1BQU07SUFDVixLQUFLLEtBQUs7UUFDTixPQUFPLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDMUIsTUFBTTtJQUNWO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDLENBQUM7UUFDN0UsTUFBTTtDQUNiIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIoZnVuY3Rpb24gKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZhY3RvcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5qU3RhdCA9IGZhY3RvcnkoKTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG52YXIgalN0YXQgPSAoZnVuY3Rpb24oTWF0aCwgdW5kZWZpbmVkKSB7XG5cbi8vIEZvciBxdWljayByZWZlcmVuY2UuXG52YXIgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIENhbGN1bGF0ZSBjb3JyZWN0aW9uIGZvciBJRUVFIGVycm9yXG4vLyBUT0RPOiBUaGlzIGNhbGN1bGF0aW9uIGNhbiBiZSBpbXByb3ZlZC5cbmZ1bmN0aW9uIGNhbGNSZHgobiwgbSkge1xuICB2YXIgdmFsID0gbiA+IG0gPyBuIDogbTtcbiAgcmV0dXJuIE1hdGgucG93KDEwLFxuICAgICAgICAgICAgICAgICAgMTcgLSB+fihNYXRoLmxvZygoKHZhbCA+IDApID8gdmFsIDogLXZhbCkpICogTWF0aC5MT0cxMEUpKTtcbn1cblxuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuXG5mdW5jdGlvbiBpc051bWJlcihudW0pIHtcbiAgcmV0dXJuICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykgPyBudW0gLSBudW0gPT09IDAgOiBmYWxzZTtcbn1cblxuXG4vLyBDb252ZXJ0cyB0aGUgalN0YXQgbWF0cml4IHRvIHZlY3Rvci5cbmZ1bmN0aW9uIHRvVmVjdG9yKGFycikge1xuICByZXR1cm4gY29uY2F0LmFwcGx5KFtdLCBhcnIpO1xufVxuXG5cbi8vIFRoZSBvbmUgYW5kIG9ubHkgalN0YXQgY29uc3RydWN0b3IuXG5mdW5jdGlvbiBqU3RhdCgpIHtcbiAgcmV0dXJuIG5ldyBqU3RhdC5faW5pdChhcmd1bWVudHMpO1xufVxuXG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciBhbGwgcmVmZXJlbmNlcyBpbiBzcmMgZmlsZXMgaGF2ZSBiZWVuIHJlbW92ZWQuXG5qU3RhdC5mbiA9IGpTdGF0LnByb3RvdHlwZTtcblxuXG4vLyBCeSBzZXBhcmF0aW5nIHRoZSBpbml0aWFsaXplciBmcm9tIHRoZSBjb25zdHJ1Y3RvciBpdCdzIGVhc2llciB0byBoYW5kbGVcbi8vIGFsd2F5cyByZXR1cm5pbmcgYSBuZXcgaW5zdGFuY2Ugd2hldGhlciBcIm5ld1wiIHdhcyB1c2VkIG9yIG5vdC5cbmpTdGF0Ll9pbml0ID0gZnVuY3Rpb24gX2luaXQoYXJncykge1xuICAvLyBJZiBmaXJzdCBhcmd1bWVudCBpcyBhbiBhcnJheSwgbXVzdCBiZSB2ZWN0b3Igb3IgbWF0cml4LlxuICBpZiAoaXNBcnJheShhcmdzWzBdKSkge1xuICAgIC8vIENoZWNrIGlmIG1hdHJpeC5cbiAgICBpZiAoaXNBcnJheShhcmdzWzBdWzBdKSkge1xuICAgICAgLy8gU2VlIGlmIGEgbWFwcGluZyBmdW5jdGlvbiB3YXMgYWxzbyBwYXNzZWQuXG4gICAgICBpZiAoaXNGdW5jdGlvbihhcmdzWzFdKSlcbiAgICAgICAgYXJnc1swXSA9IGpTdGF0Lm1hcChhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBlYWNoIGlzIGZhc3RlciB0aGFuIHRoaXMucHVzaC5hcHBseSh0aGlzLCBhcmdzWzBdLlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzWzBdLmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzW2ldID0gYXJnc1swXVtpXTtcbiAgICAgIHRoaXMubGVuZ3RoID0gYXJnc1swXS5sZW5ndGg7XG5cbiAgICAvLyBPdGhlcndpc2UgbXVzdCBiZSBhIHZlY3Rvci5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1swXSA9IGlzRnVuY3Rpb24oYXJnc1sxXSkgPyBqU3RhdC5tYXAoYXJnc1swXSwgYXJnc1sxXSkgOiBhcmdzWzBdO1xuICAgICAgdGhpcy5sZW5ndGggPSAxO1xuICAgIH1cblxuICAvLyBJZiBmaXJzdCBhcmd1bWVudCBpcyBudW1iZXIsIGFzc3VtZSBjcmVhdGlvbiBvZiBzZXF1ZW5jZS5cbiAgfSBlbHNlIGlmIChpc051bWJlcihhcmdzWzBdKSkge1xuICAgIHRoaXNbMF0gPSBqU3RhdC5zZXEuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgdGhpcy5sZW5ndGggPSAxO1xuXG4gIC8vIEhhbmRsZSBjYXNlIHdoZW4galN0YXQgb2JqZWN0IGlzIHBhc3NlZCB0byBqU3RhdC5cbiAgfSBlbHNlIGlmIChhcmdzWzBdIGluc3RhbmNlb2YgalN0YXQpIHtcbiAgICAvLyBEdXBsaWNhdGUgdGhlIG9iamVjdCBhbmQgcGFzcyBpdCBiYWNrLlxuICAgIHJldHVybiBqU3RhdChhcmdzWzBdLnRvQXJyYXkoKSk7XG5cbiAgLy8gVW5leHBlY3RlZCBhcmd1bWVudCB2YWx1ZSwgcmV0dXJuIGVtcHR5IGpTdGF0IG9iamVjdC5cbiAgLy8gVE9ETzogVGhpcyBpcyBzdHJhbmdlIGJlaGF2aW9yLiBTaG91bGRuJ3QgdGhpcyB0aHJvdyBvciBzb21lIHN1Y2ggdG8gbGV0XG4gIC8vIHRoZSB1c2VyIGtub3cgdGhleSBoYWQgYmFkIGFyZ3VtZW50cz9cbiAgfSBlbHNlIHtcbiAgICB0aGlzWzBdID0gW107XG4gICAgdGhpcy5sZW5ndGggPSAxO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xualN0YXQuX2luaXQucHJvdG90eXBlID0galN0YXQucHJvdG90eXBlO1xualN0YXQuX2luaXQuY29uc3RydWN0b3IgPSBqU3RhdDtcblxuXG4vLyBVdGlsaXR5IGZ1bmN0aW9ucy5cbi8vIFRPRE86IGZvciBpbnRlcm5hbCB1c2Ugb25seT9cbmpTdGF0LnV0aWxzID0ge1xuICBjYWxjUmR4OiBjYWxjUmR4LFxuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIHRvVmVjdG9yOiB0b1ZlY3RvclxufTtcblxuXG5qU3RhdC5fcmFuZG9tX2ZuID0gTWF0aC5yYW5kb207XG5qU3RhdC5zZXRSYW5kb20gPSBmdW5jdGlvbiBzZXRSYW5kb20oZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmbiBpcyBub3QgYSBmdW5jdGlvbicpO1xuICBqU3RhdC5fcmFuZG9tX2ZuID0gZm47XG59O1xuXG5cbi8vIEVhc2lseSBleHRlbmQgdGhlIGpTdGF0IG9iamVjdC5cbi8vIFRPRE86IGlzIHRoaXMgc2VyaW91c2x5IG5lY2Vzc2FyeT9cbmpTdGF0LmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcbiAgdmFyIGksIGo7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICBmb3IgKGogaW4gb2JqKVxuICAgICAgalN0YXRbal0gPSBvYmpbal07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChqIGluIGFyZ3VtZW50c1tpXSlcbiAgICAgIG9ialtqXSA9IGFyZ3VtZW50c1tpXVtqXTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBtYXRyaXguXG5qU3RhdC5yb3dzID0gZnVuY3Rpb24gcm93cyhhcnIpIHtcbiAgcmV0dXJuIGFyci5sZW5ndGggfHwgMTtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIG1hdHJpeC5cbmpTdGF0LmNvbHMgPSBmdW5jdGlvbiBjb2xzKGFycikge1xuICByZXR1cm4gYXJyWzBdLmxlbmd0aCB8fCAxO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBvYmplY3QgeyByb3dzOiBpLCBjb2xzOiBqIH1cbmpTdGF0LmRpbWVuc2lvbnMgPSBmdW5jdGlvbiBkaW1lbnNpb25zKGFycikge1xuICByZXR1cm4ge1xuICAgIHJvd3M6IGpTdGF0LnJvd3MoYXJyKSxcbiAgICBjb2xzOiBqU3RhdC5jb2xzKGFycilcbiAgfTtcbn07XG5cblxuLy8gUmV0dXJucyBhIHNwZWNpZmllZCByb3cgYXMgYSB2ZWN0b3Igb3IgcmV0dXJuIGEgc3ViIG1hdHJpeCBieSBwaWNrIHNvbWUgcm93c1xualN0YXQucm93ID0gZnVuY3Rpb24gcm93KGFyciwgaW5kZXgpIHtcbiAgaWYgKGlzQXJyYXkoaW5kZXgpKSB7XG4gICAgcmV0dXJuIGluZGV4Lm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4galN0YXQucm93KGFyciwgaSk7XG4gICAgfSlcbiAgfVxuICByZXR1cm4gYXJyW2luZGV4XTtcbn07XG5cblxuLy8gcmV0dXJuIHJvdyBhcyBhcnJheVxuLy8gcm93YShbWzEsMl0sWzMsNF1dLDApIC0+IFsxLDJdXG5qU3RhdC5yb3dhID0gZnVuY3Rpb24gcm93YShhcnIsIGkpIHtcbiAgcmV0dXJuIGpTdGF0LnJvdyhhcnIsIGkpO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBzcGVjaWZpZWQgY29sdW1uIGFzIGEgdmVjdG9yIG9yIHJldHVybiBhIHN1YiBtYXRyaXggYnkgcGljayBzb21lXG4vLyBjb2x1bW5zXG5qU3RhdC5jb2wgPSBmdW5jdGlvbiBjb2woYXJyLCBpbmRleCkge1xuICBpZiAoaXNBcnJheShpbmRleCkpIHtcbiAgICB2YXIgc3VibWF0ID0galN0YXQuYXJhbmdlKGFyci5sZW5ndGgpLm1hcChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXkoaW5kZXgubGVuZ3RoKTtcbiAgICB9KTtcbiAgICBpbmRleC5mb3JFYWNoKGZ1bmN0aW9uKGluZCwgaSl7XG4gICAgICBqU3RhdC5hcmFuZ2UoYXJyLmxlbmd0aCkuZm9yRWFjaChmdW5jdGlvbihqKSB7XG4gICAgICAgIHN1Ym1hdFtqXVtpXSA9IGFycltqXVtpbmRdO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN1Ym1hdDtcbiAgfVxuICB2YXIgY29sdW1uID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKylcbiAgICBjb2x1bW5baV0gPSBbYXJyW2ldW2luZGV4XV07XG4gIHJldHVybiBjb2x1bW47XG59O1xuXG5cbi8vIHJldHVybiBjb2x1bW4gYXMgYXJyYXlcbi8vIGNvbGEoW1sxLDJdLFszLDRdXSwwKSAtPiBbMSwzXVxualN0YXQuY29sYSA9IGZ1bmN0aW9uIGNvbGEoYXJyLCBpKSB7XG4gIHJldHVybiBqU3RhdC5jb2woYXJyLCBpKS5tYXAoZnVuY3Rpb24oYSl7IHJldHVybiBhWzBdIH0pO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBkaWFnb25hbCBvZiB0aGUgbWF0cml4XG5qU3RhdC5kaWFnID0gZnVuY3Rpb24gZGlhZyhhcnIpIHtcbiAgdmFyIG5yb3cgPSBqU3RhdC5yb3dzKGFycik7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkobnJvdyk7XG4gIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG5yb3c7IHJvdysrKVxuICAgIHJlc1tyb3ddID0gW2Fycltyb3ddW3Jvd11dO1xuICByZXR1cm4gcmVzO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBhbnRpLWRpYWdvbmFsIG9mIHRoZSBtYXRyaXhcbmpTdGF0LmFudGlkaWFnID0gZnVuY3Rpb24gYW50aWRpYWcoYXJyKSB7XG4gIHZhciBucm93ID0galN0YXQucm93cyhhcnIpIC0gMTtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheShucm93KTtcbiAgZm9yICh2YXIgaSA9IDA7IG5yb3cgPj0gMDsgbnJvdy0tLCBpKyspXG4gICAgcmVzW2ldID0gW2FycltpXVtucm93XV07XG4gIHJldHVybiByZXM7XG59O1xuXG4vLyBUcmFuc3Bvc2UgYSBtYXRyaXggb3IgYXJyYXkuXG5qU3RhdC50cmFuc3Bvc2UgPSBmdW5jdGlvbiB0cmFuc3Bvc2UoYXJyKSB7XG4gIHZhciBvYmogPSBbXTtcbiAgdmFyIG9iakFyciwgcm93cywgY29scywgaiwgaTtcblxuICAvLyBNYWtlIHN1cmUgYXJyIGlzIGluIG1hdHJpeCBmb3JtYXQuXG4gIGlmICghaXNBcnJheShhcnJbMF0pKVxuICAgIGFyciA9IFthcnJdO1xuXG4gIHJvd3MgPSBhcnIubGVuZ3RoO1xuICBjb2xzID0gYXJyWzBdLmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgY29sczsgaSsrKSB7XG4gICAgb2JqQXJyID0gbmV3IEFycmF5KHJvd3MpO1xuICAgIGZvciAoaiA9IDA7IGogPCByb3dzOyBqKyspXG4gICAgICBvYmpBcnJbal0gPSBhcnJbal1baV07XG4gICAgb2JqLnB1c2gob2JqQXJyKTtcbiAgfVxuXG4gIC8vIElmIG9iaiBpcyB2ZWN0b3IsIHJldHVybiBvbmx5IHNpbmdsZSBhcnJheS5cbiAgcmV0dXJuIG9iai5sZW5ndGggPT09IDEgPyBvYmpbMF0gOiBvYmo7XG59O1xuXG5cbi8vIE1hcCBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5IG9yIGFycmF5IG9mIGFycmF5cy5cbi8vIFwidG9BbHRlclwiIGlzIGFuIGludGVybmFsIHZhcmlhYmxlLlxualN0YXQubWFwID0gZnVuY3Rpb24gbWFwKGFyciwgZnVuYywgdG9BbHRlcikge1xuICB2YXIgcm93LCBucm93LCBuY29sLCByZXMsIGNvbDtcblxuICBpZiAoIWlzQXJyYXkoYXJyWzBdKSlcbiAgICBhcnIgPSBbYXJyXTtcblxuICBucm93ID0gYXJyLmxlbmd0aDtcbiAgbmNvbCA9IGFyclswXS5sZW5ndGg7XG4gIHJlcyA9IHRvQWx0ZXIgPyBhcnIgOiBuZXcgQXJyYXkobnJvdyk7XG5cbiAgZm9yIChyb3cgPSAwOyByb3cgPCBucm93OyByb3crKykge1xuICAgIC8vIGlmIHRoZSByb3cgZG9lc24ndCBleGlzdCwgY3JlYXRlIGl0XG4gICAgaWYgKCFyZXNbcm93XSlcbiAgICAgIHJlc1tyb3ddID0gbmV3IEFycmF5KG5jb2wpO1xuICAgIGZvciAoY29sID0gMDsgY29sIDwgbmNvbDsgY29sKyspXG4gICAgICByZXNbcm93XVtjb2xdID0gZnVuYyhhcnJbcm93XVtjb2xdLCByb3csIGNvbCk7XG4gIH1cblxuICByZXR1cm4gcmVzLmxlbmd0aCA9PT0gMSA/IHJlc1swXSA6IHJlcztcbn07XG5cblxuLy8gQ3VtdWxhdGl2ZWx5IGNvbWJpbmUgdGhlIGVsZW1lbnRzIG9mIGFuIGFycmF5IG9yIGFycmF5IG9mIGFycmF5cyB1c2luZyBhIGZ1bmN0aW9uLlxualN0YXQuY3VtcmVkdWNlID0gZnVuY3Rpb24gY3VtcmVkdWNlKGFyciwgZnVuYywgdG9BbHRlcikge1xuICB2YXIgcm93LCBucm93LCBuY29sLCByZXMsIGNvbDtcblxuICBpZiAoIWlzQXJyYXkoYXJyWzBdKSlcbiAgICBhcnIgPSBbYXJyXTtcblxuICBucm93ID0gYXJyLmxlbmd0aDtcbiAgbmNvbCA9IGFyclswXS5sZW5ndGg7XG4gIHJlcyA9IHRvQWx0ZXIgPyBhcnIgOiBuZXcgQXJyYXkobnJvdyk7XG5cbiAgZm9yIChyb3cgPSAwOyByb3cgPCBucm93OyByb3crKykge1xuICAgIC8vIGlmIHRoZSByb3cgZG9lc24ndCBleGlzdCwgY3JlYXRlIGl0XG4gICAgaWYgKCFyZXNbcm93XSlcbiAgICAgIHJlc1tyb3ddID0gbmV3IEFycmF5KG5jb2wpO1xuICAgIGlmIChuY29sID4gMClcbiAgICAgIHJlc1tyb3ddWzBdID0gYXJyW3Jvd11bMF07XG4gICAgZm9yIChjb2wgPSAxOyBjb2wgPCBuY29sOyBjb2wrKylcbiAgICAgIHJlc1tyb3ddW2NvbF0gPSBmdW5jKHJlc1tyb3ddW2NvbC0xXSwgYXJyW3Jvd11bY29sXSk7XG4gIH1cbiAgcmV0dXJuIHJlcy5sZW5ndGggPT09IDEgPyByZXNbMF0gOiByZXM7XG59O1xuXG5cbi8vIERlc3RydWN0aXZlbHkgYWx0ZXIgYW4gYXJyYXkuXG5qU3RhdC5hbHRlciA9IGZ1bmN0aW9uIGFsdGVyKGFyciwgZnVuYykge1xuICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuYywgdHJ1ZSk7XG59O1xuXG5cbi8vIEdlbmVyYXRlIGEgcm93cyB4IGNvbHMgbWF0cml4IGFjY29yZGluZyB0byB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG5qU3RhdC5jcmVhdGUgPSBmdW5jdGlvbiAgY3JlYXRlKHJvd3MsIGNvbHMsIGZ1bmMpIHtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheShyb3dzKTtcbiAgdmFyIGksIGo7XG5cbiAgaWYgKGlzRnVuY3Rpb24oY29scykpIHtcbiAgICBmdW5jID0gY29scztcbiAgICBjb2xzID0gcm93cztcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICByZXNbaV0gPSBuZXcgQXJyYXkoY29scyk7XG4gICAgZm9yIChqID0gMDsgaiA8IGNvbHM7IGorKylcbiAgICAgIHJlc1tpXVtqXSA9IGZ1bmMoaSwgaik7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblxuXG5mdW5jdGlvbiByZXRaZXJvKCkgeyByZXR1cm4gMDsgfVxuXG5cbi8vIEdlbmVyYXRlIGEgcm93cyB4IGNvbHMgbWF0cml4IG9mIHplcm9zLlxualN0YXQuemVyb3MgPSBmdW5jdGlvbiB6ZXJvcyhyb3dzLCBjb2xzKSB7XG4gIGlmICghaXNOdW1iZXIoY29scykpXG4gICAgY29scyA9IHJvd3M7XG4gIHJldHVybiBqU3RhdC5jcmVhdGUocm93cywgY29scywgcmV0WmVybyk7XG59O1xuXG5cbmZ1bmN0aW9uIHJldE9uZSgpIHsgcmV0dXJuIDE7IH1cblxuXG4vLyBHZW5lcmF0ZSBhIHJvd3MgeCBjb2xzIG1hdHJpeCBvZiBvbmVzLlxualN0YXQub25lcyA9IGZ1bmN0aW9uIG9uZXMocm93cywgY29scykge1xuICBpZiAoIWlzTnVtYmVyKGNvbHMpKVxuICAgIGNvbHMgPSByb3dzO1xuICByZXR1cm4galN0YXQuY3JlYXRlKHJvd3MsIGNvbHMsIHJldE9uZSk7XG59O1xuXG5cbi8vIEdlbmVyYXRlIGEgcm93cyB4IGNvbHMgbWF0cml4IG9mIHVuaWZvcm1seSByYW5kb20gbnVtYmVycy5cbmpTdGF0LnJhbmQgPSBmdW5jdGlvbiByYW5kKHJvd3MsIGNvbHMpIHtcbiAgaWYgKCFpc051bWJlcihjb2xzKSlcbiAgICBjb2xzID0gcm93cztcbiAgcmV0dXJuIGpTdGF0LmNyZWF0ZShyb3dzLCBjb2xzLCBqU3RhdC5fcmFuZG9tX2ZuKTtcbn07XG5cblxuZnVuY3Rpb24gcmV0SWRlbnQoaSwgaikgeyByZXR1cm4gaSA9PT0gaiA/IDEgOiAwOyB9XG5cblxuLy8gR2VuZXJhdGUgYW4gaWRlbnRpdHkgbWF0cml4IG9mIHNpemUgcm93IHggY29scy5cbmpTdGF0LmlkZW50aXR5ID0gZnVuY3Rpb24gaWRlbnRpdHkocm93cywgY29scykge1xuICBpZiAoIWlzTnVtYmVyKGNvbHMpKVxuICAgIGNvbHMgPSByb3dzO1xuICByZXR1cm4galN0YXQuY3JlYXRlKHJvd3MsIGNvbHMsIHJldElkZW50KTtcbn07XG5cblxuLy8gVGVzdHMgd2hldGhlciBhIG1hdHJpeCBpcyBzeW1tZXRyaWNcbmpTdGF0LnN5bW1ldHJpYyA9IGZ1bmN0aW9uIHN5bW1ldHJpYyhhcnIpIHtcbiAgdmFyIHNpemUgPSBhcnIubGVuZ3RoO1xuICB2YXIgcm93LCBjb2w7XG5cbiAgaWYgKGFyci5sZW5ndGggIT09IGFyclswXS5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAocm93ID0gMDsgcm93IDwgc2l6ZTsgcm93KyspIHtcbiAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IHNpemU7IGNvbCsrKVxuICAgICAgaWYgKGFycltjb2xdW3Jvd10gIT09IGFycltyb3ddW2NvbF0pXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vLyBTZXQgYWxsIHZhbHVlcyB0byB6ZXJvLlxualN0YXQuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LmFsdGVyKGFyciwgcmV0WmVybyk7XG59O1xuXG5cbi8vIEdlbmVyYXRlIHNlcXVlbmNlLlxualN0YXQuc2VxID0gZnVuY3Rpb24gc2VxKG1pbiwgbWF4LCBsZW5ndGgsIGZ1bmMpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKVxuICAgIGZ1bmMgPSBmYWxzZTtcblxuICB2YXIgYXJyID0gW107XG4gIHZhciBoaXZhbCA9IGNhbGNSZHgobWluLCBtYXgpO1xuICB2YXIgc3RlcCA9IChtYXggKiBoaXZhbCAtIG1pbiAqIGhpdmFsKSAvICgobGVuZ3RoIC0gMSkgKiBoaXZhbCk7XG4gIHZhciBjdXJyZW50ID0gbWluO1xuICB2YXIgY250O1xuXG4gIC8vIEN1cnJlbnQgaXMgYXNzaWduZWQgdXNpbmcgYSB0ZWNobmlxdWUgdG8gY29tcGVuc2F0ZSBmb3IgSUVFRSBlcnJvci5cbiAgLy8gVE9ETzogTmVlZHMgYmV0dGVyIGltcGxlbWVudGF0aW9uLlxuICBmb3IgKGNudCA9IDA7XG4gICAgICAgY3VycmVudCA8PSBtYXggJiYgY250IDwgbGVuZ3RoO1xuICAgICAgIGNudCsrLCBjdXJyZW50ID0gKG1pbiAqIGhpdmFsICsgc3RlcCAqIGhpdmFsICogY250KSAvIGhpdmFsKSB7XG4gICAgYXJyLnB1c2goKGZ1bmMgPyBmdW5jKGN1cnJlbnQsIGNudCkgOiBjdXJyZW50KSk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuXG4vLyBhcmFuZ2UoNSkgLT4gWzAsMSwyLDMsNF1cbi8vIGFyYW5nZSgxLDUpIC0+IFsxLDIsMyw0XVxuLy8gYXJhbmdlKDUsMSwtMSkgLT4gWzUsNCwzLDJdXG5qU3RhdC5hcmFuZ2UgPSBmdW5jdGlvbiBhcmFuZ2Uoc3RhcnQsIGVuZCwgc3RlcCkge1xuICB2YXIgcmwgPSBbXTtcbiAgdmFyIGk7XG4gIHN0ZXAgPSBzdGVwIHx8IDE7XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHN0YXJ0O1xuICAgIHN0YXJ0ID0gMDtcbiAgfVxuICBpZiAoc3RhcnQgPT09IGVuZCB8fCBzdGVwID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChzdGFydCA8IGVuZCAmJiBzdGVwIDwgMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoc3RhcnQgPiBlbmQgJiYgc3RlcCA+IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gc3RlcCkge1xuICAgICAgcmwucHVzaChpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPiBlbmQ7IGkgKz0gc3RlcCkge1xuICAgICAgcmwucHVzaChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJsO1xufTtcblxuXG4vLyBBPVtbMSwyLDNdLFs0LDUsNl0sWzcsOCw5XV1cbi8vIHNsaWNlKEEse3Jvdzp7ZW5kOjJ9LGNvbDp7c3RhcnQ6MX19KSAtPiBbWzIsM10sWzUsNl1dXG4vLyBzbGljZShBLDEse3N0YXJ0OjF9KSAtPiBbNSw2XVxuLy8gYXMgbnVtcHkgY29kZSBBWzoyLDE6XVxualN0YXQuc2xpY2UgPSAoZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gX3NsaWNlKGxpc3QsIHN0YXJ0LCBlbmQsIHN0ZXApIHtcbiAgICAvLyBub3RlIGl0J3Mgbm90IGVxdWFsIHRvIHJhbmdlLm1hcCBtb2RlIGl0J3MgYSBidWdcbiAgICB2YXIgaTtcbiAgICB2YXIgcmwgPSBbXTtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgJiYgZW5kID09PSB1bmRlZmluZWQgJiYgc3RlcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4galN0YXQuY29weShsaXN0KTtcbiAgICB9XG5cbiAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgZW5kID0gZW5kIHx8IGxpc3QubGVuZ3RoO1xuICAgIHN0YXJ0ID0gc3RhcnQgPj0gMCA/IHN0YXJ0IDogbGVuZ3RoICsgc3RhcnQ7XG4gICAgZW5kID0gZW5kID49IDAgPyBlbmQgOiBsZW5ndGggKyBlbmQ7XG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICBpZiAoc3RhcnQgPT09IGVuZCB8fCBzdGVwID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChzdGFydCA8IGVuZCAmJiBzdGVwIDwgMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgPiBlbmQgJiYgc3RlcCA+IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBzdGVwKSB7XG4gICAgICAgIHJsLnB1c2gobGlzdFtpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IHN0YXJ0OyBpID4gZW5kO2kgKz0gc3RlcCkge1xuICAgICAgICBybC5wdXNoKGxpc3RbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmw7XG4gIH1cblxuICBmdW5jdGlvbiBzbGljZShsaXN0LCByY1NsaWNlKSB7XG4gICAgdmFyIGNvbFNsaWNlLCByb3dTbGljZTtcbiAgICByY1NsaWNlID0gcmNTbGljZSB8fCB7fTtcbiAgICBpZiAoaXNOdW1iZXIocmNTbGljZS5yb3cpKSB7XG4gICAgICBpZiAoaXNOdW1iZXIocmNTbGljZS5jb2wpKVxuICAgICAgICByZXR1cm4gbGlzdFtyY1NsaWNlLnJvd11bcmNTbGljZS5jb2xdO1xuICAgICAgdmFyIHJvdyA9IGpTdGF0LnJvd2EobGlzdCwgcmNTbGljZS5yb3cpO1xuICAgICAgY29sU2xpY2UgPSByY1NsaWNlLmNvbCB8fCB7fTtcbiAgICAgIHJldHVybiBfc2xpY2Uocm93LCBjb2xTbGljZS5zdGFydCwgY29sU2xpY2UuZW5kLCBjb2xTbGljZS5zdGVwKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOdW1iZXIocmNTbGljZS5jb2wpKSB7XG4gICAgICB2YXIgY29sID0galN0YXQuY29sYShsaXN0LCByY1NsaWNlLmNvbCk7XG4gICAgICByb3dTbGljZSA9IHJjU2xpY2Uucm93IHx8IHt9O1xuICAgICAgcmV0dXJuIF9zbGljZShjb2wsIHJvd1NsaWNlLnN0YXJ0LCByb3dTbGljZS5lbmQsIHJvd1NsaWNlLnN0ZXApO1xuICAgIH1cblxuICAgIHJvd1NsaWNlID0gcmNTbGljZS5yb3cgfHwge307XG4gICAgY29sU2xpY2UgPSByY1NsaWNlLmNvbCB8fCB7fTtcbiAgICB2YXIgcm93cyA9IF9zbGljZShsaXN0LCByb3dTbGljZS5zdGFydCwgcm93U2xpY2UuZW5kLCByb3dTbGljZS5zdGVwKTtcbiAgICByZXR1cm4gcm93cy5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICByZXR1cm4gX3NsaWNlKHJvdywgY29sU2xpY2Uuc3RhcnQsIGNvbFNsaWNlLmVuZCwgY29sU2xpY2Uuc3RlcCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc2xpY2U7XG59KCkpO1xuXG5cbi8vIEE9W1sxLDIsM10sWzQsNSw2XSxbNyw4LDldXVxuLy8gc2xpY2VBc3NpZ24oQSx7cm93OntzdGFydDoxfSxjb2w6e3N0YXJ0OjF9fSxbWzAsMF0sWzAsMF1dKVxuLy8gQT1bWzEsMiwzXSxbNCwwLDBdLFs3LDAsMF1dXG5qU3RhdC5zbGljZUFzc2lnbiA9IGZ1bmN0aW9uIHNsaWNlQXNzaWduKEEsIHJjU2xpY2UsIEIpIHtcbiAgdmFyIG5sLCBtbDtcbiAgaWYgKGlzTnVtYmVyKHJjU2xpY2Uucm93KSkge1xuICAgIGlmIChpc051bWJlcihyY1NsaWNlLmNvbCkpXG4gICAgICByZXR1cm4gQVtyY1NsaWNlLnJvd11bcmNTbGljZS5jb2xdID0gQjtcbiAgICByY1NsaWNlLmNvbCA9IHJjU2xpY2UuY29sIHx8IHt9O1xuICAgIHJjU2xpY2UuY29sLnN0YXJ0ID0gcmNTbGljZS5jb2wuc3RhcnQgfHwgMDtcbiAgICByY1NsaWNlLmNvbC5lbmQgPSByY1NsaWNlLmNvbC5lbmQgfHwgQVswXS5sZW5ndGg7XG4gICAgcmNTbGljZS5jb2wuc3RlcCA9IHJjU2xpY2UuY29sLnN0ZXAgfHwgMTtcbiAgICBubCA9IGpTdGF0LmFyYW5nZShyY1NsaWNlLmNvbC5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oQS5sZW5ndGgsIHJjU2xpY2UuY29sLmVuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJjU2xpY2UuY29sLnN0ZXApO1xuICAgIHZhciBtID0gcmNTbGljZS5yb3c7XG4gICAgbmwuZm9yRWFjaChmdW5jdGlvbihuLCBpKSB7XG4gICAgICBBW21dW25dID0gQltpXTtcbiAgICB9KTtcbiAgICByZXR1cm4gQTtcbiAgfVxuXG4gIGlmIChpc051bWJlcihyY1NsaWNlLmNvbCkpIHtcbiAgICByY1NsaWNlLnJvdyA9IHJjU2xpY2Uucm93IHx8IHt9O1xuICAgIHJjU2xpY2Uucm93LnN0YXJ0ID0gcmNTbGljZS5yb3cuc3RhcnQgfHwgMDtcbiAgICByY1NsaWNlLnJvdy5lbmQgPSByY1NsaWNlLnJvdy5lbmQgfHwgQS5sZW5ndGg7XG4gICAgcmNTbGljZS5yb3cuc3RlcCA9IHJjU2xpY2Uucm93LnN0ZXAgfHwgMTtcbiAgICBtbCA9IGpTdGF0LmFyYW5nZShyY1NsaWNlLnJvdy5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oQVswXS5sZW5ndGgsIHJjU2xpY2Uucm93LmVuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJjU2xpY2Uucm93LnN0ZXApO1xuICAgIHZhciBuID0gcmNTbGljZS5jb2w7XG4gICAgbWwuZm9yRWFjaChmdW5jdGlvbihtLCBqKSB7XG4gICAgICBBW21dW25dID0gQltqXTtcbiAgICB9KTtcbiAgICByZXR1cm4gQTtcbiAgfVxuXG4gIGlmIChCWzBdLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgQiA9IFtCXTtcbiAgfVxuICByY1NsaWNlLnJvdy5zdGFydCA9IHJjU2xpY2Uucm93LnN0YXJ0IHx8IDA7XG4gIHJjU2xpY2Uucm93LmVuZCA9IHJjU2xpY2Uucm93LmVuZCB8fCBBLmxlbmd0aDtcbiAgcmNTbGljZS5yb3cuc3RlcCA9IHJjU2xpY2Uucm93LnN0ZXAgfHwgMTtcbiAgcmNTbGljZS5jb2wuc3RhcnQgPSByY1NsaWNlLmNvbC5zdGFydCB8fCAwO1xuICByY1NsaWNlLmNvbC5lbmQgPSByY1NsaWNlLmNvbC5lbmQgfHwgQVswXS5sZW5ndGg7XG4gIHJjU2xpY2UuY29sLnN0ZXAgPSByY1NsaWNlLmNvbC5zdGVwIHx8IDE7XG4gIG1sID0galN0YXQuYXJhbmdlKHJjU2xpY2Uucm93LnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oQS5sZW5ndGgsIHJjU2xpY2Uucm93LmVuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICByY1NsaWNlLnJvdy5zdGVwKTtcbiAgbmwgPSBqU3RhdC5hcmFuZ2UocmNTbGljZS5jb2wuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLm1pbihBWzBdLmxlbmd0aCwgcmNTbGljZS5jb2wuZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJjU2xpY2UuY29sLnN0ZXApO1xuICBtbC5mb3JFYWNoKGZ1bmN0aW9uKG0sIGkpIHtcbiAgICBubC5mb3JFYWNoKGZ1bmN0aW9uKG4sIGopIHtcbiAgICAgIEFbbV1bbl0gPSBCW2ldW2pdO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIEE7XG59O1xuXG5cbi8vIFsxLDIsM10gLT5cbi8vIFtbMSwwLDBdLFswLDIsMF0sWzAsMCwzXV1cbmpTdGF0LmRpYWdvbmFsID0gZnVuY3Rpb24gZGlhZ29uYWwoZGlhZ0FycmF5KSB7XG4gIHZhciBtYXQgPSBqU3RhdC56ZXJvcyhkaWFnQXJyYXkubGVuZ3RoLCBkaWFnQXJyYXkubGVuZ3RoKTtcbiAgZGlhZ0FycmF5LmZvckVhY2goZnVuY3Rpb24odCwgaSkge1xuICAgIG1hdFtpXVtpXSA9IHQ7XG4gIH0pO1xuICByZXR1cm4gbWF0O1xufTtcblxuXG4vLyByZXR1cm4gY29weSBvZiBBXG5qU3RhdC5jb3B5ID0gZnVuY3Rpb24gY29weShBKSB7XG4gIHJldHVybiBBLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICBpZiAoaXNOdW1iZXIocm93KSlcbiAgICAgIHJldHVybiByb3c7XG4gICAgcmV0dXJuIHJvdy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuXG4vLyBUT0RPOiBHbyBvdmVyIHRoaXMgZW50aXJlIGltcGxlbWVudGF0aW9uLiBTZWVtcyBhIHRyYWdpYyB3YXN0ZSBvZiByZXNvdXJjZXNcbi8vIGRvaW5nIGFsbCB0aGlzIHdvcmsuIEluc3RlYWQsIGFuZCB3aGlsZSB1Z2x5LCB1c2UgbmV3IEZ1bmN0aW9uKCkgdG8gZ2VuZXJhdGVcbi8vIGEgY3VzdG9tIGZ1bmN0aW9uIGZvciBlYWNoIHN0YXRpYyBtZXRob2QuXG5cbi8vIFF1aWNrIHJlZmVyZW5jZS5cbnZhciBqUHJvdG8gPSBqU3RhdC5wcm90b3R5cGU7XG5cbi8vIERlZmF1bHQgbGVuZ3RoLlxualByb3RvLmxlbmd0aCA9IDA7XG5cbi8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbi8vIFRPRE86IENoZWNrIGlmIHRoZXkncmUgYWN0dWFsbHkgdXNlZCwgYW5kIGlmIHRoZXkgYXJlIHRoZW4gcmVuYW1lIHRoZW1cbi8vIHRvIF8qXG5qUHJvdG8ucHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xualByb3RvLnNvcnQgPSBBcnJheS5wcm90b3R5cGUuc29ydDtcbmpQcm90by5zcGxpY2UgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlO1xualByb3RvLnNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG5cbi8vIFJldHVybiBhIGNsZWFuIGFycmF5LlxualByb3RvLnRvQXJyYXkgPSBmdW5jdGlvbiB0b0FycmF5KCkge1xuICByZXR1cm4gdGhpcy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCh0aGlzKSA6IHNsaWNlLmNhbGwodGhpcylbMF07XG59O1xuXG5cbi8vIE1hcCBhIGZ1bmN0aW9uIHRvIGEgbWF0cml4IG9yIHZlY3Rvci5cbmpQcm90by5tYXAgPSBmdW5jdGlvbiBtYXAoZnVuYywgdG9BbHRlcikge1xuICByZXR1cm4galN0YXQoalN0YXQubWFwKHRoaXMsIGZ1bmMsIHRvQWx0ZXIpKTtcbn07XG5cblxuLy8gQ3VtdWxhdGl2ZWx5IGNvbWJpbmUgdGhlIGVsZW1lbnRzIG9mIGEgbWF0cml4IG9yIHZlY3RvciB1c2luZyBhIGZ1bmN0aW9uLlxualByb3RvLmN1bXJlZHVjZSA9IGZ1bmN0aW9uIGN1bXJlZHVjZShmdW5jLCB0b0FsdGVyKSB7XG4gIHJldHVybiBqU3RhdChqU3RhdC5jdW1yZWR1Y2UodGhpcywgZnVuYywgdG9BbHRlcikpO1xufTtcblxuXG4vLyBEZXN0cnVjdGl2ZWx5IGFsdGVyIGFuIGFycmF5LlxualByb3RvLmFsdGVyID0gZnVuY3Rpb24gYWx0ZXIoZnVuYykge1xuICBqU3RhdC5hbHRlcih0aGlzLCBmdW5jKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8vIEV4dGVuZCBwcm90b3R5cGUgd2l0aCBtZXRob2RzIHRoYXQgaGF2ZSBubyBhcmd1bWVudC5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqUHJvdG9bcGFzc2Z1bmNdID0gZnVuY3Rpb24oZnVuYykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgcmVzdWx0cztcbiAgICAgIC8vIENoZWNrIGZvciBjYWxsYmFjay5cbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZnVuYy5jYWxsKHNlbGYsIGpQcm90b1twYXNzZnVuY10uY2FsbChzZWxmKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHJlc3VsdHMgPSBqU3RhdFtwYXNzZnVuY10odGhpcyk7XG4gICAgICByZXR1cm4gaXNBcnJheShyZXN1bHRzKSA/IGpTdGF0KHJlc3VsdHMpIDogcmVzdWx0cztcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgndHJhbnNwb3NlIGNsZWFyIHN5bW1ldHJpYyByb3dzIGNvbHMgZGltZW5zaW9ucyBkaWFnIGFudGlkaWFnJy5zcGxpdCgnICcpKTtcblxuXG4vLyBFeHRlbmQgcHJvdG90eXBlIHdpdGggbWV0aG9kcyB0aGF0IGhhdmUgb25lIGFyZ3VtZW50LlxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpQcm90b1twYXNzZnVuY10gPSBmdW5jdGlvbihpbmRleCwgZnVuYykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgLy8gY2hlY2sgZm9yIGNhbGxiYWNrXG4gICAgICBpZiAoZnVuYykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZ1bmMuY2FsbChzZWxmLCBqUHJvdG9bcGFzc2Z1bmNdLmNhbGwoc2VsZiwgaW5kZXgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGpTdGF0KGpTdGF0W3Bhc3NmdW5jXSh0aGlzLCBpbmRleCkpO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCdyb3cgY29sJy5zcGxpdCgnICcpKTtcblxuXG4vLyBFeHRlbmQgcHJvdG90eXBlIHdpdGggc2ltcGxlIHNob3J0Y3V0IG1ldGhvZHMuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalByb3RvW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGpTdGF0KGpTdGF0W3Bhc3NmdW5jXS5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgnY3JlYXRlIHplcm9zIG9uZXMgcmFuZCBpZGVudGl0eScuc3BsaXQoJyAnKSk7XG5cblxuLy8gRXhwb3NpbmcgalN0YXQuXG5yZXR1cm4galN0YXQ7XG5cbn0oTWF0aCkpO1xuKGZ1bmN0aW9uKGpTdGF0LCBNYXRoKSB7XG5cbnZhciBpc0Z1bmN0aW9uID0galN0YXQudXRpbHMuaXNGdW5jdGlvbjtcblxuLy8gQXNjZW5kaW5nIGZ1bmN0aW9ucyBmb3Igc29ydFxuZnVuY3Rpb24gYXNjTnVtKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9XG5cbmZ1bmN0aW9uIGNsaXAoYXJnLCBtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihhcmcsIG1heCkpO1xufVxuXG5cbi8vIHN1bSBvZiBhbiBhcnJheVxualN0YXQuc3VtID0gZnVuY3Rpb24gc3VtKGFycikge1xuICB2YXIgc3VtID0gMDtcbiAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICB3aGlsZSAoLS1pID49IDApXG4gICAgc3VtICs9IGFycltpXTtcbiAgcmV0dXJuIHN1bTtcbn07XG5cblxuLy8gc3VtIHNxdWFyZWRcbmpTdGF0LnN1bXNxcmQgPSBmdW5jdGlvbiBzdW1zcXJkKGFycikge1xuICB2YXIgc3VtID0gMDtcbiAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICB3aGlsZSAoLS1pID49IDApXG4gICAgc3VtICs9IGFycltpXSAqIGFycltpXTtcbiAgcmV0dXJuIHN1bTtcbn07XG5cblxuLy8gc3VtIG9mIHNxdWFyZWQgZXJyb3JzIG9mIHByZWRpY3Rpb24gKFNTRSlcbmpTdGF0LnN1bXNxZXJyID0gZnVuY3Rpb24gc3Vtc3FlcnIoYXJyKSB7XG4gIHZhciBtZWFuID0galN0YXQubWVhbihhcnIpO1xuICB2YXIgc3VtID0gMDtcbiAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICB2YXIgdG1wO1xuICB3aGlsZSAoLS1pID49IDApIHtcbiAgICB0bXAgPSBhcnJbaV0gLSBtZWFuO1xuICAgIHN1bSArPSB0bXAgKiB0bXA7XG4gIH1cbiAgcmV0dXJuIHN1bTtcbn07XG5cbi8vIHN1bSBvZiBhbiBhcnJheSBpbiBlYWNoIHJvd1xualN0YXQuc3Vtcm93ID0gZnVuY3Rpb24gc3Vtcm93KGFycikge1xuICB2YXIgc3VtID0gMDtcbiAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICB3aGlsZSAoLS1pID49IDApXG4gICAgc3VtICs9IGFycltpXTtcbiAgcmV0dXJuIHN1bTtcbn07XG5cbi8vIHByb2R1Y3Qgb2YgYW4gYXJyYXlcbmpTdGF0LnByb2R1Y3QgPSBmdW5jdGlvbiBwcm9kdWN0KGFycikge1xuICB2YXIgcHJvZCA9IDE7XG4gIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgd2hpbGUgKC0taSA+PSAwKVxuICAgIHByb2QgKj0gYXJyW2ldO1xuICByZXR1cm4gcHJvZDtcbn07XG5cblxuLy8gbWluaW11bSB2YWx1ZSBvZiBhbiBhcnJheVxualN0YXQubWluID0gZnVuY3Rpb24gbWluKGFycikge1xuICB2YXIgbG93ID0gYXJyWzBdO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlICgrK2kgPCBhcnIubGVuZ3RoKVxuICAgIGlmIChhcnJbaV0gPCBsb3cpXG4gICAgICBsb3cgPSBhcnJbaV07XG4gIHJldHVybiBsb3c7XG59O1xuXG5cbi8vIG1heGltdW0gdmFsdWUgb2YgYW4gYXJyYXlcbmpTdGF0Lm1heCA9IGZ1bmN0aW9uIG1heChhcnIpIHtcbiAgdmFyIGhpZ2ggPSBhcnJbMF07XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKCsraSA8IGFyci5sZW5ndGgpXG4gICAgaWYgKGFycltpXSA+IGhpZ2gpXG4gICAgICBoaWdoID0gYXJyW2ldO1xuICByZXR1cm4gaGlnaDtcbn07XG5cblxuLy8gdW5pcXVlIHZhbHVlcyBvZiBhbiBhcnJheVxualN0YXQudW5pcXVlID0gZnVuY3Rpb24gdW5pcXVlKGFycikge1xuICB2YXIgaGFzaCA9IHt9LCBfYXJyID0gW107XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc2hbYXJyW2ldXSkge1xuICAgICAgaGFzaFthcnJbaV1dID0gdHJ1ZTtcbiAgICAgIF9hcnIucHVzaChhcnJbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gX2Fycjtcbn07XG5cblxuLy8gbWVhbiB2YWx1ZSBvZiBhbiBhcnJheVxualN0YXQubWVhbiA9IGZ1bmN0aW9uIG1lYW4oYXJyKSB7XG4gIHJldHVybiBqU3RhdC5zdW0oYXJyKSAvIGFyci5sZW5ndGg7XG59O1xuXG5cbi8vIG1lYW4gc3F1YXJlZCBlcnJvciAoTVNFKVxualN0YXQubWVhbnNxZXJyID0gZnVuY3Rpb24gbWVhbnNxZXJyKGFycikge1xuICByZXR1cm4galN0YXQuc3Vtc3FlcnIoYXJyKSAvIGFyci5sZW5ndGg7XG59O1xuXG5cbi8vIGdlb21ldHJpYyBtZWFuIG9mIGFuIGFycmF5XG5qU3RhdC5nZW9tZWFuID0gZnVuY3Rpb24gZ2VvbWVhbihhcnIpIHtcbiAgcmV0dXJuIE1hdGgucG93KGpTdGF0LnByb2R1Y3QoYXJyKSwgMSAvIGFyci5sZW5ndGgpO1xufTtcblxuXG4vLyBtZWRpYW4gb2YgYW4gYXJyYXlcbmpTdGF0Lm1lZGlhbiA9IGZ1bmN0aW9uIG1lZGlhbihhcnIpIHtcbiAgdmFyIGFycmxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBfYXJyID0gYXJyLnNsaWNlKCkuc29ydChhc2NOdW0pO1xuICAvLyBjaGVjayBpZiBhcnJheSBpcyBldmVuIG9yIG9kZCwgdGhlbiByZXR1cm4gdGhlIGFwcHJvcHJpYXRlXG4gIHJldHVybiAhKGFycmxlbiAmIDEpXG4gICAgPyAoX2FyclsoYXJybGVuIC8gMikgLSAxIF0gKyBfYXJyWyhhcnJsZW4gLyAyKV0pIC8gMlxuICAgIDogX2FyclsoYXJybGVuIC8gMikgfCAwIF07XG59O1xuXG5cbi8vIGN1bXVsYXRpdmUgc3VtIG9mIGFuIGFycmF5XG5qU3RhdC5jdW1zdW0gPSBmdW5jdGlvbiBjdW1zdW0oYXJyKSB7XG4gIHJldHVybiBqU3RhdC5jdW1yZWR1Y2UoYXJyLCBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pO1xufTtcblxuXG4vLyBjdW11bGF0aXZlIHByb2R1Y3Qgb2YgYW4gYXJyYXlcbmpTdGF0LmN1bXByb2QgPSBmdW5jdGlvbiBjdW1wcm9kKGFycikge1xuICByZXR1cm4galN0YXQuY3VtcmVkdWNlKGFyciwgZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKiBiOyB9KTtcbn07XG5cblxuLy8gc3VjY2Vzc2l2ZSBkaWZmZXJlbmNlcyBvZiBhIHNlcXVlbmNlXG5qU3RhdC5kaWZmID0gZnVuY3Rpb24gZGlmZihhcnIpIHtcbiAgdmFyIGRpZmZzID0gW107XG4gIHZhciBhcnJMZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMTsgaSA8IGFyckxlbjsgaSsrKVxuICAgIGRpZmZzLnB1c2goYXJyW2ldIC0gYXJyW2kgLSAxXSk7XG4gIHJldHVybiBkaWZmcztcbn07XG5cblxuLy8gcmFua3Mgb2YgYW4gYXJyYXlcbmpTdGF0LnJhbmsgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHZhciBpO1xuICB2YXIgZGlzdGluY3ROdW1iZXJzID0gW107XG4gIHZhciBudW1iZXJDb3VudHMgPSB7fTtcbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBudW1iZXIgPSBhcnJbaV07XG4gICAgaWYgKG51bWJlckNvdW50c1tudW1iZXJdKSB7XG4gICAgICBudW1iZXJDb3VudHNbbnVtYmVyXSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW1iZXJDb3VudHNbbnVtYmVyXSA9IDE7XG4gICAgICBkaXN0aW5jdE51bWJlcnMucHVzaChudW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzb3J0ZWREaXN0aW5jdE51bWJlcnMgPSBkaXN0aW5jdE51bWJlcnMuc29ydChhc2NOdW0pO1xuICB2YXIgbnVtYmVyUmFua3MgPSB7fTtcbiAgdmFyIGN1cnJlbnRSYW5rID0gMTtcbiAgZm9yIChpID0gMDsgaSA8IHNvcnRlZERpc3RpbmN0TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBudW1iZXIgPSBzb3J0ZWREaXN0aW5jdE51bWJlcnNbaV07XG4gICAgdmFyIGNvdW50ID0gbnVtYmVyQ291bnRzW251bWJlcl07XG4gICAgdmFyIGZpcnN0ID0gY3VycmVudFJhbms7XG4gICAgdmFyIGxhc3QgPSBjdXJyZW50UmFuayArIGNvdW50IC0gMTtcbiAgICB2YXIgcmFuayA9IChmaXJzdCArIGxhc3QpIC8gMjtcbiAgICBudW1iZXJSYW5rc1tudW1iZXJdID0gcmFuaztcbiAgICBjdXJyZW50UmFuayArPSBjb3VudDtcbiAgfVxuXG4gIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICByZXR1cm4gbnVtYmVyUmFua3NbbnVtYmVyXTtcbiAgfSk7XG59O1xuXG5cbi8vIG1vZGUgb2YgYW4gYXJyYXlcbi8vIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBtb2RlcyBvZiBhbiBhcnJheSwgcmV0dXJuIGFsbCBvZiB0aGVtXG4vLyBpcyB0aGlzIHRoZSBhcHByb3ByaWF0ZSB3YXkgb2YgaGFuZGxpbmcgaXQ/XG5qU3RhdC5tb2RlID0gZnVuY3Rpb24gbW9kZShhcnIpIHtcbiAgdmFyIGFyckxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBfYXJyID0gYXJyLnNsaWNlKCkuc29ydChhc2NOdW0pO1xuICB2YXIgY291bnQgPSAxO1xuICB2YXIgbWF4Q291bnQgPSAwO1xuICB2YXIgbnVtTWF4Q291bnQgPSAwO1xuICB2YXIgbW9kZV9hcnIgPSBbXTtcbiAgdmFyIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyckxlbjsgaSsrKSB7XG4gICAgaWYgKF9hcnJbaV0gPT09IF9hcnJbaSArIDFdKSB7XG4gICAgICBjb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY291bnQgPiBtYXhDb3VudCkge1xuICAgICAgICBtb2RlX2FyciA9IFtfYXJyW2ldXTtcbiAgICAgICAgbWF4Q291bnQgPSBjb3VudDtcbiAgICAgICAgbnVtTWF4Q291bnQgPSAwO1xuICAgICAgfVxuICAgICAgLy8gYXJlIHRoZXJlIG11bHRpcGxlIG1heCBjb3VudHNcbiAgICAgIGVsc2UgaWYgKGNvdW50ID09PSBtYXhDb3VudCkge1xuICAgICAgICBtb2RlX2Fyci5wdXNoKF9hcnJbaV0pO1xuICAgICAgICBudW1NYXhDb3VudCsrO1xuICAgICAgfVxuICAgICAgLy8gcmVzZXR0aW5nIGNvdW50IGZvciBuZXcgdmFsdWUgaW4gYXJyYXlcbiAgICAgIGNvdW50ID0gMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVtTWF4Q291bnQgPT09IDAgPyBtb2RlX2FyclswXSA6IG1vZGVfYXJyO1xufTtcblxuXG4vLyByYW5nZSBvZiBhbiBhcnJheVxualN0YXQucmFuZ2UgPSBmdW5jdGlvbiByYW5nZShhcnIpIHtcbiAgcmV0dXJuIGpTdGF0Lm1heChhcnIpIC0galN0YXQubWluKGFycik7XG59O1xuXG4vLyB2YXJpYW5jZSBvZiBhbiBhcnJheVxuLy8gZmxhZyA9IHRydWUgaW5kaWNhdGVzIHNhbXBsZSBpbnN0ZWFkIG9mIHBvcHVsYXRpb25cbmpTdGF0LnZhcmlhbmNlID0gZnVuY3Rpb24gdmFyaWFuY2UoYXJyLCBmbGFnKSB7XG4gIHJldHVybiBqU3RhdC5zdW1zcWVycihhcnIpIC8gKGFyci5sZW5ndGggLSAoZmxhZyA/IDEgOiAwKSk7XG59O1xuXG4vLyBwb29sZWQgdmFyaWFuY2Ugb2YgYW4gYXJyYXkgb2YgYXJyYXlzXG5qU3RhdC5wb29sZWR2YXJpYW5jZSA9IGZ1bmN0aW9uIHBvb2xlZHZhcmlhbmNlKGFycikge1xuICB2YXIgc3Vtc3FlcnIgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhLCBzYW1wbGVzKSB7cmV0dXJuIGEgKyBqU3RhdC5zdW1zcWVycihzYW1wbGVzKTt9LCAwKTtcbiAgdmFyIGNvdW50ID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgc2FtcGxlcykge3JldHVybiBhICsgc2FtcGxlcy5sZW5ndGg7fSwgMCk7XG4gIHJldHVybiBzdW1zcWVyciAvIChjb3VudCAtIGFyci5sZW5ndGgpO1xufTtcblxuLy8gZGV2aWF0aW9uIG9mIGFuIGFycmF5XG5qU3RhdC5kZXZpYXRpb24gPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHZhciBtZWFuID0galN0YXQubWVhbihhcnIpO1xuICB2YXIgYXJybGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGRldiA9IG5ldyBBcnJheShhcnJsZW4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmxlbjsgaSsrKSB7XG4gICAgZGV2W2ldID0gYXJyW2ldIC0gbWVhbjtcbiAgfVxuICByZXR1cm4gZGV2O1xufTtcblxuLy8gc3RhbmRhcmQgZGV2aWF0aW9uIG9mIGFuIGFycmF5XG4vLyBmbGFnID0gdHJ1ZSBpbmRpY2F0ZXMgc2FtcGxlIGluc3RlYWQgb2YgcG9wdWxhdGlvblxualN0YXQuc3RkZXYgPSBmdW5jdGlvbiBzdGRldihhcnIsIGZsYWcpIHtcbiAgcmV0dXJuIE1hdGguc3FydChqU3RhdC52YXJpYW5jZShhcnIsIGZsYWcpKTtcbn07XG5cbi8vIHBvb2xlZCBzdGFuZGFyZCBkZXZpYXRpb24gb2YgYW4gYXJyYXkgb2YgYXJyYXlzXG5qU3RhdC5wb29sZWRzdGRldiA9IGZ1bmN0aW9uIHBvb2xlZHN0ZGV2KGFycikge1xuICByZXR1cm4gTWF0aC5zcXJ0KGpTdGF0LnBvb2xlZHZhcmlhbmNlKGFycikpO1xufTtcblxuLy8gbWVhbiBkZXZpYXRpb24gKG1lYW4gYWJzb2x1dGUgZGV2aWF0aW9uKSBvZiBhbiBhcnJheVxualN0YXQubWVhbmRldiA9IGZ1bmN0aW9uIG1lYW5kZXYoYXJyKSB7XG4gIHZhciBtZWFuID0galN0YXQubWVhbihhcnIpO1xuICB2YXIgYSA9IFtdO1xuICBmb3IgKHZhciBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgYS5wdXNoKE1hdGguYWJzKGFycltpXSAtIG1lYW4pKTtcbiAgfVxuICByZXR1cm4galN0YXQubWVhbihhKTtcbn07XG5cblxuLy8gbWVkaWFuIGRldmlhdGlvbiAobWVkaWFuIGFic29sdXRlIGRldmlhdGlvbikgb2YgYW4gYXJyYXlcbmpTdGF0Lm1lZGRldiA9IGZ1bmN0aW9uIG1lZGRldihhcnIpIHtcbiAgdmFyIG1lZGlhbiA9IGpTdGF0Lm1lZGlhbihhcnIpO1xuICB2YXIgYSA9IFtdO1xuICBmb3IgKHZhciBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgYS5wdXNoKE1hdGguYWJzKGFycltpXSAtIG1lZGlhbikpO1xuICB9XG4gIHJldHVybiBqU3RhdC5tZWRpYW4oYSk7XG59O1xuXG5cbi8vIGNvZWZmaWNpZW50IG9mIHZhcmlhdGlvblxualN0YXQuY29lZmZ2YXIgPSBmdW5jdGlvbiBjb2VmZnZhcihhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LnN0ZGV2KGFycikgLyBqU3RhdC5tZWFuKGFycik7XG59O1xuXG5cbi8vIHF1YXJ0aWxlcyBvZiBhbiBhcnJheVxualN0YXQucXVhcnRpbGVzID0gZnVuY3Rpb24gcXVhcnRpbGVzKGFycikge1xuICB2YXIgYXJybGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIF9hcnIgPSBhcnIuc2xpY2UoKS5zb3J0KGFzY051bSk7XG4gIHJldHVybiBbXG4gICAgX2FyclsgTWF0aC5yb3VuZCgoYXJybGVuKSAvIDQpIC0gMSBdLFxuICAgIF9hcnJbIE1hdGgucm91bmQoKGFycmxlbikgLyAyKSAtIDEgXSxcbiAgICBfYXJyWyBNYXRoLnJvdW5kKChhcnJsZW4pICogMyAvIDQpIC0gMSBdXG4gIF07XG59O1xuXG5cbi8vIEFyYml0YXJ5IHF1YW50aWxlcyBvZiBhbiBhcnJheS4gRGlyZWN0IHBvcnQgb2YgdGhlIHNjaXB5LnN0YXRzXG4vLyBpbXBsZW1lbnRhdGlvbiBieSBQaWVycmUgR0YgR2VyYXJkLU1hcmNoYW50LlxualN0YXQucXVhbnRpbGVzID0gZnVuY3Rpb24gcXVhbnRpbGVzKGFyciwgcXVhbnRpbGVzQXJyYXksIGFscGhhcCwgYmV0YXApIHtcbiAgdmFyIHNvcnRlZEFycmF5ID0gYXJyLnNsaWNlKCkuc29ydChhc2NOdW0pO1xuICB2YXIgcXVhbnRpbGVWYWxzID0gW3F1YW50aWxlc0FycmF5Lmxlbmd0aF07XG4gIHZhciBuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGksIHAsIG0sIGFsZXBoLCBrLCBnYW1tYTtcblxuICBpZiAodHlwZW9mIGFscGhhcCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgYWxwaGFwID0gMyAvIDg7XG4gIGlmICh0eXBlb2YgYmV0YXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGJldGFwID0gMyAvIDg7XG5cbiAgZm9yIChpID0gMDsgaSA8IHF1YW50aWxlc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgcCA9IHF1YW50aWxlc0FycmF5W2ldO1xuICAgIG0gPSBhbHBoYXAgKyBwICogKDEgLSBhbHBoYXAgLSBiZXRhcCk7XG4gICAgYWxlcGggPSBuICogcCArIG07XG4gICAgayA9IE1hdGguZmxvb3IoY2xpcChhbGVwaCwgMSwgbiAtIDEpKTtcbiAgICBnYW1tYSA9IGNsaXAoYWxlcGggLSBrLCAwLCAxKTtcbiAgICBxdWFudGlsZVZhbHNbaV0gPSAoMSAtIGdhbW1hKSAqIHNvcnRlZEFycmF5W2sgLSAxXSArIGdhbW1hICogc29ydGVkQXJyYXlba107XG4gIH1cblxuICByZXR1cm4gcXVhbnRpbGVWYWxzO1xufTtcblxuLy8gUmV0dXJuIHRoZSBrLXRoIHBlcmNlbnRpbGUgb2YgdmFsdWVzIGluIGEgcmFuZ2UsIHdoZXJlIGsgaXMgaW4gdGhlIHJhbmdlIDAuLjEsIGluY2x1c2l2ZS5cbi8vIFBhc3NpbmcgdHJ1ZSBmb3IgdGhlIGV4Y2x1c2l2ZSBwYXJhbWV0ZXIgZXhjbHVkZXMgYm90aCBlbmRwb2ludHMgb2YgdGhlIHJhbmdlLlxualN0YXQucGVyY2VudGlsZSA9IGZ1bmN0aW9uIHBlcmNlbnRpbGUoYXJyLCBrLCBleGNsdXNpdmUpIHtcbiAgdmFyIF9hcnIgPSBhcnIuc2xpY2UoKS5zb3J0KGFzY051bSk7XG4gIHZhciByZWFsSW5kZXggPSBrICogKF9hcnIubGVuZ3RoICsgKGV4Y2x1c2l2ZSA/IDEgOiAtMSkpICsgKGV4Y2x1c2l2ZSA/IDAgOiAxKTtcbiAgdmFyIGluZGV4ID0gcGFyc2VJbnQocmVhbEluZGV4KTtcbiAgdmFyIGZyYWMgPSByZWFsSW5kZXggLSBpbmRleDtcbiAgaWYgKGluZGV4ICsgMSA8IF9hcnIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9hcnJbaW5kZXggLSAxXSArIGZyYWMgKiAoX2FycltpbmRleF0gLSBfYXJyW2luZGV4IC0gMV0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfYXJyW2luZGV4IC0gMV07XG4gIH1cbn1cblxuLy8gVGhlIHBlcmNlbnRpbGUgcmFuayBvZiBzY29yZSBpbiBhIGdpdmVuIGFycmF5LiBSZXR1cm5zIHRoZSBwZXJjZW50YWdlXG4vLyBvZiBhbGwgdmFsdWVzIGluIHRoZSBpbnB1dCBhcnJheSB0aGF0IGFyZSBsZXNzIHRoYW4gKGtpbmQ9J3N0cmljdCcpIG9yXG4vLyBsZXNzIG9yIGVxdWFsIHRoYW4gKGtpbmQ9J3dlYWsnKSBzY29yZS4gRGVmYXVsdCBpcyB3ZWFrLlxualN0YXQucGVyY2VudGlsZU9mU2NvcmUgPSBmdW5jdGlvbiBwZXJjZW50aWxlT2ZTY29yZShhcnIsIHNjb3JlLCBraW5kKSB7XG4gIHZhciBjb3VudGVyID0gMDtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBzdHJpY3QgPSBmYWxzZTtcbiAgdmFyIHZhbHVlLCBpO1xuXG4gIGlmIChraW5kID09PSAnc3RyaWN0JylcbiAgICBzdHJpY3QgPSB0cnVlO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbHVlID0gYXJyW2ldO1xuICAgIGlmICgoc3RyaWN0ICYmIHZhbHVlIDwgc2NvcmUpIHx8XG4gICAgICAgICghc3RyaWN0ICYmIHZhbHVlIDw9IHNjb3JlKSkge1xuICAgICAgY291bnRlcisrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3VudGVyIC8gbGVuO1xufTtcblxuXG4vLyBIaXN0b2dyYW0gKGJpbiBjb3VudCkgZGF0YVxualN0YXQuaGlzdG9ncmFtID0gZnVuY3Rpb24gaGlzdG9ncmFtKGFyciwgYmluQ250KSB7XG4gIGJpbkNudCA9IGJpbkNudCB8fCA0O1xuICB2YXIgZmlyc3QgPSBqU3RhdC5taW4oYXJyKTtcbiAgdmFyIGJpbldpZHRoID0gKGpTdGF0Lm1heChhcnIpIC0gZmlyc3QpIC8gYmluQ250O1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGJpbnMgPSBbXTtcbiAgdmFyIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IGJpbkNudDsgaSsrKVxuICAgIGJpbnNbaV0gPSAwO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgYmluc1tNYXRoLm1pbihNYXRoLmZsb29yKCgoYXJyW2ldIC0gZmlyc3QpIC8gYmluV2lkdGgpKSwgYmluQ250IC0gMSldICs9IDE7XG5cbiAgcmV0dXJuIGJpbnM7XG59O1xuXG5cbi8vIGNvdmFyaWFuY2Ugb2YgdHdvIGFycmF5c1xualN0YXQuY292YXJpYW5jZSA9IGZ1bmN0aW9uIGNvdmFyaWFuY2UoYXJyMSwgYXJyMikge1xuICB2YXIgdSA9IGpTdGF0Lm1lYW4oYXJyMSk7XG4gIHZhciB2ID0galN0YXQubWVhbihhcnIyKTtcbiAgdmFyIGFycjFMZW4gPSBhcnIxLmxlbmd0aDtcbiAgdmFyIHNxX2RldiA9IG5ldyBBcnJheShhcnIxTGVuKTtcbiAgdmFyIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IGFycjFMZW47IGkrKylcbiAgICBzcV9kZXZbaV0gPSAoYXJyMVtpXSAtIHUpICogKGFycjJbaV0gLSB2KTtcblxuICByZXR1cm4galN0YXQuc3VtKHNxX2RldikgLyAoYXJyMUxlbiAtIDEpO1xufTtcblxuXG4vLyAocGVhcnNvbidzKSBwb3B1bGF0aW9uIGNvcnJlbGF0aW9uIGNvZWZmaWNpZW50LCByaG9cbmpTdGF0LmNvcnJjb2VmZiA9IGZ1bmN0aW9uIGNvcnJjb2VmZihhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBqU3RhdC5jb3ZhcmlhbmNlKGFycjEsIGFycjIpIC9cbiAgICAgIGpTdGF0LnN0ZGV2KGFycjEsIDEpIC9cbiAgICAgIGpTdGF0LnN0ZGV2KGFycjIsIDEpO1xufTtcblxuICAvLyAoc3BlYXJtYW4ncykgcmFuayBjb3JyZWxhdGlvbiBjb2VmZmljaWVudCwgc3BcbmpTdGF0LnNwZWFybWFuY29lZmYgPSAgZnVuY3Rpb24gKGFycjEsIGFycjIpIHtcbiAgYXJyMSA9IGpTdGF0LnJhbmsoYXJyMSk7XG4gIGFycjIgPSBqU3RhdC5yYW5rKGFycjIpO1xuICAvL3JldHVybiBwZWFyc29uJ3MgY29ycmVsYXRpb24gb2YgdGhlIHJhbmtzOlxuICByZXR1cm4galN0YXQuY29ycmNvZWZmKGFycjEsIGFycjIpO1xufVxuXG5cbi8vIHN0YXRpc3RpY2FsIHN0YW5kYXJkaXplZCBtb21lbnRzIChnZW5lcmFsIGZvcm0gb2Ygc2tldy9rdXJ0KVxualN0YXQuc3Rhbk1vbWVudCA9IGZ1bmN0aW9uIHN0YW5Nb21lbnQoYXJyLCBuKSB7XG4gIHZhciBtdSA9IGpTdGF0Lm1lYW4oYXJyKTtcbiAgdmFyIHNpZ21hID0galN0YXQuc3RkZXYoYXJyKTtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBza2V3U3VtID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgIHNrZXdTdW0gKz0gTWF0aC5wb3coKGFycltpXSAtIG11KSAvIHNpZ21hLCBuKTtcblxuICByZXR1cm4gc2tld1N1bSAvIGFyci5sZW5ndGg7XG59O1xuXG4vLyAocGVhcnNvbidzKSBtb21lbnQgY29lZmZpY2llbnQgb2Ygc2tld25lc3NcbmpTdGF0LnNrZXduZXNzID0gZnVuY3Rpb24gc2tld25lc3MoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5zdGFuTW9tZW50KGFyciwgMyk7XG59O1xuXG4vLyAocGVhcnNvbidzKSAoZXhjZXNzKSBrdXJ0b3Npc1xualN0YXQua3VydG9zaXMgPSBmdW5jdGlvbiBrdXJ0b3NpcyhhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LnN0YW5Nb21lbnQoYXJyLCA0KSAtIDM7XG59O1xuXG5cbnZhciBqUHJvdG8gPSBqU3RhdC5wcm90b3R5cGU7XG5cblxuLy8gRXh0ZW5kIGpQcm90byB3aXRoIG1ldGhvZCBmb3IgY2FsY3VsYXRpbmcgY3VtdWxhdGl2ZSBzdW1zIGFuZCBwcm9kdWN0cy5cbi8vIFRoaXMgZGlmZmVycyBmcm9tIHRoZSBzaW1pbGFyIGV4dGVuc2lvbiBiZWxvdyBhcyBjdW1zdW0gYW5kIGN1bXByb2Qgc2hvdWxkXG4vLyBub3QgYmUgcnVuIGFnYWluIGluIHRoZSBjYXNlIGZ1bGxib29sID09PSB0cnVlLlxuLy8gSWYgYSBtYXRyaXggaXMgcGFzc2VkLCBhdXRvbWF0aWNhbGx5IGFzc3VtZSBvcGVyYXRpb24gc2hvdWxkIGJlIGRvbmUgb24gdGhlXG4vLyBjb2x1bW5zLlxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIC8vIElmIGEgbWF0cml4IGlzIHBhc3NlZCwgYXV0b21hdGljYWxseSBhc3N1bWUgb3BlcmF0aW9uIHNob3VsZCBiZSBkb25lIG9uXG4gICAgLy8gdGhlIGNvbHVtbnMuXG4gICAgalByb3RvW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKGZ1bGxib29sLCBmdW5jKSB7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgdG1wdGhpcyA9IHRoaXM7XG4gICAgICAvLyBBc3NpZ25tZW50IHJlYXNzaWduYXRpb24gZGVwZW5kaW5nIG9uIGhvdyBwYXJhbWV0ZXJzIHdlcmUgcGFzc2VkIGluLlxuICAgICAgaWYgKGlzRnVuY3Rpb24oZnVsbGJvb2wpKSB7XG4gICAgICAgIGZ1bmMgPSBmdWxsYm9vbDtcbiAgICAgICAgZnVsbGJvb2wgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGlmIGEgY2FsbGJhY2sgd2FzIHBhc3NlZCB3aXRoIHRoZSBmdW5jdGlvbi5cbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZnVuYy5jYWxsKHRtcHRoaXMsIGpQcm90b1twYXNzZnVuY10uY2FsbCh0bXB0aGlzLCBmdWxsYm9vbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBpZiBtYXRyaXggYW5kIHJ1biBjYWxjdWxhdGlvbnMuXG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRtcHRoaXMgPSBmdWxsYm9vbCA9PT0gdHJ1ZSA/IHRoaXMgOiB0aGlzLnRyYW5zcG9zZSgpO1xuICAgICAgICBmb3IgKDsgaSA8IHRtcHRoaXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgYXJyW2ldID0galN0YXRbcGFzc2Z1bmNdKHRtcHRoaXNbaV0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgfVxuICAgICAgLy8gUGFzcyBmdWxsYm9vbCBpZiBvbmx5IHZlY3Rvciwgbm90IGEgbWF0cml4LiBmb3IgdmFyaWFuY2UgYW5kIHN0ZGV2LlxuICAgICAgcmV0dXJuIGpTdGF0W3Bhc3NmdW5jXSh0aGlzWzBdLCBmdWxsYm9vbCk7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoKCdjdW1zdW0gY3VtcHJvZCcpLnNwbGl0KCcgJykpO1xuXG5cbi8vIEV4dGVuZCBqUHJvdG8gd2l0aCBtZXRob2RzIHdoaWNoIGRvbid0IHJlcXVpcmUgYXJndW1lbnRzIGFuZCB3b3JrIG9uIGNvbHVtbnMuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgLy8gSWYgYSBtYXRyaXggaXMgcGFzc2VkLCBhdXRvbWF0aWNhbGx5IGFzc3VtZSBvcGVyYXRpb24gc2hvdWxkIGJlIGRvbmUgb25cbiAgICAvLyB0aGUgY29sdW1ucy5cbiAgICBqUHJvdG9bcGFzc2Z1bmNdID0gZnVuY3Rpb24oZnVsbGJvb2wsIGZ1bmMpIHtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciB0bXB0aGlzID0gdGhpcztcbiAgICAgIC8vIEFzc2lnbm1lbnQgcmVhc3NpZ25hdGlvbiBkZXBlbmRpbmcgb24gaG93IHBhcmFtZXRlcnMgd2VyZSBwYXNzZWQgaW4uXG4gICAgICBpZiAoaXNGdW5jdGlvbihmdWxsYm9vbCkpIHtcbiAgICAgICAgZnVuYyA9IGZ1bGxib29sO1xuICAgICAgICBmdWxsYm9vbCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgaWYgYSBjYWxsYmFjayB3YXMgcGFzc2VkIHdpdGggdGhlIGZ1bmN0aW9uLlxuICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBmdW5jLmNhbGwodG1wdGhpcywgalByb3RvW3Bhc3NmdW5jXS5jYWxsKHRtcHRoaXMsIGZ1bGxib29sKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGlmIG1hdHJpeCBhbmQgcnVuIGNhbGN1bGF0aW9ucy5cbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaWYgKHBhc3NmdW5jICE9PSAnc3Vtcm93JylcbiAgICAgICAgICB0bXB0aGlzID0gZnVsbGJvb2wgPT09IHRydWUgPyB0aGlzIDogdGhpcy50cmFuc3Bvc2UoKTtcbiAgICAgICAgZm9yICg7IGkgPCB0bXB0aGlzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIGFycltpXSA9IGpTdGF0W3Bhc3NmdW5jXSh0bXB0aGlzW2ldKTtcbiAgICAgICAgcmV0dXJuIGZ1bGxib29sID09PSB0cnVlXG4gICAgICAgICAgICA/IGpTdGF0W3Bhc3NmdW5jXShqU3RhdC51dGlscy50b1ZlY3RvcihhcnIpKVxuICAgICAgICAgICAgOiBhcnI7XG4gICAgICB9XG4gICAgICAvLyBQYXNzIGZ1bGxib29sIGlmIG9ubHkgdmVjdG9yLCBub3QgYSBtYXRyaXguIGZvciB2YXJpYW5jZSBhbmQgc3RkZXYuXG4gICAgICByZXR1cm4galN0YXRbcGFzc2Z1bmNdKHRoaXNbMF0sIGZ1bGxib29sKTtcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgoJ3N1bSBzdW1zcXJkIHN1bXNxZXJyIHN1bXJvdyBwcm9kdWN0IG1pbiBtYXggdW5pcXVlIG1lYW4gbWVhbnNxZXJyICcgK1xuICAgICdnZW9tZWFuIG1lZGlhbiBkaWZmIHJhbmsgbW9kZSByYW5nZSB2YXJpYW5jZSBkZXZpYXRpb24gc3RkZXYgbWVhbmRldiAnICtcbiAgICAnbWVkZGV2IGNvZWZmdmFyIHF1YXJ0aWxlcyBoaXN0b2dyYW0gc2tld25lc3Mga3VydG9zaXMnKS5zcGxpdCgnICcpKTtcblxuXG4vLyBFeHRlbmQgalByb3RvIHdpdGggZnVuY3Rpb25zIHRoYXQgdGFrZSBhcmd1bWVudHMuIE9wZXJhdGlvbnMgb24gbWF0cmljZXMgYXJlXG4vLyBkb25lIG9uIGNvbHVtbnMuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalByb3RvW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIHRtcHRoaXMgPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdmFyIGNhbGxiYWNrRnVuY3Rpb247XG5cbiAgICAgIC8vIElmIHRoZSBsYXN0IGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24sIHdlIGFzc3VtZSBpdCdzIGEgY2FsbGJhY2s7IHdlXG4gICAgICAvLyBzdHJpcCB0aGUgY2FsbGJhY2sgb3V0IGFuZCBjYWxsIHRoZSBmdW5jdGlvbiBhZ2Fpbi5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGFyZ3NbYXJncy5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgY2FsbGJhY2tGdW5jdGlvbiA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIGFyZ3NUb1Bhc3MgPSBhcmdzLnNsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjYWxsYmFja0Z1bmN0aW9uLmNhbGwodG1wdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalByb3RvW3Bhc3NmdW5jXS5hcHBseSh0bXB0aGlzLCBhcmdzVG9QYXNzKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gT3RoZXJ3aXNlIHdlIGN1cnJ5IHRoZSBmdW5jdGlvbiBhcmdzIGFuZCBjYWxsIG5vcm1hbGx5LlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tGdW5jdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGN1cnJpZWRGdW5jdGlvbiA9IGZ1bmN0aW9uIGN1cnJpZWRGdW5jdGlvbih2ZWN0b3IpIHtcbiAgICAgICAgICByZXR1cm4galN0YXRbcGFzc2Z1bmNdLmFwcGx5KHRtcHRoaXMsIFt2ZWN0b3JdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIG1hdHJpeCwgcnVuIGNvbHVtbi1ieS1jb2x1bW4uXG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRtcHRoaXMgPSB0bXB0aGlzLnRyYW5zcG9zZSgpO1xuICAgICAgICBmb3IgKDsgaSA8IHRtcHRoaXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgYXJyW2ldID0gY3VycmllZEZ1bmN0aW9uKHRtcHRoaXNbaV0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UgcnVuIG9uIHRoZSB2ZWN0b3IuXG4gICAgICByZXR1cm4gY3VycmllZEZ1bmN0aW9uKHRoaXNbMF0pO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCdxdWFudGlsZXMgcGVyY2VudGlsZU9mU2NvcmUnLnNwbGl0KCcgJykpO1xuXG59KGpTdGF0LCBNYXRoKSk7XG4vLyBTcGVjaWFsIGZ1bmN0aW9ucyAvL1xuKGZ1bmN0aW9uKGpTdGF0LCBNYXRoKSB7XG5cbi8vIExvZy1nYW1tYSBmdW5jdGlvblxualN0YXQuZ2FtbWFsbiA9IGZ1bmN0aW9uIGdhbW1hbG4oeCkge1xuICB2YXIgaiA9IDA7XG4gIHZhciBjb2YgPSBbXG4gICAgNzYuMTgwMDkxNzI5NDcxNDYsIC04Ni41MDUzMjAzMjk0MTY3NywgMjQuMDE0MDk4MjQwODMwOTEsXG4gICAgLTEuMjMxNzM5NTcyNDUwMTU1LCAwLjEyMDg2NTA5NzM4NjYxNzllLTIsIC0wLjUzOTUyMzkzODQ5NTNlLTVcbiAgXTtcbiAgdmFyIHNlciA9IDEuMDAwMDAwMDAwMTkwMDE1O1xuICB2YXIgeHgsIHksIHRtcDtcbiAgdG1wID0gKHkgPSB4eCA9IHgpICsgNS41O1xuICB0bXAgLT0gKHh4ICsgMC41KSAqIE1hdGgubG9nKHRtcCk7XG4gIGZvciAoOyBqIDwgNjsgaisrKVxuICAgIHNlciArPSBjb2Zbal0gLyArK3k7XG4gIHJldHVybiBNYXRoLmxvZygyLjUwNjYyODI3NDYzMTAwMDUgKiBzZXIgLyB4eCkgLSB0bXA7XG59O1xuXG4vKlxuICogbG9nLWdhbW1hIGZ1bmN0aW9uIHRvIHN1cHBvcnQgcG9pc3NvbiBkaXN0cmlidXRpb24gc2FtcGxpbmcuIFRoZVxuICogYWxnb3JpdGhtIGNvbWVzIGZyb20gU1BFQ0ZVTiBieSBTaGFuamllIFpoYW5nIGFuZCBKaWFubWluZyBKaW4gYW5kIHRoZWlyXG4gKiBib29rIFwiQ29tcHV0YXRpb24gb2YgU3BlY2lhbCBGdW5jdGlvbnNcIiwgMTk5NiwgSm9obiBXaWxleSAmIFNvbnMsIEluYy5cbiAqL1xualN0YXQubG9nZ2FtID0gZnVuY3Rpb24gbG9nZ2FtKHgpIHtcbiAgdmFyIHgwLCB4MiwgeHAsIGdsLCBnbDA7XG4gIHZhciBrLCBuO1xuXG4gIHZhciBhID0gWzguMzMzMzMzMzMzMzMzMzMzZS0wMiwgLTIuNzc3Nzc3Nzc3Nzc3Nzc4ZS0wMyxcbiAgICAgICAgICA3LjkzNjUwNzkzNjUwNzkzN2UtMDQsIC01Ljk1MjM4MDk1MjM4MDk1MmUtMDQsXG4gICAgICAgICAgOC40MTc1MDg0MTc1MDg0MThlLTA0LCAtMS45MTc1MjY5MTc1MjY5MThlLTAzLFxuICAgICAgICAgIDYuNDEwMjU2NDEwMjU2NDEwZS0wMywgLTIuOTU1MDY1MzU5NDc3MTI0ZS0wMixcbiAgICAgICAgICAxLjc5NjQ0MzcyMzY4ODMwN2UtMDEsIC0xLjM5MjQzMjIxNjkwNTkwZSswMF07XG4gIHgwID0geDtcbiAgbiA9IDA7XG4gIGlmICgoeCA9PSAxLjApIHx8ICh4ID09IDIuMCkpIHtcbiAgICAgIHJldHVybiAwLjA7XG4gIH1cbiAgaWYgKHggPD0gNy4wKSB7XG4gICAgICBuID0gTWF0aC5mbG9vcig3IC0geCk7XG4gICAgICB4MCA9IHggKyBuO1xuICB9XG4gIHgyID0gMS4wIC8gKHgwICogeDApO1xuICB4cCA9IDIgKiBNYXRoLlBJO1xuICBnbDAgPSBhWzldO1xuICBmb3IgKGsgPSA4OyBrID49IDA7IGstLSkge1xuICAgICAgZ2wwICo9IHgyO1xuICAgICAgZ2wwICs9IGFba107XG4gIH1cbiAgZ2wgPSBnbDAgLyB4MCArIDAuNSAqIE1hdGgubG9nKHhwKSArICh4MCAtIDAuNSkgKiBNYXRoLmxvZyh4MCkgLSB4MDtcbiAgaWYgKHggPD0gNy4wKSB7XG4gICAgICBmb3IgKGsgPSAxOyBrIDw9IG47IGsrKykge1xuICAgICAgICAgIGdsIC09IE1hdGgubG9nKHgwIC0gMS4wKTtcbiAgICAgICAgICB4MCAtPSAxLjA7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGdsO1xufVxuXG4vLyBnYW1tYSBvZiB4XG5qU3RhdC5nYW1tYWZuID0gZnVuY3Rpb24gZ2FtbWFmbih4KSB7XG4gIHZhciBwID0gWy0xLjcxNjE4NTEzODg2NTQ5NSwgMjQuNzY1NjUwODA1NTc1OTIsIC0zNzkuODA0MjU2NDcwOTQ1NjMsXG4gICAgICAgICAgIDYyOS4zMzExNTUzMTI4MTg0LCA4NjYuOTY2MjAyNzkwNDEzMywgLTMxNDUxLjI3Mjk2ODg0ODM2NyxcbiAgICAgICAgICAgLTM2MTQ0LjQxMzQxODY5MTE3NiwgNjY0NTYuMTQzODIwMjQwNTRcbiAgXTtcbiAgdmFyIHEgPSBbLTMwLjg0MDIzMDAxMTk3MzksIDMxNS4zNTA2MjY5Nzk2MDQxNiwgLTEwMTUuMTU2MzY3NDkwMjE5MixcbiAgICAgICAgICAgLTMxMDcuNzcxNjcxNTcyMzExLCAyMjUzOC4xMTg0MjA5ODAxNTEsIDQ3NTUuODQ2Mjc3NTI3ODgxMSxcbiAgICAgICAgICAgLTEzNDY1OS45NTk4NjQ5NjkzLCAtMTE1MTMyLjI1OTY3NTU1MzVdO1xuICB2YXIgZmFjdCA9IGZhbHNlO1xuICB2YXIgbiA9IDA7XG4gIHZhciB4ZGVuID0gMDtcbiAgdmFyIHhudW0gPSAwO1xuICB2YXIgeSA9IHg7XG4gIHZhciBpLCB6LCB5aSwgcmVzO1xuICBpZiAoeCA+IDE3MS42MjQzNzY5NTM2MDc2KSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIGlmICh5IDw9IDApIHtcbiAgICByZXMgPSB5ICUgMSArIDMuNmUtMTY7XG4gICAgaWYgKHJlcykge1xuICAgICAgZmFjdCA9ICghKHkgJiAxKSA/IDEgOiAtMSkgKiBNYXRoLlBJIC8gTWF0aC5zaW4oTWF0aC5QSSAqIHJlcyk7XG4gICAgICB5ID0gMSAtIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG4gIH1cbiAgeWkgPSB5O1xuICBpZiAoeSA8IDEpIHtcbiAgICB6ID0geSsrO1xuICB9IGVsc2Uge1xuICAgIHogPSAoeSAtPSBuID0gKHkgfCAwKSAtIDEpIC0gMTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgODsgKytpKSB7XG4gICAgeG51bSA9ICh4bnVtICsgcFtpXSkgKiB6O1xuICAgIHhkZW4gPSB4ZGVuICogeiArIHFbaV07XG4gIH1cbiAgcmVzID0geG51bSAvIHhkZW4gKyAxO1xuICBpZiAoeWkgPCB5KSB7XG4gICAgcmVzIC89IHlpO1xuICB9IGVsc2UgaWYgKHlpID4geSkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIHJlcyAqPSB5O1xuICAgICAgeSsrO1xuICAgIH1cbiAgfVxuICBpZiAoZmFjdCkge1xuICAgIHJlcyA9IGZhY3QgLyByZXM7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cblxuLy8gbG93ZXIgaW5jb21wbGV0ZSBnYW1tYSBmdW5jdGlvbiwgd2hpY2ggaXMgdXN1YWxseSB0eXBlc2V0IHdpdGggYVxuLy8gbG93ZXItY2FzZSBncmVlayBnYW1tYSBhcyB0aGUgZnVuY3Rpb24gc3ltYm9sXG5qU3RhdC5nYW1tYXAgPSBmdW5jdGlvbiBnYW1tYXAoYSwgeCkge1xuICByZXR1cm4galN0YXQubG93UmVnR2FtbWEoYSwgeCkgKiBqU3RhdC5nYW1tYWZuKGEpO1xufTtcblxuXG4vLyBUaGUgbG93ZXIgcmVndWxhcml6ZWQgaW5jb21wbGV0ZSBnYW1tYSBmdW5jdGlvbiwgdXN1YWxseSB3cml0dGVuIFAoYSx4KVxualN0YXQubG93UmVnR2FtbWEgPSBmdW5jdGlvbiBsb3dSZWdHYW1tYShhLCB4KSB7XG4gIHZhciBhbG4gPSBqU3RhdC5nYW1tYWxuKGEpO1xuICB2YXIgYXAgPSBhO1xuICB2YXIgc3VtID0gMSAvIGE7XG4gIHZhciBkZWwgPSBzdW07XG4gIHZhciBiID0geCArIDEgLSBhO1xuICB2YXIgYyA9IDEgLyAxLjBlLTMwO1xuICB2YXIgZCA9IDEgLyBiO1xuICB2YXIgaCA9IGQ7XG4gIHZhciBpID0gMTtcbiAgLy8gY2FsY3VsYXRlIG1heGltdW0gbnVtYmVyIG9mIGl0dGVyYXRpb25zIHJlcXVpcmVkIGZvciBhXG4gIHZhciBJVE1BWCA9IC1+KE1hdGgubG9nKChhID49IDEpID8gYSA6IDEgLyBhKSAqIDguNSArIGEgKiAwLjQgKyAxNyk7XG4gIHZhciBhbjtcblxuICBpZiAoeCA8IDAgfHwgYSA8PSAwKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfSBlbHNlIGlmICh4IDwgYSArIDEpIHtcbiAgICBmb3IgKDsgaSA8PSBJVE1BWDsgaSsrKSB7XG4gICAgICBzdW0gKz0gZGVsICo9IHggLyArK2FwO1xuICAgIH1cbiAgICByZXR1cm4gKHN1bSAqIE1hdGguZXhwKC14ICsgYSAqIE1hdGgubG9nKHgpIC0gKGFsbikpKTtcbiAgfVxuXG4gIGZvciAoOyBpIDw9IElUTUFYOyBpKyspIHtcbiAgICBhbiA9IC1pICogKGkgLSBhKTtcbiAgICBiICs9IDI7XG4gICAgZCA9IGFuICogZCArIGI7XG4gICAgYyA9IGIgKyBhbiAvIGM7XG4gICAgZCA9IDEgLyBkO1xuICAgIGggKj0gZCAqIGM7XG4gIH1cblxuICByZXR1cm4gKDEgLSBoICogTWF0aC5leHAoLXggKyBhICogTWF0aC5sb2coeCkgLSAoYWxuKSkpO1xufTtcblxuLy8gbmF0dXJhbCBsb2cgZmFjdG9yaWFsIG9mIG5cbmpTdGF0LmZhY3RvcmlhbGxuID0gZnVuY3Rpb24gZmFjdG9yaWFsbG4obikge1xuICByZXR1cm4gbiA8IDAgPyBOYU4gOiBqU3RhdC5nYW1tYWxuKG4gKyAxKTtcbn07XG5cbi8vIGZhY3RvcmlhbCBvZiBuXG5qU3RhdC5mYWN0b3JpYWwgPSBmdW5jdGlvbiBmYWN0b3JpYWwobikge1xuICByZXR1cm4gbiA8IDAgPyBOYU4gOiBqU3RhdC5nYW1tYWZuKG4gKyAxKTtcbn07XG5cbi8vIGNvbWJpbmF0aW9ucyBvZiBuLCBtXG5qU3RhdC5jb21iaW5hdGlvbiA9IGZ1bmN0aW9uIGNvbWJpbmF0aW9uKG4sIG0pIHtcbiAgLy8gbWFrZSBzdXJlIG4gb3IgbSBkb24ndCBleGNlZWQgdGhlIHVwcGVyIGxpbWl0IG9mIHVzYWJsZSB2YWx1ZXNcbiAgcmV0dXJuIChuID4gMTcwIHx8IG0gPiAxNzApXG4gICAgICA/IE1hdGguZXhwKGpTdGF0LmNvbWJpbmF0aW9ubG4obiwgbSkpXG4gICAgICA6IChqU3RhdC5mYWN0b3JpYWwobikgLyBqU3RhdC5mYWN0b3JpYWwobSkpIC8galN0YXQuZmFjdG9yaWFsKG4gLSBtKTtcbn07XG5cblxualN0YXQuY29tYmluYXRpb25sbiA9IGZ1bmN0aW9uIGNvbWJpbmF0aW9ubG4obiwgbSl7XG4gIHJldHVybiBqU3RhdC5mYWN0b3JpYWxsbihuKSAtIGpTdGF0LmZhY3RvcmlhbGxuKG0pIC0galN0YXQuZmFjdG9yaWFsbG4obiAtIG0pO1xufTtcblxuXG4vLyBwZXJtdXRhdGlvbnMgb2YgbiwgbVxualN0YXQucGVybXV0YXRpb24gPSBmdW5jdGlvbiBwZXJtdXRhdGlvbihuLCBtKSB7XG4gIHJldHVybiBqU3RhdC5mYWN0b3JpYWwobikgLyBqU3RhdC5mYWN0b3JpYWwobiAtIG0pO1xufTtcblxuXG4vLyBiZXRhIGZ1bmN0aW9uXG5qU3RhdC5iZXRhZm4gPSBmdW5jdGlvbiBiZXRhZm4oeCwgeSkge1xuICAvLyBlbnN1cmUgYXJndW1lbnRzIGFyZSBwb3NpdGl2ZVxuICBpZiAoeCA8PSAwIHx8IHkgPD0gMClcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAvLyBtYWtlIHN1cmUgeCArIHkgZG9lc24ndCBleGNlZWQgdGhlIHVwcGVyIGxpbWl0IG9mIHVzYWJsZSB2YWx1ZXNcbiAgcmV0dXJuICh4ICsgeSA+IDE3MClcbiAgICAgID8gTWF0aC5leHAoalN0YXQuYmV0YWxuKHgsIHkpKVxuICAgICAgOiBqU3RhdC5nYW1tYWZuKHgpICogalN0YXQuZ2FtbWFmbih5KSAvIGpTdGF0LmdhbW1hZm4oeCArIHkpO1xufTtcblxuXG4vLyBuYXR1cmFsIGxvZ2FyaXRobSBvZiBiZXRhIGZ1bmN0aW9uXG5qU3RhdC5iZXRhbG4gPSBmdW5jdGlvbiBiZXRhbG4oeCwgeSkge1xuICByZXR1cm4galN0YXQuZ2FtbWFsbih4KSArIGpTdGF0LmdhbW1hbG4oeSkgLSBqU3RhdC5nYW1tYWxuKHggKyB5KTtcbn07XG5cblxuLy8gRXZhbHVhdGVzIHRoZSBjb250aW51ZWQgZnJhY3Rpb24gZm9yIGluY29tcGxldGUgYmV0YSBmdW5jdGlvbiBieSBtb2RpZmllZFxuLy8gTGVudHoncyBtZXRob2QuXG5qU3RhdC5iZXRhY2YgPSBmdW5jdGlvbiBiZXRhY2YoeCwgYSwgYikge1xuICB2YXIgZnBtaW4gPSAxZS0zMDtcbiAgdmFyIG0gPSAxO1xuICB2YXIgcWFiID0gYSArIGI7XG4gIHZhciBxYXAgPSBhICsgMTtcbiAgdmFyIHFhbSA9IGEgLSAxO1xuICB2YXIgYyA9IDE7XG4gIHZhciBkID0gMSAtIHFhYiAqIHggLyBxYXA7XG4gIHZhciBtMiwgYWEsIGRlbCwgaDtcblxuICAvLyBUaGVzZSBxJ3Mgd2lsbCBiZSB1c2VkIGluIGZhY3RvcnMgdGhhdCBvY2N1ciBpbiB0aGUgY29lZmZpY2llbnRzXG4gIGlmIChNYXRoLmFicyhkKSA8IGZwbWluKVxuICAgIGQgPSBmcG1pbjtcbiAgZCA9IDEgLyBkO1xuICBoID0gZDtcblxuICBmb3IgKDsgbSA8PSAxMDA7IG0rKykge1xuICAgIG0yID0gMiAqIG07XG4gICAgYWEgPSBtICogKGIgLSBtKSAqIHggLyAoKHFhbSArIG0yKSAqIChhICsgbTIpKTtcbiAgICAvLyBPbmUgc3RlcCAodGhlIGV2ZW4gb25lKSBvZiB0aGUgcmVjdXJyZW5jZVxuICAgIGQgPSAxICsgYWEgKiBkO1xuICAgIGlmIChNYXRoLmFicyhkKSA8IGZwbWluKVxuICAgICAgZCA9IGZwbWluO1xuICAgIGMgPSAxICsgYWEgLyBjO1xuICAgIGlmIChNYXRoLmFicyhjKSA8IGZwbWluKVxuICAgICAgYyA9IGZwbWluO1xuICAgIGQgPSAxIC8gZDtcbiAgICBoICo9IGQgKiBjO1xuICAgIGFhID0gLShhICsgbSkgKiAocWFiICsgbSkgKiB4IC8gKChhICsgbTIpICogKHFhcCArIG0yKSk7XG4gICAgLy8gTmV4dCBzdGVwIG9mIHRoZSByZWN1cnJlbmNlICh0aGUgb2RkIG9uZSlcbiAgICBkID0gMSArIGFhICogZDtcbiAgICBpZiAoTWF0aC5hYnMoZCkgPCBmcG1pbilcbiAgICAgIGQgPSBmcG1pbjtcbiAgICBjID0gMSArIGFhIC8gYztcbiAgICBpZiAoTWF0aC5hYnMoYykgPCBmcG1pbilcbiAgICAgIGMgPSBmcG1pbjtcbiAgICBkID0gMSAvIGQ7XG4gICAgZGVsID0gZCAqIGM7XG4gICAgaCAqPSBkZWw7XG4gICAgaWYgKE1hdGguYWJzKGRlbCAtIDEuMCkgPCAzZS03KVxuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gaDtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgbG93ZXIgcmVndWxhcml6ZWQgaW5vbXBsZXRlIGdhbW1hIGZ1bmN0aW9uXG5qU3RhdC5nYW1tYXBpbnYgPSBmdW5jdGlvbiBnYW1tYXBpbnYocCwgYSkge1xuICB2YXIgaiA9IDA7XG4gIHZhciBhMSA9IGEgLSAxO1xuICB2YXIgRVBTID0gMWUtODtcbiAgdmFyIGdsbiA9IGpTdGF0LmdhbW1hbG4oYSk7XG4gIHZhciB4LCBlcnIsIHQsIHUsIHBwLCBsbmExLCBhZmFjO1xuXG4gIGlmIChwID49IDEpXG4gICAgcmV0dXJuIE1hdGgubWF4KDEwMCwgYSArIDEwMCAqIE1hdGguc3FydChhKSk7XG4gIGlmIChwIDw9IDApXG4gICAgcmV0dXJuIDA7XG4gIGlmIChhID4gMSkge1xuICAgIGxuYTEgPSBNYXRoLmxvZyhhMSk7XG4gICAgYWZhYyA9IE1hdGguZXhwKGExICogKGxuYTEgLSAxKSAtIGdsbik7XG4gICAgcHAgPSAocCA8IDAuNSkgPyBwIDogMSAtIHA7XG4gICAgdCA9IE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHBwKSk7XG4gICAgeCA9ICgyLjMwNzUzICsgdCAqIDAuMjcwNjEpIC8gKDEgKyB0ICogKDAuOTkyMjkgKyB0ICogMC4wNDQ4MSkpIC0gdDtcbiAgICBpZiAocCA8IDAuNSlcbiAgICAgIHggPSAteDtcbiAgICB4ID0gTWF0aC5tYXgoMWUtMyxcbiAgICAgICAgICAgICAgICAgYSAqIE1hdGgucG93KDEgLSAxIC8gKDkgKiBhKSAtIHggLyAoMyAqIE1hdGguc3FydChhKSksIDMpKTtcbiAgfSBlbHNlIHtcbiAgICB0ID0gMSAtIGEgKiAoMC4yNTMgKyBhICogMC4xMik7XG4gICAgaWYgKHAgPCB0KVxuICAgICAgeCA9IE1hdGgucG93KHAgLyB0LCAxIC8gYSk7XG4gICAgZWxzZVxuICAgICAgeCA9IDEgLSBNYXRoLmxvZygxIC0gKHAgLSB0KSAvICgxIC0gdCkpO1xuICB9XG5cbiAgZm9yKDsgaiA8IDEyOyBqKyspIHtcbiAgICBpZiAoeCA8PSAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZXJyID0galN0YXQubG93UmVnR2FtbWEoYSwgeCkgLSBwO1xuICAgIGlmIChhID4gMSlcbiAgICAgIHQgPSBhZmFjICogTWF0aC5leHAoLSh4IC0gYTEpICsgYTEgKiAoTWF0aC5sb2coeCkgLSBsbmExKSk7XG4gICAgZWxzZVxuICAgICAgdCA9IE1hdGguZXhwKC14ICsgYTEgKiBNYXRoLmxvZyh4KSAtIGdsbik7XG4gICAgdSA9IGVyciAvIHQ7XG4gICAgeCAtPSAodCA9IHUgLyAoMSAtIDAuNSAqIE1hdGgubWluKDEsIHUgKiAoKGEgLSAxKSAvIHggLSAxKSkpKTtcbiAgICBpZiAoeCA8PSAwKVxuICAgICAgeCA9IDAuNSAqICh4ICsgdCk7XG4gICAgaWYgKE1hdGguYWJzKHQpIDwgRVBTICogeClcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHg7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGVycm9yIGZ1bmN0aW9uIGVyZih4KVxualN0YXQuZXJmID0gZnVuY3Rpb24gZXJmKHgpIHtcbiAgdmFyIGNvZiA9IFstMS4zMDI2NTM3MTk3ODE3MDk0LCA2LjQxOTY5NzkyMzU2NDkwMjZlLTEsIDEuOTQ3NjQ3MzIwNDE4NTgzNmUtMixcbiAgICAgICAgICAgICAtOS41NjE1MTQ3ODY4MDg2MzFlLTMsIC05LjQ2NTk1MzQ0NDgyMDM2ZS00LCAzLjY2ODM5NDk3ODUyNzYxZS00LFxuICAgICAgICAgICAgIDQuMjUyMzMyNDgwNjkwN2UtNSwgLTIuMDI3ODU3ODExMjUzNGUtNSwgLTEuNjI0MjkwMDA0NjQ3ZS02LFxuICAgICAgICAgICAgIDEuMzAzNjU1ODM1NTgwZS02LCAxLjU2MjY0NDE3MjJlLTgsIC04LjUyMzgwOTU5MTVlLTgsXG4gICAgICAgICAgICAgNi41MjkwNTQ0MzllLTksIDUuMDU5MzQzNDk1ZS05LCAtOS45MTM2NDE1NmUtMTAsXG4gICAgICAgICAgICAgLTIuMjczNjUxMjJlLTEwLCA5LjY0Njc5MTFlLTExLCAyLjM5NDAzOGUtMTIsXG4gICAgICAgICAgICAgLTYuODg2MDI3ZS0xMiwgOC45NDQ4N2UtMTMsIDMuMTMwOTJlLTEzLFxuICAgICAgICAgICAgIC0xLjEyNzA4ZS0xMywgMy44MWUtMTYsIDcuMTA2ZS0xNSxcbiAgICAgICAgICAgICAtMS41MjNlLTE1LCAtOS40ZS0xNywgMS4yMWUtMTYsXG4gICAgICAgICAgICAgLTIuOGUtMTddO1xuICB2YXIgaiA9IGNvZi5sZW5ndGggLSAxO1xuICB2YXIgaXNuZWcgPSBmYWxzZTtcbiAgdmFyIGQgPSAwO1xuICB2YXIgZGQgPSAwO1xuICB2YXIgdCwgdHksIHRtcCwgcmVzO1xuXG4gIGlmICh4IDwgMCkge1xuICAgIHggPSAteDtcbiAgICBpc25lZyA9IHRydWU7XG4gIH1cblxuICB0ID0gMiAvICgyICsgeCk7XG4gIHR5ID0gNCAqIHQgLSAyO1xuXG4gIGZvcig7IGogPiAwOyBqLS0pIHtcbiAgICB0bXAgPSBkO1xuICAgIGQgPSB0eSAqIGQgLSBkZCArIGNvZltqXTtcbiAgICBkZCA9IHRtcDtcbiAgfVxuXG4gIHJlcyA9IHQgKiBNYXRoLmV4cCgteCAqIHggKyAwLjUgKiAoY29mWzBdICsgdHkgKiBkKSAtIGRkKTtcbiAgcmV0dXJuIGlzbmVnID8gcmVzIC0gMSA6IDEgLSByZXM7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGNvbXBsbWVudGFyeSBlcnJvciBmdW5jdGlvbiBlcmZjKHgpXG5qU3RhdC5lcmZjID0gZnVuY3Rpb24gZXJmYyh4KSB7XG4gIHJldHVybiAxIC0galN0YXQuZXJmKHgpO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wbGVtZW50YXJ5IGVycm9yIGZ1bmN0aW9uXG5qU3RhdC5lcmZjaW52ID0gZnVuY3Rpb24gZXJmY2ludihwKSB7XG4gIHZhciBqID0gMDtcbiAgdmFyIHgsIGVyciwgdCwgcHA7XG4gIGlmIChwID49IDIpXG4gICAgcmV0dXJuIC0xMDA7XG4gIGlmIChwIDw9IDApXG4gICAgcmV0dXJuIDEwMDtcbiAgcHAgPSAocCA8IDEpID8gcCA6IDIgLSBwO1xuICB0ID0gTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocHAgLyAyKSk7XG4gIHggPSAtMC43MDcxMSAqICgoMi4zMDc1MyArIHQgKiAwLjI3MDYxKSAvXG4gICAgICAgICAgICAgICAgICAoMSArIHQgKiAoMC45OTIyOSArIHQgKiAwLjA0NDgxKSkgLSB0KTtcbiAgZm9yICg7IGogPCAyOyBqKyspIHtcbiAgICBlcnIgPSBqU3RhdC5lcmZjKHgpIC0gcHA7XG4gICAgeCArPSBlcnIgLyAoMS4xMjgzNzkxNjcwOTU1MTI1NyAqIE1hdGguZXhwKC14ICogeCkgLSB4ICogZXJyKTtcbiAgfVxuICByZXR1cm4gKHAgPCAxKSA/IHggOiAteDtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgaW5jb21wbGV0ZSBiZXRhIGZ1bmN0aW9uXG5qU3RhdC5pYmV0YWludiA9IGZ1bmN0aW9uIGliZXRhaW52KHAsIGEsIGIpIHtcbiAgdmFyIEVQUyA9IDFlLTg7XG4gIHZhciBhMSA9IGEgLSAxO1xuICB2YXIgYjEgPSBiIC0gMTtcbiAgdmFyIGogPSAwO1xuICB2YXIgbG5hLCBsbmIsIHBwLCB0LCB1LCBlcnIsIHgsIGFsLCBoLCB3LCBhZmFjO1xuICBpZiAocCA8PSAwKVxuICAgIHJldHVybiAwO1xuICBpZiAocCA+PSAxKVxuICAgIHJldHVybiAxO1xuICBpZiAoYSA+PSAxICYmIGIgPj0gMSkge1xuICAgIHBwID0gKHAgPCAwLjUpID8gcCA6IDEgLSBwO1xuICAgIHQgPSBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhwcCkpO1xuICAgIHggPSAoMi4zMDc1MyArIHQgKiAwLjI3MDYxKSAvICgxICsgdCogKDAuOTkyMjkgKyB0ICogMC4wNDQ4MSkpIC0gdDtcbiAgICBpZiAocCA8IDAuNSlcbiAgICAgIHggPSAteDtcbiAgICBhbCA9ICh4ICogeCAtIDMpIC8gNjtcbiAgICBoID0gMiAvICgxIC8gKDIgKiBhIC0gMSkgICsgMSAvICgyICogYiAtIDEpKTtcbiAgICB3ID0gKHggKiBNYXRoLnNxcnQoYWwgKyBoKSAvIGgpIC0gKDEgLyAoMiAqIGIgLSAxKSAtIDEgLyAoMiAqIGEgLSAxKSkgKlxuICAgICAgICAoYWwgKyA1IC8gNiAtIDIgLyAoMyAqIGgpKTtcbiAgICB4ID0gYSAvIChhICsgYiAqIE1hdGguZXhwKDIgKiB3KSk7XG4gIH0gZWxzZSB7XG4gICAgbG5hID0gTWF0aC5sb2coYSAvIChhICsgYikpO1xuICAgIGxuYiA9IE1hdGgubG9nKGIgLyAoYSArIGIpKTtcbiAgICB0ID0gTWF0aC5leHAoYSAqIGxuYSkgLyBhO1xuICAgIHUgPSBNYXRoLmV4cChiICogbG5iKSAvIGI7XG4gICAgdyA9IHQgKyB1O1xuICAgIGlmIChwIDwgdCAvIHcpXG4gICAgICB4ID0gTWF0aC5wb3coYSAqIHcgKiBwLCAxIC8gYSk7XG4gICAgZWxzZVxuICAgICAgeCA9IDEgLSBNYXRoLnBvdyhiICogdyAqICgxIC0gcCksIDEgLyBiKTtcbiAgfVxuICBhZmFjID0gLWpTdGF0LmdhbW1hbG4oYSkgLSBqU3RhdC5nYW1tYWxuKGIpICsgalN0YXQuZ2FtbWFsbihhICsgYik7XG4gIGZvcig7IGogPCAxMDsgaisrKSB7XG4gICAgaWYgKHggPT09IDAgfHwgeCA9PT0gMSlcbiAgICAgIHJldHVybiB4O1xuICAgIGVyciA9IGpTdGF0LmliZXRhKHgsIGEsIGIpIC0gcDtcbiAgICB0ID0gTWF0aC5leHAoYTEgKiBNYXRoLmxvZyh4KSArIGIxICogTWF0aC5sb2coMSAtIHgpICsgYWZhYyk7XG4gICAgdSA9IGVyciAvIHQ7XG4gICAgeCAtPSAodCA9IHUgLyAoMSAtIDAuNSAqIE1hdGgubWluKDEsIHUgKiAoYTEgLyB4IC0gYjEgLyAoMSAtIHgpKSkpKTtcbiAgICBpZiAoeCA8PSAwKVxuICAgICAgeCA9IDAuNSAqICh4ICsgdCk7XG4gICAgaWYgKHggPj0gMSlcbiAgICAgIHggPSAwLjUgKiAoeCArIHQgKyAxKTtcbiAgICBpZiAoTWF0aC5hYnModCkgPCBFUFMgKiB4ICYmIGogPiAwKVxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHg7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGluY29tcGxldGUgYmV0YSBmdW5jdGlvbiBJX3goYSxiKVxualN0YXQuaWJldGEgPSBmdW5jdGlvbiBpYmV0YSh4LCBhLCBiKSB7XG4gIC8vIEZhY3RvcnMgaW4gZnJvbnQgb2YgdGhlIGNvbnRpbnVlZCBmcmFjdGlvbi5cbiAgdmFyIGJ0ID0gKHggPT09IDAgfHwgeCA9PT0gMSkgPyAgMCA6XG4gICAgTWF0aC5leHAoalN0YXQuZ2FtbWFsbihhICsgYikgLSBqU3RhdC5nYW1tYWxuKGEpIC1cbiAgICAgICAgICAgICBqU3RhdC5nYW1tYWxuKGIpICsgYSAqIE1hdGgubG9nKHgpICsgYiAqXG4gICAgICAgICAgICAgTWF0aC5sb2coMSAtIHgpKTtcbiAgaWYgKHggPCAwIHx8IHggPiAxKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKHggPCAoYSArIDEpIC8gKGEgKyBiICsgMikpXG4gICAgLy8gVXNlIGNvbnRpbnVlZCBmcmFjdGlvbiBkaXJlY3RseS5cbiAgICByZXR1cm4gYnQgKiBqU3RhdC5iZXRhY2YoeCwgYSwgYikgLyBhO1xuICAvLyBlbHNlIHVzZSBjb250aW51ZWQgZnJhY3Rpb24gYWZ0ZXIgbWFraW5nIHRoZSBzeW1tZXRyeSB0cmFuc2Zvcm1hdGlvbi5cbiAgcmV0dXJuIDEgLSBidCAqIGpTdGF0LmJldGFjZigxIC0geCwgYiwgYSkgLyBiO1xufTtcblxuXG4vLyBSZXR1cm5zIGEgbm9ybWFsIGRldmlhdGUgKG11PTAsIHNpZ21hPTEpLlxuLy8gSWYgbiBhbmQgbSBhcmUgc3BlY2lmaWVkIGl0IHJldHVybnMgYSBvYmplY3Qgb2Ygbm9ybWFsIGRldmlhdGVzLlxualN0YXQucmFuZG4gPSBmdW5jdGlvbiByYW5kbihuLCBtKSB7XG4gIHZhciB1LCB2LCB4LCB5LCBxO1xuICBpZiAoIW0pXG4gICAgbSA9IG47XG4gIGlmIChuKVxuICAgIHJldHVybiBqU3RhdC5jcmVhdGUobiwgbSwgZnVuY3Rpb24oKSB7IHJldHVybiBqU3RhdC5yYW5kbigpOyB9KTtcbiAgZG8ge1xuICAgIHUgPSBqU3RhdC5fcmFuZG9tX2ZuKCk7XG4gICAgdiA9IDEuNzE1NiAqIChqU3RhdC5fcmFuZG9tX2ZuKCkgLSAwLjUpO1xuICAgIHggPSB1IC0gMC40NDk4NzE7XG4gICAgeSA9IE1hdGguYWJzKHYpICsgMC4zODY1OTU7XG4gICAgcSA9IHggKiB4ICsgeSAqICgwLjE5NjAwICogeSAtIDAuMjU0NzIgKiB4KTtcbiAgfSB3aGlsZSAocSA+IDAuMjc1OTcgJiYgKHEgPiAwLjI3ODQ2IHx8IHYgKiB2ID4gLTQgKiBNYXRoLmxvZyh1KSAqIHUgKiB1KSk7XG4gIHJldHVybiB2IC8gdTtcbn07XG5cblxuLy8gUmV0dXJucyBhIGdhbW1hIGRldmlhdGUgYnkgdGhlIG1ldGhvZCBvZiBNYXJzYWdsaWEgYW5kIFRzYW5nLlxualN0YXQucmFuZGcgPSBmdW5jdGlvbiByYW5kZyhzaGFwZSwgbiwgbSkge1xuICB2YXIgb2FscGggPSBzaGFwZTtcbiAgdmFyIGExLCBhMiwgdSwgdiwgeCwgbWF0O1xuICBpZiAoIW0pXG4gICAgbSA9IG47XG4gIGlmICghc2hhcGUpXG4gICAgc2hhcGUgPSAxO1xuICBpZiAobikge1xuICAgIG1hdCA9IGpTdGF0Lnplcm9zKG4sbSk7XG4gICAgbWF0LmFsdGVyKGZ1bmN0aW9uKCkgeyByZXR1cm4galN0YXQucmFuZGcoc2hhcGUpOyB9KTtcbiAgICByZXR1cm4gbWF0O1xuICB9XG4gIGlmIChzaGFwZSA8IDEpXG4gICAgc2hhcGUgKz0gMTtcbiAgYTEgPSBzaGFwZSAtIDEgLyAzO1xuICBhMiA9IDEgLyBNYXRoLnNxcnQoOSAqIGExKTtcbiAgZG8ge1xuICAgIGRvIHtcbiAgICAgIHggPSBqU3RhdC5yYW5kbigpO1xuICAgICAgdiA9IDEgKyBhMiAqIHg7XG4gICAgfSB3aGlsZSh2IDw9IDApO1xuICAgIHYgPSB2ICogdiAqIHY7XG4gICAgdSA9IGpTdGF0Ll9yYW5kb21fZm4oKTtcbiAgfSB3aGlsZSh1ID4gMSAtIDAuMzMxICogTWF0aC5wb3coeCwgNCkgJiZcbiAgICAgICAgICBNYXRoLmxvZyh1KSA+IDAuNSAqIHgqeCArIGExICogKDEgLSB2ICsgTWF0aC5sb2codikpKTtcbiAgLy8gYWxwaGEgPiAxXG4gIGlmIChzaGFwZSA9PSBvYWxwaClcbiAgICByZXR1cm4gYTEgKiB2O1xuICAvLyBhbHBoYSA8IDFcbiAgZG8ge1xuICAgIHUgPSBqU3RhdC5fcmFuZG9tX2ZuKCk7XG4gIH0gd2hpbGUodSA9PT0gMCk7XG4gIHJldHVybiBNYXRoLnBvdyh1LCAxIC8gb2FscGgpICogYTEgKiB2O1xufTtcblxuXG4vLyBtYWtpbmcgdXNlIG9mIHN0YXRpYyBtZXRob2RzIG9uIHRoZSBpbnN0YW5jZVxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpTdGF0LmZuW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGpTdGF0KFxuICAgICAgICAgIGpTdGF0Lm1hcCh0aGlzLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4galN0YXRbcGFzc2Z1bmNdKHZhbHVlKTsgfSkpO1xuICAgIH1cbiAgfSkoZnVuY3NbaV0pO1xufSkoJ2dhbW1hbG4gZ2FtbWFmbiBmYWN0b3JpYWwgZmFjdG9yaWFsbG4nLnNwbGl0KCcgJykpO1xuXG5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqU3RhdC5mbltwYXNzZnVuY10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBqU3RhdChqU3RhdFtwYXNzZnVuY10uYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoJ3JhbmRuJy5zcGxpdCgnICcpKTtcblxufShqU3RhdCwgTWF0aCkpO1xuKGZ1bmN0aW9uKGpTdGF0LCBNYXRoKSB7XG5cbi8vIGdlbmVyYXRlIGFsbCBkaXN0cmlidXRpb24gaW5zdGFuY2UgbWV0aG9kc1xuKGZ1bmN0aW9uKGxpc3QpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24oZnVuYykge1xuICAgIC8vIGRpc3RyaWJ1dGlvbiBpbnN0YW5jZSBtZXRob2RcbiAgICBqU3RhdFtmdW5jXSA9IGZ1bmN0aW9uKGEsIGIsIGMpIHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBhcmd1bWVudHMuY2FsbGVlKSlcbiAgICAgICAgcmV0dXJuIG5ldyBhcmd1bWVudHMuY2FsbGVlKGEsIGIsIGMpO1xuICAgICAgdGhpcy5fYSA9IGE7XG4gICAgICB0aGlzLl9iID0gYjtcbiAgICAgIHRoaXMuX2MgPSBjO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvLyBkaXN0cmlidXRpb24gbWV0aG9kIHRvIGJlIHVzZWQgb24gYSBqU3RhdCBpbnN0YW5jZVxuICAgIGpTdGF0LmZuW2Z1bmNdID0gZnVuY3Rpb24oYSwgYiwgYykge1xuICAgICAgdmFyIG5ld3RoaXMgPSBqU3RhdFtmdW5jXShhLCBiLCBjKTtcbiAgICAgIG5ld3RoaXMuZGF0YSA9IHRoaXM7XG4gICAgICByZXR1cm4gbmV3dGhpcztcbiAgICB9O1xuICAgIC8vIHNhbXBsZSBpbnN0YW5jZSBtZXRob2RcbiAgICBqU3RhdFtmdW5jXS5wcm90b3R5cGUuc2FtcGxlID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgICB2YXIgYSA9IHRoaXMuX2E7XG4gICAgICB2YXIgYiA9IHRoaXMuX2I7XG4gICAgICB2YXIgYyA9IHRoaXMuX2M7XG4gICAgICBpZiAoYXJyKVxuICAgICAgICByZXR1cm4galN0YXQuYWx0ZXIoYXJyLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4galN0YXRbZnVuY10uc2FtcGxlKGEsIGIsIGMpO1xuICAgICAgICB9KTtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGpTdGF0W2Z1bmNdLnNhbXBsZShhLCBiLCBjKTtcbiAgICB9O1xuICAgIC8vIGdlbmVyYXRlIHRoZSBwZGYsIGNkZiBhbmQgaW52IGluc3RhbmNlIG1ldGhvZHNcbiAgICAoZnVuY3Rpb24odmFscykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24oZm5mdW5jKSB7XG4gICAgICAgIGpTdGF0W2Z1bmNdLnByb3RvdHlwZVtmbmZ1bmNdID0gZnVuY3Rpb24oeCkge1xuICAgICAgICAgIHZhciBhID0gdGhpcy5fYTtcbiAgICAgICAgICB2YXIgYiA9IHRoaXMuX2I7XG4gICAgICAgICAgdmFyIGMgPSB0aGlzLl9jO1xuICAgICAgICAgIGlmICgheCAmJiB4ICE9PSAwKVxuICAgICAgICAgICAgeCA9IHRoaXMuZGF0YTtcbiAgICAgICAgICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4galN0YXQuZm4ubWFwLmNhbGwoeCwgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICByZXR1cm4galN0YXRbZnVuY11bZm5mdW5jXSh4LCBhLCBiLCBjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4galN0YXRbZnVuY11bZm5mdW5jXSh4LCBhLCBiLCBjKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHZhbHNbaV0pO1xuICAgIH0pKCdwZGYgY2RmIGludicuc3BsaXQoJyAnKSk7XG4gICAgLy8gZ2VuZXJhdGUgdGhlIG1lYW4sIG1lZGlhbiwgbW9kZSBhbmQgdmFyaWFuY2UgaW5zdGFuY2UgbWV0aG9kc1xuICAgIChmdW5jdGlvbih2YWxzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHMubGVuZ3RoOyBpKyspIChmdW5jdGlvbihmbmZ1bmMpIHtcbiAgICAgICAgalN0YXRbZnVuY10ucHJvdG90eXBlW2ZuZnVuY10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4galN0YXRbZnVuY11bZm5mdW5jXSh0aGlzLl9hLCB0aGlzLl9iLCB0aGlzLl9jKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHZhbHNbaV0pO1xuICAgIH0pKCdtZWFuIG1lZGlhbiBtb2RlIHZhcmlhbmNlJy5zcGxpdCgnICcpKTtcbiAgfSkobGlzdFtpXSk7XG59KSgoXG4gICdiZXRhIGNlbnRyYWxGIGNhdWNoeSBjaGlzcXVhcmUgZXhwb25lbnRpYWwgZ2FtbWEgaW52Z2FtbWEga3VtYXJhc3dhbXkgJyArXG4gICdsYXBsYWNlIGxvZ25vcm1hbCBub25jZW50cmFsdCBub3JtYWwgcGFyZXRvIHN0dWRlbnR0IHdlaWJ1bGwgdW5pZm9ybSAnICtcbiAgJ2Jpbm9taWFsIG5lZ2JpbiBoeXBnZW9tIHBvaXNzb24gdHJpYW5ndWxhciB0dWtleSBhcmNzaW5lJ1xuKS5zcGxpdCgnICcpKTtcblxuXG5cbi8vIGV4dGVuZCBiZXRhIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5iZXRhLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGFscGhhLCBiZXRhKSB7XG4gICAgLy8gUERGIGlzIHplcm8gb3V0c2lkZSB0aGUgc3VwcG9ydFxuICAgIGlmICh4ID4gMSB8fCB4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIC8vIFBERiBpcyBvbmUgZm9yIHRoZSB1bmlmb3JtIGNhc2VcbiAgICBpZiAoYWxwaGEgPT0gMSAmJiBiZXRhID09IDEpXG4gICAgICByZXR1cm4gMTtcblxuICAgIGlmIChhbHBoYSA8IDUxMiAmJiBiZXRhIDwgNTEyKSB7XG4gICAgICByZXR1cm4gKE1hdGgucG93KHgsIGFscGhhIC0gMSkgKiBNYXRoLnBvdygxIC0geCwgYmV0YSAtIDEpKSAvXG4gICAgICAgICAgalN0YXQuYmV0YWZuKGFscGhhLCBiZXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGguZXhwKChhbHBoYSAtIDEpICogTWF0aC5sb2coeCkgK1xuICAgICAgICAgICAgICAgICAgICAgIChiZXRhIC0gMSkgKiBNYXRoLmxvZygxIC0geCkgLVxuICAgICAgICAgICAgICAgICAgICAgIGpTdGF0LmJldGFsbihhbHBoYSwgYmV0YSkpO1xuICAgIH1cbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiAoeCA+IDEgfHwgeCA8IDApID8gKHggPiAxKSAqIDEgOiBqU3RhdC5pYmV0YSh4LCBhbHBoYSwgYmV0YSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbiBpbnYoeCwgYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4galN0YXQuaWJldGFpbnYoeCwgYWxwaGEsIGJldGEpO1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gYWxwaGEgLyAoYWxwaGEgKyBiZXRhKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiBqU3RhdC5pYmV0YWludigwLjUsIGFscGhhLCBiZXRhKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIChhbHBoYSAtIDEgKSAvICggYWxwaGEgKyBiZXRhIC0gMik7XG4gIH0sXG5cbiAgLy8gcmV0dXJuIGEgcmFuZG9tIHNhbXBsZVxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShhbHBoYSwgYmV0YSkge1xuICAgIHZhciB1ID0galN0YXQucmFuZGcoYWxwaGEpO1xuICAgIHJldHVybiB1IC8gKHUgKyBqU3RhdC5yYW5kZyhiZXRhKSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIChhbHBoYSAqIGJldGEpIC8gKE1hdGgucG93KGFscGhhICsgYmV0YSwgMikgKiAoYWxwaGEgKyBiZXRhICsgMSkpO1xuICB9XG59KTtcblxuLy8gZXh0ZW5kIEYgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmNlbnRyYWxGLCB7XG4gIC8vIFRoaXMgaW1wbGVtZW50YXRpb24gb2YgdGhlIHBkZiBmdW5jdGlvbiBhdm9pZHMgZmxvYXQgb3ZlcmZsb3dcbiAgLy8gU2VlIHRoZSB3YXkgdGhhdCBSIGNhbGN1bGF0ZXMgdGhpcyB2YWx1ZTpcbiAgLy8gaHR0cHM6Ly9zdm4uci1wcm9qZWN0Lm9yZy9SL3RydW5rL3NyYy9ubWF0aC9kZi5jXG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGRmMSwgZGYyKSB7XG4gICAgdmFyIHAsIHEsIGY7XG5cbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcblxuICAgIGlmIChkZjEgPD0gMikge1xuICAgICAgaWYgKHggPT09IDAgJiYgZGYxIDwgMikge1xuICAgICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgICB9XG4gICAgICBpZiAoeCA9PT0gMCAmJiBkZjEgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gKDEgLyBqU3RhdC5iZXRhZm4oZGYxIC8gMiwgZGYyIC8gMikpICpcbiAgICAgICAgICAgICAgTWF0aC5wb3coZGYxIC8gZGYyLCBkZjEgLyAyKSAqXG4gICAgICAgICAgICAgIE1hdGgucG93KHgsIChkZjEvMikgLSAxKSAqXG4gICAgICAgICAgICAgIE1hdGgucG93KCgxICsgKGRmMSAvIGRmMikgKiB4KSwgLShkZjEgKyBkZjIpIC8gMik7XG4gICAgfVxuXG4gICAgcCA9IChkZjEgKiB4KSAvIChkZjIgKyB4ICogZGYxKTtcbiAgICBxID0gZGYyIC8gKGRmMiArIHggKiBkZjEpO1xuICAgIGYgPSBkZjEgKiBxIC8gMi4wO1xuICAgIHJldHVybiBmICogalN0YXQuYmlub21pYWwucGRmKChkZjEgLSAyKSAvIDIsIChkZjEgKyBkZjIgLSAyKSAvIDIsIHApO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGRmMSwgZGYyKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIGpTdGF0LmliZXRhKChkZjEgKiB4KSAvIChkZjEgKiB4ICsgZGYyKSwgZGYxIC8gMiwgZGYyIC8gMik7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbiBpbnYoeCwgZGYxLCBkZjIpIHtcbiAgICByZXR1cm4gZGYyIC8gKGRmMSAqICgxIC8galN0YXQuaWJldGFpbnYoeCwgZGYxIC8gMiwgZGYyIC8gMikgLSAxKSk7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihkZjEsIGRmMikge1xuICAgIHJldHVybiAoZGYyID4gMikgPyBkZjIgLyAoZGYyIC0gMikgOiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShkZjEsIGRmMikge1xuICAgIHJldHVybiAoZGYxID4gMikgPyAoZGYyICogKGRmMSAtIDIpKSAvIChkZjEgKiAoZGYyICsgMikpIDogdW5kZWZpbmVkO1xuICB9LFxuXG4gIC8vIHJldHVybiBhIHJhbmRvbSBzYW1wbGVcbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoZGYxLCBkZjIpIHtcbiAgICB2YXIgeDEgPSBqU3RhdC5yYW5kZyhkZjEgLyAyKSAqIDI7XG4gICAgdmFyIHgyID0galN0YXQucmFuZGcoZGYyIC8gMikgKiAyO1xuICAgIHJldHVybiAoeDEgLyBkZjEpIC8gKHgyIC8gZGYyKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoZGYxLCBkZjIpIHtcbiAgICBpZiAoZGYyIDw9IDQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiAyICogZGYyICogZGYyICogKGRmMSArIGRmMiAtIDIpIC9cbiAgICAgICAgKGRmMSAqIChkZjIgLSAyKSAqIChkZjIgLSAyKSAqIChkZjIgLSA0KSk7XG4gIH1cbn0pO1xuXG5cbi8vIGV4dGVuZCBjYXVjaHkgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmNhdWNoeSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBsb2NhbCwgc2NhbGUpIHtcbiAgICBpZiAoc2NhbGUgPCAwKSB7IHJldHVybiAwOyB9XG5cbiAgICByZXR1cm4gKHNjYWxlIC8gKE1hdGgucG93KHggLSBsb2NhbCwgMikgKyBNYXRoLnBvdyhzY2FsZSwgMikpKSAvIE1hdGguUEk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgbG9jYWwsIHNjYWxlKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbigoeCAtIGxvY2FsKSAvIHNjYWxlKSAvIE1hdGguUEkgKyAwLjU7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBsb2NhbCwgc2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWwgKyBzY2FsZSAqIE1hdGgudGFuKE1hdGguUEkgKiAocCAtIDAuNSkpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGxvY2FsLyosIHNjYWxlKi8pIHtcbiAgICByZXR1cm4gbG9jYWw7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShsb2NhbC8qLCBzY2FsZSovKSB7XG4gICAgcmV0dXJuIGxvY2FsO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGxvY2FsLCBzY2FsZSkge1xuICAgIHJldHVybiBqU3RhdC5yYW5kbigpICpcbiAgICAgICAgTWF0aC5zcXJ0KDEgLyAoMiAqIGpTdGF0LnJhbmRnKDAuNSkpKSAqIHNjYWxlICsgbG9jYWw7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIGNoaXNxdWFyZSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuY2hpc3F1YXJlLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGRvZikge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAoeCA9PT0gMCAmJiBkb2YgPT09IDIpID8gMC41IDpcbiAgICAgICAgTWF0aC5leHAoKGRvZiAvIDIgLSAxKSAqIE1hdGgubG9nKHgpIC0geCAvIDIgLSAoZG9mIC8gMikgKlxuICAgICAgICAgICAgICAgICBNYXRoLmxvZygyKSAtIGpTdGF0LmdhbW1hbG4oZG9mIC8gMikpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGRvZikge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBqU3RhdC5sb3dSZWdHYW1tYShkb2YgLyAyLCB4IC8gMik7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBkb2YpIHtcbiAgICByZXR1cm4gMiAqIGpTdGF0LmdhbW1hcGludihwLCAwLjUgKiBkb2YpO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihkb2YpIHtcbiAgICByZXR1cm4gZG9mO1xuICB9LFxuXG4gIC8vIFRPRE86IHRoaXMgaXMgYW4gYXBwcm94aW1hdGlvbiAoaXMgdGhlcmUgYSBiZXR0ZXIgd2F5PylcbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oZG9mKSB7XG4gICAgcmV0dXJuIGRvZiAqIE1hdGgucG93KDEgLSAoMiAvICg5ICogZG9mKSksIDMpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoZG9mKSB7XG4gICAgcmV0dXJuIChkb2YgLSAyID4gMCkgPyBkb2YgLSAyIDogMDtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShkb2YpIHtcbiAgICByZXR1cm4galN0YXQucmFuZGcoZG9mIC8gMikgKiAyO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShkb2YpIHtcbiAgICByZXR1cm4gMiAqIGRvZjtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgZXhwb25lbnRpYWwgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmV4cG9uZW50aWFsLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIHJhdGUpIHtcbiAgICByZXR1cm4geCA8IDAgPyAwIDogcmF0ZSAqIE1hdGguZXhwKC1yYXRlICogeCk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgcmF0ZSkge1xuICAgIHJldHVybiB4IDwgMCA/IDAgOiAxIC0gTWF0aC5leHAoLXJhdGUgKiB4KTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIHJhdGUpIHtcbiAgICByZXR1cm4gLU1hdGgubG9nKDEgLSBwKSAvIHJhdGU7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKHJhdGUpIHtcbiAgICByZXR1cm4gMSAvIHJhdGU7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiAocmF0ZSkge1xuICAgIHJldHVybiAoMSAvIHJhdGUpICogTWF0aC5sb2coMik7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZSgvKnJhdGUqLykge1xuICAgIHJldHVybiAwO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKHJhdGUpIHtcbiAgICByZXR1cm4gLTEgLyByYXRlICogTWF0aC5sb2coalN0YXQuX3JhbmRvbV9mbigpKTtcbiAgfSxcblxuICB2YXJpYW5jZSA6IGZ1bmN0aW9uKHJhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3cocmF0ZSwgLTIpO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBnYW1tYSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuZ2FtbWEsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgc2hhcGUsIHNjYWxlKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuICh4ID09PSAwICYmIHNoYXBlID09PSAxKSA/IDEgLyBzY2FsZSA6XG4gICAgICAgICAgICBNYXRoLmV4cCgoc2hhcGUgLSAxKSAqIE1hdGgubG9nKHgpIC0geCAvIHNjYWxlIC1cbiAgICAgICAgICAgICAgICAgICAgalN0YXQuZ2FtbWFsbihzaGFwZSkgLSBzaGFwZSAqIE1hdGgubG9nKHNjYWxlKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgc2hhcGUsIHNjYWxlKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIGpTdGF0Lmxvd1JlZ0dhbW1hKHNoYXBlLCB4IC8gc2NhbGUpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIGpTdGF0LmdhbW1hcGludihwLCBzaGFwZSkgKiBzY2FsZTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24oc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIHNoYXBlICogc2NhbGU7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShzaGFwZSwgc2NhbGUpIHtcbiAgICBpZihzaGFwZSA+IDEpIHJldHVybiAoc2hhcGUgLSAxKSAqIHNjYWxlO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIGpTdGF0LnJhbmRnKHNoYXBlKSAqIHNjYWxlO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4gc2hhcGUgKiBzY2FsZSAqIHNjYWxlO1xuICB9XG59KTtcblxuLy8gZXh0ZW5kIGludmVyc2UgZ2FtbWEgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmludmdhbW1hLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIHNoYXBlLCBzY2FsZSkge1xuICAgIGlmICh4IDw9IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gTWF0aC5leHAoLShzaGFwZSArIDEpICogTWF0aC5sb2coeCkgLSBzY2FsZSAvIHggLVxuICAgICAgICAgICAgICAgICAgICBqU3RhdC5nYW1tYWxuKHNoYXBlKSArIHNoYXBlICogTWF0aC5sb2coc2NhbGUpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBzaGFwZSwgc2NhbGUpIHtcbiAgICBpZiAoeCA8PSAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIDEgLSBqU3RhdC5sb3dSZWdHYW1tYShzaGFwZSwgc2NhbGUgLyB4KTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBzY2FsZSAvIGpTdGF0LmdhbW1hcGludigxIC0gcCwgc2hhcGUpO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4gKHNoYXBlID4gMSkgPyBzY2FsZSAvIChzaGFwZSAtIDEpIDogdW5kZWZpbmVkO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIHNjYWxlIC8gKHNoYXBlICsgMSk7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIHNjYWxlIC8galN0YXQucmFuZGcoc2hhcGUpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShzaGFwZSwgc2NhbGUpIHtcbiAgICBpZiAoc2hhcGUgPD0gMilcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHNjYWxlICogc2NhbGUgLyAoKHNoYXBlIC0gMSkgKiAoc2hhcGUgLSAxKSAqIChzaGFwZSAtIDIpKTtcbiAgfVxufSk7XG5cblxuLy8gZXh0ZW5kIGt1bWFyYXN3YW15IGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5rdW1hcmFzd2FteSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBhbHBoYSwgYmV0YSkge1xuICAgIGlmICh4ID09PSAwICYmIGFscGhhID09PSAxKVxuICAgICAgcmV0dXJuIGJldGE7XG4gICAgZWxzZSBpZiAoeCA9PT0gMSAmJiBiZXRhID09PSAxKVxuICAgICAgcmV0dXJuIGFscGhhO1xuICAgIHJldHVybiBNYXRoLmV4cChNYXRoLmxvZyhhbHBoYSkgKyBNYXRoLmxvZyhiZXRhKSArIChhbHBoYSAtIDEpICpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5sb2coeCkgKyAoYmV0YSAtIDEpICpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5sb2coMSAtIE1hdGgucG93KHgsIGFscGhhKSkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGFscGhhLCBiZXRhKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZWxzZSBpZiAoeCA+IDEpXG4gICAgICByZXR1cm4gMTtcbiAgICByZXR1cm4gKDEgLSBNYXRoLnBvdygxIC0gTWF0aC5wb3coeCwgYWxwaGEpLCBiZXRhKSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbiBpbnYocCwgYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMSAtIE1hdGgucG93KDEgLSBwLCAxIC8gYmV0YSksIDEgLyBhbHBoYSk7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIChiZXRhICogalN0YXQuZ2FtbWFmbigxICsgMSAvIGFscGhhKSAqXG4gICAgICAgICAgICBqU3RhdC5nYW1tYWZuKGJldGEpKSAvIChqU3RhdC5nYW1tYWZuKDEgKyAxIC8gYWxwaGEgKyBiZXRhKSk7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMSAtIE1hdGgucG93KDIsIC0xIC8gYmV0YSksIDEgLyBhbHBoYSk7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShhbHBoYSwgYmV0YSkge1xuICAgIGlmICghKGFscGhhID49IDEgJiYgYmV0YSA+PSAxICYmIChhbHBoYSAhPT0gMSAmJiBiZXRhICE9PSAxKSkpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBNYXRoLnBvdygoYWxwaGEgLSAxKSAvIChhbHBoYSAqIGJldGEgLSAxKSwgMSAvIGFscGhhKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoLyphbHBoYSwgYmV0YSovKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd2YXJpYW5jZSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gICAgLy8gVE9ETzogY29tcGxldGUgdGhpc1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBsb2dub3JtYWwgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmxvZ25vcm1hbCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBtdSwgc2lnbWEpIHtcbiAgICBpZiAoeCA8PSAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIE1hdGguZXhwKC1NYXRoLmxvZyh4KSAtIDAuNSAqIE1hdGgubG9nKDIgKiBNYXRoLlBJKSAtXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubG9nKHNpZ21hKSAtIE1hdGgucG93KE1hdGgubG9nKHgpIC0gbXUsIDIpIC9cbiAgICAgICAgICAgICAgICAgICAgKDIgKiBzaWdtYSAqIHNpZ21hKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgbXUsIHNpZ21hKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIDAuNSArXG4gICAgICAgICgwLjUgKiBqU3RhdC5lcmYoKE1hdGgubG9nKHgpIC0gbXUpIC8gTWF0aC5zcXJ0KDIgKiBzaWdtYSAqIHNpZ21hKSkpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgbXUsIHNpZ21hKSB7XG4gICAgcmV0dXJuIE1hdGguZXhwKC0xLjQxNDIxMzU2MjM3MzA5NTA1ICogc2lnbWEgKiBqU3RhdC5lcmZjaW52KDIgKiBwKSArIG11KTtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKG11LCBzaWdtYSkge1xuICAgIHJldHVybiBNYXRoLmV4cChtdSArIHNpZ21hICogc2lnbWEgLyAyKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihtdS8qLCBzaWdtYSovKSB7XG4gICAgcmV0dXJuIE1hdGguZXhwKG11KTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKG11LCBzaWdtYSkge1xuICAgIHJldHVybiBNYXRoLmV4cChtdSAtIHNpZ21hICogc2lnbWEpO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKG11LCBzaWdtYSkge1xuICAgIHJldHVybiBNYXRoLmV4cChqU3RhdC5yYW5kbigpICogc2lnbWEgKyBtdSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKG11LCBzaWdtYSkge1xuICAgIHJldHVybiAoTWF0aC5leHAoc2lnbWEgKiBzaWdtYSkgLSAxKSAqIE1hdGguZXhwKDIgKiBtdSArIHNpZ21hICogc2lnbWEpO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBub25jZW50cmFsdCBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQubm9uY2VudHJhbHQsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgZG9mLCBuY3ApIHtcbiAgICB2YXIgdG9sID0gMWUtMTQ7XG4gICAgaWYgKE1hdGguYWJzKG5jcCkgPCB0b2wpICAvLyBuY3AgYXBwcm94IDA7IHVzZSBzdHVkZW50LXRcbiAgICAgIHJldHVybiBqU3RhdC5zdHVkZW50dC5wZGYoeCwgZG9mKVxuXG4gICAgaWYgKE1hdGguYWJzKHgpIDwgdG9sKSB7ICAvLyBkaWZmZXJlbnQgZm9ybXVsYSBmb3IgeCA9PSAwXG4gICAgICByZXR1cm4gTWF0aC5leHAoalN0YXQuZ2FtbWFsbigoZG9mICsgMSkgLyAyKSAtIG5jcCAqIG5jcCAvIDIgLVxuICAgICAgICAgICAgICAgICAgICAgIDAuNSAqIE1hdGgubG9nKE1hdGguUEkgKiBkb2YpIC0galN0YXQuZ2FtbWFsbihkb2YgLyAyKSk7XG4gICAgfVxuXG4gICAgLy8gZm9ybXVsYSBmb3IgeCAhPSAwXG4gICAgcmV0dXJuIGRvZiAvIHggKlxuICAgICAgICAoalN0YXQubm9uY2VudHJhbHQuY2RmKHggKiBNYXRoLnNxcnQoMSArIDIgLyBkb2YpLCBkb2YrMiwgbmNwKSAtXG4gICAgICAgICBqU3RhdC5ub25jZW50cmFsdC5jZGYoeCwgZG9mLCBuY3ApKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBkb2YsIG5jcCkge1xuICAgIHZhciB0b2wgPSAxZS0xNDtcbiAgICB2YXIgbWluX2l0ZXJhdGlvbnMgPSAyMDA7XG5cbiAgICBpZiAoTWF0aC5hYnMobmNwKSA8IHRvbCkgIC8vIG5jcCBhcHByb3ggMDsgdXNlIHN0dWRlbnQtdFxuICAgICAgcmV0dXJuIGpTdGF0LnN0dWRlbnR0LmNkZih4LCBkb2YpO1xuXG4gICAgLy8gdHVybiBuZWdhdGl2ZSB4IGludG8gcG9zaXRpdmUgYW5kIGZsaXAgcmVzdWx0IGFmdGVyd2FyZHNcbiAgICB2YXIgZmxpcCA9IGZhbHNlO1xuICAgIGlmICh4IDwgMCkge1xuICAgICAgZmxpcCA9IHRydWU7XG4gICAgICBuY3AgPSAtbmNwO1xuICAgIH1cblxuICAgIHZhciBwcm9iID0galN0YXQubm9ybWFsLmNkZigtbmNwLCAwLCAxKTtcbiAgICB2YXIgdmFsdWUgPSB0b2wgKyAxO1xuICAgIC8vIHVzZSB2YWx1ZSBhdCBsYXN0IHR3byBzdGVwcyB0byBkZXRlcm1pbmUgY29udmVyZ2VuY2VcbiAgICB2YXIgbGFzdHZhbHVlID0gdmFsdWU7XG4gICAgdmFyIHkgPSB4ICogeCAvICh4ICogeCArIGRvZik7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBwID0gTWF0aC5leHAoLW5jcCAqIG5jcCAvIDIpO1xuICAgIHZhciBxID0gTWF0aC5leHAoLW5jcCAqIG5jcCAvIDIgLSAwLjUgKiBNYXRoLmxvZygyKSAtXG4gICAgICAgICAgICAgICAgICAgICBqU3RhdC5nYW1tYWxuKDMgLyAyKSkgKiBuY3A7XG4gICAgd2hpbGUgKGogPCBtaW5faXRlcmF0aW9ucyB8fCBsYXN0dmFsdWUgPiB0b2wgfHwgdmFsdWUgPiB0b2wpIHtcbiAgICAgIGxhc3R2YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgIHAgKj0gKG5jcCAqIG5jcCkgLyAoMiAqIGopO1xuICAgICAgICBxICo9IChuY3AgKiBuY3ApIC8gKDIgKiAoaiArIDEgLyAyKSk7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHAgKiBqU3RhdC5iZXRhLmNkZih5LCBqICsgMC41LCBkb2YgLyAyKSArXG4gICAgICAgICAgcSAqIGpTdGF0LmJldGEuY2RmKHksIGorMSwgZG9mLzIpO1xuICAgICAgcHJvYiArPSAwLjUgKiB2YWx1ZTtcbiAgICAgIGorKztcbiAgICB9XG5cbiAgICByZXR1cm4gZmxpcCA/ICgxIC0gcHJvYikgOiBwcm9iO1xuICB9XG59KTtcblxuXG4vLyBleHRlbmQgbm9ybWFsIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5ub3JtYWwsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgbWVhbiwgc3RkKSB7XG4gICAgcmV0dXJuIE1hdGguZXhwKC0wLjUgKiBNYXRoLmxvZygyICogTWF0aC5QSSkgLVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmxvZyhzdGQpIC0gTWF0aC5wb3coeCAtIG1lYW4sIDIpIC8gKDIgKiBzdGQgKiBzdGQpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBtZWFuLCBzdGQpIHtcbiAgICByZXR1cm4gMC41ICogKDEgKyBqU3RhdC5lcmYoKHggLSBtZWFuKSAvIE1hdGguc3FydCgyICogc3RkICogc3RkKSkpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgbWVhbiwgc3RkKSB7XG4gICAgcmV0dXJuIC0xLjQxNDIxMzU2MjM3MzA5NTA1ICogc3RkICogalN0YXQuZXJmY2ludigyICogcCkgKyBtZWFuO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihtZWFuLyosIHN0ZCovKSB7XG4gICAgcmV0dXJuIG1lYW47XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4obWVhbi8qLCBzdGQqLykge1xuICAgIHJldHVybiBtZWFuO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIChtZWFuLyosIHN0ZCovKSB7XG4gICAgcmV0dXJuIG1lYW47XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUobWVhbiwgc3RkKSB7XG4gICAgcmV0dXJuIGpTdGF0LnJhbmRuKCkgKiBzdGQgKyBtZWFuO1xuICB9LFxuXG4gIHZhcmlhbmNlIDogZnVuY3Rpb24obWVhbiwgc3RkKSB7XG4gICAgcmV0dXJuIHN0ZCAqIHN0ZDtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgcGFyZXRvIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5wYXJldG8sIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgc2NhbGUsIHNoYXBlKSB7XG4gICAgaWYgKHggPCBzY2FsZSlcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAoc2hhcGUgKiBNYXRoLnBvdyhzY2FsZSwgc2hhcGUpKSAvIE1hdGgucG93KHgsIHNoYXBlICsgMSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgc2NhbGUsIHNoYXBlKSB7XG4gICAgaWYgKHggPCBzY2FsZSlcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAxIC0gTWF0aC5wb3coc2NhbGUgLyB4LCBzaGFwZSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbiBpbnYocCwgc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlIC8gTWF0aC5wb3coMSAtIHAsIDEgLyBzaGFwZSk7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihzY2FsZSwgc2hhcGUpIHtcbiAgICBpZiAoc2hhcGUgPD0gMSlcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIChzaGFwZSAqIE1hdGgucG93KHNjYWxlLCBzaGFwZSkpIC8gKHNoYXBlIC0gMSk7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlICogKHNoYXBlICogTWF0aC5TUVJUMik7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShzY2FsZS8qLCBzaGFwZSovKSB7XG4gICAgcmV0dXJuIHNjYWxlO1xuICB9LFxuXG4gIHZhcmlhbmNlIDogZnVuY3Rpb24oc2NhbGUsIHNoYXBlKSB7XG4gICAgaWYgKHNoYXBlIDw9IDIpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiAoc2NhbGUqc2NhbGUgKiBzaGFwZSkgLyAoTWF0aC5wb3coc2hhcGUgLSAxLCAyKSAqIChzaGFwZSAtIDIpKTtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgc3R1ZGVudHQgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LnN0dWRlbnR0LCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGRvZikge1xuICAgIGRvZiA9IGRvZiA+IDFlMTAwID8gMWUxMDAgOiBkb2Y7XG4gICAgcmV0dXJuICgxLyhNYXRoLnNxcnQoZG9mKSAqIGpTdGF0LmJldGFmbigwLjUsIGRvZi8yKSkpICpcbiAgICAgICAgTWF0aC5wb3coMSArICgoeCAqIHgpIC8gZG9mKSwgLSgoZG9mICsgMSkgLyAyKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgZG9mKSB7XG4gICAgdmFyIGRvZjIgPSBkb2YgLyAyO1xuICAgIHJldHVybiBqU3RhdC5pYmV0YSgoeCArIE1hdGguc3FydCh4ICogeCArIGRvZikpIC9cbiAgICAgICAgICAgICAgICAgICAgICAgKDIgKiBNYXRoLnNxcnQoeCAqIHggKyBkb2YpKSwgZG9mMiwgZG9mMik7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBkb2YpIHtcbiAgICB2YXIgeCA9IGpTdGF0LmliZXRhaW52KDIgKiBNYXRoLm1pbihwLCAxIC0gcCksIDAuNSAqIGRvZiwgMC41KTtcbiAgICB4ID0gTWF0aC5zcXJ0KGRvZiAqICgxIC0geCkgLyB4KTtcbiAgICByZXR1cm4gKHAgPiAwLjUpID8geCA6IC14O1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oZG9mKSB7XG4gICAgcmV0dXJuIChkb2YgPiAxKSA/IDAgOiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oLypkb2YqLykge1xuICAgIHJldHVybiAwO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoLypkb2YqLykge1xuICAgIHJldHVybiAwO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGRvZikge1xuICAgIHJldHVybiBqU3RhdC5yYW5kbigpICogTWF0aC5zcXJ0KGRvZiAvICgyICogalN0YXQucmFuZGcoZG9mIC8gMikpKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoZG9mKSB7XG4gICAgcmV0dXJuIChkb2YgID4gMikgPyBkb2YgLyAoZG9mIC0gMikgOiAoZG9mID4gMSkgPyBJbmZpbml0eSA6IHVuZGVmaW5lZDtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgd2VpYnVsbCBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQud2VpYnVsbCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBzY2FsZSwgc2hhcGUpIHtcbiAgICBpZiAoeCA8IDAgfHwgc2NhbGUgPCAwIHx8IHNoYXBlIDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAoc2hhcGUgLyBzY2FsZSkgKiBNYXRoLnBvdygoeCAvIHNjYWxlKSwgKHNoYXBlIC0gMSkpICpcbiAgICAgICAgTWF0aC5leHAoLShNYXRoLnBvdygoeCAvIHNjYWxlKSwgc2hhcGUpKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHggPCAwID8gMCA6IDEgLSBNYXRoLmV4cCgtTWF0aC5wb3coKHggLyBzY2FsZSksIHNoYXBlKSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgKiBNYXRoLnBvdygtTWF0aC5sb2coMSAtIHApLCAxIC8gc2hhcGUpO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgKiBqU3RhdC5nYW1tYWZuKDEgKyAxIC8gc2hhcGUpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAqIE1hdGgucG93KE1hdGgubG9nKDIpLCAxIC8gc2hhcGUpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoc2NhbGUsIHNoYXBlKSB7XG4gICAgaWYgKHNoYXBlIDw9IDEpXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gc2NhbGUgKiBNYXRoLnBvdygoc2hhcGUgLSAxKSAvIHNoYXBlLCAxIC8gc2hhcGUpO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAqIE1hdGgucG93KC1NYXRoLmxvZyhqU3RhdC5fcmFuZG9tX2ZuKCkpLCAxIC8gc2hhcGUpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgKiBzY2FsZSAqIGpTdGF0LmdhbW1hZm4oMSArIDIgLyBzaGFwZSkgLVxuICAgICAgICBNYXRoLnBvdyhqU3RhdC53ZWlidWxsLm1lYW4oc2NhbGUsIHNoYXBlKSwgMik7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHVuaWZvcm0gZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LnVuaWZvcm0sIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgYSwgYikge1xuICAgIHJldHVybiAoeCA8IGEgfHwgeCA+IGIpID8gMCA6IDEgLyAoYiAtIGEpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGEsIGIpIHtcbiAgICBpZiAoeCA8IGEpXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmICh4IDwgYilcbiAgICAgIHJldHVybiAoeCAtIGEpIC8gKGIgLSBhKTtcbiAgICByZXR1cm4gMTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIGEsIGIpIHtcbiAgICByZXR1cm4gYSArIChwICogKGIgLSBhKSk7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihhLCBiKSB7XG4gICAgcmV0dXJuIDAuNSAqIChhICsgYik7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oYSwgYikge1xuICAgIHJldHVybiBqU3RhdC5tZWFuKGEsIGIpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoLyphLCBiKi8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21vZGUgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGEsIGIpIHtcbiAgICByZXR1cm4gKGEgLyAyICsgYiAvIDIpICsgKGIgLyAyIC0gYSAvIDIpICogKDIgKiBqU3RhdC5fcmFuZG9tX2ZuKCkgLSAxKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoYSwgYikge1xuICAgIHJldHVybiBNYXRoLnBvdyhiIC0gYSwgMikgLyAxMjtcbiAgfVxufSk7XG5cblxuLy8gR290IHRoaXMgZnJvbSBodHRwOi8vd3d3Lm1hdGgudWNsYS5lZHUvfnRvbS9kaXN0cmlidXRpb25zL2Jpbm9taWFsLmh0bWxcbmZ1bmN0aW9uIGJldGluYyh4LCBhLCBiLCBlcHMpIHtcbiAgdmFyIGEwID0gMDtcbiAgdmFyIGIwID0gMTtcbiAgdmFyIGExID0gMTtcbiAgdmFyIGIxID0gMTtcbiAgdmFyIG05ID0gMDtcbiAgdmFyIGEyID0gMDtcbiAgdmFyIGM5O1xuXG4gIHdoaWxlIChNYXRoLmFicygoYTEgLSBhMikgLyBhMSkgPiBlcHMpIHtcbiAgICBhMiA9IGExO1xuICAgIGM5ID0gLShhICsgbTkpICogKGEgKyBiICsgbTkpICogeCAvIChhICsgMiAqIG05KSAvIChhICsgMiAqIG05ICsgMSk7XG4gICAgYTAgPSBhMSArIGM5ICogYTA7XG4gICAgYjAgPSBiMSArIGM5ICogYjA7XG4gICAgbTkgPSBtOSArIDE7XG4gICAgYzkgPSBtOSAqIChiIC0gbTkpICogeCAvIChhICsgMiAqIG05IC0gMSkgLyAoYSArIDIgKiBtOSk7XG4gICAgYTEgPSBhMCArIGM5ICogYTE7XG4gICAgYjEgPSBiMCArIGM5ICogYjE7XG4gICAgYTAgPSBhMCAvIGIxO1xuICAgIGIwID0gYjAgLyBiMTtcbiAgICBhMSA9IGExIC8gYjE7XG4gICAgYjEgPSAxO1xuICB9XG5cbiAgcmV0dXJuIGExIC8gYTtcbn1cblxuXG4vLyBleHRlbmQgdW5pZm9ybSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuYmlub21pYWwsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoaywgbiwgcCkge1xuICAgIHJldHVybiAocCA9PT0gMCB8fCBwID09PSAxKSA/XG4gICAgICAoKG4gKiBwKSA9PT0gayA/IDEgOiAwKSA6XG4gICAgICBqU3RhdC5jb21iaW5hdGlvbihuLCBrKSAqIE1hdGgucG93KHAsIGspICogTWF0aC5wb3coMSAtIHAsIG4gLSBrKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBuLCBwKSB7XG4gICAgdmFyIGJldGFjZGY7XG4gICAgdmFyIGVwcyA9IDFlLTEwO1xuXG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKHggPj0gbilcbiAgICAgIHJldHVybiAxO1xuICAgIGlmIChwIDwgMCB8fCBwID4gMSB8fCBuIDw9IDApXG4gICAgICByZXR1cm4gTmFOO1xuXG4gICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgdmFyIHogPSBwO1xuICAgIHZhciBhID0geCArIDE7XG4gICAgdmFyIGIgPSBuIC0geDtcbiAgICB2YXIgcyA9IGEgKyBiO1xuICAgIHZhciBidCA9IE1hdGguZXhwKGpTdGF0LmdhbW1hbG4ocykgLSBqU3RhdC5nYW1tYWxuKGIpIC1cbiAgICAgICAgICAgICAgICAgICAgICBqU3RhdC5nYW1tYWxuKGEpICsgYSAqIE1hdGgubG9nKHopICsgYiAqIE1hdGgubG9nKDEgLSB6KSk7XG5cbiAgICBpZiAoeiA8IChhICsgMSkgLyAocyArIDIpKVxuICAgICAgYmV0YWNkZiA9IGJ0ICogYmV0aW5jKHosIGEsIGIsIGVwcyk7XG4gICAgZWxzZVxuICAgICAgYmV0YWNkZiA9IDEgLSBidCAqIGJldGluYygxIC0geiwgYiwgYSwgZXBzKTtcblxuICAgIHJldHVybiBNYXRoLnJvdW5kKCgxIC0gYmV0YWNkZikgKiAoMSAvIGVwcykpIC8gKDEgLyBlcHMpO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCB1bmlmb3JtIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5uZWdiaW4sIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoaywgciwgcCkge1xuICAgIGlmIChrICE9PSBrID4+PiAwKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChrIDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBqU3RhdC5jb21iaW5hdGlvbihrICsgciAtIDEsIHIgLSAxKSAqXG4gICAgICAgIE1hdGgucG93KDEgLSBwLCBrKSAqIE1hdGgucG93KHAsIHIpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIHIsIHApIHtcbiAgICB2YXIgc3VtID0gMCxcbiAgICBrID0gMDtcbiAgICBpZiAoeCA8IDApIHJldHVybiAwO1xuICAgIGZvciAoOyBrIDw9IHg7IGsrKykge1xuICAgICAgc3VtICs9IGpTdGF0Lm5lZ2Jpbi5wZGYoaywgciwgcCk7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHVuaWZvcm0gZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0Lmh5cGdlb20sIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoaywgTiwgbSwgbikge1xuICAgIC8vIEh5cGVyZ2VvbWV0cmljIFBERi5cblxuICAgIC8vIEEgc2ltcGxpZmljYXRpb24gb2YgdGhlIENERiBhbGdvcml0aG0gYmVsb3cuXG5cbiAgICAvLyBrID0gbnVtYmVyIG9mIHN1Y2Nlc3NlcyBkcmF3blxuICAgIC8vIE4gPSBwb3B1bGF0aW9uIHNpemVcbiAgICAvLyBtID0gbnVtYmVyIG9mIHN1Y2Nlc3NlcyBpbiBwb3B1bGF0aW9uXG4gICAgLy8gbiA9IG51bWJlciBvZiBpdGVtcyBkcmF3biBmcm9tIHBvcHVsYXRpb25cblxuICAgIGlmKGsgIT09IGsgfCAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmKGsgPCAwIHx8IGsgPCBtIC0gKE4gLSBuKSkge1xuICAgICAgLy8gSXQncyBpbXBvc3NpYmxlIHRvIGhhdmUgdGhpcyBmZXcgc3VjY2Vzc2VzIGRyYXduLlxuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmKGsgPiBuIHx8IGsgPiBtKSB7XG4gICAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gaGF2ZSB0aGlzIG1hbnkgc3VjY2Vzc2VzIGRyYXduLlxuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmIChtICogMiA+IE4pIHtcbiAgICAgIC8vIE1vcmUgdGhhbiBoYWxmIHRoZSBwb3B1bGF0aW9uIGlzIHN1Y2Nlc3Nlcy5cblxuICAgICAgaWYobiAqIDIgPiBOKSB7XG4gICAgICAgIC8vIE1vcmUgdGhhbiBoYWxmIHRoZSBwb3B1bGF0aW9uIGlzIHNhbXBsZWQuXG5cbiAgICAgICAgcmV0dXJuIGpTdGF0Lmh5cGdlb20ucGRmKE4gLSBtIC0gbiArIGssIE4sIE4gLSBtLCBOIC0gbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEhhbGYgb3IgbGVzcyBvZiB0aGUgcG9wdWxhdGlvbiBpcyBzYW1wbGVkLlxuXG4gICAgICAgIHJldHVybiBqU3RhdC5oeXBnZW9tLnBkZihuIC0gaywgTiwgTiAtIG0sIG4pO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmKG4gKiAyID4gTikge1xuICAgICAgLy8gSGFsZiBvciBsZXNzIGlzIHN1Y2Nlc3Nlcy5cblxuICAgICAgcmV0dXJuIGpTdGF0Lmh5cGdlb20ucGRmKG0gLSBrLCBOLCBtLCBOIC0gbik7XG5cbiAgICB9IGVsc2UgaWYobSA8IG4pIHtcbiAgICAgIC8vIFdlIHdhbnQgdG8gaGF2ZSB0aGUgbnVtYmVyIG9mIHRoaW5ncyBzYW1wbGVkIHRvIGJlIGxlc3MgdGhhbiB0aGVcbiAgICAgIC8vIHN1Y2Nlc3NlcyBhdmFpbGFibGUuIFNvIHN3YXAgdGhlIGRlZmluaXRpb25zIG9mIHN1Y2Nlc3NmdWwgYW5kIHNhbXBsZWQuXG4gICAgICByZXR1cm4galN0YXQuaHlwZ2VvbS5wZGYoaywgTiwgbiwgbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlIGdldCBoZXJlLCBoYWxmIG9yIGxlc3Mgb2YgdGhlIHBvcHVsYXRpb24gd2FzIHNhbXBsZWQsIGhhbGYgb3JcbiAgICAgIC8vIGxlc3Mgb2YgaXQgd2FzIHN1Y2Nlc3NlcywgYW5kIHdlIGhhZCBmZXdlciBzYW1wbGVkIHRoaW5ncyB0aGFuXG4gICAgICAvLyBzdWNjZXNzZXMuIE5vdyB3ZSBjYW4gZG8gdGhpcyBjb21wbGljYXRlZCBpdGVyYXRpdmUgYWxnb3JpdGhtIGluIGFuXG4gICAgICAvLyBlZmZpY2llbnQgd2F5LlxuXG4gICAgICAvLyBUaGUgYmFzaWMgcHJlbWlzZSBvZiB0aGUgYWxnb3JpdGhtIGlzIHRoYXQgd2UgcGFydGlhbGx5IG5vcm1hbGl6ZSBvdXJcbiAgICAgIC8vIGludGVybWVkaWF0ZSBwcm9kdWN0IHRvIGtlZXAgaXQgaW4gYSBudW1lcmljYWxseSBnb29kIHJlZ2lvbiwgYW5kIHRoZW5cbiAgICAgIC8vIGZpbmlzaCB0aGUgbm9ybWFsaXphdGlvbiBhdCB0aGUgZW5kLlxuXG4gICAgICAvLyBUaGlzIHZhcmlhYmxlIGhvbGRzIHRoZSBzY2FsZWQgcHJvYmFiaWxpdHkgb2YgdGhlIGN1cnJlbnQgbnVtYmVyIG9mXG4gICAgICAvLyBzdWNjZXNzZXMuXG4gICAgICB2YXIgc2NhbGVkUERGID0gMTtcblxuICAgICAgLy8gVGhpcyBrZWVwcyB0cmFjayBvZiBob3cgbXVjaCB3ZSBoYXZlIG5vcm1hbGl6ZWQuXG4gICAgICB2YXIgc2FtcGxlc0RvbmUgPSAwO1xuXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgazsgaSsrKSB7XG4gICAgICAgIC8vIEZvciBldmVyeSBwb3NzaWJsZSBudW1iZXIgb2Ygc3VjY2Vzc2VzIHVwIHRvIHRoYXQgb2JzZXJ2ZWQuLi5cblxuICAgICAgICB3aGlsZShzY2FsZWRQREYgPiAxICYmIHNhbXBsZXNEb25lIDwgbikge1xuICAgICAgICAgIC8vIEludGVybWVkaWF0ZSByZXN1bHQgaXMgZ3Jvd2luZyB0b28gYmlnLiBBcHBseSBzb21lIG9mIHRoZVxuICAgICAgICAgIC8vIG5vcm1hbGl6YXRpb24gdG8gc2hyaW5rIGV2ZXJ5dGhpbmcuXG5cbiAgICAgICAgICBzY2FsZWRQREYgKj0gMSAtIChtIC8gKE4gLSBzYW1wbGVzRG9uZSkpO1xuXG4gICAgICAgICAgLy8gU2F5IHdlJ3ZlIG5vcm1hbGl6ZWQgYnkgdGhpcyBzYW1wbGUgYWxyZWFkeS5cbiAgICAgICAgICBzYW1wbGVzRG9uZSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV29yayBvdXQgdGhlIHBhcnRpYWxseS1ub3JtYWxpemVkIGh5cGVyZ2VvbWV0cmljIFBERiBmb3IgdGhlIG5leHRcbiAgICAgICAgLy8gbnVtYmVyIG9mIHN1Y2Nlc3Nlc1xuICAgICAgICBzY2FsZWRQREYgKj0gKG4gLSBpKSAqIChtIC0gaSkgLyAoKGkgKyAxKSAqIChOIC0gbSAtIG4gKyBpICsgMSkpO1xuICAgICAgfVxuXG4gICAgICBmb3IoOyBzYW1wbGVzRG9uZSA8IG47IHNhbXBsZXNEb25lKyspIHtcbiAgICAgICAgLy8gQXBwbHkgYWxsIHRoZSByZXN0IG9mIHRoZSBub3JtYWxpemF0aW9uXG4gICAgICAgIHNjYWxlZFBERiAqPSAxIC0gKG0gLyAoTiAtIHNhbXBsZXNEb25lKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEJvdW5kIGFuc3dlciBzYW5lbHkgYmVmb3JlIHJldHVybmluZy5cbiAgICAgIHJldHVybiBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCBzY2FsZWRQREYpKTtcbiAgICB9XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgTiwgbSwgbikge1xuICAgIC8vIEh5cGVyZ2VvbWV0cmljIENERi5cblxuICAgIC8vIFRoaXMgYWxnb3JpdGhtIGlzIGR1ZSB0byBQcm9mLiBUaG9tYXMgUy4gRmVyZ3Vzb24sIDx0b21AbWF0aC51Y2xhLmVkdT4sXG4gICAgLy8gYW5kIGNvbWVzIGZyb20gaGlzIGh5cGVyZ2VvbWV0cmljIHRlc3QgY2FsY3VsYXRvciBhdFxuICAgIC8vIDxodHRwOi8vd3d3Lm1hdGgudWNsYS5lZHUvfnRvbS9kaXN0cmlidXRpb25zL0h5cGVyZ2VvbWV0cmljLmh0bWw+LlxuXG4gICAgLy8geCA9IG51bWJlciBvZiBzdWNjZXNzZXMgZHJhd25cbiAgICAvLyBOID0gcG9wdWxhdGlvbiBzaXplXG4gICAgLy8gbSA9IG51bWJlciBvZiBzdWNjZXNzZXMgaW4gcG9wdWxhdGlvblxuICAgIC8vIG4gPSBudW1iZXIgb2YgaXRlbXMgZHJhd24gZnJvbSBwb3B1bGF0aW9uXG5cbiAgICBpZih4IDwgMCB8fCB4IDwgbSAtIChOIC0gbikpIHtcbiAgICAgIC8vIEl0J3MgaW1wb3NzaWJsZSB0byBoYXZlIHRoaXMgZmV3IHN1Y2Nlc3NlcyBkcmF3biBvciBmZXdlci5cbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZih4ID49IG4gfHwgeCA+PSBtKSB7XG4gICAgICAvLyBXZSB3aWxsIGFsd2F5cyBoYXZlIHRoaXMgbWFueSBzdWNjZXNzZXMgb3IgZmV3ZXIuXG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKG0gKiAyID4gTikge1xuICAgICAgLy8gTW9yZSB0aGFuIGhhbGYgdGhlIHBvcHVsYXRpb24gaXMgc3VjY2Vzc2VzLlxuXG4gICAgICBpZihuICogMiA+IE4pIHtcbiAgICAgICAgLy8gTW9yZSB0aGFuIGhhbGYgdGhlIHBvcHVsYXRpb24gaXMgc2FtcGxlZC5cblxuICAgICAgICByZXR1cm4galN0YXQuaHlwZ2VvbS5jZGYoTiAtIG0gLSBuICsgeCwgTiwgTiAtIG0sIE4gLSBuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGFsZiBvciBsZXNzIG9mIHRoZSBwb3B1bGF0aW9uIGlzIHNhbXBsZWQuXG5cbiAgICAgICAgcmV0dXJuIDEgLSBqU3RhdC5oeXBnZW9tLmNkZihuIC0geCAtIDEsIE4sIE4gLSBtLCBuKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZihuICogMiA+IE4pIHtcbiAgICAgIC8vIEhhbGYgb3IgbGVzcyBpcyBzdWNjZXNzZXMuXG5cbiAgICAgIHJldHVybiAxIC0galN0YXQuaHlwZ2VvbS5jZGYobSAtIHggLSAxLCBOLCBtLCBOIC0gbik7XG5cbiAgICB9IGVsc2UgaWYobSA8IG4pIHtcbiAgICAgIC8vIFdlIHdhbnQgdG8gaGF2ZSB0aGUgbnVtYmVyIG9mIHRoaW5ncyBzYW1wbGVkIHRvIGJlIGxlc3MgdGhhbiB0aGVcbiAgICAgIC8vIHN1Y2Nlc3NlcyBhdmFpbGFibGUuIFNvIHN3YXAgdGhlIGRlZmluaXRpb25zIG9mIHN1Y2Nlc3NmdWwgYW5kIHNhbXBsZWQuXG4gICAgICByZXR1cm4galN0YXQuaHlwZ2VvbS5jZGYoeCwgTiwgbiwgbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlIGdldCBoZXJlLCBoYWxmIG9yIGxlc3Mgb2YgdGhlIHBvcHVsYXRpb24gd2FzIHNhbXBsZWQsIGhhbGYgb3JcbiAgICAgIC8vIGxlc3Mgb2YgaXQgd2FzIHN1Y2Nlc3NlcywgYW5kIHdlIGhhZCBmZXdlciBzYW1wbGVkIHRoaW5ncyB0aGFuXG4gICAgICAvLyBzdWNjZXNzZXMuIE5vdyB3ZSBjYW4gZG8gdGhpcyBjb21wbGljYXRlZCBpdGVyYXRpdmUgYWxnb3JpdGhtIGluIGFuXG4gICAgICAvLyBlZmZpY2llbnQgd2F5LlxuXG4gICAgICAvLyBUaGUgYmFzaWMgcHJlbWlzZSBvZiB0aGUgYWxnb3JpdGhtIGlzIHRoYXQgd2UgcGFydGlhbGx5IG5vcm1hbGl6ZSBvdXJcbiAgICAgIC8vIGludGVybWVkaWF0ZSBzdW0gdG8ga2VlcCBpdCBpbiBhIG51bWVyaWNhbGx5IGdvb2QgcmVnaW9uLCBhbmQgdGhlblxuICAgICAgLy8gZmluaXNoIHRoZSBub3JtYWxpemF0aW9uIGF0IHRoZSBlbmQuXG5cbiAgICAgIC8vIEhvbGRzIHRoZSBpbnRlcm1lZGlhdGUsIHNjYWxlZCB0b3RhbCBDREYuXG4gICAgICB2YXIgc2NhbGVkQ0RGID0gMTtcblxuICAgICAgLy8gVGhpcyB2YXJpYWJsZSBob2xkcyB0aGUgc2NhbGVkIHByb2JhYmlsaXR5IG9mIHRoZSBjdXJyZW50IG51bWJlciBvZlxuICAgICAgLy8gc3VjY2Vzc2VzLlxuICAgICAgdmFyIHNjYWxlZFBERiA9IDE7XG5cbiAgICAgIC8vIFRoaXMga2VlcHMgdHJhY2sgb2YgaG93IG11Y2ggd2UgaGF2ZSBub3JtYWxpemVkLlxuICAgICAgdmFyIHNhbXBsZXNEb25lID0gMDtcblxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHg7IGkrKykge1xuICAgICAgICAvLyBGb3IgZXZlcnkgcG9zc2libGUgbnVtYmVyIG9mIHN1Y2Nlc3NlcyB1cCB0byB0aGF0IG9ic2VydmVkLi4uXG5cbiAgICAgICAgd2hpbGUoc2NhbGVkQ0RGID4gMSAmJiBzYW1wbGVzRG9uZSA8IG4pIHtcbiAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgcmVzdWx0IGlzIGdyb3dpbmcgdG9vIGJpZy4gQXBwbHkgc29tZSBvZiB0aGVcbiAgICAgICAgICAvLyBub3JtYWxpemF0aW9uIHRvIHNocmluayBldmVyeXRoaW5nLlxuXG4gICAgICAgICAgdmFyIGZhY3RvciA9IDEgLSAobSAvIChOIC0gc2FtcGxlc0RvbmUpKTtcblxuICAgICAgICAgIHNjYWxlZFBERiAqPSBmYWN0b3I7XG4gICAgICAgICAgc2NhbGVkQ0RGICo9IGZhY3RvcjtcblxuICAgICAgICAgIC8vIFNheSB3ZSd2ZSBub3JtYWxpemVkIGJ5IHRoaXMgc2FtcGxlIGFscmVhZHkuXG4gICAgICAgICAgc2FtcGxlc0RvbmUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBwYXJ0aWFsbHktbm9ybWFsaXplZCBoeXBlcmdlb21ldHJpYyBQREYgZm9yIHRoZSBuZXh0XG4gICAgICAgIC8vIG51bWJlciBvZiBzdWNjZXNzZXNcbiAgICAgICAgc2NhbGVkUERGICo9IChuIC0gaSkgKiAobSAtIGkpIC8gKChpICsgMSkgKiAoTiAtIG0gLSBuICsgaSArIDEpKTtcblxuICAgICAgICAvLyBBZGQgdG8gdGhlIENERiBhbnN3ZXIuXG4gICAgICAgIHNjYWxlZENERiArPSBzY2FsZWRQREY7XG4gICAgICB9XG5cbiAgICAgIGZvcig7IHNhbXBsZXNEb25lIDwgbjsgc2FtcGxlc0RvbmUrKykge1xuICAgICAgICAvLyBBcHBseSBhbGwgdGhlIHJlc3Qgb2YgdGhlIG5vcm1hbGl6YXRpb25cbiAgICAgICAgc2NhbGVkQ0RGICo9IDEgLSAobSAvIChOIC0gc2FtcGxlc0RvbmUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQm91bmQgYW5zd2VyIHNhbmVseSBiZWZvcmUgcmV0dXJuaW5nLlxuICAgICAgcmV0dXJuIE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHNjYWxlZENERikpO1xuICAgIH1cbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgdW5pZm9ybSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQucG9pc3Nvbiwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZihrLCBsKSB7XG4gICAgaWYgKGwgPCAwIHx8IChrICUgMSkgIT09IDAgfHwgayA8IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLnBvdyhsLCBrKSAqIE1hdGguZXhwKC1sKSAvIGpTdGF0LmZhY3RvcmlhbChrKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBsKSB7XG4gICAgdmFyIHN1bWFyciA9IFtdLFxuICAgIGsgPSAwO1xuICAgIGlmICh4IDwgMCkgcmV0dXJuIDA7XG4gICAgZm9yICg7IGsgPD0geDsgaysrKSB7XG4gICAgICBzdW1hcnIucHVzaChqU3RhdC5wb2lzc29uLnBkZihrLCBsKSk7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5zdW0oc3VtYXJyKTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24obCkge1xuICAgIHJldHVybiBsO1xuICB9LFxuXG4gIHZhcmlhbmNlIDogZnVuY3Rpb24obCkge1xuICAgIHJldHVybiBsO1xuICB9LFxuXG4gIHNhbXBsZVNtYWxsOiBmdW5jdGlvbiBzYW1wbGVTbWFsbChsKSB7XG4gICAgdmFyIHAgPSAxLCBrID0gMCwgTCA9IE1hdGguZXhwKC1sKTtcbiAgICBkbyB7XG4gICAgICBrKys7XG4gICAgICBwICo9IGpTdGF0Ll9yYW5kb21fZm4oKTtcbiAgICB9IHdoaWxlIChwID4gTCk7XG4gICAgcmV0dXJuIGsgLSAxO1xuICB9LFxuXG4gIHNhbXBsZUxhcmdlOiBmdW5jdGlvbiBzYW1wbGVMYXJnZShsKSB7XG4gICAgdmFyIGxhbSA9IGw7XG4gICAgdmFyIGs7XG4gICAgdmFyIFUsIFYsIHNsYW0sIGxvZ2xhbSwgYSwgYiwgaW52YWxwaGEsIHZyLCB1cztcblxuICAgIHNsYW0gPSBNYXRoLnNxcnQobGFtKTtcbiAgICBsb2dsYW0gPSBNYXRoLmxvZyhsYW0pO1xuICAgIGIgPSAwLjkzMSArIDIuNTMgKiBzbGFtO1xuICAgIGEgPSAtMC4wNTkgKyAwLjAyNDgzICogYjtcbiAgICBpbnZhbHBoYSA9IDEuMTIzOSArIDEuMTMyOCAvIChiIC0gMy40KTtcbiAgICB2ciA9IDAuOTI3NyAtIDMuNjIyNCAvIChiIC0gMik7XG5cbiAgICB3aGlsZSAoMSkge1xuICAgICAgVSA9IE1hdGgucmFuZG9tKCkgLSAwLjU7XG4gICAgICBWID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIHVzID0gMC41IC0gTWF0aC5hYnMoVSk7XG4gICAgICBrID0gTWF0aC5mbG9vcigoMiAqIGEgLyB1cyArIGIpICogVSArIGxhbSArIDAuNDMpO1xuICAgICAgaWYgKCh1cyA+PSAwLjA3KSAmJiAoViA8PSB2cikpIHtcbiAgICAgICAgICByZXR1cm4gaztcbiAgICAgIH1cbiAgICAgIGlmICgoayA8IDApIHx8ICgodXMgPCAwLjAxMykgJiYgKFYgPiB1cykpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvKiBsb2coVikgPT0gbG9nKDAuMCkgb2sgaGVyZSAqL1xuICAgICAgLyogaWYgVT09MC4wIHNvIHRoYXQgdXM9PTAuMCwgbG9nIGlzIG9rIHNpbmNlIGFsd2F5cyByZXR1cm5zICovXG4gICAgICBpZiAoKE1hdGgubG9nKFYpICsgTWF0aC5sb2coaW52YWxwaGEpIC0gTWF0aC5sb2coYSAvICh1cyAqIHVzKSArIGIpKSA8PSAoLWxhbSArIGsgKiBsb2dsYW0gLSBqU3RhdC5sb2dnYW0oayArIDEpKSkge1xuICAgICAgICAgIHJldHVybiBrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShsKSB7XG4gICAgaWYgKGwgPCAxMClcbiAgICAgIHJldHVybiB0aGlzLnNhbXBsZVNtYWxsKGwpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLnNhbXBsZUxhcmdlKGwpO1xuICB9XG59KTtcblxuLy8gZXh0ZW5kIHRyaWFuZ3VsYXIgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LnRyaWFuZ3VsYXIsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgYSwgYiwgYykge1xuICAgIGlmIChiIDw9IGEgfHwgYyA8IGEgfHwgYyA+IGIpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh4IDwgYSB8fCB4ID4gYikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSBpZiAoeCA8IGMpIHtcbiAgICAgICAgICByZXR1cm4gKDIgKiAoeCAtIGEpKSAvICgoYiAtIGEpICogKGMgLSBhKSk7XG4gICAgICB9IGVsc2UgaWYgKHggPT09IGMpIHtcbiAgICAgICAgICByZXR1cm4gKDIgLyAoYiAtIGEpKTtcbiAgICAgIH0gZWxzZSB7IC8vIHggPiBjXG4gICAgICAgICAgcmV0dXJuICgyICogKGIgLSB4KSkgLyAoKGIgLSBhKSAqIChiIC0gYykpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBhLCBiLCBjKSB7XG4gICAgaWYgKGIgPD0gYSB8fCBjIDwgYSB8fCBjID4gYilcbiAgICAgIHJldHVybiBOYU47XG4gICAgaWYgKHggPD0gYSlcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKHggPj0gYilcbiAgICAgIHJldHVybiAxO1xuICAgIGlmICh4IDw9IGMpXG4gICAgICByZXR1cm4gTWF0aC5wb3coeCAtIGEsIDIpIC8gKChiIC0gYSkgKiAoYyAtIGEpKTtcbiAgICBlbHNlIC8vIHggPiBjXG4gICAgICByZXR1cm4gMSAtIE1hdGgucG93KGIgLSB4LCAyKSAvICgoYiAtIGEpICogKGIgLSBjKSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbiBpbnYocCwgYSwgYiwgYykge1xuICAgIGlmIChiIDw9IGEgfHwgYyA8IGEgfHwgYyA+IGIpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwIDw9ICgoYyAtIGEpIC8gKGIgLSBhKSkpIHtcbiAgICAgICAgcmV0dXJuIGEgKyAoYiAtIGEpICogTWF0aC5zcXJ0KHAgKiAoKGMgLSBhKSAvIChiIC0gYSkpKTtcbiAgICAgIH0gZWxzZSB7IC8vIHAgPiAoKGMgLSBhKSAvIChiIC0gYSkpXG4gICAgICAgIHJldHVybiBhICsgKGIgLSBhKSAqICgxIC0gTWF0aC5zcXJ0KCgxIC0gcCkgKiAoMSAtICgoYyAtIGEpIC8gKGIgLSBhKSkpKSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oYSwgYiwgYykge1xuICAgIHJldHVybiAoYSArIGIgKyBjKSAvIDM7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oYSwgYiwgYykge1xuICAgIGlmIChjIDw9IChhICsgYikgLyAyKSB7XG4gICAgICByZXR1cm4gYiAtIE1hdGguc3FydCgoYiAtIGEpICogKGIgLSBjKSkgLyBNYXRoLnNxcnQoMik7XG4gICAgfSBlbHNlIGlmIChjID4gKGEgKyBiKSAvIDIpIHtcbiAgICAgIHJldHVybiBhICsgTWF0aC5zcXJ0KChiIC0gYSkgKiAoYyAtIGEpKSAvIE1hdGguc3FydCgyKTtcbiAgICB9XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShhLCBiLCBjKSB7XG4gICAgcmV0dXJuIGM7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoYSwgYiwgYykge1xuICAgIHZhciB1ID0galN0YXQuX3JhbmRvbV9mbigpO1xuICAgIGlmICh1IDwgKChjIC0gYSkgLyAoYiAtIGEpKSlcbiAgICAgIHJldHVybiBhICsgTWF0aC5zcXJ0KHUgKiAoYiAtIGEpICogKGMgLSBhKSlcbiAgICByZXR1cm4gYiAtIE1hdGguc3FydCgoMSAtIHUpICogKGIgLSBhKSAqIChiIC0gYykpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShhLCBiLCBjKSB7XG4gICAgcmV0dXJuIChhICogYSArIGIgKiBiICsgYyAqIGMgLSBhICogYiAtIGEgKiBjIC0gYiAqIGMpIC8gMTg7XG4gIH1cbn0pO1xuXG5cbi8vIGV4dGVuZCBhcmNzaW5lIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5hcmNzaW5lLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGEsIGIpIHtcbiAgICBpZiAoYiA8PSBhKSByZXR1cm4gTmFOO1xuXG4gICAgcmV0dXJuICh4IDw9IGEgfHwgeCA+PSBiKSA/IDAgOlxuICAgICAgKDIgLyBNYXRoLlBJKSAqXG4gICAgICAgIE1hdGgucG93KE1hdGgucG93KGIgLSBhLCAyKSAtXG4gICAgICAgICAgICAgICAgICBNYXRoLnBvdygyICogeCAtIGEgLSBiLCAyKSwgLTAuNSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgYSwgYikge1xuICAgIGlmICh4IDwgYSlcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKHggPCBiKVxuICAgICAgcmV0dXJuICgyIC8gTWF0aC5QSSkgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KCh4IC0gYSkvKGIgLSBhKSkpO1xuICAgIHJldHVybiAxO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgYSwgYikge1xuICAgIHJldHVybiBhICsgKDAuNSAtIDAuNSAqIE1hdGguY29zKE1hdGguUEkgKiBwKSkgKiAoYiAtIGEpO1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oYSwgYikge1xuICAgIGlmIChiIDw9IGEpIHJldHVybiBOYU47XG4gICAgcmV0dXJuIChhICsgYikgLyAyO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGEsIGIpIHtcbiAgICBpZiAoYiA8PSBhKSByZXR1cm4gTmFOO1xuICAgIHJldHVybiAoYSArIGIpIC8gMjtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKC8qYSwgYiovKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtb2RlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShhLCBiKSB7XG4gICAgcmV0dXJuICgoYSArIGIpIC8gMikgKyAoKGIgLSBhKSAvIDIpICpcbiAgICAgIE1hdGguc2luKDIgKiBNYXRoLlBJICogalN0YXQudW5pZm9ybS5zYW1wbGUoMCwgMSkpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShhLCBiKSB7XG4gICAgaWYgKGIgPD0gYSkgcmV0dXJuIE5hTjtcbiAgICByZXR1cm4gTWF0aC5wb3coYiAtIGEsIDIpIC8gODtcbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gbGFwbGFjZVNpZ24oeCkgeyByZXR1cm4geCAvIE1hdGguYWJzKHgpOyB9XG5cbmpTdGF0LmV4dGVuZChqU3RhdC5sYXBsYWNlLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIG11LCBiKSB7XG4gICAgcmV0dXJuIChiIDw9IDApID8gMCA6IChNYXRoLmV4cCgtTWF0aC5hYnMoeCAtIG11KSAvIGIpKSAvICgyICogYik7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgbXUsIGIpIHtcbiAgICBpZiAoYiA8PSAwKSB7IHJldHVybiAwOyB9XG5cbiAgICBpZih4IDwgbXUpIHtcbiAgICAgIHJldHVybiAwLjUgKiBNYXRoLmV4cCgoeCAtIG11KSAvIGIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMSAtIDAuNSAqIE1hdGguZXhwKC0gKHggLSBtdSkgLyBiKTtcbiAgICB9XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24obXUvKiwgYiovKSB7XG4gICAgcmV0dXJuIG11O1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24obXUvKiwgYiovKSB7XG4gICAgcmV0dXJuIG11O1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uKG11LyosIGIqLykge1xuICAgIHJldHVybiBtdTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24obXUsIGIpIHtcbiAgICByZXR1cm4gMiAqIGIgKiBiO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKG11LCBiKSB7XG4gICAgdmFyIHUgPSBqU3RhdC5fcmFuZG9tX2ZuKCkgLSAwLjU7XG5cbiAgICByZXR1cm4gbXUgLSAoYiAqIGxhcGxhY2VTaWduKHUpICogTWF0aC5sb2coMSAtICgyICogTWF0aC5hYnModSkpKSk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB0dWtleVdwcm9iKHcsIHJyLCBjYykge1xuICB2YXIgbmxlZyA9IDEyO1xuICB2YXIgaWhhbGYgPSA2O1xuXG4gIHZhciBDMSA9IC0zMDtcbiAgdmFyIEMyID0gLTUwO1xuICB2YXIgQzMgPSA2MDtcbiAgdmFyIGJiICAgPSA4O1xuICB2YXIgd2xhciA9IDM7XG4gIHZhciB3aW5jcjEgPSAyO1xuICB2YXIgd2luY3IyID0gMztcbiAgdmFyIHhsZWcgPSBbXG4gICAgMC45ODE1NjA2MzQyNDY3MTkyNTA2OTA1NDkwOTAxNDksXG4gICAgMC45MDQxMTcyNTYzNzA0NzQ4NTY2Nzg0NjU4NjYxMTksXG4gICAgMC43Njk5MDI2NzQxOTQzMDQ2ODcwMzY4OTM4MzMyMTMsXG4gICAgMC41ODczMTc5NTQyODY2MTc0NDcyOTY3MDI0MTg5NDEsXG4gICAgMC4zNjc4MzE0OTg5OTgxODAxOTM3NTI2OTE1MzY2NDQsXG4gICAgMC4xMjUyMzM0MDg1MTE0Njg5MTU0NzI0NDEzNjk0NjRcbiAgXTtcbiAgdmFyIGFsZWcgPSBbXG4gICAgMC4wNDcxNzUzMzYzODY1MTE4MjcxOTQ2MTU5NjE0ODUsXG4gICAgMC4xMDY5MzkzMjU5OTUzMTg0MzA5NjAyNTQ3MTgxOTQsXG4gICAgMC4xNjAwNzgzMjg1NDMzNDYyMjYzMzQ2NTI1Mjk1NDMsXG4gICAgMC4yMDMxNjc0MjY3MjMwNjU5MjE3NDkwNjQ0NTU4MTAsXG4gICAgMC4yMzM0OTI1MzY1MzgzNTQ4MDg3NjA4NDk4OTg5MjUsXG4gICAgMC4yNDkxNDcwNDU4MTM0MDI3ODUwMDA1NjI0MzYwNDNcbiAgXTtcblxuICB2YXIgcXNxeiA9IHcgKiAwLjU7XG5cbiAgLy8gaWYgdyA+PSAxNiB0aGVuIHRoZSBpbnRlZ3JhbCBsb3dlciBib3VuZCAob2NjdXJzIGZvciBjPTIwKVxuICAvLyBpcyAwLjk5OTk5OTk5OTk5OTk1IHNvIHJldHVybiBhIHZhbHVlIG9mIDEuXG5cbiAgaWYgKHFzcXogPj0gYmIpXG4gICAgcmV0dXJuIDEuMDtcblxuICAvLyBmaW5kIChmKHcvMikgLSAxKSBeIGNjXG4gIC8vIChmaXJzdCB0ZXJtIGluIGludGVncmFsIG9mIGhhcnRsZXkncyBmb3JtKS5cblxuICB2YXIgcHJfdyA9IDIgKiBqU3RhdC5ub3JtYWwuY2RmKHFzcXosIDAsIDEsIDEsIDApIC0gMTsgLy8gZXJmKHFzcXogLyBNX1NRUlQyKVxuICAvLyBpZiBwcl93IF4gY2MgPCAyZS0yMiB0aGVuIHNldCBwcl93ID0gMFxuICBpZiAocHJfdyA+PSBNYXRoLmV4cChDMiAvIGNjKSlcbiAgICBwcl93ID0gTWF0aC5wb3cocHJfdywgY2MpO1xuICBlbHNlXG4gICAgcHJfdyA9IDAuMDtcblxuICAvLyBpZiB3IGlzIGxhcmdlIHRoZW4gdGhlIHNlY29uZCBjb21wb25lbnQgb2YgdGhlXG4gIC8vIGludGVncmFsIGlzIHNtYWxsLCBzbyBmZXdlciBpbnRlcnZhbHMgYXJlIG5lZWRlZC5cblxuICB2YXIgd2luY3I7XG4gIGlmICh3ID4gd2xhcilcbiAgICB3aW5jciA9IHdpbmNyMTtcbiAgZWxzZVxuICAgIHdpbmNyID0gd2luY3IyO1xuXG4gIC8vIGZpbmQgdGhlIGludGVncmFsIG9mIHNlY29uZCB0ZXJtIG9mIGhhcnRsZXkncyBmb3JtXG4gIC8vIGZvciB0aGUgaW50ZWdyYWwgb2YgdGhlIHJhbmdlIGZvciBlcXVhbC1sZW5ndGhcbiAgLy8gaW50ZXJ2YWxzIHVzaW5nIGxlZ2VuZHJlIHF1YWRyYXR1cmUuICBsaW1pdHMgb2ZcbiAgLy8gaW50ZWdyYXRpb24gYXJlIGZyb20gKHcvMiwgOCkuICB0d28gb3IgdGhyZWVcbiAgLy8gZXF1YWwtbGVuZ3RoIGludGVydmFscyBhcmUgdXNlZC5cblxuICAvLyBibGIgYW5kIGJ1YiBhcmUgbG93ZXIgYW5kIHVwcGVyIGxpbWl0cyBvZiBpbnRlZ3JhdGlvbi5cblxuICB2YXIgYmxiID0gcXNxejtcbiAgdmFyIGJpbmMgPSAoYmIgLSBxc3F6KSAvIHdpbmNyO1xuICB2YXIgYnViID0gYmxiICsgYmluYztcbiAgdmFyIGVpbnN1bSA9IDAuMDtcblxuICAvLyBpbnRlZ3JhdGUgb3ZlciBlYWNoIGludGVydmFsXG5cbiAgdmFyIGNjMSA9IGNjIC0gMS4wO1xuICBmb3IgKHZhciB3aSA9IDE7IHdpIDw9IHdpbmNyOyB3aSsrKSB7XG4gICAgdmFyIGVsc3VtID0gMC4wO1xuICAgIHZhciBhID0gMC41ICogKGJ1YiArIGJsYik7XG5cbiAgICAvLyBsZWdlbmRyZSBxdWFkcmF0dXJlIHdpdGggb3JkZXIgPSBubGVnXG5cbiAgICB2YXIgYiA9IDAuNSAqIChidWIgLSBibGIpO1xuXG4gICAgZm9yICh2YXIgamogPSAxOyBqaiA8PSBubGVnOyBqaisrKSB7XG4gICAgICB2YXIgaiwgeHg7XG4gICAgICBpZiAoaWhhbGYgPCBqaikge1xuICAgICAgICBqID0gKG5sZWcgLSBqaikgKyAxO1xuICAgICAgICB4eCA9IHhsZWdbai0xXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGogPSBqajtcbiAgICAgICAgeHggPSAteGxlZ1tqLTFdO1xuICAgICAgfVxuICAgICAgdmFyIGMgPSBiICogeHg7XG4gICAgICB2YXIgYWMgPSBhICsgYztcblxuICAgICAgLy8gaWYgZXhwKC1xZXhwby8yKSA8IDllLTE0LFxuICAgICAgLy8gdGhlbiBkb2Vzbid0IGNvbnRyaWJ1dGUgdG8gaW50ZWdyYWxcblxuICAgICAgdmFyIHFleHBvID0gYWMgKiBhYztcbiAgICAgIGlmIChxZXhwbyA+IEMzKVxuICAgICAgICBicmVhaztcblxuICAgICAgdmFyIHBwbHVzID0gMiAqIGpTdGF0Lm5vcm1hbC5jZGYoYWMsIDAsIDEsIDEsIDApO1xuICAgICAgdmFyIHBtaW51cz0gMiAqIGpTdGF0Lm5vcm1hbC5jZGYoYWMsIHcsIDEsIDEsIDApO1xuXG4gICAgICAvLyBpZiByaW5zdW0gXiAoY2MtMSkgPCA5ZS0xNCxcbiAgICAgIC8vIHRoZW4gZG9lc24ndCBjb250cmlidXRlIHRvIGludGVncmFsXG5cbiAgICAgIHZhciByaW5zdW0gPSAocHBsdXMgKiAwLjUpIC0gKHBtaW51cyAqIDAuNSk7XG4gICAgICBpZiAocmluc3VtID49IE1hdGguZXhwKEMxIC8gY2MxKSkge1xuICAgICAgICByaW5zdW0gPSAoYWxlZ1tqLTFdICogTWF0aC5leHAoLSgwLjUgKiBxZXhwbykpKSAqIE1hdGgucG93KHJpbnN1bSwgY2MxKTtcbiAgICAgICAgZWxzdW0gKz0gcmluc3VtO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHN1bSAqPSAoKCgyLjAgKiBiKSAqIGNjKSAvIE1hdGguc3FydCgyICogTWF0aC5QSSkpO1xuICAgIGVpbnN1bSArPSBlbHN1bTtcbiAgICBibGIgPSBidWI7XG4gICAgYnViICs9IGJpbmM7XG4gIH1cblxuICAvLyBpZiBwcl93IF4gcnIgPCA5ZS0xNCwgdGhlbiByZXR1cm4gMFxuICBwcl93ICs9IGVpbnN1bTtcbiAgaWYgKHByX3cgPD0gTWF0aC5leHAoQzEgLyBycikpXG4gICAgcmV0dXJuIDA7XG5cbiAgcHJfdyA9IE1hdGgucG93KHByX3csIHJyKTtcbiAgaWYgKHByX3cgPj0gMSkgLy8gMSB3YXMgaU1heCB3YXMgZXBzXG4gICAgcmV0dXJuIDE7XG4gIHJldHVybiBwcl93O1xufVxuXG5mdW5jdGlvbiB0dWtleVFpbnYocCwgYywgdikge1xuICB2YXIgcDAgPSAwLjMyMjIzMjQyMTA4ODtcbiAgdmFyIHEwID0gMC45OTM0ODQ2MjYwNjBlLTAxO1xuICB2YXIgcDEgPSAtMS4wO1xuICB2YXIgcTEgPSAwLjU4ODU4MTU3MDQ5NTtcbiAgdmFyIHAyID0gLTAuMzQyMjQyMDg4NTQ3O1xuICB2YXIgcTIgPSAwLjUzMTEwMzQ2MjM2NjtcbiAgdmFyIHAzID0gLTAuMjA0MjMxMjEwMTI1O1xuICB2YXIgcTMgPSAwLjEwMzUzNzc1Mjg1MDtcbiAgdmFyIHA0ID0gLTAuNDUzNjQyMjEwMTQ4ZS0wNDtcbiAgdmFyIHE0ID0gMC4zODU2MDcwMDYzNGUtMDI7XG4gIHZhciBjMSA9IDAuODgzMjtcbiAgdmFyIGMyID0gMC4yMzY4O1xuICB2YXIgYzMgPSAxLjIxNDtcbiAgdmFyIGM0ID0gMS4yMDg7XG4gIHZhciBjNSA9IDEuNDE0MjtcbiAgdmFyIHZtYXggPSAxMjAuMDtcblxuICB2YXIgcHMgPSAwLjUgLSAwLjUgKiBwO1xuICB2YXIgeWkgPSBNYXRoLnNxcnQoTWF0aC5sb2coMS4wIC8gKHBzICogcHMpKSk7XG4gIHZhciB0ID0geWkgKyAoKCgoIHlpICogcDQgKyBwMykgKiB5aSArIHAyKSAqIHlpICsgcDEpICogeWkgKyBwMClcbiAgICAgLyAoKCgoIHlpICogcTQgKyBxMykgKiB5aSArIHEyKSAqIHlpICsgcTEpICogeWkgKyBxMCk7XG4gIGlmICh2IDwgdm1heCkgdCArPSAodCAqIHQgKiB0ICsgdCkgLyB2IC8gNC4wO1xuICB2YXIgcSA9IGMxIC0gYzIgKiB0O1xuICBpZiAodiA8IHZtYXgpIHEgKz0gLWMzIC8gdiArIGM0ICogdCAvIHY7XG4gIHJldHVybiB0ICogKHEgKiBNYXRoLmxvZyhjIC0gMS4wKSArIGM1KTtcbn1cblxualN0YXQuZXh0ZW5kKGpTdGF0LnR1a2V5LCB7XG4gIGNkZjogZnVuY3Rpb24gY2RmKHEsIG5tZWFucywgZGYpIHtcbiAgICAvLyBJZGVudGljYWwgaW1wbGVtZW50YXRpb24gYXMgdGhlIFIgcHR1a2V5KCkgZnVuY3Rpb24gYXMgb2YgY29tbWl0IDY4OTQ3XG4gICAgdmFyIHJyID0gMTtcbiAgICB2YXIgY2MgPSBubWVhbnM7XG5cbiAgICB2YXIgbmxlZ3EgPSAxNjtcbiAgICB2YXIgaWhhbGZxID0gODtcblxuICAgIHZhciBlcHMxID0gLTMwLjA7XG4gICAgdmFyIGVwczIgPSAxLjBlLTE0O1xuICAgIHZhciBkaGFmICA9IDEwMC4wO1xuICAgIHZhciBkcXVhciA9IDgwMC4wO1xuICAgIHZhciBkZWlnaCA9IDUwMDAuMDtcbiAgICB2YXIgZGxhcmcgPSAyNTAwMC4wO1xuICAgIHZhciB1bGVuMSA9IDEuMDtcbiAgICB2YXIgdWxlbjIgPSAwLjU7XG4gICAgdmFyIHVsZW4zID0gMC4yNTtcbiAgICB2YXIgdWxlbjQgPSAwLjEyNTtcbiAgICB2YXIgeGxlZ3EgPSBbXG4gICAgICAwLjk4OTQwMDkzNDk5MTY0OTkzMjU5NjE1NDE3MzQ1MCxcbiAgICAgIDAuOTQ0NTc1MDIzMDczMjMyNTc2MDc3OTg4NDE1NTM1LFxuICAgICAgMC44NjU2MzEyMDIzODc4MzE3NDM4ODA0Njc4OTc3MTIsXG4gICAgICAwLjc1NTQwNDQwODM1NTAwMzAzMzg5NTEwMTE5NDg0NyxcbiAgICAgIDAuNjE3ODc2MjQ0NDAyNjQzNzQ4NDQ2NjcxNzY0MDQ5LFxuICAgICAgMC40NTgwMTY3Nzc2NTcyMjczODYzNDI0MTk0NDI5ODQsXG4gICAgICAwLjI4MTYwMzU1MDc3OTI1ODkxMzIzMDQ2MDUwMTQ2MCxcbiAgICAgIDAuOTUwMTI1MDk4Mzc2Mzc0NDAxODUzMTkzMzU0MjUwZS0xXG4gICAgXTtcbiAgICB2YXIgYWxlZ3EgPSBbXG4gICAgICAwLjI3MTUyNDU5NDExNzU0MDk0ODUxNzgwNTcyNDU2MGUtMSxcbiAgICAgIDAuNjIyNTM1MjM5Mzg2NDc4OTI4NjI4NDM4MzY5OTQ0ZS0xLFxuICAgICAgMC45NTE1ODUxMTY4MjQ5Mjc4NDgwOTkyNTEwNzYwMjJlLTEsXG4gICAgICAwLjEyNDYyODk3MTI1NTUzMzg3MjA1MjQ3NjI4MjE5MixcbiAgICAgIDAuMTQ5NTk1OTg4ODE2NTc2NzMyMDgxNTAxNzMwNTQ3LFxuICAgICAgMC4xNjkxNTY1MTkzOTUwMDI1MzgxODkzMTIwNzkwMzAsXG4gICAgICAwLjE4MjYwMzQxNTA0NDkyMzU4ODg2Njc2MzY2Nzk2OSxcbiAgICAgIDAuMTg5NDUwNjEwNDU1MDY4NDk2Mjg1Mzk2NzIzMjA4XG4gICAgXTtcblxuICAgIGlmIChxIDw9IDApXG4gICAgICByZXR1cm4gMDtcblxuICAgIC8vIGRmIG11c3QgYmUgPiAxXG4gICAgLy8gdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCB0d28gdmFsdWVzXG5cbiAgICBpZiAoZGYgPCAyIHx8IHJyIDwgMSB8fCBjYyA8IDIpIHJldHVybiBOYU47XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShxKSlcbiAgICAgIHJldHVybiAxO1xuXG4gICAgaWYgKGRmID4gZGxhcmcpXG4gICAgICByZXR1cm4gdHVrZXlXcHJvYihxLCByciwgY2MpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGxlYWRpbmcgY29uc3RhbnRcblxuICAgIHZhciBmMiA9IGRmICogMC41O1xuICAgIHZhciBmMmxmID0gKChmMiAqIE1hdGgubG9nKGRmKSkgLSAoZGYgKiBNYXRoLmxvZygyKSkpIC0galN0YXQuZ2FtbWFsbihmMik7XG4gICAgdmFyIGYyMSA9IGYyIC0gMS4wO1xuXG4gICAgLy8gaW50ZWdyYWwgaXMgZGl2aWRlZCBpbnRvIHVuaXQsIGhhbGYtdW5pdCwgcXVhcnRlci11bml0LCBvclxuICAgIC8vIGVpZ2h0aC11bml0IGxlbmd0aCBpbnRlcnZhbHMgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSBvZiB0aGVcbiAgICAvLyBkZWdyZWVzIG9mIGZyZWVkb20uXG5cbiAgICB2YXIgZmY0ID0gZGYgKiAwLjI1O1xuICAgIHZhciB1bGVuO1xuICAgIGlmICAgICAgKGRmIDw9IGRoYWYpICB1bGVuID0gdWxlbjE7XG4gICAgZWxzZSBpZiAoZGYgPD0gZHF1YXIpIHVsZW4gPSB1bGVuMjtcbiAgICBlbHNlIGlmIChkZiA8PSBkZWlnaCkgdWxlbiA9IHVsZW4zO1xuICAgIGVsc2UgICAgICAgICAgICAgICAgICB1bGVuID0gdWxlbjQ7XG5cbiAgICBmMmxmICs9IE1hdGgubG9nKHVsZW4pO1xuXG4gICAgLy8gaW50ZWdyYXRlIG92ZXIgZWFjaCBzdWJpbnRlcnZhbFxuXG4gICAgdmFyIGFucyA9IDAuMDtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDUwOyBpKyspIHtcbiAgICAgIHZhciBvdHN1bSA9IDAuMDtcblxuICAgICAgLy8gbGVnZW5kcmUgcXVhZHJhdHVyZSB3aXRoIG9yZGVyID0gbmxlZ3FcbiAgICAgIC8vIG5vZGVzIChzdG9yZWQgaW4geGxlZ3EpIGFyZSBzeW1tZXRyaWMgYXJvdW5kIHplcm8uXG5cbiAgICAgIHZhciB0d2ExID0gKDIgKiBpIC0gMSkgKiB1bGVuO1xuXG4gICAgICBmb3IgKHZhciBqaiA9IDE7IGpqIDw9IG5sZWdxOyBqaisrKSB7XG4gICAgICAgIHZhciBqLCB0MTtcbiAgICAgICAgaWYgKGloYWxmcSA8IGpqKSB7XG4gICAgICAgICAgaiA9IGpqIC0gaWhhbGZxIC0gMTtcbiAgICAgICAgICB0MSA9IChmMmxmICsgKGYyMSAqIE1hdGgubG9nKHR3YTEgKyAoeGxlZ3Fbal0gKiB1bGVuKSkpKVxuICAgICAgICAgICAgICAtICgoKHhsZWdxW2pdICogdWxlbikgKyB0d2ExKSAqIGZmNCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaiA9IGpqIC0gMTtcbiAgICAgICAgICB0MSA9IChmMmxmICsgKGYyMSAqIE1hdGgubG9nKHR3YTEgLSAoeGxlZ3Fbal0gKiB1bGVuKSkpKVxuICAgICAgICAgICAgICArICgoKHhsZWdxW2pdICogdWxlbikgLSB0d2ExKSAqIGZmNCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBleHAodDEpIDwgOWUtMTQsIHRoZW4gZG9lc24ndCBjb250cmlidXRlIHRvIGludGVncmFsXG4gICAgICAgIHZhciBxc3F6O1xuICAgICAgICBpZiAodDEgPj0gZXBzMSkge1xuICAgICAgICAgIGlmIChpaGFsZnEgPCBqaikge1xuICAgICAgICAgICAgcXNxeiA9IHEgKiBNYXRoLnNxcnQoKCh4bGVncVtqXSAqIHVsZW4pICsgdHdhMSkgKiAwLjUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxc3F6ID0gcSAqIE1hdGguc3FydCgoKC0oeGxlZ3Fbal0gKiB1bGVuKSkgKyB0d2ExKSAqIDAuNSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2FsbCB3cHJvYiB0byBmaW5kIGludGVncmFsIG9mIHJhbmdlIHBvcnRpb25cblxuICAgICAgICAgIHZhciB3cHJiID0gdHVrZXlXcHJvYihxc3F6LCByciwgY2MpO1xuICAgICAgICAgIHZhciByb3RzdW0gPSAod3ByYiAqIGFsZWdxW2pdKSAqIE1hdGguZXhwKHQxKTtcbiAgICAgICAgICBvdHN1bSArPSByb3RzdW07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5kIGxlZ2VuZHJlIGludGVncmFsIGZvciBpbnRlcnZhbCBpXG4gICAgICAgIC8vIEwyMDA6XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGludGVncmFsIGZvciBpbnRlcnZhbCBpIDwgMWUtMTQsIHRoZW4gc3RvcC5cbiAgICAgIC8vIEhvd2V2ZXIsIGluIG9yZGVyIHRvIGF2b2lkIHNtYWxsIGFyZWEgdW5kZXIgbGVmdCB0YWlsLFxuICAgICAgLy8gYXQgbGVhc3QgIDEgLyB1bGVuICBpbnRlcnZhbHMgYXJlIGNhbGN1bGF0ZWQuXG4gICAgICBpZiAoaSAqIHVsZW4gPj0gMS4wICYmIG90c3VtIDw9IGVwczIpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBlbmQgb2YgaW50ZXJ2YWwgaVxuICAgICAgLy8gTDMzMDpcblxuICAgICAgYW5zICs9IG90c3VtO1xuICAgIH1cblxuICAgIGlmIChvdHN1bSA+IGVwczIpIHsgLy8gbm90IGNvbnZlcmdlZFxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0dWtleS5jZGYgZmFpbGVkIHRvIGNvbnZlcmdlJyk7XG4gICAgfVxuICAgIGlmIChhbnMgPiAxKVxuICAgICAgYW5zID0gMTtcbiAgICByZXR1cm4gYW5zO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgbm1lYW5zLCBkZikge1xuICAgIC8vIElkZW50aWNhbCBpbXBsZW1lbnRhdGlvbiBhcyB0aGUgUiBxdHVrZXkoKSBmdW5jdGlvbiBhcyBvZiBjb21taXQgNjg5NDdcbiAgICB2YXIgcnIgPSAxO1xuICAgIHZhciBjYyA9IG5tZWFucztcblxuICAgIHZhciBlcHMgPSAwLjAwMDE7XG4gICAgdmFyIG1heGl0ZXIgPSA1MDtcblxuICAgIC8vIGRmIG11c3QgYmUgPiAxIDsgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCB0d28gdmFsdWVzXG4gICAgaWYgKGRmIDwgMiB8fCByciA8IDEgfHwgY2MgPCAyKSByZXR1cm4gTmFOO1xuXG4gICAgaWYgKHAgPCAwIHx8IHAgPiAxKSByZXR1cm4gTmFOO1xuICAgIGlmIChwID09PSAwKSByZXR1cm4gMDtcbiAgICBpZiAocCA9PT0gMSkgcmV0dXJuIEluZmluaXR5O1xuXG4gICAgLy8gSW5pdGlhbCB2YWx1ZVxuXG4gICAgdmFyIHgwID0gdHVrZXlRaW52KHAsIGNjLCBkZik7XG5cbiAgICAvLyBGaW5kIHByb2IodmFsdWUgPCB4MClcblxuICAgIHZhciB2YWx4MCA9IGpTdGF0LnR1a2V5LmNkZih4MCwgbm1lYW5zLCBkZikgLSBwO1xuXG4gICAgLy8gRmluZCB0aGUgc2Vjb25kIGl0ZXJhdGUgYW5kIHByb2IodmFsdWUgPCB4MSkuXG4gICAgLy8gSWYgdGhlIGZpcnN0IGl0ZXJhdGUgaGFzIHByb2JhYmlsaXR5IHZhbHVlXG4gICAgLy8gZXhjZWVkaW5nIHAgdGhlbiBzZWNvbmQgaXRlcmF0ZSBpcyAxIGxlc3MgdGhhblxuICAgIC8vIGZpcnN0IGl0ZXJhdGU7IG90aGVyd2lzZSBpdCBpcyAxIGdyZWF0ZXIuXG5cbiAgICB2YXIgeDE7XG4gICAgaWYgKHZhbHgwID4gMC4wKVxuICAgICAgeDEgPSBNYXRoLm1heCgwLjAsIHgwIC0gMS4wKTtcbiAgICBlbHNlXG4gICAgICB4MSA9IHgwICsgMS4wO1xuICAgIHZhciB2YWx4MSA9IGpTdGF0LnR1a2V5LmNkZih4MSwgbm1lYW5zLCBkZikgLSBwO1xuXG4gICAgLy8gRmluZCBuZXcgaXRlcmF0ZVxuXG4gICAgdmFyIGFucztcbiAgICBmb3IodmFyIGl0ZXIgPSAxOyBpdGVyIDwgbWF4aXRlcjsgaXRlcisrKSB7XG4gICAgICBhbnMgPSB4MSAtICgodmFseDEgKiAoeDEgLSB4MCkpIC8gKHZhbHgxIC0gdmFseDApKTtcbiAgICAgIHZhbHgwID0gdmFseDE7XG5cbiAgICAgIC8vIE5ldyBpdGVyYXRlIG11c3QgYmUgPj0gMFxuXG4gICAgICB4MCA9IHgxO1xuICAgICAgaWYgKGFucyA8IDAuMCkge1xuICAgICAgICBhbnMgPSAwLjA7XG4gICAgICAgIHZhbHgxID0gLXA7XG4gICAgICB9XG4gICAgICAvLyBGaW5kIHByb2IodmFsdWUgPCBuZXcgaXRlcmF0ZSlcblxuICAgICAgdmFseDEgPSBqU3RhdC50dWtleS5jZGYoYW5zLCBubWVhbnMsIGRmKSAtIHA7XG4gICAgICB4MSA9IGFucztcblxuICAgICAgLy8gSWYgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gc3VjY2Vzc2l2ZVxuICAgICAgLy8gaXRlcmF0ZXMgaXMgbGVzcyB0aGFuIGVwcywgc3RvcFxuXG4gICAgICB2YXIgeGFicyA9IE1hdGguYWJzKHgxIC0geDApO1xuICAgICAgaWYgKHhhYnMgPCBlcHMpXG4gICAgICAgIHJldHVybiBhbnM7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCd0dWtleS5pbnYgZmFpbGVkIHRvIGNvbnZlcmdlJyk7XG4gIH1cbn0pO1xuXG59KGpTdGF0LCBNYXRoKSk7XG4vKiBQcm92aWRlcyBmdW5jdGlvbnMgZm9yIHRoZSBzb2x1dGlvbiBvZiBsaW5lYXIgc3lzdGVtIG9mIGVxdWF0aW9ucywgaW50ZWdyYXRpb24sIGV4dHJhcG9sYXRpb24sXG4gKiBpbnRlcnBvbGF0aW9uLCBlaWdlbnZhbHVlIHByb2JsZW1zLCBkaWZmZXJlbnRpYWwgZXF1YXRpb25zIGFuZCBQQ0EgYW5hbHlzaXMuICovXG5cbihmdW5jdGlvbihqU3RhdCwgTWF0aCkge1xuXG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIGlzQXJyYXkgPSBqU3RhdC51dGlscy5pc0FycmF5O1xuXG5mdW5jdGlvbiBpc1VzYWJsZShhcmcpIHtcbiAgcmV0dXJuIGlzQXJyYXkoYXJnKSB8fCBhcmcgaW5zdGFuY2VvZiBqU3RhdDtcbn1cblxualN0YXQuZXh0ZW5kKHtcblxuICAvLyBhZGQgYSB2ZWN0b3IvbWF0cml4IHRvIGEgdmVjdG9yL21hdHJpeCBvciBzY2FsYXJcbiAgYWRkOiBmdW5jdGlvbiBhZGQoYXJyLCBhcmcpIHtcbiAgICAvLyBjaGVjayBpZiBhcmcgaXMgYSB2ZWN0b3Igb3Igc2NhbGFyXG4gICAgaWYgKGlzVXNhYmxlKGFyZykpIHtcbiAgICAgIGlmICghaXNVc2FibGUoYXJnWzBdKSkgYXJnID0gWyBhcmcgXTtcbiAgICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSwgcm93LCBjb2wpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICsgYXJnW3Jvd11bY29sXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlICsgYXJnOyB9KTtcbiAgfSxcblxuICAvLyBzdWJ0cmFjdCBhIHZlY3RvciBvciBzY2FsYXIgZnJvbSB0aGUgdmVjdG9yXG4gIHN1YnRyYWN0OiBmdW5jdGlvbiBzdWJ0cmFjdChhcnIsIGFyZykge1xuICAgIC8vIGNoZWNrIGlmIGFyZyBpcyBhIHZlY3RvciBvciBzY2FsYXJcbiAgICBpZiAoaXNVc2FibGUoYXJnKSkge1xuICAgICAgaWYgKCFpc1VzYWJsZShhcmdbMF0pKSBhcmcgPSBbIGFyZyBdO1xuICAgICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICByZXR1cm4gdmFsdWUgLSBhcmdbcm93XVtjb2xdIHx8IDA7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZSAtIGFyZzsgfSk7XG4gIH0sXG5cbiAgLy8gbWF0cml4IGRpdmlzaW9uXG4gIGRpdmlkZTogZnVuY3Rpb24gZGl2aWRlKGFyciwgYXJnKSB7XG4gICAgaWYgKGlzVXNhYmxlKGFyZykpIHtcbiAgICAgIGlmICghaXNVc2FibGUoYXJnWzBdKSkgYXJnID0gWyBhcmcgXTtcbiAgICAgIHJldHVybiBqU3RhdC5tdWx0aXBseShhcnIsIGpTdGF0LmludihhcmcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZSAvIGFyZzsgfSk7XG4gIH0sXG5cbiAgLy8gbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gIG11bHRpcGx5OiBmdW5jdGlvbiBtdWx0aXBseShhcnIsIGFyZykge1xuICAgIHZhciByb3csIGNvbCwgbnJlc2NvbHMsIHN1bSwgbnJvdywgbmNvbCwgcmVzLCByZXNjb2xzO1xuICAgIC8vIGVnOiBhcnIgPSAyIGFyZyA9IDMgLT4gNiBmb3IgcmVzWzBdWzBdIHN0YXRlbWVudCBjbG9zdXJlXG4gICAgaWYgKGFyci5sZW5ndGggPT09IHVuZGVmaW5lZCAmJiBhcmcubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBhcnIgKiBhcmc7XG4gICAgfVxuICAgIG5yb3cgPSBhcnIubGVuZ3RoLFxuICAgIG5jb2wgPSBhcnJbMF0ubGVuZ3RoLFxuICAgIHJlcyA9IGpTdGF0Lnplcm9zKG5yb3csIG5yZXNjb2xzID0gKGlzVXNhYmxlKGFyZykpID8gYXJnWzBdLmxlbmd0aCA6IG5jb2wpLFxuICAgIHJlc2NvbHMgPSAwO1xuICAgIGlmIChpc1VzYWJsZShhcmcpKSB7XG4gICAgICBmb3IgKDsgcmVzY29scyA8IG5yZXNjb2xzOyByZXNjb2xzKyspIHtcbiAgICAgICAgZm9yIChyb3cgPSAwOyByb3cgPCBucm93OyByb3crKykge1xuICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBuY29sOyBjb2wrKylcbiAgICAgICAgICBzdW0gKz0gYXJyW3Jvd11bY29sXSAqIGFyZ1tjb2xdW3Jlc2NvbHNdO1xuICAgICAgICAgIHJlc1tyb3ddW3Jlc2NvbHNdID0gc3VtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gKG5yb3cgPT09IDEgJiYgcmVzY29scyA9PT0gMSkgPyByZXNbMF1bMF0gOiByZXM7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWUgKiBhcmc7IH0pO1xuICB9LFxuXG4gIC8vIG91dGVyKFsxLDIsM10sWzQsNSw2XSlcbiAgLy8gPT09XG4gIC8vIFtbMV0sWzJdLFszXV0gdGltZXMgW1s0LDUsNl1dXG4gIC8vIC0+XG4gIC8vIFtbNCw1LDZdLFs4LDEwLDEyXSxbMTIsMTUsMThdXVxuICBvdXRlcjpmdW5jdGlvbiBvdXRlcihBLCBCKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm11bHRpcGx5KEEubWFwKGZ1bmN0aW9uKHQpeyByZXR1cm4gW3RdIH0pLCBbQl0pO1xuICB9LFxuXG5cbiAgLy8gUmV0dXJucyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIG1hdHJpY2llc1xuICBkb3Q6IGZ1bmN0aW9uIGRvdChhcnIsIGFyZykge1xuICAgIGlmICghaXNVc2FibGUoYXJyWzBdKSkgYXJyID0gWyBhcnIgXTtcbiAgICBpZiAoIWlzVXNhYmxlKGFyZ1swXSkpIGFyZyA9IFsgYXJnIF07XG4gICAgLy8gY29udmVydCBjb2x1bW4gdG8gcm93IHZlY3RvclxuICAgIHZhciBsZWZ0ID0gKGFyclswXS5sZW5ndGggPT09IDEgJiYgYXJyLmxlbmd0aCAhPT0gMSkgPyBqU3RhdC50cmFuc3Bvc2UoYXJyKSA6IGFycixcbiAgICByaWdodCA9IChhcmdbMF0ubGVuZ3RoID09PSAxICYmIGFyZy5sZW5ndGggIT09IDEpID8galN0YXQudHJhbnNwb3NlKGFyZykgOiBhcmcsXG4gICAgcmVzID0gW10sXG4gICAgcm93ID0gMCxcbiAgICBucm93ID0gbGVmdC5sZW5ndGgsXG4gICAgbmNvbCA9IGxlZnRbMF0ubGVuZ3RoLFxuICAgIHN1bSwgY29sO1xuICAgIGZvciAoOyByb3cgPCBucm93OyByb3crKykge1xuICAgICAgcmVzW3Jvd10gPSBbXTtcbiAgICAgIHN1bSA9IDA7XG4gICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IG5jb2w7IGNvbCsrKVxuICAgICAgc3VtICs9IGxlZnRbcm93XVtjb2xdICogcmlnaHRbcm93XVtjb2xdO1xuICAgICAgcmVzW3Jvd10gPSBzdW07XG4gICAgfVxuICAgIHJldHVybiAocmVzLmxlbmd0aCA9PT0gMSkgPyByZXNbMF0gOiByZXM7XG4gIH0sXG5cbiAgLy8gcmFpc2UgZXZlcnkgZWxlbWVudCBieSBhIHNjYWxhclxuICBwb3c6IGZ1bmN0aW9uIHBvdyhhcnIsIGFyZykge1xuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gTWF0aC5wb3codmFsdWUsIGFyZyk7IH0pO1xuICB9LFxuXG4gIC8vIGV4cG9uZW50aWF0ZSBldmVyeSBlbGVtZW50XG4gIGV4cDogZnVuY3Rpb24gZXhwKGFycikge1xuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gTWF0aC5leHAodmFsdWUpOyB9KTtcbiAgfSxcblxuICAvLyBnZW5lcmF0ZSB0aGUgbmF0dXJhbCBsb2cgb2YgZXZlcnkgZWxlbWVudFxuICBsb2c6IGZ1bmN0aW9uIGV4cChhcnIpIHtcbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIE1hdGgubG9nKHZhbHVlKTsgfSk7XG4gIH0sXG5cbiAgLy8gZ2VuZXJhdGUgdGhlIGFic29sdXRlIHZhbHVlcyBvZiB0aGUgdmVjdG9yXG4gIGFiczogZnVuY3Rpb24gYWJzKGFycikge1xuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gTWF0aC5hYnModmFsdWUpOyB9KTtcbiAgfSxcblxuICAvLyBjb21wdXRlcyB0aGUgcC1ub3JtIG9mIHRoZSB2ZWN0b3JcbiAgLy8gSW4gdGhlIGNhc2UgdGhhdCBhIG1hdHJpeCBpcyBwYXNzZWQsIHVzZXMgdGhlIGZpcnN0IHJvdyBhcyB0aGUgdmVjdG9yXG4gIG5vcm06IGZ1bmN0aW9uIG5vcm0oYXJyLCBwKSB7XG4gICAgdmFyIG5ub3JtID0gMCxcbiAgICBpID0gMDtcbiAgICAvLyBjaGVjayB0aGUgcC12YWx1ZSBvZiB0aGUgbm9ybSwgYW5kIHNldCBmb3IgbW9zdCBjb21tb24gY2FzZVxuICAgIGlmIChpc05hTihwKSkgcCA9IDI7XG4gICAgLy8gY2hlY2sgaWYgbXVsdGktZGltZW5zaW9uYWwgYXJyYXksIGFuZCBtYWtlIHZlY3RvciBjb3JyZWN0aW9uXG4gICAgaWYgKGlzVXNhYmxlKGFyclswXSkpIGFyciA9IGFyclswXTtcbiAgICAvLyB2ZWN0b3Igbm9ybVxuICAgIGZvciAoOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBubm9ybSArPSBNYXRoLnBvdyhNYXRoLmFicyhhcnJbaV0pLCBwKTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgucG93KG5ub3JtLCAxIC8gcCk7XG4gIH0sXG5cbiAgLy8gY29tcHV0ZXMgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIHZlY3RvcnMgaW4gcmFkc1xuICAvLyBJbiBjYXNlIGEgbWF0cml4IGlzIHBhc3NlZCwgdGhpcyB1c2VzIHRoZSBmaXJzdCByb3cgYXMgdGhlIHZlY3RvclxuICBhbmdsZTogZnVuY3Rpb24gYW5nbGUoYXJyLCBhcmcpIHtcbiAgICByZXR1cm4gTWF0aC5hY29zKGpTdGF0LmRvdChhcnIsIGFyZykgLyAoalN0YXQubm9ybShhcnIpICogalN0YXQubm9ybShhcmcpKSk7XG4gIH0sXG5cbiAgLy8gYXVnbWVudCBvbmUgbWF0cml4IGJ5IGFub3RoZXJcbiAgLy8gTm90ZTogdGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgbWF0cml4LCBub3QgYSBqU3RhdCBvYmplY3RcbiAgYXVnOiBmdW5jdGlvbiBhdWcoYSwgYikge1xuICAgIHZhciBuZXdhcnIgPSBbXTtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3YXJyLnB1c2goYVtpXS5zbGljZSgpKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IG5ld2Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgcHVzaC5hcHBseShuZXdhcnJbaV0sIGJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3YXJyO1xuICB9LFxuXG4gIC8vIFRoZSBpbnYoKSBmdW5jdGlvbiBjYWxjdWxhdGVzIHRoZSBpbnZlcnNlIG9mIGEgbWF0cml4XG4gIC8vIENyZWF0ZSB0aGUgaW52ZXJzZSBieSBhdWdtZW50aW5nIHRoZSBtYXRyaXggYnkgdGhlIGlkZW50aXR5IG1hdHJpeCBvZiB0aGVcbiAgLy8gYXBwcm9wcmlhdGUgc2l6ZSwgYW5kIHRoZW4gdXNlIEctSiBlbGltaW5hdGlvbiBvbiB0aGUgYXVnbWVudGVkIG1hdHJpeC5cbiAgaW52OiBmdW5jdGlvbiBpbnYoYSkge1xuICAgIHZhciByb3dzID0gYS5sZW5ndGg7XG4gICAgdmFyIGNvbHMgPSBhWzBdLmxlbmd0aDtcbiAgICB2YXIgYiA9IGpTdGF0LmlkZW50aXR5KHJvd3MsIGNvbHMpO1xuICAgIHZhciBjID0galN0YXQuZ2F1c3Nfam9yZGFuKGEsIGIpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGo7XG5cbiAgICAvL1dlIG5lZWQgdG8gY29weSB0aGUgaW52ZXJzZSBwb3J0aW9uIHRvIGEgbmV3IG1hdHJpeCB0byByaWQgRy1KIGFydGlmYWN0c1xuICAgIGZvciAoOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gPSBbXTtcbiAgICAgIGZvciAoaiA9IGNvbHM7IGogPCBjWzBdLmxlbmd0aDsgaisrKVxuICAgICAgICByZXN1bHRbaV1baiAtIGNvbHNdID0gY1tpXVtqXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvLyBjYWxjdWxhdGUgdGhlIGRldGVybWluYW50IG9mIGEgbWF0cml4XG4gIGRldDogZnVuY3Rpb24gZGV0KGEpIHtcbiAgICB2YXIgYWxlbiA9IGEubGVuZ3RoLFxuICAgIGFsZW5kID0gYWxlbiAqIDIsXG4gICAgdmFscyA9IG5ldyBBcnJheShhbGVuZCksXG4gICAgcm93c2hpZnQgPSBhbGVuIC0gMSxcbiAgICBjb2xzaGlmdCA9IGFsZW5kIC0gMSxcbiAgICBtcm93ID0gcm93c2hpZnQgLSBhbGVuICsgMSxcbiAgICBtY29sID0gY29sc2hpZnQsXG4gICAgaSA9IDAsXG4gICAgcmVzdWx0ID0gMCxcbiAgICBqO1xuICAgIC8vIGNoZWNrIGZvciBzcGVjaWFsIDJ4MiBjYXNlXG4gICAgaWYgKGFsZW4gPT09IDIpIHtcbiAgICAgIHJldHVybiBhWzBdWzBdICogYVsxXVsxXSAtIGFbMF1bMV0gKiBhWzFdWzBdO1xuICAgIH1cbiAgICBmb3IgKDsgaSA8IGFsZW5kOyBpKyspIHtcbiAgICAgIHZhbHNbaV0gPSAxO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYWxlbjsgaSsrKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgYWxlbjsgaisrKSB7XG4gICAgICAgIHZhbHNbKG1yb3cgPCAwKSA/IG1yb3cgKyBhbGVuIDogbXJvdyBdICo9IGFbaV1bal07XG4gICAgICAgIHZhbHNbKG1jb2wgPCBhbGVuKSA/IG1jb2wgKyBhbGVuIDogbWNvbCBdICo9IGFbaV1bal07XG4gICAgICAgIG1yb3crKztcbiAgICAgICAgbWNvbC0tO1xuICAgICAgfVxuICAgICAgbXJvdyA9IC0tcm93c2hpZnQgLSBhbGVuICsgMTtcbiAgICAgIG1jb2wgPSAtLWNvbHNoaWZ0O1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYWxlbjsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gdmFsc1tpXTtcbiAgICB9XG4gICAgZm9yICg7IGkgPCBhbGVuZDsgaSsrKSB7XG4gICAgICByZXN1bHQgLT0gdmFsc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBnYXVzc19lbGltaW5hdGlvbjogZnVuY3Rpb24gZ2F1c3NfZWxpbWluYXRpb24oYSwgYikge1xuICAgIHZhciBpID0gMCxcbiAgICBqID0gMCxcbiAgICBuID0gYS5sZW5ndGgsXG4gICAgbSA9IGFbMF0ubGVuZ3RoLFxuICAgIGZhY3RvciA9IDEsXG4gICAgc3VtID0gMCxcbiAgICB4ID0gW10sXG4gICAgbWF1ZywgcGl2b3QsIHRlbXAsIGs7XG4gICAgYSA9IGpTdGF0LmF1ZyhhLCBiKTtcbiAgICBtYXVnID0gYVswXS5sZW5ndGg7XG4gICAgZm9yKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBwaXZvdCA9IGFbaV1baV07XG4gICAgICBqID0gaTtcbiAgICAgIGZvciAoayA9IGkgKyAxOyBrIDwgbTsgaysrKSB7XG4gICAgICAgIGlmIChwaXZvdCA8IE1hdGguYWJzKGFba11baV0pKSB7XG4gICAgICAgICAgcGl2b3QgPSBhW2tdW2ldO1xuICAgICAgICAgIGogPSBrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaiAhPSBpKSB7XG4gICAgICAgIGZvcihrID0gMDsgayA8IG1hdWc7IGsrKykge1xuICAgICAgICAgIHRlbXAgPSBhW2ldW2tdO1xuICAgICAgICAgIGFbaV1ba10gPSBhW2pdW2tdO1xuICAgICAgICAgIGFbal1ba10gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICBmYWN0b3IgPSBhW2pdW2ldIC8gYVtpXVtpXTtcbiAgICAgICAgZm9yKGsgPSBpOyBrIDwgbWF1ZzsgaysrKSB7XG4gICAgICAgICAgYVtqXVtrXSA9IGFbal1ba10gLSBmYWN0b3IgKiBhW2ldW2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoaSA9IG4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgc3VtID0gMDtcbiAgICAgIGZvciAoaiA9IGkgKyAxOyBqPD0gbiAtIDE7IGorKykge1xuICAgICAgICBzdW0gPSBzdW0gKyB4W2pdICogYVtpXVtqXTtcbiAgICAgIH1cbiAgICAgIHhbaV0gPShhW2ldW21hdWcgLSAxXSAtIHN1bSkgLyBhW2ldW2ldO1xuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfSxcblxuICBnYXVzc19qb3JkYW46IGZ1bmN0aW9uIGdhdXNzX2pvcmRhbihhLCBiKSB7XG4gICAgdmFyIG0gPSBqU3RhdC5hdWcoYSwgYik7XG4gICAgdmFyIGggPSBtLmxlbmd0aDtcbiAgICB2YXIgdyA9IG1bMF0ubGVuZ3RoO1xuICAgIHZhciBjID0gMDtcbiAgICB2YXIgeCwgeSwgeTI7XG4gICAgLy8gZmluZCBtYXggcGl2b3RcbiAgICBmb3IgKHkgPSAwOyB5IDwgaDsgeSsrKSB7XG4gICAgICB2YXIgbWF4cm93ID0geTtcbiAgICAgIGZvciAoeTIgPSB5KzE7IHkyIDwgaDsgeTIrKykge1xuICAgICAgICBpZiAoTWF0aC5hYnMobVt5Ml1beV0pID4gTWF0aC5hYnMobVttYXhyb3ddW3ldKSlcbiAgICAgICAgICBtYXhyb3cgPSB5MjtcbiAgICAgIH1cbiAgICAgIHZhciB0bXAgPSBtW3ldO1xuICAgICAgbVt5XSA9IG1bbWF4cm93XTtcbiAgICAgIG1bbWF4cm93XSA9IHRtcFxuICAgICAgZm9yICh5MiA9IHkrMTsgeTIgPCBoOyB5MisrKSB7XG4gICAgICAgIGMgPSBtW3kyXVt5XSAvIG1beV1beV07XG4gICAgICAgIGZvciAoeCA9IHk7IHggPCB3OyB4KyspIHtcbiAgICAgICAgICBtW3kyXVt4XSAtPSBtW3ldW3hdICogYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBiYWNrc3Vic3RpdHV0ZVxuICAgIGZvciAoeSA9IGgtMTsgeSA+PSAwOyB5LS0pIHtcbiAgICAgIGMgPSBtW3ldW3ldO1xuICAgICAgZm9yICh5MiA9IDA7IHkyIDwgeTsgeTIrKykge1xuICAgICAgICBmb3IgKHggPSB3LTE7IHggPiB5LTE7IHgtLSkge1xuICAgICAgICAgIG1beTJdW3hdIC09IG1beV1beF0gKiBtW3kyXVt5XSAvIGM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1beV1beV0gLz0gYztcbiAgICAgIGZvciAoeCA9IGg7IHggPCB3OyB4KyspIHtcbiAgICAgICAgbVt5XVt4XSAvPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbTtcbiAgfSxcblxuICAvLyBzb2x2ZSBlcXVhdGlvblxuICAvLyBBeD1iXG4gIC8vIEEgaXMgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgLy8gQT1bWzEsMiwzXSxbMCw0LDVdLFswLDYsN11dXG4gIC8vIGI9WzEsMiwzXVxuICAvLyB0cmlhVXBTb2x2ZShBLGIpIC8vIC0+IFsyLjY2NiwwLjE2NjYsMS42NjZdXG4gIC8vIGlmIHlvdSB1c2UgbWF0cml4IHN0eWxlXG4gIC8vIEE9W1sxLDIsM10sWzAsNCw1XSxbMCw2LDddXVxuICAvLyBiPVtbMV0sWzJdLFszXV1cbiAgLy8gd2lsbCByZXR1cm4gW1syLjY2Nl0sWzAuMTY2Nl0sWzEuNjY2XV1cbiAgdHJpYVVwU29sdmU6IGZ1bmN0aW9uIHRyaWFVcFNvbHZlKEEsIGIpIHtcbiAgICB2YXIgc2l6ZSA9IEFbMF0ubGVuZ3RoO1xuICAgIHZhciB4ID0galN0YXQuemVyb3MoMSwgc2l6ZSlbMF07XG4gICAgdmFyIHBhcnRzO1xuICAgIHZhciBtYXRyaXhfbW9kZSA9IGZhbHNlO1xuXG4gICAgaWYgKGJbMF0ubGVuZ3RoICE9IHVuZGVmaW5lZCkge1xuICAgICAgYiA9IGIubWFwKGZ1bmN0aW9uKGkpeyByZXR1cm4gaVswXSB9KTtcbiAgICAgIG1hdHJpeF9tb2RlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBqU3RhdC5hcmFuZ2Uoc2l6ZSAtIDEsIC0xLCAtMSkuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICBwYXJ0cyA9IGpTdGF0LmFyYW5nZShpICsgMSwgc2l6ZSkubWFwKGZ1bmN0aW9uKGopIHtcbiAgICAgICAgcmV0dXJuIHhbal0gKiBBW2ldW2pdO1xuICAgICAgfSk7XG4gICAgICB4W2ldID0gKGJbaV0gLSBqU3RhdC5zdW0ocGFydHMpKSAvIEFbaV1baV07XG4gICAgfSk7XG5cbiAgICBpZiAobWF0cml4X21vZGUpXG4gICAgICByZXR1cm4geC5tYXAoZnVuY3Rpb24oaSl7IHJldHVybiBbaV0gfSk7XG4gICAgcmV0dXJuIHg7XG4gIH0sXG5cbiAgdHJpYUxvd1NvbHZlOiBmdW5jdGlvbiB0cmlhTG93U29sdmUoQSwgYikge1xuICAgIC8vIGxpa2UgdG8gdHJpYVVwU29sdmUgYnV0IEEgaXMgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgICB2YXIgc2l6ZSA9IEFbMF0ubGVuZ3RoO1xuICAgIHZhciB4ID0galN0YXQuemVyb3MoMSwgc2l6ZSlbMF07XG4gICAgdmFyIHBhcnRzO1xuXG4gICAgdmFyIG1hdHJpeF9tb2RlPWZhbHNlO1xuICAgIGlmIChiWzBdLmxlbmd0aCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGIgPSBiLm1hcChmdW5jdGlvbihpKXsgcmV0dXJuIGlbMF0gfSk7XG4gICAgICBtYXRyaXhfbW9kZSA9IHRydWU7XG4gICAgfVxuXG4gICAgalN0YXQuYXJhbmdlKHNpemUpLmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgcGFydHMgPSBqU3RhdC5hcmFuZ2UoaSkubWFwKGZ1bmN0aW9uKGopIHtcbiAgICAgICAgcmV0dXJuIEFbaV1bal0gKiB4W2pdO1xuICAgICAgfSk7XG4gICAgICB4W2ldID0gKGJbaV0gLSBqU3RhdC5zdW0ocGFydHMpKSAvIEFbaV1baV07XG4gICAgfSlcblxuICAgIGlmIChtYXRyaXhfbW9kZSlcbiAgICAgIHJldHVybiB4Lm1hcChmdW5jdGlvbihpKXsgcmV0dXJuIFtpXSB9KTtcbiAgICByZXR1cm4geDtcbiAgfSxcblxuXG4gIC8vIEEgLT4gW0wsVV1cbiAgLy8gQT1MVVxuICAvLyBMIGlzIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4XG4gIC8vIFUgaXMgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgbHU6IGZ1bmN0aW9uIGx1KEEpIHtcbiAgICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICAgIC8vdmFyIEw9alN0YXQuZGlhZ29uYWwoalN0YXQub25lcygxLHNpemUpWzBdKTtcbiAgICB2YXIgTCA9IGpTdGF0LmlkZW50aXR5KHNpemUpO1xuICAgIHZhciBSID0galN0YXQuemVyb3MoQS5sZW5ndGgsIEFbMF0ubGVuZ3RoKTtcbiAgICB2YXIgcGFydHM7XG4gICAgalN0YXQuYXJhbmdlKHNpemUpLmZvckVhY2goZnVuY3Rpb24odCkge1xuICAgICAgUlswXVt0XSA9IEFbMF1bdF07XG4gICAgfSk7XG4gICAgalN0YXQuYXJhbmdlKDEsIHNpemUpLmZvckVhY2goZnVuY3Rpb24obCkge1xuICAgICAgalN0YXQuYXJhbmdlKGwpLmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBwYXJ0cyA9IGpTdGF0LmFyYW5nZShpKS5tYXAoZnVuY3Rpb24oamopIHtcbiAgICAgICAgICByZXR1cm4gTFtsXVtqal0gKiBSW2pqXVtpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIExbbF1baV0gPSAoQVtsXVtpXSAtIGpTdGF0LnN1bShwYXJ0cykpIC8gUltpXVtpXTtcbiAgICAgIH0pO1xuICAgICAgalN0YXQuYXJhbmdlKGwsIHNpemUpLmZvckVhY2goZnVuY3Rpb24oaikge1xuICAgICAgICBwYXJ0cyA9IGpTdGF0LmFyYW5nZShsKS5tYXAoZnVuY3Rpb24oamopIHtcbiAgICAgICAgICByZXR1cm4gTFtsXVtqal0gKiBSW2pqXVtqXTtcbiAgICAgICAgfSk7XG4gICAgICAgIFJbbF1bal0gPSBBW3BhcnRzLmxlbmd0aF1bal0gLSBqU3RhdC5zdW0ocGFydHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtMLCBSXTtcbiAgfSxcblxuICAvLyBBIC0+IFRcbiAgLy8gQT1UVCdcbiAgLy8gVCBpcyBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeFxuICBjaG9sZXNreTogZnVuY3Rpb24gY2hvbGVza3koQSkge1xuICAgIHZhciBzaXplID0gQS5sZW5ndGg7XG4gICAgdmFyIFQgPSBqU3RhdC56ZXJvcyhBLmxlbmd0aCwgQVswXS5sZW5ndGgpO1xuICAgIHZhciBwYXJ0cztcbiAgICBqU3RhdC5hcmFuZ2Uoc2l6ZSkuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICBwYXJ0cyA9IGpTdGF0LmFyYW5nZShpKS5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gTWF0aC5wb3coVFtpXVt0XSwyKTtcbiAgICAgIH0pO1xuICAgICAgVFtpXVtpXSA9IE1hdGguc3FydChBW2ldW2ldIC0galN0YXQuc3VtKHBhcnRzKSk7XG4gICAgICBqU3RhdC5hcmFuZ2UoaSArIDEsIHNpemUpLmZvckVhY2goZnVuY3Rpb24oaikge1xuICAgICAgICBwYXJ0cyA9IGpTdGF0LmFyYW5nZShpKS5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICAgIHJldHVybiBUW2ldW3RdICogVFtqXVt0XTtcbiAgICAgICAgfSk7XG4gICAgICAgIFRbal1baV0gPSAoQVtpXVtqXSAtIGpTdGF0LnN1bShwYXJ0cykpIC8gVFtpXVtpXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBUO1xuICB9LFxuXG5cbiAgZ2F1c3NfamFjb2JpOiBmdW5jdGlvbiBnYXVzc19qYWNvYmkoYSwgYiwgeCwgcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIG4gPSBhLmxlbmd0aDtcbiAgICB2YXIgbCA9IFtdO1xuICAgIHZhciB1ID0gW107XG4gICAgdmFyIGQgPSBbXTtcbiAgICB2YXIgeHYsIGMsIGgsIHhrO1xuICAgIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBsW2ldID0gW107XG4gICAgICB1W2ldID0gW107XG4gICAgICBkW2ldID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChpID4gaikge1xuICAgICAgICAgIGxbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIHVbaV1bal0gPSBkW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChpIDwgaikge1xuICAgICAgICAgIHVbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIGxbaV1bal0gPSBkW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkW2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICBsW2ldW2pdID0gdVtpXVtqXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaCA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihkKSwgalN0YXQuYWRkKGwsIHUpKSwgLTEpO1xuICAgIGMgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoZCksIGIpO1xuICAgIHh2ID0geDtcbiAgICB4ayA9IGpTdGF0LmFkZChqU3RhdC5tdWx0aXBseShoLCB4KSwgYyk7XG4gICAgaSA9IDI7XG4gICAgd2hpbGUgKE1hdGguYWJzKGpTdGF0Lm5vcm0oalN0YXQuc3VidHJhY3QoeGsseHYpKSkgPiByKSB7XG4gICAgICB4diA9IHhrO1xuICAgICAgeGsgPSBqU3RhdC5hZGQoalN0YXQubXVsdGlwbHkoaCwgeHYpLCBjKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHhrO1xuICB9LFxuXG4gIGdhdXNzX3NlaWRlbDogZnVuY3Rpb24gZ2F1c3Nfc2VpZGVsKGEsIGIsIHgsIHIpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIG4gPSBhLmxlbmd0aDtcbiAgICB2YXIgbCA9IFtdO1xuICAgIHZhciB1ID0gW107XG4gICAgdmFyIGQgPSBbXTtcbiAgICB2YXIgaiwgeHYsIGMsIGgsIHhrO1xuICAgIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBsW2ldID0gW107XG4gICAgICB1W2ldID0gW107XG4gICAgICBkW2ldID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChpID4gaikge1xuICAgICAgICAgIGxbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIHVbaV1bal0gPSBkW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChpIDwgaikge1xuICAgICAgICAgIHVbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIGxbaV1bal0gPSBkW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkW2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICBsW2ldW2pdID0gdVtpXVtqXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaCA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihqU3RhdC5hZGQoZCwgbCkpLCB1KSwgLTEpO1xuICAgIGMgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoalN0YXQuYWRkKGQsIGwpKSwgYik7XG4gICAgeHYgPSB4O1xuICAgIHhrID0galN0YXQuYWRkKGpTdGF0Lm11bHRpcGx5KGgsIHgpLCBjKTtcbiAgICBpID0gMjtcbiAgICB3aGlsZSAoTWF0aC5hYnMoalN0YXQubm9ybShqU3RhdC5zdWJ0cmFjdCh4aywgeHYpKSkgPiByKSB7XG4gICAgICB4diA9IHhrO1xuICAgICAgeGsgPSBqU3RhdC5hZGQoalN0YXQubXVsdGlwbHkoaCwgeHYpLCBjKTtcbiAgICAgIGkgPSBpICsgMTtcbiAgICB9XG4gICAgcmV0dXJuIHhrO1xuICB9LFxuXG4gIFNPUjogZnVuY3Rpb24gU09SKGEsIGIsIHgsIHIsIHcpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIG4gPSBhLmxlbmd0aDtcbiAgICB2YXIgbCA9IFtdO1xuICAgIHZhciB1ID0gW107XG4gICAgdmFyIGQgPSBbXTtcbiAgICB2YXIgaiwgeHYsIGMsIGgsIHhrO1xuICAgIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBsW2ldID0gW107XG4gICAgICB1W2ldID0gW107XG4gICAgICBkW2ldID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChpID4gaikge1xuICAgICAgICAgIGxbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIHVbaV1bal0gPSBkW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChpIDwgaikge1xuICAgICAgICAgIHVbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIGxbaV1bal0gPSBkW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkW2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICBsW2ldW2pdID0gdVtpXVtqXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaCA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihqU3RhdC5hZGQoZCwgalN0YXQubXVsdGlwbHkobCwgdykpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgalN0YXQuc3VidHJhY3QoalN0YXQubXVsdGlwbHkoZCwgMSAtIHcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqU3RhdC5tdWx0aXBseSh1LCB3KSkpO1xuICAgIGMgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoalN0YXQuYWRkKGQsXG4gICAgICAgIGpTdGF0Lm11bHRpcGx5KGwsIHcpKSksIGIpLCB3KTtcbiAgICB4diA9IHg7XG4gICAgeGsgPSBqU3RhdC5hZGQoalN0YXQubXVsdGlwbHkoaCwgeCksIGMpO1xuICAgIGkgPSAyO1xuICAgIHdoaWxlIChNYXRoLmFicyhqU3RhdC5ub3JtKGpTdGF0LnN1YnRyYWN0KHhrLCB4dikpKSA+IHIpIHtcbiAgICAgIHh2ID0geGs7XG4gICAgICB4ayA9IGpTdGF0LmFkZChqU3RhdC5tdWx0aXBseShoLCB4diksIGMpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4geGs7XG4gIH0sXG5cbiAgaG91c2Vob2xkZXI6IGZ1bmN0aW9uIGhvdXNlaG9sZGVyKGEpIHtcbiAgICB2YXIgbSA9IGEubGVuZ3RoO1xuICAgIHZhciBuID0gYVswXS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciB3ID0gW107XG4gICAgdmFyIHAgPSBbXTtcbiAgICB2YXIgYWxwaGEsIHIsIGssIGosIGZhY3RvcjtcbiAgICBmb3IgKDsgaSA8IG0gLSAxOyBpKyspIHtcbiAgICAgIGFscGhhID0gMDtcbiAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKVxuICAgICAgYWxwaGEgKz0gKGFbal1baV0gKiBhW2pdW2ldKTtcbiAgICAgIGZhY3RvciA9IChhW2kgKyAxXVtpXSA+IDApID8gLTEgOiAxO1xuICAgICAgYWxwaGEgPSBmYWN0b3IgKiBNYXRoLnNxcnQoYWxwaGEpO1xuICAgICAgciA9IE1hdGguc3FydCgoKChhbHBoYSAqIGFscGhhKSAtIGFbaSArIDFdW2ldICogYWxwaGEpIC8gMikpO1xuICAgICAgdyA9IGpTdGF0Lnplcm9zKG0sIDEpO1xuICAgICAgd1tpICsgMV1bMF0gPSAoYVtpICsgMV1baV0gLSBhbHBoYSkgLyAoMiAqIHIpO1xuICAgICAgZm9yIChrID0gaSArIDI7IGsgPCBtOyBrKyspIHdba11bMF0gPSBhW2tdW2ldIC8gKDIgKiByKTtcbiAgICAgIHAgPSBqU3RhdC5zdWJ0cmFjdChqU3RhdC5pZGVudGl0eShtLCBuKSxcbiAgICAgICAgICBqU3RhdC5tdWx0aXBseShqU3RhdC5tdWx0aXBseSh3LCBqU3RhdC50cmFuc3Bvc2UodykpLCAyKSk7XG4gICAgICBhID0galN0YXQubXVsdGlwbHkocCwgalN0YXQubXVsdGlwbHkoYSwgcCkpO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfSxcblxuICAvLyBBIC0+IFtRLFJdXG4gIC8vIFEgaXMgb3J0aG9nb25hbCBtYXRyaXhcbiAgLy8gUiBpcyB1cHBlciB0cmlhbmd1bGFyXG4gIFFSOiAoZnVuY3Rpb24oKSB7XG4gICAgLy8geCAtPiBRXG4gICAgLy8gZmluZCBhIG9ydGhvZ29uYWwgbWF0cml4IFEgc3QuXG4gICAgLy8gUXg9eVxuICAgIC8vIHkgaXMgW3x8eHx8LDAsMCwuLi5dXG5cbiAgICAvLyBxdWljayByZWZcbiAgICB2YXIgc3VtICAgPSBqU3RhdC5zdW07XG4gICAgdmFyIHJhbmdlID0galN0YXQuYXJhbmdlO1xuXG4gICAgZnVuY3Rpb24gcXIyKHgpIHtcbiAgICAgIC8vIHF1aWNrIGltcGxldGF0aW9uXG4gICAgICAvLyBodHRwczovL3d3dy5zdGF0Lndpc2MuZWR1L35sYXJnZXQvbWF0aDQ5Ni9xci5odG1sXG5cbiAgICAgIHZhciBuID0geC5sZW5ndGg7XG4gICAgICB2YXIgcCA9IHhbMF0ubGVuZ3RoO1xuXG4gICAgICB2YXIgciA9IGpTdGF0Lnplcm9zKHAsIHApO1xuICAgICAgeCA9IGpTdGF0LmNvcHkoeCk7XG5cbiAgICAgIHZhciBpLGosaztcbiAgICAgIGZvcihqID0gMDsgaiA8IHA7IGorKyl7XG4gICAgICAgIHJbal1bal0gPSBNYXRoLnNxcnQoc3VtKHJhbmdlKG4pLm1hcChmdW5jdGlvbihpKXtcbiAgICAgICAgICByZXR1cm4geFtpXVtqXSAqIHhbaV1bal07XG4gICAgICAgIH0pKSk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IG47IGkrKyl7XG4gICAgICAgICAgeFtpXVtqXSA9IHhbaV1bal0gLyByW2pdW2pdO1xuICAgICAgICB9XG4gICAgICAgIGZvcihrID0gaisxOyBrIDwgcDsgaysrKXtcbiAgICAgICAgICByW2pdW2tdID0gc3VtKHJhbmdlKG4pLm1hcChmdW5jdGlvbihpKXtcbiAgICAgICAgICAgIHJldHVybiB4W2ldW2pdICogeFtpXVtrXTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbjsgaSsrKXtcbiAgICAgICAgICAgIHhbaV1ba10gPSB4W2ldW2tdIC0geFtpXVtqXSpyW2pdW2tdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFt4LCByXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXIyO1xuICB9KCkpLFxuXG4gIGxzdHNxOiAoZnVuY3Rpb24oKSB7XG4gICAgLy8gc29sdmUgbGVhc3Qgc3F1YXJkIHByb2JsZW0gZm9yIEF4PWIgYXMgUVIgZGVjb21wb3NpdGlvbiB3YXkgaWYgYiBpc1xuICAgIC8vIFtbYjFdLFtiMl0sW2IzXV0gZm9ybSB3aWxsIHJldHVybiBbW3gxXSxbeDJdLFt4M11dIGFycmF5IGZvcm0gc29sdXRpb25cbiAgICAvLyBlbHNlIGIgaXMgW2IxLGIyLGIzXSBmb3JtIHdpbGwgcmV0dXJuIFt4MSx4Mix4M10gYXJyYXkgZm9ybSBzb2x1dGlvblxuICAgIGZ1bmN0aW9uIFJfSShBKSB7XG4gICAgICBBID0galN0YXQuY29weShBKTtcbiAgICAgIHZhciBzaXplID0gQS5sZW5ndGg7XG4gICAgICB2YXIgSSA9IGpTdGF0LmlkZW50aXR5KHNpemUpO1xuICAgICAgalN0YXQuYXJhbmdlKHNpemUgLSAxLCAtMSwgLTEpLmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBqU3RhdC5zbGljZUFzc2lnbihcbiAgICAgICAgICAgIEksIHsgcm93OiBpIH0sIGpTdGF0LmRpdmlkZShqU3RhdC5zbGljZShJLCB7IHJvdzogaSB9KSwgQVtpXVtpXSkpO1xuICAgICAgICBqU3RhdC5zbGljZUFzc2lnbihcbiAgICAgICAgICAgIEEsIHsgcm93OiBpIH0sIGpTdGF0LmRpdmlkZShqU3RhdC5zbGljZShBLCB7IHJvdzogaSB9KSwgQVtpXVtpXSkpO1xuICAgICAgICBqU3RhdC5hcmFuZ2UoaSkuZm9yRWFjaChmdW5jdGlvbihqKSB7XG4gICAgICAgICAgdmFyIGMgPSBqU3RhdC5tdWx0aXBseShBW2pdW2ldLCAtMSk7XG4gICAgICAgICAgdmFyIEFqID0galN0YXQuc2xpY2UoQSwgeyByb3c6IGogfSk7XG4gICAgICAgICAgdmFyIGNBaSA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0LnNsaWNlKEEsIHsgcm93OiBpIH0pLCBjKTtcbiAgICAgICAgICBqU3RhdC5zbGljZUFzc2lnbihBLCB7IHJvdzogaiB9LCBqU3RhdC5hZGQoQWosIGNBaSkpO1xuICAgICAgICAgIHZhciBJaiA9IGpTdGF0LnNsaWNlKEksIHsgcm93OiBqIH0pO1xuICAgICAgICAgIHZhciBjSWkgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5zbGljZShJLCB7IHJvdzogaSB9KSwgYyk7XG4gICAgICAgICAgalN0YXQuc2xpY2VBc3NpZ24oSSwgeyByb3c6IGogfSwgalN0YXQuYWRkKElqLCBjSWkpKTtcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIEk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcXJfc29sdmUoQSwgYil7XG4gICAgICB2YXIgYXJyYXlfbW9kZSA9IGZhbHNlO1xuICAgICAgaWYgKGJbMF0ubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gW2MxLGMyLGMzXSBtb2RlXG4gICAgICAgIGIgPSBiLm1hcChmdW5jdGlvbih4KXsgcmV0dXJuIFt4XSB9KTtcbiAgICAgICAgYXJyYXlfbW9kZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgUVIgPSBqU3RhdC5RUihBKTtcbiAgICAgIHZhciBRID0gUVJbMF07XG4gICAgICB2YXIgUiA9IFFSWzFdO1xuICAgICAgdmFyIGF0dHJzID0gQVswXS5sZW5ndGg7XG4gICAgICB2YXIgUTEgPSBqU3RhdC5zbGljZShRLHtjb2w6e2VuZDphdHRyc319KTtcbiAgICAgIHZhciBSMSA9IGpTdGF0LnNsaWNlKFIse3Jvdzp7ZW5kOmF0dHJzfX0pO1xuICAgICAgdmFyIFJJID0gUl9JKFIxKTtcbiAgICAgIHZhciBRMiA9IGpTdGF0LnRyYW5zcG9zZShRMSk7XG5cbiAgICAgIGlmKFEyWzBdLmxlbmd0aCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgUTIgPSBbUTJdOyAvLyBUaGUgY29uZnVzaW5nIGpTdGF0Lm11bHRpZmx5IGltcGxlbWVudGF0aW9uIHRocmVhdCBuYXR1cmUgcHJvY2VzcyBhZ2Fpbi5cbiAgICAgIH1cblxuICAgICAgdmFyIHggPSBqU3RhdC5tdWx0aXBseShqU3RhdC5tdWx0aXBseShSSSwgUTIpLCBiKTtcblxuICAgICAgaWYoeC5sZW5ndGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHggPSBbW3hdXTsgLy8gVGhlIGNvbmZ1c2luZyBqU3RhdC5tdWx0aWZseSBpbXBsZW1lbnRhdGlvbiB0aHJlYXQgbmF0dXJlIHByb2Nlc3MgYWdhaW4uXG4gICAgICB9XG5cblxuICAgICAgaWYgKGFycmF5X21vZGUpXG4gICAgICAgIHJldHVybiB4Lm1hcChmdW5jdGlvbihpKXsgcmV0dXJuIGlbMF0gfSk7XG4gICAgICByZXR1cm4geDtcbiAgICB9XG5cbiAgICByZXR1cm4gcXJfc29sdmU7XG4gIH0oKSksXG5cbiAgamFjb2JpOiBmdW5jdGlvbiBqYWNvYmkoYSkge1xuICAgIHZhciBjb25kaXRpb24gPSAxO1xuICAgIHZhciBuID0gYS5sZW5ndGg7XG4gICAgdmFyIGUgPSBqU3RhdC5pZGVudGl0eShuLCBuKTtcbiAgICB2YXIgZXYgPSBbXTtcbiAgICB2YXIgYiwgaSwgaiwgcCwgcSwgbWF4aW0sIHRoZXRhLCBzO1xuICAgIC8vIGNvbmRpdGlvbiA9PT0gMSBvbmx5IGlmIHRvbGVyYW5jZSBpcyBub3QgcmVhY2hlZFxuICAgIHdoaWxlIChjb25kaXRpb24gPT09IDEpIHtcbiAgICAgIG1heGltID0gYVswXVsxXTtcbiAgICAgIHAgPSAwO1xuICAgICAgcSA9IDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICBpZiAoaSAhPSBqKSB7XG4gICAgICAgICAgICBpZiAobWF4aW0gPCBNYXRoLmFicyhhW2ldW2pdKSkge1xuICAgICAgICAgICAgICBtYXhpbSA9IE1hdGguYWJzKGFbaV1bal0pO1xuICAgICAgICAgICAgICBwID0gaTtcbiAgICAgICAgICAgICAgcSA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYVtwXVtwXSA9PT0gYVtxXVtxXSlcbiAgICAgICAgdGhldGEgPSAoYVtwXVtxXSA+IDApID8gTWF0aC5QSSAvIDQgOiAtTWF0aC5QSSAvIDQ7XG4gICAgICBlbHNlXG4gICAgICAgIHRoZXRhID0gTWF0aC5hdGFuKDIgKiBhW3BdW3FdIC8gKGFbcF1bcF0gLSBhW3FdW3FdKSkgLyAyO1xuICAgICAgcyA9IGpTdGF0LmlkZW50aXR5KG4sIG4pO1xuICAgICAgc1twXVtwXSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICAgIHNbcF1bcV0gPSAtTWF0aC5zaW4odGhldGEpO1xuICAgICAgc1txXVtwXSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICAgIHNbcV1bcV0gPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICAvLyBlaWdlbiB2ZWN0b3IgbWF0cml4XG4gICAgICBlID0galN0YXQubXVsdGlwbHkoZSwgcyk7XG4gICAgICBiID0galN0YXQubXVsdGlwbHkoalN0YXQubXVsdGlwbHkoalN0YXQuaW52KHMpLCBhKSwgcyk7XG4gICAgICBhID0gYjtcbiAgICAgIGNvbmRpdGlvbiA9IDA7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICBpZiAoaSAhPSBqICYmIE1hdGguYWJzKGFbaV1bal0pID4gMC4wMDEpIHtcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIGV2LnB1c2goYVtpXVtpXSk7XG4gICAgLy9yZXR1cm5zIGJvdGggdGhlIGVpZ2VudmFsdWUgYW5kIGVpZ2VubWF0cml4XG4gICAgcmV0dXJuIFtlLCBldl07XG4gIH0sXG5cbiAgcnVuZ2VrdXR0YTogZnVuY3Rpb24gcnVuZ2VrdXR0YShmLCBoLCBwLCB0X2osIHVfaiwgb3JkZXIpIHtcbiAgICB2YXIgazEsIGsyLCB1X2oxLCBrMywgazQ7XG4gICAgaWYgKG9yZGVyID09PSAyKSB7XG4gICAgICB3aGlsZSAodF9qIDw9IHApIHtcbiAgICAgICAgazEgPSBoICogZih0X2osIHVfaik7XG4gICAgICAgIGsyID0gaCAqIGYodF9qICsgaCwgdV9qICsgazEpO1xuICAgICAgICB1X2oxID0gdV9qICsgKGsxICsgazIpIC8gMjtcbiAgICAgICAgdV9qID0gdV9qMTtcbiAgICAgICAgdF9qID0gdF9qICsgaDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yZGVyID09PSA0KSB7XG4gICAgICB3aGlsZSAodF9qIDw9IHApIHtcbiAgICAgICAgazEgPSBoICogZih0X2osIHVfaik7XG4gICAgICAgIGsyID0gaCAqIGYodF9qICsgaCAvIDIsIHVfaiArIGsxIC8gMik7XG4gICAgICAgIGszID0gaCAqIGYodF9qICsgaCAvIDIsIHVfaiArIGsyIC8gMik7XG4gICAgICAgIGs0ID0gaCAqIGYodF9qICtoLCB1X2ogKyBrMyk7XG4gICAgICAgIHVfajEgPSB1X2ogKyAoazEgKyAyICogazIgKyAyICogazMgKyBrNCkgLyA2O1xuICAgICAgICB1X2ogPSB1X2oxO1xuICAgICAgICB0X2ogPSB0X2ogKyBoO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdV9qO1xuICB9LFxuXG4gIHJvbWJlcmc6IGZ1bmN0aW9uIHJvbWJlcmcoZiwgYSwgYiwgb3JkZXIpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGggPSAoYiAtIGEpIC8gMjtcbiAgICB2YXIgeCA9IFtdO1xuICAgIHZhciBoMSA9IFtdO1xuICAgIHZhciBnID0gW107XG4gICAgdmFyIG0sIGExLCBqLCBrLCBJO1xuICAgIHdoaWxlIChpIDwgb3JkZXIgLyAyKSB7XG4gICAgICBJID0gZihhKTtcbiAgICAgIGZvciAoaiA9IGEsIGsgPSAwOyBqIDw9IGI7IGogPSBqICsgaCwgaysrKSB4W2tdID0gajtcbiAgICAgIG0gPSB4Lmxlbmd0aDtcbiAgICAgIGZvciAoaiA9IDE7IGogPCBtIC0gMTsgaisrKSB7XG4gICAgICAgIEkgKz0gKCgoaiAlIDIpICE9PSAwKSA/IDQgOiAyKSAqIGYoeFtqXSk7XG4gICAgICB9XG4gICAgICBJID0gKGggLyAzKSAqIChJICsgZihiKSk7XG4gICAgICBnW2ldID0gSTtcbiAgICAgIGggLz0gMjtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgYTEgPSBnLmxlbmd0aDtcbiAgICBtID0gMTtcbiAgICB3aGlsZSAoYTEgIT09IDEpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBhMSAtIDE7IGorKylcbiAgICAgIGgxW2pdID0gKChNYXRoLnBvdyg0LCBtKSkgKiBnW2ogKyAxXSAtIGdbal0pIC8gKE1hdGgucG93KDQsIG0pIC0gMSk7XG4gICAgICBhMSA9IGgxLmxlbmd0aDtcbiAgICAgIGcgPSBoMTtcbiAgICAgIGgxID0gW107XG4gICAgICBtKys7XG4gICAgfVxuICAgIHJldHVybiBnO1xuICB9LFxuXG4gIHJpY2hhcmRzb246IGZ1bmN0aW9uIHJpY2hhcmRzb24oWCwgZiwgeCwgaCkge1xuICAgIGZ1bmN0aW9uIHBvcyhYLCB4KSB7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgbiA9IFgubGVuZ3RoO1xuICAgICAgdmFyIHA7XG4gICAgICBmb3IgKDsgaSA8IG47IGkrKylcbiAgICAgICAgaWYgKFhbaV0gPT09IHgpIHAgPSBpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHZhciBoX21pbiA9IE1hdGguYWJzKHggLSBYW3BvcyhYLCB4KSArIDFdKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGcgPSBbXTtcbiAgICB2YXIgaDEgPSBbXTtcbiAgICB2YXIgeTEsIHkyLCBtLCBhLCBqO1xuICAgIHdoaWxlIChoID49IGhfbWluKSB7XG4gICAgICB5MSA9IHBvcyhYLCB4ICsgaCk7XG4gICAgICB5MiA9IHBvcyhYLCB4KTtcbiAgICAgIGdbaV0gPSAoZlt5MV0gLSAyICogZlt5Ml0gKyBmWzIgKiB5MiAtIHkxXSkgLyAoaCAqIGgpO1xuICAgICAgaCAvPSAyO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBhID0gZy5sZW5ndGg7XG4gICAgbSA9IDE7XG4gICAgd2hpbGUgKGEgIT0gMSkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGEgLSAxOyBqKyspXG4gICAgICAgIGgxW2pdID0gKChNYXRoLnBvdyg0LCBtKSkgKiBnW2ogKyAxXSAtIGdbal0pIC8gKE1hdGgucG93KDQsIG0pIC0gMSk7XG4gICAgICBhID0gaDEubGVuZ3RoO1xuICAgICAgZyA9IGgxO1xuICAgICAgaDEgPSBbXTtcbiAgICAgIG0rKztcbiAgICB9XG4gICAgcmV0dXJuIGc7XG4gIH0sXG5cbiAgc2ltcHNvbjogZnVuY3Rpb24gc2ltcHNvbihmLCBhLCBiLCBuKSB7XG4gICAgdmFyIGggPSAoYiAtIGEpIC8gbjtcbiAgICB2YXIgSSA9IGYoYSk7XG4gICAgdmFyIHggPSBbXTtcbiAgICB2YXIgaiA9IGE7XG4gICAgdmFyIGsgPSAwO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgbTtcbiAgICBmb3IgKDsgaiA8PSBiOyBqID0gaiArIGgsIGsrKylcbiAgICAgIHhba10gPSBqO1xuICAgIG0gPSB4Lmxlbmd0aDtcbiAgICBmb3IgKDsgaSA8IG0gLSAxOyBpKyspIHtcbiAgICAgIEkgKz0gKChpICUgMiAhPT0gMCkgPyA0IDogMikgKiBmKHhbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gKGggLyAzKSAqIChJICsgZihiKSk7XG4gIH0sXG5cbiAgaGVybWl0ZTogZnVuY3Rpb24gaGVybWl0ZShYLCBGLCBkRiwgdmFsdWUpIHtcbiAgICB2YXIgbiA9IFgubGVuZ3RoO1xuICAgIHZhciBwID0gMDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGwgPSBbXTtcbiAgICB2YXIgZGwgPSBbXTtcbiAgICB2YXIgQSA9IFtdO1xuICAgIHZhciBCID0gW107XG4gICAgdmFyIGo7XG4gICAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGxbaV0gPSAxO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBpZiAoaSAhPSBqKSBsW2ldICo9ICh2YWx1ZSAtIFhbal0pIC8gKFhbaV0gLSBYW2pdKTtcbiAgICAgIH1cbiAgICAgIGRsW2ldID0gMDtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGkgIT0gaikgZGxbaV0gKz0gMSAvIChYIFtpXSAtIFhbal0pO1xuICAgICAgfVxuICAgICAgQVtpXSA9ICgxIC0gMiAqICh2YWx1ZSAtIFhbaV0pICogZGxbaV0pICogKGxbaV0gKiBsW2ldKTtcbiAgICAgIEJbaV0gPSAodmFsdWUgLSBYW2ldKSAqIChsW2ldICogbFtpXSk7XG4gICAgICBwICs9IChBW2ldICogRltpXSArIEJbaV0gKiBkRltpXSk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9LFxuXG4gIGxhZ3JhbmdlOiBmdW5jdGlvbiBsYWdyYW5nZShYLCBGLCB2YWx1ZSkge1xuICAgIHZhciBwID0gMDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGosIGw7XG4gICAgdmFyIG4gPSBYLmxlbmd0aDtcbiAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgbCA9IEZbaV07XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIC8vIGNhbGN1bGF0aW5nIHRoZSBsYWdyYW5nZSBwb2x5bm9taWFsIExfaVxuICAgICAgICBpZiAoaSAhPSBqKSBsICo9ICh2YWx1ZSAtIFhbal0pIC8gKFhbaV0gLSBYW2pdKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkZGluZyB0aGUgbGFncmFuZ2UgcG9seW5vbWlhbHMgZm91bmQgYWJvdmVcbiAgICAgIHAgKz0gbDtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0sXG5cbiAgY3ViaWNfc3BsaW5lOiBmdW5jdGlvbiBjdWJpY19zcGxpbmUoWCwgRiwgdmFsdWUpIHtcbiAgICB2YXIgbiA9IFgubGVuZ3RoO1xuICAgIHZhciBpID0gMCwgajtcbiAgICB2YXIgQSA9IFtdO1xuICAgIHZhciBCID0gW107XG4gICAgdmFyIGFscGhhID0gW107XG4gICAgdmFyIGMgPSBbXTtcbiAgICB2YXIgaCA9IFtdO1xuICAgIHZhciBiID0gW107XG4gICAgdmFyIGQgPSBbXTtcbiAgICBmb3IgKDsgaSA8IG4gLSAxOyBpKyspXG4gICAgICBoW2ldID0gWFtpICsgMV0gLSBYW2ldO1xuICAgIGFscGhhWzBdID0gMDtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbiAtIDE7IGkrKykge1xuICAgICAgYWxwaGFbaV0gPSAoMyAvIGhbaV0pICogKEZbaSArIDFdIC0gRltpXSkgLVxuICAgICAgICAgICgzIC8gaFtpLTFdKSAqIChGW2ldIC0gRltpLTFdKTtcbiAgICB9XG4gICAgZm9yIChpID0gMTsgaSA8IG4gLSAxOyBpKyspIHtcbiAgICAgIEFbaV0gPSBbXTtcbiAgICAgIEJbaV0gPSBbXTtcbiAgICAgIEFbaV1baS0xXSA9IGhbaS0xXTtcbiAgICAgIEFbaV1baV0gPSAyICogKGhbaSAtIDFdICsgaFtpXSk7XG4gICAgICBBW2ldW2krMV0gPSBoW2ldO1xuICAgICAgQltpXVswXSA9IGFscGhhW2ldO1xuICAgIH1cbiAgICBjID0galN0YXQubXVsdGlwbHkoalN0YXQuaW52KEEpLCBCKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgbiAtIDE7IGorKykge1xuICAgICAgYltqXSA9IChGW2ogKyAxXSAtIEZbal0pIC8gaFtqXSAtIGhbal0gKiAoY1tqICsgMV1bMF0gKyAyICogY1tqXVswXSkgLyAzO1xuICAgICAgZFtqXSA9IChjW2ogKyAxXVswXSAtIGNbal1bMF0pIC8gKDMgKiBoW2pdKTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgaWYgKFhbal0gPiB2YWx1ZSkgYnJlYWs7XG4gICAgfVxuICAgIGogLT0gMTtcbiAgICByZXR1cm4gRltqXSArICh2YWx1ZSAtIFhbal0pICogYltqXSArIGpTdGF0LnNxKHZhbHVlLVhbal0pICpcbiAgICAgICAgY1tqXSArICh2YWx1ZSAtIFhbal0pICogalN0YXQuc3EodmFsdWUgLSBYW2pdKSAqIGRbal07XG4gIH0sXG5cbiAgZ2F1c3NfcXVhZHJhdHVyZTogZnVuY3Rpb24gZ2F1c3NfcXVhZHJhdHVyZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dhdXNzX3F1YWRyYXR1cmUgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICB9LFxuXG4gIFBDQTogZnVuY3Rpb24gUENBKFgpIHtcbiAgICB2YXIgbSA9IFgubGVuZ3RoO1xuICAgIHZhciBuID0gWFswXS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBqLCB0ZW1wMTtcbiAgICB2YXIgdSA9IFtdO1xuICAgIHZhciBEID0gW107XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciB0ZW1wMiA9IFtdO1xuICAgIHZhciBZID0gW107XG4gICAgdmFyIEJ0ID0gW107XG4gICAgdmFyIEIgPSBbXTtcbiAgICB2YXIgQyA9IFtdO1xuICAgIHZhciBWID0gW107XG4gICAgdmFyIFZ0ID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgdVtpXSA9IGpTdGF0LnN1bShYW2ldKSAvIG47XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIEJbaV0gPSBbXTtcbiAgICAgIGZvcihqID0gMDsgaiA8IG07IGorKykge1xuICAgICAgICBCW2ldW2pdID0gWFtqXVtpXSAtIHVbal07XG4gICAgICB9XG4gICAgfVxuICAgIEIgPSBqU3RhdC50cmFuc3Bvc2UoQik7XG4gICAgZm9yIChpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgQ1tpXSA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG07IGorKykge1xuICAgICAgICBDW2ldW2pdID0gKGpTdGF0LmRvdChbQltpXV0sIFtCW2pdXSkpIC8gKG4gLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0galN0YXQuamFjb2JpKEMpO1xuICAgIFYgPSByZXN1bHRbMF07XG4gICAgRCA9IHJlc3VsdFsxXTtcbiAgICBWdCA9IGpTdGF0LnRyYW5zcG9zZShWKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgRC5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChqID0gaTsgaiA8IEQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYoRFtpXSA8IERbal0pICB7XG4gICAgICAgICAgdGVtcDEgPSBEW2ldO1xuICAgICAgICAgIERbaV0gPSBEW2pdO1xuICAgICAgICAgIERbal0gPSB0ZW1wMTtcbiAgICAgICAgICB0ZW1wMiA9IFZ0W2ldO1xuICAgICAgICAgIFZ0W2ldID0gVnRbal07XG4gICAgICAgICAgVnRbal0gPSB0ZW1wMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBCdCA9IGpTdGF0LnRyYW5zcG9zZShCKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbTsgaSsrKSB7XG4gICAgICBZW2ldID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgQnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgWVtpXVtqXSA9IGpTdGF0LmRvdChbVnRbaV1dLCBbQnRbal1dKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtYLCBELCBWdCwgWV07XG4gIH1cbn0pO1xuXG4vLyBleHRlbmQgalN0YXQuZm4gd2l0aCBtZXRob2RzIHRoYXQgcmVxdWlyZSBvbmUgYXJndW1lbnRcbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqU3RhdC5mbltwYXNzZnVuY10gPSBmdW5jdGlvbihhcmcsIGZ1bmMpIHtcbiAgICAgIHZhciB0bXB0aGlzID0gdGhpcztcbiAgICAgIC8vIGNoZWNrIGZvciBjYWxsYmFja1xuICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBmdW5jLmNhbGwodG1wdGhpcywgalN0YXQuZm5bcGFzc2Z1bmNdLmNhbGwodG1wdGhpcywgYXJnKSk7XG4gICAgICAgIH0sIDE1KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGpTdGF0W3Bhc3NmdW5jXSh0aGlzLCBhcmcpID09PSAnbnVtYmVyJylcbiAgICAgICAgcmV0dXJuIGpTdGF0W3Bhc3NmdW5jXSh0aGlzLCBhcmcpO1xuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4galN0YXQoalN0YXRbcGFzc2Z1bmNdKHRoaXMsIGFyZykpO1xuICAgIH07XG4gIH0oZnVuY3NbaV0pKTtcbn0oJ2FkZCBkaXZpZGUgbXVsdGlwbHkgc3VidHJhY3QgZG90IHBvdyBleHAgbG9nIGFicyBub3JtIGFuZ2xlJy5zcGxpdCgnICcpKSk7XG5cbn0oalN0YXQsIE1hdGgpKTtcbihmdW5jdGlvbihqU3RhdCwgTWF0aCkge1xuXG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBpc051bWJlciA9IGpTdGF0LnV0aWxzLmlzTnVtYmVyO1xudmFyIGlzQXJyYXkgPSBqU3RhdC51dGlscy5pc0FycmF5O1xuXG4vLyBmbGFnPT10cnVlIGRlbm90ZXMgdXNlIG9mIHNhbXBsZSBzdGFuZGFyZCBkZXZpYXRpb25cbi8vIFogU3RhdGlzdGljc1xualN0YXQuZXh0ZW5kKHtcbiAgLy8gMiBkaWZmZXJlbnQgcGFyYW1ldGVyIGxpc3RzOlxuICAvLyAodmFsdWUsIG1lYW4sIHNkKVxuICAvLyAodmFsdWUsIGFycmF5LCBmbGFnKVxuICB6c2NvcmU6IGZ1bmN0aW9uIHpzY29yZSgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBpZiAoaXNOdW1iZXIoYXJnc1sxXSkpIHtcbiAgICAgIHJldHVybiAoYXJnc1swXSAtIGFyZ3NbMV0pIC8gYXJnc1syXTtcbiAgICB9XG4gICAgcmV0dXJuIChhcmdzWzBdIC0galN0YXQubWVhbihhcmdzWzFdKSkgLyBqU3RhdC5zdGRldihhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfSxcblxuICAvLyAzIGRpZmZlcmVudCBwYXJhbXRlciBsaXN0czpcbiAgLy8gKHZhbHVlLCBtZWFuLCBzZCwgc2lkZXMpXG4gIC8vICh6c2NvcmUsIHNpZGVzKVxuICAvLyAodmFsdWUsIGFycmF5LCBzaWRlcywgZmxhZylcbiAgenRlc3Q6IGZ1bmN0aW9uIHp0ZXN0KCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciB6O1xuICAgIGlmIChpc0FycmF5KGFyZ3NbMV0pKSB7XG4gICAgICAvLyAodmFsdWUsIGFycmF5LCBzaWRlcywgZmxhZylcbiAgICAgIHogPSBqU3RhdC56c2NvcmUoYXJnc1swXSxhcmdzWzFdLGFyZ3NbM10pO1xuICAgICAgcmV0dXJuIChhcmdzWzJdID09PSAxKSA/XG4gICAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC1NYXRoLmFicyh6KSwgMCwgMSkpIDpcbiAgICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLU1hdGguYWJzKHopLCAwLCAxKSoyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMikge1xuICAgICAgICAvLyAodmFsdWUsIG1lYW4sIHNkLCBzaWRlcylcbiAgICAgICAgeiA9IGpTdGF0LnpzY29yZShhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSk7XG4gICAgICAgIHJldHVybiAoYXJnc1szXSA9PT0gMSkgP1xuICAgICAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC1NYXRoLmFicyh6KSwwLDEpKSA6XG4gICAgICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLU1hdGguYWJzKHopLDAsMSkqIDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gKHpzY29yZSwgc2lkZXMpXG4gICAgICAgIHogPSBhcmdzWzBdO1xuICAgICAgICByZXR1cm4gKGFyZ3NbMV0gPT09IDEpID9cbiAgICAgICAgICAoalN0YXQubm9ybWFsLmNkZigtTWF0aC5hYnMoeiksMCwxKSkgOlxuICAgICAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC1NYXRoLmFicyh6KSwwLDEpKjIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbmpTdGF0LmV4dGVuZChqU3RhdC5mbiwge1xuICB6c2NvcmU6IGZ1bmN0aW9uIHpzY29yZSh2YWx1ZSwgZmxhZykge1xuICAgIHJldHVybiAodmFsdWUgLSB0aGlzLm1lYW4oKSkgLyB0aGlzLnN0ZGV2KGZsYWcpO1xuICB9LFxuXG4gIHp0ZXN0OiBmdW5jdGlvbiB6dGVzdCh2YWx1ZSwgc2lkZXMsIGZsYWcpIHtcbiAgICB2YXIgenNjb3JlID0gTWF0aC5hYnModGhpcy56c2NvcmUodmFsdWUsIGZsYWcpKTtcbiAgICByZXR1cm4gKHNpZGVzID09PSAxKSA/XG4gICAgICAoalN0YXQubm9ybWFsLmNkZigtenNjb3JlLCAwLCAxKSkgOlxuICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLXpzY29yZSwgMCwgMSkgKiAyKTtcbiAgfVxufSk7XG5cbi8vIFQgU3RhdGlzdGljc1xualN0YXQuZXh0ZW5kKHtcbiAgLy8gMiBwYXJhbWV0ZXIgbGlzdHNcbiAgLy8gKHZhbHVlLCBtZWFuLCBzZCwgbilcbiAgLy8gKHZhbHVlLCBhcnJheSlcbiAgdHNjb3JlOiBmdW5jdGlvbiB0c2NvcmUoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIChhcmdzLmxlbmd0aCA9PT0gNCkgP1xuICAgICAgKChhcmdzWzBdIC0gYXJnc1sxXSkgLyAoYXJnc1syXSAvIE1hdGguc3FydChhcmdzWzNdKSkpIDpcbiAgICAgICgoYXJnc1swXSAtIGpTdGF0Lm1lYW4oYXJnc1sxXSkpIC9cbiAgICAgICAoalN0YXQuc3RkZXYoYXJnc1sxXSwgdHJ1ZSkgLyBNYXRoLnNxcnQoYXJnc1sxXS5sZW5ndGgpKSk7XG4gIH0sXG5cbiAgLy8gMyBkaWZmZXJlbnQgcGFyYW10ZXIgbGlzdHM6XG4gIC8vICh2YWx1ZSwgbWVhbiwgc2QsIG4sIHNpZGVzKVxuICAvLyAodHNjb3JlLCBuLCBzaWRlcylcbiAgLy8gKHZhbHVlLCBhcnJheSwgc2lkZXMpXG4gIHR0ZXN0OiBmdW5jdGlvbiB0dGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgdHNjb3JlO1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gNSkge1xuICAgICAgdHNjb3JlID0gTWF0aC5hYnMoalN0YXQudHNjb3JlKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pKTtcbiAgICAgIHJldHVybiAoYXJnc1s0XSA9PT0gMSkgP1xuICAgICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC10c2NvcmUsIGFyZ3NbM10tMSkpIDpcbiAgICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtdHNjb3JlLCBhcmdzWzNdLTEpKjIpO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoYXJnc1sxXSkpIHtcbiAgICAgIHRzY29yZSA9IE1hdGguYWJzKGFyZ3NbMF0pXG4gICAgICByZXR1cm4gKGFyZ3NbMl0gPT0gMSkgP1xuICAgICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC10c2NvcmUsIGFyZ3NbMV0tMSkpIDpcbiAgICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtdHNjb3JlLCBhcmdzWzFdLTEpICogMik7XG4gICAgfVxuICAgIHRzY29yZSA9IE1hdGguYWJzKGpTdGF0LnRzY29yZShhcmdzWzBdLCBhcmdzWzFdKSlcbiAgICByZXR1cm4gKGFyZ3NbMl0gPT0gMSkgP1xuICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtdHNjb3JlLCBhcmdzWzFdLmxlbmd0aC0xKSkgOlxuICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtdHNjb3JlLCBhcmdzWzFdLmxlbmd0aC0xKSAqIDIpO1xuICB9XG59KTtcblxualN0YXQuZXh0ZW5kKGpTdGF0LmZuLCB7XG4gIHRzY29yZTogZnVuY3Rpb24gdHNjb3JlKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAtIHRoaXMubWVhbigpKSAvICh0aGlzLnN0ZGV2KHRydWUpIC8gTWF0aC5zcXJ0KHRoaXMuY29scygpKSk7XG4gIH0sXG5cbiAgdHRlc3Q6IGZ1bmN0aW9uIHR0ZXN0KHZhbHVlLCBzaWRlcykge1xuICAgIHJldHVybiAoc2lkZXMgPT09IDEpID9cbiAgICAgICgxIC0galN0YXQuc3R1ZGVudHQuY2RmKE1hdGguYWJzKHRoaXMudHNjb3JlKHZhbHVlKSksIHRoaXMuY29scygpLTEpKSA6XG4gICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC1NYXRoLmFicyh0aGlzLnRzY29yZSh2YWx1ZSkpLCB0aGlzLmNvbHMoKS0xKSoyKTtcbiAgfVxufSk7XG5cbi8vIEYgU3RhdGlzdGljc1xualN0YXQuZXh0ZW5kKHtcbiAgLy8gUGFyYW10ZXIgbGlzdCBpcyBhcyBmb2xsb3dzOlxuICAvLyAoYXJyYXkxLCBhcnJheTIsIGFycmF5MywgLi4uKVxuICAvLyBvciBpdCBpcyBhbiBhcnJheSBvZiBhcnJheXNcbiAgLy8gYXJyYXkgb2YgYXJyYXlzIGNvbnZlcnNpb25cbiAgYW5vdmFmc2NvcmU6IGZ1bmN0aW9uIGFub3ZhZnNjb3JlKCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgIGV4cFZhciwgc2FtcGxlLCBzYW1wTWVhbiwgc2FtcFNhbXBNZWFuLCB0bXBhcmdzLCB1bmV4cFZhciwgaSwgajtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRtcGFyZ3MgPSBuZXcgQXJyYXkoYXJnc1swXS5sZW5ndGgpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ3NbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG1wYXJnc1tpXSA9IGFyZ3NbMF1baV07XG4gICAgICB9XG4gICAgICBhcmdzID0gdG1wYXJncztcbiAgICB9XG4gICAgLy8gQnVpbGRzIHNhbXBsZSBhcnJheVxuICAgIHNhbXBsZSA9IG5ldyBBcnJheSgpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzYW1wbGUgPSBzYW1wbGUuY29uY2F0KGFyZ3NbaV0pO1xuICAgIH1cbiAgICBzYW1wTWVhbiA9IGpTdGF0Lm1lYW4oc2FtcGxlKTtcbiAgICAvLyBDb21wdXRlcyB0aGUgZXhwbGFpbmVkIHZhcmlhbmNlXG4gICAgZXhwVmFyID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgZXhwVmFyID0gZXhwVmFyICsgYXJnc1tpXS5sZW5ndGggKiBNYXRoLnBvdyhqU3RhdC5tZWFuKGFyZ3NbaV0pIC0gc2FtcE1lYW4sIDIpO1xuICAgIH1cbiAgICBleHBWYXIgLz0gKGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgLy8gQ29tcHV0ZXMgdW5leHBsYWluZWQgdmFyaWFuY2VcbiAgICB1bmV4cFZhciA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNhbXBTYW1wTWVhbiA9IGpTdGF0Lm1lYW4oYXJnc1tpXSk7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgYXJnc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICB1bmV4cFZhciArPSBNYXRoLnBvdyhhcmdzW2ldW2pdIC0gc2FtcFNhbXBNZWFuLCAyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdW5leHBWYXIgLz0gKHNhbXBsZS5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgcmV0dXJuIGV4cFZhciAvIHVuZXhwVmFyO1xuICB9LFxuXG4gIC8vIDIgZGlmZmVyZW50IHBhcmFtdGVyIHNldHVwc1xuICAvLyAoYXJyYXkxLCBhcnJheTIsIGFycmF5MywgLi4uKVxuICAvLyAoYW5vdmFmc2NvcmUsIGRmMSwgZGYyKVxuICBhbm92YWZ0ZXN0OiBmdW5jdGlvbiBhbm92YWZ0ZXN0KCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgIGRmMSwgZGYyLCBuLCBpO1xuICAgIGlmIChpc051bWJlcihhcmdzWzBdKSkge1xuICAgICAgcmV0dXJuIDEgLSBqU3RhdC5jZW50cmFsRi5jZGYoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgfVxuICAgIHZhciBhbm92YWZzY29yZSA9IGpTdGF0LmFub3ZhZnNjb3JlKGFyZ3MpO1xuICAgIGRmMSA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICBuID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgbiA9IG4gKyBhcmdzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgZGYyID0gbiAtIGRmMSAtIDE7XG4gICAgcmV0dXJuIDEgLSBqU3RhdC5jZW50cmFsRi5jZGYoYW5vdmFmc2NvcmUsIGRmMSwgZGYyKTtcbiAgfSxcblxuICBmdGVzdDogZnVuY3Rpb24gZnRlc3QoZnNjb3JlLCBkZjEsIGRmMikge1xuICAgIHJldHVybiAxIC0galN0YXQuY2VudHJhbEYuY2RmKGZzY29yZSwgZGYxLCBkZjIpO1xuICB9XG59KTtcblxualN0YXQuZXh0ZW5kKGpTdGF0LmZuLCB7XG4gIGFub3ZhZnNjb3JlOiBmdW5jdGlvbiBhbm92YWZzY29yZSgpIHtcbiAgICByZXR1cm4galN0YXQuYW5vdmFmc2NvcmUodGhpcy50b0FycmF5KCkpO1xuICB9LFxuXG4gIGFub3ZhZnRlczogZnVuY3Rpb24gYW5vdmFmdGVzKCkge1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgbiA9IG4gKyB0aGlzW2ldLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0LmZ0ZXN0KHRoaXMuYW5vdmFmc2NvcmUoKSwgdGhpcy5sZW5ndGggLSAxLCBuIC0gdGhpcy5sZW5ndGgpO1xuICB9XG59KTtcblxuLy8gVHVrZXkncyByYW5nZSB0ZXN0XG5qU3RhdC5leHRlbmQoe1xuICAvLyAyIHBhcmFtZXRlciBsaXN0c1xuICAvLyAobWVhbjEsIG1lYW4yLCBuMSwgbjIsIHNkKVxuICAvLyAoYXJyYXkxLCBhcnJheTIsIHNkKVxuICBxc2NvcmU6IGZ1bmN0aW9uIHFzY29yZSgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgbWVhbjEsIG1lYW4yLCBuMSwgbjIsIHNkO1xuICAgIGlmIChpc051bWJlcihhcmdzWzBdKSkge1xuICAgICAgICBtZWFuMSA9IGFyZ3NbMF07XG4gICAgICAgIG1lYW4yID0gYXJnc1sxXTtcbiAgICAgICAgbjEgPSBhcmdzWzJdO1xuICAgICAgICBuMiA9IGFyZ3NbM107XG4gICAgICAgIHNkID0gYXJnc1s0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZWFuMSA9IGpTdGF0Lm1lYW4oYXJnc1swXSk7XG4gICAgICAgIG1lYW4yID0galN0YXQubWVhbihhcmdzWzFdKTtcbiAgICAgICAgbjEgPSBhcmdzWzBdLmxlbmd0aDtcbiAgICAgICAgbjIgPSBhcmdzWzFdLmxlbmd0aDtcbiAgICAgICAgc2QgPSBhcmdzWzJdO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5hYnMobWVhbjEgLSBtZWFuMikgLyAoc2QgKiBNYXRoLnNxcnQoKDEgLyBuMSArIDEgLyBuMikgLyAyKSk7XG4gIH0sXG5cbiAgLy8gMyBkaWZmZXJlbnQgcGFyYW1ldGVyIGxpc3RzOlxuICAvLyAocXNjb3JlLCBuLCBrKVxuICAvLyAobWVhbjEsIG1lYW4yLCBuMSwgbjIsIHNkLCBuLCBrKVxuICAvLyAoYXJyYXkxLCBhcnJheTIsIHNkLCBuLCBrKVxuICBxdGVzdDogZnVuY3Rpb24gcXRlc3QoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgcXNjb3JlO1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgcXNjb3JlID0gYXJnc1swXTtcbiAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDEpO1xuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT09IDcpIHtcbiAgICAgIHFzY29yZSA9IGpTdGF0LnFzY29yZShhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcbiAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBxc2NvcmUgPSBqU3RhdC5xc2NvcmUoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICBhcmdzID0gYXJncy5zbGljZSgzKTtcbiAgICB9XG5cbiAgICB2YXIgbiA9IGFyZ3NbMF07XG4gICAgdmFyIGsgPSBhcmdzWzFdO1xuXG4gICAgcmV0dXJuIDEgLSBqU3RhdC50dWtleS5jZGYocXNjb3JlLCBrLCBuIC0gayk7XG4gIH0sXG5cbiAgdHVrZXloc2Q6IGZ1bmN0aW9uIHR1a2V5aHNkKGFycmF5cykge1xuICAgIHZhciBzZCA9IGpTdGF0LnBvb2xlZHN0ZGV2KGFycmF5cyk7XG4gICAgdmFyIG1lYW5zID0gYXJyYXlzLm1hcChmdW5jdGlvbiAoYXJyKSB7cmV0dXJuIGpTdGF0Lm1lYW4oYXJyKTt9KTtcbiAgICB2YXIgbiA9IGFycmF5cy5yZWR1Y2UoZnVuY3Rpb24gKG4sIGFycikge3JldHVybiBuICsgYXJyLmxlbmd0aDt9LCAwKTtcblxuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgYXJyYXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgcCA9IGpTdGF0LnF0ZXN0KG1lYW5zW2ldLCBtZWFuc1tqXSwgYXJyYXlzW2ldLmxlbmd0aCwgYXJyYXlzW2pdLmxlbmd0aCwgc2QsIG4sIGFycmF5cy5sZW5ndGgpO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKFtbaSwgal0sIHBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG59KTtcblxuLy8gRXJyb3IgQm91bmRzXG5qU3RhdC5leHRlbmQoe1xuICAvLyAyIGRpZmZlcmVudCBwYXJhbWV0ZXIgc2V0dXBzXG4gIC8vICh2YWx1ZSwgYWxwaGEsIHNkLCBuKVxuICAvLyAodmFsdWUsIGFscGhhLCBhcnJheSlcbiAgbm9ybWFsY2k6IGZ1bmN0aW9uIG5vcm1hbGNpKCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgIGFucyA9IG5ldyBBcnJheSgyKSxcbiAgICBjaGFuZ2U7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICBjaGFuZ2UgPSBNYXRoLmFicyhqU3RhdC5ub3JtYWwuaW52KGFyZ3NbMV0gLyAyLCAwLCAxKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzWzJdIC8gTWF0aC5zcXJ0KGFyZ3NbM10pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlID0gTWF0aC5hYnMoalN0YXQubm9ybWFsLmludihhcmdzWzFdIC8gMiwgMCwgMSkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgalN0YXQuc3RkZXYoYXJnc1syXSkgLyBNYXRoLnNxcnQoYXJnc1syXS5sZW5ndGgpKTtcbiAgICB9XG4gICAgYW5zWzBdID0gYXJnc1swXSAtIGNoYW5nZTtcbiAgICBhbnNbMV0gPSBhcmdzWzBdICsgY2hhbmdlO1xuICAgIHJldHVybiBhbnM7XG4gIH0sXG5cbiAgLy8gMiBkaWZmZXJlbnQgcGFyYW1ldGVyIHNldHVwc1xuICAvLyAodmFsdWUsIGFscGhhLCBzZCwgbilcbiAgLy8gKHZhbHVlLCBhbHBoYSwgYXJyYXkpXG4gIHRjaTogZnVuY3Rpb24gdGNpKCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgIGFucyA9IG5ldyBBcnJheSgyKSxcbiAgICBjaGFuZ2U7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICBjaGFuZ2UgPSBNYXRoLmFicyhqU3RhdC5zdHVkZW50dC5pbnYoYXJnc1sxXSAvIDIsIGFyZ3NbM10gLSAxKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzWzJdIC8gTWF0aC5zcXJ0KGFyZ3NbM10pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlID0gTWF0aC5hYnMoalN0YXQuc3R1ZGVudHQuaW52KGFyZ3NbMV0gLyAyLCBhcmdzWzJdLmxlbmd0aCAtIDEpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGpTdGF0LnN0ZGV2KGFyZ3NbMl0sIHRydWUpIC8gTWF0aC5zcXJ0KGFyZ3NbMl0ubGVuZ3RoKSk7XG4gICAgfVxuICAgIGFuc1swXSA9IGFyZ3NbMF0gLSBjaGFuZ2U7XG4gICAgYW5zWzFdID0gYXJnc1swXSArIGNoYW5nZTtcbiAgICByZXR1cm4gYW5zO1xuICB9LFxuXG4gIHNpZ25pZmljYW50OiBmdW5jdGlvbiBzaWduaWZpY2FudChwdmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIHB2YWx1ZSA8IGFscGhhO1xuICB9XG59KTtcblxualN0YXQuZXh0ZW5kKGpTdGF0LmZuLCB7XG4gIG5vcm1hbGNpOiBmdW5jdGlvbiBub3JtYWxjaSh2YWx1ZSwgYWxwaGEpIHtcbiAgICByZXR1cm4galN0YXQubm9ybWFsY2kodmFsdWUsIGFscGhhLCB0aGlzLnRvQXJyYXkoKSk7XG4gIH0sXG5cbiAgdGNpOiBmdW5jdGlvbiB0Y2kodmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIGpTdGF0LnRjaSh2YWx1ZSwgYWxwaGEsIHRoaXMudG9BcnJheSgpKTtcbiAgfVxufSk7XG5cbi8vIGludGVybmFsIG1ldGhvZCBmb3IgY2FsY3VsYXRpbmcgdGhlIHotc2NvcmUgZm9yIGEgZGlmZmVyZW5jZSBvZiBwcm9wb3J0aW9ucyB0ZXN0XG5mdW5jdGlvbiBkaWZmZXJlbmNlT2ZQcm9wb3J0aW9ucyhwMSwgbjEsIHAyLCBuMikge1xuICBpZiAocDEgPiAxIHx8IHAyID4gMSB8fCBwMSA8PSAwIHx8IHAyIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJQcm9wb3J0aW9ucyBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIDAgYW5kIGxlc3MgdGhhbiAxXCIpXG4gIH1cbiAgdmFyIHBvb2xlZCA9IChwMSAqIG4xICsgcDIgKiBuMikgLyAobjEgKyBuMik7XG4gIHZhciBzZSA9IE1hdGguc3FydChwb29sZWQgKiAoMSAtIHBvb2xlZCkgKiAoKDEvbjEpICsgKDEvbjIpKSk7XG4gIHJldHVybiAocDEgLSBwMikgLyBzZTtcbn1cblxuLy8gRGlmZmVyZW5jZSBvZiBQcm9wb3J0aW9uc1xualN0YXQuZXh0ZW5kKGpTdGF0LmZuLCB7XG4gIG9uZVNpZGVkRGlmZmVyZW5jZU9mUHJvcG9ydGlvbnM6IGZ1bmN0aW9uIG9uZVNpZGVkRGlmZmVyZW5jZU9mUHJvcG9ydGlvbnMocDEsIG4xLCBwMiwgbjIpIHtcbiAgICB2YXIgeiA9IGRpZmZlcmVuY2VPZlByb3BvcnRpb25zKHAxLCBuMSwgcDIsIG4yKTtcbiAgICByZXR1cm4galN0YXQuenRlc3QoeiwgMSk7XG4gIH0sXG5cbiAgdHdvU2lkZWREaWZmZXJlbmNlT2ZQcm9wb3J0aW9uczogZnVuY3Rpb24gdHdvU2lkZWREaWZmZXJlbmNlT2ZQcm9wb3J0aW9ucyhwMSwgbjEsIHAyLCBuMikge1xuICAgIHZhciB6ID0gZGlmZmVyZW5jZU9mUHJvcG9ydGlvbnMocDEsIG4xLCBwMiwgbjIpO1xuICAgIHJldHVybiBqU3RhdC56dGVzdCh6LCAyKTtcbiAgfVxufSk7XG5cbn0oalN0YXQsIE1hdGgpKTtcbmpTdGF0Lm1vZGVscyA9IChmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBzdWJfcmVncmVzcyhleG9nKSB7XG4gICAgdmFyIHZhcl9jb3VudCA9IGV4b2dbMF0ubGVuZ3RoO1xuICAgIHZhciBtb2RlbExpc3QgPSBqU3RhdC5hcmFuZ2UodmFyX2NvdW50KS5tYXAoZnVuY3Rpb24oZW5kb2dfaW5kZXgpIHtcbiAgICAgIHZhciBleG9nX2luZGV4ID1cbiAgICAgICAgICBqU3RhdC5hcmFuZ2UodmFyX2NvdW50KS5maWx0ZXIoZnVuY3Rpb24oaSl7cmV0dXJuIGkhPT1lbmRvZ19pbmRleH0pO1xuICAgICAgcmV0dXJuIG9scyhqU3RhdC5jb2woZXhvZywgZW5kb2dfaW5kZXgpLm1hcChmdW5jdGlvbih4KXsgcmV0dXJuIHhbMF0gfSksXG4gICAgICAgICAgICAgICAgIGpTdGF0LmNvbChleG9nLCBleG9nX2luZGV4KSlcbiAgICB9KTtcbiAgICByZXR1cm4gbW9kZWxMaXN0O1xuICB9XG5cbiAgLy8gZG8gT0xTIG1vZGVsIHJlZ3Jlc3NcbiAgLy8gZXhvZyBoYXZlIGluY2x1ZGUgY29uc3QgY29sdW1ucyAsaXQgd2lsbCBub3QgZ2VuZXJhdGUgaXQgLkluIGZhY3QsIGV4b2cgaXNcbiAgLy8gXCJkZXNpZ24gbWF0cml4XCIgbG9vayBhdFxuICAvL2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Rlc2lnbl9tYXRyaXhcbiAgZnVuY3Rpb24gb2xzKGVuZG9nLCBleG9nKSB7XG4gICAgdmFyIG5vYnMgPSBlbmRvZy5sZW5ndGg7XG4gICAgdmFyIGRmX21vZGVsID0gZXhvZ1swXS5sZW5ndGggLSAxO1xuICAgIHZhciBkZl9yZXNpZCA9IG5vYnMtZGZfbW9kZWwgLSAxO1xuICAgIHZhciBjb2VmID0galN0YXQubHN0c3EoZXhvZywgZW5kb2cpO1xuICAgIHZhciBwcmVkaWN0ID1cbiAgICAgICAgalN0YXQubXVsdGlwbHkoZXhvZywgY29lZi5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4gW3hdIH0pKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihwKSB7IHJldHVybiBwWzBdIH0pO1xuICAgIHZhciByZXNpZCA9IGpTdGF0LnN1YnRyYWN0KGVuZG9nLCBwcmVkaWN0KTtcbiAgICB2YXIgeWJhciA9IGpTdGF0Lm1lYW4oZW5kb2cpO1xuICAgIC8vIGNvbnN0YW50IGNhdXNlIHByb2JsZW1cbiAgICAvLyB2YXIgU1NUID0galN0YXQuc3VtKGVuZG9nLm1hcChmdW5jdGlvbih5KSB7XG4gICAgLy8gICByZXR1cm4gTWF0aC5wb3coeS15YmFyLDIpO1xuICAgIC8vIH0pKTtcbiAgICB2YXIgU1NFID0galN0YXQuc3VtKHByZWRpY3QubWFwKGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyhmIC0geWJhciwgMik7XG4gICAgfSkpO1xuICAgIHZhciBTU1IgPSBqU3RhdC5zdW0oZW5kb2cubWFwKGZ1bmN0aW9uKHksIGkpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyh5IC0gcHJlZGljdFtpXSwgMik7XG4gICAgfSkpO1xuICAgIHZhciBTU1QgPSBTU0UgKyBTU1I7XG4gICAgdmFyIFIyID0gKFNTRSAvIFNTVCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXhvZzpleG9nLFxuICAgICAgICBlbmRvZzplbmRvZyxcbiAgICAgICAgbm9iczpub2JzLFxuICAgICAgICBkZl9tb2RlbDpkZl9tb2RlbCxcbiAgICAgICAgZGZfcmVzaWQ6ZGZfcmVzaWQsXG4gICAgICAgIGNvZWY6Y29lZixcbiAgICAgICAgcHJlZGljdDpwcmVkaWN0LFxuICAgICAgICByZXNpZDpyZXNpZCxcbiAgICAgICAgeWJhcjp5YmFyLFxuICAgICAgICBTU1Q6U1NULFxuICAgICAgICBTU0U6U1NFLFxuICAgICAgICBTU1I6U1NSLFxuICAgICAgICBSMjpSMlxuICAgIH07XG4gIH1cblxuICAvLyBIMDogYl9JPTBcbiAgLy8gSDE6IGJfSSE9MFxuICBmdW5jdGlvbiB0X3Rlc3QobW9kZWwpIHtcbiAgICB2YXIgc3ViTW9kZWxMaXN0ID0gc3ViX3JlZ3Jlc3MobW9kZWwuZXhvZyk7XG4gICAgLy92YXIgc2lnbWFIYXQ9alN0YXQuc3RkZXYobW9kZWwucmVzaWQpO1xuICAgIHZhciBzaWdtYUhhdCA9IE1hdGguc3FydChtb2RlbC5TU1IgLyAobW9kZWwuZGZfcmVzaWQpKTtcbiAgICB2YXIgc2VCZXRhSGF0ID0gc3ViTW9kZWxMaXN0Lm1hcChmdW5jdGlvbihtb2QpIHtcbiAgICAgIHZhciBTU1QgPSBtb2QuU1NUO1xuICAgICAgdmFyIFIyID0gbW9kLlIyO1xuICAgICAgcmV0dXJuIHNpZ21hSGF0IC8gTWF0aC5zcXJ0KFNTVCAqICgxIC0gUjIpKTtcbiAgICB9KTtcbiAgICB2YXIgdFN0YXRpc3RpYyA9IG1vZGVsLmNvZWYubWFwKGZ1bmN0aW9uKGNvZWYsIGkpIHtcbiAgICAgIHJldHVybiAoY29lZiAtIDApIC8gc2VCZXRhSGF0W2ldO1xuICAgIH0pO1xuICAgIHZhciBwVmFsdWUgPSB0U3RhdGlzdGljLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgbGVmdHBwZiA9IGpTdGF0LnN0dWRlbnR0LmNkZih0LCBtb2RlbC5kZl9yZXNpZCk7XG4gICAgICByZXR1cm4gKGxlZnRwcGYgPiAwLjUgPyAxIC0gbGVmdHBwZiA6IGxlZnRwcGYpICogMjtcbiAgICB9KTtcbiAgICB2YXIgYyA9IGpTdGF0LnN0dWRlbnR0LmludigwLjk3NSwgbW9kZWwuZGZfcmVzaWQpO1xuICAgIHZhciBpbnRlcnZhbDk1ID0gbW9kZWwuY29lZi5tYXAoZnVuY3Rpb24oY29lZiwgaSkge1xuICAgICAgdmFyIGQgPSBjICogc2VCZXRhSGF0W2ldO1xuICAgICAgcmV0dXJuIFtjb2VmIC0gZCwgY29lZiArIGRdO1xuICAgIH0pXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2U6IHNlQmV0YUhhdCxcbiAgICAgICAgdDogdFN0YXRpc3RpYyxcbiAgICAgICAgcDogcFZhbHVlLFxuICAgICAgICBzaWdtYUhhdDogc2lnbWFIYXQsXG4gICAgICAgIGludGVydmFsOTU6IGludGVydmFsOTVcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gRl90ZXN0KG1vZGVsKSB7XG4gICAgdmFyIEZfc3RhdGlzdGljID1cbiAgICAgICAgKG1vZGVsLlIyIC8gbW9kZWwuZGZfbW9kZWwpIC8gKCgxIC0gbW9kZWwuUjIpIC8gbW9kZWwuZGZfcmVzaWQpO1xuICAgIHZhciBmY2RmID0gZnVuY3Rpb24oeCwgbjEsIG4yKSB7XG4gICAgICByZXR1cm4galN0YXQuYmV0YS5jZGYoeCAvIChuMiAvIG4xICsgeCksIG4xIC8gMiwgbjIgLyAyKVxuICAgIH1cbiAgICB2YXIgcHZhbHVlID0gMSAtIGZjZGYoRl9zdGF0aXN0aWMsIG1vZGVsLmRmX21vZGVsLCBtb2RlbC5kZl9yZXNpZCk7XG4gICAgcmV0dXJuIHsgRl9zdGF0aXN0aWM6IEZfc3RhdGlzdGljLCBwdmFsdWU6IHB2YWx1ZSB9O1xuICB9XG5cbiAgZnVuY3Rpb24gb2xzX3dyYXAoZW5kb2csIGV4b2cpIHtcbiAgICB2YXIgbW9kZWwgPSBvbHMoZW5kb2csZXhvZyk7XG4gICAgdmFyIHR0ZXN0ID0gdF90ZXN0KG1vZGVsKTtcbiAgICB2YXIgZnRlc3QgPSBGX3Rlc3QobW9kZWwpO1xuICAgIC8vIFByb3ZpZGUgdGhlIFdoZXJyeSAvIEV6ZWtpZWwgLyBNY05lbWFyIC8gQ29oZW4gQWRqdXN0ZWQgUl4yXG4gICAgLy8gV2hpY2ggbWF0Y2hlcyB0aGUgJ2FkanVzdGVkIFJeMicgcHJvdmlkZWQgYnkgUidzIGxtIHBhY2thZ2VcbiAgICB2YXIgYWRqdXN0X1IyID1cbiAgICAgICAgMSAtICgxIC0gbW9kZWwuUjIpICogKChtb2RlbC5ub2JzIC0gMSkgLyAobW9kZWwuZGZfcmVzaWQpKTtcbiAgICBtb2RlbC50ID0gdHRlc3Q7XG4gICAgbW9kZWwuZiA9IGZ0ZXN0O1xuICAgIG1vZGVsLmFkanVzdF9SMiA9IGFkanVzdF9SMjtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICByZXR1cm4geyBvbHM6IG9sc193cmFwIH07XG59KSgpO1xuLy9UbyByZWdyZXNzLCBzaW1wbHkgYnVpbGQgWCBtYXRyaXhcbi8vKGFwcGVuZCBjb2x1bW4gb2YgMSdzKSB1c2luZ1xuLy9idWlsZHhtYXRyaXggYW5kIGJ1aWxkIHRoZSBZXG4vL21hdHJpeCB1c2luZyBidWlsZHltYXRyaXhcbi8vKHNpbXBseSB0aGUgdHJhbnNwb3NlKVxuLy9hbmQgcnVuIHJlZ3Jlc3MuXG5cblxuXG4vL1JlZ3Jlc3Npb25zXG5cbmpTdGF0LmV4dGVuZCh7XG4gIGJ1aWxkeG1hdHJpeDogZnVuY3Rpb24gYnVpbGR4bWF0cml4KCl7XG4gICAgLy9QYXJhbWV0ZXJzIHdpbGwgYmUgcGFzc2VkIGluIGFzIHN1Y2hcbiAgICAvLyhhcnJheTEsYXJyYXkyLGFycmF5MywuLi4pXG4gICAgLy9hcyAoeDEseDIseDMsLi4uKVxuICAgIC8vbmVlZHMgdG8gYmUgKDEseDEseDIseDMsLi4uKVxuICAgIHZhciBtYXRyaXhSb3dzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvcih2YXIgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe1xuICAgICAgdmFyIGFycmF5ID0gWzFdO1xuICAgICAgbWF0cml4Um93c1tpXT0gYXJyYXkuY29uY2F0KGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdChtYXRyaXhSb3dzKTtcblxuICB9LFxuXG4gIGJ1aWxkZHhtYXRyaXg6IGZ1bmN0aW9uIGJ1aWxkZHhtYXRyaXgoKSB7XG4gICAgLy9QYXJhbXRlcnMgd2lsbCBiZSBwYXNzZWQgaW4gYXMgc3VjaFxuICAgIC8vKFthcnJheTEsYXJyYXkyLC4uLl1cbiAgICB2YXIgbWF0cml4Um93cyA9IG5ldyBBcnJheShhcmd1bWVudHNbMF0ubGVuZ3RoKTtcbiAgICBmb3IodmFyIGk9MDtpPGFyZ3VtZW50c1swXS5sZW5ndGg7aSsrKXtcbiAgICAgIHZhciBhcnJheSA9IFsxXVxuICAgICAgbWF0cml4Um93c1tpXT0gYXJyYXkuY29uY2F0KGFyZ3VtZW50c1swXVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdChtYXRyaXhSb3dzKTtcblxuICB9LFxuXG4gIGJ1aWxkanhtYXRyaXg6IGZ1bmN0aW9uIGJ1aWxkanhtYXRyaXgoak1hdCkge1xuICAgIC8vQnVpbGRzIGZyb20galN0YXQgTWF0cml4XG4gICAgdmFyIHBhc3MgPSBuZXcgQXJyYXkoak1hdC5sZW5ndGgpXG4gICAgZm9yKHZhciBpPTA7aTxqTWF0Lmxlbmd0aDtpKyspe1xuICAgICAgcGFzc1tpXSA9IGpNYXRbaV07XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5idWlsZGR4bWF0cml4KHBhc3MpO1xuXG4gIH0sXG5cbiAgYnVpbGR5bWF0cml4OiBmdW5jdGlvbiBidWlsZHltYXRyaXgoYXJyYXkpe1xuICAgIHJldHVybiBqU3RhdChhcnJheSkudHJhbnNwb3NlKCk7XG4gIH0sXG5cbiAgYnVpbGRqeW1hdHJpeDogZnVuY3Rpb24gYnVpbGRqeW1hdHJpeChqTWF0KXtcbiAgICByZXR1cm4gak1hdC50cmFuc3Bvc2UoKTtcbiAgfSxcblxuICBtYXRyaXhtdWx0OiBmdW5jdGlvbiBtYXRyaXhtdWx0KEEsQil7XG4gICAgdmFyIGksIGosIGssIHJlc3VsdCwgc3VtO1xuICAgIGlmIChBLmNvbHMoKSA9PSBCLnJvd3MoKSkge1xuICAgICAgaWYoQi5yb3dzKCk+MSl7XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgQS5yb3dzKCk7IGkrKykge1xuICAgICAgICAgIHJlc3VsdFtpXSA9IFtdO1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBCLmNvbHMoKTsgaisrKSB7XG4gICAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IEEuY29scygpOyBrKyspIHtcbiAgICAgICAgICAgICAgc3VtICs9IEEudG9BcnJheSgpW2ldW2tdICogQi50b0FycmF5KClba11bal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbaV1bal0gPSBzdW07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqU3RhdChyZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgQS5yb3dzKCk7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBbXTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IEIuY29scygpOyBqKyspIHtcbiAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBBLmNvbHMoKTsgaysrKSB7XG4gICAgICAgICAgICBzdW0gKz0gQS50b0FycmF5KClbaV1ba10gKiBCLnRvQXJyYXkoKVtqXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0W2ldW2pdID0gc3VtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4galN0YXQocmVzdWx0KTtcbiAgICB9XG4gIH0sXG5cbiAgLy9yZWdyZXNzIGFuZCByZWdyZXNzdCB0byBiZSBmaXhlZFxuXG4gIHJlZ3Jlc3M6IGZ1bmN0aW9uIHJlZ3Jlc3Moak1hdFgsak1hdFkpe1xuICAgIC8vcHJpbnQoXCJyZWdyZXNzaW4hXCIpO1xuICAgIC8vcHJpbnQoak1hdFgudG9BcnJheSgpKTtcbiAgICB2YXIgaW5uZXJpbnYgPSBqU3RhdC54dHJhbnNweGludihqTWF0WCk7XG4gICAgLy9wcmludChpbm5lcmludik7XG4gICAgdmFyIHh0cmFuc3AgPSBqTWF0WC50cmFuc3Bvc2UoKTtcbiAgICB2YXIgbmV4dCA9IGpTdGF0Lm1hdHJpeG11bHQoalN0YXQoaW5uZXJpbnYpLHh0cmFuc3ApO1xuICAgIHJldHVybiBqU3RhdC5tYXRyaXhtdWx0KG5leHQsak1hdFkpO1xuXG4gIH0sXG5cbiAgcmVncmVzc3Q6IGZ1bmN0aW9uIHJlZ3Jlc3N0KGpNYXRYLGpNYXRZLHNpZGVzKXtcbiAgICB2YXIgYmV0YSA9IGpTdGF0LnJlZ3Jlc3Moak1hdFgsak1hdFkpO1xuXG4gICAgdmFyIGNvbXBpbGUgPSB7fTtcbiAgICBjb21waWxlLmFub3ZhID0ge307XG4gICAgdmFyIGpNYXRZQmFyID0galN0YXQuak1hdFlCYXIoak1hdFgsIGJldGEpO1xuICAgIGNvbXBpbGUueUJhciA9IGpNYXRZQmFyO1xuICAgIHZhciB5QXZlcmFnZSA9IGpNYXRZLm1lYW4oKTtcbiAgICBjb21waWxlLmFub3ZhLnJlc2lkdWFscyA9IGpTdGF0LnJlc2lkdWFscyhqTWF0WSwgak1hdFlCYXIpO1xuXG4gICAgY29tcGlsZS5hbm92YS5zc3IgPSBqU3RhdC5zc3Ioak1hdFlCYXIsIHlBdmVyYWdlKTtcbiAgICBjb21waWxlLmFub3ZhLm1zciA9IGNvbXBpbGUuYW5vdmEuc3NyIC8gKGpNYXRYWzBdLmxlbmd0aCAtIDEpO1xuXG4gICAgY29tcGlsZS5hbm92YS5zc2UgPSBqU3RhdC5zc2Uoak1hdFksIGpNYXRZQmFyKTtcbiAgICBjb21waWxlLmFub3ZhLm1zZSA9XG4gICAgICAgIGNvbXBpbGUuYW5vdmEuc3NlIC8gKGpNYXRZLmxlbmd0aCAtIChqTWF0WFswXS5sZW5ndGggLSAxKSAtIDEpO1xuXG4gICAgY29tcGlsZS5hbm92YS5zc3QgPSBqU3RhdC5zc3Qoak1hdFksIHlBdmVyYWdlKTtcbiAgICBjb21waWxlLmFub3ZhLm1zdCA9IGNvbXBpbGUuYW5vdmEuc3N0IC8gKGpNYXRZLmxlbmd0aCAtIDEpO1xuXG4gICAgY29tcGlsZS5hbm92YS5yMiA9IDEgLSAoY29tcGlsZS5hbm92YS5zc2UgLyBjb21waWxlLmFub3ZhLnNzdCk7XG4gICAgaWYgKGNvbXBpbGUuYW5vdmEucjIgPCAwKSBjb21waWxlLmFub3ZhLnIyID0gMDtcblxuICAgIGNvbXBpbGUuYW5vdmEuZnJhdGlvID0gY29tcGlsZS5hbm92YS5tc3IgLyBjb21waWxlLmFub3ZhLm1zZTtcbiAgICBjb21waWxlLmFub3ZhLnB2YWx1ZSA9XG4gICAgICAgIGpTdGF0LmFub3ZhZnRlc3QoY29tcGlsZS5hbm92YS5mcmF0aW8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgak1hdFhbMF0ubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBqTWF0WS5sZW5ndGggLSAoak1hdFhbMF0ubGVuZ3RoIC0gMSkgLSAxKTtcblxuICAgIGNvbXBpbGUuYW5vdmEucm1zZSA9IE1hdGguc3FydChjb21waWxlLmFub3ZhLm1zZSk7XG5cbiAgICBjb21waWxlLmFub3ZhLnIyYWRqID0gMSAtIChjb21waWxlLmFub3ZhLm1zZSAvIGNvbXBpbGUuYW5vdmEubXN0KTtcbiAgICBpZiAoY29tcGlsZS5hbm92YS5yMmFkaiA8IDApIGNvbXBpbGUuYW5vdmEucjJhZGogPSAwO1xuXG4gICAgY29tcGlsZS5zdGF0cyA9IG5ldyBBcnJheShqTWF0WFswXS5sZW5ndGgpO1xuICAgIHZhciBjb3ZhciA9IGpTdGF0Lnh0cmFuc3B4aW52KGpNYXRYKTtcbiAgICB2YXIgc2RzLCB0cywgcHM7XG5cbiAgICBmb3IodmFyIGk9MDsgaTxiZXRhLmxlbmd0aDtpKyspe1xuICAgICAgc2RzPU1hdGguc3FydChjb21waWxlLmFub3ZhLm1zZSAqIE1hdGguYWJzKGNvdmFyW2ldW2ldKSk7XG4gICAgICB0cz0gTWF0aC5hYnMoYmV0YVtpXSAvIHNkcyk7XG4gICAgICBwcz0galN0YXQudHRlc3QodHMsIGpNYXRZLmxlbmd0aCAtIGpNYXRYWzBdLmxlbmd0aCAtIDEsIHNpZGVzKTtcblxuICAgICAgY29tcGlsZS5zdGF0c1tpXT1bYmV0YVtpXSwgc2RzLCB0cywgcHNdO1xuICAgIH1cblxuICAgIGNvbXBpbGUucmVncmVzcyA9IGJldGE7XG4gICAgcmV0dXJuIGNvbXBpbGU7XG4gIH0sXG5cbiAgeHRyYW5zcHg6IGZ1bmN0aW9uIHh0cmFuc3B4KGpNYXRYKXtcbiAgICByZXR1cm4galN0YXQubWF0cml4bXVsdChqTWF0WC50cmFuc3Bvc2UoKSxqTWF0WCk7XG4gIH0sXG5cblxuICB4dHJhbnNweGludjogZnVuY3Rpb24geHRyYW5zcHhpbnYoak1hdFgpe1xuICAgIHZhciBpbm5lciA9IGpTdGF0Lm1hdHJpeG11bHQoak1hdFgudHJhbnNwb3NlKCksak1hdFgpO1xuICAgIHZhciBpbm5lcmludiA9IGpTdGF0Lmludihpbm5lcik7XG4gICAgcmV0dXJuIGlubmVyaW52O1xuICB9LFxuXG4gIGpNYXRZQmFyOiBmdW5jdGlvbiBqTWF0WUJhcihqTWF0WCwgYmV0YSkge1xuICAgIHZhciB5QmFyID0galN0YXQubWF0cml4bXVsdChqTWF0WCwgYmV0YSk7XG4gICAgcmV0dXJuIG5ldyBqU3RhdCh5QmFyKTtcbiAgfSxcblxuICByZXNpZHVhbHM6IGZ1bmN0aW9uIHJlc2lkdWFscyhqTWF0WSwgak1hdFlCYXIpIHtcbiAgICByZXR1cm4galN0YXQubWF0cml4c3VidHJhY3Qoak1hdFksIGpNYXRZQmFyKTtcbiAgfSxcblxuICBzc3I6IGZ1bmN0aW9uIHNzcihqTWF0WUJhciwgeUF2ZXJhZ2UpIHtcbiAgICB2YXIgc3NyID0gMDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgak1hdFlCYXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNzciArPSBNYXRoLnBvdyhqTWF0WUJhcltpXSAtIHlBdmVyYWdlLCAyKTtcbiAgICB9XG4gICAgcmV0dXJuIHNzcjtcbiAgfSxcblxuICBzc2U6IGZ1bmN0aW9uIHNzZShqTWF0WSwgak1hdFlCYXIpIHtcbiAgICB2YXIgc3NlID0gMDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgak1hdFkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNzZSArPSBNYXRoLnBvdyhqTWF0WVtpXSAtIGpNYXRZQmFyW2ldLCAyKTtcbiAgICB9XG4gICAgcmV0dXJuIHNzZTtcbiAgfSxcblxuICBzc3Q6IGZ1bmN0aW9uIHNzdChqTWF0WSwgeUF2ZXJhZ2UpIHtcbiAgICB2YXIgc3N0ID0gMDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgak1hdFkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNzdCArPSBNYXRoLnBvdyhqTWF0WVtpXSAtIHlBdmVyYWdlLCAyKTtcbiAgICB9XG4gICAgcmV0dXJuIHNzdDtcbiAgfSxcblxuICBtYXRyaXhzdWJ0cmFjdDogZnVuY3Rpb24gbWF0cml4c3VidHJhY3QoQSxCKXtcbiAgICB2YXIgYW5zID0gbmV3IEFycmF5KEEubGVuZ3RoKTtcbiAgICBmb3IodmFyIGk9MDtpPEEubGVuZ3RoO2krKyl7XG4gICAgICBhbnNbaV0gPSBuZXcgQXJyYXkoQVtpXS5sZW5ndGgpO1xuICAgICAgZm9yKHZhciBqPTA7ajxBW2ldLmxlbmd0aDtqKyspe1xuICAgICAgICBhbnNbaV1bal09QVtpXVtqXS1CW2ldW2pdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4galN0YXQoYW5zKTtcbiAgfVxufSk7XG4gIC8vIE1ha2UgaXQgY29tcGF0aWJsZSB3aXRoIHByZXZpb3VzIHZlcnNpb24uXG4gIGpTdGF0LmpTdGF0ID0galN0YXQ7XG5cbiAgcmV0dXJuIGpTdGF0O1xufSk7XG4iLCJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAnLi9WZWN0b3IyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNIZWxwZXJcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBzaGFyZWRDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEcmF3Q2lyY2xlKHBvc2l0aW9uOiBWZWN0b3IyLCByYWRpb3VzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcgPSBcIndoaXRlXCIsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0KTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIGxldCBvcmlnaW5hbEZpbGxTdHlsZSA9IGNvbnRleHQuZmlsbFN0eWxlO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5hcmMocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcmFkaW91cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gb3JpZ2luYWxGaWxsU3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEcmF3TGluZShmcm9tOiBWZWN0b3IyLCB0bzogVmVjdG9yMiwgdGhpY2tuZXNzOiBudW1iZXIsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0KTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIGxldCBvcmlnaW5hbExpbmVXaWR0aCA9IGNvbnRleHQubGluZVdpZHRoO1xyXG5cclxuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHRoaWNrbmVzcztcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQubW92ZVRvKGZyb20ueCwgZnJvbS55KTtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyh0by54LCB0by55KTtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IG9yaWdpbmFsTGluZVdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRHJhd1RleHQodGV4dDogc3RyaW5nLCBwb3NpdGlvbjogVmVjdG9yMiwgc2l6ZTogbnVtYmVyLCB0ZXh0QWxpZ246IENhbnZhc1RleHRBbGlnbiA9IFwibGVmdFwiLCBmb250OiBzdHJpbmcgPSBcInNhbnMtc2VyaWZcIiwgY29sb3I6IHN0cmluZyA9IFwiYmxhY2tcIiwgbW9kOiBzdHJpbmcgPSBcIlwiLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbEZpbGxTdHlsZSA9IGNvbnRleHQuZmlsbFN0eWxlO1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRm9udCA9IGNvbnRleHQuZm9udDtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbFRleHRBbGlnbiA9IGNvbnRleHQudGV4dEFsaWduO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IChtb2QgPT09IFwiXCIgPyBcIlwiIDogbW9kICsgJyAnKSArIHNpemUudG9TdHJpbmcoKSArIFwicHggXCIgKyBmb250O1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gdGV4dEFsaWduO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gb3JpZ2luYWxGaWxsU3R5bGU7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gb3JpZ2luYWxGb250O1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gb3JpZ2luYWxUZXh0QWxpZ247XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4vVmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBDYW52YXNIZWxwZXIgfSBmcm9tIFwiLi9DYW52YXNIZWxwZXJcIjtcclxuXHJcbnR5cGUgb2Zmc2V0ID0geyB2YWx1ZTogbnVtYmVyOyB9O1xyXG5leHBvcnQgdHlwZSBNYXRyaXhSb3dzID0gQXJyYXk8QXJyYXk8bnVtYmVyPj47XHJcbmV4cG9ydCBjb25zdCBNYXRyaXhSb3dzID0gY2xhc3MgZXh0ZW5kcyBBcnJheTxBcnJheTxudW1iZXI+PiB7IH07XHJcblxyXG5leHBvcnQgZW51bSBTaWRlIHsgYWJvdmUsIHVuZGVyLCBsZWZ0LCByaWdodCB9XHJcblxyXG4vKiogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbWF0cml4ICovXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhcclxue1xyXG4gICAgLy8jcmVnaW9uIGNvbmZpZ1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjZWxsUGl4ZWxTaXplOiBudW1iZXIgPSA0MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGFiZWxQaXhlbE1hcmdpbjogbnVtYmVyID0gNjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbWF0cml4UGl4ZWxNYXJnaW46IG51bWJlciA9IDEyO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjZWxsQ29udGVudEZvbnQ6IHN0cmluZyA9IFwiMTFweCBzYW5zLXNlcmlmXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxhYmVsRm9udDogc3RyaW5nID0gXCJib2xkIDE0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLyoqIE51bWJlcnMgY29udGFpbmVkIGluIG1hdHJpeC4gQWNjZXNzIHRoZW0gbGlrZSBudW1iZXJzW3Jvd11bY29sdW1uXSAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG51bWJlcnM6IFJlYWRvbmx5QXJyYXk8UmVhZG9ubHlBcnJheTxudW1iZXI+PjtcclxuICAgIC8qIGxpa2UgdGhpczpcclxuICAgIFswLDBdWzAsMV1bMCwyXVxyXG4gICAgWzEsMF1bMSwxXVsxLDJdXHJcbiAgICBbMiwwXVsyLDFdWzIsMl1cclxuICAgICovXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBwcm9wZXJ0aWVzXHJcblxyXG4gICAgLyoqIE51bWJlciBvZiByb3dzIGluIHRoaXMgbWF0cml4ICovXHJcbiAgICBwdWJsaWMgZ2V0IFJvd051bWJlcigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5udW1iZXJzLmxlbmd0aDsgfVxyXG4gICAgXHJcbiAgICAvKiogTnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhpcyBtYXRyaXggKi9cclxuICAgIHB1YmxpYyBnZXQgQ29sdW1uTnVtYmVyKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm51bWJlcnNbMF0ubGVuZ3RoOyB9XHJcblxyXG4gICAgLyoqIElzIHRoaXMgbWF0cml4IHNxdWFyZT8gKi9cclxuICAgIHB1YmxpYyBnZXQgSXNTcXVhcmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLlJvd051bWJlciA9PSB0aGlzLkNvbHVtbk51bWJlcjsgfVxyXG5cclxuICAgIC8qKiBOdW1iZXIgb2YgcGl4ZWxzIHRoaXMgbWF0cml4IHRha2VzIG9uIHkgYXhpcyBvZiBjYW52YXMgd2hlbiBkcmF3biB1c2luZyB0aGlzLkRyYXcgKi9cclxuICAgIHB1YmxpYyBnZXQgUGl4ZWxXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5Db2x1bW5OdW1iZXIgKiBNYXRyaXguY2VsbFBpeGVsU2l6ZTsgfVxyXG5cclxuICAgIC8qKiBOdW1iZXIgb2YgcGl4ZWxzIHRoaXMgbWF0cml4IHRha2VzIG9uIHggYXhpcyBvZiBjYW52YXMgd2hlbiBkcmF3biB1c2luZyB0aGlzLkRyYXcgKi9cclxuICAgIHB1YmxpYyBnZXQgUGl4ZWxIZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuICh0aGlzLlJvd051bWJlciAqIE1hdHJpeC5jZWxsUGl4ZWxTaXplKSArICBNYXRyaXgubGFiZWxQaXhlbE1hcmdpbn1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICBwcml2YXRlIF9sYXN0RHJhd1Bvc2l0aW9uOiBWZWN0b3IyID0gbnVsbDtcclxuICAgIFxyXG4gICAgLyoqIExhc3QgcG9zaXRpb24gb24gd2hpY2ggdGhpcyBNYXRyaXggd2FzIGRyYXduLiBOdWxsIGlmIGl0IHdhc250IGRyYXduIHlldCAqL1xyXG4gICAgcHVibGljIGdldCBMYXN0RHJhd1Bvc2l0aW9uKCk6IFZlY3RvcjIgeyByZXR1cm4gdGhpcy5fbGFzdERyYXdQb3NpdGlvbjsgfVxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb3dzOiBNYXRyaXhSb3dzKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbk51bWJlcjogbnVtYmVyID0gcm93c1swXS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3Qgcm93c0NvcHk6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhyb3dzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHJvd3MubGVuZ3RoOyByb3crKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NDb3B5W3Jvd10gPSBuZXcgQXJyYXk8bnVtYmVyPihjb2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBpZiAocm93c1tyb3ddLmxlbmd0aCAhPSBjb2x1bW5OdW1iZXIpIHRocm93IEVycm9yKFwiSW5jb25zaXN0ZW50IGNvbHVtbiBudW1iZXIgYmV0d2VlbiByb3dzIGluIGEgbWF0cml4XCIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgY29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm93c0NvcHlbcm93XVtjb2xdID0gcm93c1tyb3ddW2NvbF07XHJcbiAgICAgICAgICAgICAgICBpZiAocm93c1tyb3ddW2NvbF0gPT0gdW5kZWZpbmVkIHx8IHJvd3Nbcm93XVtjb2xdID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkNlbGwgY29udGVudCBpbiBtYXRyaXggY2FuJ3QgYmUgbnVsbC91bmRlZmluZWRcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5udW1iZXJzID0gcm93c0NvcHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERyYXdzIHRoaXMgbWF0cml4IG9uIEhUTUwgY2FudmFzIHVzaW5nIHByb3ZpZGVkIHJlbmRlcmluZyBjb250ZXh0IGFuZCBwb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIHBvc2l0aW9uIHdoZXJlIGRyYXdpbmcgc3RhcnRzICh1cHBlciBsZWZ0IGNvcm5lcilcclxuICAgICAqIEBwYXJhbSBsYWJlbCBvcHRpb25hbCBsYWJlbCBkaXNwbGF5ZWQgYWJvdmUgdGhpcyBtYXRyaXhcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IGNhbnZhcyBjb250ZXh0IHVzZWQgdG8gZHJhdyB0aGlzIG1hdHJpeFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBEcmF3KHBvc2l0aW9uOiBWZWN0b3IyLCBsYWJlbDogc3RyaW5nID0gXCJcIiwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0QWxpZ246IENhbnZhc1RleHRBbGlnbiA9IGNvbnRleHQudGV4dEFsaWduO1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRm9udDogc3RyaW5nID0gY29udGV4dC5mb250O1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBNYXRyaXguY2VsbENvbnRlbnRGb250O1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3dOdW0gPSAwOyByb3dOdW0gPCB0aGlzLm51bWJlcnMubGVuZ3RoOyByb3dOdW0rKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCByb3c6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPiA9IHRoaXMubnVtYmVyc1tyb3dOdW1dO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xOdW0gPSAwOyBjb2xOdW0gPCByb3cubGVuZ3RoOyBjb2xOdW0rKykgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGw6IG51bWJlciA9IHJvd1tjb2xOdW1dO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbFBvc2l0aW9uOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIocG9zaXRpb24ueCArIChNYXRyaXguY2VsbFBpeGVsU2l6ZSAqIGNvbE51bSksIHBvc2l0aW9uLnkgKyAoTWF0cml4LmNlbGxQaXhlbFNpemUgKiByb3dOdW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5yZWN0KGNlbGxQb3NpdGlvbi54LCBjZWxsUG9zaXRpb24ueSwgTWF0cml4LmNlbGxQaXhlbFNpemUsIE1hdHJpeC5jZWxsUGl4ZWxTaXplKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHBhcnNlRmxvYXQoY2VsbC50b0ZpeGVkKDMpKS50b1N0cmluZygpLCBjZWxsUG9zaXRpb24ueCArIChNYXRyaXguY2VsbFBpeGVsU2l6ZSAvIDIpLCBjZWxsUG9zaXRpb24ueSArIChNYXRyaXguY2VsbFBpeGVsU2l6ZSAvIDIpKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsYWJlbCAhPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJsZWZ0XCI7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZm9udCA9IE1hdHJpeC5sYWJlbEZvbnQ7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQobGFiZWwsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnkgLSBNYXRyaXgubGFiZWxQaXhlbE1hcmdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IG9yaWdpbmFsVGV4dEFsaWduO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IG9yaWdpbmFsRm9udDtcclxuICAgICAgICB0aGlzLl9sYXN0RHJhd1Bvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERyYXdzIHRoaXMgbWF0cml4IG5leHQgdG8gd2hlcmUgb3RoZXIgbWF0cml4IHdhcyBsYXN0IGRyYXduLCBtYWtpbmcgc3VyZSB0aGF0IHRoZXkgd29uJ3Qgb3ZlcmxhcFxyXG4gICAgICogQHBhcmFtIG1hdHJpeCBtYXRyaXggbmV4dCB0byB3aGljaCB0aGlzIG1hdHJpeCB3aWxsIGJlIGRyYXduXHJcbiAgICAgKiBAcGFyYW0gc2lkZSBvbiB3aGljaCBzaWRlIG9mIHByb3ZpZGVkIG1hdHJpeCB0aGlzIG1hdHJpYyBzaG91bGQgYmUgZHJhd25cclxuICAgICAqIEBwYXJhbSBsYWJlbCBvcHRpb25hbCBsYWJlbCBkaXNwbGF5ZWQgYWJvdmUgdGhpcyBtYXRyaXhcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IGNhbnZhcyBjb250ZXh0IHVzZWQgdG8gZHJhdyB0aGlzIG1hdHJpeFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRHJhd05leHRUbyhtYXRyaXg6IE1hdHJpeCwgc2lkZTogU2lkZSwgbGFiZWw6IHN0cmluZyA9IFwiXCIsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIGlmIChtYXRyaXguTGFzdERyYXdQb3NpdGlvbiA9PSBudWxsKSB0aHJvdyBFcnJvcihcIkNhbid0IGRyYXcgbmV4dCB0byBtYXRyaXggdGhhdCB3YXNuJ3QgZHJhd24geWV0XCIpO1xyXG5cclxuICAgICAgICBsZXQgcG9zaXRpb246IFZlY3RvcjI7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoc2lkZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIFNpZGUuYWJvdmU6XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLngsIG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLnkgLSB0aGlzLlBpeGVsSGVpZ2h0IC0gKE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiAqIDEuNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2lkZS51bmRlcjpcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjIobWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueCwgbWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueSArIG1hdHJpeC5QaXhlbEhlaWdodCArIChNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4gKiAxLjUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNpZGUubGVmdDpcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjIobWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueCAtIHRoaXMuUGl4ZWxXaWR0aCAtIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgbWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTaWRlLnJpZ2h0OlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBuZXcgVmVjdG9yMihtYXRyaXguTGFzdERyYXdQb3NpdGlvbi54ICsgbWF0cml4LlBpeGVsV2lkdGggKyBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4sIG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIHNpZGUgdmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuRHJhdyhwb3NpdGlvbiwgbGFiZWwsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Sb3dOdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAnWyc7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5Db2x1bW5OdW1iZXI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMubnVtYmVyc1tpXVtqXSArICgoaiArMSA8IHRoaXMuQ29sdW1uTnVtYmVyKSA/ICc7JyA6ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHQgKz0gJ10nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vI3JlZ2lvbiBmcm9tIHN0cmluZ1xyXG5cclxuICAgIC8qKiBSZXR1cm5zIE1hdHJpeCBjcmVhdGVkIGZyb20gc3RyaW5nIGZyb21hdGVkIGxpa2UgXCJbMSwyLDNdWzQsNSw2XVs3LDgsOV1cIiBvciBudWxsIGlmIHN0cmluZyBpcyBub3QgYSB2YWxpZCBtYXRyaXggKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRnJvbVN0cmluZyhpbnB1dDogc3RyaW5nKTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCA8PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9mZnNldDogb2Zmc2V0ID0geyB2YWx1ZTogMCB9O1xyXG5cclxuICAgICAgICB3aGlsZSAob2Zmc2V0LnZhbHVlIDwgaW5wdXQubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93cy5wdXNoKHRoaXMuUmVhZFJvdyhpbnB1dCwgb2Zmc2V0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgY29sdW1uTnVtYmVyOiBudW1iZXIgPSByb3dzWzBdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGNvbHVtbk51bWJlciA8PSAwKSBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93cy5mb3JFYWNoKHJvdyA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93Lmxlbmd0aCAhPSBjb2x1bW5OdW1iZXIpIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKHZhbHVlID0+IHsgaWYgKGlzTmFOKHZhbHVlKSkgaXNWYWxpZCA9IGZhbHNlOyB9KTtcclxuICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNWYWxpZCA/IG5ldyBNYXRyaXgocm93cykgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIFJlYWRSb3coaW5wdXQ6IHN0cmluZywgb2Zmc2V0OiBvZmZzZXQpOiBBcnJheTxudW1iZXI+XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93OiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICBpZiAoaW5wdXRbb2Zmc2V0LnZhbHVlXSA9PSAnWycpIG9mZnNldC52YWx1ZSsrO1xyXG5cclxuICAgICAgICB3aGlsZSAob2Zmc2V0LnZhbHVlIDwgaW5wdXQubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENoYXI6IHN0cmluZyA9IGlucHV0W29mZnNldC52YWx1ZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudENoYXIgPT0gJ10nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQudmFsdWUrKztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm93LnB1c2godGhpcy5SZWFkTnVtYmVyKGlucHV0LCBvZmZzZXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBSZWFkTnVtYmVyKGlucHV0OiBzdHJpbmcsIG9mZnNldDogb2Zmc2V0KTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgd2hpbGUgKG9mZnNldC52YWx1ZSA8IGlucHV0Lmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDaGFyOiBzdHJpbmcgPSBpbnB1dFtvZmZzZXQudmFsdWVdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGFyID09ICddJykgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvZmZzZXQudmFsdWUrKztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2hhciA9PSAnICcgfHwgY3VycmVudENoYXIgPT0gJzsnKSBicmVhaztcclxuICAgICAgICAgICAgZWxzZSB2YWx1ZSArPSBjdXJyZW50Q2hhciA9PSAnLCcgPyAnLicgOiBjdXJyZW50Q2hhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBtYXRoXHJcblxyXG4gICAgLyoqIFJldHVybnMgbmV3IG1hdHJpeCB3aGljaCBpcyB0aGUgcmVzdWx0IG9mIHRyYW5zcG9zZSBvcGVyYXRpb24gb24gdGhpcyBtYXRyaXggKi9cclxuICAgIHB1YmxpYyBUcmFuc3Bvc2UoKTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbmV3TnVtYmVyczogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKHRoaXMubnVtYmVyc1swXS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld051bWJlcnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuZXdOdW1iZXJzW2ldID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5udW1iZXJzLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLm51bWJlcnMubGVuZ3RoOyByb3crKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IHRoaXMubnVtYmVyc1swXS5sZW5ndGg7IGNvbHVtbisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuZXdOdW1iZXJzW2NvbHVtbl1bcm93XSA9IHRoaXMubnVtYmVyc1tyb3ddW2NvbHVtbl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KG5ld051bWJlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG5ldyBtYXRyaXggd2hpY2ggaXMgdGhlIHJlc3VsdCBvZiB0aGlzIG1hdHJpeCB4IG1hdHJpeCBwYXNzZWQgYXMgYW4gYXJndW1lbnQgKi9cclxuICAgIHB1YmxpYyBNdWx0aXBseU1hdHJpeChtYXRyaXg6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGlmIChtYXRyaXguUm93TnVtYmVyICE9IHRoaXMuQ29sdW1uTnVtYmVyKSB0aHJvdyBuZXcgRXJyb3IoXCJUbyBtdWx0aXBseSBtYXRyaWNlcyBmaXJzdCBtYXRyaXggbXVzdCBoYXZlIG51bWJlciBvZiBjb2x1bW5zIGVxdWFsIHRvIG51bWJlciBvZiByb3dzIGluIHNlY29uZCBtYXRyaXhcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvd3MgPSBuZXcgTWF0cml4Um93cyh0aGlzLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Sb3dOdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NbaV0gPSBuZXcgQXJyYXk8bnVtYmVyPihtYXRyaXguQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXguQ29sdW1uTnVtYmVyOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuQ29sdW1uTnVtYmVyOyBrKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMubnVtYmVyc1tpXVtrXSAqIG1hdHJpeC5udW1iZXJzW2tdW2pdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd3NbaV1bal0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJldHVybnMgbmV3IG1hdHJpeCB3aGljaCBpcyByZXN1bHQgb2YgdGhpcyBtYXRyaXggYmVpbmcgbXVsdGlwbGllZCBieSBwYXNzZWQgbnVtYmVyICovXHJcbiAgICBwdWJsaWMgTXVsdGlwbHlTY2FsYXIobnVtOiBudW1iZXIpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3ModGhpcy5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUm93TnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzW2ldID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuQ29sdW1uTnVtYmVyOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvd3NbaV1bal0gPSB0aGlzLm51bWJlcnNbaV1bal0gKiBudW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG5ldyBtYXRyaXggd2hpY2ggaXMgcmVzdWx0IG9mIGFkZGluZyBwYXNzZWQgbWF0cml4IHRvIHRoaXMgTWF0cml4ICovXHJcbiAgICBwdWJsaWMgQWRkKG1hdHJpeDogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuUm93TnVtYmVyICE9IG1hdHJpeC5Sb3dOdW1iZXIgfHwgdGhpcy5Db2x1bW5OdW1iZXIgIT0gbWF0cml4LkNvbHVtbk51bWJlcikgdGhyb3cgbmV3IEVycm9yKFwiT25seSBtYXRyaWNlcyBvZiB0aGUgc2FtZSBzaXplIGNhbiBiZSBhZGRlZFwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKHRoaXMuUm93TnVtYmVyKVxyXG5cclxuICAgICAgICBmb3IgKGxldCByb3dOdW0gPSAwOyByb3dOdW0gPCB0aGlzLlJvd051bWJlcjsgcm93TnVtKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzW3Jvd051bV0gPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbE51bSA9IDA7IGNvbE51bSA8IHRoaXMuQ29sdW1uTnVtYmVyOyBjb2xOdW0rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm93c1tyb3dOdW1dW2NvbE51bV0gPSB0aGlzLm51bWJlcnNbcm93TnVtXVtjb2xOdW1dICsgbWF0cml4Lm51bWJlcnNbcm93TnVtXVtjb2xOdW1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyBhbmQgcmV0dXJucyBkZXRlcm1pbmFudCBvZiB0aGlzIG1hdHJpeC4gVGhyb3dzIGVycm9yIHdoZW4gY2FsbGVkIG9uIG1hdHJpeCB3aGljaCBpcyBub3Qgc3F1YXJlICovXHJcbiAgICBwdWJsaWMgZ2V0IERldGVybWluYW50KCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5Jc1NxdWFyZSkgdGhyb3cgbmV3IEVycm9yKFwiT25seSBzcXVhcmUgbWF0cmljZXMgaGF2ZSBkZXRlcm1pbmFudFwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQ29sdW1uTnVtYmVyID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW1iZXJzWzBdWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLkNvbHVtbk51bWJlciA9PSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLm51bWJlcnNbMF1bMF0gKiB0aGlzLm51bWJlcnNbMV1bMV0pIC0gKHRoaXMubnVtYmVyc1sxXVswXSAqIHRoaXMubnVtYmVyc1swXVsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBuZWdhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbE51bSA9IDA7IGNvbE51bSA8IHRoaXMuQ29sdW1uTnVtYmVyOyBjb2xOdW0rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSB0aGlzLkdldFBhcnQoMCwgY29sTnVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gKG5lZ2F0ZSA/IC1tYXRyaXguRGV0ZXJtaW5hbnQgOiBtYXRyaXguRGV0ZXJtaW5hbnQpICogdGhpcy5udW1iZXJzWzBdW2NvbE51bV07XHJcbiAgICAgICAgICAgICAgICBuZWdhdGUgPSAhbmVnYXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBuZXcgbWF0cml4IHdoaWNoIGlzIHRoaXMgbWF0cml4IGJ1dCB3aXRob3V0IHNlbGVjdGVkIHJvdyBhbmQgY29sdW1uKi9cclxuICAgIHB1YmxpYyBHZXRQYXJ0KHJvd051bTogbnVtYmVyLCBjb2xOdW06IG51bWJlcik6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyh0aGlzLlJvd051bWJlciAtIDEpO1xyXG5cclxuICAgICAgICBsZXQgY29weVJvdzogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBuZXdSb3cgPSAwOyBuZXdSb3cgPCByb3dzLmxlbmd0aDsgbmV3Um93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29weVJvdyA9PSByb3dOdW0pIGNvcHlSb3crKztcclxuXHJcbiAgICAgICAgICAgIHJvd3NbbmV3Um93XSA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuQ29sdW1uTnVtYmVyIC0gMSk7XHJcbiAgICAgICAgICAgIGxldCBjb3B5Q29sOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuZXdDb2wgPSAwOyBuZXdDb2wgPCByb3dzW25ld1Jvd10ubGVuZ3RoOyBuZXdDb2wrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvcHlDb2wgPT0gY29sTnVtKSBjb3B5Q29sKys7XHJcblxyXG4gICAgICAgICAgICAgICAgcm93c1tuZXdSb3ddW25ld0NvbF0gPSB0aGlzLm51bWJlcnNbY29weVJvd11bY29weUNvbF07XHJcbiAgICAgICAgICAgICAgICBjb3B5Q29sKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvcHlSb3crKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIGFuZCByZXR1cm5zIGludmVyc2Ugb2YgdGhpcyBtYXRyaXggb3IgbnVsbCBpZiBpdCBpcyBub3QgaW52ZXJ0aWJsZSovXHJcbiAgICBwdWJsaWMgSW52ZXJ0KCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5Jc1NxdWFyZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5EZXRlcm1pbmFudCA9PSAwKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLkNvbHVtbk51bWJlciA9PSAxKSByZXR1cm4gbmV3IE1hdHJpeChbWzEgLyB0aGlzLm51bWJlcnNbMF1bMF1dXSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5Db2x1bW5OdW1iZXIgPT0gMikgcmV0dXJuIG5ldyBNYXRyaXgoW1t0aGlzLm51bWJlcnNbMV1bMV0sIC10aGlzLm51bWJlcnNbMF1bMV1dLCBbLXRoaXMubnVtYmVyc1sxXVswXSwgdGhpcy5udW1iZXJzWzBdWzBdXV0pLk11bHRpcGx5U2NhbGFyKDEgLyB0aGlzLkRldGVybWluYW50KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBjb2ZhY3RvcnNSb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3ModGhpcy5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lZ2F0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcm93TnVtID0gMDsgcm93TnVtIDwgY29mYWN0b3JzUm93cy5sZW5ndGg7IHJvd051bSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvZmFjdG9yc1Jvd3Nbcm93TnVtXSA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29sTnVtID0gMDsgY29sTnVtIDwgY29mYWN0b3JzUm93c1tyb3dOdW1dLmxlbmd0aDsgY29sTnVtKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXRlcm1pYW50ID0gdGhpcy5HZXRQYXJ0KHJvd051bSwgY29sTnVtKS5EZXRlcm1pbmFudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29mYWN0b3JzUm93c1tyb3dOdW1dW2NvbE51bV0gPSBuZWdhdGUgPyAtZGV0ZXJtaWFudCA6IGRldGVybWlhbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdhdGUgPSAhbmVnYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWRqdWdhdGU6IE1hdHJpeCA9IG5ldyBNYXRyaXgoY29mYWN0b3JzUm93cykuVHJhbnNwb3NlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWRqdWdhdGUuTXVsdGlwbHlTY2FsYXIoMSAvIHRoaXMuRGV0ZXJtaW5hbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VhbHRlcyBhbmQgcmV0dXJucyBhdmVyYWdlIHZhbHVlIGZyb20gYWxsIGVsZW1lbnRzIG9mIHRoaXMgbWF0cml4ICovXHJcbiAgICBwdWJsaWMgZ2V0IEF2ZXJhZ2UoKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudE51bWJlcjogbnVtYmVyID0gdGhpcy5Db2x1bW5OdW1iZXIgKiB0aGlzLlJvd051bWJlcjtcclxuICAgICAgICBsZXQgZWxlbWVudFN1bTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5Db2x1bW5OdW1iZXI7IGNvbCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50U3VtICs9IHRoaXMubnVtYmVyc1tyb3ddW2NvbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50U3VtIC8gZWxlbWVudE51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxufSIsImltcG9ydCB7IFNvbHZlciB9IGZyb20gXCIuL1NvbHZlclwiO1xyXG5pbXBvcnQgeyBNYXRyaXgsIFNpZGUsIE1hdHJpeFJvd3MgfSBmcm9tIFwiLi4vTWF0cml4XCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vVmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBDYW52YXNIZWxwZXIgfSBmcm9tIFwiLi4vQ2FudmFzSGVscGVyXCI7XHJcblxyXG4vKiogSSBjYW4ndCBmaW5kIGVuZ2xpc2ggbmFtZSBmb3IgXCJlZmVrdCBrYXRhbGl6eVwiICovXHJcbmV4cG9ydCBjbGFzcyBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIgZXh0ZW5kcyBTb2x2ZXJcclxue1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihbXCJSXCIsIFwiUjBcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBIYW5kbGVJbnB1dChpbnB1dEV2ZW50OiBJbnB1dEV2ZW50KTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2xlYXJJbnB1dEVycm9ycygpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgUjogTWF0cml4ID0gTWF0cml4LkZyb21TdHJpbmcodGhpcy5HZXRJbnB1dFZhbHVlKFwiUlwiKSk7XHJcbiAgICAgICAgbGV0IFIwOiBNYXRyaXggPSBNYXRyaXguRnJvbVN0cmluZyh0aGlzLkdldElucHV0VmFsdWUoXCJSMFwiKSk7XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiB2YWxpZGF0ZSBpbnB1dFxyXG4gICAgICAgIC8vI3JlZ2lvbiBSXHJcbiAgICAgICAgaWYgKFIgPT09IG51bGwpIHsgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlJcIiwgQ2F0YWx5c2lzRWZmZWN0U29sdmVyLm5vdE1hdHJpeEVycm9yKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgZWxzZSBpZiAoIVIuSXNTcXVhcmUpIHsgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlJcIiwgQ2F0YWx5c2lzRWZmZWN0U29sdmVyLm1hdHJpeE5vdFNxdWFyZUVycm9yKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgZWxzZSBpZiAoUi5Db2x1bW5OdW1iZXIgPCAyKSB7IHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSXCIsIENhdGFseXNpc0VmZmVjdFNvbHZlci5tYXRyaXhOb3RTcXVhcmVFcnJvcik7IHJldHVybjsgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUi5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFIubnVtYmVyc1tpXVtpXSAhPSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSXCIsIGBSIG11c2kgbWllxIcgc2FtZSAxIHBvIHByemVrxIV0bmVqLiBXIHJ6xJlkemllICR7aX0ga29sdW1uaWUgJHtpfSBqZXN0ICR7Ui5udW1iZXJzW2ldW2ldfSB6YW1pYXN0IDFgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmaXhSOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1Jvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhSLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBSLlJvd051bWJlcjsgcm93KyspIG5ld1Jvd3Nbcm93XSA9IG5ldyBBcnJheTxudW1iZXI+KFIuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFIuUm93TnVtYmVyOyByb3crKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sID0gcm93OyBjb2wgPCBSLkNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Um93c1tyb3ddW2NvbF0gPSBSLm51bWJlcnNbcm93XVtjb2xdO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Jvd3NbY29sXVtyb3ddID0gUi5udW1iZXJzW3Jvd11bY29sXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFIubnVtYmVyc1tyb3ddW2NvbF0gIT0gUi5udW1iZXJzW2NvbF1bcm93XSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChSLm51bWJlcnNbY29sXVtyb3ddID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeFIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlJcIiwgYFIgbXVzaSBiecSHIHN5bWV0cnljem5lIHd6Z2zEmWRuZW0gcHJ6ZWvEhXRuZWogeiAxLiBgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTGljemJ5IHcga29tw7Nya2FjaCBbJHtyb3d9XVske2NvbH1dIGkgWyR7Y29sfV1bJHtyb3d9XSwgY3p5bGkgJHtSLm51bWJlcnNbcm93XVtjb2xdfSBpICR7Ui5udW1iZXJzW2NvbF1bcm93XX0gbmllIHPEhSByw7N3bmVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZpeFIpIFIgPSBuZXcgTWF0cml4KG5ld1Jvd3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gUjBcclxuICAgICAgICBpZiAoUjAgPT09IG51bGwpIHsgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlIwXCIsIENhdGFseXNpc0VmZmVjdFNvbHZlci5ub3RNYXRyaXhFcnJvcik7IHJldHVybjsgfVxyXG4gICAgICAgIGVsc2UgaWYgKFIwLlJvd051bWJlciA+IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoUjAuQ29sdW1uTnVtYmVyID09IDEpIFIwID0gUjAuVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgICAgIGVsc2UgeyB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUjBcIiwgU29sdmVyLm5vdFZlY3RvckVycm9yKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBSICYgUjBcclxuICAgICAgICBpZiAoUi5Db2x1bW5OdW1iZXIgIT0gUjAuQ29sdW1uTnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlJcIiwgXCJSIG1hIGlubsSFIGlsb8WbxIcga29sdW1uIG5pxbwgUjBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSMFwiLCBcIlIwIG1hIGlubsSFIGlsb8WbxIcga29sdW1uIG5pxbwgUlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gIGNhbGN1bGF0ZVxyXG5cclxuICAgICAgICBjb25zdCB0bXBSMF9yZWdfb3V0OiBbTWF0cml4LCBBcnJheTxudW1iZXI+XSA9IHRoaXMuQ2FsY3VsYXRlUjBfcmVnKFIwKTtcclxuICAgICAgICBjb25zdCBSMF9yZWc6IE1hdHJpeCA9IHRtcFIwX3JlZ19vdXRbMF07XHJcbiAgICAgICAgY29uc3QgeE9yZGVySW5SMF9yZWc6IEFycmF5PG51bWJlcj4gPSB0bXBSMF9yZWdfb3V0WzFdO1xyXG5cclxuICAgICAgICBjb25zdCBSX3JlZzogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVSX3JlZyhSLCBSMCwgUjBfcmVnLCB4T3JkZXJJblIwX3JlZyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRtcENhdFBhcl9vdXQ6IFtBcnJheTxDYXRhbHlzaXNQYWlyPiwgTWF0cml4Um93cywgTWF0cml4Um93c10gPSB0aGlzLkZpbmRDYXRhbHlzaXNQYWlycyhSX3JlZywgUjBfcmVnLCB4T3JkZXJJblIwX3JlZyk7XHJcbiAgICAgICAgY29uc3QgY2F0YWx5c2lzUGFpcnM6IEFycmF5PENhdGFseXNpc1BhaXI+ID0gdG1wQ2F0UGFyX291dFswXTtcclxuICAgICAgICBjb25zdCBSaWo6IE1hdHJpeFJvd3MgPSB0bXBDYXRQYXJfb3V0WzFdO1xyXG4gICAgICAgIGNvbnN0IFJpX1JqOiBNYXRyaXhSb3dzID0gdG1wQ2F0UGFyX291dFsyXTtcclxuXHJcbiAgICAgICAgY29uc3QgY29tYmluYXRpb25zOiBNYXRyaXhSb3dzID0gdGhpcy5DYWxjdWxhdGVDb21iaW5hdGlvbnMoUi5Sb3dOdW1iZXIpO1xyXG4gICAgICAgIGNvbnN0IEhfc2o6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlSF9zaihSLCBSMCwgY29tYmluYXRpb25zKTtcclxuICAgICAgICBjb25zdCBIX3M6IEFycmF5PG51bWJlcj4gPSB0aGlzLkNhbGN1bGF0ZUhfcyhIX3NqKTtcclxuICAgICAgICBjb25zdCBiZXN0SDogbnVtYmVyID0gQ2F0YWx5c2lzRWZmZWN0U29sdmVyLkdldEdyZWF0ZXN0TnVtYmVySW5kZXgoSF9zKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIGRpc3BsYXkgcmVzdWx0c1xyXG5cclxuICAgICAgICBSLkRyYXcoU29sdmVyLmRyYXdTdGFydFBvcywgXCJSXCIpO1xyXG4gICAgICAgIC8vIHRyYW5zcG9zZSBSMCB0byBkcmF3IGl0IHZlcnRpY2FsbHksIGJlY2F1c2UgdGhhdCdzIGhvdyBEciBaYWrEhWMgd3JpdGVzIHRoYXRcclxuICAgICAgICBjb25zdCBSMFQgPSBSMC5UcmFuc3Bvc2UoKTtcclxuICAgICAgICBSMFQuRHJhd05leHRUbyhSLCBTaWRlLnJpZ2h0LCBcIlIwXCIpO1xyXG4gICAgICAgIFIwX3JlZy5UcmFuc3Bvc2UoKS5EcmF3TmV4dFRvKFIwVCwgU2lkZS51bmRlciwgXCJSMF9yZWdcIik7XHJcbiAgICAgICAgUl9yZWcuRHJhd05leHRUbyhSLCBTaWRlLnVuZGVyLCBcIlJfcmVnXCIpO1xyXG5cclxuICAgICAgICBjb25zdCB0b3BNYXJnaW4gPSA1MDtcclxuICAgICAgICBjb25zdCBsaW5lTWFyZ2luID0gMjU7XHJcbiAgICAgICAgY29uc3QgUmlqRHJhd1ggPSBSMFQuTGFzdERyYXdQb3NpdGlvbi54ICsgUjBULlBpeGVsV2lkdGggKyA1MDtcclxuICAgICAgICBjb25zdCBSaWpDb21tZW50RHJhd1ggPSBSaWpEcmF3WCArIDEwMDtcclxuICAgICAgICBjb25zdCBSaV9SakRyYXdYID0gUmlqQ29tbWVudERyYXdYICsgODA7XHJcbiAgICAgICAgY29uc3QgUmlfUmpDb21tZW50RHJhd1ggPSBSaV9SakRyYXdYICsgMTEwO1xyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpdGVyYXRpb25zID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSByb3cgKyAxOyBjb2wgPCBSLkNvbHVtbk51bWJlcjsgY29sKyspIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFJpalZhbHVlOiBudW1iZXIgPSBSaWpbcm93XVtjb2xdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFJpalRleHQ6IHN0cmluZyA9IGBSJHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChyb3cgKyAxKX0gJHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjb2wgKyAxKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRyYXdZOiBudW1iZXIgPSB0b3BNYXJnaW4gKyAoaXRlcmF0aW9ucyAqIGxpbmVNYXJnaW4pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGAke1JpalRleHR9PSAke1JpalZhbHVlfWAsIG5ldyBWZWN0b3IyKFJpakRyYXdYLCBkcmF3WSksIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSaWpWYWx1ZSA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBgJHtSaWpUZXh0fSA8IDAgICBXIHBhcnplIHgke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KHJvdyl9IHgke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGNvbCl9IHd5c3TEmXB1amUgZWZla3Qga2F0YWxpenlgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQodGV4dCwgbmV3IFZlY3RvcjIoUmlqQ29tbWVudERyYXdYLCBkcmF3WSksIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgJHtSaWpUZXh0fSA+IDBgLCBuZXcgVmVjdG9yMihSaWpDb21tZW50RHJhd1gsIGRyYXdZKSwgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFJpX1JqVmFsdWU6IG51bWJlciA9IFJpX1JqW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgUmlfUmpUZXh0OiBzdHJpbmcgPSBgUiR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoY29sICsgMSl9L1Ike1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KHJvdyArIDEpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQ6IHN0cmluZyA9IGAke1JpX1JqVGV4dH09ICR7TnVtYmVyKFJpX1JqVmFsdWUudG9GaXhlZCgyKSl9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KHRleHQsIG5ldyBWZWN0b3IyKFJpX1JqRHJhd1gsIGRyYXdZKSwgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0NhdGFseXNpczogYm9vbGVhbiA9IFJpalZhbHVlIDwgUmlfUmpWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbW1lbnRUZXh0OiBzdHJpbmcgPSBgJHtSaWpUZXh0fSAke2hhc0NhdGFseXNpcyA/ICc8JyA6ICc+J30gJHtSaV9SalRleHR9ICAgICBXIHBhcnplIHgke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KHJvdyl9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgYHgke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGNvbCl9ICR7aGFzQ2F0YWx5c2lzID8gXCJcIiA6IFwibmllIFwifXd5c3TEmXB1amUgZWZla3Qga2F0YWxpenlgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoY29tbWVudFRleHQsIG5ldyBWZWN0b3IyKFJpX1JqQ29tbWVudERyYXdYLCBkcmF3WSksIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRpb25zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2F0YWx5c2lzUGFpcnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRyYXdZID0gKHRvcE1hcmdpbiAqIDIpICsgKChpdGVyYXRpb25zICsgaSkgKiBsaW5lTWFyZ2luKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdFBhaXI6IENhdGFseXNpc1BhaXIgPSBjYXRhbHlzaXNQYWlyc1tpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YkkgPSBVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjYXRQYWlyLmkgKyAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YkogPSBVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjYXRQYWlyLmogKyAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBgS2F0YWxpemF0b3JlbSB3IHBhcnplIHgke3N1Ykl9IHgke3N1Ykp9IGplc3QgeCR7Y2F0UGFpci5pc0lDYXRhbHlzdCA/IHN1YkkgOiBzdWJKfWA7XHJcbiAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQodGV4dCwgbmV3IFZlY3RvcjIoUmlqRHJhd1gsIGRyYXdZKSwgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIGhlbGx3aWdcclxuICAgICAgICBjb25zdCBoZWxsd2lnTGluZVkgPSBSX3JlZy5MYXN0RHJhd1Bvc2l0aW9uLnkgKyBSX3JlZy5QaXhlbEhlaWdodCArIDI1O1xyXG4gICAgICAgIGNvbnN0IGhlbGx3aWdTdGFydFBvczogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKDAsIGhlbGx3aWdMaW5lWSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKGhlbGx3aWdTdGFydFBvcywgbmV3IFZlY3RvcjIoQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQuY2FudmFzLndpZHRoLCBoZWxsd2lnTGluZVkpLCBTb2x2ZXIuc2VwYXJhdGluZ0xpbmVUaGlja25lc3MpO1xyXG5cclxuICAgICAgICBIX3NqLkRyYXcoVmVjdG9yMi5BZGQoaGVsbHdpZ1N0YXJ0UG9zLCBTb2x2ZXIuZHJhd1N0YXJ0UG9zKSwgXCJI4oKb4rG8XCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVsbHdpZ0Fuc3dlckRyYXc6IFZlY3RvcjIgPSBWZWN0b3IyLkFkZChoZWxsd2lnU3RhcnRQb3MsIG5ldyBWZWN0b3IyKEhfc2ouUGl4ZWxXaWR0aCArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiArIDEwLCAwKSlcclxuXHJcbiAgICAgICAgaGVsbHdpZ0Fuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChoZWxsd2lnQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoXCJJbnRlZ3JhbG5hIHBvamVtbm/Fm8SHIGluZm9ybWFjeWpuYSBwb2R6YmlvcsOzdzpcIiwgaGVsbHdpZ0Fuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSF9zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVsbHdpZ0Fuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChoZWxsd2lnQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICAgICAgY29uc3QgSGkgPSB0aGlzLlJvdW5kKEhfc1tpXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IENpOiBBcnJheTxudW1iZXI+ID0gY29tYmluYXRpb25zW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBpU3Vic2NyaXB0OiBzdHJpbmcgPSBVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChpICsgMSk7XHJcbiAgICAgICAgICAgIGxldCBDaVRleHQ6IHN0cmluZyA9IFwie1wiO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBDaS5sZW5ndGg7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ2lUZXh0ICs9ICdYJyArIFV0aWxzLk51bWJlclRvU3Vic2NyaXB0KENpW2pdICsgMSkgKyAoaiArIDEgPCBDaS5sZW5ndGggPyAnLCcgOiAnfScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYEMke2lTdWJzY3JpcHR9PSR7Q2lUZXh0fSBIJHtpU3Vic2NyaXB0fT0ke0hpfWAsIGhlbGx3aWdBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhlbGx3aWdBbnN3ZXJUZXh0OiBzdHJpbmcgPSBcIk5hamxlcHN6eW0gdyBzZW5zaWUgSGVsbHdpZ2EgcG9kemJpb3JlbSB6bWllbm55Y2ggb2JqYcWbbmlhasSFY3ljaCBqZXN0IHtcIjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBIX3NqLkNvbHVtbk51bWJlciAtIDE7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlbGx3aWdBbnN3ZXJUZXh0ICs9ICgnWCcgKyBVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjb21iaW5hdGlvbnNbYmVzdEhdW2ldICsgMSkgKyAoKGkgKyAxIDwgSF9zai5Db2x1bW5OdW1iZXIgLSAxKSA/IFwiLCBcIiA6ICd9JykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGVsbHdpZ0Fuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChoZWxsd2lnQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4gKiAyKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGhlbGx3aWdBbnN3ZXJUZXh0LCBoZWxsd2lnQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVIwX3JlZyhSMDogTWF0cml4KTogW01hdHJpeCwgQXJyYXk8bnVtYmVyPl1cclxuICAgIHtcclxuICAgICAgICBjb25zdCBhYnNSMDogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KFIwLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgY29uc3Qgc29ydGVkUjA6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPihSMC5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgIGNvbnN0IFIwaWRzOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oUjAuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSMC5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFic1IwW2ldID0gTWF0aC5hYnMoUjAubnVtYmVyc1swXVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSBhYnNSMC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IENhdGFseXNpc0VmZmVjdFNvbHZlci5HZXRHcmVhdGVzdE51bWJlckluZGV4KGFic1IwKTtcclxuICAgICAgICAgICAgUjBpZHNbaV0gPSBpbmRleDtcclxuICAgICAgICAgICAgc29ydGVkUjBbaV0gPSBhYnNSMFtpbmRleF07XHJcbiAgICAgICAgICAgIGFic1IwW2luZGV4XSA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gW25ldyBNYXRyaXgoW3NvcnRlZFIwXSksIFIwaWRzXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVJfcmVnKFI6IE1hdHJpeCwgUjA6IE1hdHJpeCwgUjBfcmVnOiBNYXRyaXgsIHhPcmRlckluUjBfcmVnOiBBcnJheTxudW1iZXI+KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFIuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oUi5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gcm93OyBjb2wgPCBSLkNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gcm93KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3Nbcm93XVtjb2xdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IFIubnVtYmVyc1t4T3JkZXJJblIwX3JlZ1tyb3ddXVt4T3JkZXJJblIwX3JlZ1tjb2xdXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoUjAubnVtYmVyc1swXVt4T3JkZXJJblIwX3JlZ1tyb3ddXSA8IDApIHZhbHVlID0gLXZhbHVlOyBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUjAubnVtYmVyc1swXVt4T3JkZXJJblIwX3JlZ1tjb2xdXSA8IDApIHZhbHVlID0gLXZhbHVlOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93c1tyb3ddW2NvbF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByb3dzW2NvbF1bcm93XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBpbmRleCBvZiBncmVhdGVzdCBudW1iZXIgaW4gcHJvdmlkZWQgYXJyYXkuXHJcbiAgICAgKiBJZiBzYW1lIG51bWJlciBhcHBlYXJzIG11bHRpcGxlIHRpbWVzIHJldHVybnMgaW5kZXggb2YgaXRzIGZpcnN0IG9jY3VycmVuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgR2V0R3JlYXRlc3ROdW1iZXJJbmRleChhcnJheTogUmVhZG9ubHlBcnJheTxudW1iZXI+KTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0gPiBhcnJheVtpbmRleF0pIGluZGV4ID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEZpbmRDYXRhbHlzaXNQYWlycyhSX3JlZzogTWF0cml4LCBSMF9yZWc6IE1hdHJpeCwgeE9yZGVySW5SMF9yZWc6IEFycmF5PG51bWJlcj4pOiBbQXJyYXk8Q2F0YWx5c2lzUGFpcj4sIE1hdHJpeFJvd3MsIE1hdHJpeFJvd3NdXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2F0YWx5c2lzUGFpcnM6IEFycmF5PENhdGFseXNpc1BhaXI+ID0gbmV3IEFycmF5PENhdGFseXNpc1BhaXI+KCk7XHJcbiAgICAgICAgY29uc3QgUmlqX2FycjogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFJfcmVnLlJvd051bWJlcik7XHJcbiAgICAgICAgY29uc3QgUmlfUmo6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhSX3JlZy5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJfcmVnLlJvd051bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmlqX2FycltpXSA9IG5ldyBBcnJheTxudW1iZXI+KFJfcmVnLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgICAgIFJpX1JqW2ldID0gbmV3IEFycmF5PG51bWJlcj4oUl9yZWcuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgUl9yZWcuQ29sdW1uTnVtYmVyOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlfcmVnID0gVXRpbHMuR2V0RWxlbWVudEluZGV4KHhPcmRlckluUjBfcmVnLCBpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGpfcmVnID0gVXRpbHMuR2V0RWxlbWVudEluZGV4KHhPcmRlckluUjBfcmVnLCBqKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFJpajogbnVtYmVyID0gUl9yZWcubnVtYmVyc1tpX3JlZ11bal9yZWddO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgUmkgPSBSMF9yZWcubnVtYmVyc1swXVtpX3JlZ107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBSaiA9IFIwX3JlZy5udW1iZXJzWzBdW2pfcmVnXTtcclxuICAgICAgICAgICAgICAgIFJpal9hcnJbaV1bal0gPSBSaWo7XHJcbiAgICAgICAgICAgICAgICBSaV9SaltpXVtqXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFJpaiA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0YWx5c2lzUGFpcnMucHVzaChuZXcgQ2F0YWx5c2lzUGFpcihpLCBqLCAoUmkgPiBSaikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlc3RWYWx1ZSA9IChSaSA8IFJqKSA/IFJpIC8gUmogOiBSaiAvIFJpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJpX1JqW2ldW2pdID0gdGVzdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSaWogPiB0ZXN0VmFsdWUpIGNhdGFseXNpc1BhaXJzLnB1c2gobmV3IENhdGFseXNpc1BhaXIoaSwgaiwgKFJpIDwgUmopKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbY2F0YWx5c2lzUGFpcnMsIFJpal9hcnIsIFJpX1JqXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZUhfc2ooUjogTWF0cml4LCBSMDogTWF0cml4LCBjb21iaW5hdGlvbnM6IE1hdHJpeFJvd3MpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoUi5Sb3dOdW1iZXIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykgcm93c1tpXSA9IG5ldyBBcnJheTxudW1iZXI+KFIuQ29sdW1uTnVtYmVyIC0gMSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IFIuQ29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFIuUm93TnVtYmVyOyByb3crKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gcm93O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFVdGlscy5Jc0VsZW1lbnRJbkFycmF5KGNvbWJpbmF0aW9uc1tjb2xdLCByb3cpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3Nbcm93XVtjb2xdID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgUmlqX3N1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLklzRWxlbWVudEluQXJyYXkoY29tYmluYXRpb25zW2NvbF0sIGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSaWpfc3VtICs9IE1hdGguYWJzKFIubnVtYmVyc1tqXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3Nbcm93XVtjb2xdID0gKFIwLm51bWJlcnNbMF1bal0gKiBSMC5udW1iZXJzWzBdW2pdKSAvIFJpal9zdW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZUNvbWJpbmF0aW9ucyhudW1iZXJPZlhzOiBudW1iZXIpOiBNYXRyaXhSb3dzXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY29tYmluYXRpb25zOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MobnVtYmVyT2ZYcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0OiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4obnVtYmVyT2ZYcyAtIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZYcyAtIDE7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZpcnN0W2ldID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tYmluYXRpb25zWzBdID0gZmlyc3Q7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbnVtYmVyT2ZYczsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dDogQXJyYXk8bnVtYmVyPiA9IFV0aWxzLkNvcHlBcnJheShjb21iaW5hdGlvbnNbaSAtIDFdKTtcclxuICAgICAgICAgICAgbmV4dFtuZXh0Lmxlbmd0aCAtIGldICs9IDE7XHJcbiAgICAgICAgICAgIGNvbWJpbmF0aW9uc1tpXSA9IG5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29tYmluYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlSF9zKEhfc2o6IE1hdHJpeCk6IEFycmF5PG51bWJlcj5cclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPihIX3NqLkNvbHVtbk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEhfc2ouQ29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBIOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBIX3NqLlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEggKz0gSF9zai5udW1iZXJzW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0W2NvbF0gPSBIO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIENhdGFseXNpc1BhaXJcclxue1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGk6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBqOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaXNJQ2F0YWx5c3Q6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGk6IG51bWJlciwgajogbnVtYmVyLCBpc0lDYXRhbHlzdDogYm9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmkgPSBpO1xyXG4gICAgICAgIHRoaXMuaiA9IGo7XHJcbiAgICAgICAgdGhpcy5pc0lDYXRhbHlzdCA9IGlzSUNhdGFseXN0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU29sdmVyIH0gZnJvbSBcIi4vU29sdmVyXCI7XHJcbmltcG9ydCB7IE1hdHJpeFJvd3MsIE1hdHJpeCwgU2lkZSB9IGZyb20gXCIuLi9NYXRyaXhcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgQ2FudmFzSGVscGVyIH0gZnJvbSBcIi4uL0NhbnZhc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uL1ZlY3RvcjJcIjtcclxuXHJcbnZhciB7IGpTdGF0IH0gPSByZXF1aXJlKCdqc3RhdCcpXHJcblxyXG5leHBvcnQgY2xhc3MgTU5LU29sdmVyIGV4dGVuZHMgU29sdmVyXHJcbntcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoW1wiYWxwaGFcIiwgXCJtYXRyaXhZWFhcIiwgXCJwcm9iYWJpbGl0eVwiXSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGpTdGF0LnN0dWRlbnR0LmludigwLjk5NSwgMjcpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhqU3RhdC5jZW50cmFsRi5pbnYoMC45NSwgNSwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBIYW5kbGVJbnB1dChpbnB1dEV2ZW50OiBJbnB1dEV2ZW50KTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2xlYXJJbnB1dEVycm9ycygpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgYWxwaGE6IE1hdHJpeCA9IE1hdHJpeC5Gcm9tU3RyaW5nKHRoaXMuR2V0SW5wdXRWYWx1ZShcImFscGhhXCIpKTtcclxuICAgICAgICBjb25zdCBZWFg6IE1hdHJpeCA9IE1hdHJpeC5Gcm9tU3RyaW5nKHRoaXMuR2V0SW5wdXRWYWx1ZShcIm1hdHJpeFlYWFwiKSk7XHJcbiAgICAgICAgbGV0IHByb2JhYmlsaXR5UGVyY2VudDogbnVtYmVyID0gdGhpcy5HZXRJbnB1dFZhbHVlQXNOdW1iZXIoXCJwcm9iYWJpbGl0eVwiKTtcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIHZhbGlkYXRlIGlucHV0XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBMG11bHRcclxuICAgICAgICBpZiAoYWxwaGEgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJtYXRyaXhZWFhcIiwgU29sdmVyLm5vdE1hdHJpeEVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFscGhhLlJvd051bWJlciA+IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYWxwaGEuQ29sdW1uTnVtYmVyID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFscGhhID0gYWxwaGEuVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiYWxwaGFcIiwgU29sdmVyLm5vdFZlY3RvckVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gWVhYXHJcbiAgICAgICAgaWYgKFlYWCA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIm1hdHJpeFlYWFwiLCBTb2x2ZXIubm90TWF0cml4RXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKFlYWC5Sb3dOdW1iZXIgIT0gYWxwaGEuQ29sdW1uTnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcImFscGhhXCIsIFwiaWxvxZvEhyByesSZZMOzdyBuaWUgemdhZGEgc2nEmSB6IGlsb8WbY2nEhSBsaWN6YiBzdG9qxIVjeWNoIHByemVkIM6xXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBwcm9iYWJpbGl0eVxyXG4gICAgICAgIGlmIChwcm9iYWJpbGl0eVBlcmNlbnQgPT0gbnVsbCB8fCBpc05hTihwcm9iYWJpbGl0eVBlcmNlbnQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcInByb2JhYmlsaXR5XCIsIFNvbHZlci5ub3ROdW1iZXJFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBjYWxjdWxhdGVcclxuXHJcbiAgICAgICAgY29uc3QgWTogTWF0cml4ID0gbmV3IE1hdHJpeChbVXRpbHMuQ29weUFycmF5KFlYWC5udW1iZXJzWzBdKV0pLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgIGNvbnN0IFg6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlWChZWFgsIGFscGhhLm51bWJlcnNbMF1bMF0pO1xyXG4gICAgICAgIGNvbnN0IFh0OiBNYXRyaXggPSBYLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgIGNvbnN0IFh0WDogTWF0cml4ID0gWHQuTXVsdGlwbHlNYXRyaXgoWCk7XHJcbiAgICAgICAgY29uc3QgWHRZOiBNYXRyaXggPSBYdC5NdWx0aXBseU1hdHJpeChZKTtcclxuICAgICAgICBjb25zdCBYdFhpbnY6IE1hdHJpeCA9IFh0WC5JbnZlcnQoKTtcclxuICAgICAgICBpZiAoWHRYaW52ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwibWF0cml4WVhYXCIsIFwiTWFjaWVyenkgWOG1gFggbmllIG1vxbxuYSBvZHdyw7NjacSHLCBwZXduaWUgYsWCxIVkIHcgcHJ6ZXBpc3l3YW5pdSBkYW55Y2hcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYTogTWF0cml4ID0gWHRYaW52Lk11bHRpcGx5TWF0cml4KFh0WSk7XHJcbiAgICAgICAgY29uc3QgeV9oYXQ6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlWV9oYXQoYSwgWCk7XHJcbiAgICAgICAgY29uc3QgZTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVfZShZLCB5X2hhdCk7XHJcbiAgICAgICAgY29uc3QgZVRlOiBNYXRyaXggPSBlLlRyYW5zcG9zZSgpLk11bHRpcGx5TWF0cml4KGUpO1xyXG4gICAgICAgIGNvbnN0IG46IG51bWJlciA9IFguUm93TnVtYmVyO1xyXG4gICAgICAgIGNvbnN0IGs6IG51bWJlciA9IFguQ29sdW1uTnVtYmVyIC0gMTtcclxuICAgICAgICBjb25zdCBkZiA9IG4gLSAoayArIDEpO1xyXG4gICAgICAgIGNvbnN0IFNfc3FyOiBudW1iZXIgPSBlVGUubnVtYmVyc1swXVswXSAvIGRmO1xyXG4gICAgICAgIGNvbnN0IERfc3FyOiBNYXRyaXggPSBYdFhpbnYuTXVsdGlwbHlTY2FsYXIoU19zcXIpO1xyXG5cclxuICAgICAgICBjb25zdCBTX3NxckZvckE6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlU3NxckZvckEoRF9zcXIpO1xyXG4gICAgICAgIGNvbnN0IFNfZm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWFrdGVTRm9yQShTX3NxckZvckEpO1xyXG4gICAgICAgIGNvbnN0IFZfZm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVWRm9yQShTX2ZvckEsIGEpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9iYWJpbGl0eTogbnVtYmVyID0gcHJvYmFiaWxpdHlQZXJjZW50IC8gMTAwO1xyXG4gICAgICAgIGNvbnN0IHRfZm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVURm9yQShTX2ZvckEsIGEpO1xyXG4gICAgICAgIGNvbnN0IHRfc3R1ZDogbnVtYmVyID0galN0YXQuc3R1ZGVudHQuaW52KDEgLSAocHJvYmFiaWxpdHkgLyAyKSwgZGYpO1xyXG5cclxuICAgICAgICBjb25zdCBZdDogTWF0cml4ID0gWS5UcmFuc3Bvc2UoKTtcclxuICAgICAgICBjb25zdCBZdFk6IE1hdHJpeCA9IFl0Lk11bHRpcGx5TWF0cml4KFkpO1xyXG4gICAgICAgIGNvbnN0IHlfYXZnOiBudW1iZXIgPSBZLkF2ZXJhZ2U7XHJcbiAgICAgICAgY29uc3QgUl9zcXI6IG51bWJlciA9IHRoaXMuQ2FsY3VsYXRlUl9zcXIoZVRlLCBZdFksIHlfYXZnLCBuKTtcclxuICAgICAgICBjb25zdCBGOiBudW1iZXIgPSB0aGlzLkNhbGN1bGF0ZUYoUl9zcXIsIG4sIGspO1xyXG4gICAgICAgIGNvbnN0IEZfZGlzdDogbnVtYmVyID0galN0YXQuY2VudHJhbEYuaW52KDEgLSBwcm9iYWJpbGl0eSwgaywgZGYpO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gZGlzcGxheSByZXN1bHRzXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBhKVxyXG5cclxuICAgICAgICBYLkRyYXcoU29sdmVyLmRyYXdTdGFydFBvcywgXCJYXCIpO1xyXG4gICAgICAgIFkuRHJhd05leHRUbyhYLCBTaWRlLnJpZ2h0LCBcIllcIik7XHJcbiAgICAgICAgeV9oYXQuRHJhd05leHRUbyhZLCBTaWRlLnJpZ2h0LCBcIsW3XCIpO1xyXG4gICAgICAgIGUuRHJhd05leHRUbyh5X2hhdCwgU2lkZS5yaWdodCwgXCJlXCIpO1xyXG4gICAgICAgIFh0LkRyYXdOZXh0VG8oZSwgU2lkZS5yaWdodCwgXCJY4bWAXCIpO1xyXG4gICAgICAgIFh0WC5EcmF3TmV4dFRvKFh0LCBTaWRlLnJpZ2h0LCBcIljhtYBYXCIpO1xyXG4gICAgICAgIFh0WS5EcmF3TmV4dFRvKFgsIFNpZGUudW5kZXIsIFwiWOG1gFlcIik7XHJcbiAgICAgICAgWHRYaW52LkRyYXdOZXh0VG8oWHRZLCBTaWRlLnJpZ2h0LCBcIihY4bWAWCnigbvCuVwiKVxyXG4gICAgICAgIGEuRHJhd05leHRUbyhYdFhpbnYsIFNpZGUucmlnaHQsIFwiYVwiKTtcclxuICAgICAgICBlVGUuRHJhd05leHRUbyhhLCBTaWRlLnJpZ2h0LCBcImXhtYBlXCIpO1xyXG4gICAgICAgIGNvbnN0IFNfc3FyRHJhd1BvcyA9IFZlY3RvcjIuQWRkKGVUZS5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMihNYXRyaXguY2VsbFBpeGVsU2l6ZSArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgTWF0cml4LmxhYmVsUGl4ZWxNYXJnaW4pKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYFPCsj0oZeG1gGUpLyhuLWstMSk9JHt0aGlzLlJvdW5kKFNfc3FyKX1gLCBTX3NxckRyYXdQb3MsIDE2LCBcImxlZnRcIiwgXCJzYW5zLXNlcmlmXCIsIFwiYmxhY2tcIiwgXCJib2xkXCIpO1xyXG4gICAgICAgIERfc3FyLkRyYXdOZXh0VG8oWHRZLCBTaWRlLnVuZGVyLCBcIkTCsihhKVwiKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBiKVxyXG4gICAgICAgIC8vI3JlZ2lvbiBiXHJcbiAgICAgICAgY29uc3QgYkRyYXdTdGFydFBvczogVmVjdG9yMiA9IHRoaXMuRHJhd1NlcGFyYXRpbmdWZXJ0aWNhbExpbmUoWHRYKTtcclxuXHJcbiAgICAgICAgU19zcXJGb3JBLkRyYXcoYkRyYXdTdGFydFBvcywgXCJTwrIoYSlcIik7XHJcbiAgICAgICAgU19mb3JBLkRyYXdOZXh0VG8oU19zcXJGb3JBLCBTaWRlLnVuZGVyLCBcIlMoYSkgKMWbciBixYIpXCIpO1xyXG4gICAgICAgIFZfZm9yQS5EcmF3TmV4dFRvKFNfZm9yQSwgU2lkZS51bmRlciwgXCJWKGEpICjFm3Igd3pnIGLFgiAlKVwiKVxyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBkcmF3UG9zOiBWZWN0b3IyID0gVmVjdG9yMi5BZGQoVl9mb3JBLkxhc3REcmF3UG9zaXRpb24sIG5ldyBWZWN0b3IyKDAsIFZfZm9yQS5QaXhlbEhlaWdodCArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbikpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFZfZm9yQS5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShWX2ZvckEubnVtYmVyc1swXVtpXSkgfHwgaXNOYU4oVl9mb3JBLm51bWJlcnNbMF1baV0pKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgbmllIG1hIFYoYSkgZGxhIGEke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGkpfWAsIGRyYXdQb3MsIDE2LCBcImxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd1BvcyA9IFZlY3RvcjIuQWRkKGRyYXdQb3MsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBiYlxyXG5cclxuICAgICAgICBjb25zdCBiYkRyYXdTdGFydFBvczogVmVjdG9yMiA9IHRoaXMuRHJhd1NlcGFyYXRpbmdWZXJ0aWNhbExpbmUoU19zcXJGb3JBKVxyXG4gICAgICAgIFNfc3FyRm9yQS5EcmF3KGJiRHJhd1N0YXJ0UG9zLCBcIlPCsihhKVwiKTtcclxuICAgICAgICBTX2ZvckEuRHJhd05leHRUbyhTX3NxckZvckEsIFNpZGUudW5kZXIsIFwiUyhhKSAoxZtyIGLFgilcIik7XHJcbiAgICAgICAgdF9mb3JBLkRyYXdOZXh0VG8oU19mb3JBLCBTaWRlLnVuZGVyLCBcInQoYSlcIik7XHJcbiAgICAgICAgY29uc3QgdF9zdHVkRHJhd1BvczogVmVjdG9yMiA9IFZlY3RvcjIuQWRkKHRfZm9yQS5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMigwLCAoTWF0cml4LmNlbGxQaXhlbFNpemUgKiAyKSkpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgdCo9JHt0aGlzLlJvdW5kKHRfc3R1ZCl9YCwgdF9zdHVkRHJhd1BvcywgMTYsIFwibGVmdFwiLCBcInNhbnMtc2VyaWZcIiwgXCJibGFja1wiLCBcImJvbGRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJiQW5zd2VyRHJhdzogVmVjdG9yMiA9IFZlY3RvcjIuQWRkKFNfc3FyRm9yQS5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMihTX3NxckZvckEuUGl4ZWxXaWR0aCArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgMCkpO1xyXG5cclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoXCJIMDogem1pZW5uYSBYaSBqZXN0IG5pZWlzdG90bmFcIiwgYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoXCJIMTogem1pZW5uYSBYaSBtYSBzdGF0eXN0eWN6bmllIGlzdG90bnkgd3DFgnl3IG5hIHptaWVubsSFIG9iamHFm25pYW7EhVwiLCBiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdF9mb3JBLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgYWNjZXB0SDAgPSB0X2ZvckEubnVtYmVyc1swXVtpXSA8IHRfc3R1ZDtcclxuICAgICAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gYHQke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGkpfSAke2FjY2VwdEgwID8gJzwnIDogJz4nfSB0KiBgXHJcbiAgICAgICAgICAgICAgICArIGBaIHByYXdkb3BvZG9iaWXFhHN0d2VtICR7cHJvYmFiaWxpdHlQZXJjZW50fSUgJHthY2NlcHRIMCA/IFwiYnJhayBwb2RzdGF3IGJ5IG9kcnp1Y2nEhyBIMFwiIDogXCJuYWxlxbx5IG9kcnp1Y2nEhyBIMCBuYSByemVjeiBIMVwifWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dCh0ZXh0LCBiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gYmJiXHJcblxyXG4gICAgICAgIGNvbnN0IGJiYkxpbmVZID0gdF9zdHVkRHJhd1Bvcy55ICsgMjU7XHJcbiAgICAgICAgY29uc3QgYmJiTGluZVN0YXJ0ID0gbmV3IFZlY3RvcjIoYmJEcmF3U3RhcnRQb3MueCAtIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgYmJiTGluZVkpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3TGluZShiYmJMaW5lU3RhcnQsIG5ldyBWZWN0b3IyKENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy53aWR0aCwgYmJiTGluZVkpLCBTb2x2ZXIuc2VwYXJhdGluZ0xpbmVUaGlja25lc3MpO1xyXG5cclxuICAgICAgICBsZXQgYmJiQW5zd2VyRHJhdzogVmVjdG9yMiA9IFZlY3RvcjIuQWRkKGJiYkxpbmVTdGFydCwgU29sdmVyLmRyYXdTdGFydFBvcyk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiSDA6IG5pZSBtYSB0YWtpZWogem1pZW5uZWogWGksIGt0w7NhIG1hIHN0YXR5c3R5Y3puaWUgaXN0b3RueSB3cMWCeXcgbmEgWVwiLCBiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChcIkgxOiBqZXN0IHRha2Egem1pZW5uYSBYaSwga3TDs2EgbWEgc3RhdHlzdHljem5pZSBpc3RvdG55IHdwxYJ5dyBuYSBZXCIsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGDIsz0ke3RoaXMuUm91bmQoeV9hdmcpfWAsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGBSwrI9MS0oKGXhtYBlL3nhtYB5KS0obirIs8KyKSk9JHt0aGlzLlJvdW5kKFJfc3FyKX1gLCBiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgRj0oUsKyLygxLVLCsikpKigobi1rLTEpL2spPSR7dGhpcy5Sb3VuZChGKX1gLCBiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgRio9JHt0aGlzLlJvdW5kKEZfZGlzdCl9YCwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBZdC5EcmF3KGJiYkFuc3dlckRyYXcsIFwiWeG1gFwiKTtcclxuICAgICAgICBZdFkuRHJhd05leHRUbyhZdCwgU2lkZS5yaWdodCwgXCJZ4bWAWVwiKVxyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChZdC5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMigwLCBZdFkuUGl4ZWxIZWlnaHQgKyAoTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luICogMikpKTtcclxuICAgICAgICBjb25zdCBhY2NlcHRIMDogYm9vbGVhbiA9IEYgPCBGX2Rpc3Q7XHJcbiAgICAgICAgY29uc3QgYmJiQW5zd2VyVGV4dDogc3RyaW5nID0gYFogcHJhd2RvcG9kb2JpZcWEc3R3ZW0gJHtwcm9iYWJpbGl0eVBlcmNlbnR9JSAke2FjY2VwdEgwID8gXCJicmFrIHBvZHN0YXcgYnkgb2RyenVjacSHIEgwXCIgOiBcIm5hbGXFvHkgb2RyenVjacSHIEgwIG5hIHJ6ZWN6IEgxXCJ9YDtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYmJiQW5zd2VyVGV4dCwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIGJiYmJcclxuXHJcbiAgICAgICAgY29uc3QgYmJiYkxpbmVZID0gYmJiQW5zd2VyRHJhdy55ICsgMjU7XHJcbiAgICAgICAgY29uc3QgYmJiYkxpbmVTdGFydCA9IG5ldyBWZWN0b3IyKGJiRHJhd1N0YXJ0UG9zLnggLSBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4sIGJiYmJMaW5lWSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKGJiYmJMaW5lU3RhcnQsIG5ldyBWZWN0b3IyKENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy53aWR0aCwgYmJiYkxpbmVZKSwgU29sdmVyLnNlcGFyYXRpbmdMaW5lVGhpY2tuZXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGJiYmJBbnN3ZXJEcmF3OiBWZWN0b3IyID0gVmVjdG9yMi5BZGQoYmJiYkxpbmVTdGFydCwgU29sdmVyLmRyYXdTdGFydFBvcyk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiV3DDs8WCY3p5bm5payBkZXRlcm1pbmFuY2ppXCIsIGJiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgY29uc3Qgcm91bmRSX3NxciA9IHRoaXMuUm91bmQoUl9zcXIpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgUsKyPTEtKChl4bWAZS954bWAeSktKG4qyLPCsikpPSR7cm91bmRSX3Nxcn0gICAke3JvdW5kUl9zcXIgKiAxMDB9JSB6bWllbm5vxZtjaSB5IGplc3Qgb2JqYcWbbmlhbmUgcHJ6ZXogbW9kZWxgLCBiYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIGNcclxuXHJcbiAgICAgICAgY29uc3QgY0xpbmVZID0gYmJiYkFuc3dlckRyYXcueSArIDI1O1xyXG4gICAgICAgIGNvbnN0IGNMaW5lU3RhcnQgPSBuZXcgVmVjdG9yMihiYmJiTGluZVN0YXJ0LngsIGNMaW5lWSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKGNMaW5lU3RhcnQsIG5ldyBWZWN0b3IyKENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy53aWR0aCwgY0xpbmVZKSwgU29sdmVyLnNlcGFyYXRpbmdMaW5lVGhpY2tuZXNzKTtcclxuICAgICAgICBsZXQgY0Fuc3dlckRyYXc6IFZlY3RvcjIgPSBWZWN0b3IyLkFkZChjTGluZVN0YXJ0LCBTb2x2ZXIuZHJhd1N0YXJ0UG9zKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoXCJJbnRlcnByZXRhY2phIHBhcmFtZXRyw7N3IGkgcmVzenR5IG1vZGVsdVwiLCBjQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLlJvd051bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY0Fuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChjQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICAgICAgY29uc3QgYWkgPSB0aGlzLlJvdW5kKGEubnVtYmVyc1tpXVswXSk7XHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2U6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmIChhaSA9PT0gMCkgY2hhbmdlID0gXCJuaWUgem1pZW5pIHdhcnRvxZtjaVwiO1xyXG4gICAgICAgICAgICBlbHNlIGNoYW5nZSA9IGAke2FpIDwgMCA/IFwiem1hbGVqZVwiIDogXCJ3enJvxZtuaWVcIn0gbyAke01hdGguYWJzKGFpKX1gO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gYEplxbxlbGkgem1pZW5uYSBYJHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChpICsgMSl9IHd6cm/Fm25pZSBvIDEgdG8gem1pZW5uYSBZICR7Y2hhbmdlfSAoY2V0ZXJpcyBwYXJpYnVzKWA7XHJcbiAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dCh0ZXh0LCBjQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoY0Fuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiUmVzenR5IG1vZGVsdTpcIiwgY0Fuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgY0Fuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChjQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBlLlRyYW5zcG9zZSgpLkRyYXcoY0Fuc3dlckRyYXcsIFwiZVwiKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVYKFlYWDogTWF0cml4LCBhMG11bHQ6IG51bWJlcik6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IFlYWF9UOiBNYXRyaXggPSBZWFguVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFlYWF9ULlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFlYWF9ULlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzW3Jvd10gPSBuZXcgQXJyYXk8bnVtYmVyPihZWFhfVC5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBZWFhfVC5Db2x1bW5OdW1iZXI7IGNvbCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3dzW3Jvd11bY29sXSA9IGNvbCA9PSAwID8gYTBtdWx0IDogWVhYX1QubnVtYmVyc1tyb3ddW2NvbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVlfaGF0KGE6IE1hdHJpeCwgWDogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFguUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgWC5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oMSk7XHJcbiAgICAgICAgICAgIGxldCB5X2hhdDogbnVtYmVyID0gYS5udW1iZXJzWzBdWzBdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAxOyBjb2wgPCBYLkNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHlfaGF0ICs9IGEubnVtYmVyc1tjb2xdWzBdICogWC5udW1iZXJzW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzW3Jvd11bMF0gPSB5X2hhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlX2UoWTogTWF0cml4LCBZX2hhdDogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFkuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgWS5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gW1kubnVtYmVyc1tyb3ddWzBdIC0gWV9oYXQubnVtYmVyc1tyb3ddWzBdXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlU3NxckZvckEoRF9zcXI6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygxKTtcclxuICAgICAgICByb3dzWzBdID0gbmV3IEFycmF5PG51bWJlcj4oRF9zcXIuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBEX3Nxci5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NbMF1baV0gPSBEX3Nxci5udW1iZXJzW2ldW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWFrdGVTRm9yQShTX3NxckZvckE6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygxKTtcclxuICAgICAgICByb3dzWzBdID0gbmV3IEFycmF5KFNfc3FyRm9yQS5Db2x1bW5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNfc3FyRm9yQS5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NbMF1baV0gPSBNYXRoLnNxcnQoU19zcXJGb3JBLm51bWJlcnNbMF1baV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVWRm9yQShTX2ZvckE6IE1hdHJpeCwgYTogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKDEpO1xyXG4gICAgICAgIHJvd3NbMF0gPSBuZXcgQXJyYXk8bnVtYmVyPihTX2ZvckEuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTX2ZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzWzBdW2ldID0gTWF0aC5hYnMoU19mb3JBLm51bWJlcnNbMF1baV0gLyBhLm51bWJlcnNbaV1bMF0pICogMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVURm9yQShTX2ZvckE6IE1hdHJpeCwgYTogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKDApO1xyXG4gICAgICAgIHJvd3NbMF0gPSBuZXcgQXJyYXk8bnVtYmVyPihTX2ZvckEuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTX2ZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzWzBdW2ldID0gTWF0aC5hYnMoYS5udW1iZXJzW2ldWzBdKSAvIFNfZm9yQS5udW1iZXJzWzBdW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVSX3NxcihlVGU6IE1hdHJpeCwgWXRZOiBNYXRyaXgsIHlfYXZnOiBudW1iZXIsIG46IG51bWJlcik6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAxIC0gKGVUZS5udW1iZXJzWzBdWzBdIC8gKFl0WS5udW1iZXJzWzBdWzBdIC0gKG4gKiAoeV9hdmcgKiB5X2F2ZykpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVGKFJfc3FyOiBudW1iZXIsIG46IG51bWJlciwgazogbnVtYmVyKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICgoUl9zcXIgLyAoMSAtIFJfc3FyKSkgKiAoKG4gLSBrIC0gMSkgLyBrKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDYW52YXNIZWxwZXIgfSBmcm9tIFwiLi4vQ2FudmFzSGVscGVyXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vVmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiLi4vTWF0cml4XCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uL1V0aWxzXCI7XHJcblxyXG4vKiogQmFzZSBjbGFzcyBmb3IgY2xhc3NlcyBzb2x2aW5nIGVjb25vbWV0cmljIHByb2JsZW1zICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTb2x2ZXJcclxue1xyXG4gICAgLy8jcmVnaW9uIGVycm9yIG1lc3NhZ2VzXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IG5vdE1hdHJpeEVycm9yOiBzdHJpbmcgPSBcInBvZGFuYSB3YXJ0b8WbxIcgbmllIGplc3QgbWFjaWVyesSFXCI7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IG1hdHJpeE5vdFNxdWFyZUVycm9yOiBzdHJpbmcgPSBcInBvZGFuYSBtYWNpZXJ6IG5pZSBqZXN0IGt3YWRyYXRvd2EgKHR5bGUgd2llcnN6eSBjbyBrb2x1bW4pXCI7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IG5vdE51bWJlckVycm9yOiBzdHJpbmcgPSBcInBvZGFuYSB3YXJ0b8WbxIcgbmllIGplc3QgbGljemLEhVwiO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBub3RWZWN0b3JFcnJvcjogc3RyaW5nID0gXCJwb2RhbmEgbWFjaWVyeiBuaWUgamVzdCB3ZWt0b3JlbSAoamVkZW4gd2llcnN6IGFsYm8gamVkbmEga29sdW1uYSlcIjtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgZHJhd1N0YXJ0UG9zOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoMTAsIDMwKTtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgc2VwYXJhdGluZ0xpbmVUaGlja25lc3M6IG51bWJlciA9IDU7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IGxpbmVNYXJnaW46IG51bWJlciA9IDI1O1xyXG5cclxuXHJcbiAgICAvKiogTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHdoaWNoIGFsbCBkaXNwbGF5ZWQgbnVtYmVycyBzaG91bGQgYmUgcm91bmRlICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IHJvdW5kaW5nOiBudW1iZXIgPSAzO1xyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGlucHV0czogTWFwPHN0cmluZywgSFRNTElucHV0RWxlbWVudD4gPSBuZXcgTWFwPHN0cmluZywgSFRNTElucHV0RWxlbWVudD4oKTtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBlcnJvckxhYmVsczogTWFwPHN0cmluZywgSFRNTExhYmVsRWxlbWVudD4gPSBuZXcgTWFwPHN0cmluZywgSFRNTExhYmVsRWxlbWVudD4oKTtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlucHV0czogUmVhZG9ubHlBcnJheTxzdHJpbmc+KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9ICg8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1wiKSkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dElkID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50Lm9uaW5wdXQgPSB0aGlzLkhhbmRsZUlucHV0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzLnNldChpbnB1dElkLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yTGFiZWxzLnNldChpbnB1dElkLCA8SFRNTExhYmVsRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkICsgXCJfZXJyb3JcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxsZWQgd2hlbmV2ZXIgYW55IG9mIGlucHV0IGZpZWxkcyBmcm9tIHRoaXMuaW5wdXRzIGlzIHVwZGF0ZWQgXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRFdmVudCBJbnB1dEV2ZW50IHJhaXNlZCBieSBpbnB1dCBmaWxlZCB3aGljaCB3YXMgbW9kaWZpZWQgYnkgdXNlclxyXG4gICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBIYW5kbGVJbnB1dChpbnB1dEV2ZW50OiBJbnB1dEV2ZW50KTogdm9pZDtcclxuXHJcbiAgICAvKiogRGlzcGxheXMgZXJyb3IgbGFiZWwgbmV4dCB0byBpbnB1dCBmaWVsZCAqL1xyXG4gICAgcHJvdGVjdGVkIERpc3BsYXlJbnB1dEVycm9yKGlucHV0SWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZXJyb3JMYWJlbHMuZ2V0KGlucHV0SWQpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEhpZGVzIGFsbCBlcnJvciBsYWJlbHMgZGlzcGxheWVkIHVzaW5nIHRoaXMuRGlzcGxheUlucHV0RXJyb3IgKi9cclxuICAgIHByb3RlY3RlZCBDbGVhcklucHV0RXJyb3JzKCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVycm9yTGFiZWxzLmZvckVhY2goKGxhYmVsLCBpZCkgPT4gbGFiZWwuaW5uZXJIVE1MID0gXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEdldElucHV0VmFsdWUoaW5wdXRJZDogc3RyaW5nKTogc3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRzLmdldChpbnB1dElkKS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgR2V0SW5wdXRWYWx1ZUFzTnVtYmVyKGlucHV0SWQ6IHN0cmluZyk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN0cmluZ1ZhbHVlOiBzdHJpbmcgPSB0aGlzLkdldElucHV0VmFsdWUoaW5wdXRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHN0cmluZ1ZhbHVlID09IG51bGwgfHwgc3RyaW5nVmFsdWUgPT0gXCJcIikgcmV0dXJuIE5hTjtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIoc3RyaW5nVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB2YWx1ZSA9IE51bWJlcihzdHJpbmdWYWx1ZS5yZXBsYWNlKCcsJywgJy4nKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRHJhd3MgdmVydGljYWwgbGluZSB0byBzZXBhcmF0ZSB0d28gcGFydHMgb2YgcHJvYmxlbSdzIHNvbHV0aW9uLlxyXG4gICAgICogUmV0dXJucyBWZWN0b3IyIHJlcHJlc2VudGluZyBwb3NpdGlvbiB3aGVyZSBkcmF3aW5nIG9mIHRoZSBuZXh0IHBhcnQgc2hvdWxkIHN0YXJ0XHJcbiAgICAgKiBAcGFyYW0gcmlnaHRtb3N0TWF0cml4IFJpZ2h0bW9zdCBtYXRyaXggZnJvbSBmaW5pc2hlZCBwYXJ0IG9mIHNvbHV0aW9uLiBMaW5lIHdpbGwgYmUgZHJhd24gbmV4dCB0byBpdC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIERyYXdTZXBhcmF0aW5nVmVydGljYWxMaW5lKHJpZ2h0bW9zdE1hdHJpeDogTWF0cml4KTogVmVjdG9yMlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpbmVYOiBudW1iZXIgPSByaWdodG1vc3RNYXRyaXguTGFzdERyYXdQb3NpdGlvbi54ICsgcmlnaHRtb3N0TWF0cml4LlBpeGVsV2lkdGggKyBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW47XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKG5ldyBWZWN0b3IyKGxpbmVYLCAwKSwgbmV3IFZlY3RvcjIobGluZVgsIENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy5oZWlnaHQpLCBTb2x2ZXIuc2VwYXJhdGluZ0xpbmVUaGlja25lc3MpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihsaW5lWCArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgU29sdmVyLmRyYXdTdGFydFBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUm91bmRzIG51bWJlciB0byBkZWZhdWx0IG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyAqL1xyXG4gICAgcHJvdGVjdGVkIFJvdW5kKHZhbHVlOiBudW1iZXIpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVXRpbHMuUm91bmROdW1iZXIodmFsdWUsIFNvbHZlci5yb3VuZGluZyk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbmFtZXNwYWNlIFV0aWxzXHJcbntcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBUcnlSZW1vdmVGcm9tQXJyYXk8VD4oYXJyYXk6IFRbXSwgZWxlbWVudDogVCk6IGJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgZm91bmRFbGVtZW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5W2ldID09PSBlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZEVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqUmVtb3ZlcyBmaXJzdCBvY2N1cnJlbmNlIG9mIGdpdmVuIG9iamVjdCBpbiBhbiBhcnJheSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZUZyb21BcnJheTxUPihhcnJheTogVFtdLCBlbGVtZW50OiBUKTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmICghVHJ5UmVtb3ZlRnJvbUFycmF5KGFycmF5LCBlbGVtZW50KSkgdGhyb3cgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIHNwZWNpZmllZCBlbGVtZW50IGluIHRoZSBwcm92aWRlZCBhcnJheVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipDaGVja3Mgd2hldGhlciBvYmplY3QgaXMgaW4gYW4gYXJyYXkgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBpcyAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIElzRWxlbWVudEluQXJyYXk8VD4oYXJyYXk6IFRbXSwgZWxlbWVudDogVCk6IGJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgZm91bmRFbGVtZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0gPT09IGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipSZW1vdmVzIG9iamVjdCBmcm9tIGFuIGFycmF5IGF0IHNwZWNpZmllZCBpbmRleCAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZUZyb21BcnJheUF0SW5kZXg8VD4oYXJyYXk6IFRbXSwgaW5kZXg6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIGluZGV4IG9mIGZpcnN0IG9jdXJyZW5jZSBvZiBnaXZlbiBlbGVtZW50IGluIGFycmF5LiBcclxuICAgICAqIElmIGVsZW1lbnQgaXMgbm90IHByZXNlbnQgaW4gdGhlIGFycmF5IC0xIGlzIHJldHVybmVkICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RWxlbWVudEluZGV4PFQ+KGFycmF5OiBUW10sIGVsZW1lbnQ6IFQpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5W2ldID09IGVsZW1lbnQpIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIHByb3ZpZGVkIG51bWJlciBhcyBzdHJpbmcgaW4gc3Vic2NyaXB0ICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTnVtYmVyVG9TdWJzY3JpcHQodmFsdWU6IG51bWJlcik6IHN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IDkgfHwgdmFsdWUgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSkgdGhyb3cgbmV3IEVycm9yKFwiVmFsdWUgbXVzdCBiZSBpbnRlZ3JhbCBudW1iZXIgZnJvbSByYW5nZSA8MDs5PlwiKTtcclxuICAgICAgICBlbHNlIHJldHVybiBbJ+KCgCcsICfigoEnLCAn4oKCJywgJ+KCgycsICfigoQnLCAn4oKFJywgJ+KChicsICfigocnLCAn4oKIJywgJ+KCiSddW3ZhbHVlXVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb3B5QXJyYXk8VD4oYXJyYXk6IHJlYWRvbmx5IFRbXSk6IFRbXTtcclxuXHJcbiAgICAvKiogQ3JlYXRlcyBzaGFsbG93IGNvcHkgb2YgYW4gYXJyYXkgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb3B5QXJyYXk8VD4oYXJyYXk6IFRbXSk6IFRbXVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNvcHk6IFRbXSA9IG5ldyBBcnJheTxUPihhcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSBjb3B5W2ldID0gYXJyYXlbaV07XHJcblxyXG4gICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG51bWJlciByb3VuZGVkIHRvIGRlY2ltYWxQbGFjZXMgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUm91bmROdW1iZXIodmFsdWU6IG51bWJlciwgZGVjaW1hbFBsYWNlczogbnVtYmVyKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZS50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpKTtcclxuICAgIH1cclxufSIsIi8qKlR3byBkaW1lbnNpb25hbCB2ZWN0b3IuIFRoaXMgY2Fsc3MgaXMgaW1tdXRhYmxlICovXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IyXHJcbntcclxuICAgIHB1YmxpYyByZWFkb25seSB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgeTogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqQWRkcyB2ZWN0b3JBIHRvIHZlY3RvckIgYW5kIHJldHVybnMgbmV3IFZlY3RvcjIgY3JlYXRlZCBhcyB0aGUgcmVzdWx0Ki9cclxuICAgIHN0YXRpYyBBZGQodmVjdG9yQTogVmVjdG9yMiwgdmVjdG9yQjogVmVjdG9yMik6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjdG9yQS54ICsgdmVjdG9yQi54LCB2ZWN0b3JBLnkgKyB2ZWN0b3JCLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlN1YnN0cmFjdHMgdmVjdG9yQiBmcm9tIHZlY3RvckEgYW5kIHJldHVybnMgbmV3IFZlY3RvcjIgY3JlYXRlZCBhcyB0aGUgcmVzdWx0Ki9cclxuICAgIHN0YXRpYyBTdWJzdHJhY3QodmVjdG9yQTogVmVjdG9yMiwgdmVjdG9yQjogVmVjdG9yMik6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjdG9yQS54IC0gdmVjdG9yQi54LCB2ZWN0b3JBLnkgLSB2ZWN0b3JCLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKk11bHRpcGxpZXMgdmVjdG9yIGEgYnkgdmVjdG9yIGIgYW5kIHJldHVybnMgbmV3IFZlY3RvcjIgY3JlYXRlZCBhcyB0aGUgcmVzdWx0Ki9cclxuICAgIHN0YXRpYyBNdWx0aXBseSh2ZWN0b3I6IFZlY3RvcjIsIG11bHRpcGlsZXI6IG51bWJlcik6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjdG9yLnggKiBtdWx0aXBpbGVyLCB2ZWN0b3IueSAqIG11bHRpcGlsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKkNvbXB1dGVzIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlY290cnMgYW5kIHJldHVybnMgdGhlIHJlc3VsdCAqL1xyXG4gICAgc3RhdGljIERpc3RhbmNlKHZlY3RvckE6IFZlY3RvcjIsIHZlY3RvckI6IFZlY3RvcjIpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgYSA9IHZlY3RvckEueCAtIHZlY3RvckIueDtcclxuICAgICAgICBsZXQgYiA9IHZlY3RvckEueSAtIHZlY3RvckIueTtcclxuICAgICAgICBhICo9IGE7XHJcbiAgICAgICAgYiAqPSBiO1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGEgKyBiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipSZXR1cm5zIHRydWUgaWYgdHdvIHZlY3RvcnMgYXJlIGVxdWFsICovXHJcbiAgICBzdGF0aWMgRXF1YWxzKHZlY3RvckE6IFZlY3RvcjIsIHZlY3RvckI6IFZlY3RvcjIpOiBib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHZlY3RvckEueCA9PT0gdmVjdG9yQi54ICYmIHZlY3RvckEueSA9PT0gdmVjdG9yQi55O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUHJvZ3JhbSB9IGZyb20gJy4vUHJvZ3JhbSc7XG5pbXBvcnQgeyBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIgfSBmcm9tICcuL1NvbHZlcnMvQ2F0YWx5c2lzRWZmZWN0U29sdmVyJztcbmltcG9ydCB7IE1OS1NvbHZlciB9IGZyb20gJy4vU29sdmVycy9NTktTb2x2ZXInO1xuXG5sZXQgcHJvZ3JhbTtcblxuc3dpdGNoIChkb2N1bWVudC50aXRsZSkgXG57XG4gICAgY2FzZSBcIlN0cm9uYSBnxYLDs3duYVwiOlxuICAgICAgICAvLyBwcm9ncmFtID0gbmV3IFByb2dyYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkVmZWt0IGthdGFsaXp5XCI6XG4gICAgICAgIHByb2dyYW0gPSBuZXcgQ2F0YWx5c2lzRWZmZWN0U29sdmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJNTktcIjpcbiAgICAgICAgcHJvZ3JhbSA9IG5ldyBNTktTb2x2ZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCJkb2N1bWVudCB0aXRsZSBcIiArIGRvY3VtZW50LnRpdGxlICsgXCIgZG9lc24ndCBtYXRjaCBhbnkgY2FzZSFcIik7XG4gICAgICAgIGJyZWFrO1xufSJdLCJzb3VyY2VSb290IjoiIn0=