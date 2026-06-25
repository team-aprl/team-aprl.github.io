(function () {
  document.querySelectorAll("a[href]").forEach(function (link) {
    link.setAttribute("target", "_blank");

    var relValues = new Set(
      (link.getAttribute("rel") || "")
        .split(/\s+/)
        .filter(Boolean)
    );

    relValues.add("noopener");
    relValues.add("noreferrer");
    link.setAttribute("rel", Array.from(relValues).join(" "));
  });
})();
