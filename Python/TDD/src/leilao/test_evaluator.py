from unittest import TestCase
from src.leilao.domain import User, Evaluator, Bid, Auction

# python -m unittest src/leilao/test_evaluator.py

class TestEvaluator(TestCase):
    def test_two_ordered_bids(self):
        user1 = User('Raquel')
        user2 = User('Will')
        evaluator = Evaluator()

        user2_bid = Bid(user2, 150)
        user1_bid = Bid(user1, 100)

        auction = Auction('Celular')

        auction.bids.append(user1_bid)
        auction.bids.append(user2_bid)

        for bid in auction.bids:
            print(bid)

        evaluator.evaluate(auction)

        # expected result
        lowest_bid_expected = 100
        greater_bid_expected = 150

        self.assertEqual(lowest_bid_expected, evaluator.lowest_bid)
        self.assertEqual(greater_bid_expected, evaluator.greatest_bid)

    def test_two_unordered_bids(self):
        user1 = User('Raquel')
        user2 = User('Will')
        evaluator = Evaluator()

        user2_bid = Bid(user2, 150)
        user1_bid = Bid(user1, 100)

        auction = Auction('Celular')

        auction.bids.append(user2_bid)
        auction.bids.append(user1_bid)

        for bid in auction.bids:
            print(bid)

        evaluator.evaluate(auction)

        # expected result
        lowest_bid_expected = 100
        greater_bid_expected = 150

        self.assertEqual(lowest_bid_expected, evaluator.lowest_bid)
        self.assertEqual(greater_bid_expected, evaluator.greatest_bid)

    def test_only_bid(self):
        user = 'Raquel'
        evaluator = Evaluator()

        user_bid = Bid(user, 150)

        auction = Auction('Celular')
        auction.bids.append(user_bid)

        evaluator.evaluate(auction)

        self.assertEqual(150, evaluator.lowest_bid)
        self.assertEqual(150, evaluator.greatest_bid)
