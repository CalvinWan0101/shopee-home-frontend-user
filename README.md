# ShopeeHome-frontend-User

## Install

1. 安裝Node.js
2. 開啟cmd，在ShopeeHome-frontend目錄下輸入 `npm install`
3. 輸入 `npm run dev`
4. 把螢幕上出現的網址貼到 disable CORS policy 的 Google Chrome 瀏覽器

## How To Use

### 1. Client (未登入)

   1. 在未登入的情況下，訪客可以在首頁瀏覽所有商品。
      ![首頁](./README_image/client_HomePage.png)
   2. 也可以在上方搜尋欄用關鍵字搜尋商品。
      ![搜尋成功](./README_image/client_search_success.png)
      ![搜尋失敗](./README_image/client_search_fail.png)
   3. 也能點擊任意產品進入產品頁面，但是點擊加入購物車或是立即購買後會進入登入頁面，需要先登入才能進行操作。
   點擊下方產品資訊欄會展開並顯示產品資訊。
      ![產品頁面](./README_image/client_productPage.png)
   4. 點擊產品頁中間的賣家欄位會轉到賣家頁面。  
   按左側按鈕可以看到商家的所有商品。  
   中間可以看到店家資訊。  
   右側是商店的優惠券資訊，但是沒有登入看不到。
      ![賣家頁面-商品](./README_image/client_shopPage_product.png)
      ![賣家頁面-描述](./README_image/client_shopPage_description.png)
      ![賣家頁面-優惠券](./README_image/client_shopPage_coupon.png)
   5. 在任何地方只要點擊左上角的Logo就能回到網站主頁。

### 2. User

   1. 在未登入情況下按右上角人頭圖像會移至登入頁面。
      ![登入頁面](./README_image/user_loginPage.png)
   2. 點擊右下角的sign up進入註冊頁面。可以點擊註冊欄位上方的頭像上傳大頭貼(非必要)，如果沒上傳，大頭貼為name的第一個字元+根據name欄位計算出來的背景顏色。  
   註冊成功後自動回到登入頁面，即可使用剛註冊的帳號密碼進行登入。  
   (注意: 不可用相同email重複註冊。)  
   (不註冊的話可以用我們的測試帳號 email: user1@gmail.com , password: user1)
      ![註冊頁面](./README_image/user_signupPage.png)
   3. 登入後點擊右上角user頭像可以打開drawer，從drawer可以連到user的各個相關頁面以及登出。
      ![drawer頁面](./README_image/user_drawerPage.png)
   4. 按下Personal Information 會先要求重新輸入帳號密碼確認身份後，跳到個人資訊修改頁面。
      ![確認身份頁面](./README_image/user_confirmPage.png)
      ![個人資訊頁面](./README_image/user_InfprmationPage.png)
   5. 按下添加地址即可在個人資訊中添加常用地址以加快結帳速度。  
   （常用地址會顯示在結帳介面）。
      ![地址頁面](./README_image/user_addressPage.png)
   6. 登入後的user可以使用client的所有功能，包括剛剛提到user無法領取的優惠券。  
   (商店頁面可以看到優惠券，黑色代表未領取、綠色打勾代表已領取、灰色代表已使用)
      ![商店頁面-優惠券](./README_image/user_shopPage_coupon.png)
   7. 在商品頁面按+-按鈕選擇數量，按下加入購物車且加入成功時左下角會出現提示，可以去購物車結帳完成訂單。
      ![購物-1](./README_image/user_shopping_1.png)
   8. 或者按下立即購買按鈕後會直接進入購買頁面（後面一起介紹）。
      ![購物-2](./README_image/user_shopping_2.png)
   9. 打開右上角頭像按下ShoppingCart即可前往購物車。選擇想結帳的商品內容，同一筆訂單只可以選擇一個商家出貨。  
   （勾選有設計無法同時勾選不同商店的商品）。
      ![購物車-1](./README_image/user_createOrderPage_1.png)
   10. 再次確認商品和數量。
      ![購物車-2](./README_image/user_createOrderPage_2.png)
   11. 在結帳頁面可以選擇之前輸入的地址或是自行輸入想要運送的地址。  
   （剛剛按下直接購買也是跳到這個界面）。
      ![結帳頁面-1](./README_image/user_createOrderPage_3.png)
   12. 按下Next之後可以選擇剛才在商家領取的優惠卷，再次按下可取消使用。
      ![結帳頁面-2](./README_image/user_createOrderPage_4.png)
   13. 按下Next之後跳轉至確認下訂的頁面，按下立即下訂即下單成功。
      ![確認訂單頁面](./README_image/user_createOrderPage_5.png)
   14. 接下來可以按下user頭像，選擇Order查看訂單狀況，現在的狀況是尚未出貨。
      ![訂單狀況-1](./README_image/user_createOrderPage_6.png)
   15. 在訂單處於不同狀態時會有不同標記（賣家出貨流程請見賣場的README），按下取貨即可看到已取貨的畫面。  
   以下分別是未出貨，已出貨(未取貨)，已出貨(已取貨)。
      ![訂單狀況-2](./README_image/user_createOrderPage_7.png)
   16. 按下user頭像，選擇Log Out登出，即變成登出狀態。
