module.exports = {
  name: 'auth-feature-no-access',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/auth/feature-no-access',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
