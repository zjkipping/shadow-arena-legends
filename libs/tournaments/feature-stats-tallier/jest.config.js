module.exports = {
  name: 'tournaments-feature-stats-tallier',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/tournaments/feature-stats-tallier',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
