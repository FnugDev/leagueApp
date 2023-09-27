"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./config/createEmotionCache.tsx":
/*!***************************************!*\
  !*** ./config/createEmotionCache.tsx ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_cache__WEBPACK_IMPORTED_MODULE_0__]);\n_emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst createEmotionCache = ()=>{\n    return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        key: \"css\",\n        prepend: true\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEmotionCache);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvY3JlYXRlRW1vdGlvbkNhY2hlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF5QztBQUN6QyxNQUFNQyxxQkFBcUI7SUFDekIsT0FBT0QsMERBQVdBLENBQUM7UUFDakJFLEtBQUs7UUFDTEMsU0FBUztJQUNYO0FBQ0Y7QUFDQSxpRUFBZUYsa0JBQWtCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbGVhZ3VlLWFwcC8uL2NvbmZpZy9jcmVhdGVFbW90aW9uQ2FjaGUudHN4P2M2NjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUNhY2hlIGZyb20gJ0BlbW90aW9uL2NhY2hlJztcbmNvbnN0IGNyZWF0ZUVtb3Rpb25DYWNoZSA9ICgpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdjc3MnLFxuICAgIHByZXBlbmQ6IHRydWVcbiAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRW1vdGlvbkNhY2hlOyJdLCJuYW1lcyI6WyJjcmVhdGVDYWNoZSIsImNyZWF0ZUVtb3Rpb25DYWNoZSIsImtleSIsInByZXBlbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./config/createEmotionCache.tsx\n");

/***/ }),

/***/ "./config/theme.tsx":
/*!**************************!*\
  !*** ./config/theme.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ theme),\n/* harmony export */   roboto: () => (/* reexport default from dynamic */ next_font_google_target_css_path_config_theme_tsx_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto___WEBPACK_IMPORTED_MODULE_1___default.a)\n/* harmony export */ });\n/* harmony import */ var next_font_google_target_css_path_config_theme_tsx_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"config/theme.tsx\",\"import\":\"Roboto\",\"arguments\":[{\"weight\":[\"300\",\"400\",\"500\",\"700\"],\"subsets\":[\"latin\"],\"display\":\"swap\"}],\"variableName\":\"roboto\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"config/theme.tsx\\\",\\\"import\\\":\\\"Roboto\\\",\\\"arguments\\\":[{\\\"weight\\\":[\\\"300\\\",\\\"400\\\",\\\"500\\\",\\\"700\\\"],\\\"subsets\\\":[\\\"latin\\\"],\\\"display\\\":\\\"swap\\\"}],\\\"variableName\\\":\\\"roboto\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_config_theme_tsx_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_config_theme_tsx_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto___WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);\n// config/theme.ts\n\n\nfunction theme(options) {\n    return (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)(options);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvdGhlbWUudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGtCQUFrQjtBQUlMQTtBQUZzQztBQU9wQyxTQUFTRSxNQUFNQyxPQUFxQjtJQUNqRCxPQUFPRixpRUFBV0EsQ0FBQ0U7QUFDckI7QUFQYUgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1sZWFndWUtYXBwLy4vY29uZmlnL3RoZW1lLnRzeD84NjQ2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbmZpZy90aGVtZS50c1xuaW1wb3J0IHsgUm9ib3RvIH0gZnJvbSAnbmV4dC9mb250L2dvb2dsZSc7XG5pbXBvcnQgeyBjcmVhdGVUaGVtZSB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcbmltcG9ydCB7IFRoZW1lT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGNvbnN0IHJvYm90byA9IFJvYm90byh7XG4gIHdlaWdodDogWyczMDAnLCAnNDAwJywgJzUwMCcsICc3MDAnXSxcbiAgc3Vic2V0czogWydsYXRpbiddLFxuICBkaXNwbGF5OiAnc3dhcCdcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGhlbWUob3B0aW9uczogVGhlbWVPcHRpb25zKSB7XG4gIHJldHVybiBjcmVhdGVUaGVtZShvcHRpb25zKTtcbn0iXSwibmFtZXMiOlsicm9ib3RvIiwiY3JlYXRlVGhlbWUiLCJ0aGVtZSIsIm9wdGlvbnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./config/theme.tsx\n");

