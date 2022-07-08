## 目錄

-   通用
    -   心得
        -   [取得已審核心得](#取得已審核心得)
        -   [取得所有心得](#取得所有心得)
        -   [取得心得的統計數據](#取得心得的統計數據)
        -   [新增心得](#新增心得)
        -   [更新心得](#更新心得)
        -   [更新心得審核狀態](#更新心得審核狀態)
        -   [刪除心得](#刪除心得)
    -   分類項目
        -   [取得所有分類項目](#取得所有分類項目)
        -   [新增分類項目](#新增分類項目)
        -   [更新分類項目](#更新分類項目)
        -   [刪除分類項目](#刪除分類項目)
    -   統計數據
        -   [取得所有統計數據](#取得所有統計數據)
        -   [新增統計數據](#新增統計數據)
        -   [更新統計數據](#更新統計數據)
        -   [刪除統計數據](#刪除統計數據)
    -   其他統計數據

---

### 取得已審核心得

```
GET https://api.nckustudy.com/study?from={id}&num={num}&p={words}&cate={id1,id2}&stat={id1,id2}
```

-   query

    -   from : 從 uuid = id 的心得開始，若為空字串則從最新的心得開始
    -   num : 要取得的心得數量
    -   p : 要查詢的字串 ( 從標題及內文中篩選 )
    -   cate : 要篩選的分類項目
    -   stat : 要篩選的統計數據

-   response : 回傳由建立時間新到舊排序的心得

    -   data :

        -   | Name      | Type    | Description         |
            | :-------- | :------ | :------------------ |
            | id        | string  | 心得的 uuid         |
            | title     | string  | 心得標題            |
            | major     | string  | 主修科系            |
            | year      | integer | 年度                |
            | confirm   | integer | 審核狀態            |
            | content   | string  | 心得內文            |
            | timestamp | string  | yyyy-mm-dd hh:mm:ss |
            | category  | array   | 心得的分類項目      |
            | statistic | array   | 心得的統計數據      |

            -   category

                | Name | Type   | Description     |
                | :--- | :----- | :-------------- |
                | id   | string | 分類項目的 uuid |
                | name | string | 分類項目名稱    |

            -   statistic

                | Name  | Type   | Description     |
                | :---- | :----- | :-------------- |
                | id    | string | 統計數據的 uuid |
                | name  | string | 統計數據名稱    |
                | value | string | 統計數據數值    |

### 取得所有心得

```
GET https://api.nckustudy.com/study?from={id}&num={num}&p={words}&cate={id1,id2}&stat={id1,id2}
```

-   authorization
-   query : 同 [取得已審核心得](#取得已審核心得)
-   response :
    -   data :
        -   同 [取得已審核心得](#取得已審核心得)

### 取得心得的統計數據

```
GET https://api.nckustudy.com/study/result?p={words}&cate={id1,id2}&stat={id1,id2}
```

-   query : 同 [取得已審核心得](#取得已審核心得)
-   response : ( 若該統計數據的資料類型為字串，則不回傳 )

    -   | Name  | Type          | Description              |
        | :---- | :------------ | :----------------------- |
        | id    | string        | 統計數據的 uuid          |
        | name  | string        | 統計數據名稱             |
        | count | integer       | 含有此統計數據的心得數量 |
        | max   | integer/float | 統計數據最大值           |
        | max   | integer/float | 統計數據最小值           |
        | avg   | integer/float | 統計數據平均值           |

### 新增心得

```
POST https://api.nckustudy.com/study
```

-   header :
    -   Content-Type : application/json
-   body :

    -   | Name      | Type    | Description    |
        | :-------- | :------ | :------------- |
        | title     | string  | 心得標題       |
        | major     | string  | 主修科系       |
        | year      | integer | 年度           |
        | content   | string  | 心得內文       |
        | category  | array   | 心得的分類項目 |
        | statistic | array   | 心得的統計數據 |

        -   category

            | Name | Type   | Description     |
            | :--- | :----- | :-------------- |
            | id   | string | 分類項目的 uuid |

        -   statistic

            | Name  | Type   | Description     |
            | :---- | :----- | :-------------- |
            | id    | string | 統計數據的 uuid |
            | value | string | 統計數據數值    |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 更新心得

```
PUT https://api.nckustudy.com/study?id={id}
```

-   authorization
-   header :
    -   Content-Type : application/json
-   body :

    -   | Name      | Type    | Description    |
        | :-------- | :------ | :------------- |
        | title     | string  | 心得標題       |
        | major     | string  | 主修科系       |
        | year      | integer | 年度           |
        | confirm   | integer | 審核狀態       |
        | content   | string  | 心得內文       |
        | category  | array   | 心得的分類項目 |
        | statistic | array   | 心得的統計數據 |

        -   category

            | Name | Type   | Description     |
            | :--- | :----- | :-------------- |
            | id   | string | 分類項目的 uuid |

        -   statistic

            | Name  | Type   | Description     |
            | :---- | :----- | :-------------- |
            | id    | string | 統計數據的 uuid |
            | value | string | 統計數據數值    |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 更新心得審核狀態

```
PATCH https://api.nckustudy.com/study?id={id}
```

-   authorization
-   header :
    -   Content-Type : application/json
-   body :

    -   | Name    | Type    | Description |
        | :------ | :------ | :---------- |
        | confirm | integer | 審核狀態    |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 刪除心得

```
DELETE https://api.nckustudy.com/study?id={id}
```

-   authorization
-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 取得所有分類項目

```
GET https://api.nckustudy.com/studyType
```

-   response :

    | Name | Type   | Description     |
    | :--- | :----- | :-------------- |
    | id   | string | 分類項目的 uuid |
    | name | string | 分類項目名稱    |

### 新增分類項目

```
POST https://api.nckustudy.com/studyType
```

-   authorization
-   header :
    -   Content-Type : application/json
-   body :

    | Name | Type   | Description  |
    | :--- | :----- | :----------- |
    | name | string | 分類項目名稱 |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 更新分類項目

```
PUT https://api.nckustudy.com/studyType?id={id}
```

-   authorization
-   header :
    -   Content-Type : application/json
-   body :

    | Name | Type   | Description  |
    | :--- | :----- | :----------- |
    | name | string | 分類項目名稱 |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 刪除分類項目

```
DELETE https://api.nckustudy.com/studyType?id={id}
```

-   authorization
-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 取得所有統計數據

```
GET https://api.nckustudy.com/studyStat
```

-   response :

    -   | Name     | Type          | Description            |
        | :------- | :------------ | :--------------------- |
        | id       | string        | 統計數據的 uuid        |
        | name     | string        | 統計數據名稱           |
        | dataType | string        | 資料類型               |
        | max      | integer/float | 此統計數據允許的最大值 |
        | max      | integer/float | 此統計數據允許的最小值 |

### 新增統計數據

```
POST https://api.nckustudy.com/studyStat
```

-   authorization
-   header :
    -   Content-Type : application/json
-   body :

    | Name     | Type          | Description            |
    | :------- | :------------ | :--------------------- |
    | name     | string        | 統計數據名稱           |
    | dataType | string        | 資料類型               |
    | max      | integer/float | 此統計數據允許的最大值 |
    | max      | integer/float | 此統計數據允許的最小值 |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 更新統計數據

```
PUT https://api.nckustudy.com/studyStat?id={id}
```

-   authorization
-   header :
    -   Content-Type : application/json
-   body :

    | Name     | Type          | Description            |
    | :------- | :------------ | :--------------------- |
    | name     | string        | 統計數據名稱           |
    | dataType | string        | 資料類型               |
    | max      | integer/float | 此統計數據允許的最大值 |
    | max      | integer/float | 此統計數據允許的最小值 |

-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`

### 刪除統計數據

```
DELETE https://api.nckustudy.com/studyStat?id={id}
```

-   authorization
-   response :
    -   success : `{ status: success }`
    -   fail : `{ status: fail }`
