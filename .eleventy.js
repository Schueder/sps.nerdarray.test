const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Assets durchreichen
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collection "episodes"
  eleventyConfig.addCollection("episodes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/episodes/*.md");
  });

  // Datum-Filter für Nunjucks
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy") => {
    if (!dateObj || dateObj == "now"){
      return DateTime.now().toFormat(format);
    }
      return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // RFC 2822 für RSS
  eleventyConfig.addFilter("rfc2822", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toRFC2822();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
