module.exports = {
  name: 'leaderboard',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/leaderboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
