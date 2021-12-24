"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./common/config");
let fastify;
(async () => {
    fastify = await (0, app_1.default)();
    try {
        fastify.listen(config_1.config.PORT, () => fastify.log.info(`App is running on http://localhost:${String(config_1.config.PORT)}`));
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})().catch((error) => {
    process.stderr.write(`Can't buildApp ${error?.message}`);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    fastify?.log?.error(error, 'uncaughtException');
    process.exit(1);
});
process.on('unhandledRejection', (error) => {
    fastify?.log?.error(error, 'unhandledRejection');
    process.exit(1);
});
