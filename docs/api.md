## 目錄

-   通用
    -   心得
        -   [取得已審核心得](#取得已審核心得)
        -   取得所有心得
        -   取得心得的統計數據
        -   更新心得
        -   更新心得審核狀態
        -   刪除心得
    -   分類項目
    -   統計數據
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

-   response : 由建立時間新到舊排序的心得

    -   data :

        -   | Name      | Type    | Description         |
            | :-------- | :------ | :------------------ |
            | id        | string  | 心得的 uuid         |
            | title     | string  | 心得標題            |
            | major     | string  | 主修科系            |
            | year      | integer | 年度                |
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
