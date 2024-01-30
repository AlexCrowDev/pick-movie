#!/bin/sh
set -eu

SITE_DIR='src'
PROJECT='kino-poisk'

echo Moving headers
mv _headers "$SITE_DIR"

echo Publishing
npx wrangler pages deploy "$SITE_DIR" --project-name "$PROJECT" --branch "$CI_COMMIT_BRANCH" --commit-message "$CI_COMMIT_MESSAGE"