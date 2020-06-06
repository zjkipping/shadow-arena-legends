module.exports = {
  name: 'players-ui-player-list',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/players/ui-player-list',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
