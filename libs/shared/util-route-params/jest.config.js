module.exports = {
  name: 'shared-util-route-params',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-route-params',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
