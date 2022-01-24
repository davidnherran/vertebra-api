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
const characters_1 = require("./entities/characters");
const episodes_1 = require("./entities/episodes");
const locations_1 = require("./entities/locations");
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
            entities: [users_1.Users, characters_1.Characters, locations_1.Locations, episodes_1.Episodes],
            synchronize: true,
        });
        this.users = new users_1.Users();
        this.location = new locations_1.Locations();
        this.characters = new characters_1.Characters();
        this.episodes = new episodes_1.Episodes();
        this.entitiesCrud = new Map()
            .set('locations', this.location)
            .set('characters', this.characters)
            .set('episodes', this.episodes);
    }
    existUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.findByUsername(username);
        });
    }
    registerUser(username, password, displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findByUsername(username);
            if (user)
                return codes_1.USERNAME_IS_ALREADY_IN_USE;
            this.users.displayName = displayName;
            this.users.password = password;
            this.users.username = username;
            return yield this.users.save();
        });
    }
    updateUsername(newusername, oldusername) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findByUsername(oldusername);
            if (!user)
                return codes_1.INCORRECT_USERNAME;
            return yield this.users.updateUsername(user === null || user === void 0 ? void 0 : user.id, newusername);
        });
    }
    updatePassword(id, newpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findById(id);
            if (!user)
                return 'ID NOT EXIST';
            return yield this.users.updatePassword(id, newpassword);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findById(id);
            if (!user)
                return 'ID IS NOT EXIST';
            return yield user.remove();
        });
    }
    get(entitye, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityeResolve = this.entitiesCrud.get(entitye);
            if (!entityeResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            return yield (entityeResolve === null || entityeResolve === void 0 ? void 0 : entityeResolve.findAll(limit));
        });
    }
    create(entity, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityeResolve = this.entitiesCrud.get(entity);
            if (!entityeResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            return yield entityeResolve.create(data);
        });
    }
}
exports.PostgresLib = PostgresLib;
