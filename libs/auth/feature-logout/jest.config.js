module.exports = {
  name: 'auth-feature-logout',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/auth/feature-logout',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
