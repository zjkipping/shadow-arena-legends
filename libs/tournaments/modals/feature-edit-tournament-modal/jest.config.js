module.exports = {
  name: 'tournaments-modals-feature-edit-tournament-modal',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/tournaments/modals/feature-edit-tournament-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
