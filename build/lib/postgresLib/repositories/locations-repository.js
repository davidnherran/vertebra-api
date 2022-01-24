"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsRepository = void 0;
const typeorm_1 = require("typeorm");
const locations_1 = require("../entities/locations");
let LocationsRepository = class LocationsRepository extends typeorm_1.Repository {
    findAll(limit) {
        return this.createQueryBuilder('locations')
            .offset(limit[0])
            .take(limit[1])
            .getMany();
    }
    findById(id) {
        return this.createQueryBuilder('locations')
            .where('locations.id = :id', { id })
            .getOne();
    }
    update(id, data) {
        return this.createQueryBuilder('locations')
            .update()
            .set(data)
            .where('locations.id = :id', { id })
            .execute();
    }
    delete(id) {
        return this.createQueryBuilder('locations')
            .delete()
            .where('locations.id = :id', { id })
            .execute();
    }
};
LocationsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(locations_1.Locations)
], LocationsRepository);
exports.LocationsRepository = LocationsRepository;
