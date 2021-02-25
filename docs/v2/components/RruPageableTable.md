[Docs](/) > [v2](/docs/v2/get-started) > [Tables](/docs/v2/components/RruPageableTable)


# RruPageableTable

## API

### RruPageableTable

| Prop | Description | Required |
|-|-|-|
| id | ID| No |
| endpoint | The endpoint which returns `org.springframework.data.domain.Page` | Yes|
| columns| An array of column objects| Yes|
| search | The search parameters the will be sent to the endpoint specified| No |
| onResponse | A callback function. `data => void` | No |
| pageSize | The page size. The default value is `10`| No |
| disableSorting | Set to false to disable sorting feature.| No |
| previousLabel| This is the label for `previous` button in pagination.| No |
| nextLabel | This is the label for `next` button in pagination. | No |
| noDataLabel | This is the label used when no data is available. | No |

### Columns

| Prop | Description | Required |
|-|-|-|
| label | Header label | Yes |
| value | The value the should be displayed in each row.<br>This could be either a property path in row object<br>or a render function which takes the row object as a parameter and returns the render node | Yes |
| sortable | Set false to disable sorting for this column. | No |
| sortKey | Property path in row object. By dafault same as `value` if it is also a property path. | No |
| display | Set false to hide this column | No |
