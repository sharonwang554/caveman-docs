import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import orgConfig from './org-config.json';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: orgConfig.title,
  tagline: orgConfig.tagline,
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: orgConfig.url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: orgConfig.organizationName, // Usually your GitHub org/user name.
  projectName: orgConfig.projectName, // Usually your repo name.

  onBrokenLinks: 'throw',

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
          editUrl: `${orgConfig.githubRepo}/tree/main/`,
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
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: orgConfig.title,
      logo: {
        alt: `${orgConfig.title} Logo`,
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },

        {
          href: orgConfig.githubRepo,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Caveman',
              to: '/docs/caveman/tutorials/getting-started',
            },
            {
              label: 'Caveman Code',
              to: '/docs/caveman-code/tutorials/getting-started',
            },
            {
              label: 'CaveGemma',
              to: '/docs/cavegemma/tutorials/quick-start',
            },
            {
              label: 'Cavekit',
              to: '/docs/cavekit/tutorials/installation',
            },
            {
              label: 'Cavemem',
              to: '/docs/cavemem/tutorials/installation',
            },
          ],
        },

        {
          title: 'GitHub',
          items: [
            {
              label: 'Caveman',
              href: 'https://github.com/JuliusBrussee/caveman',
            },
            {
              label: 'Caveman Code',
              href: 'https://github.com/JuliusBrussee/caveman-code',
            },
            {
              label: 'CaveGemma',
              href: 'https://github.com/JuliusBrussee/cavegemma',
            },
            {
              label: 'Cavekit',
              href: 'https://github.com/JuliusBrussee/cavekit',
            },
            {
              label: 'Cavemem',
              href: 'https://github.com/JuliusBrussee/cavemem',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://sharonwang.me" target="_blank" rel="noopener noreferrer">${orgConfig.copyright}</a> (Unofficial Community Contribution).`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
