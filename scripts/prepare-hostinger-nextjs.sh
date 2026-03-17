#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
artifact_dir="${root_dir}/.hostinger/node-app"
tarball_path="${root_dir}/.hostinger/node-app.tgz"
standalone_dir="${root_dir}/.next/standalone/benson-home-solutions-web"

cd "${root_dir}"

echo "Preparing Hostinger Next.js artifact..."
pnpm build

rm -rf "${artifact_dir}" "${tarball_path}"
mkdir -p "${artifact_dir}" "${artifact_dir}/.next"

if [[ ! -d "${standalone_dir}" ]]; then
  echo "Expected standalone output at ${standalone_dir}, but it was not found." >&2
  exit 1
fi

cp -R "${standalone_dir}/." "${artifact_dir}/"
cp -R "${root_dir}/.next/static" "${artifact_dir}/.next/static"

if [[ -d "${root_dir}/public" ]]; then
  cp -R "${root_dir}/public" "${artifact_dir}/public"
fi

cat > "${artifact_dir}/start-hostinger.sh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"

node server.js
EOF

chmod +x "${artifact_dir}/start-hostinger.sh"

tar -czf "${tarball_path}" -C "${artifact_dir}" .

echo "Hostinger artifact ready:"
echo "  directory: ${artifact_dir}"
echo "  tarball:   ${tarball_path}"
echo
echo "Recommended Hostinger start command:"
echo "  ./start-hostinger.sh"
