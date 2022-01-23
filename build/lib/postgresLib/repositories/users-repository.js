"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("../entities/users");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    findByUsername(username) {
        return this.createQueryBuilder('users')
            .where('users.username = :username', {
            username,
        })
            .getOne();
    }
    findById(id) {
        return this.createQueryBuilder('users')
            .where('users.id = :id', { id })
            .getOne();
    }
    updateUsername(id, username) {
        return this.createQueryBuilder('users')
            .update()
            .set({ username })
            .where('users.id = :id', { id })
            .execute();
    }
    updatePassword(id, password) {
        return this.createQueryBuilder('users')
            .update()
            .set({ password })
            .where('users.id = :id', { id })
            .execute();
    }
};
UsersRepository = __decorate([
    (0, typeorm_1.EntityRepository)(users_1.Users)
], UsersRepository);
exports.UsersRepository = UsersRepository;
