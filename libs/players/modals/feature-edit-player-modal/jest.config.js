module.exports = {
  name: 'players-modals-feature-edit-player-modal',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/players/modals/feature-edit-player-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
