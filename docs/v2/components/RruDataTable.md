[Docs](/) > [V2](/docs/v2/get-started) > [Tables](/docs/v2/components/RruDataTable)

# RruDataTable

## Props

### RruDataTable

| Name              | Description                                                                                     | Required |
| ----------------- | ----------------------------------------------------------------------------------------------- | -------- |
| endpoint          | The endpoint which returns a supported response JSON. For supported interface, see table below. | Yes      |
| requestMethod     | Specify the HTTP method to be used when sending the API request.                                | No       |
| columns           | An array of column objects                                                                      | Yes      |
| search            | The search parameters the will be sent to the endpoint specified                                | No       |
| onResponse        | A callback function. `data => void`                                                             | No       |
| pageSize          | The page size. The default value is `10`                                                        | No       |
| noDataLabel       | This is the label used when no data is available.                                               | No       |
| apiErrorLabel     | This is the label used when there has been an error in the API call to fetch the data.          | No       |
| defaultPageNumber | Set the initial page number                                                                     | No       |
| defaultSortKey    | Set the initial sort key                                                                        | No       |
| defaultSortDir    | Set the initial sort direction                                                                  | No       |
| onChange          | A callback for when one of these information gets updated (pageNumber, sortKey, sortDir)        | No       |

### Column

| Name    | Description                                                                                                                                                                                                                                                                                                          | Required |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label   | Header label                                                                                                                                                                                                                                                                                                         | Yes      |
| value   | The value the should be displayed in each row. This could be either a property path in row object or a function which takes the row object and returns cell value                                                                                                                                                    | Yes      |
| sortKey | Property path in row object. By default uses the path provided by `value` in case `value` was a string. If `value` is a function, then you need to provide the sorting key path, otherwise sorting will be disabled for this column. Similarly, if you want to disable sorting for a column, you can pass null here. | No       |

### Supported endpoint response interfaces

- `org.springframework.data.domain.Page`
