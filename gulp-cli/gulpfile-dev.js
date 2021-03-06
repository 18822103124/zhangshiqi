// 加载模块
const {sass,task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// const sass= require('gulp-sass');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('image', async ()=>{
  src('./image/*.*')
  .pipe(dest('./dist/image'))
  .pipe(load.connect.reload())
})

task('img', async ()=>{
  src('./img/*.*')
  .pipe(dest('./dist/img'))
  .pipe(load.connect.reload())
})

// 处理scss
task('sass', async ()=>{
  src('./sass/*.scss')
  .pipe(load.sass())
  .pipe(dest('./dist/css'))
  .pipe(load.connect.reload())
})
// 处理data
task('data', async ()=>{
  src('./data/*.*')
  .pipe(dest('./dist/data'))
  .pipe(load.connect.reload())
})

// 处理js
task('script', async ()=>{
  src('./script/*.js')
  .pipe(dest('./dist/script'))
  .pipe(load.connect.reload())
})

// 处理html
task('html', async ()=>{
  src('./pages/*.html')
  .pipe(dest('./dist/pages'))
  .pipe(load.connect.reload())
})

// 监听文件变化
task('watch',async ()=>{
  watch('./image/*.*',series('image'));
  watch('./sass/*.scss',series('sass'));
  watch('./script/*.js',series('script'));
  watch('./pages/*.html',series('html'));
  watch('./img/*.*',series('img'));
  watch('./data/*.*',series('data'));
})

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  });
})

// 构建开发包
task('dev',series('delDist','image','sass','script','html','connect','watch','img','data'))
