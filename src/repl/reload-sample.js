#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var repl = require('repl');


var r = repl.start('> ');
var c = r.context;

// 原来的初始化代码放到此函数内
c._load = function () {
  c.Segment = require('./');
  c.segment = new c.Segment();
  c.segment.useDefault();
  c.s = function () {
    return c.segment.doSegment.apply(c.segment, arguments);
  };
};

// 在REPL中执行reload()可重新加载模块
c.reload = function () {
  var t = Date.now();

  // 清空当前项目根目录下所有文件的缓存
  var dir = path.resolve(__dirname) + path.sep;
  for (var i in require.cache) {
    if (i.indexOf(dir) === 0) {
      delete require.cache[i];
    }
  }

  // 重新执行初始化
  c._load();
  console.log('OK. (spent %sms)', Date.now() - t);
}

c._load();
