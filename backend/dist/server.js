"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _mongodb = require("mongodb");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"]["static"]("frontend/public"));
var url = process.env.MONGODB_URI;
var client = new _mongodb.MongoClient(url);
function connectToDatabase() {
  return _connectToDatabase.apply(this, arguments);
}
function _connectToDatabase() {
  _connectToDatabase = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
    return _regeneratorRuntime().wrap(function _callee24$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return client.connect();
        case 3:
          console.log("MongoDB connected successfully");
          _context25.next = 9;
          break;
        case 6:
          _context25.prev = 6;
          _context25.t0 = _context25["catch"](0);
          console.error("MongoDB connection error:", _context25.t0);
        case 9:
        case "end":
          return _context25.stop();
      }
    }, _callee24, null, [[0, 6]]);
  }));
  return _connectToDatabase.apply(this, arguments);
}
connectToDatabase();
var db = client.db("IMY_project");
var collection = db.collection("IMY-playlists");
var adminpersonels = db.collection("IMY-admin-personels");
var adminData = db.collection("IMY-admin");
app.post("/imy/login", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, email, username, password, admin, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password; //isAdmin
          _context.prev = 1;
          admin = false; // First, check for a regular user
          _context.next = 5;
          return collection.findOne({
            $or: [{
              email: email
            }, {
              username: username
            }]
          });
        case 5:
          user = _context.sent;
          if (user) {
            _context.next = 11;
            break;
          }
          _context.next = 9;
          return adminpersonels.findOne({
            $or: [{
              email: email
            }, {
              username: username
            }]
          });
        case 9:
          user = _context.sent;
          if (user) {
            console.log('user found in admins');
            admin = true;
          } else {
            console.log('user !found in admins');
          }
        case 11:
          console.log('user found in users or admins');

          // If still not found, return 404
          if (user) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 14:
          if (!(user.password !== password)) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: "Invalid password"
          }));
        case 16:
          res.status(200).json({
            id: user._id.toString(),
            message: "Login successful",
            isAdmin: admin
          });
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0.message
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 19]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/imy/signup", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, email, password, profileImage, bio, newUser, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password, profileImage = _req$body2.profileImage, bio = _req$body2.bio;
          if (!(!profileImage || !email || !password || !bio || !username)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "All fields are required."
          }));
        case 3:
          // Create the user object
          newUser = {
            username: username,
            email: email,
            password: password,
            // In a real application, make sure to hash the password
            profileImage: profileImage || null,
            // Optional, can be null
            bio: bio || null,
            // Optional, can be null
            followers: 0,
            // Default value
            following: 0,
            // Default value
            playlists: [],
            // Empty array
            friends: [],
            // Empty array
            pictures: [] // Empty array
          };
          _context2.prev = 4;
          _context2.next = 7;
          return collection.insertOne(newUser);
        case 7:
          result = _context2.sent;
          // Change "users" to your collection name
          res.status(201).json({
            message: "User created successfully",
            userId: result.insertedId
          });
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          res.status(500).json({
            error: "An error occurred while creating the user."
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 11]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/imy/user/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return collection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 7:
          res.status(200).json(user);
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: _context3.t0.message
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/imy/playlists/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, user, allPlaylists, _iterator, _step, _loop;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return collection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 4:
          user = _context5.sent;
          if (!(!user || !Array.isArray(user.playlists))) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "No playlists for the current user."
          }));
        case 7:
          allPlaylists = [];
          _iterator = _createForOfIteratorHelper(user.playlists);
          _context5.prev = 9;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var playlist, owner, refPlayListData;
            return _regeneratorRuntime().wrap(function _loop$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  playlist = _step.value;
                  console.log(playlist.reference, playlist.OwnerId);
                  if (!(playlist.reference && playlist.OwnerId)) {
                    _context4.next = 9;
                    break;
                  }
                  _context4.next = 5;
                  return collection.findOne({
                    _id: new _mongodb.ObjectId(playlist.OwnerId)
                  });
                case 5:
                  owner = _context4.sent;
                  // console.log("in here: " + owner);
                  if (owner) {
                    // console.log(owner);
                    refPlayListData = owner.playlists.find(function (pl) {
                      return pl.id.toString() === playlist.id.toString();
                    }); // console.log(refPlayListData);
                    if (refPlayListData) {
                      // Add the referenced playlist's data to allPlaylists
                      allPlaylists.push({
                        PlayListName: refPlayListData.PlayListName,
                        PlayListImage: refPlayListData.PlayListImage,
                        OwnerImage: owner.profileImage || refPlayListData.OwnerImage,
                        // Owner's profile image
                        OwnerName: owner.username || refPlayListData.OwnerName,
                        // Owner's name
                        songs: refPlayListData.songs,
                        comments: refPlayListData.comments,
                        numberOfSongs: Array.isArray(refPlayListData.songs) ? refPlayListData.songs.length : 0,
                        id: refPlayListData.id.toString(),
                        profileId: playlist.OwnerId.toString(),
                        referencedFrom: owner.username,
                        // Add info about where the reference comes from (owner's username)
                        genre: refPlayListData.genres,
                        hashtags: refPlayListData.hashtags
                      });
                    }
                  }
                  _context4.next = 10;
                  break;
                case 9:
                  allPlaylists.push({
                    PlayListName: playlist.PlayListName,
                    PlayListImage: playlist.PlayListImage,
                    OwnerImage: user.profileImage,
                    OwnerName: user.username,
                    songs: playlist.songs,
                    comments: playlist.comments,
                    numberOfSongs: Array.isArray(playlist.songs) ? playlist.songs.length : 0,
                    id: playlist.id.toString(),
                    profileId: userId,
                    genre: playlist.genres,
                    hashtags: playlist.hashtags
                  });
                case 10:
                case "end":
                  return _context4.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 12:
          if ((_step = _iterator.n()).done) {
            _context5.next = 16;
            break;
          }
          return _context5.delegateYield(_loop(), "t0", 14);
        case 14:
          _context5.next = 12;
          break;
        case 16:
          _context5.next = 21;
          break;
        case 18:
          _context5.prev = 18;
          _context5.t1 = _context5["catch"](9);
          _iterator.e(_context5.t1);
        case 21:
          _context5.prev = 21;
          _iterator.f();
          return _context5.finish(21);
        case 24:
          res.status(200).json(allPlaylists);
          _context5.next = 30;
          break;
        case 27:
          _context5.prev = 27;
          _context5.t2 = _context5["catch"](1);
          res.status(500).json({
            error: _context5.t2.message
          });
        case 30:
        case "end":
          return _context5.stop();
      }
    }, _callee4, null, [[1, 27], [9, 18, 21, 24]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.get('/imy/generalPlaylists', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var data, allPlaylists;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return collection.find({
            playlists: {
              $elemMatch: {
                reference: false
              }
            }
          }).toArray();
        case 3:
          data = _context6.sent;
          allPlaylists = [];
          data.map(function (item) {
            item.playlists.map(function (playlist) {
              if (playlist.reference === false) {
                allPlaylists.push({
                  PlayListName: playlist.PlayListName,
                  PlayListImage: playlist.PlayListImage,
                  OwnerImage: item.profileImage,
                  OwnerName: item.username,
                  songs: playlist.songs,
                  comments: playlist.comments,
                  numberOfSongs: Array.isArray(playlist.songs) ? playlist.songs.length : 0,
                  id: playlist.id.toString(),
                  profileId: item._id.toString(),
                  genre: playlist.genres,
                  hashtags: playlist.hashtags
                });
              }
            });
          });
          res.status(200).json(allPlaylists);
          _context6.next = 13;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            error: "An error occurred while searching for general playlists."
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.get('/imy/search', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var searchTerm, regex, results;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          searchTerm = req.query.q; // Get the search term from query params
          _context7.prev = 1;
          regex = new RegExp(searchTerm, 'i'); // 'i' makes the search case-insensitive
          _context7.next = 5;
          return collection.find({
            $or: [{
              "playlists.PlayListName": regex
            },
            // Search in playlist names
            {
              "username": regex
            },
            // Search in usernames
            {
              "playlists.songs.title": regex
            } // Search in song titles
            ]
          }).toArray();
        case 5:
          results = _context7.sent;
          if (!(results.length === 0)) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "No results found"
          }));
        case 8:
          res.status(200).json(results);
          _context7.next = 14;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json({
            error: _context7.t0.message
          });
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[1, 11]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
app.get("/imy/playlist/:id", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var playlistId, data, newObj;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          playlistId = req.params.id; // console.log(`Received request for playlist ID: ${playlistId}`);
          _context8.prev = 1;
          _context8.next = 4;
          return collection.findOne({
            playlists: {
              $elemMatch: {
                id: new _mongodb.ObjectId(playlistId),
                reference: false
              }
            }
          },
          // Change to 'playlists.id'
          {
            projection: {
              "playlists.$": 1,
              "_id": 1,
              "followers": 1,
              "username": 1,
              "profileImage": 1
            }
          });
        case 4:
          data = _context8.sent;
          if (!(!data || !data.playlists.length)) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 7:
          newObj = {
            playlist: data.playlists[0],
            profileId: data._id,
            followers: data.followers
          };
          newObj.playlist.OwnerImage = data.profileImage;
          newObj.playlist.OwnerName = data.username;
          res.status(200).json(newObj); // Return the found playlist and owner
          _context8.next = 17;
          break;
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](1);
          console.error(_context8.t0);
          res.status(500).json({
            error: _context8.t0.message
          });
        case 17:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[1, 13]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app.post("/imy/createPlaylist", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body3, playlistName, playlistImage, userId, newPlaylist, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$body3 = req.body, playlistName = _req$body3.playlistName, playlistImage = _req$body3.playlistImage, userId = _req$body3.userId;
          if (!(!playlistName || !playlistImage || !userId)) {
            _context9.next = 3;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            error: "All fields are required."
          }));
        case 3:
          newPlaylist = {
            PlayListName: playlistName,
            PlayListImage: playlistImage,
            songs: [],
            comments: [],
            genres: [],
            hashtags: [],
            id: new _mongodb.ObjectId(),
            reference: false
          };
          _context9.prev = 4;
          _context9.next = 7;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          }, {
            $push: {
              playlists: newPlaylist
            }
          });
        case 7:
          result = _context9.sent;
          if (!(result.modifiedCount === 0)) {
            _context9.next = 10;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            error: "Could not insert playlist."
          }));
        case 10:
          res.status(201).json({
            message: "Playlist created successfully",
            playlistId: newPlaylist.id
          });
          _context9.next = 17;
          break;
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](4);
          console.error(_context9.t0);
          res.status(500).json({
            error: "An error occurred while creating the playlist."
          });
        case 17:
        case "end":
          return _context9.stop();
      }
    }, _callee8, null, [[4, 13]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
app.post("/imy/createSong", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body4, song, userId, playlistId, newSong, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _req$body4 = req.body, song = _req$body4.song, userId = _req$body4.userId, playlistId = _req$body4.playlistId; // Validate the incoming data
          if (!(!userId || !song.title || !song.artists || !Array.isArray(song.artists) || song.artists.length === 0 || !song.spotifyURL || !song.image || !playlistId)) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "All fields are required, and artists must be an array."
          }));
        case 3:
          // Create a new song object
          newSong = {
            title: song.title,
            artists: song.artists,
            sportifyURL: song.spotifyURL,
            dateAdded: new Date().toISOString(),
            deleted: false,
            image: song.image,
            songId: new _mongodb.ObjectId() // Generate a new ObjectId for the song
          };
          _context10.prev = 4;
          _context10.next = 7;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId),
            "playlists.id": new _mongodb.ObjectId(playlistId)
          },
          // Find the user and the specific playlist
          {
            $push: {
              "playlists.$.songs": newSong
            }
          } // Push the new song into the playlist's songs array
          );
        case 7:
          result = _context10.sent;
          if (!(result.modifiedCount === 0)) {
            _context10.next = 10;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            error: "User or playlist not found, or song not created."
          }));
        case 10:
          res.status(201).json({
            message: "Song added successfully",
            song: newSong
          });
          _context10.next = 17;
          break;
        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](4);
          console.error(_context10.t0);
          res.status(500).json({
            error: "An error occurred while adding the song."
          });
        case 17:
        case "end":
          return _context10.stop();
      }
    }, _callee9, null, [[4, 13]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.post("/imy/createComment", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body5, playlistId, profileId, userId, comment, image, commenter, newComment, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _req$body5 = req.body, playlistId = _req$body5.playlistId, profileId = _req$body5.profileId, userId = _req$body5.userId, comment = _req$body5.comment, image = _req$body5.image; //userId =  the person who commented.
          //profileId = the profile that is being commented on
          // Validate the incoming data
          if (!(!playlistId || !profileId || !userId || !comment)) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "All fields are required."
          }));
        case 3:
          _context11.prev = 3;
          _context11.next = 6;
          return collection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 6:
          commenter = _context11.sent;
          if (commenter) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            error: "Commenter not found."
          }));
        case 9:
          // Create a new comment object
          newComment = {
            profileImage: commenter.profileImage || null,
            // Optional, can be null
            userName: commenter.username,
            // Assuming you have a username field in your user collection
            followers: commenter.followers || 0,
            // Use the number of followers from the user document
            commentText: comment,
            timestamp: new Date().toISOString(),
            // Current timestamp
            commentId: new _mongodb.ObjectId(),
            pinned: false,
            image: image ? image : null
          }; // Update the specific playlist by adding the new comment to the comments array
          _context11.next = 12;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(profileId),
            "playlists.id": new _mongodb.ObjectId(playlistId)
          },
          // Find the user and the specific playlist
          {
            $push: {
              "playlists.$.comments": newComment
            }
          } // Push the new comment into the playlist's comments array
          );
        case 12:
          result = _context11.sent;
          if (!(result.modifiedCount === 0)) {
            _context11.next = 15;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            error: "User or playlist not found, or comment not created."
          }));
        case 15:
          res.status(201).json({
            message: "Comment added successfully",
            comment: newComment
          });
          _context11.next = 22;
          break;
        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](3);
          console.error(_context11.t0);
          res.status(500).json({
            error: "An error occurred while adding the comment."
          });
        case 22:
        case "end":
          return _context11.stop();
      }
    }, _callee10, null, [[3, 18]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
app["delete"]("/imy/Admin/deleteProfile/:profileId", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var profileId, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          profileId = req.params.profileId; // Validate the incoming data
          if (profileId) {
            _context12.next = 3;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            error: "Profile ID is required."
          }));
        case 3:
          _context12.prev = 3;
          _context12.next = 6;
          return collection.deleteOne({
            _id: new _mongodb.ObjectId(profileId)
          });
        case 6:
          result = _context12.sent;
          if (!(result.deletedCount === 0)) {
            _context12.next = 9;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            error: "Profile not found."
          }));
        case 9:
          res.status(200).json({
            message: "Profile deleted successfully."
          });
          _context12.next = 16;
          break;
        case 12:
          _context12.prev = 12;
          _context12.t0 = _context12["catch"](3);
          console.error(_context12.t0);
          res.status(500).json({
            error: "An error occurred while deleting the profile."
          });
        case 16:
        case "end":
          return _context12.stop();
      }
    }, _callee11, null, [[3, 12]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app.patch("/imy/editProfile", /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body6, userId, profileImage, bio, username, updateData, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _req$body6 = req.body, userId = _req$body6.userId, profileImage = _req$body6.profileImage, bio = _req$body6.bio, username = _req$body6.username; // Validate the incoming data
          if (userId) {
            _context13.next = 3;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            error: "User ID is required."
          }));
        case 3:
          // Create an update object with the new values
          updateData = {};
          if (profileImage) updateData.profileImage = profileImage;
          if (bio) updateData.bio = bio;
          if (username) updateData.username = username;
          _context13.prev = 7;
          _context13.next = 10;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          },
          // Find the user by ID
          {
            $set: updateData
          } // Update only the provided fields
          );
        case 10:
          result = _context13.sent;
          if (!(result.matchedCount === 0)) {
            _context13.next = 13;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            error: "Profile not found."
          }));
        case 13:
          res.status(200).json({
            message: "Profile updated successfully."
          });
          _context13.next = 20;
          break;
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](7);
          console.error(_context13.t0);
          res.status(500).json({
            error: "An error occurred while updating the profile."
          });
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee12, null, [[7, 16]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app["delete"]("/imy/deletePlaylist", /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body7, userId, playlistId, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _req$body7 = req.body, userId = _req$body7.userId, playlistId = _req$body7.playlistId; // Validate incoming data
          if (!(!userId || !playlistId)) {
            _context14.next = 3;
            break;
          }
          return _context14.abrupt("return", res.status(400).json({
            error: "User ID and Playlist ID are required."
          }));
        case 3:
          _context14.prev = 3;
          _context14.next = 6;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          },
          // Find the user by userId
          {
            $pull: {
              playlists: {
                id: new _mongodb.ObjectId(playlistId)
              }
            }
          } // Remove the playlist by its ID
          );
        case 6:
          result = _context14.sent;
          if (!(result.modifiedCount === 0)) {
            _context14.next = 9;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            error: "Playlist not found or already deleted."
          }));
        case 9:
          res.status(200).json({
            message: "Playlist deleted successfully."
          });
          _context14.next = 16;
          break;
        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](3);
          console.error(_context14.t0);
          res.status(500).json({
            error: "An error occurred while deleting the playlist."
          });
        case 16:
        case "end":
          return _context14.stop();
      }
    }, _callee13, null, [[3, 12]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
app.put("/imy/editPlaylist", /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _req$body8, playlistId, userId, newPlaylistName, newPlaylistImage, genres, hashtags, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _req$body8 = req.body, playlistId = _req$body8.playlistId, userId = _req$body8.userId, newPlaylistName = _req$body8.newPlaylistName, newPlaylistImage = _req$body8.newPlaylistImage, genres = _req$body8.genres, hashtags = _req$body8.hashtags; // Validate incoming data
          if (!(!playlistId || !userId || !newPlaylistName || !newPlaylistImage || !genres || !hashtags)) {
            _context15.next = 3;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            error: "Playlist ID, User ID, new Playlist Name, new Playlist Image, genres, and hashtags are required."
          }));
        case 3:
          _context15.prev = 3;
          _context15.next = 6;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId),
            "playlists.id": new _mongodb.ObjectId(playlistId)
          },
          // Find user and playlist
          {
            $set: {
              "playlists.$.PlayListName": newPlaylistName,
              // Update playlist name
              "playlists.$.PlayListImage": newPlaylistImage,
              // Update playlist image
              "playlists.$.genres": genres,
              // Update playlist genres
              "playlists.$.hashtags": hashtags // Update playlist hashtags
            }
          });
        case 6:
          result = _context15.sent;
          if (!(result.modifiedCount === 0)) {
            _context15.next = 9;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            error: "Playlist not found or no changes made."
          }));
        case 9:
          res.status(200).json({
            message: "Playlist updated successfully."
          });
          _context15.next = 16;
          break;
        case 12:
          _context15.prev = 12;
          _context15.t0 = _context15["catch"](3);
          console.error(_context15.t0);
          res.status(500).json({
            error: "An error occurred while updating the playlist."
          });
        case 16:
        case "end":
          return _context15.stop();
      }
    }, _callee14, null, [[3, 12]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
app["delete"]("/imy/deleteSong", /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body9, userId, playlistId, songId, result;
    return _regeneratorRuntime().wrap(function _callee15$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _req$body9 = req.body, userId = _req$body9.userId, playlistId = _req$body9.playlistId, songId = _req$body9.songId; // Validate incoming data
          if (!(!userId || !playlistId || !songId)) {
            _context16.next = 3;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            error: "User ID, Playlist ID, and Song ID are required."
          }));
        case 3:
          console.log(userId, playlistId, songId);
          _context16.prev = 4;
          _context16.next = 7;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId),
            "playlists.id": new _mongodb.ObjectId(playlistId),
            // Find user and playlist
            "playlists.songs.songId": new _mongodb.ObjectId(songId)
          }, {
            $set: {
              "playlists.$.songs.$[song].deleted": true
            }
          }, {
            arrayFilters: [{
              "song.songId": new _mongodb.ObjectId(songId)
            }]
          });
        case 7:
          result = _context16.sent;
          if (!(result.modifiedCount === 0)) {
            _context16.next = 10;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            error: "Song not found in the specified playlist."
          }));
        case 10:
          res.status(200).json({
            message: "Song deleted successfully."
          });
          _context16.next = 17;
          break;
        case 13:
          _context16.prev = 13;
          _context16.t0 = _context16["catch"](4);
          console.error("Error deleting song:", _context16.t0);
          res.status(500).json({
            error: "An error occurred while deleting the song."
          });
        case 17:
        case "end":
          return _context16.stop();
      }
    }, _callee15, null, [[4, 13]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
app.post("/imy/friend", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _req$body10, userId, profileId, profileToAdd, result;
    return _regeneratorRuntime().wrap(function _callee16$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _req$body10 = req.body, userId = _req$body10.userId, profileId = _req$body10.profileId;
          if (!(!userId || !profileId)) {
            _context17.next = 3;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            error: "User ID and Profile ID are required."
          }));
        case 3:
          _context17.prev = 3;
          _context17.next = 6;
          return collection.findOne({
            _id: new _mongodb.ObjectId(profileId)
          });
        case 6:
          profileToAdd = _context17.sent;
          if (profileToAdd) {
            _context17.next = 9;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            error: "Profile to add as friend not found."
          }));
        case 9:
          _context17.next = 11;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          }, {
            $addToSet: {
              // $addToSet ensures that duplicates are not added
              friends: {
                id: profileToAdd._id,
                name: profileToAdd.username
              }
            }
          });
        case 11:
          result = _context17.sent;
          if (!(result.modifiedCount === 0)) {
            _context17.next = 14;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            error: "User not found or friend already added."
          }));
        case 14:
          res.status(200).json({
            message: "Friend added successfully."
          });
          _context17.next = 21;
          break;
        case 17:
          _context17.prev = 17;
          _context17.t0 = _context17["catch"](3);
          console.error(_context17.t0);
          res.status(500).json({
            error: "An error occurred while adding the friend."
          });
        case 21:
        case "end":
          return _context17.stop();
      }
    }, _callee16, null, [[3, 17]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
app.post("/imy/unfriend", /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _req$body11, userId, profileId, user, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _req$body11 = req.body, userId = _req$body11.userId, profileId = _req$body11.profileId;
          if (!(!userId || !profileId)) {
            _context18.next = 3;
            break;
          }
          return _context18.abrupt("return", res.status(400).json({
            error: "User ID and Profile ID are required."
          }));
        case 3:
          _context18.prev = 3;
          _context18.next = 6;
          return collection.findOne({
            _id: new _mongodb.ObjectId(userId),
            friends: {
              $elemMatch: {
                id: new _mongodb.ObjectId(profileId)
              }
            } // Check if friend exists
          });
        case 6:
          user = _context18.sent;
          if (user) {
            _context18.next = 9;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            error: "Friend not found in user's friends list."
          }));
        case 9:
          _context18.next = 11;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          }, {
            $pull: {
              friends: {
                id: new _mongodb.ObjectId(profileId)
              } // Remove friend by matching id
            }
          });
        case 11:
          result = _context18.sent;
          if (!(result.modifiedCount === 0)) {
            _context18.next = 14;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            error: "Failed to remove friend."
          }));
        case 14:
          res.status(200).json({
            message: "Friend removed successfully."
          });
          _context18.next = 21;
          break;
        case 17:
          _context18.prev = 17;
          _context18.t0 = _context18["catch"](3);
          console.error(_context18.t0);
          res.status(500).json({
            error: "An error occurred while removing the friend."
          });
        case 21:
        case "end":
          return _context18.stop();
      }
    }, _callee17, null, [[3, 17]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
app.post("/imy/saveplaylist", /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var _req$body12, userId, playlistId, profileId, userCollection, ownerCollection, originalPlaylist, playlistReference;
    return _regeneratorRuntime().wrap(function _callee18$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _req$body12 = req.body, userId = _req$body12.userId, playlistId = _req$body12.playlistId, profileId = _req$body12.profileId; // Validate that all required fields are provided
          if (!(!userId || !profileId || !playlistId)) {
            _context19.next = 3;
            break;
          }
          return _context19.abrupt("return", res.status(400).json({
            error: "User ID, Playlist ID and Profile ID are required."
          }));
        case 3:
          _context19.prev = 3;
          _context19.next = 6;
          return collection.findOne({
            _id: new _mongodb.ObjectId(userId)
          });
        case 6:
          userCollection = _context19.sent;
          _context19.next = 9;
          return collection.findOne({
            _id: new _mongodb.ObjectId(profileId)
          });
        case 9:
          ownerCollection = _context19.sent;
          if (userCollection) {
            _context19.next = 12;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            error: "User not found."
          }));
        case 12:
          if (ownerCollection) {
            _context19.next = 14;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            error: "Playlist owner not found."
          }));
        case 14:
          // Find the original playlist by playlistId in the owner's playlists array
          originalPlaylist = ownerCollection.playlists.find(function (pl) {
            return pl.id.toString() === playlistId;
          });
          if (originalPlaylist) {
            _context19.next = 17;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            error: "Playlist not found."
          }));
        case 17:
          // Create a new playlist reference object to add to the user's playlists
          playlistReference = {
            id: new _mongodb.ObjectId(playlistId),
            // ID of the original playlist
            OwnerId: new _mongodb.ObjectId(profileId),
            // Owner of the original playlist
            reference: true // Indicates that this is a reference
            // PlayListName: originalPlaylist.PlayListName,
            // PlayListImage: originalPlaylist.PlayListImage,
            // OwnerImage: originalPlaylist.OwnerImage,
            // OwnerName: originalPlaylist.OwnerName,
            // songs: originalPlaylist.songs
          }; // Push the new reference into the user's playlists array
          _context19.next = 20;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId)
          }, {
            $push: {
              playlists: playlistReference
            }
          });
        case 20:
          res.status(200).json({
            message: "Playlist saved successfully as a reference."
          });
          _context19.next = 27;
          break;
        case 23:
          _context19.prev = 23;
          _context19.t0 = _context19["catch"](3);
          console.error(_context19.t0);
          res.status(500).json({
            error: "An error occurred while saving the playlist."
          });
        case 27:
        case "end":
          return _context19.stop();
      }
    }, _callee18, null, [[3, 23]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());