/***/ }),

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyDocument)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/server/create-instance */ \"@emotion/server/create-instance\");\n/* harmony import */ var _config_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/theme */ \"./config/theme.tsx\");\n/* harmony import */ var _config_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/createEmotionCache */ \"./config/createEmotionCache.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_4__, _config_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__]);\n([_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_4__, _config_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\nfunction MyDocument({ emotionStyleTags }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {\n        lang: \"en\",\n        className: _config_theme__WEBPACK_IMPORTED_MODULE_5__.roboto.className,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"shortcut icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"emotion-insertion-point\",\n                        content: \"\"\n                    }, void 0, false, {\n                        fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, this),\n                    emotionStyleTags\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                children: [\n                    (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.getInitColorSchemeScript)(),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}, void 0, false, {\n                        fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}, void 0, false, {\n                        fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n        lineNumber: 15,\n        columnNumber: 10\n    }, this);\n}\n// `getInitialProps` belongs to `_document` (instead of `_app`),\n// it's compatible with static-site generation (SSG).\nMyDocument.getInitialProps = async (ctx)=>{\n    const originalRenderPage = ctx.renderPage;\n    // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.\n    // However, be aware that it can have global side effects.\n    const cache = (0,_config_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n    const { extractCriticalToChunks } = (0,_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(cache);\n    ctx.renderPage = ()=>originalRenderPage({\n            enhanceApp: (App)=>function EnhanceApp(props) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, {\n                        emotionCache: cache,\n                        ...props\n                    }, void 0, false, {\n                        fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n                        lineNumber: 43,\n                        columnNumber: 14\n                    }, this);\n                }\n        });\n    const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(ctx);\n    // This is important. It prevents Emotion to render invalid HTML.\n    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153\n    const emotionStyles = extractCriticalToChunks(initialProps.html);\n    const emotionStyleTags = emotionStyles.styles.map((style)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"style\", {\n            \"data-emotion\": `${style.key} ${style.ids.join(\" \")}`,\n            // eslint-disable-next-line react/no-danger\n            dangerouslySetInnerHTML: {\n                __html: style.css\n            }\n        }, style.key, false, {\n            fileName: \"/Users/fnug2/Code/my-league-app/pages/_document.tsx\",\n            lineNumber: 50,\n            columnNumber: 62\n        }, undefined));\n    return {\n        ...initialProps,\n        emotionStyleTags\n    };\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDd0U7QUFDdkM7QUFDRTtBQUVsQjtBQUNjO0FBSy9DLFNBQVNVLFdBQVcsRUFDakNDLGdCQUFnQixFQUNBO0lBQ2hCLHFCQUFPLDhEQUFDVCwrQ0FBSUE7UUFBQ1UsTUFBSztRQUFLQyxXQUFXTCxpREFBTUEsQ0FBQ0ssU0FBUzs7MEJBQzlDLDhEQUFDViwrQ0FBSUE7O2tDQUVILDhEQUFDVzt3QkFBS0MsS0FBSTt3QkFBZ0JDLE1BQUs7Ozs7OztrQ0FDL0IsOERBQUNDO3dCQUFLQyxNQUFLO3dCQUEwQkMsU0FBUTs7Ozs7O29CQUM1Q1I7Ozs7Ozs7MEJBRUgsOERBQUNTOztvQkFDQWQsOEVBQXdCQTtrQ0FDdkIsOERBQUNGLCtDQUFJQTs7Ozs7a0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHbkI7QUFFQSxnRUFBZ0U7QUFDaEUscURBQXFEO0FBQ3JESyxXQUFXVyxlQUFlLEdBQUcsT0FBT0M7SUFDbEMsTUFBTUMscUJBQXFCRCxJQUFJRSxVQUFVO0lBRXpDLHdHQUF3RztJQUN4RywwREFBMEQ7SUFDMUQsTUFBTUMsUUFBUWhCLHNFQUFrQkE7SUFDaEMsTUFBTSxFQUNKaUIsdUJBQXVCLEVBQ3hCLEdBQUduQiwyRUFBbUJBLENBQUNrQjtJQUN4QkgsSUFBSUUsVUFBVSxHQUFHLElBQU1ELG1CQUFtQjtZQUN4Q0ksWUFBWSxDQUFDQyxNQUF5RSxTQUFTQyxXQUFXQyxLQUFLO29CQUM3RyxxQkFBTyw4REFBQ0Y7d0JBQUlHLGNBQWNOO3dCQUFRLEdBQUdLLEtBQUs7Ozs7OztnQkFDNUM7UUFDRjtJQUNBLE1BQU1FLGVBQWUsTUFBTS9CLG9FQUF3QixDQUFDcUI7SUFDcEQsaUVBQWlFO0lBQ2pFLDZFQUE2RTtJQUM3RSxNQUFNVyxnQkFBZ0JQLHdCQUF3Qk0sYUFBYUUsSUFBSTtJQUMvRCxNQUFNdkIsbUJBQW1Cc0IsY0FBY0UsTUFBTSxDQUFDQyxHQUFHLENBQUNDLENBQUFBLHNCQUFTLDhEQUFDQTtZQUFNQyxnQkFBYyxDQUFDLEVBQUVELE1BQU1FLEdBQUcsQ0FBQyxDQUFDLEVBQUVGLE1BQU1HLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNySCwyQ0FBMkM7WUFDM0NDLHlCQUF5QjtnQkFDdkJDLFFBQVFOLE1BQU1PLEdBQUc7WUFDbkI7V0FKNEhQLE1BQU1FLEdBQUc7Ozs7O0lBS3JJLE9BQU87UUFDTCxHQUFHUCxZQUFZO1FBQ2ZyQjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1sZWFndWUtYXBwLy4vcGFnZXMvX2RvY3VtZW50LnRzeD9kMzdkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEb2N1bWVudCwgeyBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0LCBEb2N1bWVudFByb3BzLCBEb2N1bWVudENvbnRleHQgfSBmcm9tICduZXh0L2RvY3VtZW50JztcbmltcG9ydCB7IGdldEluaXRDb2xvclNjaGVtZVNjcmlwdCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcbmltcG9ydCBjcmVhdGVFbW90aW9uU2VydmVyIGZyb20gJ0BlbW90aW9uL3NlcnZlci9jcmVhdGUtaW5zdGFuY2UnO1xuaW1wb3J0IHsgQXBwVHlwZSB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB0aGVtZSwgeyByb2JvdG8gfSBmcm9tICcuLi9jb25maWcvdGhlbWUnO1xuaW1wb3J0IGNyZWF0ZUVtb3Rpb25DYWNoZSBmcm9tICcuLi9jb25maWcvY3JlYXRlRW1vdGlvbkNhY2hlJztcbmltcG9ydCB7IE15QXBwUHJvcHMgfSBmcm9tICcuL19hcHAnO1xuaW50ZXJmYWNlIE15RG9jdW1lbnRQcm9wcyBleHRlbmRzIERvY3VtZW50UHJvcHMge1xuICBlbW90aW9uU3R5bGVUYWdzOiBKU1guRWxlbWVudFtdO1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlEb2N1bWVudCh7XG4gIGVtb3Rpb25TdHlsZVRhZ3Ncbn06IE15RG9jdW1lbnRQcm9wcykge1xuICByZXR1cm4gPEh0bWwgbGFuZz1cImVuXCIgY2xhc3NOYW1lPXtyb2JvdG8uY2xhc3NOYW1lfT5cbiAgICAgIDxIZWFkPlxuICAgICAgICBcbiAgICAgICAgPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwiZW1vdGlvbi1pbnNlcnRpb24tcG9pbnRcIiBjb250ZW50PVwiXCIgLz5cbiAgICAgICAge2Vtb3Rpb25TdHlsZVRhZ3N9XG4gICAgICA8L0hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgIHtnZXRJbml0Q29sb3JTY2hlbWVTY3JpcHQoKX1cbiAgICAgICAgPE1haW4gLz5cbiAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgIDwvYm9keT5cbiAgICA8L0h0bWw+O1xufVxuXG4vLyBgZ2V0SW5pdGlhbFByb3BzYCBiZWxvbmdzIHRvIGBfZG9jdW1lbnRgIChpbnN0ZWFkIG9mIGBfYXBwYCksXG4vLyBpdCdzIGNvbXBhdGlibGUgd2l0aCBzdGF0aWMtc2l0ZSBnZW5lcmF0aW9uIChTU0cpLlxuTXlEb2N1bWVudC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoY3R4OiBEb2N1bWVudENvbnRleHQpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxSZW5kZXJQYWdlID0gY3R4LnJlbmRlclBhZ2U7XG5cbiAgLy8gWW91IGNhbiBjb25zaWRlciBzaGFyaW5nIHRoZSBzYW1lIEVtb3Rpb24gY2FjaGUgYmV0d2VlbiBhbGwgdGhlIFNTUiByZXF1ZXN0cyB0byBzcGVlZCB1cCBwZXJmb3JtYW5jZS5cbiAgLy8gSG93ZXZlciwgYmUgYXdhcmUgdGhhdCBpdCBjYW4gaGF2ZSBnbG9iYWwgc2lkZSBlZmZlY3RzLlxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUVtb3Rpb25DYWNoZSgpO1xuICBjb25zdCB7XG4gICAgZXh0cmFjdENyaXRpY2FsVG9DaHVua3NcbiAgfSA9IGNyZWF0ZUVtb3Rpb25TZXJ2ZXIoY2FjaGUpO1xuICBjdHgucmVuZGVyUGFnZSA9ICgpID0+IG9yaWdpbmFsUmVuZGVyUGFnZSh7XG4gICAgZW5oYW5jZUFwcDogKEFwcDogUmVhY3QuQ29tcG9uZW50VHlwZTxSZWFjdC5Db21wb25lbnRQcm9wczxBcHBUeXBlPiAmIE15QXBwUHJvcHM+KSA9PiBmdW5jdGlvbiBFbmhhbmNlQXBwKHByb3BzKSB7XG4gICAgICByZXR1cm4gPEFwcCBlbW90aW9uQ2FjaGU9e2NhY2hlfSB7Li4ucHJvcHN9IC8+O1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGluaXRpYWxQcm9wcyA9IGF3YWl0IERvY3VtZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xuICAvLyBUaGlzIGlzIGltcG9ydGFudC4gSXQgcHJldmVudHMgRW1vdGlvbiB0byByZW5kZXIgaW52YWxpZCBIVE1MLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL211aS9tYXRlcmlhbC11aS9pc3N1ZXMvMjY1NjEjaXNzdWVjb21tZW50LTg1NTI4NjE1M1xuICBjb25zdCBlbW90aW9uU3R5bGVzID0gZXh0cmFjdENyaXRpY2FsVG9DaHVua3MoaW5pdGlhbFByb3BzLmh0bWwpO1xuICBjb25zdCBlbW90aW9uU3R5bGVUYWdzID0gZW1vdGlvblN0eWxlcy5zdHlsZXMubWFwKHN0eWxlID0+IDxzdHlsZSBkYXRhLWVtb3Rpb249e2Ake3N0eWxlLmtleX0gJHtzdHlsZS5pZHMuam9pbignICcpfWB9IGtleT17c3R5bGUua2V5fVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tZGFuZ2VyXG4gIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgX19odG1sOiBzdHlsZS5jc3NcbiAgfX0gLz4pO1xuICByZXR1cm4ge1xuICAgIC4uLmluaXRpYWxQcm9wcyxcbiAgICBlbW90aW9uU3R5bGVUYWdzXG4gIH07XG59OyJdLCJuYW1lcyI6WyJSZWFjdCIsIkRvY3VtZW50IiwiSHRtbCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsImdldEluaXRDb2xvclNjaGVtZVNjcmlwdCIsImNyZWF0ZUVtb3Rpb25TZXJ2ZXIiLCJyb2JvdG8iLCJjcmVhdGVFbW90aW9uQ2FjaGUiLCJNeURvY3VtZW50IiwiZW1vdGlvblN0eWxlVGFncyIsImxhbmciLCJjbGFzc05hbWUiLCJsaW5rIiwicmVsIiwiaHJlZiIsIm1ldGEiLCJuYW1lIiwiY29udGVudCIsImJvZHkiLCJnZXRJbml0aWFsUHJvcHMiLCJjdHgiLCJvcmlnaW5hbFJlbmRlclBhZ2UiLCJyZW5kZXJQYWdlIiwiY2FjaGUiLCJleHRyYWN0Q3JpdGljYWxUb0NodW5rcyIsImVuaGFuY2VBcHAiLCJBcHAiLCJFbmhhbmNlQXBwIiwicHJvcHMiLCJlbW90aW9uQ2FjaGUiLCJpbml0aWFsUHJvcHMiLCJlbW90aW9uU3R5bGVzIiwiaHRtbCIsInN0eWxlcyIsIm1hcCIsInN0eWxlIiwiZGF0YS1lbW90aW9uIiwia2V5IiwiaWRzIiwiam9pbiIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwiY3NzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_document.tsx\n");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("@emotion/cache");;

/***/ }),

/***/ "@emotion/server/create-instance":
/*!**************************************************!*\
  !*** external "@emotion/server/create-instance" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = import("@emotion/server/create-instance");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.tsx")));
module.exports = __webpack_exports__;

})();