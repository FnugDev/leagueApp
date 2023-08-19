"use strict";
(() => {
var exports = {};
exports.id = 854;
exports.ids = [854];
exports.modules = {

/***/ 1755:
/***/ ((module) => {

module.exports = require("league-connect");

/***/ }),

/***/ 4750:
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
        const summonerData = summonerResponse.json();
        const accountpuuid = summonerData.puuid;
        const matchHistoryResponse = await (0,league_connect__WEBPACK_IMPORTED_MODULE_0__.createHttp1Request)({
            method: "GET",
            url: `/lol/match/v5/matches/by-puuid/${accountpuuid}/ids/`
        }, credentials);
        const responseBody = matchHistoryResponse.json();
        const matchHistory = JSON.parse(responseBody).matches;
        res.status(200).json({
            responseBody
        });
    } catch (error) {
        console.error("Error retrieving match history:", error);
        res.status(500).json({
            error: "An error occurred while retrieving match history."
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
var __webpack_exports__ = (__webpack_exec__(4750));
module.exports = __webpack_exports__;

})();