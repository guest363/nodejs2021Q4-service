var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("resources/tasks/task.model", ["require", "exports", "uuid"], function (require, exports, uuid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Task = void 0;
    class Task {
        constructor({ id = (0, uuid_1.v4)(), title = 'Default task', description = 'Some awesome description', order = 0, userId = '', boardId = '', columnId = '', } = {}) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.order = order;
            this.userId = userId;
            this.boardId = boardId;
            this.columnId = columnId;
        }
    }
    exports.Task = Task;
});
define("resources/tasks/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("resources/tasks/task.memory.repository", ["require", "exports", "resources/tasks/task.model"], function (require, exports, task_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.taskRepo = void 0;
    const inMemoryDb = new Map();
    exports.taskRepo = {
        getAll: async (props) => new Promise((resolve) => {
            const filtredTasks = [...inMemoryDb.values()].filter((task) => task.boardId === props.boardId);
            resolve(filtredTasks);
        }),
        supportGetAll: async () => new Promise((resolve) => {
            resolve([...inMemoryDb.values()]);
        }),
        create: async ({ task, boardId }) => new Promise((resolve) => {
            const createdTask = new task_model_1.Task({ ...task, boardId });
            inMemoryDb.set(createdTask.id, createdTask);
            resolve(createdTask);
        }),
        getById: async ({ taskId }) => new Promise((resolve) => {
            resolve(inMemoryDb.get(taskId));
        }),
        delete: async ({ taskId }) => new Promise((resolve, reject) => {
            if (!inMemoryDb.has(taskId)) {
                reject(new Error('deleted task not found'));
            }
            inMemoryDb.delete(taskId);
            resolve(true);
        }),
        update: async ({ boardId, taskId, task }) => new Promise((resolve, reject) => {
            const oldBoard = inMemoryDb.get(taskId);
            if (!oldBoard) {
                reject(new Error('updated board not found'));
            }
            const newBoard = { ...oldBoard, ...task, boardId };
            inMemoryDb.set(oldBoard.id, newBoard);
            resolve(newBoard);
        }),
    };
});
define("resources/tasks/task.service", ["require", "exports", "resources/tasks/task.memory.repository"], function (require, exports, task_memory_repository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.taskService = void 0;
    exports.taskService = {
        getAll: (props) => task_memory_repository_1.taskRepo.getAll(props),
        create: (props) => task_memory_repository_1.taskRepo.create(props),
        getById: (props) => task_memory_repository_1.taskRepo.getById(props),
        delete: (props) => task_memory_repository_1.taskRepo.delete(props),
        update: (props) => task_memory_repository_1.taskRepo.update(props),
        supportGetAll: () => task_memory_repository_1.taskRepo.supportGetAll(),
    };
});
define("resources/boards/board.model", ["require", "exports", "uuid"], function (require, exports, uuid_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Board = void 0;
    class Board {
        constructor({ id = (0, uuid_2.v4)(), title = 'Default board', columns = [{ id: (0, uuid_2.v4)(), title: 'Default column', order: 0 }], } = {}) {
            this.id = id;
            this.title = title;
            this.columns = columns;
        }
    }
    exports.Board = Board;
});
define("resources/boards/board.memory.repository", ["require", "exports", "resources/boards/board.model"], function (require, exports, board_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardRepo = void 0;
    const inMemoryDb = new Map();
    exports.boardRepo = {
        getAll: async () => [...inMemoryDb.values()],
        create: async (info) => {
            const board = new board_model_1.Board(info);
            inMemoryDb.set(board.id, board);
            return board;
        },
        getById: async (id) => inMemoryDb.get(id),
        delete: async (id) => inMemoryDb.delete(id),
        update: async (id, board) => {
            const oldBoard = inMemoryDb.get(id);
            const newBoard = { ...oldBoard, ...board };
            inMemoryDb.set(id, newBoard);
            return newBoard;
        },
    };
});
define("resources/boards/board.service", ["require", "exports", "resources/boards/board.memory.repository"], function (require, exports, board_memory_repository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardService = void 0;
    exports.boardService = {
        getAll: () => board_memory_repository_1.boardRepo.getAll(),
        create: (info) => board_memory_repository_1.boardRepo.create(info),
        getById: (id) => board_memory_repository_1.boardRepo.getById(id),
        delete: (id) => board_memory_repository_1.boardRepo.delete(id),
        update: (id, board) => board_memory_repository_1.boardRepo.update(id, board),
    };
});
define("resources/boards/api/delete", ["require", "exports", "resources/tasks/task.service", "resources/boards/board.service"], function (require, exports, task_service_1, board_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteById = void 0;
    const deleteById = async (request, reply) => {
        const { boardId } = request.params;
        const isBoardExist = await board_service_1.boardService.getById(boardId);
        if (!isBoardExist) {
            await reply.code(404).send();
        }
        else {
            await board_service_1.boardService.delete(boardId);
            const assignTasks = (await task_service_1.taskService.getAll({ boardId })).filter((task) => task.boardId === boardId);
            assignTasks.forEach(async (task) => {
                await task_service_1.taskService.delete({ taskId: task.id });
            });
            await reply.code(204).send();
        }
    };
    exports.deleteById = deleteById;
});
define("resources/boards/api/get", ["require", "exports", "resources/boards/board.service"], function (require, exports, board_service_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get = void 0;
    const get = async (_request, reply) => {
        const boards = await board_service_2.boardService.getAll();
        await reply.send(boards);
    };
    exports.get = get;
});
define("resources/boards/api/get-by-id", ["require", "exports", "resources/boards/board.service"], function (require, exports, board_service_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getById = void 0;
    const getById = async (request, reply) => {
        const board = await board_service_3.boardService.getById(request.params.boardId);
        if (!board) {
            await reply.code(404).send();
        }
        else {
            await reply.code(200).send(board);
        }
    };
    exports.getById = getById;
});
define("resources/boards/api/post", ["require", "exports", "resources/boards/board.service"], function (require, exports, board_service_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.post = void 0;
    const post = async (request, reply) => {
        const createBoard = await board_service_4.boardService.create(request.body);
        await reply.code(201).send(createBoard);
    };
    exports.post = post;
});
define("resources/boards/api/put", ["require", "exports", "resources/boards/board.service"], function (require, exports, board_service_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.put = void 0;
    const put = async (request, reply) => {
        const updateBoard = await board_service_5.boardService.update(request.params.boardId, request.body);
        await reply.code(200).send(updateBoard);
    };
    exports.put = put;
});
define("resources/common/validators/uuid-as-param", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uuidAsParam = void 0;
    exports.uuidAsParam = {
        params: {
            type: 'object',
            properties: {
                uuid: { type: 'string', format: 'uuid' },
            },
        },
    };
});
define("resources/boards/validators/board-select-fields", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardSelectFields = void 0;
    exports.boardSelectFields = {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    order: { type: 'number' },
                },
            },
        },
    };
});
define("resources/boards/api/schema/get-by-id.schema", ["require", "exports", "resources/common/validators/uuid-as-param", "resources/boards/validators/board-select-fields"], function (require, exports, uuid_as_param_1, board_select_fields_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getByIdSchema = void 0;
    exports.getByIdSchema = {
        schema: {
            ...uuid_as_param_1.uuidAsParam,
            response: {
                200: {
                    type: 'object',
                    properties: board_select_fields_1.boardSelectFields,
                },
            },
        },
    };
});
define("resources/boards/api/schema/get.schema", ["require", "exports", "resources/boards/validators/board-select-fields"], function (require, exports, board_select_fields_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchema = void 0;
    exports.getSchema = {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: board_select_fields_2.boardSelectFields,
                    },
                },
            },
        },
    };
});
define("resources/boards/validators/board-insert-fields", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardInsertFields = void 0;
    exports.boardInsertFields = {
        type: 'object',
        properties: {
            title: { type: 'string' },
            columns: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        order: { type: 'number' },
                    },
                },
            },
        },
        required: ['title', 'columns'],
        additionalProperties: false,
    };
});
define("resources/boards/api/schema/post.schema", ["require", "exports", "resources/boards/validators/board-insert-fields", "resources/boards/validators/board-select-fields"], function (require, exports, board_insert_fields_1, board_select_fields_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.postSchema = void 0;
    exports.postSchema = {
        schema: {
            body: {
                ...board_insert_fields_1.boardInsertFields,
            },
            response: {
                201: {
                    type: 'object',
                    properties: board_select_fields_3.boardSelectFields,
                },
            },
        },
    };
});
define("resources/boards/api/schema/put.schema", ["require", "exports", "resources/common/validators/uuid-as-param", "resources/boards/validators/board-insert-fields", "resources/boards/validators/board-select-fields"], function (require, exports, uuid_as_param_2, board_insert_fields_2, board_select_fields_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.putSchema = void 0;
    exports.putSchema = {
        schema: {
            ...uuid_as_param_2.uuidAsParam,
            body: {
                ...board_insert_fields_2.boardInsertFields,
            },
            response: {
                200: {
                    type: 'object',
                    properties: board_select_fields_4.boardSelectFields,
                },
            },
        },
    };
});
define("resources/boards/board.router", ["require", "exports", "resources/boards/api/delete", "resources/boards/api/get", "resources/boards/api/get-by-id", "resources/boards/api/post", "resources/boards/api/put", "resources/boards/api/schema/get-by-id.schema", "resources/boards/api/schema/get.schema", "resources/boards/api/schema/post.schema", "resources/boards/api/schema/put.schema"], function (require, exports, delete_1, get_1, get_by_id_1, post_1, put_1, get_by_id_schema_1, get_schema_1, post_schema_1, put_schema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardRouter = void 0;
    const boardRouter = (fastify) => {
        fastify.get('', get_schema_1.getSchema, get_1.get);
        fastify.post('', post_schema_1.postSchema, post_1.post);
        fastify.put('/:boardId', put_schema_1.putSchema, put_1.put);
        fastify.get('/:boardId', get_by_id_schema_1.getByIdSchema, get_by_id_1.getById);
        fastify.delete('/:boardId', get_by_id_schema_1.getByIdSchema, delete_1.deleteById);
    };
    exports.boardRouter = boardRouter;
});
define("resources/tasks/api/delete", ["require", "exports", "resources/boards/board.service", "resources/tasks/task.service"], function (require, exports, board_service_6, task_service_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteById = void 0;
    const deleteById = async (request, reply) => {
        const { taskId } = request.params;
        const isTaskExist = await task_service_2.taskService.getById({ taskId });
        const isBoardExist = await board_service_6.boardService.getById(request.params.boardId);
        if (!isTaskExist || !isBoardExist) {
            await reply.code(404).send();
        }
        else {
            await task_service_2.taskService.delete({
                boardId: request.params.boardId,
                taskId: request.params.taskId,
            });
            await reply.code(204).send();
        }
    };
    exports.deleteById = deleteById;
});
define("resources/tasks/api/get", ["require", "exports", "resources/tasks/task.service"], function (require, exports, task_service_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get = void 0;
    const get = async (request, reply) => {
        const tasks = await task_service_3.taskService.getAll({
            boardId: request.params.boardId,
        });
        await reply.code(200).send(tasks);
    };
    exports.get = get;
});
define("resources/tasks/api/get-by-id", ["require", "exports", "resources/boards/board.service", "resources/tasks/task.service"], function (require, exports, board_service_7, task_service_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getById = void 0;
    const getById = async (request, reply) => {
        const isBoardExist = await board_service_7.boardService.getById(request.params.boardId);
        const task = await task_service_4.taskService.getById({
            taskId: request.params.taskId,
        });
        if (!isBoardExist || !task) {
            await reply.code(404).send();
        }
        else {
            await reply.code(200).send(task);
        }
    };
    exports.getById = getById;
});
define("resources/tasks/api/post", ["require", "exports", "resources/boards/board.service", "resources/tasks/task.service"], function (require, exports, board_service_8, task_service_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.post = void 0;
    const post = async (request, reply) => {
        const isBoardExist = await board_service_8.boardService.getById(request.params.boardId);
        if (!isBoardExist) {
            await reply.code(404).send();
        }
        else {
            const createTask = await task_service_5.taskService.create({
                boardId: request.params.boardId,
                task: request.body,
            });
            await reply.code(201).send(createTask);
        }
    };
    exports.post = post;
});
define("resources/tasks/api/put", ["require", "exports", "resources/boards/board.service", "resources/tasks/task.service"], function (require, exports, board_service_9, task_service_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.put = void 0;
    const put = async (request, reply) => {
        const isBoardExist = await board_service_9.boardService.getById(request.params.boardId);
        const isTaskExist = await task_service_6.taskService.getById({
            taskId: request.params.taskId,
        });
        if (!isBoardExist || !isTaskExist) {
            await reply.code(404).send();
        }
        else {
            const updatedTask = await task_service_6.taskService.update({
                boardId: request.params.boardId,
                taskId: request.params.taskId,
                task: request.body,
            });
            if (!updatedTask) {
                await reply.code(404).send();
            }
            await reply.code(200).send(updatedTask);
        }
    };
    exports.put = put;
});
define("resources/tasks/validators/task-select-fields", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.taskSelectFields = void 0;
    exports.taskSelectFields = {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
    };
});
define("resources/tasks/api/schema/get-by-id.schema", ["require", "exports", "resources/common/validators/uuid-as-param", "resources/tasks/validators/task-select-fields"], function (require, exports, uuid_as_param_3, task_select_fields_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getByIdSchema = void 0;
    exports.getByIdSchema = {
        schema: {
            ...uuid_as_param_3.uuidAsParam,
            response: {
                200: {
                    type: 'object',
                    properties: task_select_fields_1.taskSelectFields,
                },
            },
        },
    };
});
define("resources/tasks/api/schema/get.schema", ["require", "exports", "../../../boards/validators/uuid-as-param", "resources/tasks/validators/task-select-fields"], function (require, exports, uuid_as_param_4, task_select_fields_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchema = void 0;
    exports.getSchema = {
        schema: {
            ...uuid_as_param_4.uuidAsParam,
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: task_select_fields_2.taskSelectFields,
                    },
                },
            },
        },
    };
});
define("resources/tasks/validators/task-insert-fields", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.taskInsertFields = void 0;
    exports.taskInsertFields = {
        type: 'object',
        properties: {
            title: { type: 'string' },
            order: { type: 'number' },
            description: { type: 'string' },
            userId: { type: ['string', 'null'], format: 'uuid' },
            boardId: { type: ['string', 'null'], format: 'uuid' },
            columnId: { type: ['string', 'null'], format: 'uuid' },
        },
        required: ['title', 'order', 'description', 'userId', 'boardId'],
        additionalProperties: false,
    };
});
define("resources/tasks/api/schema/post.schema", ["require", "exports", "../../../boards/validators/uuid-as-param", "resources/tasks/validators/task-insert-fields", "resources/tasks/validators/task-select-fields"], function (require, exports, uuid_as_param_5, task_insert_fields_1, task_select_fields_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.postSchema = void 0;
    exports.postSchema = {
        schema: {
            ...uuid_as_param_5.uuidAsParam,
            body: {
                ...task_insert_fields_1.taskInsertFields,
            },
            response: {
                201: {
                    type: 'object',
                    properties: task_select_fields_3.taskSelectFields,
                },
            },
        },
    };
});
define("resources/tasks/api/schema/put.schema", ["require", "exports", "resources/common/validators/uuid-as-param", "resources/tasks/validators/task-insert-fields", "resources/tasks/validators/task-select-fields"], function (require, exports, uuid_as_param_6, task_insert_fields_2, task_select_fields_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.putSchema = void 0;
    exports.putSchema = {
        schema: {
            ...uuid_as_param_6.uuidAsParam,
            body: {
                ...task_insert_fields_2.taskInsertFields,
            },
            response: {
                200: {
                    type: 'object',
                    properties: task_select_fields_4.taskSelectFields,
                },
            },
        },
    };
});
define("resources/tasks/task.router", ["require", "exports", "resources/tasks/api/delete", "resources/tasks/api/get", "resources/tasks/api/get-by-id", "resources/tasks/api/post", "resources/tasks/api/put", "resources/tasks/api/schema/get-by-id.schema", "resources/tasks/api/schema/get.schema", "resources/tasks/api/schema/post.schema", "resources/tasks/api/schema/put.schema"], function (require, exports, delete_2, get_2, get_by_id_2, post_2, put_2, get_by_id_schema_2, get_schema_2, post_schema_2, put_schema_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.taskRouter = void 0;
    const taskRouter = (fastify) => {
        fastify.get('/:boardId/tasks', get_schema_2.getSchema, get_2.get);
        fastify.post('/:boardId/tasks', post_schema_2.postSchema, post_2.post);
        fastify.put('/:boardId/tasks/:taskId', put_schema_2.putSchema, put_2.put);
        fastify.get('/:boardId/tasks/:taskId', get_by_id_schema_2.getByIdSchema, get_by_id_2.getById);
        fastify.delete('/:boardId/tasks/:taskId', get_by_id_schema_2.getByIdSchema, delete_2.deleteById);
    };
    exports.taskRouter = taskRouter;
});
define("resources/users/user.model", ["require", "exports", "uuid"], function (require, exports, uuid_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.User = void 0;
    class User {
        constructor({ id = (0, uuid_3.v4)(), name = 'USER', login = 'user', password = 'P@55w0rd', }) {
            this.id = id;
            this.name = name;
            this.login = login;
            this.password = password;
        }
    }
    exports.User = User;
});
define("resources/users/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("resources/users/user.memory.repository", ["require", "exports", "resources/users/user.model"], function (require, exports, user_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.usersRepo = void 0;
    const inMemoryDb = new Map();
    exports.usersRepo = {
        getAll: async () => new Promise((resolve) => {
            const usersFromDb = [...inMemoryDb.values()];
            resolve(usersFromDb);
        }),
        create: async (info) => new Promise((resolve) => {
            const user = new user_model_1.User(info);
            inMemoryDb.set(user.id, user);
            resolve(user);
        }),
        getById: async (id) => new Promise((resolve) => {
            const user = inMemoryDb.get(id);
            resolve(user);
        }),
        delete: async (id) => new Promise((resolve, reject) => {
            if (!inMemoryDb.has(id)) {
                reject(new Error('deleted user not found'));
            }
            inMemoryDb.delete(id);
            resolve(true);
        }),
        update: async (id, user) => new Promise((resolve, reject) => {
            const oldUser = inMemoryDb.get(id);
            if (!oldUser) {
                reject(new Error('updated user not found'));
            }
            const newUser = { ...oldUser, ...user };
            inMemoryDb.set(id, newUser);
            resolve(newUser);
        }),
    };
});
define("resources/users/user.service", ["require", "exports", "resources/users/user.memory.repository"], function (require, exports, user_memory_repository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.usersService = void 0;
    exports.usersService = {
        getAll: () => user_memory_repository_1.usersRepo.getAll(),
        create: (info) => user_memory_repository_1.usersRepo.create(info),
        getById: (id) => user_memory_repository_1.usersRepo.getById(id),
        delete: (id) => user_memory_repository_1.usersRepo.delete(id),
        update: (id, user) => user_memory_repository_1.usersRepo.update(id, user),
    };
});
define("resources/users/api/delete", ["require", "exports", "resources/tasks/task.service", "resources/users/user.service"], function (require, exports, task_service_7, user_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteById = void 0;
    const deleteById = async (request, reply) => {
        const { userId } = request.params;
        await user_service_1.usersService.delete(userId);
        const assignTasks = (await task_service_7.taskService.supportGetAll()).filter((task) => task.userId === userId);
        assignTasks.forEach(async (task) => {
            await task_service_7.taskService.update({
                boardId: task.boardId,
                task: { ...task, userId: null },
                taskId: task.id,
            });
        });
        await reply.code(204).send();
    };
    exports.deleteById = deleteById;
});
define("resources/users/api/get", ["require", "exports", "resources/users/user.service"], function (require, exports, user_service_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get = void 0;
    const get = async () => {
        const user = await user_service_2.usersService.getAll();
        return user;
    };
    exports.get = get;
});
define("resources/users/api/get-by-id", ["require", "exports", "resources/users/user.service"], function (require, exports, user_service_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getById = void 0;
    const getById = async (request, reply) => {
        const users = await user_service_3.usersService.getById(request.params.userId);
        if (!users) {
            await reply.code(404).send();
        }
        else {
            await reply.code(200).send(users);
        }
    };
    exports.getById = getById;
});
define("resources/users/api/post", ["require", "exports", "resources/users/user.service"], function (require, exports, user_service_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.post = void 0;
    const post = async (request, reply) => {
        const createUser = await user_service_4.usersService.create(request.body);
        await reply.code(201).send(createUser);
    };
    exports.post = post;
});
define("resources/users/api/put", ["require", "exports", "resources/users/user.service"], function (require, exports, user_service_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.put = void 0;
    const put = async (request, reply) => {
        const updateUser = await user_service_5.usersService.update(request.params.userId, request.body);
        await reply.code(200).send(updateUser);
    };
    exports.put = put;
});
define("resources/users/validators/user-select-fields", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userSelectFields = void 0;
    exports.userSelectFields = {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
    };
});
define("resources/users/api/schema/get-by-id.schema", ["require", "exports", "resources/users/validators/user-select-fields", "resources/common/validators/uuid-as-param"], function (require, exports, user_select_fields_1, uuid_as_param_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getByIdSchema = void 0;
    exports.getByIdSchema = {
        schema: {
            ...uuid_as_param_7.uuidAsParam,
            response: {
                200: {
                    type: 'object',
                    properties: user_select_fields_1.userSelectFields,
                },
            },
        },
    };
});
define("resources/users/api/schema/get.schema", ["require", "exports", "resources/users/validators/user-select-fields"], function (require, exports, user_select_fields_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchema = void 0;
    exports.getSchema = {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: user_select_fields_2.userSelectFields,
                    },
                },
            },
        },
    };
});
define("resources/users/validators/user-insert-fields", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userInsertFields = void 0;
    exports.userInsertFields = {
        type: 'object',
        properties: {
            name: { type: 'string' },
            login: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['name', 'login', 'password'],
        additionalProperties: false,
    };
});
define("resources/users/api/schema/post.schema", ["require", "exports", "resources/users/validators/user-insert-fields", "resources/users/validators/user-select-fields"], function (require, exports, user_insert_fields_1, user_select_fields_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.postSchema = void 0;
    exports.postSchema = {
        schema: {
            body: {
                ...user_insert_fields_1.userInsertFields,
            },
            response: {
                201: {
                    type: 'object',
                    properties: user_select_fields_3.userSelectFields,
                },
            },
        },
    };
});
define("resources/users/api/schema/put.schema", ["require", "exports", "resources/users/validators/user-insert-fields", "resources/users/validators/user-select-fields", "resources/common/validators/uuid-as-param"], function (require, exports, user_insert_fields_2, user_select_fields_4, uuid_as_param_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.putSchema = void 0;
    exports.putSchema = {
        schema: {
            ...uuid_as_param_8.uuidAsParam,
            body: {
                ...user_insert_fields_2.userInsertFields,
            },
            response: {
                200: {
                    type: 'object',
                    properties: user_select_fields_4.userSelectFields,
                },
            },
        },
    };
});
define("resources/users/user.router", ["require", "exports", "resources/users/api/delete", "resources/users/api/get", "resources/users/api/get-by-id", "resources/users/api/post", "resources/users/api/put", "resources/users/api/schema/get-by-id.schema", "resources/users/api/schema/get.schema", "resources/users/api/schema/post.schema", "resources/users/api/schema/put.schema"], function (require, exports, delete_3, get_3, get_by_id_3, post_3, put_3, get_by_id_schema_3, get_schema_3, post_schema_3, put_schema_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userRouter = void 0;
    const userRouter = (fastify) => {
        fastify.get('', get_schema_3.getSchema, get_3.get);
        fastify.post('', post_schema_3.postSchema, post_3.post);
        fastify.put('/:userId', put_schema_3.putSchema, put_3.put);
        fastify.get('/:userId', get_by_id_schema_3.getByIdSchema, get_by_id_3.getById);
        fastify.delete('/:userId', get_by_id_schema_3.getByIdSchema, delete_3.deleteById);
    };
    exports.userRouter = userRouter;
});
define("variables", ["require", "exports", "path"], function (require, exports, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.__dirname = void 0;
    path_1 = __importDefault(path_1);
    exports.__dirname = path_1.default.resolve(path_1.default.dirname(''));
});
define("app", ["require", "exports", "fastify", "fastify-swagger", "path", "resources/boards/board.router", "resources/tasks/task.router", "resources/users/user.router", "variables"], function (require, exports, fastify_1, fastify_swagger_1, path_2, board_router_1, task_router_1, user_router_1, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fastify_1 = __importDefault(fastify_1);
    fastify_swagger_1 = __importDefault(fastify_swagger_1);
    path_2 = __importDefault(path_2);
    async function buildApp() {
        const app = (0, fastify_1.default)({ logger: true });
        await app.register(fastify_swagger_1.default, {
            mode: 'static',
            exposeRoute: true,
            routePrefix: '/doc',
            specification: {
                path: path_2.default.join(variables_1.__dirname, './doc/api.yaml'),
                postProcessor(swaggerObject) {
                    return swaggerObject;
                },
                baseDir: '/doc',
            },
        });
        app.route({
            method: 'GET',
            url: '/',
            handler: async (_request, reply) => {
                await reply.send('Service is running!');
            },
        });
        await app.register(user_router_1.userRouter, { prefix: '/users' });
        await app.register(board_router_1.boardRouter, { prefix: '/boards' });
        await app.register(task_router_1.taskRouter, { prefix: '/boards' });
        return app;
    }
    exports.default = buildApp;
});
define("common/config", ["require", "exports", "dotenv", "path", "variables"], function (require, exports, dotenv_1, path_3, variables_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.config = void 0;
    dotenv_1 = __importDefault(dotenv_1);
    path_3 = __importDefault(path_3);
    dotenv_1.default.config({
        path: path_3.default.join(variables_2.__dirname, '.env'),
    });
    exports.config = {
        PORT: parseInt(String(process.env.PORT), 10) || 4000,
        NODE_ENV: process.env.NODE_ENV || 'production',
        MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        AUTH_MODE: process.env.AUTH_MODE === 'true',
    };
});
define("server", ["require", "exports", "app", "common/config"], function (require, exports, app_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    app_1 = __importDefault(app_1);
    (async () => {
        const fastify = await (0, app_1.default)();
        try {
            fastify.listen(config_1.config.PORT, () => console.log(`App is running on http://localhost:${String(config_1.config.PORT)}`));
        }
        catch (error) {
            fastify.log.error(error);
            process.exit(1);
        }
    })().catch((error) => {
        process.stderr.write(`Can't buildApp ${error?.message}`);
        process.exit(1);
    });
});
