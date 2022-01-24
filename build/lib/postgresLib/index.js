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
                throw new Error(codes_1.USERNAME_IS_ALREADY_IN_USE);
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
                throw new Error(codes_1.INCORRECT_USERNAME);
            return yield this.users.updateUsername(user === null || user === void 0 ? void 0 : user.id, newusername);
        });
    }
    updatePassword(id, newpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findById(id);
            if (!user)
                throw new Error(`IDENTIFIER_${id}_NOT_EXIST`);
            return yield this.users.updatePassword(id, newpassword);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findById(id);
            if (!user)
                throw new Error(`IDENTIFIER_${id}_NOT_EXIST`);
            return yield user.remove();
        });
    }
    find(entitye, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityResolve = this.entitiesCrud.get(entitye);
            if (!entityResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            return yield (entityResolve === null || entityResolve === void 0 ? void 0 : entityResolve.findAll(limit));
        });
    }
    create(entity, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityResolve = this.entitiesCrud.get(entity);
            if (!entityResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            return yield entityResolve.create(data);
        });
    }
    findById(entity, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityResolve = this.entitiesCrud.get(entity);
            if (!entityResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            const data = yield entityResolve.findById(id);
            if (!data)
                throw new Error(`@crud/IDENTIFIER_${id}_NOT_EXIST_IN_${entity}`);
            return data;
        });
    }
    delete(entity, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityResolve = this.entitiesCrud.get(entity);
            if (!entityResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            const deletedData = yield entityResolve.delete(id);
            if (deletedData.affected !== 1)
                throw new Error(`@crud/IDENTIFIER_${id}_NOT_EXIST`);
            return {
                affected: deletedData.affected,
                idDeleted: id,
                message: `Data removed from ${entity}`,
            };
        });
    }
    update(entity, id, newdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.findById(entity, id);
            if (!exist)
                throw new Error(`IDENTIFIER_${id}_NOT_EXIST_IN_${entity}`);
            const entityResolve = this.entitiesCrud.get(entity);
            if (!entityResolve)
                throw new Error(codes_1.CONTROLLER_IS_REQUIRED);
            const updatedData = yield entityResolve.update(id, newdata);
            return {
                affected: updatedData,
                message: `Data updated from ${entity}`,
                idUpdated: id,
            };
        });
    }
}
exports.PostgresLib = PostgresLib;
