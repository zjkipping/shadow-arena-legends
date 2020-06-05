module.exports = {
  name: 'admin-system',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/admin-system',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
