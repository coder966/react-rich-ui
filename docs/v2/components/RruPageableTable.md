[Docs](/) > [V2](/docs/v2/get-started) > [Tables](/docs/v2/components/RruPageableTable)

# RruPageableTable

## API

### RruPageableTable

| Prop             | Description                                                                                                                                                                              | Required |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| endpoint         | The endpoint which returns `org.springframework.data.domain.Page`                                                                                                                        | Yes      |
| requestMethod    | Specify the HTTP method to be used when sending the API request.                                                                                                                         | No       |
| columns          | An array of column objects                                                                                                                                                               | Yes      |
| search           | The search parameters the will be sent to the endpoint specified                                                                                                                         | No       |
| retainTableState | Whether or not to retain the table state (current page and current sort configuration and current search object). To read the retained search object use `getRetainedTableSearchObject`. | No       |
| onResponse       | A callback function. `data => void`                                                                                                                                                      | No       |
| pageSize         | The page size. The default value is `10`                                                                                                                                                 | No       |
| defaultSortBy    | Set the default sort key                                                                                                                                                                 | No       |
| defaultSortDir   | Set to default sort direction                                                                                                                                                            | No       |
| noDataLabel      | This is the label used when no data is available.                                                                                                                                        | No       |
| apiErrorLabel    | This is the label used when there has been an error in the API call to fetch the data.                                                                                                   | No       |

### Columns

| Prop    | Description                                                                                                                                                                                                                                                                                                          | Required |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label   | Header label                                                                                                                                                                                                                                                                                                         | Yes      |
| value   | The value the should be displayed in each row.<br>This could be either a property path in row object<br>or a function which takes the row object and returns cell value                                                                                                                                              | Yes      |
| sortKey | Property path in row object. By default uses the path provided by `value` in case `value` was a string. If `value` is a function, then you need to provide the sorting key path, otherwise sorting will be disabled for this column. Similarly, if you want to disable sorting for a column, you can pass null here. | No       |

### getRetainedTableSearchObject

This function allows you to read the table persisted search object even after the table has been de-mounted due to navigation or page refresh. This comes in handy when you want to re-initialize the search form with the same last values it was in before the table (alongside with the search form) is destroyed.

In case you have multiple tables in the same page, just provide the function with the table endpoint. If you don't specify the endpoint, there is no guarantee on which table of which it will return the search object.
