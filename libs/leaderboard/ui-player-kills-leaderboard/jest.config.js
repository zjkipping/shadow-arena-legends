module.exports = {
  name: 'leaderboard-ui-player-kills-leaderboard',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/leaderboard/ui-player-kills-leaderboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
