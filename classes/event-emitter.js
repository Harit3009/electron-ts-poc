"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = {};
    }
    EventEmitter.prototype.emit = function (eventName, data) {
        var _this = this;
        var _a;
        (_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.forEach(function (callback) {
            return setTimeout(callback.apply(_this, __spreadArray([_this], data, true)), 0);
        });
    };
    EventEmitter.prototype.on = function (name, callback) {
        if (typeof callback === "function" && typeof name === "string") {
            if (!this.listeners[name])
                this.listeners[name] = [];
            this.listeners[name].push(callback);
        }
    };
    EventEmitter.prototype.off = function (eventName, callback) {
        this.listeners[eventName] = this.listeners[eventName].filter(function (listener) { return !(listener === callback); });
    };
    EventEmitter.prototype.destroy = function () {
        this.listeners = {};
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
