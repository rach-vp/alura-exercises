from src.leilao.domain import User, Auction

def test_withdraw_value_from_user_wallet_when_proposing_a_bid():
  user = User("Raquel", 100)
  auction = Auction("Smartphone")

  user.place_proposal(auction, 50)

  assert user.balance == 50
