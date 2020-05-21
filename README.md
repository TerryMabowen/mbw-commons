### 概述
```$xslt
    spring/springboot项目基本库
        ——包含常用的工具类，验证器，thymeleaf模版引擎封装，mybatis封装等。
```

### 下载本项目
```
    git clone https://github.com/TerryMabowen/mbw-commons.git
```                

### 使用
```$xml
    <dependency>
        <groupId>com.github.mbw</groupId>
        <artifactId>commons-all</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <exclusions>
            <exclusion>
                <groupId>org.hibernate</groupId>
                <artifactId>hibernate-validator</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>com.github.mbw</groupId>
        <artifactId>commons-dal</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </dependency>
```
#### 说明
```$xslt
    可单独引入一个模块，比如commons-dal,commons-util,commons-web,commons-api,commons-core,commons-module,
    也可以引入所有, commons-all
    引入all或者web需要排除hibernate-validator
```