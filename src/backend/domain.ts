import { DateTime } from "luxon";

export type Tag = {
  name: string;
};

export type Thread = {
  title: string;
  creation: DateTime;
  resolved: boolean;
  readOnly: boolean;
};

export type Post = {
  creation: DateTime;
  content: string;
};

export type User = {
  email: string;
  publicName: string;
  imageUrl: string | undefined;
};

export const canPostsBeAddedToThread = (thread: Thread) => !thread.readOnly;
