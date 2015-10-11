# 檔案系統

| 主題 | 說明 |
|--------|--------|
| [錯誤代號與訊息 ](error_id.html)  |  (errno, strerror, perror) 與錯誤代號相關的訊息輸出方法 |
| [錯誤訊息列表 ](error_list.html)  |  (strerror) 用 strerror 列出所有內建的錯誤訊息 |
| [檔案錯誤](error_file.html)  |  (ferror,clearerr) 檔案讀取寫入錯誤，清除錯誤，繼續執行下去 |
| [短程跳躍](goto.html)  |  (goto) 函數內的跳躍，不可跨越函數 |
| [長程跳躍](jump.html)  |  (setjump 與 longjump) 在錯誤發生時，儲存行程狀態，執行特定程式的方法 |
| [訊號機制](signal.html)  |  (signal) 攔截中斷訊號的處理機制 |
| [模擬 try ... catch](try_catch.html)  |  使用跳躍機制 (setjump, longjump) 模擬 try … catch 的錯誤捕捉機制  |