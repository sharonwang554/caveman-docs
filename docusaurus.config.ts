import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Caveman Docs',
  tagline: 'Documentation for the Caveman Ecosystem',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://caveman.sharonwang.me',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sharonwang554', // Usually your GitHub org/user name.
  projectName: 'caveman-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/sharonwang554/caveman-docs/tree/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [],
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'outdated_warning_v2',
      content: 'This documentation portal is generated based on commit <a target="_blank" rel="noopener noreferrer" href="https://github.com/JuliusBrussee/caveman/commit/99a9aa2f5a45097fc3563febea7d0baf64407441">99a9aa2</a> of the original repo on August 19, 2026. Please refer to the <a target="_blank" rel="noopener noreferrer" href="https://github.com/JuliusBrussee/caveman">original repo</a> for the latest updates.',
      backgroundColor: '#fff8c5',
      textColor: '#24292f',
      isCloseable: true,
    },
    // Replace with your project's social card
    image: 'img/caveman-logo-banner.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Caveman Docs',
      logo: {
        alt: 'Caveman Docs Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'caveman/index',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/sharonwang554/caveman-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'GitHub',
          items: [
            {
              label: 'Caveman',
              href: 'https://github.com/JuliusBrussee/caveman',
            },
            {
              label: 'Caveman Browse',
              href: 'https://github.com/JuliusBrussee/caveman-browse',
            },
            {
              label: 'CaveGemma',
              href: 'https://github.com/JuliusBrussee/cavegemma',
            },
            {
              label: 'Caveman Code',
              href: 'https://github.com/JuliusBrussee/caveman-code',
            },
            {
              label: 'Cavemem',
              href: 'https://github.com/JuliusBrussee/cavemem',
            },
            {
              label: 'Cavekit',
              href: 'https://github.com/JuliusBrussee/cavekit',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://sharonwang.me" target="_blank" rel="noopener noreferrer">Sharon Wang</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'powershell', 'yaml', 'markdown', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
