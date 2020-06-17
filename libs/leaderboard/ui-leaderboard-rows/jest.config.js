module.exports = {
  name: 'leaderboard-ui-leaderboard-rows',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/leaderboard/ui-leaderboard-rows',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
