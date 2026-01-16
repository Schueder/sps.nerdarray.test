const { DateTime } = require("luxon");
const pathPrefix =
  process.env.ELEVENTY_PATH_PREFIX ||
  (process.env.GITHUB_REPOSITORY
    ? "/" + process.env.GITHUB_REPOSITORY.split("/")[1] + "/"
    : "/");

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
    if (pathPrefix === "/") {
      return url;
    }
    return pathPrefix.replace(/\/$/, "") + url;
  });

  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    pathPrefix: pathPrefix,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}