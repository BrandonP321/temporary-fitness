const { compile } = require("json-schema-to-typescript")
const axios = require("axios");

/**
 * helper function to set the first letter of a schema 
 * type's name to lowercase to help with compiling
 * @param {*} name 
 * @returns 
 */
const getStringWithLowerCaseFirstLetter = (name) => {
	const splitName = name.split("");
	splitName[0] = splitName[0].toLowerCase()

	return splitName.join("");
}

/**
 * Gets and returns stringified version of schema types for a 
 * given space within the storyblok CMS
 * @param {*} mapiDomain Management API domain for the storyblock space
 * @param {*} mapiToken Management API token
 * @returns 
 */
module.exports = async function genTsSchema(mapiDomain, mapiToken, mapiSpaceId, typePrefix, typeSuffix) {
	const ComponentsJson = (await getComponentsJSON(mapiDomain, mapiToken, mapiSpaceId))?.data;
	
	let tsString = []

	for (const values of ComponentsJson.components) {
		const obj = {}
		obj.title = typePrefix + getStringWithLowerCaseFirstLetter(values.name) + typeSuffix;
		obj.type = "object"
		obj.properties = typeMapper(values.schema)
		obj.properties._uid = {
			type: "string"
		}
		obj.properties.component = {
			type: "string",
			enum: [values.name]
		}
		const requiredFields = ["_uid", "component"]
		Object.keys(values.schema).forEach(key => {
			if (values.schema[key].required) {
				requiredFields.push(key)
			}
		})
		if (requiredFields.length) {
			obj.required = requiredFields
		}
		try {
			const ts = await compile(obj, values.name, { bannerComment: "", unreachableDefinitions: false })
			tsString.push(ts)
		} catch (e) {
			console.log(e)
		}
	}

	const schemaString = getStringWithoutUnknownProperties(tsString.join("\n"));
	const allSlugs = await getAllAvailableSlugs(mapiDomain, mapiToken, mapiSpaceId);
	const slugsString = `export type StoryBlokSlugs = "${allSlugs?.join("\" | \"")}";\n\n`

	return slugsString + schemaString;
}

function typeMapper(schema = {}) {
	const parseObj = {}
	Object.keys(schema).forEach((key) => {
		const obj = {}
		const schemaElement = schema[key]
		const type = schemaElement.type
		if (type === "custom") {
			Object.assign(parseObj, customTypeParser(key, schemaElement))
			return
		} else if (type === "multilink") {
			Object.assign(parseObj, {
				[key]: {
					type: "object",
					properties: {
						cached_url: {
							type: "string"
						},
						linktype: {
							type: "string"
						}
					}
				}
			})
		}
		const schemaType = parseType(type)
		if (!schemaType) {
			return
		}
		obj[key] = {
			type: schemaType
		}
		if (schemaElement.options && schemaElement.options.length) {
			const items = schemaElement.options.map(item => item.value)
			if (schemaType === "string") {
				obj[key].enum = items
			} else {
				obj[key].items = {
					enum: items
				}
			}
		}
		Object.assign(parseObj, obj)
	})

	return parseObj
}

function parseType(type) {
	switch (type) {
		case "text":
			return "string"
		case "bloks":
			return "array"
		case "option":
			return "string"
		case "options":
			return "array"
		case "number":
			return "number"
		case "image":
			return "string"
		case "boolean":
			return "boolean"
		case "textarea":
			return "string"
		case "markdown":
			return "string"
		default:
			return null
	}
}

function customTypeParser(key, obj) {
	switch (obj.field_type) {
		case "bootstrap-utility-class-selector":
			return {
				[key]: {
					type: "object",
					properties: {
						values: {
							type: "array"
						}
					}
				}
			}
		case "vue-color-picker":
			return {
				[key]: {
					type: "object",
					properties: {
						rgba: {
							type: "string"
						}
					}
				}
			}
		case "material-icons-selector":
			return {
				[key]: {
					type: "object",
					properties: {
						name: {
							type: "string"
						}
					}
				}
			}
		case "table":
			return {
				[key]: {
					type: "object",
					properties: {
						tbody: {
							type: "array"
						},
						thead: {
							type: "array"
						}
					}
				}
			}
		default:
			return {}
	}
}

const getComponentsJSON = async (mapiDomain, mapiToken, mapiSpaceId) => {
	try {
		return await axios.get(`${mapiDomain}/v1/spaces/${mapiSpaceId}/components`, {
			headers: {
				Authorization: mapiToken
			}
		})
	} catch (err) {
		console.log(err);
		return undefined;
	}
}

const getAllAvailableSlugs = async (mapiDomain, mapiToken, mapiSpaceId) => {
	try {
		const allStories = await axios.get(`${mapiDomain}/v1/spaces/${mapiSpaceId}/stories`, {
			headers: {
				Authorization: mapiToken
			}
		})

		return allStories?.data?.stories?.map(s => !s?.is_folder && s.full_slug)?.filter(s => !!s);
	} catch (err) {
		console.log(err);
		return undefined;
	}
}

const getStringWithoutUnknownProperties = (schemaString) => {
	return schemaString.replace(/(?<=;[\s]*)\s\s\[k: string]: unknown;\n/gi, "")
}