"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./common/config");
const logger_1 = require("./logger");
let fastify;
const logger = new logger_1.Logger(config_1.config.LOG_LEVEL);
(async () => {
    fastify = await (0, app_1.default)(logger);
    try {
        fastify.listen(config_1.config.PORT, () => fastify.log.info(`App is running on http://localhost:${String(config_1.config.PORT)}`));
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})().catch((error) => {
    logger.error(`Can't buildApp ${error?.message}`);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    logger.error(`uncaughtException - ${error?.message}`);
    process.exit(1);
});
process.on('unhandledRejection', (error) => {
    if (error instanceof Error) {
        logger.error(`unhandledRejection - ${error?.message}`);
    }
    else
        logger.error(`unhandledRejection`);
    process.exit(1);
});
