- 模块化

  - JavaScript 缺点

    - JavaScript 通过 script 标签引入各个文件，各个文件的依赖关系很难看出。
    - 每个 script 标签都要向后台请求静态资源，加载 script 会阻塞页面渲染，过多的请求会影响页面的渲染速度。
    - 污染全局作用域

  - 模块化的好处
    - 明确模块间的依赖关系
    - 每个模块的作用域是隔离的
    - 借助打包工具合并，只加载合并后的资源文件，减少了网络开销
  - 原生模块化
    - 兼容性
    - 代码分割和 tree-shaking
    - npm commonJs

- 模块打包
  - commonJs和ES6模块的差别
    - 模块间依赖关系的构建 cjs是在运行时构建，而ES6模块是在编译时构建的。因此引入模块时cjs的路径可以是表达式，可以在条件判断语句中执行，而ES6模块只能在代码首部引入模块。
    - cjs引入的值是模块中值的拷贝，而ES6引入的值是模块中值的映射。在cjs中可以对引入的值进行修改，这不会改变cjs模块中原有的值。而ES6不可以对引入的值进行修改，只能调用方法进行修改。
    - 循环依赖 cjs在出现循环依赖是，由于在运行是引入，则会出现在一个模块的值是空对象的情况。而ES6中只要确保在引用模块变量时，该变量已经定义就可以解决循环依赖的问题了。  

  - ES6模块的优势
    - ES6模块可以实现对模块未引用代码的检测
    - 对模块变量类型检查
    - cjs本质上导入的是一个对象，而ES6可以直接导入变量，减少了引用层级，提升了程序效率。+

- webpack 的优势

  - 支持多种模块
  - 代码分割
  - 社区支持
  - 打包各种类型的文件

- webpack 安装
  - 本地安装
    - 版本一致
    - 有些插件需要调用 webpack 内部的模块，仍然需要本地安装 webpack，如果全局和本地都有，容易造成混淆
- webpack 配置

  - entry
  - output
  - webpack-dev-server
    - 静态资源服务器
    - 执行打包命令，处理打包结果的资源请求

- HMR

  - 只更新 chunk 中更改的内容，不用刷新浏览器
  - 在项目很大时，如果每次都要重新运行一遍项目，会耗费很多时间。
  - HMR 是基于 web-socket 和 wds 实现的
  - 每次构建完后，wds 会通过 websocket 向浏览器推送发送消息。浏览器通过比较 hash 值，判断文件是否发生了变化。如果 hash 值发生了变化，那么浏览器会向客户端发送一个请求`[hash].hot.update.json`来获取需要更新的文件列表。然后再去获取这些文件的增量更新。获取更新后，根据文件内容判断哪些状态需要保留，哪些需要更新。这需要开发者自身在这些文件中调用`module.hot`的相关 API 进行控制。

- 打包优化

  - webpack 对入口模块进行转译，转译完成后如果该模块又引入了其他模块，如`a.js`和`b.js`，但是会逐一对这些模块进行转义，即使这些模块之前没有任何联系，也只能是串行转译。happypack 可以开启多个线程执行 loader，加快打包速度。一般对于 babel-loader,ts-loader 等耗时较长的 loader 可以使用 happypack。

  - `exclude`和`include`可以一起使用时，`exclude`的优先级较高，可以利用这个排除`include`中特定的文件夹，减少打包的体积。如`node_modules`文件夹

  - `noParse`配置可以不解析一些库，通常是一些不依赖其他模块的库，如 lodash。这些资源依然会被打包进资源文件，只是 webapck 不对其做解析而已。

  - `ignorePlugin` 对于排除的模块，即使被引用了也不会被打包进资源文件中。

  - `DllPlugin` 可以实现对模块单独打包，在构建时直接引用即可。
    `DllPlugin`需要单独的`webpack`配置文件，并且独立构建。可以指定生成的路径和名称，最终生成两个文件，一个`manifest.json`和`vendor.js`。webpack 中配置`DllReference`引入`mainfest.json`。

  - `tree-shaking`可以去除模块中未被引用的代码，前提条件是这些模块需要是`es6模块`，而`babel-loader`构建的模块都是 commonJs 模块，所以需要禁用该`loader`的构建模块功能，使用 webpack 来构建模块。`tree-shaking`只是对未引用的代码做一个标记，真正去除死代码的过程是代码压缩过程，设置 mode 为`production`或者利用`terser-webpack-plugin`都可以实现压缩。

