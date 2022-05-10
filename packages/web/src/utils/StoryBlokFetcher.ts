import { StoryBlokFetcherInternal } from "@tempfit/shared/src/utils/StoryBlokFetcher";

const apiDomain = process.env.REACT_APP_SB_CONTENT_API_DOMAIN ?? "";
const apiToken = process.env.REACT_APP_SB_CONTENT_API_TOKEN ?? "";
const apiVersion = process.env.REACT_APP_SB_CONTENT_API_VERSION ?? "published";

export const StoryBlokFetcher = new StoryBlokFetcherInternal({ apiDomain, apiToken, version: apiVersion });