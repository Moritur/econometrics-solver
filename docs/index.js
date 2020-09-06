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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzdGF0L2Rpc3QvanN0YXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbnZhc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9Tb2x2ZXJzL0NhdGFseXNpc0VmZmVjdFNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU29sdmVycy9NTktTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NvbHZlcnMvU29sdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVmVjdG9yMi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFVBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyxRQUFRO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVOztBQUU5QjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7O0FBRUEsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLGlCQUFpQjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUEsS0FBSztBQUNMOztBQUVBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPLE9BQU87QUFDZDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCx5QkFBeUIsd0JBQXdCOztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsaUJBQWlCLFVBQVU7O0FBRTNCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7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QUFDLHlFQUF5RSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUgsYUFBYSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzlFLDJCQUFZLENBQUMsUUFBUSxDQUFDLG9FQUFvRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkgsYUFBYSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzlFLDJCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0UsYUFBYSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzlFLDJCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsYUFBYSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzlFLDJCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkUsYUFBYSxHQUFHLGlCQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEs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QWlCLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxDQUFDO1FBQzdFLE1BQU07Q0FDYiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiKGZ1bmN0aW9uICh3aW5kb3csIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmYWN0b3J5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cualN0YXQgPSBmYWN0b3J5KCk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24gKCkge1xudmFyIGpTdGF0ID0gKGZ1bmN0aW9uKE1hdGgsIHVuZGVmaW5lZCkge1xuXG4vLyBGb3IgcXVpY2sgcmVmZXJlbmNlLlxudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBDYWxjdWxhdGUgY29ycmVjdGlvbiBmb3IgSUVFRSBlcnJvclxuLy8gVE9ETzogVGhpcyBjYWxjdWxhdGlvbiBjYW4gYmUgaW1wcm92ZWQuXG5mdW5jdGlvbiBjYWxjUmR4KG4sIG0pIHtcbiAgdmFyIHZhbCA9IG4gPiBtID8gbiA6IG07XG4gIHJldHVybiBNYXRoLnBvdygxMCxcbiAgICAgICAgICAgICAgICAgIDE3IC0gfn4oTWF0aC5sb2coKCh2YWwgPiAwKSA/IHZhbCA6IC12YWwpKSAqIE1hdGguTE9HMTBFKSk7XG59XG5cblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cblxuZnVuY3Rpb24gaXNOdW1iZXIobnVtKSB7XG4gIHJldHVybiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpID8gbnVtIC0gbnVtID09PSAwIDogZmFsc2U7XG59XG5cblxuLy8gQ29udmVydHMgdGhlIGpTdGF0IG1hdHJpeCB0byB2ZWN0b3IuXG5mdW5jdGlvbiB0b1ZlY3RvcihhcnIpIHtcbiAgcmV0dXJuIGNvbmNhdC5hcHBseShbXSwgYXJyKTtcbn1cblxuXG4vLyBUaGUgb25lIGFuZCBvbmx5IGpTdGF0IGNvbnN0cnVjdG9yLlxuZnVuY3Rpb24galN0YXQoKSB7XG4gIHJldHVybiBuZXcgalN0YXQuX2luaXQoYXJndW1lbnRzKTtcbn1cblxuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgYWxsIHJlZmVyZW5jZXMgaW4gc3JjIGZpbGVzIGhhdmUgYmVlbiByZW1vdmVkLlxualN0YXQuZm4gPSBqU3RhdC5wcm90b3R5cGU7XG5cblxuLy8gQnkgc2VwYXJhdGluZyB0aGUgaW5pdGlhbGl6ZXIgZnJvbSB0aGUgY29uc3RydWN0b3IgaXQncyBlYXNpZXIgdG8gaGFuZGxlXG4vLyBhbHdheXMgcmV0dXJuaW5nIGEgbmV3IGluc3RhbmNlIHdoZXRoZXIgXCJuZXdcIiB3YXMgdXNlZCBvciBub3QuXG5qU3RhdC5faW5pdCA9IGZ1bmN0aW9uIF9pbml0KGFyZ3MpIHtcbiAgLy8gSWYgZmlyc3QgYXJndW1lbnQgaXMgYW4gYXJyYXksIG11c3QgYmUgdmVjdG9yIG9yIG1hdHJpeC5cbiAgaWYgKGlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAvLyBDaGVjayBpZiBtYXRyaXguXG4gICAgaWYgKGlzQXJyYXkoYXJnc1swXVswXSkpIHtcbiAgICAgIC8vIFNlZSBpZiBhIG1hcHBpbmcgZnVuY3Rpb24gd2FzIGFsc28gcGFzc2VkLlxuICAgICAgaWYgKGlzRnVuY3Rpb24oYXJnc1sxXSkpXG4gICAgICAgIGFyZ3NbMF0gPSBqU3RhdC5tYXAoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAvLyBJdGVyYXRlIG92ZXIgZWFjaCBpcyBmYXN0ZXIgdGhhbiB0aGlzLnB1c2guYXBwbHkodGhpcywgYXJnc1swXS5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc1swXS5sZW5ndGg7IGkrKylcbiAgICAgICAgdGhpc1tpXSA9IGFyZ3NbMF1baV07XG4gICAgICB0aGlzLmxlbmd0aCA9IGFyZ3NbMF0ubGVuZ3RoO1xuXG4gICAgLy8gT3RoZXJ3aXNlIG11c3QgYmUgYSB2ZWN0b3IuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXNbMF0gPSBpc0Z1bmN0aW9uKGFyZ3NbMV0pID8galN0YXQubWFwKGFyZ3NbMF0sIGFyZ3NbMV0pIDogYXJnc1swXTtcbiAgICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgICB9XG5cbiAgLy8gSWYgZmlyc3QgYXJndW1lbnQgaXMgbnVtYmVyLCBhc3N1bWUgY3JlYXRpb24gb2Ygc2VxdWVuY2UuXG4gIH0gZWxzZSBpZiAoaXNOdW1iZXIoYXJnc1swXSkpIHtcbiAgICB0aGlzWzBdID0galN0YXQuc2VxLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIHRoaXMubGVuZ3RoID0gMTtcblxuICAvLyBIYW5kbGUgY2FzZSB3aGVuIGpTdGF0IG9iamVjdCBpcyBwYXNzZWQgdG8galN0YXQuXG4gIH0gZWxzZSBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIGpTdGF0KSB7XG4gICAgLy8gRHVwbGljYXRlIHRoZSBvYmplY3QgYW5kIHBhc3MgaXQgYmFjay5cbiAgICByZXR1cm4galN0YXQoYXJnc1swXS50b0FycmF5KCkpO1xuXG4gIC8vIFVuZXhwZWN0ZWQgYXJndW1lbnQgdmFsdWUsIHJldHVybiBlbXB0eSBqU3RhdCBvYmplY3QuXG4gIC8vIFRPRE86IFRoaXMgaXMgc3RyYW5nZSBiZWhhdmlvci4gU2hvdWxkbid0IHRoaXMgdGhyb3cgb3Igc29tZSBzdWNoIHRvIGxldFxuICAvLyB0aGUgdXNlciBrbm93IHRoZXkgaGFkIGJhZCBhcmd1bWVudHM/XG4gIH0gZWxzZSB7XG4gICAgdGhpc1swXSA9IFtdO1xuICAgIHRoaXMubGVuZ3RoID0gMTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbmpTdGF0Ll9pbml0LnByb3RvdHlwZSA9IGpTdGF0LnByb3RvdHlwZTtcbmpTdGF0Ll9pbml0LmNvbnN0cnVjdG9yID0galN0YXQ7XG5cblxuLy8gVXRpbGl0eSBmdW5jdGlvbnMuXG4vLyBUT0RPOiBmb3IgaW50ZXJuYWwgdXNlIG9ubHk/XG5qU3RhdC51dGlscyA9IHtcbiAgY2FsY1JkeDogY2FsY1JkeCxcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICB0b1ZlY3RvcjogdG9WZWN0b3Jcbn07XG5cblxualN0YXQuX3JhbmRvbV9mbiA9IE1hdGgucmFuZG9tO1xualN0YXQuc2V0UmFuZG9tID0gZnVuY3Rpb24gc2V0UmFuZG9tKGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZm4gaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgalN0YXQuX3JhbmRvbV9mbiA9IGZuO1xufTtcblxuXG4vLyBFYXNpbHkgZXh0ZW5kIHRoZSBqU3RhdCBvYmplY3QuXG4vLyBUT0RPOiBpcyB0aGlzIHNlcmlvdXNseSBuZWNlc3Nhcnk/XG5qU3RhdC5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQob2JqKSB7XG4gIHZhciBpLCBqO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgZm9yIChqIGluIG9iailcbiAgICAgIGpTdGF0W2pdID0gb2JqW2pdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAoaiBpbiBhcmd1bWVudHNbaV0pXG4gICAgICBvYmpbal0gPSBhcmd1bWVudHNbaV1bal07XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgbWF0cml4LlxualN0YXQucm93cyA9IGZ1bmN0aW9uIHJvd3MoYXJyKSB7XG4gIHJldHVybiBhcnIubGVuZ3RoIHx8IDE7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBtYXRyaXguXG5qU3RhdC5jb2xzID0gZnVuY3Rpb24gY29scyhhcnIpIHtcbiAgcmV0dXJuIGFyclswXS5sZW5ndGggfHwgMTtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgb2JqZWN0IHsgcm93czogaSwgY29sczogaiB9XG5qU3RhdC5kaW1lbnNpb25zID0gZnVuY3Rpb24gZGltZW5zaW9ucyhhcnIpIHtcbiAgcmV0dXJuIHtcbiAgICByb3dzOiBqU3RhdC5yb3dzKGFyciksXG4gICAgY29sczogalN0YXQuY29scyhhcnIpXG4gIH07XG59O1xuXG5cbi8vIFJldHVybnMgYSBzcGVjaWZpZWQgcm93IGFzIGEgdmVjdG9yIG9yIHJldHVybiBhIHN1YiBtYXRyaXggYnkgcGljayBzb21lIHJvd3NcbmpTdGF0LnJvdyA9IGZ1bmN0aW9uIHJvdyhhcnIsIGluZGV4KSB7XG4gIGlmIChpc0FycmF5KGluZGV4KSkge1xuICAgIHJldHVybiBpbmRleC5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIGpTdGF0LnJvdyhhcnIsIGkpO1xuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGFycltpbmRleF07XG59O1xuXG5cbi8vIHJldHVybiByb3cgYXMgYXJyYXlcbi8vIHJvd2EoW1sxLDJdLFszLDRdXSwwKSAtPiBbMSwyXVxualN0YXQucm93YSA9IGZ1bmN0aW9uIHJvd2EoYXJyLCBpKSB7XG4gIHJldHVybiBqU3RhdC5yb3coYXJyLCBpKTtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgc3BlY2lmaWVkIGNvbHVtbiBhcyBhIHZlY3RvciBvciByZXR1cm4gYSBzdWIgbWF0cml4IGJ5IHBpY2sgc29tZVxuLy8gY29sdW1uc1xualN0YXQuY29sID0gZnVuY3Rpb24gY29sKGFyciwgaW5kZXgpIHtcbiAgaWYgKGlzQXJyYXkoaW5kZXgpKSB7XG4gICAgdmFyIHN1Ym1hdCA9IGpTdGF0LmFyYW5nZShhcnIubGVuZ3RoKS5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5KGluZGV4Lmxlbmd0aCk7XG4gICAgfSk7XG4gICAgaW5kZXguZm9yRWFjaChmdW5jdGlvbihpbmQsIGkpe1xuICAgICAgalN0YXQuYXJhbmdlKGFyci5sZW5ndGgpLmZvckVhY2goZnVuY3Rpb24oaikge1xuICAgICAgICBzdWJtYXRbal1baV0gPSBhcnJbal1baW5kXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBzdWJtYXQ7XG4gIH1cbiAgdmFyIGNvbHVtbiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspXG4gICAgY29sdW1uW2ldID0gW2FycltpXVtpbmRleF1dO1xuICByZXR1cm4gY29sdW1uO1xufTtcblxuXG4vLyByZXR1cm4gY29sdW1uIGFzIGFycmF5XG4vLyBjb2xhKFtbMSwyXSxbMyw0XV0sMCkgLT4gWzEsM11cbmpTdGF0LmNvbGEgPSBmdW5jdGlvbiBjb2xhKGFyciwgaSkge1xuICByZXR1cm4galN0YXQuY29sKGFyciwgaSkubWFwKGZ1bmN0aW9uKGEpeyByZXR1cm4gYVswXSB9KTtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgZGlhZ29uYWwgb2YgdGhlIG1hdHJpeFxualN0YXQuZGlhZyA9IGZ1bmN0aW9uIGRpYWcoYXJyKSB7XG4gIHZhciBucm93ID0galN0YXQucm93cyhhcnIpO1xuICB2YXIgcmVzID0gbmV3IEFycmF5KG5yb3cpO1xuICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBucm93OyByb3crKylcbiAgICByZXNbcm93XSA9IFthcnJbcm93XVtyb3ddXTtcbiAgcmV0dXJuIHJlcztcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgYW50aS1kaWFnb25hbCBvZiB0aGUgbWF0cml4XG5qU3RhdC5hbnRpZGlhZyA9IGZ1bmN0aW9uIGFudGlkaWFnKGFycikge1xuICB2YXIgbnJvdyA9IGpTdGF0LnJvd3MoYXJyKSAtIDE7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkobnJvdyk7XG4gIGZvciAodmFyIGkgPSAwOyBucm93ID49IDA7IG5yb3ctLSwgaSsrKVxuICAgIHJlc1tpXSA9IFthcnJbaV1bbnJvd11dO1xuICByZXR1cm4gcmVzO1xufTtcblxuLy8gVHJhbnNwb3NlIGEgbWF0cml4IG9yIGFycmF5LlxualN0YXQudHJhbnNwb3NlID0gZnVuY3Rpb24gdHJhbnNwb3NlKGFycikge1xuICB2YXIgb2JqID0gW107XG4gIHZhciBvYmpBcnIsIHJvd3MsIGNvbHMsIGosIGk7XG5cbiAgLy8gTWFrZSBzdXJlIGFyciBpcyBpbiBtYXRyaXggZm9ybWF0LlxuICBpZiAoIWlzQXJyYXkoYXJyWzBdKSlcbiAgICBhcnIgPSBbYXJyXTtcblxuICByb3dzID0gYXJyLmxlbmd0aDtcbiAgY29scyA9IGFyclswXS5sZW5ndGg7XG5cbiAgZm9yIChpID0gMDsgaSA8IGNvbHM7IGkrKykge1xuICAgIG9iakFyciA9IG5ldyBBcnJheShyb3dzKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgcm93czsgaisrKVxuICAgICAgb2JqQXJyW2pdID0gYXJyW2pdW2ldO1xuICAgIG9iai5wdXNoKG9iakFycik7XG4gIH1cblxuICAvLyBJZiBvYmogaXMgdmVjdG9yLCByZXR1cm4gb25seSBzaW5nbGUgYXJyYXkuXG4gIHJldHVybiBvYmoubGVuZ3RoID09PSAxID8gb2JqWzBdIDogb2JqO1xufTtcblxuXG4vLyBNYXAgYSBmdW5jdGlvbiB0byBhbiBhcnJheSBvciBhcnJheSBvZiBhcnJheXMuXG4vLyBcInRvQWx0ZXJcIiBpcyBhbiBpbnRlcm5hbCB2YXJpYWJsZS5cbmpTdGF0Lm1hcCA9IGZ1bmN0aW9uIG1hcChhcnIsIGZ1bmMsIHRvQWx0ZXIpIHtcbiAgdmFyIHJvdywgbnJvdywgbmNvbCwgcmVzLCBjb2w7XG5cbiAgaWYgKCFpc0FycmF5KGFyclswXSkpXG4gICAgYXJyID0gW2Fycl07XG5cbiAgbnJvdyA9IGFyci5sZW5ndGg7XG4gIG5jb2wgPSBhcnJbMF0ubGVuZ3RoO1xuICByZXMgPSB0b0FsdGVyID8gYXJyIDogbmV3IEFycmF5KG5yb3cpO1xuXG4gIGZvciAocm93ID0gMDsgcm93IDwgbnJvdzsgcm93KyspIHtcbiAgICAvLyBpZiB0aGUgcm93IGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBpdFxuICAgIGlmICghcmVzW3Jvd10pXG4gICAgICByZXNbcm93XSA9IG5ldyBBcnJheShuY29sKTtcbiAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IG5jb2w7IGNvbCsrKVxuICAgICAgcmVzW3Jvd11bY29sXSA9IGZ1bmMoYXJyW3Jvd11bY29sXSwgcm93LCBjb2wpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5sZW5ndGggPT09IDEgPyByZXNbMF0gOiByZXM7XG59O1xuXG5cbi8vIEN1bXVsYXRpdmVseSBjb21iaW5lIHRoZSBlbGVtZW50cyBvZiBhbiBhcnJheSBvciBhcnJheSBvZiBhcnJheXMgdXNpbmcgYSBmdW5jdGlvbi5cbmpTdGF0LmN1bXJlZHVjZSA9IGZ1bmN0aW9uIGN1bXJlZHVjZShhcnIsIGZ1bmMsIHRvQWx0ZXIpIHtcbiAgdmFyIHJvdywgbnJvdywgbmNvbCwgcmVzLCBjb2w7XG5cbiAgaWYgKCFpc0FycmF5KGFyclswXSkpXG4gICAgYXJyID0gW2Fycl07XG5cbiAgbnJvdyA9IGFyci5sZW5ndGg7XG4gIG5jb2wgPSBhcnJbMF0ubGVuZ3RoO1xuICByZXMgPSB0b0FsdGVyID8gYXJyIDogbmV3IEFycmF5KG5yb3cpO1xuXG4gIGZvciAocm93ID0gMDsgcm93IDwgbnJvdzsgcm93KyspIHtcbiAgICAvLyBpZiB0aGUgcm93IGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBpdFxuICAgIGlmICghcmVzW3Jvd10pXG4gICAgICByZXNbcm93XSA9IG5ldyBBcnJheShuY29sKTtcbiAgICBpZiAobmNvbCA+IDApXG4gICAgICByZXNbcm93XVswXSA9IGFycltyb3ddWzBdO1xuICAgIGZvciAoY29sID0gMTsgY29sIDwgbmNvbDsgY29sKyspXG4gICAgICByZXNbcm93XVtjb2xdID0gZnVuYyhyZXNbcm93XVtjb2wtMV0sIGFycltyb3ddW2NvbF0pO1xuICB9XG4gIHJldHVybiByZXMubGVuZ3RoID09PSAxID8gcmVzWzBdIDogcmVzO1xufTtcblxuXG4vLyBEZXN0cnVjdGl2ZWx5IGFsdGVyIGFuIGFycmF5LlxualN0YXQuYWx0ZXIgPSBmdW5jdGlvbiBhbHRlcihhcnIsIGZ1bmMpIHtcbiAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmMsIHRydWUpO1xufTtcblxuXG4vLyBHZW5lcmF0ZSBhIHJvd3MgeCBjb2xzIG1hdHJpeCBhY2NvcmRpbmcgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxualN0YXQuY3JlYXRlID0gZnVuY3Rpb24gIGNyZWF0ZShyb3dzLCBjb2xzLCBmdW5jKSB7XG4gIHZhciByZXMgPSBuZXcgQXJyYXkocm93cyk7XG4gIHZhciBpLCBqO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGNvbHMpKSB7XG4gICAgZnVuYyA9IGNvbHM7XG4gICAgY29scyA9IHJvd3M7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgcmVzW2ldID0gbmV3IEFycmF5KGNvbHMpO1xuICAgIGZvciAoaiA9IDA7IGogPCBjb2xzOyBqKyspXG4gICAgICByZXNbaV1bal0gPSBmdW5jKGksIGopO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn07XG5cblxuZnVuY3Rpb24gcmV0WmVybygpIHsgcmV0dXJuIDA7IH1cblxuXG4vLyBHZW5lcmF0ZSBhIHJvd3MgeCBjb2xzIG1hdHJpeCBvZiB6ZXJvcy5cbmpTdGF0Lnplcm9zID0gZnVuY3Rpb24gemVyb3Mocm93cywgY29scykge1xuICBpZiAoIWlzTnVtYmVyKGNvbHMpKVxuICAgIGNvbHMgPSByb3dzO1xuICByZXR1cm4galN0YXQuY3JlYXRlKHJvd3MsIGNvbHMsIHJldFplcm8pO1xufTtcblxuXG5mdW5jdGlvbiByZXRPbmUoKSB7IHJldHVybiAxOyB9XG5cblxuLy8gR2VuZXJhdGUgYSByb3dzIHggY29scyBtYXRyaXggb2Ygb25lcy5cbmpTdGF0Lm9uZXMgPSBmdW5jdGlvbiBvbmVzKHJvd3MsIGNvbHMpIHtcbiAgaWYgKCFpc051bWJlcihjb2xzKSlcbiAgICBjb2xzID0gcm93cztcbiAgcmV0dXJuIGpTdGF0LmNyZWF0ZShyb3dzLCBjb2xzLCByZXRPbmUpO1xufTtcblxuXG4vLyBHZW5lcmF0ZSBhIHJvd3MgeCBjb2xzIG1hdHJpeCBvZiB1bmlmb3JtbHkgcmFuZG9tIG51bWJlcnMuXG5qU3RhdC5yYW5kID0gZnVuY3Rpb24gcmFuZChyb3dzLCBjb2xzKSB7XG4gIGlmICghaXNOdW1iZXIoY29scykpXG4gICAgY29scyA9IHJvd3M7XG4gIHJldHVybiBqU3RhdC5jcmVhdGUocm93cywgY29scywgalN0YXQuX3JhbmRvbV9mbik7XG59O1xuXG5cbmZ1bmN0aW9uIHJldElkZW50KGksIGopIHsgcmV0dXJuIGkgPT09IGogPyAxIDogMDsgfVxuXG5cbi8vIEdlbmVyYXRlIGFuIGlkZW50aXR5IG1hdHJpeCBvZiBzaXplIHJvdyB4IGNvbHMuXG5qU3RhdC5pZGVudGl0eSA9IGZ1bmN0aW9uIGlkZW50aXR5KHJvd3MsIGNvbHMpIHtcbiAgaWYgKCFpc051bWJlcihjb2xzKSlcbiAgICBjb2xzID0gcm93cztcbiAgcmV0dXJuIGpTdGF0LmNyZWF0ZShyb3dzLCBjb2xzLCByZXRJZGVudCk7XG59O1xuXG5cbi8vIFRlc3RzIHdoZXRoZXIgYSBtYXRyaXggaXMgc3ltbWV0cmljXG5qU3RhdC5zeW1tZXRyaWMgPSBmdW5jdGlvbiBzeW1tZXRyaWMoYXJyKSB7XG4gIHZhciBzaXplID0gYXJyLmxlbmd0aDtcbiAgdmFyIHJvdywgY29sO1xuXG4gIGlmIChhcnIubGVuZ3RoICE9PSBhcnJbMF0ubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKHJvdyA9IDA7IHJvdyA8IHNpemU7IHJvdysrKSB7XG4gICAgZm9yIChjb2wgPSAwOyBjb2wgPCBzaXplOyBjb2wrKylcbiAgICAgIGlmIChhcnJbY29sXVtyb3ddICE9PSBhcnJbcm93XVtjb2xdKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLy8gU2V0IGFsbCB2YWx1ZXMgdG8gemVyby5cbmpTdGF0LmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5hbHRlcihhcnIsIHJldFplcm8pO1xufTtcblxuXG4vLyBHZW5lcmF0ZSBzZXF1ZW5jZS5cbmpTdGF0LnNlcSA9IGZ1bmN0aW9uIHNlcShtaW4sIG1heCwgbGVuZ3RoLCBmdW5jKSB7XG4gIGlmICghaXNGdW5jdGlvbihmdW5jKSlcbiAgICBmdW5jID0gZmFsc2U7XG5cbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGl2YWwgPSBjYWxjUmR4KG1pbiwgbWF4KTtcbiAgdmFyIHN0ZXAgPSAobWF4ICogaGl2YWwgLSBtaW4gKiBoaXZhbCkgLyAoKGxlbmd0aCAtIDEpICogaGl2YWwpO1xuICB2YXIgY3VycmVudCA9IG1pbjtcbiAgdmFyIGNudDtcblxuICAvLyBDdXJyZW50IGlzIGFzc2lnbmVkIHVzaW5nIGEgdGVjaG5pcXVlIHRvIGNvbXBlbnNhdGUgZm9yIElFRUUgZXJyb3IuXG4gIC8vIFRPRE86IE5lZWRzIGJldHRlciBpbXBsZW1lbnRhdGlvbi5cbiAgZm9yIChjbnQgPSAwO1xuICAgICAgIGN1cnJlbnQgPD0gbWF4ICYmIGNudCA8IGxlbmd0aDtcbiAgICAgICBjbnQrKywgY3VycmVudCA9IChtaW4gKiBoaXZhbCArIHN0ZXAgKiBoaXZhbCAqIGNudCkgLyBoaXZhbCkge1xuICAgIGFyci5wdXNoKChmdW5jID8gZnVuYyhjdXJyZW50LCBjbnQpIDogY3VycmVudCkpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cblxuLy8gYXJhbmdlKDUpIC0+IFswLDEsMiwzLDRdXG4vLyBhcmFuZ2UoMSw1KSAtPiBbMSwyLDMsNF1cbi8vIGFyYW5nZSg1LDEsLTEpIC0+IFs1LDQsMywyXVxualN0YXQuYXJhbmdlID0gZnVuY3Rpb24gYXJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXApIHtcbiAgdmFyIHJsID0gW107XG4gIHZhciBpO1xuICBzdGVwID0gc3RlcCB8fCAxO1xuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSBzdGFydDtcbiAgICBzdGFydCA9IDA7XG4gIH1cbiAgaWYgKHN0YXJ0ID09PSBlbmQgfHwgc3RlcCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoc3RhcnQgPCBlbmQgJiYgc3RlcCA8IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKHN0YXJ0ID4gZW5kICYmIHN0ZXAgPiAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChzdGVwID4gMCkge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IHN0ZXApIHtcbiAgICAgIHJsLnB1c2goaSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpID4gZW5kOyBpICs9IHN0ZXApIHtcbiAgICAgIHJsLnB1c2goaSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBybDtcbn07XG5cblxuLy8gQT1bWzEsMiwzXSxbNCw1LDZdLFs3LDgsOV1dXG4vLyBzbGljZShBLHtyb3c6e2VuZDoyfSxjb2w6e3N0YXJ0OjF9fSkgLT4gW1syLDNdLFs1LDZdXVxuLy8gc2xpY2UoQSwxLHtzdGFydDoxfSkgLT4gWzUsNl1cbi8vIGFzIG51bXB5IGNvZGUgQVs6MiwxOl1cbmpTdGF0LnNsaWNlID0gKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIF9zbGljZShsaXN0LCBzdGFydCwgZW5kLCBzdGVwKSB7XG4gICAgLy8gbm90ZSBpdCdzIG5vdCBlcXVhbCB0byByYW5nZS5tYXAgbW9kZSBpdCdzIGEgYnVnXG4gICAgdmFyIGk7XG4gICAgdmFyIHJsID0gW107XG4gICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkICYmIGVuZCA9PT0gdW5kZWZpbmVkICYmIHN0ZXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGpTdGF0LmNvcHkobGlzdCk7XG4gICAgfVxuXG4gICAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICAgIGVuZCA9IGVuZCB8fCBsaXN0Lmxlbmd0aDtcbiAgICBzdGFydCA9IHN0YXJ0ID49IDAgPyBzdGFydCA6IGxlbmd0aCArIHN0YXJ0O1xuICAgIGVuZCA9IGVuZCA+PSAwID8gZW5kIDogbGVuZ3RoICsgZW5kO1xuICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgaWYgKHN0YXJ0ID09PSBlbmQgfHwgc3RlcCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgPCBlbmQgJiYgc3RlcCA8IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0ID4gZW5kICYmIHN0ZXAgPiAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChzdGVwID4gMCkge1xuICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gc3RlcCkge1xuICAgICAgICBybC5wdXNoKGxpc3RbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSBzdGFydDsgaSA+IGVuZDtpICs9IHN0ZXApIHtcbiAgICAgICAgcmwucHVzaChsaXN0W2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJsO1xuICB9XG5cbiAgZnVuY3Rpb24gc2xpY2UobGlzdCwgcmNTbGljZSkge1xuICAgIHZhciBjb2xTbGljZSwgcm93U2xpY2U7XG4gICAgcmNTbGljZSA9IHJjU2xpY2UgfHwge307XG4gICAgaWYgKGlzTnVtYmVyKHJjU2xpY2Uucm93KSkge1xuICAgICAgaWYgKGlzTnVtYmVyKHJjU2xpY2UuY29sKSlcbiAgICAgICAgcmV0dXJuIGxpc3RbcmNTbGljZS5yb3ddW3JjU2xpY2UuY29sXTtcbiAgICAgIHZhciByb3cgPSBqU3RhdC5yb3dhKGxpc3QsIHJjU2xpY2Uucm93KTtcbiAgICAgIGNvbFNsaWNlID0gcmNTbGljZS5jb2wgfHwge307XG4gICAgICByZXR1cm4gX3NsaWNlKHJvdywgY29sU2xpY2Uuc3RhcnQsIGNvbFNsaWNlLmVuZCwgY29sU2xpY2Uuc3RlcCk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKHJjU2xpY2UuY29sKSkge1xuICAgICAgdmFyIGNvbCA9IGpTdGF0LmNvbGEobGlzdCwgcmNTbGljZS5jb2wpO1xuICAgICAgcm93U2xpY2UgPSByY1NsaWNlLnJvdyB8fCB7fTtcbiAgICAgIHJldHVybiBfc2xpY2UoY29sLCByb3dTbGljZS5zdGFydCwgcm93U2xpY2UuZW5kLCByb3dTbGljZS5zdGVwKTtcbiAgICB9XG5cbiAgICByb3dTbGljZSA9IHJjU2xpY2Uucm93IHx8IHt9O1xuICAgIGNvbFNsaWNlID0gcmNTbGljZS5jb2wgfHwge307XG4gICAgdmFyIHJvd3MgPSBfc2xpY2UobGlzdCwgcm93U2xpY2Uuc3RhcnQsIHJvd1NsaWNlLmVuZCwgcm93U2xpY2Uuc3RlcCk7XG4gICAgcmV0dXJuIHJvd3MubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgICAgcmV0dXJuIF9zbGljZShyb3csIGNvbFNsaWNlLnN0YXJ0LCBjb2xTbGljZS5lbmQsIGNvbFNsaWNlLnN0ZXApO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNsaWNlO1xufSgpKTtcblxuXG4vLyBBPVtbMSwyLDNdLFs0LDUsNl0sWzcsOCw5XV1cbi8vIHNsaWNlQXNzaWduKEEse3Jvdzp7c3RhcnQ6MX0sY29sOntzdGFydDoxfX0sW1swLDBdLFswLDBdXSlcbi8vIEE9W1sxLDIsM10sWzQsMCwwXSxbNywwLDBdXVxualN0YXQuc2xpY2VBc3NpZ24gPSBmdW5jdGlvbiBzbGljZUFzc2lnbihBLCByY1NsaWNlLCBCKSB7XG4gIHZhciBubCwgbWw7XG4gIGlmIChpc051bWJlcihyY1NsaWNlLnJvdykpIHtcbiAgICBpZiAoaXNOdW1iZXIocmNTbGljZS5jb2wpKVxuICAgICAgcmV0dXJuIEFbcmNTbGljZS5yb3ddW3JjU2xpY2UuY29sXSA9IEI7XG4gICAgcmNTbGljZS5jb2wgPSByY1NsaWNlLmNvbCB8fCB7fTtcbiAgICByY1NsaWNlLmNvbC5zdGFydCA9IHJjU2xpY2UuY29sLnN0YXJ0IHx8IDA7XG4gICAgcmNTbGljZS5jb2wuZW5kID0gcmNTbGljZS5jb2wuZW5kIHx8IEFbMF0ubGVuZ3RoO1xuICAgIHJjU2xpY2UuY29sLnN0ZXAgPSByY1NsaWNlLmNvbC5zdGVwIHx8IDE7XG4gICAgbmwgPSBqU3RhdC5hcmFuZ2UocmNTbGljZS5jb2wuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWluKEEubGVuZ3RoLCByY1NsaWNlLmNvbC5lbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByY1NsaWNlLmNvbC5zdGVwKTtcbiAgICB2YXIgbSA9IHJjU2xpY2Uucm93O1xuICAgIG5sLmZvckVhY2goZnVuY3Rpb24obiwgaSkge1xuICAgICAgQVttXVtuXSA9IEJbaV07XG4gICAgfSk7XG4gICAgcmV0dXJuIEE7XG4gIH1cblxuICBpZiAoaXNOdW1iZXIocmNTbGljZS5jb2wpKSB7XG4gICAgcmNTbGljZS5yb3cgPSByY1NsaWNlLnJvdyB8fCB7fTtcbiAgICByY1NsaWNlLnJvdy5zdGFydCA9IHJjU2xpY2Uucm93LnN0YXJ0IHx8IDA7XG4gICAgcmNTbGljZS5yb3cuZW5kID0gcmNTbGljZS5yb3cuZW5kIHx8IEEubGVuZ3RoO1xuICAgIHJjU2xpY2Uucm93LnN0ZXAgPSByY1NsaWNlLnJvdy5zdGVwIHx8IDE7XG4gICAgbWwgPSBqU3RhdC5hcmFuZ2UocmNTbGljZS5yb3cuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWluKEFbMF0ubGVuZ3RoLCByY1NsaWNlLnJvdy5lbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByY1NsaWNlLnJvdy5zdGVwKTtcbiAgICB2YXIgbiA9IHJjU2xpY2UuY29sO1xuICAgIG1sLmZvckVhY2goZnVuY3Rpb24obSwgaikge1xuICAgICAgQVttXVtuXSA9IEJbal07XG4gICAgfSk7XG4gICAgcmV0dXJuIEE7XG4gIH1cblxuICBpZiAoQlswXS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIEIgPSBbQl07XG4gIH1cbiAgcmNTbGljZS5yb3cuc3RhcnQgPSByY1NsaWNlLnJvdy5zdGFydCB8fCAwO1xuICByY1NsaWNlLnJvdy5lbmQgPSByY1NsaWNlLnJvdy5lbmQgfHwgQS5sZW5ndGg7XG4gIHJjU2xpY2Uucm93LnN0ZXAgPSByY1NsaWNlLnJvdy5zdGVwIHx8IDE7XG4gIHJjU2xpY2UuY29sLnN0YXJ0ID0gcmNTbGljZS5jb2wuc3RhcnQgfHwgMDtcbiAgcmNTbGljZS5jb2wuZW5kID0gcmNTbGljZS5jb2wuZW5kIHx8IEFbMF0ubGVuZ3RoO1xuICByY1NsaWNlLmNvbC5zdGVwID0gcmNTbGljZS5jb2wuc3RlcCB8fCAxO1xuICBtbCA9IGpTdGF0LmFyYW5nZShyY1NsaWNlLnJvdy5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWluKEEubGVuZ3RoLCByY1NsaWNlLnJvdy5lbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmNTbGljZS5yb3cuc3RlcCk7XG4gIG5sID0galN0YXQuYXJhbmdlKHJjU2xpY2UuY29sLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oQVswXS5sZW5ndGgsIHJjU2xpY2UuY29sLmVuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICByY1NsaWNlLmNvbC5zdGVwKTtcbiAgbWwuZm9yRWFjaChmdW5jdGlvbihtLCBpKSB7XG4gICAgbmwuZm9yRWFjaChmdW5jdGlvbihuLCBqKSB7XG4gICAgICBBW21dW25dID0gQltpXVtqXTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBBO1xufTtcblxuXG4vLyBbMSwyLDNdIC0+XG4vLyBbWzEsMCwwXSxbMCwyLDBdLFswLDAsM11dXG5qU3RhdC5kaWFnb25hbCA9IGZ1bmN0aW9uIGRpYWdvbmFsKGRpYWdBcnJheSkge1xuICB2YXIgbWF0ID0galN0YXQuemVyb3MoZGlhZ0FycmF5Lmxlbmd0aCwgZGlhZ0FycmF5Lmxlbmd0aCk7XG4gIGRpYWdBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHQsIGkpIHtcbiAgICBtYXRbaV1baV0gPSB0O1xuICB9KTtcbiAgcmV0dXJuIG1hdDtcbn07XG5cblxuLy8gcmV0dXJuIGNvcHkgb2YgQVxualN0YXQuY29weSA9IGZ1bmN0aW9uIGNvcHkoQSkge1xuICByZXR1cm4gQS5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgaWYgKGlzTnVtYmVyKHJvdykpXG4gICAgICByZXR1cm4gcm93O1xuICAgIHJldHVybiByb3cubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0pO1xuICB9KTtcbn07XG5cblxuLy8gVE9ETzogR28gb3ZlciB0aGlzIGVudGlyZSBpbXBsZW1lbnRhdGlvbi4gU2VlbXMgYSB0cmFnaWMgd2FzdGUgb2YgcmVzb3VyY2VzXG4vLyBkb2luZyBhbGwgdGhpcyB3b3JrLiBJbnN0ZWFkLCBhbmQgd2hpbGUgdWdseSwgdXNlIG5ldyBGdW5jdGlvbigpIHRvIGdlbmVyYXRlXG4vLyBhIGN1c3RvbSBmdW5jdGlvbiBmb3IgZWFjaCBzdGF0aWMgbWV0aG9kLlxuXG4vLyBRdWljayByZWZlcmVuY2UuXG52YXIgalByb3RvID0galN0YXQucHJvdG90eXBlO1xuXG4vLyBEZWZhdWx0IGxlbmd0aC5cbmpQcm90by5sZW5ndGggPSAwO1xuXG4vLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4vLyBUT0RPOiBDaGVjayBpZiB0aGV5J3JlIGFjdHVhbGx5IHVzZWQsIGFuZCBpZiB0aGV5IGFyZSB0aGVuIHJlbmFtZSB0aGVtXG4vLyB0byBfKlxualByb3RvLnB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbmpQcm90by5zb3J0ID0gQXJyYXkucHJvdG90eXBlLnNvcnQ7XG5qUHJvdG8uc3BsaWNlID0gQXJyYXkucHJvdG90eXBlLnNwbGljZTtcbmpQcm90by5zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuXG4vLyBSZXR1cm4gYSBjbGVhbiBhcnJheS5cbmpQcm90by50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgcmV0dXJuIHRoaXMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwodGhpcykgOiBzbGljZS5jYWxsKHRoaXMpWzBdO1xufTtcblxuXG4vLyBNYXAgYSBmdW5jdGlvbiB0byBhIG1hdHJpeCBvciB2ZWN0b3IuXG5qUHJvdG8ubWFwID0gZnVuY3Rpb24gbWFwKGZ1bmMsIHRvQWx0ZXIpIHtcbiAgcmV0dXJuIGpTdGF0KGpTdGF0Lm1hcCh0aGlzLCBmdW5jLCB0b0FsdGVyKSk7XG59O1xuXG5cbi8vIEN1bXVsYXRpdmVseSBjb21iaW5lIHRoZSBlbGVtZW50cyBvZiBhIG1hdHJpeCBvciB2ZWN0b3IgdXNpbmcgYSBmdW5jdGlvbi5cbmpQcm90by5jdW1yZWR1Y2UgPSBmdW5jdGlvbiBjdW1yZWR1Y2UoZnVuYywgdG9BbHRlcikge1xuICByZXR1cm4galN0YXQoalN0YXQuY3VtcmVkdWNlKHRoaXMsIGZ1bmMsIHRvQWx0ZXIpKTtcbn07XG5cblxuLy8gRGVzdHJ1Y3RpdmVseSBhbHRlciBhbiBhcnJheS5cbmpQcm90by5hbHRlciA9IGZ1bmN0aW9uIGFsdGVyKGZ1bmMpIHtcbiAgalN0YXQuYWx0ZXIodGhpcywgZnVuYyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vLyBFeHRlbmQgcHJvdG90eXBlIHdpdGggbWV0aG9kcyB0aGF0IGhhdmUgbm8gYXJndW1lbnQuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalByb3RvW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHJlc3VsdHM7XG4gICAgICAvLyBDaGVjayBmb3IgY2FsbGJhY2suXG4gICAgICBpZiAoZnVuYykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZ1bmMuY2FsbChzZWxmLCBqUHJvdG9bcGFzc2Z1bmNdLmNhbGwoc2VsZikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICByZXN1bHRzID0galN0YXRbcGFzc2Z1bmNdKHRoaXMpO1xuICAgICAgcmV0dXJuIGlzQXJyYXkocmVzdWx0cykgPyBqU3RhdChyZXN1bHRzKSA6IHJlc3VsdHM7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoJ3RyYW5zcG9zZSBjbGVhciBzeW1tZXRyaWMgcm93cyBjb2xzIGRpbWVuc2lvbnMgZGlhZyBhbnRpZGlhZycuc3BsaXQoJyAnKSk7XG5cblxuLy8gRXh0ZW5kIHByb3RvdHlwZSB3aXRoIG1ldGhvZHMgdGhhdCBoYXZlIG9uZSBhcmd1bWVudC5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqUHJvdG9bcGFzc2Z1bmNdID0gZnVuY3Rpb24oaW5kZXgsIGZ1bmMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIC8vIGNoZWNrIGZvciBjYWxsYmFja1xuICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBmdW5jLmNhbGwoc2VsZiwgalByb3RvW3Bhc3NmdW5jXS5jYWxsKHNlbGYsIGluZGV4KSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBqU3RhdChqU3RhdFtwYXNzZnVuY10odGhpcywgaW5kZXgpKTtcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgncm93IGNvbCcuc3BsaXQoJyAnKSk7XG5cblxuLy8gRXh0ZW5kIHByb3RvdHlwZSB3aXRoIHNpbXBsZSBzaG9ydGN1dCBtZXRob2RzLlxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpQcm90b1twYXNzZnVuY10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBqU3RhdChqU3RhdFtwYXNzZnVuY10uYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoJ2NyZWF0ZSB6ZXJvcyBvbmVzIHJhbmQgaWRlbnRpdHknLnNwbGl0KCcgJykpO1xuXG5cbi8vIEV4cG9zaW5nIGpTdGF0LlxucmV0dXJuIGpTdGF0O1xuXG59KE1hdGgpKTtcbihmdW5jdGlvbihqU3RhdCwgTWF0aCkge1xuXG52YXIgaXNGdW5jdGlvbiA9IGpTdGF0LnV0aWxzLmlzRnVuY3Rpb247XG5cbi8vIEFzY2VuZGluZyBmdW5jdGlvbnMgZm9yIHNvcnRcbmZ1bmN0aW9uIGFzY051bShhLCBiKSB7IHJldHVybiBhIC0gYjsgfVxuXG5mdW5jdGlvbiBjbGlwKGFyZywgbWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4oYXJnLCBtYXgpKTtcbn1cblxuXG4vLyBzdW0gb2YgYW4gYXJyYXlcbmpTdGF0LnN1bSA9IGZ1bmN0aW9uIHN1bShhcnIpIHtcbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgd2hpbGUgKC0taSA+PSAwKVxuICAgIHN1bSArPSBhcnJbaV07XG4gIHJldHVybiBzdW07XG59O1xuXG5cbi8vIHN1bSBzcXVhcmVkXG5qU3RhdC5zdW1zcXJkID0gZnVuY3Rpb24gc3Vtc3FyZChhcnIpIHtcbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgd2hpbGUgKC0taSA+PSAwKVxuICAgIHN1bSArPSBhcnJbaV0gKiBhcnJbaV07XG4gIHJldHVybiBzdW07XG59O1xuXG5cbi8vIHN1bSBvZiBzcXVhcmVkIGVycm9ycyBvZiBwcmVkaWN0aW9uIChTU0UpXG5qU3RhdC5zdW1zcWVyciA9IGZ1bmN0aW9uIHN1bXNxZXJyKGFycikge1xuICB2YXIgbWVhbiA9IGpTdGF0Lm1lYW4oYXJyKTtcbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgdmFyIHRtcDtcbiAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgdG1wID0gYXJyW2ldIC0gbWVhbjtcbiAgICBzdW0gKz0gdG1wICogdG1wO1xuICB9XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBzdW0gb2YgYW4gYXJyYXkgaW4gZWFjaCByb3dcbmpTdGF0LnN1bXJvdyA9IGZ1bmN0aW9uIHN1bXJvdyhhcnIpIHtcbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBpID0gYXJyLmxlbmd0aDtcbiAgd2hpbGUgKC0taSA+PSAwKVxuICAgIHN1bSArPSBhcnJbaV07XG4gIHJldHVybiBzdW07XG59O1xuXG4vLyBwcm9kdWN0IG9mIGFuIGFycmF5XG5qU3RhdC5wcm9kdWN0ID0gZnVuY3Rpb24gcHJvZHVjdChhcnIpIHtcbiAgdmFyIHByb2QgPSAxO1xuICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gIHdoaWxlICgtLWkgPj0gMClcbiAgICBwcm9kICo9IGFycltpXTtcbiAgcmV0dXJuIHByb2Q7XG59O1xuXG5cbi8vIG1pbmltdW0gdmFsdWUgb2YgYW4gYXJyYXlcbmpTdGF0Lm1pbiA9IGZ1bmN0aW9uIG1pbihhcnIpIHtcbiAgdmFyIGxvdyA9IGFyclswXTtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoKytpIDwgYXJyLmxlbmd0aClcbiAgICBpZiAoYXJyW2ldIDwgbG93KVxuICAgICAgbG93ID0gYXJyW2ldO1xuICByZXR1cm4gbG93O1xufTtcblxuXG4vLyBtYXhpbXVtIHZhbHVlIG9mIGFuIGFycmF5XG5qU3RhdC5tYXggPSBmdW5jdGlvbiBtYXgoYXJyKSB7XG4gIHZhciBoaWdoID0gYXJyWzBdO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlICgrK2kgPCBhcnIubGVuZ3RoKVxuICAgIGlmIChhcnJbaV0gPiBoaWdoKVxuICAgICAgaGlnaCA9IGFycltpXTtcbiAgcmV0dXJuIGhpZ2g7XG59O1xuXG5cbi8vIHVuaXF1ZSB2YWx1ZXMgb2YgYW4gYXJyYXlcbmpTdGF0LnVuaXF1ZSA9IGZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgdmFyIGhhc2ggPSB7fSwgX2FyciA9IFtdO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNoW2FycltpXV0pIHtcbiAgICAgIGhhc2hbYXJyW2ldXSA9IHRydWU7XG4gICAgICBfYXJyLnB1c2goYXJyW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIF9hcnI7XG59O1xuXG5cbi8vIG1lYW4gdmFsdWUgb2YgYW4gYXJyYXlcbmpTdGF0Lm1lYW4gPSBmdW5jdGlvbiBtZWFuKGFycikge1xuICByZXR1cm4galN0YXQuc3VtKGFycikgLyBhcnIubGVuZ3RoO1xufTtcblxuXG4vLyBtZWFuIHNxdWFyZWQgZXJyb3IgKE1TRSlcbmpTdGF0Lm1lYW5zcWVyciA9IGZ1bmN0aW9uIG1lYW5zcWVycihhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LnN1bXNxZXJyKGFycikgLyBhcnIubGVuZ3RoO1xufTtcblxuXG4vLyBnZW9tZXRyaWMgbWVhbiBvZiBhbiBhcnJheVxualN0YXQuZ2VvbWVhbiA9IGZ1bmN0aW9uIGdlb21lYW4oYXJyKSB7XG4gIHJldHVybiBNYXRoLnBvdyhqU3RhdC5wcm9kdWN0KGFyciksIDEgLyBhcnIubGVuZ3RoKTtcbn07XG5cblxuLy8gbWVkaWFuIG9mIGFuIGFycmF5XG5qU3RhdC5tZWRpYW4gPSBmdW5jdGlvbiBtZWRpYW4oYXJyKSB7XG4gIHZhciBhcnJsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgX2FyciA9IGFyci5zbGljZSgpLnNvcnQoYXNjTnVtKTtcbiAgLy8gY2hlY2sgaWYgYXJyYXkgaXMgZXZlbiBvciBvZGQsIHRoZW4gcmV0dXJuIHRoZSBhcHByb3ByaWF0ZVxuICByZXR1cm4gIShhcnJsZW4gJiAxKVxuICAgID8gKF9hcnJbKGFycmxlbiAvIDIpIC0gMSBdICsgX2FyclsoYXJybGVuIC8gMildKSAvIDJcbiAgICA6IF9hcnJbKGFycmxlbiAvIDIpIHwgMCBdO1xufTtcblxuXG4vLyBjdW11bGF0aXZlIHN1bSBvZiBhbiBhcnJheVxualN0YXQuY3Vtc3VtID0gZnVuY3Rpb24gY3Vtc3VtKGFycikge1xuICByZXR1cm4galN0YXQuY3VtcmVkdWNlKGFyciwgZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KTtcbn07XG5cblxuLy8gY3VtdWxhdGl2ZSBwcm9kdWN0IG9mIGFuIGFycmF5XG5qU3RhdC5jdW1wcm9kID0gZnVuY3Rpb24gY3VtcHJvZChhcnIpIHtcbiAgcmV0dXJuIGpTdGF0LmN1bXJlZHVjZShhcnIsIGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICogYjsgfSk7XG59O1xuXG5cbi8vIHN1Y2Nlc3NpdmUgZGlmZmVyZW5jZXMgb2YgYSBzZXF1ZW5jZVxualN0YXQuZGlmZiA9IGZ1bmN0aW9uIGRpZmYoYXJyKSB7XG4gIHZhciBkaWZmcyA9IFtdO1xuICB2YXIgYXJyTGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGk7XG4gIGZvciAoaSA9IDE7IGkgPCBhcnJMZW47IGkrKylcbiAgICBkaWZmcy5wdXNoKGFycltpXSAtIGFycltpIC0gMV0pO1xuICByZXR1cm4gZGlmZnM7XG59O1xuXG5cbi8vIHJhbmtzIG9mIGFuIGFycmF5XG5qU3RhdC5yYW5rID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgaTtcbiAgdmFyIGRpc3RpbmN0TnVtYmVycyA9IFtdO1xuICB2YXIgbnVtYmVyQ291bnRzID0ge307XG4gIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbnVtYmVyID0gYXJyW2ldO1xuICAgIGlmIChudW1iZXJDb3VudHNbbnVtYmVyXSkge1xuICAgICAgbnVtYmVyQ291bnRzW251bWJlcl0rKztcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyQ291bnRzW251bWJlcl0gPSAxO1xuICAgICAgZGlzdGluY3ROdW1iZXJzLnB1c2gobnVtYmVyKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc29ydGVkRGlzdGluY3ROdW1iZXJzID0gZGlzdGluY3ROdW1iZXJzLnNvcnQoYXNjTnVtKTtcbiAgdmFyIG51bWJlclJhbmtzID0ge307XG4gIHZhciBjdXJyZW50UmFuayA9IDE7XG4gIGZvciAoaSA9IDA7IGkgPCBzb3J0ZWREaXN0aW5jdE51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbnVtYmVyID0gc29ydGVkRGlzdGluY3ROdW1iZXJzW2ldO1xuICAgIHZhciBjb3VudCA9IG51bWJlckNvdW50c1tudW1iZXJdO1xuICAgIHZhciBmaXJzdCA9IGN1cnJlbnRSYW5rO1xuICAgIHZhciBsYXN0ID0gY3VycmVudFJhbmsgKyBjb3VudCAtIDE7XG4gICAgdmFyIHJhbmsgPSAoZmlyc3QgKyBsYXN0KSAvIDI7XG4gICAgbnVtYmVyUmFua3NbbnVtYmVyXSA9IHJhbms7XG4gICAgY3VycmVudFJhbmsgKz0gY291bnQ7XG4gIH1cblxuICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgcmV0dXJuIG51bWJlclJhbmtzW251bWJlcl07XG4gIH0pO1xufTtcblxuXG4vLyBtb2RlIG9mIGFuIGFycmF5XG4vLyBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgbW9kZXMgb2YgYW4gYXJyYXksIHJldHVybiBhbGwgb2YgdGhlbVxuLy8gaXMgdGhpcyB0aGUgYXBwcm9wcmlhdGUgd2F5IG9mIGhhbmRsaW5nIGl0P1xualN0YXQubW9kZSA9IGZ1bmN0aW9uIG1vZGUoYXJyKSB7XG4gIHZhciBhcnJMZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgX2FyciA9IGFyci5zbGljZSgpLnNvcnQoYXNjTnVtKTtcbiAgdmFyIGNvdW50ID0gMTtcbiAgdmFyIG1heENvdW50ID0gMDtcbiAgdmFyIG51bU1heENvdW50ID0gMDtcbiAgdmFyIG1vZGVfYXJyID0gW107XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBhcnJMZW47IGkrKykge1xuICAgIGlmIChfYXJyW2ldID09PSBfYXJyW2kgKyAxXSkge1xuICAgICAgY291bnQrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvdW50ID4gbWF4Q291bnQpIHtcbiAgICAgICAgbW9kZV9hcnIgPSBbX2FycltpXV07XG4gICAgICAgIG1heENvdW50ID0gY291bnQ7XG4gICAgICAgIG51bU1heENvdW50ID0gMDtcbiAgICAgIH1cbiAgICAgIC8vIGFyZSB0aGVyZSBtdWx0aXBsZSBtYXggY291bnRzXG4gICAgICBlbHNlIGlmIChjb3VudCA9PT0gbWF4Q291bnQpIHtcbiAgICAgICAgbW9kZV9hcnIucHVzaChfYXJyW2ldKTtcbiAgICAgICAgbnVtTWF4Q291bnQrKztcbiAgICAgIH1cbiAgICAgIC8vIHJlc2V0dGluZyBjb3VudCBmb3IgbmV3IHZhbHVlIGluIGFycmF5XG4gICAgICBjb3VudCA9IDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bU1heENvdW50ID09PSAwID8gbW9kZV9hcnJbMF0gOiBtb2RlX2Fycjtcbn07XG5cblxuLy8gcmFuZ2Ugb2YgYW4gYXJyYXlcbmpTdGF0LnJhbmdlID0gZnVuY3Rpb24gcmFuZ2UoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5tYXgoYXJyKSAtIGpTdGF0Lm1pbihhcnIpO1xufTtcblxuLy8gdmFyaWFuY2Ugb2YgYW4gYXJyYXlcbi8vIGZsYWcgPSB0cnVlIGluZGljYXRlcyBzYW1wbGUgaW5zdGVhZCBvZiBwb3B1bGF0aW9uXG5qU3RhdC52YXJpYW5jZSA9IGZ1bmN0aW9uIHZhcmlhbmNlKGFyciwgZmxhZykge1xuICByZXR1cm4galN0YXQuc3Vtc3FlcnIoYXJyKSAvIChhcnIubGVuZ3RoIC0gKGZsYWcgPyAxIDogMCkpO1xufTtcblxuLy8gcG9vbGVkIHZhcmlhbmNlIG9mIGFuIGFycmF5IG9mIGFycmF5c1xualN0YXQucG9vbGVkdmFyaWFuY2UgPSBmdW5jdGlvbiBwb29sZWR2YXJpYW5jZShhcnIpIHtcbiAgdmFyIHN1bXNxZXJyID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgc2FtcGxlcykge3JldHVybiBhICsgalN0YXQuc3Vtc3FlcnIoc2FtcGxlcyk7fSwgMCk7XG4gIHZhciBjb3VudCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGEsIHNhbXBsZXMpIHtyZXR1cm4gYSArIHNhbXBsZXMubGVuZ3RoO30sIDApO1xuICByZXR1cm4gc3Vtc3FlcnIgLyAoY291bnQgLSBhcnIubGVuZ3RoKTtcbn07XG5cbi8vIGRldmlhdGlvbiBvZiBhbiBhcnJheVxualN0YXQuZGV2aWF0aW9uID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgbWVhbiA9IGpTdGF0Lm1lYW4oYXJyKTtcbiAgdmFyIGFycmxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBkZXYgPSBuZXcgQXJyYXkoYXJybGVuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJsZW47IGkrKykge1xuICAgIGRldltpXSA9IGFycltpXSAtIG1lYW47XG4gIH1cbiAgcmV0dXJuIGRldjtcbn07XG5cbi8vIHN0YW5kYXJkIGRldmlhdGlvbiBvZiBhbiBhcnJheVxuLy8gZmxhZyA9IHRydWUgaW5kaWNhdGVzIHNhbXBsZSBpbnN0ZWFkIG9mIHBvcHVsYXRpb25cbmpTdGF0LnN0ZGV2ID0gZnVuY3Rpb24gc3RkZXYoYXJyLCBmbGFnKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoalN0YXQudmFyaWFuY2UoYXJyLCBmbGFnKSk7XG59O1xuXG4vLyBwb29sZWQgc3RhbmRhcmQgZGV2aWF0aW9uIG9mIGFuIGFycmF5IG9mIGFycmF5c1xualN0YXQucG9vbGVkc3RkZXYgPSBmdW5jdGlvbiBwb29sZWRzdGRldihhcnIpIHtcbiAgcmV0dXJuIE1hdGguc3FydChqU3RhdC5wb29sZWR2YXJpYW5jZShhcnIpKTtcbn07XG5cbi8vIG1lYW4gZGV2aWF0aW9uIChtZWFuIGFic29sdXRlIGRldmlhdGlvbikgb2YgYW4gYXJyYXlcbmpTdGF0Lm1lYW5kZXYgPSBmdW5jdGlvbiBtZWFuZGV2KGFycikge1xuICB2YXIgbWVhbiA9IGpTdGF0Lm1lYW4oYXJyKTtcbiAgdmFyIGEgPSBbXTtcbiAgZm9yICh2YXIgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGEucHVzaChNYXRoLmFicyhhcnJbaV0gLSBtZWFuKSk7XG4gIH1cbiAgcmV0dXJuIGpTdGF0Lm1lYW4oYSk7XG59O1xuXG5cbi8vIG1lZGlhbiBkZXZpYXRpb24gKG1lZGlhbiBhYnNvbHV0ZSBkZXZpYXRpb24pIG9mIGFuIGFycmF5XG5qU3RhdC5tZWRkZXYgPSBmdW5jdGlvbiBtZWRkZXYoYXJyKSB7XG4gIHZhciBtZWRpYW4gPSBqU3RhdC5tZWRpYW4oYXJyKTtcbiAgdmFyIGEgPSBbXTtcbiAgZm9yICh2YXIgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGEucHVzaChNYXRoLmFicyhhcnJbaV0gLSBtZWRpYW4pKTtcbiAgfVxuICByZXR1cm4galN0YXQubWVkaWFuKGEpO1xufTtcblxuXG4vLyBjb2VmZmljaWVudCBvZiB2YXJpYXRpb25cbmpTdGF0LmNvZWZmdmFyID0gZnVuY3Rpb24gY29lZmZ2YXIoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5zdGRldihhcnIpIC8galN0YXQubWVhbihhcnIpO1xufTtcblxuXG4vLyBxdWFydGlsZXMgb2YgYW4gYXJyYXlcbmpTdGF0LnF1YXJ0aWxlcyA9IGZ1bmN0aW9uIHF1YXJ0aWxlcyhhcnIpIHtcbiAgdmFyIGFycmxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBfYXJyID0gYXJyLnNsaWNlKCkuc29ydChhc2NOdW0pO1xuICByZXR1cm4gW1xuICAgIF9hcnJbIE1hdGgucm91bmQoKGFycmxlbikgLyA0KSAtIDEgXSxcbiAgICBfYXJyWyBNYXRoLnJvdW5kKChhcnJsZW4pIC8gMikgLSAxIF0sXG4gICAgX2FyclsgTWF0aC5yb3VuZCgoYXJybGVuKSAqIDMgLyA0KSAtIDEgXVxuICBdO1xufTtcblxuXG4vLyBBcmJpdGFyeSBxdWFudGlsZXMgb2YgYW4gYXJyYXkuIERpcmVjdCBwb3J0IG9mIHRoZSBzY2lweS5zdGF0c1xuLy8gaW1wbGVtZW50YXRpb24gYnkgUGllcnJlIEdGIEdlcmFyZC1NYXJjaGFudC5cbmpTdGF0LnF1YW50aWxlcyA9IGZ1bmN0aW9uIHF1YW50aWxlcyhhcnIsIHF1YW50aWxlc0FycmF5LCBhbHBoYXAsIGJldGFwKSB7XG4gIHZhciBzb3J0ZWRBcnJheSA9IGFyci5zbGljZSgpLnNvcnQoYXNjTnVtKTtcbiAgdmFyIHF1YW50aWxlVmFscyA9IFtxdWFudGlsZXNBcnJheS5sZW5ndGhdO1xuICB2YXIgbiA9IGFyci5sZW5ndGg7XG4gIHZhciBpLCBwLCBtLCBhbGVwaCwgaywgZ2FtbWE7XG5cbiAgaWYgKHR5cGVvZiBhbHBoYXAgPT09ICd1bmRlZmluZWQnKVxuICAgIGFscGhhcCA9IDMgLyA4O1xuICBpZiAodHlwZW9mIGJldGFwID09PSAndW5kZWZpbmVkJylcbiAgICBiZXRhcCA9IDMgLyA4O1xuXG4gIGZvciAoaSA9IDA7IGkgPCBxdWFudGlsZXNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHAgPSBxdWFudGlsZXNBcnJheVtpXTtcbiAgICBtID0gYWxwaGFwICsgcCAqICgxIC0gYWxwaGFwIC0gYmV0YXApO1xuICAgIGFsZXBoID0gbiAqIHAgKyBtO1xuICAgIGsgPSBNYXRoLmZsb29yKGNsaXAoYWxlcGgsIDEsIG4gLSAxKSk7XG4gICAgZ2FtbWEgPSBjbGlwKGFsZXBoIC0gaywgMCwgMSk7XG4gICAgcXVhbnRpbGVWYWxzW2ldID0gKDEgLSBnYW1tYSkgKiBzb3J0ZWRBcnJheVtrIC0gMV0gKyBnYW1tYSAqIHNvcnRlZEFycmF5W2tdO1xuICB9XG5cbiAgcmV0dXJuIHF1YW50aWxlVmFscztcbn07XG5cbi8vIFJldHVybiB0aGUgay10aCBwZXJjZW50aWxlIG9mIHZhbHVlcyBpbiBhIHJhbmdlLCB3aGVyZSBrIGlzIGluIHRoZSByYW5nZSAwLi4xLCBpbmNsdXNpdmUuXG4vLyBQYXNzaW5nIHRydWUgZm9yIHRoZSBleGNsdXNpdmUgcGFyYW1ldGVyIGV4Y2x1ZGVzIGJvdGggZW5kcG9pbnRzIG9mIHRoZSByYW5nZS5cbmpTdGF0LnBlcmNlbnRpbGUgPSBmdW5jdGlvbiBwZXJjZW50aWxlKGFyciwgaywgZXhjbHVzaXZlKSB7XG4gIHZhciBfYXJyID0gYXJyLnNsaWNlKCkuc29ydChhc2NOdW0pO1xuICB2YXIgcmVhbEluZGV4ID0gayAqIChfYXJyLmxlbmd0aCArIChleGNsdXNpdmUgPyAxIDogLTEpKSArIChleGNsdXNpdmUgPyAwIDogMSk7XG4gIHZhciBpbmRleCA9IHBhcnNlSW50KHJlYWxJbmRleCk7XG4gIHZhciBmcmFjID0gcmVhbEluZGV4IC0gaW5kZXg7XG4gIGlmIChpbmRleCArIDEgPCBfYXJyLmxlbmd0aCkge1xuICAgIHJldHVybiBfYXJyW2luZGV4IC0gMV0gKyBmcmFjICogKF9hcnJbaW5kZXhdIC0gX2FycltpbmRleCAtIDFdKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gX2FycltpbmRleCAtIDFdO1xuICB9XG59XG5cbi8vIFRoZSBwZXJjZW50aWxlIHJhbmsgb2Ygc2NvcmUgaW4gYSBnaXZlbiBhcnJheS4gUmV0dXJucyB0aGUgcGVyY2VudGFnZVxuLy8gb2YgYWxsIHZhbHVlcyBpbiB0aGUgaW5wdXQgYXJyYXkgdGhhdCBhcmUgbGVzcyB0aGFuIChraW5kPSdzdHJpY3QnKSBvclxuLy8gbGVzcyBvciBlcXVhbCB0aGFuIChraW5kPSd3ZWFrJykgc2NvcmUuIERlZmF1bHQgaXMgd2Vhay5cbmpTdGF0LnBlcmNlbnRpbGVPZlNjb3JlID0gZnVuY3Rpb24gcGVyY2VudGlsZU9mU2NvcmUoYXJyLCBzY29yZSwga2luZCkge1xuICB2YXIgY291bnRlciA9IDA7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgc3RyaWN0ID0gZmFsc2U7XG4gIHZhciB2YWx1ZSwgaTtcblxuICBpZiAoa2luZCA9PT0gJ3N0cmljdCcpXG4gICAgc3RyaWN0ID0gdHJ1ZTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YWx1ZSA9IGFycltpXTtcbiAgICBpZiAoKHN0cmljdCAmJiB2YWx1ZSA8IHNjb3JlKSB8fFxuICAgICAgICAoIXN0cmljdCAmJiB2YWx1ZSA8PSBzY29yZSkpIHtcbiAgICAgIGNvdW50ZXIrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY291bnRlciAvIGxlbjtcbn07XG5cblxuLy8gSGlzdG9ncmFtIChiaW4gY291bnQpIGRhdGFcbmpTdGF0Lmhpc3RvZ3JhbSA9IGZ1bmN0aW9uIGhpc3RvZ3JhbShhcnIsIGJpbkNudCkge1xuICBiaW5DbnQgPSBiaW5DbnQgfHwgNDtcbiAgdmFyIGZpcnN0ID0galN0YXQubWluKGFycik7XG4gIHZhciBiaW5XaWR0aCA9IChqU3RhdC5tYXgoYXJyKSAtIGZpcnN0KSAvIGJpbkNudDtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBiaW5zID0gW107XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBiaW5DbnQ7IGkrKylcbiAgICBiaW5zW2ldID0gMDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgIGJpbnNbTWF0aC5taW4oTWF0aC5mbG9vcigoKGFycltpXSAtIGZpcnN0KSAvIGJpbldpZHRoKSksIGJpbkNudCAtIDEpXSArPSAxO1xuXG4gIHJldHVybiBiaW5zO1xufTtcblxuXG4vLyBjb3ZhcmlhbmNlIG9mIHR3byBhcnJheXNcbmpTdGF0LmNvdmFyaWFuY2UgPSBmdW5jdGlvbiBjb3ZhcmlhbmNlKGFycjEsIGFycjIpIHtcbiAgdmFyIHUgPSBqU3RhdC5tZWFuKGFycjEpO1xuICB2YXIgdiA9IGpTdGF0Lm1lYW4oYXJyMik7XG4gIHZhciBhcnIxTGVuID0gYXJyMS5sZW5ndGg7XG4gIHZhciBzcV9kZXYgPSBuZXcgQXJyYXkoYXJyMUxlbik7XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBhcnIxTGVuOyBpKyspXG4gICAgc3FfZGV2W2ldID0gKGFycjFbaV0gLSB1KSAqIChhcnIyW2ldIC0gdik7XG5cbiAgcmV0dXJuIGpTdGF0LnN1bShzcV9kZXYpIC8gKGFycjFMZW4gLSAxKTtcbn07XG5cblxuLy8gKHBlYXJzb24ncykgcG9wdWxhdGlvbiBjb3JyZWxhdGlvbiBjb2VmZmljaWVudCwgcmhvXG5qU3RhdC5jb3JyY29lZmYgPSBmdW5jdGlvbiBjb3JyY29lZmYoYXJyMSwgYXJyMikge1xuICByZXR1cm4galN0YXQuY292YXJpYW5jZShhcnIxLCBhcnIyKSAvXG4gICAgICBqU3RhdC5zdGRldihhcnIxLCAxKSAvXG4gICAgICBqU3RhdC5zdGRldihhcnIyLCAxKTtcbn07XG5cbiAgLy8gKHNwZWFybWFuJ3MpIHJhbmsgY29ycmVsYXRpb24gY29lZmZpY2llbnQsIHNwXG5qU3RhdC5zcGVhcm1hbmNvZWZmID0gIGZ1bmN0aW9uIChhcnIxLCBhcnIyKSB7XG4gIGFycjEgPSBqU3RhdC5yYW5rKGFycjEpO1xuICBhcnIyID0galN0YXQucmFuayhhcnIyKTtcbiAgLy9yZXR1cm4gcGVhcnNvbidzIGNvcnJlbGF0aW9uIG9mIHRoZSByYW5rczpcbiAgcmV0dXJuIGpTdGF0LmNvcnJjb2VmZihhcnIxLCBhcnIyKTtcbn1cblxuXG4vLyBzdGF0aXN0aWNhbCBzdGFuZGFyZGl6ZWQgbW9tZW50cyAoZ2VuZXJhbCBmb3JtIG9mIHNrZXcva3VydClcbmpTdGF0LnN0YW5Nb21lbnQgPSBmdW5jdGlvbiBzdGFuTW9tZW50KGFyciwgbikge1xuICB2YXIgbXUgPSBqU3RhdC5tZWFuKGFycik7XG4gIHZhciBzaWdtYSA9IGpTdGF0LnN0ZGV2KGFycik7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgc2tld1N1bSA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICBza2V3U3VtICs9IE1hdGgucG93KChhcnJbaV0gLSBtdSkgLyBzaWdtYSwgbik7XG5cbiAgcmV0dXJuIHNrZXdTdW0gLyBhcnIubGVuZ3RoO1xufTtcblxuLy8gKHBlYXJzb24ncykgbW9tZW50IGNvZWZmaWNpZW50IG9mIHNrZXduZXNzXG5qU3RhdC5za2V3bmVzcyA9IGZ1bmN0aW9uIHNrZXduZXNzKGFycikge1xuICByZXR1cm4galN0YXQuc3Rhbk1vbWVudChhcnIsIDMpO1xufTtcblxuLy8gKHBlYXJzb24ncykgKGV4Y2Vzcykga3VydG9zaXNcbmpTdGF0Lmt1cnRvc2lzID0gZnVuY3Rpb24ga3VydG9zaXMoYXJyKSB7XG4gIHJldHVybiBqU3RhdC5zdGFuTW9tZW50KGFyciwgNCkgLSAzO1xufTtcblxuXG52YXIgalByb3RvID0galN0YXQucHJvdG90eXBlO1xuXG5cbi8vIEV4dGVuZCBqUHJvdG8gd2l0aCBtZXRob2QgZm9yIGNhbGN1bGF0aW5nIGN1bXVsYXRpdmUgc3VtcyBhbmQgcHJvZHVjdHMuXG4vLyBUaGlzIGRpZmZlcnMgZnJvbSB0aGUgc2ltaWxhciBleHRlbnNpb24gYmVsb3cgYXMgY3Vtc3VtIGFuZCBjdW1wcm9kIHNob3VsZFxuLy8gbm90IGJlIHJ1biBhZ2FpbiBpbiB0aGUgY2FzZSBmdWxsYm9vbCA9PT0gdHJ1ZS5cbi8vIElmIGEgbWF0cml4IGlzIHBhc3NlZCwgYXV0b21hdGljYWxseSBhc3N1bWUgb3BlcmF0aW9uIHNob3VsZCBiZSBkb25lIG9uIHRoZVxuLy8gY29sdW1ucy5cbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICAvLyBJZiBhIG1hdHJpeCBpcyBwYXNzZWQsIGF1dG9tYXRpY2FsbHkgYXNzdW1lIG9wZXJhdGlvbiBzaG91bGQgYmUgZG9uZSBvblxuICAgIC8vIHRoZSBjb2x1bW5zLlxuICAgIGpQcm90b1twYXNzZnVuY10gPSBmdW5jdGlvbihmdWxsYm9vbCwgZnVuYykge1xuICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIHRtcHRoaXMgPSB0aGlzO1xuICAgICAgLy8gQXNzaWdubWVudCByZWFzc2lnbmF0aW9uIGRlcGVuZGluZyBvbiBob3cgcGFyYW1ldGVycyB3ZXJlIHBhc3NlZCBpbi5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGZ1bGxib29sKSkge1xuICAgICAgICBmdW5jID0gZnVsbGJvb2w7XG4gICAgICAgIGZ1bGxib29sID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBpZiBhIGNhbGxiYWNrIHdhcyBwYXNzZWQgd2l0aCB0aGUgZnVuY3Rpb24uXG4gICAgICBpZiAoZnVuYykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGZ1bmMuY2FsbCh0bXB0aGlzLCBqUHJvdG9bcGFzc2Z1bmNdLmNhbGwodG1wdGhpcywgZnVsbGJvb2wpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgaWYgbWF0cml4IGFuZCBydW4gY2FsY3VsYXRpb25zLlxuICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgICB0bXB0aGlzID0gZnVsbGJvb2wgPT09IHRydWUgPyB0aGlzIDogdGhpcy50cmFuc3Bvc2UoKTtcbiAgICAgICAgZm9yICg7IGkgPCB0bXB0aGlzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIGFycltpXSA9IGpTdGF0W3Bhc3NmdW5jXSh0bXB0aGlzW2ldKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgIH1cbiAgICAgIC8vIFBhc3MgZnVsbGJvb2wgaWYgb25seSB2ZWN0b3IsIG5vdCBhIG1hdHJpeC4gZm9yIHZhcmlhbmNlIGFuZCBzdGRldi5cbiAgICAgIHJldHVybiBqU3RhdFtwYXNzZnVuY10odGhpc1swXSwgZnVsbGJvb2wpO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCgnY3Vtc3VtIGN1bXByb2QnKS5zcGxpdCgnICcpKTtcblxuXG4vLyBFeHRlbmQgalByb3RvIHdpdGggbWV0aG9kcyB3aGljaCBkb24ndCByZXF1aXJlIGFyZ3VtZW50cyBhbmQgd29yayBvbiBjb2x1bW5zLlxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIC8vIElmIGEgbWF0cml4IGlzIHBhc3NlZCwgYXV0b21hdGljYWxseSBhc3N1bWUgb3BlcmF0aW9uIHNob3VsZCBiZSBkb25lIG9uXG4gICAgLy8gdGhlIGNvbHVtbnMuXG4gICAgalByb3RvW3Bhc3NmdW5jXSA9IGZ1bmN0aW9uKGZ1bGxib29sLCBmdW5jKSB7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgdG1wdGhpcyA9IHRoaXM7XG4gICAgICAvLyBBc3NpZ25tZW50IHJlYXNzaWduYXRpb24gZGVwZW5kaW5nIG9uIGhvdyBwYXJhbWV0ZXJzIHdlcmUgcGFzc2VkIGluLlxuICAgICAgaWYgKGlzRnVuY3Rpb24oZnVsbGJvb2wpKSB7XG4gICAgICAgIGZ1bmMgPSBmdWxsYm9vbDtcbiAgICAgICAgZnVsbGJvb2wgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGlmIGEgY2FsbGJhY2sgd2FzIHBhc3NlZCB3aXRoIHRoZSBmdW5jdGlvbi5cbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZnVuYy5jYWxsKHRtcHRoaXMsIGpQcm90b1twYXNzZnVuY10uY2FsbCh0bXB0aGlzLCBmdWxsYm9vbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBpZiBtYXRyaXggYW5kIHJ1biBjYWxjdWxhdGlvbnMuXG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGlmIChwYXNzZnVuYyAhPT0gJ3N1bXJvdycpXG4gICAgICAgICAgdG1wdGhpcyA9IGZ1bGxib29sID09PSB0cnVlID8gdGhpcyA6IHRoaXMudHJhbnNwb3NlKCk7XG4gICAgICAgIGZvciAoOyBpIDwgdG1wdGhpcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICBhcnJbaV0gPSBqU3RhdFtwYXNzZnVuY10odG1wdGhpc1tpXSk7XG4gICAgICAgIHJldHVybiBmdWxsYm9vbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBqU3RhdFtwYXNzZnVuY10oalN0YXQudXRpbHMudG9WZWN0b3IoYXJyKSlcbiAgICAgICAgICAgIDogYXJyO1xuICAgICAgfVxuICAgICAgLy8gUGFzcyBmdWxsYm9vbCBpZiBvbmx5IHZlY3Rvciwgbm90IGEgbWF0cml4LiBmb3IgdmFyaWFuY2UgYW5kIHN0ZGV2LlxuICAgICAgcmV0dXJuIGpTdGF0W3Bhc3NmdW5jXSh0aGlzWzBdLCBmdWxsYm9vbCk7XG4gICAgfTtcbiAgfSkoZnVuY3NbaV0pO1xufSkoKCdzdW0gc3Vtc3FyZCBzdW1zcWVyciBzdW1yb3cgcHJvZHVjdCBtaW4gbWF4IHVuaXF1ZSBtZWFuIG1lYW5zcWVyciAnICtcbiAgICAnZ2VvbWVhbiBtZWRpYW4gZGlmZiByYW5rIG1vZGUgcmFuZ2UgdmFyaWFuY2UgZGV2aWF0aW9uIHN0ZGV2IG1lYW5kZXYgJyArXG4gICAgJ21lZGRldiBjb2VmZnZhciBxdWFydGlsZXMgaGlzdG9ncmFtIHNrZXduZXNzIGt1cnRvc2lzJykuc3BsaXQoJyAnKSk7XG5cblxuLy8gRXh0ZW5kIGpQcm90byB3aXRoIGZ1bmN0aW9ucyB0aGF0IHRha2UgYXJndW1lbnRzLiBPcGVyYXRpb25zIG9uIG1hdHJpY2VzIGFyZVxuLy8gZG9uZSBvbiBjb2x1bW5zLlxuKGZ1bmN0aW9uKGZ1bmNzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIChmdW5jdGlvbihwYXNzZnVuYykge1xuICAgIGpQcm90b1twYXNzZnVuY10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciB0bXB0aGlzID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHZhciBjYWxsYmFja0Z1bmN0aW9uO1xuXG4gICAgICAvLyBJZiB0aGUgbGFzdCBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLCB3ZSBhc3N1bWUgaXQncyBhIGNhbGxiYWNrOyB3ZVxuICAgICAgLy8gc3RyaXAgdGhlIGNhbGxiYWNrIG91dCBhbmQgY2FsbCB0aGUgZnVuY3Rpb24gYWdhaW4uXG4gICAgICBpZiAoaXNGdW5jdGlvbihhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pKSB7XG4gICAgICAgIGNhbGxiYWNrRnVuY3Rpb24gPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBhcmdzVG9QYXNzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2tGdW5jdGlvbi5jYWxsKHRtcHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpQcm90b1twYXNzZnVuY10uYXBwbHkodG1wdGhpcywgYXJnc1RvUGFzcykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIE90aGVyd2lzZSB3ZSBjdXJyeSB0aGUgZnVuY3Rpb24gYXJncyBhbmQgY2FsbCBub3JtYWxseS5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrRnVuY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBjdXJyaWVkRnVuY3Rpb24gPSBmdW5jdGlvbiBjdXJyaWVkRnVuY3Rpb24odmVjdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGpTdGF0W3Bhc3NmdW5jXS5hcHBseSh0bXB0aGlzLCBbdmVjdG9yXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgYSBtYXRyaXgsIHJ1biBjb2x1bW4tYnktY29sdW1uLlxuICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgICB0bXB0aGlzID0gdG1wdGhpcy50cmFuc3Bvc2UoKTtcbiAgICAgICAgZm9yICg7IGkgPCB0bXB0aGlzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIGFycltpXSA9IGN1cnJpZWRGdW5jdGlvbih0bXB0aGlzW2ldKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIHJ1biBvbiB0aGUgdmVjdG9yLlxuICAgICAgcmV0dXJuIGN1cnJpZWRGdW5jdGlvbih0aGlzWzBdKTtcbiAgICB9O1xuICB9KShmdW5jc1tpXSk7XG59KSgncXVhbnRpbGVzIHBlcmNlbnRpbGVPZlNjb3JlJy5zcGxpdCgnICcpKTtcblxufShqU3RhdCwgTWF0aCkpO1xuLy8gU3BlY2lhbCBmdW5jdGlvbnMgLy9cbihmdW5jdGlvbihqU3RhdCwgTWF0aCkge1xuXG4vLyBMb2ctZ2FtbWEgZnVuY3Rpb25cbmpTdGF0LmdhbW1hbG4gPSBmdW5jdGlvbiBnYW1tYWxuKHgpIHtcbiAgdmFyIGogPSAwO1xuICB2YXIgY29mID0gW1xuICAgIDc2LjE4MDA5MTcyOTQ3MTQ2LCAtODYuNTA1MzIwMzI5NDE2NzcsIDI0LjAxNDA5ODI0MDgzMDkxLFxuICAgIC0xLjIzMTczOTU3MjQ1MDE1NSwgMC4xMjA4NjUwOTczODY2MTc5ZS0yLCAtMC41Mzk1MjM5Mzg0OTUzZS01XG4gIF07XG4gIHZhciBzZXIgPSAxLjAwMDAwMDAwMDE5MDAxNTtcbiAgdmFyIHh4LCB5LCB0bXA7XG4gIHRtcCA9ICh5ID0geHggPSB4KSArIDUuNTtcbiAgdG1wIC09ICh4eCArIDAuNSkgKiBNYXRoLmxvZyh0bXApO1xuICBmb3IgKDsgaiA8IDY7IGorKylcbiAgICBzZXIgKz0gY29mW2pdIC8gKyt5O1xuICByZXR1cm4gTWF0aC5sb2coMi41MDY2MjgyNzQ2MzEwMDA1ICogc2VyIC8geHgpIC0gdG1wO1xufTtcblxuLypcbiAqIGxvZy1nYW1tYSBmdW5jdGlvbiB0byBzdXBwb3J0IHBvaXNzb24gZGlzdHJpYnV0aW9uIHNhbXBsaW5nLiBUaGVcbiAqIGFsZ29yaXRobSBjb21lcyBmcm9tIFNQRUNGVU4gYnkgU2hhbmppZSBaaGFuZyBhbmQgSmlhbm1pbmcgSmluIGFuZCB0aGVpclxuICogYm9vayBcIkNvbXB1dGF0aW9uIG9mIFNwZWNpYWwgRnVuY3Rpb25zXCIsIDE5OTYsIEpvaG4gV2lsZXkgJiBTb25zLCBJbmMuXG4gKi9cbmpTdGF0LmxvZ2dhbSA9IGZ1bmN0aW9uIGxvZ2dhbSh4KSB7XG4gIHZhciB4MCwgeDIsIHhwLCBnbCwgZ2wwO1xuICB2YXIgaywgbjtcblxuICB2YXIgYSA9IFs4LjMzMzMzMzMzMzMzMzMzM2UtMDIsIC0yLjc3Nzc3Nzc3Nzc3Nzc3OGUtMDMsXG4gICAgICAgICAgNy45MzY1MDc5MzY1MDc5MzdlLTA0LCAtNS45NTIzODA5NTIzODA5NTJlLTA0LFxuICAgICAgICAgIDguNDE3NTA4NDE3NTA4NDE4ZS0wNCwgLTEuOTE3NTI2OTE3NTI2OTE4ZS0wMyxcbiAgICAgICAgICA2LjQxMDI1NjQxMDI1NjQxMGUtMDMsIC0yLjk1NTA2NTM1OTQ3NzEyNGUtMDIsXG4gICAgICAgICAgMS43OTY0NDM3MjM2ODgzMDdlLTAxLCAtMS4zOTI0MzIyMTY5MDU5MGUrMDBdO1xuICB4MCA9IHg7XG4gIG4gPSAwO1xuICBpZiAoKHggPT0gMS4wKSB8fCAoeCA9PSAyLjApKSB7XG4gICAgICByZXR1cm4gMC4wO1xuICB9XG4gIGlmICh4IDw9IDcuMCkge1xuICAgICAgbiA9IE1hdGguZmxvb3IoNyAtIHgpO1xuICAgICAgeDAgPSB4ICsgbjtcbiAgfVxuICB4MiA9IDEuMCAvICh4MCAqIHgwKTtcbiAgeHAgPSAyICogTWF0aC5QSTtcbiAgZ2wwID0gYVs5XTtcbiAgZm9yIChrID0gODsgayA+PSAwOyBrLS0pIHtcbiAgICAgIGdsMCAqPSB4MjtcbiAgICAgIGdsMCArPSBhW2tdO1xuICB9XG4gIGdsID0gZ2wwIC8geDAgKyAwLjUgKiBNYXRoLmxvZyh4cCkgKyAoeDAgLSAwLjUpICogTWF0aC5sb2coeDApIC0geDA7XG4gIGlmICh4IDw9IDcuMCkge1xuICAgICAgZm9yIChrID0gMTsgayA8PSBuOyBrKyspIHtcbiAgICAgICAgICBnbCAtPSBNYXRoLmxvZyh4MCAtIDEuMCk7XG4gICAgICAgICAgeDAgLT0gMS4wO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBnbDtcbn1cblxuLy8gZ2FtbWEgb2YgeFxualN0YXQuZ2FtbWFmbiA9IGZ1bmN0aW9uIGdhbW1hZm4oeCkge1xuICB2YXIgcCA9IFstMS43MTYxODUxMzg4NjU0OTUsIDI0Ljc2NTY1MDgwNTU3NTkyLCAtMzc5LjgwNDI1NjQ3MDk0NTYzLFxuICAgICAgICAgICA2MjkuMzMxMTU1MzEyODE4NCwgODY2Ljk2NjIwMjc5MDQxMzMsIC0zMTQ1MS4yNzI5Njg4NDgzNjcsXG4gICAgICAgICAgIC0zNjE0NC40MTM0MTg2OTExNzYsIDY2NDU2LjE0MzgyMDI0MDU0XG4gIF07XG4gIHZhciBxID0gWy0zMC44NDAyMzAwMTE5NzM5LCAzMTUuMzUwNjI2OTc5NjA0MTYsIC0xMDE1LjE1NjM2NzQ5MDIxOTIsXG4gICAgICAgICAgIC0zMTA3Ljc3MTY3MTU3MjMxMSwgMjI1MzguMTE4NDIwOTgwMTUxLCA0NzU1Ljg0NjI3NzUyNzg4MTEsXG4gICAgICAgICAgIC0xMzQ2NTkuOTU5ODY0OTY5MywgLTExNTEzMi4yNTk2NzU1NTM1XTtcbiAgdmFyIGZhY3QgPSBmYWxzZTtcbiAgdmFyIG4gPSAwO1xuICB2YXIgeGRlbiA9IDA7XG4gIHZhciB4bnVtID0gMDtcbiAgdmFyIHkgPSB4O1xuICB2YXIgaSwgeiwgeWksIHJlcztcbiAgaWYgKHggPiAxNzEuNjI0Mzc2OTUzNjA3Nikge1xuICAgIHJldHVybiBJbmZpbml0eTtcbiAgfVxuICBpZiAoeSA8PSAwKSB7XG4gICAgcmVzID0geSAlIDEgKyAzLjZlLTE2O1xuICAgIGlmIChyZXMpIHtcbiAgICAgIGZhY3QgPSAoISh5ICYgMSkgPyAxIDogLTEpICogTWF0aC5QSSAvIE1hdGguc2luKE1hdGguUEkgKiByZXMpO1xuICAgICAgeSA9IDEgLSB5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxuICB9XG4gIHlpID0geTtcbiAgaWYgKHkgPCAxKSB7XG4gICAgeiA9IHkrKztcbiAgfSBlbHNlIHtcbiAgICB6ID0gKHkgLT0gbiA9ICh5IHwgMCkgLSAxKSAtIDE7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IDg7ICsraSkge1xuICAgIHhudW0gPSAoeG51bSArIHBbaV0pICogejtcbiAgICB4ZGVuID0geGRlbiAqIHogKyBxW2ldO1xuICB9XG4gIHJlcyA9IHhudW0gLyB4ZGVuICsgMTtcbiAgaWYgKHlpIDwgeSkge1xuICAgIHJlcyAvPSB5aTtcbiAgfSBlbHNlIGlmICh5aSA+IHkpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICByZXMgKj0geTtcbiAgICAgIHkrKztcbiAgICB9XG4gIH1cbiAgaWYgKGZhY3QpIHtcbiAgICByZXMgPSBmYWN0IC8gcmVzO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5cbi8vIGxvd2VyIGluY29tcGxldGUgZ2FtbWEgZnVuY3Rpb24sIHdoaWNoIGlzIHVzdWFsbHkgdHlwZXNldCB3aXRoIGFcbi8vIGxvd2VyLWNhc2UgZ3JlZWsgZ2FtbWEgYXMgdGhlIGZ1bmN0aW9uIHN5bWJvbFxualN0YXQuZ2FtbWFwID0gZnVuY3Rpb24gZ2FtbWFwKGEsIHgpIHtcbiAgcmV0dXJuIGpTdGF0Lmxvd1JlZ0dhbW1hKGEsIHgpICogalN0YXQuZ2FtbWFmbihhKTtcbn07XG5cblxuLy8gVGhlIGxvd2VyIHJlZ3VsYXJpemVkIGluY29tcGxldGUgZ2FtbWEgZnVuY3Rpb24sIHVzdWFsbHkgd3JpdHRlbiBQKGEseClcbmpTdGF0Lmxvd1JlZ0dhbW1hID0gZnVuY3Rpb24gbG93UmVnR2FtbWEoYSwgeCkge1xuICB2YXIgYWxuID0galN0YXQuZ2FtbWFsbihhKTtcbiAgdmFyIGFwID0gYTtcbiAgdmFyIHN1bSA9IDEgLyBhO1xuICB2YXIgZGVsID0gc3VtO1xuICB2YXIgYiA9IHggKyAxIC0gYTtcbiAgdmFyIGMgPSAxIC8gMS4wZS0zMDtcbiAgdmFyIGQgPSAxIC8gYjtcbiAgdmFyIGggPSBkO1xuICB2YXIgaSA9IDE7XG4gIC8vIGNhbGN1bGF0ZSBtYXhpbXVtIG51bWJlciBvZiBpdHRlcmF0aW9ucyByZXF1aXJlZCBmb3IgYVxuICB2YXIgSVRNQVggPSAtfihNYXRoLmxvZygoYSA+PSAxKSA/IGEgOiAxIC8gYSkgKiA4LjUgKyBhICogMC40ICsgMTcpO1xuICB2YXIgYW47XG5cbiAgaWYgKHggPCAwIHx8IGEgPD0gMCkge1xuICAgIHJldHVybiBOYU47XG4gIH0gZWxzZSBpZiAoeCA8IGEgKyAxKSB7XG4gICAgZm9yICg7IGkgPD0gSVRNQVg7IGkrKykge1xuICAgICAgc3VtICs9IGRlbCAqPSB4IC8gKythcDtcbiAgICB9XG4gICAgcmV0dXJuIChzdW0gKiBNYXRoLmV4cCgteCArIGEgKiBNYXRoLmxvZyh4KSAtIChhbG4pKSk7XG4gIH1cblxuICBmb3IgKDsgaSA8PSBJVE1BWDsgaSsrKSB7XG4gICAgYW4gPSAtaSAqIChpIC0gYSk7XG4gICAgYiArPSAyO1xuICAgIGQgPSBhbiAqIGQgKyBiO1xuICAgIGMgPSBiICsgYW4gLyBjO1xuICAgIGQgPSAxIC8gZDtcbiAgICBoICo9IGQgKiBjO1xuICB9XG5cbiAgcmV0dXJuICgxIC0gaCAqIE1hdGguZXhwKC14ICsgYSAqIE1hdGgubG9nKHgpIC0gKGFsbikpKTtcbn07XG5cbi8vIG5hdHVyYWwgbG9nIGZhY3RvcmlhbCBvZiBuXG5qU3RhdC5mYWN0b3JpYWxsbiA9IGZ1bmN0aW9uIGZhY3RvcmlhbGxuKG4pIHtcbiAgcmV0dXJuIG4gPCAwID8gTmFOIDogalN0YXQuZ2FtbWFsbihuICsgMSk7XG59O1xuXG4vLyBmYWN0b3JpYWwgb2YgblxualN0YXQuZmFjdG9yaWFsID0gZnVuY3Rpb24gZmFjdG9yaWFsKG4pIHtcbiAgcmV0dXJuIG4gPCAwID8gTmFOIDogalN0YXQuZ2FtbWFmbihuICsgMSk7XG59O1xuXG4vLyBjb21iaW5hdGlvbnMgb2YgbiwgbVxualN0YXQuY29tYmluYXRpb24gPSBmdW5jdGlvbiBjb21iaW5hdGlvbihuLCBtKSB7XG4gIC8vIG1ha2Ugc3VyZSBuIG9yIG0gZG9uJ3QgZXhjZWVkIHRoZSB1cHBlciBsaW1pdCBvZiB1c2FibGUgdmFsdWVzXG4gIHJldHVybiAobiA+IDE3MCB8fCBtID4gMTcwKVxuICAgICAgPyBNYXRoLmV4cChqU3RhdC5jb21iaW5hdGlvbmxuKG4sIG0pKVxuICAgICAgOiAoalN0YXQuZmFjdG9yaWFsKG4pIC8galN0YXQuZmFjdG9yaWFsKG0pKSAvIGpTdGF0LmZhY3RvcmlhbChuIC0gbSk7XG59O1xuXG5cbmpTdGF0LmNvbWJpbmF0aW9ubG4gPSBmdW5jdGlvbiBjb21iaW5hdGlvbmxuKG4sIG0pe1xuICByZXR1cm4galN0YXQuZmFjdG9yaWFsbG4obikgLSBqU3RhdC5mYWN0b3JpYWxsbihtKSAtIGpTdGF0LmZhY3RvcmlhbGxuKG4gLSBtKTtcbn07XG5cblxuLy8gcGVybXV0YXRpb25zIG9mIG4sIG1cbmpTdGF0LnBlcm11dGF0aW9uID0gZnVuY3Rpb24gcGVybXV0YXRpb24obiwgbSkge1xuICByZXR1cm4galN0YXQuZmFjdG9yaWFsKG4pIC8galN0YXQuZmFjdG9yaWFsKG4gLSBtKTtcbn07XG5cblxuLy8gYmV0YSBmdW5jdGlvblxualN0YXQuYmV0YWZuID0gZnVuY3Rpb24gYmV0YWZuKHgsIHkpIHtcbiAgLy8gZW5zdXJlIGFyZ3VtZW50cyBhcmUgcG9zaXRpdmVcbiAgaWYgKHggPD0gMCB8fCB5IDw9IDApXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgLy8gbWFrZSBzdXJlIHggKyB5IGRvZXNuJ3QgZXhjZWVkIHRoZSB1cHBlciBsaW1pdCBvZiB1c2FibGUgdmFsdWVzXG4gIHJldHVybiAoeCArIHkgPiAxNzApXG4gICAgICA/IE1hdGguZXhwKGpTdGF0LmJldGFsbih4LCB5KSlcbiAgICAgIDogalN0YXQuZ2FtbWFmbih4KSAqIGpTdGF0LmdhbW1hZm4oeSkgLyBqU3RhdC5nYW1tYWZuKHggKyB5KTtcbn07XG5cblxuLy8gbmF0dXJhbCBsb2dhcml0aG0gb2YgYmV0YSBmdW5jdGlvblxualN0YXQuYmV0YWxuID0gZnVuY3Rpb24gYmV0YWxuKHgsIHkpIHtcbiAgcmV0dXJuIGpTdGF0LmdhbW1hbG4oeCkgKyBqU3RhdC5nYW1tYWxuKHkpIC0galN0YXQuZ2FtbWFsbih4ICsgeSk7XG59O1xuXG5cbi8vIEV2YWx1YXRlcyB0aGUgY29udGludWVkIGZyYWN0aW9uIGZvciBpbmNvbXBsZXRlIGJldGEgZnVuY3Rpb24gYnkgbW9kaWZpZWRcbi8vIExlbnR6J3MgbWV0aG9kLlxualN0YXQuYmV0YWNmID0gZnVuY3Rpb24gYmV0YWNmKHgsIGEsIGIpIHtcbiAgdmFyIGZwbWluID0gMWUtMzA7XG4gIHZhciBtID0gMTtcbiAgdmFyIHFhYiA9IGEgKyBiO1xuICB2YXIgcWFwID0gYSArIDE7XG4gIHZhciBxYW0gPSBhIC0gMTtcbiAgdmFyIGMgPSAxO1xuICB2YXIgZCA9IDEgLSBxYWIgKiB4IC8gcWFwO1xuICB2YXIgbTIsIGFhLCBkZWwsIGg7XG5cbiAgLy8gVGhlc2UgcSdzIHdpbGwgYmUgdXNlZCBpbiBmYWN0b3JzIHRoYXQgb2NjdXIgaW4gdGhlIGNvZWZmaWNpZW50c1xuICBpZiAoTWF0aC5hYnMoZCkgPCBmcG1pbilcbiAgICBkID0gZnBtaW47XG4gIGQgPSAxIC8gZDtcbiAgaCA9IGQ7XG5cbiAgZm9yICg7IG0gPD0gMTAwOyBtKyspIHtcbiAgICBtMiA9IDIgKiBtO1xuICAgIGFhID0gbSAqIChiIC0gbSkgKiB4IC8gKChxYW0gKyBtMikgKiAoYSArIG0yKSk7XG4gICAgLy8gT25lIHN0ZXAgKHRoZSBldmVuIG9uZSkgb2YgdGhlIHJlY3VycmVuY2VcbiAgICBkID0gMSArIGFhICogZDtcbiAgICBpZiAoTWF0aC5hYnMoZCkgPCBmcG1pbilcbiAgICAgIGQgPSBmcG1pbjtcbiAgICBjID0gMSArIGFhIC8gYztcbiAgICBpZiAoTWF0aC5hYnMoYykgPCBmcG1pbilcbiAgICAgIGMgPSBmcG1pbjtcbiAgICBkID0gMSAvIGQ7XG4gICAgaCAqPSBkICogYztcbiAgICBhYSA9IC0oYSArIG0pICogKHFhYiArIG0pICogeCAvICgoYSArIG0yKSAqIChxYXAgKyBtMikpO1xuICAgIC8vIE5leHQgc3RlcCBvZiB0aGUgcmVjdXJyZW5jZSAodGhlIG9kZCBvbmUpXG4gICAgZCA9IDEgKyBhYSAqIGQ7XG4gICAgaWYgKE1hdGguYWJzKGQpIDwgZnBtaW4pXG4gICAgICBkID0gZnBtaW47XG4gICAgYyA9IDEgKyBhYSAvIGM7XG4gICAgaWYgKE1hdGguYWJzKGMpIDwgZnBtaW4pXG4gICAgICBjID0gZnBtaW47XG4gICAgZCA9IDEgLyBkO1xuICAgIGRlbCA9IGQgKiBjO1xuICAgIGggKj0gZGVsO1xuICAgIGlmIChNYXRoLmFicyhkZWwgLSAxLjApIDwgM2UtNylcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGg7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGxvd2VyIHJlZ3VsYXJpemVkIGlub21wbGV0ZSBnYW1tYSBmdW5jdGlvblxualN0YXQuZ2FtbWFwaW52ID0gZnVuY3Rpb24gZ2FtbWFwaW52KHAsIGEpIHtcbiAgdmFyIGogPSAwO1xuICB2YXIgYTEgPSBhIC0gMTtcbiAgdmFyIEVQUyA9IDFlLTg7XG4gIHZhciBnbG4gPSBqU3RhdC5nYW1tYWxuKGEpO1xuICB2YXIgeCwgZXJyLCB0LCB1LCBwcCwgbG5hMSwgYWZhYztcblxuICBpZiAocCA+PSAxKVxuICAgIHJldHVybiBNYXRoLm1heCgxMDAsIGEgKyAxMDAgKiBNYXRoLnNxcnQoYSkpO1xuICBpZiAocCA8PSAwKVxuICAgIHJldHVybiAwO1xuICBpZiAoYSA+IDEpIHtcbiAgICBsbmExID0gTWF0aC5sb2coYTEpO1xuICAgIGFmYWMgPSBNYXRoLmV4cChhMSAqIChsbmExIC0gMSkgLSBnbG4pO1xuICAgIHBwID0gKHAgPCAwLjUpID8gcCA6IDEgLSBwO1xuICAgIHQgPSBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhwcCkpO1xuICAgIHggPSAoMi4zMDc1MyArIHQgKiAwLjI3MDYxKSAvICgxICsgdCAqICgwLjk5MjI5ICsgdCAqIDAuMDQ0ODEpKSAtIHQ7XG4gICAgaWYgKHAgPCAwLjUpXG4gICAgICB4ID0gLXg7XG4gICAgeCA9IE1hdGgubWF4KDFlLTMsXG4gICAgICAgICAgICAgICAgIGEgKiBNYXRoLnBvdygxIC0gMSAvICg5ICogYSkgLSB4IC8gKDMgKiBNYXRoLnNxcnQoYSkpLCAzKSk7XG4gIH0gZWxzZSB7XG4gICAgdCA9IDEgLSBhICogKDAuMjUzICsgYSAqIDAuMTIpO1xuICAgIGlmIChwIDwgdClcbiAgICAgIHggPSBNYXRoLnBvdyhwIC8gdCwgMSAvIGEpO1xuICAgIGVsc2VcbiAgICAgIHggPSAxIC0gTWF0aC5sb2coMSAtIChwIC0gdCkgLyAoMSAtIHQpKTtcbiAgfVxuXG4gIGZvcig7IGogPCAxMjsgaisrKSB7XG4gICAgaWYgKHggPD0gMClcbiAgICAgIHJldHVybiAwO1xuICAgIGVyciA9IGpTdGF0Lmxvd1JlZ0dhbW1hKGEsIHgpIC0gcDtcbiAgICBpZiAoYSA+IDEpXG4gICAgICB0ID0gYWZhYyAqIE1hdGguZXhwKC0oeCAtIGExKSArIGExICogKE1hdGgubG9nKHgpIC0gbG5hMSkpO1xuICAgIGVsc2VcbiAgICAgIHQgPSBNYXRoLmV4cCgteCArIGExICogTWF0aC5sb2coeCkgLSBnbG4pO1xuICAgIHUgPSBlcnIgLyB0O1xuICAgIHggLT0gKHQgPSB1IC8gKDEgLSAwLjUgKiBNYXRoLm1pbigxLCB1ICogKChhIC0gMSkgLyB4IC0gMSkpKSk7XG4gICAgaWYgKHggPD0gMClcbiAgICAgIHggPSAwLjUgKiAoeCArIHQpO1xuICAgIGlmIChNYXRoLmFicyh0KSA8IEVQUyAqIHgpXG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiB4O1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBlcnJvciBmdW5jdGlvbiBlcmYoeClcbmpTdGF0LmVyZiA9IGZ1bmN0aW9uIGVyZih4KSB7XG4gIHZhciBjb2YgPSBbLTEuMzAyNjUzNzE5NzgxNzA5NCwgNi40MTk2OTc5MjM1NjQ5MDI2ZS0xLCAxLjk0NzY0NzMyMDQxODU4MzZlLTIsXG4gICAgICAgICAgICAgLTkuNTYxNTE0Nzg2ODA4NjMxZS0zLCAtOS40NjU5NTM0NDQ4MjAzNmUtNCwgMy42NjgzOTQ5Nzg1Mjc2MWUtNCxcbiAgICAgICAgICAgICA0LjI1MjMzMjQ4MDY5MDdlLTUsIC0yLjAyNzg1NzgxMTI1MzRlLTUsIC0xLjYyNDI5MDAwNDY0N2UtNixcbiAgICAgICAgICAgICAxLjMwMzY1NTgzNTU4MGUtNiwgMS41NjI2NDQxNzIyZS04LCAtOC41MjM4MDk1OTE1ZS04LFxuICAgICAgICAgICAgIDYuNTI5MDU0NDM5ZS05LCA1LjA1OTM0MzQ5NWUtOSwgLTkuOTEzNjQxNTZlLTEwLFxuICAgICAgICAgICAgIC0yLjI3MzY1MTIyZS0xMCwgOS42NDY3OTExZS0xMSwgMi4zOTQwMzhlLTEyLFxuICAgICAgICAgICAgIC02Ljg4NjAyN2UtMTIsIDguOTQ0ODdlLTEzLCAzLjEzMDkyZS0xMyxcbiAgICAgICAgICAgICAtMS4xMjcwOGUtMTMsIDMuODFlLTE2LCA3LjEwNmUtMTUsXG4gICAgICAgICAgICAgLTEuNTIzZS0xNSwgLTkuNGUtMTcsIDEuMjFlLTE2LFxuICAgICAgICAgICAgIC0yLjhlLTE3XTtcbiAgdmFyIGogPSBjb2YubGVuZ3RoIC0gMTtcbiAgdmFyIGlzbmVnID0gZmFsc2U7XG4gIHZhciBkID0gMDtcbiAgdmFyIGRkID0gMDtcbiAgdmFyIHQsIHR5LCB0bXAsIHJlcztcblxuICBpZiAoeCA8IDApIHtcbiAgICB4ID0gLXg7XG4gICAgaXNuZWcgPSB0cnVlO1xuICB9XG5cbiAgdCA9IDIgLyAoMiArIHgpO1xuICB0eSA9IDQgKiB0IC0gMjtcblxuICBmb3IoOyBqID4gMDsgai0tKSB7XG4gICAgdG1wID0gZDtcbiAgICBkID0gdHkgKiBkIC0gZGQgKyBjb2Zbal07XG4gICAgZGQgPSB0bXA7XG4gIH1cblxuICByZXMgPSB0ICogTWF0aC5leHAoLXggKiB4ICsgMC41ICogKGNvZlswXSArIHR5ICogZCkgLSBkZCk7XG4gIHJldHVybiBpc25lZyA/IHJlcyAtIDEgOiAxIC0gcmVzO1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBjb21wbG1lbnRhcnkgZXJyb3IgZnVuY3Rpb24gZXJmYyh4KVxualN0YXQuZXJmYyA9IGZ1bmN0aW9uIGVyZmMoeCkge1xuICByZXR1cm4gMSAtIGpTdGF0LmVyZih4KTtcbn07XG5cblxuLy8gUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcGxlbWVudGFyeSBlcnJvciBmdW5jdGlvblxualN0YXQuZXJmY2ludiA9IGZ1bmN0aW9uIGVyZmNpbnYocCkge1xuICB2YXIgaiA9IDA7XG4gIHZhciB4LCBlcnIsIHQsIHBwO1xuICBpZiAocCA+PSAyKVxuICAgIHJldHVybiAtMTAwO1xuICBpZiAocCA8PSAwKVxuICAgIHJldHVybiAxMDA7XG4gIHBwID0gKHAgPCAxKSA/IHAgOiAyIC0gcDtcbiAgdCA9IE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHBwIC8gMikpO1xuICB4ID0gLTAuNzA3MTEgKiAoKDIuMzA3NTMgKyB0ICogMC4yNzA2MSkgL1xuICAgICAgICAgICAgICAgICAgKDEgKyB0ICogKDAuOTkyMjkgKyB0ICogMC4wNDQ4MSkpIC0gdCk7XG4gIGZvciAoOyBqIDwgMjsgaisrKSB7XG4gICAgZXJyID0galN0YXQuZXJmYyh4KSAtIHBwO1xuICAgIHggKz0gZXJyIC8gKDEuMTI4Mzc5MTY3MDk1NTEyNTcgKiBNYXRoLmV4cCgteCAqIHgpIC0geCAqIGVycik7XG4gIH1cbiAgcmV0dXJuIChwIDwgMSkgPyB4IDogLXg7XG59O1xuXG5cbi8vIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGluY29tcGxldGUgYmV0YSBmdW5jdGlvblxualN0YXQuaWJldGFpbnYgPSBmdW5jdGlvbiBpYmV0YWludihwLCBhLCBiKSB7XG4gIHZhciBFUFMgPSAxZS04O1xuICB2YXIgYTEgPSBhIC0gMTtcbiAgdmFyIGIxID0gYiAtIDE7XG4gIHZhciBqID0gMDtcbiAgdmFyIGxuYSwgbG5iLCBwcCwgdCwgdSwgZXJyLCB4LCBhbCwgaCwgdywgYWZhYztcbiAgaWYgKHAgPD0gMClcbiAgICByZXR1cm4gMDtcbiAgaWYgKHAgPj0gMSlcbiAgICByZXR1cm4gMTtcbiAgaWYgKGEgPj0gMSAmJiBiID49IDEpIHtcbiAgICBwcCA9IChwIDwgMC41KSA/IHAgOiAxIC0gcDtcbiAgICB0ID0gTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocHApKTtcbiAgICB4ID0gKDIuMzA3NTMgKyB0ICogMC4yNzA2MSkgLyAoMSArIHQqICgwLjk5MjI5ICsgdCAqIDAuMDQ0ODEpKSAtIHQ7XG4gICAgaWYgKHAgPCAwLjUpXG4gICAgICB4ID0gLXg7XG4gICAgYWwgPSAoeCAqIHggLSAzKSAvIDY7XG4gICAgaCA9IDIgLyAoMSAvICgyICogYSAtIDEpICArIDEgLyAoMiAqIGIgLSAxKSk7XG4gICAgdyA9ICh4ICogTWF0aC5zcXJ0KGFsICsgaCkgLyBoKSAtICgxIC8gKDIgKiBiIC0gMSkgLSAxIC8gKDIgKiBhIC0gMSkpICpcbiAgICAgICAgKGFsICsgNSAvIDYgLSAyIC8gKDMgKiBoKSk7XG4gICAgeCA9IGEgLyAoYSArIGIgKiBNYXRoLmV4cCgyICogdykpO1xuICB9IGVsc2Uge1xuICAgIGxuYSA9IE1hdGgubG9nKGEgLyAoYSArIGIpKTtcbiAgICBsbmIgPSBNYXRoLmxvZyhiIC8gKGEgKyBiKSk7XG4gICAgdCA9IE1hdGguZXhwKGEgKiBsbmEpIC8gYTtcbiAgICB1ID0gTWF0aC5leHAoYiAqIGxuYikgLyBiO1xuICAgIHcgPSB0ICsgdTtcbiAgICBpZiAocCA8IHQgLyB3KVxuICAgICAgeCA9IE1hdGgucG93KGEgKiB3ICogcCwgMSAvIGEpO1xuICAgIGVsc2VcbiAgICAgIHggPSAxIC0gTWF0aC5wb3coYiAqIHcgKiAoMSAtIHApLCAxIC8gYik7XG4gIH1cbiAgYWZhYyA9IC1qU3RhdC5nYW1tYWxuKGEpIC0galN0YXQuZ2FtbWFsbihiKSArIGpTdGF0LmdhbW1hbG4oYSArIGIpO1xuICBmb3IoOyBqIDwgMTA7IGorKykge1xuICAgIGlmICh4ID09PSAwIHx8IHggPT09IDEpXG4gICAgICByZXR1cm4geDtcbiAgICBlcnIgPSBqU3RhdC5pYmV0YSh4LCBhLCBiKSAtIHA7XG4gICAgdCA9IE1hdGguZXhwKGExICogTWF0aC5sb2coeCkgKyBiMSAqIE1hdGgubG9nKDEgLSB4KSArIGFmYWMpO1xuICAgIHUgPSBlcnIgLyB0O1xuICAgIHggLT0gKHQgPSB1IC8gKDEgLSAwLjUgKiBNYXRoLm1pbigxLCB1ICogKGExIC8geCAtIGIxIC8gKDEgLSB4KSkpKSk7XG4gICAgaWYgKHggPD0gMClcbiAgICAgIHggPSAwLjUgKiAoeCArIHQpO1xuICAgIGlmICh4ID49IDEpXG4gICAgICB4ID0gMC41ICogKHggKyB0ICsgMSk7XG4gICAgaWYgKE1hdGguYWJzKHQpIDwgRVBTICogeCAmJiBqID4gMClcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB4O1xufTtcblxuXG4vLyBSZXR1cm5zIHRoZSBpbmNvbXBsZXRlIGJldGEgZnVuY3Rpb24gSV94KGEsYilcbmpTdGF0LmliZXRhID0gZnVuY3Rpb24gaWJldGEoeCwgYSwgYikge1xuICAvLyBGYWN0b3JzIGluIGZyb250IG9mIHRoZSBjb250aW51ZWQgZnJhY3Rpb24uXG4gIHZhciBidCA9ICh4ID09PSAwIHx8IHggPT09IDEpID8gIDAgOlxuICAgIE1hdGguZXhwKGpTdGF0LmdhbW1hbG4oYSArIGIpIC0galN0YXQuZ2FtbWFsbihhKSAtXG4gICAgICAgICAgICAgalN0YXQuZ2FtbWFsbihiKSArIGEgKiBNYXRoLmxvZyh4KSArIGIgKlxuICAgICAgICAgICAgIE1hdGgubG9nKDEgLSB4KSk7XG4gIGlmICh4IDwgMCB8fCB4ID4gMSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmICh4IDwgKGEgKyAxKSAvIChhICsgYiArIDIpKVxuICAgIC8vIFVzZSBjb250aW51ZWQgZnJhY3Rpb24gZGlyZWN0bHkuXG4gICAgcmV0dXJuIGJ0ICogalN0YXQuYmV0YWNmKHgsIGEsIGIpIC8gYTtcbiAgLy8gZWxzZSB1c2UgY29udGludWVkIGZyYWN0aW9uIGFmdGVyIG1ha2luZyB0aGUgc3ltbWV0cnkgdHJhbnNmb3JtYXRpb24uXG4gIHJldHVybiAxIC0gYnQgKiBqU3RhdC5iZXRhY2YoMSAtIHgsIGIsIGEpIC8gYjtcbn07XG5cblxuLy8gUmV0dXJucyBhIG5vcm1hbCBkZXZpYXRlIChtdT0wLCBzaWdtYT0xKS5cbi8vIElmIG4gYW5kIG0gYXJlIHNwZWNpZmllZCBpdCByZXR1cm5zIGEgb2JqZWN0IG9mIG5vcm1hbCBkZXZpYXRlcy5cbmpTdGF0LnJhbmRuID0gZnVuY3Rpb24gcmFuZG4obiwgbSkge1xuICB2YXIgdSwgdiwgeCwgeSwgcTtcbiAgaWYgKCFtKVxuICAgIG0gPSBuO1xuICBpZiAobilcbiAgICByZXR1cm4galN0YXQuY3JlYXRlKG4sIG0sIGZ1bmN0aW9uKCkgeyByZXR1cm4galN0YXQucmFuZG4oKTsgfSk7XG4gIGRvIHtcbiAgICB1ID0galN0YXQuX3JhbmRvbV9mbigpO1xuICAgIHYgPSAxLjcxNTYgKiAoalN0YXQuX3JhbmRvbV9mbigpIC0gMC41KTtcbiAgICB4ID0gdSAtIDAuNDQ5ODcxO1xuICAgIHkgPSBNYXRoLmFicyh2KSArIDAuMzg2NTk1O1xuICAgIHEgPSB4ICogeCArIHkgKiAoMC4xOTYwMCAqIHkgLSAwLjI1NDcyICogeCk7XG4gIH0gd2hpbGUgKHEgPiAwLjI3NTk3ICYmIChxID4gMC4yNzg0NiB8fCB2ICogdiA+IC00ICogTWF0aC5sb2codSkgKiB1ICogdSkpO1xuICByZXR1cm4gdiAvIHU7XG59O1xuXG5cbi8vIFJldHVybnMgYSBnYW1tYSBkZXZpYXRlIGJ5IHRoZSBtZXRob2Qgb2YgTWFyc2FnbGlhIGFuZCBUc2FuZy5cbmpTdGF0LnJhbmRnID0gZnVuY3Rpb24gcmFuZGcoc2hhcGUsIG4sIG0pIHtcbiAgdmFyIG9hbHBoID0gc2hhcGU7XG4gIHZhciBhMSwgYTIsIHUsIHYsIHgsIG1hdDtcbiAgaWYgKCFtKVxuICAgIG0gPSBuO1xuICBpZiAoIXNoYXBlKVxuICAgIHNoYXBlID0gMTtcbiAgaWYgKG4pIHtcbiAgICBtYXQgPSBqU3RhdC56ZXJvcyhuLG0pO1xuICAgIG1hdC5hbHRlcihmdW5jdGlvbigpIHsgcmV0dXJuIGpTdGF0LnJhbmRnKHNoYXBlKTsgfSk7XG4gICAgcmV0dXJuIG1hdDtcbiAgfVxuICBpZiAoc2hhcGUgPCAxKVxuICAgIHNoYXBlICs9IDE7XG4gIGExID0gc2hhcGUgLSAxIC8gMztcbiAgYTIgPSAxIC8gTWF0aC5zcXJ0KDkgKiBhMSk7XG4gIGRvIHtcbiAgICBkbyB7XG4gICAgICB4ID0galN0YXQucmFuZG4oKTtcbiAgICAgIHYgPSAxICsgYTIgKiB4O1xuICAgIH0gd2hpbGUodiA8PSAwKTtcbiAgICB2ID0gdiAqIHYgKiB2O1xuICAgIHUgPSBqU3RhdC5fcmFuZG9tX2ZuKCk7XG4gIH0gd2hpbGUodSA+IDEgLSAwLjMzMSAqIE1hdGgucG93KHgsIDQpICYmXG4gICAgICAgICAgTWF0aC5sb2codSkgPiAwLjUgKiB4KnggKyBhMSAqICgxIC0gdiArIE1hdGgubG9nKHYpKSk7XG4gIC8vIGFscGhhID4gMVxuICBpZiAoc2hhcGUgPT0gb2FscGgpXG4gICAgcmV0dXJuIGExICogdjtcbiAgLy8gYWxwaGEgPCAxXG4gIGRvIHtcbiAgICB1ID0galN0YXQuX3JhbmRvbV9mbigpO1xuICB9IHdoaWxlKHUgPT09IDApO1xuICByZXR1cm4gTWF0aC5wb3codSwgMSAvIG9hbHBoKSAqIGExICogdjtcbn07XG5cblxuLy8gbWFraW5nIHVzZSBvZiBzdGF0aWMgbWV0aG9kcyBvbiB0aGUgaW5zdGFuY2VcbihmdW5jdGlvbihmdW5jcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24ocGFzc2Z1bmMpIHtcbiAgICBqU3RhdC5mbltwYXNzZnVuY10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBqU3RhdChcbiAgICAgICAgICBqU3RhdC5tYXAodGhpcywgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIGpTdGF0W3Bhc3NmdW5jXSh2YWx1ZSk7IH0pKTtcbiAgICB9XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCdnYW1tYWxuIGdhbW1hZm4gZmFjdG9yaWFsIGZhY3RvcmlhbGxuJy5zcGxpdCgnICcpKTtcblxuXG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalN0YXQuZm5bcGFzc2Z1bmNdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4galN0YXQoalN0YXRbcGFzc2Z1bmNdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pKGZ1bmNzW2ldKTtcbn0pKCdyYW5kbicuc3BsaXQoJyAnKSk7XG5cbn0oalN0YXQsIE1hdGgpKTtcbihmdW5jdGlvbihqU3RhdCwgTWF0aCkge1xuXG4vLyBnZW5lcmF0ZSBhbGwgZGlzdHJpYnV0aW9uIGluc3RhbmNlIG1ldGhvZHNcbihmdW5jdGlvbihsaXN0KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAvLyBkaXN0cmlidXRpb24gaW5zdGFuY2UgbWV0aG9kXG4gICAgalN0YXRbZnVuY10gPSBmdW5jdGlvbihhLCBiLCBjKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgYXJndW1lbnRzLmNhbGxlZSkpXG4gICAgICAgIHJldHVybiBuZXcgYXJndW1lbnRzLmNhbGxlZShhLCBiLCBjKTtcbiAgICAgIHRoaXMuX2EgPSBhO1xuICAgICAgdGhpcy5fYiA9IGI7XG4gICAgICB0aGlzLl9jID0gYztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLy8gZGlzdHJpYnV0aW9uIG1ldGhvZCB0byBiZSB1c2VkIG9uIGEgalN0YXQgaW5zdGFuY2VcbiAgICBqU3RhdC5mbltmdW5jXSA9IGZ1bmN0aW9uKGEsIGIsIGMpIHtcbiAgICAgIHZhciBuZXd0aGlzID0galN0YXRbZnVuY10oYSwgYiwgYyk7XG4gICAgICBuZXd0aGlzLmRhdGEgPSB0aGlzO1xuICAgICAgcmV0dXJuIG5ld3RoaXM7XG4gICAgfTtcbiAgICAvLyBzYW1wbGUgaW5zdGFuY2UgbWV0aG9kXG4gICAgalN0YXRbZnVuY10ucHJvdG90eXBlLnNhbXBsZSA9IGZ1bmN0aW9uKGFycikge1xuICAgICAgdmFyIGEgPSB0aGlzLl9hO1xuICAgICAgdmFyIGIgPSB0aGlzLl9iO1xuICAgICAgdmFyIGMgPSB0aGlzLl9jO1xuICAgICAgaWYgKGFycilcbiAgICAgICAgcmV0dXJuIGpTdGF0LmFsdGVyKGFyciwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGpTdGF0W2Z1bmNdLnNhbXBsZShhLCBiLCBjKTtcbiAgICAgICAgfSk7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBqU3RhdFtmdW5jXS5zYW1wbGUoYSwgYiwgYyk7XG4gICAgfTtcbiAgICAvLyBnZW5lcmF0ZSB0aGUgcGRmLCBjZGYgYW5kIGludiBpbnN0YW5jZSBtZXRob2RzXG4gICAgKGZ1bmN0aW9uKHZhbHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFscy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKGZuZnVuYykge1xuICAgICAgICBqU3RhdFtmdW5jXS5wcm90b3R5cGVbZm5mdW5jXSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICB2YXIgYSA9IHRoaXMuX2E7XG4gICAgICAgICAgdmFyIGIgPSB0aGlzLl9iO1xuICAgICAgICAgIHZhciBjID0gdGhpcy5fYztcbiAgICAgICAgICBpZiAoIXggJiYgeCAhPT0gMClcbiAgICAgICAgICAgIHggPSB0aGlzLmRhdGE7XG4gICAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGpTdGF0LmZuLm1hcC5jYWxsKHgsIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGpTdGF0W2Z1bmNdW2ZuZnVuY10oeCwgYSwgYiwgYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGpTdGF0W2Z1bmNdW2ZuZnVuY10oeCwgYSwgYiwgYyk7XG4gICAgICAgIH07XG4gICAgICB9KSh2YWxzW2ldKTtcbiAgICB9KSgncGRmIGNkZiBpbnYnLnNwbGl0KCcgJykpO1xuICAgIC8vIGdlbmVyYXRlIHRoZSBtZWFuLCBtZWRpYW4sIG1vZGUgYW5kIHZhcmlhbmNlIGluc3RhbmNlIG1ldGhvZHNcbiAgICAoZnVuY3Rpb24odmFscykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzLmxlbmd0aDsgaSsrKSAoZnVuY3Rpb24oZm5mdW5jKSB7XG4gICAgICAgIGpTdGF0W2Z1bmNdLnByb3RvdHlwZVtmbmZ1bmNdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGpTdGF0W2Z1bmNdW2ZuZnVuY10odGhpcy5fYSwgdGhpcy5fYiwgdGhpcy5fYyk7XG4gICAgICAgIH07XG4gICAgICB9KSh2YWxzW2ldKTtcbiAgICB9KSgnbWVhbiBtZWRpYW4gbW9kZSB2YXJpYW5jZScuc3BsaXQoJyAnKSk7XG4gIH0pKGxpc3RbaV0pO1xufSkoKFxuICAnYmV0YSBjZW50cmFsRiBjYXVjaHkgY2hpc3F1YXJlIGV4cG9uZW50aWFsIGdhbW1hIGludmdhbW1hIGt1bWFyYXN3YW15ICcgK1xuICAnbGFwbGFjZSBsb2dub3JtYWwgbm9uY2VudHJhbHQgbm9ybWFsIHBhcmV0byBzdHVkZW50dCB3ZWlidWxsIHVuaWZvcm0gJyArXG4gICdiaW5vbWlhbCBuZWdiaW4gaHlwZ2VvbSBwb2lzc29uIHRyaWFuZ3VsYXIgdHVrZXkgYXJjc2luZSdcbikuc3BsaXQoJyAnKSk7XG5cblxuXG4vLyBleHRlbmQgYmV0YSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuYmV0YSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBhbHBoYSwgYmV0YSkge1xuICAgIC8vIFBERiBpcyB6ZXJvIG91dHNpZGUgdGhlIHN1cHBvcnRcbiAgICBpZiAoeCA+IDEgfHwgeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICAvLyBQREYgaXMgb25lIGZvciB0aGUgdW5pZm9ybSBjYXNlXG4gICAgaWYgKGFscGhhID09IDEgJiYgYmV0YSA9PSAxKVxuICAgICAgcmV0dXJuIDE7XG5cbiAgICBpZiAoYWxwaGEgPCA1MTIgJiYgYmV0YSA8IDUxMikge1xuICAgICAgcmV0dXJuIChNYXRoLnBvdyh4LCBhbHBoYSAtIDEpICogTWF0aC5wb3coMSAtIHgsIGJldGEgLSAxKSkgL1xuICAgICAgICAgIGpTdGF0LmJldGFmbihhbHBoYSwgYmV0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLmV4cCgoYWxwaGEgLSAxKSAqIE1hdGgubG9nKHgpICtcbiAgICAgICAgICAgICAgICAgICAgICAoYmV0YSAtIDEpICogTWF0aC5sb2coMSAtIHgpIC1cbiAgICAgICAgICAgICAgICAgICAgICBqU3RhdC5iZXRhbG4oYWxwaGEsIGJldGEpKTtcbiAgICB9XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4gKHggPiAxIHx8IHggPCAwKSA/ICh4ID4gMSkgKiAxIDogalN0YXQuaWJldGEoeCwgYWxwaGEsIGJldGEpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24gaW52KHgsIGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIGpTdGF0LmliZXRhaW52KHgsIGFscGhhLCBiZXRhKTtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIGFscGhhIC8gKGFscGhhICsgYmV0YSk7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4oYWxwaGEsIGJldGEpIHtcbiAgICByZXR1cm4galN0YXQuaWJldGFpbnYoMC41LCBhbHBoYSwgYmV0YSk7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiAoYWxwaGEgLSAxICkgLyAoIGFscGhhICsgYmV0YSAtIDIpO1xuICB9LFxuXG4gIC8vIHJldHVybiBhIHJhbmRvbSBzYW1wbGVcbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoYWxwaGEsIGJldGEpIHtcbiAgICB2YXIgdSA9IGpTdGF0LnJhbmRnKGFscGhhKTtcbiAgICByZXR1cm4gdSAvICh1ICsgalN0YXQucmFuZGcoYmV0YSkpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiAoYWxwaGEgKiBiZXRhKSAvIChNYXRoLnBvdyhhbHBoYSArIGJldGEsIDIpICogKGFscGhhICsgYmV0YSArIDEpKTtcbiAgfVxufSk7XG5cbi8vIGV4dGVuZCBGIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5jZW50cmFsRiwge1xuICAvLyBUaGlzIGltcGxlbWVudGF0aW9uIG9mIHRoZSBwZGYgZnVuY3Rpb24gYXZvaWRzIGZsb2F0IG92ZXJmbG93XG4gIC8vIFNlZSB0aGUgd2F5IHRoYXQgUiBjYWxjdWxhdGVzIHRoaXMgdmFsdWU6XG4gIC8vIGh0dHBzOi8vc3ZuLnItcHJvamVjdC5vcmcvUi90cnVuay9zcmMvbm1hdGgvZGYuY1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBkZjEsIGRmMikge1xuICAgIHZhciBwLCBxLCBmO1xuXG4gICAgaWYgKHggPCAwKVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICBpZiAoZGYxIDw9IDIpIHtcbiAgICAgIGlmICh4ID09PSAwICYmIGRmMSA8IDIpIHtcbiAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgICAgfVxuICAgICAgaWYgKHggPT09IDAgJiYgZGYxID09PSAyKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgxIC8galN0YXQuYmV0YWZuKGRmMSAvIDIsIGRmMiAvIDIpKSAqXG4gICAgICAgICAgICAgIE1hdGgucG93KGRmMSAvIGRmMiwgZGYxIC8gMikgKlxuICAgICAgICAgICAgICBNYXRoLnBvdyh4LCAoZGYxLzIpIC0gMSkgKlxuICAgICAgICAgICAgICBNYXRoLnBvdygoMSArIChkZjEgLyBkZjIpICogeCksIC0oZGYxICsgZGYyKSAvIDIpO1xuICAgIH1cblxuICAgIHAgPSAoZGYxICogeCkgLyAoZGYyICsgeCAqIGRmMSk7XG4gICAgcSA9IGRmMiAvIChkZjIgKyB4ICogZGYxKTtcbiAgICBmID0gZGYxICogcSAvIDIuMDtcbiAgICByZXR1cm4gZiAqIGpTdGF0LmJpbm9taWFsLnBkZigoZGYxIC0gMikgLyAyLCAoZGYxICsgZGYyIC0gMikgLyAyLCBwKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBkZjEsIGRmMikge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBqU3RhdC5pYmV0YSgoZGYxICogeCkgLyAoZGYxICogeCArIGRmMiksIGRmMSAvIDIsIGRmMiAvIDIpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24gaW52KHgsIGRmMSwgZGYyKSB7XG4gICAgcmV0dXJuIGRmMiAvIChkZjEgKiAoMSAvIGpTdGF0LmliZXRhaW52KHgsIGRmMSAvIDIsIGRmMiAvIDIpIC0gMSkpO1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oZGYxLCBkZjIpIHtcbiAgICByZXR1cm4gKGRmMiA+IDIpID8gZGYyIC8gKGRmMiAtIDIpIDogdW5kZWZpbmVkO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoZGYxLCBkZjIpIHtcbiAgICByZXR1cm4gKGRmMSA+IDIpID8gKGRmMiAqIChkZjEgLSAyKSkgLyAoZGYxICogKGRmMiArIDIpKSA6IHVuZGVmaW5lZDtcbiAgfSxcblxuICAvLyByZXR1cm4gYSByYW5kb20gc2FtcGxlXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGRmMSwgZGYyKSB7XG4gICAgdmFyIHgxID0galN0YXQucmFuZGcoZGYxIC8gMikgKiAyO1xuICAgIHZhciB4MiA9IGpTdGF0LnJhbmRnKGRmMiAvIDIpICogMjtcbiAgICByZXR1cm4gKHgxIC8gZGYxKSAvICh4MiAvIGRmMik7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGRmMSwgZGYyKSB7XG4gICAgaWYgKGRmMiA8PSA0KVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gMiAqIGRmMiAqIGRmMiAqIChkZjEgKyBkZjIgLSAyKSAvXG4gICAgICAgIChkZjEgKiAoZGYyIC0gMikgKiAoZGYyIC0gMikgKiAoZGYyIC0gNCkpO1xuICB9XG59KTtcblxuXG4vLyBleHRlbmQgY2F1Y2h5IGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5jYXVjaHksIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgbG9jYWwsIHNjYWxlKSB7XG4gICAgaWYgKHNjYWxlIDwgMCkgeyByZXR1cm4gMDsgfVxuXG4gICAgcmV0dXJuIChzY2FsZSAvIChNYXRoLnBvdyh4IC0gbG9jYWwsIDIpICsgTWF0aC5wb3coc2NhbGUsIDIpKSkgLyBNYXRoLlBJO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGxvY2FsLCBzY2FsZSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4oKHggLSBsb2NhbCkgLyBzY2FsZSkgLyBNYXRoLlBJICsgMC41O1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgbG9jYWwsIHNjYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsICsgc2NhbGUgKiBNYXRoLnRhbihNYXRoLlBJICogKHAgLSAwLjUpKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihsb2NhbC8qLCBzY2FsZSovKSB7XG4gICAgcmV0dXJuIGxvY2FsO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUobG9jYWwvKiwgc2NhbGUqLykge1xuICAgIHJldHVybiBsb2NhbDtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShsb2NhbCwgc2NhbGUpIHtcbiAgICByZXR1cm4galN0YXQucmFuZG4oKSAqXG4gICAgICAgIE1hdGguc3FydCgxIC8gKDIgKiBqU3RhdC5yYW5kZygwLjUpKSkgKiBzY2FsZSArIGxvY2FsO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCBjaGlzcXVhcmUgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmNoaXNxdWFyZSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBkb2YpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gKHggPT09IDAgJiYgZG9mID09PSAyKSA/IDAuNSA6XG4gICAgICAgIE1hdGguZXhwKChkb2YgLyAyIC0gMSkgKiBNYXRoLmxvZyh4KSAtIHggLyAyIC0gKGRvZiAvIDIpICpcbiAgICAgICAgICAgICAgICAgTWF0aC5sb2coMikgLSBqU3RhdC5nYW1tYWxuKGRvZiAvIDIpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBkb2YpIHtcbiAgICBpZiAoeCA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4galN0YXQubG93UmVnR2FtbWEoZG9mIC8gMiwgeCAvIDIpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgZG9mKSB7XG4gICAgcmV0dXJuIDIgKiBqU3RhdC5nYW1tYXBpbnYocCwgMC41ICogZG9mKTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24oZG9mKSB7XG4gICAgcmV0dXJuIGRvZjtcbiAgfSxcblxuICAvLyBUT0RPOiB0aGlzIGlzIGFuIGFwcHJveGltYXRpb24gKGlzIHRoZXJlIGEgYmV0dGVyIHdheT8pXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGRvZikge1xuICAgIHJldHVybiBkb2YgKiBNYXRoLnBvdygxIC0gKDIgLyAoOSAqIGRvZikpLCAzKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKGRvZikge1xuICAgIHJldHVybiAoZG9mIC0gMiA+IDApID8gZG9mIC0gMiA6IDA7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoZG9mKSB7XG4gICAgcmV0dXJuIGpTdGF0LnJhbmRnKGRvZiAvIDIpICogMjtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoZG9mKSB7XG4gICAgcmV0dXJuIDIgKiBkb2Y7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIGV4cG9uZW50aWFsIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5leHBvbmVudGlhbCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCByYXRlKSB7XG4gICAgcmV0dXJuIHggPCAwID8gMCA6IHJhdGUgKiBNYXRoLmV4cCgtcmF0ZSAqIHgpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIHJhdGUpIHtcbiAgICByZXR1cm4geCA8IDAgPyAwIDogMSAtIE1hdGguZXhwKC1yYXRlICogeCk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCByYXRlKSB7XG4gICAgcmV0dXJuIC1NYXRoLmxvZygxIC0gcCkgLyByYXRlO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihyYXRlKSB7XG4gICAgcmV0dXJuIDEgLyByYXRlO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gKHJhdGUpIHtcbiAgICByZXR1cm4gKDEgLyByYXRlKSAqIE1hdGgubG9nKDIpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoLypyYXRlKi8pIHtcbiAgICByZXR1cm4gMDtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShyYXRlKSB7XG4gICAgcmV0dXJuIC0xIC8gcmF0ZSAqIE1hdGgubG9nKGpTdGF0Ll9yYW5kb21fZm4oKSk7XG4gIH0sXG5cbiAgdmFyaWFuY2UgOiBmdW5jdGlvbihyYXRlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHJhdGUsIC0yKTtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgZ2FtbWEgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmdhbW1hLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIHNoYXBlLCBzY2FsZSkge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAoeCA9PT0gMCAmJiBzaGFwZSA9PT0gMSkgPyAxIC8gc2NhbGUgOlxuICAgICAgICAgICAgTWF0aC5leHAoKHNoYXBlIC0gMSkgKiBNYXRoLmxvZyh4KSAtIHggLyBzY2FsZSAtXG4gICAgICAgICAgICAgICAgICAgIGpTdGF0LmdhbW1hbG4oc2hhcGUpIC0gc2hhcGUgKiBNYXRoLmxvZyhzY2FsZSkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIHNoYXBlLCBzY2FsZSkge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBqU3RhdC5sb3dSZWdHYW1tYShzaGFwZSwgeCAvIHNjYWxlKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBqU3RhdC5nYW1tYXBpbnYocCwgc2hhcGUpICogc2NhbGU7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBzaGFwZSAqIHNjYWxlO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoc2hhcGUsIHNjYWxlKSB7XG4gICAgaWYoc2hhcGUgPiAxKSByZXR1cm4gKHNoYXBlIC0gMSkgKiBzY2FsZTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBqU3RhdC5yYW5kZyhzaGFwZSkgKiBzY2FsZTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2Uoc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIHNoYXBlICogc2NhbGUgKiBzY2FsZTtcbiAgfVxufSk7XG5cbi8vIGV4dGVuZCBpbnZlcnNlIGdhbW1hIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5pbnZnYW1tYSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBzaGFwZSwgc2NhbGUpIHtcbiAgICBpZiAoeCA8PSAwKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIE1hdGguZXhwKC0oc2hhcGUgKyAxKSAqIE1hdGgubG9nKHgpIC0gc2NhbGUgLyB4IC1cbiAgICAgICAgICAgICAgICAgICAgalN0YXQuZ2FtbWFsbihzaGFwZSkgKyBzaGFwZSAqIE1hdGgubG9nKHNjYWxlKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgc2hhcGUsIHNjYWxlKSB7XG4gICAgaWYgKHggPD0gMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAxIC0galN0YXQubG93UmVnR2FtbWEoc2hhcGUsIHNjYWxlIC8geCk7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBzaGFwZSwgc2NhbGUpIHtcbiAgICByZXR1cm4gc2NhbGUgLyBqU3RhdC5nYW1tYXBpbnYoMSAtIHAsIHNoYXBlKTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24oc2hhcGUsIHNjYWxlKSB7XG4gICAgcmV0dXJuIChzaGFwZSA+IDEpID8gc2NhbGUgLyAoc2hhcGUgLSAxKSA6IHVuZGVmaW5lZDtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBzY2FsZSAvIChzaGFwZSArIDEpO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKHNoYXBlLCBzY2FsZSkge1xuICAgIHJldHVybiBzY2FsZSAvIGpTdGF0LnJhbmRnKHNoYXBlKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2Uoc2hhcGUsIHNjYWxlKSB7XG4gICAgaWYgKHNoYXBlIDw9IDIpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzY2FsZSAqIHNjYWxlIC8gKChzaGFwZSAtIDEpICogKHNoYXBlIC0gMSkgKiAoc2hhcGUgLSAyKSk7XG4gIH1cbn0pO1xuXG5cbi8vIGV4dGVuZCBrdW1hcmFzd2FteSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQua3VtYXJhc3dhbXksIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgYWxwaGEsIGJldGEpIHtcbiAgICBpZiAoeCA9PT0gMCAmJiBhbHBoYSA9PT0gMSlcbiAgICAgIHJldHVybiBiZXRhO1xuICAgIGVsc2UgaWYgKHggPT09IDEgJiYgYmV0YSA9PT0gMSlcbiAgICAgIHJldHVybiBhbHBoYTtcbiAgICByZXR1cm4gTWF0aC5leHAoTWF0aC5sb2coYWxwaGEpICsgTWF0aC5sb2coYmV0YSkgKyAoYWxwaGEgLSAxKSAqXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubG9nKHgpICsgKGJldGEgLSAxKSAqXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubG9nKDEgLSBNYXRoLnBvdyh4LCBhbHBoYSkpKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBhbHBoYSwgYmV0YSkge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKHggPiAxKVxuICAgICAgcmV0dXJuIDE7XG4gICAgcmV0dXJuICgxIC0gTWF0aC5wb3coMSAtIE1hdGgucG93KHgsIGFscGhhKSwgYmV0YSkpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24gaW52KHAsIGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDEgLSBNYXRoLnBvdygxIC0gcCwgMSAvIGJldGEpLCAxIC8gYWxwaGEpO1xuICB9LFxuXG4gIG1lYW4gOiBmdW5jdGlvbihhbHBoYSwgYmV0YSkge1xuICAgIHJldHVybiAoYmV0YSAqIGpTdGF0LmdhbW1hZm4oMSArIDEgLyBhbHBoYSkgKlxuICAgICAgICAgICAgalN0YXQuZ2FtbWFmbihiZXRhKSkgLyAoalN0YXQuZ2FtbWFmbigxICsgMSAvIGFscGhhICsgYmV0YSkpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGFscGhhLCBiZXRhKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDEgLSBNYXRoLnBvdygyLCAtMSAvIGJldGEpLCAxIC8gYWxwaGEpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoYWxwaGEsIGJldGEpIHtcbiAgICBpZiAoIShhbHBoYSA+PSAxICYmIGJldGEgPj0gMSAmJiAoYWxwaGEgIT09IDEgJiYgYmV0YSAhPT0gMSkpKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gTWF0aC5wb3coKGFscGhhIC0gMSkgLyAoYWxwaGEgKiBiZXRhIC0gMSksIDEgLyBhbHBoYSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKC8qYWxwaGEsIGJldGEqLykge1xuICAgIHRocm93IG5ldyBFcnJvcigndmFyaWFuY2Ugbm90IHlldCBpbXBsZW1lbnRlZCcpO1xuICAgIC8vIFRPRE86IGNvbXBsZXRlIHRoaXNcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgbG9nbm9ybWFsIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5sb2dub3JtYWwsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgbXUsIHNpZ21hKSB7XG4gICAgaWYgKHggPD0gMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiBNYXRoLmV4cCgtTWF0aC5sb2coeCkgLSAwLjUgKiBNYXRoLmxvZygyICogTWF0aC5QSSkgLVxuICAgICAgICAgICAgICAgICAgICBNYXRoLmxvZyhzaWdtYSkgLSBNYXRoLnBvdyhNYXRoLmxvZyh4KSAtIG11LCAyKSAvXG4gICAgICAgICAgICAgICAgICAgICgyICogc2lnbWEgKiBzaWdtYSkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIG11LCBzaWdtYSkge1xuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIHJldHVybiAwLjUgK1xuICAgICAgICAoMC41ICogalN0YXQuZXJmKChNYXRoLmxvZyh4KSAtIG11KSAvIE1hdGguc3FydCgyICogc2lnbWEgKiBzaWdtYSkpKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIG11LCBzaWdtYSkge1xuICAgIHJldHVybiBNYXRoLmV4cCgtMS40MTQyMTM1NjIzNzMwOTUwNSAqIHNpZ21hICogalN0YXQuZXJmY2ludigyICogcCkgKyBtdSk7XG4gIH0sXG5cbiAgbWVhbjogZnVuY3Rpb24gbWVhbihtdSwgc2lnbWEpIHtcbiAgICByZXR1cm4gTWF0aC5leHAobXUgKyBzaWdtYSAqIHNpZ21hIC8gMik7XG4gIH0sXG5cbiAgbWVkaWFuOiBmdW5jdGlvbiBtZWRpYW4obXUvKiwgc2lnbWEqLykge1xuICAgIHJldHVybiBNYXRoLmV4cChtdSk7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZShtdSwgc2lnbWEpIHtcbiAgICByZXR1cm4gTWF0aC5leHAobXUgLSBzaWdtYSAqIHNpZ21hKTtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShtdSwgc2lnbWEpIHtcbiAgICByZXR1cm4gTWF0aC5leHAoalN0YXQucmFuZG4oKSAqIHNpZ21hICsgbXUpO1xuICB9LFxuXG4gIHZhcmlhbmNlOiBmdW5jdGlvbiB2YXJpYW5jZShtdSwgc2lnbWEpIHtcbiAgICByZXR1cm4gKE1hdGguZXhwKHNpZ21hICogc2lnbWEpIC0gMSkgKiBNYXRoLmV4cCgyICogbXUgKyBzaWdtYSAqIHNpZ21hKTtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgbm9uY2VudHJhbHQgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0Lm5vbmNlbnRyYWx0LCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGRvZiwgbmNwKSB7XG4gICAgdmFyIHRvbCA9IDFlLTE0O1xuICAgIGlmIChNYXRoLmFicyhuY3ApIDwgdG9sKSAgLy8gbmNwIGFwcHJveCAwOyB1c2Ugc3R1ZGVudC10XG4gICAgICByZXR1cm4galN0YXQuc3R1ZGVudHQucGRmKHgsIGRvZilcblxuICAgIGlmIChNYXRoLmFicyh4KSA8IHRvbCkgeyAgLy8gZGlmZmVyZW50IGZvcm11bGEgZm9yIHggPT0gMFxuICAgICAgcmV0dXJuIE1hdGguZXhwKGpTdGF0LmdhbW1hbG4oKGRvZiArIDEpIC8gMikgLSBuY3AgKiBuY3AgLyAyIC1cbiAgICAgICAgICAgICAgICAgICAgICAwLjUgKiBNYXRoLmxvZyhNYXRoLlBJICogZG9mKSAtIGpTdGF0LmdhbW1hbG4oZG9mIC8gMikpO1xuICAgIH1cblxuICAgIC8vIGZvcm11bGEgZm9yIHggIT0gMFxuICAgIHJldHVybiBkb2YgLyB4ICpcbiAgICAgICAgKGpTdGF0Lm5vbmNlbnRyYWx0LmNkZih4ICogTWF0aC5zcXJ0KDEgKyAyIC8gZG9mKSwgZG9mKzIsIG5jcCkgLVxuICAgICAgICAgalN0YXQubm9uY2VudHJhbHQuY2RmKHgsIGRvZiwgbmNwKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgZG9mLCBuY3ApIHtcbiAgICB2YXIgdG9sID0gMWUtMTQ7XG4gICAgdmFyIG1pbl9pdGVyYXRpb25zID0gMjAwO1xuXG4gICAgaWYgKE1hdGguYWJzKG5jcCkgPCB0b2wpICAvLyBuY3AgYXBwcm94IDA7IHVzZSBzdHVkZW50LXRcbiAgICAgIHJldHVybiBqU3RhdC5zdHVkZW50dC5jZGYoeCwgZG9mKTtcblxuICAgIC8vIHR1cm4gbmVnYXRpdmUgeCBpbnRvIHBvc2l0aXZlIGFuZCBmbGlwIHJlc3VsdCBhZnRlcndhcmRzXG4gICAgdmFyIGZsaXAgPSBmYWxzZTtcbiAgICBpZiAoeCA8IDApIHtcbiAgICAgIGZsaXAgPSB0cnVlO1xuICAgICAgbmNwID0gLW5jcDtcbiAgICB9XG5cbiAgICB2YXIgcHJvYiA9IGpTdGF0Lm5vcm1hbC5jZGYoLW5jcCwgMCwgMSk7XG4gICAgdmFyIHZhbHVlID0gdG9sICsgMTtcbiAgICAvLyB1c2UgdmFsdWUgYXQgbGFzdCB0d28gc3RlcHMgdG8gZGV0ZXJtaW5lIGNvbnZlcmdlbmNlXG4gICAgdmFyIGxhc3R2YWx1ZSA9IHZhbHVlO1xuICAgIHZhciB5ID0geCAqIHggLyAoeCAqIHggKyBkb2YpO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIgcCA9IE1hdGguZXhwKC1uY3AgKiBuY3AgLyAyKTtcbiAgICB2YXIgcSA9IE1hdGguZXhwKC1uY3AgKiBuY3AgLyAyIC0gMC41ICogTWF0aC5sb2coMikgLVxuICAgICAgICAgICAgICAgICAgICAgalN0YXQuZ2FtbWFsbigzIC8gMikpICogbmNwO1xuICAgIHdoaWxlIChqIDwgbWluX2l0ZXJhdGlvbnMgfHwgbGFzdHZhbHVlID4gdG9sIHx8IHZhbHVlID4gdG9sKSB7XG4gICAgICBsYXN0dmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmIChqID4gMCkge1xuICAgICAgICBwICo9IChuY3AgKiBuY3ApIC8gKDIgKiBqKTtcbiAgICAgICAgcSAqPSAobmNwICogbmNwKSAvICgyICogKGogKyAxIC8gMikpO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSBwICogalN0YXQuYmV0YS5jZGYoeSwgaiArIDAuNSwgZG9mIC8gMikgK1xuICAgICAgICAgIHEgKiBqU3RhdC5iZXRhLmNkZih5LCBqKzEsIGRvZi8yKTtcbiAgICAgIHByb2IgKz0gMC41ICogdmFsdWU7XG4gICAgICBqKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsaXAgPyAoMSAtIHByb2IpIDogcHJvYjtcbiAgfVxufSk7XG5cblxuLy8gZXh0ZW5kIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQubm9ybWFsLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIG1lYW4sIHN0ZCkge1xuICAgIHJldHVybiBNYXRoLmV4cCgtMC41ICogTWF0aC5sb2coMiAqIE1hdGguUEkpIC1cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5sb2coc3RkKSAtIE1hdGgucG93KHggLSBtZWFuLCAyKSAvICgyICogc3RkICogc3RkKSk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgbWVhbiwgc3RkKSB7XG4gICAgcmV0dXJuIDAuNSAqICgxICsgalN0YXQuZXJmKCh4IC0gbWVhbikgLyBNYXRoLnNxcnQoMiAqIHN0ZCAqIHN0ZCkpKTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIG1lYW4sIHN0ZCkge1xuICAgIHJldHVybiAtMS40MTQyMTM1NjIzNzMwOTUwNSAqIHN0ZCAqIGpTdGF0LmVyZmNpbnYoMiAqIHApICsgbWVhbjtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24obWVhbi8qLCBzdGQqLykge1xuICAgIHJldHVybiBtZWFuO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKG1lYW4vKiwgc3RkKi8pIHtcbiAgICByZXR1cm4gbWVhbjtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiAobWVhbi8qLCBzdGQqLykge1xuICAgIHJldHVybiBtZWFuO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKG1lYW4sIHN0ZCkge1xuICAgIHJldHVybiBqU3RhdC5yYW5kbigpICogc3RkICsgbWVhbjtcbiAgfSxcblxuICB2YXJpYW5jZSA6IGZ1bmN0aW9uKG1lYW4sIHN0ZCkge1xuICAgIHJldHVybiBzdGQgKiBzdGQ7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHBhcmV0byBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQucGFyZXRvLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIHNjYWxlLCBzaGFwZSkge1xuICAgIGlmICh4IDwgc2NhbGUpXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gKHNoYXBlICogTWF0aC5wb3coc2NhbGUsIHNoYXBlKSkgLyBNYXRoLnBvdyh4LCBzaGFwZSArIDEpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIHNjYWxlLCBzaGFwZSkge1xuICAgIGlmICh4IDwgc2NhbGUpXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KHNjYWxlIC8geCwgc2hhcGUpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24gaW52KHAsIHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAvIE1hdGgucG93KDEgLSBwLCAxIC8gc2hhcGUpO1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oc2NhbGUsIHNoYXBlKSB7XG4gICAgaWYgKHNoYXBlIDw9IDEpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiAoc2hhcGUgKiBNYXRoLnBvdyhzY2FsZSwgc2hhcGUpKSAvIChzaGFwZSAtIDEpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiBzY2FsZSAqIChzaGFwZSAqIE1hdGguU1FSVDIpO1xuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoc2NhbGUvKiwgc2hhcGUqLykge1xuICAgIHJldHVybiBzY2FsZTtcbiAgfSxcblxuICB2YXJpYW5jZSA6IGZ1bmN0aW9uKHNjYWxlLCBzaGFwZSkge1xuICAgIGlmIChzaGFwZSA8PSAyKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gKHNjYWxlKnNjYWxlICogc2hhcGUpIC8gKE1hdGgucG93KHNoYXBlIC0gMSwgMikgKiAoc2hhcGUgLSAyKSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHN0dWRlbnR0IGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5zdHVkZW50dCwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBkb2YpIHtcbiAgICBkb2YgPSBkb2YgPiAxZTEwMCA/IDFlMTAwIDogZG9mO1xuICAgIHJldHVybiAoMS8oTWF0aC5zcXJ0KGRvZikgKiBqU3RhdC5iZXRhZm4oMC41LCBkb2YvMikpKSAqXG4gICAgICAgIE1hdGgucG93KDEgKyAoKHggKiB4KSAvIGRvZiksIC0oKGRvZiArIDEpIC8gMikpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGRvZikge1xuICAgIHZhciBkb2YyID0gZG9mIC8gMjtcbiAgICByZXR1cm4galN0YXQuaWJldGEoKHggKyBNYXRoLnNxcnQoeCAqIHggKyBkb2YpKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICgyICogTWF0aC5zcXJ0KHggKiB4ICsgZG9mKSksIGRvZjIsIGRvZjIpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgZG9mKSB7XG4gICAgdmFyIHggPSBqU3RhdC5pYmV0YWludigyICogTWF0aC5taW4ocCwgMSAtIHApLCAwLjUgKiBkb2YsIDAuNSk7XG4gICAgeCA9IE1hdGguc3FydChkb2YgKiAoMSAtIHgpIC8geCk7XG4gICAgcmV0dXJuIChwID4gMC41KSA/IHggOiAteDtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKGRvZikge1xuICAgIHJldHVybiAoZG9mID4gMSkgPyAwIDogdW5kZWZpbmVkO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKC8qZG9mKi8pIHtcbiAgICByZXR1cm4gMDtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKC8qZG9mKi8pIHtcbiAgICByZXR1cm4gMDtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShkb2YpIHtcbiAgICByZXR1cm4galN0YXQucmFuZG4oKSAqIE1hdGguc3FydChkb2YgLyAoMiAqIGpTdGF0LnJhbmRnKGRvZiAvIDIpKSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGRvZikge1xuICAgIHJldHVybiAoZG9mICA+IDIpID8gZG9mIC8gKGRvZiAtIDIpIDogKGRvZiA+IDEpID8gSW5maW5pdHkgOiB1bmRlZmluZWQ7XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHdlaWJ1bGwgZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LndlaWJ1bGwsIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoeCwgc2NhbGUsIHNoYXBlKSB7XG4gICAgaWYgKHggPCAwIHx8IHNjYWxlIDwgMCB8fCBzaGFwZSA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4gKHNoYXBlIC8gc2NhbGUpICogTWF0aC5wb3coKHggLyBzY2FsZSksIChzaGFwZSAtIDEpKSAqXG4gICAgICAgIE1hdGguZXhwKC0oTWF0aC5wb3coKHggLyBzY2FsZSksIHNoYXBlKSkpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIHNjYWxlLCBzaGFwZSkge1xuICAgIHJldHVybiB4IDwgMCA/IDAgOiAxIC0gTWF0aC5leHAoLU1hdGgucG93KCh4IC8gc2NhbGUpLCBzaGFwZSkpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24ocCwgc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlICogTWF0aC5wb3coLU1hdGgubG9nKDEgLSBwKSwgMSAvIHNoYXBlKTtcbiAgfSxcblxuICBtZWFuIDogZnVuY3Rpb24oc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlICogalN0YXQuZ2FtbWFmbigxICsgMSAvIHNoYXBlKTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgKiBNYXRoLnBvdyhNYXRoLmxvZygyKSwgMSAvIHNoYXBlKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKHNjYWxlLCBzaGFwZSkge1xuICAgIGlmIChzaGFwZSA8PSAxKVxuICAgICAgcmV0dXJuIDA7XG4gICAgcmV0dXJuIHNjYWxlICogTWF0aC5wb3coKHNoYXBlIC0gMSkgLyBzaGFwZSwgMSAvIHNoYXBlKTtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShzY2FsZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gc2NhbGUgKiBNYXRoLnBvdygtTWF0aC5sb2coalN0YXQuX3JhbmRvbV9mbigpKSwgMSAvIHNoYXBlKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2Uoc2NhbGUsIHNoYXBlKSB7XG4gICAgcmV0dXJuIHNjYWxlICogc2NhbGUgKiBqU3RhdC5nYW1tYWZuKDEgKyAyIC8gc2hhcGUpIC1cbiAgICAgICAgTWF0aC5wb3coalN0YXQud2VpYnVsbC5tZWFuKHNjYWxlLCBzaGFwZSksIDIpO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCB1bmlmb3JtIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC51bmlmb3JtLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGEsIGIpIHtcbiAgICByZXR1cm4gKHggPCBhIHx8IHggPiBiKSA/IDAgOiAxIC8gKGIgLSBhKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCBhLCBiKSB7XG4gICAgaWYgKHggPCBhKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZWxzZSBpZiAoeCA8IGIpXG4gICAgICByZXR1cm4gKHggLSBhKSAvIChiIC0gYSk7XG4gICAgcmV0dXJuIDE7XG4gIH0sXG5cbiAgaW52OiBmdW5jdGlvbihwLCBhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyAocCAqIChiIC0gYSkpO1xuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uIG1lYW4oYSwgYikge1xuICAgIHJldHVybiAwLjUgKiAoYSArIGIpO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGEsIGIpIHtcbiAgICByZXR1cm4galN0YXQubWVhbihhLCBiKTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbiBtb2RlKC8qYSwgYiovKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtb2RlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShhLCBiKSB7XG4gICAgcmV0dXJuIChhIC8gMiArIGIgLyAyKSArIChiIC8gMiAtIGEgLyAyKSAqICgyICogalN0YXQuX3JhbmRvbV9mbigpIC0gMSk7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uIHZhcmlhbmNlKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5wb3coYiAtIGEsIDIpIC8gMTI7XG4gIH1cbn0pO1xuXG5cbi8vIEdvdCB0aGlzIGZyb20gaHR0cDovL3d3dy5tYXRoLnVjbGEuZWR1L350b20vZGlzdHJpYnV0aW9ucy9iaW5vbWlhbC5odG1sXG5mdW5jdGlvbiBiZXRpbmMoeCwgYSwgYiwgZXBzKSB7XG4gIHZhciBhMCA9IDA7XG4gIHZhciBiMCA9IDE7XG4gIHZhciBhMSA9IDE7XG4gIHZhciBiMSA9IDE7XG4gIHZhciBtOSA9IDA7XG4gIHZhciBhMiA9IDA7XG4gIHZhciBjOTtcblxuICB3aGlsZSAoTWF0aC5hYnMoKGExIC0gYTIpIC8gYTEpID4gZXBzKSB7XG4gICAgYTIgPSBhMTtcbiAgICBjOSA9IC0oYSArIG05KSAqIChhICsgYiArIG05KSAqIHggLyAoYSArIDIgKiBtOSkgLyAoYSArIDIgKiBtOSArIDEpO1xuICAgIGEwID0gYTEgKyBjOSAqIGEwO1xuICAgIGIwID0gYjEgKyBjOSAqIGIwO1xuICAgIG05ID0gbTkgKyAxO1xuICAgIGM5ID0gbTkgKiAoYiAtIG05KSAqIHggLyAoYSArIDIgKiBtOSAtIDEpIC8gKGEgKyAyICogbTkpO1xuICAgIGExID0gYTAgKyBjOSAqIGExO1xuICAgIGIxID0gYjAgKyBjOSAqIGIxO1xuICAgIGEwID0gYTAgLyBiMTtcbiAgICBiMCA9IGIwIC8gYjE7XG4gICAgYTEgPSBhMSAvIGIxO1xuICAgIGIxID0gMTtcbiAgfVxuXG4gIHJldHVybiBhMSAvIGE7XG59XG5cblxuLy8gZXh0ZW5kIHVuaWZvcm0gZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LmJpbm9taWFsLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKGssIG4sIHApIHtcbiAgICByZXR1cm4gKHAgPT09IDAgfHwgcCA9PT0gMSkgP1xuICAgICAgKChuICogcCkgPT09IGsgPyAxIDogMCkgOlxuICAgICAgalN0YXQuY29tYmluYXRpb24obiwgaykgKiBNYXRoLnBvdyhwLCBrKSAqIE1hdGgucG93KDEgLSBwLCBuIC0gayk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgbiwgcCkge1xuICAgIHZhciBiZXRhY2RmO1xuICAgIHZhciBlcHMgPSAxZS0xMDtcblxuICAgIGlmICh4IDwgMClcbiAgICAgIHJldHVybiAwO1xuICAgIGlmICh4ID49IG4pXG4gICAgICByZXR1cm4gMTtcbiAgICBpZiAocCA8IDAgfHwgcCA+IDEgfHwgbiA8PSAwKVxuICAgICAgcmV0dXJuIE5hTjtcblxuICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgIHZhciB6ID0gcDtcbiAgICB2YXIgYSA9IHggKyAxO1xuICAgIHZhciBiID0gbiAtIHg7XG4gICAgdmFyIHMgPSBhICsgYjtcbiAgICB2YXIgYnQgPSBNYXRoLmV4cChqU3RhdC5nYW1tYWxuKHMpIC0galN0YXQuZ2FtbWFsbihiKSAtXG4gICAgICAgICAgICAgICAgICAgICAgalN0YXQuZ2FtbWFsbihhKSArIGEgKiBNYXRoLmxvZyh6KSArIGIgKiBNYXRoLmxvZygxIC0geikpO1xuXG4gICAgaWYgKHogPCAoYSArIDEpIC8gKHMgKyAyKSlcbiAgICAgIGJldGFjZGYgPSBidCAqIGJldGluYyh6LCBhLCBiLCBlcHMpO1xuICAgIGVsc2VcbiAgICAgIGJldGFjZGYgPSAxIC0gYnQgKiBiZXRpbmMoMSAtIHosIGIsIGEsIGVwcyk7XG5cbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoMSAtIGJldGFjZGYpICogKDEgLyBlcHMpKSAvICgxIC8gZXBzKTtcbiAgfVxufSk7XG5cblxuXG4vLyBleHRlbmQgdW5pZm9ybSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQubmVnYmluLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKGssIHIsIHApIHtcbiAgICBpZiAoayAhPT0gayA+Pj4gMClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAoayA8IDApXG4gICAgICByZXR1cm4gMDtcbiAgICByZXR1cm4galN0YXQuY29tYmluYXRpb24oayArIHIgLSAxLCByIC0gMSkgKlxuICAgICAgICBNYXRoLnBvdygxIC0gcCwgaykgKiBNYXRoLnBvdyhwLCByKTtcbiAgfSxcblxuICBjZGY6IGZ1bmN0aW9uIGNkZih4LCByLCBwKSB7XG4gICAgdmFyIHN1bSA9IDAsXG4gICAgayA9IDA7XG4gICAgaWYgKHggPCAwKSByZXR1cm4gMDtcbiAgICBmb3IgKDsgayA8PSB4OyBrKyspIHtcbiAgICAgIHN1bSArPSBqU3RhdC5uZWdiaW4ucGRmKGssIHIsIHApO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9XG59KTtcblxuXG5cbi8vIGV4dGVuZCB1bmlmb3JtIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC5oeXBnZW9tLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKGssIE4sIG0sIG4pIHtcbiAgICAvLyBIeXBlcmdlb21ldHJpYyBQREYuXG5cbiAgICAvLyBBIHNpbXBsaWZpY2F0aW9uIG9mIHRoZSBDREYgYWxnb3JpdGhtIGJlbG93LlxuXG4gICAgLy8gayA9IG51bWJlciBvZiBzdWNjZXNzZXMgZHJhd25cbiAgICAvLyBOID0gcG9wdWxhdGlvbiBzaXplXG4gICAgLy8gbSA9IG51bWJlciBvZiBzdWNjZXNzZXMgaW4gcG9wdWxhdGlvblxuICAgIC8vIG4gPSBudW1iZXIgb2YgaXRlbXMgZHJhd24gZnJvbSBwb3B1bGF0aW9uXG5cbiAgICBpZihrICE9PSBrIHwgMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZihrIDwgMCB8fCBrIDwgbSAtIChOIC0gbikpIHtcbiAgICAgIC8vIEl0J3MgaW1wb3NzaWJsZSB0byBoYXZlIHRoaXMgZmV3IHN1Y2Nlc3NlcyBkcmF3bi5cbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZihrID4gbiB8fCBrID4gbSkge1xuICAgICAgLy8gSXQncyBpbXBvc3NpYmxlIHRvIGhhdmUgdGhpcyBtYW55IHN1Y2Nlc3NlcyBkcmF3bi5cbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAobSAqIDIgPiBOKSB7XG4gICAgICAvLyBNb3JlIHRoYW4gaGFsZiB0aGUgcG9wdWxhdGlvbiBpcyBzdWNjZXNzZXMuXG5cbiAgICAgIGlmKG4gKiAyID4gTikge1xuICAgICAgICAvLyBNb3JlIHRoYW4gaGFsZiB0aGUgcG9wdWxhdGlvbiBpcyBzYW1wbGVkLlxuXG4gICAgICAgIHJldHVybiBqU3RhdC5oeXBnZW9tLnBkZihOIC0gbSAtIG4gKyBrLCBOLCBOIC0gbSwgTiAtIG4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYWxmIG9yIGxlc3Mgb2YgdGhlIHBvcHVsYXRpb24gaXMgc2FtcGxlZC5cblxuICAgICAgICByZXR1cm4galN0YXQuaHlwZ2VvbS5wZGYobiAtIGssIE4sIE4gLSBtLCBuKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZihuICogMiA+IE4pIHtcbiAgICAgIC8vIEhhbGYgb3IgbGVzcyBpcyBzdWNjZXNzZXMuXG5cbiAgICAgIHJldHVybiBqU3RhdC5oeXBnZW9tLnBkZihtIC0gaywgTiwgbSwgTiAtIG4pO1xuXG4gICAgfSBlbHNlIGlmKG0gPCBuKSB7XG4gICAgICAvLyBXZSB3YW50IHRvIGhhdmUgdGhlIG51bWJlciBvZiB0aGluZ3Mgc2FtcGxlZCB0byBiZSBsZXNzIHRoYW4gdGhlXG4gICAgICAvLyBzdWNjZXNzZXMgYXZhaWxhYmxlLiBTbyBzd2FwIHRoZSBkZWZpbml0aW9ucyBvZiBzdWNjZXNzZnVsIGFuZCBzYW1wbGVkLlxuICAgICAgcmV0dXJuIGpTdGF0Lmh5cGdlb20ucGRmKGssIE4sIG4sIG0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB3ZSBnZXQgaGVyZSwgaGFsZiBvciBsZXNzIG9mIHRoZSBwb3B1bGF0aW9uIHdhcyBzYW1wbGVkLCBoYWxmIG9yXG4gICAgICAvLyBsZXNzIG9mIGl0IHdhcyBzdWNjZXNzZXMsIGFuZCB3ZSBoYWQgZmV3ZXIgc2FtcGxlZCB0aGluZ3MgdGhhblxuICAgICAgLy8gc3VjY2Vzc2VzLiBOb3cgd2UgY2FuIGRvIHRoaXMgY29tcGxpY2F0ZWQgaXRlcmF0aXZlIGFsZ29yaXRobSBpbiBhblxuICAgICAgLy8gZWZmaWNpZW50IHdheS5cblxuICAgICAgLy8gVGhlIGJhc2ljIHByZW1pc2Ugb2YgdGhlIGFsZ29yaXRobSBpcyB0aGF0IHdlIHBhcnRpYWxseSBub3JtYWxpemUgb3VyXG4gICAgICAvLyBpbnRlcm1lZGlhdGUgcHJvZHVjdCB0byBrZWVwIGl0IGluIGEgbnVtZXJpY2FsbHkgZ29vZCByZWdpb24sIGFuZCB0aGVuXG4gICAgICAvLyBmaW5pc2ggdGhlIG5vcm1hbGl6YXRpb24gYXQgdGhlIGVuZC5cblxuICAgICAgLy8gVGhpcyB2YXJpYWJsZSBob2xkcyB0aGUgc2NhbGVkIHByb2JhYmlsaXR5IG9mIHRoZSBjdXJyZW50IG51bWJlciBvZlxuICAgICAgLy8gc3VjY2Vzc2VzLlxuICAgICAgdmFyIHNjYWxlZFBERiA9IDE7XG5cbiAgICAgIC8vIFRoaXMga2VlcHMgdHJhY2sgb2YgaG93IG11Y2ggd2UgaGF2ZSBub3JtYWxpemVkLlxuICAgICAgdmFyIHNhbXBsZXNEb25lID0gMDtcblxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGs7IGkrKykge1xuICAgICAgICAvLyBGb3IgZXZlcnkgcG9zc2libGUgbnVtYmVyIG9mIHN1Y2Nlc3NlcyB1cCB0byB0aGF0IG9ic2VydmVkLi4uXG5cbiAgICAgICAgd2hpbGUoc2NhbGVkUERGID4gMSAmJiBzYW1wbGVzRG9uZSA8IG4pIHtcbiAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgcmVzdWx0IGlzIGdyb3dpbmcgdG9vIGJpZy4gQXBwbHkgc29tZSBvZiB0aGVcbiAgICAgICAgICAvLyBub3JtYWxpemF0aW9uIHRvIHNocmluayBldmVyeXRoaW5nLlxuXG4gICAgICAgICAgc2NhbGVkUERGICo9IDEgLSAobSAvIChOIC0gc2FtcGxlc0RvbmUpKTtcblxuICAgICAgICAgIC8vIFNheSB3ZSd2ZSBub3JtYWxpemVkIGJ5IHRoaXMgc2FtcGxlIGFscmVhZHkuXG4gICAgICAgICAgc2FtcGxlc0RvbmUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBwYXJ0aWFsbHktbm9ybWFsaXplZCBoeXBlcmdlb21ldHJpYyBQREYgZm9yIHRoZSBuZXh0XG4gICAgICAgIC8vIG51bWJlciBvZiBzdWNjZXNzZXNcbiAgICAgICAgc2NhbGVkUERGICo9IChuIC0gaSkgKiAobSAtIGkpIC8gKChpICsgMSkgKiAoTiAtIG0gLSBuICsgaSArIDEpKTtcbiAgICAgIH1cblxuICAgICAgZm9yKDsgc2FtcGxlc0RvbmUgPCBuOyBzYW1wbGVzRG9uZSsrKSB7XG4gICAgICAgIC8vIEFwcGx5IGFsbCB0aGUgcmVzdCBvZiB0aGUgbm9ybWFsaXphdGlvblxuICAgICAgICBzY2FsZWRQREYgKj0gMSAtIChtIC8gKE4gLSBzYW1wbGVzRG9uZSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBCb3VuZCBhbnN3ZXIgc2FuZWx5IGJlZm9yZSByZXR1cm5pbmcuXG4gICAgICByZXR1cm4gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgc2NhbGVkUERGKSk7XG4gICAgfVxuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIE4sIG0sIG4pIHtcbiAgICAvLyBIeXBlcmdlb21ldHJpYyBDREYuXG5cbiAgICAvLyBUaGlzIGFsZ29yaXRobSBpcyBkdWUgdG8gUHJvZi4gVGhvbWFzIFMuIEZlcmd1c29uLCA8dG9tQG1hdGgudWNsYS5lZHU+LFxuICAgIC8vIGFuZCBjb21lcyBmcm9tIGhpcyBoeXBlcmdlb21ldHJpYyB0ZXN0IGNhbGN1bGF0b3IgYXRcbiAgICAvLyA8aHR0cDovL3d3dy5tYXRoLnVjbGEuZWR1L350b20vZGlzdHJpYnV0aW9ucy9IeXBlcmdlb21ldHJpYy5odG1sPi5cblxuICAgIC8vIHggPSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGRyYXduXG4gICAgLy8gTiA9IHBvcHVsYXRpb24gc2l6ZVxuICAgIC8vIG0gPSBudW1iZXIgb2Ygc3VjY2Vzc2VzIGluIHBvcHVsYXRpb25cbiAgICAvLyBuID0gbnVtYmVyIG9mIGl0ZW1zIGRyYXduIGZyb20gcG9wdWxhdGlvblxuXG4gICAgaWYoeCA8IDAgfHwgeCA8IG0gLSAoTiAtIG4pKSB7XG4gICAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gaGF2ZSB0aGlzIGZldyBzdWNjZXNzZXMgZHJhd24gb3IgZmV3ZXIuXG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYoeCA+PSBuIHx8IHggPj0gbSkge1xuICAgICAgLy8gV2Ugd2lsbCBhbHdheXMgaGF2ZSB0aGlzIG1hbnkgc3VjY2Vzc2VzIG9yIGZld2VyLlxuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChtICogMiA+IE4pIHtcbiAgICAgIC8vIE1vcmUgdGhhbiBoYWxmIHRoZSBwb3B1bGF0aW9uIGlzIHN1Y2Nlc3Nlcy5cblxuICAgICAgaWYobiAqIDIgPiBOKSB7XG4gICAgICAgIC8vIE1vcmUgdGhhbiBoYWxmIHRoZSBwb3B1bGF0aW9uIGlzIHNhbXBsZWQuXG5cbiAgICAgICAgcmV0dXJuIGpTdGF0Lmh5cGdlb20uY2RmKE4gLSBtIC0gbiArIHgsIE4sIE4gLSBtLCBOIC0gbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEhhbGYgb3IgbGVzcyBvZiB0aGUgcG9wdWxhdGlvbiBpcyBzYW1wbGVkLlxuXG4gICAgICAgIHJldHVybiAxIC0galN0YXQuaHlwZ2VvbS5jZGYobiAtIHggLSAxLCBOLCBOIC0gbSwgbik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYobiAqIDIgPiBOKSB7XG4gICAgICAvLyBIYWxmIG9yIGxlc3MgaXMgc3VjY2Vzc2VzLlxuXG4gICAgICByZXR1cm4gMSAtIGpTdGF0Lmh5cGdlb20uY2RmKG0gLSB4IC0gMSwgTiwgbSwgTiAtIG4pO1xuXG4gICAgfSBlbHNlIGlmKG0gPCBuKSB7XG4gICAgICAvLyBXZSB3YW50IHRvIGhhdmUgdGhlIG51bWJlciBvZiB0aGluZ3Mgc2FtcGxlZCB0byBiZSBsZXNzIHRoYW4gdGhlXG4gICAgICAvLyBzdWNjZXNzZXMgYXZhaWxhYmxlLiBTbyBzd2FwIHRoZSBkZWZpbml0aW9ucyBvZiBzdWNjZXNzZnVsIGFuZCBzYW1wbGVkLlxuICAgICAgcmV0dXJuIGpTdGF0Lmh5cGdlb20uY2RmKHgsIE4sIG4sIG0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB3ZSBnZXQgaGVyZSwgaGFsZiBvciBsZXNzIG9mIHRoZSBwb3B1bGF0aW9uIHdhcyBzYW1wbGVkLCBoYWxmIG9yXG4gICAgICAvLyBsZXNzIG9mIGl0IHdhcyBzdWNjZXNzZXMsIGFuZCB3ZSBoYWQgZmV3ZXIgc2FtcGxlZCB0aGluZ3MgdGhhblxuICAgICAgLy8gc3VjY2Vzc2VzLiBOb3cgd2UgY2FuIGRvIHRoaXMgY29tcGxpY2F0ZWQgaXRlcmF0aXZlIGFsZ29yaXRobSBpbiBhblxuICAgICAgLy8gZWZmaWNpZW50IHdheS5cblxuICAgICAgLy8gVGhlIGJhc2ljIHByZW1pc2Ugb2YgdGhlIGFsZ29yaXRobSBpcyB0aGF0IHdlIHBhcnRpYWxseSBub3JtYWxpemUgb3VyXG4gICAgICAvLyBpbnRlcm1lZGlhdGUgc3VtIHRvIGtlZXAgaXQgaW4gYSBudW1lcmljYWxseSBnb29kIHJlZ2lvbiwgYW5kIHRoZW5cbiAgICAgIC8vIGZpbmlzaCB0aGUgbm9ybWFsaXphdGlvbiBhdCB0aGUgZW5kLlxuXG4gICAgICAvLyBIb2xkcyB0aGUgaW50ZXJtZWRpYXRlLCBzY2FsZWQgdG90YWwgQ0RGLlxuICAgICAgdmFyIHNjYWxlZENERiA9IDE7XG5cbiAgICAgIC8vIFRoaXMgdmFyaWFibGUgaG9sZHMgdGhlIHNjYWxlZCBwcm9iYWJpbGl0eSBvZiB0aGUgY3VycmVudCBudW1iZXIgb2ZcbiAgICAgIC8vIHN1Y2Nlc3Nlcy5cbiAgICAgIHZhciBzY2FsZWRQREYgPSAxO1xuXG4gICAgICAvLyBUaGlzIGtlZXBzIHRyYWNrIG9mIGhvdyBtdWNoIHdlIGhhdmUgbm9ybWFsaXplZC5cbiAgICAgIHZhciBzYW1wbGVzRG9uZSA9IDA7XG5cbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB4OyBpKyspIHtcbiAgICAgICAgLy8gRm9yIGV2ZXJ5IHBvc3NpYmxlIG51bWJlciBvZiBzdWNjZXNzZXMgdXAgdG8gdGhhdCBvYnNlcnZlZC4uLlxuXG4gICAgICAgIHdoaWxlKHNjYWxlZENERiA+IDEgJiYgc2FtcGxlc0RvbmUgPCBuKSB7XG4gICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIHJlc3VsdCBpcyBncm93aW5nIHRvbyBiaWcuIEFwcGx5IHNvbWUgb2YgdGhlXG4gICAgICAgICAgLy8gbm9ybWFsaXphdGlvbiB0byBzaHJpbmsgZXZlcnl0aGluZy5cblxuICAgICAgICAgIHZhciBmYWN0b3IgPSAxIC0gKG0gLyAoTiAtIHNhbXBsZXNEb25lKSk7XG5cbiAgICAgICAgICBzY2FsZWRQREYgKj0gZmFjdG9yO1xuICAgICAgICAgIHNjYWxlZENERiAqPSBmYWN0b3I7XG5cbiAgICAgICAgICAvLyBTYXkgd2UndmUgbm9ybWFsaXplZCBieSB0aGlzIHNhbXBsZSBhbHJlYWR5LlxuICAgICAgICAgIHNhbXBsZXNEb25lKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXb3JrIG91dCB0aGUgcGFydGlhbGx5LW5vcm1hbGl6ZWQgaHlwZXJnZW9tZXRyaWMgUERGIGZvciB0aGUgbmV4dFxuICAgICAgICAvLyBudW1iZXIgb2Ygc3VjY2Vzc2VzXG4gICAgICAgIHNjYWxlZFBERiAqPSAobiAtIGkpICogKG0gLSBpKSAvICgoaSArIDEpICogKE4gLSBtIC0gbiArIGkgKyAxKSk7XG5cbiAgICAgICAgLy8gQWRkIHRvIHRoZSBDREYgYW5zd2VyLlxuICAgICAgICBzY2FsZWRDREYgKz0gc2NhbGVkUERGO1xuICAgICAgfVxuXG4gICAgICBmb3IoOyBzYW1wbGVzRG9uZSA8IG47IHNhbXBsZXNEb25lKyspIHtcbiAgICAgICAgLy8gQXBwbHkgYWxsIHRoZSByZXN0IG9mIHRoZSBub3JtYWxpemF0aW9uXG4gICAgICAgIHNjYWxlZENERiAqPSAxIC0gKG0gLyAoTiAtIHNhbXBsZXNEb25lKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEJvdW5kIGFuc3dlciBzYW5lbHkgYmVmb3JlIHJldHVybmluZy5cbiAgICAgIHJldHVybiBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCBzY2FsZWRDREYpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cblxuLy8gZXh0ZW5kIHVuaWZvcm0gZnVuY3Rpb24gd2l0aCBzdGF0aWMgbWV0aG9kc1xualN0YXQuZXh0ZW5kKGpTdGF0LnBvaXNzb24sIHtcbiAgcGRmOiBmdW5jdGlvbiBwZGYoaywgbCkge1xuICAgIGlmIChsIDwgMCB8fCAoayAlIDEpICE9PSAwIHx8IGsgPCAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5wb3cobCwgaykgKiBNYXRoLmV4cCgtbCkgLyBqU3RhdC5mYWN0b3JpYWwoayk7XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgbCkge1xuICAgIHZhciBzdW1hcnIgPSBbXSxcbiAgICBrID0gMDtcbiAgICBpZiAoeCA8IDApIHJldHVybiAwO1xuICAgIGZvciAoOyBrIDw9IHg7IGsrKykge1xuICAgICAgc3VtYXJyLnB1c2goalN0YXQucG9pc3Nvbi5wZGYoaywgbCkpO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQuc3VtKHN1bWFycik7XG4gIH0sXG5cbiAgbWVhbiA6IGZ1bmN0aW9uKGwpIHtcbiAgICByZXR1cm4gbDtcbiAgfSxcblxuICB2YXJpYW5jZSA6IGZ1bmN0aW9uKGwpIHtcbiAgICByZXR1cm4gbDtcbiAgfSxcblxuICBzYW1wbGVTbWFsbDogZnVuY3Rpb24gc2FtcGxlU21hbGwobCkge1xuICAgIHZhciBwID0gMSwgayA9IDAsIEwgPSBNYXRoLmV4cCgtbCk7XG4gICAgZG8ge1xuICAgICAgaysrO1xuICAgICAgcCAqPSBqU3RhdC5fcmFuZG9tX2ZuKCk7XG4gICAgfSB3aGlsZSAocCA+IEwpO1xuICAgIHJldHVybiBrIC0gMTtcbiAgfSxcblxuICBzYW1wbGVMYXJnZTogZnVuY3Rpb24gc2FtcGxlTGFyZ2UobCkge1xuICAgIHZhciBsYW0gPSBsO1xuICAgIHZhciBrO1xuICAgIHZhciBVLCBWLCBzbGFtLCBsb2dsYW0sIGEsIGIsIGludmFscGhhLCB2ciwgdXM7XG5cbiAgICBzbGFtID0gTWF0aC5zcXJ0KGxhbSk7XG4gICAgbG9nbGFtID0gTWF0aC5sb2cobGFtKTtcbiAgICBiID0gMC45MzEgKyAyLjUzICogc2xhbTtcbiAgICBhID0gLTAuMDU5ICsgMC4wMjQ4MyAqIGI7XG4gICAgaW52YWxwaGEgPSAxLjEyMzkgKyAxLjEzMjggLyAoYiAtIDMuNCk7XG4gICAgdnIgPSAwLjkyNzcgLSAzLjYyMjQgLyAoYiAtIDIpO1xuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIFUgPSBNYXRoLnJhbmRvbSgpIC0gMC41O1xuICAgICAgViA9IE1hdGgucmFuZG9tKCk7XG4gICAgICB1cyA9IDAuNSAtIE1hdGguYWJzKFUpO1xuICAgICAgayA9IE1hdGguZmxvb3IoKDIgKiBhIC8gdXMgKyBiKSAqIFUgKyBsYW0gKyAwLjQzKTtcbiAgICAgIGlmICgodXMgPj0gMC4wNykgJiYgKFYgPD0gdnIpKSB7XG4gICAgICAgICAgcmV0dXJuIGs7XG4gICAgICB9XG4gICAgICBpZiAoKGsgPCAwKSB8fCAoKHVzIDwgMC4wMTMpICYmIChWID4gdXMpKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLyogbG9nKFYpID09IGxvZygwLjApIG9rIGhlcmUgKi9cbiAgICAgIC8qIGlmIFU9PTAuMCBzbyB0aGF0IHVzPT0wLjAsIGxvZyBpcyBvayBzaW5jZSBhbHdheXMgcmV0dXJucyAqL1xuICAgICAgaWYgKChNYXRoLmxvZyhWKSArIE1hdGgubG9nKGludmFscGhhKSAtIE1hdGgubG9nKGEgLyAodXMgKiB1cykgKyBiKSkgPD0gKC1sYW0gKyBrICogbG9nbGFtIC0galN0YXQubG9nZ2FtKGsgKyAxKSkpIHtcbiAgICAgICAgICByZXR1cm4gaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUobCkge1xuICAgIGlmIChsIDwgMTApXG4gICAgICByZXR1cm4gdGhpcy5zYW1wbGVTbWFsbChsKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5zYW1wbGVMYXJnZShsKTtcbiAgfVxufSk7XG5cbi8vIGV4dGVuZCB0cmlhbmd1bGFyIGZ1bmN0aW9uIHdpdGggc3RhdGljIG1ldGhvZHNcbmpTdGF0LmV4dGVuZChqU3RhdC50cmlhbmd1bGFyLCB7XG4gIHBkZjogZnVuY3Rpb24gcGRmKHgsIGEsIGIsIGMpIHtcbiAgICBpZiAoYiA8PSBhIHx8IGMgPCBhIHx8IGMgPiBiKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoeCA8IGEgfHwgeCA+IGIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9IGVsc2UgaWYgKHggPCBjKSB7XG4gICAgICAgICAgcmV0dXJuICgyICogKHggLSBhKSkgLyAoKGIgLSBhKSAqIChjIC0gYSkpO1xuICAgICAgfSBlbHNlIGlmICh4ID09PSBjKSB7XG4gICAgICAgICAgcmV0dXJuICgyIC8gKGIgLSBhKSk7XG4gICAgICB9IGVsc2UgeyAvLyB4ID4gY1xuICAgICAgICAgIHJldHVybiAoMiAqIChiIC0geCkpIC8gKChiIC0gYSkgKiAoYiAtIGMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2RmOiBmdW5jdGlvbiBjZGYoeCwgYSwgYiwgYykge1xuICAgIGlmIChiIDw9IGEgfHwgYyA8IGEgfHwgYyA+IGIpXG4gICAgICByZXR1cm4gTmFOO1xuICAgIGlmICh4IDw9IGEpXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmICh4ID49IGIpXG4gICAgICByZXR1cm4gMTtcbiAgICBpZiAoeCA8PSBjKVxuICAgICAgcmV0dXJuIE1hdGgucG93KHggLSBhLCAyKSAvICgoYiAtIGEpICogKGMgLSBhKSk7XG4gICAgZWxzZSAvLyB4ID4gY1xuICAgICAgcmV0dXJuIDEgLSBNYXRoLnBvdyhiIC0geCwgMikgLyAoKGIgLSBhKSAqIChiIC0gYykpO1xuICB9LFxuXG4gIGludjogZnVuY3Rpb24gaW52KHAsIGEsIGIsIGMpIHtcbiAgICBpZiAoYiA8PSBhIHx8IGMgPCBhIHx8IGMgPiBiKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocCA8PSAoKGMgLSBhKSAvIChiIC0gYSkpKSB7XG4gICAgICAgIHJldHVybiBhICsgKGIgLSBhKSAqIE1hdGguc3FydChwICogKChjIC0gYSkgLyAoYiAtIGEpKSk7XG4gICAgICB9IGVsc2UgeyAvLyBwID4gKChjIC0gYSkgLyAoYiAtIGEpKVxuICAgICAgICByZXR1cm4gYSArIChiIC0gYSkgKiAoMSAtIE1hdGguc3FydCgoMSAtIHApICogKDEgLSAoKGMgLSBhKSAvIChiIC0gYSkpKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKGEsIGIsIGMpIHtcbiAgICByZXR1cm4gKGEgKyBiICsgYykgLyAzO1xuICB9LFxuXG4gIG1lZGlhbjogZnVuY3Rpb24gbWVkaWFuKGEsIGIsIGMpIHtcbiAgICBpZiAoYyA8PSAoYSArIGIpIC8gMikge1xuICAgICAgcmV0dXJuIGIgLSBNYXRoLnNxcnQoKGIgLSBhKSAqIChiIC0gYykpIC8gTWF0aC5zcXJ0KDIpO1xuICAgIH0gZWxzZSBpZiAoYyA+IChhICsgYikgLyAyKSB7XG4gICAgICByZXR1cm4gYSArIE1hdGguc3FydCgoYiAtIGEpICogKGMgLSBhKSkgLyBNYXRoLnNxcnQoMik7XG4gICAgfVxuICB9LFxuXG4gIG1vZGU6IGZ1bmN0aW9uIG1vZGUoYSwgYiwgYykge1xuICAgIHJldHVybiBjO1xuICB9LFxuXG4gIHNhbXBsZTogZnVuY3Rpb24gc2FtcGxlKGEsIGIsIGMpIHtcbiAgICB2YXIgdSA9IGpTdGF0Ll9yYW5kb21fZm4oKTtcbiAgICBpZiAodSA8ICgoYyAtIGEpIC8gKGIgLSBhKSkpXG4gICAgICByZXR1cm4gYSArIE1hdGguc3FydCh1ICogKGIgLSBhKSAqIChjIC0gYSkpXG4gICAgcmV0dXJuIGIgLSBNYXRoLnNxcnQoKDEgLSB1KSAqIChiIC0gYSkgKiAoYiAtIGMpKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoYSwgYiwgYykge1xuICAgIHJldHVybiAoYSAqIGEgKyBiICogYiArIGMgKiBjIC0gYSAqIGIgLSBhICogYyAtIGIgKiBjKSAvIDE4O1xuICB9XG59KTtcblxuXG4vLyBleHRlbmQgYXJjc2luZSBmdW5jdGlvbiB3aXRoIHN0YXRpYyBtZXRob2RzXG5qU3RhdC5leHRlbmQoalN0YXQuYXJjc2luZSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBhLCBiKSB7XG4gICAgaWYgKGIgPD0gYSkgcmV0dXJuIE5hTjtcblxuICAgIHJldHVybiAoeCA8PSBhIHx8IHggPj0gYikgPyAwIDpcbiAgICAgICgyIC8gTWF0aC5QSSkgKlxuICAgICAgICBNYXRoLnBvdyhNYXRoLnBvdyhiIC0gYSwgMikgLVxuICAgICAgICAgICAgICAgICAgTWF0aC5wb3coMiAqIHggLSBhIC0gYiwgMiksIC0wLjUpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIGEsIGIpIHtcbiAgICBpZiAoeCA8IGEpXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmICh4IDwgYilcbiAgICAgIHJldHVybiAoMiAvIE1hdGguUEkpICogTWF0aC5hc2luKE1hdGguc3FydCgoeCAtIGEpLyhiIC0gYSkpKTtcbiAgICByZXR1cm4gMTtcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIGEsIGIpIHtcbiAgICByZXR1cm4gYSArICgwLjUgLSAwLjUgKiBNYXRoLmNvcyhNYXRoLlBJICogcCkpICogKGIgLSBhKTtcbiAgfSxcblxuICBtZWFuOiBmdW5jdGlvbiBtZWFuKGEsIGIpIHtcbiAgICBpZiAoYiA8PSBhKSByZXR1cm4gTmFOO1xuICAgIHJldHVybiAoYSArIGIpIC8gMjtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uIG1lZGlhbihhLCBiKSB7XG4gICAgaWYgKGIgPD0gYSkgcmV0dXJuIE5hTjtcbiAgICByZXR1cm4gKGEgKyBiKSAvIDI7XG4gIH0sXG5cbiAgbW9kZTogZnVuY3Rpb24gbW9kZSgvKmEsIGIqLykge1xuICAgIHRocm93IG5ldyBFcnJvcignbW9kZSBpcyBub3QgeWV0IGltcGxlbWVudGVkJyk7XG4gIH0sXG5cbiAgc2FtcGxlOiBmdW5jdGlvbiBzYW1wbGUoYSwgYikge1xuICAgIHJldHVybiAoKGEgKyBiKSAvIDIpICsgKChiIC0gYSkgLyAyKSAqXG4gICAgICBNYXRoLnNpbigyICogTWF0aC5QSSAqIGpTdGF0LnVuaWZvcm0uc2FtcGxlKDAsIDEpKTtcbiAgfSxcblxuICB2YXJpYW5jZTogZnVuY3Rpb24gdmFyaWFuY2UoYSwgYikge1xuICAgIGlmIChiIDw9IGEpIHJldHVybiBOYU47XG4gICAgcmV0dXJuIE1hdGgucG93KGIgLSBhLCAyKSAvIDg7XG4gIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIGxhcGxhY2VTaWduKHgpIHsgcmV0dXJuIHggLyBNYXRoLmFicyh4KTsgfVxuXG5qU3RhdC5leHRlbmQoalN0YXQubGFwbGFjZSwge1xuICBwZGY6IGZ1bmN0aW9uIHBkZih4LCBtdSwgYikge1xuICAgIHJldHVybiAoYiA8PSAwKSA/IDAgOiAoTWF0aC5leHAoLU1hdGguYWJzKHggLSBtdSkgLyBiKSkgLyAoMiAqIGIpO1xuICB9LFxuXG4gIGNkZjogZnVuY3Rpb24gY2RmKHgsIG11LCBiKSB7XG4gICAgaWYgKGIgPD0gMCkgeyByZXR1cm4gMDsgfVxuXG4gICAgaWYoeCA8IG11KSB7XG4gICAgICByZXR1cm4gMC41ICogTWF0aC5leHAoKHggLSBtdSkgLyBiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDEgLSAwLjUgKiBNYXRoLmV4cCgtICh4IC0gbXUpIC8gYik7XG4gICAgfVxuICB9LFxuXG4gIG1lYW46IGZ1bmN0aW9uKG11LyosIGIqLykge1xuICAgIHJldHVybiBtdTtcbiAgfSxcblxuICBtZWRpYW46IGZ1bmN0aW9uKG11LyosIGIqLykge1xuICAgIHJldHVybiBtdTtcbiAgfSxcblxuICBtb2RlOiBmdW5jdGlvbihtdS8qLCBiKi8pIHtcbiAgICByZXR1cm4gbXU7XG4gIH0sXG5cbiAgdmFyaWFuY2U6IGZ1bmN0aW9uKG11LCBiKSB7XG4gICAgcmV0dXJuIDIgKiBiICogYjtcbiAgfSxcblxuICBzYW1wbGU6IGZ1bmN0aW9uIHNhbXBsZShtdSwgYikge1xuICAgIHZhciB1ID0galN0YXQuX3JhbmRvbV9mbigpIC0gMC41O1xuXG4gICAgcmV0dXJuIG11IC0gKGIgKiBsYXBsYWNlU2lnbih1KSAqIE1hdGgubG9nKDEgLSAoMiAqIE1hdGguYWJzKHUpKSkpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gdHVrZXlXcHJvYih3LCByciwgY2MpIHtcbiAgdmFyIG5sZWcgPSAxMjtcbiAgdmFyIGloYWxmID0gNjtcblxuICB2YXIgQzEgPSAtMzA7XG4gIHZhciBDMiA9IC01MDtcbiAgdmFyIEMzID0gNjA7XG4gIHZhciBiYiAgID0gODtcbiAgdmFyIHdsYXIgPSAzO1xuICB2YXIgd2luY3IxID0gMjtcbiAgdmFyIHdpbmNyMiA9IDM7XG4gIHZhciB4bGVnID0gW1xuICAgIDAuOTgxNTYwNjM0MjQ2NzE5MjUwNjkwNTQ5MDkwMTQ5LFxuICAgIDAuOTA0MTE3MjU2MzcwNDc0ODU2Njc4NDY1ODY2MTE5LFxuICAgIDAuNzY5OTAyNjc0MTk0MzA0Njg3MDM2ODkzODMzMjEzLFxuICAgIDAuNTg3MzE3OTU0Mjg2NjE3NDQ3Mjk2NzAyNDE4OTQxLFxuICAgIDAuMzY3ODMxNDk4OTk4MTgwMTkzNzUyNjkxNTM2NjQ0LFxuICAgIDAuMTI1MjMzNDA4NTExNDY4OTE1NDcyNDQxMzY5NDY0XG4gIF07XG4gIHZhciBhbGVnID0gW1xuICAgIDAuMDQ3MTc1MzM2Mzg2NTExODI3MTk0NjE1OTYxNDg1LFxuICAgIDAuMTA2OTM5MzI1OTk1MzE4NDMwOTYwMjU0NzE4MTk0LFxuICAgIDAuMTYwMDc4MzI4NTQzMzQ2MjI2MzM0NjUyNTI5NTQzLFxuICAgIDAuMjAzMTY3NDI2NzIzMDY1OTIxNzQ5MDY0NDU1ODEwLFxuICAgIDAuMjMzNDkyNTM2NTM4MzU0ODA4NzYwODQ5ODk4OTI1LFxuICAgIDAuMjQ5MTQ3MDQ1ODEzNDAyNzg1MDAwNTYyNDM2MDQzXG4gIF07XG5cbiAgdmFyIHFzcXogPSB3ICogMC41O1xuXG4gIC8vIGlmIHcgPj0gMTYgdGhlbiB0aGUgaW50ZWdyYWwgbG93ZXIgYm91bmQgKG9jY3VycyBmb3IgYz0yMClcbiAgLy8gaXMgMC45OTk5OTk5OTk5OTk5NSBzbyByZXR1cm4gYSB2YWx1ZSBvZiAxLlxuXG4gIGlmIChxc3F6ID49IGJiKVxuICAgIHJldHVybiAxLjA7XG5cbiAgLy8gZmluZCAoZih3LzIpIC0gMSkgXiBjY1xuICAvLyAoZmlyc3QgdGVybSBpbiBpbnRlZ3JhbCBvZiBoYXJ0bGV5J3MgZm9ybSkuXG5cbiAgdmFyIHByX3cgPSAyICogalN0YXQubm9ybWFsLmNkZihxc3F6LCAwLCAxLCAxLCAwKSAtIDE7IC8vIGVyZihxc3F6IC8gTV9TUVJUMilcbiAgLy8gaWYgcHJfdyBeIGNjIDwgMmUtMjIgdGhlbiBzZXQgcHJfdyA9IDBcbiAgaWYgKHByX3cgPj0gTWF0aC5leHAoQzIgLyBjYykpXG4gICAgcHJfdyA9IE1hdGgucG93KHByX3csIGNjKTtcbiAgZWxzZVxuICAgIHByX3cgPSAwLjA7XG5cbiAgLy8gaWYgdyBpcyBsYXJnZSB0aGVuIHRoZSBzZWNvbmQgY29tcG9uZW50IG9mIHRoZVxuICAvLyBpbnRlZ3JhbCBpcyBzbWFsbCwgc28gZmV3ZXIgaW50ZXJ2YWxzIGFyZSBuZWVkZWQuXG5cbiAgdmFyIHdpbmNyO1xuICBpZiAodyA+IHdsYXIpXG4gICAgd2luY3IgPSB3aW5jcjE7XG4gIGVsc2VcbiAgICB3aW5jciA9IHdpbmNyMjtcblxuICAvLyBmaW5kIHRoZSBpbnRlZ3JhbCBvZiBzZWNvbmQgdGVybSBvZiBoYXJ0bGV5J3MgZm9ybVxuICAvLyBmb3IgdGhlIGludGVncmFsIG9mIHRoZSByYW5nZSBmb3IgZXF1YWwtbGVuZ3RoXG4gIC8vIGludGVydmFscyB1c2luZyBsZWdlbmRyZSBxdWFkcmF0dXJlLiAgbGltaXRzIG9mXG4gIC8vIGludGVncmF0aW9uIGFyZSBmcm9tICh3LzIsIDgpLiAgdHdvIG9yIHRocmVlXG4gIC8vIGVxdWFsLWxlbmd0aCBpbnRlcnZhbHMgYXJlIHVzZWQuXG5cbiAgLy8gYmxiIGFuZCBidWIgYXJlIGxvd2VyIGFuZCB1cHBlciBsaW1pdHMgb2YgaW50ZWdyYXRpb24uXG5cbiAgdmFyIGJsYiA9IHFzcXo7XG4gIHZhciBiaW5jID0gKGJiIC0gcXNxeikgLyB3aW5jcjtcbiAgdmFyIGJ1YiA9IGJsYiArIGJpbmM7XG4gIHZhciBlaW5zdW0gPSAwLjA7XG5cbiAgLy8gaW50ZWdyYXRlIG92ZXIgZWFjaCBpbnRlcnZhbFxuXG4gIHZhciBjYzEgPSBjYyAtIDEuMDtcbiAgZm9yICh2YXIgd2kgPSAxOyB3aSA8PSB3aW5jcjsgd2krKykge1xuICAgIHZhciBlbHN1bSA9IDAuMDtcbiAgICB2YXIgYSA9IDAuNSAqIChidWIgKyBibGIpO1xuXG4gICAgLy8gbGVnZW5kcmUgcXVhZHJhdHVyZSB3aXRoIG9yZGVyID0gbmxlZ1xuXG4gICAgdmFyIGIgPSAwLjUgKiAoYnViIC0gYmxiKTtcblxuICAgIGZvciAodmFyIGpqID0gMTsgamogPD0gbmxlZzsgamorKykge1xuICAgICAgdmFyIGosIHh4O1xuICAgICAgaWYgKGloYWxmIDwgamopIHtcbiAgICAgICAgaiA9IChubGVnIC0gamopICsgMTtcbiAgICAgICAgeHggPSB4bGVnW2otMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqID0gamo7XG4gICAgICAgIHh4ID0gLXhsZWdbai0xXTtcbiAgICAgIH1cbiAgICAgIHZhciBjID0gYiAqIHh4O1xuICAgICAgdmFyIGFjID0gYSArIGM7XG5cbiAgICAgIC8vIGlmIGV4cCgtcWV4cG8vMikgPCA5ZS0xNCxcbiAgICAgIC8vIHRoZW4gZG9lc24ndCBjb250cmlidXRlIHRvIGludGVncmFsXG5cbiAgICAgIHZhciBxZXhwbyA9IGFjICogYWM7XG4gICAgICBpZiAocWV4cG8gPiBDMylcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIHZhciBwcGx1cyA9IDIgKiBqU3RhdC5ub3JtYWwuY2RmKGFjLCAwLCAxLCAxLCAwKTtcbiAgICAgIHZhciBwbWludXM9IDIgKiBqU3RhdC5ub3JtYWwuY2RmKGFjLCB3LCAxLCAxLCAwKTtcblxuICAgICAgLy8gaWYgcmluc3VtIF4gKGNjLTEpIDwgOWUtMTQsXG4gICAgICAvLyB0aGVuIGRvZXNuJ3QgY29udHJpYnV0ZSB0byBpbnRlZ3JhbFxuXG4gICAgICB2YXIgcmluc3VtID0gKHBwbHVzICogMC41KSAtIChwbWludXMgKiAwLjUpO1xuICAgICAgaWYgKHJpbnN1bSA+PSBNYXRoLmV4cChDMSAvIGNjMSkpIHtcbiAgICAgICAgcmluc3VtID0gKGFsZWdbai0xXSAqIE1hdGguZXhwKC0oMC41ICogcWV4cG8pKSkgKiBNYXRoLnBvdyhyaW5zdW0sIGNjMSk7XG4gICAgICAgIGVsc3VtICs9IHJpbnN1bTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzdW0gKj0gKCgoMi4wICogYikgKiBjYykgLyBNYXRoLnNxcnQoMiAqIE1hdGguUEkpKTtcbiAgICBlaW5zdW0gKz0gZWxzdW07XG4gICAgYmxiID0gYnViO1xuICAgIGJ1YiArPSBiaW5jO1xuICB9XG5cbiAgLy8gaWYgcHJfdyBeIHJyIDwgOWUtMTQsIHRoZW4gcmV0dXJuIDBcbiAgcHJfdyArPSBlaW5zdW07XG4gIGlmIChwcl93IDw9IE1hdGguZXhwKEMxIC8gcnIpKVxuICAgIHJldHVybiAwO1xuXG4gIHByX3cgPSBNYXRoLnBvdyhwcl93LCBycik7XG4gIGlmIChwcl93ID49IDEpIC8vIDEgd2FzIGlNYXggd2FzIGVwc1xuICAgIHJldHVybiAxO1xuICByZXR1cm4gcHJfdztcbn1cblxuZnVuY3Rpb24gdHVrZXlRaW52KHAsIGMsIHYpIHtcbiAgdmFyIHAwID0gMC4zMjIyMzI0MjEwODg7XG4gIHZhciBxMCA9IDAuOTkzNDg0NjI2MDYwZS0wMTtcbiAgdmFyIHAxID0gLTEuMDtcbiAgdmFyIHExID0gMC41ODg1ODE1NzA0OTU7XG4gIHZhciBwMiA9IC0wLjM0MjI0MjA4ODU0NztcbiAgdmFyIHEyID0gMC41MzExMDM0NjIzNjY7XG4gIHZhciBwMyA9IC0wLjIwNDIzMTIxMDEyNTtcbiAgdmFyIHEzID0gMC4xMDM1Mzc3NTI4NTA7XG4gIHZhciBwNCA9IC0wLjQ1MzY0MjIxMDE0OGUtMDQ7XG4gIHZhciBxNCA9IDAuMzg1NjA3MDA2MzRlLTAyO1xuICB2YXIgYzEgPSAwLjg4MzI7XG4gIHZhciBjMiA9IDAuMjM2ODtcbiAgdmFyIGMzID0gMS4yMTQ7XG4gIHZhciBjNCA9IDEuMjA4O1xuICB2YXIgYzUgPSAxLjQxNDI7XG4gIHZhciB2bWF4ID0gMTIwLjA7XG5cbiAgdmFyIHBzID0gMC41IC0gMC41ICogcDtcbiAgdmFyIHlpID0gTWF0aC5zcXJ0KE1hdGgubG9nKDEuMCAvIChwcyAqIHBzKSkpO1xuICB2YXIgdCA9IHlpICsgKCgoKCB5aSAqIHA0ICsgcDMpICogeWkgKyBwMikgKiB5aSArIHAxKSAqIHlpICsgcDApXG4gICAgIC8gKCgoKCB5aSAqIHE0ICsgcTMpICogeWkgKyBxMikgKiB5aSArIHExKSAqIHlpICsgcTApO1xuICBpZiAodiA8IHZtYXgpIHQgKz0gKHQgKiB0ICogdCArIHQpIC8gdiAvIDQuMDtcbiAgdmFyIHEgPSBjMSAtIGMyICogdDtcbiAgaWYgKHYgPCB2bWF4KSBxICs9IC1jMyAvIHYgKyBjNCAqIHQgLyB2O1xuICByZXR1cm4gdCAqIChxICogTWF0aC5sb2coYyAtIDEuMCkgKyBjNSk7XG59XG5cbmpTdGF0LmV4dGVuZChqU3RhdC50dWtleSwge1xuICBjZGY6IGZ1bmN0aW9uIGNkZihxLCBubWVhbnMsIGRmKSB7XG4gICAgLy8gSWRlbnRpY2FsIGltcGxlbWVudGF0aW9uIGFzIHRoZSBSIHB0dWtleSgpIGZ1bmN0aW9uIGFzIG9mIGNvbW1pdCA2ODk0N1xuICAgIHZhciByciA9IDE7XG4gICAgdmFyIGNjID0gbm1lYW5zO1xuXG4gICAgdmFyIG5sZWdxID0gMTY7XG4gICAgdmFyIGloYWxmcSA9IDg7XG5cbiAgICB2YXIgZXBzMSA9IC0zMC4wO1xuICAgIHZhciBlcHMyID0gMS4wZS0xNDtcbiAgICB2YXIgZGhhZiAgPSAxMDAuMDtcbiAgICB2YXIgZHF1YXIgPSA4MDAuMDtcbiAgICB2YXIgZGVpZ2ggPSA1MDAwLjA7XG4gICAgdmFyIGRsYXJnID0gMjUwMDAuMDtcbiAgICB2YXIgdWxlbjEgPSAxLjA7XG4gICAgdmFyIHVsZW4yID0gMC41O1xuICAgIHZhciB1bGVuMyA9IDAuMjU7XG4gICAgdmFyIHVsZW40ID0gMC4xMjU7XG4gICAgdmFyIHhsZWdxID0gW1xuICAgICAgMC45ODk0MDA5MzQ5OTE2NDk5MzI1OTYxNTQxNzM0NTAsXG4gICAgICAwLjk0NDU3NTAyMzA3MzIzMjU3NjA3Nzk4ODQxNTUzNSxcbiAgICAgIDAuODY1NjMxMjAyMzg3ODMxNzQzODgwNDY3ODk3NzEyLFxuICAgICAgMC43NTU0MDQ0MDgzNTUwMDMwMzM4OTUxMDExOTQ4NDcsXG4gICAgICAwLjYxNzg3NjI0NDQwMjY0Mzc0ODQ0NjY3MTc2NDA0OSxcbiAgICAgIDAuNDU4MDE2Nzc3NjU3MjI3Mzg2MzQyNDE5NDQyOTg0LFxuICAgICAgMC4yODE2MDM1NTA3NzkyNTg5MTMyMzA0NjA1MDE0NjAsXG4gICAgICAwLjk1MDEyNTA5ODM3NjM3NDQwMTg1MzE5MzM1NDI1MGUtMVxuICAgIF07XG4gICAgdmFyIGFsZWdxID0gW1xuICAgICAgMC4yNzE1MjQ1OTQxMTc1NDA5NDg1MTc4MDU3MjQ1NjBlLTEsXG4gICAgICAwLjYyMjUzNTIzOTM4NjQ3ODkyODYyODQzODM2OTk0NGUtMSxcbiAgICAgIDAuOTUxNTg1MTE2ODI0OTI3ODQ4MDk5MjUxMDc2MDIyZS0xLFxuICAgICAgMC4xMjQ2Mjg5NzEyNTU1MzM4NzIwNTI0NzYyODIxOTIsXG4gICAgICAwLjE0OTU5NTk4ODgxNjU3NjczMjA4MTUwMTczMDU0NyxcbiAgICAgIDAuMTY5MTU2NTE5Mzk1MDAyNTM4MTg5MzEyMDc5MDMwLFxuICAgICAgMC4xODI2MDM0MTUwNDQ5MjM1ODg4NjY3NjM2Njc5NjksXG4gICAgICAwLjE4OTQ1MDYxMDQ1NTA2ODQ5NjI4NTM5NjcyMzIwOFxuICAgIF07XG5cbiAgICBpZiAocSA8PSAwKVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICAvLyBkZiBtdXN0IGJlID4gMVxuICAgIC8vIHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgdHdvIHZhbHVlc1xuXG4gICAgaWYgKGRmIDwgMiB8fCByciA8IDEgfHwgY2MgPCAyKSByZXR1cm4gTmFOO1xuXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocSkpXG4gICAgICByZXR1cm4gMTtcblxuICAgIGlmIChkZiA+IGRsYXJnKVxuICAgICAgcmV0dXJuIHR1a2V5V3Byb2IocSwgcnIsIGNjKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBsZWFkaW5nIGNvbnN0YW50XG5cbiAgICB2YXIgZjIgPSBkZiAqIDAuNTtcbiAgICB2YXIgZjJsZiA9ICgoZjIgKiBNYXRoLmxvZyhkZikpIC0gKGRmICogTWF0aC5sb2coMikpKSAtIGpTdGF0LmdhbW1hbG4oZjIpO1xuICAgIHZhciBmMjEgPSBmMiAtIDEuMDtcblxuICAgIC8vIGludGVncmFsIGlzIGRpdmlkZWQgaW50byB1bml0LCBoYWxmLXVuaXQsIHF1YXJ0ZXItdW5pdCwgb3JcbiAgICAvLyBlaWdodGgtdW5pdCBsZW5ndGggaW50ZXJ2YWxzIGRlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgdGhlXG4gICAgLy8gZGVncmVlcyBvZiBmcmVlZG9tLlxuXG4gICAgdmFyIGZmNCA9IGRmICogMC4yNTtcbiAgICB2YXIgdWxlbjtcbiAgICBpZiAgICAgIChkZiA8PSBkaGFmKSAgdWxlbiA9IHVsZW4xO1xuICAgIGVsc2UgaWYgKGRmIDw9IGRxdWFyKSB1bGVuID0gdWxlbjI7XG4gICAgZWxzZSBpZiAoZGYgPD0gZGVpZ2gpIHVsZW4gPSB1bGVuMztcbiAgICBlbHNlICAgICAgICAgICAgICAgICAgdWxlbiA9IHVsZW40O1xuXG4gICAgZjJsZiArPSBNYXRoLmxvZyh1bGVuKTtcblxuICAgIC8vIGludGVncmF0ZSBvdmVyIGVhY2ggc3ViaW50ZXJ2YWxcblxuICAgIHZhciBhbnMgPSAwLjA7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA1MDsgaSsrKSB7XG4gICAgICB2YXIgb3RzdW0gPSAwLjA7XG5cbiAgICAgIC8vIGxlZ2VuZHJlIHF1YWRyYXR1cmUgd2l0aCBvcmRlciA9IG5sZWdxXG4gICAgICAvLyBub2RlcyAoc3RvcmVkIGluIHhsZWdxKSBhcmUgc3ltbWV0cmljIGFyb3VuZCB6ZXJvLlxuXG4gICAgICB2YXIgdHdhMSA9ICgyICogaSAtIDEpICogdWxlbjtcblxuICAgICAgZm9yICh2YXIgamogPSAxOyBqaiA8PSBubGVncTsgamorKykge1xuICAgICAgICB2YXIgaiwgdDE7XG4gICAgICAgIGlmIChpaGFsZnEgPCBqaikge1xuICAgICAgICAgIGogPSBqaiAtIGloYWxmcSAtIDE7XG4gICAgICAgICAgdDEgPSAoZjJsZiArIChmMjEgKiBNYXRoLmxvZyh0d2ExICsgKHhsZWdxW2pdICogdWxlbikpKSlcbiAgICAgICAgICAgICAgLSAoKCh4bGVncVtqXSAqIHVsZW4pICsgdHdhMSkgKiBmZjQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGogPSBqaiAtIDE7XG4gICAgICAgICAgdDEgPSAoZjJsZiArIChmMjEgKiBNYXRoLmxvZyh0d2ExIC0gKHhsZWdxW2pdICogdWxlbikpKSlcbiAgICAgICAgICAgICAgKyAoKCh4bGVncVtqXSAqIHVsZW4pIC0gdHdhMSkgKiBmZjQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgZXhwKHQxKSA8IDllLTE0LCB0aGVuIGRvZXNuJ3QgY29udHJpYnV0ZSB0byBpbnRlZ3JhbFxuICAgICAgICB2YXIgcXNxejtcbiAgICAgICAgaWYgKHQxID49IGVwczEpIHtcbiAgICAgICAgICBpZiAoaWhhbGZxIDwgamopIHtcbiAgICAgICAgICAgIHFzcXogPSBxICogTWF0aC5zcXJ0KCgoeGxlZ3Fbal0gKiB1bGVuKSArIHR3YTEpICogMC41KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXNxeiA9IHEgKiBNYXRoLnNxcnQoKCgtKHhsZWdxW2pdICogdWxlbikpICsgdHdhMSkgKiAwLjUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNhbGwgd3Byb2IgdG8gZmluZCBpbnRlZ3JhbCBvZiByYW5nZSBwb3J0aW9uXG5cbiAgICAgICAgICB2YXIgd3ByYiA9IHR1a2V5V3Byb2IocXNxeiwgcnIsIGNjKTtcbiAgICAgICAgICB2YXIgcm90c3VtID0gKHdwcmIgKiBhbGVncVtqXSkgKiBNYXRoLmV4cCh0MSk7XG4gICAgICAgICAgb3RzdW0gKz0gcm90c3VtO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVuZCBsZWdlbmRyZSBpbnRlZ3JhbCBmb3IgaW50ZXJ2YWwgaVxuICAgICAgICAvLyBMMjAwOlxuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbnRlZ3JhbCBmb3IgaW50ZXJ2YWwgaSA8IDFlLTE0LCB0aGVuIHN0b3AuXG4gICAgICAvLyBIb3dldmVyLCBpbiBvcmRlciB0byBhdm9pZCBzbWFsbCBhcmVhIHVuZGVyIGxlZnQgdGFpbCxcbiAgICAgIC8vIGF0IGxlYXN0ICAxIC8gdWxlbiAgaW50ZXJ2YWxzIGFyZSBjYWxjdWxhdGVkLlxuICAgICAgaWYgKGkgKiB1bGVuID49IDEuMCAmJiBvdHN1bSA8PSBlcHMyKVxuICAgICAgICBicmVhaztcblxuICAgICAgLy8gZW5kIG9mIGludGVydmFsIGlcbiAgICAgIC8vIEwzMzA6XG5cbiAgICAgIGFucyArPSBvdHN1bTtcbiAgICB9XG5cbiAgICBpZiAob3RzdW0gPiBlcHMyKSB7IC8vIG5vdCBjb252ZXJnZWRcbiAgICAgIHRocm93IG5ldyBFcnJvcigndHVrZXkuY2RmIGZhaWxlZCB0byBjb252ZXJnZScpO1xuICAgIH1cbiAgICBpZiAoYW5zID4gMSlcbiAgICAgIGFucyA9IDE7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICBpbnY6IGZ1bmN0aW9uKHAsIG5tZWFucywgZGYpIHtcbiAgICAvLyBJZGVudGljYWwgaW1wbGVtZW50YXRpb24gYXMgdGhlIFIgcXR1a2V5KCkgZnVuY3Rpb24gYXMgb2YgY29tbWl0IDY4OTQ3XG4gICAgdmFyIHJyID0gMTtcbiAgICB2YXIgY2MgPSBubWVhbnM7XG5cbiAgICB2YXIgZXBzID0gMC4wMDAxO1xuICAgIHZhciBtYXhpdGVyID0gNTA7XG5cbiAgICAvLyBkZiBtdXN0IGJlID4gMSA7IHRoZXJlIG11c3QgYmUgYXQgbGVhc3QgdHdvIHZhbHVlc1xuICAgIGlmIChkZiA8IDIgfHwgcnIgPCAxIHx8IGNjIDwgMikgcmV0dXJuIE5hTjtcblxuICAgIGlmIChwIDwgMCB8fCBwID4gMSkgcmV0dXJuIE5hTjtcbiAgICBpZiAocCA9PT0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKHAgPT09IDEpIHJldHVybiBJbmZpbml0eTtcblxuICAgIC8vIEluaXRpYWwgdmFsdWVcblxuICAgIHZhciB4MCA9IHR1a2V5UWludihwLCBjYywgZGYpO1xuXG4gICAgLy8gRmluZCBwcm9iKHZhbHVlIDwgeDApXG5cbiAgICB2YXIgdmFseDAgPSBqU3RhdC50dWtleS5jZGYoeDAsIG5tZWFucywgZGYpIC0gcDtcblxuICAgIC8vIEZpbmQgdGhlIHNlY29uZCBpdGVyYXRlIGFuZCBwcm9iKHZhbHVlIDwgeDEpLlxuICAgIC8vIElmIHRoZSBmaXJzdCBpdGVyYXRlIGhhcyBwcm9iYWJpbGl0eSB2YWx1ZVxuICAgIC8vIGV4Y2VlZGluZyBwIHRoZW4gc2Vjb25kIGl0ZXJhdGUgaXMgMSBsZXNzIHRoYW5cbiAgICAvLyBmaXJzdCBpdGVyYXRlOyBvdGhlcndpc2UgaXQgaXMgMSBncmVhdGVyLlxuXG4gICAgdmFyIHgxO1xuICAgIGlmICh2YWx4MCA+IDAuMClcbiAgICAgIHgxID0gTWF0aC5tYXgoMC4wLCB4MCAtIDEuMCk7XG4gICAgZWxzZVxuICAgICAgeDEgPSB4MCArIDEuMDtcbiAgICB2YXIgdmFseDEgPSBqU3RhdC50dWtleS5jZGYoeDEsIG5tZWFucywgZGYpIC0gcDtcblxuICAgIC8vIEZpbmQgbmV3IGl0ZXJhdGVcblxuICAgIHZhciBhbnM7XG4gICAgZm9yKHZhciBpdGVyID0gMTsgaXRlciA8IG1heGl0ZXI7IGl0ZXIrKykge1xuICAgICAgYW5zID0geDEgLSAoKHZhbHgxICogKHgxIC0geDApKSAvICh2YWx4MSAtIHZhbHgwKSk7XG4gICAgICB2YWx4MCA9IHZhbHgxO1xuXG4gICAgICAvLyBOZXcgaXRlcmF0ZSBtdXN0IGJlID49IDBcblxuICAgICAgeDAgPSB4MTtcbiAgICAgIGlmIChhbnMgPCAwLjApIHtcbiAgICAgICAgYW5zID0gMC4wO1xuICAgICAgICB2YWx4MSA9IC1wO1xuICAgICAgfVxuICAgICAgLy8gRmluZCBwcm9iKHZhbHVlIDwgbmV3IGl0ZXJhdGUpXG5cbiAgICAgIHZhbHgxID0galN0YXQudHVrZXkuY2RmKGFucywgbm1lYW5zLCBkZikgLSBwO1xuICAgICAgeDEgPSBhbnM7XG5cbiAgICAgIC8vIElmIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIHN1Y2Nlc3NpdmVcbiAgICAgIC8vIGl0ZXJhdGVzIGlzIGxlc3MgdGhhbiBlcHMsIHN0b3BcblxuICAgICAgdmFyIHhhYnMgPSBNYXRoLmFicyh4MSAtIHgwKTtcbiAgICAgIGlmICh4YWJzIDwgZXBzKVxuICAgICAgICByZXR1cm4gYW5zO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcigndHVrZXkuaW52IGZhaWxlZCB0byBjb252ZXJnZScpO1xuICB9XG59KTtcblxufShqU3RhdCwgTWF0aCkpO1xuLyogUHJvdmlkZXMgZnVuY3Rpb25zIGZvciB0aGUgc29sdXRpb24gb2YgbGluZWFyIHN5c3RlbSBvZiBlcXVhdGlvbnMsIGludGVncmF0aW9uLCBleHRyYXBvbGF0aW9uLFxuICogaW50ZXJwb2xhdGlvbiwgZWlnZW52YWx1ZSBwcm9ibGVtcywgZGlmZmVyZW50aWFsIGVxdWF0aW9ucyBhbmQgUENBIGFuYWx5c2lzLiAqL1xuXG4oZnVuY3Rpb24oalN0YXQsIE1hdGgpIHtcblxudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBpc0FycmF5ID0galN0YXQudXRpbHMuaXNBcnJheTtcblxuZnVuY3Rpb24gaXNVc2FibGUoYXJnKSB7XG4gIHJldHVybiBpc0FycmF5KGFyZykgfHwgYXJnIGluc3RhbmNlb2YgalN0YXQ7XG59XG5cbmpTdGF0LmV4dGVuZCh7XG5cbiAgLy8gYWRkIGEgdmVjdG9yL21hdHJpeCB0byBhIHZlY3Rvci9tYXRyaXggb3Igc2NhbGFyXG4gIGFkZDogZnVuY3Rpb24gYWRkKGFyciwgYXJnKSB7XG4gICAgLy8gY2hlY2sgaWYgYXJnIGlzIGEgdmVjdG9yIG9yIHNjYWxhclxuICAgIGlmIChpc1VzYWJsZShhcmcpKSB7XG4gICAgICBpZiAoIWlzVXNhYmxlKGFyZ1swXSkpIGFyZyA9IFsgYXJnIF07XG4gICAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUsIHJvdywgY29sKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSArIGFyZ1tyb3ddW2NvbF07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZSArIGFyZzsgfSk7XG4gIH0sXG5cbiAgLy8gc3VidHJhY3QgYSB2ZWN0b3Igb3Igc2NhbGFyIGZyb20gdGhlIHZlY3RvclxuICBzdWJ0cmFjdDogZnVuY3Rpb24gc3VidHJhY3QoYXJyLCBhcmcpIHtcbiAgICAvLyBjaGVjayBpZiBhcmcgaXMgYSB2ZWN0b3Igb3Igc2NhbGFyXG4gICAgaWYgKGlzVXNhYmxlKGFyZykpIHtcbiAgICAgIGlmICghaXNVc2FibGUoYXJnWzBdKSkgYXJnID0gWyBhcmcgXTtcbiAgICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSwgcm93LCBjb2wpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIC0gYXJnW3Jvd11bY29sXSB8fCAwO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWUgLSBhcmc7IH0pO1xuICB9LFxuXG4gIC8vIG1hdHJpeCBkaXZpc2lvblxuICBkaXZpZGU6IGZ1bmN0aW9uIGRpdmlkZShhcnIsIGFyZykge1xuICAgIGlmIChpc1VzYWJsZShhcmcpKSB7XG4gICAgICBpZiAoIWlzVXNhYmxlKGFyZ1swXSkpIGFyZyA9IFsgYXJnIF07XG4gICAgICByZXR1cm4galN0YXQubXVsdGlwbHkoYXJyLCBqU3RhdC5pbnYoYXJnKSk7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5tYXAoYXJyLCBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWUgLyBhcmc7IH0pO1xuICB9LFxuXG4gIC8vIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICBtdWx0aXBseTogZnVuY3Rpb24gbXVsdGlwbHkoYXJyLCBhcmcpIHtcbiAgICB2YXIgcm93LCBjb2wsIG5yZXNjb2xzLCBzdW0sIG5yb3csIG5jb2wsIHJlcywgcmVzY29scztcbiAgICAvLyBlZzogYXJyID0gMiBhcmcgPSAzIC0+IDYgZm9yIHJlc1swXVswXSBzdGF0ZW1lbnQgY2xvc3VyZVxuICAgIGlmIChhcnIubGVuZ3RoID09PSB1bmRlZmluZWQgJiYgYXJnLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXJyICogYXJnO1xuICAgIH1cbiAgICBucm93ID0gYXJyLmxlbmd0aCxcbiAgICBuY29sID0gYXJyWzBdLmxlbmd0aCxcbiAgICByZXMgPSBqU3RhdC56ZXJvcyhucm93LCBucmVzY29scyA9IChpc1VzYWJsZShhcmcpKSA/IGFyZ1swXS5sZW5ndGggOiBuY29sKSxcbiAgICByZXNjb2xzID0gMDtcbiAgICBpZiAoaXNVc2FibGUoYXJnKSkge1xuICAgICAgZm9yICg7IHJlc2NvbHMgPCBucmVzY29sczsgcmVzY29scysrKSB7XG4gICAgICAgIGZvciAocm93ID0gMDsgcm93IDwgbnJvdzsgcm93KyspIHtcbiAgICAgICAgICBzdW0gPSAwO1xuICAgICAgICAgIGZvciAoY29sID0gMDsgY29sIDwgbmNvbDsgY29sKyspXG4gICAgICAgICAgc3VtICs9IGFycltyb3ddW2NvbF0gKiBhcmdbY29sXVtyZXNjb2xzXTtcbiAgICAgICAgICByZXNbcm93XVtyZXNjb2xzXSA9IHN1bTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIChucm93ID09PSAxICYmIHJlc2NvbHMgPT09IDEpID8gcmVzWzBdWzBdIDogcmVzO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlICogYXJnOyB9KTtcbiAgfSxcblxuICAvLyBvdXRlcihbMSwyLDNdLFs0LDUsNl0pXG4gIC8vID09PVxuICAvLyBbWzFdLFsyXSxbM11dIHRpbWVzIFtbNCw1LDZdXVxuICAvLyAtPlxuICAvLyBbWzQsNSw2XSxbOCwxMCwxMl0sWzEyLDE1LDE4XV1cbiAgb3V0ZXI6ZnVuY3Rpb24gb3V0ZXIoQSwgQikge1xuICAgIHJldHVybiBqU3RhdC5tdWx0aXBseShBLm1hcChmdW5jdGlvbih0KXsgcmV0dXJuIFt0XSB9KSwgW0JdKTtcbiAgfSxcblxuXG4gIC8vIFJldHVybnMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBtYXRyaWNpZXNcbiAgZG90OiBmdW5jdGlvbiBkb3QoYXJyLCBhcmcpIHtcbiAgICBpZiAoIWlzVXNhYmxlKGFyclswXSkpIGFyciA9IFsgYXJyIF07XG4gICAgaWYgKCFpc1VzYWJsZShhcmdbMF0pKSBhcmcgPSBbIGFyZyBdO1xuICAgIC8vIGNvbnZlcnQgY29sdW1uIHRvIHJvdyB2ZWN0b3JcbiAgICB2YXIgbGVmdCA9IChhcnJbMF0ubGVuZ3RoID09PSAxICYmIGFyci5sZW5ndGggIT09IDEpID8galN0YXQudHJhbnNwb3NlKGFycikgOiBhcnIsXG4gICAgcmlnaHQgPSAoYXJnWzBdLmxlbmd0aCA9PT0gMSAmJiBhcmcubGVuZ3RoICE9PSAxKSA/IGpTdGF0LnRyYW5zcG9zZShhcmcpIDogYXJnLFxuICAgIHJlcyA9IFtdLFxuICAgIHJvdyA9IDAsXG4gICAgbnJvdyA9IGxlZnQubGVuZ3RoLFxuICAgIG5jb2wgPSBsZWZ0WzBdLmxlbmd0aCxcbiAgICBzdW0sIGNvbDtcbiAgICBmb3IgKDsgcm93IDwgbnJvdzsgcm93KyspIHtcbiAgICAgIHJlc1tyb3ddID0gW107XG4gICAgICBzdW0gPSAwO1xuICAgICAgZm9yIChjb2wgPSAwOyBjb2wgPCBuY29sOyBjb2wrKylcbiAgICAgIHN1bSArPSBsZWZ0W3Jvd11bY29sXSAqIHJpZ2h0W3Jvd11bY29sXTtcbiAgICAgIHJlc1tyb3ddID0gc3VtO1xuICAgIH1cbiAgICByZXR1cm4gKHJlcy5sZW5ndGggPT09IDEpID8gcmVzWzBdIDogcmVzO1xuICB9LFxuXG4gIC8vIHJhaXNlIGV2ZXJ5IGVsZW1lbnQgYnkgYSBzY2FsYXJcbiAgcG93OiBmdW5jdGlvbiBwb3coYXJyLCBhcmcpIHtcbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIE1hdGgucG93KHZhbHVlLCBhcmcpOyB9KTtcbiAgfSxcblxuICAvLyBleHBvbmVudGlhdGUgZXZlcnkgZWxlbWVudFxuICBleHA6IGZ1bmN0aW9uIGV4cChhcnIpIHtcbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIE1hdGguZXhwKHZhbHVlKTsgfSk7XG4gIH0sXG5cbiAgLy8gZ2VuZXJhdGUgdGhlIG5hdHVyYWwgbG9nIG9mIGV2ZXJ5IGVsZW1lbnRcbiAgbG9nOiBmdW5jdGlvbiBleHAoYXJyKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm1hcChhcnIsIGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBNYXRoLmxvZyh2YWx1ZSk7IH0pO1xuICB9LFxuXG4gIC8vIGdlbmVyYXRlIHRoZSBhYnNvbHV0ZSB2YWx1ZXMgb2YgdGhlIHZlY3RvclxuICBhYnM6IGZ1bmN0aW9uIGFicyhhcnIpIHtcbiAgICByZXR1cm4galN0YXQubWFwKGFyciwgZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIE1hdGguYWJzKHZhbHVlKTsgfSk7XG4gIH0sXG5cbiAgLy8gY29tcHV0ZXMgdGhlIHAtbm9ybSBvZiB0aGUgdmVjdG9yXG4gIC8vIEluIHRoZSBjYXNlIHRoYXQgYSBtYXRyaXggaXMgcGFzc2VkLCB1c2VzIHRoZSBmaXJzdCByb3cgYXMgdGhlIHZlY3RvclxuICBub3JtOiBmdW5jdGlvbiBub3JtKGFyciwgcCkge1xuICAgIHZhciBubm9ybSA9IDAsXG4gICAgaSA9IDA7XG4gICAgLy8gY2hlY2sgdGhlIHAtdmFsdWUgb2YgdGhlIG5vcm0sIGFuZCBzZXQgZm9yIG1vc3QgY29tbW9uIGNhc2VcbiAgICBpZiAoaXNOYU4ocCkpIHAgPSAyO1xuICAgIC8vIGNoZWNrIGlmIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5LCBhbmQgbWFrZSB2ZWN0b3IgY29ycmVjdGlvblxuICAgIGlmIChpc1VzYWJsZShhcnJbMF0pKSBhcnIgPSBhcnJbMF07XG4gICAgLy8gdmVjdG9yIG5vcm1cbiAgICBmb3IgKDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgbm5vcm0gKz0gTWF0aC5wb3coTWF0aC5hYnMoYXJyW2ldKSwgcCk7XG4gICAgfVxuICAgIHJldHVybiBNYXRoLnBvdyhubm9ybSwgMSAvIHApO1xuICB9LFxuXG4gIC8vIGNvbXB1dGVzIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byB2ZWN0b3JzIGluIHJhZHNcbiAgLy8gSW4gY2FzZSBhIG1hdHJpeCBpcyBwYXNzZWQsIHRoaXMgdXNlcyB0aGUgZmlyc3Qgcm93IGFzIHRoZSB2ZWN0b3JcbiAgYW5nbGU6IGZ1bmN0aW9uIGFuZ2xlKGFyciwgYXJnKSB7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhqU3RhdC5kb3QoYXJyLCBhcmcpIC8gKGpTdGF0Lm5vcm0oYXJyKSAqIGpTdGF0Lm5vcm0oYXJnKSkpO1xuICB9LFxuXG4gIC8vIGF1Z21lbnQgb25lIG1hdHJpeCBieSBhbm90aGVyXG4gIC8vIE5vdGU6IHRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIG1hdHJpeCwgbm90IGEgalN0YXQgb2JqZWN0XG4gIGF1ZzogZnVuY3Rpb24gYXVnKGEsIGIpIHtcbiAgICB2YXIgbmV3YXJyID0gW107XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld2Fyci5wdXNoKGFbaV0uc2xpY2UoKSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBuZXdhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHB1c2guYXBwbHkobmV3YXJyW2ldLCBiW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld2FycjtcbiAgfSxcblxuICAvLyBUaGUgaW52KCkgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBvZiBhIG1hdHJpeFxuICAvLyBDcmVhdGUgdGhlIGludmVyc2UgYnkgYXVnbWVudGluZyB0aGUgbWF0cml4IGJ5IHRoZSBpZGVudGl0eSBtYXRyaXggb2YgdGhlXG4gIC8vIGFwcHJvcHJpYXRlIHNpemUsIGFuZCB0aGVuIHVzZSBHLUogZWxpbWluYXRpb24gb24gdGhlIGF1Z21lbnRlZCBtYXRyaXguXG4gIGludjogZnVuY3Rpb24gaW52KGEpIHtcbiAgICB2YXIgcm93cyA9IGEubGVuZ3RoO1xuICAgIHZhciBjb2xzID0gYVswXS5sZW5ndGg7XG4gICAgdmFyIGIgPSBqU3RhdC5pZGVudGl0eShyb3dzLCBjb2xzKTtcbiAgICB2YXIgYyA9IGpTdGF0LmdhdXNzX2pvcmRhbihhLCBiKTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBqO1xuXG4gICAgLy9XZSBuZWVkIHRvIGNvcHkgdGhlIGludmVyc2UgcG9ydGlvbiB0byBhIG5ldyBtYXRyaXggdG8gcmlkIEctSiBhcnRpZmFjdHNcbiAgICBmb3IgKDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICBmb3IgKGogPSBjb2xzOyBqIDwgY1swXS5sZW5ndGg7IGorKylcbiAgICAgICAgcmVzdWx0W2ldW2ogLSBjb2xzXSA9IGNbaV1bal07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgLy8gY2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeFxuICBkZXQ6IGZ1bmN0aW9uIGRldChhKSB7XG4gICAgdmFyIGFsZW4gPSBhLmxlbmd0aCxcbiAgICBhbGVuZCA9IGFsZW4gKiAyLFxuICAgIHZhbHMgPSBuZXcgQXJyYXkoYWxlbmQpLFxuICAgIHJvd3NoaWZ0ID0gYWxlbiAtIDEsXG4gICAgY29sc2hpZnQgPSBhbGVuZCAtIDEsXG4gICAgbXJvdyA9IHJvd3NoaWZ0IC0gYWxlbiArIDEsXG4gICAgbWNvbCA9IGNvbHNoaWZ0LFxuICAgIGkgPSAwLFxuICAgIHJlc3VsdCA9IDAsXG4gICAgajtcbiAgICAvLyBjaGVjayBmb3Igc3BlY2lhbCAyeDIgY2FzZVxuICAgIGlmIChhbGVuID09PSAyKSB7XG4gICAgICByZXR1cm4gYVswXVswXSAqIGFbMV1bMV0gLSBhWzBdWzFdICogYVsxXVswXTtcbiAgICB9XG4gICAgZm9yICg7IGkgPCBhbGVuZDsgaSsrKSB7XG4gICAgICB2YWxzW2ldID0gMTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFsZW47IGkrKykge1xuICAgICAgZm9yIChqID0gMDsgaiA8IGFsZW47IGorKykge1xuICAgICAgICB2YWxzWyhtcm93IDwgMCkgPyBtcm93ICsgYWxlbiA6IG1yb3cgXSAqPSBhW2ldW2pdO1xuICAgICAgICB2YWxzWyhtY29sIDwgYWxlbikgPyBtY29sICsgYWxlbiA6IG1jb2wgXSAqPSBhW2ldW2pdO1xuICAgICAgICBtcm93Kys7XG4gICAgICAgIG1jb2wtLTtcbiAgICAgIH1cbiAgICAgIG1yb3cgPSAtLXJvd3NoaWZ0IC0gYWxlbiArIDE7XG4gICAgICBtY29sID0gLS1jb2xzaGlmdDtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFsZW47IGkrKykge1xuICAgICAgcmVzdWx0ICs9IHZhbHNbaV07XG4gICAgfVxuICAgIGZvciAoOyBpIDwgYWxlbmQ7IGkrKykge1xuICAgICAgcmVzdWx0IC09IHZhbHNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgZ2F1c3NfZWxpbWluYXRpb246IGZ1bmN0aW9uIGdhdXNzX2VsaW1pbmF0aW9uKGEsIGIpIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgaiA9IDAsXG4gICAgbiA9IGEubGVuZ3RoLFxuICAgIG0gPSBhWzBdLmxlbmd0aCxcbiAgICBmYWN0b3IgPSAxLFxuICAgIHN1bSA9IDAsXG4gICAgeCA9IFtdLFxuICAgIG1hdWcsIHBpdm90LCB0ZW1wLCBrO1xuICAgIGEgPSBqU3RhdC5hdWcoYSwgYik7XG4gICAgbWF1ZyA9IGFbMF0ubGVuZ3RoO1xuICAgIGZvcihpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcGl2b3QgPSBhW2ldW2ldO1xuICAgICAgaiA9IGk7XG4gICAgICBmb3IgKGsgPSBpICsgMTsgayA8IG07IGsrKykge1xuICAgICAgICBpZiAocGl2b3QgPCBNYXRoLmFicyhhW2tdW2ldKSkge1xuICAgICAgICAgIHBpdm90ID0gYVtrXVtpXTtcbiAgICAgICAgICBqID0gaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGogIT0gaSkge1xuICAgICAgICBmb3IoayA9IDA7IGsgPCBtYXVnOyBrKyspIHtcbiAgICAgICAgICB0ZW1wID0gYVtpXVtrXTtcbiAgICAgICAgICBhW2ldW2tdID0gYVtqXVtrXTtcbiAgICAgICAgICBhW2pdW2tdID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgZmFjdG9yID0gYVtqXVtpXSAvIGFbaV1baV07XG4gICAgICAgIGZvcihrID0gaTsgayA8IG1hdWc7IGsrKykge1xuICAgICAgICAgIGFbal1ba10gPSBhW2pdW2tdIC0gZmFjdG9yICogYVtpXVtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGkgPSBuIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHN1bSA9IDA7XG4gICAgICBmb3IgKGogPSBpICsgMTsgajw9IG4gLSAxOyBqKyspIHtcbiAgICAgICAgc3VtID0gc3VtICsgeFtqXSAqIGFbaV1bal07XG4gICAgICB9XG4gICAgICB4W2ldID0oYVtpXVttYXVnIC0gMV0gLSBzdW0pIC8gYVtpXVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH0sXG5cbiAgZ2F1c3Nfam9yZGFuOiBmdW5jdGlvbiBnYXVzc19qb3JkYW4oYSwgYikge1xuICAgIHZhciBtID0galN0YXQuYXVnKGEsIGIpO1xuICAgIHZhciBoID0gbS5sZW5ndGg7XG4gICAgdmFyIHcgPSBtWzBdLmxlbmd0aDtcbiAgICB2YXIgYyA9IDA7XG4gICAgdmFyIHgsIHksIHkyO1xuICAgIC8vIGZpbmQgbWF4IHBpdm90XG4gICAgZm9yICh5ID0gMDsgeSA8IGg7IHkrKykge1xuICAgICAgdmFyIG1heHJvdyA9IHk7XG4gICAgICBmb3IgKHkyID0geSsxOyB5MiA8IGg7IHkyKyspIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKG1beTJdW3ldKSA+IE1hdGguYWJzKG1bbWF4cm93XVt5XSkpXG4gICAgICAgICAgbWF4cm93ID0geTI7XG4gICAgICB9XG4gICAgICB2YXIgdG1wID0gbVt5XTtcbiAgICAgIG1beV0gPSBtW21heHJvd107XG4gICAgICBtW21heHJvd10gPSB0bXBcbiAgICAgIGZvciAoeTIgPSB5KzE7IHkyIDwgaDsgeTIrKykge1xuICAgICAgICBjID0gbVt5Ml1beV0gLyBtW3ldW3ldO1xuICAgICAgICBmb3IgKHggPSB5OyB4IDwgdzsgeCsrKSB7XG4gICAgICAgICAgbVt5Ml1beF0gLT0gbVt5XVt4XSAqIGM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYmFja3N1YnN0aXR1dGVcbiAgICBmb3IgKHkgPSBoLTE7IHkgPj0gMDsgeS0tKSB7XG4gICAgICBjID0gbVt5XVt5XTtcbiAgICAgIGZvciAoeTIgPSAwOyB5MiA8IHk7IHkyKyspIHtcbiAgICAgICAgZm9yICh4ID0gdy0xOyB4ID4geS0xOyB4LS0pIHtcbiAgICAgICAgICBtW3kyXVt4XSAtPSBtW3ldW3hdICogbVt5Ml1beV0gLyBjO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtW3ldW3ldIC89IGM7XG4gICAgICBmb3IgKHggPSBoOyB4IDwgdzsgeCsrKSB7XG4gICAgICAgIG1beV1beF0gLz0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG07XG4gIH0sXG5cbiAgLy8gc29sdmUgZXF1YXRpb25cbiAgLy8gQXg9YlxuICAvLyBBIGlzIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4XG4gIC8vIEE9W1sxLDIsM10sWzAsNCw1XSxbMCw2LDddXVxuICAvLyBiPVsxLDIsM11cbiAgLy8gdHJpYVVwU29sdmUoQSxiKSAvLyAtPiBbMi42NjYsMC4xNjY2LDEuNjY2XVxuICAvLyBpZiB5b3UgdXNlIG1hdHJpeCBzdHlsZVxuICAvLyBBPVtbMSwyLDNdLFswLDQsNV0sWzAsNiw3XV1cbiAgLy8gYj1bWzFdLFsyXSxbM11dXG4gIC8vIHdpbGwgcmV0dXJuIFtbMi42NjZdLFswLjE2NjZdLFsxLjY2Nl1dXG4gIHRyaWFVcFNvbHZlOiBmdW5jdGlvbiB0cmlhVXBTb2x2ZShBLCBiKSB7XG4gICAgdmFyIHNpemUgPSBBWzBdLmxlbmd0aDtcbiAgICB2YXIgeCA9IGpTdGF0Lnplcm9zKDEsIHNpemUpWzBdO1xuICAgIHZhciBwYXJ0cztcbiAgICB2YXIgbWF0cml4X21vZGUgPSBmYWxzZTtcblxuICAgIGlmIChiWzBdLmxlbmd0aCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGIgPSBiLm1hcChmdW5jdGlvbihpKXsgcmV0dXJuIGlbMF0gfSk7XG4gICAgICBtYXRyaXhfbW9kZSA9IHRydWU7XG4gICAgfVxuXG4gICAgalN0YXQuYXJhbmdlKHNpemUgLSAxLCAtMSwgLTEpLmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgcGFydHMgPSBqU3RhdC5hcmFuZ2UoaSArIDEsIHNpemUpLm1hcChmdW5jdGlvbihqKSB7XG4gICAgICAgIHJldHVybiB4W2pdICogQVtpXVtqXTtcbiAgICAgIH0pO1xuICAgICAgeFtpXSA9IChiW2ldIC0galN0YXQuc3VtKHBhcnRzKSkgLyBBW2ldW2ldO1xuICAgIH0pO1xuXG4gICAgaWYgKG1hdHJpeF9tb2RlKVxuICAgICAgcmV0dXJuIHgubWFwKGZ1bmN0aW9uKGkpeyByZXR1cm4gW2ldIH0pO1xuICAgIHJldHVybiB4O1xuICB9LFxuXG4gIHRyaWFMb3dTb2x2ZTogZnVuY3Rpb24gdHJpYUxvd1NvbHZlKEEsIGIpIHtcbiAgICAvLyBsaWtlIHRvIHRyaWFVcFNvbHZlIGJ1dCBBIGlzIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4XG4gICAgdmFyIHNpemUgPSBBWzBdLmxlbmd0aDtcbiAgICB2YXIgeCA9IGpTdGF0Lnplcm9zKDEsIHNpemUpWzBdO1xuICAgIHZhciBwYXJ0cztcblxuICAgIHZhciBtYXRyaXhfbW9kZT1mYWxzZTtcbiAgICBpZiAoYlswXS5sZW5ndGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICBiID0gYi5tYXAoZnVuY3Rpb24oaSl7IHJldHVybiBpWzBdIH0pO1xuICAgICAgbWF0cml4X21vZGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGpTdGF0LmFyYW5nZShzaXplKS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHBhcnRzID0galN0YXQuYXJhbmdlKGkpLm1hcChmdW5jdGlvbihqKSB7XG4gICAgICAgIHJldHVybiBBW2ldW2pdICogeFtqXTtcbiAgICAgIH0pO1xuICAgICAgeFtpXSA9IChiW2ldIC0galN0YXQuc3VtKHBhcnRzKSkgLyBBW2ldW2ldO1xuICAgIH0pXG5cbiAgICBpZiAobWF0cml4X21vZGUpXG4gICAgICByZXR1cm4geC5tYXAoZnVuY3Rpb24oaSl7IHJldHVybiBbaV0gfSk7XG4gICAgcmV0dXJuIHg7XG4gIH0sXG5cblxuICAvLyBBIC0+IFtMLFVdXG4gIC8vIEE9TFVcbiAgLy8gTCBpcyBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeFxuICAvLyBVIGlzIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4XG4gIGx1OiBmdW5jdGlvbiBsdShBKSB7XG4gICAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgICAvL3ZhciBMPWpTdGF0LmRpYWdvbmFsKGpTdGF0Lm9uZXMoMSxzaXplKVswXSk7XG4gICAgdmFyIEwgPSBqU3RhdC5pZGVudGl0eShzaXplKTtcbiAgICB2YXIgUiA9IGpTdGF0Lnplcm9zKEEubGVuZ3RoLCBBWzBdLmxlbmd0aCk7XG4gICAgdmFyIHBhcnRzO1xuICAgIGpTdGF0LmFyYW5nZShzaXplKS5mb3JFYWNoKGZ1bmN0aW9uKHQpIHtcbiAgICAgIFJbMF1bdF0gPSBBWzBdW3RdO1xuICAgIH0pO1xuICAgIGpTdGF0LmFyYW5nZSgxLCBzaXplKS5mb3JFYWNoKGZ1bmN0aW9uKGwpIHtcbiAgICAgIGpTdGF0LmFyYW5nZShsKS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcGFydHMgPSBqU3RhdC5hcmFuZ2UoaSkubWFwKGZ1bmN0aW9uKGpqKSB7XG4gICAgICAgICAgcmV0dXJuIExbbF1bampdICogUltqal1baV07XG4gICAgICAgIH0pO1xuICAgICAgICBMW2xdW2ldID0gKEFbbF1baV0gLSBqU3RhdC5zdW0ocGFydHMpKSAvIFJbaV1baV07XG4gICAgICB9KTtcbiAgICAgIGpTdGF0LmFyYW5nZShsLCBzaXplKS5mb3JFYWNoKGZ1bmN0aW9uKGopIHtcbiAgICAgICAgcGFydHMgPSBqU3RhdC5hcmFuZ2UobCkubWFwKGZ1bmN0aW9uKGpqKSB7XG4gICAgICAgICAgcmV0dXJuIExbbF1bampdICogUltqal1bal07XG4gICAgICAgIH0pO1xuICAgICAgICBSW2xdW2pdID0gQVtwYXJ0cy5sZW5ndGhdW2pdIC0galN0YXQuc3VtKHBhcnRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBbTCwgUl07XG4gIH0sXG5cbiAgLy8gQSAtPiBUXG4gIC8vIEE9VFQnXG4gIC8vIFQgaXMgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgY2hvbGVza3k6IGZ1bmN0aW9uIGNob2xlc2t5KEEpIHtcbiAgICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICAgIHZhciBUID0galN0YXQuemVyb3MoQS5sZW5ndGgsIEFbMF0ubGVuZ3RoKTtcbiAgICB2YXIgcGFydHM7XG4gICAgalN0YXQuYXJhbmdlKHNpemUpLmZvckVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgcGFydHMgPSBqU3RhdC5hcmFuZ2UoaSkubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KFRbaV1bdF0sMik7XG4gICAgICB9KTtcbiAgICAgIFRbaV1baV0gPSBNYXRoLnNxcnQoQVtpXVtpXSAtIGpTdGF0LnN1bShwYXJ0cykpO1xuICAgICAgalN0YXQuYXJhbmdlKGkgKyAxLCBzaXplKS5mb3JFYWNoKGZ1bmN0aW9uKGopIHtcbiAgICAgICAgcGFydHMgPSBqU3RhdC5hcmFuZ2UoaSkubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICByZXR1cm4gVFtpXVt0XSAqIFRbal1bdF07XG4gICAgICAgIH0pO1xuICAgICAgICBUW2pdW2ldID0gKEFbaV1bal0gLSBqU3RhdC5zdW0ocGFydHMpKSAvIFRbaV1baV07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gVDtcbiAgfSxcblxuXG4gIGdhdXNzX2phY29iaTogZnVuY3Rpb24gZ2F1c3NfamFjb2JpKGEsIGIsIHgsIHIpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBuID0gYS5sZW5ndGg7XG4gICAgdmFyIGwgPSBbXTtcbiAgICB2YXIgdSA9IFtdO1xuICAgIHZhciBkID0gW107XG4gICAgdmFyIHh2LCBjLCBoLCB4aztcbiAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgbFtpXSA9IFtdO1xuICAgICAgdVtpXSA9IFtdO1xuICAgICAgZFtpXSA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBpZiAoaSA+IGopIHtcbiAgICAgICAgICBsW2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICB1W2ldW2pdID0gZFtpXVtqXSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IGopIHtcbiAgICAgICAgICB1W2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICBsW2ldW2pdID0gZFtpXVtqXSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZFtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgbFtpXVtqXSA9IHVbaV1bal0gPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGggPSBqU3RhdC5tdWx0aXBseShqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoZCksIGpTdGF0LmFkZChsLCB1KSksIC0xKTtcbiAgICBjID0galN0YXQubXVsdGlwbHkoalN0YXQuaW52KGQpLCBiKTtcbiAgICB4diA9IHg7XG4gICAgeGsgPSBqU3RhdC5hZGQoalN0YXQubXVsdGlwbHkoaCwgeCksIGMpO1xuICAgIGkgPSAyO1xuICAgIHdoaWxlIChNYXRoLmFicyhqU3RhdC5ub3JtKGpTdGF0LnN1YnRyYWN0KHhrLHh2KSkpID4gcikge1xuICAgICAgeHYgPSB4aztcbiAgICAgIHhrID0galN0YXQuYWRkKGpTdGF0Lm11bHRpcGx5KGgsIHh2KSwgYyk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiB4aztcbiAgfSxcblxuICBnYXVzc19zZWlkZWw6IGZ1bmN0aW9uIGdhdXNzX3NlaWRlbChhLCBiLCB4LCByKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBuID0gYS5sZW5ndGg7XG4gICAgdmFyIGwgPSBbXTtcbiAgICB2YXIgdSA9IFtdO1xuICAgIHZhciBkID0gW107XG4gICAgdmFyIGosIHh2LCBjLCBoLCB4aztcbiAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgbFtpXSA9IFtdO1xuICAgICAgdVtpXSA9IFtdO1xuICAgICAgZFtpXSA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBpZiAoaSA+IGopIHtcbiAgICAgICAgICBsW2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICB1W2ldW2pdID0gZFtpXVtqXSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IGopIHtcbiAgICAgICAgICB1W2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICBsW2ldW2pdID0gZFtpXVtqXSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZFtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgbFtpXVtqXSA9IHVbaV1bal0gPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGggPSBqU3RhdC5tdWx0aXBseShqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoalN0YXQuYWRkKGQsIGwpKSwgdSksIC0xKTtcbiAgICBjID0galN0YXQubXVsdGlwbHkoalN0YXQuaW52KGpTdGF0LmFkZChkLCBsKSksIGIpO1xuICAgIHh2ID0geDtcbiAgICB4ayA9IGpTdGF0LmFkZChqU3RhdC5tdWx0aXBseShoLCB4KSwgYyk7XG4gICAgaSA9IDI7XG4gICAgd2hpbGUgKE1hdGguYWJzKGpTdGF0Lm5vcm0oalN0YXQuc3VidHJhY3QoeGssIHh2KSkpID4gcikge1xuICAgICAgeHYgPSB4aztcbiAgICAgIHhrID0galN0YXQuYWRkKGpTdGF0Lm11bHRpcGx5KGgsIHh2KSwgYyk7XG4gICAgICBpID0gaSArIDE7XG4gICAgfVxuICAgIHJldHVybiB4aztcbiAgfSxcblxuICBTT1I6IGZ1bmN0aW9uIFNPUihhLCBiLCB4LCByLCB3KSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBuID0gYS5sZW5ndGg7XG4gICAgdmFyIGwgPSBbXTtcbiAgICB2YXIgdSA9IFtdO1xuICAgIHZhciBkID0gW107XG4gICAgdmFyIGosIHh2LCBjLCBoLCB4aztcbiAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgbFtpXSA9IFtdO1xuICAgICAgdVtpXSA9IFtdO1xuICAgICAgZFtpXSA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICBpZiAoaSA+IGopIHtcbiAgICAgICAgICBsW2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICB1W2ldW2pdID0gZFtpXVtqXSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA8IGopIHtcbiAgICAgICAgICB1W2ldW2pdID0gYVtpXVtqXTtcbiAgICAgICAgICBsW2ldW2pdID0gZFtpXVtqXSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZFtpXVtqXSA9IGFbaV1bal07XG4gICAgICAgICAgbFtpXVtqXSA9IHVbaV1bal0gPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGggPSBqU3RhdC5tdWx0aXBseShqU3RhdC5pbnYoalN0YXQuYWRkKGQsIGpTdGF0Lm11bHRpcGx5KGwsIHcpKSksXG4gICAgICAgICAgICAgICAgICAgICAgIGpTdGF0LnN1YnRyYWN0KGpTdGF0Lm11bHRpcGx5KGQsIDEgLSB3KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalN0YXQubXVsdGlwbHkodSwgdykpKTtcbiAgICBjID0galN0YXQubXVsdGlwbHkoalN0YXQubXVsdGlwbHkoalN0YXQuaW52KGpTdGF0LmFkZChkLFxuICAgICAgICBqU3RhdC5tdWx0aXBseShsLCB3KSkpLCBiKSwgdyk7XG4gICAgeHYgPSB4O1xuICAgIHhrID0galN0YXQuYWRkKGpTdGF0Lm11bHRpcGx5KGgsIHgpLCBjKTtcbiAgICBpID0gMjtcbiAgICB3aGlsZSAoTWF0aC5hYnMoalN0YXQubm9ybShqU3RhdC5zdWJ0cmFjdCh4aywgeHYpKSkgPiByKSB7XG4gICAgICB4diA9IHhrO1xuICAgICAgeGsgPSBqU3RhdC5hZGQoalN0YXQubXVsdGlwbHkoaCwgeHYpLCBjKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHhrO1xuICB9LFxuXG4gIGhvdXNlaG9sZGVyOiBmdW5jdGlvbiBob3VzZWhvbGRlcihhKSB7XG4gICAgdmFyIG0gPSBhLmxlbmd0aDtcbiAgICB2YXIgbiA9IGFbMF0ubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgdyA9IFtdO1xuICAgIHZhciBwID0gW107XG4gICAgdmFyIGFscGhhLCByLCBrLCBqLCBmYWN0b3I7XG4gICAgZm9yICg7IGkgPCBtIC0gMTsgaSsrKSB7XG4gICAgICBhbHBoYSA9IDA7XG4gICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKylcbiAgICAgIGFscGhhICs9IChhW2pdW2ldICogYVtqXVtpXSk7XG4gICAgICBmYWN0b3IgPSAoYVtpICsgMV1baV0gPiAwKSA/IC0xIDogMTtcbiAgICAgIGFscGhhID0gZmFjdG9yICogTWF0aC5zcXJ0KGFscGhhKTtcbiAgICAgIHIgPSBNYXRoLnNxcnQoKCgoYWxwaGEgKiBhbHBoYSkgLSBhW2kgKyAxXVtpXSAqIGFscGhhKSAvIDIpKTtcbiAgICAgIHcgPSBqU3RhdC56ZXJvcyhtLCAxKTtcbiAgICAgIHdbaSArIDFdWzBdID0gKGFbaSArIDFdW2ldIC0gYWxwaGEpIC8gKDIgKiByKTtcbiAgICAgIGZvciAoayA9IGkgKyAyOyBrIDwgbTsgaysrKSB3W2tdWzBdID0gYVtrXVtpXSAvICgyICogcik7XG4gICAgICBwID0galN0YXQuc3VidHJhY3QoalN0YXQuaWRlbnRpdHkobSwgbiksXG4gICAgICAgICAgalN0YXQubXVsdGlwbHkoalN0YXQubXVsdGlwbHkodywgalN0YXQudHJhbnNwb3NlKHcpKSwgMikpO1xuICAgICAgYSA9IGpTdGF0Lm11bHRpcGx5KHAsIGpTdGF0Lm11bHRpcGx5KGEsIHApKTtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH0sXG5cbiAgLy8gQSAtPiBbUSxSXVxuICAvLyBRIGlzIG9ydGhvZ29uYWwgbWF0cml4XG4gIC8vIFIgaXMgdXBwZXIgdHJpYW5ndWxhclxuICBRUjogKGZ1bmN0aW9uKCkge1xuICAgIC8vIHggLT4gUVxuICAgIC8vIGZpbmQgYSBvcnRob2dvbmFsIG1hdHJpeCBRIHN0LlxuICAgIC8vIFF4PXlcbiAgICAvLyB5IGlzIFt8fHh8fCwwLDAsLi4uXVxuXG4gICAgLy8gcXVpY2sgcmVmXG4gICAgdmFyIHN1bSAgID0galN0YXQuc3VtO1xuICAgIHZhciByYW5nZSA9IGpTdGF0LmFyYW5nZTtcblxuICAgIGZ1bmN0aW9uIHFyMih4KSB7XG4gICAgICAvLyBxdWljayBpbXBsZXRhdGlvblxuICAgICAgLy8gaHR0cHM6Ly93d3cuc3RhdC53aXNjLmVkdS9+bGFyZ2V0L21hdGg0OTYvcXIuaHRtbFxuXG4gICAgICB2YXIgbiA9IHgubGVuZ3RoO1xuICAgICAgdmFyIHAgPSB4WzBdLmxlbmd0aDtcblxuICAgICAgdmFyIHIgPSBqU3RhdC56ZXJvcyhwLCBwKTtcbiAgICAgIHggPSBqU3RhdC5jb3B5KHgpO1xuXG4gICAgICB2YXIgaSxqLGs7XG4gICAgICBmb3IoaiA9IDA7IGogPCBwOyBqKyspe1xuICAgICAgICByW2pdW2pdID0gTWF0aC5zcXJ0KHN1bShyYW5nZShuKS5tYXAoZnVuY3Rpb24oaSl7XG4gICAgICAgICAgcmV0dXJuIHhbaV1bal0gKiB4W2ldW2pdO1xuICAgICAgICB9KSkpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBuOyBpKyspe1xuICAgICAgICAgIHhbaV1bal0gPSB4W2ldW2pdIC8gcltqXVtqXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IoayA9IGorMTsgayA8IHA7IGsrKyl7XG4gICAgICAgICAgcltqXVtrXSA9IHN1bShyYW5nZShuKS5tYXAoZnVuY3Rpb24oaSl7XG4gICAgICAgICAgICByZXR1cm4geFtpXVtqXSAqIHhbaV1ba107XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIGZvcihpID0gMDsgaSA8IG47IGkrKyl7XG4gICAgICAgICAgICB4W2ldW2tdID0geFtpXVtrXSAtIHhbaV1bal0qcltqXVtrXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbeCwgcl07XG4gICAgfVxuXG4gICAgcmV0dXJuIHFyMjtcbiAgfSgpKSxcblxuICBsc3RzcTogKGZ1bmN0aW9uKCkge1xuICAgIC8vIHNvbHZlIGxlYXN0IHNxdWFyZCBwcm9ibGVtIGZvciBBeD1iIGFzIFFSIGRlY29tcG9zaXRpb24gd2F5IGlmIGIgaXNcbiAgICAvLyBbW2IxXSxbYjJdLFtiM11dIGZvcm0gd2lsbCByZXR1cm4gW1t4MV0sW3gyXSxbeDNdXSBhcnJheSBmb3JtIHNvbHV0aW9uXG4gICAgLy8gZWxzZSBiIGlzIFtiMSxiMixiM10gZm9ybSB3aWxsIHJldHVybiBbeDEseDIseDNdIGFycmF5IGZvcm0gc29sdXRpb25cbiAgICBmdW5jdGlvbiBSX0koQSkge1xuICAgICAgQSA9IGpTdGF0LmNvcHkoQSk7XG4gICAgICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICAgICAgdmFyIEkgPSBqU3RhdC5pZGVudGl0eShzaXplKTtcbiAgICAgIGpTdGF0LmFyYW5nZShzaXplIC0gMSwgLTEsIC0xKS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgalN0YXQuc2xpY2VBc3NpZ24oXG4gICAgICAgICAgICBJLCB7IHJvdzogaSB9LCBqU3RhdC5kaXZpZGUoalN0YXQuc2xpY2UoSSwgeyByb3c6IGkgfSksIEFbaV1baV0pKTtcbiAgICAgICAgalN0YXQuc2xpY2VBc3NpZ24oXG4gICAgICAgICAgICBBLCB7IHJvdzogaSB9LCBqU3RhdC5kaXZpZGUoalN0YXQuc2xpY2UoQSwgeyByb3c6IGkgfSksIEFbaV1baV0pKTtcbiAgICAgICAgalN0YXQuYXJhbmdlKGkpLmZvckVhY2goZnVuY3Rpb24oaikge1xuICAgICAgICAgIHZhciBjID0galN0YXQubXVsdGlwbHkoQVtqXVtpXSwgLTEpO1xuICAgICAgICAgIHZhciBBaiA9IGpTdGF0LnNsaWNlKEEsIHsgcm93OiBqIH0pO1xuICAgICAgICAgIHZhciBjQWkgPSBqU3RhdC5tdWx0aXBseShqU3RhdC5zbGljZShBLCB7IHJvdzogaSB9KSwgYyk7XG4gICAgICAgICAgalN0YXQuc2xpY2VBc3NpZ24oQSwgeyByb3c6IGogfSwgalN0YXQuYWRkKEFqLCBjQWkpKTtcbiAgICAgICAgICB2YXIgSWogPSBqU3RhdC5zbGljZShJLCB7IHJvdzogaiB9KTtcbiAgICAgICAgICB2YXIgY0lpID0galN0YXQubXVsdGlwbHkoalN0YXQuc2xpY2UoSSwgeyByb3c6IGkgfSksIGMpO1xuICAgICAgICAgIGpTdGF0LnNsaWNlQXNzaWduKEksIHsgcm93OiBqIH0sIGpTdGF0LmFkZChJaiwgY0lpKSk7XG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBJO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHFyX3NvbHZlKEEsIGIpe1xuICAgICAgdmFyIGFycmF5X21vZGUgPSBmYWxzZTtcbiAgICAgIGlmIChiWzBdLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIFtjMSxjMixjM10gbW9kZVxuICAgICAgICBiID0gYi5tYXAoZnVuY3Rpb24oeCl7IHJldHVybiBbeF0gfSk7XG4gICAgICAgIGFycmF5X21vZGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdmFyIFFSID0galN0YXQuUVIoQSk7XG4gICAgICB2YXIgUSA9IFFSWzBdO1xuICAgICAgdmFyIFIgPSBRUlsxXTtcbiAgICAgIHZhciBhdHRycyA9IEFbMF0ubGVuZ3RoO1xuICAgICAgdmFyIFExID0galN0YXQuc2xpY2UoUSx7Y29sOntlbmQ6YXR0cnN9fSk7XG4gICAgICB2YXIgUjEgPSBqU3RhdC5zbGljZShSLHtyb3c6e2VuZDphdHRyc319KTtcbiAgICAgIHZhciBSSSA9IFJfSShSMSk7XG4gICAgICB2YXIgUTIgPSBqU3RhdC50cmFuc3Bvc2UoUTEpO1xuXG4gICAgICBpZihRMlswXS5sZW5ndGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIFEyID0gW1EyXTsgLy8gVGhlIGNvbmZ1c2luZyBqU3RhdC5tdWx0aWZseSBpbXBsZW1lbnRhdGlvbiB0aHJlYXQgbmF0dXJlIHByb2Nlc3MgYWdhaW4uXG4gICAgICB9XG5cbiAgICAgIHZhciB4ID0galN0YXQubXVsdGlwbHkoalN0YXQubXVsdGlwbHkoUkksIFEyKSwgYik7XG5cbiAgICAgIGlmKHgubGVuZ3RoID09PSB1bmRlZmluZWQpe1xuICAgICAgICB4ID0gW1t4XV07IC8vIFRoZSBjb25mdXNpbmcgalN0YXQubXVsdGlmbHkgaW1wbGVtZW50YXRpb24gdGhyZWF0IG5hdHVyZSBwcm9jZXNzIGFnYWluLlxuICAgICAgfVxuXG5cbiAgICAgIGlmIChhcnJheV9tb2RlKVxuICAgICAgICByZXR1cm4geC5tYXAoZnVuY3Rpb24oaSl7IHJldHVybiBpWzBdIH0pO1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHFyX3NvbHZlO1xuICB9KCkpLFxuXG4gIGphY29iaTogZnVuY3Rpb24gamFjb2JpKGEpIHtcbiAgICB2YXIgY29uZGl0aW9uID0gMTtcbiAgICB2YXIgbiA9IGEubGVuZ3RoO1xuICAgIHZhciBlID0galN0YXQuaWRlbnRpdHkobiwgbik7XG4gICAgdmFyIGV2ID0gW107XG4gICAgdmFyIGIsIGksIGosIHAsIHEsIG1heGltLCB0aGV0YSwgcztcbiAgICAvLyBjb25kaXRpb24gPT09IDEgb25seSBpZiB0b2xlcmFuY2UgaXMgbm90IHJlYWNoZWRcbiAgICB3aGlsZSAoY29uZGl0aW9uID09PSAxKSB7XG4gICAgICBtYXhpbSA9IGFbMF1bMV07XG4gICAgICBwID0gMDtcbiAgICAgIHEgPSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgaWYgKGkgIT0gaikge1xuICAgICAgICAgICAgaWYgKG1heGltIDwgTWF0aC5hYnMoYVtpXVtqXSkpIHtcbiAgICAgICAgICAgICAgbWF4aW0gPSBNYXRoLmFicyhhW2ldW2pdKTtcbiAgICAgICAgICAgICAgcCA9IGk7XG4gICAgICAgICAgICAgIHEgPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGFbcF1bcF0gPT09IGFbcV1bcV0pXG4gICAgICAgIHRoZXRhID0gKGFbcF1bcV0gPiAwKSA/IE1hdGguUEkgLyA0IDogLU1hdGguUEkgLyA0O1xuICAgICAgZWxzZVxuICAgICAgICB0aGV0YSA9IE1hdGguYXRhbigyICogYVtwXVtxXSAvIChhW3BdW3BdIC0gYVtxXVtxXSkpIC8gMjtcbiAgICAgIHMgPSBqU3RhdC5pZGVudGl0eShuLCBuKTtcbiAgICAgIHNbcF1bcF0gPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICBzW3BdW3FdID0gLU1hdGguc2luKHRoZXRhKTtcbiAgICAgIHNbcV1bcF0gPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgICBzW3FdW3FdID0gTWF0aC5jb3ModGhldGEpO1xuICAgICAgLy8gZWlnZW4gdmVjdG9yIG1hdHJpeFxuICAgICAgZSA9IGpTdGF0Lm11bHRpcGx5KGUsIHMpO1xuICAgICAgYiA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihzKSwgYSksIHMpO1xuICAgICAgYSA9IGI7XG4gICAgICBjb25kaXRpb24gPSAwO1xuICAgICAgZm9yIChpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgICBmb3IgKGogPSAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgaWYgKGkgIT0gaiAmJiBNYXRoLmFicyhhW2ldW2pdKSA+IDAuMDAxKSB7XG4gICAgICAgICAgICBjb25kaXRpb24gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSBldi5wdXNoKGFbaV1baV0pO1xuICAgIC8vcmV0dXJucyBib3RoIHRoZSBlaWdlbnZhbHVlIGFuZCBlaWdlbm1hdHJpeFxuICAgIHJldHVybiBbZSwgZXZdO1xuICB9LFxuXG4gIHJ1bmdla3V0dGE6IGZ1bmN0aW9uIHJ1bmdla3V0dGEoZiwgaCwgcCwgdF9qLCB1X2osIG9yZGVyKSB7XG4gICAgdmFyIGsxLCBrMiwgdV9qMSwgazMsIGs0O1xuICAgIGlmIChvcmRlciA9PT0gMikge1xuICAgICAgd2hpbGUgKHRfaiA8PSBwKSB7XG4gICAgICAgIGsxID0gaCAqIGYodF9qLCB1X2opO1xuICAgICAgICBrMiA9IGggKiBmKHRfaiArIGgsIHVfaiArIGsxKTtcbiAgICAgICAgdV9qMSA9IHVfaiArIChrMSArIGsyKSAvIDI7XG4gICAgICAgIHVfaiA9IHVfajE7XG4gICAgICAgIHRfaiA9IHRfaiArIGg7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmRlciA9PT0gNCkge1xuICAgICAgd2hpbGUgKHRfaiA8PSBwKSB7XG4gICAgICAgIGsxID0gaCAqIGYodF9qLCB1X2opO1xuICAgICAgICBrMiA9IGggKiBmKHRfaiArIGggLyAyLCB1X2ogKyBrMSAvIDIpO1xuICAgICAgICBrMyA9IGggKiBmKHRfaiArIGggLyAyLCB1X2ogKyBrMiAvIDIpO1xuICAgICAgICBrNCA9IGggKiBmKHRfaiAraCwgdV9qICsgazMpO1xuICAgICAgICB1X2oxID0gdV9qICsgKGsxICsgMiAqIGsyICsgMiAqIGszICsgazQpIC8gNjtcbiAgICAgICAgdV9qID0gdV9qMTtcbiAgICAgICAgdF9qID0gdF9qICsgaDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVfajtcbiAgfSxcblxuICByb21iZXJnOiBmdW5jdGlvbiByb21iZXJnKGYsIGEsIGIsIG9yZGVyKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBoID0gKGIgLSBhKSAvIDI7XG4gICAgdmFyIHggPSBbXTtcbiAgICB2YXIgaDEgPSBbXTtcbiAgICB2YXIgZyA9IFtdO1xuICAgIHZhciBtLCBhMSwgaiwgaywgSTtcbiAgICB3aGlsZSAoaSA8IG9yZGVyIC8gMikge1xuICAgICAgSSA9IGYoYSk7XG4gICAgICBmb3IgKGogPSBhLCBrID0gMDsgaiA8PSBiOyBqID0gaiArIGgsIGsrKykgeFtrXSA9IGo7XG4gICAgICBtID0geC5sZW5ndGg7XG4gICAgICBmb3IgKGogPSAxOyBqIDwgbSAtIDE7IGorKykge1xuICAgICAgICBJICs9ICgoKGogJSAyKSAhPT0gMCkgPyA0IDogMikgKiBmKHhbal0pO1xuICAgICAgfVxuICAgICAgSSA9IChoIC8gMykgKiAoSSArIGYoYikpO1xuICAgICAgZ1tpXSA9IEk7XG4gICAgICBoIC89IDI7XG4gICAgICBpKys7XG4gICAgfVxuICAgIGExID0gZy5sZW5ndGg7XG4gICAgbSA9IDE7XG4gICAgd2hpbGUgKGExICE9PSAxKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgYTEgLSAxOyBqKyspXG4gICAgICBoMVtqXSA9ICgoTWF0aC5wb3coNCwgbSkpICogZ1tqICsgMV0gLSBnW2pdKSAvIChNYXRoLnBvdyg0LCBtKSAtIDEpO1xuICAgICAgYTEgPSBoMS5sZW5ndGg7XG4gICAgICBnID0gaDE7XG4gICAgICBoMSA9IFtdO1xuICAgICAgbSsrO1xuICAgIH1cbiAgICByZXR1cm4gZztcbiAgfSxcblxuICByaWNoYXJkc29uOiBmdW5jdGlvbiByaWNoYXJkc29uKFgsIGYsIHgsIGgpIHtcbiAgICBmdW5jdGlvbiBwb3MoWCwgeCkge1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIG4gPSBYLmxlbmd0aDtcbiAgICAgIHZhciBwO1xuICAgICAgZm9yICg7IGkgPCBuOyBpKyspXG4gICAgICAgIGlmIChYW2ldID09PSB4KSBwID0gaTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICB2YXIgaF9taW4gPSBNYXRoLmFicyh4IC0gWFtwb3MoWCwgeCkgKyAxXSk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBnID0gW107XG4gICAgdmFyIGgxID0gW107XG4gICAgdmFyIHkxLCB5MiwgbSwgYSwgajtcbiAgICB3aGlsZSAoaCA+PSBoX21pbikge1xuICAgICAgeTEgPSBwb3MoWCwgeCArIGgpO1xuICAgICAgeTIgPSBwb3MoWCwgeCk7XG4gICAgICBnW2ldID0gKGZbeTFdIC0gMiAqIGZbeTJdICsgZlsyICogeTIgLSB5MV0pIC8gKGggKiBoKTtcbiAgICAgIGggLz0gMjtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgYSA9IGcubGVuZ3RoO1xuICAgIG0gPSAxO1xuICAgIHdoaWxlIChhICE9IDEpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBhIC0gMTsgaisrKVxuICAgICAgICBoMVtqXSA9ICgoTWF0aC5wb3coNCwgbSkpICogZ1tqICsgMV0gLSBnW2pdKSAvIChNYXRoLnBvdyg0LCBtKSAtIDEpO1xuICAgICAgYSA9IGgxLmxlbmd0aDtcbiAgICAgIGcgPSBoMTtcbiAgICAgIGgxID0gW107XG4gICAgICBtKys7XG4gICAgfVxuICAgIHJldHVybiBnO1xuICB9LFxuXG4gIHNpbXBzb246IGZ1bmN0aW9uIHNpbXBzb24oZiwgYSwgYiwgbikge1xuICAgIHZhciBoID0gKGIgLSBhKSAvIG47XG4gICAgdmFyIEkgPSBmKGEpO1xuICAgIHZhciB4ID0gW107XG4gICAgdmFyIGogPSBhO1xuICAgIHZhciBrID0gMDtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIG07XG4gICAgZm9yICg7IGogPD0gYjsgaiA9IGogKyBoLCBrKyspXG4gICAgICB4W2tdID0gajtcbiAgICBtID0geC5sZW5ndGg7XG4gICAgZm9yICg7IGkgPCBtIC0gMTsgaSsrKSB7XG4gICAgICBJICs9ICgoaSAlIDIgIT09IDApID8gNCA6IDIpICogZih4W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIChoIC8gMykgKiAoSSArIGYoYikpO1xuICB9LFxuXG4gIGhlcm1pdGU6IGZ1bmN0aW9uIGhlcm1pdGUoWCwgRiwgZEYsIHZhbHVlKSB7XG4gICAgdmFyIG4gPSBYLmxlbmd0aDtcbiAgICB2YXIgcCA9IDA7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gW107XG4gICAgdmFyIGRsID0gW107XG4gICAgdmFyIEEgPSBbXTtcbiAgICB2YXIgQiA9IFtdO1xuICAgIHZhciBqO1xuICAgIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBsW2ldID0gMTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgaWYgKGkgIT0gaikgbFtpXSAqPSAodmFsdWUgLSBYW2pdKSAvIChYW2ldIC0gWFtqXSk7XG4gICAgICB9XG4gICAgICBkbFtpXSA9IDA7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgIGlmIChpICE9IGopIGRsW2ldICs9IDEgLyAoWCBbaV0gLSBYW2pdKTtcbiAgICAgIH1cbiAgICAgIEFbaV0gPSAoMSAtIDIgKiAodmFsdWUgLSBYW2ldKSAqIGRsW2ldKSAqIChsW2ldICogbFtpXSk7XG4gICAgICBCW2ldID0gKHZhbHVlIC0gWFtpXSkgKiAobFtpXSAqIGxbaV0pO1xuICAgICAgcCArPSAoQVtpXSAqIEZbaV0gKyBCW2ldICogZEZbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSxcblxuICBsYWdyYW5nZTogZnVuY3Rpb24gbGFncmFuZ2UoWCwgRiwgdmFsdWUpIHtcbiAgICB2YXIgcCA9IDA7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBqLCBsO1xuICAgIHZhciBuID0gWC5sZW5ndGg7XG4gICAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICAgIGwgPSBGW2ldO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICAvLyBjYWxjdWxhdGluZyB0aGUgbGFncmFuZ2UgcG9seW5vbWlhbCBMX2lcbiAgICAgICAgaWYgKGkgIT0gaikgbCAqPSAodmFsdWUgLSBYW2pdKSAvIChYW2ldIC0gWFtqXSk7XG4gICAgICB9XG4gICAgICAvLyBhZGRpbmcgdGhlIGxhZ3JhbmdlIHBvbHlub21pYWxzIGZvdW5kIGFib3ZlXG4gICAgICBwICs9IGw7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9LFxuXG4gIGN1YmljX3NwbGluZTogZnVuY3Rpb24gY3ViaWNfc3BsaW5lKFgsIEYsIHZhbHVlKSB7XG4gICAgdmFyIG4gPSBYLmxlbmd0aDtcbiAgICB2YXIgaSA9IDAsIGo7XG4gICAgdmFyIEEgPSBbXTtcbiAgICB2YXIgQiA9IFtdO1xuICAgIHZhciBhbHBoYSA9IFtdO1xuICAgIHZhciBjID0gW107XG4gICAgdmFyIGggPSBbXTtcbiAgICB2YXIgYiA9IFtdO1xuICAgIHZhciBkID0gW107XG4gICAgZm9yICg7IGkgPCBuIC0gMTsgaSsrKVxuICAgICAgaFtpXSA9IFhbaSArIDFdIC0gWFtpXTtcbiAgICBhbHBoYVswXSA9IDA7XG4gICAgZm9yIChpID0gMTsgaSA8IG4gLSAxOyBpKyspIHtcbiAgICAgIGFscGhhW2ldID0gKDMgLyBoW2ldKSAqIChGW2kgKyAxXSAtIEZbaV0pIC1cbiAgICAgICAgICAoMyAvIGhbaS0xXSkgKiAoRltpXSAtIEZbaS0xXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDE7IGkgPCBuIC0gMTsgaSsrKSB7XG4gICAgICBBW2ldID0gW107XG4gICAgICBCW2ldID0gW107XG4gICAgICBBW2ldW2ktMV0gPSBoW2ktMV07XG4gICAgICBBW2ldW2ldID0gMiAqIChoW2kgLSAxXSArIGhbaV0pO1xuICAgICAgQVtpXVtpKzFdID0gaFtpXTtcbiAgICAgIEJbaV1bMF0gPSBhbHBoYVtpXTtcbiAgICB9XG4gICAgYyA9IGpTdGF0Lm11bHRpcGx5KGpTdGF0LmludihBKSwgQik7XG4gICAgZm9yIChqID0gMDsgaiA8IG4gLSAxOyBqKyspIHtcbiAgICAgIGJbal0gPSAoRltqICsgMV0gLSBGW2pdKSAvIGhbal0gLSBoW2pdICogKGNbaiArIDFdWzBdICsgMiAqIGNbal1bMF0pIC8gMztcbiAgICAgIGRbal0gPSAoY1tqICsgMV1bMF0gLSBjW2pdWzBdKSAvICgzICogaFtqXSk7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgIGlmIChYW2pdID4gdmFsdWUpIGJyZWFrO1xuICAgIH1cbiAgICBqIC09IDE7XG4gICAgcmV0dXJuIEZbal0gKyAodmFsdWUgLSBYW2pdKSAqIGJbal0gKyBqU3RhdC5zcSh2YWx1ZS1YW2pdKSAqXG4gICAgICAgIGNbal0gKyAodmFsdWUgLSBYW2pdKSAqIGpTdGF0LnNxKHZhbHVlIC0gWFtqXSkgKiBkW2pdO1xuICB9LFxuXG4gIGdhdXNzX3F1YWRyYXR1cmU6IGZ1bmN0aW9uIGdhdXNzX3F1YWRyYXR1cmUoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnYXVzc19xdWFkcmF0dXJlIG5vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbiAgfSxcblxuICBQQ0E6IGZ1bmN0aW9uIFBDQShYKSB7XG4gICAgdmFyIG0gPSBYLmxlbmd0aDtcbiAgICB2YXIgbiA9IFhbMF0ubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaiwgdGVtcDE7XG4gICAgdmFyIHUgPSBbXTtcbiAgICB2YXIgRCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgdGVtcDIgPSBbXTtcbiAgICB2YXIgWSA9IFtdO1xuICAgIHZhciBCdCA9IFtdO1xuICAgIHZhciBCID0gW107XG4gICAgdmFyIEMgPSBbXTtcbiAgICB2YXIgViA9IFtdO1xuICAgIHZhciBWdCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgIHVbaV0gPSBqU3RhdC5zdW0oWFtpXSkgLyBuO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBCW2ldID0gW107XG4gICAgICBmb3IoaiA9IDA7IGogPCBtOyBqKyspIHtcbiAgICAgICAgQltpXVtqXSA9IFhbal1baV0gLSB1W2pdO1xuICAgICAgfVxuICAgIH1cbiAgICBCID0galN0YXQudHJhbnNwb3NlKEIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgIENbaV0gPSBbXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBtOyBqKyspIHtcbiAgICAgICAgQ1tpXVtqXSA9IChqU3RhdC5kb3QoW0JbaV1dLCBbQltqXV0pKSAvIChuIC0gMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IGpTdGF0LmphY29iaShDKTtcbiAgICBWID0gcmVzdWx0WzBdO1xuICAgIEQgPSByZXN1bHRbMV07XG4gICAgVnQgPSBqU3RhdC50cmFuc3Bvc2UoVik7XG4gICAgZm9yIChpID0gMDsgaSA8IEQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAoaiA9IGk7IGogPCBELmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmKERbaV0gPCBEW2pdKSAge1xuICAgICAgICAgIHRlbXAxID0gRFtpXTtcbiAgICAgICAgICBEW2ldID0gRFtqXTtcbiAgICAgICAgICBEW2pdID0gdGVtcDE7XG4gICAgICAgICAgdGVtcDIgPSBWdFtpXTtcbiAgICAgICAgICBWdFtpXSA9IFZ0W2pdO1xuICAgICAgICAgIFZ0W2pdID0gdGVtcDI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgQnQgPSBqU3RhdC50cmFuc3Bvc2UoQik7XG4gICAgZm9yIChpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgWVtpXSA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IEJ0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIFlbaV1bal0gPSBqU3RhdC5kb3QoW1Z0W2ldXSwgW0J0W2pdXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbWCwgRCwgVnQsIFldO1xuICB9XG59KTtcblxuLy8gZXh0ZW5kIGpTdGF0LmZuIHdpdGggbWV0aG9kcyB0aGF0IHJlcXVpcmUgb25lIGFyZ3VtZW50XG4oZnVuY3Rpb24oZnVuY3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykgKGZ1bmN0aW9uKHBhc3NmdW5jKSB7XG4gICAgalN0YXQuZm5bcGFzc2Z1bmNdID0gZnVuY3Rpb24oYXJnLCBmdW5jKSB7XG4gICAgICB2YXIgdG1wdGhpcyA9IHRoaXM7XG4gICAgICAvLyBjaGVjayBmb3IgY2FsbGJhY2tcbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZnVuYy5jYWxsKHRtcHRoaXMsIGpTdGF0LmZuW3Bhc3NmdW5jXS5jYWxsKHRtcHRoaXMsIGFyZykpO1xuICAgICAgICB9LCAxNSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBqU3RhdFtwYXNzZnVuY10odGhpcywgYXJnKSA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBqU3RhdFtwYXNzZnVuY10odGhpcywgYXJnKTtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGpTdGF0KGpTdGF0W3Bhc3NmdW5jXSh0aGlzLCBhcmcpKTtcbiAgICB9O1xuICB9KGZ1bmNzW2ldKSk7XG59KCdhZGQgZGl2aWRlIG11bHRpcGx5IHN1YnRyYWN0IGRvdCBwb3cgZXhwIGxvZyBhYnMgbm9ybSBhbmdsZScuc3BsaXQoJyAnKSkpO1xuXG59KGpTdGF0LCBNYXRoKSk7XG4oZnVuY3Rpb24oalN0YXQsIE1hdGgpIHtcblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgaXNOdW1iZXIgPSBqU3RhdC51dGlscy5pc051bWJlcjtcbnZhciBpc0FycmF5ID0galN0YXQudXRpbHMuaXNBcnJheTtcblxuLy8gZmxhZz09dHJ1ZSBkZW5vdGVzIHVzZSBvZiBzYW1wbGUgc3RhbmRhcmQgZGV2aWF0aW9uXG4vLyBaIFN0YXRpc3RpY3NcbmpTdGF0LmV4dGVuZCh7XG4gIC8vIDIgZGlmZmVyZW50IHBhcmFtZXRlciBsaXN0czpcbiAgLy8gKHZhbHVlLCBtZWFuLCBzZClcbiAgLy8gKHZhbHVlLCBhcnJheSwgZmxhZylcbiAgenNjb3JlOiBmdW5jdGlvbiB6c2NvcmUoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgaWYgKGlzTnVtYmVyKGFyZ3NbMV0pKSB7XG4gICAgICByZXR1cm4gKGFyZ3NbMF0gLSBhcmdzWzFdKSAvIGFyZ3NbMl07XG4gICAgfVxuICAgIHJldHVybiAoYXJnc1swXSAtIGpTdGF0Lm1lYW4oYXJnc1sxXSkpIC8galN0YXQuc3RkZXYoYXJnc1sxXSwgYXJnc1syXSk7XG4gIH0sXG5cbiAgLy8gMyBkaWZmZXJlbnQgcGFyYW10ZXIgbGlzdHM6XG4gIC8vICh2YWx1ZSwgbWVhbiwgc2QsIHNpZGVzKVxuICAvLyAoenNjb3JlLCBzaWRlcylcbiAgLy8gKHZhbHVlLCBhcnJheSwgc2lkZXMsIGZsYWcpXG4gIHp0ZXN0OiBmdW5jdGlvbiB6dGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgejtcbiAgICBpZiAoaXNBcnJheShhcmdzWzFdKSkge1xuICAgICAgLy8gKHZhbHVlLCBhcnJheSwgc2lkZXMsIGZsYWcpXG4gICAgICB6ID0galN0YXQuenNjb3JlKGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzNdKTtcbiAgICAgIHJldHVybiAoYXJnc1syXSA9PT0gMSkgP1xuICAgICAgICAoalN0YXQubm9ybWFsLmNkZigtTWF0aC5hYnMoeiksIDAsIDEpKSA6XG4gICAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC1NYXRoLmFicyh6KSwgMCwgMSkqMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgLy8gKHZhbHVlLCBtZWFuLCBzZCwgc2lkZXMpXG4gICAgICAgIHogPSBqU3RhdC56c2NvcmUoYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0pO1xuICAgICAgICByZXR1cm4gKGFyZ3NbM10gPT09IDEpID9cbiAgICAgICAgICAoalN0YXQubm9ybWFsLmNkZigtTWF0aC5hYnMoeiksMCwxKSkgOlxuICAgICAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC1NYXRoLmFicyh6KSwwLDEpKiAyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICh6c2NvcmUsIHNpZGVzKVxuICAgICAgICB6ID0gYXJnc1swXTtcbiAgICAgICAgcmV0dXJuIChhcmdzWzFdID09PSAxKSA/XG4gICAgICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLU1hdGguYWJzKHopLDAsMSkpIDpcbiAgICAgICAgICAoalN0YXQubm9ybWFsLmNkZigtTWF0aC5hYnMoeiksMCwxKSoyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG5qU3RhdC5leHRlbmQoalN0YXQuZm4sIHtcbiAgenNjb3JlOiBmdW5jdGlvbiB6c2NvcmUodmFsdWUsIGZsYWcpIHtcbiAgICByZXR1cm4gKHZhbHVlIC0gdGhpcy5tZWFuKCkpIC8gdGhpcy5zdGRldihmbGFnKTtcbiAgfSxcblxuICB6dGVzdDogZnVuY3Rpb24genRlc3QodmFsdWUsIHNpZGVzLCBmbGFnKSB7XG4gICAgdmFyIHpzY29yZSA9IE1hdGguYWJzKHRoaXMuenNjb3JlKHZhbHVlLCBmbGFnKSk7XG4gICAgcmV0dXJuIChzaWRlcyA9PT0gMSkgP1xuICAgICAgKGpTdGF0Lm5vcm1hbC5jZGYoLXpzY29yZSwgMCwgMSkpIDpcbiAgICAgIChqU3RhdC5ub3JtYWwuY2RmKC16c2NvcmUsIDAsIDEpICogMik7XG4gIH1cbn0pO1xuXG4vLyBUIFN0YXRpc3RpY3NcbmpTdGF0LmV4dGVuZCh7XG4gIC8vIDIgcGFyYW1ldGVyIGxpc3RzXG4gIC8vICh2YWx1ZSwgbWVhbiwgc2QsIG4pXG4gIC8vICh2YWx1ZSwgYXJyYXkpXG4gIHRzY29yZTogZnVuY3Rpb24gdHNjb3JlKCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHJldHVybiAoYXJncy5sZW5ndGggPT09IDQpID9cbiAgICAgICgoYXJnc1swXSAtIGFyZ3NbMV0pIC8gKGFyZ3NbMl0gLyBNYXRoLnNxcnQoYXJnc1szXSkpKSA6XG4gICAgICAoKGFyZ3NbMF0gLSBqU3RhdC5tZWFuKGFyZ3NbMV0pKSAvXG4gICAgICAgKGpTdGF0LnN0ZGV2KGFyZ3NbMV0sIHRydWUpIC8gTWF0aC5zcXJ0KGFyZ3NbMV0ubGVuZ3RoKSkpO1xuICB9LFxuXG4gIC8vIDMgZGlmZmVyZW50IHBhcmFtdGVyIGxpc3RzOlxuICAvLyAodmFsdWUsIG1lYW4sIHNkLCBuLCBzaWRlcylcbiAgLy8gKHRzY29yZSwgbiwgc2lkZXMpXG4gIC8vICh2YWx1ZSwgYXJyYXksIHNpZGVzKVxuICB0dGVzdDogZnVuY3Rpb24gdHRlc3QoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIHRzY29yZTtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDUpIHtcbiAgICAgIHRzY29yZSA9IE1hdGguYWJzKGpTdGF0LnRzY29yZShhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKSk7XG4gICAgICByZXR1cm4gKGFyZ3NbNF0gPT09IDEpID9cbiAgICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtdHNjb3JlLCBhcmdzWzNdLTEpKSA6XG4gICAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLXRzY29yZSwgYXJnc1szXS0xKSoyKTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKGFyZ3NbMV0pKSB7XG4gICAgICB0c2NvcmUgPSBNYXRoLmFicyhhcmdzWzBdKVxuICAgICAgcmV0dXJuIChhcmdzWzJdID09IDEpID9cbiAgICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtdHNjb3JlLCBhcmdzWzFdLTEpKSA6XG4gICAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLXRzY29yZSwgYXJnc1sxXS0xKSAqIDIpO1xuICAgIH1cbiAgICB0c2NvcmUgPSBNYXRoLmFicyhqU3RhdC50c2NvcmUoYXJnc1swXSwgYXJnc1sxXSkpXG4gICAgcmV0dXJuIChhcmdzWzJdID09IDEpID9cbiAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLXRzY29yZSwgYXJnc1sxXS5sZW5ndGgtMSkpIDpcbiAgICAgIChqU3RhdC5zdHVkZW50dC5jZGYoLXRzY29yZSwgYXJnc1sxXS5sZW5ndGgtMSkgKiAyKTtcbiAgfVxufSk7XG5cbmpTdGF0LmV4dGVuZChqU3RhdC5mbiwge1xuICB0c2NvcmU6IGZ1bmN0aW9uIHRzY29yZSh2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgLSB0aGlzLm1lYW4oKSkgLyAodGhpcy5zdGRldih0cnVlKSAvIE1hdGguc3FydCh0aGlzLmNvbHMoKSkpO1xuICB9LFxuXG4gIHR0ZXN0OiBmdW5jdGlvbiB0dGVzdCh2YWx1ZSwgc2lkZXMpIHtcbiAgICByZXR1cm4gKHNpZGVzID09PSAxKSA/XG4gICAgICAoMSAtIGpTdGF0LnN0dWRlbnR0LmNkZihNYXRoLmFicyh0aGlzLnRzY29yZSh2YWx1ZSkpLCB0aGlzLmNvbHMoKS0xKSkgOlxuICAgICAgKGpTdGF0LnN0dWRlbnR0LmNkZigtTWF0aC5hYnModGhpcy50c2NvcmUodmFsdWUpKSwgdGhpcy5jb2xzKCktMSkqMik7XG4gIH1cbn0pO1xuXG4vLyBGIFN0YXRpc3RpY3NcbmpTdGF0LmV4dGVuZCh7XG4gIC8vIFBhcmFtdGVyIGxpc3QgaXMgYXMgZm9sbG93czpcbiAgLy8gKGFycmF5MSwgYXJyYXkyLCBhcnJheTMsIC4uLilcbiAgLy8gb3IgaXQgaXMgYW4gYXJyYXkgb2YgYXJyYXlzXG4gIC8vIGFycmF5IG9mIGFycmF5cyBjb252ZXJzaW9uXG4gIGFub3ZhZnNjb3JlOiBmdW5jdGlvbiBhbm92YWZzY29yZSgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICBleHBWYXIsIHNhbXBsZSwgc2FtcE1lYW4sIHNhbXBTYW1wTWVhbiwgdG1wYXJncywgdW5leHBWYXIsIGksIGo7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICB0bXBhcmdzID0gbmV3IEFycmF5KGFyZ3NbMF0ubGVuZ3RoKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzWzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRtcGFyZ3NbaV0gPSBhcmdzWzBdW2ldO1xuICAgICAgfVxuICAgICAgYXJncyA9IHRtcGFyZ3M7XG4gICAgfVxuICAgIC8vIEJ1aWxkcyBzYW1wbGUgYXJyYXlcbiAgICBzYW1wbGUgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgc2FtcGxlID0gc2FtcGxlLmNvbmNhdChhcmdzW2ldKTtcbiAgICB9XG4gICAgc2FtcE1lYW4gPSBqU3RhdC5tZWFuKHNhbXBsZSk7XG4gICAgLy8gQ29tcHV0ZXMgdGhlIGV4cGxhaW5lZCB2YXJpYW5jZVxuICAgIGV4cFZhciA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGV4cFZhciA9IGV4cFZhciArIGFyZ3NbaV0ubGVuZ3RoICogTWF0aC5wb3coalN0YXQubWVhbihhcmdzW2ldKSAtIHNhbXBNZWFuLCAyKTtcbiAgICB9XG4gICAgZXhwVmFyIC89IChhcmdzLmxlbmd0aCAtIDEpO1xuICAgIC8vIENvbXB1dGVzIHVuZXhwbGFpbmVkIHZhcmlhbmNlXG4gICAgdW5leHBWYXIgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzYW1wU2FtcE1lYW4gPSBqU3RhdC5tZWFuKGFyZ3NbaV0pO1xuICAgICAgZm9yIChqID0gMDsgaiA8IGFyZ3NbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdW5leHBWYXIgKz0gTWF0aC5wb3coYXJnc1tpXVtqXSAtIHNhbXBTYW1wTWVhbiwgMik7XG4gICAgICB9XG4gICAgfVxuICAgIHVuZXhwVmFyIC89IChzYW1wbGUubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHJldHVybiBleHBWYXIgLyB1bmV4cFZhcjtcbiAgfSxcblxuICAvLyAyIGRpZmZlcmVudCBwYXJhbXRlciBzZXR1cHNcbiAgLy8gKGFycmF5MSwgYXJyYXkyLCBhcnJheTMsIC4uLilcbiAgLy8gKGFub3ZhZnNjb3JlLCBkZjEsIGRmMilcbiAgYW5vdmFmdGVzdDogZnVuY3Rpb24gYW5vdmFmdGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICBkZjEsIGRmMiwgbiwgaTtcbiAgICBpZiAoaXNOdW1iZXIoYXJnc1swXSkpIHtcbiAgICAgIHJldHVybiAxIC0galN0YXQuY2VudHJhbEYuY2RmKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIH1cbiAgICB2YXIgYW5vdmFmc2NvcmUgPSBqU3RhdC5hbm92YWZzY29yZShhcmdzKTtcbiAgICBkZjEgPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgbiA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIG4gPSBuICsgYXJnc1tpXS5sZW5ndGg7XG4gICAgfVxuICAgIGRmMiA9IG4gLSBkZjEgLSAxO1xuICAgIHJldHVybiAxIC0galN0YXQuY2VudHJhbEYuY2RmKGFub3ZhZnNjb3JlLCBkZjEsIGRmMik7XG4gIH0sXG5cbiAgZnRlc3Q6IGZ1bmN0aW9uIGZ0ZXN0KGZzY29yZSwgZGYxLCBkZjIpIHtcbiAgICByZXR1cm4gMSAtIGpTdGF0LmNlbnRyYWxGLmNkZihmc2NvcmUsIGRmMSwgZGYyKTtcbiAgfVxufSk7XG5cbmpTdGF0LmV4dGVuZChqU3RhdC5mbiwge1xuICBhbm92YWZzY29yZTogZnVuY3Rpb24gYW5vdmFmc2NvcmUoKSB7XG4gICAgcmV0dXJuIGpTdGF0LmFub3ZhZnNjb3JlKHRoaXMudG9BcnJheSgpKTtcbiAgfSxcblxuICBhbm92YWZ0ZXM6IGZ1bmN0aW9uIGFub3ZhZnRlcygpIHtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG4gPSBuICsgdGhpc1tpXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBqU3RhdC5mdGVzdCh0aGlzLmFub3ZhZnNjb3JlKCksIHRoaXMubGVuZ3RoIC0gMSwgbiAtIHRoaXMubGVuZ3RoKTtcbiAgfVxufSk7XG5cbi8vIFR1a2V5J3MgcmFuZ2UgdGVzdFxualN0YXQuZXh0ZW5kKHtcbiAgLy8gMiBwYXJhbWV0ZXIgbGlzdHNcbiAgLy8gKG1lYW4xLCBtZWFuMiwgbjEsIG4yLCBzZClcbiAgLy8gKGFycmF5MSwgYXJyYXkyLCBzZClcbiAgcXNjb3JlOiBmdW5jdGlvbiBxc2NvcmUoKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIG1lYW4xLCBtZWFuMiwgbjEsIG4yLCBzZDtcbiAgICBpZiAoaXNOdW1iZXIoYXJnc1swXSkpIHtcbiAgICAgICAgbWVhbjEgPSBhcmdzWzBdO1xuICAgICAgICBtZWFuMiA9IGFyZ3NbMV07XG4gICAgICAgIG4xID0gYXJnc1syXTtcbiAgICAgICAgbjIgPSBhcmdzWzNdO1xuICAgICAgICBzZCA9IGFyZ3NbNF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWVhbjEgPSBqU3RhdC5tZWFuKGFyZ3NbMF0pO1xuICAgICAgICBtZWFuMiA9IGpTdGF0Lm1lYW4oYXJnc1sxXSk7XG4gICAgICAgIG4xID0gYXJnc1swXS5sZW5ndGg7XG4gICAgICAgIG4yID0gYXJnc1sxXS5sZW5ndGg7XG4gICAgICAgIHNkID0gYXJnc1syXTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguYWJzKG1lYW4xIC0gbWVhbjIpIC8gKHNkICogTWF0aC5zcXJ0KCgxIC8gbjEgKyAxIC8gbjIpIC8gMikpO1xuICB9LFxuXG4gIC8vIDMgZGlmZmVyZW50IHBhcmFtZXRlciBsaXN0czpcbiAgLy8gKHFzY29yZSwgbiwgaylcbiAgLy8gKG1lYW4xLCBtZWFuMiwgbjEsIG4yLCBzZCwgbiwgaylcbiAgLy8gKGFycmF5MSwgYXJyYXkyLCBzZCwgbiwgaylcbiAgcXRlc3Q6IGZ1bmN0aW9uIHF0ZXN0KCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgdmFyIHFzY29yZTtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgIHFzY29yZSA9IGFyZ3NbMF07XG4gICAgICBhcmdzID0gYXJncy5zbGljZSgxKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSA3KSB7XG4gICAgICBxc2NvcmUgPSBqU3RhdC5xc2NvcmUoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSk7XG4gICAgICBhcmdzID0gYXJncy5zbGljZSg1KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXNjb3JlID0galN0YXQucXNjb3JlKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMyk7XG4gICAgfVxuXG4gICAgdmFyIG4gPSBhcmdzWzBdO1xuICAgIHZhciBrID0gYXJnc1sxXTtcblxuICAgIHJldHVybiAxIC0galN0YXQudHVrZXkuY2RmKHFzY29yZSwgaywgbiAtIGspO1xuICB9LFxuXG4gIHR1a2V5aHNkOiBmdW5jdGlvbiB0dWtleWhzZChhcnJheXMpIHtcbiAgICB2YXIgc2QgPSBqU3RhdC5wb29sZWRzdGRldihhcnJheXMpO1xuICAgIHZhciBtZWFucyA9IGFycmF5cy5tYXAoZnVuY3Rpb24gKGFycikge3JldHVybiBqU3RhdC5tZWFuKGFycik7fSk7XG4gICAgdmFyIG4gPSBhcnJheXMucmVkdWNlKGZ1bmN0aW9uIChuLCBhcnIpIHtyZXR1cm4gbiArIGFyci5sZW5ndGg7fSwgMCk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IGFycmF5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIHAgPSBqU3RhdC5xdGVzdChtZWFuc1tpXSwgbWVhbnNbal0sIGFycmF5c1tpXS5sZW5ndGgsIGFycmF5c1tqXS5sZW5ndGgsIHNkLCBuLCBhcnJheXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChbW2ksIGpdLCBwXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxufSk7XG5cbi8vIEVycm9yIEJvdW5kc1xualN0YXQuZXh0ZW5kKHtcbiAgLy8gMiBkaWZmZXJlbnQgcGFyYW1ldGVyIHNldHVwc1xuICAvLyAodmFsdWUsIGFscGhhLCBzZCwgbilcbiAgLy8gKHZhbHVlLCBhbHBoYSwgYXJyYXkpXG4gIG5vcm1hbGNpOiBmdW5jdGlvbiBub3JtYWxjaSgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICBhbnMgPSBuZXcgQXJyYXkoMiksXG4gICAgY2hhbmdlO1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgY2hhbmdlID0gTWF0aC5hYnMoalN0YXQubm9ybWFsLmludihhcmdzWzFdIC8gMiwgMCwgMSkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1syXSAvIE1hdGguc3FydChhcmdzWzNdKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZSA9IE1hdGguYWJzKGpTdGF0Lm5vcm1hbC5pbnYoYXJnc1sxXSAvIDIsIDAsIDEpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGpTdGF0LnN0ZGV2KGFyZ3NbMl0pIC8gTWF0aC5zcXJ0KGFyZ3NbMl0ubGVuZ3RoKSk7XG4gICAgfVxuICAgIGFuc1swXSA9IGFyZ3NbMF0gLSBjaGFuZ2U7XG4gICAgYW5zWzFdID0gYXJnc1swXSArIGNoYW5nZTtcbiAgICByZXR1cm4gYW5zO1xuICB9LFxuXG4gIC8vIDIgZGlmZmVyZW50IHBhcmFtZXRlciBzZXR1cHNcbiAgLy8gKHZhbHVlLCBhbHBoYSwgc2QsIG4pXG4gIC8vICh2YWx1ZSwgYWxwaGEsIGFycmF5KVxuICB0Y2k6IGZ1bmN0aW9uIHRjaSgpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICBhbnMgPSBuZXcgQXJyYXkoMiksXG4gICAgY2hhbmdlO1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgY2hhbmdlID0gTWF0aC5hYnMoalN0YXQuc3R1ZGVudHQuaW52KGFyZ3NbMV0gLyAyLCBhcmdzWzNdIC0gMSkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1syXSAvIE1hdGguc3FydChhcmdzWzNdKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZSA9IE1hdGguYWJzKGpTdGF0LnN0dWRlbnR0LmludihhcmdzWzFdIC8gMiwgYXJnc1syXS5sZW5ndGggLSAxKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICBqU3RhdC5zdGRldihhcmdzWzJdLCB0cnVlKSAvIE1hdGguc3FydChhcmdzWzJdLmxlbmd0aCkpO1xuICAgIH1cbiAgICBhbnNbMF0gPSBhcmdzWzBdIC0gY2hhbmdlO1xuICAgIGFuc1sxXSA9IGFyZ3NbMF0gKyBjaGFuZ2U7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICBzaWduaWZpY2FudDogZnVuY3Rpb24gc2lnbmlmaWNhbnQocHZhbHVlLCBhbHBoYSkge1xuICAgIHJldHVybiBwdmFsdWUgPCBhbHBoYTtcbiAgfVxufSk7XG5cbmpTdGF0LmV4dGVuZChqU3RhdC5mbiwge1xuICBub3JtYWxjaTogZnVuY3Rpb24gbm9ybWFsY2kodmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm5vcm1hbGNpKHZhbHVlLCBhbHBoYSwgdGhpcy50b0FycmF5KCkpO1xuICB9LFxuXG4gIHRjaTogZnVuY3Rpb24gdGNpKHZhbHVlLCBhbHBoYSkge1xuICAgIHJldHVybiBqU3RhdC50Y2kodmFsdWUsIGFscGhhLCB0aGlzLnRvQXJyYXkoKSk7XG4gIH1cbn0pO1xuXG4vLyBpbnRlcm5hbCBtZXRob2QgZm9yIGNhbGN1bGF0aW5nIHRoZSB6LXNjb3JlIGZvciBhIGRpZmZlcmVuY2Ugb2YgcHJvcG9ydGlvbnMgdGVzdFxuZnVuY3Rpb24gZGlmZmVyZW5jZU9mUHJvcG9ydGlvbnMocDEsIG4xLCBwMiwgbjIpIHtcbiAgaWYgKHAxID4gMSB8fCBwMiA+IDEgfHwgcDEgPD0gMCB8fCBwMiA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvcG9ydGlvbnMgc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAwIGFuZCBsZXNzIHRoYW4gMVwiKVxuICB9XG4gIHZhciBwb29sZWQgPSAocDEgKiBuMSArIHAyICogbjIpIC8gKG4xICsgbjIpO1xuICB2YXIgc2UgPSBNYXRoLnNxcnQocG9vbGVkICogKDEgLSBwb29sZWQpICogKCgxL24xKSArICgxL24yKSkpO1xuICByZXR1cm4gKHAxIC0gcDIpIC8gc2U7XG59XG5cbi8vIERpZmZlcmVuY2Ugb2YgUHJvcG9ydGlvbnNcbmpTdGF0LmV4dGVuZChqU3RhdC5mbiwge1xuICBvbmVTaWRlZERpZmZlcmVuY2VPZlByb3BvcnRpb25zOiBmdW5jdGlvbiBvbmVTaWRlZERpZmZlcmVuY2VPZlByb3BvcnRpb25zKHAxLCBuMSwgcDIsIG4yKSB7XG4gICAgdmFyIHogPSBkaWZmZXJlbmNlT2ZQcm9wb3J0aW9ucyhwMSwgbjEsIHAyLCBuMik7XG4gICAgcmV0dXJuIGpTdGF0Lnp0ZXN0KHosIDEpO1xuICB9LFxuXG4gIHR3b1NpZGVkRGlmZmVyZW5jZU9mUHJvcG9ydGlvbnM6IGZ1bmN0aW9uIHR3b1NpZGVkRGlmZmVyZW5jZU9mUHJvcG9ydGlvbnMocDEsIG4xLCBwMiwgbjIpIHtcbiAgICB2YXIgeiA9IGRpZmZlcmVuY2VPZlByb3BvcnRpb25zKHAxLCBuMSwgcDIsIG4yKTtcbiAgICByZXR1cm4galN0YXQuenRlc3QoeiwgMik7XG4gIH1cbn0pO1xuXG59KGpTdGF0LCBNYXRoKSk7XG5qU3RhdC5tb2RlbHMgPSAoZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gc3ViX3JlZ3Jlc3MoZXhvZykge1xuICAgIHZhciB2YXJfY291bnQgPSBleG9nWzBdLmxlbmd0aDtcbiAgICB2YXIgbW9kZWxMaXN0ID0galN0YXQuYXJhbmdlKHZhcl9jb3VudCkubWFwKGZ1bmN0aW9uKGVuZG9nX2luZGV4KSB7XG4gICAgICB2YXIgZXhvZ19pbmRleCA9XG4gICAgICAgICAgalN0YXQuYXJhbmdlKHZhcl9jb3VudCkuZmlsdGVyKGZ1bmN0aW9uKGkpe3JldHVybiBpIT09ZW5kb2dfaW5kZXh9KTtcbiAgICAgIHJldHVybiBvbHMoalN0YXQuY29sKGV4b2csIGVuZG9nX2luZGV4KS5tYXAoZnVuY3Rpb24oeCl7IHJldHVybiB4WzBdIH0pLFxuICAgICAgICAgICAgICAgICBqU3RhdC5jb2woZXhvZywgZXhvZ19pbmRleCkpXG4gICAgfSk7XG4gICAgcmV0dXJuIG1vZGVsTGlzdDtcbiAgfVxuXG4gIC8vIGRvIE9MUyBtb2RlbCByZWdyZXNzXG4gIC8vIGV4b2cgaGF2ZSBpbmNsdWRlIGNvbnN0IGNvbHVtbnMgLGl0IHdpbGwgbm90IGdlbmVyYXRlIGl0IC5JbiBmYWN0LCBleG9nIGlzXG4gIC8vIFwiZGVzaWduIG1hdHJpeFwiIGxvb2sgYXRcbiAgLy9odHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZXNpZ25fbWF0cml4XG4gIGZ1bmN0aW9uIG9scyhlbmRvZywgZXhvZykge1xuICAgIHZhciBub2JzID0gZW5kb2cubGVuZ3RoO1xuICAgIHZhciBkZl9tb2RlbCA9IGV4b2dbMF0ubGVuZ3RoIC0gMTtcbiAgICB2YXIgZGZfcmVzaWQgPSBub2JzLWRmX21vZGVsIC0gMTtcbiAgICB2YXIgY29lZiA9IGpTdGF0LmxzdHNxKGV4b2csIGVuZG9nKTtcbiAgICB2YXIgcHJlZGljdCA9XG4gICAgICAgIGpTdGF0Lm11bHRpcGx5KGV4b2csIGNvZWYubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIFt4XSB9KSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24ocCkgeyByZXR1cm4gcFswXSB9KTtcbiAgICB2YXIgcmVzaWQgPSBqU3RhdC5zdWJ0cmFjdChlbmRvZywgcHJlZGljdCk7XG4gICAgdmFyIHliYXIgPSBqU3RhdC5tZWFuKGVuZG9nKTtcbiAgICAvLyBjb25zdGFudCBjYXVzZSBwcm9ibGVtXG4gICAgLy8gdmFyIFNTVCA9IGpTdGF0LnN1bShlbmRvZy5tYXAoZnVuY3Rpb24oeSkge1xuICAgIC8vICAgcmV0dXJuIE1hdGgucG93KHkteWJhciwyKTtcbiAgICAvLyB9KSk7XG4gICAgdmFyIFNTRSA9IGpTdGF0LnN1bShwcmVkaWN0Lm1hcChmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coZiAtIHliYXIsIDIpO1xuICAgIH0pKTtcbiAgICB2YXIgU1NSID0galN0YXQuc3VtKGVuZG9nLm1hcChmdW5jdGlvbih5LCBpKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coeSAtIHByZWRpY3RbaV0sIDIpO1xuICAgIH0pKTtcbiAgICB2YXIgU1NUID0gU1NFICsgU1NSO1xuICAgIHZhciBSMiA9IChTU0UgLyBTU1QpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4b2c6ZXhvZyxcbiAgICAgICAgZW5kb2c6ZW5kb2csXG4gICAgICAgIG5vYnM6bm9icyxcbiAgICAgICAgZGZfbW9kZWw6ZGZfbW9kZWwsXG4gICAgICAgIGRmX3Jlc2lkOmRmX3Jlc2lkLFxuICAgICAgICBjb2VmOmNvZWYsXG4gICAgICAgIHByZWRpY3Q6cHJlZGljdCxcbiAgICAgICAgcmVzaWQ6cmVzaWQsXG4gICAgICAgIHliYXI6eWJhcixcbiAgICAgICAgU1NUOlNTVCxcbiAgICAgICAgU1NFOlNTRSxcbiAgICAgICAgU1NSOlNTUixcbiAgICAgICAgUjI6UjJcbiAgICB9O1xuICB9XG5cbiAgLy8gSDA6IGJfST0wXG4gIC8vIEgxOiBiX0khPTBcbiAgZnVuY3Rpb24gdF90ZXN0KG1vZGVsKSB7XG4gICAgdmFyIHN1Yk1vZGVsTGlzdCA9IHN1Yl9yZWdyZXNzKG1vZGVsLmV4b2cpO1xuICAgIC8vdmFyIHNpZ21hSGF0PWpTdGF0LnN0ZGV2KG1vZGVsLnJlc2lkKTtcbiAgICB2YXIgc2lnbWFIYXQgPSBNYXRoLnNxcnQobW9kZWwuU1NSIC8gKG1vZGVsLmRmX3Jlc2lkKSk7XG4gICAgdmFyIHNlQmV0YUhhdCA9IHN1Yk1vZGVsTGlzdC5tYXAoZnVuY3Rpb24obW9kKSB7XG4gICAgICB2YXIgU1NUID0gbW9kLlNTVDtcbiAgICAgIHZhciBSMiA9IG1vZC5SMjtcbiAgICAgIHJldHVybiBzaWdtYUhhdCAvIE1hdGguc3FydChTU1QgKiAoMSAtIFIyKSk7XG4gICAgfSk7XG4gICAgdmFyIHRTdGF0aXN0aWMgPSBtb2RlbC5jb2VmLm1hcChmdW5jdGlvbihjb2VmLCBpKSB7XG4gICAgICByZXR1cm4gKGNvZWYgLSAwKSAvIHNlQmV0YUhhdFtpXTtcbiAgICB9KTtcbiAgICB2YXIgcFZhbHVlID0gdFN0YXRpc3RpYy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgdmFyIGxlZnRwcGYgPSBqU3RhdC5zdHVkZW50dC5jZGYodCwgbW9kZWwuZGZfcmVzaWQpO1xuICAgICAgcmV0dXJuIChsZWZ0cHBmID4gMC41ID8gMSAtIGxlZnRwcGYgOiBsZWZ0cHBmKSAqIDI7XG4gICAgfSk7XG4gICAgdmFyIGMgPSBqU3RhdC5zdHVkZW50dC5pbnYoMC45NzUsIG1vZGVsLmRmX3Jlc2lkKTtcbiAgICB2YXIgaW50ZXJ2YWw5NSA9IG1vZGVsLmNvZWYubWFwKGZ1bmN0aW9uKGNvZWYsIGkpIHtcbiAgICAgIHZhciBkID0gYyAqIHNlQmV0YUhhdFtpXTtcbiAgICAgIHJldHVybiBbY29lZiAtIGQsIGNvZWYgKyBkXTtcbiAgICB9KVxuICAgIHJldHVybiB7XG4gICAgICAgIHNlOiBzZUJldGFIYXQsXG4gICAgICAgIHQ6IHRTdGF0aXN0aWMsXG4gICAgICAgIHA6IHBWYWx1ZSxcbiAgICAgICAgc2lnbWFIYXQ6IHNpZ21hSGF0LFxuICAgICAgICBpbnRlcnZhbDk1OiBpbnRlcnZhbDk1XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEZfdGVzdChtb2RlbCkge1xuICAgIHZhciBGX3N0YXRpc3RpYyA9XG4gICAgICAgIChtb2RlbC5SMiAvIG1vZGVsLmRmX21vZGVsKSAvICgoMSAtIG1vZGVsLlIyKSAvIG1vZGVsLmRmX3Jlc2lkKTtcbiAgICB2YXIgZmNkZiA9IGZ1bmN0aW9uKHgsIG4xLCBuMikge1xuICAgICAgcmV0dXJuIGpTdGF0LmJldGEuY2RmKHggLyAobjIgLyBuMSArIHgpLCBuMSAvIDIsIG4yIC8gMilcbiAgICB9XG4gICAgdmFyIHB2YWx1ZSA9IDEgLSBmY2RmKEZfc3RhdGlzdGljLCBtb2RlbC5kZl9tb2RlbCwgbW9kZWwuZGZfcmVzaWQpO1xuICAgIHJldHVybiB7IEZfc3RhdGlzdGljOiBGX3N0YXRpc3RpYywgcHZhbHVlOiBwdmFsdWUgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9sc193cmFwKGVuZG9nLCBleG9nKSB7XG4gICAgdmFyIG1vZGVsID0gb2xzKGVuZG9nLGV4b2cpO1xuICAgIHZhciB0dGVzdCA9IHRfdGVzdChtb2RlbCk7XG4gICAgdmFyIGZ0ZXN0ID0gRl90ZXN0KG1vZGVsKTtcbiAgICAvLyBQcm92aWRlIHRoZSBXaGVycnkgLyBFemVraWVsIC8gTWNOZW1hciAvIENvaGVuIEFkanVzdGVkIFJeMlxuICAgIC8vIFdoaWNoIG1hdGNoZXMgdGhlICdhZGp1c3RlZCBSXjInIHByb3ZpZGVkIGJ5IFIncyBsbSBwYWNrYWdlXG4gICAgdmFyIGFkanVzdF9SMiA9XG4gICAgICAgIDEgLSAoMSAtIG1vZGVsLlIyKSAqICgobW9kZWwubm9icyAtIDEpIC8gKG1vZGVsLmRmX3Jlc2lkKSk7XG4gICAgbW9kZWwudCA9IHR0ZXN0O1xuICAgIG1vZGVsLmYgPSBmdGVzdDtcbiAgICBtb2RlbC5hZGp1c3RfUjIgPSBhZGp1c3RfUjI7XG4gICAgcmV0dXJuIG1vZGVsO1xuICB9XG5cbiAgcmV0dXJuIHsgb2xzOiBvbHNfd3JhcCB9O1xufSkoKTtcbi8vVG8gcmVncmVzcywgc2ltcGx5IGJ1aWxkIFggbWF0cml4XG4vLyhhcHBlbmQgY29sdW1uIG9mIDEncykgdXNpbmdcbi8vYnVpbGR4bWF0cml4IGFuZCBidWlsZCB0aGUgWVxuLy9tYXRyaXggdXNpbmcgYnVpbGR5bWF0cml4XG4vLyhzaW1wbHkgdGhlIHRyYW5zcG9zZSlcbi8vYW5kIHJ1biByZWdyZXNzLlxuXG5cblxuLy9SZWdyZXNzaW9uc1xuXG5qU3RhdC5leHRlbmQoe1xuICBidWlsZHhtYXRyaXg6IGZ1bmN0aW9uIGJ1aWxkeG1hdHJpeCgpe1xuICAgIC8vUGFyYW1ldGVycyB3aWxsIGJlIHBhc3NlZCBpbiBhcyBzdWNoXG4gICAgLy8oYXJyYXkxLGFycmF5MixhcnJheTMsLi4uKVxuICAgIC8vYXMgKHgxLHgyLHgzLC4uLilcbiAgICAvL25lZWRzIHRvIGJlICgxLHgxLHgyLHgzLC4uLilcbiAgICB2YXIgbWF0cml4Um93cyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IodmFyIGk9MDtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXtcbiAgICAgIHZhciBhcnJheSA9IFsxXTtcbiAgICAgIG1hdHJpeFJvd3NbaV09IGFycmF5LmNvbmNhdChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQobWF0cml4Um93cyk7XG5cbiAgfSxcblxuICBidWlsZGR4bWF0cml4OiBmdW5jdGlvbiBidWlsZGR4bWF0cml4KCkge1xuICAgIC8vUGFyYW10ZXJzIHdpbGwgYmUgcGFzc2VkIGluIGFzIHN1Y2hcbiAgICAvLyhbYXJyYXkxLGFycmF5MiwuLi5dXG4gICAgdmFyIG1hdHJpeFJvd3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzWzBdLmxlbmd0aCk7XG4gICAgZm9yKHZhciBpPTA7aTxhcmd1bWVudHNbMF0ubGVuZ3RoO2krKyl7XG4gICAgICB2YXIgYXJyYXkgPSBbMV1cbiAgICAgIG1hdHJpeFJvd3NbaV09IGFycmF5LmNvbmNhdChhcmd1bWVudHNbMF1baV0pO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQobWF0cml4Um93cyk7XG5cbiAgfSxcblxuICBidWlsZGp4bWF0cml4OiBmdW5jdGlvbiBidWlsZGp4bWF0cml4KGpNYXQpIHtcbiAgICAvL0J1aWxkcyBmcm9tIGpTdGF0IE1hdHJpeFxuICAgIHZhciBwYXNzID0gbmV3IEFycmF5KGpNYXQubGVuZ3RoKVxuICAgIGZvcih2YXIgaT0wO2k8ak1hdC5sZW5ndGg7aSsrKXtcbiAgICAgIHBhc3NbaV0gPSBqTWF0W2ldO1xuICAgIH1cbiAgICByZXR1cm4galN0YXQuYnVpbGRkeG1hdHJpeChwYXNzKTtcblxuICB9LFxuXG4gIGJ1aWxkeW1hdHJpeDogZnVuY3Rpb24gYnVpbGR5bWF0cml4KGFycmF5KXtcbiAgICByZXR1cm4galN0YXQoYXJyYXkpLnRyYW5zcG9zZSgpO1xuICB9LFxuXG4gIGJ1aWxkanltYXRyaXg6IGZ1bmN0aW9uIGJ1aWxkanltYXRyaXgoak1hdCl7XG4gICAgcmV0dXJuIGpNYXQudHJhbnNwb3NlKCk7XG4gIH0sXG5cbiAgbWF0cml4bXVsdDogZnVuY3Rpb24gbWF0cml4bXVsdChBLEIpe1xuICAgIHZhciBpLCBqLCBrLCByZXN1bHQsIHN1bTtcbiAgICBpZiAoQS5jb2xzKCkgPT0gQi5yb3dzKCkpIHtcbiAgICAgIGlmKEIucm93cygpPjEpe1xuICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IEEucm93cygpOyBpKyspIHtcbiAgICAgICAgICByZXN1bHRbaV0gPSBbXTtcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgQi5jb2xzKCk7IGorKykge1xuICAgICAgICAgICAgc3VtID0gMDtcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBBLmNvbHMoKTsgaysrKSB7XG4gICAgICAgICAgICAgIHN1bSArPSBBLnRvQXJyYXkoKVtpXVtrXSAqIEIudG9BcnJheSgpW2tdW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W2ldW2pdID0gc3VtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4galN0YXQocmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IEEucm93cygpOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBCLmNvbHMoKTsgaisrKSB7XG4gICAgICAgICAgc3VtID0gMDtcbiAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgQS5jb2xzKCk7IGsrKykge1xuICAgICAgICAgICAgc3VtICs9IEEudG9BcnJheSgpW2ldW2tdICogQi50b0FycmF5KClbal07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdFtpXVtqXSA9IHN1bTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGpTdGF0KHJlc3VsdCk7XG4gICAgfVxuICB9LFxuXG4gIC8vcmVncmVzcyBhbmQgcmVncmVzc3QgdG8gYmUgZml4ZWRcblxuICByZWdyZXNzOiBmdW5jdGlvbiByZWdyZXNzKGpNYXRYLGpNYXRZKXtcbiAgICAvL3ByaW50KFwicmVncmVzc2luIVwiKTtcbiAgICAvL3ByaW50KGpNYXRYLnRvQXJyYXkoKSk7XG4gICAgdmFyIGlubmVyaW52ID0galN0YXQueHRyYW5zcHhpbnYoak1hdFgpO1xuICAgIC8vcHJpbnQoaW5uZXJpbnYpO1xuICAgIHZhciB4dHJhbnNwID0gak1hdFgudHJhbnNwb3NlKCk7XG4gICAgdmFyIG5leHQgPSBqU3RhdC5tYXRyaXhtdWx0KGpTdGF0KGlubmVyaW52KSx4dHJhbnNwKTtcbiAgICByZXR1cm4galN0YXQubWF0cml4bXVsdChuZXh0LGpNYXRZKTtcblxuICB9LFxuXG4gIHJlZ3Jlc3N0OiBmdW5jdGlvbiByZWdyZXNzdChqTWF0WCxqTWF0WSxzaWRlcyl7XG4gICAgdmFyIGJldGEgPSBqU3RhdC5yZWdyZXNzKGpNYXRYLGpNYXRZKTtcblxuICAgIHZhciBjb21waWxlID0ge307XG4gICAgY29tcGlsZS5hbm92YSA9IHt9O1xuICAgIHZhciBqTWF0WUJhciA9IGpTdGF0LmpNYXRZQmFyKGpNYXRYLCBiZXRhKTtcbiAgICBjb21waWxlLnlCYXIgPSBqTWF0WUJhcjtcbiAgICB2YXIgeUF2ZXJhZ2UgPSBqTWF0WS5tZWFuKCk7XG4gICAgY29tcGlsZS5hbm92YS5yZXNpZHVhbHMgPSBqU3RhdC5yZXNpZHVhbHMoak1hdFksIGpNYXRZQmFyKTtcblxuICAgIGNvbXBpbGUuYW5vdmEuc3NyID0galN0YXQuc3NyKGpNYXRZQmFyLCB5QXZlcmFnZSk7XG4gICAgY29tcGlsZS5hbm92YS5tc3IgPSBjb21waWxlLmFub3ZhLnNzciAvIChqTWF0WFswXS5sZW5ndGggLSAxKTtcblxuICAgIGNvbXBpbGUuYW5vdmEuc3NlID0galN0YXQuc3NlKGpNYXRZLCBqTWF0WUJhcik7XG4gICAgY29tcGlsZS5hbm92YS5tc2UgPVxuICAgICAgICBjb21waWxlLmFub3ZhLnNzZSAvIChqTWF0WS5sZW5ndGggLSAoak1hdFhbMF0ubGVuZ3RoIC0gMSkgLSAxKTtcblxuICAgIGNvbXBpbGUuYW5vdmEuc3N0ID0galN0YXQuc3N0KGpNYXRZLCB5QXZlcmFnZSk7XG4gICAgY29tcGlsZS5hbm92YS5tc3QgPSBjb21waWxlLmFub3ZhLnNzdCAvIChqTWF0WS5sZW5ndGggLSAxKTtcblxuICAgIGNvbXBpbGUuYW5vdmEucjIgPSAxIC0gKGNvbXBpbGUuYW5vdmEuc3NlIC8gY29tcGlsZS5hbm92YS5zc3QpO1xuICAgIGlmIChjb21waWxlLmFub3ZhLnIyIDwgMCkgY29tcGlsZS5hbm92YS5yMiA9IDA7XG5cbiAgICBjb21waWxlLmFub3ZhLmZyYXRpbyA9IGNvbXBpbGUuYW5vdmEubXNyIC8gY29tcGlsZS5hbm92YS5tc2U7XG4gICAgY29tcGlsZS5hbm92YS5wdmFsdWUgPVxuICAgICAgICBqU3RhdC5hbm92YWZ0ZXN0KGNvbXBpbGUuYW5vdmEuZnJhdGlvLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGpNYXRYWzBdLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgak1hdFkubGVuZ3RoIC0gKGpNYXRYWzBdLmxlbmd0aCAtIDEpIC0gMSk7XG5cbiAgICBjb21waWxlLmFub3ZhLnJtc2UgPSBNYXRoLnNxcnQoY29tcGlsZS5hbm92YS5tc2UpO1xuXG4gICAgY29tcGlsZS5hbm92YS5yMmFkaiA9IDEgLSAoY29tcGlsZS5hbm92YS5tc2UgLyBjb21waWxlLmFub3ZhLm1zdCk7XG4gICAgaWYgKGNvbXBpbGUuYW5vdmEucjJhZGogPCAwKSBjb21waWxlLmFub3ZhLnIyYWRqID0gMDtcblxuICAgIGNvbXBpbGUuc3RhdHMgPSBuZXcgQXJyYXkoak1hdFhbMF0ubGVuZ3RoKTtcbiAgICB2YXIgY292YXIgPSBqU3RhdC54dHJhbnNweGludihqTWF0WCk7XG4gICAgdmFyIHNkcywgdHMsIHBzO1xuXG4gICAgZm9yKHZhciBpPTA7IGk8YmV0YS5sZW5ndGg7aSsrKXtcbiAgICAgIHNkcz1NYXRoLnNxcnQoY29tcGlsZS5hbm92YS5tc2UgKiBNYXRoLmFicyhjb3ZhcltpXVtpXSkpO1xuICAgICAgdHM9IE1hdGguYWJzKGJldGFbaV0gLyBzZHMpO1xuICAgICAgcHM9IGpTdGF0LnR0ZXN0KHRzLCBqTWF0WS5sZW5ndGggLSBqTWF0WFswXS5sZW5ndGggLSAxLCBzaWRlcyk7XG5cbiAgICAgIGNvbXBpbGUuc3RhdHNbaV09W2JldGFbaV0sIHNkcywgdHMsIHBzXTtcbiAgICB9XG5cbiAgICBjb21waWxlLnJlZ3Jlc3MgPSBiZXRhO1xuICAgIHJldHVybiBjb21waWxlO1xuICB9LFxuXG4gIHh0cmFuc3B4OiBmdW5jdGlvbiB4dHJhbnNweChqTWF0WCl7XG4gICAgcmV0dXJuIGpTdGF0Lm1hdHJpeG11bHQoak1hdFgudHJhbnNwb3NlKCksak1hdFgpO1xuICB9LFxuXG5cbiAgeHRyYW5zcHhpbnY6IGZ1bmN0aW9uIHh0cmFuc3B4aW52KGpNYXRYKXtcbiAgICB2YXIgaW5uZXIgPSBqU3RhdC5tYXRyaXhtdWx0KGpNYXRYLnRyYW5zcG9zZSgpLGpNYXRYKTtcbiAgICB2YXIgaW5uZXJpbnYgPSBqU3RhdC5pbnYoaW5uZXIpO1xuICAgIHJldHVybiBpbm5lcmludjtcbiAgfSxcblxuICBqTWF0WUJhcjogZnVuY3Rpb24gak1hdFlCYXIoak1hdFgsIGJldGEpIHtcbiAgICB2YXIgeUJhciA9IGpTdGF0Lm1hdHJpeG11bHQoak1hdFgsIGJldGEpO1xuICAgIHJldHVybiBuZXcgalN0YXQoeUJhcik7XG4gIH0sXG5cbiAgcmVzaWR1YWxzOiBmdW5jdGlvbiByZXNpZHVhbHMoak1hdFksIGpNYXRZQmFyKSB7XG4gICAgcmV0dXJuIGpTdGF0Lm1hdHJpeHN1YnRyYWN0KGpNYXRZLCBqTWF0WUJhcik7XG4gIH0sXG5cbiAgc3NyOiBmdW5jdGlvbiBzc3Ioak1hdFlCYXIsIHlBdmVyYWdlKSB7XG4gICAgdmFyIHNzciA9IDA7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGpNYXRZQmFyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzc3IgKz0gTWF0aC5wb3coak1hdFlCYXJbaV0gLSB5QXZlcmFnZSwgMik7XG4gICAgfVxuICAgIHJldHVybiBzc3I7XG4gIH0sXG5cbiAgc3NlOiBmdW5jdGlvbiBzc2Uoak1hdFksIGpNYXRZQmFyKSB7XG4gICAgdmFyIHNzZSA9IDA7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGpNYXRZLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzc2UgKz0gTWF0aC5wb3coak1hdFlbaV0gLSBqTWF0WUJhcltpXSwgMik7XG4gICAgfVxuICAgIHJldHVybiBzc2U7XG4gIH0sXG5cbiAgc3N0OiBmdW5jdGlvbiBzc3Qoak1hdFksIHlBdmVyYWdlKSB7XG4gICAgdmFyIHNzdCA9IDA7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGpNYXRZLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzc3QgKz0gTWF0aC5wb3coak1hdFlbaV0gLSB5QXZlcmFnZSwgMik7XG4gICAgfVxuICAgIHJldHVybiBzc3Q7XG4gIH0sXG5cbiAgbWF0cml4c3VidHJhY3Q6IGZ1bmN0aW9uIG1hdHJpeHN1YnRyYWN0KEEsQil7XG4gICAgdmFyIGFucyA9IG5ldyBBcnJheShBLmxlbmd0aCk7XG4gICAgZm9yKHZhciBpPTA7aTxBLmxlbmd0aDtpKyspe1xuICAgICAgYW5zW2ldID0gbmV3IEFycmF5KEFbaV0ubGVuZ3RoKTtcbiAgICAgIGZvcih2YXIgaj0wO2o8QVtpXS5sZW5ndGg7aisrKXtcbiAgICAgICAgYW5zW2ldW2pdPUFbaV1bal0tQltpXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGpTdGF0KGFucyk7XG4gIH1cbn0pO1xuICAvLyBNYWtlIGl0IGNvbXBhdGlibGUgd2l0aCBwcmV2aW91cyB2ZXJzaW9uLlxuICBqU3RhdC5qU3RhdCA9IGpTdGF0O1xuXG4gIHJldHVybiBqU3RhdDtcbn0pO1xuIiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gJy4vVmVjdG9yMic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FudmFzSGVscGVyXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgc2hhcmVkQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRHJhd0NpcmNsZShwb3NpdGlvbjogVmVjdG9yMiwgcmFkaW91czogbnVtYmVyLCBjb2xvcjogc3RyaW5nID0gXCJ3aGl0ZVwiLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICBsZXQgb3JpZ2luYWxGaWxsU3R5bGUgPSBjb250ZXh0LmZpbGxTdHlsZTtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGNvbnRleHQuYXJjKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHJhZGlvdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IG9yaWdpbmFsRmlsbFN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRHJhd0xpbmUoZnJvbTogVmVjdG9yMiwgdG86IFZlY3RvcjIsIHRoaWNrbmVzczogbnVtYmVyLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICBsZXQgb3JpZ2luYWxMaW5lV2lkdGggPSBjb250ZXh0LmxpbmVXaWR0aDtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSB0aGlja25lc3M7XHJcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0Lm1vdmVUbyhmcm9tLngsIGZyb20ueSk7XHJcbiAgICAgICAgY29udGV4dC5saW5lVG8odG8ueCwgdG8ueSk7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBvcmlnaW5hbExpbmVXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERyYXdUZXh0KHRleHQ6IHN0cmluZywgcG9zaXRpb246IFZlY3RvcjIsIHNpemU6IG51bWJlciwgdGV4dEFsaWduOiBDYW52YXNUZXh0QWxpZ24gPSBcImxlZnRcIiwgZm9udDogc3RyaW5nID0gXCJzYW5zLXNlcmlmXCIsIGNvbG9yOiBzdHJpbmcgPSBcImJsYWNrXCIsIG1vZDogc3RyaW5nID0gXCJcIiwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gQ2FudmFzSGVscGVyLnNoYXJlZENvbnRleHQpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWxsU3R5bGUgPSBjb250ZXh0LmZpbGxTdHlsZTtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbEZvbnQgPSBjb250ZXh0LmZvbnQ7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0QWxpZ24gPSBjb250ZXh0LnRleHRBbGlnbjtcclxuXHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSAobW9kID09PSBcIlwiID8gXCJcIiA6IG1vZCArICcgJykgKyBzaXplLnRvU3RyaW5nKCkgKyBcInB4IFwiICsgZm9udDtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IHRleHRBbGlnbjtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IG9yaWdpbmFsRmlsbFN0eWxlO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IG9yaWdpbmFsRm9udDtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IG9yaWdpbmFsVGV4dEFsaWduO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuL1ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgQ2FudmFzSGVscGVyIH0gZnJvbSBcIi4vQ2FudmFzSGVscGVyXCI7XHJcblxyXG50eXBlIG9mZnNldCA9IHsgdmFsdWU6IG51bWJlcjsgfTtcclxuZXhwb3J0IHR5cGUgTWF0cml4Um93cyA9IEFycmF5PEFycmF5PG51bWJlcj4+O1xyXG5leHBvcnQgY29uc3QgTWF0cml4Um93cyA9IGNsYXNzIGV4dGVuZHMgQXJyYXk8QXJyYXk8bnVtYmVyPj4geyB9O1xyXG5cclxuZXhwb3J0IGVudW0gU2lkZSB7IGFib3ZlLCB1bmRlciwgbGVmdCwgcmlnaHQgfVxyXG5cclxuLyoqIENsYXNzIHJlcHJlc2VudGluZyBhIG1hdHJpeCAqL1xyXG5leHBvcnQgY2xhc3MgTWF0cml4XHJcbntcclxuICAgIC8vI3JlZ2lvbiBjb25maWdcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2VsbFBpeGVsU2l6ZTogbnVtYmVyID0gNDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxhYmVsUGl4ZWxNYXJnaW46IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1hdHJpeFBpeGVsTWFyZ2luOiBudW1iZXIgPSAxMjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2VsbENvbnRlbnRGb250OiBzdHJpbmcgPSBcIjExcHggc2Fucy1zZXJpZlwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBsYWJlbEZvbnQ6IHN0cmluZyA9IFwiYm9sZCAxNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8qKiBOdW1iZXJzIGNvbnRhaW5lZCBpbiBtYXRyaXguIEFjY2VzcyB0aGVtIGxpa2UgbnVtYmVyc1tyb3ddW2NvbHVtbl0gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBudW1iZXJzOiBSZWFkb25seUFycmF5PFJlYWRvbmx5QXJyYXk8bnVtYmVyPj47XHJcbiAgICAvKiBsaWtlIHRoaXM6XHJcbiAgICBbMCwwXVswLDFdWzAsMl1cclxuICAgIFsxLDBdWzEsMV1bMSwyXVxyXG4gICAgWzIsMF1bMiwxXVsyLDJdXHJcbiAgICAqL1xyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gcHJvcGVydGllc1xyXG5cclxuICAgIC8qKiBOdW1iZXIgb2Ygcm93cyBpbiB0aGlzIG1hdHJpeCAqL1xyXG4gICAgcHVibGljIGdldCBSb3dOdW1iZXIoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubnVtYmVycy5sZW5ndGg7IH1cclxuICAgIFxyXG4gICAgLyoqIE51bWJlciBvZiBjb2x1bW5zIGluIHRoaXMgbWF0cml4ICovXHJcbiAgICBwdWJsaWMgZ2V0IENvbHVtbk51bWJlcigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5udW1iZXJzWzBdLmxlbmd0aDsgfVxyXG5cclxuICAgIC8qKiBJcyB0aGlzIG1hdHJpeCBzcXVhcmU/ICovXHJcbiAgICBwdWJsaWMgZ2V0IElzU3F1YXJlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5Sb3dOdW1iZXIgPT0gdGhpcy5Db2x1bW5OdW1iZXI7IH1cclxuXHJcbiAgICAvKiogTnVtYmVyIG9mIHBpeGVscyB0aGlzIG1hdHJpeCB0YWtlcyBvbiB5IGF4aXMgb2YgY2FudmFzIHdoZW4gZHJhd24gdXNpbmcgdGhpcy5EcmF3ICovXHJcbiAgICBwdWJsaWMgZ2V0IFBpeGVsV2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuQ29sdW1uTnVtYmVyICogTWF0cml4LmNlbGxQaXhlbFNpemU7IH1cclxuXHJcbiAgICAvKiogTnVtYmVyIG9mIHBpeGVscyB0aGlzIG1hdHJpeCB0YWtlcyBvbiB4IGF4aXMgb2YgY2FudmFzIHdoZW4gZHJhd24gdXNpbmcgdGhpcy5EcmF3ICovXHJcbiAgICBwdWJsaWMgZ2V0IFBpeGVsSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiAodGhpcy5Sb3dOdW1iZXIgKiBNYXRyaXguY2VsbFBpeGVsU2l6ZSkgKyAgTWF0cml4LmxhYmVsUGl4ZWxNYXJnaW59XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgcHJpdmF0ZSBfbGFzdERyYXdQb3NpdGlvbjogVmVjdG9yMiA9IG51bGw7XHJcbiAgICBcclxuICAgIC8qKiBMYXN0IHBvc2l0aW9uIG9uIHdoaWNoIHRoaXMgTWF0cml4IHdhcyBkcmF3bi4gTnVsbCBpZiBpdCB3YXNudCBkcmF3biB5ZXQgKi9cclxuICAgIHB1YmxpYyBnZXQgTGFzdERyYXdQb3NpdGlvbigpOiBWZWN0b3IyIHsgcmV0dXJuIHRoaXMuX2xhc3REcmF3UG9zaXRpb247IH1cclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93czogTWF0cml4Um93cylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBjb2x1bW5OdW1iZXI6IG51bWJlciA9IHJvd3NbMF0ubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IHJvd3NDb3B5OiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3Mocm93cy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCByb3dzLmxlbmd0aDsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzQ29weVtyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oY29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgaWYgKHJvd3Nbcm93XS5sZW5ndGggIT0gY29sdW1uTnVtYmVyKSB0aHJvdyBFcnJvcihcIkluY29uc2lzdGVudCBjb2x1bW4gbnVtYmVyIGJldHdlZW4gcm93cyBpbiBhIG1hdHJpeFwiKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGNvbHVtbk51bWJlcjsgY29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvd3NDb3B5W3Jvd11bY29sXSA9IHJvd3Nbcm93XVtjb2xdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd3Nbcm93XVtjb2xdID09IHVuZGVmaW5lZCB8fCByb3dzW3Jvd11bY29sXSA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGNvbnRlbnQgaW4gbWF0cml4IGNhbid0IGJlIG51bGwvdW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubnVtYmVycyA9IHJvd3NDb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEcmF3cyB0aGlzIG1hdHJpeCBvbiBIVE1MIGNhbnZhcyB1c2luZyBwcm92aWRlZCByZW5kZXJpbmcgY29udGV4dCBhbmQgcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBwb3NpdGlvbiB3aGVyZSBkcmF3aW5nIHN0YXJ0cyAodXBwZXIgbGVmdCBjb3JuZXIpXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwgb3B0aW9uYWwgbGFiZWwgZGlzcGxheWVkIGFib3ZlIHRoaXMgbWF0cml4XHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBjYW52YXMgY29udGV4dCB1c2VkIHRvIGRyYXcgdGhpcyBtYXRyaXhcclxuICAgICovXHJcbiAgICBwdWJsaWMgRHJhdyhwb3NpdGlvbjogVmVjdG9yMiwgbGFiZWw6IHN0cmluZyA9IFwiXCIsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0KTogdm9pZFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dEFsaWduOiBDYW52YXNUZXh0QWxpZ24gPSBjb250ZXh0LnRleHRBbGlnbjtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbEZvbnQ6IHN0cmluZyA9IGNvbnRleHQuZm9udDtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gTWF0cml4LmNlbGxDb250ZW50Rm9udDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93TnVtID0gMDsgcm93TnVtIDwgdGhpcy5udW1iZXJzLmxlbmd0aDsgcm93TnVtKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3Qgcm93OiBSZWFkb25seUFycmF5PG51bWJlcj4gPSB0aGlzLm51bWJlcnNbcm93TnVtXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sTnVtID0gMDsgY29sTnVtIDwgcm93Lmxlbmd0aDsgY29sTnVtKyspIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsOiBudW1iZXIgPSByb3dbY29sTnVtXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxQb3NpdGlvbjogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uLnggKyAoTWF0cml4LmNlbGxQaXhlbFNpemUgKiBjb2xOdW0pLCBwb3NpdGlvbi55ICsgKE1hdHJpeC5jZWxsUGl4ZWxTaXplICogcm93TnVtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQucmVjdChjZWxsUG9zaXRpb24ueCwgY2VsbFBvc2l0aW9uLnksIE1hdHJpeC5jZWxsUGl4ZWxTaXplLCBNYXRyaXguY2VsbFBpeGVsU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChwYXJzZUZsb2F0KGNlbGwudG9GaXhlZCgzKSkudG9TdHJpbmcoKSwgY2VsbFBvc2l0aW9uLnggKyAoTWF0cml4LmNlbGxQaXhlbFNpemUgLyAyKSwgY2VsbFBvc2l0aW9uLnkgKyAoTWF0cml4LmNlbGxQaXhlbFNpemUgLyAyKSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFiZWwgIT09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwibGVmdFwiO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZvbnQgPSBNYXRyaXgubGFiZWxGb250O1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGxhYmVsLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55IC0gTWF0cml4LmxhYmVsUGl4ZWxNYXJnaW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBvcmlnaW5hbFRleHRBbGlnbjtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBvcmlnaW5hbEZvbnQ7XHJcbiAgICAgICAgdGhpcy5fbGFzdERyYXdQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEcmF3cyB0aGlzIG1hdHJpeCBuZXh0IHRvIHdoZXJlIG90aGVyIG1hdHJpeCB3YXMgbGFzdCBkcmF3biwgbWFraW5nIHN1cmUgdGhhdCB0aGV5IHdvbid0IG92ZXJsYXBcclxuICAgICAqIEBwYXJhbSBtYXRyaXggbWF0cml4IG5leHQgdG8gd2hpY2ggdGhpcyBtYXRyaXggd2lsbCBiZSBkcmF3blxyXG4gICAgICogQHBhcmFtIHNpZGUgb24gd2hpY2ggc2lkZSBvZiBwcm92aWRlZCBtYXRyaXggdGhpcyBtYXRyaWMgc2hvdWxkIGJlIGRyYXduXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwgb3B0aW9uYWwgbGFiZWwgZGlzcGxheWVkIGFib3ZlIHRoaXMgbWF0cml4XHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBjYW52YXMgY29udGV4dCB1c2VkIHRvIGRyYXcgdGhpcyBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIERyYXdOZXh0VG8obWF0cml4OiBNYXRyaXgsIHNpZGU6IFNpZGUsIGxhYmVsOiBzdHJpbmcgPSBcIlwiLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dClcclxuICAgIHtcclxuICAgICAgICBpZiAobWF0cml4Lkxhc3REcmF3UG9zaXRpb24gPT0gbnVsbCkgdGhyb3cgRXJyb3IoXCJDYW4ndCBkcmF3IG5leHQgdG8gbWF0cml4IHRoYXQgd2Fzbid0IGRyYXduIHlldFwiKTtcclxuXHJcbiAgICAgICAgbGV0IHBvc2l0aW9uOiBWZWN0b3IyO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHNpZGUpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBTaWRlLmFib3ZlOlxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBuZXcgVmVjdG9yMihtYXRyaXguTGFzdERyYXdQb3NpdGlvbi54LCBtYXRyaXguTGFzdERyYXdQb3NpdGlvbi55IC0gdGhpcy5QaXhlbEhlaWdodCAtIChNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4gKiAxLjUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNpZGUudW5kZXI6XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLngsIG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLnkgKyBtYXRyaXguUGl4ZWxIZWlnaHQgKyAoTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luICogMS41KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTaWRlLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLnggLSB0aGlzLlBpeGVsV2lkdGggLSBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4sIG1hdHJpeC5MYXN0RHJhd1Bvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2lkZS5yaWdodDpcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjIobWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueCArIG1hdHJpeC5QaXhlbFdpZHRoICsgTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luLCBtYXRyaXguTGFzdERyYXdQb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBzaWRlIHZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkRyYXcocG9zaXRpb24sIGxhYmVsLCBjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUm93TnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gJ1snO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuQ29sdW1uTnVtYmVyOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLm51bWJlcnNbaV1bal0gKyAoKGogKzEgPCB0aGlzLkNvbHVtbk51bWJlcikgPyAnOycgOiAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ICs9ICddJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyNyZWdpb24gZnJvbSBzdHJpbmdcclxuXHJcbiAgICAvKiogUmV0dXJucyBNYXRyaXggY3JlYXRlZCBmcm9tIHN0cmluZyBmcm9tYXRlZCBsaWtlIFwiWzEsMiwzXVs0LDUsNl1bNyw4LDldXCIgb3IgbnVsbCBpZiBzdHJpbmcgaXMgbm90IGEgdmFsaWQgbWF0cml4ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZyb21TdHJpbmcoaW5wdXQ6IHN0cmluZyk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGggPD0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygpO1xyXG5cclxuICAgICAgICBjb25zdCBvZmZzZXQ6IG9mZnNldCA9IHsgdmFsdWU6IDAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKG9mZnNldC52YWx1ZSA8IGlucHV0Lmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLlJlYWRSb3coaW5wdXQsIG9mZnNldCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbk51bWJlcjogbnVtYmVyID0gcm93c1swXS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChjb2x1bW5OdW1iZXIgPD0gMCkgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3MuZm9yRWFjaChyb3cgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5sZW5ndGggIT0gY29sdW1uTnVtYmVyKSBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByb3cuZm9yRWFjaCh2YWx1ZSA9PiB7IGlmIChpc05hTih2YWx1ZSkpIGlzVmFsaWQgPSBmYWxzZTsgfSk7XHJcbiAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQgPyBuZXcgTWF0cml4KHJvd3MpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBSZWFkUm93KGlucHV0OiBzdHJpbmcsIG9mZnNldDogb2Zmc2V0KTogQXJyYXk8bnVtYmVyPlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvdzogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgaWYgKGlucHV0W29mZnNldC52YWx1ZV0gPT0gJ1snKSBvZmZzZXQudmFsdWUrKztcclxuXHJcbiAgICAgICAgd2hpbGUgKG9mZnNldC52YWx1ZSA8IGlucHV0Lmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDaGFyOiBzdHJpbmcgPSBpbnB1dFtvZmZzZXQudmFsdWVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRDaGFyID09ICddJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0LnZhbHVlKys7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKHRoaXMuUmVhZE51bWJlcihpbnB1dCwgb2Zmc2V0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByb3c7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUmVhZE51bWJlcihpbnB1dDogc3RyaW5nLCBvZmZzZXQ6IG9mZnNldCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIHdoaWxlIChvZmZzZXQudmFsdWUgPCBpbnB1dC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2hhcjogc3RyaW5nID0gaW5wdXRbb2Zmc2V0LnZhbHVlXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2hhciA9PSAnXScpIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb2Zmc2V0LnZhbHVlKys7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudENoYXIgPT0gJyAnIHx8IGN1cnJlbnRDaGFyID09ICc7JykgYnJlYWs7XHJcbiAgICAgICAgICAgIGVsc2UgdmFsdWUgKz0gY3VycmVudENoYXIgPT0gJywnID8gJy4nIDogY3VycmVudENoYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gbWF0aFxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG5ldyBtYXRyaXggd2hpY2ggaXMgdGhlIHJlc3VsdCBvZiB0cmFuc3Bvc2Ugb3BlcmF0aW9uIG9uIHRoaXMgbWF0cml4ICovXHJcbiAgICBwdWJsaWMgVHJhbnNwb3NlKCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG5ld051bWJlcnM6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyh0aGlzLm51bWJlcnNbMF0ubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdOdW1iZXJzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmV3TnVtYmVyc1tpXSA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMubnVtYmVycy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5udW1iZXJzLmxlbmd0aDsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCB0aGlzLm51bWJlcnNbMF0ubGVuZ3RoOyBjb2x1bW4rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmV3TnVtYmVyc1tjb2x1bW5dW3Jvd10gPSB0aGlzLm51bWJlcnNbcm93XVtjb2x1bW5dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChuZXdOdW1iZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBuZXcgbWF0cml4IHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgdGhpcyBtYXRyaXggeCBtYXRyaXggcGFzc2VkIGFzIGFuIGFyZ3VtZW50ICovXHJcbiAgICBwdWJsaWMgTXVsdGlwbHlNYXRyaXgobWF0cml4OiBNYXRyaXgpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBpZiAobWF0cml4LlJvd051bWJlciAhPSB0aGlzLkNvbHVtbk51bWJlcikgdGhyb3cgbmV3IEVycm9yKFwiVG8gbXVsdGlwbHkgbWF0cmljZXMgZmlyc3QgbWF0cml4IG11c3QgaGF2ZSBudW1iZXIgb2YgY29sdW1ucyBlcXVhbCB0byBudW1iZXIgb2Ygcm93cyBpbiBzZWNvbmQgbWF0cml4XCIpO1xyXG5cclxuICAgICAgICBjb25zdCByb3dzID0gbmV3IE1hdHJpeFJvd3ModGhpcy5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUm93TnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzW2ldID0gbmV3IEFycmF5PG51bWJlcj4obWF0cml4LkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4LkNvbHVtbk51bWJlcjsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLkNvbHVtbk51bWJlcjsgaysrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLm51bWJlcnNbaV1ba10gKiBtYXRyaXgubnVtYmVyc1trXVtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dzW2ldW2pdID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIG5ldyBtYXRyaXggd2hpY2ggaXMgcmVzdWx0IG9mIHRoaXMgbWF0cml4IGJlaW5nIG11bHRpcGxpZWQgYnkgcGFzc2VkIG51bWJlciAqL1xyXG4gICAgcHVibGljIE11bHRpcGx5U2NhbGFyKG51bTogbnVtYmVyKTogTWF0cml4XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgcm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKHRoaXMuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlJvd051bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tpXSA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLkNvbHVtbk51bWJlcjsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3dzW2ldW2pdID0gdGhpcy5udW1iZXJzW2ldW2pdICogbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBuZXcgbWF0cml4IHdoaWNoIGlzIHJlc3VsdCBvZiBhZGRpbmcgcGFzc2VkIG1hdHJpeCB0byB0aGlzIE1hdHJpeCAqL1xyXG4gICAgcHVibGljIEFkZChtYXRyaXg6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLlJvd051bWJlciAhPSBtYXRyaXguUm93TnVtYmVyIHx8IHRoaXMuQ29sdW1uTnVtYmVyICE9IG1hdHJpeC5Db2x1bW5OdW1iZXIpIHRocm93IG5ldyBFcnJvcihcIk9ubHkgbWF0cmljZXMgb2YgdGhlIHNhbWUgc2l6ZSBjYW4gYmUgYWRkZWRcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyh0aGlzLlJvd051bWJlcilcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93TnVtID0gMDsgcm93TnVtIDwgdGhpcy5Sb3dOdW1iZXI7IHJvd051bSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3dOdW1dID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xOdW0gPSAwOyBjb2xOdW0gPCB0aGlzLkNvbHVtbk51bWJlcjsgY29sTnVtKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvd3Nbcm93TnVtXVtjb2xOdW1dID0gdGhpcy5udW1iZXJzW3Jvd051bV1bY29sTnVtXSArIG1hdHJpeC5udW1iZXJzW3Jvd051bV1bY29sTnVtXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgocm93cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgYW5kIHJldHVybnMgZGV0ZXJtaW5hbnQgb2YgdGhpcyBtYXRyaXguIFRocm93cyBlcnJvciB3aGVuIGNhbGxlZCBvbiBtYXRyaXggd2hpY2ggaXMgbm90IHNxdWFyZSAqL1xyXG4gICAgcHVibGljIGdldCBEZXRlcm1pbmFudCgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuSXNTcXVhcmUpIHRocm93IG5ldyBFcnJvcihcIk9ubHkgc3F1YXJlIG1hdHJpY2VzIGhhdmUgZGV0ZXJtaW5hbnRcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkNvbHVtbk51bWJlciA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyc1swXVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5Db2x1bW5OdW1iZXIgPT0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5udW1iZXJzWzBdWzBdICogdGhpcy5udW1iZXJzWzFdWzFdKSAtICh0aGlzLm51bWJlcnNbMV1bMF0gKiB0aGlzLm51bWJlcnNbMF1bMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbmVnYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2xOdW0gPSAwOyBjb2xOdW0gPCB0aGlzLkNvbHVtbk51bWJlcjsgY29sTnVtKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gdGhpcy5HZXRQYXJ0KDAsIGNvbE51bSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IChuZWdhdGUgPyAtbWF0cml4LkRldGVybWluYW50IDogbWF0cml4LkRldGVybWluYW50KSAqIHRoaXMubnVtYmVyc1swXVtjb2xOdW1dO1xyXG4gICAgICAgICAgICAgICAgbmVnYXRlID0gIW5lZ2F0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJldHVybnMgbmV3IG1hdHJpeCB3aGljaCBpcyB0aGlzIG1hdHJpeCBidXQgd2l0aG91dCBzZWxlY3RlZCByb3cgYW5kIGNvbHVtbiovXHJcbiAgICBwdWJsaWMgR2V0UGFydChyb3dOdW06IG51bWJlciwgY29sTnVtOiBudW1iZXIpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3ModGhpcy5Sb3dOdW1iZXIgLSAxKTtcclxuXHJcbiAgICAgICAgbGV0IGNvcHlSb3c6IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgbmV3Um93ID0gMDsgbmV3Um93IDwgcm93cy5sZW5ndGg7IG5ld1JvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvcHlSb3cgPT0gcm93TnVtKSBjb3B5Um93Kys7XHJcblxyXG4gICAgICAgICAgICByb3dzW25ld1Jvd10gPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLkNvbHVtbk51bWJlciAtIDEpO1xyXG4gICAgICAgICAgICBsZXQgY29weUNvbDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmV3Q29sID0gMDsgbmV3Q29sIDwgcm93c1tuZXdSb3ddLmxlbmd0aDsgbmV3Q29sKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb3B5Q29sID09IGNvbE51bSkgY29weUNvbCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvd3NbbmV3Um93XVtuZXdDb2xdID0gdGhpcy5udW1iZXJzW2NvcHlSb3ddW2NvcHlDb2xdO1xyXG4gICAgICAgICAgICAgICAgY29weUNvbCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb3B5Um93Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyBhbmQgcmV0dXJucyBpbnZlcnNlIG9mIHRoaXMgbWF0cml4IG9yIG51bGwgaWYgaXQgaXMgbm90IGludmVydGlibGUqL1xyXG4gICAgcHVibGljIEludmVydCgpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuSXNTcXVhcmUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuRGV0ZXJtaW5hbnQgPT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5Db2x1bW5OdW1iZXIgPT0gMSkgcmV0dXJuIG5ldyBNYXRyaXgoW1sxIC8gdGhpcy5udW1iZXJzWzBdWzBdXV0pO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuQ29sdW1uTnVtYmVyID09IDIpIHJldHVybiBuZXcgTWF0cml4KFtbdGhpcy5udW1iZXJzWzFdWzFdLCAtdGhpcy5udW1iZXJzWzBdWzFdXSwgWy10aGlzLm51bWJlcnNbMV1bMF0sIHRoaXMubnVtYmVyc1swXVswXV1dKS5NdWx0aXBseVNjYWxhcigxIC8gdGhpcy5EZXRlcm1pbmFudCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgY29mYWN0b3JzUm93czogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKHRoaXMuUm93TnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZWdhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHJvd051bSA9IDA7IHJvd051bSA8IGNvZmFjdG9yc1Jvd3MubGVuZ3RoOyByb3dOdW0rKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2ZhY3RvcnNSb3dzW3Jvd051bV0gPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLkNvbHVtbk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbE51bSA9IDA7IGNvbE51bSA8IGNvZmFjdG9yc1Jvd3Nbcm93TnVtXS5sZW5ndGg7IGNvbE51bSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGV0ZXJtaWFudCA9IHRoaXMuR2V0UGFydChyb3dOdW0sIGNvbE51bSkuRGV0ZXJtaW5hbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZmFjdG9yc1Jvd3Nbcm93TnVtXVtjb2xOdW1dID0gbmVnYXRlID8gLWRldGVybWlhbnQgOiBkZXRlcm1pYW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnYXRlID0gIW5lZ2F0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFkanVnYXRlOiBNYXRyaXggPSBuZXcgTWF0cml4KGNvZmFjdG9yc1Jvd3MpLlRyYW5zcG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFkanVnYXRlLk11bHRpcGx5U2NhbGFyKDEgLyB0aGlzLkRldGVybWluYW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1YWx0ZXMgYW5kIHJldHVybnMgYXZlcmFnZSB2YWx1ZSBmcm9tIGFsbCBlbGVtZW50cyBvZiB0aGlzIG1hdHJpeCAqL1xyXG4gICAgcHVibGljIGdldCBBdmVyYWdlKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnROdW1iZXI6IG51bWJlciA9IHRoaXMuQ29sdW1uTnVtYmVyICogdGhpcy5Sb3dOdW1iZXI7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRTdW06IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMuUm93TnVtYmVyOyByb3crKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuQ29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFN1bSArPSB0aGlzLm51bWJlcnNbcm93XVtjb2xdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudFN1bSAvIGVsZW1lbnROdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0iLCJpbXBvcnQgeyBTb2x2ZXIgfSBmcm9tIFwiLi9Tb2x2ZXJcIjtcclxuaW1wb3J0IHsgTWF0cml4LCBTaWRlLCBNYXRyaXhSb3dzIH0gZnJvbSBcIi4uL01hdHJpeFwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uL1ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgQ2FudmFzSGVscGVyIH0gZnJvbSBcIi4uL0NhbnZhc0hlbHBlclwiO1xyXG5cclxuLyoqIEkgY2FuJ3QgZmluZCBlbmdsaXNoIG5hbWUgZm9yIFwiZWZla3Qga2F0YWxpenlcIiAqL1xyXG5leHBvcnQgY2xhc3MgQ2F0YWx5c2lzRWZmZWN0U29sdmVyIGV4dGVuZHMgU29sdmVyXHJcbntcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoW1wiUlwiLCBcIlIwXCJdKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgSGFuZGxlSW5wdXQoaW5wdXRFdmVudDogSW5wdXRFdmVudCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNsZWFySW5wdXRFcnJvcnMoKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IFI6IE1hdHJpeCA9IE1hdHJpeC5Gcm9tU3RyaW5nKHRoaXMuR2V0SW5wdXRWYWx1ZShcIlJcIikpO1xyXG4gICAgICAgIGxldCBSMDogTWF0cml4ID0gTWF0cml4LkZyb21TdHJpbmcodGhpcy5HZXRJbnB1dFZhbHVlKFwiUjBcIikpO1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gdmFsaWRhdGUgaW5wdXRcclxuICAgICAgICAvLyNyZWdpb24gUlxyXG4gICAgICAgIGlmIChSID09PSBudWxsKSB7IHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSXCIsIENhdGFseXNpc0VmZmVjdFNvbHZlci5ub3RNYXRyaXhFcnJvcik7IHJldHVybjsgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFSLklzU3F1YXJlKSB7IHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSXCIsIENhdGFseXNpc0VmZmVjdFNvbHZlci5tYXRyaXhOb3RTcXVhcmVFcnJvcik7IHJldHVybjsgfVxyXG4gICAgICAgIGVsc2UgaWYgKFIuQ29sdW1uTnVtYmVyIDwgMikgeyB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUlwiLCBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIubWF0cml4Tm90U3F1YXJlRXJyb3IpOyByZXR1cm47IH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFIuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChSLm51bWJlcnNbaV1baV0gIT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUlwiLCBgUiBtdXNpIG1pZcSHIHNhbWUgMSBwbyBwcnpla8SFdG5lai4gVyByesSZZHppZSAke2l9IGtvbHVtbmllICR7aX0gamVzdCAke1IubnVtYmVyc1tpXVtpXX0gemFtaWFzdCAxYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZml4UjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdSb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoUi5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUi5Sb3dOdW1iZXI7IHJvdysrKSBuZXdSb3dzW3Jvd10gPSBuZXcgQXJyYXk8bnVtYmVyPihSLkNvbHVtbk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBSLlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IHJvdzsgY29sIDwgUi5Db2x1bW5OdW1iZXI7IGNvbCsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Jvd3Nbcm93XVtjb2xdID0gUi5udW1iZXJzW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSb3dzW2NvbF1bcm93XSA9IFIubnVtYmVyc1tyb3ddW2NvbF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSLm51bWJlcnNbcm93XVtjb2xdICE9IFIubnVtYmVyc1tjb2xdW3Jvd10pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUi5udW1iZXJzW2NvbF1bcm93XSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhSID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSXCIsIGBSIG11c2kgYnnEhyBzeW1ldHJ5Y3puZSB3emdsxJlkbmVtIHByemVrxIV0bmVqIHogMS4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYExpY3pieSB3IGtvbcOzcmthY2ggWyR7cm93fV1bJHtjb2x9XSBpIFske2NvbH1dWyR7cm93fV0sIGN6eWxpICR7Ui5udW1iZXJzW3Jvd11bY29sXX0gaSAke1IubnVtYmVyc1tjb2xdW3Jvd119IG5pZSBzxIUgcsOzd25lYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmaXhSKSBSID0gbmV3IE1hdHJpeChuZXdSb3dzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIFIwXHJcbiAgICAgICAgaWYgKFIwID09PSBudWxsKSB7IHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSMFwiLCBDYXRhbHlzaXNFZmZlY3RTb2x2ZXIubm90TWF0cml4RXJyb3IpOyByZXR1cm47IH1cclxuICAgICAgICBlbHNlIGlmIChSMC5Sb3dOdW1iZXIgPiAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFIwLkNvbHVtbk51bWJlciA9PSAxKSBSMCA9IFIwLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgICAgICBlbHNlIHsgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcIlIwXCIsIFNvbHZlci5ub3RWZWN0b3JFcnJvcik7IHJldHVybjsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gUiAmIFIwXHJcbiAgICAgICAgaWYgKFIuQ29sdW1uTnVtYmVyICE9IFIwLkNvbHVtbk51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJSXCIsIFwiUiBtYSBpbm7EhSBpbG/Fm8SHIGtvbHVtbiBuacW8IFIwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwiUjBcIiwgXCJSMCBtYSBpbm7EhSBpbG/Fm8SHIGtvbHVtbiBuacW8IFJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uICBjYWxjdWxhdGVcclxuXHJcbiAgICAgICAgY29uc3QgdG1wUjBfcmVnX291dDogW01hdHJpeCwgQXJyYXk8bnVtYmVyPl0gPSB0aGlzLkNhbGN1bGF0ZVIwX3JlZyhSMCk7XHJcbiAgICAgICAgY29uc3QgUjBfcmVnOiBNYXRyaXggPSB0bXBSMF9yZWdfb3V0WzBdO1xyXG4gICAgICAgIGNvbnN0IHhPcmRlckluUjBfcmVnOiBBcnJheTxudW1iZXI+ID0gdG1wUjBfcmVnX291dFsxXTtcclxuXHJcbiAgICAgICAgY29uc3QgUl9yZWc6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlUl9yZWcoUiwgUjAsIFIwX3JlZywgeE9yZGVySW5SMF9yZWcpO1xyXG5cclxuICAgICAgICBjb25zdCB0bXBDYXRQYXJfb3V0OiBbQXJyYXk8Q2F0YWx5c2lzUGFpcj4sIE1hdHJpeFJvd3MsIE1hdHJpeFJvd3NdID0gdGhpcy5GaW5kQ2F0YWx5c2lzUGFpcnMoUl9yZWcsIFIwX3JlZywgeE9yZGVySW5SMF9yZWcpO1xyXG4gICAgICAgIGNvbnN0IGNhdGFseXNpc1BhaXJzOiBBcnJheTxDYXRhbHlzaXNQYWlyPiA9IHRtcENhdFBhcl9vdXRbMF07XHJcbiAgICAgICAgY29uc3QgUmlqOiBNYXRyaXhSb3dzID0gdG1wQ2F0UGFyX291dFsxXTtcclxuICAgICAgICBjb25zdCBSaV9SajogTWF0cml4Um93cyA9IHRtcENhdFBhcl9vdXRbMl07XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI3JlZ2lvbiBkaXNwbGF5IHJlc3VsdHNcclxuXHJcbiAgICAgICAgUi5EcmF3KFNvbHZlci5kcmF3U3RhcnRQb3MsIFwiUlwiKTtcclxuICAgICAgICAvLyB0cmFuc3Bvc2UgUjAgdG8gZHJhdyBpdCB2ZXJ0aWNhbGx5LCBiZWNhdXNlIHRoYXQncyBob3cgRHIgWmFqxIVjIHdyaXRlcyB0aGF0XHJcbiAgICAgICAgY29uc3QgUjBUID0gUjAuVHJhbnNwb3NlKCk7XHJcbiAgICAgICAgUjBULkRyYXdOZXh0VG8oUiwgU2lkZS5yaWdodCwgXCJSMFwiKTtcclxuICAgICAgICBSMF9yZWcuVHJhbnNwb3NlKCkuRHJhd05leHRUbyhSMFQsIFNpZGUudW5kZXIsIFwiUjBfcmVnXCIpO1xyXG4gICAgICAgIFJfcmVnLkRyYXdOZXh0VG8oUiwgU2lkZS51bmRlciwgXCJSX3JlZ1wiKTtcclxuXHJcbiAgICAgICAgY29uc3QgdG9wTWFyZ2luID0gNTA7XHJcbiAgICAgICAgY29uc3QgbGluZU1hcmdpbiA9IDI1O1xyXG4gICAgICAgIGNvbnN0IFJpakRyYXdYID0gUjBULkxhc3REcmF3UG9zaXRpb24ueCArIFIwVC5QaXhlbFdpZHRoICsgNTA7XHJcbiAgICAgICAgY29uc3QgUmlqQ29tbWVudERyYXdYID0gUmlqRHJhd1ggKyAxMDA7XHJcbiAgICAgICAgY29uc3QgUmlfUmpEcmF3WCA9IFJpakNvbW1lbnREcmF3WCArIDgwO1xyXG4gICAgICAgIGNvbnN0IFJpX1JqQ29tbWVudERyYXdYID0gUmlfUmpEcmF3WCArIDExMDtcclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaXRlcmF0aW9ucyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFIuUm93TnVtYmVyOyByb3crKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sID0gcm93ICsgMTsgY29sIDwgUi5Db2x1bW5OdW1iZXI7IGNvbCsrKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBSaWpWYWx1ZTogbnVtYmVyID0gUmlqW3Jvd11bY29sXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBSaWpUZXh0OiBzdHJpbmcgPSBgUiR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQocm93ICsgMSl9ICR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoY29sICsgMSl9YDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkcmF3WTogbnVtYmVyID0gdG9wTWFyZ2luICsgKGl0ZXJhdGlvbnMgKiBsaW5lTWFyZ2luKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgJHtSaWpUZXh0fT0gJHtSaWpWYWx1ZX1gLCBuZXcgVmVjdG9yMihSaWpEcmF3WCwgZHJhd1kpLCAxOCwgXCJsZWZ0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoUmlqVmFsdWUgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gYCR7UmlqVGV4dH0gPCAwICAgVyBwYXJ6ZSB4JHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChyb3cpfSB4JHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjb2wpfSB3eXN0xJlwdWplIGVmZWt0IGthdGFsaXp5YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KHRleHQsIG5ldyBWZWN0b3IyKFJpakNvbW1lbnREcmF3WCwgZHJhd1kpLCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYCR7UmlqVGV4dH0gPiAwYCwgbmV3IFZlY3RvcjIoUmlqQ29tbWVudERyYXdYLCBkcmF3WSksIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBSaV9SalZhbHVlOiBudW1iZXIgPSBSaV9Saltyb3ddW2NvbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFJpX1JqVGV4dDogc3RyaW5nID0gYFIke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGNvbCArIDEpfS9SJHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChyb3cgKyAxKX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBgJHtSaV9SalRleHR9PSAke051bWJlcihSaV9SalZhbHVlLnRvRml4ZWQoMikpfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dCh0ZXh0LCBuZXcgVmVjdG9yMihSaV9SakRyYXdYLCBkcmF3WSksIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNDYXRhbHlzaXM6IGJvb2xlYW4gPSBSaWpWYWx1ZSA8IFJpX1JqVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21tZW50VGV4dDogc3RyaW5nID0gYCR7UmlqVGV4dH0gJHtoYXNDYXRhbHlzaXMgPyAnPCcgOiAnPid9ICR7UmlfUmpUZXh0fSAgICAgVyBwYXJ6ZSB4JHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChyb3cpfSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIGB4JHtVdGlscy5OdW1iZXJUb1N1YnNjcmlwdChjb2wpfSAke2hhc0NhdGFseXNpcyA/IFwiXCIgOiBcIm5pZSBcIn13eXN0xJlwdWplIGVmZWt0IGthdGFsaXp5YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGNvbW1lbnRUZXh0LCBuZXcgVmVjdG9yMihSaV9SakNvbW1lbnREcmF3WCwgZHJhd1kpLCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhdGFseXNpc1BhaXJzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkcmF3WSA9ICh0b3BNYXJnaW4gKiAyKSArICgoaXRlcmF0aW9ucyArIGkpICogbGluZU1hcmdpbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXRQYWlyOiBDYXRhbHlzaXNQYWlyID0gY2F0YWx5c2lzUGFpcnNbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJJID0gVXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoY2F0UGFpci5pICsgMSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJKID0gVXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoY2F0UGFpci5qICsgMSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gYEthdGFsaXphdG9yZW0gdyBwYXJ6ZSB4JHtzdWJJfSB4JHtzdWJKfSBqZXN0IHgke2NhdFBhaXIuaXNJQ2F0YWx5c3QgPyBzdWJJIDogc3ViSn1gO1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KHRleHQsIG5ldyBWZWN0b3IyKFJpakRyYXdYLCBkcmF3WSksIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlUjBfcmVnKFIwOiBNYXRyaXgpOiBbTWF0cml4LCBBcnJheTxudW1iZXI+XVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGFic1IwOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oUjAuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICBjb25zdCBzb3J0ZWRSMDogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KFIwLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgY29uc3QgUjBpZHM6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPihSMC5Db2x1bW5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFIwLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWJzUjBbaV0gPSBNYXRoLmFicyhSMC5udW1iZXJzWzBdW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgaXRlcmF0aW9ucyA9IGFic1IwLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnM7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gQ2F0YWx5c2lzRWZmZWN0U29sdmVyLkdldEdyZWF0ZXN0TnVtYmVySW5kZXgoYWJzUjApO1xyXG4gICAgICAgICAgICBSMGlkc1tpXSA9IGluZGV4O1xyXG4gICAgICAgICAgICBzb3J0ZWRSMFtpXSA9IGFic1IwW2luZGV4XTtcclxuICAgICAgICAgICAgYWJzUjBbaW5kZXhdID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBbbmV3IE1hdHJpeChbc29ydGVkUjBdKSwgUjBpZHNdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlUl9yZWcoUjogTWF0cml4LCBSMDogTWF0cml4LCBSMF9yZWc6IE1hdHJpeCwgeE9yZGVySW5SMF9yZWc6IEFycmF5PG51bWJlcj4pOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoUi5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBSLlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzW3Jvd10gPSBuZXcgQXJyYXk8bnVtYmVyPihSLkNvbHVtbk51bWJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBSLlJvd051bWJlcjsgcm93KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSByb3c7IGNvbCA8IFIuQ29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbCA9PSByb3cpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93c1tyb3ddW2NvbF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gUi5udW1iZXJzW3hPcmRlckluUjBfcmVnW3Jvd11dW3hPcmRlckluUjBfcmVnW2NvbF1dXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSMC5udW1iZXJzWzBdW3hPcmRlckluUjBfcmVnW3Jvd11dIDwgMCkgdmFsdWUgPSAtdmFsdWU7IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChSMC5udW1iZXJzWzBdW3hPcmRlckluUjBfcmVnW2NvbF1dIDwgMCkgdmFsdWUgPSAtdmFsdWU7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByb3dzW3Jvd11bY29sXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NbY29sXVtyb3ddID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXR1cm5zIGluZGV4IG9mIGdyZWF0ZXN0IG51bWJlciBpbiBwcm92aWRlZCBhcnJheS5cclxuICAgICAqIElmIHNhbWUgbnVtYmVyIGFwcGVhcnMgbXVsdGlwbGUgdGltZXMgcmV0dXJucyBpbmRleCBvZiBpdHMgZmlyc3Qgb2NjdXJyZW5jZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBHZXRHcmVhdGVzdE51bWJlckluZGV4KGFycmF5OiBSZWFkb25seUFycmF5PG51bWJlcj4pOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA+IGFycmF5W2luZGV4XSkgaW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRmluZENhdGFseXNpc1BhaXJzKFJfcmVnOiBNYXRyaXgsIFIwX3JlZzogTWF0cml4LCB4T3JkZXJJblIwX3JlZzogQXJyYXk8bnVtYmVyPik6IFtBcnJheTxDYXRhbHlzaXNQYWlyPiwgTWF0cml4Um93cywgTWF0cml4Um93c11cclxuICAgIHtcclxuICAgICAgICBjb25zdCBjYXRhbHlzaXNQYWlyczogQXJyYXk8Q2F0YWx5c2lzUGFpcj4gPSBuZXcgQXJyYXk8Q2F0YWx5c2lzUGFpcj4oKTtcclxuICAgICAgICBjb25zdCBSaWpfYXJyOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoUl9yZWcuUm93TnVtYmVyKTtcclxuICAgICAgICBjb25zdCBSaV9SajogTWF0cml4Um93cyA9IG5ldyBNYXRyaXhSb3dzKFJfcmVnLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUl9yZWcuUm93TnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSaWpfYXJyW2ldID0gbmV3IEFycmF5PG51bWJlcj4oUl9yZWcuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgUmlfUmpbaV0gPSBuZXcgQXJyYXk8bnVtYmVyPihSX3JlZy5Db2x1bW5OdW1iZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBSX3JlZy5Db2x1bW5OdW1iZXI7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaV9yZWcgPSBVdGlscy5HZXRFbGVtZW50SW5kZXgoeE9yZGVySW5SMF9yZWcsIGkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgal9yZWcgPSBVdGlscy5HZXRFbGVtZW50SW5kZXgoeE9yZGVySW5SMF9yZWcsIGopO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgUmlqOiBudW1iZXIgPSBSX3JlZy5udW1iZXJzW2lfcmVnXVtqX3JlZ107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBSaSA9IFIwX3JlZy5udW1iZXJzWzBdW2lfcmVnXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFJqID0gUjBfcmVnLm51bWJlcnNbMF1bal9yZWddO1xyXG4gICAgICAgICAgICAgICAgUmlqX2FycltpXVtqXSA9IFJpajtcclxuICAgICAgICAgICAgICAgIFJpX1JqW2ldW2pdID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoUmlqIDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRhbHlzaXNQYWlycy5wdXNoKG5ldyBDYXRhbHlzaXNQYWlyKGksIGosIChSaSA+IFJqKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVzdFZhbHVlID0gKFJpIDwgUmopID8gUmkgLyBSaiA6IFJqIC8gUmk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmlfUmpbaV1bal0gPSB0ZXN0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJpaiA+IHRlc3RWYWx1ZSkgY2F0YWx5c2lzUGFpcnMucHVzaChuZXcgQ2F0YWx5c2lzUGFpcihpLCBqLCAoUmkgPCBSaikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtjYXRhbHlzaXNQYWlycywgUmlqX2FyciwgUmlfUmpdO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDYXRhbHlzaXNQYWlyXHJcbntcclxuICAgIHB1YmxpYyByZWFkb25seSBpOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgajogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlzSUNhdGFseXN0OiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpOiBudW1iZXIsIGo6IG51bWJlciwgaXNJQ2F0YWx5c3Q6IGJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pID0gaTtcclxuICAgICAgICB0aGlzLmogPSBqO1xyXG4gICAgICAgIHRoaXMuaXNJQ2F0YWx5c3QgPSBpc0lDYXRhbHlzdDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNvbHZlciB9IGZyb20gXCIuL1NvbHZlclwiO1xyXG5pbXBvcnQgeyBNYXRyaXhSb3dzLCBNYXRyaXgsIFNpZGUgfSBmcm9tIFwiLi4vTWF0cml4XCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uL1V0aWxzXCI7XHJcbmltcG9ydCB7IENhbnZhc0hlbHBlciB9IGZyb20gXCIuLi9DYW52YXNIZWxwZXJcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCIuLi9WZWN0b3IyXCI7XHJcblxyXG52YXIgeyBqU3RhdCB9ID0gcmVxdWlyZSgnanN0YXQnKVxyXG5cclxuZXhwb3J0IGNsYXNzIE1OS1NvbHZlciBleHRlbmRzIFNvbHZlclxyXG57XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKFtcImFscGhhXCIsIFwibWF0cml4WVhYXCIsIFwicHJvYmFiaWxpdHlcIl0pO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhqU3RhdC5zdHVkZW50dC5pbnYoMC45OTUsIDI3KSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coalN0YXQuY2VudHJhbEYuaW52KDAuOTUsIDUsIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgSGFuZGxlSW5wdXQoaW5wdXRFdmVudDogSW5wdXRFdmVudCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNsZWFySW5wdXRFcnJvcnMoKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IGFscGhhOiBNYXRyaXggPSBNYXRyaXguRnJvbVN0cmluZyh0aGlzLkdldElucHV0VmFsdWUoXCJhbHBoYVwiKSk7XHJcbiAgICAgICAgY29uc3QgWVhYOiBNYXRyaXggPSBNYXRyaXguRnJvbVN0cmluZyh0aGlzLkdldElucHV0VmFsdWUoXCJtYXRyaXhZWFhcIikpO1xyXG4gICAgICAgIGxldCBwcm9iYWJpbGl0eVBlcmNlbnQ6IG51bWJlciA9IHRoaXMuR2V0SW5wdXRWYWx1ZUFzTnVtYmVyKFwicHJvYmFiaWxpdHlcIik7XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiB2YWxpZGF0ZSBpbnB1dFxyXG5cclxuICAgICAgICAvLyNyZWdpb24gQTBtdWx0XHJcbiAgICAgICAgaWYgKGFscGhhID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlJbnB1dEVycm9yKFwibWF0cml4WVhYXCIsIFNvbHZlci5ub3RNYXRyaXhFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhbHBoYS5Sb3dOdW1iZXIgPiAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFscGhhLkNvbHVtbk51bWJlciA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbHBoYSA9IGFscGhhLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5SW5wdXRFcnJvcihcImFscGhhXCIsIFNvbHZlci5ub3RWZWN0b3JFcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIFlYWFxyXG4gICAgICAgIGlmIChZWFggPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJtYXRyaXhZWFhcIiwgU29sdmVyLm5vdE1hdHJpeEVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChZWFguUm93TnVtYmVyICE9IGFscGhhLkNvbHVtbk51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJhbHBoYVwiLCBcImlsb8WbxIcgcnrEmWTDs3cgbmllIHpnYWRhIHNpxJkgeiBpbG/Fm2NpxIUgbGljemIgc3RvasSFY3ljaCBwcnplZCDOsVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gcHJvYmFiaWxpdHlcclxuICAgICAgICBpZiAocHJvYmFiaWxpdHlQZXJjZW50ID09IG51bGwgfHwgaXNOYU4ocHJvYmFiaWxpdHlQZXJjZW50KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUlucHV0RXJyb3IoXCJwcm9iYWJpbGl0eVwiLCBTb2x2ZXIubm90TnVtYmVyRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gY2FsY3VsYXRlXHJcblxyXG4gICAgICAgIGNvbnN0IFk6IE1hdHJpeCA9IG5ldyBNYXRyaXgoW1V0aWxzLkNvcHlBcnJheShZWFgubnVtYmVyc1swXSldKS5UcmFuc3Bvc2UoKTtcclxuICAgICAgICBjb25zdCBYOiBNYXRyaXggPSB0aGlzLkNhbGN1bGF0ZVgoWVhYLCBhbHBoYS5udW1iZXJzWzBdWzBdKTtcclxuICAgICAgICBjb25zdCBYdDogTWF0cml4ID0gWC5UcmFuc3Bvc2UoKTtcclxuICAgICAgICBjb25zdCBYdFg6IE1hdHJpeCA9IFh0Lk11bHRpcGx5TWF0cml4KFgpO1xyXG4gICAgICAgIGNvbnN0IFh0WTogTWF0cml4ID0gWHQuTXVsdGlwbHlNYXRyaXgoWSk7XHJcbiAgICAgICAgY29uc3QgWHRYaW52OiBNYXRyaXggPSBYdFguSW52ZXJ0KCk7XHJcbiAgICAgICAgY29uc3QgYTogTWF0cml4ID0gWHRYaW52Lk11bHRpcGx5TWF0cml4KFh0WSk7XHJcbiAgICAgICAgY29uc3QgeV9oYXQ6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlWV9oYXQoYSwgWCk7XHJcbiAgICAgICAgY29uc3QgZTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVfZShZLCB5X2hhdCk7XHJcbiAgICAgICAgY29uc3QgZVRlOiBNYXRyaXggPSBlLlRyYW5zcG9zZSgpLk11bHRpcGx5TWF0cml4KGUpO1xyXG4gICAgICAgIGNvbnN0IG46IG51bWJlciA9IFguUm93TnVtYmVyO1xyXG4gICAgICAgIGNvbnN0IGs6IG51bWJlciA9IFguQ29sdW1uTnVtYmVyIC0gMTtcclxuICAgICAgICBjb25zdCBkZiA9IG4gLSAoayArIDEpO1xyXG4gICAgICAgIGNvbnN0IFNfc3FyOiBudW1iZXIgPSBlVGUubnVtYmVyc1swXVswXSAvIGRmO1xyXG4gICAgICAgIGNvbnN0IERfc3FyOiBNYXRyaXggPSBYdFhpbnYuTXVsdGlwbHlTY2FsYXIoU19zcXIpO1xyXG5cclxuICAgICAgICBjb25zdCBTX3NxckZvckE6IE1hdHJpeCA9IHRoaXMuQ2FsY3VsYXRlU3NxckZvckEoRF9zcXIpO1xyXG4gICAgICAgIGNvbnN0IFNfZm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWFrdGVTRm9yQShTX3NxckZvckEpO1xyXG4gICAgICAgIGNvbnN0IFZfZm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVWRm9yQShTX2ZvckEsIGEpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9iYWJpbGl0eTogbnVtYmVyID0gcHJvYmFiaWxpdHlQZXJjZW50IC8gMTAwO1xyXG4gICAgICAgIGNvbnN0IHRfZm9yQTogTWF0cml4ID0gdGhpcy5DYWxjdWxhdGVURm9yQShTX2ZvckEsIGEpO1xyXG4gICAgICAgIGNvbnN0IHRfc3R1ZDogbnVtYmVyID0galN0YXQuc3R1ZGVudHQuaW52KDEgLSAocHJvYmFiaWxpdHkgLyAyKSwgZGYpO1xyXG5cclxuICAgICAgICBjb25zdCBZdDogTWF0cml4ID0gWS5UcmFuc3Bvc2UoKTtcclxuICAgICAgICBjb25zdCBZdFk6IE1hdHJpeCA9IFl0Lk11bHRpcGx5TWF0cml4KFkpO1xyXG4gICAgICAgIGNvbnN0IHlfYXZnOiBudW1iZXIgPSBZLkF2ZXJhZ2U7XHJcbiAgICAgICAgY29uc3QgUl9zcXI6IG51bWJlciA9IHRoaXMuQ2FsY3VsYXRlUl9zcXIoZVRlLCBZdFksIHlfYXZnLCBuKTtcclxuICAgICAgICBjb25zdCBGOiBudW1iZXIgPSB0aGlzLkNhbGN1bGF0ZUYoUl9zcXIsIG4sIGspO1xyXG4gICAgICAgIGNvbnN0IEZfZGlzdDogbnVtYmVyID0galN0YXQuY2VudHJhbEYuaW52KDEgLSBwcm9iYWJpbGl0eSwgaywgZGYpO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gZGlzcGxheSByZXN1bHRzXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBhKVxyXG5cclxuICAgICAgICBYLkRyYXcoU29sdmVyLmRyYXdTdGFydFBvcywgXCJYXCIpO1xyXG4gICAgICAgIFkuRHJhd05leHRUbyhYLCBTaWRlLnJpZ2h0LCBcIllcIik7XHJcbiAgICAgICAgeV9oYXQuRHJhd05leHRUbyhZLCBTaWRlLnJpZ2h0LCBcIsW3XCIpO1xyXG4gICAgICAgIGUuRHJhd05leHRUbyh5X2hhdCwgU2lkZS5yaWdodCwgXCJlXCIpO1xyXG4gICAgICAgIFh0LkRyYXdOZXh0VG8oZSwgU2lkZS5yaWdodCwgXCJY4bWAXCIpO1xyXG4gICAgICAgIFh0WC5EcmF3TmV4dFRvKFh0LCBTaWRlLnJpZ2h0LCBcIljhtYBYXCIpO1xyXG4gICAgICAgIFh0WS5EcmF3TmV4dFRvKFgsIFNpZGUudW5kZXIsIFwiWOG1gFlcIik7XHJcbiAgICAgICAgWHRYaW52LkRyYXdOZXh0VG8oWHRZLCBTaWRlLnJpZ2h0LCBcIihY4bWAWCnigbvCuVwiKVxyXG4gICAgICAgIGEuRHJhd05leHRUbyhYdFhpbnYsIFNpZGUucmlnaHQsIFwiYVwiKTtcclxuICAgICAgICBlVGUuRHJhd05leHRUbyhhLCBTaWRlLnJpZ2h0LCBcImXhtYBlXCIpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgU8KyPSR7TnVtYmVyKFNfc3FyLnRvRml4ZWQoMykpfWAsIFZlY3RvcjIuQWRkKGVUZS5MYXN0RHJhd1Bvc2l0aW9uLCBuZXcgVmVjdG9yMihNYXRyaXguY2VsbFBpeGVsU2l6ZSArIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgTWF0cml4LmxhYmVsUGl4ZWxNYXJnaW4pKSwgMTYsIFwibGVmdFwiLCBcInNhbnMtc2VyaWZcIiwgXCJibGFja1wiLCBcImJvbGRcIik7XHJcbiAgICAgICAgRF9zcXIuRHJhd05leHRUbyhYdFksIFNpZGUudW5kZXIsIFwiRMKyKGEpXCIpO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIGIpXHJcbiAgICAgICAgLy8jcmVnaW9uIGJcclxuICAgICAgICBjb25zdCBiRHJhd1N0YXJ0UG9zOiBWZWN0b3IyID0gdGhpcy5EcmF3U2VwYXJhdGluZ1ZlcnRpY2FsTGluZShYdFgpO1xyXG5cclxuICAgICAgICBTX3NxckZvckEuRHJhdyhiRHJhd1N0YXJ0UG9zLCBcIlPCsihhKVwiKTtcclxuICAgICAgICBTX2ZvckEuRHJhd05leHRUbyhTX3NxckZvckEsIFNpZGUudW5kZXIsIFwiUyhhKSAoxZtyIGLFgilcIik7XHJcbiAgICAgICAgVl9mb3JBLkRyYXdOZXh0VG8oU19mb3JBLCBTaWRlLnVuZGVyLCBcIlYoYSkgKMWbciB3emcgYsWCICUpXCIpXHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRyYXdQb3M6IFZlY3RvcjIgPSBWZWN0b3IyLkFkZChWX2ZvckEuTGFzdERyYXdQb3NpdGlvbiwgbmV3IFZlY3RvcjIoMCwgVl9mb3JBLlBpeGVsSGVpZ2h0ICsgTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luKSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVl9mb3JBLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKFZfZm9yQS5udW1iZXJzWzBdW2ldKSB8fCBpc05hTihWX2ZvckEubnVtYmVyc1swXVtpXSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGBuaWUgbWEgVihhKSBkbGEgYSR7VXRpbHMuTnVtYmVyVG9TdWJzY3JpcHQoaSl9YCwgZHJhd1BvcywgMTYsIFwibGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3UG9zID0gVmVjdG9yMi5BZGQoZHJhd1BvcywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIGJiXHJcblxyXG4gICAgICAgIGNvbnN0IGJiRHJhd1N0YXJ0UG9zOiBWZWN0b3IyID0gdGhpcy5EcmF3U2VwYXJhdGluZ1ZlcnRpY2FsTGluZShTX3NxckZvckEpXHJcbiAgICAgICAgU19zcXJGb3JBLkRyYXcoYmJEcmF3U3RhcnRQb3MsIFwiU8KyKGEpXCIpO1xyXG4gICAgICAgIFNfZm9yQS5EcmF3TmV4dFRvKFNfc3FyRm9yQSwgU2lkZS51bmRlciwgXCJTKGEpICjFm3IgYsWCKVwiKTtcclxuICAgICAgICB0X2ZvckEuRHJhd05leHRUbyhTX2ZvckEsIFNpZGUudW5kZXIsIFwidChhKVwiKTtcclxuICAgICAgICBjb25zdCB0X3N0dWREcmF3UG9zOiBWZWN0b3IyID0gVmVjdG9yMi5BZGQodF9mb3JBLkxhc3REcmF3UG9zaXRpb24sIG5ldyBWZWN0b3IyKDAsIChNYXRyaXguY2VsbFBpeGVsU2l6ZSAqIDIpKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGB0Kj0ke3RoaXMuUm91bmQodF9zdHVkKX1gLCB0X3N0dWREcmF3UG9zLCAxNiwgXCJsZWZ0XCIsIFwic2Fucy1zZXJpZlwiLCBcImJsYWNrXCIsIFwiYm9sZFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYmJBbnN3ZXJEcmF3OiBWZWN0b3IyID0gVmVjdG9yMi5BZGQoU19zcXJGb3JBLkxhc3REcmF3UG9zaXRpb24sIG5ldyBWZWN0b3IyKFNfc3FyRm9yQS5QaXhlbFdpZHRoICsgTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luLCAwKSk7XHJcblxyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChcIkgwOiB6bWllbm5hIFhpIGplc3QgbmllaXN0b3RuYVwiLCBiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpOztcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoXCJIMTogem1pZW5uYSBYaSBtYSBzdGF0eXN0eWN6bmllIGlzdG90bnkgd3DFgnl3IG5hIHptaWVubsSFIG9iamHFm25pYW7EhVwiLCBiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdF9mb3JBLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgYWNjZXB0SDAgPSB0X2ZvckEubnVtYmVyc1swXVtpXSA8IHRfc3R1ZDtcclxuICAgICAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gYHQke1V0aWxzLk51bWJlclRvU3Vic2NyaXB0KGkpfSAke2FjY2VwdEgwID8gJzwnIDogJz4nfSB0KiBgXHJcbiAgICAgICAgICAgICAgICArIGBaIHByYXdkb3BvZG9iaWXFhHN0d2VtICR7cHJvYmFiaWxpdHlQZXJjZW50fSUgJHthY2NlcHRIMCA/IFwiYnJhayBwb2RzdGF3IGJ5IG9kcnp1Y2nEhyBIMFwiIDogXCJuYWxlxbx5IG9kcnp1Y2nEhyBIMCBuYSByemVjeiBIMVwifWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dCh0ZXh0LCBiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gYmJiXHJcblxyXG4gICAgICAgIGNvbnN0IGJiYkxpbmVZID0gdF9zdHVkRHJhd1Bvcy55ICsgMjU7XHJcbiAgICAgICAgY29uc3QgYmJiTGluZVN0YXJ0ID0gbmV3IFZlY3RvcjIoYmJEcmF3U3RhcnRQb3MueCAtIE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiwgYmJiTGluZVkpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3TGluZShiYmJMaW5lU3RhcnQsIG5ldyBWZWN0b3IyKENhbnZhc0hlbHBlci5zaGFyZWRDb250ZXh0LmNhbnZhcy53aWR0aCwgYmJiTGluZVkpLCBTb2x2ZXIuc2VwYXJhdGluZ0xpbmVUaGlja25lc3MpO1xyXG5cclxuICAgICAgICBsZXQgYmJiQW5zd2VyRHJhdzogVmVjdG9yMiA9IFZlY3RvcjIuQWRkKGJiYkxpbmVTdGFydCwgU29sdmVyLmRyYXdTdGFydFBvcyk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KFwiSDA6IG5pZSBtYSB0YWtpZWogem1pZW5uZWogWGksIGt0w7NhIG1hIHN0YXR5c3R5Y3puaWUgaXN0b3RueSB3cMWCeXcgbmEgWVwiLCBiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChcIkgxOiBqZXN0IHRha2Egem1pZW5uYSBYaSwga3TDs2EgbWEgc3RhdHlzdHljem5pZSBpc3RvdG55IHdwxYJ5dyBuYSBZXCIsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGDIsz0ke3RoaXMuUm91bmQoeV9hdmcpfWAsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGBSwrI9JHt0aGlzLlJvdW5kKFJfc3FyKX1gLCBiYmJBbnN3ZXJEcmF3LCAxOCwgXCJsZWZ0XCIpO1xyXG4gICAgICAgIGJiYkFuc3dlckRyYXcgPSBWZWN0b3IyLkFkZChiYmJBbnN3ZXJEcmF3LCBuZXcgVmVjdG9yMigwLCBTb2x2ZXIubGluZU1hcmdpbikpO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3VGV4dChgRj0ke3RoaXMuUm91bmQoRil9YCwgYmJiQW5zd2VyRHJhdywgMTgsIFwibGVmdFwiKTtcclxuICAgICAgICBiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoYmJiQW5zd2VyRHJhdywgbmV3IFZlY3RvcjIoMCwgU29sdmVyLmxpbmVNYXJnaW4pKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuRHJhd1RleHQoYEYqPSR7dGhpcy5Sb3VuZChGX2Rpc3QpfWAsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYmJiQW5zd2VyRHJhdyA9IFZlY3RvcjIuQWRkKGJiYkFuc3dlckRyYXcsIG5ldyBWZWN0b3IyKDAsIFNvbHZlci5saW5lTWFyZ2luKSk7XHJcbiAgICAgICAgWXQuRHJhdyhiYmJBbnN3ZXJEcmF3LCBcIlnhtYBcIik7XHJcbiAgICAgICAgWXRZLkRyYXdOZXh0VG8oWXQsIFNpZGUucmlnaHQsIFwiWeG1gFlcIilcclxuICAgICAgICBiYmJBbnN3ZXJEcmF3ID0gVmVjdG9yMi5BZGQoWXQuTGFzdERyYXdQb3NpdGlvbiwgbmV3IFZlY3RvcjIoMCwgWXRZLlBpeGVsSGVpZ2h0ICsgKE1hdHJpeC5tYXRyaXhQaXhlbE1hcmdpbiAqIDIpKSk7XHJcbiAgICAgICAgY29uc3QgYWNjZXB0SDA6IGJvb2xlYW4gPSBGIDwgRl9kaXN0O1xyXG4gICAgICAgIGNvbnN0IGJiYkFuc3dlclRleHQ6IHN0cmluZyA9IGBaIHByYXdkb3BvZG9iaWXFhHN0d2VtICR7cHJvYmFiaWxpdHlQZXJjZW50fSUgJHthY2NlcHRIMCA/IFwiYnJhayBwb2RzdGF3IGJ5IG9kcnp1Y2nEhyBIMFwiIDogXCJuYWxlxbx5IG9kcnp1Y2nEhyBIMCBuYSByemVjeiBIMVwifWA7XHJcbiAgICAgICAgQ2FudmFzSGVscGVyLkRyYXdUZXh0KGJiYkFuc3dlclRleHQsIGJiYkFuc3dlckRyYXcsIDE4LCBcImxlZnRcIik7XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlWChZWFg6IE1hdHJpeCwgYTBtdWx0OiBudW1iZXIpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCBZWFhfVDogTWF0cml4ID0gWVhYLlRyYW5zcG9zZSgpO1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhZWFhfVC5Sb3dOdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBZWFhfVC5Sb3dOdW1iZXI7IHJvdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1tyb3ddID0gbmV3IEFycmF5PG51bWJlcj4oWVhYX1QuQ29sdW1uTnVtYmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgWVhYX1QuQ29sdW1uTnVtYmVyOyBjb2wrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm93c1tyb3ddW2NvbF0gPSBjb2wgPT0gMCA/IGEwbXVsdCA6IFlYWF9ULm51bWJlcnNbcm93XVtjb2xdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBDYWxjdWxhdGVZX2hhdChhOiBNYXRyaXgsIFg6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhYLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFguUm93TnVtYmVyOyByb3crKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3Nbcm93XSA9IG5ldyBBcnJheTxudW1iZXI+KDEpO1xyXG4gICAgICAgICAgICBsZXQgeV9oYXQ6IG51bWJlciA9IGEubnVtYmVyc1swXVswXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMTsgY29sIDwgWC5Db2x1bW5OdW1iZXI7IGNvbCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB5X2hhdCArPSBhLm51bWJlcnNbY29sXVswXSAqIFgubnVtYmVyc1tyb3ddW2NvbF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93c1tyb3ddWzBdID0geV9oYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZV9lKFk6IE1hdHJpeCwgWV9oYXQ6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cyhZLlJvd051bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IFkuUm93TnVtYmVyOyByb3crKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3Nbcm93XSA9IFtZLm51bWJlcnNbcm93XVswXSAtIFlfaGF0Lm51bWJlcnNbcm93XVswXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeChyb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhbGN1bGF0ZVNzcXJGb3JBKERfc3FyOiBNYXRyaXgpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoMSk7XHJcbiAgICAgICAgcm93c1swXSA9IG5ldyBBcnJheTxudW1iZXI+KERfc3FyLkNvbHVtbk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRF9zcXIuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzWzBdW2ldID0gRF9zcXIubnVtYmVyc1tpXVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3Vha3RlU0ZvckEoU19zcXJGb3JBOiBNYXRyaXgpOiBNYXRyaXhcclxuICAgIHtcclxuICAgICAgICBjb25zdCByb3dzOiBNYXRyaXhSb3dzID0gbmV3IE1hdHJpeFJvd3MoMSk7XHJcbiAgICAgICAgcm93c1swXSA9IG5ldyBBcnJheShTX3NxckZvckEuQ29sdW1uTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTX3NxckZvckEuQ29sdW1uTnVtYmVyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByb3dzWzBdW2ldID0gTWF0aC5zcXJ0KFNfc3FyRm9yQS5udW1iZXJzWzBdW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlVkZvckEoU19mb3JBOiBNYXRyaXgsIGE6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygxKTtcclxuICAgICAgICByb3dzWzBdID0gbmV3IEFycmF5PG51bWJlcj4oU19mb3JBLkNvbHVtbk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU19mb3JBLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1swXVtpXSA9IE1hdGguYWJzKFNfZm9yQS5udW1iZXJzWzBdW2ldIC8gYS5udW1iZXJzW2ldWzBdKSAqIDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlVEZvckEoU19mb3JBOiBNYXRyaXgsIGE6IE1hdHJpeCk6IE1hdHJpeFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHJvd3M6IE1hdHJpeFJvd3MgPSBuZXcgTWF0cml4Um93cygwKTtcclxuICAgICAgICByb3dzWzBdID0gbmV3IEFycmF5PG51bWJlcj4oU19mb3JBLkNvbHVtbk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU19mb3JBLkNvbHVtbk51bWJlcjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm93c1swXVtpXSA9IE1hdGguYWJzKGEubnVtYmVyc1tpXVswXSkgLyBTX2ZvckEubnVtYmVyc1swXVtpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4KHJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlUl9zcXIoZVRlOiBNYXRyaXgsIFl0WTogTWF0cml4LCB5X2F2ZzogbnVtYmVyLCBuOiBudW1iZXIpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gMSAtIChlVGUubnVtYmVyc1swXVswXSAvIChZdFkubnVtYmVyc1swXVswXSAtIChuICogKHlfYXZnICogeV9hdmcpKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FsY3VsYXRlRihSX3NxcjogbnVtYmVyLCBuOiBudW1iZXIsIGs6IG51bWJlcik6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoKFJfc3FyIC8gKDEgLSBSX3NxcikpICogKChuIC0gayAtIDEpIC8gaykpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ2FudmFzSGVscGVyIH0gZnJvbSBcIi4uL0NhbnZhc0hlbHBlclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcIi4uL1ZlY3RvcjJcIjtcclxuaW1wb3J0IHsgTWF0cml4IH0gZnJvbSBcIi4uL01hdHJpeFwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi9VdGlsc1wiO1xyXG5cclxuLyoqIEJhc2UgY2xhc3MgZm9yIGNsYXNzZXMgc29sdmluZyBlY29ub21ldHJpYyBwcm9ibGVtcyAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU29sdmVyXHJcbntcclxuICAgIC8vI3JlZ2lvbiBlcnJvciBtZXNzYWdlc1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBub3RNYXRyaXhFcnJvcjogc3RyaW5nID0gXCJwb2RhbmEgd2FydG/Fm8SHIG5pZSBqZXN0IG1hY2llcnrEhVwiO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBtYXRyaXhOb3RTcXVhcmVFcnJvcjogc3RyaW5nID0gXCJwb2RhbmEgbWFjaWVyeiBuaWUgamVzdCBrd2FkcmF0b3dhICh0eWxlIHdpZXJzenkgY28ga29sdW1uKVwiO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBub3ROdW1iZXJFcnJvcjogc3RyaW5nID0gXCJwb2RhbmEgd2FydG/Fm8SHIG5pZSBqZXN0IGxpY3pixIVcIjtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgbm90VmVjdG9yRXJyb3I6IHN0cmluZyA9IFwicG9kYW5hIG1hY2llcnogbmllIGplc3Qgd2VrdG9yZW0gKGplZGVuIHdpZXJzeiBhbGJvIGplZG5hIGtvbHVtbmEpXCI7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IGRyYXdTdGFydFBvczogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKDEwLCAzMCk7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IHNlcGFyYXRpbmdMaW5lVGhpY2tuZXNzOiBudW1iZXIgPSA1O1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBsaW5lTWFyZ2luOiBudW1iZXIgPSAyNTtcclxuXHJcblxyXG4gICAgLyoqIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byB3aGljaCBhbGwgZGlzcGxheWVkIG51bWJlcnMgc2hvdWxkIGJlIHJvdW5kZSAqL1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSByb3VuZGluZzogbnVtYmVyID0gMztcclxuICAgIFxyXG5cclxuICAgIHByb3RlY3RlZCByZWFkb25seSBpbnB1dHM6IE1hcDxzdHJpbmcsIEhUTUxJbnB1dEVsZW1lbnQ+ID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbnB1dEVsZW1lbnQ+KCk7XHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXJyb3JMYWJlbHM6IE1hcDxzdHJpbmcsIEhUTUxMYWJlbEVsZW1lbnQ+ID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxMYWJlbEVsZW1lbnQ+KCk7XHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihpbnB1dHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSAoPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW52YXNcIikpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dCA9IHRoaXMuY29udGV4dDtcclxuXHJcbiAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXRJZCA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXRJZCk7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5vbmlucHV0ID0gdGhpcy5IYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0cy5zZXQoaW5wdXRJZCwgaW5wdXRFbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5lcnJvckxhYmVscy5zZXQoaW5wdXRJZCwgPEhUTUxMYWJlbEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXRJZCArIFwiX2Vycm9yXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsbGVkIHdoZW5ldmVyIGFueSBvZiBpbnB1dCBmaWVsZHMgZnJvbSB0aGlzLmlucHV0cyBpcyB1cGRhdGVkIFxyXG4gICAgICogQHBhcmFtIGlucHV0RXZlbnQgSW5wdXRFdmVudCByYWlzZWQgYnkgaW5wdXQgZmlsZWQgd2hpY2ggd2FzIG1vZGlmaWVkIGJ5IHVzZXJcclxuICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgSGFuZGxlSW5wdXQoaW5wdXRFdmVudDogSW5wdXRFdmVudCk6IHZvaWQ7XHJcblxyXG4gICAgLyoqIERpc3BsYXlzIGVycm9yIGxhYmVsIG5leHQgdG8gaW5wdXQgZmllbGQgKi9cclxuICAgIHByb3RlY3RlZCBEaXNwbGF5SW5wdXRFcnJvcihpbnB1dElkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVycm9yTGFiZWxzLmdldChpbnB1dElkKS5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBIaWRlcyBhbGwgZXJyb3IgbGFiZWxzIGRpc3BsYXllZCB1c2luZyB0aGlzLkRpc3BsYXlJbnB1dEVycm9yICovXHJcbiAgICBwcm90ZWN0ZWQgQ2xlYXJJbnB1dEVycm9ycygpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lcnJvckxhYmVscy5mb3JFYWNoKChsYWJlbCwgaWQpID0+IGxhYmVsLmlubmVySFRNTCA9IFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBHZXRJbnB1dFZhbHVlKGlucHV0SWQ6IHN0cmluZyk6IHN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0cy5nZXQoaW5wdXRJZCkudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEdldElucHV0VmFsdWVBc051bWJlcihpbnB1dElkOiBzdHJpbmcpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdHJpbmdWYWx1ZTogc3RyaW5nID0gdGhpcy5HZXRJbnB1dFZhbHVlKGlucHV0SWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzdHJpbmdWYWx1ZSA9PSBudWxsIHx8IHN0cmluZ1ZhbHVlID09IFwiXCIpIHJldHVybiBOYU47XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHN0cmluZ1ZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkgdmFsdWUgPSBOdW1iZXIoc3RyaW5nVmFsdWUucmVwbGFjZSgnLCcsICcuJykpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERyYXdzIHZlcnRpY2FsIGxpbmUgdG8gc2VwYXJhdGUgdHdvIHBhcnRzIG9mIHByb2JsZW0ncyBzb2x1dGlvbi5cclxuICAgICAqIFJldHVybnMgVmVjdG9yMiByZXByZXNlbnRpbmcgcG9zaXRpb24gd2hlcmUgZHJhd2luZyBvZiB0aGUgbmV4dCBwYXJ0IHNob3VsZCBzdGFydFxyXG4gICAgICogQHBhcmFtIHJpZ2h0bW9zdE1hdHJpeCBSaWdodG1vc3QgbWF0cml4IGZyb20gZmluaXNoZWQgcGFydCBvZiBzb2x1dGlvbi4gTGluZSB3aWxsIGJlIGRyYXduIG5leHQgdG8gaXQuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBEcmF3U2VwYXJhdGluZ1ZlcnRpY2FsTGluZShyaWdodG1vc3RNYXRyaXg6IE1hdHJpeCk6IFZlY3RvcjJcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaW5lWDogbnVtYmVyID0gcmlnaHRtb3N0TWF0cml4Lkxhc3REcmF3UG9zaXRpb24ueCArIHJpZ2h0bW9zdE1hdHJpeC5QaXhlbFdpZHRoICsgTWF0cml4Lm1hdHJpeFBpeGVsTWFyZ2luO1xyXG4gICAgICAgIENhbnZhc0hlbHBlci5EcmF3TGluZShuZXcgVmVjdG9yMihsaW5lWCwgMCksIG5ldyBWZWN0b3IyKGxpbmVYLCBDYW52YXNIZWxwZXIuc2hhcmVkQ29udGV4dC5jYW52YXMuaGVpZ2h0KSwgU29sdmVyLnNlcGFyYXRpbmdMaW5lVGhpY2tuZXNzKTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIobGluZVggKyBNYXRyaXgubWF0cml4UGl4ZWxNYXJnaW4sIFNvbHZlci5kcmF3U3RhcnRQb3MueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJvdW5kcyBudW1iZXIgdG8gZGVmYXVsdCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgKi9cclxuICAgIHByb3RlY3RlZCBSb3VuZCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxzLlJvdW5kTnVtYmVyKHZhbHVlLCBTb2x2ZXIucm91bmRpbmcpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG5hbWVzcGFjZSBVdGlsc1xyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVHJ5UmVtb3ZlRnJvbUFycmF5PFQ+KGFycmF5OiBUW10sIGVsZW1lbnQ6IFQpOiBib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZvdW5kRWxlbWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PT0gZWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm91bmRFbGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm91bmRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlJlbW92ZXMgZmlyc3Qgb2NjdXJyZW5jZSBvZiBnaXZlbiBvYmplY3QgaW4gYW4gYXJyYXkgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZW1vdmVGcm9tQXJyYXk8VD4oYXJyYXk6IFRbXSwgZWxlbWVudDogVCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgICBpZiAoIVRyeVJlbW92ZUZyb21BcnJheShhcnJheSwgZWxlbWVudCkpIHRocm93IEVycm9yKFwiQ291bGRuJ3QgZmluZCBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGUgcHJvdmlkZWQgYXJyYXlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqQ2hlY2tzIHdoZXRoZXIgb2JqZWN0IGlzIGluIGFuIGFycmF5IGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaXMgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBJc0VsZW1lbnRJbkFycmF5PFQ+KGFycmF5OiBUW10sIGVsZW1lbnQ6IFQpOiBib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZvdW5kRWxlbWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5W2ldID09PSBlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZEVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqUmVtb3ZlcyBvYmplY3QgZnJvbSBhbiBhcnJheSBhdCBzcGVjaWZpZWQgaW5kZXggKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZW1vdmVGcm9tQXJyYXlBdEluZGV4PFQ+KGFycmF5OiBUW10sIGluZGV4OiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBpbmRleCBvZiBmaXJzdCBvY3VycmVuY2Ugb2YgZ2l2ZW4gZWxlbWVudCBpbiBhcnJheS4gXHJcbiAgICAgKiBJZiBlbGVtZW50IGlzIG5vdCBwcmVzZW50IGluIHRoZSBhcnJheSAtMSBpcyByZXR1cm5lZCAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEVsZW1lbnRJbmRleDxUPihhcnJheTogVFtdLCBlbGVtZW50OiBUKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PSBlbGVtZW50KSByZXR1cm4gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBwcm92aWRlZCBudW1iZXIgYXMgc3RyaW5nIGluIHN1YnNjcmlwdCAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE51bWJlclRvU3Vic2NyaXB0KHZhbHVlOiBudW1iZXIpOiBzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBpZiAodmFsdWUgPiA5IHx8IHZhbHVlIDwgMCB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHRocm93IG5ldyBFcnJvcihcIlZhbHVlIG11c3QgYmUgaW50ZWdyYWwgbnVtYmVyIGZyb20gcmFuZ2UgPDA7OT5cIik7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gWyfigoAnLCAn4oKBJywgJ+KCgicsICfigoMnLCAn4oKEJywgJ+KChScsICfigoYnLCAn4oKHJywgJ+KCiCcsICfigoknXVt2YWx1ZV1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29weUFycmF5PFQ+KGFycmF5OiByZWFkb25seSBUW10pOiBUW107XHJcblxyXG4gICAgLyoqIENyZWF0ZXMgc2hhbGxvdyBjb3B5IG9mIGFuIGFycmF5ICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29weUFycmF5PFQ+KGFycmF5OiBUW10pOiBUW11cclxuICAgIHtcclxuICAgICAgICBjb25zdCBjb3B5OiBUW10gPSBuZXcgQXJyYXk8VD4oYXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgY29weVtpXSA9IGFycmF5W2ldO1xyXG5cclxuICAgICAgICByZXR1cm4gY29weTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmV0dXJucyBudW1iZXIgcm91bmRlZCB0byBkZWNpbWFsUGxhY2VzIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJvdW5kTnVtYmVyKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQbGFjZXM6IG51bWJlcik6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUudG9GaXhlZChkZWNpbWFsUGxhY2VzKSk7XHJcbiAgICB9XHJcbn0iLCIvKipUd28gZGltZW5zaW9uYWwgdmVjdG9yLiBUaGlzIGNhbHNzIGlzIGltbXV0YWJsZSAqL1xyXG5leHBvcnQgY2xhc3MgVmVjdG9yMlxyXG57XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHk6IG51bWJlcjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKkFkZHMgdmVjdG9yQSB0byB2ZWN0b3JCIGFuZCByZXR1cm5zIG5ldyBWZWN0b3IyIGNyZWF0ZWQgYXMgdGhlIHJlc3VsdCovXHJcbiAgICBzdGF0aWMgQWRkKHZlY3RvckE6IFZlY3RvcjIsIHZlY3RvckI6IFZlY3RvcjIpOiBWZWN0b3IyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHZlY3RvckEueCArIHZlY3RvckIueCwgdmVjdG9yQS55ICsgdmVjdG9yQi55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipTdWJzdHJhY3RzIHZlY3RvckIgZnJvbSB2ZWN0b3JBIGFuZCByZXR1cm5zIG5ldyBWZWN0b3IyIGNyZWF0ZWQgYXMgdGhlIHJlc3VsdCovXHJcbiAgICBzdGF0aWMgU3Vic3RyYWN0KHZlY3RvckE6IFZlY3RvcjIsIHZlY3RvckI6IFZlY3RvcjIpOiBWZWN0b3IyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHZlY3RvckEueCAtIHZlY3RvckIueCwgdmVjdG9yQS55IC0gdmVjdG9yQi55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipNdWx0aXBsaWVzIHZlY3RvciBhIGJ5IHZlY3RvciBiIGFuZCByZXR1cm5zIG5ldyBWZWN0b3IyIGNyZWF0ZWQgYXMgdGhlIHJlc3VsdCovXHJcbiAgICBzdGF0aWMgTXVsdGlwbHkodmVjdG9yOiBWZWN0b3IyLCBtdWx0aXBpbGVyOiBudW1iZXIpOiBWZWN0b3IyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHZlY3Rvci54ICogbXVsdGlwaWxlciwgdmVjdG9yLnkgKiBtdWx0aXBpbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipDb21wdXRlcyBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWNvdHJzIGFuZCByZXR1cm5zIHRoZSByZXN1bHQgKi9cclxuICAgIHN0YXRpYyBEaXN0YW5jZSh2ZWN0b3JBOiBWZWN0b3IyLCB2ZWN0b3JCOiBWZWN0b3IyKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGEgPSB2ZWN0b3JBLnggLSB2ZWN0b3JCLng7XHJcbiAgICAgICAgbGV0IGIgPSB2ZWN0b3JBLnkgLSB2ZWN0b3JCLnk7XHJcbiAgICAgICAgYSAqPSBhO1xyXG4gICAgICAgIGIgKj0gYjtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhICsgYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqUmV0dXJucyB0cnVlIGlmIHR3byB2ZWN0b3JzIGFyZSBlcXVhbCAqL1xyXG4gICAgc3RhdGljIEVxdWFscyh2ZWN0b3JBOiBWZWN0b3IyLCB2ZWN0b3JCOiBWZWN0b3IyKTogYm9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB2ZWN0b3JBLnggPT09IHZlY3RvckIueCAmJiB2ZWN0b3JBLnkgPT09IHZlY3RvckIueTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFByb2dyYW0gfSBmcm9tICcuL1Byb2dyYW0nO1xuaW1wb3J0IHsgQ2F0YWx5c2lzRWZmZWN0U29sdmVyIH0gZnJvbSAnLi9Tb2x2ZXJzL0NhdGFseXNpc0VmZmVjdFNvbHZlcic7XG5pbXBvcnQgeyBNTktTb2x2ZXIgfSBmcm9tICcuL1NvbHZlcnMvTU5LU29sdmVyJztcblxubGV0IHByb2dyYW07XG5cbnN3aXRjaCAoZG9jdW1lbnQudGl0bGUpIFxue1xuICAgIGNhc2UgXCJTdHJvbmEgZ8WCw7N3bmFcIjpcbiAgICAgICAgLy8gcHJvZ3JhbSA9IG5ldyBQcm9ncmFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJFZmVrdCBrYXRhbGl6eVwiOlxuICAgICAgICBwcm9ncmFtID0gbmV3IENhdGFseXNpc0VmZmVjdFNvbHZlcigpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiTU5LXCI6XG4gICAgICAgIHByb2dyYW0gPSBuZXcgTU5LU29sdmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG9jdW1lbnQgdGl0bGUgXCIgKyBkb2N1bWVudC50aXRsZSArIFwiIGRvZXNuJ3QgbWF0Y2ggYW55IGNhc2UhXCIpO1xuICAgICAgICBicmVhaztcbn0iXSwic291cmNlUm9vdCI6IiJ9