- 生产环境配置

  - 环境变量  
    通过`mode`、命令行、`cross-env`、`webpack.definePlugin`插件都可以设置环境变量。`mode`可以使模块内部可以访问`process.env.NODE_ENV`变量;命令行通过`-env=development|production`设置环境变量，但是在任意模块中无法无法访问，只有在`node`环境下通过函数参数引入;`cross-env`可以设置`node`下的环境变量;`webpack.definePlugin`可以设置浏览器环境下的环境变量。

  - source-map  
    `map`文件可以用来调试源码和查看线上代码出错时的调用栈，但是所有的人都可以看得见源代码。为了确保安全性，可以采用一下方案。

    - hidden-source-map 在`bundle.js`中不添加对`source-map`的引用，用户无法通过开发者工具查看源代码。但是可以通过将`source-map`上传到`sentry`第三方服务，在代码执行出错时可以在第三方服务上查看调用栈。
    - `nosources-source-map`，开发者工具可以看到源码的目录结构，但是看不到文件。可以通过`console.log`的报错追溯到错误。

    - 设置网站白名单，只有名单内的`source-map`可以访问.map 文件。

  - 资源压缩

    - 压缩`js`
      ```js
      module.exports = {
        optimization: {
          minimizer: [
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
              exclude: /\/excludes/,
            }),
          ],
        },
      };
      ```
    - 压缩`css`  
      前提是用`extract-text-webpack-plugin`或`mini-css-extract-plugin`将样式提取出来，接着使用`optimize-css-assets-webpack-plugin`来进行压缩。

      ```js
      module.exports = {
        optimization: {
          minimizer: [new OptimizeCSSAssetsPlugin({})],
        },
      };
      ```

  - 缓存

    - 使用[hash]可以在修改文件后用户重新加载资源，没有改变的资源则在缓存中读取。
    - 为了避免每次生成 bundle 后因为 hash 改变了需要改变 bundle 的问题，可以配置 html-webpack-plugin 动态生成 html。

- 代码分片  
  提取代码中的公共部分，减少资源请求和资源体积。

  - 通过多个代码入口提取公共模块  
    webpack 根据不同的代码入口提取不同的 chunk，这种方式适合将接口绑定在全局对象的库，以为业务模块和库中的模块属于不同的依赖树。
  - splitChunk
    通过条件声明来分离公共模块或者异步模块

    ```js
    module.exports:{
      splitChunks:{
        // 分离chunks的匹配模式
        chunks:'all|initial|async'
        minSize:{
          // 提取的JavaScript的体积至少为30KB
          // 提取的CSS的体积至少为50KB
          javascript:30000,
          style:50000
        },
        // 最少被chunk引用的次数
        minChunks:1,
        // 最大的按需加载请求数，如果超过了这个数目，则不分离模块
        maxAsyncRequests:5,
        // 最大的首屏加载请求数，如果大于这个数目，则不分离模块
        maxInitialRequests:3,
        // 可以根据作用范围和cacheGroup自动生成chunk的名称
        name:true
        // 分离chunk的自定义规则，匹配到这个规则则分离成这种类型的chunk。
        cacheGroups:{
          vendors:{
            priority:-10
          },
          default:{
            priority:-20
          },
          //...
        }
      }
    }
    ```

