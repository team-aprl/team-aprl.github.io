#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"

site = Pathname(ARGV.fetch(0, "_site")).expand_path
abort "site directory not found: #{site}" unless site.directory?

errors = []
checked = 0

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

  errors << "#{html_path.relative_path_from(site)} has #{high_priority} high-priority images" if high_priority > 1
end

if errors.empty?
  puts "Image audit passed: #{checked} image tags checked"
else
  warn errors.join("\n")
  abort "Image audit failed: #{errors.length} violation(s)"
end
