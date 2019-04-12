# react-toaster
## What is it?
It's a react library that gives your application toasts! It's heavily inspired by [react-toastify](https://github.com/fkhadra/react-toastify) but written with react hooks. 
## Why?
I wanted to learn react hooks
## Usage
```
import { Toaster, ToastContext } from 'react-toaster';
```
Wrap your app with in the the `Toaster`.
```html
    <div className="App">
      <Toaster>
        //...rest of your app
      </Toaster>
    </div>
```

And then anywhere in your app that's wrapped in the toaster you can import `ToastContext` and use it like so:
```js
import React, { useContext } from 'react';
import ToastContext from 'react-Toaster';

const buildToast = useContext(context);
buildToast('Your logged in!');
```
**react-toaster** relies on react's new `useContext` hook so make sure you have react 16.8.

## License
[MIT](https://choosealicense.com/licenses/mit/)