- 资源入口与出口

  - entry 和 context 定义资源入口

    - context 指定 entry 的上下文，默认是根目录。
    - entry 可以是字符串，数组，对象，函数。通过数组形式传入的 entry 会将最后一个文件作为入口，前面的文件在入口文件的引入。对象可以指定多个入口文件及其 chunk 名称，对象的属性值可以是上面的任意一种。
    - 在 entry 中可以定义一个 vendor 入口，利用 splitChunk 来提取 vendor 入口和其他入口的公共模块和异步模块，减少资源体积和首页加载时间。

  - output 定义资源出口
    - path 定义资源的输出位置，绝对路径。
    - publicPath 定义间接资源的输出位置，间接资源指在 js 中异步加载的 js 或者在 css 中加载的图片等。直接资源指在 html 中的 script 标签加载的资源。
      - 相对路径：相对 html 文件的路径来将打包间接资源
      - 绝对路径：以 html 文件所在的域名为起始路径，再加上绝对路径
      - cdn：以 cdn 地址为起始路径，请求资源时直接以 cdn+异步加载的路径。
    - filename 可以使用[name],[chunkhash]等模板变量，在生产环境中可以使用[name]@[chunkhash]作为输出文件名，避免用户每次都去加载没有改变的资源。

- loader  
  loader 本身是一个函数,接收源文件，处理源文件，返回处理后的文件。

  - babel-loader  
    主要用来转译 es6 代码，将 es6 转化为 es5 代码。需要安装 babel-loader、@babel/core、@babel/preset-env。@babel/preset-env 为预置器，可以根据用户设置的目标环境自动添加所需的插件和补丁。  
    示例
    ```js
    {
      rules: [
        {
          test: "/.js$/",
          // 不转译node_modules下的js文件，加快转译速度
          exclude: "/node_modules/",
          use: {
            loader: "babel-loader",
            options: {
              cacheDiretory: true,
              presets: [
                {
                  // 由于@babel/preset-env默认会将ES6转化为commonJs文件，因此需要在presets配置modules为false,使babel不对模块语句进行转化，而是交给webpack处理,这样webpack可以使用tree-shaking功能标记没有引用的代码。
                  modules: false,
                },
              ],
              // 添加所需的插件
              plugins: [],
            },
          },
        },
      ];
    }
    ```
  - html-loader 用来将 html 文件转化为字符串并且格式，可以使用 document.write 插入页面中。
  - file-loader 用来打包文件类型的资源，返回其 publicPath。如果 output 选项配置的 publicPath，资源的路径会变成 output.publicPath+文件名。也可以在 loader 的 option 中配置 name 和 publicPath 可以覆盖 output.publicPath。
  - url-loader 与 file-loader 基本一致，区别在于 url-loader 的 limit 属性可以让用户决定是返回文件的路径还是 base64 编码。

- 样式处理

  - 提取 css 文件  
    提取 css 文件是用户可以缓存 css，加快加载速度。使用 mini-css-extract-plugin 可以将 css 文件单独提取出来，并且可以按需加载 css。
    示例

    ```js
    {
      module.exports = {
        rules: [
          (test: "/.css$/"),
          (use: [
            {
              loader: MinCssExtractPlugin.loader,
              options: {
                publicPath: "../",
              },
            },
            "css-loader"
          ]),
        ],
        plugins: [
          new MinCssExtractPlugin({
            // 指定同步加载的css名称，name与chunk名称一致
            filename: "[name].css",
            // 指定异步加载的css名称
            chunkFilename: "[id].css",
          }),
        ],
      };
    }
    ```

  - 样式预处理
    - scss-loader
      使用淘宝镜像安装二进制文件
      `npm config set sass_binary_bite=https://npm.taobao.org/mirrors/node-sass/`
    - PostCss  
      将源码文件交由用户指定的插件处理，因此称之为`Post`
      常见插件
      - autoprefixer 为 css 自动添加厂商前缀
      - stylelint css 的质量检测工具 可以添加各种规则 统一项目的代码风格
      - CSSNext 使用最新的 css 特性
  - css 模块化
    在 css-loader 中配置 modules 为 true 即可,每个css模块都是一个独立的命名空间，可以避免样式冲突。
    配置
    ```js
    {
      rules:[
        test:/\.css$/,
        use:[
          'style-loader',
          options:[
            modules:true,
            // name指模块名,local指原本的选择器标识符名称,hash指文件的
            localIndentName:"[name]__[local]__[hash]"
          ]
        ]
      ]
    }
    ```