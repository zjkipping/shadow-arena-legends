module.exports = {
  name: 'shared-util-route-guards',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-route-guards',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
