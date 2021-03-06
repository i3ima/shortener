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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlResolver = void 0;
const Url_1 = require("../entities/Url");
const type_graphql_1 = require("type-graphql");
const shortid_1 = require("shortid");
const turbocommons_ts_1 = require("turbocommons-ts");
let ErrorField = class ErrorField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "message", void 0);
ErrorField = __decorate([
    type_graphql_1.ObjectType()
], ErrorField);
let UrlResponse = class UrlResponse {
};
__decorate([
    type_graphql_1.Field(() => [ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], UrlResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Url_1.Url, { nullable: true }),
    __metadata("design:type", Url_1.Url)
], UrlResponse.prototype, "url", void 0);
UrlResponse = __decorate([
    type_graphql_1.ObjectType()
], UrlResponse);
let UrlResolver = class UrlResolver {
    async govno() {
        return "govno";
    }
    async createUrl(URL, desc, { em }) {
        URL = "https://" + URL;
        if (!turbocommons_ts_1.StringUtils.isUrl(URL)) {
            return {
                errors: [
                    {
                        field: "url",
                        message: "This is not a valid URL!"
                    }
                ]
            };
        }
        const shorted = shortid_1.generate();
        let url;
        try {
            url = await em.findOne(Url_1.Url, { url: URL });
        }
        catch (error) {
        }
        if (url) {
            return { url };
        }
        url = await em.create(Url_1.Url, { url: URL, desc: desc, short: shorted });
        try {
            await em.persistAndFlush(url);
        }
        catch (error) {
            console.log(error);
        }
        return { url };
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "govno", null);
__decorate([
    type_graphql_1.Mutation(() => UrlResponse),
    __param(0, type_graphql_1.Arg('url')),
    __param(1, type_graphql_1.Arg('description')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "createUrl", null);
UrlResolver = __decorate([
    type_graphql_1.Resolver(Url_1.Url)
], UrlResolver);
exports.UrlResolver = UrlResolver;
//# sourceMappingURL=UrlResolver.js.map