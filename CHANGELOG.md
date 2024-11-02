# Changelog

Pre-release versions will not be mentioned here.

## [2.4.1] - 2024-11-02

### Fixed

- `RruSelectInput`: Fixed setting value in form context not working.
- `RruMultiSelectInput`: Fixed setting value in form context not working.
- `RruDateTimeInput`: Fixed changing calendar type not reflecting.

## [2.4.0] - 2024-09-27

### Added

- `RruSelectInput`: Added `placeholder`.
- `RruMultiSelectInput`: Added `placeholder`.

### Changed

- `RruDateTimeInput`: Disable auto complete which does not make sense because it is unusable.

## [2.3.1] - 2024-03-25

### Fixed

- Fix CJS build format

## [2.3.0] - 2024-03-22

### Added

- Added the ability to read and write field values programmatically. see `useRruForm`.
- `RruDateTimeInput`: Added clear button.
- `RruFileInput`: Added `chooseFileLabel` prop.

### Changed

- `RruSelectInput` & `RruMultiSelectInput`: Paginate loading options to enhance performance for large datasets.
- More ARIA compliance.
- The css file path has changed from `react-rich-ui/dist/index.esm.css` to `react-rich-ui/dist/style.css`.

### Fixed

- `RruForm`: Fix when nested buttons with `type` != `submit` would cause the form to submit.
- `RruForm`: Fix fatal error when supplying a flat value in the `initialValues` for a parent root object of a field that is nested.
- `RruDateTimeInput`: Fix text alignment when page direction is RTL.
- `RruDateTimeInput`: Fix `onChange` was called for each date/time part change.

## Other

- Upgrade Dependencies.
- Internal enhancements.
- Added more tests.
- Updated docs with more details.

## [2.2.0] - 2022-11-18

### Added

- `RruForm`: add support for nested fields.

### Changed

- `RruForm`: eagerly validate a field if it has an error even before losing focus; for a better UX error feedback.
- The css file path has changed from `react-rich-ui/dist/index.css` to `react-rich-ui/dist/index.esm.css`.

### Fixed

- `RruForm`: fix initialValues not reflected in React 18 Strict mode.

## Other

- Upgrade Dependencies.
- CI/CD pipeline for testing and publishing releases on tags.
- Storybook: enable react strict mode.
- Improve tests.

## [2.1.0] - 2022-08-06

### Added

- `RruRadioInput`: support grouped options
- `RruSelectInput`: support grouped options
- `RruMultiSelectInput`: support grouped options
- `RruMultiCheckboxInput`: support grouped options
- `RruCheckboxInput`: add `isSwitch`
- `RruForm`: add `id`

### Changed

- `RruForm`: defer initial onChange validations until input has lost focus
- `RruDataTable`: improve style

### Fixed

- `RruModalButton`: fix `modalTitle` not working
- `RruDateTimeInput`: fix unable to change year
- `RruTextInput`: fix empty string initial value becomes `null`
- `RruTextInput`: fix error message not showing properly when page `dir` is different from input `dir`
- `RruTextareaInput`: fix empty string initial value becomes `null`
- `RruTextareaInput`: fix error message not showing properly when page `dir` is different from input `dir`

## [2.0.0] - 2022-07-27

### Breaking Changes

- `RruDataTable`: Renamed from `RruPageableTable`.
- `RruDataTable`: Renamed `apiErrorLabel` to `errorLabel`.
- `RruDataTable`: Renamed `defaultSortBy` to `defaultSortKey`.
- `RruDataTable`: Removed `actions` and `actionsLabel`.
- `RruDataTable`: Removed `userPrivileges` and `allowedPrivileges`.
- `RruDataTable`: Removed `retainTableState` and `getRetainedTableSearchObject`.
- `RruDataTable`: Removed `endpoint`, `requestMethod` and `onResponse`. Use `pageFetcher` instead.
- `RruDataTable`: Removed `disableSorting`.
- `RruDataTable`: Removed `nextLabel` and `previousLabel`.
- `RruDataTable`: Removed `display` from `columns`.
- `RruDataTable`: Removed `sortable` from `columns`.

