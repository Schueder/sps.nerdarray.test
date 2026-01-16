const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Assets durchreichen
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collection "episodes"
  eleventyConfig.addCollection("episodes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/episodes/*.md");
  });

    // Datum-Filter
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy") => {
    if (!dateObj || dateObj == "now"){
      return DateTime.now().toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // RFC 2822
  eleventyConfig.addFilter("rfc2822", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toRFC2822();
  });

  // WICHTIG: URL-Filter
  eleventyConfig.addFilter("url", function (url) {
    const prefix = process.env.ELEVENTY_PATH_PREFIX || "/";
    if (prefix === "/") {
      return url;
    }
    return prefix.replace(/\/$/, "") + url;
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}