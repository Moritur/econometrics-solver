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
        CanvasHelper_1.CanvasHelper.DrawText(`S²=${Number(S_sqr.toFixed(3))}`, Vector2_1.Vector2.Add(eTe.LastDrawPosition, new Vector2_1.Vector2(Matrix_1.Matrix.cellPixelSize + Matrix_1.Matrix.matrixPixelMargin, Matrix_1.Matrix.labelPixelMargin)), 16, "left", "sans-serif", "black", "bold");
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
        ;
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
        CanvasHelper_1.CanvasHelper.DrawText(`R²=${this.Round(R_sqr)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2_1.Vector2.Add(bbbAnswerDraw, new Vector2_1.Vector2(0, Solver_1.Solver.lineMargin));
        CanvasHelper_1.CanvasHelper.DrawText(`F=${this.Round(F)}`, bbbAnswerDraw, 18, "left");
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
        CanvasHelper_1.CanvasHelper.DrawText(`R²=${roundR_sqr}   ${roundR_sqr * 100}% zmienności y jest objaśniane przez model`, bbbbAnswerDraw, 18, "left");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzdGF0L2Rpc3QvanN0YXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbnZhc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9Tb2x2ZXJzL0NhdGFseXNpc0VmZmVjdFNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU29sdmVycy9NTktTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NvbHZlcnMvU29sdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVmVjdG9yMi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFVBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyxRQUFRO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVOztBQUU5QjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7O0FBRUEsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLGlCQUFpQjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUEsS0FBSztBQUNMOztBQUVBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPLE9BQU87QUFDZDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCx5QkFBeUIsd0JBQXdCOztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsaUJBQWlCLFVBQVU7O0FBRTNCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7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LyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIihmdW5jdGlvbiAod2luZG93LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZmFjdG9yeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmpTdGF0ID0gZmFjdG9yeSgpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbnZhciBqU3RhdCA9IChmdW5jdGlvbihNYXRoLCB1bmRlZmluZWQpIHtcblxuLy8gRm9yIHF1aWNrIHJlZmVyZW5jZS5cbnZhciBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gQ2FsY3VsYXRlIGNvcnJlY3Rpb24gZm9yIElFRUUgZXJyb3Jcbi8vIFRPRE86IFRoaXMgY2FsY3VsYXRpb24gY2FuIGJlIGltcHJvdmVkLlxuZnVuY3Rpb24gY2FsY1JkeChuLCBtKSB7XG4gIHZhciB2YWwgPSBuID4gbSA/IG4gOiBtO1xuICByZXR1cm4gTWF0aC5wb3coMTAsXG4gICAgICAgICAgICAgICAgICAxNyAtIH5+KE1hdGgubG9nKCgodmFsID4gMCkgPyB2YWwgOiAtdmFsKSkgKiBNYXRoLkxPRzEwRSkpO1xufVxuXG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5cbmZ1bmN0aW9uIGlzTnVtYmVyKG51bSkge1xuICByZXR1cm4gKHR5cGVvZiBudW0gPT09ICdudW1iZXInKSA/IG51bSAtIG51bSA9PT0gMCA6IGZhbHNlO1xufVxuXG5cbi8vIENvbnZlcnRzIHRoZSBqU3RhdCBtYXRyaXggdG8gdmVjdG9yLlxuZnVuY3Rpb24gdG9WZWN0b3IoYXJyKSB7XG4gIHJldHVybiBjb25jYXQuYXBwbHkoW10sIGFycik7XG59XG5cblxuLy8gVGhlIG9uZSBhbmQgb25seSBqU3RhdCBjb25zdHJ1Y3Rvci5cbmZ1bmN0aW9uIGpTdGF0KCkge1xuICByZXR1cm4gbmV3IGpTdGF0Ll9pbml0KGFyZ3VtZW50cyk7XG59XG5cblxuLy8gVE9ETzogUmVtb3ZlIGFmdGVyIGFsbCByZWZlcmVuY2VzIGluIHNyYyBmaWxlcyBoYXZlIGJlZW4gcmVtb3ZlZC5cbmpTdGF0LmZuID0galN0YXQucHJvdG90eXBlO1xuXG5cbi8vIEJ5IHNlcGFyYXRpbmcgdGhlIGluaXRpYWxpemVyIGZyb20gdGhlIGNvbnN0cnVjdG9yIGl0J3MgZWFzaWVyIHRvIGhhbmRsZVxuLy8gYWx3YXlzIHJldHVybmluZyBhIG5ldyBpbnN0YW5jZSB3aGV0aGVyIFwibmV3XCIgd2FzIHVzZWQgb3Igbm90LlxualN0YXQuX2luaXQgPSBmdW5jdGlvbiBfaW5pdChhcmdzKSB7XG4gIC8vIElmIGZpcnN0IGFyZ3VtZW50IGlzIGFuIGFycmF5LCBtdXN0IGJlIHZlY3RvciBvciBtYXRyaXguXG4gIGlmIChpc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgLy8gQ2hlY2sgaWYgbWF0cml4LlxuICAgIGlmIChpc0FycmF5KGFyZ3NbMF1bMF0pKSB7XG4gICAgICAvLyBTZWUgaWYgYSBtYXBwaW5nIGZ1bmN0aW9uIHdhcyBhbHNvIHBhc3NlZC5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGFyZ3NbMV0pKVxuICAgICAgICBhcmdzWzBdID0galN0YXQubWFwKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGVhY2ggaXMgZmFzdGVyIHRoYW4gdGhpcy5wdXNoLmFwcGx5KHRoaXMsIGFyZ3NbMF0uXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3NbMF0ubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXNbaV0gPSBhcmdzWzBdW2ldO1xuICAgICAgdGhpcy5sZW5ndGggPSBhcmdzWzBdLmxlbmd0aDtcblxuICAgIC8vIE90aGVyd2lzZSBtdXN0IGJlIGEgdmVjdG9yLlxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzWzBdID0gaXNGdW5jdGlvbihhcmdzWzFdKSA/IGpTdGF0Lm1hcChhcmdzWzBdLCBhcmdzWzFdKSA6IGFyZ3NbMF07XG4gICAgICB0aGlzLmxlbmd0aCA9IDE7XG4gICAgfVxuXG4gIC8vIElmIGZpcnN0IGFyZ3VtZW50IGlzIG51bWJlciwgYXNzdW1lIGNyZWF0aW9uIG9mIHNlcXVlbmNlLlxuICB9IGVsc2UgaWYgKGlzTnVtYmVyKGFyZ3NbMF0pKSB7XG4gICAgdGhpc1swXSA9IGpTdGF0LnNlcS5hcHBseShudWxsLCBhcmdzKTtcbiAgICB0aGlzLmxlbmd0aCA9IDE7XG5cbiAgLy8gSGFuZGxlIGNhc2Ugd2hlbiBqU3RhdCBvYmplY3QgaXMgcGFzc2VkIHRvIGpTdGF0LlxuICB9IGVsc2UgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBqU3RhdCkge1xuICAgIC8vIER1cGxpY2F0ZSB0aGUgb2JqZWN0IGFuZCBwYXNzIGl0IGJhY2suXG4gICAgcmV0dXJuIGpTdGF0KGFyZ3NbMF0udG9BcnJheSgpKTtcblxuICAvLyBVbmV4cGVjdGVkIGFyZ3VtZW50IHZhbHVlLCByZXR1cm4gZW1wdHkgalN0YXQgb2JqZWN0LlxuICAvLyBUT0RPOiBUaGlzIGlzIHN0cmFuZ2UgYmVoYXZpb3IuIFNob3VsZG4ndCB0aGlzIHRocm93IG9yIHNvbWUgc3VjaCB0byBsZXRcbiAgLy8gdGhlIHVzZXIga25vdyB0aGV5IGhhZCBiYWQgYXJndW1lbnRzP1xuICB9IGVsc2Uge1xuICAgIHRoaXNbMF0gPSBbXTtcbiAgICB0aGlzLmxlbmd0aCA9IDE7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5qU3RhdC5faW5pdC5wcm90b3R5cGUgPSBqU3RhdC5wcm90b3R5cGU7XG5qU3RhdC5faW5pdC5jb25zdHJ1Y3RvciA9IGpTdGF0O1xuXG5cbi8vIFV0aWxpdHkgZnVuY3Rpb25zLlxuLy8gVE9ETzogZm9yIGludGVybmFsIHVzZSBvbmx5P1xualN0YXQudXRpbHMgPSB7XG4gIGNhbGNSZHg6IGNhbGNSZHgsXG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgdG9WZWN0b3I6IHRvVmVjdG9yXG59O1xuXG5cbmpTdGF0Ll9yYW5kb21fZm4gPSBNYXRoLnJhbmRvbTtcbmpTdGF0LnNldFJhbmRvbSA9IGZ1bmN0aW9uIHNldFJhbmRvbShmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ZuIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIGpTdGF0Ll9yYW5kb21fZm4gPSBmbjtcbn07XG5cblxuLy8gRWFzaWx5IGV4dGVuZCB0aGUgalN0YXQgb2JqZWN0LlxuLy8gVE9ETzogaXMgdGhpcyBzZXJpb3VzbHkgbmVjZXNzYXJ5P1xualN0YXQuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xuICB2YXIgaSwgajtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIGZvciAoaiBpbiBvYmopXG4gICAgICBqU3RhdFtqXSA9IG9ialtqXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGogaW4gYXJndW1lbnRzW2ldKVxuICAgICAgb2JqW2pdID0gYXJndW1lbnRzW2ldW2pdO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIG1hdHJpeC5cbmpTdGF0LnJvd3MgPSBmdW5jdGlvbiByb3dzKGFycikge1xuICByZXR1cm4gYXJyLmxlbmd0aCB8fCAxO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbWF0cml4LlxualN0YXQuY29scyA9IGZ1bmN0aW9uIGNvbHMoYXJyKSB7XG4gIHJldHVybiBhcnJbMF0ubGVuZ3RoIHx8IDE7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIG9iamVjdCB7IHJvd3M6IGksIGNvbHM6IGogfVxualN0YXQuZGltZW5zaW9ucyA9IGZ1bmN0aW9uIGRpbWVuc2lvbnMoYXJyKSB7XG4gIHJldHVybiB7XG4gICAgcm93czogalN0YXQucm93cyhhcnIpLFxuICAgIGNvbHM6IGpTdGF0LmNvbHMoYXJyKVxuICB9O1xufTtcblxuXG4vLyBSZXR1cm5zIGEgc3BlY2lmaWVkIHJvdyBhcyBhIHZlY3RvciBvciByZXR1cm4gYSBzdWIgbWF0cml4IGJ5IHBpY2sgc29tZSByb3dzXG5qU3RhdC5yb3cgPSBmdW5jdGlvbiByb3coYXJyLCBpbmRleCkge1xuICBpZiAoaXNBcnJheShpbmRleCkpIHtcbiAgICByZXR1cm4gaW5kZXgubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBqU3RhdC5yb3coYXJyLCBpKTtcbiAgICB9KVxuICB9XG4gIHJldHVybiBhcnJbaW5kZXhdO1xufTtcblxuXG4vLyByZXR1cm4gcm93IGFzIGFycmF5XG4vLyByb3dhKFtbMSwyXSxbMyw0XV0sMCkgLT4gWzEsMl1cbmpTdGF0LnJvd2EgPSBmdW5jdGlvbiByb3dhKGFyciwgaSkge1xuICByZXR1cm4galN0YXQucm93KGFyciwgaSk7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIHNwZWNpZmllZCBjb2x1bW4gYXMgYSB2ZWN0b3Igb3IgcmV0dXJuIGEgc3ViIG1hdHJpeCBieSBwaWNrIHNvbWVcbi8vIGNvbHVtbnNcbmpTdGF0LmNvbCA9IGZ1bmN0aW9uIGNvbChhcnIsIGluZGV4KSB7XG4gIGlmIChpc0FycmF5KGluZGV4KSkge1xuICAgIHZhciBzdWJtYXQgPSBqU3RhdC5hcmFuZ2UoYXJyLmxlbmd0aCkubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheShpbmRleC5sZW5ndGgpO1xuICAgIH0pO1xuICAgIGluZGV4LmZvckVhY2goZnVuY3Rpb24oaW5kLCBpKXtcbiAgICAgIGpTdGF0LmFyYW5nZShhcnIubGVuZ3RoKS5mb3JFYWNoKGZ1bmN0aW9uKGopIHtcbiAgICAgICAgc3VibWF0W2pdW2ldID0gYXJyW2pdW2luZF07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3VibWF0O1xuICB9XG4gIHZhciBjb2x1bW4gPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKVxuICAgIGNvbHVtbltpXSA9IFthcnJbaV1baW5kZXhdXTtcbiAgcmV0dXJuIGNvbHVtbjtcbn07XG5cblxuLy8gcmV0dXJuIGNvbHVtbiBhcyBhcnJheVxuLy8gY29sYShbWzEsMl0sWzMsNF1dLDApIC0+IFsxLDNdXG5qU3RhdC5jb2xhID0gZnVuY3Rpb24gY29sYShhcnIsIGkpIHtcbiAgcmV0dXJuIGpTdGF0LmNvbChhcnIsIGkpLm1hcChmdW5jdGlvbihhKXsgcmV0dXJuIGFbMF0gfSk7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGRpYWdvbmFsIG9mIHRoZSBtYXRyaXhcbmpTdGF0LmRpYWcgPSBmdW5jdGlvbiBkaWFnKGFycikge1xuICB2YXIgbnJvdyA9IGpTdGF0LnJvd3MoYXJyKTtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheShucm93KTtcbiAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbnJvdzsgcm93KyspXG4gICAgcmVzW3Jvd10gPSBbYXJyW3Jvd11bcm93XV07XG4gIHJldHVybiByZXM7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGFudGktZGlhZ29uYWwgb2YgdGhlIG1hdHJpeFxualN0YXQuYW50aWRpYWcgPSBmdW5jdGlvbiBhbnRpZGlhZyhhcnIpIHtcbiAgdmFyIG5yb3cgPSBqU3RhdC5yb3dzKGFycikgLSAxO1xuICB2YXIgcmVzID0gbmV3IEFycmF5KG5yb3cpO1xuICBmb3IgKHZhciBpID0gMDsgbnJvdyA+PSAwOyBucm93LS0sIGkrKylcbiAgICByZXNbaV0gPSBbYXJyW2ldW25yb3ddXTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbi8vIFRyYW5zcG9zZSBhIG1hdHJpeCBvciBhcnJheS5cbmpTdGF0LnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZShhcnIpIHtcbiAgdmFyIG9iaiA9IFtdO1xuICB2YXIgb2JqQXJyLCByb3dzLCBjb2xzLCBqLCBpO1xuXG4gIC8vIE1ha2Ugc3VyZSBhcnIgaXMgaW4gbWF0cml4IGZvcm1hdC5cbiAgaWYgKCFpc0FycmF5KGFyclswXSkpXG4gICAgYXJyID0gW2Fycl07XG5cbiAgcm93cyA9IGFyci5sZW5ndGg7XG4gIGNvbHMgPSBhcnJbMF0ubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBjb2xzOyBpKyspIHtcbiAgICBvYmpBcnIgPSBuZXcgQXJyYXkocm93cyk7XG4gICAgZm9yIChqID0gMDsgaiA8IHJvd3M7IGorKylcbiAgICAgIG9iakFycltqXSA9IGFycltqXVtpXTtcbiAgICBvYmoucHVzaChvYmpBcnIpO1xuICB9XG5cbiAgLy8gSWYgb2JqIGlzIHZlY3RvciwgcmV0dXJuIG9ubHkgc2luZ2xlIGFycmF5LlxuICByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMSA/IG9ialswXSA6IG9iajtcbn07XG5cblxuLy8gTWFwIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXkgb3IgYXJyYXkgb2YgYXJyYXlzLlxuLy8gXCJ0b0FsdGVyXCIgaXMgYW4gaW50ZXJuYWwgdmFyaWFibGUuXG5qU3RhdC5tYXAgPSBmdW5jdGlvbiBtYXAoYXJyLCBmdW5jLCB0b0FsdGVyKSB7XG4gIHZhciByb3csIG5yb3csIG5jb2wsIHJlcywgY29sO1xuXG4gIGlmICghaXNBcnJheShhcnJbMF0pKVxuICAgIGFyciA9IFthcnJdO1xuXG4gIG5yb3cgPSBhcnIubGVuZ3RoO1xuICBuY29sID0gYXJyWzBdLmxlbmd0aDtcbiAgcmVzID0gdG9BbHRlciA/IGFyciA6IG5ldyBBcnJheShucm93KTtcblxuICBmb3IgKHJvdyA9IDA7IHJvdyA8IG5yb3c7IHJvdysrKSB7XG4gICAgLy8gaWYgdGhlIHJvdyBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgaXRcbiAgICBpZiAoIXJlc1tyb3ddKVxuICAgICAgcmVzW3Jvd10gPSBuZXcgQXJyYXkobmNvbCk7XG4gICAgZm9yIChjb2wgPSAwOyBjb2wgPCBuY29sOyBjb2wrKylcbiAgICAgIHJlc1tyb3ddW2NvbF0gPSBmdW5jKGFycltyb3ddW2NvbF0sIHJvdywgY29sKTtcbiAgfVxuXG4gIHJldHVybiByZXMubGVuZ3RoID09PSAxID8gcmVzWzBdIDogcmVzO1xufTtcblxuXG4vLyBDdW11bGF0aXZlbHkgY29tYmluZSB0aGUgZWxlbWVudHMgb2YgYW4gYXJyYXkgb3IgYXJyYXkgb2YgYXJyYXlzIHVzaW5nIGEgZnVuY3Rpb24uXG5qU3RhdC5jdW1yZWR1Y2UgPSBmdW5jdGlvbiBjdW1yZWR1Y2UoYXJyLCBmdW5jLCB0b0FsdGVyKSB7XG4gIHZhciByb3csIG5yb3csIG5jb2wsIHJlcywgY29sO1xuXG4gIGlmICghaXNBcnJheShhcnJbMF0pKVxuICAgIGFyciA9IFthcnJdO1xuXG4gIG5yb3cgPSBhcnIubGVuZ3RoO1xuICBuY29sID0gYXJyWzBdLmxlbmd0aDtcbiAgcmVzID0gdG9BbHRlciA/IGFyciA6IG5ldyBBcnJheShucm93KTtcblxuICBmb3IgKHJvdyA9IDA7IHJvdyA8IG5yb3c7IHJvdysrKSB7XG4gICAgLy8gaWYgdGhlIHJvdyBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgaXRcbiAgICBpZiAoIXJlc1tyb3ddKVxuICAgICAgcmVzW3Jvd10gPSBuZXcgQXJyYXkobmNvbCk7XG4gICAgaWYgKG5jb2wgPiAwKVxuICAgICAgcmVzW3Jvd11bMF0gPSBhcnJbcm93XVswXTtcbiAgICBmb3IgKGNvbCA9IDE7IGNvbCA8IG5jb2w7IGNvbCsrKVxuICAgICAgcmVzW3Jvd11bY29sXSA9IGZ1bmMocmVzW3Jvd11bY29sLTFdLCBhcnJbcm93XVtjb2xdKTtcbiAgfVxuICByZXR1cm4gcmVzLmxlbmd0aCA9PT0gMSA/IHJlc1swXSA6IHJlcztcbn07XG5cblxuLy8gRGVzdHJ1Y3RpdmVseSBhbHRlciBhbiBhcnJheS5cbmpTdGF0LmFsdGVyID0gZnVuY3Rpb24gYWx0ZXIoYXJyLCBmdW5jKSB7XG4gIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jLCB0cnVlKTtcbn07XG5cblxuLy8gR2VuZXJhdGUgYSByb3dzIHggY29scyBtYXRyaXggYWNjb3JkaW5nIHRvIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbmpTdGF0LmNyZWF0ZSA9IGZ1bmN0aW9uICBjcmVhdGUocm93cywgY29scywgZnVuYykge1xuICB2YXIgcmVzID0gbmV3IEFycmF5KHJvd3MpO1xuICB2YXIgaSwgajtcblxuICBpZiAoaXNGdW5jdGlvbihjb2xzKSkge1xuICAgIGZ1bmMgPSBjb2xzO1xuICAgIGNvbHMgPSByb3dzO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgIHJlc1tpXSA9IG5ldyBBcnJheShjb2xzKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgY29sczsgaisrKVxuICAgICAgcmVzW2ldW2pdID0gZnVuYyhpLCBqKTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuXG5cbmZ1bmN0aW9uIHJldFplcm8oKSB7IHJldHVybiAwOyB9XG5cblxuLy8gR2VuZXJhdGUgYSByb3dzIHggY29scyBtYXRyaXggb2YgemVyb3MuXG5qU3RhdC56ZXJvcyA9IGZ1bmN0aW9uIHplcm9zKHJvd3MsIGNvbHMpIHtcbiAgaWYgKCFpc051bWJlcihjb2xzKSlcbiAgICBjb2xzID0gcm93cztcbiAgcmV0dXJuIGpTdGF0LmNyZWF0ZShyb3dzLCBjb2xzLCByZXRaZXJvKTtcbn07XG5cblxuZnVuY3Rpb24gcmV0T25lKCkgeyByZXR1cm4gMTsgfVxuXG5cbi8vIEdlbmVyYXRlIGEgcm93cyB4IGNvbHMgbWF0cml4IG9mIG9uZXMuXG5qU3RhdC5vbmVzID0gZnVuY3Rpb24gb25lcyhyb3dzLCBjb2xzKSB7XG4gIGlmICghaXNOdW1iZXIoY29scykpXG4gICAgY29scyA9IHJvd3M7XG4gIHJldHVybiBqU3RhdC5jcmVhdGUocm93cywgY29scywgcmV0T25lKTtcbn07XG5cblxuLy8gR2VuZXJhdGUgYSByb3dzIHggY29scyBtYXRyaXggb2YgdW5pZm9ybWx5IHJhbmRvbSBudW1iZXJzLlxualN0YXQucmFuZCA9IGZ1bmN0aW9uIHJhbmQocm93cywgY29scykge1xuICBpZiAoIWlzTnVtYmVyKGNvbHMpKVxuICAgIGNvbHMgPSByb3dzO1xuICByZXR1cm4galN0YXQuY3JlYXRlKHJvd3MsIGNvbHMsIGpTdGF0Ll9yYW5kb21fZm4pO1xufTtcblxuXG5mdW5jdGlvbiByZXRJZGVudChpLCBqKSB7IHJldHVybiBpID09PSBqID8gMSA6IDA7IH1cblxuXG4vLyBHZW5lcmF0ZSBhbiBpZGVudGl0eSBtYXRyaXggb2Ygc2l6ZSByb3cgeCBjb2xzLlxualN0YXQuaWRlbnRpdHkgPSBmdW5jdGlvbiBpZGVudGl0eShyb3dzLCBjb2xzKSB7XG4gIGlmICghaXNOdW1iZXIoY29scykpXG4gICAgY29scyA9IHJvd3M7XG4gIHJldHVybiBqU3RhdC5jcmVhdGUocm93cywgY29scywgcmV0SWRlbnQpO1xufTtcblxuXG4vLyBUZXN0cyB3aGV0aGVyIGEgbWF0cml4IGlzIHN5bW1ldHJpY1xualN0YXQuc3ltbWV0cmljID0gZnVuY3Rpb24gc3ltbWV0cmljKGFycikge1xuICB2YXIgc2l6ZSA9IGFyci5sZW5ndGg7XG4gIHZhciByb3csIGNvbDtcblxuICBpZiAoYXJyLmxlbmd0aCAhPT0gYXJyWzBdLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChyb3cgPSAwOyByb3cgPCBzaXplOyByb3crKykge1xuICAgIGZvciAoY29sID0gMDsgY29sIDwgc2l6ZTsgY29sKyspXG4gICAgICBpZiAoYXJyW2NvbF1bcm93XSAhPT0gYXJyW3Jvd11bY29sXSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8vIFNldCBhbGwgdmFsdWVzIHRvIHplcm8uXG5qU3RhdC5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKGFycikge1xuICByZXR1cm4galN0YXQuYWx0ZXIoYXJyLCByZXRaZXJvKTtcbn07XG5cblxuLy8gR2VuZXJhdGUgc2VxdWVuY2UuXG5qU3RhdC5zZXEgPSBmdW5jdGlvbiBzZXEobWluLCBtYXgsIGxlbmd0aCwgZnVuYykge1xuICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpXG4gICAgZnVuYyA9IGZhbHNlO1xuXG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhpdmFsID0gY2FsY1JkeChtaW4sIG1heCk7XG4gIHZhciBzdGVwID0gKG1heCAqIGhpdmFsIC0gbWluICogaGl2YWwpIC8gKChsZW5ndGggLSAxKSAqIGhpdmFsKTtcbiAgdmFyIGN1cnJlbnQgPSBtaW47XG4gIHZhciBjbnQ7XG5cbiAgLy8gQ3VycmVudCBpcyBhc3NpZ25lZCB1c2luZyBhIHRlY2huaXF1ZSB0byBjb21wZW5zYXRlIGZvciBJRUVFIGVycm9yLlxuICAvLyBUT0RPOiBOZWVkcyBiZXR0ZXIgaW1wbGVtZW50YXRpb24uXG4gIGZvciAoY250ID0gMDtcbiAgICAgICBjdXJyZW50IDw9IG1heCAmJiBjbnQgPCBsZW5ndGg7XG4gICAgICAgY250KyssIGN1cnJlbnQgPSAobWluICogaGl2YWwgKyBzdGVwICogaGl2YWwgKiBjbnQpIC8gaGl2YWwpIHtcbiAgICBhcnIucHVzaCgoZnVuYyA/IGZ1bmMoY3VycmVudCwgY250KSA6IGN1cnJlbnQpKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59O1xuXG5cbi8vIGFyYW5nZSg1KSAtPiBbMCwxLDIsMyw0XVxuLy8gYXJhbmdlKDEsNSkgLT4gWzEsMiwzLDRdXG4vLyBhcmFuZ2UoNSwxLC0xKSAtPiBbNSw0LDMsMl1cbmpTdGF0LmFyYW5nZSA9IGZ1bmN0aW9uIGFyYW5nZShzdGFydCwgZW5kLCBzdGVwKSB7XG4gIHZhciBybCA9IFtdO1xuICB2YXIgaTtcbiAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gc3RhcnQ7XG4gICAgc3RhcnQgPSAwO1xuICB9XG4gIGlmIChzdGFydCA9PT0gZW5kIHx8IHN0ZXAgPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKHN0YXJ0IDwgZW5kICYmIHN0ZXAgPCAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChzdGFydCA+IGVuZCAmJiBzdGVwID4gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoc3RlcCA+IDApIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBzdGVwKSB7XG4gICAgICBybC5wdXNoKGkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA+IGVuZDsgaSArPSBzdGVwKSB7XG4gICAgICBybC5wdXNoKGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmw7XG59O1xuXG5cbi8vIEE9W1sxLDIsM10sWzQsNSw2XSxbNyw4LDldXVxuLy8gc2xpY2UoQSx7cm93OntlbmQ6Mn0sY29sOntzdGFydDoxfX0pIC0+IFtbMiwzXSxbNSw2XV1cbi8vIHNsaWNlKEEsMSx7c3RhcnQ6MX0pIC0+IFs1LDZdXG4vLyBhcyBudW1weSBjb2RlIEFbOjIsMTpdXG5qU3RhdC5zbGljZSA9IChmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBfc2xpY2UobGlzdCwgc3RhcnQsIGVuZCwgc3RlcCkge1xuICAgIC8vIG5vdGUgaXQncyBub3QgZXF1YWwgdG8gcmFuZ2UubWFwIG1vZGUgaXQncyBhIGJ1Z1xuICAgIHZhciBpO1xuICAgIHZhciBybCA9IFtdO1xuICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCAmJiBlbmQgPT09IHVuZGVmaW5lZCAmJiBzdGVwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBqU3RhdC5jb3B5KGxpc3QpO1xuICAgIH1cblxuICAgIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgICBlbmQgPSBlbmQgfHwgbGlzdC5sZW5ndGg7XG4gICAgc3RhcnQgPSBzdGFydCA+PSAwID8gc3RhcnQgOiBsZW5ndGggKyBzdGFydDtcbiAgICBlbmQgPSBlbmQgPj0gMCA/IGVuZCA6IGxlbmd0aCArIGVuZDtcbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgIGlmIChzdGFydCA9PT0gZW5kIHx8IHN0ZXAgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0IDwgZW5kICYmIHN0ZXAgPCAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChzdGFydCA+IGVuZCAmJiBzdGVwID4gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoc3RlcCA+IDApIHtcbiAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IHN0ZXApIHtcbiAgICAgICAgcmwucHVzaChsaXN0W2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPiBlbmQ7aSArPSBzdGVwKSB7XG4gICAgICAgIHJsLnB1c2gobGlzdFtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBybDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWNlKGxpc3QsIHJjU2xpY2UpIHtcbiAgICB2YXIgY29sU2xpY2UsIHJvd1NsaWNlO1xuICAgIHJjU2xpY2UgPSByY1NsaWNlIHx8IHt9O1xuICAgIGlmIChpc051bWJlcihyY1NsaWNlLnJvdykpIHtcbiAgICAgIGlmIChpc051bWJlcihyY1NsaWNlLmNvbCkpXG4gICAgICAgIHJldHVybiBsaXN0W3JjU2xpY2Uucm93XVtyY1NsaWNlLmNvbF07XG4gICAgICB2YXIgcm93ID0galN0YXQucm93YShsaXN0LCByY1NsaWNlLnJvdyk7XG4gICAgICBjb2xTbGljZSA9IHJjU2xpY2UuY29sIHx8IHt9O1xuICAgICAgcmV0dXJuIF9zbGljZShyb3csIGNvbFNsaWNlLnN0YXJ0LCBjb2xTbGljZS5lbmQsIGNvbFNsaWNlLnN0ZXApO1xuICAgIH1cblxuICAgIGlmIChpc051bWJlcihyY1NsaWNlLmNvbCkpIHtcbiAgICAgIHZhciBjb2wgPSBqU3RhdC5jb2xhKGxpc3QsIHJjU2xpY2UuY29sKTtcbiAgICAgIHJvd1NsaWNlID0gcmNTbGljZS5yb3cgfHwge307XG4gICAgICByZXR1cm4gX3NsaWNlKGNvbCwgcm93U2xpY2Uuc3RhcnQsIHJvd1NsaWNlLmVuZCwgcm93U2xpY2Uuc3RlcCk7XG4gICAgfVxuXG4gICAgcm93U2xpY2UgPSByY1NsaWNlLnJvdyB8fCB7fTtcbiAgICBjb2xTbGljZSA9IHJjU2xpY2UuY29sIHx8IHt9O1xuICAgIHZhciByb3dzID0gX3NsaWNlKGxpc3QsIHJvd1NsaWNlLnN0YXJ0LCByb3dTbGljZS5lbmQsIHJvd1NsaWNlLnN0ZXApO1xuICAgIHJldHVybiByb3dzLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICAgIHJldHVybiBfc2xpY2Uocm93LCBjb2xTbGljZS5zdGFydCwgY29sU2xpY2UuZW5kLCBjb2xTbGljZS5zdGVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzbGljZTtcbn0oKSk7XG5cblxuLy8gQT1bWzEsMiwzXSxbNCw1LDZdLFs3LDgsOV1dXG4vLyBzbGljZUFzc2lnbihBLHtyb3c6e3N0YXJ0OjF9LGNvbDp7c3RhcnQ6MX19LFtbMCwwXSxbMCwwXV0pXG4vLyBBPVtbMSwyLDNdLFs0LDAsMF0sWzcsMCwwXV1cbmpTdGF0LnNsaWNlQXNzaWduID0gZnVuY3Rpb24gc2xpY2VBc3NpZ24oQSwgcmNTbGljZSwgQikge1xuICB2YXIgbmwsIG1sO1xuICBpZiAoaXNOdW1iZXIocmNTbGljZS5yb3cpKSB7XG4gICAgaWYgKGlzTnVtYmVyKHJjU2xpY2UuY29sKSlcbiAgICAgIHJldHVybiBBW3JjU2xpY2Uucm93XVtyY1NsaWNlLmNvbF0gPSBCO1xuICAgIHJjU2xpY2UuY29sID0gcmNTbGljZS5jb2wgfHwge307XG4gICAgcmNTbGljZS5jb2wuc3RhcnQgPSByY1NsaWNlLmNvbC5zdGFydCB8fCAwO1xuICAgIHJjU2xpY2UuY29sLmVuZCA9IHJjU2xpY2UuY29sLmVuZCB8fCBBWzBdLmxlbmd0aDtcbiAgICByY1NsaWNlLmNvbC5zdGVwID0gcmNTbGljZS5jb2wuc3RlcCB8fCAxO1xuICAgIG5sID0galN0YXQuYXJhbmdlKHJjU2xpY2UuY29sLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLm1pbihBLmxlbmd0aCwgcmNTbGljZS5jb2wuZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmNTbGljZS5jb2wuc3RlcCk7XG4gICAgdmFyIG0gPSByY1NsaWNlLnJvdztcbiAgICBubC5mb3JFYWNoKGZ1bmN0aW9uKG4sIGkpIHtcbiAgICAgIEFbbV1bbl0gPSBCW2ldO1xuICAgIH0pO1xuICAgIHJldHVybiBBO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKHJjU2xpY2UuY29sKSkge1xuICAgIHJjU2xpY2Uucm93ID0gcmNTbGljZS5yb3cgfHwge307XG4gICAgcmNTbGljZS5yb3cuc3RhcnQgPSByY1NsaWNlLnJvdy5zdGFydCB8fCAwO1xuICAgIHJjU2xpY2Uucm93LmVuZCA9IHJjU2xpY2Uucm93LmVuZCB8fCBBLmxlbmd0aDtcbiAgICByY1NsaWNlLnJvdy5zdGVwID0gcmNTbGljZS5yb3cuc3RlcCB8fCAxO1xuICAgIG1sID0galN0YXQuYXJhbmdlKHJjU2xpY2Uucm93LnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLm1pbihBWzBdLmxlbmd0aCwgcmNTbGljZS5yb3cuZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmNTbGljZS5yb3cuc3RlcCk7XG4gICAgdmFyIG4gPSByY1NsaWNlLmNvbDtcbiAgICBtbC5mb3JFYWNoKGZ1bmN0aW9uKG0sIGopIHtcbiAgICAgIEFbbV1bbl0gPSBCW2pdO1xuICAgIH0pO1xuICAgIHJldHVybiBBO1xuICB9XG5cbiAgaWYgKEJbMF0ubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBCID0gW0JdO1xuICB9XG4gIHJjU2xpY2Uucm93LnN0YXJ0ID0gcmNTbGljZS5yb3cuc3RhcnQgfHwgMDtcbiAgcmNTbGljZS5yb3cuZW5kID0gcmNTbGljZS5yb3cuZW5kIHx8IEEubGVuZ3RoO1xuICByY1NsaWNlLnJvdy5zdGVwID0gcmNTbGljZS5yb3cuc3RlcCB8fCAxO1xuICByY1NsaWNlLmNvbC5zdGFydCA9IHJjU2xpY2UuY29sLnN0YXJ0IHx8IDA7XG4gIHJjU2xpY2UuY29sLmVuZCA9IHJjU2xpY2UuY29sLmVuZCB8fCBBWzBdLmxlbmd0aDtcbiAgcmNTbGljZS5jb2wuc3RlcCA9IHJjU2xpY2UuY29sLnN0ZXAgfHwgMTtcbiAgbWwgPSBqU3RhdC5hcmFuZ2UocmNTbGljZS5yb3cuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLm1pbihBLmxlbmd0aCwgcmNTbGljZS5yb3cuZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJjU2xpY2Uucm93LnN0ZXApO1xuICBubCA9IGpTdGF0LmFyYW5nZShyY1NsaWNlLmNvbC5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWluKEFbMF0ubGVuZ3RoLCByY1NsaWNlLmNvbC5lbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmNTbGljZS5jb2wuc3RlcCk7XG4gIG1sLmZvckVhY2goZnVuY3Rpb24obSwgaSkge1xuICAgIG5sLmZvckVhY2goZnVuY3Rpb24obiwgaikge1xuICAgICAgQVttXVtuXSA9IEJbaV1bal07XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gQTtcbn07XG5cblxuLy8gWzEsMiwzXSAtPlxuLy8gW1sxLDAsMF0sWzAsMiwwXSxbMCwwLDNdXVxualN0YXQuZGlhZ29uYWwgPSBmdW5jdGlvbiBkaWFnb25hbChkaWFnQXJyYXkpIHtcbiAgdmFyIG1hdCA9IGpTdGF0Lnplcm9zKGRpYWdBcnJheS5sZW5ndGgsIGRpYWdBcnJheS5sZW5ndGgpO1xuICBkaWFnQXJyYXkuZm9yRWFjaChmdW5jdGlvbih0LCBpKSB7XG4gICAgbWF0W2ldW2ldID0gdDtcbiAgfSk7XG4gIHJldHVybiBtYXQ7XG59O1xuXG5cbi8vIHJldHVybiBjb3B5IG9mIEFcbmpTdGF0LmNvcHkgPSBmdW5jdGlvbiBjb3B5KEEpIHtcbiAgcmV0dXJuIEEubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgIGlmIChpc051bWJlcihyb3cpKVxuICAgICAgcmV0dXJuIHJvdztcbiAgICByZXR1cm4gcm93Lm1hcChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdDtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5cbi8vIFRPRE86IEdvIG92ZXIgdGhpcyBlbnRpcmUgaW1wbGVtZW50YXRpb24uIFNlZW1zIGEgdHJhZ2ljIHdhc3RlIG9mIHJlc291cmNlc1xuLy8gZG9pbmcgYWxsIHRoaXMgd29yay4gSW5zdGVhZCwgYW5kIHdoaWxlIHVnbHksIHVzZSBuZXcgRnVuY3Rpb24oKSB0byBnZW5lcmF0ZVxuLy8gYSBjdXN0b20gZnVuY3Rpb24gZm9yIGVhY2ggc3RhdGljIG1ldGhvZC5cblxuLy8gUXVpY2sgcmVmZXJlbmNlLlxudmFyIGpQcm90byA9IGpTdGF0LnByb3RvdHlwZTtcblxuLy8gRGVmYXVsdCBsZW5ndGguXG5qUHJvdG8ubGVuZ3RoID0gMDtcblxuLy8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuLy8gVE9ETzogQ2hlY2sgaWYgdGhleSdyZSBhY3R1YWxseSB1c2VkLCBhbmQgaWYgdGhleSBhcmUgdGhlbiByZW5hbWUgdGhlbVxuLy8gdG8gXypcbmpQcm90by5wdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG5qUHJvdG8uc29ydCA9IEFycmF5LnByb3RvdHlwZS5zb3J0O1xualByb3RvLnNwbGljZSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2U7XG5qUHJvdG8uc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cblxuLy8gUmV0dXJuIGEgY2xlYW4gYXJyYXkuXG5qUHJvdG8udG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gIHJldHVybiB0aGlzLmxlbmd0aCA+IDEgPyBzbGljZS5jYWxsKHRoaXMpIDogc2xpY2UuY2FsbCh0aGlzKVswXTtcbn07XG5cblxuLy8gTWFwIGEgZnVuY3Rpb24gdG8gYSBtYXRyaXggb3IgdmVjdG9yLlxualByb3RvLm1hcCA9IGZ1bmN0aW9uIG1hcChmdW5jLCB0b0FsdGVyKSB7XG4gIHJldHVybiBqU3RhdChqU3RhdC5tYXAodGhpcywgZnVuYywgdG9BbHRlcikpO1xufTtcblxuXG4vLyBDdW11bGF0aXZlbHkgY29tYmluZSB0aGUgZWxlbWVudHMgb2YgYSBtYXRyaXggb3IgdmVjdG9yIHVzaW5nIGEgZnVuY3Rpb24uXG5qUHJvdG8uY3VtcmVkdWNlID0gZnVuY3Rpb24gY3VtcmVkdWNlKGZ1bmMsIHRvQWx0ZXIpIHtcbiAgcmV0dXJuIGpTdGF0KGpTdGF0LmN1bXJlZHVjZSh0aGlzLCBmdW5jLCB0b0FsdGVyKSk7XG59O1xuXG5cbi8vIERlc3RydWN0aXZlbHkgYWx0ZXIgYW4gYXJyYXkuXG5qUHJvdG8uYWx0ZXIgPSBmdW5jdGlvbiBhbHRlcihmdW5jKSB7XG4gIGpTdGF0LmFsdGVyKHRoaXMsIGZ1bmMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLy8gRXh0ZW5kIHByb3RvdHlwZSB3aXRoIG1ldGhvZHMgdGhhdCBoYXZlIG5vIGFyZ3VtZW50LlxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpQcm90b1twYXNzZnVuY10gPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICByZXN1bHRzO1xuICAgICAgLy8gQ2hlY2sgZm9yIGNhbGxiYWNrLlxuICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBmdW5jLmNhbGwoc2VsZiwgalByb3RvW3Bhc3NmdW5jXS5jYWxsKHNlbGYpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgcmVzdWx0cyA9IGpTdGF0W3Bhc3NmdW5jXSh0aGlzKTtcbiAgICAgIHJldHVybiBpc0FycmF5KHJlc3VsdHMpID8galN0YXQocmVzdWx0cykgOiByZXN1bHRzO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCd0cmFuc3Bvc2UgY2xlYXIgc3ltbWV0cmljIHJvd3MgY29scyBkaW1lbnNpb25zIGRpYWcgYW50aWRpYWcnLnNwbGl0KCcgJykpO1xuXG5cbi8vIEV4dGVuZCBwcm90b3R5cGUgd2l0aCBtZXRob2RzIHRoYXQgaGF2ZSBvbmUgYXJndW1lbnQuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalByb3RvW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKGluZGV4LCBmdW5jKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAvLyBjaGVjayBmb3IgY2FsbGJhY2tcbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZnVuYy5jYWxsKHNlbGYsIGpQcm90b1twYXNzZnVuY10uY2FsbChzZWxmLCBpbmRleCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICByZXR1cm4galN0YXQoalN0YXRbcGFzc2Z1bmNdKHRoaXMsIGluZGV4KSk7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoJ3JvdyBjb2wnLnNwbGl0KCcgJykpO1xuXG5cbi8vIEV4dGVuZCBwcm90b3R5cGUgd2l0aCBzaW1wbGUgc2hvcnRjdXQgbWV0aG9kcy5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqUHJvdG9bcGFzc2Z1bmNdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4galN0YXQoalN0YXRbcGFzc2Z1bmNdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCdjcmVhdGUgemVyb3Mgb25lcyByYW5kIGlkZW50aXR5Jy5zcGxpdCgnICcpKTtcblxuXG4vLyBFeHBvc2luZyBqU3RhdC5cbnJldHVybiBqU3RhdDtcblxufShNYXRoKSk7XG4oZnVuY3Rpb24oalN0YXQsIE1hdGgpIHtcblxudmFyIGlzRnVuY3Rpb24gPSBqU3RhdC51dGlscy5pc0Z1bmN0aW9uO1xuXG4vLyBBc2NlbmRpbmcgZnVuY3Rpb25zIGZvciBzb3J0XG5mdW5jdGlvbiBhc2NOdW0oYSwgYikgeyByZXR1cm4gYSAtIGI7IH1cblxuZnVuY3Rpb24gY2xpcChhcmcsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKGFyZywgbWF4KSk7XG59XG5cblxuLy8gc3VtIG9mIGFuIGFycmF5XG5qU3RhdC5zdW0gPSBmdW5jdGlvbiBzdW0oYXJyKSB7XG4gIHZhciBzdW0gPSAwO1xuICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gIHdoaWxlICgtLWkgPj0gMClcbiAgICBzdW0gKz0gYXJyW2ldO1xuICByZXR1cm4gc3VtO1xufTtcblxuXG4vLyBzdW0gc3F1YXJlZFxualN0YXQuc3Vtc3FyZCA9IGZ1bmN0aW9uIHN1bXNxcmQoYXJyKSB7XG4gIHZhciBzdW0gPSAwO1xuICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gIHdoaWxlICgtLWkgPj0gMClcbiAgICBzdW0gKz0gYXJyW2ldICogYXJyW2ldO1xuICByZXR1cm4gc3VtO1xufTtcblxuXG4vLyBzdW0gb2Ygc3F1YXJlZCBlcnJvcnMgb2YgcHJlZGljdGlvbiAoU1NFKVxualN0YXQuc3Vtc3FlcnIgPSBmdW5jdGlvbiBzdW1zcWVycihhcnIpIHtcbiAgdmFyIG1lYW4gPSBqU3RhdC5tZWFuKGFycik7XG4gIHZhciBzdW0gPSAwO1xuICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gIHZhciB0bXA7XG4gIHdoaWxlICgtLWkgPj0gMCkge1xuICAgIHRtcCA9IGFycltpXSAtIG1lYW47XG4gICAgc3VtICs9IHRtcCAqIHRtcDtcbiAgfVxuICByZXR1cm4gc3VtO1xufTtcblxuLy8gc3VtIG9mIGFuIGFycmF5IGluIGVhY2ggcm93XG5qU3RhdC5zdW1yb3cgPSBmdW5jdGlvbiBzdW1yb3coYXJyKSB7XG4gIHZhciBzdW0gPSAwO1xuICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gIHdoaWxlICgtLWkgPj0gMClcbiAgICBzdW0gKz0gYXJyW2ldO1xuICByZXR1cm4gc3VtO1xufTtcblxuLy8gcHJvZHVjdCBvZiBhbiBhcnJheVxualN0YXQucHJvZHVjdCA9IGZ1bmN0aW9uIHByb2R1Y3QoYXJyKSB7XG4gIHZhciBwcm9kID0gMTtcbiAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICB3aGlsZSAoLS1pID49IDApXG4gICAgcHJvZCAqPSBhcnJbaV07XG4gIHJldHVybiBwcm9kO1xufTtcblxuXG4vLyBtaW5pbXVtIHZhbHVlIG9mIGFuIGFycmF5XG5qU3RhdC5taW4gPSBmdW5jdGlvbiBtaW4oYXJyKSB7XG4gIHZhciBsb3cgPSBhcnJbMF07XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKCsraSA8IGFyci5sZW5ndGgpXG4gICAgaWYgKGFycltpXSA8IGxvdylcbiAgICAgIGxvdyA9IGFycltpXTtcbiAgcmV0dXJuIGxvdztcbn07XG5cblxuLy8gbWF4aW11bSB2YWx1ZSBvZiBhbiBhcnJheVxualN0YXQubWF4ID0gZnVuY3Rpb24gbWF4KGFycikge1xuICB2YXIgaGlnaCA9IGFyclswXTtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoKytpIDwgYXJyLmxlbmd0aClcbiAgICBpZiAoYXJyW2ldID4gaGlnaClcbiAgICAgIGhpZ2ggPSBhcnJbaV07XG4gIHJldHVybiBoaWdoO1xufTtcblxuXG4vLyB1bmlxdWUgdmFsdWVzIG9mIGFuIGFycmF5XG5qU3RhdC51bmlxdWUgPSBmdW5jdGlvbiB1bmlxdWUoYXJyKSB7XG4gIHZhciBoYXNoID0ge30sIF9hcnIgPSBbXTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzaFthcnJbaV1dKSB7XG4gICAgICBoYXNoW2FycltpXV0gPSB0cnVlO1xuICAgICAgX2Fyci5wdXNoKGFycltpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBfYXJyO1xufTtcblxuXG4vLyBtZWFuIHZhbHVlIG9mIGFuIGFycmF5XG5qU3RhdC5tZWFuID0gZnVuY3Rpb24gbWVhbihhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LnN1bShhcnIpIC8gYXJyLmxlbmd0aDtcbn07XG5cblxuLy8gbWVhbiBzcXVhcmVkIGVycm9yIChNU0UpXG5qU3RhdC5tZWFuc3FlcnIgPSBmdW5jdGlvbiBtZWFuc3FlcnIoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5zdW1zcWVycihhcnIpIC8gYXJyLmxlbmd0aDtcbn07XG5cblxuLy8gZ2VvbWV0cmljIG1lYW4gb2YgYW4gYXJyYXlcbmpTdGF0Lmdlb21lYW4gPSBmdW5jdGlvbiBnZW9tZWFuKGFycikge1xuICByZXR1cm4gTWF0aC5wb3coalN0YXQucHJvZHVjdChhcnIpLCAxIC8gYXJyLmxlbmd0aCk7XG59O1xuXG5cbi8vIG1lZGlhbiBvZiBhbiBhcnJheVxualN0YXQubWVkaWFuID0gZnVuY3Rpb24gbWVkaWFuKGFycikge1xuICB2YXIgYXJybGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIF9hcnIgPSBhcnIuc2xpY2UoKS5zb3J0KGFzY051bSk7XG4gIC8vIGNoZWNrIGlmIGFycmF5IGlzIGV2ZW4gb3Igb2RkLCB0aGVuIHJldHVybiB0aGUgYXBwcm9wcmlhdGVcbiAgcmV0dXJuICEoYXJybGVuICYgMSlcbiAgICA/IChfYXJyWyhhcnJsZW4gLyAyKSAtIDEgXSArIF9hcnJbKGFycmxlbiAvIDIpXSkgLyAyXG4gICAgOiBfYXJyWyhhcnJsZW4gLyAyKSB8IDAgXTtcbn07XG5cblxuLy8gY3VtdWxhdGl2ZSBzdW0gb2YgYW4gYXJyYXlcbmpTdGF0LmN1bXN1bSA9IGZ1bmN0aW9uIGN1bXN1bShhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LmN1bXJlZHVjZShhcnIsIGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSk7XG59O1xuXG5cbi8vIGN1bXVsYXRpdmUgcHJvZHVjdCBvZiBhbiBhcnJheVxualN0YXQuY3VtcHJvZCA9IGZ1bmN0aW9uIGN1bXByb2QoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5jdW1yZWR1Y2UoYXJyLCBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSAqIGI7IH0pO1xufTtcblxuXG4vLyBzdWNjZXNzaXZlIGRpZmZlcmVuY2VzIG9mIGEgc2VxdWVuY2VcbmpTdGF0LmRpZmYgPSBmdW5jdGlvbiBkaWZmKGFycikge1xuICB2YXIgZGlmZnMgPSBbXTtcbiAgdmFyIGFyckxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAxOyBpIDwgYXJyTGVuOyBpKyspXG4gICAgZGlmZnMucHVzaChhcnJbaV0gLSBhcnJbaSAtIDFdKTtcbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vLyByYW5rcyBvZiBhbiBhcnJheVxualN0YXQucmFuayA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgdmFyIGk7XG4gIHZhciBkaXN0aW5jdE51bWJlcnMgPSBbXTtcbiAgdmFyIG51bWJlckNvdW50cyA9IHt9O1xuICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG51bWJlciA9IGFycltpXTtcbiAgICBpZiAobnVtYmVyQ291bnRzW251bWJlcl0pIHtcbiAgICAgIG51bWJlckNvdW50c1tudW1iZXJdKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlckNvdW50c1tudW1iZXJdID0gMTtcbiAgICAgIGRpc3RpbmN0TnVtYmVycy5wdXNoKG51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgdmFyIHNvcnRlZERpc3RpbmN0TnVtYmVycyA9IGRpc3RpbmN0TnVtYmVycy5zb3J0KGFzY051bSk7XG4gIHZhciBudW1iZXJSYW5rcyA9IHt9O1xuICB2YXIgY3VycmVudFJhbmsgPSAxO1xuICBmb3IgKGkgPSAwOyBpIDwgc29ydGVkRGlzdGluY3ROdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG51bWJlciA9IHNvcnRlZERpc3RpbmN0TnVtYmVyc1tpXTtcbiAgICB2YXIgY291bnQgPSBudW1iZXJDb3VudHNbbnVtYmVyXTtcbiAgICB2YXIgZmlyc3QgPSBjdXJyZW50UmFuaztcbiAgICB2YXIgbGFzdCA9IGN1cnJlbnRSYW5rICsgY291bnQgLSAxO1xuICAgIHZhciByYW5rID0gKGZpcnN0ICsgbGFzdCkgLyAyO1xuICAgIG51bWJlclJhbmtzW251bWJlcl0gPSByYW5rO1xuICAgIGN1cnJlbnRSYW5rICs9IGNvdW50O1xuICB9XG5cbiAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKG51bWJlcikge1xuICAgIHJldHVybiBudW1iZXJSYW5rc1tudW1iZXJdO1xuICB9KTtcbn07XG5cblxuLy8gbW9kZSBvZiBhbiBhcnJheVxuLy8gaWYgdGhlcmUgYXJlIG11bHRpcGxlIG1vZGVzIG9mIGFuIGFycmF5LCByZXR1cm4gYWxsIG9mIHRoZW1cbi8vIGlzIHRoaXMgdGhlIGFwcHJvcHJpYXRlIHdheSBvZiBoYW5kbGluZyBpdD9cbmpTdGF0Lm1vZGUgPSBmdW5jdGlvbiBtb2RlKGFycikge1xuICB2YXIgYXJyTGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIF9hcnIgPSBhcnIuc2xpY2UoKS5zb3J0KGFzY051bSk7XG4gIHZhciBjb3VudCA9IDE7XG4gIHZhciBtYXhDb3VudCA9IDA7XG4gIHZhciBudW1NYXhDb3VudCA9IDA7XG4gIHZhciBtb2RlX2FyciA9IFtdO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJyTGVuOyBpKyspIHtcbiAgICBpZiAoX2FycltpXSA9PT0gX2FycltpICsgMV0pIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb3VudCA+IG1heENvdW50KSB7XG4gICAgICAgIG1vZGVfYXJyID0gW19hcnJbaV1dO1xuICAgICAgICBtYXhDb3VudCA9IGNvdW50O1xuICAgICAgICBudW1NYXhDb3VudCA9IDA7XG4gICAgICB9XG4gICAgICAvLyBhcmUgdGhlcmUgbXVsdGlwbGUgbWF4IGNvdW50c1xuICAgICAgZWxzZSBpZiAoY291bnQgPT09IG1heENvdW50KSB7XG4gICAgICAgIG1vZGVfYXJyLnB1c2goX2FycltpXSk7XG4gICAgICAgIG51bU1heENvdW50Kys7XG4gICAgICB9XG4gICAgICAvLyByZXNldHRpbmcgY291bnQgZm9yIG5ldyB2YWx1ZSBpbiBhcnJheVxuICAgICAgY291bnQgPSAxO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudW1NYXhDb3VudCA9PT0gMCA/IG1vZGVfYXJyWzBdIDogbW9kZV9hcnI7XG59O1xuXG5cbi8vIHJhbmdlIG9mIGFuIGFycmF5XG5qU3RhdC5yYW5nZSA9IGZ1bmN0aW9uIHJhbmdlKGFycikge1xuICByZXR1cm4galN0YXQubWF4KGFycikgLSBqU3RhdC5taW4oYXJyKTtcbn07XG5cbi8vIHZhcmlhbmNlIG9mIGFuIGFycmF5XG4vLyBmbGFnID0gdHJ1ZSBpbmRpY2F0ZXMgc2FtcGxlIGluc3RlYWQgb2YgcG9wdWxhdGlvblxualN0YXQudmFyaWFuY2UgPSBmdW5jdGlvbiB2YXJpYW5jZShhcnIsIGZsYWcpIHtcbiAgcmV0dXJuIGpTdGF0LnN1bXNxZXJyKGFycikgLyAoYXJyLmxlbmd0aCAtIChmbGFnID8gMSA6IDApKTtcbn07XG5cbi8vIHBvb2xlZCB2YXJpYW5jZSBvZiBhbiBhcnJheSBvZiBhcnJheXNcbmpTdGF0LnBvb2xlZHZhcmlhbmNlID0gZnVuY3Rpb24gcG9vbGVkdmFyaWFuY2UoYXJyKSB7XG4gIHZhciBzdW1zcWVyciA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGEsIHNhbXBsZXMpIHtyZXR1cm4gYSArIGpTdGF0LnN1bXNxZXJyKHNhbXBsZXMpO30sIDApO1xuICB2YXIgY291bnQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhLCBzYW1wbGVzKSB7cmV0dXJuIGEgKyBzYW1wbGVzLmxlbmd0aDt9LCAwKTtcbiAgcmV0dXJuIHN1bXNxZXJyIC8gKGNvdW50IC0gYXJyLmxlbmd0aCk7XG59O1xuXG4vLyBkZXZpYXRpb24gb2YgYW4gYXJyYXlcbmpTdGF0LmRldmlhdGlvbiA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgdmFyIG1lYW4gPSBqU3RhdC5tZWFuKGFycik7XG4gIHZhciBhcnJsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgZGV2ID0gbmV3IEFycmF5KGFycmxlbik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJybGVuOyBpKyspIHtcbiAgICBkZXZbaV0gPSBhcnJbaV0gLSBtZWFuO1xuICB9XG4gIHJldHVybiBkZXY7XG59O1xuXG4vLyBzdGFuZGFyZCBkZXZpYXRpb24gb2YgYW4gYXJyYXlcbi8vIGZsYWcgPSB0cnVlIGluZGljYXRlcyBzYW1wbGUgaW5zdGVhZCBvZiBwb3B1bGF0aW9uXG5qU3RhdC5zdGRldiA9IGZ1bmN0aW9uIHN0ZGV2KGFyciwgZmxhZykge1xuICByZXR1cm4gTWF0aC5zcXJ0KGpTdGF0LnZhcmlhbmNlKGFyciwgZmxhZykpO1xufTtcblxuLy8gcG9vbGVkIHN0YW5kYXJkIGRldmlhdGlvbiBvZiBhbiBhcnJheSBvZiBhcnJheXNcbmpTdGF0LnBvb2xlZHN0ZGV2ID0gZnVuY3Rpb24gcG9vbGVkc3RkZXYoYXJyKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoalN0YXQucG9vbGVkdmFyaWFuY2UoYXJyKSk7XG59O1xuXG4vLyBtZWFuIGRldmlhdGlvbiAobWVhbiBhYnNvbHV0ZSBkZXZpYXRpb24pIG9mIGFuIGFycmF5XG5qU3RhdC5tZWFuZGV2ID0gZnVuY3Rpb24gbWVhbmRldihhcnIpIHtcbiAgdmFyIG1lYW4gPSBqU3RhdC5tZWFuKGFycik7XG4gIHZhciBhID0gW107XG4gIGZvciAodmFyIGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBhLnB1c2goTWF0aC5hYnMoYXJyW2ldIC0gbWVhbikpO1xuICB9XG4gIHJldHVybiBqU3RhdC5tZWFuKGEpO1xufTtcblxuXG4vLyBtZWRpYW4gZGV2aWF0aW9uIChtZWRpYW4gYWJzb2x1dGUgZGV2aWF0aW9uKSBvZiBhbiBhcnJheVxualN0YXQubWVkZGV2ID0gZnVuY3Rpb24gbWVkZGV2KGFycikge1xuICB2YXIgbWVkaWFuID0galN0YXQubWVkaWFuKGFycik7XG4gIHZhciBhID0gW107XG4gIGZvciAodmFyIGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBhLnB1c2goTWF0aC5hYnMoYXJyW2ldIC0gbWVkaWFuKSk7XG4gIH1cbiAgcmV0dXJuIGpTdGF0Lm1lZGlhbihhKTtcbn07XG5cblxuLy8gY29lZmZpY2llbnQgb2YgdmFyaWF0aW9uXG5qU3RhdC5jb2VmZnZhciA9IGZ1bmN0aW9uIGNvZWZmdmFyKGFycikge1xuICByZXR1cm4galN0YXQuc3RkZXYoYXJyKSAvIGpTdGF0Lm1lYW4oYXJyKTtcbn07XG5cblxuLy8gcXVhcnRpbGVzIG9mIGFuIGFycmF5XG5qU3RhdC5xdWFydGlsZXMgPSBmdW5jdGlvbiBxdWFydGlsZXMoYXJyKSB7XG4gIHZhciBhcnJsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgX2FyciA9IGFyci5zbGljZSgpLnNvcnQoYXNjTnVtKTtcbiAgcmV0dXJuIFtcbiAgICBfYXJyWyBNYXRoLnJvdW5kKChhcnJsZW4pIC8gNCkgLSAxIF0sXG4gICAgX2FyclsgTWF0aC5yb3VuZCgoYXJybGVuKSAvIDIpIC0gMSBdLFxuICAgIF9hcnJbIE1hdGgucm91bmQoKGFycmxlbikgKiAzIC8gNCkgLSAxIF1cbiAgXTtcbn07XG5cblxuLy8gQXJiaXRhcnkgcXVhbnRpbGVzIG9mIGFuIGFycmF5LiBEaXJlY3QgcG9ydCBvZiB0aGUgc2NpcHkuc3RhdHNcbi8vIGltcGxlbWVudGF0aW9uIGJ5IFBpZXJyZSBHRiBHZXJhcmQtTWFyY2hhbnQuXG5qU3RhdC5xdWFudGlsZXMgPSBmdW5jdGlvbiBxdWFudGlsZXMoYXJyLCBxdWFudGlsZXNBcnJheSwgYWxwaGFwLCBiZXRhcCkge1xuICB2YXIgc29ydGVkQXJyYXkgPSBhcnIuc2xpY2UoKS5zb3J0KGFzY051bSk7XG4gIHZhciBxdWFudGlsZVZhbHMgPSBbcXVhbnRpbGVzQXJyYXkubGVuZ3RoXTtcbiAgdmFyIG4gPSBhcnIubGVuZ3RoO1xuICB2YXIgaSwgcCwgbSwgYWxlcGgsIGssIGdhbW1hO1xuXG4gIGlmICh0eXBlb2YgYWxwaGFwID09PSAndW5kZWZpbmVkJylcbiAgICBhbHBoYXAgPSAzIC8gODtcbiAgaWYgKHR5cGVvZiBiZXRhcCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgYmV0YXAgPSAzIC8gODtcblxuICBmb3IgKGkgPSAwOyBpIDwgcXVhbnRpbGVzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBwID0gcXVhbnRpbGVzQXJyYXlbaV07XG4gICAgbSA9IGFscGhhcCArIHAgKiAoMSAtIGFscGhhcCAtIGJldGFwKTtcbiAgICBhbGVwaCA9IG4gKiBwICsgbTtcbiAgICBrID0gTWF0aC5mbG9vcihjbGlwKGFsZXBoLCAxLCBuIC0gMSkpO1xuICAgIGdhbW1hID0gY2xpcChhbGVwaCAtIGssIDAsIDEpO1xuICAgIHF1YW50aWxlVmFsc1tpXSA9ICgxIC0gZ2FtbWEpICogc29ydGVkQXJyYXlbayAtIDFdICsgZ2FtbWEgKiBzb3J0ZWRBcnJheVtrXTtcbiAgfVxuXG4gIHJldHVybiBxdWFudGlsZVZhbHM7XG59O1xuXG4vLyBSZXR1cm4gdGhlIGstdGggcGVyY2VudGlsZSBvZiB2YWx1ZXMgaW4gYSByYW5nZSwgd2hlcmUgayBpcyBpbiB0aGUgcmFuZ2UgMC4uMSwgaW5jbHVzaXZlLlxuLy8gUGFzc2luZyB0cnVlIGZvciB0aGUgZXhjbHVzaXZlIHBhcmFtZXRlciBleGNsdWRlcyBib3RoIGVuZHBvaW50cyBvZiB0aGUgcmFuZ2UuXG5qU3RhdC5wZXJjZW50aWxlID0gZnVuY3Rpb24gcGVyY2VudGlsZShhcnIsIGssIGV4Y2x1c2l2ZSkge1xuICB2YXIgX2FyciA9IGFyci5zbGljZSgpLnNvcnQoYXNjTnVtKTtcbiAgdmFyIHJlYWxJbmRleCA9IGsgKiAoX2Fyci5sZW5ndGggKyAoZXhjbHVzaXZlID8gMSA6IC0xKSkgKyAoZXhjbHVzaXZlID8gMCA6IDEpO1xuICB2YXIgaW5kZXggPSBwYXJzZUludChyZWFsSW5kZXgpO1xuICB2YXIgZnJhYyA9IHJlYWxJbmRleCAtIGluZGV4O1xuICBpZiAoaW5kZXggKyAxIDwgX2Fyci5sZW5ndGgpIHtcbiAgICByZXR1cm4gX2FycltpbmRleCAtIDFdICsgZnJhYyAqIChfYXJyW2luZGV4XSAtIF9hcnJbaW5kZXggLSAxXSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF9hcnJbaW5kZXggLSAxXTtcbiAgfVxufVxuXG4vLyBUaGUgcGVyY2VudGlsZSByYW5rIG9mIHNjb3JlIGluIGEgZ2l2ZW4gYXJyYXkuIFJldHVybnMgdGhlIHBlcmNlbnRhZ2Vcbi8vIG9mIGFsbCB2YWx1ZXMgaW4gdGhlIGlucHV0IGFycmF5IHRoYXQgYXJlIGxlc3MgdGhhbiAoa2luZD0nc3RyaWN0Jykgb3Jcbi8vIGxlc3Mgb3IgZXF1YWwgdGhhbiAoa2luZD0nd2VhaycpIHNjb3JlLiBEZWZhdWx0IGlzIHdlYWsuXG5qU3RhdC5wZXJjZW50aWxlT2ZTY29yZSA9IGZ1bmN0aW9uIHBlcmNlbnRpbGVPZlNjb3JlKGFyciwgc2NvcmUsIGtpbmQpIHtcbiAgdmFyIGNvdW50ZXIgPSAwO1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIHN0cmljdCA9IGZhbHNlO1xuICB2YXIgdmFsdWUsIGk7XG5cbiAgaWYgKGtpbmQgPT09ICdzdHJpY3QnKVxuICAgIHN0cmljdCA9IHRydWU7XG5cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFsdWUgPSBhcnJbaV07XG4gICAgaWYgKChzdHJpY3QgJiYgdmFsdWUgPCBzY29yZSkgfHxcbiAgICAgICAgKCFzdHJpY3QgJiYgdmFsdWUgPD0gc2NvcmUpKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvdW50ZXIgLyBsZW47XG59O1xuXG5cbi8vIEhpc3RvZ3JhbSAoYmluIGNvdW50KSBkYXRhXG5qU3RhdC5oaXN0b2dyYW0gPSBmdW5jdGlvbiBoaXN0b2dyYW0oYXJyLCBiaW5DbnQpIHtcbiAgYmluQ250ID0gYmluQ250IHx8IDQ7XG4gIHZhciBmaXJzdCA9IGpTdGF0Lm1pbihhcnIpO1xuICB2YXIgYmluV2lkdGggPSAoalN0YXQubWF4KGFycikgLSBmaXJzdCkgLyBiaW5DbnQ7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgYmlucyA9IFtdO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgYmluQ250OyBpKyspXG4gICAgYmluc1tpXSA9IDA7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICBiaW5zW01hdGgubWluKE1hdGguZmxvb3IoKChhcnJbaV0gLSBmaXJzdCkgLyBiaW5XaWR0aCkpLCBiaW5DbnQgLSAxKV0gKz0gMTtcblxuICByZXR1cm4gYmlucztcbn07XG5cblxuLy8gY292YXJpYW5jZSBvZiB0d28gYXJyYXlzXG5qU3RhdC5jb3ZhcmlhbmNlID0gZnVuY3Rpb24gY292YXJpYW5jZShhcnIxLCBhcnIyKSB7XG4gIHZhciB1ID0galN0YXQubWVhbihhcnIxKTtcbiAgdmFyIHYgPSBqU3RhdC5tZWFuKGFycjIpO1xuICB2YXIgYXJyMUxlbiA9IGFycjEubGVuZ3RoO1xuICB2YXIgc3FfZGV2ID0gbmV3IEFycmF5KGFycjFMZW4pO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJyMUxlbjsgaSsrKVxuICAgIHNxX2RldltpXSA9IChhcnIxW2ldIC0gdSkgKiAoYXJyMltpXSAtIHYpO1xuXG4gIHJldHVybiBqU3RhdC5zdW0oc3FfZGV2KSAvIChhcnIxTGVuIC0gMSk7XG59O1xuXG5cbi8vIChwZWFyc29uJ3MpIHBvcHVsYXRpb24gY29ycmVsYXRpb24gY29lZmZpY2llbnQsIHJob1xualN0YXQuY29ycmNvZWZmID0gZnVuY3Rpb24gY29ycmNvZWZmKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGpTdGF0LmNvdmFyaWFuY2UoYXJyMSwgYXJyMikgL1xuICAgICAgalN0YXQuc3RkZXYoYXJyMSwgMSkgL1xuICAgICAgalN0YXQuc3RkZXYoYXJyMiwgMSk7XG59O1xuXG4gIC8vIChzcGVhcm1hbidzKSByYW5rIGNvcnJlbGF0aW9uIGNvZWZmaWNpZW50LCBzcFxualN0YXQuc3BlYXJtYW5jb2VmZiA9ICBmdW5jdGlvbiAoYXJyMSwgYXJyMikge1xuICBhcnIxID0galN0YXQucmFuayhhcnIxKTtcbiAgYXJyMiA9IGpTdGF0LnJhbmsoYXJyMik7XG4gIC8vcmV0dXJuIHBlYXJzb24ncyBjb3JyZWxhdGlvbiBvZiB0aGUgcmFua3M6XG4gIHJldHVybiBqU3RhdC5jb3JyY29lZmYoYXJyMSwgYXJyMik7XG59XG5cblxuLy8gc3RhdGlzdGljYWwgc3RhbmRhcmRpemVkIG1vbWVudHMgKGdlbmVyYWwgZm9ybSBvZiBza2V3L2t1cnQpXG5qU3RhdC5zdGFuTW9tZW50ID0gZnVuY3Rpb24gc3Rhbk1vbWVudChhcnIsIG4pIHtcbiAgdmFyIG11ID0galN0YXQubWVhbihhcnIpO1xuICB2YXIgc2lnbWEgPSBqU3RhdC5zdGRldihhcnIpO1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIHNrZXdTdW0gPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgc2tld1N1bSArPSBNYXRoLnBvdygoYXJyW2ldIC0gbXUpIC8gc2lnbWEsIG4pO1xuXG4gIHJldHVybiBza2V3U3VtIC8gYXJyLmxlbmd0aDtcbn07XG5cbi8vIChwZWFyc29uJ3MpIG1vbWVudCBjb2VmZmljaWVudCBvZiBza2V3bmVzc1xualN0YXQuc2tld25lc3MgPSBmdW5jdGlvbiBza2V3bmVzcyhhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LnN0YW5Nb21lbnQoYXJyLCAzKTtcbn07XG5cbi8vIChwZWFyc29uJ3MpIChleGNlc3MpIGt1cnRvc2lzXG5qU3RhdC5rdXJ0b3NpcyA9IGZ1bmN0aW9uIGt1cnRvc2lzKGFycikge1xuICByZXR1cm4galN0YXQuc3Rhbk1vbWVudChhcnIsIDQpIC0gMztcbn07XG5cblxudmFyIGpQcm90byA9IGpTdGF0LnByb3RvdHlwZTtcblxuXG4vLyBFeHRlbmQgalByb3RvIHdpdGggbWV0aG9kIGZvciBjYWxjdWxhdGluZyBjdW11bGF0aXZlIHN1bXMgYW5kIHByb2R1Y3RzLlxuLy8gVGhpcyBkaWZmZXJzIGZyb20gdGhlIHNpbWlsYXIgZXh0ZW5zaW9uIGJlbG93IGFzIGN1bXN1bSBhbmQgY3VtcHJvZCBzaG91bGRcbi8vIG5vdCBiZSBydW4gYWdhaW4gaW4gdGhlIGNhc2UgZnVsbGJvb2wgPT09IHRydWUuXG4vLyBJZiBhIG1hdHJpeCBpcyBwYXNzZWQsIGF1dG9tYXRpY2FsbHkgYXNzdW1lIG9wZXJhdGlvbiBzaG91bGQgYmUgZG9uZSBvbiB0aGVcbi8vIGNvbHVtbnMuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgLy8gSWYgYSBtYXRyaXggaXMgcGFzc2VkLCBhdXRvbWF0aWNhbGx5IGFzc3VtZSBvcGVyYXRpb24gc2hvdWxkIGJlIGRvbmUgb25cbiAgICAvLyB0aGUgY29sdW1ucy5cbiAgICBqUHJvdG9bcGFzc2Z1bmNdID0gZnVuY3Rpb24oZnVsbGJvb2wsIGZ1bmMpIHtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciB0bXB0aGlzID0gdGhpcztcbiAgICAgIC8vIEFzc2lnbm1lbnQgcmVhc3NpZ25hdGlvbiBkZXBlbmRpbmcgb24gaG93IHBhcmFtZXRlcnMgd2VyZSBwYXNzZWQgaW4uXG4gICAgICBpZiAoaXNGdW5jdGlvbihmdWxsYm9vbCkpIHtcbiAgICAgICAgZnVuYyA9IGZ1bGxib29sO1xuICAgICAgICBmdWxsYm9vbCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgaWYgYSBjYWxsYmFjayB3YXMgcGFzc2VkIHdpdGggdGhlIGZ1bmN0aW9uLlxuICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBmdW5jLmNhbGwodG1wdGhpcywgalByb3RvW3Bhc3NmdW5jXS5jYWxsKHRtcHRoaXMsIGZ1bGxib29sKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGlmIG1hdHJpeCBhbmQgcnVuIGNhbGN1bGF0aW9ucy5cbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdG1wdGhpcyA9IGZ1bGxib29sID09PSB0cnVlID8gdGhpcyA6IHRoaXMudHJhbnNwb3NlKCk7XG4gICAgICAgIGZvciAoOyBpIDwgdG1wdGhpcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICBhcnJbaV0gPSBqU3RhdFtwYXNzZnVuY10odG1wdGhpc1tpXSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgICB9XG4gICAgICAvLyBQYXNzIGZ1bGxib29sIGlmIG9ubHkgdmVjdG9yLCBub3QgYSBtYXRyaXguIGZvciB2YXJpYW5jZSBhbmQgc3RkZXYuXG4gICAgICByZXR1cm4galN0YXRbcGFzc2Z1bmNdKHRoaXNbMF0sIGZ1bGxib29sKTtcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgoJ2N1bXN1bSBjdW1wcm9kJykuc3BsaXQoJyAnKSk7XG5cblxuLy8gRXh0ZW5kIGpQcm90byB3aXRoIG1ldGhvZHMgd2hpY2ggZG9uJ3QgcmVxdWlyZSBhcmd1bWVudHMgYW5kIHdvcmsgb24gY29sdW1ucy5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICAvLyBJZiBhIG1hdHJpeCBpcyBwYXNzZWQsIGF1dG9tYXRpY2FsbHkgYXNzdW1lIG9wZXJhdGlvbiBzaG91bGQgYmUgZG9uZSBvblxuICAgIC8vIHRoZSBjb2x1bW5zLlxuICAgIGpQcm90b1twYXNzZnVuY10gPSBmdW5jdGlvbihmdWxsYm9vbCwgZnVuYykge1xuICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIHRtcHRoaXMgPSB0aGlzO1xuICAgICAgLy8gQXNzaWdubWVudCByZWFzc2lnbmF0aW9uIGRlcGVuZGluZyBvbiBob3cgcGFyYW1ldGVycyB3ZXJlIHBhc3NlZCBpbi5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGZ1bGxib29sKSkge1xuICAgICAgICBmdW5jID0gZnVsbGJvb2w7XG4gICAgICAgIGZ1bGxib29sID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBpZiBhIGNhbGxiYWNrIHdhcyBwYXNzZWQgd2l0aCB0aGUgZnVuY3Rpb24uXG4gICAgICBpZiAoZnVuYykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZ1bmMuY2FsbCh0bXB0aGlzLCBqUHJvdG9bcGFzc2Z1bmNdLmNhbGwodG1wdGhpcywgZnVsbGJvb2wpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgaWYgbWF0cml4IGFuZCBydW4gY2FsY3VsYXRpb25zLlxuICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgICBpZiAocGFzc2Z1bmMgIT09ICdzdW1yb3cnKVxuICAgICAgICAgIHRtcHRoaXMgPSBmdWxsYm9vbCA9PT0gdHJ1ZSA/IHRoaXMgOiB0aGlzLnRyYW5zcG9zZSgpO1xuICAgICAgICBmb3IgKDsgaSA8IHRtcHRoaXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgYXJyW2ldID0galN0YXRbcGFzc2Z1bmNdKHRtcHRoaXNbaV0pO1xuICAgICAgICByZXR1cm4gZnVsbGJvb2wgPT09IHRydWVcbiAgICAgICAgICAgID8galN0YXRbcGFzc2Z1bmNdKGpTdGF0LnV0aWxzLnRvVmVjdG9yKGFycikpXG4gICAgICAgICAgICA6IGFycjtcbiAgICAgIH1cbiAgICAgIC8vIFBhc3MgZnVsbGJvb2wgaWYgb25seSB2ZWN0b3IsIG5vdCBhIG1hdHJpeC4gZm9yIHZhcmlhbmNlIGFuZCBzdGRldi5cbiAgICAgIHJldHVybiBqU3RhdFtwYXNzZnVuY10odGhpc1swXSwgZnVsbGJvb2wpO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCgnc3VtIHN1bXNxcmQgc3Vtc3FlcnIgc3Vtcm93IHByb2R1Y3QgbWluIG1heCB1bmlxdWUgbWVhbiBtZWFuc3FlcnIgJyArXG4gICAgJ2dlb21lYW4gbWVkaWFuIGRpZmYgcmFuayBtb2RlIHJhbmdlIHZhcmlhbmNlIGRldmlhdGlvbiBzdGRldiBtZWFuZGV2ICcgK1xuICAgICdtZWRkZXYgY29lZmZ2YXIgcXVhcnRpbGVzIGhpc3RvZ3JhbSBza2V3bmVzcyBrdXJ0b3NpcycpLnNwbGl0KCcgJykpO1xuXG5cbi8vIEV4dGVuZCBqUHJvdG8gd2l0aCBmdW5jdGlvbnMgdGhhdCB0YWtlIGFyZ3VtZW50cy4gT3BlcmF0aW9ucyBvbiBtYXRyaWNlcyBhcmVcbi8vIGRvbmUgb24gY29sdW1ucy5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqUHJvdG9bcGFzc2Z1bmNdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgdG1wdGhpcyA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgY2FsbGJhY2tGdW5jdGlvbjtcblxuICAgICAgLy8gSWYgdGhlIGxhc3QgYXJndW1lbnQgaXMgYSBmdW5jdGlvbiwgd2UgYXNzdW1lIGl0J3MgYSBjYWxsYmFjazsgd2VcbiAgICAgIC8vIHN0cmlwIHRoZSBjYWxsYmFjayBvdXQgYW5kIGNhbGwgdGhlIGZ1bmN0aW9uIGFnYWluLlxuICAgICAgaWYgKGlzRnVuY3Rpb24oYXJnc1thcmdzLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICBjYWxsYmFja0Z1bmN0aW9uID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgYXJnc1RvUGFzcyA9IGFyZ3Muc2xpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNhbGxiYWNrRnVuY3Rpb24uY2FsbCh0bXB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUHJvdG9bcGFzc2Z1bmNdLmFwcGx5KHRtcHRoaXMsIGFyZ3NUb1Bhc3MpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBPdGhlcndpc2Ugd2UgY3VycnkgdGhlIGZ1bmN0aW9uIGFyZ3MgYW5kIGNhbGwgbm9ybWFsbHkuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja0Z1bmN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgY3VycmllZEZ1bmN0aW9uID0gZnVuY3Rpb24gY3VycmllZEZ1bmN0aW9uKHZlY3Rvcikge1xuICAgICAgICAgIHJldHVybiBqU3RhdFtwYXNzZnVuY10uYXBwbHkodG1wdGhpcywgW3ZlY3Rvcl0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgbWF0cml4LCBydW4gY29sdW1uLWJ5LWNvbHVtbi5cbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdG1wdGhpcyA9IHRtcHRoaXMudHJhbnNwb3NlKCk7XG4gICAgICAgIGZvciAoOyBpIDwgdG1wdGhpcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICBhcnJbaV0gPSBjdXJyaWVkRnVuY3Rpb24odG1wdGhpc1tpXSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSBydW4gb24gdGhlIHZlY3Rvci5cbiAgICAgIHJldHVybiBjdXJyaWVkRnVuY3Rpb24odGhpc1swXSk7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoJ3F1YW50aWxlcyBwZXJjZW50aWxlT2ZTY29yZScuc3BsaXQoJyAnKSk7XG5cbn0oalN0YXQsIE1hdGgpKTtcbi8vIFNwZWNpYWwgZnVuY3Rpb25zIC8vXG4oZnVuY3Rpb24oalN0YXQsIE1hdGgpIHtcblxuLy8gTG9nLWdhbW1hIGZ1bmN0aW9uXG5qU3RhdC5nYW1tYWxuID0gZnVuY3Rpb24gZ2FtbWFsbih4KSB7XG4gIHZhciBqID0gMDtcbiAgdmFyIGNvZiA9IFtcbiAgICA3Ni4xODAwOTE3Mjk0NzE0NiwgLTg2LjUwNTMyMDMyOTQxNjc3LCAyNC4wMTQwOTgyNDA4MzA5MSxcbiAgICAtMS4yMzE3Mzk1NzI0NTAxNTUsIDAuMTIwODY1MDk3Mzg2NjE3OWUtMiwgLTAuNTM5NTIzOTM4NDk1M2UtNVxuICBdO1xuICB2YXIgc2VyID0gMS4wMDAwMDAwMDAxOTAwMTU7XG4gIHZhciB4eCwgeSwgdG1wO1xuICB0bXAgPSAoeSA9IHh4ID0geCkgKyA1LjU7XG4gIHRtcCAtPSAoeHggKyAwLjUpICogTWF0aC5sb2codG1wKTtcbiAgZm9yICg7IGogPCA2OyBqKyspXG4gICAgc2VyICs9IGNvZltqXSAvICsreTtcbiAgcmV0dXJuIE1hdGgubG9nKDIuNTA2NjI4Mjc0NjMxMDAwNSAqIHNlciAvIHh4KSAtIHRtcDtcbn07XG5cbi8qXG4gKiBsb2ctZ2FtbWEgZnVuY3Rpb24gdG8gc3VwcG9ydCBwb2lzc29uIGRpc3RyaWJ1dGlvbiBzYW1wbGluZy4gVGhlXG4gKiBhbGdvcml0aG0gY29tZXMgZnJvbSBTUEVDRlVOIGJ5IFNoYW5qaWUgWmhhbmcgYW5kIEppYW5taW5nIEppbiBhbmQgdGhlaXJcbiAqIGJvb2sgXCJDb21wdXRhdGlvbiBvZiBTcGVjaWFsIEZ1bmN0aW9uc1wiLCAxOTk2LCBKb2huIFdpbGV5ICYgU29ucywgSW5jLlxuICovXG5qU3RhdC5sb2dnYW0gPSBmdW5jdGlvbiBsb2dnYW0oeCkge1xuICB2YXIgeDAsIHgyLCB4cCwgZ2wsIGdsMDtcbiAgdmFyIGssIG47XG5cbiAgdmFyIGEgPSBbOC4zMzMzMzMzMzMzMzMzMzNlLTAyLCAtMi43Nzc3Nzc3Nzc3Nzc3NzhlLTAzLFxuICAgICAgICAgIDcuOTM2NTA3OTM2NTA3OTM3ZS0wNCwgLTUuOTUyMzgwOTUyMzgwOTUyZS0wNCxcbiAgICAgICAgICA4LjQxNzUwODQxNzUwODQxOGUtMDQsIC0xLjkxNzUyNjkxNzUyNjkxOGUtMDMsXG4gICAgICAgICAgNi40MTAyNTY0MTAyNTY0MTBlLTAzLCAtMi45NTUwNjUzNTk0NzcxMjRlLTAyLFxuICAgICAgICAgIDEuNzk2NDQzNzIzNjg4MzA3ZS0wMSwgLTEuMzkyNDMyMjE2OTA1OTBlKzAwXTtcbiAgeDAgPSB4O1xuICBuID0gMDtcbiAgaWYgKCh4ID09IDEuMCkgfHwgKHggPT0gMi4wKSkge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgfVxuICBpZiAoeCA8PSA3LjApIHtcbiAgICAgIG4gPSBNYXRoLmZsb29yKDcgLSB4KTtcbiAgICAgIHgwID0geCArIG47XG4gIH1cbiAgeDIgPSAxLjAgLyAoeDAgKiB4MCk7XG4gIHhwID0gMiAqIE1hdGguUEk7XG4gIGdsMCA9IGFbOV07XG4gIGZvciAoayA9IDg7IGsgPj0gMDsgay0tKSB7XG4gICAgICBnbDAgKj0geDI7XG4gICAgICBnbDAgKz0gYVtrXTtcbiAgfVxuICBnbCA9IGdsMCAvIHgwICsgMC41ICogTWF0aC5sb2coeHApICsgKHgwIC0gMC41KSAqIE1hdGgubG9nKHgwKSAtIHgwO1xuICBpZiAoeCA8PSA3LjApIHtcbiAgICAgIGZvciAoayA9IDE7IGsgPD0gbjsgaysrKSB7XG4gICAgICAgICAgZ2wgLT0gTWF0aC5sb2coeDAgLSAxLjApO1xuICAgICAgICAgIHgwIC09IDEuMDtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZ2w7XG59XG5cbi8vIGdhbW1hIG9mIHhcbmpTdGF0LmdhbW1hZm4gPSBmdW5jdGlvbiBnYW1tYWZuKHgpIHtcbiAgdmFyIHAgPSBbLTEuNzE2MTg1MTM4ODY1NDk1LCAyNC43NjU2NTA4MDU1NzU5MiwgLTM3OS44MDQyNTY0NzA5NDU2MyxcbiAgICAgICAgICAgNjI5LjMzMTE1NTMxMjgxODQsIDg2Ni45NjYyMDI3OTA0MTMzLCAtMzE0NTEuMjcyOTY4ODQ4MzY3LFxuICAgICAgICAgICAtMzYxNDQuNDEzNDE4NjkxMTc2LCA2NjQ1Ni4xNDM4MjAyNDA1NFxuICBdO1xuICB2YXIgcSA9IFstMzAuODQwMjMwMDExOTczOSwgMzE1LjM1MDYyNjk3OTYwNDE2LCAtMTAxNS4xNTYzNjc0OTAyMTkyLFxuICAgICAgICAgICAtMzEwNy43NzE2NzE1NzIzMTEsIDIyNTM4LjExODQyMDk4MDE1MSwgNDc1NS44NDYyNzc1Mjc4ODExLFxuICAgICAgICAgICAtMTM0NjU5Ljk1OTg2NDk2OTMsIC0xMTUxMzIuMjU5Njc1NTUzNV07XG4gIHZhciBmYWN0ID0gZmFsc2U7XG4gIHZhciBuID0gMDtcbiAgdmFyIHhkZW4gPSAwO1xuICB2YXIgeG51bSA9IDA7XG4gIHZhciB5ID0geDtcbiAgdmFyIGksIHosIHlpLCByZXM7XG4gIGlmICh4ID4gMTcxLjYyNDM3Njk1MzYwNzYpIHtcbiAgICByZXR1cm4gSW5maW5pdHk7XG4gIH1cbiAgaWYgKHkgPD0gMCkge1xuICAgIHJlcyA9IHkgJSAxICsgMy42ZS0xNjtcbiAgICBpZiAocmVzKSB7XG4gICAgICBmYWN0ID0gKCEoeSAmIDEpID8gMSA6IC0xKSAqIE1hdGguUEkgLyBNYXRoLnNpbihNYXRoLlBJICogcmVzKTtcbiAgICAgIHkgPSAxIC0geTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cbiAgfVxuICB5aSA9IHk7XG4gIGlmICh5IDwgMSkge1xuICAgIHogPSB5Kys7XG4gIH0gZWxzZSB7XG4gICAgeiA9ICh5IC09IG4gPSAoeSB8IDApIC0gMSkgLSAxO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCA4OyArK2kpIHtcbiAgICB4bnVtID0gKHhudW0gKyBwW2ldKSAqIHo7XG4gICAgeGRlbiA9IHhkZW4gKiB6ICsgcVtpXTtcbiAgfVxuICByZXMgPSB4bnVtIC8geGRlbiArIDE7XG4gIGlmICh5aSA8IHkpIHtcbiAgICByZXMgLz0geWk7XG4gIH0gZWxzZSBpZiAoeWkgPiB5KSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgcmVzICo9IHk7XG4gICAgICB5Kys7XG4gICAgfVxuICB9XG4gIGlmIChmYWN0KSB7XG4gICAgcmVzID0gZmFjdCAvIHJlcztcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuXG4vLyBsb3dlciBpbmNvbXBsZXRlIGdhbW1hIGZ1bmN0aW9uLCB3aGljaCBpcyB1c3VhbGx5IHR5cGVzZXQgd2l0aCBhXG4vLyBsb3dlci1jYXNlIGdyZWVrIGdhbW1hIGFzIHRoZSBmdW5jdGlvbiBzeW1ib2xcbmpTdGF0LmdhbW1hcCA9IGZ1bmN0aW9uIGdhbW1hcChhLCB4KSB7XG4gIHJldHVybiBqU3RhdC5sb3dSZWdHYW1tYShhLCB4KSAqIGpTdGF0LmdhbW1hZm4oYSk7XG59O1xuXG5cbi8vIFRoZSBsb3dlciByZWd1bGFyaXplZCBpbmNvbXBsZXRlIGdhbW1hIGZ1bmN0aW9uLCB1c3VhbGx5IHdyaXR0ZW4gUChhLHgpXG5qU3RhdC5sb3dSZWdHYW1tYSA9IGZ1bmN0aW9uIGxvd1JlZ0dhbW1hKGEsIHgpIHtcbiAgdmFyIGFsbiA9IGpTdGF0LmdhbW1hbG4oYSk7XG4gIHZhciBhcCA9IGE7XG4gIHZhciBzdW0gPSAxIC8gYTtcbiAgdmFyIGRlbCA9IHN1bTtcbiAgdmFyIGIgPSB4ICsgMSAtIGE7XG4gIHZhciBjID0gMSAvIDEuMGUtMzA7XG4gIHZhciBkID0gMSAvIGI7XG4gIHZhciBoID0gZDtcbiAgdmFyIGkgPSAxO1xuICAvLyBjYWxjdWxhdGUgbWF4aW11bSBudW1iZXIgb2YgaXR0ZXJhdGlvbnMgcmVxdWlyZWQgZm9yIGFcbiAgdmFyIElUTUFYID0gLX4oTWF0aC5sb2coKGEgPj0gMSkgPyBhIDogMSAvIGEpICogOC41ICsgYSAqIDAuNCArIDE3KTtcbiAgdmFyIGFuO1xuXG4gIGlmICh4IDwgMCB8fCBhIDw9IDApIHtcbiAgICByZXR1cm4gTmFOO1xuICB9IGVsc2UgaWYgKHggPCBhICsgMSkge1xuICAgIGZvciAoOyBpIDw9IElUTUFYOyBpKyspIHtcbiAgICAgIHN1bSArPSBkZWwgKj0geCAvICsrYXA7XG4gICAgfVxuICAgIHJldHVybiAoc3VtICogTWF0aC5leHAoLXggKyBhICogTWF0aC5sb2coeCkgLSAoYWxuKSkpO1xuICB9XG5cbiAgZm9yICg7IGkgPD0gSVRNQVg7IGkrKykge1xuICAgIGFuID0gLWkgKiAoaSAtIGEpO1xuICAgIGIgKz0gMjtcbiAgICBkID0gYW4gKiBkICsgYjtcbiAgICBjID0gYiArIGFuIC8gYztcbiAgICBkID0gMSAvIGQ7XG4gICAgaCAqPSBkICogYztcbiAgfVxuXG4gIHJldHVybiAoMSAtIGggKiBNYXRoLmV4cCgteCArIGEgKiBNYXRoLmxvZyh4KSAtIChhbG4pKSk7XG59O1xuXG4vLyBuYXR1cmFsIGxvZyBmYWN0b3JpYWwgb2YgblxualN0YXQuZmFjdG9yaWFsbG4gPSBmdW5jdGlvbiBmYWN0b3JpYWxsbihuKSB7XG4gIHJldHVybiBuIDwgMCA/IE5hTiA6IGpTdGF0LmdhbW1hbG4obiArIDEpO1xufTtcblxuLy8gZmFjdG9yaWFsIG9mIG5cbmpTdGF0LmZhY3RvcmlhbCA9IGZ1bmN0aW9uIGZhY3RvcmlhbChuKSB7XG4gIHJldHVybiBuIDwgMCA/IE5hTiA6IGpTdGF0LmdhbW1hZm4obiArIDEpO1xufTtcblxuLy8gY29tYmluYXRpb25zIG9mIG4sIG1cbmpTdGF0LmNvbWJpbmF0aW9uID0gZnVuY3Rpb24gY29tYmluYXRpb24obiwgbSkge1xuICAvLyBtYWtlIHN1cmUgbiBvciBtIGRvbid0IGV4Y2VlZCB0aGUgdXBwZXIgbGltaXQgb2YgdXNhYmxlIHZhbHVlc1xuICByZXR1cm4gKG4gPiAxNzAgfHwgbSA+IDE3MClcbiAgICAgID8gTWF0aC5leHAoalN0YXQuY29tYmluYXRpb25sbihuLCBtKSlcbiAgICAgIDogKGpTdGF0LmZhY3RvcmlhbChuKSAvIGpTdGF0LmZhY3RvcmlhbChtKSkgLyBqU3RhdC5mYWN0b3JpYWwobiAtIG0pO1xufTtcblxuXG5qU3RhdC5jb21iaW5hdGlvbmxuID0gZnVuY3Rpb24gY29tYmluYXRpb25sbihuLCBtKXtcbiAgcmV0dXJuIGpTdGF0LmZhY3RvcmlhbGxuKG4pIC0galN0YXQuZmFjdG9yaWFsbG4obSkgLSBqU3RhdC5mYWN0b3JpYWxsbihuIC0gbSk7XG59O1xuXG5cbi8vIHBlcm11dGF0aW9ucyBvZiBuLCBtXG5qU3RhdC5wZXJtdXRhdGlvbiA9IGZ1bmN0aW9uIHBlcm11dGF0aW9uKG4sIG0pIHtcbiAgcmV0dXJuIGpTdGF0LmZhY3RvcmlhbChuKSAvIGpTdGF0LmZhY3RvcmlhbChuIC0gbSk7XG59O1xuXG5cbi8vIGJldGEgZnVuY3Rpb25cbmpTdGF0LmJldGFmbiA9IGZ1bmN0aW9uIGJldGFmbih4LCB5KSB7XG4gIC8vIGVuc3VyZSBhcmd1bWVudHMgYXJlIHBvc2l0aXZlXG4gIGlmICh4IDw9IDAgfHwgeSA8PSAwKVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIC8vIG1ha2Ugc3VyZSB4ICsgeSBkb2Vzbid0IGV4Y2VlZCB0aGUgdXBwZXIgbGltaXQgb2YgdXNhYmxlIHZhbHVlc1xuICByZXR1cm4gKHggKyB5ID4gMTcwKVxuICAgICAgPyBNYXRoLmV4cChqU3RhdC5iZXRhbG4oeCwgeSkpXG4gICAgICA6IGpTdGF0LmdhbW1hZm4oeCkgKiBqU3RhdC5nYW1tYWZuKHkpIC8galN0YXQuZ2FtbWFmbih4ICsgeSk7XG59O1xuXG5cbi8vIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGJldGEgZnVuY3Rpb25cbmpTdGF0LmJldGFsbiA9IGZ1bmN0aW9uIGJldGFsbih4LCB5KSB7XG4gIHJldHVybiBqU3RhdC5nYW1tYWxuKHgpICsgalN0YXQuZ2FtbWFsbih5KSAtIGpTdGF0LmdhbW1hbG4oeCArIHkpO1xufTtcblxuXG4vLyBFdmFsdWF0ZXMgdGhlIGNvbnRpbnVlZCBmcmFjdGlvbiBmb3IgaW5jb21wbGV0ZSBiZXRhIGZ1bmN0aW9uIGJ5IG1vZGlmaWVkXG4vLyBMZW50eidzIG1ldGhvZC5cbmpTdGF0LmJldGFjZiA9IGZ1bmN0aW9uIGJldGFjZih4LCBhLCBiKSB7XG4gIHZhciBmcG1pbiA9IDFlLTMwO1xuICB2YXIgbSA9IDE7XG4gIHZhciBxYWIgPSBhICsgYjtcbiAgdmFyIHFhcCA9IGEgKyAxO1xuICB2YXIgcWFtID0gYSAtIDE7XG4gIHZhciBjID0gMTtcbiAgdmFyIGQgPSAxIC0gcWFiICogeCAvIHFhcDtcbiAgdmFyIG0yLCBhYSwgZGVsLCBoO1xuXG4gIC8vIFRoZXNlIHEncyB3aWxsIGJlIHVzZWQgaW4gZmFjdG9ycyB0aGF0IG9jY3VyIGluIHRoZSBjb2VmZmljaWVudHNcbiAgaWYgKE1hdGguYWJzKGQpIDwgZnBtaW4pXG4gICAgZCA9IGZwbWluO1xuICBkID0gMSAvIGQ7XG4gIGggPSBkO1xuXG4gIGZvciAoOyBtIDw9IDEwMDsgbSsrKSB7XG4gICAgbTIgPSAyICogbTtcbiAgICBhYSA9IG0gKiAoYiAtIG0pICogeCAvICgocWFtICsgbTIpICogKGEgKyBtMikpO1xuICAgIC8vIE9uZSBzdGVwICh0aGUgZXZlbiBvbmUpIG9mIHRoZSByZWN1cnJlbmNlXG4gICAgZCA9IDEgKyBhYSAqIGQ7XG4gICAgaWYgKE1hdGguYWJzKGQpIDwgZnBtaW4pXG4gICAgICBkID0gZnBtaW47XG4gICAgYyA9IDEgKyBhYSAvIGM7XG4gICAgaWYgKE1hdGguYWJzKGMpIDwgZnBtaW4pXG4gICAgICBjID0gZnBtaW47XG4gICAgZCA9IDEgLyBkO1xuICAgIGggKj0gZCAqIGM7XG4gICAgYWEgPSAtKGEgKyBtKSAqIChxYWIgKyBtKSAqIHggLyAoKGEgKyBtMikgKiAocWFwICsgbTIpKTtcbiAgICAvLyBOZXh0IHN0ZXAgb2YgdGhlIHJlY3VycmVuY2UgKHRoZSBvZGQgb25lKVxuICAgIGQgPSAxICsgYWEgKiBkO1xuICAgIGlmIChNYXRoLmFicyhkKSA8IGZwbWluKVxuICAgICAgZCA9IGZwbWluO1xuICAgIGMgPSAxICsgYWEgLyBjO1xuICAgIGlmIChNYXRoLmFicyhjKSA8IGZwbWluKVxuICAgICAgYyA9IGZwbWluO1xuICAgIGQgPSAxIC8gZDtcbiAgICBkZWwgPSBkICogYztcbiAgICBoICo9IGRlbDtcbiAgICBpZiAoTWF0aC5hYnMoZGVsIC0gMS4wKSA8IDNlLTcpXG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBoO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBsb3dlciByZWd1bGFyaXplZCBpbm9tcGxldGUgZ2FtbWEgZnVuY3Rpb25cbmpTdGF0LmdhbW1hcGludiA9IGZ1bmN0aW9uIGdhbW1hcGludihwLCBhKSB7XG4gIHZhciBqID0gMDtcbiAgdmFyIGExID0gYSAtIDE7XG4gIHZhciBFUFMgPSAxZS04O1xuICB2YXIgZ2xuID0galN0YXQuZ2FtbWFsbihhKTtcbiAgdmFyIHgsIGVyciwgdCwgdSwgcHAsIGxuYTEsIGFmYWM7XG5cbiAgaWYgKHAgPj0gMSlcbiAgICByZXR1cm4gTWF0aC5tYXgoMTAwLCBhICsgMTAwICogTWF0aC5zcXJ0KGEpKTtcbiAgaWYgKHAgPD0gMClcbiAgICByZXR1cm4gMDtcbiAgaWYgKGEgPiAxKSB7XG4gICAgbG5hMSA9IE1hdGgubG9nKGExKTtcbiAgICBhZmFjID0gTWF0aC5leHAoYTEgKiAobG5hMSAtIDEpIC0gZ2xuKTtcbiAgICBwcCA9IChwIDwgMC41KSA/IHAgOiAxIC0gcDtcbiAgICB0ID0gTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocHApKTtcbiAgICB4ID0gKDIuMzA3NTMgKyB0ICogMC4yNzA2MSkgLyAoMSArIHQgKiAoMC45OTIyOSArIHQgKiAwLjA0NDgxKSkgLSB0O1xuICAgIGlmIChwIDwgMC41KVxuICAgICAgeCA9IC14O1xuICAgIHggPSBNYXRoLm1heCgxZS0zLFxuICAgICAgICAgICAgICAgICBhICogTWF0aC5wb3coMSAtIDEgLyAoOSAqIGEpIC0geCAvICgzICogTWF0aC5zcXJ0KGEpKSwgMykpO1xuICB9IGVsc2Uge1xuICAgIHQgPSAxIC0gYSAqICgwLjI1MyArIGEgKiAwLjEyKTtcbiAgICBpZiAocCA8IHQpXG4gICAgICB4ID0gTWF0aC5wb3cocCAvIHQsIDEgLyBhKTtcbiAgICBlbHNlXG4gICAgICB4ID0gMSAtIE1hdGgubG9nKDEgLSAocCAtIHQpIC8gKDEgLSB0KSk7XG4gIH1cblxuICBmb3IoOyBqIDwgMTI7IGorKykge1xuICAgIGlmICh4IDw9IDApXG4gICAgICByZXR1cm4gMDtcbiAgICBlcnIgPSBqU3RhdC5sb3dSZWdHYW1tYShhLCB4KSAtIHA7XG4gICAgaWYgKGEgPiAxKVxuICAgICAgdCA9IGFmYWMgKiBNYXRoLmV4cCgtKHggLSBhMSkgKyBhMSAqIChNYXRoLmxvZyh4KSAtIGxuYTEpKTtcbiAgICBlbHNlXG4gICAgICB0ID0gTWF0aC5leHAoLXggKyBhMSAqIE1hdGgubG9nKHgpIC0gZ2xuKTtcbiAgICB1ID0gZXJyIC8gdDtcbiAgICB4IC09ICh0ID0gdSAvICgxIC0gMC41ICogTWF0aC5taW4oMSwgdSAqICgoYSAtIDEpIC8geCAtIDEpKSkpO1xuICAgIGlmICh4IDw9IDApXG4gICAgICB4ID0gMC41ICogKHggKyB0KTtcbiAgICBpZiAoTWF0aC5hYnModCkgPCBFUFMgKiB4KVxuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4geDtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgZXJyb3IgZnVuY3Rpb24gZXJmKHgpXG5qU3RhdC5lcmYgPSBmdW5jdGlvbiBlcmYoeCkge1xuICB2YXIgY29mID0gWy0xLjMwMjY1MzcxOTc4MTcwOTQsIDYuNDE5Njk3OTIzNTY0OTAyNmUtMSwgMS45NDc2NDczMjA0MTg1ODM2ZS0yLFxuICAgICAgICAgICAgIC05LjU2MTUxNDc4NjgwODYzMWUtMywgLTkuNDY1OTUzNDQ0ODIwMzZlLTQsIDMuNjY4Mzk0OTc4NTI3NjFlLTQsXG4gICAgICAgICAgICAgNC4yNTIzMzI0ODA2OTA3ZS01LCAtMi4wMjc4NTc4MTEyNTM0ZS01LCAtMS42MjQyOTAwMDQ2NDdlLTYsXG4gICAgICAgICAgICAgMS4zMDM2NTU4MzU1ODBlLTYsIDEuNTYyNjQ0MTcyMmUtOCwgLTguNTIzODA5NTkxNWUtOCxcbiAgICAgICAgICAgICA2LjUyOTA1NDQzOWUtOSwgNS4wNTkzNDM0OTVlLTksIC05LjkxMzY0MTU2ZS0xMCxcbiAgICAgICAgICAgICAtMi4yNzM2NTEyMmUtMTAsIDkuNjQ2NzkxMWUtMTEsIDIuMzk0MDM4ZS0xMixcbiAgICAgICAgICAgICAtNi44ODYwMjdlLTEyLCA4Ljk0NDg3ZS0xMywgMy4xMzA5MmUtMTMsXG4gICAgICAgICAgICAgLTEuMTI3MDhlLTEzLCAzLjgxZS0xNiwgNy4xMDZlLTE1LFxuICAgICAgICAgICAgIC0xLjUyM2UtMTUsIC05LjRlLTE3LCAxLjIxZS0xNixcbiAgICAgICAgICAgICAtMi44ZS0xN107XG4gIHZhciBqID0gY29mLmxlbmd0aCAtIDE7XG4gIHZhciBpc25lZyA9IGZhbHNlO1xuICB2YXIgZCA9IDA7XG4gIHZhciBkZCA9IDA7XG4gIHZhciB0LCB0eSwgdG1wLCByZXM7XG5cbiAgaWYgKHggPCAwKSB7XG4gICAgeCA9IC14O1xuICAgIGlzbmVnID0gdHJ1ZTtcbiAgfVxuXG4gIHQgPSAyIC8gKDIgKyB4KTtcbiAgdHkgPSA0ICogdCAtIDI7XG5cbiAgZm9yKDsgaiA+IDA7IGotLSkge1xuICAgIHRtcCA9IGQ7XG4gICAgZCA9IHR5ICogZCAtIGRkICsgY29mW2pdO1xuICAgIGRkID0gdG1wO1xuICB9XG5cbiAgcmVzID0gdCAqIE1hdGguZXhwKC14ICogeCArIDAuNSAqIChjb2ZbMF0gKyB0eSAqIGQpIC0gZGQpO1xuICByZXR1cm4gaXNuZWcgPyByZXMgLSAxIDogMSAtIHJlcztcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgY29tcGxtZW50YXJ5IGVycm9yIGZ1bmN0aW9uIGVyZmMoeClcbmpTdGF0LmVyZmMgPSBmdW5jdGlvbiBlcmZjKHgpIHtcbiAgcmV0dXJuIDEgLSBqU3RhdC5lcmYoeCk7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBsZW1lbnRhcnkgZXJyb3IgZnVuY3Rpb25cbmpTdGF0LmVyZmNpbnYgPSBmdW5jdGlvbiBlcmZjaW52KHApIHtcbiAgdmFyIGogPSAwO1xuICB2YXIgeCwgZXJyLCB0LCBwcDtcbiAgaWYgKHAgPj0gMilcbiAgICByZXR1cm4gLTEwMDtcbiAgaWYgKHAgPD0gMClcbiAgICByZXR1cm4gMTAwO1xuICBwcCA9IChwIDwgMSkgPyBwIDogMiAtIHA7XG4gIHQgPSBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhwcCAvIDIpKTtcbiAgeCA9IC0wLjcwNzExICogKCgyLjMwNzUzICsgdCAqIDAuMjcwNjEpIC9cbiAgICAgICAgICAgICAgICAgICgxICsgdCAqICgwLjk5MjI5ICsgdCAqIDAuMDQ0ODEpKSAtIHQpO1xuICBmb3IgKDsgaiA8IDI7IGorKykge1xuICAgIGVyciA9IGpTdGF0LmVyZmMoeCkgLSBwcDtcbiAgICB4ICs9IGVyciAvICgxLjEyODM3OTE2NzA5NTUxMjU3ICogTWF0aC5leHAoLXggKiB4KSAtIHggKiBlcnIpO1xuICB9XG4gIHJldHVybiAocCA8IDEpID8geCA6IC14O1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBpbmNvbXBsZXRlIGJldGEgZnVuY3Rpb25cbmpTdGF0LmliZXRhaW52ID0gZnVuY3Rpb24gaWJldGFpbnYocCwgYSwgYikge1xuICB2YXIgRVBTID0gMWUtODtcbiAgdmFyIGExID0gYSAtIDE7XG4gIHZhciBiMSA9IGIgLSAxO1xuICB2YXIgaiA9IDA7XG4gIHZhciBsbmEsIGxuYiwgcHAsIHQsIHUsIGVyciwgeCwgYWwsIGgsIHcsIGFmYWM7XG4gIGlmIChwIDw9IDApXG4gICAgcmV0dXJuIDA7XG4gIGlmIChwID49IDEpXG4gICAgcmV0dXJuIDE7XG4gIGlmIChhID49IDEgJiYgYiA+PSAxKSB7XG4gICAgcHAgPSAocCA8IDAuNSkgPyBwIDogMSAtIHA7XG4gICAgdCA9IE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHBwKSk7XG4gICAgeCA9ICgyLjMwNzUzICsgdCAqIDAuMjcwNjEpIC8gKDEgKyB0KiAoMC45OTIyOSArIHQgKiAwLjA0NDgxKSkgLSB0O1xuICAgIGlmIChwIDwgMC41KVxuICAgICAgeCA9IC14O1xuICAgIGFsID0gKHggKiB4IC0gMykgLyA2O1xuICAgIGggPSAyIC8gKDEgLyAoMiAqIGEgLSAxKSAgKyAxIC8gKDIgKiBiIC0gMSkpO1xuICAgIHcgPSAoeCAqIE1hdGguc3FydChhbCArIGgpIC8gaCkgLSAoMSAvICgyICogYiAtIDEpIC0gMSAvICgyICogYSAtIDEpKSAqXG4gICAgICAgIChhbCArIDUgLyA2IC0gMiAvICgzICogaCkpO1xuICAgIHggPSBhIC8gKGEgKyBiICogTWF0aC5leHAoMiAqIHcpKTtcbiAgfSBlbHNlIHtcbiAgICBsbmEgPSBNYXRoLmxvZyhhIC8gKGEgKyBiKSk7XG4gICAgbG5iID0gTWF0aC5sb2coYiAvIChhICsgYikpO1xuICAgIHQgPSBNYXRoLmV4cChhICogbG5hKSAvIGE7XG4gICAgdSA9IE1hdGguZXhwKGIgKiBsbmIpIC8gYjtcbiAgICB3ID0gdCArIHU7XG4gICAgaWYgKHAgPCB0IC8gdylcbiAgICAgIHggPSBNYXRoLnBvdyhhICogdyAqIHAsIDEgLyBhKTtcbiAgICBlbHNlXG4gICAgICB4ID0gMSAtIE1hdGgucG93KGIgKiB3ICogKDEgLSBwKSwgMSAvIGIpO1xuICB9XG4gIGFmYWMgPSAtalN0YXQuZ2FtbWFsbihhKSAtIGpTdGF0LmdhbW1hbG4oYikgKyBqU3RhdC5nYW1tYWxuKGEgKyBiKTtcbiAgZm9yKDsgaiA8IDEwOyBqKyspIHtcbiAgICBpZiAoeCA9PT0gMCB8fCB4ID09PSAxKVxuICAgICAgcmV0dXJuIHg7XG4gICAgZXJyID0galN0YXQuaWJldGEoeCwgYSwgYikgLSBwO1xuICAgIHQgPSBNYXRoLmV4cChhMSAqIE1hdGgubG9nKHgpICsgYjEgKiBNYXRoLmxvZygxIC0geCkgKyBhZmFjKTtcbiAgICB1ID0gZXJyIC8gdDtcbiAgICB4IC09ICh0ID0gdSAvICgxIC0gMC41ICogTWF0aC5taW4oMSwgdSAqIChhMSAvIHggLSBiMSAvICgxIC0geCkpKSkpO1xuICAgIGlmICh4IDw9IDApXG4gICAgICB4ID0gMC41ICogKHggKyB0KTtcbiAgICBpZiAoeCA+PSAxKVxuICAgICAgeCA9IDAuNSAqICh4ICsgdCArIDEpO1xuICAgIGlmIChNYXRoLmFicyh0KSA8IEVQUyAqIHggJiYgaiA+IDApXG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4geDtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgaW5jb21wbGV0ZSBiZXRhIGZ1bmN0aW9uIElfeChhLGIpXG5qU3RhdC5pYmV0YSA9IGZ1bmN0aW9uIGliZXRhKHgsIGEsIGIpIHtcbiAgLy8gRmFjdG9ycyBpbiBmcm9udCBvZiB0aGUgY29udGludWVkIGZyYWN0aW9uLlxuICB2YXIgYnQgPSAoeCA9PT0gMCB8fCB4ID09PSAxKSA/ICAwIDpcbiAgICBNYXRoLmV4cChqU3RhdC5nYW1tYWxuKGEgKyBiKSAtIGpTdGF0LmdhbW1hbG4oYSkgLVxuICAgICAgICAgICAgIGpTdGF0LmdhbW1hbG4oYikgKyBhICogTWF0aC5sb2coeCkgKyBiICpcbiAgICAgICAgICAgICBNYXRoLmxvZygxIC0geCkpO1xuICBpZiAoeCA8IDAgfHwgeCA+IDEpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoeCA8IChhICsgMSkgLyAoYSArIGIgKyAyKSlcbiAgICAvLyBVc2UgY29udGludWVkIGZyYWN0aW9uIGRpcmVjdGx5LlxuICAgIHJldHVybiBidCAqIGpTdGF0LmJldGFjZih4LCBhLCBiKSAvIGE7XG4gIC8vIGVsc2UgdXNlIGNvbnRpbnVlZCBmcmFjdGlvbiBhZnRlciBtYWtpbmcgdGhlIHN5bW1ldHJ5IHRyYW5zZm9ybWF0aW9uLlxuICByZXR1cm4gMSAtIGJ0ICogalN0YXQuYmV0YWNmKDEgLSB4LCBiLCBhKSAvIGI7XG59O1xuXG5cbi8vIFJldHVybnMgYSBub3JtYWwgZGV2aWF0ZSAobXU9MCwgc2lnbWE9MSkuXG4vLyBJZiBuIGFuZCBtIGFyZSBzcGVjaWZpZWQgaXQgcmV0dXJucyBhIG9iamVjdCBvZiBub3JtYWwgZGV2aWF0ZXMuXG5qU3RhdC5yYW5kbiA9IGZ1bmN0aW9uIHJhbmRuKG4sIG0pIHtcbiAgdmFyIHUsIHYsIHgsIHksIHE7XG4gIGlmICghbSlcbiAgICBtID0gbjtcbiAgaWYgKG4pXG4gICAgcmV0dXJuIGpTdGF0LmNyZWF0ZShuLCBtLCBmdW5jdGlvbigpIHsgcmV0dXJuIGpTdGF0LnJhbmRuKCk7IH0pO1xuICBkbyB7XG4gICAgdSA9IGpTdGF0Ll9yYW5kb21fZm4oKTtcbiAgICB2ID0gMS43MTU2ICogKGpTdGF0Ll9yYW5kb21fZm4oKSAtIDAuNSk7XG4gICAgeCA9IHUgLSAwLjQ0OTg3MTtcbiAgICB5ID0gTWF0aC5hYnModikgKyAwLjM4NjU5NTtcbiAgICBxID0geCAqIHggKyB5ICogKDAuMTk2MDAgKiB5IC0gMC4yNTQ3MiAqIHgpO1xuICB9IHdoaWxlIChxID4gMC4yNzU5NyAmJiAocSA+IDAuMjc4NDYgfHwgdiAqIHYgPiAtNCAqIE1hdGgubG9nKHUpICogdSAqIHUpKTtcbiAgcmV0dXJuIHYgLyB1O1xufTtcblxuXG4vLyBSZXR1cm5zIGEgZ2FtbWEgZGV2aWF0ZSBieSB0aGUgbWV0aG9kIG9mIE1hcnNhZ2xpYSBhbmQgVHNhbmcuXG5qU3RhdC5yYW5kZyA9IGZ1bmN0aW9uIHJhbmRnKHNoYXBlLCBuLCBtKSB7XG4gIHZhciBvYWxwaCA9IHNoYXBlO1xuICB2YXIgYTEsIGEyLCB1LCB2LCB4LCBtYXQ7XG4gIGlmICghbSlcbiAgICBtID0gbjtcbiAgaWYgKCFzaGFwZSlcbiAgICBzaGFwZSA9IDE7XG4gIGlmIChuKSB7XG4gICAgbWF0ID0galN0YXQuemVyb3MobixtKTtcbiAgICBtYXQuYWx0ZXIoZnVuY3Rpb24oKSB7IHJldHVybiBqU3RhdC5yYW5kZyhzaGFwZSk7IH0pO1xuICAgIHJldHVybiBtYXQ7XG4gIH1cbiAgaWYgKHNoYXBlIDwgMSlcbiAgICBzaGFwZSArPSAxO1xuICBhMSA9IHNoYXBlIC0gMSAvIDM7XG4gIGEyID0gMSAvIE1hdGguc3FydCg5ICogYTEpO1xuICBkbyB7XG4gICAgZG8ge1xuICAgICAgeCA9IGpTdGF0LnJhbmRuKCk7XG4gICAgICB2ID0gMSArIGEyICogeDtcbiAgICB9IHdoaWxlKHYgPD0gMCk7XG4gICAgdiA9IHYgKiB2ICogdjtcbiAgICB1ID0galN0YXQuX3JhbmRvbV9mbigpO1xuICB9IHdoaWxlKHUgPiAxIC0gMC4zMzEgKiBNYXRoLnBvdyh4LCA0KSAmJlxuICAgICAgICAgIE1hdGgubG9nKHUpID4gMC41ICogeCp4ICsgYTEgKiAoMSAtIHYgKyBNYXRoLmxvZyh2KSkpO1xuICAvLyBhbHBoYSA+IDFcbiAgaWYgKHNoYXBlID09IG9hbHBoKVxuICAgIHJldHVybiBhMSAqIHY7XG4gIC8vIGFscGhhIDwgMVxuICBkbyB7XG4gICAgdSA9IGpTdGF0Ll9yYW5kb21fZm4oKTtcbiAgfSB3aGlsZSh1ID09PSAwKTtcbiAgcmV0dXJuIE1hdGgucG93KHUsIDEgLyBvYWxwaCkgKiBhMSAqIHY7XG59O1xuXG5cbi8vIG1ha2luZyB1c2Ugb2Ygc3RhdGljIG1ldGhvZHMgb24gdGhlIGluc3RhbmNlXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalN0YXQuZm5bcGFzc2Z1bmNdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4galN0YXQoXG4gICAgICAgICAgalN0YXQubWFwKHRoaXMsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBqU3RhdFtwYXNzZnVuY10odmFsdWUpOyB9KSk7XG4gICAgfVxuICB9KShmdW5jc1tpXSk7XG59KSgnZ2FtbWFsbiBnYW1tYWZuIGZhY3RvcmlhbCBmYWN0b3JpYWxsbicuc3BsaXQoJyAnKSk7XG5cblxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpTdGF0LmZuW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGpTdGF0KGpTdGF0W3Bhc3NmdW5jXS5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgncmFuZG4nLnNwbGl0KCcgJykpO1xuXG59KGpTdGF0LCBNYXRoKSk7XG4oZnVuY3Rpb24oalN0YXQsIE1hdGgpIHtcblxuLy8gZ2VuZXJhdGUgYWxsIGRpc3RyaWJ1dGlvbiBpbnN0YW5jZSBtZXRob2RzXG4oZnVuY3Rpb24obGlzdCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIChmdW5jdGlvbihmdW5jKSB7XG4gICAgLy8gZGlzdHJpYnV0aW9uIGluc3RhbmNlIG1ldGhvZFxuICAgIGpTdGF0W2Z1bmNdID0gZnVuY3Rpb24oYSwgYiwgYykge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIGFyZ3VtZW50cy5jYWxsZWUpKVxuICAgICAgICByZXR1cm4gbmV3IGFyZ3VtZW50cy5jYWxsZWUoYSwgYiwgYyk7XG4gICAgICB0aGlzLl9hID0gYTtcbiAgICAgIHRoaXMuX2IgPSBiO1xuICAgICAgdGhpcy5fYyA9IGM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8vIGRpc3RyaWJ1dGlvbiBtZXRob2QgdG8gYmUgdXNlZCBvbiBhIGpTdGF0IGluc3RhbmNlXG4gICAgalN0YXQuZm5bZnVuY10gPSBmdW5jdGlvbihhLCBiLCBjKSB7XG4gICAgICB2YXIgbmV3dGhpcyA9IGpTdGF0W2Z1bmNdKGEsIGIsIGMpO1xuICAgICAgbmV3dGhpcy5kYXRhID0gdGhpcztcbiAgICAgIHJldHVybiBuZXd0aGlzO1xuICAgIH07XG4gICAgLy8gc2FtcGxlIGluc3RhbmNlIG1ldGhvZFxuICAgIGpTdGF0W2Z1bmNdLnByb3RvdHlwZS5zYW1wbGUgPSBmdW5jdGlvbihhcnIpIHtcbiAgICAgIHZhciBhID0gdGhpcy5fYTtcbiAgICAgIHZhciBiID0gdGhpcy5fYjtcbiAgICAgIHZhciBjID0gdGhpcy5fYztcbiAgICAgIGlmIChhcnIpXG4gICAgICAgIHJldHVybiBqU3RhdC5hbHRlcihhcnIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBqU3RhdFtmdW5jXS5zYW1wbGUoYSwgYiwgYyk7XG4gICAgICAgIH0pO1xuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4galN0YXRbZnVuY10uc2FtcGxlKGEsIGIsIGMpO1xuICAgIH07XG4gICAgLy8gZ2VuZXJhdGUgdGhlIHBkZiwgY2RmIGFuZCBpbnYgaW5zdGFuY2UgbWV0aG9kc1xuICAgIChmdW5jdGlvbih2YWxzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHMubGVuZ3RoOyBpKyspIChmdW5jdGlvbihmbmZ1bmMpIHtcbiAgICAgICAgalN0YXRbZnVuY10ucHJvdG90eXBlW2ZuZnVuY10gPSBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgdmFyIGEgPSB0aGlzLl9hO1xuICAgICAgICAgIHZhciBiID0gdGhpcy5fYjtcbiAgICAgICAgICB2YXIgYyA9IHRoaXMuX2M7XG4gICAgICAgICAgaWYgKCF4ICYmIHggIT09IDApXG4gICAgICAgICAgICB4ID0gdGhpcy5kYXRhO1xuICAgICAgICAgIGlmICh0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBqU3RhdC5mbi5tYXAuY2FsbCh4LCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBqU3RhdFtmdW5jXVtmbmZ1bmNdKHgsIGEsIGIsIGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBqU3RhdFtmdW5jXVtmbmZ1bmNdKHgsIGEsIGIsIGMpO1xuICAgICAgICB9O1xuICAgICAgfSkodmFsc1tpXSk7XG4gICAgfSkoJ3BkZiBjZGYgaW52Jy5zcGxpdCgnICcpKTtcbiAgICAvLyBnZW5lcmF0ZSB0aGUgbWVhbiwgbWVkaWFuLCBtb2RlIGFuZCB2YXJpYW5jZSBpbnN0YW5jZSBtZXRob2RzXG4gICAgKGZ1bmN0aW9uKHZhbHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFscy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKGZuZnVuYykge1xuICAgICAgICBqU3RhdFtmdW5jXS5wcm90b3R5cGVbZm5mdW5jXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBqU3RhdFtmdW5jXVtmbmZ1bmNdKHRoaXMuX2EsIHRoaXMuX2IsIHRoaXMuX2MpO1xuICAgICAgICB9O1xuICAgICAgfSkodmFsc1tpXSk7XG4gICAgfSkoJ21lYW4gbWVkaWFuIG1vZGUgdmFyaWFuY2UnLnNwbGl0KCcgJykpO1xuICB9KShsaXN0W2ldKTtcbn0pKChcbiAgJ2JldGEgY2VudHJhbEYgY2F1Y2h5IGNoaXNxdWFyZSBleHBvbmVudGlhbCBnYW1tYSBpbnZnYW1tYSBrdW1hcmFzd2FteSAnICtcbiAgJ2xhcGxhY2UgbG9nbm9ybWFsIG5vbmNlbnRyYWx0IG5vcm1hbCBwYXJldG8gc3R1ZGVudHQgd2VpYnVsbCB1bmlmb3JtICcgK1xuICAnYmlub21pYWwgbmVnYmluIGh5cGdlb20gcG9pc3NvbiB0cmlhbmd1bGFyIHR1a2V5IGFyY3NpbmUnXG4pLnNwbGl0KCcgJykpO1xuXG5cblxuLy8gZXh0ZW5kIGJldGEgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmJldGEsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgYWxwaGEsIGJldGEpIHtcbiAgICAvLyBQREYgaXMgemVybyBvdXRzaWRlIHRoZSBzdXBwb3J0XG4gICAgaWYgKHggPiAxIHx8IHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgLy8gUERGIGlzIG9uZSBmb3IgdGhlIHVuaWZvcm0gY2FzZVxuICAgIGlmIChhbHBoYSA9PSAxICYmIGJldGEgPT0gMSlcbiAgICAgIHJldHVybiAxO1xuXG4gICAgaWYgKGFscGhhIDwgNTEyICYmIGJldGEgPCA1MTIpIHtcbiAgICAgIHJldHVybiAoTWF0aC5wb3coeCwgYWxwaGEgLSAxKSAqIE1hdGgucG93KDEgLSB4LCBiZXRhIC0gMSkpIC9cbiAgICAgICAgICBqU3RhdC5iZXRhZm4oYWxwaGEsIGJldGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5leHAoKGFscGhhIC0gMSkgKiBNYXRoLmxvZyh4KSArXG4gICAgICAgICAgICAgICAgICAgICAgKGJldGEgLSAxKSAqIE1hdGgubG9nKDEgLSB4KSAtXG4gICAgICAgICAgICAgICAgICAgICAgalN0YXQuYmV0YWxuKGFscGhhLCBiZXRhKSk7XG4gICAgfVxuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuICh4ID4gMSB8fCB4IDwgMCkgPyAoeCA+IDEpICogMSA6IGpTdGF0LmliZXRhKHgsIGFscGhhLCBiZXRhKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uIGludih4LCBhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiBqU3RhdC5pYmV0YWludih4LCBhbHBoYSwgYmV0YSk7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiBhbHBoYSAvIChhbHBoYSArIGJldGEpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIGpTdGF0LmliZXRhaW52KDAuNSwgYWxwaGEsIGJldGEpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gKGFscGhhIC0gMSApIC8gKCBhbHBoYSArIGJldGEgLSAyKTtcbiAgfSxcblxuICAvLyByZXR1cm4gYSByYW5kb20gc2FtcGxlXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGFscGhhLCBiZXRhKSB7XG4gICAgdmFyIHUgPSBqU3RhdC5yYW5kZyhhbHBoYSk7XG4gICAgcmV0dXJuIHUgLyAodSArIGpTdGF0LnJhbmRnKGJldGEpKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gKGFscGhhICogYmV0YSkgLyAoTWF0aC5wb3coYWxwaGEgKyBiZXRhLCAyKSAqIChhbHBoYSArIGJldGEgKyAxKSk7XG4gIH1cbn0pO1xuXG4vLyBleHRlbmQgRiBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuY2VudHJhbEYsIHtcbiAgLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcGRmIGZ1bmN0aW9uIGF2b2lkcyBmbG9hdCBvdmVyZmxvd1xuICAvLyBTZWUgdGhlIHdheSB0aGF0IFIgY2FsY3VsYXRlcyB0aGlzIHZhbHVlOlxuICAvLyBodHRwczovL3N2bi5yLXByb2plY3Qub3JnL1IvdHJ1bmsvc3JjL25tYXRoL2RmLmNcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgZGYxLCBkZjIpIHtcbiAgICB2YXIgcCwgcSwgZjtcblxuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuXG4gICAgaWYgKGRmMSA8PSAyKSB7XG4gICAgICBpZiAoeCA9PT0gMCAmJiBkZjEgPCAyKSB7XG4gICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICAgIH1cbiAgICAgIGlmICh4ID09PSAwICYmIGRmMSA9PT0gMikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoMSAvIGpTdGF0LmJldGFmbihkZjEgLyAyLCBkZjIgLyAyKSkgKlxuICAgICAgICAgICAgICBNYXRoLnBvdyhkZjEgLyBkZjIsIGRmMSAvIDIpICpcbiAgICAgICAgICAgICAgTWF0aC5wb3coeCwgKGRmMS8yKSAtIDEpICpcbiAgICAgICAgICAgICAgTWF0aC5wb3coKDEgKyAoZGYxIC8gZGYyKSAqIHgpLCAtKGRmMSArIGRmMikgLyAyKTtcbiAgICB9XG5cbiAgICBwID0gKGRmMSAqIHgpIC8gKGRmMiArIHggKiBkZjEpO1xuICAgIHEgPSBkZjIgLyAoZGYyICsgeCAqIGRmMSk7XG4gICAgZiA9IGRmMSAqIHEgLyAyLjA7XG4gICAgcmV0dXJuIGYgKiBqU3RhdC5iaW5vbWlhbC5wZGYoKGRmMSAtIDIpIC8gMiwgKGRmMSArIGRmMiAtIDIpIC8gMiwgcCk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgZGYxLCBkZjIpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4galN0YXQuaWJldGEoKGRmMSAqIHgpIC8gKGRmMSAqIHggKyBkZjIpLCBkZjEgLyAyLCBkZjIgLyAyKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uIGludih4LCBkZjEsIGRmMikge1xuICAgIHJldHVybiBkZjIgLyAoZGYxICogKDEgLyBqU3RhdC5pYmV0YWludih4LCBkZjEgLyAyLCBkZjIgLyAyKSAtIDEpKTtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKGRmMSwgZGYyKSB7XG4gICAgcmV0dXJuIChkZjIgPiAyKSA/IGRmMiAvIChkZjIgLSAyKSA6IHVuZGVmaW5lZDtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKGRmMSwgZGYyKSB7XG4gICAgcmV0dXJuIChkZjEgPiAyKSA/IChkZjIgKiAoZGYxIC0gMikpIC8gKGRmMSAqIChkZjIgKyAyKSkgOiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgLy8gcmV0dXJuIGEgcmFuZG9tIHNhbXBsZVxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShkZjEsIGRmMikge1xuICAgIHZhciB4MSA9IGpTdGF0LnJhbmRnKGRmMSAvIDIpICogMjtcbiAgICB2YXIgeDIgPSBqU3RhdC5yYW5kZyhkZjIgLyAyKSAqIDI7XG4gICAgcmV0dXJuICh4MSAvIGRmMSkgLyAoeDIgLyBkZjIpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShkZjEsIGRmMikge1xuICAgIGlmIChkZjIgPD0gNClcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIDIgKiBkZjIgKiBkZjIgKiAoZGYxICsgZGYyIC0gMikgL1xuICAgICAgICAoZGYxICogKGRmMiAtIDIpICogKGRmMiAtIDIpICogKGRmMiAtIDQpKTtcbiAgfVxufSk7XG5cblxuLy8gZXh0ZW5kIGNhdWNoeSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuY2F1Y2h5LCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGxvY2FsLCBzY2FsZSkge1xuICAgIGlmIChzY2FsZSA8IDApIHsgcmV0dXJuIDA7IH1cblxuICAgIHJldHVybiAoc2NhbGUgLyAoTWF0aC5wb3coeCAtIGxvY2FsLCAyKSArIE1hdGgucG93KHNjYWxlLCAyKSkpIC8gTWF0aC5QSTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBsb2NhbCwgc2NhbGUpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuKCh4IC0gbG9jYWwpIC8gc2NhbGUpIC8gTWF0aC5QSSArIDAuNTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIGxvY2FsLCBzY2FsZSkge1xuICAgIHJldHVybiBsb2NhbCArIHNjYWxlICogTWF0aC50YW4oTWF0aC5QSSAqIChwIC0gMC41KSk7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4obG9jYWwvKiwgc2NhbGUqLykge1xuICAgIHJldHVybiBsb2NhbDtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKGxvY2FsLyosIHNjYWxlKi8pIHtcbiAgICByZXR1cm4gbG9jYWw7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUobG9jYWwsIHNjYWxlKSB7XG4gICAgcmV0dXJuIGpTdGF0LnJhbmRuKCkgKlxuICAgICAgICBNYXRoLnNxcnQoMSAvICgyICogalN0YXQucmFuZGcoMC41KSkpICogc2NhbGUgKyBsb2NhbDtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgY2hpc3F1YXJlIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5jaGlzcXVhcmUsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgZG9mKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuICh4ID09PSAwICYmIGRvZiA9PT0gMikgPyAwLjUgOlxuICAgICAgICBNYXRoLmV4cCgoZG9mIC8gMiAtIDEpICogTWF0aC5sb2coeCkgLSB4IC8gMiAtIChkb2YgLyAyKSAqXG4gICAgICAgICAgICAgICAgIE1hdGgubG9nKDIpIC0galN0YXQuZ2FtbWFsbihkb2YgLyAyKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgZG9mKSB7XG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIGpTdGF0Lmxvd1JlZ0dhbW1hKGRvZiAvIDIsIHggLyAyKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIGRvZikge1xuICAgIHJldHVybiAyICogalN0YXQuZ2FtbWFwaW52KHAsIDAuNSAqIGRvZik7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKGRvZikge1xuICAgIHJldHVybiBkb2Y7XG4gIH0sXG5cbiAgLy8gVE9ETzogdGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIChpcyB0aGVyZSBhIGJldHRlciB3YXk/KVxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihkb2YpIHtcbiAgICByZXR1cm4gZG9mICogTWF0aC5wb3coMSAtICgyIC8gKDkgKiBkb2YpKSwgMyk7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShkb2YpIHtcbiAgICByZXR1cm4gKGRvZiAtIDIgPiAwKSA/IGRvZiAtIDIgOiAwO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGRvZikge1xuICAgIHJldHVybiBqU3RhdC5yYW5kZyhkb2YgLyAyKSAqIDI7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGRvZikge1xuICAgIHJldHVybiAyICogZG9mO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBleHBvbmVudGlhbCBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuZXhwb25lbnRpYWwsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgcmF0ZSkge1xuICAgIHJldHVybiB4IDwgMCA/IDAgOiByYXRlICogTWF0aC5leHAoLXJhdGUgKiB4KTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCByYXRlKSB7XG4gICAgcmV0dXJuIHggPCAwID8gMCA6IDEgLSBNYXRoLmV4cCgtcmF0ZSAqIHgpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgcmF0ZSkge1xuICAgIHJldHVybiAtTWF0aC5sb2coMSAtIHApIC8gcmF0ZTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24ocmF0ZSkge1xuICAgIHJldHVybiAxIC8gcmF0ZTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIChyYXRlKSB7XG4gICAgcmV0dXJuICgxIC8gcmF0ZSkgKiBNYXRoLmxvZygyKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKC8qcmF0ZSovKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUocmF0ZSkge1xuICAgIHJldHVybiAtMSAvIHJhdGUgKiBNYXRoLmxvZyhqU3RhdC5fcmFuZG9tX2ZuKCkpO1xuICB9LFxuXG4gIHZhcmlhbmNlIDogZnVuY3Rpb24ocmF0ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyhyYXRlLCAtMik7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIGdhbW1hIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5nYW1tYSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBzaGFwZSwgc2NhbGUpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gKHggPT09IDAgJiYgc2hhcGUgPT09IDEpID8gMSAvIHNjYWxlIDpcbiAgICAgICAgICAgIE1hdGguZXhwKChzaGFwZSAtIDEpICogTWF0aC5sb2coeCkgLSB4IC8gc2NhbGUgLVxuICAgICAgICAgICAgICAgICAgICBqU3RhdC5nYW1tYWxuKHNoYXBlKSAtIHNoYXBlICogTWF0aC5sb2coc2NhbGUpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBzaGFwZSwgc2NhbGUpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4galN0YXQubG93UmVnR2FtbWEoc2hhcGUsIHggLyBzY2FsZSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4galN0YXQuZ2FtbWFwaW52KHAsIHNoYXBlKSAqIHNjYWxlO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4gc2hhcGUgKiBzY2FsZTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKHNoYXBlLCBzY2FsZSkge1xuICAgIGlmKHNoYXBlID4gMSkgcmV0dXJuIChzaGFwZSAtIDEpICogc2NhbGU7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4galN0YXQucmFuZGcoc2hhcGUpICogc2NhbGU7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBzaGFwZSAqIHNjYWxlICogc2NhbGU7XG4gIH1cbn0pO1xuXG4vLyBleHRlbmQgaW52ZXJzZSBnYW1tYSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuaW52Z2FtbWEsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgc2hhcGUsIHNjYWxlKSB7XG4gICAgaWYgKHggPD0gMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBNYXRoLmV4cCgtKHNoYXBlICsgMSkgKiBNYXRoLmxvZyh4KSAtIHNjYWxlIC8geCAtXG4gICAgICAgICAgICAgICAgICAgIGpTdGF0LmdhbW1hbG4oc2hhcGUpICsgc2hhcGUgKiBNYXRoLmxvZyhzY2FsZSkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIHNoYXBlLCBzY2FsZSkge1xuICAgIGlmICh4IDw9IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gMSAtIGpTdGF0Lmxvd1JlZ0dhbW1hKHNoYXBlLCBzY2FsZSAvIHgpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIHNjYWxlIC8galN0YXQuZ2FtbWFwaW52KDEgLSBwLCBzaGFwZSk7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiAoc2hhcGUgPiAxKSA/IHNjYWxlIC8gKHNoYXBlIC0gMSkgOiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4gc2NhbGUgLyAoc2hhcGUgKyAxKTtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4gc2NhbGUgLyBqU3RhdC5yYW5kZyhzaGFwZSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKHNoYXBlLCBzY2FsZSkge1xuICAgIGlmIChzaGFwZSA8PSAyKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc2NhbGUgKiBzY2FsZSAvICgoc2hhcGUgLSAxKSAqIChzaGFwZSAtIDEpICogKHNoYXBlIC0gMikpO1xuICB9XG59KTtcblxuXG4vLyBleHRlbmQga3VtYXJhc3dhbXkgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0Lmt1bWFyYXN3YW15LCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGFscGhhLCBiZXRhKSB7XG4gICAgaWYgKHggPT09IDAgJiYgYWxwaGEgPT09IDEpXG4gICAgICByZXR1cm4gYmV0YTtcbiAgICBlbHNlIGlmICh4ID09PSAxICYmIGJldGEgPT09IDEpXG4gICAgICByZXR1cm4gYWxwaGE7XG4gICAgcmV0dXJuIE1hdGguZXhwKE1hdGgubG9nKGFscGhhKSArIE1hdGgubG9nKGJldGEpICsgKGFscGhhIC0gMSkgKlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmxvZyh4KSArIChiZXRhIC0gMSkgKlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmxvZygxIC0gTWF0aC5wb3coeCwgYWxwaGEpKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgYWxwaGEsIGJldGEpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmICh4ID4gMSlcbiAgICAgIHJldHVybiAxO1xuICAgIHJldHVybiAoMSAtIE1hdGgucG93KDEgLSBNYXRoLnBvdyh4LCBhbHBoYSksIGJldGEpKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uIGludihwLCBhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiBNYXRoLnBvdygxIC0gTWF0aC5wb3coMSAtIHAsIDEgLyBiZXRhKSwgMSAvIGFscGhhKTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24oYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gKGJldGEgKiBqU3RhdC5nYW1tYWZuKDEgKyAxIC8gYWxwaGEpICpcbiAgICAgICAgICAgIGpTdGF0LmdhbW1hZm4oYmV0YSkpIC8gKGpTdGF0LmdhbW1hZm4oMSArIDEgLyBhbHBoYSArIGJldGEpKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiBNYXRoLnBvdygxIC0gTWF0aC5wb3coMiwgLTEgLyBiZXRhKSwgMSAvIGFscGhhKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKGFscGhhLCBiZXRhKSB7XG4gICAgaWYgKCEoYWxwaGEgPj0gMSAmJiBiZXRhID49IDEgJiYgKGFscGhhICE9PSAxICYmIGJldGEgIT09IDEpKSlcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIE1hdGgucG93KChhbHBoYSAtIDEpIC8gKGFscGhhICogYmV0YSAtIDEpLCAxIC8gYWxwaGEpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZSgvKmFscGhhLCBiZXRhKi8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZhcmlhbmNlIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgICAvLyBUT0RPOiBjb21wbGV0ZSB0aGlzXG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIGxvZ25vcm1hbCBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQubG9nbm9ybWFsLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIG11LCBzaWdtYSkge1xuICAgIGlmICh4IDw9IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gTWF0aC5leHAoLU1hdGgubG9nKHgpIC0gMC41ICogTWF0aC5sb2coMiAqIE1hdGguUEkpIC1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5sb2coc2lnbWEpIC0gTWF0aC5wb3coTWF0aC5sb2coeCkgLSBtdSwgMikgL1xuICAgICAgICAgICAgICAgICAgICAoMiAqIHNpZ21hICogc2lnbWEpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBtdSwgc2lnbWEpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gMC41ICtcbiAgICAgICAgKDAuNSAqIGpTdGF0LmVyZigoTWF0aC5sb2coeCkgLSBtdSkgLyBNYXRoLnNxcnQoMiAqIHNpZ21hICogc2lnbWEpKSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBtdSwgc2lnbWEpIHtcbiAgICByZXR1cm4gTWF0aC5leHAoLTEuNDE0MjEzNTYyMzczMDk1MDUgKiBzaWdtYSAqIGpTdGF0LmVyZmNpbnYoMiAqIHApICsgbXUpO1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4obXUsIHNpZ21hKSB7XG4gICAgcmV0dXJuIE1hdGguZXhwKG11ICsgc2lnbWEgKiBzaWdtYSAvIDIpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKG11LyosIHNpZ21hKi8pIHtcbiAgICByZXR1cm4gTWF0aC5leHAobXUpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUobXUsIHNpZ21hKSB7XG4gICAgcmV0dXJuIE1hdGguZXhwKG11IC0gc2lnbWEgKiBzaWdtYSk7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUobXUsIHNpZ21hKSB7XG4gICAgcmV0dXJuIE1hdGguZXhwKGpTdGF0LnJhbmRuKCkgKiBzaWdtYSArIG11KTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UobXUsIHNpZ21hKSB7XG4gICAgcmV0dXJuIChNYXRoLmV4cChzaWdtYSAqIHNpZ21hKSAtIDEpICogTWF0aC5leHAoMiAqIG11ICsgc2lnbWEgKiBzaWdtYSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIG5vbmNlbnRyYWx0IGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5ub25jZW50cmFsdCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBkb2YsIG5jcCkge1xuICAgIHZhciB0b2wgPSAxZS0xNDtcbiAgICBpZiAoTWF0aC5hYnMobmNwKSA8IHRvbCkgIC8vIG5jcCBhcHByb3ggMDsgdXNlIHN0dWRlbnQtdFxuICAgICAgcmV0dXJuIGpTdGF0LnN0dWRlbnR0LnBkZih4LCBkb2YpXG5cbiAgICBpZiAoTWF0aC5hYnMoeCkgPCB0b2wpIHsgIC8vIGRpZmZlcmVudCBmb3JtdWxhIGZvciB4ID09IDBcbiAgICAgIHJldHVybiBNYXRoLmV4cChqU3RhdC5nYW1tYWxuKChkb2YgKyAxKSAvIDIpIC0gbmNwICogbmNwIC8gMiAtXG4gICAgICAgICAgICAgICAgICAgICAgMC41ICogTWF0aC5sb2coTWF0aC5QSSAqIGRvZikgLSBqU3RhdC5nYW1tYWxuKGRvZiAvIDIpKTtcbiAgICB9XG5cbiAgICAvLyBmb3JtdWxhIGZvciB4ICE9IDBcbiAgICByZXR1cm4gZG9mIC8geCAqXG4gICAgICAgIChqU3RhdC5ub25jZW50cmFsdC5jZGYoeCAqIE1hdGguc3FydCgxICsgMiAvIGRvZiksIGRvZisyLCBuY3ApIC1cbiAgICAgICAgIGpTdGF0Lm5vbmNlbnRyYWx0LmNkZih4LCBkb2YsIG5jcCkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGRvZiwgbmNwKSB7XG4gICAgdmFyIHRvbCA9IDFlLTE0O1xuICAgIHZhciBtaW5faXRlcmF0aW9ucyA9IDIwMDtcblxuICAgIGlmIChNYXRoLmFicyhuY3ApIDwgdG9sKSAgLy8gbmNwIGFwcHJveCAwOyB1c2Ugc3R1ZGVudC10XG4gICAgICByZXR1cm4galN0YXQuc3R1ZGVudHQuY2RmKHgsIGRvZik7XG5cbiAgICAvLyB0dXJuIG5lZ2F0aXZlIHggaW50byBwb3NpdGl2ZSBhbmQgZmxpcCByZXN1bHQgYWZ0ZXJ3YXJkc1xuICAgIHZhciBmbGlwID0gZmFsc2U7XG4gICAgaWYgKHggPCAwKSB7XG4gICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIG5jcCA9IC1uY3A7XG4gICAgfVxuXG4gICAgdmFyIHByb2IgPSBqU3RhdC5ub3JtYWwuY2RmKC1uY3AsIDAsIDEpO1xuICAgIHZhciB2YWx1ZSA9IHRvbCArIDE7XG4gICAgLy8gdXNlIHZhbHVlIGF0IGxhc3QgdHdvIHN0ZXBzIHRvIGRldGVybWluZSBjb252ZXJnZW5jZVxuICAgIHZhciBsYXN0dmFsdWUgPSB2YWx1ZTtcbiAgICB2YXIgeSA9IHggKiB4IC8gKHggKiB4ICsgZG9mKTtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIHAgPSBNYXRoLmV4cCgtbmNwICogbmNwIC8gMik7XG4gICAgdmFyIHEgPSBNYXRoLmV4cCgtbmNwICogbmNwIC8gMiAtIDAuNSAqIE1hdGgubG9nKDIpIC1cbiAgICAgICAgICAgICAgICAgICAgIGpTdGF0LmdhbW1hbG4oMyAvIDIpKSAqIG5jcDtcbiAgICB3aGlsZSAoaiA8IG1pbl9pdGVyYXRpb25zIHx8IGxhc3R2YWx1ZSA+IHRvbCB8fCB2YWx1ZSA+IHRvbCkge1xuICAgICAgbGFzdHZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgcCAqPSAobmNwICogbmNwKSAvICgyICogaik7XG4gICAgICAgIHEgKj0gKG5jcCAqIG5jcCkgLyAoMiAqIChqICsgMSAvIDIpKTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gcCAqIGpTdGF0LmJldGEuY2RmKHksIGogKyAwLjUsIGRvZiAvIDIpICtcbiAgICAgICAgICBxICogalN0YXQuYmV0YS5jZGYoeSwgaisxLCBkb2YvMik7XG4gICAgICBwcm9iICs9IDAuNSAqIHZhbHVlO1xuICAgICAgaisrO1xuICAgIH1cblxuICAgIHJldHVybiBmbGlwID8gKDEgLSBwcm9iKSA6IHByb2I7XG4gIH1cbn0pO1xuXG5cbi8vIGV4dGVuZCBub3JtYWwgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0Lm5vcm1hbCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBtZWFuLCBzdGQpIHtcbiAgICByZXR1cm4gTWF0aC5leHAoLTAuNSAqIE1hdGgubG9nKDIgKiBNYXRoLlBJKSAtXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubG9nKHN0ZCkgLSBNYXRoLnBvdyh4IC0gbWVhbiwgMikgLyAoMiAqIHN0ZCAqIHN0ZCkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIG1lYW4sIHN0ZCkge1xuICAgIHJldHVybiAwLjUgKiAoMSArIGpTdGF0LmVyZigoeCAtIG1lYW4pIC8gTWF0aC5zcXJ0KDIgKiBzdGQgKiBzdGQpKSk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBtZWFuLCBzdGQpIHtcbiAgICByZXR1cm4gLTEuNDE0MjEzNTYyMzczMDk1MDUgKiBzdGQgKiBqU3RhdC5lcmZjaW52KDIgKiBwKSArIG1lYW47XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKG1lYW4vKiwgc3RkKi8pIHtcbiAgICByZXR1cm4gbWVhbjtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihtZWFuLyosIHN0ZCovKSB7XG4gICAgcmV0dXJuIG1lYW47XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gKG1lYW4vKiwgc3RkKi8pIHtcbiAgICByZXR1cm4gbWVhbjtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShtZWFuLCBzdGQpIHtcbiAgICByZXR1cm4galN0YXQucmFuZG4oKSAqIHN0ZCArIG1lYW47XG4gIH0sXG5cbiAgdmFyaWFuY2UgOiBmdW5jdGlvbihtZWFuLCBzdGQpIHtcbiAgICByZXR1cm4gc3RkICogc3RkO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBwYXJldG8gZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LnBhcmV0bywge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBzY2FsZSwgc2hhcGUpIHtcbiAgICBpZiAoeCA8IHNjYWxlKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIChzaGFwZSAqIE1hdGgucG93KHNjYWxlLCBzaGFwZSkpIC8gTWF0aC5wb3coeCwgc2hhcGUgKyAxKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBzY2FsZSwgc2hhcGUpIHtcbiAgICBpZiAoeCA8IHNjYWxlKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIDEgLSBNYXRoLnBvdyhzY2FsZSAvIHgsIHNoYXBlKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uIGludihwLCBzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgLyBNYXRoLnBvdygxIC0gcCwgMSAvIHNoYXBlKTtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKHNjYWxlLCBzaGFwZSkge1xuICAgIGlmIChzaGFwZSA8PSAxKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gKHNoYXBlICogTWF0aC5wb3coc2NhbGUsIHNoYXBlKSkgLyAoc2hhcGUgLSAxKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgKiAoc2hhcGUgKiBNYXRoLlNRUlQyKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKHNjYWxlLyosIHNoYXBlKi8pIHtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH0sXG5cbiAgdmFyaWFuY2UgOiBmdW5jdGlvbihzY2FsZSwgc2hhcGUpIHtcbiAgICBpZiAoc2hhcGUgPD0gMilcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIChzY2FsZSpzY2FsZSAqIHNoYXBlKSAvIChNYXRoLnBvdyhzaGFwZSAtIDEsIDIpICogKHNoYXBlIC0gMikpO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBzdHVkZW50dCBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuc3R1ZGVudHQsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgZG9mKSB7XG4gICAgZG9mID0gZG9mID4gMWUxMDAgPyAxZTEwMCA6IGRvZjtcbiAgICByZXR1cm4gKDEvKE1hdGguc3FydChkb2YpICogalN0YXQuYmV0YWZuKDAuNSwgZG9mLzIpKSkgKlxuICAgICAgICBNYXRoLnBvdygxICsgKCh4ICogeCkgLyBkb2YpLCAtKChkb2YgKyAxKSAvIDIpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBkb2YpIHtcbiAgICB2YXIgZG9mMiA9IGRvZiAvIDI7XG4gICAgcmV0dXJuIGpTdGF0LmliZXRhKCh4ICsgTWF0aC5zcXJ0KHggKiB4ICsgZG9mKSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAoMiAqIE1hdGguc3FydCh4ICogeCArIGRvZikpLCBkb2YyLCBkb2YyKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIGRvZikge1xuICAgIHZhciB4ID0galN0YXQuaWJldGFpbnYoMiAqIE1hdGgubWluKHAsIDEgLSBwKSwgMC41ICogZG9mLCAwLjUpO1xuICAgIHggPSBNYXRoLnNxcnQoZG9mICogKDEgLSB4KSAvIHgpO1xuICAgIHJldHVybiAocCA+IDAuNSkgPyB4IDogLXg7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihkb2YpIHtcbiAgICByZXR1cm4gKGRvZiA+IDEpID8gMCA6IHVuZGVmaW5lZDtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbigvKmRvZiovKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZSgvKmRvZiovKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoZG9mKSB7XG4gICAgcmV0dXJuIGpTdGF0LnJhbmRuKCkgKiBNYXRoLnNxcnQoZG9mIC8gKDIgKiBqU3RhdC5yYW5kZyhkb2YgLyAyKSkpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShkb2YpIHtcbiAgICByZXR1cm4gKGRvZiAgPiAyKSA/IGRvZiAvIChkb2YgLSAyKSA6IChkb2YgPiAxKSA/IEluZmluaXR5IDogdW5kZWZpbmVkO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCB3ZWlidWxsIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC53ZWlidWxsLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIHNjYWxlLCBzaGFwZSkge1xuICAgIGlmICh4IDwgMCB8fCBzY2FsZSA8IDAgfHwgc2hhcGUgPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIChzaGFwZSAvIHNjYWxlKSAqIE1hdGgucG93KCh4IC8gc2NhbGUpLCAoc2hhcGUgLSAxKSkgKlxuICAgICAgICBNYXRoLmV4cCgtKE1hdGgucG93KCh4IC8gc2NhbGUpLCBzaGFwZSkpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4geCA8IDAgPyAwIDogMSAtIE1hdGguZXhwKC1NYXRoLnBvdygoeCAvIHNjYWxlKSwgc2hhcGUpKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAqIE1hdGgucG93KC1NYXRoLmxvZygxIC0gcCksIDEgLyBzaGFwZSk7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAqIGpTdGF0LmdhbW1hZm4oMSArIDEgLyBzaGFwZSk7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlICogTWF0aC5wb3coTWF0aC5sb2coMiksIDEgLyBzaGFwZSk7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShzY2FsZSwgc2hhcGUpIHtcbiAgICBpZiAoc2hhcGUgPD0gMSlcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBzY2FsZSAqIE1hdGgucG93KChzaGFwZSAtIDEpIC8gc2hhcGUsIDEgLyBzaGFwZSk7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlICogTWF0aC5wb3coLU1hdGgubG9nKGpTdGF0Ll9yYW5kb21fZm4oKSksIDEgLyBzaGFwZSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAqIHNjYWxlICogalN0YXQuZ2FtbWFmbigxICsgMiAvIHNoYXBlKSAtXG4gICAgICAgIE1hdGgucG93KGpTdGF0LndlaWJ1bGwubWVhbihzY2FsZSwgc2hhcGUpLCAyKTtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgdW5pZm9ybSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQudW5pZm9ybSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBhLCBiKSB7XG4gICAgcmV0dXJuICh4IDwgYSB8fCB4ID4gYikgPyAwIDogMSAvIChiIC0gYSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgYSwgYikge1xuICAgIGlmICh4IDwgYSlcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKHggPCBiKVxuICAgICAgcmV0dXJuICh4IC0gYSkgLyAoYiAtIGEpO1xuICAgIHJldHVybiAxO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgYSwgYikge1xuICAgIHJldHVybiBhICsgKHAgKiAoYiAtIGEpKTtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKGEsIGIpIHtcbiAgICByZXR1cm4gMC41ICogKGEgKyBiKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihhLCBiKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm1lYW4oYSwgYik7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZSgvKmEsIGIqLykge1xuICAgIHRocm93IG5ldyBFcnJvcignbW9kZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoYSwgYikge1xuICAgIHJldHVybiAoYSAvIDIgKyBiIC8gMikgKyAoYiAvIDIgLSBhIC8gMikgKiAoMiAqIGpTdGF0Ll9yYW5kb21fZm4oKSAtIDEpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KGIgLSBhLCAyKSAvIDEyO1xuICB9XG59KTtcblxuXG4vLyBHb3QgdGhpcyBmcm9tIGh0dHA6Ly93d3cubWF0aC51Y2xhLmVkdS9+dG9tL2Rpc3RyaWJ1dGlvbnMvYmlub21pYWwuaHRtbFxuZnVuY3Rpb24gYmV0aW5jKHgsIGEsIGIsIGVwcykge1xuICB2YXIgYTAgPSAwO1xuICB2YXIgYjAgPSAxO1xuICB2YXIgYTEgPSAxO1xuICB2YXIgYjEgPSAxO1xuICB2YXIgbTkgPSAwO1xuICB2YXIgYTIgPSAwO1xuICB2YXIgYzk7XG5cbiAgd2hpbGUgKE1hdGguYWJzKChhMSAtIGEyKSAvIGExKSA+IGVwcykge1xuICAgIGEyID0gYTE7XG4gICAgYzkgPSAtKGEgKyBtOSkgKiAoYSArIGIgKyBtOSkgKiB4IC8gKGEgKyAyICogbTkpIC8gKGEgKyAyICogbTkgKyAxKTtcbiAgICBhMCA9IGExICsgYzkgKiBhMDtcbiAgICBiMCA9IGIxICsgYzkgKiBiMDtcbiAgICBtOSA9IG05ICsgMTtcbiAgICBjOSA9IG05ICogKGIgLSBtOSkgKiB4IC8gKGEgKyAyICogbTkgLSAxKSAvIChhICsgMiAqIG05KTtcbiAgICBhMSA9IGEwICsgYzkgKiBhMTtcbiAgICBiMSA9IGIwICsgYzkgKiBiMTtcbiAgICBhMCA9IGEwIC8gYjE7XG4gICAgYjAgPSBiMCAvIGIxO1xuICAgIGExID0gYTEgLyBiMTtcbiAgICBiMSA9IDE7XG4gIH1cblxuICByZXR1cm4gYTEgLyBhO1xufVxuXG5cbi8vIGV4dGVuZCB1bmlmb3JtIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5iaW5vbWlhbCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZihrLCBuLCBwKSB7XG4gICAgcmV0dXJuIChwID09PSAwIHx8IHAgPT09IDEpID9cbiAgICAgICgobiAqIHApID09PSBrID8gMSA6IDApIDpcbiAgICAgIGpTdGF0LmNvbWJpbmF0aW9uKG4sIGspICogTWF0aC5wb3cocCwgaykgKiBNYXRoLnBvdygxIC0gcCwgbiAtIGspO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIG4sIHApIHtcbiAgICB2YXIgYmV0YWNkZjtcbiAgICB2YXIgZXBzID0gMWUtMTA7XG5cbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICBpZiAoeCA+PSBuKVxuICAgICAgcmV0dXJuIDE7XG4gICAgaWYgKHAgPCAwIHx8IHAgPiAxIHx8IG4gPD0gMClcbiAgICAgIHJldHVybiBOYU47XG5cbiAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB2YXIgeiA9IHA7XG4gICAgdmFyIGEgPSB4ICsgMTtcbiAgICB2YXIgYiA9IG4gLSB4O1xuICAgIHZhciBzID0gYSArIGI7XG4gICAgdmFyIGJ0ID0gTWF0aC5leHAoalN0YXQuZ2FtbWFsbihzKSAtIGpTdGF0LmdhbW1hbG4oYikgLVxuICAgICAgICAgICAgICAgICAgICAgIGpTdGF0LmdhbW1hbG4oYSkgKyBhICogTWF0aC5sb2coeikgKyBiICogTWF0aC5sb2coMSAtIHopKTtcblxuICAgIGlmICh6IDwgKGEgKyAxKSAvIChzICsgMikpXG4gICAgICBiZXRhY2RmID0gYnQgKiBiZXRpbmMoeiwgYSwgYiwgZXBzKTtcbiAgICBlbHNlXG4gICAgICBiZXRhY2RmID0gMSAtIGJ0ICogYmV0aW5jKDEgLSB6LCBiLCBhLCBlcHMpO1xuXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKDEgLSBiZXRhY2RmKSAqICgxIC8gZXBzKSkgLyAoMSAvIGVwcyk7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHVuaWZvcm0gZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0Lm5lZ2Jpbiwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZihrLCByLCBwKSB7XG4gICAgaWYgKGsgIT09IGsgPj4+IDApXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGsgPCAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIGpTdGF0LmNvbWJpbmF0aW9uKGsgKyByIC0gMSwgciAtIDEpICpcbiAgICAgICAgTWF0aC5wb3coMSAtIHAsIGspICogTWF0aC5wb3cocCwgcik7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgciwgcCkge1xuICAgIHZhciBzdW0gPSAwLFxuICAgIGsgPSAwO1xuICAgIGlmICh4IDwgMCkgcmV0dXJuIDA7XG4gICAgZm9yICg7IGsgPD0geDsgaysrKSB7XG4gICAgICBzdW0gKz0galN0YXQubmVnYmluLnBkZihrLCByLCBwKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgdW5pZm9ybSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuaHlwZ2VvbSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZihrLCBOLCBtLCBuKSB7XG4gICAgLy8gSHlwZXJnZW9tZXRyaWMgUERGLlxuXG4gICAgLy8gQSBzaW1wbGlmaWNhdGlvbiBvZiB0aGUgQ0RGIGFsZ29yaXRobSBiZWxvdy5cblxuICAgIC8vIGsgPSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGRyYXduXG4gICAgLy8gTiA9IHBvcHVsYXRpb24gc2l6ZVxuICAgIC8vIG0gPSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGluIHBvcHVsYXRpb25cbiAgICAvLyBuID0gbnVtYmVyIG9mIGl0ZW1zIGRyYXduIGZyb20gcG9wdWxhdGlvblxuXG4gICAgaWYoayAhPT0gayB8IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYoayA8IDAgfHwgayA8IG0gLSAoTiAtIG4pKSB7XG4gICAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gaGF2ZSB0aGlzIGZldyBzdWNjZXNzZXMgZHJhd24uXG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYoayA+IG4gfHwgayA+IG0pIHtcbiAgICAgIC8vIEl0J3MgaW1wb3NzaWJsZSB0byBoYXZlIHRoaXMgbWFueSBzdWNjZXNzZXMgZHJhd24uXG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKG0gKiAyID4gTikge1xuICAgICAgLy8gTW9yZSB0aGFuIGhhbGYgdGhlIHBvcHVsYXRpb24gaXMgc3VjY2Vzc2VzLlxuXG4gICAgICBpZihuICogMiA+IE4pIHtcbiAgICAgICAgLy8gTW9yZSB0aGFuIGhhbGYgdGhlIHBvcHVsYXRpb24gaXMgc2FtcGxlZC5cblxuICAgICAgICByZXR1cm4galN0YXQuaHlwZ2VvbS5wZGYoTiAtIG0gLSBuICsgaywgTiwgTiAtIG0sIE4gLSBuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGFsZiBvciBsZXNzIG9mIHRoZSBwb3B1bGF0aW9uIGlzIHNhbXBsZWQuXG5cbiAgICAgICAgcmV0dXJuIGpTdGF0Lmh5cGdlb20ucGRmKG4gLSBrLCBOLCBOIC0gbSwgbik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYobiAqIDIgPiBOKSB7XG4gICAgICAvLyBIYWxmIG9yIGxlc3MgaXMgc3VjY2Vzc2VzLlxuXG4gICAgICByZXR1cm4galN0YXQuaHlwZ2VvbS5wZGYobSAtIGssIE4sIG0sIE4gLSBuKTtcblxuICAgIH0gZWxzZSBpZihtIDwgbikge1xuICAgICAgLy8gV2Ugd2FudCB0byBoYXZlIHRoZSBudW1iZXIgb2YgdGhpbmdzIHNhbXBsZWQgdG8gYmUgbGVzcyB0aGFuIHRoZVxuICAgICAgLy8gc3VjY2Vzc2VzIGF2YWlsYWJsZS4gU28gc3dhcCB0aGUgZGVmaW5pdGlvbnMgb2Ygc3VjY2Vzc2Z1bCBhbmQgc2FtcGxlZC5cbiAgICAgIHJldHVybiBqU3RhdC5oeXBnZW9tLnBkZihrLCBOLCBuLCBtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgd2UgZ2V0IGhlcmUsIGhhbGYgb3IgbGVzcyBvZiB0aGUgcG9wdWxhdGlvbiB3YXMgc2FtcGxlZCwgaGFsZiBvclxuICAgICAgLy8gbGVzcyBvZiBpdCB3YXMgc3VjY2Vzc2VzLCBhbmQgd2UgaGFkIGZld2VyIHNhbXBsZWQgdGhpbmdzIHRoYW5cbiAgICAgIC8vIHN1Y2Nlc3Nlcy4gTm93IHdlIGNhbiBkbyB0aGlzIGNvbXBsaWNhdGVkIGl0ZXJhdGl2ZSBhbGdvcml0aG0gaW4gYW5cbiAgICAgIC8vIGVmZmljaWVudCB3YXkuXG5cbiAgICAgIC8vIFRoZSBiYXNpYyBwcmVtaXNlIG9mIHRoZSBhbGdvcml0aG0gaXMgdGhhdCB3ZSBwYXJ0aWFsbHkgbm9ybWFsaXplIG91clxuICAgICAgLy8gaW50ZXJtZWRpYXRlIHByb2R1Y3QgdG8ga2VlcCBpdCBpbiBhIG51bWVyaWNhbGx5IGdvb2QgcmVnaW9uLCBhbmQgdGhlblxuICAgICAgLy8gZmluaXNoIHRoZSBub3JtYWxpemF0aW9uIGF0IHRoZSBlbmQuXG5cbiAgICAgIC8vIFRoaXMgdmFyaWFibGUgaG9sZHMgdGhlIHNjYWxlZCBwcm9iYWJpbGl0eSBvZiB0aGUgY3VycmVudCBudW1iZXIgb2ZcbiAgICAgIC8vIHN1Y2Nlc3Nlcy5cbiAgICAgIHZhciBzY2FsZWRQREYgPSAxO1xuXG4gICAgICAvLyBUaGlzIGtlZXBzIHRyYWNrIG9mIGhvdyBtdWNoIHdlIGhhdmUgbm9ybWFsaXplZC5cbiAgICAgIHZhciBzYW1wbGVzRG9uZSA9IDA7XG5cbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBrOyBpKyspIHtcbiAgICAgICAgLy8gRm9yIGV2ZXJ5IHBvc3NpYmxlIG51bWJlciBvZiBzdWNjZXNzZXMgdXAgdG8gdGhhdCBvYnNlcnZlZC4uLlxuXG4gICAgICAgIHdoaWxlKHNjYWxlZFBERiA+IDEgJiYgc2FtcGxlc0RvbmUgPCBuKSB7XG4gICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIHJlc3VsdCBpcyBncm93aW5nIHRvbyBiaWcuIEFwcGx5IHNvbWUgb2YgdGhlXG4gICAgICAgICAgLy8gbm9ybWFsaXphdGlvbiB0byBzaHJpbmsgZXZlcnl0aGluZy5cblxuICAgICAgICAgIHNjYWxlZFBERiAqPSAxIC0gKG0gLyAoTiAtIHNhbXBsZXNEb25lKSk7XG5cbiAgICAgICAgICAvLyBTYXkgd2UndmUgbm9ybWFsaXplZCBieSB0aGlzIHNhbXBsZSBhbHJlYWR5LlxuICAgICAgICAgIHNhbXBsZXNEb25lKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXb3JrIG91dCB0aGUgcGFydGlhbGx5LW5vcm1hbGl6ZWQgaHlwZXJnZW9tZXRyaWMgUERGIGZvciB0aGUgbmV4dFxuICAgICAgICAvLyBudW1iZXIgb2Ygc3VjY2Vzc2VzXG4gICAgICAgIHNjYWxlZFBERiAqPSAobiAtIGkpICogKG0gLSBpKSAvICgoaSArIDEpICogKE4gLSBtIC0gbiArIGkgKyAxKSk7XG4gICAgICB9XG5cbiAgICAgIGZvcig7IHNhbXBsZXNEb25lIDwgbjsgc2FtcGxlc0RvbmUrKykge1xuICAgICAgICAvLyBBcHBseSBhbGwgdGhlIHJlc3Qgb2YgdGhlIG5vcm1hbGl6YXRpb25cbiAgICAgICAgc2NhbGVkUERGICo9IDEgLSAobSAvIChOIC0gc2FtcGxlc0RvbmUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQm91bmQgYW5zd2VyIHNhbmVseSBiZWZvcmUgcmV0dXJuaW5nLlxuICAgICAgcmV0dXJuIE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHNjYWxlZFBERikpO1xuICAgIH1cbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBOLCBtLCBuKSB7XG4gICAgLy8gSHlwZXJnZW9tZXRyaWMgQ0RGLlxuXG4gICAgLy8gVGhpcyBhbGdvcml0aG0gaXMgZHVlIHRvIFByb2YuIFRob21hcyBTLiBGZXJndXNvbiwgPHRvbUBtYXRoLnVjbGEuZWR1PixcbiAgICAvLyBhbmQgY29tZXMgZnJvbSBoaXMgaHlwZXJnZW9tZXRyaWMgdGVzdCBjYWxjdWxhdG9yIGF0XG4gICAgLy8gPGh0dHA6Ly93d3cubWF0aC51Y2xhLmVkdS9+dG9tL2Rpc3RyaWJ1dGlvbnMvSHlwZXJnZW9tZXRyaWMuaHRtbD4uXG5cbiAgICAvLyB4ID0gbnVtYmVyIG9mIHN1Y2Nlc3NlcyBkcmF3blxuICAgIC8vIE4gPSBwb3B1bGF0aW9uIHNpemVcbiAgICAvLyBtID0gbnVtYmVyIG9mIHN1Y2Nlc3NlcyBpbiBwb3B1bGF0aW9uXG4gICAgLy8gbiA9IG51bWJlciBvZiBpdGVtcyBkcmF3biBmcm9tIHBvcHVsYXRpb25cblxuICAgIGlmKHggPCAwIHx8IHggPCBtIC0gKE4gLSBuKSkge1xuICAgICAgLy8gSXQncyBpbXBvc3NpYmxlIHRvIGhhdmUgdGhpcyBmZXcgc3VjY2Vzc2VzIGRyYXduIG9yIGZld2VyLlxuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmKHggPj0gbiB8fCB4ID49IG0pIHtcbiAgICAgIC8vIFdlIHdpbGwgYWx3YXlzIGhhdmUgdGhpcyBtYW55IHN1Y2Nlc3NlcyBvciBmZXdlci5cbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAobSAqIDIgPiBOKSB7XG4gICAgICAvLyBNb3JlIHRoYW4gaGFsZiB0aGUgcG9wdWxhdGlvbiBpcyBzdWNjZXNzZXMuXG5cbiAgICAgIGlmKG4gKiAyID4gTikge1xuICAgICAgICAvLyBNb3JlIHRoYW4gaGFsZiB0aGUgcG9wdWxhdGlvbiBpcyBzYW1wbGVkLlxuXG4gICAgICAgIHJldHVybiBqU3RhdC5oeXBnZW9tLmNkZihOIC0gbSAtIG4gKyB4LCBOLCBOIC0gbSwgTiAtIG4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYWxmIG9yIGxlc3Mgb2YgdGhlIHBvcHVsYXRpb24gaXMgc2FtcGxlZC5cblxuICAgICAgICByZXR1cm4gMSAtIGpTdGF0Lmh5cGdlb20uY2RmKG4gLSB4IC0gMSwgTiwgTiAtIG0sIG4pO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmKG4gKiAyID4gTikge1xuICAgICAgLy8gSGFsZiBvciBsZXNzIGlzIHN1Y2Nlc3Nlcy5cblxuICAgICAgcmV0dXJuIDEgLSBqU3RhdC5oeXBnZW9tLmNkZihtIC0geCAtIDEsIE4sIG0sIE4gLSBuKTtcblxuICAgIH0gZWxzZSBpZihtIDwgbikge1xuICAgICAgLy8gV2Ugd2FudCB0byBoYXZlIHRoZSBudW1iZXIgb2YgdGhpbmdzIHNhbXBsZWQgdG8gYmUgbGVzcyB0aGFuIHRoZVxuICAgICAgLy8gc3VjY2Vzc2VzIGF2YWlsYWJsZS4gU28gc3dhcCB0aGUgZGVmaW5pdGlvbnMgb2Ygc3VjY2Vzc2Z1bCBhbmQgc2FtcGxlZC5cbiAgICAgIHJldHVybiBqU3RhdC5oeXBnZW9tLmNkZih4LCBOLCBuLCBtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgd2UgZ2V0IGhlcmUsIGhhbGYgb3IgbGVzcyBvZiB0aGUgcG9wdWxhdGlvbiB3YXMgc2FtcGxlZCwgaGFsZiBvclxuICAgICAgLy8gbGVzcyBvZiBpdCB3YXMgc3VjY2Vzc2VzLCBhbmQgd2UgaGFkIGZld2VyIHNhbXBsZWQgdGhpbmdzIHRoYW5cbiAgICAgIC8vIHN1Y2Nlc3Nlcy4gTm93IHdlIGNhbiBkbyB0aGlzIGNvbXBsaWNhdGVkIGl0ZXJhdGl2ZSBhbGdvcml0aG0gaW4gYW5cbiAgICAgIC8vIGVmZmljaWVudCB3YXkuXG5cbiAgICAgIC8vIFRoZSBiYXNpYyBwcmVtaXNlIG9mIHRoZSBhbGdvcml0aG0gaXMgdGhhdCB3ZSBwYXJ0aWFsbHkgbm9ybWFsaXplIG91clxuICAgICAgLy8gaW50ZXJtZWRpYXRlIHN1bSB0byBrZWVwIGl0IGluIGEgbnVtZXJpY2FsbHkgZ29vZCByZWdpb24sIGFuZCB0aGVuXG4gICAgICAvLyBmaW5pc2ggdGhlIG5vcm1hbGl6YXRpb24gYXQgdGhlIGVuZC5cblxuICAgICAgLy8gSG9sZHMgdGhlIGludGVybWVkaWF0ZSwgc2NhbGVkIHRvdGFsIENERi5cbiAgICAgIHZhciBzY2FsZWRDREYgPSAxO1xuXG4gICAgICAvLyBUaGlzIHZhcmlhYmxlIGhvbGRzIHRoZSBzY2FsZWQgcHJvYmFiaWxpdHkgb2YgdGhlIGN1cnJlbnQgbnVtYmVyIG9mXG4gICAgICAvLyBzdWNjZXNzZXMuXG4gICAgICB2YXIgc2NhbGVkUERGID0gMTtcblxuICAgICAgLy8gVGhpcyBrZWVwcyB0cmFjayBvZiBob3cgbXVjaCB3ZSBoYXZlIG5vcm1hbGl6ZWQuXG4gICAgICB2YXIgc2FtcGxlc0RvbmUgPSAwO1xuXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgeDsgaSsrKSB7XG4gICAgICAgIC8vIEZvciBldmVyeSBwb3NzaWJsZSBudW1iZXIgb2Ygc3VjY2Vzc2VzIHVwIHRvIHRoYXQgb2JzZXJ2ZWQuLi5cblxuICAgICAgICB3aGlsZShzY2FsZWRDREYgPiAxICYmIHNhbXBsZXNEb25lIDwgbikge1xuICAgICAgICAgIC8vIEludGVybWVkaWF0ZSByZXN1bHQgaXMgZ3Jvd2luZyB0b28gYmlnLiBBcHBseSBzb21lIG9mIHRoZVxuICAgICAgICAgIC8vIG5vcm1hbGl6YXRpb24gdG8gc2hyaW5rIGV2ZXJ5dGhpbmcuXG5cbiAgICAgICAgICB2YXIgZmFjdG9yID0gMSAtIChtIC8gKE4gLSBzYW1wbGVzRG9uZSkpO1xuXG4gICAgICAgICAgc2NhbGVkUERGICo9IGZhY3RvcjtcbiAgICAgICAgICBzY2FsZWRDREYgKj0gZmFjdG9yO1xuXG4gICAgICAgICAgLy8gU2F5IHdlJ3ZlIG5vcm1hbGl6ZWQgYnkgdGhpcyBzYW1wbGUgYWxyZWFkeS5cbiAgICAgICAgICBzYW1wbGVzRG9uZSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV29yayBvdXQgdGhlIHBhcnRpYWxseS1ub3JtYWxpemVkIGh5cGVyZ2VvbWV0cmljIFBERiBmb3IgdGhlIG5leHRcbiAgICAgICAgLy8gbnVtYmVyIG9mIHN1Y2Nlc3Nlc1xuICAgICAgICBzY2FsZWRQREYgKj0gKG4gLSBpKSAqIChtIC0gaSkgLyAoKGkgKyAxKSAqIChOIC0gbSAtIG4gKyBpICsgMSkpO1xuXG4gICAgICAgIC8vIEFkZCB0byB0aGUgQ0RGIGFuc3dlci5cbiAgICAgICAgc2NhbGVkQ0RGICs9IHNjYWxlZFBERjtcbiAgICAgIH1cblxuICAgICAgZm9yKDsgc2FtcGxlc0RvbmUgPCBuOyBzYW1wbGVzRG9uZSsrKSB7XG4gICAgICAgIC8vIEFwcGx5IGFsbCB0aGUgcmVzdCBvZiB0aGUgbm9ybWFsaXphdGlvblxuICAgICAgICBzY2FsZWRDREYgKj0gMSAtIChtIC8gKE4gLSBzYW1wbGVzRG9uZSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBCb3VuZCBhbnN3ZXIgc2FuZWx5IGJlZm9yZSByZXR1cm5pbmcuXG4gICAgICByZXR1cm4gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgc2NhbGVkQ0RGKSk7XG4gICAgfVxuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCB1bmlmb3JtIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5wb2lzc29uLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKGssIGwpIHtcbiAgICBpZiAobCA8IDAgfHwgKGsgJSAxKSAhPT0gMCB8fCBrIDwgMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGgucG93KGwsIGspICogTWF0aC5leHAoLWwpIC8galN0YXQuZmFjdG9yaWFsKGspO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGwpIHtcbiAgICB2YXIgc3VtYXJyID0gW10sXG4gICAgayA9IDA7XG4gICAgaWYgKHggPCAwKSByZXR1cm4gMDtcbiAgICBmb3IgKDsgayA8PSB4OyBrKyspIHtcbiAgICAgIHN1bWFyci5wdXNoKGpTdGF0LnBvaXNzb24ucGRmKGssIGwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0LnN1bShzdW1hcnIpO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihsKSB7XG4gICAgcmV0dXJuIGw7XG4gIH0sXG5cbiAgdmFyaWFuY2UgOiBmdW5jdGlvbihsKSB7XG4gICAgcmV0dXJuIGw7XG4gIH0sXG5cbiAgc2FtcGxlU21hbGw6IGZ1bmN0aW9uIHNhbXBsZVNtYWxsKGwpIHtcbiAgICB2YXIgcCA9IDEsIGsgPSAwLCBMID0gTWF0aC5leHAoLWwpO1xuICAgIGRvIHtcbiAgICAgIGsrKztcbiAgICAgIHAgKj0galN0YXQuX3JhbmRvbV9mbigpO1xuICAgIH0gd2hpbGUgKHAgPiBMKTtcbiAgICByZXR1cm4gayAtIDE7XG4gIH0sXG5cbiAgc2FtcGxlTGFyZ2U6IGZ1bmN0aW9uIHNhbXBsZUxhcmdlKGwpIHtcbiAgICB2YXIgbGFtID0gbDtcbiAgICB2YXIgaztcbiAgICB2YXIgVSwgViwgc2xhbSwgbG9nbGFtLCBhLCBiLCBpbnZhbHBoYSwgdnIsIHVzO1xuXG4gICAgc2xhbSA9IE1hdGguc3FydChsYW0pO1xuICAgIGxvZ2xhbSA9IE1hdGgubG9nKGxhbSk7XG4gICAgYiA9IDAuOTMxICsgMi41MyAqIHNsYW07XG4gICAgYSA9IC0wLjA1OSArIDAuMDI0ODMgKiBiO1xuICAgIGludmFscGhhID0gMS4xMjM5ICsgMS4xMzI4IC8gKGIgLSAzLjQpO1xuICAgIHZyID0gMC45Mjc3IC0gMy42MjI0IC8gKGIgLSAyKTtcblxuICAgIHdoaWxlICgxKSB7XG4gICAgICBVID0gTWF0aC5yYW5kb20oKSAtIDAuNTtcbiAgICAgIFYgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgdXMgPSAwLjUgLSBNYXRoLmFicyhVKTtcbiAgICAgIGsgPSBNYXRoLmZsb29yKCgyICogYSAvIHVzICsgYikgKiBVICsgbGFtICsgMC40Myk7XG4gICAgICBpZiAoKHVzID49IDAuMDcpICYmIChWIDw9IHZyKSkge1xuICAgICAgICAgIHJldHVybiBrO1xuICAgICAgfVxuICAgICAgaWYgKChrIDwgMCkgfHwgKCh1cyA8IDAuMDEzKSAmJiAoViA+IHVzKSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8qIGxvZyhWKSA9PSBsb2coMC4wKSBvayBoZXJlICovXG4gICAgICAvKiBpZiBVPT0wLjAgc28gdGhhdCB1cz09MC4wLCBsb2cgaXMgb2sgc2luY2UgYWx3YXlzIHJldHVybnMgKi9cbiAgICAgIGlmICgoTWF0aC5sb2coVikgKyBNYXRoLmxvZyhpbnZhbHBoYSkgLSBNYXRoLmxvZyhhIC8gKHVzICogdXMpICsgYikpIDw9ICgtbGFtICsgayAqIGxvZ2xhbSAtIGpTdGF0LmxvZ2dhbShrICsgMSkpKSB7XG4gICAgICAgICAgcmV0dXJuIGs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGwpIHtcbiAgICBpZiAobCA8IDEwKVxuICAgICAgcmV0dXJuIHRoaXMuc2FtcGxlU21hbGwobCk7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRoaXMuc2FtcGxlTGFyZ2UobCk7XG4gIH1cbn0pO1xuXG4vLyBleHRlbmQgdHJpYW5ndWxhciBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQudHJpYW5ndWxhciwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBhLCBiLCBjKSB7XG4gICAgaWYgKGIgPD0gYSB8fCBjIDwgYSB8fCBjID4gYikge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHggPCBhIHx8IHggPiBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIGlmICh4IDwgYykge1xuICAgICAgICAgIHJldHVybiAoMiAqICh4IC0gYSkpIC8gKChiIC0gYSkgKiAoYyAtIGEpKTtcbiAgICAgIH0gZWxzZSBpZiAoeCA9PT0gYykge1xuICAgICAgICAgIHJldHVybiAoMiAvIChiIC0gYSkpO1xuICAgICAgfSBlbHNlIHsgLy8geCA+IGNcbiAgICAgICAgICByZXR1cm4gKDIgKiAoYiAtIHgpKSAvICgoYiAtIGEpICogKGIgLSBjKSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGEsIGIsIGMpIHtcbiAgICBpZiAoYiA8PSBhIHx8IGMgPCBhIHx8IGMgPiBiKVxuICAgICAgcmV0dXJuIE5hTjtcbiAgICBpZiAoeCA8PSBhKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZWxzZSBpZiAoeCA+PSBiKVxuICAgICAgcmV0dXJuIDE7XG4gICAgaWYgKHggPD0gYylcbiAgICAgIHJldHVybiBNYXRoLnBvdyh4IC0gYSwgMikgLyAoKGIgLSBhKSAqIChjIC0gYSkpO1xuICAgIGVsc2UgLy8geCA+IGNcbiAgICAgIHJldHVybiAxIC0gTWF0aC5wb3coYiAtIHgsIDIpIC8gKChiIC0gYSkgKiAoYiAtIGMpKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uIGludihwLCBhLCBiLCBjKSB7XG4gICAgaWYgKGIgPD0gYSB8fCBjIDwgYSB8fCBjID4gYikge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHAgPD0gKChjIC0gYSkgLyAoYiAtIGEpKSkge1xuICAgICAgICByZXR1cm4gYSArIChiIC0gYSkgKiBNYXRoLnNxcnQocCAqICgoYyAtIGEpIC8gKGIgLSBhKSkpO1xuICAgICAgfSBlbHNlIHsgLy8gcCA+ICgoYyAtIGEpIC8gKGIgLSBhKSlcbiAgICAgICAgcmV0dXJuIGEgKyAoYiAtIGEpICogKDEgLSBNYXRoLnNxcnQoKDEgLSBwKSAqICgxIC0gKChjIC0gYSkgLyAoYiAtIGEpKSkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihhLCBiLCBjKSB7XG4gICAgcmV0dXJuIChhICsgYiArIGMpIC8gMztcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihhLCBiLCBjKSB7XG4gICAgaWYgKGMgPD0gKGEgKyBiKSAvIDIpIHtcbiAgICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KChiIC0gYSkgKiAoYiAtIGMpKSAvIE1hdGguc3FydCgyKTtcbiAgICB9IGVsc2UgaWYgKGMgPiAoYSArIGIpIC8gMikge1xuICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQoKGIgLSBhKSAqIChjIC0gYSkpIC8gTWF0aC5zcXJ0KDIpO1xuICAgIH1cbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKGEsIGIsIGMpIHtcbiAgICByZXR1cm4gYztcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShhLCBiLCBjKSB7XG4gICAgdmFyIHUgPSBqU3RhdC5fcmFuZG9tX2ZuKCk7XG4gICAgaWYgKHUgPCAoKGMgLSBhKSAvIChiIC0gYSkpKVxuICAgICAgcmV0dXJuIGEgKyBNYXRoLnNxcnQodSAqIChiIC0gYSkgKiAoYyAtIGEpKVxuICAgIHJldHVybiBiIC0gTWF0aC5zcXJ0KCgxIC0gdSkgKiAoYiAtIGEpICogKGIgLSBjKSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGEsIGIsIGMpIHtcbiAgICByZXR1cm4gKGEgKiBhICsgYiAqIGIgKyBjICogYyAtIGEgKiBiIC0gYSAqIGMgLSBiICogYykgLyAxODtcbiAgfVxufSk7XG5cblxuLy8gZXh0ZW5kIGFyY3NpbmUgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmFyY3NpbmUsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgYSwgYikge1xuICAgIGlmIChiIDw9IGEpIHJldHVybiBOYU47XG5cbiAgICByZXR1cm4gKHggPD0gYSB8fCB4ID49IGIpID8gMCA6XG4gICAgICAoMiAvIE1hdGguUEkpICpcbiAgICAgICAgTWF0aC5wb3coTWF0aC5wb3coYiAtIGEsIDIpIC1cbiAgICAgICAgICAgICAgICAgIE1hdGgucG93KDIgKiB4IC0gYSAtIGIsIDIpLCAtMC41KTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBhLCBiKSB7XG4gICAgaWYgKHggPCBhKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZWxzZSBpZiAoeCA8IGIpXG4gICAgICByZXR1cm4gKDIgLyBNYXRoLlBJKSAqIE1hdGguYXNpbihNYXRoLnNxcnQoKHggLSBhKS8oYiAtIGEpKSk7XG4gICAgcmV0dXJuIDE7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyAoMC41IC0gMC41ICogTWF0aC5jb3MoTWF0aC5QSSAqIHApKSAqIChiIC0gYSk7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihhLCBiKSB7XG4gICAgaWYgKGIgPD0gYSkgcmV0dXJuIE5hTjtcbiAgICByZXR1cm4gKGEgKyBiKSAvIDI7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oYSwgYikge1xuICAgIGlmIChiIDw9IGEpIHJldHVybiBOYU47XG4gICAgcmV0dXJuIChhICsgYikgLyAyO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoLyphLCBiKi8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21vZGUgaXMgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGEsIGIpIHtcbiAgICByZXR1cm4gKChhICsgYikgLyAyKSArICgoYiAtIGEpIC8gMikgKlxuICAgICAgTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBqU3RhdC51bmlmb3JtLnNhbXBsZSgwLCAxKSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGEsIGIpIHtcbiAgICBpZiAoYiA8PSBhKSByZXR1cm4gTmFOO1xuICAgIHJldHVybiBNYXRoLnBvdyhiIC0gYSwgMikgLyA4O1xuICB9XG59KTtcblxuXG5mdW5jdGlvbiBsYXBsYWNlU2lnbih4KSB7IHJldHVybiB4IC8gTWF0aC5hYnMoeCk7IH1cblxualN0YXQuZXh0ZW5kKGpTdGF0LmxhcGxhY2UsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgbXUsIGIpIHtcbiAgICByZXR1cm4gKGIgPD0gMCkgPyAwIDogKE1hdGguZXhwKC1NYXRoLmFicyh4IC0gbXUpIC8gYikpIC8gKDIgKiBiKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBtdSwgYikge1xuICAgIGlmIChiIDw9IDApIHsgcmV0dXJuIDA7IH1cblxuICAgIGlmKHggPCBtdSkge1xuICAgICAgcmV0dXJuIDAuNSAqIE1hdGguZXhwKCh4IC0gbXUpIC8gYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAxIC0gMC41ICogTWF0aC5leHAoLSAoeCAtIG11KSAvIGIpO1xuICAgIH1cbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbihtdS8qLCBiKi8pIHtcbiAgICByZXR1cm4gbXU7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbihtdS8qLCBiKi8pIHtcbiAgICByZXR1cm4gbXU7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24obXUvKiwgYiovKSB7XG4gICAgcmV0dXJuIG11O1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbihtdSwgYikge1xuICAgIHJldHVybiAyICogYiAqIGI7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUobXUsIGIpIHtcbiAgICB2YXIgdSA9IGpTdGF0Ll9yYW5kb21fZm4oKSAtIDAuNTtcblxuICAgIHJldHVybiBtdSAtIChiICogbGFwbGFjZVNpZ24odSkgKiBNYXRoLmxvZygxIC0gKDIgKiBNYXRoLmFicyh1KSkpKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHR1a2V5V3Byb2IodywgcnIsIGNjKSB7XG4gIHZhciBubGVnID0gMTI7XG4gIHZhciBpaGFsZiA9IDY7XG5cbiAgdmFyIEMxID0gLTMwO1xuICB2YXIgQzIgPSAtNTA7XG4gIHZhciBDMyA9IDYwO1xuICB2YXIgYmIgICA9IDg7XG4gIHZhciB3bGFyID0gMztcbiAgdmFyIHdpbmNyMSA9IDI7XG4gIHZhciB3aW5jcjIgPSAzO1xuICB2YXIgeGxlZyA9IFtcbiAgICAwLjk4MTU2MDYzNDI0NjcxOTI1MDY5MDU0OTA5MDE0OSxcbiAgICAwLjkwNDExNzI1NjM3MDQ3NDg1NjY3ODQ2NTg2NjExOSxcbiAgICAwLjc2OTkwMjY3NDE5NDMwNDY4NzAzNjg5MzgzMzIxMyxcbiAgICAwLjU4NzMxNzk1NDI4NjYxNzQ0NzI5NjcwMjQxODk0MSxcbiAgICAwLjM2NzgzMTQ5ODk5ODE4MDE5Mzc1MjY5MTUzNjY0NCxcbiAgICAwLjEyNTIzMzQwODUxMTQ2ODkxNTQ3MjQ0MTM2OTQ2NFxuICBdO1xuICB2YXIgYWxlZyA9IFtcbiAgICAwLjA0NzE3NTMzNjM4NjUxMTgyNzE5NDYxNTk2MTQ4NSxcbiAgICAwLjEwNjkzOTMyNTk5NTMxODQzMDk2MDI1NDcxODE5NCxcbiAgICAwLjE2MDA3ODMyODU0MzM0NjIyNjMzNDY1MjUyOTU0MyxcbiAgICAwLjIwMzE2NzQyNjcyMzA2NTkyMTc0OTA2NDQ1NTgxMCxcbiAgICAwLjIzMzQ5MjUzNjUzODM1NDgwODc2MDg0OTg5ODkyNSxcbiAgICAwLjI0OTE0NzA0NTgxMzQwMjc4NTAwMDU2MjQzNjA0M1xuICBdO1xuXG4gIHZhciBxc3F6ID0gdyAqIDAuNTtcblxuICAvLyBpZiB3ID49IDE2IHRoZW4gdGhlIGludGVncmFsIGxvd2VyIGJvdW5kIChvY2N1cnMgZm9yIGM9MjApXG4gIC8vIGlzIDAuOTk5OTk5OTk5OTk5OTUgc28gcmV0dXJuIGEgdmFsdWUgb2YgMS5cblxuICBpZiAocXNxeiA+PSBiYilcbiAgICByZXR1cm4gMS4wO1xuXG4gIC8vIGZpbmQgKGYody8yKSAtIDEpIF4gY2NcbiAgLy8gKGZpcnN0IHRlcm0gaW4gaW50ZWdyYWwgb2YgaGFydGxleSdzIGZvcm0pLlxuXG4gIHZhciBwcl93ID0gMiAqIGpTdGF0Lm5vcm1hbC5jZGYocXNxeiwgMCwgMSwgMSwgMCkgLSAxOyAvLyBlcmYocXNxeiAvIE1fU1FSVDIpXG4gIC8vIGlmIHByX3cgXiBjYyA8IDJlLTIyIHRoZW4gc2V0IHByX3cgPSAwXG4gIGlmIChwcl93ID49IE1hdGguZXhwKEMyIC8gY2MpKVxuICAgIHByX3cgPSBNYXRoLnBvdyhwcl93LCBjYyk7XG4gIGVsc2VcbiAgICBwcl93ID0gMC4wO1xuXG4gIC8vIGlmIHcgaXMgbGFyZ2UgdGhlbiB0aGUgc2Vjb25kIGNvbXBvbmVudCBvZiB0aGVcbiAgLy8gaW50ZWdyYWwgaXMgc21hbGwsIHNvIGZld2VyIGludGVydmFscyBhcmUgbmVlZGVkLlxuXG4gIHZhciB3aW5jcjtcbiAgaWYgKHcgPiB3bGFyKVxuICAgIHdpbmNyID0gd2luY3IxO1xuICBlbHNlXG4gICAgd2luY3IgPSB3aW5jcjI7XG5cbiAgLy8gZmluZCB0aGUgaW50ZWdyYWwgb2Ygc2Vjb25kIHRlcm0gb2YgaGFydGxleSdzIGZvcm1cbiAgLy8gZm9yIHRoZSBpbnRlZ3JhbCBvZiB0aGUgcmFuZ2UgZm9yIGVxdWFsLWxlbmd0aFxuICAvLyBpbnRlcnZhbHMgdXNpbmcgbGVnZW5kcmUgcXVhZHJhdHVyZS4gIGxpbWl0cyBvZlxuICAvLyBpbnRlZ3JhdGlvbiBhcmUgZnJvbSAody8yLCA4KS4gIHR3byBvciB0aHJlZVxuICAvLyBlcXVhbC1sZW5ndGggaW50ZXJ2YWxzIGFyZSB1c2VkLlxuXG4gIC8vIGJsYiBhbmQgYnViIGFyZSBsb3dlciBhbmQgdXBwZXIgbGltaXRzIG9mIGludGVncmF0aW9uLlxuXG4gIHZhciBibGIgPSBxc3F6O1xuICB2YXIgYmluYyA9IChiYiAtIHFzcXopIC8gd2luY3I7XG4gIHZhciBidWIgPSBibGIgKyBiaW5jO1xuICB2YXIgZWluc3VtID0gMC4wO1xuXG4gIC8vIGludGVncmF0ZSBvdmVyIGVhY2ggaW50ZXJ2YWxcblxuICB2YXIgY2MxID0gY2MgLSAxLjA7XG4gIGZvciAodmFyIHdpID0gMTsgd2kgPD0gd2luY3I7IHdpKyspIHtcbiAgICB2YXIgZWxzdW0gPSAwLjA7XG4gICAgdmFyIGEgPSAwLjUgKiAoYnViICsgYmxiKTtcblxuICAgIC8vIGxlZ2VuZHJlIHF1YWRyYXR1cmUgd2l0aCBvcmRlciA9IG5sZWdcblxuICAgIHZhciBiID0gMC41ICogKGJ1YiAtIGJsYik7XG5cbiAgICBmb3IgKHZhciBqaiA9IDE7IGpqIDw9IG5sZWc7IGpqKyspIHtcbiAgICAgIHZhciBqLCB4eDtcbiAgICAgIGlmIChpaGFsZiA8IGpqKSB7XG4gICAgICAgIGogPSAobmxlZyAtIGpqKSArIDE7XG4gICAgICAgIHh4ID0geGxlZ1tqLTFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaiA9IGpqO1xuICAgICAgICB4eCA9IC14bGVnW2otMV07XG4gICAgICB9XG4gICAgICB2YXIgYyA9IGIgKiB4eDtcbiAgICAgIHZhciBhYyA9IGEgKyBjO1xuXG4gICAgICAvLyBpZiBleHAoLXFleHBvLzIpIDwgOWUtMTQsXG4gICAgICAvLyB0aGVuIGRvZXNuJ3QgY29udHJpYnV0ZSB0byBpbnRlZ3JhbFxuXG4gICAgICB2YXIgcWV4cG8gPSBhYyAqIGFjO1xuICAgICAgaWYgKHFleHBvID4gQzMpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICB2YXIgcHBsdXMgPSAyICogalN0YXQubm9ybWFsLmNkZihhYywgMCwgMSwgMSwgMCk7XG4gICAgICB2YXIgcG1pbnVzPSAyICogalN0YXQubm9ybWFsLmNkZihhYywgdywgMSwgMSwgMCk7XG5cbiAgICAgIC8vIGlmIHJpbnN1bSBeIChjYy0xKSA8IDllLTE0LFxuICAgICAgLy8gdGhlbiBkb2Vzbid0IGNvbnRyaWJ1dGUgdG8gaW50ZWdyYWxcblxuICAgICAgdmFyIHJpbnN1bSA9IChwcGx1cyAqIDAuNSkgLSAocG1pbnVzICogMC41KTtcbiAgICAgIGlmIChyaW5zdW0gPj0gTWF0aC5leHAoQzEgLyBjYzEpKSB7XG4gICAgICAgIHJpbnN1bSA9IChhbGVnW2otMV0gKiBNYXRoLmV4cCgtKDAuNSAqIHFleHBvKSkpICogTWF0aC5wb3cocmluc3VtLCBjYzEpO1xuICAgICAgICBlbHN1bSArPSByaW5zdW07XG4gICAgICB9XG4gICAgfVxuICAgIGVsc3VtICo9ICgoKDIuMCAqIGIpICogY2MpIC8gTWF0aC5zcXJ0KDIgKiBNYXRoLlBJKSk7XG4gICAgZWluc3VtICs9IGVsc3VtO1xuICAgIGJsYiA9IGJ1YjtcbiAgICBidWIgKz0gYmluYztcbiAgfVxuXG4gIC8vIGlmIHByX3cgXiByciA8IDllLTE0LCB0aGVuIHJldHVybiAwXG4gIHByX3cgKz0gZWluc3VtO1xuICBpZiAocHJfdyA8PSBNYXRoLmV4cChDMSAvIHJyKSlcbiAgICByZXR1cm4gMDtcblxuICBwcl93ID0gTWF0aC5wb3cocHJfdywgcnIpO1xuICBpZiAocHJfdyA+PSAxKSAvLyAxIHdhcyBpTWF4IHdhcyBlcHNcbiAgICByZXR1cm4gMTtcbiAgcmV0dXJuIHByX3c7XG59XG5cbmZ1bmN0aW9uIHR1a2V5UWludihwLCBjLCB2KSB7XG4gIHZhciBwMCA9IDAuMzIyMjMyNDIxMDg4O1xuICB2YXIgcTAgPSAwLjk5MzQ4NDYyNjA2MGUtMDE7XG4gIHZhciBwMSA9IC0xLjA7XG4gIHZhciBxMSA9IDAuNTg4NTgxNTcwNDk1O1xuICB2YXIgcDIgPSAtMC4zNDIyNDIwODg1NDc7XG4gIHZhciBxMiA9IDAuNTMxMTAzNDYyMzY2O1xuICB2YXIgcDMgPSAtMC4yMDQyMzEyMTAxMjU7XG4gIHZhciBxMyA9IDAuMTAzNTM3NzUyODUwO1xuICB2YXIgcDQgPSAtMC40NTM2NDIyMTAxNDhlLTA0O1xuICB2YXIgcTQgPSAwLjM4NTYwNzAwNjM0ZS0wMjtcbiAgdmFyIGMxID0gMC44ODMyO1xuICB2YXIgYzIgPSAwLjIzNjg7XG4gIHZhciBjMyA9IDEuMjE0O1xuICB2YXIgYzQgPSAxLjIwODtcbiAgdmFyIGM1ID0gMS40MTQyO1xuICB2YXIgdm1heCA9IDEyMC4wO1xuXG4gIHZhciBwcyA9IDAuNSAtIDAuNSAqIHA7XG4gIHZhciB5aSA9IE1hdGguc3FydChNYXRoLmxvZygxLjAgLyAocHMgKiBwcykpKTtcbiAgdmFyIHQgPSB5aSArICgoKCggeWkgKiBwNCArIHAzKSAqIHlpICsgcDIpICogeWkgKyBwMSkgKiB5aSArIHAwKVxuICAgICAvICgoKCggeWkgKiBxNCArIHEzKSAqIHlpICsgcTIpICogeWkgKyBxMSkgKiB5aSArIHEwKTtcbiAgaWYgKHYgPCB2bWF4KSB0ICs9ICh0ICogdCAqIHQgKyB0KSAvIHYgLyA0LjA7XG4gIHZhciBxID0gYzEgLSBjMiAqIHQ7XG4gIGlmICh2IDwgdm1heCkgcSArPSAtYzMgLyB2ICsgYzQgKiB0IC8gdjtcbiAgcmV0dXJuIHQgKiAocSAqIE1hdGgubG9nKGMgLSAxLjApICsgYzUpO1xufVxuXG5qU3RhdC5leHRlbmQoalN0YXQudHVrZXksIHtcbiAgY2RmOiBmdW5jdGlvbiBjZGYocSwgbm1lYW5zLCBkZikge1xuICAgIC8vIElkZW50aWNhbCBpbXBsZW1lbnRhdGlvbiBhcyB0aGUgUiBwdHVrZXkoKSBmdW5jdGlvbiBhcyBvZiBjb21taXQgNjg5NDdcbiAgICB2YXIgcnIgPSAxO1xuICAgIHZhciBjYyA9IG5tZWFucztcblxuICAgIHZhciBubGVncSA9IDE2O1xuICAgIHZhciBpaGFsZnEgPSA4O1xuXG4gICAgdmFyIGVwczEgPSAtMzAuMDtcbiAgICB2YXIgZXBzMiA9IDEuMGUtMTQ7XG4gICAgdmFyIGRoYWYgID0gMTAwLjA7XG4gICAgdmFyIGRxdWFyID0gODAwLjA7XG4gICAgdmFyIGRlaWdoID0gNTAwMC4wO1xuICAgIHZhciBkbGFyZyA9IDI1MDAwLjA7XG4gICAgdmFyIHVsZW4xID0gMS4wO1xuICAgIHZhciB1bGVuMiA9IDAuNTtcbiAgICB2YXIgdWxlbjMgPSAwLjI1O1xuICAgIHZhciB1bGVuNCA9IDAuMTI1O1xuICAgIHZhciB4bGVncSA9IFtcbiAgICAgIDAuOTg5NDAwOTM0OTkxNjQ5OTMyNTk2MTU0MTczNDUwLFxuICAgICAgMC45NDQ1NzUwMjMwNzMyMzI1NzYwNzc5ODg0MTU1MzUsXG4gICAgICAwLjg2NTYzMTIwMjM4NzgzMTc0Mzg4MDQ2Nzg5NzcxMixcbiAgICAgIDAuNzU1NDA0NDA4MzU1MDAzMDMzODk1MTAxMTk0ODQ3LFxuICAgICAgMC42MTc4NzYyNDQ0MDI2NDM3NDg0NDY2NzE3NjQwNDksXG4gICAgICAwLjQ1ODAxNjc3NzY1NzIyNzM4NjM0MjQxOTQ0Mjk4NCxcbiAgICAgIDAuMjgxNjAzNTUwNzc5MjU4OTEzMjMwNDYwNTAxNDYwLFxuICAgICAgMC45NTAxMjUwOTgzNzYzNzQ0MDE4NTMxOTMzNTQyNTBlLTFcbiAgICBdO1xuICAgIHZhciBhbGVncSA9IFtcbiAgICAgIDAuMjcxNTI0NTk0MTE3NTQwOTQ4NTE3ODA1NzI0NTYwZS0xLFxuICAgICAgMC42MjI1MzUyMzkzODY0Nzg5Mjg2Mjg0MzgzNjk5NDRlLTEsXG4gICAgICAwLjk1MTU4NTExNjgyNDkyNzg0ODA5OTI1MTA3NjAyMmUtMSxcbiAgICAgIDAuMTI0NjI4OTcxMjU1NTMzODcyMDUyNDc2MjgyMTkyLFxuICAgICAgMC4xNDk1OTU5ODg4MTY1NzY3MzIwODE1MDE3MzA1NDcsXG4gICAgICAwLjE2OTE1NjUxOTM5NTAwMjUzODE4OTMxMjA3OTAzMCxcbiAgICAgIDAuMTgyNjAzNDE1MDQ0OTIzNTg4ODY2NzYzNjY3OTY5LFxuICAgICAgMC4xODk0NTA2MTA0NTUwNjg0OTYyODUzOTY3MjMyMDhcbiAgICBdO1xuXG4gICAgaWYgKHEgPD0gMClcbiAgICAgIHJldHVybiAwO1xuXG4gICAgLy8gZGYgbXVzdCBiZSA+IDFcbiAgICAvLyB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IHR3byB2YWx1ZXNcblxuICAgIGlmIChkZiA8IDIgfHwgcnIgPCAxIHx8IGNjIDwgMikgcmV0dXJuIE5hTjtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHEpKVxuICAgICAgcmV0dXJuIDE7XG5cbiAgICBpZiAoZGYgPiBkbGFyZylcbiAgICAgIHJldHVybiB0dWtleVdwcm9iKHEsIHJyLCBjYyk7XG5cbiAgICAvLyBjYWxjdWxhdGUgbGVhZGluZyBjb25zdGFudFxuXG4gICAgdmFyIGYyID0gZGYgKiAwLjU7XG4gICAgdmFyIGYybGYgPSAoKGYyICogTWF0aC5sb2coZGYpKSAtIChkZiAqIE1hdGgubG9nKDIpKSkgLSBqU3RhdC5nYW1tYWxuKGYyKTtcbiAgICB2YXIgZjIxID0gZjIgLSAxLjA7XG5cbiAgICAvLyBpbnRlZ3JhbCBpcyBkaXZpZGVkIGludG8gdW5pdCwgaGFsZi11bml0LCBxdWFydGVyLXVuaXQsIG9yXG4gICAgLy8gZWlnaHRoLXVuaXQgbGVuZ3RoIGludGVydmFscyBkZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIHRoZVxuICAgIC8vIGRlZ3JlZXMgb2YgZnJlZWRvbS5cblxuICAgIHZhciBmZjQgPSBkZiAqIDAuMjU7XG4gICAgdmFyIHVsZW47XG4gICAgaWYgICAgICAoZGYgPD0gZGhhZikgIHVsZW4gPSB1bGVuMTtcbiAgICBlbHNlIGlmIChkZiA8PSBkcXVhcikgdWxlbiA9IHVsZW4yO1xuICAgIGVsc2UgaWYgKGRmIDw9IGRlaWdoKSB1bGVuID0gdWxlbjM7XG4gICAgZWxzZSAgICAgICAgICAgICAgICAgIHVsZW4gPSB1bGVuNDtcblxuICAgIGYybGYgKz0gTWF0aC5sb2codWxlbik7XG5cbiAgICAvLyBpbnRlZ3JhdGUgb3ZlciBlYWNoIHN1YmludGVydmFsXG5cbiAgICB2YXIgYW5zID0gMC4wO1xuXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNTA7IGkrKykge1xuICAgICAgdmFyIG90c3VtID0gMC4wO1xuXG4gICAgICAvLyBsZWdlbmRyZSBxdWFkcmF0dXJlIHdpdGggb3JkZXIgPSBubGVncVxuICAgICAgLy8gbm9kZXMgKHN0b3JlZCBpbiB4bGVncSkgYXJlIHN5bW1ldHJpYyBhcm91bmQgemVyby5cblxuICAgICAgdmFyIHR3YTEgPSAoMiAqIGkgLSAxKSAqIHVsZW47XG5cbiAgICAgIGZvciAodmFyIGpqID0gMTsgamogPD0gbmxlZ3E7IGpqKyspIHtcbiAgICAgICAgdmFyIGosIHQxO1xuICAgICAgICBpZiAoaWhhbGZxIDwgamopIHtcbiAgICAgICAgICBqID0gamogLSBpaGFsZnEgLSAxO1xuICAgICAgICAgIHQxID0gKGYybGYgKyAoZjIxICogTWF0aC5sb2codHdhMSArICh4bGVncVtqXSAqIHVsZW4pKSkpXG4gICAgICAgICAgICAgIC0gKCgoeGxlZ3Fbal0gKiB1bGVuKSArIHR3YTEpICogZmY0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqID0gamogLSAxO1xuICAgICAgICAgIHQxID0gKGYybGYgKyAoZjIxICogTWF0aC5sb2codHdhMSAtICh4bGVncVtqXSAqIHVsZW4pKSkpXG4gICAgICAgICAgICAgICsgKCgoeGxlZ3Fbal0gKiB1bGVuKSAtIHR3YTEpICogZmY0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGV4cCh0MSkgPCA5ZS0xNCwgdGhlbiBkb2Vzbid0IGNvbnRyaWJ1dGUgdG8gaW50ZWdyYWxcbiAgICAgICAgdmFyIHFzcXo7XG4gICAgICAgIGlmICh0MSA+PSBlcHMxKSB7XG4gICAgICAgICAgaWYgKGloYWxmcSA8IGpqKSB7XG4gICAgICAgICAgICBxc3F6ID0gcSAqIE1hdGguc3FydCgoKHhsZWdxW2pdICogdWxlbikgKyB0d2ExKSAqIDAuNSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHFzcXogPSBxICogTWF0aC5zcXJ0KCgoLSh4bGVncVtqXSAqIHVsZW4pKSArIHR3YTEpICogMC41KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjYWxsIHdwcm9iIHRvIGZpbmQgaW50ZWdyYWwgb2YgcmFuZ2UgcG9ydGlvblxuXG4gICAgICAgICAgdmFyIHdwcmIgPSB0dWtleVdwcm9iKHFzcXosIHJyLCBjYyk7XG4gICAgICAgICAgdmFyIHJvdHN1bSA9ICh3cHJiICogYWxlZ3Fbal0pICogTWF0aC5leHAodDEpO1xuICAgICAgICAgIG90c3VtICs9IHJvdHN1bTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbmQgbGVnZW5kcmUgaW50ZWdyYWwgZm9yIGludGVydmFsIGlcbiAgICAgICAgLy8gTDIwMDpcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW50ZWdyYWwgZm9yIGludGVydmFsIGkgPCAxZS0xNCwgdGhlbiBzdG9wLlxuICAgICAgLy8gSG93ZXZlciwgaW4gb3JkZXIgdG8gYXZvaWQgc21hbGwgYXJlYSB1bmRlciBsZWZ0IHRhaWwsXG4gICAgICAvLyBhdCBsZWFzdCAgMSAvIHVsZW4gIGludGVydmFscyBhcmUgY2FsY3VsYXRlZC5cbiAgICAgIGlmIChpICogdWxlbiA+PSAxLjAgJiYgb3RzdW0gPD0gZXBzMilcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGVuZCBvZiBpbnRlcnZhbCBpXG4gICAgICAvLyBMMzMwOlxuXG4gICAgICBhbnMgKz0gb3RzdW07XG4gICAgfVxuXG4gICAgaWYgKG90c3VtID4gZXBzMikgeyAvLyBub3QgY29udmVyZ2VkXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3R1a2V5LmNkZiBmYWlsZWQgdG8gY29udmVyZ2UnKTtcbiAgICB9XG4gICAgaWYgKGFucyA+IDEpXG4gICAgICBhbnMgPSAxO1xuICAgIHJldHVybiBhbnM7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBubWVhbnMsIGRmKSB7XG4gICAgLy8gSWRlbnRpY2FsIGltcGxlbWVudGF0aW9uIGFzIHRoZSBSIHF0dWtleSgpIGZ1bmN0aW9uIGFzIG9mIGNvbW1pdCA2ODk0N1xuICAgIHZhciByciA9IDE7XG4gICAgdmFyIGNjID0gbm1lYW5zO1xuXG4gICAgdmFyIGVwcyA9IDAuMDAwMTtcbiAgICB2YXIgbWF4aXRlciA9IDUwO1xuXG4gICAgLy8gZGYgbXVzdCBiZSA+IDEgOyB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IHR3byB2YWx1ZXNcbiAgICBpZiAoZGYgPCAyIHx8IHJyIDwgMSB8fCBjYyA8IDIpIHJldHVybiBOYU47XG5cbiAgICBpZiAocCA8IDAgfHwgcCA+IDEpIHJldHVybiBOYU47XG4gICAgaWYgKHAgPT09IDApIHJldHVybiAwO1xuICAgIGlmIChwID09PSAxKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAvLyBJbml0aWFsIHZhbHVlXG5cbiAgICB2YXIgeDAgPSB0dWtleVFpbnYocCwgY2MsIGRmKTtcblxuICAgIC8vIEZpbmQgcHJvYih2YWx1ZSA8IHgwKVxuXG4gICAgdmFyIHZhbHgwID0galN0YXQudHVrZXkuY2RmKHgwLCBubWVhbnMsIGRmKSAtIHA7XG5cbiAgICAvLyBGaW5kIHRoZSBzZWNvbmQgaXRlcmF0ZSBhbmQgcHJvYih2YWx1ZSA8IHgxKS5cbiAgICAvLyBJZiB0aGUgZmlyc3QgaXRlcmF0ZSBoYXMgcHJvYmFiaWxpdHkgdmFsdWVcbiAgICAvLyBleGNlZWRpbmcgcCB0aGVuIHNlY29uZCBpdGVyYXRlIGlzIDEgbGVzcyB0aGFuXG4gICAgLy8gZmlyc3QgaXRlcmF0ZTsgb3RoZXJ3aXNlIGl0IGlzIDEgZ3JlYXRlci5cblxuICAgIHZhciB4MTtcbiAgICBpZiAodmFseDAgPiAwLjApXG4gICAgICB4MSA9IE1hdGgubWF4KDAuMCwgeDAgLSAxLjApO1xuICAgIGVsc2VcbiAgICAgIHgxID0geDAgKyAxLjA7XG4gICAgdmFyIHZhbHgxID0galN0YXQudHVrZXkuY2RmKHgxLCBubWVhbnMsIGRmKSAtIHA7XG5cbiAgICAvLyBGaW5kIG5ldyBpdGVyYXRlXG5cbiAgICB2YXIgYW5zO1xuICAgIGZvcih2YXIgaXRlciA9IDE7IGl0ZXIgPCBtYXhpdGVyOyBpdGVyKyspIHtcbiAgICAgIGFucyA9IHgxIC0gKCh2YWx4MSAqICh4MSAtIHgwKSkgLyAodmFseDEgLSB2YWx4MCkpO1xuICAgICAgdmFseDAgPSB2YWx4MTtcblxuICAgICAgLy8gTmV3IGl0ZXJhdGUgbXVzdCBiZSA+PSAwXG5cbiAgICAgIHgwID0geDE7XG4gICAgICBpZiAoYW5zIDwgMC4wKSB7XG4gICAgICAgIGFucyA9IDAuMDtcbiAgICAgICAgdmFseDEgPSAtcDtcbiAgICAgIH1cbiAgICAgIC8vIEZpbmQgcHJvYih2YWx1ZSA8IG5ldyBpdGVyYXRlKVxuXG4gICAgICB2YWx4MSA9IGpTdGF0LnR1a2V5LmNkZihhbnMsIG5tZWFucywgZGYpIC0gcDtcbiAgICAgIHgxID0gYW5zO1xuXG4gICAgICAvLyBJZiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBzdWNjZXNzaXZlXG4gICAgICAvLyBpdGVyYXRlcyBpcyBsZXNzIHRoYW4gZXBzLCBzdG9wXG5cbiAgICAgIHZhciB4YWJzID0gTWF0aC5hYnMoeDEgLSB4MCk7XG4gICAgICBpZiAoeGFicyA8IGVwcylcbiAgICAgICAgcmV0dXJuIGFucztcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3R1a2V5LmludiBmYWlsZWQgdG8gY29udmVyZ2UnKTtcbiAgfVxufSk7XG5cbn0oalN0YXQsIE1hdGgpKTtcbi8qIFByb3ZpZGVzIGZ1bmN0aW9ucyBmb3IgdGhlIHNvbHV0aW9uIG9mIGxpbmVhciBzeXN0ZW0gb2YgZXF1YXRpb25zLCBpbnRlZ3JhdGlvbiwgZXh0cmFwb2xhdGlvbixcbiAqIGludGVycG9sYXRpb24sIGVpZ2VudmFsdWUgcHJvYmxlbXMsIGRpZmZlcmVudGlhbCBlcXVhdGlvbnMgYW5kIFBDQSBhbmFseXNpcy4gKi9cblxuKGZ1bmN0aW9uKGpTdGF0LCBNYXRoKSB7XG5cbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG52YXIgaXNBcnJheSA9IGpTdGF0LnV0aWxzLmlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzVXNhYmxlKGFyZykge1xuICByZXR1cm4gaXNBcnJheShhcmcpIHx8IGFyZyBpbnN0YW5jZW9mIGpTdGF0O1xufVxuXG5qU3RhdC5leHRlbmQoe1xuXG4gIC8vIGFkZCBhIHZlY3Rvci9tYXRyaXggdG8gYSB2ZWN0b3IvbWF0cml4IG9yIHNjYWxhclxuICBhZGQ6IGZ1bmN0aW9uIGFkZChhcnIsIGFyZykge1xuICAgIC8vIGNoZWNrIGlmIGFyZyBpcyBhIHZlY3RvciBvciBzY2FsYXJcbiAgICBpZiAoaXNVc2FibGUoYXJnKSkge1xuICAgICAgaWYgKCFpc1VzYWJsZShhcmdbMF0pKSBhcmcgPSBbIGFyZyBdO1xuICAgICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICByZXR1cm4gdmFsdWUgKyBhcmdbcm93XVtjb2xdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWUgKyBhcmc7IH0pO1xuICB9LFxuXG4gIC8vIHN1YnRyYWN0IGEgdmVjdG9yIG9yIHNjYWxhciBmcm9tIHRoZSB2ZWN0b3JcbiAgc3VidHJhY3Q6IGZ1bmN0aW9uIHN1YnRyYWN0KGFyciwgYXJnKSB7XG4gICAgLy8gY2hlY2sgaWYgYXJnIGlzIGEgdmVjdG9yIG9yIHNjYWxhclxuICAgIGlmIChpc1VzYWJsZShhcmcpKSB7XG4gICAgICBpZiAoIWlzVXNhYmxlKGFyZ1swXSkpIGFyZyA9IFsgYXJnIF07XG4gICAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUsIHJvdywgY29sKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAtIGFyZ1tyb3ddW2NvbF0gfHwgMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlIC0gYXJnOyB9KTtcbiAgfSxcblxuICAvLyBtYXRyaXggZGl2aXNpb25cbiAgZGl2aWRlOiBmdW5jdGlvbiBkaXZpZGUoYXJyLCBhcmcpIHtcbiAgICBpZiAoaXNVc2FibGUoYXJnKSkge1xuICAgICAgaWYgKCFpc1VzYWJsZShhcmdbMF0pKSBhcmcgPSBbIGFyZyBdO1xuICAgICAgcmV0dXJuIGpTdGF0Lm11bHRpcGx5KGFyciwgalN0YXQuaW52KGFyZykpO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlIC8gYXJnOyB9KTtcbiAgfSxcblxuICAvLyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgbXVsdGlwbHk6IGZ1bmN0aW9uIG11bHRpcGx5KGFyciwgYXJnKSB7XG4gICAgdmFyIHJvdywgY29sLCBucmVzY29scywgc3VtLCBucm93LCBuY29sLCByZXMsIHJlc2NvbHM7XG4gICAgLy8gZWc6IGFyciA9IDIgYXJnID0gMyAtPiA2IGZvciByZXNbMF1bMF0gc3RhdGVtZW50IGNsb3N1cmVcbiAgICBpZiAoYXJyLmxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIGFyZy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGFyciAqIGFyZztcbiAgICB9XG4gICAgbnJvdyA9IGFyci5sZW5ndGgsXG4gICAgbmNvbCA9IGFyclswXS5sZW5ndGgsXG4gICAgcmVzID0galN0YXQuemVyb3MobnJvdywgbnJlc2NvbHMgPSAoaXNVc2FibGUoYXJnKSkgPyBhcmdbMF0ubGVuZ3RoIDogbmNvbCksXG4gICAgcmVzY29scyA9IDA7XG4gICAgaWYgKGlzVXNhYmxlKGFyZykpIHtcbiAgICAgIGZvciAoOyByZXNjb2xzIDwgbnJlc2NvbHM7IHJlc2NvbHMrKykge1xuICAgICAgICBmb3IgKHJvdyA9IDA7IHJvdyA8IG5yb3c7IHJvdysrKSB7XG4gICAgICAgICAgc3VtID0gMDtcbiAgICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IG5jb2w7IGNvbCsrKVxuICAgICAgICAgIHN1bSArPSBhcnJbcm93XVtjb2xdICogYXJnW2NvbF1bcmVzY29sc107XG4gICAgICAgICAgcmVzW3Jvd11bcmVzY29sc10gPSBzdW07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAobnJvdyA9PT0gMSAmJiByZXNjb2xzID09PSAxKSA/IHJlc1swXVswXSA6IHJlcztcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZSAqIGFyZzsgfSk7XG4gIH0sXG5cbiAgLy8gb3V0ZXIoWzEsMiwzXSxbNCw1LDZdKVxuICAvLyA9PT1cbiAgLy8gW1sxXSxbMl0sWzNdXSB0aW1lcyBbWzQsNSw2XV1cbiAgLy8gLT5cbiAgLy8gW1s0LDUsNl0sWzgsMTAsMTJdLFsxMiwxNSwxOF1dXG4gIG91dGVyOmZ1bmN0aW9uIG91dGVyKEEsIEIpIHtcbiAgICByZXR1cm4galN0YXQubXVsdGlwbHkoQS5tYXAoZnVuY3Rpb24odCl7IHJldHVybiBbdF0gfSksIFtCXSk7XG4gIH0sXG5cblxuICAvLyBSZXR1cm5zIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gbWF0cmljaWVzXG4gIGRvdDogZnVuY3Rpb24gZG90KGFyciwgYXJnKSB7XG4gICAgaWYgKCFpc1VzYWJsZShhcnJbMF0pKSBhcnIgPSBbIGFyciBdO1xuICAgIGlmICghaXNVc2FibGUoYXJnWzBdKSkgYXJnID0gWyBhcmcgXTtcbiAgICAvLyBjb252ZXJ0IGNvbHVtbiB0byByb3cgdmVjdG9yXG4gICAgdmFyIGxlZnQgPSAoYXJyWzBdLmxlbmd0aCA9PT0gMSAmJiBhcnIubGVuZ3RoICE9PSAxKSA/IGpTdGF0LnRyYW5zcG9zZShhcnIpIDogYXJyLFxuICAgIHJpZ2h0ID0gKGFyZ1swXS5sZW5ndGggPT09IDEgJiYgYXJnLmxlbmd0aCAhPT0gMSkgPyBqU3RhdC50cmFuc3Bvc2UoYXJnKSA6IGFyZyxcbiAgICByZXMgPSBbXSxcbiAgICByb3cgPSAwLFxuICAgIG5yb3cgPSBsZWZ0Lmxlbmd0aCxcbiAgICBuY29sID0gbGVmdFswXS5sZW5ndGgsXG4gICAgc3VtLCBjb2w7XG4gICAgZm9yICg7IHJvdyA8IG5yb3c7IHJvdysrKSB7XG4gICAgICByZXNbcm93XSA9IFtdO1xuICAgICAgc3VtID0gMDtcbiAgICAgIGZvciAoY29sID0gMDsgY29sIDwgbmNvbDsgY29sKyspXG4gICAgICBzdW0gKz0gbGVmdFtyb3ddW2NvbF0gKiByaWdodFtyb3ddW2NvbF07XG4gICAgICByZXNbcm93XSA9IHN1bTtcbiAgICB9XG4gICAgcmV0dXJuIChyZXMubGVuZ3RoID09PSAxKSA/IHJlc1swXSA6IHJlcztcbiAgfSxcblxuICAvLyByYWlzZSBldmVyeSBlbGVtZW50IGJ5IGEgc2NhbGFyXG4gIHBvdzogZnVuY3Rpb24gcG93KGFyciwgYXJnKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgYXJnKTsgfSk7XG4gIH0sXG5cbiAgLy8gZXhwb25lbnRpYXRlIGV2ZXJ5IGVsZW1lbnRcbiAgZXhwOiBmdW5jdGlvbiBleHAoYXJyKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBNYXRoLmV4cCh2YWx1ZSk7IH0pO1xuICB9LFxuXG4gIC8vIGdlbmVyYXRlIHRoZSBuYXR1cmFsIGxvZyBvZiBldmVyeSBlbGVtZW50XG4gIGxvZzogZnVuY3Rpb24gZXhwKGFycikge1xuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gTWF0aC5sb2codmFsdWUpOyB9KTtcbiAgfSxcblxuICAvLyBnZW5lcmF0ZSB0aGUgYWJzb2x1dGUgdmFsdWVzIG9mIHRoZSB2ZWN0b3JcbiAgYWJzOiBmdW5jdGlvbiBhYnMoYXJyKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBNYXRoLmFicyh2YWx1ZSk7IH0pO1xuICB9LFxuXG4gIC8vIGNvbXB1dGVzIHRoZSBwLW5vcm0gb2YgdGhlIHZlY3RvclxuICAvLyBJbiB0aGUgY2FzZSB0aGF0IGEgbWF0cml4IGlzIHBhc3NlZCwgdXNlcyB0aGUgZmlyc3Qgcm93IGFzIHRoZSB2ZWN0b3JcbiAgbm9ybTogZnVuY3Rpb24gbm9ybShhcnIsIHApIHtcbiAgICB2YXIgbm5vcm0gPSAwLFxuICAgIGkgPSAwO1xuICAgIC8vIGNoZWNrIHRoZSBwLXZhbHVlIG9mIHRoZSBub3JtLCBhbmQgc2V0IGZvciBtb3N0IGNvbW1vbiBjYXNlXG4gICAgaWYgKGlzTmFOKHApKSBwID0gMjtcbiAgICAvLyBjaGVjayBpZiBtdWx0aS1kaW1lbnNpb25hbCBhcnJheSwgYW5kIG1ha2UgdmVjdG9yIGNvcnJlY3Rpb25cbiAgICBpZiAoaXNVc2FibGUoYXJyWzBdKSkgYXJyID0gYXJyWzBdO1xuICAgIC8vIHZlY3RvciBub3JtXG4gICAgZm9yICg7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ub3JtICs9IE1hdGgucG93KE1hdGguYWJzKGFycltpXSksIHApO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5wb3cobm5vcm0sIDEgLyBwKTtcbiAgfSxcblxuICAvLyBjb21wdXRlcyB0aGUgYW5nbGUgYmV0d2VlbiB0d28gdmVjdG9ycyBpbiByYWRzXG4gIC8vIEluIGNhc2UgYSBtYXRyaXggaXMgcGFzc2VkLCB0aGlzIHVzZXMgdGhlIGZpcnN0IHJvdyBhcyB0aGUgdmVjdG9yXG4gIGFuZ2xlOiBmdW5jdGlvbiBhbmdsZShhcnIsIGFyZykge1xuICAgIHJldHVybiBNYXRoLmFjb3MoalN0YXQuZG90KGFyciwgYXJnKSAvIChqU3RhdC5ub3JtKGFycikgKiBqU3RhdC5ub3JtKGFyZykpKTtcbiAgfSxcblxuICAvLyBhdWdtZW50IG9uZSBtYXRyaXggYnkgYW5vdGhlclxuICAvLyBOb3RlOiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgYSBtYXRyaXgsIG5vdCBhIGpTdGF0IG9iamVjdFxuICBhdWc6IGZ1bmN0aW9uIGF1ZyhhLCBiKSB7XG4gICAgdmFyIG5ld2FyciA9IFtdO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdhcnIucHVzaChhW2ldLnNsaWNlKCkpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgbmV3YXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwdXNoLmFwcGx5KG5ld2FycltpXSwgYltpXSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdhcnI7XG4gIH0sXG5cbiAgLy8gVGhlIGludigpIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBtYXRyaXhcbiAgLy8gQ3JlYXRlIHRoZSBpbnZlcnNlIGJ5IGF1Z21lbnRpbmcgdGhlIG1hdHJpeCBieSB0aGUgaWRlbnRpdHkgbWF0cml4IG9mIHRoZVxuICAvLyBhcHByb3ByaWF0ZSBzaXplLCBhbmQgdGhlbiB1c2UgRy1KIGVsaW1pbmF0aW9uIG9uIHRoZSBhdWdtZW50ZWQgbWF0cml4LlxuICBpbnY6IGZ1bmN0aW9uIGludihhKSB7XG4gICAgdmFyIHJvd3MgPSBhLmxlbmd0aDtcbiAgICB2YXIgY29scyA9IGFbMF0ubGVuZ3RoO1xuICAgIHZhciBiID0galN0YXQuaWRlbnRpdHkocm93cywgY29scyk7XG4gICAgdmFyIGMgPSBqU3RhdC5nYXVzc19qb3JkYW4oYSwgYik7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgajtcblxuICAgIC8vV2UgbmVlZCB0byBjb3B5IHRoZSBpbnZlcnNlIHBvcnRpb24gdG8gYSBuZXcgbWF0cml4IHRvIHJpZCBHLUogYXJ0aWZhY3RzXG4gICAgZm9yICg7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgIHJlc3VsdFtpXSA9IFtdO1xuICAgICAgZm9yIChqID0gY29sczsgaiA8IGNbMF0ubGVuZ3RoOyBqKyspXG4gICAgICAgIHJlc3VsdFtpXVtqIC0gY29sc10gPSBjW2ldW2pdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIC8vIGNhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXRyaXhcbiAgZGV0OiBmdW5jdGlvbiBkZXQoYSkge1xuICAgIHZhciBhbGVuID0gYS5sZW5ndGgsXG4gICAgYWxlbmQgPSBhbGVuICogMixcbiAgICB2YWxzID0gbmV3IEFycmF5KGFsZW5kKSxcbiAgICByb3dzaGlmdCA9IGFsZW4gLSAxLFxuICAgIGNvbHNoaWZ0ID0gYWxlbmQgLSAxLFxuICAgIG1yb3cgPSByb3dzaGlmdCAtIGFsZW4gKyAxLFxuICAgIG1jb2wgPSBjb2xzaGlmdCxcbiAgICBpID0gMCxcbiAgICByZXN1bHQgPSAwLFxuICAgIGo7XG4gICAgLy8gY2hlY2sgZm9yIHNwZWNpYWwgMngyIGNhc2VcbiAgICBpZiAoYWxlbiA9PT0gMikge1xuICAgICAgcmV0dXJuIGFbMF1bMF0gKiBhWzFdWzFdIC0gYVswXVsxXSAqIGFbMV1bMF07XG4gICAgfVxuICAgIGZvciAoOyBpIDwgYWxlbmQ7IGkrKykge1xuICAgICAgdmFsc1tpXSA9IDE7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhbGVuOyBpKyspIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBhbGVuOyBqKyspIHtcbiAgICAgICAgdmFsc1sobXJvdyA8IDApID8gbXJvdyArIGFsZW4gOiBtcm93IF0gKj0gYVtpXVtqXTtcbiAgICAgICAgdmFsc1sobWNvbCA8IGFsZW4pID8gbWNvbCArIGFsZW4gOiBtY29sIF0gKj0gYVtpXVtqXTtcbiAgICAgICAgbXJvdysrO1xuICAgICAgICBtY29sLS07XG4gICAgICB9XG4gICAgICBtcm93ID0gLS1yb3dzaGlmdCAtIGFsZW4gKyAxO1xuICAgICAgbWNvbCA9IC0tY29sc2hpZnQ7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhbGVuOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSB2YWxzW2ldO1xuICAgIH1cbiAgICBmb3IgKDsgaSA8IGFsZW5kOyBpKyspIHtcbiAgICAgIHJlc3VsdCAtPSB2YWxzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIGdhdXNzX2VsaW1pbmF0aW9uOiBmdW5jdGlvbiBnYXVzc19lbGltaW5hdGlvbihhLCBiKSB7XG4gICAgdmFyIGkgPSAwLFxuICAgIGogPSAwLFxuICAgIG4gPSBhLmxlbmd0aCxcbiAgICBtID0gYVswXS5sZW5ndGgsXG4gICAgZmFjdG9yID0gMSxcbiAgICBzdW0gPSAwLFxuICAgIHggPSBbXSxcbiAgICBtYXVnLCBwaXZvdCwgdGVtcCwgaztcbiAgICBhID0galN0YXQuYXVnKGEsIGIpO1xuICAgIG1hdWcgPSBhWzBdLmxlbmd0aDtcbiAgICBmb3IoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHBpdm90ID0gYVtpXVtpXTtcbiAgICAgIGogPSBpO1xuICAgICAgZm9yIChrID0gaSArIDE7IGsgPCBtOyBrKyspIHtcbiAgICAgICAgaWYgKHBpdm90IDwgTWF0aC5hYnMoYVtrXVtpXSkpIHtcbiAgICAgICAgICBwaXZvdCA9IGFba11baV07XG4gICAgICAgICAgaiA9IGs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChqICE9IGkpIHtcbiAgICAgICAgZm9yKGsgPSAwOyBrIDwgbWF1ZzsgaysrKSB7XG4gICAgICAgICAgdGVtcCA9IGFbaV1ba107XG4gICAgICAgICAgYVtpXVtrXSA9IGFbal1ba107XG4gICAgICAgICAgYVtqXVtrXSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGZhY3RvciA9IGFbal1baV0gLyBhW2ldW2ldO1xuICAgICAgICBmb3IoayA9IGk7IGsgPCBtYXVnOyBrKyspIHtcbiAgICAgICAgICBhW2pdW2tdID0gYVtqXVtrXSAtIGZhY3RvciAqIGFbaV1ba107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBzdW0gPSAwO1xuICAgICAgZm9yIChqID0gaSArIDE7IGo8PSBuIC0gMTsgaisrKSB7XG4gICAgICAgIHN1bSA9IHN1bSArIHhbal0gKiBhW2ldW2pdO1xuICAgICAgfVxuICAgICAgeFtpXSA9KGFbaV1bbWF1ZyAtIDFdIC0gc3VtKSAvIGFbaV1baV07XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9LFxuXG4gIGdhdXNzX2pvcmRhbjogZnVuY3Rpb24gZ2F1c3Nfam9yZGFuKGEsIGIpIHtcbiAgICB2YXIgbSA9IGpTdGF0LmF1ZyhhLCBiKTtcbiAgICB2YXIgaCA9IG0ubGVuZ3RoO1xuICAgIHZhciB3ID0gbVswXS5sZW5ndGg7XG4gICAgdmFyIGMgPSAwO1xuICAgIHZhciB4LCB5LCB5MjtcbiAgICAvLyBmaW5kIG1heCBwaXZvdFxuICAgIGZvciAoeSA9IDA7IHkgPCBoOyB5KyspIHtcbiAgICAgIHZhciBtYXhyb3cgPSB5O1xuICAgICAgZm9yICh5MiA9IHkrMTsgeTIgPCBoOyB5MisrKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhtW3kyXVt5XSkgPiBNYXRoLmFicyhtW21heHJvd11beV0pKVxuICAgICAgICAgIG1heHJvdyA9IHkyO1xuICAgICAgfVxuICAgICAgdmFyIHRtcCA9IG1beV07XG4gICAgICBtW3ldID0gbVttYXhyb3ddO1xuICAgICAgbVttYXhyb3ddID0gdG1wXG4gICAgICBmb3IgKHkyID0geSsxOyB5MiA8IGg7IHkyKyspIHtcbiAgICAgICAgYyA9IG1beTJdW3ldIC8gbVt5XVt5XTtcbiAgICAgICAgZm9yICh4ID0geTsgeCA8IHc7IHgrKykge1xuICAgICAgICAgIG1beTJdW3hdIC09IG1beV1beF0gKiBjO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGJhY2tzdWJzdGl0dXRlXG4gICAgZm9yICh5ID0gaC0xOyB5ID49IDA7IHktLSkge1xuICAgICAgYyA9IG1beV1beV07XG4gICAgICBmb3IgKHkyID0gMDsgeTIgPCB5OyB5MisrKSB7XG4gICAgICAgIGZvciAoeCA9IHctMTsgeCA+IHktMTsgeC0tKSB7XG4gICAgICAgICAgbVt5Ml1beF0gLT0gbVt5XVt4XSAqIG1beTJdW3ldIC8gYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbVt5XVt5XSAvPSBjO1xuICAgICAgZm9yICh4ID0gaDsgeCA8IHc7IHgrKykge1xuICAgICAgICBtW3ldW3hdIC89IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtO1xuICB9LFxuXG4gIC8vIHNvbHZlIGVxdWF0aW9uXG4gIC8vIEF4PWJcbiAgLy8gQSBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeFxuICAvLyBBPVtbMSwyLDNdLFswLDQsNV0sWzAsNiw3XV1cbiAgLy8gYj1bMSwyLDNdXG4gIC8vIHRyaWFVcFNvbHZlKEEsYikgLy8gLT4gWzIuNjY2LDAuMTY2NiwxLjY2Nl1cbiAgLy8gaWYgeW91IHVzZSBtYXRyaXggc3R5bGVcbiAgLy8gQT1bWzEsMiwzXSxbMCw0LDVdLFswLDYsN11dXG4gIC8vIGI9W1sxXSxbMl0sWzNdXVxuICAvLyB3aWxsIHJldHVybiBbWzIuNjY2XSxbMC4xNjY2XSxbMS42NjZdXVxuICB0cmlhVXBTb2x2ZTogZnVuY3Rpb24gdHJpYVVwU29sdmUoQSwgYikge1xuICAgIHZhciBzaXplID0gQVswXS5sZW5ndGg7XG4gICAgdmFyIHggPSBqU3RhdC56ZXJvcygxLCBzaXplKVswXTtcbiAgICB2YXIgcGFydHM7XG4gICAgdmFyIG1hdHJpeF9tb2RlID0gZmFsc2U7XG5cbiAgICBpZiAoYlswXS5sZW5ndGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICBiID0gYi5tYXAoZnVuY3Rpb24oaSl7IHJldHVybiBpWzBdIH0pO1xuICAgICAgbWF0cml4X21vZGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGpTdGF0LmFyYW5nZShzaXplIC0gMSwgLTEsIC0xKS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHBhcnRzID0galN0YXQuYXJhbmdlKGkgKyAxLCBzaXplKS5tYXAoZnVuY3Rpb24oaikge1xuICAgICAgICByZXR1cm4geFtqXSAqIEFbaV1bal07XG4gICAgICB9KTtcbiAgICAgIHhbaV0gPSAoYltpXSAtIGpTdGF0LnN1bShwYXJ0cykpIC8gQVtpXVtpXTtcbiAgICB9KTtcblxuICAgIGlmIChtYXRyaXhfbW9kZSlcbiAgICAgIHJldHVybiB4Lm1hcChmdW5jdGlvbihpKXsgcmV0dXJuIFtpXSB9KTtcbiAgICByZXR1cm4geDtcbiAgfSxcblxuICB0cmlhTG93U29sdmU6IGZ1bmN0aW9uIHRyaWFMb3dTb2x2ZShBLCBiKSB7XG4gICAgLy8gbGlrZSB0byB0cmlhVXBTb2x2ZSBidXQgQSBpcyBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeFxuICAgIHZhciBzaXplID0gQVswXS5sZW5ndGg7XG4gICAgdmFyIHggPSBqU3RhdC56ZXJvcygxLCBzaXplKVswXTtcbiAgICB2YXIgcGFydHM7XG5cbiAgICB2YXIgbWF0cml4X21vZGU9ZmFsc2U7XG4gICAgaWYgKGJbMF0ubGVuZ3RoICE9IHVuZGVmaW5lZCkge1xuICAgICAgYiA9IGIubWFwKGZ1bmN0aW9uKGkpeyByZXR1cm4gaVswXSB9KTtcbiAgICAgIG1hdHJpeF9tb2RlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBqU3RhdC5hcmFuZ2Uoc2l6ZSkuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICBwYXJ0cyA9IGpTdGF0LmFyYW5nZShpKS5tYXAoZnVuY3Rpb24oaikge1xuICAgICAgICByZXR1cm4gQVtpXVtqXSAqIHhbal07XG4gICAgICB9KTtcbiAgICAgIHhbaV0gPSAoYltpXSAtIGpTdGF0LnN1bShwYXJ0cykpIC8gQVtpXVtpXTtcbiAgICB9KVxuXG4gICAgaWYgKG1hdHJpeF9tb2RlKVxuICAgICAgcmV0dXJuIHgubWFwKGZ1bmN0aW9uKGkpeyByZXR1cm4gW2ldIH0pO1xuICAgIHJldHVybiB4O1xuICB9LFxuXG5cbiAgLy8gQSAtPiBbTCxVXVxuICAvLyBBPUxVXG4gIC8vIEwgaXMgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgLy8gVSBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeFxuICBsdTogZnVuY3Rpb24gbHUoQSkge1xuICAgIHZhciBzaXplID0gQS5sZW5ndGg7XG4gICAgLy92YXIgTD1qU3RhdC5kaWFnb25hbChqU3RhdC5vbmVzKDEsc2l6ZSlbMF0pO1xuICAgIHZhciBMID0galN0YXQuaWRlbnRpdHkoc2l6ZSk7XG4gICAgdmFyIFIgPSBqU3RhdC56ZXJvcyhBLmxlbmd0aCwgQVswXS5sZW5ndGgpO1xuICAgIHZhciBwYXJ0cztcbiAgICBqU3RhdC5hcmFuZ2Uoc2l6ZSkuZm9yRWFjaChmdW5jdGlvbih0KSB7XG4gICAgICBSWzBdW3RdID0gQVswXVt0XTtcbiAgICB9KTtcbiAgICBqU3RhdC5hcmFuZ2UoMSwgc2l6ZSkuZm9yRWFjaChmdW5jdGlvbihsKSB7XG4gICAgICBqU3RhdC5hcmFuZ2UobCkuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIHBhcnRzID0galN0YXQuYXJhbmdlKGkpLm1hcChmdW5jdGlvbihqaikge1xuICAgICAgICAgIHJldHVybiBMW2xdW2pqXSAqIFJbampdW2ldO1xuICAgICAgICB9KTtcbiAgICAgICAgTFtsXVtpXSA9IChBW2xdW2ldIC0galN0YXQuc3VtKHBhcnRzKSkgLyBSW2ldW2ldO1xuICAgICAgfSk7XG4gICAgICBqU3RhdC5hcmFuZ2UobCwgc2l6ZSkuZm9yRWFjaChmdW5jdGlvbihqKSB7XG4gICAgICAgIHBhcnRzID0galN0YXQuYXJhbmdlKGwpLm1hcChmdW5jdGlvbihqaikge1xuICAgICAgICAgIHJldHVybiBMW2xdW2pqXSAqIFJbampdW2pdO1xuICAgICAgICB9KTtcbiAgICAgICAgUltsXVtqXSA9IEFbcGFydHMubGVuZ3RoXVtqXSAtIGpTdGF0LnN1bShwYXJ0cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gW0wsIFJdO1xuICB9LFxuXG4gIC8vIEEgLT4gVFxuICAvLyBBPVRUJ1xuICAvLyBUIGlzIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4XG4gIGNob2xlc2t5OiBmdW5jdGlvbiBjaG9sZXNreShBKSB7XG4gICAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgICB2YXIgVCA9IGpTdGF0Lnplcm9zKEEubGVuZ3RoLCBBWzBdLmxlbmd0aCk7XG4gICAgdmFyIHBhcnRzO1xuICAgIGpTdGF0LmFyYW5nZShzaXplKS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHBhcnRzID0galN0YXQuYXJhbmdlKGkpLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdyhUW2ldW3RdLDIpO1xuICAgICAgfSk7XG4gICAgICBUW2ldW2ldID0gTWF0aC5zcXJ0KEFbaV1baV0gLSBqU3RhdC5zdW0ocGFydHMpKTtcbiAgICAgIGpTdGF0LmFyYW5nZShpICsgMSwgc2l6ZSkuZm9yRWFjaChmdW5jdGlvbihqKSB7XG4gICAgICAgIHBhcnRzID0galN0YXQuYXJhbmdlKGkpLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIFRbaV1bdF0gKiBUW2pdW3RdO1xuICAgICAgICB9KTtcbiAgICAgICAgVFtqXVtpXSA9IChBW2ldW2pdIC0galN0YXQuc3VtKHBhcnRzKSkgLyBUW2ldW2ldO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFQ7XG4gIH0sXG5cblxuICBnYXVzc19qYWNvYmk6IGZ1bmN0aW9uIGdhdXNzX2phY29iaShhLCBiLCB4LCByKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIgbiA9IGEubGVuZ3RoO1xuICAgIHZhciBsID0gW107XG4gICAgdmFyIHUgPSBbXTtcbiAgICB2YXIgZCA9IFtdO1xuICAgIHZhciB4diwgYywgaCwgeGs7XG4gICAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGxbaV0gPSBbXTtcbiAgICAgIHVbaV0gPSBbXTtcbiAgICAgIGRbaV0gPSBbXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgICAgbFtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgdVtpXVtqXSA9IGRbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPCBqKSB7XG4gICAgICAgICAgdVtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgbFtpXVtqXSA9IGRbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIGxbaV1bal0gPSB1W2ldW2pdID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBoID0galN0YXQubXVsdGlwbHkoalN0YXQubXVsdGlwbHkoalN0YXQuaW52KGQpLCBqU3RhdC5hZGQobCwgdSkpLCAtMSk7XG4gICAgYyA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihkKSwgYik7XG4gICAgeHYgPSB4O1xuICAgIHhrID0galN0YXQuYWRkKGpTdGF0Lm11bHRpcGx5KGgsIHgpLCBjKTtcbiAgICBpID0gMjtcbiAgICB3aGlsZSAoTWF0aC5hYnMoalN0YXQubm9ybShqU3RhdC5zdWJ0cmFjdCh4ayx4dikpKSA+IHIpIHtcbiAgICAgIHh2ID0geGs7XG4gICAgICB4ayA9IGpTdGF0LmFkZChqU3RhdC5tdWx0aXBseShoLCB4diksIGMpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4geGs7XG4gIH0sXG5cbiAgZ2F1c3Nfc2VpZGVsOiBmdW5jdGlvbiBnYXVzc19zZWlkZWwoYSwgYiwgeCwgcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbiA9IGEubGVuZ3RoO1xuICAgIHZhciBsID0gW107XG4gICAgdmFyIHUgPSBbXTtcbiAgICB2YXIgZCA9IFtdO1xuICAgIHZhciBqLCB4diwgYywgaCwgeGs7XG4gICAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGxbaV0gPSBbXTtcbiAgICAgIHVbaV0gPSBbXTtcbiAgICAgIGRbaV0gPSBbXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgICAgbFtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgdVtpXVtqXSA9IGRbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPCBqKSB7XG4gICAgICAgICAgdVtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgbFtpXVtqXSA9IGRbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIGxbaV1bal0gPSB1W2ldW2pdID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBoID0galN0YXQubXVsdGlwbHkoalN0YXQubXVsdGlwbHkoalN0YXQuaW52KGpTdGF0LmFkZChkLCBsKSksIHUpLCAtMSk7XG4gICAgYyA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihqU3RhdC5hZGQoZCwgbCkpLCBiKTtcbiAgICB4diA9IHg7XG4gICAgeGsgPSBqU3RhdC5hZGQoalN0YXQubXVsdGlwbHkoaCwgeCksIGMpO1xuICAgIGkgPSAyO1xuICAgIHdoaWxlIChNYXRoLmFicyhqU3RhdC5ub3JtKGpTdGF0LnN1YnRyYWN0KHhrLCB4dikpKSA+IHIpIHtcbiAgICAgIHh2ID0geGs7XG4gICAgICB4ayA9IGpTdGF0LmFkZChqU3RhdC5tdWx0aXBseShoLCB4diksIGMpO1xuICAgICAgaSA9IGkgKyAxO1xuICAgIH1cbiAgICByZXR1cm4geGs7XG4gIH0sXG5cbiAgU09SOiBmdW5jdGlvbiBTT1IoYSwgYiwgeCwgciwgdykge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbiA9IGEubGVuZ3RoO1xuICAgIHZhciBsID0gW107XG4gICAgdmFyIHUgPSBbXTtcbiAgICB2YXIgZCA9IFtdO1xuICAgIHZhciBqLCB4diwgYywgaCwgeGs7XG4gICAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGxbaV0gPSBbXTtcbiAgICAgIHVbaV0gPSBbXTtcbiAgICAgIGRbaV0gPSBbXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgICAgbFtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgdVtpXVtqXSA9IGRbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPCBqKSB7XG4gICAgICAgICAgdVtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgbFtpXVtqXSA9IGRbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRbaV1bal0gPSBhW2ldW2pdO1xuICAgICAgICAgIGxbaV1bal0gPSB1W2ldW2pdID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBoID0galN0YXQubXVsdGlwbHkoalN0YXQuaW52KGpTdGF0LmFkZChkLCBqU3RhdC5tdWx0aXBseShsLCB3KSkpLFxuICAgICAgICAgICAgICAgICAgICAgICBqU3RhdC5zdWJ0cmFjdChqU3RhdC5tdWx0aXBseShkLCAxIC0gdyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpTdGF0Lm11bHRpcGx5KHUsIHcpKSk7XG4gICAgYyA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihqU3RhdC5hZGQoZCxcbiAgICAgICAgalN0YXQubXVsdGlwbHkobCwgdykpKSwgYiksIHcpO1xuICAgIHh2ID0geDtcbiAgICB4ayA9IGpTdGF0LmFkZChqU3RhdC5tdWx0aXBseShoLCB4KSwgYyk7XG4gICAgaSA9IDI7XG4gICAgd2hpbGUgKE1hdGguYWJzKGpTdGF0Lm5vcm0oalN0YXQuc3VidHJhY3QoeGssIHh2KSkpID4gcikge1xuICAgICAgeHYgPSB4aztcbiAgICAgIHhrID0galN0YXQuYWRkKGpTdGF0Lm11bHRpcGx5KGgsIHh2KSwgYyk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiB4aztcbiAgfSxcblxuICBob3VzZWhvbGRlcjogZnVuY3Rpb24gaG91c2Vob2xkZXIoYSkge1xuICAgIHZhciBtID0gYS5sZW5ndGg7XG4gICAgdmFyIG4gPSBhWzBdLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHcgPSBbXTtcbiAgICB2YXIgcCA9IFtdO1xuICAgIHZhciBhbHBoYSwgciwgaywgaiwgZmFjdG9yO1xuICAgIGZvciAoOyBpIDwgbSAtIDE7IGkrKykge1xuICAgICAgYWxwaGEgPSAwO1xuICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyBqKyspXG4gICAgICBhbHBoYSArPSAoYVtqXVtpXSAqIGFbal1baV0pO1xuICAgICAgZmFjdG9yID0gKGFbaSArIDFdW2ldID4gMCkgPyAtMSA6IDE7XG4gICAgICBhbHBoYSA9IGZhY3RvciAqIE1hdGguc3FydChhbHBoYSk7XG4gICAgICByID0gTWF0aC5zcXJ0KCgoKGFscGhhICogYWxwaGEpIC0gYVtpICsgMV1baV0gKiBhbHBoYSkgLyAyKSk7XG4gICAgICB3ID0galN0YXQuemVyb3MobSwgMSk7XG4gICAgICB3W2kgKyAxXVswXSA9IChhW2kgKyAxXVtpXSAtIGFscGhhKSAvICgyICogcik7XG4gICAgICBmb3IgKGsgPSBpICsgMjsgayA8IG07IGsrKykgd1trXVswXSA9IGFba11baV0gLyAoMiAqIHIpO1xuICAgICAgcCA9IGpTdGF0LnN1YnRyYWN0KGpTdGF0LmlkZW50aXR5KG0sIG4pLFxuICAgICAgICAgIGpTdGF0Lm11bHRpcGx5KGpTdGF0Lm11bHRpcGx5KHcsIGpTdGF0LnRyYW5zcG9zZSh3KSksIDIpKTtcbiAgICAgIGEgPSBqU3RhdC5tdWx0aXBseShwLCBqU3RhdC5tdWx0aXBseShhLCBwKSk7XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9LFxuXG4gIC8vIEEgLT4gW1EsUl1cbiAgLy8gUSBpcyBvcnRob2dvbmFsIG1hdHJpeFxuICAvLyBSIGlzIHVwcGVyIHRyaWFuZ3VsYXJcbiAgUVI6IChmdW5jdGlvbigpIHtcbiAgICAvLyB4IC0+IFFcbiAgICAvLyBmaW5kIGEgb3J0aG9nb25hbCBtYXRyaXggUSBzdC5cbiAgICAvLyBReD15XG4gICAgLy8geSBpcyBbfHx4fHwsMCwwLC4uLl1cblxuICAgIC8vIHF1aWNrIHJlZlxuICAgIHZhciBzdW0gICA9IGpTdGF0LnN1bTtcbiAgICB2YXIgcmFuZ2UgPSBqU3RhdC5hcmFuZ2U7XG5cbiAgICBmdW5jdGlvbiBxcjIoeCkge1xuICAgICAgLy8gcXVpY2sgaW1wbGV0YXRpb25cbiAgICAgIC8vIGh0dHBzOi8vd3d3LnN0YXQud2lzYy5lZHUvfmxhcmdldC9tYXRoNDk2L3FyLmh0bWxcblxuICAgICAgdmFyIG4gPSB4Lmxlbmd0aDtcbiAgICAgIHZhciBwID0geFswXS5sZW5ndGg7XG5cbiAgICAgIHZhciByID0galN0YXQuemVyb3MocCwgcCk7XG4gICAgICB4ID0galN0YXQuY29weSh4KTtcblxuICAgICAgdmFyIGksaixrO1xuICAgICAgZm9yKGogPSAwOyBqIDwgcDsgaisrKXtcbiAgICAgICAgcltqXVtqXSA9IE1hdGguc3FydChzdW0ocmFuZ2UobikubWFwKGZ1bmN0aW9uKGkpe1xuICAgICAgICAgIHJldHVybiB4W2ldW2pdICogeFtpXVtqXTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbjsgaSsrKXtcbiAgICAgICAgICB4W2ldW2pdID0geFtpXVtqXSAvIHJbal1bal07XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGsgPSBqKzE7IGsgPCBwOyBrKyspe1xuICAgICAgICAgIHJbal1ba10gPSBzdW0ocmFuZ2UobikubWFwKGZ1bmN0aW9uKGkpe1xuICAgICAgICAgICAgcmV0dXJuIHhbaV1bal0gKiB4W2ldW2tdO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBuOyBpKyspe1xuICAgICAgICAgICAgeFtpXVtrXSA9IHhbaV1ba10gLSB4W2ldW2pdKnJbal1ba107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gW3gsIHJdO1xuICAgIH1cblxuICAgIHJldHVybiBxcjI7XG4gIH0oKSksXG5cbiAgbHN0c3E6IChmdW5jdGlvbigpIHtcbiAgICAvLyBzb2x2ZSBsZWFzdCBzcXVhcmQgcHJvYmxlbSBmb3IgQXg9YiBhcyBRUiBkZWNvbXBvc2l0aW9uIHdheSBpZiBiIGlzXG4gICAgLy8gW1tiMV0sW2IyXSxbYjNdXSBmb3JtIHdpbGwgcmV0dXJuIFtbeDFdLFt4Ml0sW3gzXV0gYXJyYXkgZm9ybSBzb2x1dGlvblxuICAgIC8vIGVsc2UgYiBpcyBbYjEsYjIsYjNdIGZvcm0gd2lsbCByZXR1cm4gW3gxLHgyLHgzXSBhcnJheSBmb3JtIHNvbHV0aW9uXG4gICAgZnVuY3Rpb24gUl9JKEEpIHtcbiAgICAgIEEgPSBqU3RhdC5jb3B5KEEpO1xuICAgICAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgICAgIHZhciBJID0galN0YXQuaWRlbnRpdHkoc2l6ZSk7XG4gICAgICBqU3RhdC5hcmFuZ2Uoc2l6ZSAtIDEsIC0xLCAtMSkuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGpTdGF0LnNsaWNlQXNzaWduKFxuICAgICAgICAgICAgSSwgeyByb3c6IGkgfSwgalN0YXQuZGl2aWRlKGpTdGF0LnNsaWNlKEksIHsgcm93OiBpIH0pLCBBW2ldW2ldKSk7XG4gICAgICAgIGpTdGF0LnNsaWNlQXNzaWduKFxuICAgICAgICAgICAgQSwgeyByb3c6IGkgfSwgalN0YXQuZGl2aWRlKGpTdGF0LnNsaWNlKEEsIHsgcm93OiBpIH0pLCBBW2ldW2ldKSk7XG4gICAgICAgIGpTdGF0LmFyYW5nZShpKS5mb3JFYWNoKGZ1bmN0aW9uKGopIHtcbiAgICAgICAgICB2YXIgYyA9IGpTdGF0Lm11bHRpcGx5KEFbal1baV0sIC0xKTtcbiAgICAgICAgICB2YXIgQWogPSBqU3RhdC5zbGljZShBLCB7IHJvdzogaiB9KTtcbiAgICAgICAgICB2YXIgY0FpID0galN0YXQubXVsdGlwbHkoalN0YXQuc2xpY2UoQSwgeyByb3c6IGkgfSksIGMpO1xuICAgICAgICAgIGpTdGF0LnNsaWNlQXNzaWduKEEsIHsgcm93OiBqIH0sIGpTdGF0LmFkZChBaiwgY0FpKSk7XG4gICAgICAgICAgdmFyIElqID0galN0YXQuc2xpY2UoSSwgeyByb3c6IGogfSk7XG4gICAgICAgICAgdmFyIGNJaSA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0LnNsaWNlKEksIHsgcm93OiBpIH0pLCBjKTtcbiAgICAgICAgICBqU3RhdC5zbGljZUFzc2lnbihJLCB7IHJvdzogaiB9LCBqU3RhdC5hZGQoSWosIGNJaSkpO1xuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gSTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBxcl9zb2x2ZShBLCBiKXtcbiAgICAgIHZhciBhcnJheV9tb2RlID0gZmFsc2U7XG4gICAgICBpZiAoYlswXS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBbYzEsYzIsYzNdIG1vZGVcbiAgICAgICAgYiA9IGIubWFwKGZ1bmN0aW9uKHgpeyByZXR1cm4gW3hdIH0pO1xuICAgICAgICBhcnJheV9tb2RlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBRUiA9IGpTdGF0LlFSKEEpO1xuICAgICAgdmFyIFEgPSBRUlswXTtcbiAgICAgIHZhciBSID0gUVJbMV07XG4gICAgICB2YXIgYXR0cnMgPSBBWzBdLmxlbmd0aDtcbiAgICAgIHZhciBRMSA9IGpTdGF0LnNsaWNlKFEse2NvbDp7ZW5kOmF0dHJzfX0pO1xuICAgICAgdmFyIFIxID0galN0YXQuc2xpY2UoUix7cm93OntlbmQ6YXR0cnN9fSk7XG4gICAgICB2YXIgUkkgPSBSX0koUjEpO1xuICAgICAgdmFyIFEyID0galN0YXQudHJhbnNwb3NlKFExKTtcblxuICAgICAgaWYoUTJbMF0ubGVuZ3RoID09PSB1bmRlZmluZWQpe1xuICAgICAgICBRMiA9IFtRMl07IC8vIFRoZSBjb25mdXNpbmcgalN0YXQubXVsdGlmbHkgaW1wbGVtZW50YXRpb24gdGhyZWF0IG5hdHVyZSBwcm9jZXNzIGFnYWluLlxuICAgICAgfVxuXG4gICAgICB2YXIgeCA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0Lm11bHRpcGx5KFJJLCBRMiksIGIpO1xuXG4gICAgICBpZih4Lmxlbmd0aCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgeCA9IFtbeF1dOyAvLyBUaGUgY29uZnVzaW5nIGpTdGF0Lm11bHRpZmx5IGltcGxlbWVudGF0aW9uIHRocmVhdCBuYXR1cmUgcHJvY2VzcyBhZ2Fpbi5cbiAgICAgIH1cblxuXG4gICAgICBpZiAoYXJyYXlfbW9kZSlcbiAgICAgICAgcmV0dXJuIHgubWFwKGZ1bmN0aW9uKGkpeyByZXR1cm4gaVswXSB9KTtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cblxuICAgIHJldHVybiBxcl9zb2x2ZTtcbiAgfSgpKSxcblxuICBqYWNvYmk6IGZ1bmN0aW9uIGphY29iaShhKSB7XG4gICAgdmFyIGNvbmRpdGlvbiA9IDE7XG4gICAgdmFyIG4gPSBhLmxlbmd0aDtcbiAgICB2YXIgZSA9IGpTdGF0LmlkZW50aXR5KG4sIG4pO1xuICAgIHZhciBldiA9IFtdO1xuICAgIHZhciBiLCBpLCBqLCBwLCBxLCBtYXhpbSwgdGhldGEsIHM7XG4gICAgLy8gY29uZGl0aW9uID09PSAxIG9ubHkgaWYgdG9sZXJhbmNlIGlzIG5vdCByZWFjaGVkXG4gICAgd2hpbGUgKGNvbmRpdGlvbiA9PT0gMSkge1xuICAgICAgbWF4aW0gPSBhWzBdWzFdO1xuICAgICAgcCA9IDA7XG4gICAgICBxID0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICAgIGlmIChpICE9IGopIHtcbiAgICAgICAgICAgIGlmIChtYXhpbSA8IE1hdGguYWJzKGFbaV1bal0pKSB7XG4gICAgICAgICAgICAgIG1heGltID0gTWF0aC5hYnMoYVtpXVtqXSk7XG4gICAgICAgICAgICAgIHAgPSBpO1xuICAgICAgICAgICAgICBxID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChhW3BdW3BdID09PSBhW3FdW3FdKVxuICAgICAgICB0aGV0YSA9IChhW3BdW3FdID4gMCkgPyBNYXRoLlBJIC8gNCA6IC1NYXRoLlBJIC8gNDtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhldGEgPSBNYXRoLmF0YW4oMiAqIGFbcF1bcV0gLyAoYVtwXVtwXSAtIGFbcV1bcV0pKSAvIDI7XG4gICAgICBzID0galN0YXQuaWRlbnRpdHkobiwgbik7XG4gICAgICBzW3BdW3BdID0gTWF0aC5jb3ModGhldGEpO1xuICAgICAgc1twXVtxXSA9IC1NYXRoLnNpbih0aGV0YSk7XG4gICAgICBzW3FdW3BdID0gTWF0aC5zaW4odGhldGEpO1xuICAgICAgc1txXVtxXSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICAgIC8vIGVpZ2VuIHZlY3RvciBtYXRyaXhcbiAgICAgIGUgPSBqU3RhdC5tdWx0aXBseShlLCBzKTtcbiAgICAgIGIgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYocyksIGEpLCBzKTtcbiAgICAgIGEgPSBiO1xuICAgICAgY29uZGl0aW9uID0gMDtcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIGlmIChpICE9IGogJiYgTWF0aC5hYnMoYVtpXVtqXSkgPiAwLjAwMSkge1xuICAgICAgICAgICAgY29uZGl0aW9uID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykgZXYucHVzaChhW2ldW2ldKTtcbiAgICAvL3JldHVybnMgYm90aCB0aGUgZWlnZW52YWx1ZSBhbmQgZWlnZW5tYXRyaXhcbiAgICByZXR1cm4gW2UsIGV2XTtcbiAgfSxcblxuICBydW5nZWt1dHRhOiBmdW5jdGlvbiBydW5nZWt1dHRhKGYsIGgsIHAsIHRfaiwgdV9qLCBvcmRlcikge1xuICAgIHZhciBrMSwgazIsIHVfajEsIGszLCBrNDtcbiAgICBpZiAob3JkZXIgPT09IDIpIHtcbiAgICAgIHdoaWxlICh0X2ogPD0gcCkge1xuICAgICAgICBrMSA9IGggKiBmKHRfaiwgdV9qKTtcbiAgICAgICAgazIgPSBoICogZih0X2ogKyBoLCB1X2ogKyBrMSk7XG4gICAgICAgIHVfajEgPSB1X2ogKyAoazEgKyBrMikgLyAyO1xuICAgICAgICB1X2ogPSB1X2oxO1xuICAgICAgICB0X2ogPSB0X2ogKyBoO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JkZXIgPT09IDQpIHtcbiAgICAgIHdoaWxlICh0X2ogPD0gcCkge1xuICAgICAgICBrMSA9IGggKiBmKHRfaiwgdV9qKTtcbiAgICAgICAgazIgPSBoICogZih0X2ogKyBoIC8gMiwgdV9qICsgazEgLyAyKTtcbiAgICAgICAgazMgPSBoICogZih0X2ogKyBoIC8gMiwgdV9qICsgazIgLyAyKTtcbiAgICAgICAgazQgPSBoICogZih0X2ogK2gsIHVfaiArIGszKTtcbiAgICAgICAgdV9qMSA9IHVfaiArIChrMSArIDIgKiBrMiArIDIgKiBrMyArIGs0KSAvIDY7XG4gICAgICAgIHVfaiA9IHVfajE7XG4gICAgICAgIHRfaiA9IHRfaiArIGg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1X2o7XG4gIH0sXG5cbiAgcm9tYmVyZzogZnVuY3Rpb24gcm9tYmVyZyhmLCBhLCBiLCBvcmRlcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaCA9IChiIC0gYSkgLyAyO1xuICAgIHZhciB4ID0gW107XG4gICAgdmFyIGgxID0gW107XG4gICAgdmFyIGcgPSBbXTtcbiAgICB2YXIgbSwgYTEsIGosIGssIEk7XG4gICAgd2hpbGUgKGkgPCBvcmRlciAvIDIpIHtcbiAgICAgIEkgPSBmKGEpO1xuICAgICAgZm9yIChqID0gYSwgayA9IDA7IGogPD0gYjsgaiA9IGogKyBoLCBrKyspIHhba10gPSBqO1xuICAgICAgbSA9IHgubGVuZ3RoO1xuICAgICAgZm9yIChqID0gMTsgaiA8IG0gLSAxOyBqKyspIHtcbiAgICAgICAgSSArPSAoKChqICUgMikgIT09IDApID8gNCA6IDIpICogZih4W2pdKTtcbiAgICAgIH1cbiAgICAgIEkgPSAoaCAvIDMpICogKEkgKyBmKGIpKTtcbiAgICAgIGdbaV0gPSBJO1xuICAgICAgaCAvPSAyO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBhMSA9IGcubGVuZ3RoO1xuICAgIG0gPSAxO1xuICAgIHdoaWxlIChhMSAhPT0gMSkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGExIC0gMTsgaisrKVxuICAgICAgaDFbal0gPSAoKE1hdGgucG93KDQsIG0pKSAqIGdbaiArIDFdIC0gZ1tqXSkgLyAoTWF0aC5wb3coNCwgbSkgLSAxKTtcbiAgICAgIGExID0gaDEubGVuZ3RoO1xuICAgICAgZyA9IGgxO1xuICAgICAgaDEgPSBbXTtcbiAgICAgIG0rKztcbiAgICB9XG4gICAgcmV0dXJuIGc7XG4gIH0sXG5cbiAgcmljaGFyZHNvbjogZnVuY3Rpb24gcmljaGFyZHNvbihYLCBmLCB4LCBoKSB7XG4gICAgZnVuY3Rpb24gcG9zKFgsIHgpIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBuID0gWC5sZW5ndGg7XG4gICAgICB2YXIgcDtcbiAgICAgIGZvciAoOyBpIDwgbjsgaSsrKVxuICAgICAgICBpZiAoWFtpXSA9PT0geCkgcCA9IGk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgdmFyIGhfbWluID0gTWF0aC5hYnMoeCAtIFhbcG9zKFgsIHgpICsgMV0pO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgZyA9IFtdO1xuICAgIHZhciBoMSA9IFtdO1xuICAgIHZhciB5MSwgeTIsIG0sIGEsIGo7XG4gICAgd2hpbGUgKGggPj0gaF9taW4pIHtcbiAgICAgIHkxID0gcG9zKFgsIHggKyBoKTtcbiAgICAgIHkyID0gcG9zKFgsIHgpO1xuICAgICAgZ1tpXSA9IChmW3kxXSAtIDIgKiBmW3kyXSArIGZbMiAqIHkyIC0geTFdKSAvIChoICogaCk7XG4gICAgICBoIC89IDI7XG4gICAgICBpKys7XG4gICAgfVxuICAgIGEgPSBnLmxlbmd0aDtcbiAgICBtID0gMTtcbiAgICB3aGlsZSAoYSAhPSAxKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgYSAtIDE7IGorKylcbiAgICAgICAgaDFbal0gPSAoKE1hdGgucG93KDQsIG0pKSAqIGdbaiArIDFdIC0gZ1tqXSkgLyAoTWF0aC5wb3coNCwgbSkgLSAxKTtcbiAgICAgIGEgPSBoMS5sZW5ndGg7XG4gICAgICBnID0gaDE7XG4gICAgICBoMSA9IFtdO1xuICAgICAgbSsrO1xuICAgIH1cbiAgICByZXR1cm4gZztcbiAgfSxcblxuICBzaW1wc29uOiBmdW5jdGlvbiBzaW1wc29uKGYsIGEsIGIsIG4pIHtcbiAgICB2YXIgaCA9IChiIC0gYSkgLyBuO1xuICAgIHZhciBJID0gZihhKTtcbiAgICB2YXIgeCA9IFtdO1xuICAgIHZhciBqID0gYTtcbiAgICB2YXIgayA9IDA7XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciBtO1xuICAgIGZvciAoOyBqIDw9IGI7IGogPSBqICsgaCwgaysrKVxuICAgICAgeFtrXSA9IGo7XG4gICAgbSA9IHgubGVuZ3RoO1xuICAgIGZvciAoOyBpIDwgbSAtIDE7IGkrKykge1xuICAgICAgSSArPSAoKGkgJSAyICE9PSAwKSA/IDQgOiAyKSAqIGYoeFtpXSk7XG4gICAgfVxuICAgIHJldHVybiAoaCAvIDMpICogKEkgKyBmKGIpKTtcbiAgfSxcblxuICBoZXJtaXRlOiBmdW5jdGlvbiBoZXJtaXRlKFgsIEYsIGRGLCB2YWx1ZSkge1xuICAgIHZhciBuID0gWC5sZW5ndGg7XG4gICAgdmFyIHAgPSAwO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbCA9IFtdO1xuICAgIHZhciBkbCA9IFtdO1xuICAgIHZhciBBID0gW107XG4gICAgdmFyIEIgPSBbXTtcbiAgICB2YXIgajtcbiAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgbFtpXSA9IDE7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChpICE9IGopIGxbaV0gKj0gKHZhbHVlIC0gWFtqXSkgLyAoWFtpXSAtIFhbal0pO1xuICAgICAgfVxuICAgICAgZGxbaV0gPSAwO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBpZiAoaSAhPSBqKSBkbFtpXSArPSAxIC8gKFggW2ldIC0gWFtqXSk7XG4gICAgICB9XG4gICAgICBBW2ldID0gKDEgLSAyICogKHZhbHVlIC0gWFtpXSkgKiBkbFtpXSkgKiAobFtpXSAqIGxbaV0pO1xuICAgICAgQltpXSA9ICh2YWx1ZSAtIFhbaV0pICogKGxbaV0gKiBsW2ldKTtcbiAgICAgIHAgKz0gKEFbaV0gKiBGW2ldICsgQltpXSAqIGRGW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0sXG5cbiAgbGFncmFuZ2U6IGZ1bmN0aW9uIGxhZ3JhbmdlKFgsIEYsIHZhbHVlKSB7XG4gICAgdmFyIHAgPSAwO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaiwgbDtcbiAgICB2YXIgbiA9IFgubGVuZ3RoO1xuICAgIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBsID0gRltpXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGhlIGxhZ3JhbmdlIHBvbHlub21pYWwgTF9pXG4gICAgICAgIGlmIChpICE9IGopIGwgKj0gKHZhbHVlIC0gWFtqXSkgLyAoWFtpXSAtIFhbal0pO1xuICAgICAgfVxuICAgICAgLy8gYWRkaW5nIHRoZSBsYWdyYW5nZSBwb2x5bm9taWFscyBmb3VuZCBhYm92ZVxuICAgICAgcCArPSBsO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSxcblxuICBjdWJpY19zcGxpbmU6IGZ1bmN0aW9uIGN1YmljX3NwbGluZShYLCBGLCB2YWx1ZSkge1xuICAgIHZhciBuID0gWC5sZW5ndGg7XG4gICAgdmFyIGkgPSAwLCBqO1xuICAgIHZhciBBID0gW107XG4gICAgdmFyIEIgPSBbXTtcbiAgICB2YXIgYWxwaGEgPSBbXTtcbiAgICB2YXIgYyA9IFtdO1xuICAgIHZhciBoID0gW107XG4gICAgdmFyIGIgPSBbXTtcbiAgICB2YXIgZCA9IFtdO1xuICAgIGZvciAoOyBpIDwgbiAtIDE7IGkrKylcbiAgICAgIGhbaV0gPSBYW2kgKyAxXSAtIFhbaV07XG4gICAgYWxwaGFbMF0gPSAwO1xuICAgIGZvciAoaSA9IDE7IGkgPCBuIC0gMTsgaSsrKSB7XG4gICAgICBhbHBoYVtpXSA9ICgzIC8gaFtpXSkgKiAoRltpICsgMV0gLSBGW2ldKSAtXG4gICAgICAgICAgKDMgLyBoW2ktMV0pICogKEZbaV0gLSBGW2ktMV0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAxOyBpIDwgbiAtIDE7IGkrKykge1xuICAgICAgQVtpXSA9IFtdO1xuICAgICAgQltpXSA9IFtdO1xuICAgICAgQVtpXVtpLTFdID0gaFtpLTFdO1xuICAgICAgQVtpXVtpXSA9IDIgKiAoaFtpIC0gMV0gKyBoW2ldKTtcbiAgICAgIEFbaV1baSsxXSA9IGhbaV07XG4gICAgICBCW2ldWzBdID0gYWxwaGFbaV07XG4gICAgfVxuICAgIGMgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoQSksIEIpO1xuICAgIGZvciAoaiA9IDA7IGogPCBuIC0gMTsgaisrKSB7XG4gICAgICBiW2pdID0gKEZbaiArIDFdIC0gRltqXSkgLyBoW2pdIC0gaFtqXSAqIChjW2ogKyAxXVswXSArIDIgKiBjW2pdWzBdKSAvIDM7XG4gICAgICBkW2pdID0gKGNbaiArIDFdWzBdIC0gY1tqXVswXSkgLyAoMyAqIGhbal0pO1xuICAgIH1cbiAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICBpZiAoWFtqXSA+IHZhbHVlKSBicmVhaztcbiAgICB9XG4gICAgaiAtPSAxO1xuICAgIHJldHVybiBGW2pdICsgKHZhbHVlIC0gWFtqXSkgKiBiW2pdICsgalN0YXQuc3EodmFsdWUtWFtqXSkgKlxuICAgICAgICBjW2pdICsgKHZhbHVlIC0gWFtqXSkgKiBqU3RhdC5zcSh2YWx1ZSAtIFhbal0pICogZFtqXTtcbiAgfSxcblxuICBnYXVzc19xdWFkcmF0dXJlOiBmdW5jdGlvbiBnYXVzc19xdWFkcmF0dXJlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2F1c3NfcXVhZHJhdHVyZSBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gIH0sXG5cbiAgUENBOiBmdW5jdGlvbiBQQ0EoWCkge1xuICAgIHZhciBtID0gWC5sZW5ndGg7XG4gICAgdmFyIG4gPSBYWzBdLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGosIHRlbXAxO1xuICAgIHZhciB1ID0gW107XG4gICAgdmFyIEQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHRlbXAyID0gW107XG4gICAgdmFyIFkgPSBbXTtcbiAgICB2YXIgQnQgPSBbXTtcbiAgICB2YXIgQiA9IFtdO1xuICAgIHZhciBDID0gW107XG4gICAgdmFyIFYgPSBbXTtcbiAgICB2YXIgVnQgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbTsgaSsrKSB7XG4gICAgICB1W2ldID0galN0YXQuc3VtKFhbaV0pIC8gbjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgQltpXSA9IFtdO1xuICAgICAgZm9yKGogPSAwOyBqIDwgbTsgaisrKSB7XG4gICAgICAgIEJbaV1bal0gPSBYW2pdW2ldIC0gdVtqXTtcbiAgICAgIH1cbiAgICB9XG4gICAgQiA9IGpTdGF0LnRyYW5zcG9zZShCKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbTsgaSsrKSB7XG4gICAgICBDW2ldID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgaisrKSB7XG4gICAgICAgIENbaV1bal0gPSAoalN0YXQuZG90KFtCW2ldXSwgW0Jbal1dKSkgLyAobiAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBqU3RhdC5qYWNvYmkoQyk7XG4gICAgViA9IHJlc3VsdFswXTtcbiAgICBEID0gcmVzdWx0WzFdO1xuICAgIFZ0ID0galN0YXQudHJhbnNwb3NlKFYpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBELmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGogPSBpOyBqIDwgRC5sZW5ndGg7IGorKykge1xuICAgICAgICBpZihEW2ldIDwgRFtqXSkgIHtcbiAgICAgICAgICB0ZW1wMSA9IERbaV07XG4gICAgICAgICAgRFtpXSA9IERbal07XG4gICAgICAgICAgRFtqXSA9IHRlbXAxO1xuICAgICAgICAgIHRlbXAyID0gVnRbaV07XG4gICAgICAgICAgVnRbaV0gPSBWdFtqXTtcbiAgICAgICAgICBWdFtqXSA9IHRlbXAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIEJ0ID0galN0YXQudHJhbnNwb3NlKEIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgIFlbaV0gPSBbXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBCdC5sZW5ndGg7IGorKykge1xuICAgICAgICBZW2ldW2pdID0galN0YXQuZG90KFtWdFtpXV0sIFtCdFtqXV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW1gsIEQsIFZ0LCBZXTtcbiAgfVxufSk7XG5cbi8vIGV4dGVuZCBqU3RhdC5mbiB3aXRoIG1ldGhvZHMgdGhhdCByZXF1aXJlIG9uZSBhcmd1bWVudFxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpTdGF0LmZuW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKGFyZywgZnVuYykge1xuICAgICAgdmFyIHRtcHRoaXMgPSB0aGlzO1xuICAgICAgLy8gY2hlY2sgZm9yIGNhbGxiYWNrXG4gICAgICBpZiAoZnVuYykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZ1bmMuY2FsbCh0bXB0aGlzLCBqU3RhdC5mbltwYXNzZnVuY10uY2FsbCh0bXB0aGlzLCBhcmcpKTtcbiAgICAgICAgfSwgMTUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgalN0YXRbcGFzc2Z1bmNdKHRoaXMsIGFyZykgPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4galN0YXRbcGFzc2Z1bmNdKHRoaXMsIGFyZyk7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBqU3RhdChqU3RhdFtwYXNzZnVuY10odGhpcywgYXJnKSk7XG4gICAgfTtcbiAgfShmdW5jc1tpXSkpO1xufSgnYWRkIGRpdmlkZSBtdWx0aXBseSBzdWJ0cmFjdCBkb3QgcG93IGV4cCBsb2cgYWJzIG5vcm0gYW5nbGUnLnNwbGl0KCcgJykpKTtcblxufShqU3RhdCwgTWF0aCkpO1xuKGZ1bmN0aW9uKGpTdGF0LCBNYXRoKSB7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIGlzTnVtYmVyID0galN0YXQudXRpbHMuaXNOdW1iZXI7XG52YXIgaXNBcnJheSA9IGpTdGF0LnV0aWxzLmlzQXJyYXk7XG5cbi8vIGZsYWc9PXRydWUgZGVub3RlcyB1c2Ugb2Ygc2FtcGxlIHN0YW5kYXJkIGRldmlhdGlvblxuLy8gWiBTdGF0aXN0aWNzXG5qU3RhdC5leHRlbmQoe1xuICAvLyAyIGRpZmZlcmVudCBwYXJhbWV0ZXIgbGlzdHM6XG4gIC8vICh2YWx1ZSwgbWVhbiwgc2QpXG4gIC8vICh2YWx1ZSwgYXJyYXksIGZsYWcpXG4gIHpzY29yZTogZnVuY3Rpb24genNjb3JlKCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGlmIChpc051bWJlcihhcmdzWzFdKSkge1xuICAgICAgcmV0dXJuIChhcmdzWzBdIC0gYXJnc1sxXSkgLyBhcmdzWzJdO1xuICAgIH1cbiAgICByZXR1cm4gKGFyZ3NbMF0gLSBqU3RhdC5tZWFuKGFyZ3NbMV0pKSAvIGpTdGF0LnN0ZGV2KGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9LFxuXG4gIC8vIDMgZGlmZmVyZW50IHBhcmFtdGVyIGxpc3RzOlxuICAvLyAodmFsdWUsIG1lYW4sIHNkLCBzaWRlcylcbiAgLy8gKHpzY29yZSwgc2lkZXMpXG4gIC8vICh2YWx1ZSwgYXJyYXksIHNpZGVzLCBmbGFnKVxuICB6dGVzdDogZnVuY3Rpb24genRlc3QoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIHo7XG4gICAgaWYgKGlzQXJyYXkoYXJnc1sxXSkpIHtcbiAgICAgIC8vICh2YWx1ZSwgYXJyYXksIHNpZGVzLCBmbGFnKVxuICAgICAgeiA9IGpTdGF0LnpzY29yZShhcmdzWzBdLGFyZ3NbMV0sYXJnc1szXSk7XG4gICAgICByZXR1cm4gKGFyZ3NbMl0gPT09IDEpID9cbiAgICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLU1hdGguYWJzKHopLCAwLCAxKSkgOlxuICAgICAgICAoalN0YXQubm9ybWFsLmNkZigtTWF0aC5hYnMoeiksIDAsIDEpKjIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPiAyKSB7XG4gICAgICAgIC8vICh2YWx1ZSwgbWVhbiwgc2QsIHNpZGVzKVxuICAgICAgICB6ID0galN0YXQuenNjb3JlKGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdKTtcbiAgICAgICAgcmV0dXJuIChhcmdzWzNdID09PSAxKSA/XG4gICAgICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLU1hdGguYWJzKHopLDAsMSkpIDpcbiAgICAgICAgICAoalN0YXQubm9ybWFsLmNkZigtTWF0aC5hYnMoeiksMCwxKSogMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAoenNjb3JlLCBzaWRlcylcbiAgICAgICAgeiA9IGFyZ3NbMF07XG4gICAgICAgIHJldHVybiAoYXJnc1sxXSA9PT0gMSkgP1xuICAgICAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC1NYXRoLmFicyh6KSwwLDEpKSA6XG4gICAgICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLU1hdGguYWJzKHopLDAsMSkqMik7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxualN0YXQuZXh0ZW5kKGpTdGF0LmZuLCB7XG4gIHpzY29yZTogZnVuY3Rpb24genNjb3JlKHZhbHVlLCBmbGFnKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAtIHRoaXMubWVhbigpKSAvIHRoaXMuc3RkZXYoZmxhZyk7XG4gIH0sXG5cbiAgenRlc3Q6IGZ1bmN0aW9uIHp0ZXN0KHZhbHVlLCBzaWRlcywgZmxhZykge1xuICAgIHZhciB6c2NvcmUgPSBNYXRoLmFicyh0aGlzLnpzY29yZSh2YWx1ZSwgZmxhZykpO1xuICAgIHJldHVybiAoc2lkZXMgPT09IDEpID9cbiAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC16c2NvcmUsIDAsIDEpKSA6XG4gICAgICAoalN0YXQubm9ybWFsLmNkZigtenNjb3JlLCAwLCAxKSAqIDIpO1xuICB9XG59KTtcblxuLy8gVCBTdGF0aXN0aWNzXG5qU3RhdC5leHRlbmQoe1xuICAvLyAyIHBhcmFtZXRlciBsaXN0c1xuICAvLyAodmFsdWUsIG1lYW4sIHNkLCBuKVxuICAvLyAodmFsdWUsIGFycmF5KVxuICB0c2NvcmU6IGZ1bmN0aW9uIHRzY29yZSgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gKGFyZ3MubGVuZ3RoID09PSA0KSA/XG4gICAgICAoKGFyZ3NbMF0gLSBhcmdzWzFdKSAvIChhcmdzWzJdIC8gTWF0aC5zcXJ0KGFyZ3NbM10pKSkgOlxuICAgICAgKChhcmdzWzBdIC0galN0YXQubWVhbihhcmdzWzFdKSkgL1xuICAgICAgIChqU3RhdC5zdGRldihhcmdzWzFdLCB0cnVlKSAvIE1hdGguc3FydChhcmdzWzFdLmxlbmd0aCkpKTtcbiAgfSxcblxuICAvLyAzIGRpZmZlcmVudCBwYXJhbXRlciBsaXN0czpcbiAgLy8gKHZhbHVlLCBtZWFuLCBzZCwgbiwgc2lkZXMpXG4gIC8vICh0c2NvcmUsIG4sIHNpZGVzKVxuICAvLyAodmFsdWUsIGFycmF5LCBzaWRlcylcbiAgdHRlc3Q6IGZ1bmN0aW9uIHR0ZXN0KCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciB0c2NvcmU7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSA1KSB7XG4gICAgICB0c2NvcmUgPSBNYXRoLmFicyhqU3RhdC50c2NvcmUoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSkpO1xuICAgICAgcmV0dXJuIChhcmdzWzRdID09PSAxKSA/XG4gICAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLXRzY29yZSwgYXJnc1szXS0xKSkgOlxuICAgICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC10c2NvcmUsIGFyZ3NbM10tMSkqMik7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihhcmdzWzFdKSkge1xuICAgICAgdHNjb3JlID0gTWF0aC5hYnMoYXJnc1swXSlcbiAgICAgIHJldHVybiAoYXJnc1syXSA9PSAxKSA/XG4gICAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLXRzY29yZSwgYXJnc1sxXS0xKSkgOlxuICAgICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC10c2NvcmUsIGFyZ3NbMV0tMSkgKiAyKTtcbiAgICB9XG4gICAgdHNjb3JlID0gTWF0aC5hYnMoalN0YXQudHNjb3JlKGFyZ3NbMF0sIGFyZ3NbMV0pKVxuICAgIHJldHVybiAoYXJnc1syXSA9PSAxKSA/XG4gICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC10c2NvcmUsIGFyZ3NbMV0ubGVuZ3RoLTEpKSA6XG4gICAgICAoalN0YXQuc3R1ZGVudHQuY2RmKC10c2NvcmUsIGFyZ3NbMV0ubGVuZ3RoLTEpICogMik7XG4gIH1cbn0pO1xuXG5qU3RhdC5leHRlbmQoalN0YXQuZm4sIHtcbiAgdHNjb3JlOiBmdW5jdGlvbiB0c2NvcmUodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlIC0gdGhpcy5tZWFuKCkpIC8gKHRoaXMuc3RkZXYodHJ1ZSkgLyBNYXRoLnNxcnQodGhpcy5jb2xzKCkpKTtcbiAgfSxcblxuICB0dGVzdDogZnVuY3Rpb24gdHRlc3QodmFsdWUsIHNpZGVzKSB7XG4gICAgcmV0dXJuIChzaWRlcyA9PT0gMSkgP1xuICAgICAgKDEgLSBqU3RhdC5zdHVkZW50dC5jZGYoTWF0aC5hYnModGhpcy50c2NvcmUodmFsdWUpKSwgdGhpcy5jb2xzKCktMSkpIDpcbiAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLU1hdGguYWJzKHRoaXMudHNjb3JlKHZhbHVlKSksIHRoaXMuY29scygpLTEpKjIpO1xuICB9XG59KTtcblxuLy8gRiBTdGF0aXN0aWNzXG5qU3RhdC5leHRlbmQoe1xuICAvLyBQYXJhbXRlciBsaXN0IGlzIGFzIGZvbGxvd3M6XG4gIC8vIChhcnJheTEsIGFycmF5MiwgYXJyYXkzLCAuLi4pXG4gIC8vIG9yIGl0IGlzIGFuIGFycmF5IG9mIGFycmF5c1xuICAvLyBhcnJheSBvZiBhcnJheXMgY29udmVyc2lvblxuICBhbm92YWZzY29yZTogZnVuY3Rpb24gYW5vdmFmc2NvcmUoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgZXhwVmFyLCBzYW1wbGUsIHNhbXBNZWFuLCBzYW1wU2FtcE1lYW4sIHRtcGFyZ3MsIHVuZXhwVmFyLCBpLCBqO1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdG1wYXJncyA9IG5ldyBBcnJheShhcmdzWzBdLmxlbmd0aCk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnc1swXS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0bXBhcmdzW2ldID0gYXJnc1swXVtpXTtcbiAgICAgIH1cbiAgICAgIGFyZ3MgPSB0bXBhcmdzO1xuICAgIH1cbiAgICAvLyBCdWlsZHMgc2FtcGxlIGFycmF5XG4gICAgc2FtcGxlID0gbmV3IEFycmF5KCk7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNhbXBsZSA9IHNhbXBsZS5jb25jYXQoYXJnc1tpXSk7XG4gICAgfVxuICAgIHNhbXBNZWFuID0galN0YXQubWVhbihzYW1wbGUpO1xuICAgIC8vIENvbXB1dGVzIHRoZSBleHBsYWluZWQgdmFyaWFuY2VcbiAgICBleHBWYXIgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBleHBWYXIgPSBleHBWYXIgKyBhcmdzW2ldLmxlbmd0aCAqIE1hdGgucG93KGpTdGF0Lm1lYW4oYXJnc1tpXSkgLSBzYW1wTWVhbiwgMik7XG4gICAgfVxuICAgIGV4cFZhciAvPSAoYXJncy5sZW5ndGggLSAxKTtcbiAgICAvLyBDb21wdXRlcyB1bmV4cGxhaW5lZCB2YXJpYW5jZVxuICAgIHVuZXhwVmFyID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgc2FtcFNhbXBNZWFuID0galN0YXQubWVhbihhcmdzW2ldKTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBhcmdzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHVuZXhwVmFyICs9IE1hdGgucG93KGFyZ3NbaV1bal0gLSBzYW1wU2FtcE1lYW4sIDIpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bmV4cFZhciAvPSAoc2FtcGxlLmxlbmd0aCAtIGFyZ3MubGVuZ3RoKTtcbiAgICByZXR1cm4gZXhwVmFyIC8gdW5leHBWYXI7XG4gIH0sXG5cbiAgLy8gMiBkaWZmZXJlbnQgcGFyYW10ZXIgc2V0dXBzXG4gIC8vIChhcnJheTEsIGFycmF5MiwgYXJyYXkzLCAuLi4pXG4gIC8vIChhbm92YWZzY29yZSwgZGYxLCBkZjIpXG4gIGFub3ZhZnRlc3Q6IGZ1bmN0aW9uIGFub3ZhZnRlc3QoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgZGYxLCBkZjIsIG4sIGk7XG4gICAgaWYgKGlzTnVtYmVyKGFyZ3NbMF0pKSB7XG4gICAgICByZXR1cm4gMSAtIGpTdGF0LmNlbnRyYWxGLmNkZihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICB9XG4gICAgdmFyIGFub3ZhZnNjb3JlID0galN0YXQuYW5vdmFmc2NvcmUoYXJncyk7XG4gICAgZGYxID0gYXJncy5sZW5ndGggLSAxO1xuICAgIG4gPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuID0gbiArIGFyZ3NbaV0ubGVuZ3RoO1xuICAgIH1cbiAgICBkZjIgPSBuIC0gZGYxIC0gMTtcbiAgICByZXR1cm4gMSAtIGpTdGF0LmNlbnRyYWxGLmNkZihhbm92YWZzY29yZSwgZGYxLCBkZjIpO1xuICB9LFxuXG4gIGZ0ZXN0OiBmdW5jdGlvbiBmdGVzdChmc2NvcmUsIGRmMSwgZGYyKSB7XG4gICAgcmV0dXJuIDEgLSBqU3RhdC5jZW50cmFsRi5jZGYoZnNjb3JlLCBkZjEsIGRmMik7XG4gIH1cbn0pO1xuXG5qU3RhdC5leHRlbmQoalN0YXQuZm4sIHtcbiAgYW5vdmFmc2NvcmU6IGZ1bmN0aW9uIGFub3ZhZnNjb3JlKCkge1xuICAgIHJldHVybiBqU3RhdC5hbm92YWZzY29yZSh0aGlzLnRvQXJyYXkoKSk7XG4gIH0sXG5cbiAgYW5vdmFmdGVzOiBmdW5jdGlvbiBhbm92YWZ0ZXMoKSB7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuID0gbiArIHRoaXNbaV0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQuZnRlc3QodGhpcy5hbm92YWZzY29yZSgpLCB0aGlzLmxlbmd0aCAtIDEsIG4gLSB0aGlzLmxlbmd0aCk7XG4gIH1cbn0pO1xuXG4vLyBUdWtleSdzIHJhbmdlIHRlc3RcbmpTdGF0LmV4dGVuZCh7XG4gIC8vIDIgcGFyYW1ldGVyIGxpc3RzXG4gIC8vIChtZWFuMSwgbWVhbjIsIG4xLCBuMiwgc2QpXG4gIC8vIChhcnJheTEsIGFycmF5Miwgc2QpXG4gIHFzY29yZTogZnVuY3Rpb24gcXNjb3JlKCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciBtZWFuMSwgbWVhbjIsIG4xLCBuMiwgc2Q7XG4gICAgaWYgKGlzTnVtYmVyKGFyZ3NbMF0pKSB7XG4gICAgICAgIG1lYW4xID0gYXJnc1swXTtcbiAgICAgICAgbWVhbjIgPSBhcmdzWzFdO1xuICAgICAgICBuMSA9IGFyZ3NbMl07XG4gICAgICAgIG4yID0gYXJnc1szXTtcbiAgICAgICAgc2QgPSBhcmdzWzRdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1lYW4xID0galN0YXQubWVhbihhcmdzWzBdKTtcbiAgICAgICAgbWVhbjIgPSBqU3RhdC5tZWFuKGFyZ3NbMV0pO1xuICAgICAgICBuMSA9IGFyZ3NbMF0ubGVuZ3RoO1xuICAgICAgICBuMiA9IGFyZ3NbMV0ubGVuZ3RoO1xuICAgICAgICBzZCA9IGFyZ3NbMl07XG4gICAgfVxuICAgIHJldHVybiBNYXRoLmFicyhtZWFuMSAtIG1lYW4yKSAvIChzZCAqIE1hdGguc3FydCgoMSAvIG4xICsgMSAvIG4yKSAvIDIpKTtcbiAgfSxcblxuICAvLyAzIGRpZmZlcmVudCBwYXJhbWV0ZXIgbGlzdHM6XG4gIC8vIChxc2NvcmUsIG4sIGspXG4gIC8vIChtZWFuMSwgbWVhbjIsIG4xLCBuMiwgc2QsIG4sIGspXG4gIC8vIChhcnJheTEsIGFycmF5Miwgc2QsIG4sIGspXG4gIHF0ZXN0OiBmdW5jdGlvbiBxdGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgIHZhciBxc2NvcmU7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICBxc2NvcmUgPSBhcmdzWzBdO1xuICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gNykge1xuICAgICAgcXNjb3JlID0galN0YXQucXNjb3JlKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xuICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoNSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHFzY29yZSA9IGpTdGF0LnFzY29yZShhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDMpO1xuICAgIH1cblxuICAgIHZhciBuID0gYXJnc1swXTtcbiAgICB2YXIgayA9IGFyZ3NbMV07XG5cbiAgICByZXR1cm4gMSAtIGpTdGF0LnR1a2V5LmNkZihxc2NvcmUsIGssIG4gLSBrKTtcbiAgfSxcblxuICB0dWtleWhzZDogZnVuY3Rpb24gdHVrZXloc2QoYXJyYXlzKSB7XG4gICAgdmFyIHNkID0galN0YXQucG9vbGVkc3RkZXYoYXJyYXlzKTtcbiAgICB2YXIgbWVhbnMgPSBhcnJheXMubWFwKGZ1bmN0aW9uIChhcnIpIHtyZXR1cm4galN0YXQubWVhbihhcnIpO30pO1xuICAgIHZhciBuID0gYXJyYXlzLnJlZHVjZShmdW5jdGlvbiAobiwgYXJyKSB7cmV0dXJuIG4gKyBhcnIubGVuZ3RoO30sIDApO1xuXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBhcnJheXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBwID0galN0YXQucXRlc3QobWVhbnNbaV0sIG1lYW5zW2pdLCBhcnJheXNbaV0ubGVuZ3RoLCBhcnJheXNbal0ubGVuZ3RoLCBzZCwgbiwgYXJyYXlzLmxlbmd0aCk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goW1tpLCBqXSwgcF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbn0pO1xuXG4vLyBFcnJvciBCb3VuZHNcbmpTdGF0LmV4dGVuZCh7XG4gIC8vIDIgZGlmZmVyZW50IHBhcmFtZXRlciBzZXR1cHNcbiAgLy8gKHZhbHVlLCBhbHBoYSwgc2QsIG4pXG4gIC8vICh2YWx1ZSwgYWxwaGEsIGFycmF5KVxuICBub3JtYWxjaTogZnVuY3Rpb24gbm9ybWFsY2koKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgYW5zID0gbmV3IEFycmF5KDIpLFxuICAgIGNoYW5nZTtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDQpIHtcbiAgICAgIGNoYW5nZSA9IE1hdGguYWJzKGpTdGF0Lm5vcm1hbC5pbnYoYXJnc1sxXSAvIDIsIDAsIDEpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMl0gLyBNYXRoLnNxcnQoYXJnc1szXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFuZ2UgPSBNYXRoLmFicyhqU3RhdC5ub3JtYWwuaW52KGFyZ3NbMV0gLyAyLCAwLCAxKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICBqU3RhdC5zdGRldihhcmdzWzJdKSAvIE1hdGguc3FydChhcmdzWzJdLmxlbmd0aCkpO1xuICAgIH1cbiAgICBhbnNbMF0gPSBhcmdzWzBdIC0gY2hhbmdlO1xuICAgIGFuc1sxXSA9IGFyZ3NbMF0gKyBjaGFuZ2U7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICAvLyAyIGRpZmZlcmVudCBwYXJhbWV0ZXIgc2V0dXBzXG4gIC8vICh2YWx1ZSwgYWxwaGEsIHNkLCBuKVxuICAvLyAodmFsdWUsIGFscGhhLCBhcnJheSlcbiAgdGNpOiBmdW5jdGlvbiB0Y2koKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgYW5zID0gbmV3IEFycmF5KDIpLFxuICAgIGNoYW5nZTtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDQpIHtcbiAgICAgIGNoYW5nZSA9IE1hdGguYWJzKGpTdGF0LnN0dWRlbnR0LmludihhcmdzWzFdIC8gMiwgYXJnc1szXSAtIDEpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMl0gLyBNYXRoLnNxcnQoYXJnc1szXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFuZ2UgPSBNYXRoLmFicyhqU3RhdC5zdHVkZW50dC5pbnYoYXJnc1sxXSAvIDIsIGFyZ3NbMl0ubGVuZ3RoIC0gMSkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgalN0YXQuc3RkZXYoYXJnc1syXSwgdHJ1ZSkgLyBNYXRoLnNxcnQoYXJnc1syXS5sZW5ndGgpKTtcbiAgICB9XG4gICAgYW5zWzBdID0gYXJnc1swXSAtIGNoYW5nZTtcbiAgICBhbnNbMV0gPSBhcmdzWzBdICsgY2hhbmdlO1xuICAgIHJldHVybiBhbnM7XG4gIH0sXG5cbiAgc2lnbmlmaWNhbnQ6IGZ1bmN0aW9uIHNpZ25pZmljYW50KHB2YWx1ZSwgYWxwaGEpIHtcbiAgICByZXR1cm4gcHZhbHVlIDwgYWxwaGE7XG4gIH1cbn0pO1xuXG5qU3RhdC5leHRlbmQoalN0YXQuZm4sIHtcbiAgbm9ybWFsY2k6IGZ1bmN0aW9uIG5vcm1hbGNpKHZhbHVlLCBhbHBoYSkge1xuICAgIHJldHVybiBqU3RhdC5ub3JtYWxjaSh2YWx1ZSwgYWxwaGEsIHRoaXMudG9BcnJheSgpKTtcbiAgfSxcblxuICB0Y2k6IGZ1bmN0aW9uIHRjaSh2YWx1ZSwgYWxwaGEpIHtcbiAgICByZXR1cm4galN0YXQudGNpKHZhbHVlLCBhbHBoYSwgdGhpcy50b0FycmF5KCkpO1xuICB9XG59KTtcblxuLy8gaW50ZXJuYWwgbWV0aG9kIGZvciBjYWxjdWxhdGluZyB0aGUgei1zY29yZSBmb3IgYSBkaWZmZXJlbmNlIG9mIHByb3BvcnRpb25zIHRlc3RcbmZ1bmN0aW9uIGRpZmZlcmVuY2VPZlByb3BvcnRpb25zKHAxLCBuMSwgcDIsIG4yKSB7XG4gIGlmIChwMSA+IDEgfHwgcDIgPiAxIHx8IHAxIDw9IDAgfHwgcDIgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BvcnRpb25zIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDFcIilcbiAgfVxuICB2YXIgcG9vbGVkID0gKHAxICogbjEgKyBwMiAqIG4yKSAvIChuMSArIG4yKTtcbiAgdmFyIHNlID0gTWF0aC5zcXJ0KHBvb2xlZCAqICgxIC0gcG9vbGVkKSAqICgoMS9uMSkgKyAoMS9uMikpKTtcbiAgcmV0dXJuIChwMSAtIHAyKSAvIHNlO1xufVxuXG4vLyBEaWZmZXJlbmNlIG9mIFByb3BvcnRpb25zXG5qU3RhdC5leHRlbmQoalN0YXQuZm4sIHtcbiAgb25lU2lkZWREaWZmZXJlbmNlT2ZQcm9wb3J0aW9uczogZnVuY3Rpb24gb25lU2lkZWREaWZmZXJlbmNlT2ZQcm9wb3J0aW9ucyhwMSwgbjEsIHAyLCBuMikge1xuICAgIHZhciB6ID0gZGlmZmVyZW5jZU9mUHJvcG9ydGlvbnMocDEsIG4xLCBwMiwgbjIpO1xuICAgIHJldHVybiBqU3RhdC56dGVzdCh6LCAxKTtcbiAgfSxcblxuICB0d29TaWRlZERpZmZlcmVuY2VPZlByb3BvcnRpb25zOiBmdW5jdGlvbiB0d29TaWRlZERpZmZlcmVuY2VPZlByb3BvcnRpb25zKHAxLCBuMSwgcDIsIG4yKSB7XG4gICAgdmFyIHogPSBkaWZmZXJlbmNlT2ZQcm9wb3J0aW9ucyhwMSwgbjEsIHAyLCBuMik7XG4gICAgcmV0dXJuIGpTdGF0Lnp0ZXN0KHosIDIpO1xuICB9XG59KTtcblxufShqU3RhdCwgTWF0aCkpO1xualN0YXQubW9kZWxzID0gKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIHN1Yl9yZWdyZXNzKGV4b2cpIHtcbiAgICB2YXIgdmFyX2NvdW50ID0gZXhvZ1swXS5sZW5ndGg7XG4gICAgdmFyIG1vZGVsTGlzdCA9IGpTdGF0LmFyYW5nZSh2YXJfY291bnQpLm1hcChmdW5jdGlvbihlbmRvZ19pbmRleCkge1xuICAgICAgdmFyIGV4b2dfaW5kZXggPVxuICAgICAgICAgIGpTdGF0LmFyYW5nZSh2YXJfY291bnQpLmZpbHRlcihmdW5jdGlvbihpKXtyZXR1cm4gaSE9PWVuZG9nX2luZGV4fSk7XG4gICAgICByZXR1cm4gb2xzKGpTdGF0LmNvbChleG9nLCBlbmRvZ19pbmRleCkubWFwKGZ1bmN0aW9uKHgpeyByZXR1cm4geFswXSB9KSxcbiAgICAgICAgICAgICAgICAgalN0YXQuY29sKGV4b2csIGV4b2dfaW5kZXgpKVxuICAgIH0pO1xuICAgIHJldHVybiBtb2RlbExpc3Q7XG4gIH1cblxuICAvLyBkbyBPTFMgbW9kZWwgcmVncmVzc1xuICAvLyBleG9nIGhhdmUgaW5jbHVkZSBjb25zdCBjb2x1bW5zICxpdCB3aWxsIG5vdCBnZW5lcmF0ZSBpdCAuSW4gZmFjdCwgZXhvZyBpc1xuICAvLyBcImRlc2lnbiBtYXRyaXhcIiBsb29rIGF0XG4gIC8vaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGVzaWduX21hdHJpeFxuICBmdW5jdGlvbiBvbHMoZW5kb2csIGV4b2cpIHtcbiAgICB2YXIgbm9icyA9IGVuZG9nLmxlbmd0aDtcbiAgICB2YXIgZGZfbW9kZWwgPSBleG9nWzBdLmxlbmd0aCAtIDE7XG4gICAgdmFyIGRmX3Jlc2lkID0gbm9icy1kZl9tb2RlbCAtIDE7XG4gICAgdmFyIGNvZWYgPSBqU3RhdC5sc3RzcShleG9nLCBlbmRvZyk7XG4gICAgdmFyIHByZWRpY3QgPVxuICAgICAgICBqU3RhdC5tdWx0aXBseShleG9nLCBjb2VmLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBbeF0gfSkpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uKHApIHsgcmV0dXJuIHBbMF0gfSk7XG4gICAgdmFyIHJlc2lkID0galN0YXQuc3VidHJhY3QoZW5kb2csIHByZWRpY3QpO1xuICAgIHZhciB5YmFyID0galN0YXQubWVhbihlbmRvZyk7XG4gICAgLy8gY29uc3RhbnQgY2F1c2UgcHJvYmxlbVxuICAgIC8vIHZhciBTU1QgPSBqU3RhdC5zdW0oZW5kb2cubWFwKGZ1bmN0aW9uKHkpIHtcbiAgICAvLyAgIHJldHVybiBNYXRoLnBvdyh5LXliYXIsMik7XG4gICAgLy8gfSkpO1xuICAgIHZhciBTU0UgPSBqU3RhdC5zdW0ocHJlZGljdC5tYXAoZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIE1hdGgucG93KGYgLSB5YmFyLCAyKTtcbiAgICB9KSk7XG4gICAgdmFyIFNTUiA9IGpTdGF0LnN1bShlbmRvZy5tYXAoZnVuY3Rpb24oeSwgaSkge1xuICAgICAgcmV0dXJuIE1hdGgucG93KHkgLSBwcmVkaWN0W2ldLCAyKTtcbiAgICB9KSk7XG4gICAgdmFyIFNTVCA9IFNTRSArIFNTUjtcbiAgICB2YXIgUjIgPSAoU1NFIC8gU1NUKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBleG9nOmV4b2csXG4gICAgICAgIGVuZG9nOmVuZG9nLFxuICAgICAgICBub2JzOm5vYnMsXG4gICAgICAgIGRmX21vZGVsOmRmX21vZGVsLFxuICAgICAgICBkZl9yZXNpZDpkZl9yZXNpZCxcbiAgICAgICAgY29lZjpjb2VmLFxuICAgICAgICBwcmVkaWN0OnByZWRpY3QsXG4gICAgICAgIHJlc2lkOnJlc2lkLFxuICAgICAgICB5YmFyOnliYXIsXG4gICAgICAgIFNTVDpTU1QsXG4gICAgICAgIFNTRTpTU0UsXG4gICAgICAgIFNTUjpTU1IsXG4gICAgICAgIFIyOlIyXG4gICAgfTtcbiAgfVxuXG4gIC8vIEgwOiBiX0k9MFxuICAvLyBIMTogYl9JIT0wXG4gIGZ1bmN0aW9uIHRfdGVzdChtb2RlbCkge1xuICAgIHZhciBzdWJNb2RlbExpc3QgPSBzdWJfcmVncmVzcyhtb2RlbC5leG9nKTtcbiAgICAvL3ZhciBzaWdtYUhhdD1qU3RhdC5zdGRldihtb2RlbC5yZXNpZCk7XG4gICAgdmFyIHNpZ21hSGF0ID0gTWF0aC5zcXJ0KG1vZGVsLlNTUiAvIChtb2RlbC5kZl9yZXNpZCkpO1xuICAgIHZhciBzZUJldGFIYXQgPSBzdWJNb2RlbExpc3QubWFwKGZ1bmN0aW9uKG1vZCkge1xuICAgICAgdmFyIFNTVCA9IG1vZC5TU1Q7XG4gICAgICB2YXIgUjIgPSBtb2QuUjI7XG4gICAgICByZXR1cm4gc2lnbWFIYXQgLyBNYXRoLnNxcnQoU1NUICogKDEgLSBSMikpO1xuICAgIH0pO1xuICAgIHZhciB0U3RhdGlzdGljID0gbW9kZWwuY29lZi5tYXAoZnVuY3Rpb24oY29lZiwgaSkge1xuICAgICAgcmV0dXJuIChjb2VmIC0gMCkgLyBzZUJldGFIYXRbaV07XG4gICAgfSk7XG4gICAgdmFyIHBWYWx1ZSA9IHRTdGF0aXN0aWMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHZhciBsZWZ0cHBmID0galN0YXQuc3R1ZGVudHQuY2RmKHQsIG1vZGVsLmRmX3Jlc2lkKTtcbiAgICAgIHJldHVybiAobGVmdHBwZiA+IDAuNSA/IDEgLSBsZWZ0cHBmIDogbGVmdHBwZikgKiAyO1xuICAgIH0pO1xuICAgIHZhciBjID0galN0YXQuc3R1ZGVudHQuaW52KDAuOTc1LCBtb2RlbC5kZl9yZXNpZCk7XG4gICAgdmFyIGludGVydmFsOTUgPSBtb2RlbC5jb2VmLm1hcChmdW5jdGlvbihjb2VmLCBpKSB7XG4gICAgICB2YXIgZCA9IGMgKiBzZUJldGFIYXRbaV07XG4gICAgICByZXR1cm4gW2NvZWYgLSBkLCBjb2VmICsgZF07XG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgICBzZTogc2VCZXRhSGF0LFxuICAgICAgICB0OiB0U3RhdGlzdGljLFxuICAgICAgICBwOiBwVmFsdWUsXG4gICAgICAgIHNpZ21hSGF0OiBzaWdtYUhhdCxcbiAgICAgICAgaW50ZXJ2YWw5NTogaW50ZXJ2YWw5NVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBGX3Rlc3QobW9kZWwpIHtcbiAgICB2YXIgRl9zdGF0aXN0aWMgPVxuICAgICAgICAobW9kZWwuUjIgLyBtb2RlbC5kZl9tb2RlbCkgLyAoKDEgLSBtb2RlbC5SMikgLyBtb2RlbC5kZl9yZXNpZCk7XG4gICAgdmFyIGZjZGYgPSBmdW5jdGlvbih4LCBuMSwgbjIpIHtcbiAgICAgIHJldHVybiBqU3RhdC5iZXRhLmNkZih4IC8gKG4yIC8gbjEgKyB4KSwgbjEgLyAyLCBuMiAvIDIpXG4gICAgfVxuICAgIHZhciBwdmFsdWUgPSAxIC0gZmNkZihGX3N0YXRpc3RpYywgbW9kZWwuZGZfbW9kZWwsIG1vZGVsLmRmX3Jlc2lkKTtcbiAgICByZXR1cm4geyBGX3N0YXRpc3RpYzogRl9zdGF0aXN0aWMsIHB2YWx1ZTogcHZhbHVlIH07XG4gIH1cblxuICBmdW5jdGlvbiBvbHNfd3JhcChlbmRvZywgZXhvZykge1xuICAgIHZhciBtb2RlbCA9IG9scyhlbmRvZyxleG9nKTtcbiAgICB2YXIgdHRlc3QgPSB0X3Rlc3QobW9kZWwpO1xuICAgIHZhciBmdGVzdCA9IEZfdGVzdChtb2RlbCk7XG4gICAgLy8gUHJvdmlkZSB0aGUgV2hlcnJ5IC8gRXpla2llbCAvIE1jTmVtYXIgLyBDb2hlbiBBZGp1c3RlZCBSXjJcbiAgICAvLyBXaGljaCBtYXRjaGVzIHRoZSAnYWRqdXN0ZWQgUl4yJyBwcm92aWRlZCBieSBSJ3MgbG0gcGFja2FnZVxuICAgIHZhciBhZGp1c3RfUjIgPVxuICAgICAgICAxIC0gKDEgLSBtb2RlbC5SMikgKiAoKG1vZGVsLm5vYnMgLSAxKSAvIChtb2RlbC5kZl9yZXNpZCkpO1xuICAgIG1vZGVsLnQgPSB0dGVzdDtcbiAgICBtb2RlbC5mID0gZnRlc3Q7XG4gICAgbW9kZWwuYWRqdXN0X1IyID0gYWRqdXN0X1IyO1xuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIHJldHVybiB7IG9sczogb2xzX3dyYXAgfTtcbn0pKCk7XG4vL1RvIHJlZ3Jlc3MsIHNpbXBseSBidWlsZCBYIG1hdHJpeFxuLy8oYXBwZW5kIGNvbHVtbiBvZiAxJ3MpIHVzaW5nXG4vL2J1aWxkeG1hdHJpeCBhbmQgYnVpbGQgdGhlIFlcbi8vbWF0cml4IHVzaW5nIGJ1aWxkeW1hdHJpeFxuLy8oc2ltcGx5IHRoZSB0cmFuc3Bvc2UpXG4vL2FuZCBydW4gcmVncmVzcy5cblxuXG5cbi8vUmVncmVzc2lvbnNcblxualN0YXQuZXh0ZW5kKHtcbiAgYnVpbGR4bWF0cml4OiBmdW5jdGlvbiBidWlsZHhtYXRyaXgoKXtcbiAgICAvL1BhcmFtZXRlcnMgd2lsbCBiZSBwYXNzZWQgaW4gYXMgc3VjaFxuICAgIC8vKGFycmF5MSxhcnJheTIsYXJyYXkzLC4uLilcbiAgICAvL2FzICh4MSx4Mix4MywuLi4pXG4gICAgLy9uZWVkcyB0byBiZSAoMSx4MSx4Mix4MywuLi4pXG4gICAgdmFyIG1hdHJpeFJvd3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yKHZhciBpPTA7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7XG4gICAgICB2YXIgYXJyYXkgPSBbMV07XG4gICAgICBtYXRyaXhSb3dzW2ldPSBhcnJheS5jb25jYXQoYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0KG1hdHJpeFJvd3MpO1xuXG4gIH0sXG5cbiAgYnVpbGRkeG1hdHJpeDogZnVuY3Rpb24gYnVpbGRkeG1hdHJpeCgpIHtcbiAgICAvL1BhcmFtdGVycyB3aWxsIGJlIHBhc3NlZCBpbiBhcyBzdWNoXG4gICAgLy8oW2FycmF5MSxhcnJheTIsLi4uXVxuICAgIHZhciBtYXRyaXhSb3dzID0gbmV3IEFycmF5KGFyZ3VtZW50c1swXS5sZW5ndGgpO1xuICAgIGZvcih2YXIgaT0wO2k8YXJndW1lbnRzWzBdLmxlbmd0aDtpKyspe1xuICAgICAgdmFyIGFycmF5ID0gWzFdXG4gICAgICBtYXRyaXhSb3dzW2ldPSBhcnJheS5jb25jYXQoYXJndW1lbnRzWzBdW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0KG1hdHJpeFJvd3MpO1xuXG4gIH0sXG5cbiAgYnVpbGRqeG1hdHJpeDogZnVuY3Rpb24gYnVpbGRqeG1hdHJpeChqTWF0KSB7XG4gICAgLy9CdWlsZHMgZnJvbSBqU3RhdCBNYXRyaXhcbiAgICB2YXIgcGFzcyA9IG5ldyBBcnJheShqTWF0Lmxlbmd0aClcbiAgICBmb3IodmFyIGk9MDtpPGpNYXQubGVuZ3RoO2krKyl7XG4gICAgICBwYXNzW2ldID0gak1hdFtpXTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0LmJ1aWxkZHhtYXRyaXgocGFzcyk7XG5cbiAgfSxcblxuICBidWlsZHltYXRyaXg6IGZ1bmN0aW9uIGJ1aWxkeW1hdHJpeChhcnJheSl7XG4gICAgcmV0dXJuIGpTdGF0KGFycmF5KS50cmFuc3Bvc2UoKTtcbiAgfSxcblxuICBidWlsZGp5bWF0cml4OiBmdW5jdGlvbiBidWlsZGp5bWF0cml4KGpNYXQpe1xuICAgIHJldHVybiBqTWF0LnRyYW5zcG9zZSgpO1xuICB9LFxuXG4gIG1hdHJpeG11bHQ6IGZ1bmN0aW9uIG1hdHJpeG11bHQoQSxCKXtcbiAgICB2YXIgaSwgaiwgaywgcmVzdWx0LCBzdW07XG4gICAgaWYgKEEuY29scygpID09IEIucm93cygpKSB7XG4gICAgICBpZihCLnJvd3MoKT4xKXtcbiAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBBLnJvd3MoKTsgaSsrKSB7XG4gICAgICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IEIuY29scygpOyBqKyspIHtcbiAgICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgQS5jb2xzKCk7IGsrKykge1xuICAgICAgICAgICAgICBzdW0gKz0gQS50b0FycmF5KClbaV1ba10gKiBCLnRvQXJyYXkoKVtrXVtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtpXVtqXSA9IHN1bTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpTdGF0KHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBBLnJvd3MoKTsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgQi5jb2xzKCk7IGorKykge1xuICAgICAgICAgIHN1bSA9IDA7XG4gICAgICAgICAgZm9yIChrID0gMDsgayA8IEEuY29scygpOyBrKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBBLnRvQXJyYXkoKVtpXVtrXSAqIEIudG9BcnJheSgpW2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHRbaV1bal0gPSBzdW07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBqU3RhdChyZXN1bHQpO1xuICAgIH1cbiAgfSxcblxuICAvL3JlZ3Jlc3MgYW5kIHJlZ3Jlc3N0IHRvIGJlIGZpeGVkXG5cbiAgcmVncmVzczogZnVuY3Rpb24gcmVncmVzcyhqTWF0WCxqTWF0WSl7XG4gICAgLy9wcmludChcInJlZ3Jlc3NpbiFcIik7XG4gICAgLy9wcmludChqTWF0WC50b0FycmF5KCkpO1xuICAgIHZhciBpbm5lcmludiA9IGpTdGF0Lnh0cmFuc3B4aW52KGpNYXRYKTtcbiAgICAvL3ByaW50KGlubmVyaW52KTtcbiAgICB2YXIgeHRyYW5zcCA9IGpNYXRYLnRyYW5zcG9zZSgpO1xuICAgIHZhciBuZXh0ID0galN0YXQubWF0cml4bXVsdChqU3RhdChpbm5lcmludikseHRyYW5zcCk7XG4gICAgcmV0dXJuIGpTdGF0Lm1hdHJpeG11bHQobmV4dCxqTWF0WSk7XG5cbiAgfSxcblxuICByZWdyZXNzdDogZnVuY3Rpb24gcmVncmVzc3Qoak1hdFgsak1hdFksc2lkZXMpe1xuICAgIHZhciBiZXRhID0galN0YXQucmVncmVzcyhqTWF0WCxqTWF0WSk7XG5cbiAgICB2YXIgY29tcGlsZSA9IHt9O1xuICAgIGNvbXBpbGUuYW5vdmEgPSB7fTtcbiAgICB2YXIgak1hdFlCYXIgPSBqU3RhdC5qTWF0WUJhcihqTWF0WCwgYmV0YSk7XG4gICAgY29tcGlsZS55QmFyID0gak1hdFlCYXI7XG4gICAgdmFyIHlBdmVyYWdlID0gak1hdFkubWVhbigpO1xuICAgIGNvbXBpbGUuYW5vdmEucmVzaWR1YWxzID0galN0YXQucmVzaWR1YWxzKGpNYXRZLCBqTWF0WUJhcik7XG5cbiAgICBjb21waWxlLmFub3ZhLnNzciA9IGpTdGF0LnNzcihqTWF0WUJhciwgeUF2ZXJhZ2UpO1xuICAgIGNvbXBpbGUuYW5vdmEubXNyID0gY29tcGlsZS5hbm92YS5zc3IgLyAoak1hdFhbMF0ubGVuZ3RoIC0gMSk7XG5cbiAgICBjb21waWxlLmFub3ZhLnNzZSA9IGpTdGF0LnNzZShqTWF0WSwgak1hdFlCYXIpO1xuICAgIGNvbXBpbGUuYW5vdmEubXNlID1cbiAgICAgICAgY29tcGlsZS5hbm92YS5zc2UgLyAoak1hdFkubGVuZ3RoIC0gKGpNYXRYWzBdLmxlbmd0aCAtIDEpIC0gMSk7XG5cbiAgICBjb21waWxlLmFub3ZhLnNzdCA9IGpTdGF0LnNzdChqTWF0WSwgeUF2ZXJhZ2UpO1xuICAgIGNvbXBpbGUuYW5vdmEubXN0ID0gY29tcGlsZS5hbm92YS5zc3QgLyAoak1hdFkubGVuZ3RoIC0gMSk7XG5cbiAgICBjb21waWxlLmFub3ZhLnIyID0gMSAtIChjb21waWxlLmFub3ZhLnNzZSAvIGNvbXBpbGUuYW5vdmEuc3N0KTtcbiAgICBpZiAoY29tcGlsZS5hbm92YS5yMiA8IDApIGNvbXBpbGUuYW5vdmEucjIgPSAwO1xuXG4gICAgY29tcGlsZS5hbm92YS5mcmF0aW8gPSBjb21waWxlLmFub3ZhLm1zciAvIGNvbXBpbGUuYW5vdmEubXNlO1xuICAgIGNvbXBpbGUuYW5vdmEucHZhbHVlID1cbiAgICAgICAgalN0YXQuYW5vdmFmdGVzdChjb21waWxlLmFub3ZhLmZyYXRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBqTWF0WFswXS5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGpNYXRZLmxlbmd0aCAtIChqTWF0WFswXS5sZW5ndGggLSAxKSAtIDEpO1xuXG4gICAgY29tcGlsZS5hbm92YS5ybXNlID0gTWF0aC5zcXJ0KGNvbXBpbGUuYW5vdmEubXNlKTtcblxuICAgIGNvbXBpbGUuYW5vdmEucjJhZGogPSAxIC0gKGNvbXBpbGUuYW5vdmEubXNlIC8gY29tcGlsZS5hbm92YS5tc3QpO1xuICAgIGlmIChjb21waWxlLmFub3ZhLnIyYWRqIDwgMCkgY29tcGlsZS5hbm92YS5yMmFkaiA9IDA7XG5cbiAgICBjb21waWxlLnN0YXRzID0gbmV3IEFycmF5KGpNYXRYWzBdLmxlbmd0aCk7XG4gICAgdmFyIGNvdmFyID0galN0YXQueHRyYW5zcHhpbnYoak1hdFgpO1xuICAgIHZhciBzZHMsIHRzLCBwcztcblxuICAgIGZvcih2YXIgaT0wOyBpPGJldGEubGVuZ3RoO2krKyl7XG4gICAgICBzZHM9TWF0aC5zcXJ0KGNvbXBpbGUuYW5vdmEubXNlICogTWF0aC5hYnMoY292YXJbaV1baV0pKTtcbiAgICAgIHRzPSBNYXRoLmFicyhiZXRhW2ldIC8gc2RzKTtcbiAgICAgIHBzPSBqU3RhdC50dGVzdCh0cywgak1hdFkubGVuZ3RoIC0gak1hdFhbMF0ubGVuZ3RoIC0gMSwgc2lkZXMpO1xuXG4gICAgICBjb21waWxlLnN0YXRzW2ldPVtiZXRhW2ldLCBzZHMsIHRzLCBwc107XG4gICAgfVxuXG4gICAgY29tcGlsZS5yZWdyZXNzID0gYmV0YTtcbiAgICByZXR1cm4gY29tcGlsZTtcbiAgfSxcblxuICB4dHJhbnNweDogZnVuY3Rpb24geHRyYW5zcHgoak1hdFgpe1xuICAgIHJldHVybiBqU3RhdC5tYXRyaXhtdWx0KGpNYXRYLnRyYW5zcG9zZSgpLGpNYXRYKTtcbiAgfSxcblxuXG4gIHh0cmFuc3B4aW52OiBmdW5jdGlvbiB4dHJhbnNweGludihqTWF0WCl7XG4gICAgdmFyIGlubmVyID0galN0YXQubWF0cml4bXVsdChqTWF0WC50cmFuc3Bvc2UoKSxqTWF0WCk7XG4gICAgdmFyIGlubmVyaW52ID0galN0YXQuaW52KGlubmVyKTtcbiAgICByZXR1cm4gaW5uZXJpbnY7XG4gIH0sXG5cbiAgak1hdFlCYXI6IGZ1bmN0aW9uIGpNYXRZQmFyKGpNYXRYLCBiZXRhKSB7XG4gICAgdmFyIHlCYXIgPSBqU3RhdC5tYXRyaXhtdWx0KGpNYXRYLCBiZXRhKTtcbiAgICByZXR1cm4gbmV3IGpTdGF0KHlCYXIpO1xuICB9LFxuXG4gIHJlc2lkdWFsczogZnVuY3Rpb24gcmVzaWR1YWxzKGpNYXRZLCBqTWF0WUJhcikge1xuICAgIHJldHVybiBqU3RhdC5tYXRyaXhzdWJ0cmFjdChqTWF0WSwgak1hdFlCYXIpO1xuICB9LFxuXG4gIHNzcjogZnVuY3Rpb24gc3NyKGpNYXRZQmFyLCB5QXZlcmFnZSkge1xuICAgIHZhciBzc3IgPSAwO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBqTWF0WUJhci5sZW5ndGg7IGkrKykge1xuICAgICAgc3NyICs9IE1hdGgucG93KGpNYXRZQmFyW2ldIC0geUF2ZXJhZ2UsIDIpO1xuICAgIH1cbiAgICByZXR1cm4gc3NyO1xuICB9LFxuXG4gIHNzZTogZnVuY3Rpb24gc3NlKGpNYXRZLCBqTWF0WUJhcikge1xuICAgIHZhciBzc2UgPSAwO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBqTWF0WS5sZW5ndGg7IGkrKykge1xuICAgICAgc3NlICs9IE1hdGgucG93KGpNYXRZW2ldIC0gak1hdFlCYXJbaV0sIDIpO1xuICAgIH1cbiAgICByZXR1cm4gc3NlO1xuICB9LFxuXG4gIHNzdDogZnVuY3Rpb24gc3N0KGpNYXRZLCB5QXZlcmFnZSkge1xuICAgIHZhciBzc3QgPSAwO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBqTWF0WS5sZW5ndGg7IGkrKykge1xuICAgICAgc3N0ICs9IE1hdGgucG93KGpNYXRZW2ldIC0geUF2ZXJhZ2UsIDIpO1xuICAgIH1cbiAgICByZXR1cm4gc3N0O1xuICB9LFxuXG4gIG1hdHJpeHN1YnRyYWN0OiBmdW5jdGlvbiBtYXRyaXhzdWJ0cmFjdChBLEIpe1xuICAgIHZhciBhbnMgPSBuZXcgQXJyYXkoQS5sZW5ndGgpO1xuICAgIGZvcih2YXIgaT0wO2k8QS5sZW5ndGg7aSsrKXtcbiAgICAgIGFuc1tpXSA9IG5ldyBBcnJheShBW2ldLmxlbmd0aCk7XG4gICAgICBmb3IodmFyIGo9MDtqPEFbaV0ubGVuZ3RoO2orKyl7XG4gICAgICAgIGFuc1tpXVtqXT1BW2ldW2pdLUJbaV1bal07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBqU3RhdChhbnMpO1xuICB9XG59KTtcbiAgLy8gTWFrZSBpdCBjb21wYXRpYmxlIHdpdGggcHJldmlvdXMgdmVyc2lvbi5cbiAgalN0YXQualN0YXQgPSBqU3RhdDtcblxuICByZXR1cm4galN0YXQ7XG59KTtcbiIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tICcuL1ZlY3RvcjInO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbnZhc0hlbHBlclxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHNoYXJlZENvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERyYXdDaXJjbGUocG9zaXRpb246IFZlY3RvcjIsIHJhZGlvdXM6IG51bWJlciwgY29sb3I6IHN0cmluZyA9IFwid2hpdGVcIiwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsRmlsbFN0eWxlID0gY29udGV4dC5maWxsU3R5bGU7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCByYWRpb3VzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgY29udGV4dC5maWxsKCk7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBvcmlnaW5hbEZpbGxTdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERyYXdMaW5lKGZyb206IFZlY3RvcjIsIHRvOiBWZWN0b3IyLCB0aGlja25lc3M6IG51bWJlciwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsTGluZVdpZHRoID0gY29udGV4dC5saW5lV2lkdGg7XHJcblxyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gdGhpY2tuZXNzO1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oZnJvbS54LCBmcm9tLnkpO1xyXG4gICAgICAgIGNvbnRleHQubGluZVRvKHRvLngsIHRvLnkpO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gb3JpZ2luYWxMaW5lV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEcmF3VGV4dCh0ZXh0OiBzdHJpbmcsIHBvc2l0aW9uOiBWZWN0b3IyLCBzaXplOiBudW1iZXIsIHRleHRBbGlnbjogQ2FudmFzVGV4dEFsaWduID0gXCJsZWZ0XCIsIGZvbnQ6IHN0cmluZyA9IFwic2Fucy1zZXJpZlwiLCBjb2xvcjogc3RyaW5nID0gXCJibGFja1wiLCBtb2Q6IHN0cmluZyA9IFwiXCIsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0KTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRmlsbFN0eWxlID0gY29udGV4dC5maWxsU3R5bGU7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGb250ID0gY29udGV4dC5mb250O1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dEFsaWduID0gY29udGV4dC50ZXh0QWxpZ247XHJcblxyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gKG1vZCA9PT0gXCJcIiA/IFwiXCIgOiBtb2QgKyAnICcpICsgc2l6ZS50b1N0cmluZygpICsgXCJweCBcIiArIGZvbnQ7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSB0ZXh0QWxpZ247XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCBwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBvcmlnaW5hbEZpbGxTdHlsZTtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBvcmlnaW5hbEZvbnQ7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBvcmlnaW5hbFRleHRBbGlnbjtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi9WZWN0b3IyXCI7XHJcbmltcG9ydCB7IENhbnZhc0hlbHBlciB9IGZyb20gXCIuL0NhbnZhc0hlbHBlclwiO1xyXG5cclxudHlwZSBvZmZzZXQgPSB7IHZhbHVlOiBudW1iZXI7IH07XHJcbmV4cG9ydCB0eXBlIE1hdHJpeFJvd3MgPSBBcnJheTxBcnJheTxudW1iZXI+PjtcclxuZXhwb3J0IGNvbnN0IE1hdHJpeFJvd3MgPSBjbGFzcyBleHRlbmRzIEFycmF5PEFycmF5PG51bWJlcj4+IHsgfTtcclxuXHJcbmV4cG9ydCBlbnVtIFNpZGUgeyBhYm92ZSwgdW5kZXIsIGxlZnQsIHJpZ2h0IH1cclxuXHJcbi8qKiBDbGFzcyByZXByZXNlbnRpbmcgYSBtYXRyaXggKi9cclxuZXhwb3J0IGNsYXNzIE1hdHJpeFxyXG57XHJcbiAgICAvLyNyZWdpb24gY29uZmlnXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNlbGxQaXhlbFNpemU6IG51bWJlciA9IDQwO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBsYWJlbFBpeGVsTWFyZ2luOiBudW1iZXIgPSA2O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYXRyaXhQaXhlbE1hcmdpbjogbnVtYmVyID0gMTI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNlbGxDb250ZW50Rm9udDogc3RyaW5nID0gXCIxMXB4IHNhbnMtc2VyaWZcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGFiZWxGb250OiBzdHJpbmcgPSBcImJvbGQgMTRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvKiogTnVtYmVycyBjb250YWluZWQgaW4gbWF0cml4LiBBY2Nlc3MgdGhlbSBsaWtlIG51bWJlcnNbcm93XVtjb2x1bW5dICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbnVtYmVyczogUmVhZG9ubHlBcnJheTxSZWFkb25seUFycmF5PG51bWJlcj4+O1xyXG4gICAgLyogbGlrZSB0aGlzOlxyXG4gICAgWzAsMF1bMCwxXVswLDJdXHJcbiAgICBbMSwwXVsxLDFdWzEsMl1cclxuICAgIFsyLDBdWzIsMV1bMiwyXVxyXG4gICAgKi9cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIHByb3BlcnRpZXNcclxuXHJcbiAgICAvKiogTnVtYmVyIG9mIHJvd3MgaW4gdGhpcyBtYXRyaXggKi9cclxuICAgIHB1YmxpYyBnZXQgUm93TnVtYmVyKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm51bWJlcnMubGVuZ3RoOyB9XHJcbiAgICBcclxuICAgIC8qKiBOdW1iZXIgb2YgY29sdW1ucyBpbiB0aGlzIG1hdHJpeCAqL1xyXG4gICAgcHVibGljIGdldCBDb2x1bW5OdW1iZXIoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubnVtYmVyc1swXS5sZW5ndGg7IH1cclxuXHJcbiAgICAvKiogSXMgdGhpcyBtYXRyaXggc3F1YXJlPyAqL1xyXG4gICAgcHVibGljIGdldCBJc1NxdWFyZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuUm93TnVtYmVyID09IHRoaXMuQ29sdW1uTnVtYmVyOyB9XHJcblxyXG4gICAgLyoqIE51bWJlciBvZiBwaXhlbHMgdGhpcyBtYXRyaXggdGFrZXMgb24geSBheGlzIG9mIGNhbnZhcyB3aGVuIGRyYXduIHVzaW5nIHRoaXMuRHJhdyAqL1xyXG4gICAgcHVibGljIGdldCBQaXhlbFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLkNvbHVtbk51bWJlciAqIE1hdHJpeC5jZWxsUGl4ZWxTaXplOyB9XHJcblxyXG4gICAgLyoqIE51bWJlciBvZiBwaXhlbHMgdGhpcyBtYXRyaXggdGFrZXMgb24geCBheGlzIG9mIGNhbnZhcyB3aGVuIGRyYXduIHVzaW5nIHRoaXMuRHJhdyAqL1xyXG4gICAgcHVibGljIGdldCBQaXhlbEhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gKHRoaXMuUm93TnVtYmVyICogTWF0cml4LmNlbGxQaXhlbFNpemUpICsgIE1hdHJpeC5sYWJlbFBpeGVsTWFyZ2lufVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIHByaXZhdGUgX2xhc3REcmF3UG9zaXRpb246IFZlY3RvcjIgPSBudWxsO1xyXG4gICAgXHJcbiAgICAvKiogTGFzdCBwb3NpdGlvbiBvbiB3aGljaCB0aGlzIE1hdHJpeCB3YXMgZHJhd24uIE51bGwgaWYgaXQgd2FzbnQgZHJhd24geWV0ICovXHJcbiAgICBwdWJsaWMgZ2V0IExhc3REcmF3UG9zaXRpb24oKTogVmVjdG9yMiB7IHJldHVybiB0aGlzLl9sYXN0RHJhd1Bvc2l0aW9uOyB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJvd3M6IE1hdHJpeFJvd3MpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uTnVtYmVyOiBudW1iZXIgPSByb3dzWzBdLmxlbmd0aDtcclxuICAgICAgICBjb25zdCByb3dzQ29weTogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKHJvd3MubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93cy5sZW5ndGg7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c0NvcHlbcm93XSA9IG5ldyBBcnJheTxudW1iZXI+KGNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgICAgIGlmIChyb3dzW3Jvd10ubGVuZ3RoICE9IGNvbHVtbk51bWJlcikgdGhyb3cgRXJyb3IoXCJJbmNvbnNpc3RlbnQgY29sdW1uIG51bWJlciBiZXR3ZWVuIHJvd3MgaW4gYSBtYXRyaXhcIik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBjb2x1bW5OdW1iZXI7IGNvbCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3dzQ29weVtyb3ddW2NvbF0gPSByb3dzW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3dzW3Jvd11bY29sXSA9PSB1bmRlZmluZWQgfHwgcm93c1tyb3ddW2NvbF0gPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBjb250ZW50IGluIG1hdHJpeCBjYW4ndCBiZSBudWxsL3VuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm51bWJlcnMgPSByb3dzQ29weTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRHJhd3MgdGhpcyBtYXRyaXggb24gSFRNTCBjYW52YXMgdXNpbmcgcHJvdmlkZWQgcmVuZGVyaW5nIGNvbnRleHQgYW5kIHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gcG9zaXRpb24gd2hlcmUgZHJhd2luZyBzdGFydHMgKHVwcGVyIGxlZnQgY29ybmVyKVxyXG4gICAgICogQHBhcmFtIGxhYmVsIG9wdGlvbmFsIGxhYmVsIGRpc3BsYXllZCBhYm92ZSB0aGlzIG1hdHJpeFxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgY2FudmFzIGNvbnRleHQgdXNlZCB0byBkcmF3IHRoaXMgbWF0cml4XHJcbiAgICAqL1xyXG4gICAgcHVibGljIERyYXcocG9zaXRpb246IFZlY3RvcjIsIGxhYmVsOiBzdHJpbmcgPSBcIlwiLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbFRleHRBbGlnbjogQ2FudmFzVGV4dEFsaWduID0gY29udGV4dC50ZXh0QWxpZ247XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGb250OiBzdHJpbmcgPSBjb250ZXh0LmZvbnQ7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IE1hdHJpeC5jZWxsQ29udGVudEZvbnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd051bSA9IDA7IHJvd051bSA8IHRoaXMubnVtYmVycy5sZW5ndGg7IHJvd051bSsrKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdzogUmVhZG9ubHlBcnJheTxudW1iZXI+ID0gdGhpcy5udW1iZXJzW3Jvd051bV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbE51bSA9IDA7IGNvbE51bSA8IHJvdy5sZW5ndGg7IGNvbE51bSsrKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbDogbnVtYmVyID0gcm93W2NvbE51bV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsUG9zaXRpb246IFZlY3RvcjIgPSBuZXcgVmVjdG9yMihwb3NpdGlvbi54ICsgKE1hdHJpeC5jZWxsUGl4ZWxTaXplICogY29sTnVtKSwgcG9zaXRpb24ueSArIChNYXRyaXguY2VsbFBpeGVsU2l6ZSAqIHJvd051bSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoY2VsbFBvc2l0aW9uLngsIGNlbGxQb3NpdGlvbi55LCBNYXRyaXguY2VsbFBpeGVsU2l6ZSwgTWF0cml4LmNlbGxQaXhlbFNpemUpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQocGFyc2VGbG9hdChjZWxsLnRvRml4ZWQoMykpLnRvU3RyaW5nKCksIGNlbGxQb3NpdGlvbi54ICsgKE1hdHJpeC5jZWxsUGl4ZWxTaXplIC8gMiksIGNlbGxQb3NpdGlvbi55ICsgKE1hdHJpeC5jZWxsUGl4ZWxTaXplIC8gMikpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhYmVsICE9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImxlZnRcIjtcclxuICAgICAgICAgICAgY29udGV4dC5mb250ID0gTWF0cml4LmxhYmVsRm9udDtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChsYWJlbCwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSAtIE1hdHJpeC5sYWJlbFBpeGVsTWFyZ2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gb3JpZ2luYWxUZXh0QWxpZ247XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gb3JpZ2luYWxGb250O1xyXG4gICAgICAgIHRoaXMuX2xhc3REcmF3UG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRHJhd3MgdGhpcyBtYXRyaXggbmV4dCB0byB3aGVyZSBvdGhlciBtYXRyaXggd2FzIGxhc3QgZHJhd24sIG1ha2luZyBzdXJlIHRoYXQgdGhleSB3b24ndCBvdmVybGFwXHJcbiAgICAgKiBAcGFyYW0gbWF0cml4IG1hdHJpeCBuZXh0IHRvIHdoaWNoIHRoaXMgbWF0cml4IHdpbGwgYmUgZHJhd25cclxuICAgICAqIEBwYXJhbSBzaWRlIG9uIHdoaWNoIHNpZGUgb2YgcHJvdmlkZWQgbWF0cml4IHRoaXMgbWF0cmljIHNob3VsZCBiZSBkcmF3blxyXG4gICAgICogQHBhcmFtIGxhYmVsIG9wdGlvbmFsIGxhYmVsIGRpc3BsYXllZCBhYm92ZSB0aGlzIG1hdHJpeFxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgY2FudmFzIGNvbnRleHQgdXNlZCB0byBkcmF3IHRoaXMgbWF0cml4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBEcmF3TmV4dFRvKG1hdHJpeDogTWF0cml4LCBzaWRlOiBTaWRlLCBsYWJlbDogc3RyaW5nID0gXCJcIiwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uID09IG51bGwpIHRocm93IEVycm9yKFwiQ2FuJ3QgZHJhdyBuZXh0IHRvIG1hdHJpeCB0aGF0IHdhc24ndCBkcmF3biB5ZXRcIik7XHJcblxyXG4gICAgICAgIGxldCBwb3NpdGlvbjogVmVjdG9yMjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChzaWRlKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgU2lkZS5hYm92ZTpcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjIobWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueCwgbWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueSAtIHRoaXMuUGl4ZWxIZWlnaHQgLSAoTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luICogMS41KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTaWRlLnVuZGVyOlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBuZXcgVmVjdG9yMihtYXRyaXguTGFzdERyYXdQb3NpdGlvbi54LCBtYXRyaXguTGFzdERyYXdQb3NpdGlvbi55ICsgbWF0cml4LlBpeGVsSGVpZ2h0ICsgKE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiAqIDEuNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2lkZS5sZWZ0OlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBuZXcgVmVjdG9yMihtYXRyaXguTGFzdERyYXdQb3NpdGlvbi54IC0gdGhpcy5QaXhlbFdpZHRoIC0gTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luLCBtYXRyaXguTGFzdERyYXdQb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNpZGUucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLnggKyBtYXRyaXguUGl4ZWxXaWR0aCArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgbWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgc2lkZSB2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5EcmF3KHBvc2l0aW9uLCBsYWJlbCwgY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlJvd051bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9ICdbJztcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLkNvbHVtbk51bWJlcjsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5udW1iZXJzW2ldW2pdICsgKChqICsxIDwgdGhpcy5Db2x1bW5OdW1iZXIpID8gJzsnIDogJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jcmVnaW9uIGZyb20gc3RyaW5nXHJcblxyXG4gICAgLyoqIFJldHVybnMgTWF0cml4IGNyZWF0ZWQgZnJvbSBzdHJpbmcgZnJvbWF0ZWQgbGlrZSBcIlsxLDIsM11bNCw1LDZdWzcsOCw5XVwiIG9yIG51bGwgaWYgc3RyaW5nIGlzIG5vdCBhIHZhbGlkIG1hdHJpeCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBpZiAoaW5wdXQubGVuZ3RoIDw9IDApIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0OiBvZmZzZXQgPSB7IHZhbHVlOiAwIH07XHJcblxyXG4gICAgICAgIHdoaWxlIChvZmZzZXQudmFsdWUgPCBpbnB1dC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5SZWFkUm93KGlucHV0LCBvZmZzZXQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc1ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBjb2x1bW5OdW1iZXI6IG51bWJlciA9IHJvd3NbMF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoY29sdW1uTnVtYmVyIDw9IDApIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzLmZvckVhY2gocm93ID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cubGVuZ3RoICE9IGNvbHVtbk51bWJlcikgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcm93LmZvckVhY2godmFsdWUgPT4geyBpZiAoaXNOYU4odmFsdWUpKSBpc1ZhbGlkID0gZmFsc2U7IH0pO1xyXG4gICAgICAgICAgICB9KTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkID8gbmV3IE1hdHJpeChyb3dzKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUmVhZFJvdyhpbnB1dDogc3RyaW5nLCBvZmZzZXQ6IG9mZnNldCk6IEFycmF5PG51bWJlcj5cclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3c6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIGlmIChpbnB1dFtvZmZzZXQudmFsdWVdID09ICdbJykgb2Zmc2V0LnZhbHVlKys7XHJcblxyXG4gICAgICAgIHdoaWxlIChvZmZzZXQudmFsdWUgPCBpbnB1dC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2hhcjogc3RyaW5nID0gaW5wdXRbb2Zmc2V0LnZhbHVlXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2hhciA9PSAnXScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldC52YWx1ZSsrO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaCh0aGlzLlJlYWROdW1iZXIoaW5wdXQsIG9mZnNldCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIFJlYWROdW1iZXIoaW5wdXQ6IHN0cmluZywgb2Zmc2V0OiBvZmZzZXQpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgICAgICB3aGlsZSAob2Zmc2V0LnZhbHVlIDwgaW5wdXQubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENoYXI6IHN0cmluZyA9IGlucHV0W29mZnNldC52YWx1ZV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudENoYXIgPT0gJ10nKSBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9mZnNldC52YWx1ZSsrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGFyID09ICcgJyB8fCBjdXJyZW50Q2hhciA9PSAnOycpIGJyZWFrO1xyXG4gICAgICAgICAgICBlbHNlIHZhbHVlICs9IGN1cnJlbnRDaGFyID09ICcsJyA/ICcuJyA6IGN1cnJlbnRDaGFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIG1hdGhcclxuXHJcbiAgICAvKiogUmV0dXJucyBuZXcgbWF0cml4IHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgdHJhbnNwb3NlIG9wZXJhdGlvbiBvbiB0aGlzIG1hdHJpeCAqL1xyXG4gICAgcHVibGljIFRyYW5zcG9zZSgpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCBuZXdOdW1iZXJzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3ModGhpcy5udW1iZXJzWzBdLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TnVtYmVycy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5ld051bWJlcnNbaV0gPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLm51bWJlcnMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMubnVtYmVycy5sZW5ndGg7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgdGhpcy5udW1iZXJzWzBdLmxlbmd0aDsgY29sdW1uKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5ld051bWJlcnNbY29sdW1uXVtyb3ddID0gdGhpcy5udW1iZXJzW3Jvd11bY29sdW1uXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgobmV3TnVtYmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJldHVybnMgbmV3IG1hdHJpeCB3aGljaCBpcyB0aGUgcmVzdWx0IG9mIHRoaXMgbWF0cml4IHggbWF0cml4IHBhc3NlZCBhcyBhbiBhcmd1bWVudCAqL1xyXG4gICAgcHVibGljIE11bHRpcGx5TWF0cml4KG1hdHJpeDogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKG1hdHJpeC5Sb3dOdW1iZXIgIT0gdGhpcy5Db2x1bW5OdW1iZXIpIHRocm93IG5ldyBFcnJvcihcIlRvIG11bHRpcGx5IG1hdHJpY2VzIGZpcnN0IG1hdHJpeCBtdXN0IGhhdmUgbnVtYmVyIG9mIGNvbHVtbnMgZXF1YWwgdG8gbnVtYmVyIG9mIHJvd3MgaW4gc2Vjb25kIG1hdHJpeFwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm93cyA9IG5ldyBNYXRyaXhSb3dzKHRoaXMuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlJvd051bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tpXSA9IG5ldyBBcnJheTxudW1iZXI+KG1hdHJpeC5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hdHJpeC5Db2x1bW5OdW1iZXI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5Db2x1bW5OdW1iZXI7IGsrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5udW1iZXJzW2ldW2tdICogbWF0cml4Lm51bWJlcnNba11bal07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93c1tpXVtqXSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBuZXcgbWF0cml4IHdoaWNoIGlzIHJlc3VsdCBvZiB0aGlzIG1hdHJpeCBiZWluZyBtdWx0aXBsaWVkIGJ5IHBhc3NlZCBudW1iZXIgKi9cclxuICAgIHB1YmxpYyBNdWx0aXBseVNjYWxhcihudW06IG51bWJlcik6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyh0aGlzLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Sb3dOdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NbaV0gPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5Db2x1bW5OdW1iZXI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm93c1tpXVtqXSA9IHRoaXMubnVtYmVyc1tpXVtqXSAqIG51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJldHVybnMgbmV3IG1hdHJpeCB3aGljaCBpcyByZXN1bHQgb2YgYWRkaW5nIHBhc3NlZCBtYXRyaXggdG8gdGhpcyBNYXRyaXggKi9cclxuICAgIHB1YmxpYyBBZGQobWF0cml4OiBNYXRyaXgpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5Sb3dOdW1iZXIgIT0gbWF0cml4LlJvd051bWJlciB8fCB0aGlzLkNvbHVtbk51bWJlciAhPSBtYXRyaXguQ29sdW1uTnVtYmVyKSB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IG1hdHJpY2VzIG9mIHRoZSBzYW1lIHNpemUgY2FuIGJlIGFkZGVkXCIpO1xyXG5cclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3ModGhpcy5Sb3dOdW1iZXIpXHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd051bSA9IDA7IHJvd051bSA8IHRoaXMuUm93TnVtYmVyOyByb3dOdW0rKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3Nbcm93TnVtXSA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sTnVtID0gMDsgY29sTnVtIDwgdGhpcy5Db2x1bW5OdW1iZXI7IGNvbE51bSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3dzW3Jvd051bV1bY29sTnVtXSA9IHRoaXMubnVtYmVyc1tyb3dOdW1dW2NvbE51bV0gKyBtYXRyaXgubnVtYmVyc1tyb3dOdW1dW2NvbE51bV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIGFuZCByZXR1cm5zIGRldGVybWluYW50IG9mIHRoaXMgbWF0cml4LiBUaHJvd3MgZXJyb3Igd2hlbiBjYWxsZWQgb24gbWF0cml4IHdoaWNoIGlzIG5vdCBzcXVhcmUgKi9cclxuICAgIHB1YmxpYyBnZXQgRGV0ZXJtaW5hbnQoKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLklzU3F1YXJlKSB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IHNxdWFyZSBtYXRyaWNlcyBoYXZlIGRldGVybWluYW50XCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5Db2x1bW5OdW1iZXIgPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bWJlcnNbMF1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuQ29sdW1uTnVtYmVyID09IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMubnVtYmVyc1swXVswXSAqIHRoaXMubnVtYmVyc1sxXVsxXSkgLSAodGhpcy5udW1iZXJzWzFdWzBdICogdGhpcy5udW1iZXJzWzBdWzFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IG5lZ2F0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sTnVtID0gMDsgY29sTnVtIDwgdGhpcy5Db2x1bW5OdW1iZXI7IGNvbE51bSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IHRoaXMuR2V0UGFydCgwLCBjb2xOdW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAobmVnYXRlID8gLW1hdHJpeC5EZXRlcm1pbmFudCA6IG1hdHJpeC5EZXRlcm1pbmFudCkgKiB0aGlzLm51bWJlcnNbMF1bY29sTnVtXTtcclxuICAgICAgICAgICAgICAgIG5lZ2F0ZSA9ICFuZWdhdGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG5ldyBtYXRyaXggd2hpY2ggaXMgdGhpcyBtYXRyaXggYnV0IHdpdGhvdXQgc2VsZWN0ZWQgcm93IGFuZCBjb2x1bW4qL1xyXG4gICAgcHVibGljIEdldFBhcnQocm93TnVtOiBudW1iZXIsIGNvbE51bTogbnVtYmVyKTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKHRoaXMuUm93TnVtYmVyIC0gMSk7XHJcblxyXG4gICAgICAgIGxldCBjb3B5Um93OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IG5ld1JvdyA9IDA7IG5ld1JvdyA8IHJvd3MubGVuZ3RoOyBuZXdSb3crKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb3B5Um93ID09IHJvd051bSkgY29weVJvdysrO1xyXG5cclxuICAgICAgICAgICAgcm93c1tuZXdSb3ddID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5Db2x1bW5OdW1iZXIgLSAxKTtcclxuICAgICAgICAgICAgbGV0IGNvcHlDb2w6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5ld0NvbCA9IDA7IG5ld0NvbCA8IHJvd3NbbmV3Um93XS5sZW5ndGg7IG5ld0NvbCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29weUNvbCA9PSBjb2xOdW0pIGNvcHlDb2wrKztcclxuXHJcbiAgICAgICAgICAgICAgICByb3dzW25ld1Jvd11bbmV3Q29sXSA9IHRoaXMubnVtYmVyc1tjb3B5Um93XVtjb3B5Q29sXTtcclxuICAgICAgICAgICAgICAgIGNvcHlDb2wrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29weVJvdysrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgYW5kIHJldHVybnMgaW52ZXJzZSBvZiB0aGlzIG1hdHJpeCBvciBudWxsIGlmIGl0IGlzIG5vdCBpbnZlcnRpYmxlKi9cclxuICAgIHB1YmxpYyBJbnZlcnQoKTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLklzU3F1YXJlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLkRldGVybWluYW50ID09IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuQ29sdW1uTnVtYmVyID09IDEpIHJldHVybiBuZXcgTWF0cml4KFtbMSAvIHRoaXMubnVtYmVyc1swXVswXV1dKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLkNvbHVtbk51bWJlciA9PSAyKSByZXR1cm4gbmV3IE1hdHJpeChbW3RoaXMubnVtYmVyc1sxXVsxXSwgLXRoaXMubnVtYmVyc1swXVsxXV0sIFstdGhpcy5udW1iZXJzWzFdWzBdLCB0aGlzLm51bWJlcnNbMF1bMF1dXSkuTXVsdGlwbHlTY2FsYXIoMSAvIHRoaXMuRGV0ZXJtaW5hbnQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZmFjdG9yc1Jvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyh0aGlzLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVnYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByb3dOdW0gPSAwOyByb3dOdW0gPCBjb2ZhY3RvcnNSb3dzLmxlbmd0aDsgcm93TnVtKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29mYWN0b3JzUm93c1tyb3dOdW1dID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5Db2x1bW5OdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2xOdW0gPSAwOyBjb2xOdW0gPCBjb2ZhY3RvcnNSb3dzW3Jvd051bV0ubGVuZ3RoOyBjb2xOdW0rKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldGVybWlhbnQgPSB0aGlzLkdldFBhcnQocm93TnVtLCBjb2xOdW0pLkRldGVybWluYW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2ZhY3RvcnNSb3dzW3Jvd051bV1bY29sTnVtXSA9IG5lZ2F0ZSA/IC1kZXRlcm1pYW50IDogZGV0ZXJtaWFudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ2F0ZSA9ICFuZWdhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZGp1Z2F0ZTogTWF0cml4ID0gbmV3IE1hdHJpeChjb2ZhY3RvcnNSb3dzKS5UcmFuc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhZGp1Z2F0ZS5NdWx0aXBseVNjYWxhcigxIC8gdGhpcy5EZXRlcm1pbmFudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWFsdGVzIGFuZCByZXR1cm5zIGF2ZXJhZ2UgdmFsdWUgZnJvbSBhbGwgZWxlbWVudHMgb2YgdGhpcyBtYXRyaXggKi9cclxuICAgIHB1YmxpYyBnZXQgQXZlcmFnZSgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50TnVtYmVyOiBudW1iZXIgPSB0aGlzLkNvbHVtbk51bWJlciAqIHRoaXMuUm93TnVtYmVyO1xyXG4gICAgICAgIGxldCBlbGVtZW50U3VtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLkNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRTdW0gKz0gdGhpcy5udW1iZXJzW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRTdW0gLyBlbGVtZW50TnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG59IiwiaW1wb3J0IHsgU29sdmVyIH0gZnJvbSBcIi4vU29sdmVyXCI7XHJcbmltcG9ydCB7IE1hdHJpeCwgU2lkZSwgTWF0cml4Um93cyB9IGZyb20gXCIuLi9NYXRyaXhcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9WZWN0b3IyXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uL1V0aWxzXCI7XHJcbmltcG9ydCB7IENhbnZhc0hlbHBlciB9IGZyb20gXCIuLi9DYW52YXNIZWxwZXJcIjtcclxuXHJcbi8qKiBJIGNhbid0IGZpbmQgZW5nbGlzaCBuYW1lIGZvciBcImVmZWt0IGthdGFsaXp5XCIgKi9cclxuZXhwb3J0IGNsYXNzIENhdGFseXNpc0VmZmVjdFNvbHZlciBleHRlbmRzIFNvbHZlclxyXG57XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKFtcIlJcIiwgXCJSMFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEhhbmRsZUlucHV0KGlucHV0RXZlbnQ6IElucHV0RXZlbnQpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DbGVhcklucHV0RXJyb3JzKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBSOiBNYXRyaXggPSBNYXRyaXguRnJvbVN0cmluZyh0aGlzLkdldElucHV0VmFsdWUoXCJSXCIpKTtcclxuICAgICAgICBsZXQgUjA6IE1hdHJpeCA9IE1hdHJpeC5Gcm9tU3RyaW5nKHRoaXMuR2V0SW5wdXRWYWx1ZShcIlIwXCIpKTtcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIHZhbGlkYXRlIGlucHV0XHJcbiAgICAgICAgLy8jcmVnaW9uIFJcclxuICAgICAgICBpZiAoUiA9PT0gbnVsbCkgeyB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUlwiLCBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIubm90TWF0cml4RXJyb3IpOyByZXR1cm47IH1cclxuICAgICAgICBlbHNlIGlmICghUi5Jc1NxdWFyZSkgeyB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUlwiLCBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIubWF0cml4Tm90U3F1YXJlRXJyb3IpOyByZXR1cm47IH1cclxuICAgICAgICBlbHNlIGlmIChSLkNvbHVtbk51bWJlciA8IDIpIHsgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlJcIiwgQ2F0YWx5c2lzRWZmZWN0U29sdmVyLm1hdHJpeE5vdFNxdWFyZUVycm9yKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUi5udW1iZXJzW2ldW2ldICE9IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlJcIiwgYFIgbXVzaSBtaWXEhyBzYW1lIDEgcG8gcHJ6ZWvEhXRuZWouIFcgcnrEmWR6aWUgJHtpfSBrb2x1bW5pZSAke2l9IGplc3QgJHtSLm51bWJlcnNbaV1baV19IHphbWlhc3QgMWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZpeFI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbmV3Um93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFIuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFIuUm93TnVtYmVyOyByb3crKykgbmV3Um93c1tyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oUi5Db2x1bW5OdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSByb3c7IGNvbCA8IFIuQ29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSb3dzW3Jvd11bY29sXSA9IFIubnVtYmVyc1tyb3ddW2NvbF07XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Um93c1tjb2xdW3Jvd10gPSBSLm51bWJlcnNbcm93XVtjb2xdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoUi5udW1iZXJzW3Jvd11bY29sXSAhPSBSLm51bWJlcnNbY29sXVtyb3ddKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFIubnVtYmVyc1tjb2xdW3Jvd10gPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4UiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUlwiLCBgUiBtdXNpIGJ5xIcgc3ltZXRyeWN6bmUgd3pnbMSZZG5lbSBwcnpla8SFdG5laiB6IDEuIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBMaWN6YnkgdyBrb23Ds3JrYWNoIFske3Jvd31dWyR7Y29sfV0gaSBbJHtjb2x9XVske3Jvd31dLCBjenlsaSAke1IubnVtYmVyc1tyb3ddW2NvbF19IGkgJHtSLm51bWJlcnNbY29sXVtyb3ddfSBuaWUgc8SFIHLDs3duZWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZml4UikgUiA9IG5ldyBNYXRyaXgobmV3Um93cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBSMFxyXG4gICAgICAgIGlmIChSMCA9PT0gbnVsbCkgeyB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUjBcIiwgQ2F0YWx5c2lzRWZmZWN0U29sdmVyLm5vdE1hdHJpeEVycm9yKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgZWxzZSBpZiAoUjAuUm93TnVtYmVyID4gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChSMC5Db2x1bW5OdW1iZXIgPT0gMSkgUjAgPSBSMC5UcmFuc3Bvc2UoKTtcclxuICAgICAgICAgICAgZWxzZSB7IHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSMFwiLCBTb2x2ZXIubm90VmVjdG9yRXJyb3IpOyByZXR1cm47IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIFIgJiBSMFxyXG4gICAgICAgIGlmIChSLkNvbHVtbk51bWJlciAhPSBSMC5Db2x1bW5OdW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUlwiLCBcIlIgbWEgaW5uxIUgaWxvxZvEhyBrb2x1bW4gbmnFvCBSMFwiKTtcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlIwXCIsIFwiUjAgbWEgaW5uxIUgaWxvxZvEhyBrb2x1bW4gbmnFvCBSXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiAgY2FsY3VsYXRlXHJcblxyXG4gICAgICAgIGNvbnN0IHRtcFIwX3JlZ19vdXQ6IFtNYXRyaXgsIEFycmF5PG51bWJlcj5dID0gdGhpcy5DYWxjdWxhdGVSMF9yZWcoUjApO1xyXG4gICAgICAgIGNvbnN0IFIwX3JlZzogTWF0cml4ID0gdG1wUjBfcmVnX291dFswXTtcclxuICAgICAgICBjb25zdCB4T3JkZXJJblIwX3JlZzogQXJyYXk8bnVtYmVyPiA9IHRtcFIwX3JlZ19vdXRbMV07XHJcblxyXG4gICAgICAgIGNvbnN0IFJfcmVnOiBNYXRyaXggPSB0aGlzLkNhbGN1bGF0ZVJfcmVnKFIsIFIwLCBSMF9yZWcsIHhPcmRlckluUjBfcmVnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdG1wQ2F0UGFyX291dDogW0FycmF5PENhdGFseXNpc1BhaXI+LCBNYXRyaXhSb3dzLCBNYXRyaXhSb3dzXSA9IHRoaXMuRmluZENhdGFseXNpc1BhaXJzKFJfcmVnLCBSMF9yZWcsIHhPcmRlckluUjBfcmVnKTtcclxuICAgICAgICBjb25zdCBjYXRhbHlzaXNQYWlyczogQXJyYXk8Q2F0YWx5c2lzUGFpcj4gPSB0bXBDYXRQYXJfb3V0WzBdO1xyXG4gICAgICAgIGNvbnN0IFJpajogTWF0cml4Um93cyA9IHRtcENhdFBhcl9vdXRbMV07XHJcbiAgICAgICAgY29uc3QgUmlfUmo6IE1hdHJpeFJvd3MgPSB0bXBDYXRQYXJfb3V0WzJdO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gZGlzcGxheSByZXN1bHRzXHJcblxyXG4gICAgICAgIFIuRHJhdyhTb2x2ZXIuZHJhd1N0YXJ0UG9zLCBcIlJcIik7XHJcbiAgICAgICAgLy8gdHJhbnNwb3NlIFIwIHRvIGRyYXcgaXQgdmVydGljYWxseSwgYmVjYXVzZSB0aGF0J3MgaG93IERyIFphasSFYyB3cml0ZXMgdGhhdFxyXG4gICAgICAgIGNvbnN0IFIwVCA9IFIwLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgIFIwVC5EcmF3TmV4dFRvKFIsIFNpZGUucmlnaHQsIFwiUjBcIik7XHJcbiAgICAgICAgUjBfcmVnLlRyYW5zcG9zZSgpLkRyYXdOZXh0VG8oUjBULCBTaWRlLnVuZGVyLCBcIlIwX3JlZ1wiKTtcclxuICAgICAgICBSX3JlZy5EcmF3TmV4dFRvKFIsIFNpZGUudW5kZXIsIFwiUl9yZWdcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvcE1hcmdpbiA9IDUwO1xyXG4gICAgICAgIGNvbnN0IGxpbmVNYXJnaW4gPSAyNTtcclxuICAgICAgICBjb25zdCBSaWpEcmF3WCA9IFIwVC5MYXN0RHJhd1Bvc2l0aW9uLnggKyBSMFQuUGl4ZWxXaWR0aCArIDUwO1xyXG4gICAgICAgIGNvbnN0IFJpakNvbW1lbnREcmF3WCA9IFJpakRyYXdYICsgMTAwO1xyXG4gICAgICAgIGNvbnN0IFJpX1JqRHJhd1ggPSBSaWpDb21tZW50RHJhd1ggKyA4MDtcclxuICAgICAgICBjb25zdCBSaV9SakNvbW1lbnREcmF3WCA9IFJpX1JqRHJhd1ggKyAxMTA7XHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGl0ZXJhdGlvbnMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBSLlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IHJvdyArIDE7IGNvbCA8IFIuQ29sdW1uTnVtYmVyOyBjb2wrKykgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgUmlqVmFsdWU6IG51bWJlciA9IFJpaltyb3ddW2NvbF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgUmlqVGV4dDogc3RyaW5nID0gYFIke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KHJvdyArIDEpfSAke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGNvbCArIDEpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJhd1k6IG51bWJlciA9IHRvcE1hcmdpbiArIChpdGVyYXRpb25zICogbGluZU1hcmdpbik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYCR7UmlqVGV4dH09ICR7UmlqVmFsdWV9YCwgbmV3IFZlY3RvcjIoUmlqRHJhd1gsIGRyYXdZKSwgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJpalZhbHVlIDwgMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQ6IHN0cmluZyA9IGAke1JpalRleHR9IDwgMCAgIFcgcGFyemUgeCR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQocm93KX0geCR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoY29sKX0gd3lzdMSZcHVqZSBlZmVrdCBrYXRhbGl6eWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dCh0ZXh0LCBuZXcgVmVjdG9yMihSaWpDb21tZW50RHJhd1gsIGRyYXdZKSwgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGAke1JpalRleHR9ID4gMGAsIG5ldyBWZWN0b3IyKFJpakNvbW1lbnREcmF3WCwgZHJhd1kpLCAxOCwgXCJsZWZ0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgUmlfUmpWYWx1ZTogbnVtYmVyID0gUmlfUmpbcm93XVtjb2xdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBSaV9SalRleHQ6IHN0cmluZyA9IGBSJHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjb2wgKyAxKX0vUiR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQocm93ICsgMSl9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gYCR7UmlfUmpUZXh0fT0gJHtOdW1iZXIoUmlfUmpWYWx1ZS50b0ZpeGVkKDIpKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQodGV4dCwgbmV3IFZlY3RvcjIoUmlfUmpEcmF3WCwgZHJhd1kpLCAxOCwgXCJsZWZ0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzQ2F0YWx5c2lzOiBib29sZWFuID0gUmlqVmFsdWUgPCBSaV9SalZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tbWVudFRleHQ6IHN0cmluZyA9IGAke1JpalRleHR9ICR7aGFzQ2F0YWx5c2lzID8gJzwnIDogJz4nfSAke1JpX1JqVGV4dH0gICAgIFcgcGFyemUgeCR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQocm93KX0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBgeCR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoY29sKX0gJHtoYXNDYXRhbHlzaXMgPyBcIlwiIDogXCJuaWUgXCJ9d3lzdMSZcHVqZSBlZmVrdCBrYXRhbGl6eWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChjb21tZW50VGV4dCwgbmV3IFZlY3RvcjIoUmlfUmpDb21tZW50RHJhd1gsIGRyYXdZKSwgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXRhbHlzaXNQYWlycy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHJhd1kgPSAodG9wTWFyZ2luICogMikgKyAoKGl0ZXJhdGlvbnMgKyBpKSAqIGxpbmVNYXJnaW4pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0UGFpcjogQ2F0YWx5c2lzUGFpciA9IGNhdGFseXNpc1BhaXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViSSA9IFV0aWxzLk51bWJlclRvU3Vic2NyaXB0KGNhdFBhaXIuaSArIDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViSiA9IFV0aWxzLk51bWJlclRvU3Vic2NyaXB0KGNhdFBhaXIuaiArIDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGBLYXRhbGl6YXRvcmVtIHcgcGFyemUgeCR7c3ViSX0geCR7c3ViSn0gamVzdCB4JHtjYXRQYWlyLmlzSUNhdGFseXN0ID8gc3ViSSA6IHN1Ykp9YDtcclxuICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dCh0ZXh0LCBuZXcgVmVjdG9yMihSaWpEcmF3WCwgZHJhd1kpLCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVIwX3JlZyhSMDogTWF0cml4KTogW01hdHJpeCwgQXJyYXk8bnVtYmVyPl1cclxuICAgIHtcclxuICAgICAgICBjb25zdCBhYnNSMDogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KFIwLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgY29uc3Qgc29ydGVkUjA6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPihSMC5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgIGNvbnN0IFIwaWRzOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oUjAuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSMC5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFic1IwW2ldID0gTWF0aC5hYnMoUjAubnVtYmVyc1swXVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSBhYnNSMC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IENhdGFseXNpc0VmZmVjdFNvbHZlci5HZXRHcmVhdGVzdE51bWJlckluZGV4KGFic1IwKTtcclxuICAgICAgICAgICAgUjBpZHNbaV0gPSBpbmRleDtcclxuICAgICAgICAgICAgc29ydGVkUjBbaV0gPSBhYnNSMFtpbmRleF07XHJcbiAgICAgICAgICAgIGFic1IwW2luZGV4XSA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gW25ldyBNYXRyaXgoW3NvcnRlZFIwXSksIFIwaWRzXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVJfcmVnKFI6IE1hdHJpeCwgUjA6IE1hdHJpeCwgUjBfcmVnOiBNYXRyaXgsIHhPcmRlckluUjBfcmVnOiBBcnJheTxudW1iZXI+KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFIuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oUi5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gcm93OyBjb2wgPCBSLkNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2wgPT0gcm93KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3Nbcm93XVtjb2xdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IFIubnVtYmVyc1t4T3JkZXJJblIwX3JlZ1tyb3ddXVt4T3JkZXJJblIwX3JlZ1tjb2xdXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoUjAubnVtYmVyc1swXVt4T3JkZXJJblIwX3JlZ1tyb3ddXSA8IDApIHZhbHVlID0gLXZhbHVlOyBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUjAubnVtYmVyc1swXVt4T3JkZXJJblIwX3JlZ1tjb2xdXSA8IDApIHZhbHVlID0gLXZhbHVlOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93c1tyb3ddW2NvbF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByb3dzW2NvbF1bcm93XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBpbmRleCBvZiBncmVhdGVzdCBudW1iZXIgaW4gcHJvdmlkZWQgYXJyYXkuXHJcbiAgICAgKiBJZiBzYW1lIG51bWJlciBhcHBlYXJzIG11bHRpcGxlIHRpbWVzIHJldHVybnMgaW5kZXggb2YgaXRzIGZpcnN0IG9jY3VycmVuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgR2V0R3JlYXRlc3ROdW1iZXJJbmRleChhcnJheTogUmVhZG9ubHlBcnJheTxudW1iZXI+KTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0gPiBhcnJheVtpbmRleF0pIGluZGV4ID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEZpbmRDYXRhbHlzaXNQYWlycyhSX3JlZzogTWF0cml4LCBSMF9yZWc6IE1hdHJpeCwgeE9yZGVySW5SMF9yZWc6IEFycmF5PG51bWJlcj4pOiBbQXJyYXk8Q2F0YWx5c2lzUGFpcj4sIE1hdHJpeFJvd3MsIE1hdHJpeFJvd3NdXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2F0YWx5c2lzUGFpcnM6IEFycmF5PENhdGFseXNpc1BhaXI+ID0gbmV3IEFycmF5PENhdGFseXNpc1BhaXI+KCk7XHJcbiAgICAgICAgY29uc3QgUmlqX2FycjogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFJfcmVnLlJvd051bWJlcik7XHJcbiAgICAgICAgY29uc3QgUmlfUmo6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhSX3JlZy5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJfcmVnLlJvd051bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmlqX2FycltpXSA9IG5ldyBBcnJheTxudW1iZXI+KFJfcmVnLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgICAgIFJpX1JqW2ldID0gbmV3IEFycmF5PG51bWJlcj4oUl9yZWcuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgUl9yZWcuQ29sdW1uTnVtYmVyOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlfcmVnID0gVXRpbHMuR2V0RWxlbWVudEluZGV4KHhPcmRlckluUjBfcmVnLCBpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGpfcmVnID0gVXRpbHMuR2V0RWxlbWVudEluZGV4KHhPcmRlckluUjBfcmVnLCBqKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFJpajogbnVtYmVyID0gUl9yZWcubnVtYmVyc1tpX3JlZ11bal9yZWddO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgUmkgPSBSMF9yZWcubnVtYmVyc1swXVtpX3JlZ107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBSaiA9IFIwX3JlZy5udW1iZXJzWzBdW2pfcmVnXTtcclxuICAgICAgICAgICAgICAgIFJpal9hcnJbaV1bal0gPSBSaWo7XHJcbiAgICAgICAgICAgICAgICBSaV9SaltpXVtqXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFJpaiA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0YWx5c2lzUGFpcnMucHVzaChuZXcgQ2F0YWx5c2lzUGFpcihpLCBqLCAoUmkgPiBSaikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlc3RWYWx1ZSA9IChSaSA8IFJqKSA/IFJpIC8gUmogOiBSaiAvIFJpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJpX1JqW2ldW2pdID0gdGVzdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSaWogPiB0ZXN0VmFsdWUpIGNhdGFseXNpc1BhaXJzLnB1c2gobmV3IENhdGFseXNpc1BhaXIoaSwgaiwgKFJpIDwgUmopKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbY2F0YWx5c2lzUGFpcnMsIFJpal9hcnIsIFJpX1JqXTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2F0YWx5c2lzUGFpclxyXG57XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGo6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBpc0lDYXRhbHlzdDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaTogbnVtYmVyLCBqOiBudW1iZXIsIGlzSUNhdGFseXN0OiBib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgICAgICB0aGlzLmlzSUNhdGFseXN0ID0gaXNJQ2F0YWx5c3Q7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTb2x2ZXIgfSBmcm9tIFwiLi9Tb2x2ZXJcIjtcclxuaW1wb3J0IHsgTWF0cml4Um93cywgTWF0cml4LCBTaWRlIH0gZnJvbSBcIi4uL01hdHJpeFwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBDYW52YXNIZWxwZXIgfSBmcm9tIFwiLi4vQ2FudmFzSGVscGVyXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vVmVjdG9yMlwiO1xyXG5cclxudmFyIHsgalN0YXQgfSA9IHJlcXVpcmUoJ2pzdGF0JylcclxuXHJcbmV4cG9ydCBjbGFzcyBNTktTb2x2ZXIgZXh0ZW5kcyBTb2x2ZXJcclxue1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihbXCJhbHBoYVwiLCBcIm1hdHJpeFlYWFwiLCBcInByb2JhYmlsaXR5XCJdKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coalN0YXQuc3R1ZGVudHQuaW52KDAuOTk1LCAyNykpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGpTdGF0LmNlbnRyYWxGLmludigwLjk1LCA1LCAxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEhhbmRsZUlucHV0KGlucHV0RXZlbnQ6IElucHV0RXZlbnQpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DbGVhcklucHV0RXJyb3JzKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBhbHBoYTogTWF0cml4ID0gTWF0cml4LkZyb21TdHJpbmcodGhpcy5HZXRJbnB1dFZhbHVlKFwiYWxwaGFcIikpO1xyXG4gICAgICAgIGNvbnN0IFlYWDogTWF0cml4ID0gTWF0cml4LkZyb21TdHJpbmcodGhpcy5HZXRJbnB1dFZhbHVlKFwibWF0cml4WVhYXCIpKTtcclxuICAgICAgICBsZXQgcHJvYmFiaWxpdHlQZXJjZW50OiBudW1iZXIgPSB0aGlzLkdldElucHV0VmFsdWVBc051bWJlcihcInByb2JhYmlsaXR5XCIpO1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gdmFsaWRhdGUgaW5wdXRcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEEwbXVsdFxyXG4gICAgICAgIGlmIChhbHBoYSA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIm1hdHJpeFlYWFwiLCBTb2x2ZXIubm90TWF0cml4RXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYWxwaGEuUm93TnVtYmVyID4gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhbHBoYS5Db2x1bW5OdW1iZXIgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWxwaGEgPSBhbHBoYS5UcmFuc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJhbHBoYVwiLCBTb2x2ZXIubm90VmVjdG9yRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBZWFhcclxuICAgICAgICBpZiAoWVhYID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwibWF0cml4WVhYXCIsIFNvbHZlci5ub3RNYXRyaXhFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoWVhYLlJvd051bWJlciAhPSBhbHBoYS5Db2x1bW5OdW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiYWxwaGFcIiwgXCJpbG/Fm8SHIHJ6xJlkw7N3IG5pZSB6Z2FkYSBzacSZIHogaWxvxZtjacSFIGxpY3piIHN0b2rEhWN5Y2ggcHJ6ZWQgzrFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIHByb2JhYmlsaXR5XHJcbiAgICAgICAgaWYgKHByb2JhYmlsaXR5UGVyY2VudCA9PSBudWxsIHx8IGlzTmFOKHByb2JhYmlsaXR5UGVyY2VudCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwicHJvYmFiaWxpdHlcIiwgU29sdmVyLm5vdE51bWJlckVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIGNhbGN1bGF0ZVxyXG5cclxuICAgICAgICBjb25zdCBZOiBNYXRyaXggPSBuZXcgTWF0cml4KFtVdGlscy5Db3B5QXJyYXkoWVhYLm51bWJlcnNbMF0pXSkuVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgY29uc3QgWDogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVYKFlYWCwgYWxwaGEubnVtYmVyc1swXVswXSk7XHJcbiAgICAgICAgY29uc3QgWHQ6IE1hdHJpeCA9IFguVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgY29uc3QgWHRYOiBNYXRyaXggPSBYdC5NdWx0aXBseU1hdHJpeChYKTtcclxuICAgICAgICBjb25zdCBYdFk6IE1hdHJpeCA9IFh0Lk11bHRpcGx5TWF0cml4KFkpO1xyXG4gICAgICAgIGNvbnN0IFh0WGludjogTWF0cml4ID0gWHRYLkludmVydCgpO1xyXG4gICAgICAgIGlmIChYdFhpbnYgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJtYXRyaXhZWFhcIiwgXCJNYWNpZXJ6eSBY4bWAWCBuaWUgbW/FvG5hIG9kd3LDs2NpxIcsIHBld25pZSBixYLEhWQgdyBwcnplcGlzeXdhbml1IGRhbnljaFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhOiBNYXRyaXggPSBYdFhpbnYuTXVsdGlwbHlNYXRyaXgoWHRZKTtcclxuICAgICAgICBjb25zdCB5X2hhdDogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVZX2hhdChhLCBYKTtcclxuICAgICAgICBjb25zdCBlOiBNYXRyaXggPSB0aGlzLkNhbGN1bGF0ZV9lKFksIHlfaGF0KTtcclxuICAgICAgICBjb25zdCBlVGU6IE1hdHJpeCA9IGUuVHJhbnNwb3NlKCkuTXVsdGlwbHlNYXRyaXgoZSk7XHJcbiAgICAgICAgY29uc3QgbjogbnVtYmVyID0gWC5Sb3dOdW1iZXI7XHJcbiAgICAgICAgY29uc3QgazogbnVtYmVyID0gWC5Db2x1bW5OdW1iZXIgLSAxO1xyXG4gICAgICAgIGNvbnN0IGRmID0gbiAtIChrICsgMSk7XHJcbiAgICAgICAgY29uc3QgU19zcXI6IG51bWJlciA9IGVUZS5udW1iZXJzWzBdWzBdIC8gZGY7XHJcbiAgICAgICAgY29uc3QgRF9zcXI6IE1hdHJpeCA9IFh0WGludi5NdWx0aXBseVNjYWxhcihTX3Nxcik7XHJcblxyXG4gICAgICAgIGNvbnN0IFNfc3FyRm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVTc3FyRm9yQShEX3Nxcik7XHJcbiAgICAgICAgY29uc3QgU19mb3JBOiBNYXRyaXggPSB0aGlzLkNhbGN1YWt0ZVNGb3JBKFNfc3FyRm9yQSk7XHJcbiAgICAgICAgY29uc3QgVl9mb3JBOiBNYXRyaXggPSB0aGlzLkNhbGN1bGF0ZVZGb3JBKFNfZm9yQSwgYSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2JhYmlsaXR5OiBudW1iZXIgPSBwcm9iYWJpbGl0eVBlcmNlbnQgLyAxMDA7XHJcbiAgICAgICAgY29uc3QgdF9mb3JBOiBNYXRyaXggPSB0aGlzLkNhbGN1bGF0ZVRGb3JBKFNfZm9yQSwgYSk7XHJcbiAgICAgICAgY29uc3QgdF9zdHVkOiBudW1iZXIgPSBqU3RhdC5zdHVkZW50dC5pbnYoMSAtIChwcm9iYWJpbGl0eSAvIDIpLCBkZik7XHJcblxyXG4gICAgICAgIGNvbnN0IFl0OiBNYXRyaXggPSBZLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgIGNvbnN0IFl0WTogTWF0cml4ID0gWXQuTXVsdGlwbHlNYXRyaXgoWSk7XHJcbiAgICAgICAgY29uc3QgeV9hdmc6IG51bWJlciA9IFkuQXZlcmFnZTtcclxuICAgICAgICBjb25zdCBSX3NxcjogbnVtYmVyID0gdGhpcy5DYWxjdWxhdGVSX3NxcihlVGUsIFl0WSwgeV9hdmcsIG4pO1xyXG4gICAgICAgIGNvbnN0IEY6IG51bWJlciA9IHRoaXMuQ2FsY3VsYXRlRihSX3Nxciwgbiwgayk7XHJcbiAgICAgICAgY29uc3QgRl9kaXN0OiBudW1iZXIgPSBqU3RhdC5jZW50cmFsRi5pbnYoMSAtIHByb2JhYmlsaXR5LCBrLCBkZik7XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBkaXNwbGF5IHJlc3VsdHNcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIGEpXHJcblxyXG4gICAgICAgIFguRHJhdyhTb2x2ZXIuZHJhd1N0YXJ0UG9zLCBcIlhcIik7XHJcbiAgICAgICAgWS5EcmF3TmV4dFRvKFgsIFNpZGUucmlnaHQsIFwiWVwiKTtcclxuICAgICAgICB5X2hhdC5EcmF3TmV4dFRvKFksIFNpZGUucmlnaHQsIFwixbdcIik7XHJcbiAgICAgICAgZS5EcmF3TmV4dFRvKHlfaGF0LCBTaWRlLnJpZ2h0LCBcImVcIik7XHJcbiAgICAgICAgWHQuRHJhd05leHRUbyhlLCBTaWRlLnJpZ2h0LCBcIljhtYBcIik7XHJcbiAgICAgICAgWHRYLkRyYXdOZXh0VG8oWHQsIFNpZGUucmlnaHQsIFwiWOG1gFhcIik7XHJcbiAgICAgICAgWHRZLkRyYXdOZXh0VG8oWCwgU2lkZS51bmRlciwgXCJY4bWAWVwiKTtcclxuICAgICAgICBYdFhpbnYuRHJhd05leHRUbyhYdFksIFNpZGUucmlnaHQsIFwiKFjhtYBYKeKBu8K5XCIpXHJcbiAgICAgICAgYS5EcmF3TmV4dFRvKFh0WGludiwgU2lkZS5yaWdodCwgXCJhXCIpO1xyXG4gICAgICAgIGVUZS5EcmF3TmV4dFRvKGEsIFNpZGUucmlnaHQsIFwiZeG1gGVcIik7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGBTwrI9JHtOdW1iZXIoU19zcXIudG9GaXhlZCgzKSl9YCwgVmVjdG9yMi5BZGQoZVRlLkxhc3REcmF3UG9zaXRpb24sIG5ldyBWZWN0b3IyKE1hdHJpeC5jZWxsUGl4ZWxTaXplICsgTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luLCBNYXRyaXgubGFiZWxQaXhlbE1hcmdpbikpLCAxNiwgXCJsZWZ0XCIsIFwic2Fucy1zZXJpZlwiLCBcImJsYWNrXCIsIFwiYm9sZFwiKTtcclxuICAgICAgICBEX3Nxci5EcmF3TmV4dFRvKFh0WSwgU2lkZS51bmRlciwgXCJEwrIoYSlcIik7XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gYilcclxuICAgICAgICAvLyNyZWdpb24gYlxyXG4gICAgICAgIGNvbnN0IGJEcmF3U3RhcnRQb3M6IFZlY3RvcjIgPSB0aGlzLkRyYXdTZXBhcmF0aW5nVmVydGljYWxMaW5lKFh0WCk7XHJcblxyXG4gICAgICAgIFNfc3FyRm9yQS5EcmF3KGJEcmF3U3RhcnRQb3MsIFwiU8KyKGEpXCIpO1xyXG4gICAgICAgIFNfZm9yQS5EcmF3TmV4dFRvKFNfc3FyRm9yQSwgU2lkZS51bmRlciwgXCJTKGEpICjFm3IgYsWCKVwiKTtcclxuICAgICAgICBWX2ZvckEuRHJhd05leHRUbyhTX2ZvckEsIFNpZGUudW5kZXIsIFwiVihhKSAoxZtyIHd6ZyBixYIgJSlcIilcclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZHJhd1BvczogVmVjdG9yMiA9IFZlY3RvcjIuQWRkKFZfZm9yQS5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMigwLCBWX2ZvckEuUGl4ZWxIZWlnaHQgKyBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4pKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBWX2ZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoVl9mb3JBLm51bWJlcnNbMF1baV0pIHx8IGlzTmFOKFZfZm9yQS5udW1iZXJzWzBdW2ldKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYG5pZSBtYSBWKGEpIGRsYSBhJHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChpKX1gLCBkcmF3UG9zLCAxNiwgXCJsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdQb3MgPSBWZWN0b3IyLkFkZChkcmF3UG9zLCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gYmJcclxuXHJcbiAgICAgICAgY29uc3QgYmJEcmF3U3RhcnRQb3M6IFZlY3RvcjIgPSB0aGlzLkRyYXdTZXBhcmF0aW5nVmVydGljYWxMaW5lKFNfc3FyRm9yQSlcclxuICAgICAgICBTX3NxckZvckEuRHJhdyhiYkRyYXdTdGFydFBvcywgXCJTwrIoYSlcIik7XHJcbiAgICAgICAgU19mb3JBLkRyYXdOZXh0VG8oU19zcXJGb3JBLCBTaWRlLnVuZGVyLCBcIlMoYSkgKMWbciBixYIpXCIpO1xyXG4gICAgICAgIHRfZm9yQS5EcmF3TmV4dFRvKFNfZm9yQSwgU2lkZS51bmRlciwgXCJ0KGEpXCIpO1xyXG4gICAgICAgIGNvbnN0IHRfc3R1ZERyYXdQb3M6IFZlY3RvcjIgPSBWZWN0b3IyLkFkZCh0X2ZvckEuTGFzdERyYXdQb3NpdGlvbiwgbmV3IFZlY3RvcjIoMCwgKE1hdHJpeC5jZWxsUGl4ZWxTaXplICogMikpKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYHQqPSR7dGhpcy5Sb3VuZCh0X3N0dWQpfWAsIHRfc3R1ZERyYXdQb3MsIDE2LCBcImxlZnRcIiwgXCJzYW5zLXNlcmlmXCIsIFwiYmxhY2tcIiwgXCJib2xkXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBiYkFuc3dlckRyYXc6IFZlY3RvcjIgPSBWZWN0b3IyLkFkZChTX3NxckZvckEuTGFzdERyYXdQb3NpdGlvbiwgbmV3IFZlY3RvcjIoU19zcXJGb3JBLlBpeGVsV2lkdGggKyBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4sIDApKTtcclxuXHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiSDA6IHptaWVubmEgWGkgamVzdCBuaWVpc3RvdG5hXCIsIGJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICBiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7O1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChcIkgxOiB6bWllbm5hIFhpIG1hIHN0YXR5c3R5Y3puaWUgaXN0b3RueSB3cMWCeXcgbmEgem1pZW5uxIUgb2JqYcWbbmlhbsSFXCIsIGJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0X2ZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBhY2NlcHRIMCA9IHRfZm9yQS5udW1iZXJzWzBdW2ldIDwgdF9zdHVkO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBgdCR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoaSl9ICR7YWNjZXB0SDAgPyAnPCcgOiAnPid9IHQqIGBcclxuICAgICAgICAgICAgICAgICsgYFogcHJhd2RvcG9kb2JpZcWEc3R3ZW0gJHtwcm9iYWJpbGl0eVBlcmNlbnR9JSAke2FjY2VwdEgwID8gXCJicmFrIHBvZHN0YXcgYnkgb2RyenVjacSHIEgwXCIgOiBcIm5hbGXFvHkgb2RyenVjacSHIEgwIG5hIHJ6ZWN6IEgxXCJ9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KHRleHQsIGJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBiYmJcclxuXHJcbiAgICAgICAgY29uc3QgYmJiTGluZVkgPSB0X3N0dWREcmF3UG9zLnkgKyAyNTtcclxuICAgICAgICBjb25zdCBiYmJMaW5lU3RhcnQgPSBuZXcgVmVjdG9yMihiYkRyYXdTdGFydFBvcy54IC0gTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luLCBiYmJMaW5lWSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKGJiYkxpbmVTdGFydCwgbmV3IFZlY3RvcjIoQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQuY2FudmFzLndpZHRoLCBiYmJMaW5lWSksIFNvbHZlci5zZXBhcmF0aW5nTGluZVRoaWNrbmVzcyk7XHJcblxyXG4gICAgICAgIGxldCBiYmJBbnN3ZXJEcmF3OiBWZWN0b3IyID0gVmVjdG9yMi5BZGQoYmJiTGluZVN0YXJ0LCBTb2x2ZXIuZHJhd1N0YXJ0UG9zKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoXCJIMDogbmllIG1hIHRha2llaiB6bWllbm5laiBYaSwga3TDs2EgbWEgc3RhdHlzdHljem5pZSBpc3RvdG55IHdwxYJ5dyBuYSBZXCIsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiSDE6IGplc3QgdGFrYSB6bWllbm5hIFhpLCBrdMOzYSBtYSBzdGF0eXN0eWN6bmllIGlzdG90bnkgd3DFgnl3IG5hIFlcIiwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICBiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYMizPSR7dGhpcy5Sb3VuZCh5X2F2Zyl9YCwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICBiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYFLCsj0ke3RoaXMuUm91bmQoUl9zcXIpfWAsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGBGPSR7dGhpcy5Sb3VuZChGKX1gLCBiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgRio9JHt0aGlzLlJvdW5kKEZfZGlzdCl9YCwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBZdC5EcmF3KGJiYkFuc3dlckRyYXcsIFwiWeG1gFwiKTtcclxuICAgICAgICBZdFkuRHJhd05leHRUbyhZdCwgU2lkZS5yaWdodCwgXCJZ4bWAWVwiKVxyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChZdC5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMigwLCBZdFkuUGl4ZWxIZWlnaHQgKyAoTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luICogMikpKTtcclxuICAgICAgICBjb25zdCBhY2NlcHRIMDogYm9vbGVhbiA9IEYgPCBGX2Rpc3Q7XHJcbiAgICAgICAgY29uc3QgYmJiQW5zd2VyVGV4dDogc3RyaW5nID0gYFogcHJhd2RvcG9kb2JpZcWEc3R3ZW0gJHtwcm9iYWJpbGl0eVBlcmNlbnR9JSAke2FjY2VwdEgwID8gXCJicmFrIHBvZHN0YXcgYnkgb2RyenVjacSHIEgwXCIgOiBcIm5hbGXFvHkgb2RyenVjacSHIEgwIG5hIHJ6ZWN6IEgxXCJ9YDtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYmJiQW5zd2VyVGV4dCwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIGJiYmJcclxuXHJcbiAgICAgICAgY29uc3QgYmJiYkxpbmVZID0gYmJiQW5zd2VyRHJhdy55ICsgMjU7XHJcbiAgICAgICAgY29uc3QgYmJiYkxpbmVTdGFydCA9IG5ldyBWZWN0b3IyKGJiRHJhd1N0YXJ0UG9zLnggLSBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4sIGJiYmJMaW5lWSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKGJiYmJMaW5lU3RhcnQsIG5ldyBWZWN0b3IyKENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy53aWR0aCwgYmJiYkxpbmVZKSwgU29sdmVyLnNlcGFyYXRpbmdMaW5lVGhpY2tuZXNzKTtcclxuXHJcbiAgICAgICAgbGV0IGJiYmJBbnN3ZXJEcmF3OiBWZWN0b3IyID0gVmVjdG9yMi5BZGQoYmJiYkxpbmVTdGFydCwgU29sdmVyLmRyYXdTdGFydFBvcyk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiV3DDs8WCY3p5bm5payBkZXRlcm1pbmFuY2ppXCIsIGJiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgY29uc3Qgcm91bmRSX3NxciA9IHRoaXMuUm91bmQoUl9zcXIpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgUsKyPSR7cm91bmRSX3Nxcn0gICAke3JvdW5kUl9zcXIgKiAxMDB9JSB6bWllbm5vxZtjaSB5IGplc3Qgb2JqYcWbbmlhbmUgcHJ6ZXogbW9kZWxgLCBiYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVYKFlYWDogTWF0cml4LCBhMG11bHQ6IG51bWJlcik6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IFlYWF9UOiBNYXRyaXggPSBZWFguVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFlYWF9ULlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFlYWF9ULlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzW3Jvd10gPSBuZXcgQXJyYXk8bnVtYmVyPihZWFhfVC5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBZWFhfVC5Db2x1bW5OdW1iZXI7IGNvbCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3dzW3Jvd11bY29sXSA9IGNvbCA9PSAwID8gYTBtdWx0IDogWVhYX1QubnVtYmVyc1tyb3ddW2NvbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVlfaGF0KGE6IE1hdHJpeCwgWDogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFguUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgWC5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oMSk7XHJcbiAgICAgICAgICAgIGxldCB5X2hhdDogbnVtYmVyID0gYS5udW1iZXJzWzBdWzBdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAxOyBjb2wgPCBYLkNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHlfaGF0ICs9IGEubnVtYmVyc1tjb2xdWzBdICogWC5udW1iZXJzW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzW3Jvd11bMF0gPSB5X2hhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlX2UoWTogTWF0cml4LCBZX2hhdDogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFkuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgWS5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gW1kubnVtYmVyc1tyb3ddWzBdIC0gWV9oYXQubnVtYmVyc1tyb3ddWzBdXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlU3NxckZvckEoRF9zcXI6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygxKTtcclxuICAgICAgICByb3dzWzBdID0gbmV3IEFycmF5PG51bWJlcj4oRF9zcXIuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBEX3Nxci5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NbMF1baV0gPSBEX3Nxci5udW1iZXJzW2ldW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWFrdGVTRm9yQShTX3NxckZvckE6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygxKTtcclxuICAgICAgICByb3dzWzBdID0gbmV3IEFycmF5KFNfc3FyRm9yQS5Db2x1bW5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNfc3FyRm9yQS5Db2x1bW5OdW1iZXI7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3NbMF1baV0gPSBNYXRoLnNxcnQoU19zcXJGb3JBLm51bWJlcnNbMF1baV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVWRm9yQShTX2ZvckE6IE1hdHJpeCwgYTogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKDEpO1xyXG4gICAgICAgIHJvd3NbMF0gPSBuZXcgQXJyYXk8bnVtYmVyPihTX2ZvckEuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTX2ZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzWzBdW2ldID0gTWF0aC5hYnMoU19mb3JBLm51bWJlcnNbMF1baV0gLyBhLm51bWJlcnNbaV1bMF0pICogMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVURm9yQShTX2ZvckE6IE1hdHJpeCwgYTogTWF0cml4KTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKDApO1xyXG4gICAgICAgIHJvd3NbMF0gPSBuZXcgQXJyYXk8bnVtYmVyPihTX2ZvckEuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTX2ZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzWzBdW2ldID0gTWF0aC5hYnMoYS5udW1iZXJzW2ldWzBdKSAvIFNfZm9yQS5udW1iZXJzWzBdW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVSX3NxcihlVGU6IE1hdHJpeCwgWXRZOiBNYXRyaXgsIHlfYXZnOiBudW1iZXIsIG46IG51bWJlcik6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAxIC0gKGVUZS5udW1iZXJzWzBdWzBdIC8gKFl0WS5udW1iZXJzWzBdWzBdIC0gKG4gKiAoeV9hdmcgKiB5X2F2ZykpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVGKFJfc3FyOiBudW1iZXIsIG46IG51bWJlciwgazogbnVtYmVyKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICgoUl9zcXIgLyAoMSAtIFJfc3FyKSkgKiAoKG4gLSBrIC0gMSkgLyBrKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDYW52YXNIZWxwZXIgfSBmcm9tIFwiLi4vQ2FudmFzSGVscGVyXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiLi4vVmVjdG9yMlwiO1xyXG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiLi4vTWF0cml4XCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uL1V0aWxzXCI7XHJcblxyXG4vKiogQmFzZSBjbGFzcyBmb3IgY2xhc3NlcyBzb2x2aW5nIGVjb25vbWV0cmljIHByb2JsZW1zICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTb2x2ZXJcclxue1xyXG4gICAgLy8jcmVnaW9uIGVycm9yIG1lc3NhZ2VzXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IG5vdE1hdHJpeEVycm9yOiBzdHJpbmcgPSBcInBvZGFuYSB3YXJ0b8WbxIcgbmllIGplc3QgbWFjaWVyesSFXCI7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IG1hdHJpeE5vdFNxdWFyZUVycm9yOiBzdHJpbmcgPSBcInBvZGFuYSBtYWNpZXJ6IG5pZSBqZXN0IGt3YWRyYXRvd2EgKHR5bGUgd2llcnN6eSBjbyBrb2x1bW4pXCI7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IG5vdE51bWJlckVycm9yOiBzdHJpbmcgPSBcInBvZGFuYSB3YXJ0b8WbxIcgbmllIGplc3QgbGljemLEhVwiO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBub3RWZWN0b3JFcnJvcjogc3RyaW5nID0gXCJwb2RhbmEgbWFjaWVyeiBuaWUgamVzdCB3ZWt0b3JlbSAoamVkZW4gd2llcnN6IGFsYm8gamVkbmEga29sdW1uYSlcIjtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgZHJhd1N0YXJ0UG9zOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoMTAsIDMwKTtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgc2VwYXJhdGluZ0xpbmVUaGlja25lc3M6IG51bWJlciA9IDU7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IGxpbmVNYXJnaW46IG51bWJlciA9IDI1O1xyXG5cclxuXHJcbiAgICAvKiogTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHdoaWNoIGFsbCBkaXNwbGF5ZWQgbnVtYmVycyBzaG91bGQgYmUgcm91bmRlICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IHJvdW5kaW5nOiBudW1iZXIgPSAzO1xyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGlucHV0czogTWFwPHN0cmluZywgSFRNTElucHV0RWxlbWVudD4gPSBuZXcgTWFwPHN0cmluZywgSFRNTElucHV0RWxlbWVudD4oKTtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBlcnJvckxhYmVsczogTWFwPHN0cmluZywgSFRNTExhYmVsRWxlbWVudD4gPSBuZXcgTWFwPHN0cmluZywgSFRNTExhYmVsRWxlbWVudD4oKTtcclxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlucHV0czogUmVhZG9ubHlBcnJheTxzdHJpbmc+KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9ICg8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1wiKSkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dElkID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50Lm9uaW5wdXQgPSB0aGlzLkhhbmRsZUlucHV0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzLnNldChpbnB1dElkLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yTGFiZWxzLnNldChpbnB1dElkLCA8SFRNTExhYmVsRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbnB1dElkICsgXCJfZXJyb3JcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxsZWQgd2hlbmV2ZXIgYW55IG9mIGlucHV0IGZpZWxkcyBmcm9tIHRoaXMuaW5wdXRzIGlzIHVwZGF0ZWQgXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRFdmVudCBJbnB1dEV2ZW50IHJhaXNlZCBieSBpbnB1dCBmaWxlZCB3aGljaCB3YXMgbW9kaWZpZWQgYnkgdXNlclxyXG4gICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBIYW5kbGVJbnB1dChpbnB1dEV2ZW50OiBJbnB1dEV2ZW50KTogdm9pZDtcclxuXHJcbiAgICAvKiogRGlzcGxheXMgZXJyb3IgbGFiZWwgbmV4dCB0byBpbnB1dCBmaWVsZCAqL1xyXG4gICAgcHJvdGVjdGVkIERpc3BsYXlJbnB1dEVycm9yKGlucHV0SWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZXJyb3JMYWJlbHMuZ2V0KGlucHV0SWQpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEhpZGVzIGFsbCBlcnJvciBsYWJlbHMgZGlzcGxheWVkIHVzaW5nIHRoaXMuRGlzcGxheUlucHV0RXJyb3IgKi9cclxuICAgIHByb3RlY3RlZCBDbGVhcklucHV0RXJyb3JzKCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVycm9yTGFiZWxzLmZvckVhY2goKGxhYmVsLCBpZCkgPT4gbGFiZWwuaW5uZXJIVE1MID0gXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEdldElucHV0VmFsdWUoaW5wdXRJZDogc3RyaW5nKTogc3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRzLmdldChpbnB1dElkKS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgR2V0SW5wdXRWYWx1ZUFzTnVtYmVyKGlucHV0SWQ6IHN0cmluZyk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN0cmluZ1ZhbHVlOiBzdHJpbmcgPSB0aGlzLkdldElucHV0VmFsdWUoaW5wdXRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHN0cmluZ1ZhbHVlID09IG51bGwgfHwgc3RyaW5nVmFsdWUgPT0gXCJcIikgcmV0dXJuIE5hTjtcclxuXHJcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIoc3RyaW5nVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB2YWx1ZSA9IE51bWJlcihzdHJpbmdWYWx1ZS5yZXBsYWNlKCcsJywgJy4nKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRHJhd3MgdmVydGljYWwgbGluZSB0byBzZXBhcmF0ZSB0d28gcGFydHMgb2YgcHJvYmxlbSdzIHNvbHV0aW9uLlxyXG4gICAgICogUmV0dXJucyBWZWN0b3IyIHJlcHJlc2VudGluZyBwb3NpdGlvbiB3aGVyZSBkcmF3aW5nIG9mIHRoZSBuZXh0IHBhcnQgc2hvdWxkIHN0YXJ0XHJcbiAgICAgKiBAcGFyYW0gcmlnaHRtb3N0TWF0cml4IFJpZ2h0bW9zdCBtYXRyaXggZnJvbSBmaW5pc2hlZCBwYXJ0IG9mIHNvbHV0aW9uLiBMaW5lIHdpbGwgYmUgZHJhd24gbmV4dCB0byBpdC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIERyYXdTZXBhcmF0aW5nVmVydGljYWxMaW5lKHJpZ2h0bW9zdE1hdHJpeDogTWF0cml4KTogVmVjdG9yMlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpbmVYOiBudW1iZXIgPSByaWdodG1vc3RNYXRyaXguTGFzdERyYXdQb3NpdGlvbi54ICsgcmlnaHRtb3N0TWF0cml4LlBpeGVsV2lkdGggKyBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW47XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdMaW5lKG5ldyBWZWN0b3IyKGxpbmVYLCAwKSwgbmV3IFZlY3RvcjIobGluZVgsIENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy5oZWlnaHQpLCBTb2x2ZXIuc2VwYXJhdGluZ0xpbmVUaGlja25lc3MpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihsaW5lWCArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgU29sdmVyLmRyYXdTdGFydFBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUm91bmRzIG51bWJlciB0byBkZWZhdWx0IG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyAqL1xyXG4gICAgcHJvdGVjdGVkIFJvdW5kKHZhbHVlOiBudW1iZXIpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVXRpbHMuUm91bmROdW1iZXIodmFsdWUsIFNvbHZlci5yb3VuZGluZyk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbmFtZXNwYWNlIFV0aWxzXHJcbntcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBUcnlSZW1vdmVGcm9tQXJyYXk8VD4oYXJyYXk6IFRbXSwgZWxlbWVudDogVCk6IGJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgZm91bmRFbGVtZW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5W2ldID09PSBlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZEVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqUmVtb3ZlcyBmaXJzdCBvY2N1cnJlbmNlIG9mIGdpdmVuIG9iamVjdCBpbiBhbiBhcnJheSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZUZyb21BcnJheTxUPihhcnJheTogVFtdLCBlbGVtZW50OiBUKTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmICghVHJ5UmVtb3ZlRnJvbUFycmF5KGFycmF5LCBlbGVtZW50KSkgdGhyb3cgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIHNwZWNpZmllZCBlbGVtZW50IGluIHRoZSBwcm92aWRlZCBhcnJheVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipDaGVja3Mgd2hldGhlciBvYmplY3QgaXMgaW4gYW4gYXJyYXkgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBpcyAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIElzRWxlbWVudEluQXJyYXk8VD4oYXJyYXk6IFRbXSwgZWxlbWVudDogVCk6IGJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgZm91bmRFbGVtZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlbaV0gPT09IGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipSZW1vdmVzIG9iamVjdCBmcm9tIGFuIGFycmF5IGF0IHNwZWNpZmllZCBpbmRleCAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZUZyb21BcnJheUF0SW5kZXg8VD4oYXJyYXk6IFRbXSwgaW5kZXg6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIGluZGV4IG9mIGZpcnN0IG9jdXJyZW5jZSBvZiBnaXZlbiBlbGVtZW50IGluIGFycmF5LiBcclxuICAgICAqIElmIGVsZW1lbnQgaXMgbm90IHByZXNlbnQgaW4gdGhlIGFycmF5IC0xIGlzIHJldHVybmVkICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RWxlbWVudEluZGV4PFQ+KGFycmF5OiBUW10sIGVsZW1lbnQ6IFQpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5W2ldID09IGVsZW1lbnQpIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIHByb3ZpZGVkIG51bWJlciBhcyBzdHJpbmcgaW4gc3Vic2NyaXB0ICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTnVtYmVyVG9TdWJzY3JpcHQodmFsdWU6IG51bWJlcik6IHN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IDkgfHwgdmFsdWUgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSkgdGhyb3cgbmV3IEVycm9yKFwiVmFsdWUgbXVzdCBiZSBpbnRlZ3JhbCBudW1iZXIgZnJvbSByYW5nZSA8MDs5PlwiKTtcclxuICAgICAgICBlbHNlIHJldHVybiBbJ+KCgCcsICfigoEnLCAn4oKCJywgJ+KCgycsICfigoQnLCAn4oKFJywgJ+KChicsICfigocnLCAn4oKIJywgJ+KCiSddW3ZhbHVlXVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb3B5QXJyYXk8VD4oYXJyYXk6IHJlYWRvbmx5IFRbXSk6IFRbXTtcclxuXHJcbiAgICAvKiogQ3JlYXRlcyBzaGFsbG93IGNvcHkgb2YgYW4gYXJyYXkgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb3B5QXJyYXk8VD4oYXJyYXk6IFRbXSk6IFRbXVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNvcHk6IFRbXSA9IG5ldyBBcnJheTxUPihhcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSBjb3B5W2ldID0gYXJyYXlbaV07XHJcblxyXG4gICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG51bWJlciByb3VuZGVkIHRvIGRlY2ltYWxQbGFjZXMgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUm91bmROdW1iZXIodmFsdWU6IG51bWJlciwgZGVjaW1hbFBsYWNlczogbnVtYmVyKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZS50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpKTtcclxuICAgIH1cclxufSIsIi8qKlR3byBkaW1lbnNpb25hbCB2ZWN0b3IuIFRoaXMgY2Fsc3MgaXMgaW1tdXRhYmxlICovXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3IyXHJcbntcclxuICAgIHB1YmxpYyByZWFkb25seSB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgeTogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqQWRkcyB2ZWN0b3JBIHRvIHZlY3RvckIgYW5kIHJldHVybnMgbmV3IFZlY3RvcjIgY3JlYXRlZCBhcyB0aGUgcmVzdWx0Ki9cclxuICAgIHN0YXRpYyBBZGQodmVjdG9yQTogVmVjdG9yMiwgdmVjdG9yQjogVmVjdG9yMik6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjdG9yQS54ICsgdmVjdG9yQi54LCB2ZWN0b3JBLnkgKyB2ZWN0b3JCLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlN1YnN0cmFjdHMgdmVjdG9yQiBmcm9tIHZlY3RvckEgYW5kIHJldHVybnMgbmV3IFZlY3RvcjIgY3JlYXRlZCBhcyB0aGUgcmVzdWx0Ki9cclxuICAgIHN0YXRpYyBTdWJzdHJhY3QodmVjdG9yQTogVmVjdG9yMiwgdmVjdG9yQjogVmVjdG9yMik6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjdG9yQS54IC0gdmVjdG9yQi54LCB2ZWN0b3JBLnkgLSB2ZWN0b3JCLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKk11bHRpcGxpZXMgdmVjdG9yIGEgYnkgdmVjdG9yIGIgYW5kIHJldHVybnMgbmV3IFZlY3RvcjIgY3JlYXRlZCBhcyB0aGUgcmVzdWx0Ki9cclxuICAgIHN0YXRpYyBNdWx0aXBseSh2ZWN0b3I6IFZlY3RvcjIsIG11bHRpcGlsZXI6IG51bWJlcik6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjdG9yLnggKiBtdWx0aXBpbGVyLCB2ZWN0b3IueSAqIG11bHRpcGlsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKkNvbXB1dGVzIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlY290cnMgYW5kIHJldHVybnMgdGhlIHJlc3VsdCAqL1xyXG4gICAgc3RhdGljIERpc3RhbmNlKHZlY3RvckE6IFZlY3RvcjIsIHZlY3RvckI6IFZlY3RvcjIpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgYSA9IHZlY3RvckEueCAtIHZlY3RvckIueDtcclxuICAgICAgICBsZXQgYiA9IHZlY3RvckEueSAtIHZlY3RvckIueTtcclxuICAgICAgICBhICo9IGE7XHJcbiAgICAgICAgYiAqPSBiO1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGEgKyBiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipSZXR1cm5zIHRydWUgaWYgdHdvIHZlY3RvcnMgYXJlIGVxdWFsICovXHJcbiAgICBzdGF0aWMgRXF1YWxzKHZlY3RvckE6IFZlY3RvcjIsIHZlY3RvckI6IFZlY3RvcjIpOiBib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHZlY3RvckEueCA9PT0gdmVjdG9yQi54ICYmIHZlY3RvckEueSA9PT0gdmVjdG9yQi55O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUHJvZ3JhbSB9IGZyb20gJy4vUHJvZ3JhbSc7XG5pbXBvcnQgeyBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIgfSBmcm9tICcuL1NvbHZlcnMvQ2F0YWx5c2lzRWZmZWN0U29sdmVyJztcbmltcG9ydCB7IE1OS1NvbHZlciB9IGZyb20gJy4vU29sdmVycy9NTktTb2x2ZXInO1xuXG5sZXQgcHJvZ3JhbTtcblxuc3dpdGNoIChkb2N1bWVudC50aXRsZSkgXG57XG4gICAgY2FzZSBcIlN0cm9uYSBnxYLDs3duYVwiOlxuICAgICAgICAvLyBwcm9ncmFtID0gbmV3IFByb2dyYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkVmZWt0IGthdGFsaXp5XCI6XG4gICAgICAgIHByb2dyYW0gPSBuZXcgQ2F0YWx5c2lzRWZmZWN0U29sdmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJNTktcIjpcbiAgICAgICAgcHJvZ3JhbSA9IG5ldyBNTktTb2x2ZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCJkb2N1bWVudCB0aXRsZSBcIiArIGRvY3VtZW50LnRpdGxlICsgXCIgZG9lc24ndCBtYXRjaCBhbnkgY2FzZSFcIik7XG4gICAgICAgIGJyZWFrO1xufSJdLCJzb3VyY2VSb290IjoiIn0=