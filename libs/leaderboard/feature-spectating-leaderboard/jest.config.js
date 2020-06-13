module.exports = {
  name: 'leaderboard-feature-spectating-leaderboard',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/leaderboard/feature-spectating-leaderboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
