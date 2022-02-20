# coding:utf-8
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep

#

URL = "https://rsclef.rakurakuseisan.jp/CSR9KsE9qUa/"
ACCOUNT_ID = "2020137"
PASSWORD = "Misaki0227"

# ブラウザを開く。
driver = webdriver.Chrome()
# Googleの検索TOP画面を開く。
driver.get(URL)
# 検索語として「selenium」と入力し、Enterキーを押す。

driver.find_element_by_name("loginId").send_keys(ACCOUNT_ID)
driver.find_element_by_name("password").send_keys(PASSWORD)

#driver.find_element_by_id("lst-ib").send_keys("selenium")
#driver.find_element_by_id("lst-ib").send_keys(Keys.ENTER)
driver.find_element_by_id("submitBtn").click()

# タイトルに「Selenium - Web Browser Automation」と一致するリンクをクリックする。

# 5秒間待機してみる。
sleep(5)
# ブラウザを終了する。




driver.close()