- `RruStepsWizard`: Added `getStepLabel` to read step label, no longer requiring `stepLabel` to be injected into children.
- `RruStepsWizard`: Added a hook `useRruStepsWizardContext` to access the current step info and access the navigation functions, no longer injecting these into children's props.
- `RruStepsWizard`: Removed `noHeader`.

- `RruButton`: This component has been dropped. Use `RruModalButton` instead.

- `RruForm`: Renamed `validationSchema` to `yupValidationSchema`.
- `RruForm`: Removed `watch` and `watcher`. Use the new callback `onChange` on the input component.

- `RruFormElement`: Removed this component, each input type has its own dedicated component:

  - `type='text'` becomes `RruTextInput`
  - `type='password'` becomes `RruTextInput` with `isPassword={true}`
  - `type='textarea'` becomes `RruTextareaInput`
  - `type='date'` becomes `RruDateTimeInput` with `mode='date'`
  - `type='time'` has no replacement
  - `type='select'` becomes `RruSelectInput`
  - `type='multi-select'` becomes `RruMultiSelectInput`
  - `type='checkbox'` becomes `RruCheckboxInput`
  - `type='multi-checkbox'` becomes `RruMultiCheckboxInput`
  - `type='grouped-multi-checkbox'` has no replacement
  - `type='radio'` becomes `RruRadioInput`
  - `type='file'` becomes `RruFileInput`

<!-- comment to force new line -->

- `RruSelectInput`: Removed `defaultValue`. Now reads the default value from the `initialValues` of the form.
- `RruSelectInput`: Renamed `options`'s `id` attribute to `value`.
- `RruMultiSelectInput`: Removed `defaultValue`. Now reads the default value from the `initialValues` of the form.
- `RruMultiSelectInput`: Renamed `options`'s `id` attribute to `value`.
- `RruRadioInput`: Renamed `options`'s `id` attribute to `value`.
- `RruMultiCheckboxInput`: Renamed `options`'s `id` attribute to `value`.
- `RruDateTimeInput`: Removed `defaultValue`. Now reads the default value from the `initialValues` of the form.
- `RruDateTimeInput`: Removed `isHijri`. Use `calendarType` instead.
- `RruDateTimeInput`: Removed `isFuture`. Use `getDateConfig` instead.
- `RruDateTimeInput`: Removed `isPast`. Use `getDateConfig` instead.
- `RruDateTimeInput`: Removed `maxYearLength`. Use `getDateConfig` instead.
- `RruDateTimeInput`: Removed `reverseDisplayOrder`.
- `RruFileInput`: Removed `placeholder`.
- `RruFileInput`: Changed resultant value type from `FileList` to `File`.

### Added

- `RruModalButton`: New Component.

- `RruDataTable`: Added `pageFetcher`.
- `RruDataTable`: Added `defaultPageNumber`.
- `RruDataTable`: Added `onChange`.

- `RruStepsWizard`: Added `renderHeader`.

- `RruTextInput`: Added `autoComplete`.
- `RruTextInput`: Added `list`.
- `RruTextareaInput`: Added `autoComplete`.
- `RruTextareaInput`: Added `cols`.
- `RruTextareaInput`: Added `rows`.
- `RruTextareaInput`: Added `wrap`.
- `RruDateTimeInput`: Added new mode `datetime` which supports date and time selection.
- `RruDateTimeInput`: Added `calendarType` which supports many calendar types (e.g. `gregorian`, `islamic-umalqura`, `islamic-rgsa`, `persian` and more).
- `RruDateTimeInput`: Added `getDateConfig`.
- `RruSelectInput`: Added button to clear selection.
- `RruMultiCheckboxInput`: Added `inline`.

### Changed

- You are no longer required to load `font-awesome` stylesheet.
- `RruDataTable`: Use in-house developed pagination.
- `RruDateTimeInput`: Renders a floating picker rather than 3 select elements.

### Fixed

- `RruForm`: Unmounted fields should not appear in form submit result.
- `RruDataTable`: Avoid a redundant extra api call when search changes.

### Other

- Reduce package size.
- Migrate to `bootstrap` v5.
- Improved styles.
- Adhere to BEM naming convention for CSS class names.
- Removed the optional peer dependency `axios`.
- Removed dependency on `font-awesome`.
- Removed dependency on `react-paginate`.
- upgrade dependencies.
- Internal enhancements.

