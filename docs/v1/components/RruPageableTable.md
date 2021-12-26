[Docs](/) > [v1](/docs/v1/get-started) > [Tables](/docs/v1/components/RruPageableTable)


# RruPageableTable

## API

### RruPageableTable

| Prop | Description | Required |
|-|-|-|
| id | ID| No |
| endpoint | The endpoint which returns `org.springframework.data.domain.Page` | Yes|
| columns| An array of column objects| Yes|
| actions| An array of action objects| No |
| search | The search parameters the will be sent to the endpoint specified| No |
| onResponse | A callback function. `data => void` | No |
| userPrivileges | An array of the user's privileges. This is used to only show permitted actions. | No |
| pageSize | The page size. The default value is `10`| No |
| disableSorting | Set to false to disable sorting feature.| No |
| defaultSortBy | Set the default sort key | No |
| defaultSortDir | Set to default sort direction | No |
| actionsLabel | The action's column header label. | No |
| previousLabel| This is the label for `previous` button in pagination.| No |
| nextLabel | This is the label for `next` button in pagination. | No |
| noDataLabel | This is the label used when no data is available. | No |

### Columns

| Prop | Description | Required |
|-|-|-|
| label | Header label | Yes |
| value | The value the should be displayed in each row.<br>This could be either a property path in row object<br>or a function which takes the row object and returns cell value | Yes |
| sortable | Set false to disable sorting for this column. | No |
| sortKey | Property path in row object. By dafault same as `value` if it is also a property path. | No |
| display | Set false to hide this column | No |

### Actions

| Prop | Description | Required |
|-|-|-|
| label | Button label | Either this or `icon` |
| icon | It can be either an icon name (see `RruButton` section) or a function that returns an icon name. | Either this or `label` |
| action | A function which takes the row object | Yes |
| display | A function which takes the row object and<br>returns a `boolean` whether the action should be available for this row. | No |
| privileges | An array of the required privilege for this actions. The `userPrivileges` provided in the table will be used. | No |
| onConfirm | If you want to have a confirmation dialog<br>for an action, just use this prop instead of `action`.<br> The is also a function same as `action` but will<br>only be called when the user confirms the action | No |
| confirmationTitle | Confirmation dialog title | No |
| confirmationDesc | Confirmation dialog description | No |
| confirmLabel | Confirmation dialog confirm button label | No |
| cancelLabel | Confirmation dialog cancel button label | No |
