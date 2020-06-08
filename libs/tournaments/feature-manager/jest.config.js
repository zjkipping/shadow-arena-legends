module.exports = {
  name: 'tournaments-feature-manager',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/tournaments/feature-manager',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
