import { Rule, Plugin } from "postcss";

interface PostcssShadowdomProps {
  customHostSelector?: string;
}

const postcssShadowdom = (opts: PostcssShadowdomProps = {}): Plugin => {
  const { customHostSelector = ":host" } = opts;

  return {
    postcssPlugin: "postcss-shadowdom",
    Rule(rule: Rule): void {
      if (rule.selector.toLowerCase().includes(":root")) {
        rule.selector = rule.selector.replace(/:root\b/gi, customHostSelector);

        rule.selector = rule.selector.replace(
          new RegExp(`${customHostSelector}(\\[[^\\]]+\\])+`, "g"),
          (match) => {
            const attributes =
              match.slice(customHostSelector.length).match(/\[[^\]]+\]/g) || [];
            return `${customHostSelector}(${attributes.join("")})`;
          },
        );
      }
    },
  };
};

postcssShadowdom.postcss = true;

export = postcssShadowdom;
