const version = '${version}';

const config = {
  git: {
    commitMessage: `ci: released version v${version} [no ci]`,
    pushRepo: 'git@github.com:b12k/contracted.git',
    requireCommits: true,
  },
  github: {
    comments: {
      submit: true,
    },
    release: true,
  },
  npm: {
    publish: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: {
        name: 'conventionalcommits',
      },
    },
  },
};

export default config;
