module.exports = {
  name: 'shared-util-types',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-types',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
