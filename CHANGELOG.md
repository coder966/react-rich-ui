# Changelog
Pre-release versions will not be mentioned here.


## [1.5.3] - 2021-02-20

### Fixed
- RruFormElement: fix `file` input not working

--------------------------------------------------------------------------------

## [1.5.2] - 2021-02-20

### Changed
- RruFormElement: remove unused props (`prepend`, `append`, `labelClassName`, `inputClassName`)
- Add missing info to docs
- Internal cleanup
- CSS Improvements
- Upgrade some deps

--------------------------------------------------------------------------------

## [1.5.1] - 2021-02-03

### Fixed
- RruFormElement: Fix default exports

--------------------------------------------------------------------------------

## [1.5.0] - 2021-02-03

### Added
- RruFormElement: add new prop `requiredAsterisk`

### Changed
- Example App: update example rest api endpoint.
- Internal refactor (RruFormElement).
- Improved docs.

### Fixed
- RruButton: add missing `watch`
- RruButton: add missing `initialValues`

--------------------------------------------------------------------------------

## [1.4.4] - 2020-11-23

### Added
- Github Pages.

### Changed
- RruFormElement: Improved `file` type.
- Improved styles.
- Improved docs.
- Internal refactor.

--------------------------------------------------------------------------------

## [1.4.3] - 2020-11-16

### Fixed
- RruFormElement: fix select if no default value and the options array is empty.

--------------------------------------------------------------------------------

## [1.4.2] - 2020-11-15

### Changed
- Update API reference.

### Fixed
- RruStepsWizard: fix step component gets mounted before previousStepData gets loaded.

--------------------------------------------------------------------------------

## [1.4.1] - 2020-11-15

### Fixed
- RruFormElement: fix `select` and `multi-select` if option is no longer available in the options list after it gets updated.
- Fix ESLint warnings and errors.

--------------------------------------------------------------------------------

## [1.4.0] - 2020-11-15

### Added
- RruStepsWizard: New component

### Fixed
- RruFormElement: fix unable to remove last item in `multi-select`
- RruFormElement: fix disabled not working for `select` and `multi-select`

--------------------------------------------------------------------------------

## [1.3.0] - 2020-11-10

### Added
- RruFormElement: add new type `multi-select`
- README: mention stylesheet dependencies.
- Example App: more examples and improvements.

### Changed
- RruFormElement: select: leave select option empty if the default value not found in the options list.
- Update dependencies.

### Fixed
- RruFormElement: select: Add red border to select if there is an error.

--------------------------------------------------------------------------------

## [1.2.1] - 2020-11-07

### Fixed
- RruFormElement: Fix a crash when options array is empty for `select`

--------------------------------------------------------------------------------

## [1.2.0] - 2020-11-07

### Added
- For array-based elements (e.g. `multi-checkbox`), the `initialValues` can be a flat array of ids or an array of options, or even a mix of both.

--------------------------------------------------------------------------------

## [1.1.1] - 2020-11-04
The NPM package has been moved from [@coder966/react-rich-ui](https://www.npmjs.com/package/@coder966/react-rich-ui) to [react-rich-ui](https://www.npmjs.com/package/react-rich-ui).

--------------------------------------------------------------------------------

## [1.1.0] - 2020-11-03

### Added
- RruForm: Add `watch(array)` and `watcher(func)`.
- RruPageableTable: Fallback to `fetch` if `Axios` is not available.
- RruPageableTable: Add `noDataLabel`.
- Example App: add example for `RruPageableTable`.

### Changed
- RruForm: Deprecate `watch(func)`.

### Fixed
- RruForm: Fix a crash when `initialValues` is `undefined`.
- RruFormElement: Fix `select` initial value.
- RruFormElement: Fix `maxLength`.
- RruFormElement: Fix duplicate key.

--------------------------------------------------------------------------------

## [1.0.0] - 2020-11-03
First GA release

