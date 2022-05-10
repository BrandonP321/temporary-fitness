export interface StoryBlokFeature {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: unknown;
}

export interface StoryBlokGrid {
  columns?: unknown[];
  _uid: string;
  component: "grid";
  [k: string]: unknown;
}

export interface StoryBlokHomePage {
  Title?: string;
  _uid: string;
  component: "Home Page";
  [k: string]: unknown;
}

export interface StoryBlokPage {
  body?: unknown[];
  _uid: string;
  component: "page";
  [k: string]: unknown;
}

export interface StoryBlokTeaser {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: unknown;
}
