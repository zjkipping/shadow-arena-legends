module.exports = {
  name: 'admin-ui-navigation',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/admin/ui-navigation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
