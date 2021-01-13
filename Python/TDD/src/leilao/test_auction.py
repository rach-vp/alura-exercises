from unittest import TestCase
from src.leilao.domain import User, Bid, Auction

# python -m unittest src/leilao/test_auction.py

class TestAuction(TestCase):
    def setUp(self):
        self.user1 = User('Raquel')
        self.user2 = User('Will')
        self.user2_bid = Bid(self.user2, 150)
        self.user1_bid = Bid(self.user1, 100)
        self.auction = Auction('Celular')


    def test_two_ordered_bids(self):
        self.auction.propose(self.user1_bid)
        self.auction.propose(self.user2_bid)

        for bid in self.auction.bids:
            print(bid)

        # expected result
        lowest_bid_expected = 100
        greater_bid_expected = 150

        print(self.auction)

        self.assertEqual(lowest_bid_expected, self.auction.lowest_bid)
        self.assertEqual(greater_bid_expected, self.auction.greatest_bid)

    def test_two_unordered_bids(self):
        self.auction.propose(self.user2_bid)
        self.auction.propose(self.user1_bid)

        for bid in self.auction.bids:
            print(bid)

        print(self.auction)

        # expected result
        lowest_bid_expected = 100
        greater_bid_expected = 150

        self.assertEqual(lowest_bid_expected, self.auction.lowest_bid)
        self.assertEqual(greater_bid_expected, self.auction.greatest_bid)

    def test_single_bid(self):
        self.auction.propose(self.user1_bid)

        print(self.auction)

        lowest_bid_expected = greater_bid_expected = self.user1_bid.value

        self.assertEqual(lowest_bid_expected, self.auction.lowest_bid)
        self.assertEqual(greater_bid_expected, self.auction.greatest_bid)

    # If auction has no bids, must allow a new bid
    def test_allow_bid_if_no_bids(self):
        self.auction.propose(self.user1_bid)

        expected_amount = 1

        self.assertEqual(expected_amount, len(self.auction.bids))

    # If last user is different, must allow proposing a bid
    def test_if_different_user_allow_new_bid(self):
        self.auction.propose(self.user1_bid)
        self.auction.propose(self.user2_bid)

        expected_amount = 2

        self.assertEqual(expected_amount,len(self.auction.bids))

    # If last user is the same, must not allow proposing a bid
    def test_if_same_user_not_allow_bid(self):
        self.auction.propose(self.user1_bid)
        new_user1_bid = Bid(self.user1, 200)
        self.auction.propose(new_user1_bid)

        expected_amount = 1

        self.assertEqual(expected_amount, len(self.auction.bids))
