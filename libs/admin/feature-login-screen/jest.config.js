module.exports = {
  name: 'admin-feature-login-screen',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/admin/feature-login-screen',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
