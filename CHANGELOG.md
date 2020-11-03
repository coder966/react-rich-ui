# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2020-11-03

### Added
RruForm: Add `watch(array)` and `watcher(func)`.
RruPageableTable: Fallback to `fetch` if `Axios` is not available.
RruPageableTable: Add `noDataLabel`.
Example App: add example for `RruPageableTable`.

### Changed
RruForm: Deprecate `watch(func)`.

### Fixed
RruForm: Fix a crash when `initialValues` is `undefined`.
RruFormElement: Fix `select` initial value.
RruFormElement: Fix `maxLength`.
RruFormElement: Fix duplicate key.


## [1.0.0] - 2020-11-03
First GA release

