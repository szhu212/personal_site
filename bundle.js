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
/******/ 	return __webpack_require__(__webpack_require__.s = "./portfolio.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./portfolio.jsx":
/*!***********************!*\
  !*** ./portfolio.jsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', (e) => {
        const y = window.scrollY
        const wh = window.innerHeight  
        const ww = window.innerWidth
        
// about-me appear

const selfIntro = document.getElementById('self-intro')
// for (let j = 0; j < 3; j++) {
//   let selfIntroInnerHTML = selfIntro.innerHTML.split("<br>")
//     .map((text,i) => '<p style="animation-delay:' + (500 * i) + 'ms">' + text + '</p>')
//     .join('')
//     selfIntro.innerHTML = selfIntroInnerHTML
// }

if (y >= 300 ) {
  selfIntro.classList.add("about-me-appear") 
} else {
  selfIntro.classList.remove("about-me-appear")
}   

// skills appear 
let rows = document.getElementsByClassName("row");
// for (let j = 0; j < rows.length; j++) {
//   rows[j].style.animationDelay = `${400 * j} ms`
// }

if(y >= 720) {
  for (let j = 0; j < rows.length; j++) {
    rows[j].classList.add('about-me-appear')
  } 
} else {
  for (let j = 0; j < rows.length; j++) {
    rows[j].classList.remove('about-me-appear')
  } 
}

// console.log(rows)


// projects appear
        let fsImg = document.getElementById("fs-img");
        if (y >= 330 + wh ) {
            fsImg.classList.add("appear") 
          } else {
            fsImg.classList.remove("appear")
          }    

          let mernImg = document.getElementById("mern-img");
          let windowAdj = 0
            if ( ww > 1050 && ww < 1450 ) { 
               windowAdj = (ww - 1000) * 0.5 
              } else if (ww >= 1450) {
                windowAdj = 225
              }
          if (y  >= 760 + windowAdj + wh) {
            mernImg.classList.add("appear") 
          } else {
            mernImg.classList.remove("appear")
          }  

          let jsImg = document.getElementById("js-img");
          if (y >= 1260 + windowAdj + wh) {
             jsImg .classList.add("appear") 
          } else {
             jsImg .classList.remove("appear")
          }  
    })

// project bullet points appear
    const bulletPoints = [document.getElementById('fs-bullet-points'), document.getElementById('mern-bullet-points'), document.getElementById('js-bullet-points')]
      for (let j = 0; j < bulletPoints.length; j++) {
        let projectInnerHTML = bulletPoints[j].innerHTML.split("<br>")
          .map((text,i) => '<li style="animation-delay:' + (400 * (i+1)) + 'ms">' + text + '</li>')
          .join('')
          bulletPoints[j].innerHTML = projectInnerHTML
      }

})

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map