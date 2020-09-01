module.exports = {
  name: 'leaderboard-ui-team-scores-leaderboard',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/leaderboard/ui-team-scores-leaderboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
