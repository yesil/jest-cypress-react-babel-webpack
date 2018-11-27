// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
require('react-testing-library/cleanup-after-each')

// add jest-emotion serializer
const {createSerializer} = require('jest-emotion')
const emotion = require('emotion')

expect.addSnapshotSerializer(createSerializer(emotion))
