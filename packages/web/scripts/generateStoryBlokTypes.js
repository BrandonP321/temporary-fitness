const genTsSchema = require("../../shared/src/storyblok/scripts/generateSchemaTypes");
const fs = require("fs");
require("dotenv").config();

const mapiDomain = process.env.MAPI_DOMAIN;
const mapiToken = process.env.MAPI_TOKEN;
const mapiSpaceId = process.env.MAPI_SPACE_ID;
const schemaFilePath = "./src/Generated/storyblok-types.ts";

const typePrefix = "story_blok_";
const typeSuffix = "";

// generates storyblok cms schema types file
genTsSchema(mapiDomain, mapiToken, mapiSpaceId, typePrefix, typeSuffix)
	.then(schemaString => {
		fs.writeFileSync(schemaFilePath, schemaString);
	})
	.catch(err => {
		console.log(err);
	})