module.exports = {
  name: 'profiles-data-layer',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/profiles/data-layer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
