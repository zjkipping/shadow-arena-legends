module.exports = {
  name: 'teams-modals-feature-edit-team-modal',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/teams/modals/feature-edit-team-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
