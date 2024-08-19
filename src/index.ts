import { Rule, Plugin } from 'postcss';

interface PostcssShadowdomProps {}

const postcssShadowdom = (opts: PostcssShadowdomProps = {}): Plugin => {
  return {
    postcssPlugin: 'postcss-shadowdom',
    Rule(rule: Rule): void {
      if (rule.selector.toLowerCase().includes(':root')) {
        rule.selector = rule.selector.replace(/:root\b/gi, ':host');

        rule.selector = rule.selector.replace(
          /:host(\[[^\]]+\])+/g,
          (match) => {
            const attributes = match.slice(5).match(/\[[^\]]+\]/g) || [];
            return `:host(${attributes.join('')})`;
          }
        );
      }
    },
  };
};

postcssShadowdom.postcss = true;

export = postcssShadowdom;