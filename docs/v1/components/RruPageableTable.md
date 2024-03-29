[Docs](/docs) > [v1](/docs/v1) > [Tables](/docs/v1/components/RruPageableTable)

<div class='warning-block'>
Warning: You are viewing a legacy version documentation. Please visit <a href='/docs'>this link</a> for the latest version.
</div>

# RruPageableTable

## API

### RruPageableTable

| Prop             | Description                                                                                                                                                                              | Required |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| endpoint         | The endpoint which returns `org.springframework.data.domain.Page`                                                                                                                        | Yes      |
| requestMethod    | Specify the HTTP method to be used when sending the API request.                                                                                                                         | No       |
| columns          | An array of column objects                                                                                                                                                               | Yes      |
| actions          | An array of action objects                                                                                                                                                               | No       |
| search           | The search parameters the will be sent to the endpoint specified                                                                                                                         | No       |
| retainTableState | Whether or not to retain the table state (current page and current sort configuration and current search object). To read the retained search object use `getRetainedTableSearchObject`. | No       |
| onResponse       | A callback function. `data => void`                                                                                                                                                      | No       |
| userPrivileges   | An array of the user's privileges. This is used to only show permitted actions.                                                                                                          | No       |
| pageSize         | The page size. The default value is `10`                                                                                                                                                 | No       |
| disableSorting   | Set to false to disable sorting feature.                                                                                                                                                 | No       |
| defaultSortBy    | Set the default sort key                                                                                                                                                                 | No       |
| defaultSortDir   | Set to default sort direction                                                                                                                                                            | No       |
| actionsLabel     | The action's column header label.                                                                                                                                                        | No       |
| previousLabel    | This is the label for `previous` button in pagination.                                                                                                                                   | No       |
| nextLabel        | This is the label for `next` button in pagination.                                                                                                                                       | No       |
| noDataLabel      | This is the label used when no data is available.                                                                                                                                        | No       |
| apiErrorLabel    | This is the label used when there has been an error in the API call to fetch the data.                                                                                                   | No       |

### Columns

| Prop     | Description                                                                                                                                                             | Required |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label    | Header label                                                                                                                                                            | Yes      |
| value    | The value the should be displayed in each row.<br>This could be either a property path in row object<br>or a function which takes the row object and returns cell value | Yes      |
| sortable | Set false to disable sorting for this column.                                                                                                                           | No       |
| sortKey  | Property path in row object. By dafault same as `value` if it is also a property path.                                                                                  | No       |
| display  | Set false to hide this column                                                                                                                                           | No       |

### Actions

| Prop              | Description                                                                                                                                                                                                  | Required               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| label             | Button label                                                                                                                                                                                                 | Either this or `icon`  |
| icon              | It can be either an icon name (see `RruButton` section) or a function that returns an icon name.                                                                                                             | Either this or `label` |
| action            | A function which takes the row object                                                                                                                                                                        | Yes                    |
| display           | A function which takes the row object and<br>returns a `boolean` whether the action should be available for this row.                                                                                        | No                     |
| privileges        | An array of the required privilege for this actions. The `userPrivileges` provided in the table will be used.                                                                                                | No                     |
| onConfirm         | If you want to have a confirmation dialog<br>for an action, just use this prop instead of `action`.<br> The is also a function same as `action` but will<br>only be called when the user confirms the action | No                     |
| confirmationTitle | Confirmation dialog title                                                                                                                                                                                    | No                     |
| confirmationDesc  | Confirmation dialog description                                                                                                                                                                              | No                     |
| confirmLabel      | Confirmation dialog confirm button label                                                                                                                                                                     | No                     |
| cancelLabel       | Confirmation dialog cancel button label                                                                                                                                                                      | No                     |

### getRetainedTableSearchObject

This function allows you to read the table persisted search object even after the table has been de-mounted due to navigation or page refresh. This comes in handy when you want to re-initialize the search form with the same last values it was in before the table (alongside with the search form) is destroyed.

In case you have multiple tables in the same page, just provide the function with the table endpoint. If you don't specify the endpoint, there is no guarantee on which table of which it will return the search object.
