module.exports = {
  name: 'teams-feature-landing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/teams/feature-landing',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
