import postcss from 'postcss';
import postcssRootToHost from './index';

async function run(input: string, output: string) {
  const result = await postcss([postcssRootToHost()]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

describe('postcss-root-to-host', () => {
  it('should replace :root with :host', async () => {
    await run(':root { color: red; }', ':host { color: red; }');
  });

  it('should not modify other selectors', async () => {
    await run('body { color: blue; }', 'body { color: blue; }');
  });

  it('should handle multiple :root selectors', async () => {
    await run(
      ':root { color: red; } :root { background: blue; }',
      ':host { color: red; } :host { background: blue; }'
    );
  });

  it('should replace :root in complex selectors', async () => {
    await run(
      ':root.dark-theme { color: white; }',
      ':host.dark-theme { color: white; }'
    );
  });

  it('should handle :root with pseudo-classes', async () => {
    await run(
      ':root:hover { color: green; }',
      ':host:hover { color: green; }'
    );
  });

  it('should replace :root in comma-separated selectors', async () => {
    await run(
      ':root, body { color: red; }',
      ':host, body { color: red; }'
    );
  });

  it('should handle multiple :root occurrences in a single rule', async () => {
    await run(
      ':root :root { color: red; }',
      ':host :host { color: red; }'
    );
  });

  it('should not replace :root within strings', async () => {
    await run(
      ':root { content: ":root"; }',
      ':host { content: ":root"; }'
    );
  });

  it('should handle :root with attribute selectors', async () => {
    await run(
      ':root[data-theme="dark"] { color: white; }',
      ':host([data-theme="dark"]) { color: white; }'
    );
  });

  it('should handle multiple attribute selectors', async () => {
    await run(
      ':root[data-theme="dark"][lang="en"] { color: white; }',
      ':host([data-theme="dark"][lang="en"]) { color: white; }'
    );
  });

  it('should not modify :root-like substrings in other selectors', async () => {
    await run(
      '.root-class { color: red; }',
      '.root-class { color: red; }'
    );
  });

  it('should handle :root selector with spaces', async () => {
    await run(
      ' :root { color: red; }',
      ' :host { color: red; }'
    );
  });

  it('should handle mixed :root and non-:root selectors', async () => {
    await run(
      ':root { color: red; } .class { color: blue; } :root { background: green; }',
      ':host { color: red; } .class { color: blue; } :host { background: green; }'
    );
  });

  it('should handle :root with child combinators', async () => {
    await run(
      ':root > .child { color: red; }',
      ':host > .child { color: red; }'
    );
  });

  it('should handle :root with descendant combinators', async () => {
    await run(
      ':root .descendant { color: red; }',
      ':host .descendant { color: red; }'
    );
  });

  it('should handle :root with adjacent sibling combinators', async () => {
    await run(
      ':root + .sibling { color: red; }',
      ':host + .sibling { color: red; }'
    );
  });

  it('should handle :root with general sibling combinators', async () => {
    await run(
      ':root ~ .sibling { color: red; }',
      ':host ~ .sibling { color: red; }'
    );
  });

  it('should handle multiple complex cases in one stylesheet', async () => {
    await run(
      ':root { color: red; } :root[data-theme="dark"] { background: black; } body :root > .child { padding: 10px; }',
      ':host { color: red; } :host([data-theme="dark"]) { background: black; } body :host > .child { padding: 10px; }'
    );
  });

  it('should not modify @media rules content', async () => {
    await run(
      '@media (min-width: 768px) { :root { color: red; } }',
      '@media (min-width: 768px) { :host { color: red; } }'
    );
  });

  it('should handle :root inside @supports', async () => {
    await run(
      '@supports (display: grid) { :root { display: grid; } }',
      '@supports (display: grid) { :host { display: grid; } }'
    );
  });

  it('should not modify CSS custom properties definitions', async () => {
    await run(
      ':root { --custom-prop: red; }',
      ':host { --custom-prop: red; }'
    );
  });

  it('should handle :root with pseudo-elements', async () => {
    await run(
      ':root::before { content: ""; }',
      ':host::before { content: ""; }'
    );
  });

  it('should handle case insensitivity of :root', async () => {
    await run(
      ':ROOT { color: red; } :Root { background: blue; }',
      ':host { color: red; } :host { background: blue; }'
    );
  });
});