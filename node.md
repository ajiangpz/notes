### NodeJs构建web项目
#### 基本功能(GET)
1. 请求方法解析  
通过req.method判断请求方法
2. 路径解析  
通过req.url获取路径
3. 查询字符串
通过url.parse(req.url,true).query
4. cookie解析  
cookie的格式为name=value;name=value,通过req.header.cookie可以获取cookie字符串解析。设置cookie，res.setHeader('Set-Cookie','name=value'),res.setHeader('Set-Cookie',['name1=value1','name2=value2'])可以设置多个cookie，在res请求头中生成两个Set-Cookie字段
5. cookie使用  
可以为不需要cookie的组件更换域名，如静态文件，这样做还可以突破浏览器下载线程数量的限制，缺点是多一个域名需要多一次dns查询。
6. Session  
由于cookie是放在本地的，容易被篡改和伪造，同时cookie过大也会造成性能问题，因此需要用Session来将用户的状态数据保存在客户端。用户登录后，在服务端会生成一个sessionId，这是一个随机的值，并将这个值写入到cookie中返回，同时在session增加sessionId及其内容。下一次请求时，用户携带sessionId并获取存储在服务端session的数据。
    - session的存储位置  
    一般采用不将session直接存储在内存中，而是session计划化，通过第三方的缓存工具来存储session，如redis。
    - session的安全性  
    为了防止sessionId被伪造，可以通过签名的方式签名后的sessionId。服务端生成一个sessionId通过sessionId和私钥生成一个签名，返回sessionId和签名给浏览器。可以时'sessionId.sign'的组合。
7. 缓存   
强制缓存
协商缓存

#### 数据上传
1. 判断请求体中是否有数据  
请求头中的content-length字段或者transfer-encoding
2. 接收数据
报文内容可以通过data事件监听
3. 数据类型
    - 表单数据
        - Content-Type:application/x-www-form-urlencoded
        - 通过querystring.parse()解析，并放入body中
    - JSON数据
        - Content-Type:application/json;charset=utf\-8  
        - 通过JSON.parse()解析
    - XML数据
        - Content-Type:application/xml
        - 通过xml2js解析
    
    - 附件上传
        - Content-Type:multipart/form-data;boundary=AaB03x
        - boundary为分界符
        - formidable可以解析文件上传
4. 数据上传的限制
    - 限制上传内容的大小
    - 采用流式传输，将内容存储到磁盘上
    - 实体过长的状态码:413
5. CSRF
#### 路由解析

#### 中间件

#### 异步I/O

#### 异步编程

#### Buffer

