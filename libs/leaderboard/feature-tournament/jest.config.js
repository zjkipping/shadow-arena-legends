module.exports = {
  name: 'leaderboard-feature-tournament',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/leaderboard/feature-tournament',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
