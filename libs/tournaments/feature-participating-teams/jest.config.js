module.exports = {
  name: 'tournaments-feature-participating-teams',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/tournaments/feature-participating-teams',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