//superUser requests ::

app.get("/imy/admin/getUsers", /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee19$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return collection.find({}).toArray();
        case 3:
          users = _context20.sent;
          res.status(200).json(users);
          _context20.next = 11;
          break;
        case 7:
          _context20.prev = 7;
          _context20.t0 = _context20["catch"](0);
          console.error(_context20.t0);
          res.status(500).json({
            error: "An error occurred while retrieving users."
          });
        case 11:
        case "end":
          return _context20.stop();
      }
    }, _callee19, null, [[0, 7]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
app.get("/imy/admin/getGenres", /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var adminDocument, genres;
    return _regeneratorRuntime().wrap(function _callee20$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return adminData.findOne({});
        case 3:
          adminDocument = _context21.sent;
          if (!(!adminDocument || !adminDocument.genre)) {
            _context21.next = 6;
            break;
          }
          return _context21.abrupt("return", res.status(404).json({
            error: "Genres not found."
          }));
        case 6:
          genres = adminDocument.genre; // Access the genre array
          res.status(200).json(genres); // Return only the genre array
          _context21.next = 14;
          break;
        case 10:
          _context21.prev = 10;
          _context21.t0 = _context21["catch"](0);
          console.error(_context21.t0);
          res.status(500).json({
            error: "An error occurred while retrieving genres."
          });
        case 14:
        case "end":
          return _context21.stop();
      }
    }, _callee20, null, [[0, 10]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());

// Server-side endpoint (e.g., in your Express server file)const { ObjectId } = require('mongodb');

app.put("/imy/pinComment", /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var _req$body13, userId, playlistId, commentId, pin, result;
    return _regeneratorRuntime().wrap(function _callee21$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _req$body13 = req.body, userId = _req$body13.userId, playlistId = _req$body13.playlistId, commentId = _req$body13.commentId, pin = _req$body13.pin; // Validate incoming data
          if (!(!userId || !playlistId || !commentId || pin === undefined)) {
            _context22.next = 3;
            break;
          }
          return _context22.abrupt("return", res.status(400).json({
            error: "User ID, Playlist ID, Comment ID, and pin status are required."
          }));
        case 3:
          _context22.prev = 3;
          _context22.next = 6;
          return collection.updateOne({
            _id: new _mongodb.ObjectId(userId),
            "playlists.id": new _mongodb.ObjectId(playlistId),
            "playlists.comments.commentId": new _mongodb.ObjectId(commentId)
          }, {
            $set: {
              "playlists.$.comments.$[comment].pinned": pin
            }
          }, {
            arrayFilters: [{
              "comment.commentId": new _mongodb.ObjectId(commentId)
            }]
          });
        case 6:
          result = _context22.sent;
          if (!(result.modifiedCount === 0)) {
            _context22.next = 9;
            break;
          }
          return _context22.abrupt("return", res.status(404).json({
            error: "Comment not found or no changes made."
          }));
        case 9:
          res.status(200).json({
            message: "Comment pin status updated successfully."
          });
          _context22.next = 16;
          break;
        case 12:
          _context22.prev = 12;
          _context22.t0 = _context22["catch"](3);
          console.error(_context22.t0);
          res.status(500).json({
            error: "An error occurred while updating the comment pin status."
          });
        case 16:
        case "end":
          return _context22.stop();
      }
    }, _callee21, null, [[3, 12]]);
  }));
  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
