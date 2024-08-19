import { Rule, Plugin } from 'postcss';

interface PostcssRootToHostOptions {}

const postcssRootToHost = (opts: PostcssRootToHostOptions = {}): Plugin => {
  return {
    postcssPlugin: 'postcss-root-to-host',
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

postcssRootToHost.postcss = true;

export = postcssRootToHost;