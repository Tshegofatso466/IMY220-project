"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//CREATE APP
var app = (0, _express["default"])();
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(_express["default"]["static"]("frontend/public"));
//PORT TO LISTEN TO
app.listen(1337, function () {});