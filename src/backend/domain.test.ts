import { canPostsBeAddedToThread, type Thread } from "./domain.ts";
import { DateTime } from "luxon";
import assert from "node:assert";
import { beforeEach, describe, it } from "vitest";

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
    assert.strictEqual(canPostsBeAddedToThread(thread), false);
  });
});
