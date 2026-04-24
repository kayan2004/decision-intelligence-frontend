#!/bin/sh
set -eu

cat <<EOF >/app/dist/env.js
window.__APP_CONFIG__ = {
  VITE_API_BASE_URL: "${VITE_API_BASE_URL:-/api}"
};
EOF

exec serve -s dist -l "${PORT:-3000}"
