export type StoryBlokSlugs = "home_page_slug" | "test-folder/home_page_slug_two" | "home";

export interface StoryBlokFeature {
  name?: string;
  _uid: string;
  component: "feature";
}

export interface StoryBlokGrid {
  columns?: unknown[];
  _uid: string;
  component: "grid";
}

export interface StoryBlokHomePage {
  Title?: string;
  _uid: string;
  component: "Home Page";
}

export interface StoryBlokPage {
  body?: unknown[];
  _uid: string;
  component: "page";
}

export interface StoryBlokTeaser {
  headline?: string;
  _uid: string;
  component: "teaser";
}
