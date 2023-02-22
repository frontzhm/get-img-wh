---
title: 怎么获取上传图片的宽高
tags: js
categories: js
theme: vue-pro
highlight:
---

最近做一个需求，上传文件，限制图片的宽高，索性写了个插件。

## 用插件的话

```js
// npm i get-img-wh
import getImgWh from 'get-img-wh';

// file就是原生的file文件
const { width, height } = await getImageWH(file);
```

细致点的例子：

```js
// <input id="upload" type="file" name=""  />;
document.querySelector('#upload').onchange = async (e) => {
  const files = e.target.files;
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  const { width, height } = await getImageWH(file);
  console.log(width, height);
};
```

## 原理

其实找到图片的宽高，原理是 img 这个元素，可以直接获取其属性 width 和 height，注意图片是异步加载的，所以需要借用`onload`

```js
// <img id="img" src="https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/demo.png">
document.querySelector('#img').onload = function () {
  console.log(this.width);
  console.log(this.height);
};
```

## 源码 1：获取指定路径的图片宽高

获取指定路径的图片宽高，就可以通过创建 img 元素来获取

```js
const getImageWH_path = (path) => {
  const image = new Image();
  // 获取的是图片的base64代码
  image.src = path;
  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve({ width: image.width, height: image.height });
    };
    image.onerror = function () {
      reject('获取图片宽高失败');
    };
  });
};
const { width, height } = await getImageWH_path('...');
```

## 源码 2：获取上传文件的宽高

那上传文件怎么获取其宽高呢？

基于上面的原理，借用`FileReader`，将上传的图片转化为 base64，这就作为图片的 src，就可以啦！

```js
const getImageWH_file = (file) => {
  // 定义一个读取文件的对象
  const reader = new FileReader();
  // 读取
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      const base64 = event.target.result;
      resolve(getImageWH_path(base64));
    };

    reader.onerror = function () {
      reject('获取图片宽高失败');
    };
  });
};
```

## 源码 3：合并以上

```js
const getImageWH = (file) =>
  typeof file === 'string' ? getImageWH_path(file) : getImageWH_file(file);
```
