module.exports = {
  name: 'leaderboard-ui-leaderboard-row',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/leaderboard/ui-leaderboard-row',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
