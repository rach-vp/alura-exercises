from django.test import LiveServerTestCase
from selenium import webdriver
import os
from animals.models import Animal

class AnimalsTestCase(LiveServerTestCase):
  def setUp(self):
    self.browser = webdriver.Chrome(executable_path=os.getenv('CHROMEDRIVER_PATH'))
    self.animal = Animal.objects.create(
      name="Lion",
      predator=True,
      poisonous=False,
      domestic=False,
    )

  def tearDown(self):
    self.browser.quit()

  def test_search_new_animal(self):
    """
    Test if an user finds an animal using the search
    """
    # Vini wishes to find an animal to adopt.
    # He finds Animal Search and decides to use the site
    home_page = self.browser.get(self.live_server_url + '/')

    # because he sees "Animal Search" in the menu
    brand_element = self.browser.find_element_by_css_selector('.navbar')
    self.assertEqual('Animal Search', brand_element.text)

    # He sees a fields to search for na animal
    search_animal_input = self.browser.find_element_by_css_selector('input#search-animal')
    self.assertEqual(search_animal_input.get_attribute('placeholder'), 'Example: lion')

    # He search for "lion" and clicks the button "search"
    search_animal_input.send_keys('lion')
    self.browser.find_element_by_css_selector('form button').click()
    # The site shows 4 features of the searched animal
    features = self.browser.find_elements_by_css_selector('.result-description')
    self.assertGreater(len(features), 3)

    # Vini decides not to adopt a lion
