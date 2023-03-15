const getImgWH_path = (path) => {
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
const getImgWH_file = (file) => {
  if (!file.type.includes('image')) {
    console.error('上传的文件非图片，不能获取宽高')
    return
  }
  // 定义一个读取文件的对象
  const reader = new FileReader();
  // 读取
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      const base64 = event?.target?.result;
      resolve(getImgWH_path(base64))
    };

    reader.onerror = function () {
      reject('获取图片宽高失败');
    };
  });
};
/**
 * 获取上传的时候文件图片宽高，或者指定路径的图片宽高
 * 
 * 用法：
 * 
 * const {width,height} = await getImgWH(file)
 * 
 * const {width,height} = await getImgWH('https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/demo.png')
 * @param {*} file 可以是原生file文件，也可以是绝对路径或bse64
 * @returns \{width,height} number
 */
export const getImgWH = (file) =>
  typeof file === 'string' ? getImgWH_path(file) : getImgWH_file(file);
export default getImgWH