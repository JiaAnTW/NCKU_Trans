# FliterMobile資料結構
FliterMobile是用以下的資料結構去控制如何顯示。
```js
var fliter = [
    {
        id:0,
        now:-1,
        name: "依學院篩選",
        type: "deapartment",
        option:[["全部學院",-1],["工學院",1],["文學院",2]]
    },
    {
        id: 1,
        now:-1,
        name: ["deapartment","工學院"],
        type: "in_maj",
        option:[["全部學系",-1],["系統系",-1],["工科系",-1]]
    },
    ,
    {
        id: 2,
        now:-1,
        name: ["deapartment","文學院"],
        type: "in_maj",
        option:[["全部學系",-1],["外文系",-1],["台文系",-1]]
    },
];
```
## 解析
* id: list的index
* now: 目前選取的listItem
* name:
    * 0: 該list的類別
    * 1: 該list的名稱
* type: 篩選的類別，請見redux
* option:
    * listItem
        * 0: listItem的名稱
        * 1: 點擊該list後，要顯示的list的id，**-1代表要隱藏所有目前id大於自身id的list。**

以上結構的運作模式如下:
### 表0
> "依學院篩選"

| 項目名稱 | 點選後要顯示的list |
| -------- | -------- |
| 全部學院 | 隱藏id>0的list     | |
| 工學院   | 1(表1)     |
| 文學院 |  2(表2)    | 

### 表1
> ["deapartment","工學院"]

| 項目名稱 | 對應指向 |
| -------- | -------- |
| 全部學系 | 無子指向     | 
| 系統系   | 無子指向     |
| 工科系 |  無子指向    | 


### 表2
> ["deapartment","文學院"]

| 項目名稱 | 對應指向 |
| -------- | -------- |
| 全部學系 | 無子指向     | 
| 外文系   | 無子指向     |
| 台文系 |  無子指向    | 