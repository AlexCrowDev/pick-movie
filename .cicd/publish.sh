#!/bin/sh
set -eu

SITE_DIR='dist'
PROJECT='kino-poisk'

echo Publishing

npx wrangler pages deploy "$SITE_DIR" --project-name "$PROJECT" --branch "$CI_COMMIT_BRANCH" --commit-message "$CI_COMMIT_MESSAGE"

echo Done