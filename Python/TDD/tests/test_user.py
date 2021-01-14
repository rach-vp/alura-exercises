from src.leilao.domain import User, Auction
from src.leilao.exceptions import InvalidBid
import pytest

@pytest.fixture
def user():
  return User('Raquel', 100)

@pytest.fixture
def auction():
  return Auction('Smartphone')

def test_withdraw_value_from_user_wallet_when_proposing_a_bid(user, auction):
  user.place_proposal(auction, 50)

  assert user.balance == 50

def test_allow_proposal_if_value_is_lower_then_balance(user, auction):
  user.place_proposal(auction, 1)

  assert user.balance == 99

def test_allow_proposal_if_value_is_equal_then_balance(user, auction):
  user.place_proposal(auction, 100)

  assert user.balance == 0

def test_forbidden_proposal_if_value_is_greater_than_balance(user, auction):
  with pytest.raises(InvalidBid):
    user.place_proposal(auction, 120)
