const fs = require("fs");
const { promisify } = require("util");
const webdriver = require("selenium-webdriver");
const { Builder, By, until } = webdriver;

const capabilities = webdriver.Capabilities.chrome();

capabilities.set("chromeOptions", {
  args: [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    `--window-size=1200,800`,
  ],
});

URL = "https://rsclef.rakurakuseisan.jp/CSR9KsE9qUa/";
URL_TRANSPORT_COST =
  "https://rsclef.rakurakuseisan.jp/CSR9KsE9qUa/sapKotsuhiDenpyo/initializeView";
ACCOUNT_ID = "2020137";
PASSWORD = "Misaki0227";

(async () => {
  // ブラウザ立ち上げ
  const driver = await new Builder().withCapabilities(capabilities).build();

  // 楽楽精算に移動
  await driver.get(URL);

  // 検索ボックスが表示されるまで待つ
  const login = driver.wait(until.elementLocated(By.name("loginId")), 10000);
  const password = driver.wait(
    until.elementLocated(By.name("password")),
    10000
  );
  const submit = driver.wait(until.elementLocated(By.id("submitBtn")), 10000);

  await login, password, submit;

  login.sendKeys(ACCOUNT_ID);
  password.sendKeys(PASSWORD);

  submit.click();

  driver.sleep(3);

  //driver.get(URL_TRANSPORT_COST);

  driver.sleep(1);

  // bufferを保存
  //await promisify(fs.writeFile)("screenshot.jpg", buffer);

  // ブラウザ終了
  //driver.quit();
})();
