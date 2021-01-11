from unittest import TestCase
from src.leilao.domain import User, Evaluator, Bid, Auction

# python -m unittest src/leilao/test_evaluator.py

class TestEvaluator(TestCase):
    def setUp(self):
        self.user1 = User('Raquel')
        self.user2 = User('Will')
        self.evaluator = Evaluator()
        self.user2_bid = Bid(self.user2, 150)
        self.user1_bid = Bid(self.user1, 100)
        self.auction = Auction('Celular')


    def test_two_ordered_bids(self):
        self.auction.bids.append(self.user1_bid)
        self.auction.bids.append(self.user2_bid)

        for bid in self.auction.bids:
            print(bid)

        self.evaluator.evaluate(self.auction)

        # expected result
        lowest_bid_expected = 100
        greater_bid_expected = 150

        self.assertEqual(lowest_bid_expected, self.evaluator.lowest_bid)
        self.assertEqual(greater_bid_expected, self.evaluator.greatest_bid)

    def test_two_unordered_bids(self):
        self.auction.bids.append(self.user2_bid)
        self.auction.bids.append(self.user1_bid)

        for bid in self.auction.bids:
            print(bid)

        self.evaluator.evaluate(self.auction)

        # expected result
        lowest_bid_expected = 100
        greater_bid_expected = 150

        self.assertEqual(lowest_bid_expected, self.evaluator.lowest_bid)
        self.assertEqual(greater_bid_expected, self.evaluator.greatest_bid)

    def test_single_bid(self):
        self.auction.bids.append(self.user1_bid)

        self.evaluator.evaluate(self.auction)

        lowest_bid_expected = greater_bid_expected = self.user1_bid.value

        self.assertEqual(lowest_bid_expected, self.evaluator.lowest_bid)
        self.assertEqual(greater_bid_expected, self.evaluator.greatest_bid)
