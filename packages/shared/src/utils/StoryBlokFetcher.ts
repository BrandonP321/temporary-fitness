import axios from "axios";

type TBlokDefaults = { _uid: string; component: string };
export type TBlokWithoutDefaultProps<T extends TBlokDefaults> = Omit<T, "_uid" | "component">;

type StoryBlokFetcherInternalParams = {
	apiDomain: string;
	apiToken: string;
	/* which content version in storyblok to pull from */
	version: string;
}

export class StoryBlokFetcherInternal<TSlugs extends string> {
	private apiDomain;
	private apiToken;
	private version;

	constructor(params: StoryBlokFetcherInternalParams) {
		this.apiDomain = params.apiDomain;
		this.apiToken = params.apiToken;
		this.version = params.version;
	}

	/* fetches content based on a slug for that content entry */
	public fetchContent = <T extends TBlokDefaults>(slug: TSlugs) => {
		return new Promise<TBlokWithoutDefaultProps<T>>(async (resolve, reject) => {
			try {
				const contentRes = await axios.get<{ story: { content: TBlokWithoutDefaultProps<T> } }>(this.getEndpointFromSlug(slug));

				return resolve(contentRes?.data?.story?.content);
			} catch(err) {
				console.log(err);
				return reject(null);
			}
		})
	}

	public getEndpointFromSlug = (slug: string) => {
		return `${this.apiDomain}/v2/cdn/stories/${slug}?version=${this.version}&token=${this.apiToken}`;
	}
}