module.exports = {
  name: 'shared-util-material-deps',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-material-deps',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