app.get('/imy/admin/getUsers', /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee22$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return collection.find({}).toArray();
        case 3:
          users = _context23.sent;
          // Retrieve all users
          res.json(users); // Send users as JSON response
          _context23.next = 11;
          break;
        case 7:
          _context23.prev = 7;
          _context23.t0 = _context23["catch"](0);
          console.error('Error fetching users:', _context23.t0);
          res.status(500).send('Internal Server Error');
        case 11:
        case "end":
          return _context23.stop();
      }
    }, _callee22, null, [[0, 7]]);
  }));
  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());
app.post('/imy/admin/genreAction', /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var _req$body14, flag, genre, action, timestamp, actionDescription, update, result;
    return _regeneratorRuntime().wrap(function _callee23$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _req$body14 = req.body, flag = _req$body14.flag, genre = _req$body14.genre;
          action = flag ? 'Add' : 'Delete';
          timestamp = new Date().toISOString();
          actionDescription = "".concat(action, " ").concat(genre, " on ").concat(timestamp);
          _context24.prev = 4;
          update = flag ? {
            $addToSet: {
              genre: genre
            }
          } // Adds the genre if it doesn't exist
          : {
            $pull: {
              genre: genre
            }
          }; // Removes the genre if it exists
          _context24.next = 8;
          return adminData.updateOne({
            _id: new _mongodb.ObjectId("671d242bef6678022fffbefd")
          }, // Replace with actual ID or criteria
          _objectSpread(_objectSpread({}, update), {}, {
            $push: {
              Record_changes: actionDescription
            } // Record the action with timestamp
          }));
        case 8:
          result = _context24.sent;
          if (!(result.modifiedCount === 0)) {
            _context24.next = 11;
            break;
          }
          return _context24.abrupt("return", res.status(404).json({
            message: "Genre not found or already in desired state",
            error: "not found"
          }));
        case 11:
          res.status(200).json({
            message: "Genre ".concat(action, "ed successfully"),
            record: actionDescription
          });
          _context24.next = 18;
          break;
        case 14:
          _context24.prev = 14;
          _context24.t0 = _context24["catch"](4);
          console.error('Error updating genre:', _context24.t0);
          res.status(500).json({
            message: 'An error occurred',
            error: _context24.t0.message
          });
        case 18:
        case "end":
          return _context24.stop();
      }
    }, _callee23, null, [[4, 14]]);
  }));
  return function (_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}());

//PORT TO LISTEN TO
app.listen(1337, function () {});