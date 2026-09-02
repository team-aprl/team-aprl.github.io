#!/bin/sh
set -eu

if [ "$#" -lt 2 ] || [ "$#" -gt 5 ]; then
  echo "usage: $0 SOURCE TARGET [MAX_WIDTH=1800] [MAX_HEIGHT=1200] [QUALITY=90]" >&2
  exit 2
fi

source_path=$1
target_path=$2
max_width=${3:-1800}
max_height=${4:-1200}
quality=${5:-90}

if [ ! -f "$source_path" ]; then
  echo "source not found: $source_path" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required" >&2
  exit 1
fi

source_width=$(sips -g pixelWidth "$source_path" | awk '/pixelWidth/ {print $2}')
source_height=$(sips -g pixelHeight "$source_path" | awk '/pixelHeight/ {print $2}')
target_size=$(awk -v w="$source_width" -v h="$source_height" -v mw="$max_width" -v mh="$max_height" 'BEGIN {
  scale = 1
  if (mw / w < scale) scale = mw / w
  if (mh / h < scale) scale = mh / h
  printf "%d %d", int(w * scale), int(h * scale)
}')
target_width=${target_size% *}

mkdir -p "$(dirname "$target_path")"
cwebp -quiet -q "$quality" -resize "$target_width" 0 "$source_path" -o "$target_path"
target_bytes=$(wc -c < "$target_path" | tr -d ' ')
echo "$target_path (${target_width}px wide, ${target_bytes} bytes)"
