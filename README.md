# Correct Name Core
“好好打名字！”项目的核心功能包。The core features pack of The Correct Name Porject.

## 使用

### 引入包

ES6

```javascript
import Cornm from 'correct-name-core'
```

CommonJS

```javascript
const Cornm = require('correct-name-core')
```

### 创建实例

事先准备好一份要查询的姓名列表（例如`namelist.txt`），纯文本，一行一个名字，`UTF-8`编码。

之后创建一个`Cornm`实例


```javascript
// namelist.txt
青章浚
浚章青
...
```

```javascript
const cornm = new Cornm('namelist.txt')
```

### 查询使用

`Cornm`有且仅有一个方法：`q`，传入一个字符串来查询符合条件的姓名，返回一个包含满足拼音首字母的所有姓名数组。

```javascript
cornm.q('qzj')  // ['青章浚']
cornm.q('jzq')  // ['浚章青']
```

### 其余API

`Cornm`实例还有一个`db`属性，按照以下格式储存着全部姓名以及对应的拼音

```javascript
[
    {
      Name: '青章浚',
      Pinyin: [
        ['q'],
        ['z'],
        ['j', 'x']
      ]
    },
    {
      Name: '浚章青',
      Pinyin: [
        ['j', 'x'],
        ['z'],
        ['q']
      ]
    }
]
```
