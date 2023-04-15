"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
//middlewares
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use((0, cors_1.default)());
//conexiones
// const PORT = environment.PORT || 4000;
// const HOST = environment.HOST || "0.0.0.0";
// db.sync({ force: true }).then(() => {
//     console.log("database coneccted!");
//     server.listen(PORT, HOST, () => {
//         console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
//     });
// });
const PORT = 3001;
server.get("/ping", (_req, res) => {
    console.log("hoola");
    res.send("pong");
});
server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
});
