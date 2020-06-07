module.exports = {
  name: 'teams-ui-teams-list',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/teams/ui-teams-list',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
