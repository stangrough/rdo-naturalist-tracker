// Minimal DOM shim: just enough for assets/app.js to boot inside a plain JS
// engine, so the rendering path can be tested without a browser.
var window = this;

function Element(tag) {
  this.tagName = tag;
  this.children = [];
  this.attrs = {};
  this.dataset = {};
  this.listeners = {};
  this.textContent = "";
  this.innerHTML = "";
  this.title = "";
  this.placeholder = "";
  this.value = "";
  this.disabled = false;
  this.hidden = false;
  this.style = {
    props: {},
    setProperty: function (name, value) {
      // Browsers only accept strings here; fail loudly if we pass a number.
      if (typeof value !== "string") throw new Error("setProperty(" + name + ") needs a string");
      this.props[name] = value;
    }
  };
  this.classList = {
    set: {},
    add: function (c) { this.set[c] = true; },
    remove: function (c) { delete this.set[c]; },
    toggle: function (c, on) { if (on) this.set[c] = true; else delete this.set[c]; },
    contains: function (c) { return !!this.set[c]; }
  };
}

Element.prototype.appendChild = function (child) { this.children.push(child); return child; };
Element.prototype.removeChild = function (child) { return child; };
Element.prototype.setAttribute = function (name, value) { this.attrs[name] = value; };
Element.prototype.getAttribute = function (name) { return this.attrs[name]; };
Element.prototype.addEventListener = function (name, fn) { this.listeners[name] = fn; };
Element.prototype.querySelectorAll = function () { return []; };
Element.prototype.querySelector = function () { return null; };
Element.prototype.closest = function () { return null; };
Element.prototype.click = function () {};

var elementsById = {};

var document = {
  documentElement: new Element("html"),
  body: new Element("body"),
  title: "",
  hidden: false,
  listeners: {},
  createElement: function (tag) { return new Element(tag); },
  getElementById: function (id) {
    if (!elementsById[id]) elementsById[id] = new Element("div");
    return elementsById[id];
  },
  querySelectorAll: function () { return []; },
  addEventListener: function (name, fn) { this.listeners[name] = fn; }
};

var navigator = { language: "pl-PL" };

var storage = {};
var localStorage = {
  getItem: function (key) {
    return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
  },
  setItem: function (key, value) { storage[key] = String(value); },
  removeItem: function (key) { delete storage[key]; }
};

window.document = document;
window.navigator = navigator;
window.localStorage = localStorage;
// Tests pin the clock (FAKE_NOW) and drive the render loop by hand (__tick).
var FAKE_NOW = null;
var realDateNow = Date.now;
Date.now = function () { return FAKE_NOW === null ? realDateNow() : FAKE_NOW; };

window.setInterval = function (fn) { window.__tick = fn; return 0; };
window.setTimeout = function () { return 0; };
window.clearTimeout = function () {};
window.addEventListener = function (name, fn) { document.listeners["window:" + name] = fn; };
window.confirm = function () { return true; };
window.alert = function () {};
