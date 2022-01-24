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
var Episodes_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episodes = void 0;
const typeorm_1 = require("typeorm");
let Episodes = Episodes_1 = class Episodes extends typeorm_1.BaseEntity {
    findAll(limit) {
        return Episodes_1.createQueryBuilder('episodes')
            .offset(limit[0])
            .take(limit[1])
            .getMany();
    }
    findById(id) {
        return Episodes_1.createQueryBuilder('episodes')
            .where('episodes.id = :id', { id })
            .getOne();
    }
    update(id, data) {
        return Episodes_1.createQueryBuilder('episodes')
            .update()
            .set(data)
            .where('episodes.id = :id', { id })
            .execute();
    }
    delete(id) {
        return Episodes_1.createQueryBuilder('episodes')
            .delete()
            .where('episodes.id = :id', { id })
            .execute();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Episodes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Episodes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Episodes.prototype, "air_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Episodes.prototype, "episode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false, default: [''] }),
    __metadata("design:type", Array)
], Episodes.prototype, "characters", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Episodes.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Episodes.prototype, "created", void 0);
Episodes = Episodes_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'episodes' })
], Episodes);
exports.Episodes = Episodes;
