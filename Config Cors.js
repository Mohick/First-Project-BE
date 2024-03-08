// config cors server for frontend
const express = require("express");


var corsOptions = {
  origin: 'http://localhost:5173', // Cập nhật địa chỉ của ứng dụng React của bạn
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type',
};

module.exports = corsOptions;
