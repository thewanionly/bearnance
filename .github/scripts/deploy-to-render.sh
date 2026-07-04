#!/usr/bin/env bash
# Deploy the bearnance web + api images to their Render services for a single
# environment, via the Render API, polling each deploy until it is live.
#
# Required environment variables:
#   RENDER_API_KEY     Render account API key. If empty, deploy is skipped (no-op)
#                      so the workflow stays green before Render is wired up.
#   SUFFIX             environment suffix -> services `bearnance-<app>-<SUFFIX>`
#   GITHUB_REPOSITORY  provided by GitHub Actions (e.g. thewanionly/bearnance)
#   GITHUB_SHA         provided by GitHub Actions (the commit being deployed)
set -euo pipefail

if [ -z "${RENDER_API_KEY:-}" ]; then
  echo "RENDER_API_KEY not set — skipping Render deploy for '${SUFFIX}'."
  exit 0
fi

api="https://api.render.com/v1"

deploy_app() {
  local app="$1"
  local service_name="bearnance-${app}-${SUFFIX}"
  local image="ghcr.io/${GITHUB_REPOSITORY}/${app}:sha-${GITHUB_SHA}"

  local service service_id owner_id
  service=$(curl -fsS "${api}/services?name=${service_name}&limit=1" \
    -H "Authorization: Bearer ${RENDER_API_KEY}" -H "Accept: application/json" \
    | jq -r '.[0].service')
  service_id=$(echo "${service}" | jq -r '.id // empty')
  owner_id=$(echo "${service}" | jq -r '.ownerId // empty')
  if [ -z "${service_id}" ]; then
    echo "::error::Render service not found: ${service_name}"
    return 1
  fi

  echo "Pointing ${service_name} (${service_id}) at ${image}"
  curl -fsS -X PATCH "${api}/services/${service_id}" \
    -H "Authorization: Bearer ${RENDER_API_KEY}" -H "Content-Type: application/json" \
    -d "{\"image\":{\"ownerId\":\"${owner_id}\",\"imagePath\":\"${image}\"}}" > /dev/null

  local dep_id
  dep_id=$(curl -fsS -X POST "${api}/services/${service_id}/deploys" \
    -H "Authorization: Bearer ${RENDER_API_KEY}" -H "Content-Type: application/json" \
    -d "{\"imageUrl\":\"${image}\"}" | jq -r '.id // empty')
  if [ -z "${dep_id}" ]; then
    echo "::error::Deploy was not triggered for ${service_name}"
    return 1
  fi
  echo "Triggered deploy ${dep_id} for ${service_name}"

  local attempt status
  for attempt in $(seq 1 40); do
    status=$(curl -fsS "${api}/services/${service_id}/deploys/${dep_id}" \
      -H "Authorization: Bearer ${RENDER_API_KEY}" -H "Accept: application/json" \
      | jq -r '.status // empty')
    echo "[${service_name}] [${attempt}/40] status=${status}"
    case "${status}" in
      live)
        echo "✓ ${service_name} is live"
        return 0
        ;;
      build_failed | update_failed | canceled | pre_deploy_failed | deactivated)
        echo "::error::Deploy for ${service_name} ended with status: ${status}"
        return 1
        ;;
    esac
    sleep 20
  done
  echo "::error::Deploy for ${service_name} timed out"
  return 1
}

# api first (so the schema is ready) then web.
deploy_app api
deploy_app web
