module.exports = {
  name: 'leaderboard-ui-navigation',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/leaderboard/ui-navigation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
