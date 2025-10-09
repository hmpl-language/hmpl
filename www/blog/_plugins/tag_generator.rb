module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'tag'
        tags = site.posts.docs.flat_map { |post| post.data['tags'] || [] }.uniq
        seen_slugs = {}
        tags.each do |tag|
          next if tag.nil? || tag.strip.empty?
          slug = Jekyll::Utils.slugify(tag.strip)
          next if seen_slugs[slug]
          seen_slugs[slug] = true
          site.pages << TagPage.new(site, site.source, tag.strip)
        end
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir  = File.join('tags', Jekyll::Utils.slugify(tag))
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "Posts tagged: #{tag}"
      self.data['description'] = "All blog posts tagged with #{tag}"
    end
  end
end
