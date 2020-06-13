module.exports = {
  name: 'leaderboard-feature-main-leaderboard',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/leaderboard/feature-main-leaderboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
