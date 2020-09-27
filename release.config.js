module.exports = {
  branches: ['master', { name: 'beta', prerelease: true }],
  ci: false,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
			"@semantic-release/changelog",
			{
				"changelogTitle": "# Changelog\n\nAll notable changes to this project will be documented in this file. See\n[Conventional Commits](https://conventionalcommits.org) for commit guidelines."
			}
		],
    '@semantic-release/npm',
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "package-lock.json", "CHANGELOG.md"],
        "message": "release(version): Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ],
};
