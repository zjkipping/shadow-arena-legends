module.exports = {
  name: 'admin-feature-navigation',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/admin/feature-navigation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
