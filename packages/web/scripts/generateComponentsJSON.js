const genTsSchema = require("../../shared/src/storyblok/scripts/generateSchemaTypes");
const fs = require("fs");
require("dotenv").config();

const mapiDomain = process.env.MAPI_DOMAIN;
const mapiToken = process.env.MAPI_TOKEN;
const schemaFilePath = "./src/Generated/storyblock-types.ts";

const typePrefix = "story_blok_";
const typeSuffix = "";

// generates storyblok cms schema types file
genTsSchema(mapiDomain, mapiToken, typePrefix, typeSuffix)
	.then(schemaString => {
		fs.writeFileSync(schemaFilePath, schemaString);
	})
	.catch(err => {
		console.log(err);
	})