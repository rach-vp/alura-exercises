from django.test import LiveServerTestCase
from selenium import webdriver
import os

class AnimalsTestCase(LiveServerTestCase):
  def setUp(self):
    self.browser = webdriver.Chrome(executable_path=os.getenv('CHROMEDRIVER_PATH'))

  def tearDown(self):
    self.browser.quit()

  def test_open_chrome_window(self):
    self.browser.get(self.live_server_url)
