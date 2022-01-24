"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodesRepository = void 0;
const typeorm_1 = require("typeorm");
const episodes_1 = require("../entities/episodes");
let EpisodesRepository = class EpisodesRepository extends typeorm_1.Repository {
    findAll(limit) {
        return this.createQueryBuilder('episodes')
            .offset(limit[0])
            .take(limit[1])
            .getMany();
    }
    findById(id) {
        return this.createQueryBuilder('episodes')
            .where('episodes.id = :id', { id })
            .getOne();
    }
    update(id, data) {
        return this.createQueryBuilder('episodes')
            .update()
            .set(data)
            .where('episodes.id = :id', { id })
            .execute();
    }
    delete(id) {
        return this.createQueryBuilder('episodes')
            .delete()
            .where('episodes.id = :id', { id })
            .execute();
    }
};
EpisodesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(episodes_1.Episodes)
], EpisodesRepository);
exports.EpisodesRepository = EpisodesRepository;
