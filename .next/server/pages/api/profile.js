"use strict";
(() => {
var exports = {};
exports.id = 925;
exports.ids = [925];
exports.modules = {

/***/ 1755:
/***/ ((module) => {

module.exports = require("league-connect");

/***/ }),

/***/ 2711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var league_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1755);
/* harmony import */ var league_connect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(league_connect__WEBPACK_IMPORTED_MODULE_0__);

const handler = async (_req, res)=>{
    try {
        const credentials = await (0,league_connect__WEBPACK_IMPORTED_MODULE_0__.authenticate)();
        const session = await (0,league_connect__WEBPACK_IMPORTED_MODULE_0__.createHttpSession)(credentials);
        const summonerResponse = await (0,league_connect__WEBPACK_IMPORTED_MODULE_0__.createHttp2Request)({
            method: "GET",
            url: "/lol-summoner/v1/current-summoner"
        }, session, credentials);
        const summonerName = summonerResponse.json();
        res.status(200).json({
            summonerName
        });
    } catch (error) {
        console.error("Error retrieving summoner name:", error);
        res.status(500).json({
            error: "An error occurred while retrieving summoner name."
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2711));
module.exports = __webpack_exports__;

})();