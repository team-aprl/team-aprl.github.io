#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "open3"

site = Pathname(ARGV.fetch(0, "_site")).expand_path
abort "site directory not found: #{site}" unless site.directory?

errors = []
checked = 0
click_previews = 0

def image_dimensions(path)
  output, status = Open3.capture2("sips", "-g", "pixelWidth", "-g", "pixelHeight", path.to_s)
  return unless status.success?

  [output[/pixelWidth: (\d+)/, 1]&.to_i, output[/pixelHeight: (\d+)/, 1]&.to_i]
end

site.glob("**/*.html").each do |html_path|
  html = html_path.read
  high_priority = 0

  html.scan(/<img\b[^>]*>/i).each do |tag|
    checked += 1
    src = tag[/\bsrc=["']([^"']+)["']/i, 1]
    next unless src
    next if src.start_with?("http:", "https:", "data:")
    next if File.extname(src.split("?", 2).first).downcase == ".svg"

    label = "#{html_path.relative_path_from(site)}: #{src}"
    errors << "#{label} missing width" unless tag.match?(/\bwidth=["']\d+["']/i)
    errors << "#{label} missing height" unless tag.match?(/\bheight=["']\d+["']/i)
    errors << "#{label} missing loading" unless tag.match?(/\bloading=["'](?:lazy|eager)["']/i)
    errors << "#{label} missing async decoding" unless tag.match?(/\bdecoding=["']async["']/i)
    high_priority += 1 if tag.match?(/\bfetchpriority=["']high["']/i)

    clean_src = src.split(/[?#]/, 2).first.sub(%r{\A/}, "")
    asset = site.join(clean_src)
    next unless asset.file?
    next if asset.extname.downcase == ".webp" && src.include?("dalgu-walk")

    size = asset.size
    errors << "#{label} is #{(size / 1024.0).round} KB (limit 300 KB)" if size > 300 * 1024
  end

  html.scan(/<a\b([^>]*)>(.*?)<\/a>/im).each do |attributes, body|
    next unless body.match?(/<img\b/i)

    href = attributes[/\bhref=["']([^"']+)["']/i, 1]
    next unless href

    clean_href = href.split(/[?#]/, 2).first.sub(%r{\A/}, "")
    next unless clean_href.match?(%r{\Aassets/(?:datasets|gallery)/})

    asset = site.join(clean_href)
    next unless asset.file?

    click_previews += 1
    dimensions = image_dimensions(asset)
    next unless dimensions&.all?

    width, height = dimensions
    label = "#{html_path.relative_path_from(site)}: #{href}"
    errors << "#{label} is #{width}x#{height} (limit 1800x1200)" if width > 1800 || height > 1200
  end

  errors << "#{html_path.relative_path_from(site)} has #{high_priority} high-priority images" if high_priority > 1
end

if errors.empty?
  puts "Image audit passed: #{checked} image tags and #{click_previews} bounded click previews checked"
else
  warn errors.join("\n")
  abort "Image audit failed: #{errors.length} violation(s)"
end
