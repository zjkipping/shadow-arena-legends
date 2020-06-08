module.exports = {
  name: 'tournaments-ui-tournament-list',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/tournaments/ui-tournament-list',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
