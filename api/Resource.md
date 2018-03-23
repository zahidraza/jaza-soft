# Resource #


## General Attribute

* name:  (`string`), `required`
```
This is very critical field because it is the name of Reducer, Route, MenuItem Name created for this resource
```
* reducerReq: (`boolean`), `optional`, `true`
```
Whether Reducer is Required for this Resource or not. By default it is true, means one reducer will provided.
``` 
* referenceResource: (`string`), `optional`
```
If 'reducerReq' = false, specify the data store (i.e reducer) form where data should be rendered for List Page
```
* children: (`React.Element<'Resource'>`), optional
```
If Nested Menu is required, Provide children Resources. A Nested Menu will be created for each resources.
```

## CRUD Attribute
* list: (`React.ComponentType` | `Function`), `optional`
```
This is List Page which will be shown when this Resource is selected from Menu. Generally all data will be shown is tabular form. If List page is not provided, This Resource will not be shown is menu, because List Page is required when a resource from Menu is selected
```

* create: (`React.ComponentType` | `Function`), `optional`
```
Page for creating/adding new data.
```

* edit: (`React.ComponentType` | `Function`), `optional`
```
Page for editing/updating existing data
```

* view: (`React.ComponentType` | `Function`), `optional`
```
Page for viewing single data 
```

* delete: (`React.ComponentType` | `Function`), `optional`
```
Page for deleting data. 
```

## Attributes for Non-Crud Resources

* customPages: (`object[]`)

```
{
  path: <Relative Path. e.g ':id/run'>,
  component: <React.ComponentType | Function>
}
```


