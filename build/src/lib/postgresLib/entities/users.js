"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Users_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
let Users = Users_1 = class Users extends typeorm_1.BaseEntity {
    findByUsername(username) {
        return Users_1.createQueryBuilder('users')
            .where('users.username = :username', {
            username,
        })
            .getOne();
    }
    findById(id) {
        return Users_1.createQueryBuilder('users')
            .where('users.id = :id', { id })
            .getOne();
    }
    updateUsername(id, username) {
        return Users_1.createQueryBuilder('users')
            .update()
            .set({ username })
            .where('users.id = :id', { id })
            .execute();
    }
    updatePassword(id, password) {
        return Users_1.createQueryBuilder('users')
            .update()
            .set({ password })
            .where('users.id = :id', { id })
            .execute();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'displayname' }),
    __metadata("design:type", String)
], Users.prototype, "displayName", void 0);
Users = Users_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], Users);
exports.Users = Users;
