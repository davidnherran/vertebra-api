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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Characters_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Characters = void 0;
const typeorm_1 = require("typeorm");
let Characters = Characters_1 = class Characters extends typeorm_1.BaseEntity {
    findAll(limit) {
        return Characters_1.createQueryBuilder('characters')
            .offset(limit[0])
            .take(limit[1])
            .getMany();
    }
    findById(id) {
        return Characters_1.createQueryBuilder('characters')
            .where('characters.id = :id', { id })
            .getOne();
    }
    update(id, data) {
        return Characters_1.createQueryBuilder('characters')
            .update()
            .set(Object.assign({}, data))
            .where('characters.id = :id', { id })
            .execute();
    }
    delete(id) {
        return Characters_1.createQueryBuilder('characters')
            .delete()
            .where('characters.id = :id', { id })
            .execute();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield Characters_1.createQueryBuilder('characters')
                .insert()
                .into(Characters_1)
                .values(Object.assign({}, data))
                .execute();
            return created.raw[0];
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Characters.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-json',
        nullable: false,
        default: { name: '', url: '' },
    }),
    __metadata("design:type", Object)
], Characters.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-json',
        nullable: false,
        default: { name: '', url: '' },
    }),
    __metadata("design:type", Object)
], Characters.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false, default: [''] }),
    __metadata("design:type", Array)
], Characters.prototype, "episode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Characters.prototype, "created", void 0);
Characters = Characters_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'characters' })
], Characters);
exports.Characters = Characters;
