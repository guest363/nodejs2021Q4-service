var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("server", ["require", "exports", "./app.js", "./common/config.js"], function (require, exports, app_js_1, config_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    app_js_1 = __importDefault(app_js_1);
    config_js_1 = __importDefault(config_js_1);
    (async () => {
        const fastify = await (0, app_js_1.default)();
        try {
            await fastify.listen(config_js_1.default.PORT, () => console.log(`App is running on http://localhost:${config_js_1.default.PORT}`));
        }
        catch (error) {
            fastify.log.error(error);
            process.exit(1);
        }
    })();
});
