import { canPostsBeAddedToThread, type Thread } from "./domain.ts";
import { DateTime } from "luxon";
import { beforeEach, describe, expect, it } from "vitest";

describe("Given a read-only thread", () => {
  let thread: Thread;
  beforeEach(() => {
    thread = {
      title: "title",
      resolved: false,
      creation: DateTime.now(),
      readOnly: true,
    };
  });
  it("should not be possible to append new posts", () => {
    expect(canPostsBeAddedToThread(thread)).toBeFalsy();
  });
});
