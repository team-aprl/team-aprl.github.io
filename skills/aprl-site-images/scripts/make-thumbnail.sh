#!/bin/sh
set -eu

if [ "$#" -lt 2 ] || [ "$#" -gt 4 ]; then
  echo "usage: $0 SOURCE TARGET [MAX_WIDTH=800] [QUALITY=82]" >&2
  exit 2
fi

source_path=$1
target_path=$2
max_width=${3:-800}
quality=${4:-82}

if [ ! -f "$source_path" ]; then
  echo "source not found: $source_path" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required" >&2
  exit 1
fi

source_width=$(sips -g pixelWidth "$source_path" | awk '/pixelWidth/ {print $2}')
resize_width=$source_width
if [ "$source_width" -gt "$max_width" ]; then
  resize_width=$max_width
fi

mkdir -p "$(dirname "$target_path")"
cwebp -quiet -q "$quality" -resize "$resize_width" 0 "$source_path" -o "$target_path"
target_bytes=$(wc -c < "$target_path" | tr -d ' ')
echo "$target_path (${resize_width}px, ${target_bytes} bytes)"
