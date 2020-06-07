module.exports = {
  name: 'admin-feature-dashboard',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/admin/feature-dashboard',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
