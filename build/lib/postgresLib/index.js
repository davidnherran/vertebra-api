"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresLib = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("./entities/users");
const users_repository_1 = require("./repositories/users-repository");
const index_1 = require("../../config/index");
const codes_1 = require("../../utils/handlerErrors/codes");
class PostgresLib {
    constructor() {
        this.connection = (0, typeorm_1.createConnection)({
            type: 'postgres',
            host: index_1.envConfig.dbHost,
            port: parseInt(index_1.envConfig.dbPort),
            username: index_1.envConfig.dbUsername,
            password: index_1.envConfig.dbPassword,
            database: index_1.envConfig.dbName,
            entities: [users_1.Users],
        });
        this.usersRepository = this.connection.then((connect) => connect.getCustomRepository(users_repository_1.UsersRepository));
        this.users = new users_1.Users();
    }
    existUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUsername = (yield this.usersRepository).findByUsername(username);
            return existingUsername;
        });
    }
    registerUser(username, password, displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUsername = yield this.existUser(username);
            if (Boolean(existingUsername))
                return codes_1.USERNAME_IS_ALREADY_IN_USE;
            this.users.displayName = displayName;
            this.users.password = password;
            this.users.username = username;
            const user = yield (yield this.usersRepository).save(this.users);
            delete user.password;
            return user;
        });
    }
    updateUsername(newUsername, oldUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.existUser(oldUsername);
            return (yield this.usersRepository).updateUsername(user === null || user === void 0 ? void 0 : user.id, newUsername);
        });
    }
    updatePassword(newPassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (yield this.usersRepository).findById(id);
            return (yield this.usersRepository).updatePassword(user === null || user === void 0 ? void 0 : user.id, newPassword);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (yield this.usersRepository).findById(id);
            return yield (yield this.usersRepository).remove(user);
        });
    }
}
exports.PostgresLib = PostgresLib;
