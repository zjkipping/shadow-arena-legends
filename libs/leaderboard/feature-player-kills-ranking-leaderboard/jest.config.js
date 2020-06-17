module.exports = {
  name: 'leaderboard-feature-player-kills-ranking-leaderboard',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/leaderboard/feature-player-kills-ranking-leaderboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
