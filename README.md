# get-img-wh

获取上传的时候文件的图片宽高，或者指定路径的图片宽高

## 安装

```shell
npm i get-img-wh
```

## 使用

```js
import getImgWh from 'get-img-wh';

const fn = async () => {
  // file文件
  const { width, height } = await getImageWH(file);
  // 或路径
  const { width, height } = await getImageWH(
    'https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/demo.png'
  );
};
```

## 比如上传文件的话

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
