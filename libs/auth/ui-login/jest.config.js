module.exports = {
  name: 'auth-ui-login',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/auth/ui-login',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