## [1.6.3] - 2022-04-12

### Internal

- Improvements.

## [1.6.2] - 2022-04-12

### Fixed

- RruFormElement: revert adding autoComplete='new-password' to password type in v1.6.1 because this broke the login form auto completion.

## [1.6.1] - 2022-04-12

### Added

- RruForm: add typescript support for boolean type in initialValues prop.
- RruFormElement: add autoComplete='new-password' to password type.

### Fixed

- RruButton: The cancel button in the confirmation was submitting the form.

### Internal

- Storybook stories improvements.
- upgrade dev dependencies.

## [1.6.0] - 2022-04-02

### Added

- RruFormElement: Added `dir` prop to `text`, `textarea`, and `password`.
- RruFormElement: Added `accept` prop to `file`.
- RruPageableTable: Added the ability to specify the default sort configuration using `defaultSortBy` and `defaultSortDir`.
- RruPageableTable: Added the ability to use POST method in the api call using `requestMethod`.
- RruPageableTable: Added the ability to show a message when there is an api call error using `apiErrorLabel`.
- RruPageableTable: Added the ability to retain the table state (current page and current sort configuration and current search object) (through the use of `retainTableState` and `getRetainedTableSearchObject`). Please refer to the documentations for details.

### Changed

- You must now explicitly import the library stylesheet `react-rich-ui/dist/index.css` in you react app (usually in `index.js`).
- RruPageableTable: Reset to the first page after search params change.
- RruButton: Confirmation dialogue now uses a custom-built modal instead of `react-bootstrap` `Modal`.

### Removed (Not Breaking)

- RruPageableTable: Removed `id` prop. Now the component will generate a unique id which is used for persisting the table state.

### Internal

- Rewrite components in Typescript.
- Drop the example app and use Storybook instead.
- Use Microbundle for building the library.
- Properly mention axios as a peer dependency in package.json.
- Add `yup` to `peerDependencies`.
- Upgrade Dependencies.

---

## [1.5.3] - 2021-02-20

### Fixed

- RruFormElement: fix `file` input not working

---

## [1.5.2] - 2021-02-20

### Changed

- RruFormElement: remove unused props (`prepend`, `append`, `labelClassName`, `inputClassName`)
- Add missing info to docs
- Internal cleanup
- CSS Improvements
- Upgrade some deps

---

## [1.5.1] - 2021-02-03

### Fixed

- RruFormElement: Fix default exports

---

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

---

## [1.4.4] - 2020-11-23

### Added

- Github Pages.

### Changed

- RruFormElement: Improved `file` type.
- Improved styles.
- Improved docs.
- Internal refactor.

---

## [1.4.3] - 2020-11-16

### Fixed

- RruFormElement: fix select if no default value and the options array is empty.

---

## [1.4.2] - 2020-11-15

### Changed

- Update API reference.

### Fixed

- RruStepsWizard: fix step component gets mounted before previousStepData gets loaded.

---

## [1.4.1] - 2020-11-15

### Fixed

- RruFormElement: fix `select` and `multi-select` if option is no longer available in the options list after it gets updated.
- Fix ESLint warnings and errors.

---

## [1.4.0] - 2020-11-15

### Added

- RruStepsWizard: New component

### Fixed

- RruFormElement: fix unable to remove last item in `multi-select`
- RruFormElement: fix disabled not working for `select` and `multi-select`

---

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

---

## [1.2.1] - 2020-11-07

### Fixed

- RruFormElement: Fix a crash when options array is empty for `select`

---

## [1.2.0] - 2020-11-07

### Added

- For array-based elements (e.g. `multi-checkbox`), the `initialValues` can be a flat array of ids or an array of options, or even a mix of both.

---

## [1.1.1] - 2020-11-04

The NPM package has been moved from [@coder966/react-rich-ui](https://www.npmjs.com/package/@coder966/react-rich-ui) to [react-rich-ui](https://www.npmjs.com/package/react-rich-ui).

---

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

---

## [1.0.0] - 2020-11-03

First GA release
