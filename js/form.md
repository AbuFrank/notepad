# Form

```js
foreach ( $form['fields'] as $field ) { 
    $input_type = RGFormsModel::get_input_type( $field ); 
    $field_label = RGFormsModel::get_label( $field ); 
    if ( $input_type == 'checkbox' || $input_type == 'radio' || $input_type == 'select' ) { 
        $selected = $field->id == $selected_field_id ? "selected='selected'" : ''; 
        $str .= "<option value='" . $field->id . "' " . $selected . '>' . $field_label . '</option>'; 
    } 
}
```
