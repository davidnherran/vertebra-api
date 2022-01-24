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
var Locations_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locations = void 0;
const typeorm_1 = require("typeorm");
let Locations = Locations_1 = class Locations extends typeorm_1.BaseEntity {
    findAll(limit) {
        return Locations_1.createQueryBuilder('locations')
            .offset(limit[0])
            .take(limit[1])
            .getMany();
    }
    findById(id) {
        return Locations_1.createQueryBuilder('locations')
            .where('locations.id = :id', { id })
            .getOne();
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield Locations_1.createQueryBuilder('locations')
                .update()
                .set(Object.assign({}, data))
                .where('locations.id = :id', { id })
                .execute();
            return updated.affected;
        });
    }
    delete(id) {
        return Locations_1.createQueryBuilder('locations')
            .delete()
            .where('locations.id = :id', { id })
            .execute();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield Locations_1.createQueryBuilder('locations')
                .insert()
                .into(Locations_1)
                .values(Object.assign({}, data))
                .execute();
            return created.raw[0];
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Locations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Locations.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Locations.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Locations.prototype, "dimension", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: false, default: [''] }),
    __metadata("design:type", Array)
], Locations.prototype, "residents", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Locations.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Locations.prototype, "created", void 0);
Locations = Locations_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'locations' })
], Locations);
exports.Locations = Locations;
